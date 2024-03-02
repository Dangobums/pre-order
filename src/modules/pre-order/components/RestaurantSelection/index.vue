<template>
  <ElFormItem prop="restaurant">
    <div class="w-full">
      <span class="block font-medium text-lg mb-3">Please select a restaurant</span>
      <ElSelect v-model:model-value="restaurantSelection">
        <ElOption v-for="item of restaurantByMeal" :key="item" :value="item" :label="item"></ElOption>
      </ElSelect>
    </div>
  </ElFormItem>
</template>
<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { DishesListDetail, MealType } from '@/interfaces';
import { includes, isEmpty, reduce } from 'lodash';

interface Props {
  mealSelection: MealType | undefined;
}

const props = defineProps<Props>();
const dishesInfo = inject<DishesListDetail[]>('dishesInfo', []);
const restaurantSelection = defineModel<string>('restaurantSelection');

onMounted(() => {
  if (!includes(restaurantByMeal.value, restaurantSelection.value)) {
    restaurantSelection.value = undefined;
  }
});

const restaurantByMeal = computed(() => {
  if (isEmpty(dishesInfo)) {
    return [];
  }

  return reduce(
    dishesInfo,
    (restaurantArray: string[], dish: DishesListDetail) => {
      if (!props.mealSelection) {
        return restaurantArray;
      }

      if (!dish.availableMeals.includes(props.mealSelection)) {
        return restaurantArray;
      }

      if (!restaurantArray.includes(dish.restaurant)) {
        restaurantArray.push(dish.restaurant);
      }

      return restaurantArray;
    },
    [],
  );
});
</script>
