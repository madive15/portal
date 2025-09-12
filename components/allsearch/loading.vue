<script setup lang="ts">
import { useLoadingStore } from '~/stores';

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
</script>

<template>
  <template v-if="isLoading">
    <div
      class="w-full h-full flex justify-center items-center position-absolute"
      style="z-index: 10000000"
    >
      <a-spin />
    </div>
    <div
      class="w-full h-full justify-center items-center position-absolute bg-grey"
      style="z-index: 9999999; opacity: 0.2"
    ></div>
  </template>
</template>
