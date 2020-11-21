import { User } from "../entities/User";

export interface iUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByUsername(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
