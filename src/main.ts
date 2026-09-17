import { StudentService } from "./services/StudentService";
import { StudentException } from "./exceptions/StudentException";

const studentService = new StudentService();

console.log("\n========================================");

console.log(" STUDENT ASSESSMENT & PERFORMANCE SYSTEM");

console.log("========================================\n");

try {
  // ADD STUDENTS

  console.log("1. ADD STUDENTS");

  const student1 = studentService.addStudent("Rahul", "rahul@gmail.com", "B1");

  console.log(student1);

  const student2 = studentService.addStudent("Priya", "priya@gmail.com", "B1");

  console.log(student2);

  // VIEW STUDENTS

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

  // FIND STUDENT

  console.log("\n3. FIND STUDENT");

  const foundStudent = studentService.getStudentById(student1.id);

  console.log(foundStudent);

  // UPDATE STUDENT

  console.log("\n4. UPDATE STUDENT");

  const updatedStudent = studentService.updateStudent(
    student1.id,
    "Rahul Kumar",
    "rahulkumar@gmail.com",
    "B2",
  );

  console.log(updatedStudent);

  // DELETE STUDENT

  console.log("\n5. DELETE STUDENT");

  studentService.deleteStudent(student2.id);

  console.log(`Student ${student2.id} deleted successfully`);

  // FINAL STUDENT LIST

  console.log("\n6. FINAL STUDENT LIST");

  studentService.getAllStudents().forEach((student) => {
    console.log(
      `ID: ${student.id} | ` +
        `Name: ${student.name} | ` +
        `Email: ${student.email} | ` +
        `Batch: ${student.getBatch()}`,
    );
  });
} catch (error) {
  if (error instanceof StudentException) {
    console.error(`Student Error: ${error.message}`);
  } else {
    console.error("Unexpected error occurred", error);
  }
}
