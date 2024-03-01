<template>
  <div class="container mx-auto">
    <div class="rounded-md w-full">
      <div>
        <div class="bg-gray-200 p-4 rounded-md">
          <h3 class="font-semibold">Meal</h3>
          <p class="text-gray-500 capitalize">{{ formInfo.mealType }}</p>
        </div>
        <div class="bg-gray-200 p-4 rounded-md mt-4">
          <h3 class="font-semibold">Number of People</h3>
          <p class="text-gray-500">3</p>
        </div>
        <div class="bg-gray-200 p-4 rounded-md mt-4">
          <h3 class="font-semibold">Restaurant</h3>
          <p class="text-gray-500">{{ formInfo.restaurant }}</p>
        </div>
        <div class="bg-gray-200 p-4 rounded-md mt-4">
          <h3 class="font-semibold">Dishes</h3>
          <ul class="text-gray-500">
            <li v-for="dish of formInfo.dishes" :key="dish.id" class="mt-2 first:mt-0">
              {{ idToName(dish.id) }} - {{ dish.serving }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PreorderForm } from '@/constants';
import { DishesListDetail } from '@/interfaces';
import { find } from 'lodash';
import { inject } from 'vue';

interface Prop {
  formInfo: PreorderForm;
}

const dishesInfo = inject<DishesListDetail[]>('dishesInfo', []);

const props = defineProps<Prop>();

const idToName = (id?: number) => {
  if (!id) {
    return '';
  }

  return find(dishesInfo, (item) => item.id === id)?.name;
};
</script>
