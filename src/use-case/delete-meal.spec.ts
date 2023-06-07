import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { CreateMealUseCase } from "./create-meal";
import { DeleteMealUseCase } from "./delete-meal";
import { User } from "../entities/user";
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let create: CreateMealUseCase;
let sut: DeleteMealUseCase;
describe("Delete Meal", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    create = new CreateMealUseCase(inMemoryMealRepository);
    sut = new DeleteMealUseCase(inMemoryMealRepository);
  });
  it("should delete a meal", async () => {
    const user = User.create({
      name: "john doe",
      email: "test@test.com",
      password: "123456",
    });
    inMemoryUserRepository.create(user);
    const createMeal = await create.execute({
      userId: user.id.toValue(),
      name: "meal-test",
      description: "meal-description",
      isDietary: true,
    });
    const response = await sut.execute({
      mealId: createMeal.meal.id.toValue(),
      usesrId: user.id.toValue(),
    });

    expect(response).toBe(undefined);
  });
});
