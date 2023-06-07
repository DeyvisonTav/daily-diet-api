import { Meal } from "../entities/meal";

export abstract class MealRepository {
  abstract create(meal: Meal): Promise<Meal>;
  abstract findById(MealId: string): Promise<Meal | null>;
  abstract delete(MealId: string): Promise<void>;
  abstract update(meal: Meal): Promise<Meal>;
  abstract findAllByUserId(userId: string): Promise<Meal[]>;
}
