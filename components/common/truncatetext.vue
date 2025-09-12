<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  maxLength: number;
  text: string;
  TransVhtml?: string;
}

const props = defineProps<Props>();

const truncatedText = computed(() => {
  if (props.text && props.text.length >= props.maxLength) {
    return props.text.slice(0, props.maxLength) + '...';
  }
  return props.text;
});
</script>

<template>
  <span :title="text" class="truncate-span">
    <span v-html="truncatedText" />
  </span>
</template>

<style scoped lang="scss">
@use './scss/truncatetext';
</style>
