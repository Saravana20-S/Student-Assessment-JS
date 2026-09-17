import { StudentService } from "./services/StudentService";
import { AssessmentService } from "./services/AssessmentService";
import { ResultService } from "./services/ResultService";

import { StudentException } from "./exceptions/StudentException";
import { AssessmentException } from "./exceptions/AssessmentException";

import { Student } from "./models/Student";
import { Trainer } from "./models/Trainer";
import { AbstractUser } from "./models/AbstractUser";
import { Question } from "./models/Question";

import {
  AssessmentStatus,
  Difficulty,
  Score,
  Performance,
} from "./types/AssessmentTypes";

import { StudentPerformance } from "./types/StudentTypes";

import { ScoreCalculator, calculatePercentage } from "./types/FunctionTypes";

import { Logger } from "./utils/Logger";

// ==================================================
// APPLICATION HEADER
// ==================================================

console.log("\n==============================================");
console.log(" STUDENT ASSESSMENT & PERFORMANCE SYSTEM");
console.log(" PHASE 4 - ADVANCED TYPESCRIPT");
console.log("==============================================\n");

// ==================================================
// PHASE 1 - STUDENT MANAGEMENT
// ==================================================

console.log("========== PHASE 1 : STUDENT MANAGEMENT ==========\n");

const studentService = new StudentService();

let student1: Student;

try {
  // ------------------------------------------------
  // 1. ADD STUDENT
  // ------------------------------------------------

  console.log("1. ADD STUDENT");

  student1 = studentService.addStudent("Rahul", "rahul@gmail.com", "B1");

  console.log(`Student added: ${student1.name}`);

  // ------------------------------------------------
  // 2. VIEW ALL STUDENTS
  // ------------------------------------------------

  console.log("\n2. VIEW ALL STUDENTS");

  studentService.getAllStudents().forEach((student) => {
    console.log(
      `ID: ${student.id} | ` +
        `Name: ${student.name} | ` +
        `Email: ${student.email} | ` +
        `Batch: ${student.getBatch()}`,
    );
  });

  // ------------------------------------------------
  // 3. FIND STUDENT
  // ------------------------------------------------

  console.log("\n3. FIND STUDENT");

  const foundStudent = studentService.getStudentById(student1.id);

  console.log(`Found: ${foundStudent.name}`);

  // ------------------------------------------------
  // 4. UPDATE STUDENT
  // ------------------------------------------------

  console.log("\n4. UPDATE STUDENT");

  const updatedStudent = studentService.updateStudent(
    student1.id,
    "Rahul Kumar",
    "rahulkumar@gmail.com",
    "B2",
  );

  console.log(
    `Updated: ${updatedStudent.name} | ` +
      `Email: ${updatedStudent.email} | ` +
      `Batch: ${updatedStudent.getBatch()}`,
  );

  // ------------------------------------------------
  // 5. UPDATE SCORE
  // ------------------------------------------------

  console.log("\n5. UPDATE STUDENT SCORE");

  updatedStudent.updateScore(85);

  console.log(`Score: ${updatedStudent.getScore()}`);
} catch (error) {
  if (error instanceof StudentException) {
    console.error(`Student Error: ${error.message}`);
  } else {
    console.error("Unexpected error occurred:", error);
  }
}

// ==================================================
// PHASE 2 - OOP ARCHITECTURE
// ==================================================

console.log("\n========== PHASE 2 : OOP ARCHITECTURE ==========\n");

// --------------------------------------------------
// 6. STUDENT OBJECT
// --------------------------------------------------

console.log("6. CREATE STUDENT OBJECT");

const oopStudent = new Student(103, "Arun", "arun@gmail.com", "B2");

console.log(`Student: ${oopStudent.name}`);

console.log(`Role: ${oopStudent.getRole()}`);

console.log(`Batch: ${oopStudent.getBatch()}`);

// --------------------------------------------------
// 7. TRAINER OBJECT
// --------------------------------------------------

console.log("\n7. CREATE TRAINER OBJECT");

const trainer = new Trainer(201, "Meena", "meena@gmail.com", "TypeScript");

console.log(`Trainer: ${trainer.name}`);

console.log(`Role: ${trainer.getRole()}`);

console.log(`Specialization: ${trainer.getSpecialization()}`);

// --------------------------------------------------
// 8. POLYMORPHISM
// --------------------------------------------------

console.log("\n8. POLYMORPHISM");

const users: AbstractUser[] = [oopStudent, trainer];

users.forEach((user) => {
  console.log(`${user.name} -> ${user.getRole()}`);
});

// --------------------------------------------------
// 9. ENCAPSULATION
// --------------------------------------------------

console.log("\n9. ENCAPSULATION");

console.log(`Initial score: ${oopStudent.getScore()}`);

oopStudent.updateScore(90);

