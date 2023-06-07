import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { UpdateMealUseCase } from "./update-meal";
import { User } from "../entities/user";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { CreateMealUseCase } from "./create-meal";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let sut: UpdateMealUseCase;
let create: CreateMealUseCase;
describe("Update Meal", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    create = new CreateMealUseCase(inMemoryMealRepository);
    sut = new UpdateMealUseCase(inMemoryMealRepository);
  });
  it("should update a meal", async () => {
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

    const name = "meal-test-update";
    const description = "meal-description-update";
    const isDietary = true;

    const response = await sut.execute({
      mealId: createMeal.meal.id.toValue(),
      name,
      description,
      isDietary,
      userId: user.id.toValue(),
    });
    expect(response.meal.name).toBe("meal-test-update");
    expect(response.meal.description).toBe("meal-description-update");
    expect(response.meal.isDietary).toBe(true);
  });
  it("should not update a meal if meal does not exists", async () => {
    await expect(
      sut.execute({
        userId: "user-id-not-exists",
        mealId: "meal-id-not-exists",
      })
    ).rejects.toThrow("meal does not belongs to user");
  });
});
