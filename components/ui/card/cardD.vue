<script setup lang="ts">
import { useFileStore } from '~/stores/file';

type File = {
  atchFileId: String;
  atchFileSeq: Number;
  fileName: String;
  pdfId?: String;
};
const props = defineProps<{
  title: String;
  badge: String;
  date: Date;
  fileList: File[];
}>();
const fileStore = useFileStore();
const download = async ({ atchFileId, atchFileSeq }: File) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const preview = ({ pdfId }: File) => {
  OpenPdfViewer(pdfId);
};
</script>

<template>
  <div
    class="card-type__board"
    v-for="category in categories"
    :key="category.title"
  >
    <div class="card-header">
      <h3 class="title" v-html="title"></h3>
      <span class="badge-exam">{{ badge }}</span>
    </div>
    <div class="btn-area__row">
      <div class="btn-area" v-for="file in fileList">
        <button
          type="button"
          class="btn-basic sm"
          :title="`${file.fileName} 다운로드`"
          v-if="!!file.atchFileSeq"
        >
          <i class="icon-download"></i>
          <span class="text" @click="download(file)">다운로드</span>
        </button>
        <button
          type="button"
          class="btn-basic sm primary"
          :title="`${file.fileName} PDF 문서 바로보기 (새 창에서 열림)`"
          v-if="!!file.pdfId"
        >
          <i class="icon-shortcut"></i>
          <span class="text" @click="preview(file)">바로보기</span>
        </button>
      </div>
    </div>
    <div class="text-etc">
      <span class="bx">
        <span>{{ category.info }}</span>
      </span>
      <span class="bx">{{ category.dlDt }} </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