console.log(`Updated score: ${oopStudent.getScore()}`);

// --------------------------------------------------
// 10. READONLY
// --------------------------------------------------

console.log("\n10. READONLY");

console.log("Registration date:", oopStudent.registrationDate);

// ==================================================
// PHASE 3 - ASSESSMENT MODULE
// ==================================================

console.log("\n========== PHASE 3 : ASSESSMENT MODULE ==========\n");

const assessmentService = new AssessmentService();

const resultService = new ResultService();

// --------------------------------------------------
// 11. CREATE ASSESSMENT
// --------------------------------------------------

console.log("11. CREATE ASSESSMENT");

const assessment = assessmentService.createAssessment(
  "TypeScript Fundamentals",
  "Basic TypeScript Assessment",
  trainer.id,
);

console.log(`Assessment ID: ${assessment.id}`);

console.log(`Title: ${assessment.title}`);

console.log(`Status: ${assessment.status}`);

// --------------------------------------------------
// 12. ADD QUESTIONS
// --------------------------------------------------

console.log("\n12. ADD QUESTIONS");

const question1 = new Question(
  1,
  "Which language is TypeScript based on?",
  ["Java", "JavaScript", "Python", "C++"],
  "JavaScript",
  5,
  "EASY",
);

const question2 = new Question(
  2,
  "Which keyword is used to define a class?",
  ["object", "class", "struct", "define"],
  "class",
  5,
  "MEDIUM",
);

const question3 = new Question(
  3,
  "Which keyword creates a constant variable?",
  ["var", "let", "const", "static"],
  "const",
  5,
  "EASY",
);

assessmentService.addQuestion(assessment.id, question1);

assessmentService.addQuestion(assessment.id, question2);

assessmentService.addQuestion(assessment.id, question3);

console.log(`${assessment.questions.length} questions added`);

// --------------------------------------------------
// 13. UPDATE QUESTION
// --------------------------------------------------

console.log("\n13. UPDATE QUESTION");

const updatedQuestion = new Question(
  2,
  "Which keyword is used to create a class?",
  ["object", "class", "struct", "define"],
  "class",
  5,
  "MEDIUM",
);

assessmentService.updateQuestion(assessment.id, 2, updatedQuestion);

console.log("Question 2 updated successfully");

// --------------------------------------------------
// 14. DELETE QUESTION
// --------------------------------------------------

console.log("\n14. DELETE QUESTION");

const temporaryQuestion = new Question(
  4,
  "Temporary question",
  ["A", "B", "C", "D"],
  "A",
  5,
  "HARD",
);

assessmentService.addQuestion(assessment.id, temporaryQuestion);

assessmentService.deleteQuestion(assessment.id, 4);

console.log("Question 4 deleted successfully");

// --------------------------------------------------
// 15. ACTIVATE ASSESSMENT
// --------------------------------------------------

console.log("\n15. ACTIVATE ASSESSMENT");

assessmentService.activateAssessment(assessment.id);

console.log(`Assessment status: ${assessment.status}`);

// --------------------------------------------------
// 16. STUDENT ANSWERS
// --------------------------------------------------

console.log("\n16. STUDENT ANSWERS");

const answers = new Map<number, string>();

answers.set(1, "JavaScript");
answers.set(2, "class");
answers.set(3, "const");

answers.forEach((answer, questionId) => {
  console.log(`Question ${questionId}: ${answer}`);
});

// --------------------------------------------------
// 17. SUBMIT ASSESSMENT
// --------------------------------------------------

console.log("\n17. SUBMIT ASSESSMENT");

const result = resultService.submitAssessment(oopStudent, assessment, answers);

console.log("Assessment submitted successfully");

console.log(`Correct: ${result.correctAnswers}`);

console.log(`Wrong: ${result.wrongAnswers}`);

// ==================================================
// PHASE 4 - ADVANCED TYPESCRIPT
// ==================================================

console.log("\n========== PHASE 4 : ADVANCED TYPESCRIPT ==========\n");

// --------------------------------------------------
// 18. TYPE ALIAS
// --------------------------------------------------

console.log("18. TYPE ALIAS");

const currentStatus: AssessmentStatus = "ACTIVE";

const questionDifficulty: Difficulty = "HARD";

console.log(`Assessment Status: ${currentStatus}`);

console.log(`Question Difficulty: ${questionDifficulty}`);

// --------------------------------------------------
// 19. UNION TYPE
// --------------------------------------------------

console.log("\n19. UNION TYPE");

let studentScore: Score = null;

console.log(`Initial score: ${studentScore}`);

studentScore = 85;

console.log(`Updated score: ${studentScore}`);

// --------------------------------------------------
// 20. INTERSECTION TYPE
// --------------------------------------------------

console.log("\n20. INTERSECTION TYPE");

