// ==========================================
// ASSESSMENT STATUS
// ==========================================

export type AssessmentStatus = "DRAFT" | "ACTIVE" | "COMPLETED";

// ==========================================
// QUESTION DIFFICULTY
// ==========================================

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

// ==========================================
// SCORE
// ==========================================

export type Score = number | null;

// ==========================================
// PERFORMANCE
// ==========================================

export type Performance = {
  percentage: number;
  grade: string;
  status: string;
};
