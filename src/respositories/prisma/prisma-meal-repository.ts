import { Meal } from "../../entities/meal";
import { MealRepository } from "../meal-repository";
import { prisma } from "../../lib/prima";
export class PrismaMealRepository implements MealRepository {
  async create(meal: Meal): Promise<Meal> {
    const createMeal: any = await prisma.meal.create({
      data: {
        name: meal.name,
        description: meal.description,
        isDietary: meal.isDietary,
        userId: meal.userId,
      },
    });
    return createMeal;
  }
  async findById(MealId: string): Promise<Meal | null> {
    const meal: any = await prisma.meal.findUniqueOrThrow({
      where: { id: MealId },
    });
    return meal;
  }
  async delete(MealId: string): Promise<void> {
    await prisma.meal.delete({
      where: { id: MealId },
    });
  }
  async update(meal: Meal): Promise<Meal> {
    const updateMeal: any = await prisma.meal.update({
      where: { id: meal.id.toString() },
      data: {
        name: meal.name,
        description: meal.description,
        isDietary: meal.isDietary,
      },
    });
    return updateMeal;
  }
  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals: any = await prisma.meal.findMany({
      where: { userId },
    });
    return meals;
  }
}
