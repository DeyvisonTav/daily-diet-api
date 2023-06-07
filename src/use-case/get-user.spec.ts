import { describe, it, expect, beforeEach } from "vitest";
import { User } from "../entities/user";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { GetUserUseCase } from "./get-user";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserUseCase;

describe("Get User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserUseCase(inMemoryUserRepository);
  });
  it("should be able get  user", async () => {
    const _user = User.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    inMemoryUserRepository.create(_user);

    const response = await sut.execute({
      id: _user.id.toValue(),
    });

    expect(response.user).toEqual(_user);
  });
});
