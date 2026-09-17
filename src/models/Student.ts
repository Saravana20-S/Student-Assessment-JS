export class Student {
  public id: number;
  public name: string;
  public email: string;
  public batch: string;

  constructor(id: number, name: string, email: string, batch: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.batch = batch;
  }
}
