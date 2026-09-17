import { Result } from "../models/Result";
import { Student } from "../models/Student";
import { Assessment } from "../models/Assessment";
import { Trainer } from "../models/Trainer";
import { Question } from "../models/Question";

import { FileHandler } from "../utils/FileHandler";
import { Logger } from "../utils/Logger";

import { AssessmentException } from "../exceptions/AssessmentException";

export class ResultService {
  private readonly filePath = "data/results.json";

  private results: Result[] = [];

  constructor() {
    this.loadResults();
  }

  // ==================================================
  // LOAD RESULTS
  // ==================================================

  private loadResults(): void {
    try {
      const resultData = FileHandler.readJson<any>(this.filePath);

      this.results = resultData.map((data: any) => {
        // --------------------------------
        // Reconstruct Student
        // --------------------------------

        const student = new Student(
          data.student.id,
          data.student.name,
          data.student.email,
          data.student.batch,
        );

        // --------------------------------
        // Reconstruct Trainer
        // --------------------------------

        const trainerData = data.assessment.trainer;

        const trainer = new Trainer(
          trainerData.id,
          trainerData.name,
          trainerData.email,
          trainerData.specialization,
        );

        // --------------------------------
        // Reconstruct Assessment
        // --------------------------------

        const assessment = new Assessment(
          data.assessment.id,
          data.assessment.title,
          data.assessment.description,
          trainer,
        );

        assessment.status = data.assessment.status;

        // --------------------------------
        // Reconstruct Questions
        // --------------------------------

        assessment.questions = (data.assessment.questions || []).map(
          (questionData: any) =>
            new Question(
              questionData.id,
              questionData.questionText,
              questionData.options,
              questionData.correctAnswer,
              questionData.marks,
              questionData.difficulty,
            ),
        );

        // --------------------------------
        // Reconstruct Result
        // --------------------------------

        const result = new Result(
          student,
          assessment,
          data.correctAnswers,
          data.wrongAnswers,
        );

        result.setScore(data.score ?? 0);

        result.percentage = data.percentage ?? 0;

        result.grade = data.grade ?? "";

        result.status = data.status ?? "FAILED";

        return result;
      });

      Logger.info(`Loaded ${this.results.length} results`);

      console.log(`Loaded ${this.results.length} results from JSON`);
    } catch (error) {
      Logger.error("Failed to load results");

      throw new AssessmentException("Unable to load results from JSON");
    }
  }

  // ==================================================
  // SAVE RESULTS
  // ==================================================

  private saveResults(): void {
    try {
      FileHandler.writeJson(this.filePath, this.results);

      Logger.info(`Saved ${this.results.length} results`);
    } catch (error) {
      Logger.error("Failed to save results");

      throw new AssessmentException("Unable to save results");
    }
  }

  // ==================================================
  // SUBMIT ASSESSMENT
  // ==================================================

  public submitAssessment(
    student: Student,
    assessment: Assessment,
    answers: Map<number, string>,
  ): Result {
    if (assessment.status !== "ACTIVE") {
      throw new AssessmentException("Assessment is not active");
    }

    let correctAnswers = 0;

    let wrongAnswers = 0;

    let score = 0;

    assessment.questions.forEach((question) => {
      const studentAnswer = answers.get(question.id);

      if (studentAnswer && question.isCorrect(studentAnswer)) {
        correctAnswers++;

        score += question.marks;
      } else {
        wrongAnswers++;
      }
    });

    const result = new Result(
      student,
      assessment,
      correctAnswers,
      wrongAnswers,
    );

    result.setScore(score);

    result.calculatePercentage();

    result.calculateGrade();

    result.calculateStatus();

    this.results.push(result);

    this.saveResults();

    Logger.info(
      `Result saved for student ${student.id} and assessment ${assessment.id}`,
    );

    return result;
  }

  // ==================================================
  // GET ALL RESULTS
  // ==================================================

  public getAllResults(): Result[] {
    return [...this.results];
  }

  // ==================================================
  // GET RESULTS BY STUDENT
  // ==================================================

  public getResultsByStudent(studentId: number): Result[] {
    return this.results.filter((result) => result.student.id === studentId);
  }

  // ==================================================
  // GET RESULTS BY ASSESSMENT
  // ==================================================

  public getResultsByAssessment(assessmentId: number): Result[] {
    return this.results.filter(
      (result) => result.assessment.id === assessmentId,
    );
  }
}
