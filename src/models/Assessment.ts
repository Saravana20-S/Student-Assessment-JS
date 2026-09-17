import { Question } from "./Question";
import { Trainer } from "./Trainer";

export class Assessment {
  public id: number;
  public title: string;
  public description: string;
  public trainer: Trainer;
  public questions: Question[];
  public status: string;

  constructor(
    id: number,
    title: string,
    description: string,
    trainer: Trainer,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.trainer = trainer;
    this.questions = [];
    this.status = "DRAFT";
  }

  public addQuestion(question: Question): void {
    this.questions.push(question);
  }

  public updateQuestion(questionId: number, updatedQuestion: Question): void {
    const index = this.questions.findIndex(
      (question) => question.id === questionId,
    );

    if (index === -1) {
      throw new Error(`Question with ID ${questionId} not found`);
    }

    this.questions[index] = updatedQuestion;
  }

  public deleteQuestion(questionId: number): void {
    const index = this.questions.findIndex(
      (question) => question.id === questionId,
    );

    if (index === -1) {
      throw new Error(`Question with ID ${questionId} not found`);
    }

    this.questions.splice(index, 1);
  }

  public activate(): void {
    if (this.questions.length === 0) {
      throw new Error("Assessment must contain at least one question");
    }

    this.status = "ACTIVE";
  }

  public getTotalMarks(): number {
    return this.questions.reduce(
      (total, question) => total + question.marks,
      0,
    );
  }
}
