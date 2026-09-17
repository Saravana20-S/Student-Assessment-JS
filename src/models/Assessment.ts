import { Question } from "./Question";
import { Trainer } from "./Trainer";

import { AssessmentStatus } from "../types/AssessmentTypes";

import { AssessmentException } from "../exceptions/AssessmentException";

export class Assessment {
  public id: number;

  public title: string;

  public description: string;

  public trainer: Trainer;

  public questions: Question[];

  public status: AssessmentStatus;

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

  // ==========================================
  // ADD QUESTION
  // ==========================================

  public addQuestion(question: Question): void {
    if (this.status !== "DRAFT") {
      throw new AssessmentException(
        "Questions can only be added to a draft assessment",
      );
    }

    this.questions.push(question);
  }

  // ==========================================
  // UPDATE QUESTION
  // ==========================================

  public updateQuestion(questionId: number, updatedQuestion: Question): void {
    if (this.status !== "DRAFT") {
      throw new AssessmentException(
        "Questions can only be updated in a draft assessment",
      );
    }

    const index = this.questions.findIndex(
      (question) => question.id === questionId,
    );

    if (index === -1) {
      throw new AssessmentException(`Question with ID ${questionId} not found`);
    }

    this.questions[index] = updatedQuestion;
  }

  // ==========================================
  // DELETE QUESTION
  // ==========================================

  public deleteQuestion(questionId: number): void {
    if (this.status !== "DRAFT") {
      throw new AssessmentException(
        "Questions can only be deleted from a draft assessment",
      );
    }

    const index = this.questions.findIndex(
      (question) => question.id === questionId,
    );

    if (index === -1) {
      throw new AssessmentException(`Question with ID ${questionId} not found`);
    }

    this.questions.splice(index, 1);
  }

  // ==========================================
  // ACTIVATE
  // ==========================================

  public activate(): void {
    if (this.questions.length === 0) {
      throw new AssessmentException(
        "Assessment must contain at least one question",
      );
    }

    this.status = "ACTIVE";
  }

  // ==========================================
  // COMPLETE
  // ==========================================

  public complete(): void {
    if (this.status !== "ACTIVE") {
      throw new AssessmentException(
        "Only an active assessment can be completed",
      );
    }

    this.status = "COMPLETED";
  }

  // ==========================================
  // TOTAL MARKS
  // ==========================================

  public getTotalMarks(): number {
    return this.questions.reduce(
      (total, question) => total + question.marks,
      0,
    );
  }
}
