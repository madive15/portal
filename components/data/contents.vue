<script setup lang="ts">
const { data } = await useAxios().get('/api/contents');
</script>

<template>
  <div v-html="data"></div>
</template>
