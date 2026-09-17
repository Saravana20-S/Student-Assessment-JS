import { StudentService } from "./services/StudentService";
import { AssessmentService } from "./services/AssessmentService";
import { ResultService } from "./services/ResultService";

import { StudentException } from "./exceptions/StudentException";

import { Student } from "./models/Student";
import { Trainer } from "./models/Trainer";
import { AbstractUser } from "./models/AbstractUser";
import { Question } from "./models/Question";

// ==================================================
// APPLICATION HEADER
// ==================================================

console.log("\n==============================================");

console.log(" STUDENT ASSESSMENT & PERFORMANCE SYSTEM");

console.log(" PHASE 3 - ASSESSMENT MODULE");

console.log("==============================================\n");

// ==================================================
// PHASE 1 - STUDENT MANAGEMENT
// ==================================================

console.log("========== PHASE 1 : STUDENT MANAGEMENT ==========\n");

const studentService = new StudentService();

let student1: Student;

try {
  // ------------------------------------------------
  // 1. ADD STUDENTS
  // ------------------------------------------------

  console.log("1. ADD STUDENTS");

  student1 = studentService.addStudent("Rahul", "rahul@gmail.com", "B1");

  console.log(`Student added: ${student1.name}`);

  const student2 = studentService.addStudent("Priya", "priya@gmail.com", "B1");

  console.log(`Student added: ${student2.name}`);

  // ------------------------------------------------
  // 2. VIEW ALL STUDENTS
  // ------------------------------------------------

  console.log("\n2. VIEW ALL STUDENTS");

  const students = studentService.getAllStudents();

  students.forEach((student) => {
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
  // 5. UPDATE STUDENT SCORE
  // ------------------------------------------------

  console.log("\n5. UPDATE STUDENT SCORE");

  updatedStudent.updateScore(85);

  console.log(`Student: ${updatedStudent.name}`);

  console.log(`Score: ${updatedStudent.getScore()}`);

  // ------------------------------------------------
  // 6. DELETE STUDENT
  // ------------------------------------------------

  console.log("\n6. DELETE STUDENT");

  studentService.deleteStudent(student2.id);

  console.log(`Student ${student2.id} deleted successfully`);

  // ------------------------------------------------
  // 7. FINAL STUDENT LIST
  // ------------------------------------------------

  console.log("\n7. FINAL STUDENT LIST");

  studentService.getAllStudents().forEach((student) => {
    console.log(
      `ID: ${student.id} | ` +
        `Name: ${student.name} | ` +
        `Email: ${student.email} | ` +
        `Batch: ${student.getBatch()} | ` +
        `Score: ${student.getScore()}`,
    );
  });
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
// 8. CREATE STUDENT OBJECT
// --------------------------------------------------

console.log("8. CREATE STUDENT OBJECT");

const oopStudent = new Student(103, "Arun", "arun@gmail.com", "B2");

console.log(`Student: ${oopStudent.name}`);

console.log(`Role: ${oopStudent.getRole()}`);

console.log(`Batch: ${oopStudent.getBatch()}`);

// --------------------------------------------------
// 9. CREATE TRAINER OBJECT
// --------------------------------------------------

console.log("\n9. CREATE TRAINER OBJECT");

const trainer = new Trainer(201, "Meena", "meena@gmail.com", "TypeScript");

console.log(`Trainer: ${trainer.name}`);

console.log(`Role: ${trainer.getRole()}`);

console.log(`Specialization: ${trainer.getSpecialization()}`);

// --------------------------------------------------
// 10. DISPLAY USER INFORMATION
// --------------------------------------------------

console.log("\n10. DISPLAY USER INFORMATION");

oopStudent.displayUser();

trainer.displayUser();

// --------------------------------------------------
// 11. POLYMORPHISM
// --------------------------------------------------

console.log("\n11. POLYMORPHISM TEST");

const users: AbstractUser[] = [oopStudent, trainer];

users.forEach((user) => {
  console.log(`${user.name} -> ${user.getRole()}`);
});

// --------------------------------------------------
// 12. ENCAPSULATION
// --------------------------------------------------

console.log("\n12. ENCAPSULATION TEST");

console.log(`Initial score: ${oopStudent.getScore()}`);

oopStudent.updateScore(90);

console.log(`Updated score: ${oopStudent.getScore()}`);

// --------------------------------------------------
// 13. PROTECTED PROPERTY
// --------------------------------------------------

console.log("\n13. PROTECTED PROPERTY TEST");

console.log(`Student batch through method: ` + `${oopStudent.getBatch()}`);

// --------------------------------------------------
// 14. READONLY PROPERTY
// --------------------------------------------------

console.log("\n14. READONLY PROPERTY TEST");

console.log("Registration date:", oopStudent.registrationDate);

// --------------------------------------------------
// 15. UPDATE TRAINER SPECIALIZATION
// --------------------------------------------------

console.log("\n15. UPDATE TRAINER SPECIALIZATION");

trainer.updateSpecialization("Advanced TypeScript");

console.log(`Updated specialization: ` + `${trainer.getSpecialization()}`);

// ==================================================
// PHASE 3 - ASSESSMENT MODULE
// ==================================================

console.log("\n========== PHASE 3 : ASSESSMENT MODULE ==========\n");

const assessmentService = new AssessmentService();

const resultService = new ResultService();

// --------------------------------------------------
// 16. CREATE ASSESSMENT
// --------------------------------------------------

console.log("16. CREATE ASSESSMENT");

const assessment = assessmentService.createAssessment(
  "TypeScript Fundamentals",
  "Basic TypeScript Assessment",
  trainer.id,
);

console.log(`Assessment created successfully`);

console.log(`Assessment ID: ${assessment.id}`);

console.log(`Title: ${assessment.title}`);

console.log(`Description: ${assessment.description}`);

console.log(`Trainer: ${assessment.trainer.name}`);

console.log(`Status: ${assessment.status}`);

// --------------------------------------------------
// 17. ADD QUESTIONS
// --------------------------------------------------

console.log("\n17. ADD QUESTIONS");

const question1 = new Question(
  1,
  "Which language is TypeScript based on?",
  ["Java", "JavaScript", "Python", "C++"],
  "JavaScript",
  5,
);

const question2 = new Question(
  2,
  "Which keyword is used to define a class?",
  ["object", "class", "struct", "define"],
  "class",
  5,
);

const question3 = new Question(
  3,
  "Which keyword creates a constant variable?",
  ["var", "let", "const", "static"],
  "const",
  5,
);

assessmentService.addQuestion(assessment.id, question1);

assessmentService.addQuestion(assessment.id, question2);

assessmentService.addQuestion(assessment.id, question3);

console.log(`${assessment.questions.length} questions added`);

// --------------------------------------------------
// 18. VIEW QUESTIONS
// --------------------------------------------------

console.log("\n18. VIEW QUESTIONS");

assessment.questions.forEach((question) => {
  console.log(`Question ID: ${question.id}`);

  console.log(`Question: ${question.questionText}`);

  console.log(`Options: ${question.options.join(", ")}`);

  console.log(`Marks: ${question.marks}`);

  console.log(`Correct Answer: ${question.correctAnswer}`);

  console.log("-----------------------------");
});

// --------------------------------------------------
// 19. UPDATE QUESTION
// --------------------------------------------------

console.log("\n19. UPDATE QUESTION");

const updatedQuestion = new Question(
  2,
  "Which keyword is used to create a class in TypeScript?",
  ["object", "class", "struct", "define"],
  "class",
  10,
);

assessmentService.updateQuestion(assessment.id, 2, updatedQuestion);

console.log("Question 2 updated successfully");

console.log(`Updated marks: ${assessment.questions[1].marks}`);

// --------------------------------------------------
// 20. DELETE QUESTION
// --------------------------------------------------

console.log("\n20. DELETE QUESTION");

const temporaryQuestion = new Question(
  4,
  "Temporary question",
  ["A", "B", "C", "D"],
  "A",
  5,
);

assessmentService.addQuestion(assessment.id, temporaryQuestion);

console.log(`Questions before deletion: ` + `${assessment.questions.length}`);

assessmentService.deleteQuestion(assessment.id, 4);

console.log(`Questions after deletion: ` + `${assessment.questions.length}`);

console.log("Question 4 deleted successfully");

// --------------------------------------------------
// 21. TOTAL MARKS
// --------------------------------------------------

console.log("\n21. CALCULATE TOTAL MARKS");

console.log(`Total marks: ${assessment.getTotalMarks()}`);

// --------------------------------------------------
// 22. ACTIVATE ASSESSMENT
// --------------------------------------------------

console.log("\n22. ACTIVATE ASSESSMENT");

assessmentService.activateAssessment(assessment.id);

console.log(`Assessment status: ${assessment.status}`);

// --------------------------------------------------
// 23. VIEW AVAILABLE ASSESSMENTS
// --------------------------------------------------

console.log("\n23. VIEW AVAILABLE ASSESSMENTS");

const availableAssessments = assessmentService.getActiveAssessments();

availableAssessments.forEach((availableAssessment) => {
  console.log(
    `ID: ${availableAssessment.id} | ` +
      `Title: ${availableAssessment.title} | ` +
      `Status: ${availableAssessment.status}`,
  );
});

// --------------------------------------------------
// 24. STUDENT STARTS ASSESSMENT
// --------------------------------------------------

console.log("\n24. STUDENT STARTS ASSESSMENT");

const activeAssessment = assessmentService.getAssessmentById(assessment.id);

console.log(`${oopStudent.name} started: ` + `${activeAssessment.title}`);

console.log(`Total questions: ` + `${activeAssessment.questions.length}`);

// --------------------------------------------------
// 25. STUDENT ANSWERS QUESTIONS
// --------------------------------------------------

console.log("\n25. STUDENT ANSWERS QUESTIONS");

const answers = new Map<number, string>();

answers.set(1, "JavaScript");

answers.set(2, "class");

answers.set(3, "const");

answers.forEach((answer, questionId) => {
  console.log(`Question ${questionId} -> ` + `Student Answer: ${answer}`);
});

// --------------------------------------------------
// 26. SUBMIT ASSESSMENT
// --------------------------------------------------

console.log("\n26. SUBMIT ASSESSMENT");

const result = resultService.submitAssessment(
  oopStudent,
  activeAssessment,
  answers,
);

console.log("Assessment submitted successfully");

// --------------------------------------------------
// 27. DISPLAY RESULT
// --------------------------------------------------

console.log("\n27. DISPLAY RESULT");

console.log(`Student: ${result.student.name}`);

console.log(`Assessment: ${result.assessment.title}`);

console.log(`Total Questions: ${result.totalQuestions}`);

console.log(`Correct Answers: ${result.correctAnswers}`);

console.log(`Wrong Answers: ${result.wrongAnswers}`);

console.log(`Score: ${result.getScore()}`);

console.log(`Percentage: ${result.percentage.toFixed(2)}%`);

console.log(`Grade: ${result.grade}`);

console.log(`Status: ${result.status}`);

// --------------------------------------------------
// 28. VIEW ALL RESULTS
// --------------------------------------------------

console.log("\n28. VIEW ALL RESULTS");

const results = resultService.getAllResults();

results.forEach((studentResult) => {
  console.log(
    `Student: ${studentResult.student.name} | ` +
      `Assessment: ${studentResult.assessment.title} | ` +
      `Score: ${studentResult.getScore()} | ` +
      `Percentage: ${studentResult.percentage.toFixed(2)}% | ` +
      `Grade: ${studentResult.grade} | ` +
      `Status: ${studentResult.status}`,
  );
});

// --------------------------------------------------
// 29. VIEW STUDENT RESULTS
// --------------------------------------------------

console.log("\n29. VIEW STUDENT RESULTS");

const studentResults = resultService.getResultsByStudent(oopStudent.id);

studentResults.forEach((studentResult) => {
  console.log(`Assessment: ${studentResult.assessment.title}`);

  console.log(`Score: ${studentResult.getScore()}`);

  console.log(`Percentage: ` + `${studentResult.percentage.toFixed(2)}%`);

  console.log(`Grade: ${studentResult.grade}`);

  console.log(`Status: ${studentResult.status}`);
});

// ==================================================
// FINAL SUMMARY
// ==================================================

console.log("\n==============================================");

console.log(" PHASE 1 + PHASE 2 + PHASE 3 COMPLETED");

console.log("==============================================\n");
