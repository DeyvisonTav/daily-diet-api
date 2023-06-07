import { Meal } from "../entities/meal";
import { MealRepository } from "../respositories/meal-repository";

interface UpdateMealUseCaseRequest {
  mealId: string;
  name?: string;
  description?: string;
  isDietary?: boolean;
  userId: string;
}

interface UpdateMealUseCaseResponse {
  meal: Meal;
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({
    mealId,
    description,
    isDietary,
    name,
    userId,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const mealAlreadyExists = await this.mealRepository.findById(mealId);

    if (userId !== mealAlreadyExists?.userId) {
      throw new Error("meal does not belongs to user");
    }

    if (!mealAlreadyExists) {
      throw new Error("meal does not exists");
    }

    if (name) {
      mealAlreadyExists.name = name;
    }
    if (description) {
      mealAlreadyExists.description = description;
    }
    if (isDietary) {
      mealAlreadyExists.isDietary = isDietary;
    }

    const meal = await this.mealRepository.update(mealAlreadyExists);

    return {
      meal,
    };
  }
}
