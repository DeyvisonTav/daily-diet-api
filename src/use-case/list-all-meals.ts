import { Meal } from "../entities/meal";
import { MealRepository } from "../respositories/meal-repository";
interface ListAllMealsUseCaseRequest {
  userId: string;
}
interface ListAllMealsUseCaseResponse {
  meals: Meal[];
}

export class ListAllMealsUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({
    userId,
  }: ListAllMealsUseCaseRequest): Promise<ListAllMealsUseCaseResponse> {
    
    const meals = await this.mealRepository.findAllByUserId(userId);
    
    return {meals}; 
  }
}
