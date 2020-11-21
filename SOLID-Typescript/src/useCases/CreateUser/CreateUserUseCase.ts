import { User } from "../../entities/User";
import { iMailProvider } from "../../providers/iMailProvider";
import { iUsersRepository } from "../../repositories/iUsersRepository";
import { iCreateUsersRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: iUsersRepository, //add iUsersRepository to class methods
    private mailProvider: iMailProvider
  ) {}

  async execute(data: iCreateUsersRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Loudness",
        email: "loudness@gmail.com",
      },
      subject: "Welcome to Loudness platform",
      body: "<p> You can now use the app</p>",
    });
  }
}
