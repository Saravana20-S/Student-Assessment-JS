import { AbstractUser } from "./AbstractUser";

export class Trainer extends AbstractUser {
  private specialization: string;

  constructor(id: number, name: string, email: string, specialization: string) {
    super(id, name, email);

    this.specialization = specialization;
  }

  public getRole(): string {
    return "TRAINER";
  }

  public getSpecialization(): string {
    return this.specialization;
  }

  public updateSpecialization(specialization: string): void {
    this.specialization = specialization;
  }
}
