import { Difficulty } from "../types/AssessmentTypes";

export class Question {
  public id: number;

  public questionText: string;

  public options: string[];

  public correctAnswer: string;

  public marks: number;

  public difficulty: Difficulty;

  constructor(
    id: number,
    questionText: string,
    options: string[],
    correctAnswer: string,
    marks: number,
    difficulty: Difficulty = "MEDIUM",
  ) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.marks = marks;
    this.difficulty = difficulty;
  }

  public isCorrect(answer: string): boolean {
    return answer === this.correctAnswer;
  }
}
