<template>
  <div class="w-full">
    <div class="text-lg font-medium mb-3">Choose your dishes</div>
    <ElFormItem prop="dishes" class="w-full" required>
      <div
        v-for="(dish, dishIndex) of dishSelection"
        class="flex items-center gap-4 mt-4 first:mt-0 w-full"
        :key="dishIndex"
      >
        <ElIcon
          v-if="size(dishSelection) > 1"
          :color="'#eb5757'"
          class="cursor-pointer"
          @click="removeDishes(dishIndex)"
        >
          <Delete />
        </ElIcon>
        <DishInfo
          class="flex-1"
          :currentInfo="dish"
          :selectionList="dishSelectionListByRestaurant"
          :selectedId="getSelectdId.filter((item) => item !== dish.id)"
          @updateInfo="updateInfo($event, dishIndex)"
        />
      </div>
    </ElFormItem>
    <ElButton
      v-if="size(dishSelection) !== size(dishSelectionListByRestaurant)"
      class="mt-2.5"
      @click="handleAddDish"
    >
      <ElIcon><Plus /></ElIcon>
    </ElButton>
  </div>
</template>
<script setup lang="ts">
import { inject, computed, onMounted } from 'vue';
import DishInfo from '../DishInfo/index.vue';
import { DishSelection, DishesListDetail } from '@/interfaces';
import { cloneDeep, filter, includes, isEmpty, map, reduce, size } from 'lodash';

interface Prop {
  restaurant?: string;
}

const props = defineProps<Prop>();
const dishesInfo = inject<DishesListDetail[]>('dishesInfo', []);

const dishSelection = defineModel<DishSelection[]>('dishSelection');

const DISH_TEMPLATE: DishSelection = {
  id: undefined,
  serving: 1,
};

onMounted(() => {
  if (!dishSelection.value) {
    dishSelection.value = [cloneDeep(DISH_TEMPLATE)];
    return;
  }

  const validValue: DishSelection[] = dishSelection.value.filter(
    (item: DishSelection) => item.id && includes(dishSelectionListId.value, item.id),
  );

  if (isEmpty(validValue)) {
    dishSelection.value = [cloneDeep(DISH_TEMPLATE)];
    return;
  }

  dishSelection.value = validValue;
});

const dishSelectionListByRestaurant = computed(() => {
  return reduce(
    dishesInfo,
    (dishList: { id: number; label: string }[], dishDetail: DishesListDetail) => {
      if (!props.restaurant) {
        return [];
      }

      if (dishDetail.restaurant !== props.restaurant) {
        return dishList;
      }

      dishList.push({
        id: dishDetail.id,
        label: dishDetail.name,
      });

      return dishList;
    },
    [],
  );
});

const dishSelectionListId = computed(() => {
  if (!dishSelectionListByRestaurant.value || isEmpty(dishSelectionListByRestaurant.value)) {
    return [];
  }

  return map(dishSelectionListByRestaurant.value, (item) => item.id);
});

const handleAddDish = () => {
  if (isEmpty(dishSelection.value)) {
    dishSelection.value = [cloneDeep(DISH_TEMPLATE)];
    return;
  }

  dishSelection.value?.push(cloneDeep(DISH_TEMPLATE));
};

const getSelectdId = computed(() => {
  if (isEmpty(dishSelection.value)) {
    return [];
  }

  return map(dishSelection.value, (item) => item.id).filter((item) => item) as number[];
});

const updateInfo = (newInfo: DishSelection, dishIndex: number) => {
  if (!dishSelection.value || isEmpty(dishSelection.value)) {
    return;
  }

  dishSelection.value[dishIndex] = { ...newInfo };
};

const removeDishes = (dishIndex: number) => {
  if (!dishSelection.value || isEmpty(dishSelection.value)) {
    return;
  }

  dishSelection.value.splice(dishIndex, 1);
};
</script>
