import { StudentException } from "../exceptions/StudentException";

export class Validator {

    public static validateStudent(
        name: string,
        email: string,
        batch: string
    ): void {

        if (!name || name.trim().length === 0) {
            throw new StudentException(
                "Student name cannot be empty"
            );
        }

        if (!email || email.trim().length === 0) {
            throw new StudentException(
                "Student email cannot be empty"
            );
        }

        if (!Validator.isValidEmail(email)) {
            throw new StudentException(
                "Invalid student email format"
            );
        }

        if (!batch || batch.trim().length === 0) {
            throw new StudentException(
                "Student batch cannot be empty"
            );
        }
    }

    public static isValidEmail(email: string): boolean {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }
}