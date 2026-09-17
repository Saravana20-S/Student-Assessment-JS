import { Student } from "../models/Student";

export class StudentService {

    private students: Student[] = [];

    addStudent(student: Student): void {
        this.students.push(student);

        console.log(
            `Student added successfully: ${student.name}`
        );
    }

    getAllStudents(): Student[] {
        return this.students;
    }

    getStudentById(id: number): Student | undefined {
        return this.students.find(
            student => student.id === id
        );
    }

    updateStudent(
        id: number,
        name: string,
        email: string,
        batch: string
    ): boolean {

        const student = this.getStudentById(id);

        if (!student) {
            return false;
        }

        student.name = name;
        student.email = email;
        student.batch = batch;

        return true;
    }

    deleteStudent(id: number): boolean {

        const index = this.students.findIndex(
            student => student.id === id
        );

        if (index === -1) {
            return false;
        }

        this.students.splice(index, 1);

        return true;
    }
}