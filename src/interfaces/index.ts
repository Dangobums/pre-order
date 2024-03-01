export enum MealType {
  Lunch = 'lunch',
  Dinner = 'dinner',
  Breakfast = 'breakfast',
}

export interface DishesListDetail {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: MealType[];
}

export interface DishSelection {
  id: number | undefined;
  serving: number;
}
