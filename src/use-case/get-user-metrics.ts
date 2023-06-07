import { MealRepository } from "../respositories/meal-repository";
import { format } from "date-fns";
interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  qtdMeals: number;
  qtdMealsInIsDietary: number;
  qtdMealsNotIsDietary: number;
  bestSequence: number;
}

export class GetUserMetricsUseCase {
  constructor(private mealRepository: MealRepository) {}
  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const meals = await this.mealRepository.findAllByUserId(userId);
    if (!meals) {
      throw new Error("Meals not found");
    }

    const qtdMeals = meals.length;
    const qtdMealsInIsDietary = meals.filter(
      (meal) => meal.isDietary === true
    ).length;

    const qtdMealsNotIsDietary = meals.filter(
      (meal) => meal.isDietary === false
    ).length;

    let bestSequence = 0;
    let currentSequence = 0;
    let currentDate = null;

    const sortedMeals = meals.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

    for (const meal of sortedMeals) {
      const mealDate = format(meal.createdAt, "yyyy-MM-dd");

      if (meal.isDietary && mealDate === currentDate) {
        currentSequence++;
      } else {
        currentSequence = 1;
        currentDate = mealDate;
      }

      bestSequence = Math.max(bestSequence, currentSequence);
      if (bestSequence === 1) {
        bestSequence = 0;
      }
    }

    return {
      qtdMeals,
      qtdMealsInIsDietary,
      qtdMealsNotIsDietary,
      bestSequence,
    };
  }
}
