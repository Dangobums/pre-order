<template>
  <div class="max-w-full">
    <div class="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
      <div class="mb-3 flex items-center">
        <span class="text-gray-700 font-bold mb-1">Meal:</span>
        <span
          class="text-center border-0 border-b border-solid py-1 px-3 text-gray-700 capitalize w-full ml-2 font-bold"
        >
          {{ formInfo.mealType }}
        </span>
      </div>
      <div class="mb-3 flex items-center">
        <span class="text-gray-700 font-bold whitespace-nowrap">Number of People:</span>
        <span
          class="text-center border-0 border-b border-solid py-1 px-3 text-gray-700 capitalize w-full ml-2 font-bold"
        >
          {{ formInfo.customerCount }}
        </span>
      </div>
      <div class="mb-3 flex items-center">
        <span class="text-gray-700 font-bold whitespace-nowrap">Restaurant:</span>
        <span
          class="text-center border-0 border-b border-solid py-1 px-3 text-gray-700 capitalize w-full ml-2 font-bold"
        >
          {{ formInfo.restaurant }}
        </span>
      </div>
      <div class="flex sm:items-center sm:flex-row flex-col">
        <span class="text-gray-700 font-bold mb-1">Dishes:</span>
        <ul class="flex-1 list-disc pl-8 shadow bg-white !bg-opacity-20 p-4 ml-2">
          <li v-for="dish of formInfo.dishes" :key="dish.id" class="text-gray-700">
            {{ idToName(dish.id) }} - {{ dish.serving }}
          </li>
        </ul>
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
