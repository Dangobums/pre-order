<template>
  <div class="overflow-hidden p-10 h-full bg-teal-100">
    <div class="bg-orange-100 !bg-opacity-40 rounded-lg p-8 shadow-xl max-w-96 m-auto">
      <ElSteps :active="currentStep" finish-status="success" align-center>
        <ElStep v-for="step of STEP_LIST" :key="step.id" :title="step.title" />
      </ElSteps>
      <ElForm ref="ruleFormRef" :rules="rules" :model="mealForm">
        <Transition name="nested" :duration="{ enter: 500, leave: 10 }">
          <div v-if="currentStep === FORM_STEP.MEAL" class="outer m-4 rounded">
            <MealSelection
              v-model:mealType="mealForm.mealType"
              v-model:peopleCount="mealForm.customerCount"
              class="inner"
            />
          </div>

          <div v-else-if="currentStep === FORM_STEP.RESTAURANT" class="outer m-4 rounded">
            <RestaurantSelection
              v-model:restaurantSelection="mealForm.restaurant"
              class="inner"
              :mealSelection="mealForm.mealType"
            />
          </div>
          <div v-else-if="currentStep === FORM_STEP.DISHED" class="outer m-4 rounded">
            <CreateDishList
              v-model:dishSelection="mealForm.dishes"
              class="inner"
              :restaurant="mealForm.restaurant"
            />
          </div>
          <div v-else-if="currentStep === FORM_STEP.SUBMIT" class="outer rounded">
            <FormOverview class="inner" :formInfo="mealForm" />
          </div>
        </Transition>
      </ElForm>
      <div class="flex items-center justify-between text-primary-gray mt-3">
        <el-button v-if="currentStep > FORM_STEP.MEAL" class="text-primary-gray" color="#FFECB3" @click="prev"
          >Previous
        </el-button>
        <el-button class="text-primary-gray" color="green" @click="submitForm(ruleFormRef)">
          {{ currentStep !== FORM_STEP.SUBMIT ? 'Next' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref, watch } from 'vue';
import { PreorderForm } from '@/constants';
import { MealSelection, RestaurantSelection, CreateDishList, FormOverview } from './components';
import type { FormInstance, FormRules } from 'element-plus';
import { dishes } from '@/data/dishes.json';
import { reduce, size } from 'lodash';
import { DishSelection } from '@/interfaces';
import { ElNotification } from 'element-plus';

enum FORM_STEP {
  MEAL = 0,
  RESTAURANT = 1,
  DISHED = 2,
  SUBMIT = 3,
}

const STEP_LIST = [
  {
    id: FORM_STEP.MEAL,
    title: 'Meal',
  },
  {
    id: FORM_STEP.RESTAURANT,
    title: 'Restaurant',
  },
  {
    id: FORM_STEP.DISHED,
    title: 'Dishes',
  },
  {
    id: FORM_STEP.SUBMIT,
    title: 'Submit',
  },
];

const currentStep = ref<number>(FORM_STEP.MEAL);
const mealForm = ref<PreorderForm>(new PreorderForm());
const ruleFormRef = ref<FormInstance>();
const isError = ref<boolean>(false);

provide('dishesInfo', dishes);

const customerValidator = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input a number'));
  }

  if (!Number.isInteger(value)) {
    callback(new Error('Please input digits'));
    return;
  }
  if (value < 1) {
    callback(new Error('The number of people should be greater than 0'));
    return;
  }

  if (value > 10) {
    callback(new Error('The number of people should not be greater than 10 '));
    return;
  }

  callback();
};

const dishesValidator = (rule: any, value: any, callback: any) => {
  const mealSeleleted = mealForm.value.dishes.filter((item) => item.id);
  const dishesSelectedTotal = reduce(
    mealSeleleted,
    (accum: number, curr: DishSelection) => {
      return (accum += curr.serving);
    },
    0,
  );

  if (size(mealSeleleted) !== size(mealForm.value.dishes)) {
    ElNotification({
      message: `Please fill out the dish info`,
      type: 'error',
    });

    callback(new Error());
    return;
  }

  if (dishesSelectedTotal < mealForm.value.customerCount) {
    ElNotification({
      message: 'The total of dishes is insufficient, please add more',
      type: 'error',
    });
    callback(new Error());
    return false;
  }

  if (dishesSelectedTotal > 10) {
    ElNotification({
      message: 'The maximum dishes is 10',
      type: 'error',
    });
    callback(new Error());
    return false;
  }

  callback();
  return true;
};

const rules = reactive<FormRules<PreorderForm>>({
  mealType: [{ required: true, message: 'Please select a meal', trigger: 'change' }],
  customerCount: [{ required: true, trigger: 'blur', validator: customerValidator }],
  restaurant: [{ required: true, message: 'Please choose a restaurant', trigger: 'change' }],
  dishes: [{ trigger: 'blur', validator: dishesValidator }],
});

const prev = () => {
  currentStep.value--;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) {
      isError.value = true;
      return;
    }

    if (currentStep.value === FORM_STEP.SUBMIT) {
      console.log(mealForm.value);
      ElNotification({
        type: 'success',
        message: 'Setup successful',
      });
      return;
    }

    isError.value = false;

    currentStep.value++;
  });
};
</script>

<style scoped lang="scss" src="./styles.scss"></style>
``
