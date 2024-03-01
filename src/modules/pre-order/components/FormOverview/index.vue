<template>
  <div class="max-w-full mx-auto p-5">
    <div class="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
      <div class="mb-3">
        <span class="block text-gray-700 text-sm font-bold mb-1">Meal:</span>
        <div class="bg-white shadow border rounded py-2 px-3 text-gray-700 capitalize">
          {{ formInfo.mealType }}
        </div>
      </div>
      <div class="mb-3">
        <span class="block text-gray-700 text-sm font-bold mb-1">Number of People:</span>
        <p class="bg-white shadow border rounded py-2 px-3 text-gray-700 leading-tight">
          {{ formInfo.customerCount }}
        </p>
      </div>
      <div class="mb-3">
        <span class="block text-gray-700 text-sm font-bold mb-1">Restaurant:</span>
        <p class="bg-white shadow border rounded py-2 px-3 text-gray-700 leading-tight">
          {{ formInfo.restaurant }}
        </p>
      </div>
      <div class="mb-3">
        <span class="block text-gray-700 text-sm font-bold mb-1">Dishes:</span>
        <ul class="list-disc pl-8">
          <li v-for="dish of formInfo.dishes" :key="dish.id" class="text-gray-700 text-sm">
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
