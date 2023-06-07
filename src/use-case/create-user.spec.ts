import { describe, it, expect, beforeEach } from "vitest";
import { User } from "../entities/user";
import { CreateUseCase } from "./create-user";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateUseCase(inMemoryUserRepository);
  });
  it("should create a user", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "johndoe@test.com",
      password: "123456",
    });

    expect(response.user.id).toBeDefined();
  });
  it("should not create a user with an existing email", async () => {
    const email = "teste@teste.com";

    const _user = User.create({
      name: "John Doe",
      email,
      password: "123456",
    });

    inMemoryUserRepository.create(_user);

    await expect(
      sut.execute({
        name: "New John Doe",
        email,
        password: "123456",
      })
    ).rejects.toThrowError("User already exists");
  });
});
