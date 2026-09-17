import { Result } from "../models/Result";
import { Student } from "../models/Student";
import { Assessment } from "../models/Assessment";

export class ResultService {
  private results: Result[] = [];

  // ==========================================
  // SUBMIT ASSESSMENT
  // ==========================================

  public submitAssessment(
    student: Student,
    assessment: Assessment,
    answers: Map<number, string>,
  ): Result {
    if (assessment.status !== "ACTIVE") {
      throw new Error("Assessment is not active");
    }

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let score = 0;

    // ======================================
    // CHECK EACH QUESTION
    // ======================================

    assessment.questions.forEach((question) => {
      const studentAnswer = answers.get(question.id);

      if (studentAnswer && question.isCorrect(studentAnswer)) {
        correctAnswers++;

        score += question.marks;
      } else {
        wrongAnswers++;
      }
    });

    // ======================================
    // CREATE RESULT
    // ======================================

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

    return result;
  }

  // ==========================================
  // GET ALL RESULTS
  // ==========================================

  public getAllResults(): Result[] {
    return [...this.results];
  }

  // ==========================================
  // GET STUDENT RESULTS
  // ==========================================

  public getResultsByStudent(studentId: number): Result[] {
    return this.results.filter((result) => result.student.id === studentId);
  }

  // ==========================================
  // GET ASSESSMENT RESULTS
  // ==========================================

  public getResultsByAssessment(assessmentId: number): Result[] {
    return this.results.filter(
      (result) => result.assessment.id === assessmentId,
    );
  }
}
