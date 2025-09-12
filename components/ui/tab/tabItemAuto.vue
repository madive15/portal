<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();

defineProps<{
  modelValue: boolean;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <button
    :class="['btn-auto', { active: modelValue }]"
    v-bind="{
      ...(modelValue ? { title: '선택됨' } : {}),
      ...$attrs
    }"
    @click="$emit('update:modelValue', true)"
  >
    <slot />
  </button>
</template>

<style scoped></style>
