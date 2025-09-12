<script setup lang="ts">
definePageMeta({
  layout: 'center'
});
</script>

<template>
  <a-flex justify="center" class="align-center w-full h-full">
    <a-typography-text :level="1" style="font-size: 3rem; font-weight: bold"
      >서비스 준비중입니다.</a-typography-text
    >
  </a-flex>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/ready.scss';
</style>
