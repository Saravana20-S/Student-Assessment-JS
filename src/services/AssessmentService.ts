import { Assessment } from "../models/Assessment";
import { Question } from "../models/Question";
import { Trainer } from "../models/Trainer";
import { AssessmentOperations } from "../interfaces/AssessmentOperations";
import { StudentException } from "../exceptions/StudentException";

export class AssessmentService implements AssessmentOperations {
  private assessments: Assessment[] = [];

  private trainers: Trainer[] = [];

  private nextAssessmentId: number = 1;

  constructor() {
    // Sample trainer for Phase 3 testing
    const trainer = new Trainer(201, "Meena", "meena@gmail.com", "TypeScript");

    this.trainers.push(trainer);
  }

  // ==========================================
  // CREATE ASSESSMENT
  // ==========================================

  public createAssessment(
    title: string,
    description: string,
    trainerId: number,
  ): Assessment {
    const trainer = this.trainers.find((trainer) => trainer.id === trainerId);

    if (!trainer) {
      throw new StudentException(`Trainer with ID ${trainerId} not found`);
    }

    if (!title || title.trim().length === 0) {
      throw new Error("Assessment title cannot be empty");
    }

    if (!description || description.trim().length === 0) {
      throw new Error("Assessment description cannot be empty");
    }

    const assessment = new Assessment(
      this.nextAssessmentId++,
      title,
      description,
      trainer,
    );

    this.assessments.push(assessment);

    return assessment;
  }

  // ==========================================
  // ADD QUESTION
  // ==========================================

  public addQuestion(assessmentId: number, question: Question): void {
    const assessment = this.getAssessmentById(assessmentId);

    if (assessment.status !== "DRAFT") {
      throw new Error("Questions can only be added to a draft assessment");
    }

    assessment.addQuestion(question);
  }

  // ==========================================
  // UPDATE QUESTION
  // ==========================================

  public updateQuestion(
    assessmentId: number,
    questionId: number,
    question: Question,
  ): void {
    const assessment = this.getAssessmentById(assessmentId);

    if (assessment.status !== "DRAFT") {
      throw new Error("Questions can only be updated in a draft assessment");
    }

    assessment.updateQuestion(questionId, question);
  }

  // ==========================================
  // DELETE QUESTION
  // ==========================================

  public deleteQuestion(assessmentId: number, questionId: number): void {
    const assessment = this.getAssessmentById(assessmentId);

    if (assessment.status !== "DRAFT") {
      throw new Error("Questions can only be deleted from a draft assessment");
    }

    assessment.deleteQuestion(questionId);
  }

  // ==========================================
  // ACTIVATE ASSESSMENT
  // ==========================================

  public activateAssessment(assessmentId: number): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.activate();
  }

  // ==========================================
  // GET ASSESSMENT BY ID
  // ==========================================

  public getAssessmentById(assessmentId: number): Assessment {
    const assessment = this.assessments.find(
      (assessment) => assessment.id === assessmentId,
    );

    if (!assessment) {
      throw new Error(`Assessment with ID ${assessmentId} not found`);
    }

    return assessment;
  }

  // ==========================================
  // GET ALL ASSESSMENTS
  // ==========================================

  public getAllAssessments(): Assessment[] {
    return [...this.assessments];
  }

  // ==========================================
  // GET ACTIVE ASSESSMENTS
  // ==========================================

  public getActiveAssessments(): Assessment[] {
    return this.assessments.filter(
      (assessment) => assessment.status === "ACTIVE",
    );
  }

  // ==========================================
  // GET TRAINER
  // ==========================================

  public getTrainerById(trainerId: number): Trainer {
    const trainer = this.trainers.find((trainer) => trainer.id === trainerId);

    if (!trainer) {
      throw new StudentException(`Trainer with ID ${trainerId} not found`);
    }

    return trainer;
  }
}
