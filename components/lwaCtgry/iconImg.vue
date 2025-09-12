<script setup lang="ts">
export type FileIconType = {
  iconType: string;
};

const props = defineProps<FileIconType>();
</script>

<template>
  <img
    v-if="'doc|docx'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/doc.svg"
    alt="문서 파일(DOC)다운로드"
  />

  <img
    v-else-if="'hwp|hwpx'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/hwp.svg"
    alt="한글파일 다운로드"
  />

  <img
    v-else-if="'gif|jpg|png|jpeg'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/img.svg"
    alt="이미지 다운로드"
  />

  <img
    v-else-if="props.iconType.toLowerCase() === 'pdf'"
    src="~/assets/image/sub/file/pdf.svg"
    alt="pdf 다운로드"
  />

  <img
    v-else-if="'ppt|pptx'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/ppt.svg"
    alt="ppt 다운로드"
  />

  <img
    v-else-if="props.iconType.toLowerCase() === 'txt'"
    src="~/assets/image/sub/file/txt.svg"
    alt="txt파일 다운로드"
  />

  <img
    v-else-if="'xls|xlsx'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/xls.svg"
    alt="엑셀(xls)다운로드"
  />

  <img
    v-else-if="'zip|rar'.includes(props.iconType.toLowerCase())"
    src="~/assets/image/sub/file/zip.svg"
    alt="압축파일(zip)다운로드"
  />
  <img v-else src="~/assets/image/sub/file/etc.svg" alt="다운로드 파일" />
</template>
