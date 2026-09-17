import { Student } from "../models/Student";
import { FileHandler } from "../utils/FileHandler";
import { Logger } from "../utils/Logger";
import { Validator } from "../utils/Validator";
import { StudentException } from "../exceptions/StudentException";

export class StudentService {

    private readonly filePath =
        "data/students.json";

    private students: Student[] = [];

    constructor() {
        this.loadStudents();
    }

    private loadStudents(): void {

        try {

            const studentData =
                FileHandler.readJson<Student>(
                    this.filePath
                );

            this.students =
                studentData.map(
                    (student) =>
                        new Student(
                            student.id,
                            student.name,
                            student.email,
                            student.batch
                        )
                );

            Logger.info(
                `Loaded ${this.students.length} students`
            );

        } catch (error) {

            Logger.error(
                "Failed to load students"
            );

            throw error;
        }
    }

    private saveStudents(): void {

        FileHandler.writeJson(
            this.filePath,
            this.students
        );
    }

    public addStudent(
        name: string,
        email: string,
        batch: string
    ): Student {

        Validator.validateStudent(
            name,
            email,
            batch
        );

        const existingStudent =
            this.students.find(
                (student) =>
                    student.email === email
            );

        if (existingStudent) {
            throw new StudentException(
                "Student with this email already exists"
            );
        }

        const id =
            this.generateStudentId();

        const student =
            new Student(
                id,
                name,
                email,
                batch
            );

        this.students.push(student);

        this.saveStudents();

        Logger.info(
            `Student added successfully: ${student.id}`
        );

        return student;
    }

    public getAllStudents(): Student[] {

        return [...this.students];
    }

    public getStudentById(
        id: number
    ): Student {

        const student =
            this.students.find(
                (student) =>
                    student.id === id
            );

        if (!student) {

            Logger.error(
                `Student not found: ${id}`
            );

            throw new StudentException(
                `Student with ID ${id} not found`
            );
        }

        return student;
    }

    public updateStudent(
        id: number,
        name: string,
        email: string,
        batch: string
    ): Student {

        Validator.validateStudent(
            name,
            email,
            batch
        );

        const student =
            this.getStudentById(id);

        const duplicateEmail =
            this.students.find(
                (existingStudent) =>
                    existingStudent.email === email &&
                    existingStudent.id !== id
            );

        if (duplicateEmail) {
            throw new StudentException(
                "Another student already uses this email"
            );
        }

        student.updateDetails(
            name,
            email,
            batch
        );

        this.saveStudents();

        Logger.info(
            `Student updated successfully: ${id}`
        );

        return student;
    }

    public deleteStudent(
        id: number
    ): void {

        const studentIndex =
            this.students.findIndex(
                (student) =>
                    student.id === id
            );

        if (studentIndex === -1) {

            Logger.error(
                `Student not found for deletion: ${id}`
            );

            throw new StudentException(
                `Student with ID ${id} not found`
            );
        }

        this.students.splice(
            studentIndex,
            1
        );

        this.saveStudents();

        Logger.info(
            `Student deleted successfully: ${id}`
        );
    }

    private generateStudentId(): number {

        if (this.students.length === 0) {
            return 101;
        }

        const highestId =
            Math.max(
                ...this.students.map(
                    (student) => student.id
                )
            );

        return highestId + 1;
    }
}