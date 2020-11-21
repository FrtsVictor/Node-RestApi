import { User } from "../entities/User";
import { iUsersRepository } from "./iUsersRepository";

export class PsqlUsersRepository implements iUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((usr) => usr.email === email);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((usr) => usr.username === username);
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
