<script setup lang="ts">
interface Props {
  title?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  tag: 'h5'
});

const slots = defineSlots<{
  right: (props: {}) => any;
}>();
</script>

<template>
  <div class="accordion-head">
    <component :is="tag" class="title-heading">{{ title }}</component>
    <slot name="right"></slot>
  </div>
</template>

<style scoped lang="scss">
//@use 'accordion';
</style>
