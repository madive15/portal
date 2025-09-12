<script setup lang="ts">
definePageMeta({
  layout: 'empty'
});
const uploadRef = ref();
const atchFileId = ref('I0000000000000000032');

const upload = () => {
  uploadRef.value.transferFiles();
};
</script>

<template>
  <a-row>
    <a-col :span="24">
      <lazy-data-dext-upload
        v-once
        ref="uploadRef"
        :file-item-size="10"
        v-model:atch-file-id="atchFileId"
      />
    </a-col>
    <a-col :span="24">
      <a-button @click="upload">파일 업로드 처리</a-button>
    </a-col>
  </a-row>
</template>

<style scoped></style>
