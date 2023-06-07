import { Meal } from "../entities/meal";
import { MealRepository } from "../respositories/meal-repository";

interface GetMealUseCaseRequest {
  mealId: string;
  userId: string;
}

interface GetMealUseCaseResponse {
  meal: Meal;
}

export class GetMealUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({
    mealId,
    userId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }
    if (meal.userId !== userId) {
      throw new Error("Meal does not belongs to user");
    }
    return {
      meal,
    };
  }
}
