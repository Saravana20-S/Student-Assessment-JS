import { AbstractUser } from "./AbstractUser";

export class Student extends AbstractUser {
  private score: number = 0;

  public batch: string;

  public readonly registrationDate: Date;

  constructor(id: number, name: string, email: string, batch: string) {
    super(id, name, email);

    this.batch = batch;
    this.registrationDate = new Date();
  }

  public getRole(): string {
    return "STUDENT";
  }

  public updateScore(score: number): void {
    if (score < 0 || score > 100) {
      throw new Error("Score must be between 0 and 100");
    }

    this.score = score;
  }

  public getScore(): number {
    return this.score;
  }

  public getBatch(): string {
    return this.batch;
  }

  public updateDetails(name: string, email: string, batch: string): void {
    this.name = name;
    this.email = email;
    this.batch = batch;
  }
}
