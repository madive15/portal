<script setup lang="ts">
definePageMeta({
  layout: 'empty'
});
const uploadRef = ref();
const atchFileId = ref('I0000000000000000032');
</script>

<template>
  <a-row>
    <a-col :span="24">
      <lazy-data-dext-upload
        v-once
        ref="uploadRef"
        mode="view"
        v-model:atch-file-id="atchFileId"
      />
    </a-col>
  </a-row>
</template>

<style scoped></style>
