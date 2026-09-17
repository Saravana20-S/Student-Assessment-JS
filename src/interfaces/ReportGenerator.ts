export interface ReportGenerator {
    generateStudentReport(
        studentId: number
    ): string;

    generateBatchReport(
        batch: string
    ): string;
}
