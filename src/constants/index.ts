import { MealType, DishSelection } from '@/interfaces';

export class PreorderForm {
  mealType?: MealType;
  customerCount: number = 1;
  restaurant?: string;
  dishes: DishSelection[] = [
    {
      id: undefined,
      serving: 1,
    },
  ];
}
