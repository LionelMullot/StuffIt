export class User {
  id: string;
  firstname: string;
  lastname: string;

  constructor(id: string, rawJson) {
    this.id = id;
    this.firstname = rawJson.firstname;
    this.lastname = rawJson.lastname;
  }

  getName(){
    return this.firstname + " " + this.lastname;
  }
}