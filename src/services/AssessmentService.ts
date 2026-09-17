import { Assessment } from "../models/Assessment";
import { Question } from "../models/Question";
import { Trainer } from "../models/Trainer";
import { AssessmentOperations } from "../interfaces/AssessmentOperations";
import { StudentException } from "../exceptions/StudentException";
import { AssessmentException } from "../exceptions/AssessmentException";
import { FileHandler } from "../utils/FileHandler";
import { Logger } from "../utils/Logger";
import { Audit } from "../decorators/Audit";
import { Difficulty } from "../types/AssessmentTypes";

export class AssessmentService implements AssessmentOperations {
  private readonly filePath = "data/assessments.json";

  private assessments: Assessment[] = [];

  private trainers: Trainer[] = [];

  private nextAssessmentId: number = 1;

  constructor() {
    // ------------------------------------------
    // Create default trainer
    // ------------------------------------------

    const trainer = new Trainer(201, "Meena", "meena@gmail.com", "TypeScript");

    this.trainers.push(trainer);

    // ------------------------------------------
    // Load assessments from JSON
    // ------------------------------------------

    this.loadAssessments();
  }

  // ==================================================
  // LOAD ASSESSMENTS
  // ==================================================

  private loadAssessments(): void {
    try {
      const assessmentData = FileHandler.readJson<any>(this.filePath);

      this.assessments = assessmentData.map((data: any) => {
        const trainerData = data.trainer;

        const trainer = new Trainer(
          trainerData.id,
          trainerData.name,
          trainerData.email,
          trainerData.specialization,
        );

        const assessment = new Assessment(
          data.id,
          data.title,
          data.description,
          trainer,
        );

        assessment.status = data.status;

        assessment.questions = (data.questions || []).map(
          (questionData: any) =>
            new Question(
              questionData.id,
              questionData.questionText,
              questionData.options,
              questionData.correctAnswer,
              questionData.marks,
              questionData.difficulty as Difficulty,
            ),
        );

        return assessment;
      });

      // ------------------------------------------
      // Generate next ID
      // ------------------------------------------

      if (this.assessments.length > 0) {
        const highestId = Math.max(
          ...this.assessments.map((assessment) => assessment.id),
        );

        this.nextAssessmentId = highestId + 1;
      }

      Logger.info(`Loaded ${this.assessments.length} assessments`);

      console.log(`Loaded ${this.assessments.length} assessments from JSON`);
    } catch (error) {
      Logger.error("Failed to load assessments");

      throw new AssessmentException("Unable to load assessments from JSON");
    }
  }

  // ==================================================
  // SAVE ASSESSMENTS
  // ==================================================

  private saveAssessments(): void {
    try {
      FileHandler.writeJson(this.filePath, this.assessments);

      Logger.info(`Saved ${this.assessments.length} assessments`);
    } catch (error) {
      Logger.error("Failed to save assessments");

      throw new AssessmentException("Unable to save assessments");
    }
  }

  // ==================================================
  // CREATE ASSESSMENT
  // ==================================================

  @Audit()
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
      throw new AssessmentException("Assessment title cannot be empty");
    }

    if (!description || description.trim().length === 0) {
      throw new AssessmentException("Assessment description cannot be empty");
    }

    const assessment = new Assessment(
      this.nextAssessmentId++,
      title,
      description,
      trainer,
    );

    this.assessments.push(assessment);

    this.saveAssessments();

    Logger.info(`Assessment created: ${assessment.id}`);

    return assessment;
  }

  // ==================================================
  // ADD QUESTION
  // ==================================================

  public addQuestion(assessmentId: number, question: Question): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.addQuestion(question);

    this.saveAssessments();

    Logger.info(`Question ${question.id} added to assessment ${assessmentId}`);
  }

  // ==================================================
  // UPDATE QUESTION
  // ==================================================

  public updateQuestion(
    assessmentId: number,
    questionId: number,
    question: Question,
  ): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.updateQuestion(questionId, question);

    this.saveAssessments();

    Logger.info(`Question ${questionId} updated in assessment ${assessmentId}`);
  }

  // ==================================================
  // DELETE QUESTION
  // ==================================================

  public deleteQuestion(assessmentId: number, questionId: number): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.deleteQuestion(questionId);

    this.saveAssessments();

    Logger.info(
      `Question ${questionId} deleted from assessment ${assessmentId}`,
    );
  }

  // ==================================================
  // ACTIVATE ASSESSMENT
  // ==================================================

  public activateAssessment(assessmentId: number): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.activate();

    this.saveAssessments();

    Logger.info(`Assessment ${assessmentId} activated`);
  }

  // ==================================================
  // COMPLETE ASSESSMENT
  // ==================================================

  public completeAssessment(assessmentId: number): void {
    const assessment = this.getAssessmentById(assessmentId);

    assessment.complete();

    this.saveAssessments();

    Logger.info(`Assessment ${assessmentId} completed`);
  }

  // ==================================================
  // GET ASSESSMENT BY ID
  // ==================================================

  public getAssessmentById(assessmentId: number): Assessment {
    const assessment = this.assessments.find(
      (assessment) => assessment.id === assessmentId,
    );

    if (!assessment) {
      throw new AssessmentException(
        `Assessment with ID ${assessmentId} not found`,
      );
    }

    return assessment;
  }

  // ==================================================
  // GET ALL ASSESSMENTS
  // ==================================================

  public getAllAssessments(): Assessment[] {
    return [...this.assessments];
  }

  // ==================================================
  // GET ACTIVE ASSESSMENTS
  // ==================================================

  public getActiveAssessments(): Assessment[] {
    return this.assessments.filter(
      (assessment) => assessment.status === "ACTIVE",
    );
  }

  // ==================================================
  // GET TRAINER
  // ==================================================

  public getTrainerById(trainerId: number): Trainer {
    const trainer = this.trainers.find((trainer) => trainer.id === trainerId);

    if (!trainer) {
      throw new StudentException(`Trainer with ID ${trainerId} not found`);
    }

    return trainer;
  }
}
