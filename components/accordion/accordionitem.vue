<!-- AccordionItem.vue -->
<template>
  <div class="accordion-item-box">
    <div class="accordion-header-box" @click="toggle">
      {{ title }}
    </div>
    <transition name="accordion">
      <div class="accordion-body-box" v-show="isOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  isActive: boolean;
}>()

const emits = defineEmits(['toggle']);

const isOpen = computed(() => props.isActive);

const toggle = () => {
  emits('toggle');
}
</script>

<style scoped>
.accordion-header-box {
  cursor: pointer;

}

.accordion-body-box {
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  height: auto;
  opacity: 1;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
</style>
