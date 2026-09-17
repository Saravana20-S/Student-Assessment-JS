// ==========================================
// SCORE CALCULATOR FUNCTION TYPE
// ==========================================

export type ScoreCalculator = (
  obtainedMarks: number,
  totalMarks: number,
) => number;

// ==========================================
// PERCENTAGE CALCULATOR
// ==========================================

export const calculatePercentage: ScoreCalculator = (
  obtainedMarks: number,
  totalMarks: number,
): number => {
  if (totalMarks === 0) {
    return 0;
  }

  return (obtainedMarks / totalMarks) * 100;
};
