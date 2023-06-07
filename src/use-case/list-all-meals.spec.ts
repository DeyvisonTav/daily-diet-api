import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { CreateMealUseCase } from "./create-meal";
import { UpdateMealUseCase } from "./update-meal";
import { ListAllMealsUseCase } from "./list-all-meals";
import { User } from "../entities/user";
import { Meal } from "../entities/meal";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let sut: ListAllMealsUseCase;
let create: CreateMealUseCase;

describe("List all meals", () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    create = new CreateMealUseCase(inMemoryMealRepository);
    sut = new ListAllMealsUseCase(inMemoryMealRepository);
  });

  it("should list all meals", async () => {
    const user = User.create({
      name: "john doe",
      email: "test@test.com",
      password: "123456",
    });
    await inMemoryUserRepository.create(user);

    for (let i = 0; i < 3; i++) {
      await create.execute({
        userId: user.id.toValue(),
        name: `meal-test-${i}`,
        description: "meal-description",
        isDietary: true,
      });
    }

    const response = await sut.execute({ userId: user.id.toValue() });

    expect(response.meals.length).toBe(3);
  });
});
