import { uuid } from "uuidv4";

export class User {
  public readonly id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  constructor(props: Omit<User, "id">, id?: string) {
    //optional id,
    Object.assign(this, props);
    //pass all props to the constructor one by one

    if (!id) {
      console.log(uuid);
      this.id = uuid();
    }
  }
}
