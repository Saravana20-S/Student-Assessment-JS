export class AssessmentException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AssessmentException";

    Object.setPrototypeOf(this, AssessmentException.prototype);
  }
}
