import { it, describe, expect, beforeEach } from "vitest";
import { GetMealUseCase } from "./get-meal";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { User } from "../entities/user";
import { Meal } from "../entities/meal";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let sut: GetMealUseCase;
describe("Get Meal", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    sut = new GetMealUseCase(inMemoryMealRepository);
  });
  it("should return a meal", async () => {
    const user = User.create({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });
    inMemoryUserRepository.create(user);
    const meal = Meal.create({
      userId: user.id.toValue(),
      name: "any_name",
      description: "any_description",
      isDietary: true,
    });
    inMemoryMealRepository.create(meal);
    const response = await sut.execute({
      mealId: meal.id.toValue(),
      userId: user.id.toValue(),
    });

    expect(response.meal).toEqual(meal);
  });
});
