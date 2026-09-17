import { StudentService } from "./services/StudentService";
import { StudentException } from "./exceptions/StudentException";
import { Student } from "./models/Student";
import { Trainer } from "./models/Trainer";
import { AbstractUser } from "./models/AbstractUser";

console.log("\n==============================================");

console.log(" STUDENT ASSESSMENT & PERFORMANCE SYSTEM");

console.log(" PHASE 2 - OOP ARCHITECTURE");

console.log("==============================================\n");

// ==================================================
// PHASE 1 - STUDENT MANAGEMENT
// ==================================================

console.log("========== PHASE 1 : STUDENT MANAGEMENT ==========\n");

const studentService = new StudentService();

try {
  // ----------------------------------------------
  // ADD STUDENTS
  // ----------------------------------------------

  console.log("1. ADD STUDENTS");

  const student1 = studentService.addStudent("Rahul", "rahul@gmail.com", "B1");

  console.log(`Student added: ${student1.name}`);

  const student2 = studentService.addStudent("Priya", "priya@gmail.com", "B1");

  console.log(`Student added: ${student2.name}`);

  // ----------------------------------------------
  // VIEW ALL STUDENTS
  // ----------------------------------------------

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

  // ----------------------------------------------
  // FIND STUDENT
  // ----------------------------------------------

  console.log("\n3. FIND STUDENT");

  const foundStudent = studentService.getStudentById(student1.id);

  console.log(`Found: ${foundStudent.name}`);

  // ----------------------------------------------
  // UPDATE STUDENT
  // ----------------------------------------------

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

  // ----------------------------------------------
  // UPDATE SCORE
  // ----------------------------------------------

  console.log("\n5. UPDATE STUDENT SCORE");

  updatedStudent.updateScore(85);

  console.log(`Student: ${updatedStudent.name}`);

  console.log(`Score: ${updatedStudent.getScore()}`);

  // ----------------------------------------------
  // DELETE STUDENT
  // ----------------------------------------------

  console.log("\n6. DELETE STUDENT");

  studentService.deleteStudent(student2.id);

  console.log(`Student ${student2.id} deleted successfully`);

  // ----------------------------------------------
  // FINAL STUDENT LIST
  // ----------------------------------------------

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
// CREATE STUDENT OBJECT
// --------------------------------------------------

console.log("8. CREATE STUDENT OBJECT");

const oopStudent = new Student(103, "Arun", "arun@gmail.com", "B2");

console.log(`Student: ${oopStudent.name}`);

console.log(`Role: ${oopStudent.getRole()}`);

console.log(`Batch: ${oopStudent.getBatch()}`);

// --------------------------------------------------
// CREATE TRAINER OBJECT
// --------------------------------------------------

console.log("\n9. CREATE TRAINER OBJECT");

const trainer = new Trainer(201, "Meena", "meena@gmail.com", "TypeScript");

console.log(`Trainer: ${trainer.name}`);

console.log(`Role: ${trainer.getRole()}`);

console.log(`Specialization: ${trainer.getSpecialization()}`);

// --------------------------------------------------
// COMMON USER DISPLAY
// --------------------------------------------------

console.log("\n10. DISPLAY USER INFORMATION");

oopStudent.displayUser();

trainer.displayUser();

// --------------------------------------------------
// POLYMORPHISM
// --------------------------------------------------

console.log("\n11. POLYMORPHISM TEST");

const users: AbstractUser[] = [oopStudent, trainer];

users.forEach((user) => {
  console.log(`${user.name} -> ${user.getRole()}`);
});

// --------------------------------------------------
// ENCAPSULATION TEST
// --------------------------------------------------

console.log("\n12. ENCAPSULATION TEST");

console.log(`Initial score: ${oopStudent.getScore()}`);

oopStudent.updateScore(90);

console.log(`Updated score: ${oopStudent.getScore()}`);

// --------------------------------------------------
// PROTECTED PROPERTY TEST
// --------------------------------------------------

console.log("\n13. PROTECTED PROPERTY TEST");

console.log(`Student batch through method: ` + `${oopStudent.getBatch()}`);

// --------------------------------------------------
// READONLY PROPERTY TEST
// --------------------------------------------------

console.log("\n14. READONLY PROPERTY TEST");

console.log("Registration date:", oopStudent.registrationDate);

// --------------------------------------------------
// TRAINER UPDATE
// --------------------------------------------------

console.log("\n15. UPDATE TRAINER SPECIALIZATION");

trainer.updateSpecialization("Advanced TypeScript");

console.log(`Updated specialization: ` + `${trainer.getSpecialization()}`);

console.log("\n==============================================");

console.log(" PHASE 1 + PHASE 2 COMPLETED");

console.log("==============================================\n");
