<script setup lang="ts">
import MainHeader from '~/components/common/NewMainHeader.vue';
</script>

<template>
  <div class="wrap">
    <MainHeader />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