const performance: Performance = {
  percentage: 85,
  grade: "B",
  status: "PASSED",
};

const studentPerformance = oopStudent as StudentPerformance;

console.log(`Student: ${studentPerformance.name}`);

console.log(`Percentage: ${performance.percentage}%`);

console.log(`Grade: ${performance.grade}`);

console.log(`Status: ${performance.status}`);

// --------------------------------------------------
// 21. FUNCTION TYPE
// --------------------------------------------------

console.log("\n21. FUNCTION TYPE");

const scoreCalculator: ScoreCalculator = (obtainedMarks, totalMarks) => {
  if (totalMarks === 0) {
    return 0;
  }

  return (obtainedMarks / totalMarks) * 100;
};

const calculatedPercentage = scoreCalculator(18, 20);

console.log(`Calculated percentage: ${calculatedPercentage}%`);

// --------------------------------------------------
// 22. FUNCTION TYPE FROM MODULE
// --------------------------------------------------

console.log("\n22. PERCENTAGE FUNCTION");

const percentage = calculatePercentage(17, 20);

console.log(`Percentage: ${percentage}%`);

// --------------------------------------------------
// 23. UNION TYPE WITH NULL
// --------------------------------------------------

console.log("\n23. SCORE UNION TEST");

let optionalScore: Score = null;

console.log(`Before assessment: ${optionalScore}`);

optionalScore = 95;

console.log(`After assessment: ${optionalScore}`);

// --------------------------------------------------
// 24. CUSTOM ASSESSMENT EXCEPTION
// --------------------------------------------------

console.log("\n24. CUSTOM EXCEPTION");

try {
  assessmentService.addQuestion(
    assessment.id,
    new Question(5, "This should fail", ["A", "B", "C", "D"], "A", 5, "EASY"),
  );
} catch (error) {
  if (error instanceof AssessmentException) {
    console.log(`Assessment Error: ${error.message}`);
  } else {
    console.log("Unexpected assessment error");
  }
}

// --------------------------------------------------
// 25. LOGGER
// --------------------------------------------------

console.log("\n25. LOGGER");

Logger.info("Phase 4 advanced TypeScript testing started");

Logger.info(`Assessment ${assessment.id} activated`);

Logger.info(`Student ${oopStudent.id} submitted assessment`);

console.log("Application logs written successfully");

// --------------------------------------------------
// 26. QUESTION DIFFICULTY
// --------------------------------------------------

console.log("\n26. QUESTION DIFFICULTY");

assessment.questions.forEach((question) => {
  console.log(
    `Question ${question.id} | ` + `Difficulty: ${question.difficulty}`,
  );
});

// --------------------------------------------------
// 27. ASSESSMENT STATUS
// --------------------------------------------------

console.log("\n27. ASSESSMENT STATUS");

console.log(`Current status: ${assessment.status}`);

// --------------------------------------------------
// 28. RESULT
// --------------------------------------------------

console.log("\n28. RESULT");

console.log(`Student: ${result.student.name}`);

console.log(`Assessment: ${result.assessment.title}`);

console.log(`Correct answers: ${result.correctAnswers}`);

console.log(`Wrong answers: ${result.wrongAnswers}`);

console.log(`Percentage: ${result.percentage.toFixed(2)}%`);

console.log(`Grade: ${result.grade}`);

console.log(`Status: ${result.status}`);

// --------------------------------------------------
// 29. DECORATOR - SUCCESS
// --------------------------------------------------

console.log("\n29. DECORATOR - SUCCESSFUL AUDIT");

console.log("Calling createAssessment()...");

const auditedAssessment = assessmentService.createAssessment(
  "Advanced TypeScript",
  "Decorator testing assessment",
  trainer.id,
);

console.log(`Created assessment: ${auditedAssessment.title}`);

// --------------------------------------------------
// 30. DECORATOR - FAILURE
// --------------------------------------------------

console.log("\n30. DECORATOR - FAILED AUDIT");

try {
  assessmentService.createAssessment(
    "Invalid Trainer Assessment",
    "Testing decorator failure logging",
    999,
  );
} catch (error) {
  if (error instanceof StudentException) {
    console.log(`Expected error: ${error.message}`);
  } else {
    console.log("Unexpected error:", error);
  }
}

// --------------------------------------------------
// 31. DECORATOR + LOGGER
// --------------------------------------------------

console.log("\n31. DECORATOR LOG VERIFICATION");

Logger.info("Decorator testing completed");

console.log("Check logs/application.log for:");

console.log("- AUDIT START");

console.log("- AUDIT SUCCESS");

console.log("- AUDIT FAILED");

// ==================================================
// FINAL SUMMARY
// ==================================================

console.log("\n==============================================");

console.log(" PHASE 1 + PHASE 2 + PHASE 3 + PHASE 4");

console.log(" COMPLETED");

console.log("==============================================\n");
