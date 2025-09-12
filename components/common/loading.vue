<script setup lang="ts">
import { useLoadingStore } from '~/stores';

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
</script>

<template>
  <template v-if="isLoading">
    <div
      class="top-0 left-0 w-full h-full flex justify-center items-center position-absolute"
      style="z-index: 10000000"
    >
      <a-spin />
    </div>
    <div
      class="top-0 left-0 w-full h-full justify-center items-center position-fixed bg-black"
      style="z-index: 9999999; opacity: 0.4"
    ></div>
  </template>
</template>
