<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useFileStore } from '~/stores/file';
import { ref } from 'vue';
import { useSvcStore } from '~/stores/svc';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const { pstSn, bbsId, instNo } = route.query;

const fileStore = useFileStore();
const fileList = ref([]);

const svcStore = useSvcStore();
const { svcBoardDetail, boardTypeQuery } = storeToRefs(svcStore);

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const boardDetail = ref({});
onBeforeMount(async () => {
  boardTypeQuery.value.pstSn = pstSn;
  boardTypeQuery.value.bbsId = bbsId;

  await useSvcStore().searchBoardDetailList();
  boardDetail.value = svcBoardDetail.value[0];
  boardDetail.value.frstRegDt = boardDetail.value.frstRegDt.substring(0, 10);
});

watch(boardDetail, async (newValue) => {
  if (newValue.atchFileId) {
    const { data } = await fileStore.fileList(newValue.atchFileId);
    fileList.value = data;
  }
});

const fileSize = (fileSize: number) => {
  return `${Math.ceil(fileSize / 1024)}Kb`;
};

const ext = (fileNm: string) => {
  const extPosition = fileNm.lastIndexOf('.');
  return fileNm.substring(extPosition + 1);
};

const moveList = () => {
  const params = new URLSearchParams();
  const keys = Object.keys(route.query);
  for (const key of keys) {
    if (key !== 'pstSn' && key !== 'bbsId') {
      params.append(key, route.query[key]);
    }
  }

  router.push(`/servicepvsn?${params.toString()}`);
};

const shortcut = (pdfId: string) => {
  window.open(`/streamdocs/view/sd;streamdocsId=${pdfId}`, '_blank');
};
</script>

<template>
  <div class="sub-wrap" id="board-view">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!-- breadcrumb에서 :showPrintButton=true일시 인쇄하기 버튼이 보입니다. -->
          <Breadcrumb
            breadcrumb-title="추가게시판 상세페이지"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '추가게시판' },
              { text: '추가게시판', active: true }
            ]"
          />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-view-box">
            <div class="content-header">
              <div class="info-box">
                <div class="title-box">
                  <h4>{{ boardDetail.pstTtl }}</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span"
                    >작성일: {{ boardDetail.frstRegDt }}</span
                  >
                  <span class="hit-span"
                    >조회수: {{ boardDetail.pstInqCnt }}</span
                  >
                </div>
              </div>
            </div>
            <div class="content-body">
              <p v-html="boardDetail.pstCn"></p>
            </div>

            <div class="content-footer" v-if="fileList.length > 0">
              <div class="file-wrap-box">
                <div class="file-box" v-for="file in fileList">
                  <div class="file-title-box">
                    <span class="title-span">첨부파일</span>
                    <span class="file-span">
                      <a
                        href="javascript:void(0)"
                        @click="download(file.atchFileId, file.atchFileSeq)"
                        >{{
                          `${file.orgnlFileNm} [${ext(file.orgnlFileNm)}, ${fileSize(file.atchFileSz)}]`
                        }}</a
                      >
                    </span>
                  </div>

                  <div class="btn-area">
                    <button
                      type="button"
                      :title="file.orgnlFileNm"
                      class="btn-basic sm"
                      v-if="!!file.atchFileId"
                      @click="download(file.atchFileId, file.atchFileSeq)"
                    >
                      <i class="icon-download"></i>
                      <span class="text">다운로드</span>
                    </button>

                    <button
                      type="button"
                      title="바로보기"
                      class="btn-basic primary sm"
                      v-if="!!file.pdfId"
                      @click="shortcut(file.pdfId)"
                    >
                      <i class="icon-shortcut"></i>
                      <span class="text">바로보기</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="button-list-box">
            <button
              type="button"
              title="목록으로"
              class="btn-basic primary list-button"
              @click="moveList"
            >
              <span class="text">목록으로</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/ntc/detail.scss';
</style>
