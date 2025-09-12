<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
}>();
const isExpanded = ref(false);
const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="side-menu__area" :class="{ expanded: isExpanded }">
    <div class="side-toggle__bar">
      <strong> {{ title }}</strong>
      <button
        type="button"
        class="toggle-btn"
        @click="toggle"
        :title="title"
      ></button>
    </div>
    <div class="side-toggle__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
