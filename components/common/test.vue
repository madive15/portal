<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const containerEl = ref<HTMLElement | null>(null);

// 상태
const isAtStart = ref(true);
const isAtEnd = ref(false);

const checkEdges = () => {
  if (!containerEl.value) return;
  const el = containerEl.value;
  isAtStart.value = el.scrollLeft === 0;
  isAtEnd.value = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
};

const onScroll = () => {
  checkEdges();
};

const scrollAmount = 200;

const scrollLeft = () => {
  if (!containerEl.value) return;
  containerEl.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
};

const scrollRight = () => {
  if (!containerEl.value) return;
  containerEl.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

onMounted(() => {
  checkEdges();
});
</script>

<template>
  <div class="slide-group-wrapper">
    <button
      class="slide-group-btn left-btn"
      @click="scrollLeft"
      :disabled="isAtStart"
    >
      ‹
    </button>
    <div class="slide-group-container" ref="containerEl" @scroll="onScroll">
      <div class="slide-group">
        <div class="slide-group-item" v-for="(item, i) in items" :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    <button
      class="slide-group-btn right-btn"
      @click="scrollRight"
      :disabled="isAtEnd"
    >
      ›
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/test';
</style>
