import { describe, it, expect, beforeEach } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { User } from "../entities/user";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let sut: CreateMealUseCase;
describe("Create Meal", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    sut = new CreateMealUseCase(inMemoryMealRepository);
  });
  it("should create a meal", async () => {
    const user = User.create({
      name: "john doe",
      email: "test@test.com",
      password: "123456",
    });

    inMemoryUserRepository.create(user);

    const response = await sut.execute({
      userId: user.id.toValue(),
      name: "meal-test",
      description: "meal-description",
      isDietary: true,
    });

    expect(response.meal.id).toBeTruthy();
  });
});
