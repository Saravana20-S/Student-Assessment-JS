export class Question {
  public id: number;
  public questionText: string;
  public options: string[];
  public correctAnswer: string;
  public marks: number;

  constructor(
    id: number,
    questionText: string,
    options: string[],
    correctAnswer: string,
    marks: number,
  ) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.marks = marks;
  }

  public isCorrect(answer: string): boolean {
    return answer === this.correctAnswer;
  }
}
