import { User } from "../interfaces/User";

export abstract class AbstractUser implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}

  public abstract getRole(): string;

  public displayUser(): void {
    console.log(
      `ID: ${this.id} | ` +
        `Name: ${this.name} | ` +
        `Email: ${this.email} | ` +
        `Role: ${this.getRole()}`,
    );
  }
}
