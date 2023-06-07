import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMealRepository } from "../../test/repositories/in-memory-meal-repository";
import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { CreateMealUseCase } from "./create-meal";

import { User } from "../entities/user";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryMealRepository: InMemoryMealRepository;
let sut: GetUserMetricsUseCase;
let create: CreateMealUseCase;

describe("get user metrics", () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryMealRepository = new InMemoryMealRepository();
    create = new CreateMealUseCase(inMemoryMealRepository);
    sut = new GetUserMetricsUseCase(inMemoryMealRepository);
  });

  it("should be able return metrics", async () => {
    const user = User.create({
      name: "john doe",
      email: "test@test.com",
      password: "123456",
    });
    await inMemoryUserRepository.create(user);

    for (let i = 0; i < 5; i++) {
      await create.execute({
        userId: user.id.toValue(),
        name: `meal-test-${i}`,
        description: "meal-description",
        isDietary: true,
      });
    }

    const response = await sut.execute({ userId: user.id.toValue() });
    expect(response.qtdMeals).toBe(5);
    expect(response.qtdMealsInIsDietary).toBe(5);
    expect(response.qtdMealsNotIsDietary).toBe(0);
    expect(response.bestSequence).toBe(5);
  });
});
