<script setup lang="ts">
const props = defineProps<{
  align?: string;
}>();
</script>

<template>
  <div :class="['common-btn__area', props.align]">
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
