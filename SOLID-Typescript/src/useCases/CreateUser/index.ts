import { MailtrapMailProvider } from "../../providers/implementation/MailProvider";
import { PsqlUsersRepository } from "../../repositories/PsqlUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const psqlUsersRepository = new PsqlUsersRepository();
const mailTrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  psqlUsersRepository,
  mailTrapMailProvider
);
//implementation of code, where do actions

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
