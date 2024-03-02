<template>
  <div class="grid grid-cols-4 gap-4">
    <ElSelect :model-value="currentInfo.id" class="col-span-4" @change="handleSelectOption">
      <ElOption v-for="item of menuItem" :key="item.id" :value="item.id" :label="item.label"></ElOption>
    </ElSelect>

    <ElInputNumber v-model="modelServing" class="col-start-5" label="dishes" :controls-position="'right'" :min="1" />
  </div>
</template>
<script setup lang="ts">
import { DishSelection } from '@/interfaces';
import { ElInputNumber, ElSelect } from 'element-plus';
import { NumericDictionary, filter, includes, map } from 'lodash';
import { computed } from 'vue';

interface Prop {
  selectionList: {
    id: number;
    label: string;
  }[];
  selectedId: number[];
  currentInfo: DishSelection;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
  updateInfo: [value: DishSelection];
}>();

const modelServing = computed({
  get() {
    return props.currentInfo.serving;
  },
  set(newVal) {
    emit('updateInfo', { ...props.currentInfo, serving: newVal });
  },
});

const menuItem = computed(() => {
  return filter(props.selectionList, (item) => !includes(props.selectedId, item.id));
});

const handleSelectOption = (value: number) => {
  emit('updateInfo', { ...props.currentInfo, id: value });
};
</script>
