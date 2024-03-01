<template>
  <div class="w-full">
    <div class="mb-2 text-lg font-medium">Please select a meal</div>
    <ElFormItem class="w-full" prop="mealType">
      <ElSelect
        v-model:model-value="mealValue"
        :options="mealSelection"
        placeholder="Select a meal"
        class="w-full"
      >
        <ElOption
          v-for="item of mealSelection"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        ></ElOption>
      </ElSelect>
    </ElFormItem>
    <div class="mb-2">Please enter number of people</div>

    <ElFormItem prop="customerCount">
      <ElInputNumber v-model:model-value="peopleCount" :min="1" :max="10" />
    </ElFormItem>
  </div>
</template>
<script setup lang="ts">
import { MealType } from '@/interfaces';
import { ElSelectV2 } from 'element-plus';

const mealValue = defineModel<MealType | undefined>('mealType', { required: true });
const peopleCount = defineModel<number>('peopleCount');

const mealSelection = [
  {
    id: MealType.Breakfast,
    label: 'Breakfast',
  },
  {
    id: MealType.Lunch,
    label: 'Lunch',
  },
  {
    id: MealType.Dinner,
    label: 'Dinner',
  },
];
</script>
