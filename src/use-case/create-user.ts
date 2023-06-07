import { User } from "../entities/user";
import { UserRepository } from "../respositories/user-repository";
import { hash } from "bcrypt";

interface CreateUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUseCaseResponse {
  user: User;
}

export class CreateUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    email,
    name,
    password,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    const emailExists = userAlreadyExists?.email === email;

    if (emailExists) {
      throw new Error("User already exists");
    }

    const password_hash = await hash(password, 10);

    const _user = User.create({
      name,
      email,
      password: password_hash,
    });

    const user = await this.userRepository.create(_user);

    return {
      user,
    };
  }
}
