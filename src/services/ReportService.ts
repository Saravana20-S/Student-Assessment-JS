import { StudentService } from "./StudentService";
import { AssessmentService } from "./AssessmentService";
import { ResultService } from "./ResultService";

import { ReportGenerator } from "../interfaces/ReportGenerator";

import { StudentException } from "../exceptions/StudentException";
import { AssessmentException } from "../exceptions/AssessmentException";

import { Logger } from "../utils/Logger";

export class ReportService implements ReportGenerator {
  constructor(
    private readonly studentService: StudentService,
    private readonly assessmentService: AssessmentService,
    private readonly resultService: ResultService,
  ) {}

  // ==================================================
  // STUDENT PERFORMANCE REPORT
  // ==================================================

  public generateStudentReport(studentId: number): string {
    const student = this.studentService.getStudentById(studentId);

    const studentResults = this.resultService.getResultsByStudent(studentId);

    if (studentResults.length === 0) {
      throw new AssessmentException(
        `No assessment results found for student ${studentId}`,
      );
    }

    const result = studentResults[studentResults.length - 1];

    const report = `
========================================
       STUDENT PERFORMANCE REPORT
========================================
Student ID       : ${student.id}
Student Name     : ${student.name}
Batch            : ${student.getBatch()}
Assessment       : ${result.assessment.title}
Total Questions  : ${result.totalQuestions}
Correct Answers  : ${result.correctAnswers}
Wrong Answers    : ${result.wrongAnswers}
Score            : ${result.getScore()}/${result.assessment.getTotalMarks()}
Percentage       : ${result.percentage.toFixed(2)}%
Grade            : ${result.grade}
Status           : ${result.status}
========================================
`;

    Logger.info(`Student report generated for student ${studentId}`);

    return report;
  }

  // ==================================================
  // BATCH PERFORMANCE REPORT
  // ==================================================

  public generateBatchReport(batch: string): string {
    const students = this.studentService
      .getAllStudents()
      .filter((student) => student.getBatch() === batch);

    if (students.length === 0) {
      throw new StudentException(`No students found in batch ${batch}`);
    }

    const studentIds = students.map((student) => student.id);

    const batchResults = this.resultService
      .getAllResults()
      .filter((result) => studentIds.includes(result.student.id));

    const totalStudents = students.length;

    const studentsAppeared = new Set(
      batchResults.map((result) => result.student.id),
    ).size;

    const studentsPassed = batchResults.filter(
      (result) => result.status === "PASSED",
    ).length;

    const studentsFailed = batchResults.filter(
      (result) => result.status === "FAILED",
    ).length;

    const scores = batchResults.map((result) => result.getScore());

    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

    const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

    const averageScore =
      scores.length > 0
        ? scores.reduce((total, score) => total + score, 0) / scores.length
        : 0;

    const passPercentage =
      studentsAppeared > 0 ? (studentsPassed / studentsAppeared) * 100 : 0;

    const report = `
========================================
           BATCH PERFORMANCE
========================================
Batch             : ${batch}
Total Students    : ${totalStudents}
Students Appeared : ${studentsAppeared}
Students Passed   : ${studentsPassed}
Students Failed   : ${studentsFailed}
Highest Score     : ${highestScore}
Lowest Score      : ${lowestScore}
Average Score     : ${averageScore.toFixed(2)}
Pass Percentage   : ${passPercentage.toFixed(2)}%
========================================
`;

    Logger.info(`Batch report generated for batch ${batch}`);

    return report;
  }

  // ==================================================
  // PERFORMANCE CLASSIFICATION
  // ==================================================

  public classifyPerformance(percentage: number): string {
    if (percentage >= 90) {
      return "EXCELLENT";
    }

    if (percentage >= 75) {
      return "VERY GOOD";
    }

    if (percentage >= 60) {
      return "GOOD";
    }

    if (percentage >= 40) {
      return "AVERAGE";
    }

    return "NEEDS IMPROVEMENT";
  }

  // ==================================================
  // AVERAGE SCORE
  // ==================================================

  public calculateAverageScore(studentId: number): number {
    const results = this.resultService.getResultsByStudent(studentId);

    if (results.length === 0) {
      return 0;
    }

    const totalScore = results.reduce(
      (total, result) => total + result.getScore(),
      0,
    );

    return totalScore / results.length;
  }

  // ==================================================
  // HIGHEST SCORE
  // ==================================================

  public calculateHighestScore(batch: string): number {
    const results = this.getBatchResults(batch);

    if (results.length === 0) {
      return 0;
    }

    return Math.max(...results.map((result) => result.getScore()));
  }

  // ==================================================
  // LOWEST SCORE
  // ==================================================

  public calculateLowestScore(batch: string): number {
    const results = this.getBatchResults(batch);

    if (results.length === 0) {
      return 0;
    }

    return Math.min(...results.map((result) => result.getScore()));
  }

  // ==================================================
  // PASS PERCENTAGE
  // ==================================================

  public calculatePassPercentage(batch: string): number {
    const results = this.getBatchResults(batch);

    if (results.length === 0) {
      return 0;
    }

    const passed = results.filter(
      (result) => result.status === "PASSED",
    ).length;

    return (passed / results.length) * 100;
  }

  // ==================================================
  // PRIVATE HELPER
  // ==================================================

  private getBatchResults(batch: string) {
    const students = this.studentService
      .getAllStudents()
      .filter((student) => student.getBatch() === batch);

    const studentIds = students.map((student) => student.id);

    return this.resultService
      .getAllResults()
      .filter((result) => studentIds.includes(result.student.id));
  }
}
