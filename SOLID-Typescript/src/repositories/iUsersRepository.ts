import { User } from "../entities/User";

export interface iUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  save(user: User): Promise<void>;
}
