import { MealRepository } from "../respositories/meal-repository";

interface DeleteMealUseCaseRequest {
  mealId: string;
  usesrId: string;
}

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({ mealId, usesrId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealRepository.findById(mealId);
    if (!meal) {
      throw new Error("meal does not exists");
    }

    if (meal.userId !== usesrId) {
      throw new Error("meal does not belongs to user");
    }
    await this.mealRepository.delete(mealId);
  }
}
