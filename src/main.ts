import { Student } from "./models/Student";
import { StudentService } from "./services/StudentService";

console.log("========================================");
console.log(" Student Assessment & Performance System");
console.log("========================================");

const studentService = new StudentService();

const student1 = new Student(
    101,
    "Rahul",
    "rahul@gmail.com",
    "B1"
);

const student2 = new Student(
    102,
    "Priya",
    "priya@gmail.com",
    "B1"
);

studentService.addStudent(student1);
studentService.addStudent(student2);

console.log("\nAll Students:");

console.log(studentService.getAllStudents());

console.log("\nFind Student:");

const student = studentService.getStudentById(101);

console.log(student);

console.log("\nUpdate Student:");

const updated = studentService.updateStudent(
    101,
    "Rahul Kumar",
    "rahulkumar@gmail.com",
    "B2"
);

console.log(
    updated
        ? "Student updated successfully"
        : "Student not found"
);

console.log(
    studentService.getStudentById(101)
);

console.log("\nDelete Student:");

const deleted = studentService.deleteStudent(102);

console.log(
    deleted
        ? "Student deleted successfully"
        : "Student not found"
);

console.log("\nFinal Students:");

console.log(studentService.getAllStudents());