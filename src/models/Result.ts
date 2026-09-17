import { Student } from "./Student";
import { Assessment } from "./Assessment";

import { Score } from "../types/AssessmentTypes";

export class Result {
  public student: Student;

  public assessment: Assessment;

  private score: Score;

  public correctAnswers: number;

  public wrongAnswers: number;

  public totalQuestions: number;

  public percentage: number;

  public grade: string;

  public status: string;

  constructor(
    student: Student,
    assessment: Assessment,
    correctAnswers: number,
    wrongAnswers: number,
  ) {
    this.student = student;
    this.assessment = assessment;

    this.correctAnswers = correctAnswers;

    this.wrongAnswers = wrongAnswers;

    this.totalQuestions = assessment.questions.length;

    this.score = null;

    this.percentage = 0;

    this.grade = "";

    this.status = "FAILED";
  }

  // ==========================================
  // SET SCORE
  // ==========================================

  public setScore(score: number): void {
    if (score < 0 || score > 100) {
      throw new Error("Score must be between 0 and 100");
    }

    this.score = score;
  }

  // ==========================================
  // GET SCORE
  // ==========================================

  public getScore(): number {
    if (this.score === null) {
      return 0;
    }

    return this.score;
  }

  // ==========================================
  // CALCULATE PERCENTAGE
  // ==========================================

  public calculatePercentage(): void {
    const totalMarks = this.assessment.getTotalMarks();

    if (totalMarks === 0) {
      this.percentage = 0;

      return;
    }

    this.percentage = (this.getScore() / totalMarks) * 100;
  }

  // ==========================================
  // CALCULATE GRADE
  // ==========================================

  public calculateGrade(): void {
    if (this.percentage >= 90) {
      this.grade = "A";
    } else if (this.percentage >= 75) {
      this.grade = "B";
    } else if (this.percentage >= 60) {
      this.grade = "C";
    } else if (this.percentage >= 40) {
      this.grade = "D";
    } else {
      this.grade = "F";
    }
  }

  // ==========================================
  // CALCULATE STATUS
  // ==========================================

  public calculateStatus(): void {
    if (this.percentage >= 40) {
      this.status = "PASSED";
    } else {
      this.status = "FAILED";
    }
  }
}
