import { User } from "../entities/user";
import { UserRepository } from "../respositories/user-repository";
import { UniqueEntityId } from "../value-object/unique-entity-id";

interface GetUserUseCaseRequest {
  id: string;
}

interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return {
      user,
    };
  }
}
