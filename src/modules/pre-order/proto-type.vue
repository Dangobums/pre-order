<template>
  <div class="flex overflow-hidden">
    <!-- Step Indicator -->
    <div class="w-20 mr-4">
      <div
        v-for="step in steps"
        :key="step"
        @click="scrollToStep(step)"
        class="cursor-pointer p-2 text-center border-b-2"
      >
        Step {{ step }}
      </div>
    </div>

    <!-- Step Content -->
    <div class="flex-1 snap-y snap-mandatory overflow-auto">
      <section id="step1" class="h-screen snap-start">
        <h2 class="text-2xl font-bold mb-5">Step 1: Personal Information</h2>
        <!-- Form fields for Step 1 -->
      </section>

      <section id="step2" class="h-screen snap-start">
        <h2 class="text-2xl font-bold mb-5">Step 2: Meal Selection</h2>
        <!-- Form fields for Step 2 -->
      </section>

      <section id="step3" class="h-screen snap-start">
        <h2 class="text-2xl font-bold mb-5">Step 3: Payment Information</h2>
        <!-- Form fields for Step 3 -->
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const steps = [1, 2, 3];

const currentStep = ref<number>(1);

const scrollToStep = (step: number) => {
  const element = document.getElementById(`step${step}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped></style>
