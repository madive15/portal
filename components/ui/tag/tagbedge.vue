<script setup lang="ts">
const props = defineProps<{
  tagBedgeText: string;
}>();
</script>

<template>
  <div class="tag-bedge-box">
    <a-tag class="common-tag-bedge">{{ props.tagBedgeText }}</a-tag>
  </div>
</template>

<style scoped lang="scss">
@use '~/components/ui/tag/tagbedge.scss';
</style>
