import { Assessment } from "../models/Assessment";
import { Question } from "../models/Question";

export interface AssessmentOperations {
  createAssessment(
    title: string,
    description: string,
    trainerId: number,
  ): Assessment;

  addQuestion(assessmentId: number, question: Question): void;

  updateQuestion(
    assessmentId: number,
    questionId: number,
    question: Question,
  ): void;

  deleteQuestion(assessmentId: number, questionId: number): void;

  activateAssessment(assessmentId: number): void;

  getAssessmentById(assessmentId: number): Assessment;

  getAllAssessments(): Assessment[];
}
