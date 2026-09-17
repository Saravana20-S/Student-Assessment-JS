import { User } from "../interfaces/User";

export class Student implements User {

    public id: number;
    public name: string;
    public email: string;

    private score: number = 0;

    public batch: string;

    public readonly registrationDate: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        batch: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.batch = batch;
        this.registrationDate = new Date();
    }

    public updateScore(score: number): void {
        this.score = score;
    }

    public getScore(): number {
        return this.score;
    }

    public getBatch(): string {
        return this.batch;
    }

    public updateDetails(
        name: string,
        email: string,
        batch: string
    ): void {
        this.name = name;
        this.email = email;
        this.batch = batch;
    }
}