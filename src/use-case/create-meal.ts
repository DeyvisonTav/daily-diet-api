import { Meal } from "../entities/meal";
import { MealRepository } from "../respositories/meal-repository";

interface CreateMealUseCaseRequest {
  userId: string;
  name: string;
  description: string;
  isDietary: boolean;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({
    userId,
    name,
    description,
    isDietary,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const _meal = Meal.create({
      description,
      isDietary,
      name,
      userId,
    });
    const meal = await this.mealRepository.create(_meal);
    return {
      meal,
    };
  }
}
