import { Meal } from "../../src/entities/meal";
import { MealRepository } from "../../src/respositories/meal-repository";

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = [];

  async create(meal: Meal): Promise<Meal> {
    this.items.push(meal);
    return meal;
  }

  async findById(mealId: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id.toValue() === mealId);
    if (!meal) {
      return null;
    }
    return meal;
  }

  async update(meal: Meal): Promise<Meal> {
    const updateMeal = {
      name: meal.name,
      description: meal.description,
      isDietary: meal.isDietary,
    } as Meal;
    this.items.push(updateMeal);
    return updateMeal;
  }

  async delete(id: string): Promise<void> {
    const meal = this.items.find((item) => item.id.toValue() === id);
    if (!meal) {
      return;
    }
    const index = this.items.indexOf(meal);
    this.items.splice(index, 1);
  }
  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals = this.items.filter((item) => item.userId === userId);
    return meals;
  }
}
