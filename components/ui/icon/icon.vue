<script setup lang="ts">
import { computed } from 'vue';

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
const props = defineProps<{
  name: string;
  width?: number | string;
  height?: number | string;
}>();

// name에 따라 클래스명을 매핑
const nameClass = computed(() => {
  const kebabName = toKebabCase(props.name); // e.g. arrowLeft → arrow-left
  return `icon-${kebabName}`;
});

const styleNumber = computed(() => {
  const w = props.width;
  const h = props.height;
  if (!w) return {};
  return {
    width: typeof w === 'number' && `${w}px`,
    height: typeof h === 'number' && `${h}px`
  };
});
</script>

<template>
  <i :class="nameClass" :style="styleNumber"></i>
</template>

<style scoped lang="scss">
@use 'icon';
</style>
