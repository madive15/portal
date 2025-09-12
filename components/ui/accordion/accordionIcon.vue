<script setup lang="ts">
interface Props {
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
});
</script>

<template>
  <span
    class="accordion-arrow"
    :style="{ transform: `rotate(${isActive ? 0 : 180}deg)` }"
    >{{ isActive ? '열림' : '닫힘' }}</span
  >
</template>

<style scoped lang="scss">
//@use 'accordion';
</style>
