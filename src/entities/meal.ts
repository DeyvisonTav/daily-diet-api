import { Entity } from "../core/entities/entity";
import { Optional } from "../core/types/optional";

interface MealProps {
  mealId?: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  isDietary: boolean;
}

export class Meal extends Entity<MealProps> {
  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get name(): string {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get description(): string {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }
  get isDietary(): boolean {
    return this.props.isDietary;
  }
  set isDietary(isDietary: boolean) {
    this.props.isDietary = isDietary;
  }

  static create(props: Optional<MealProps, "createdAt">): Meal {
    const meal = new Meal({
      ...props,
      createdAt: new Date(),
    });
    return meal;
  }
}
