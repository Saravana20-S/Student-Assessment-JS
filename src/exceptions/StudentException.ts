export class StudentException extends Error {

    constructor(message: string) {
        super(message);

        this.name = "StudentException";

        Object.setPrototypeOf(
            this,
            StudentException.prototype
        );
    }
}