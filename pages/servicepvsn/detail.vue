<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useFileStore } from '~/stores/file';
import { useCaseStore } from '~/stores/case';

const lwaCase = useCaseStore();
const { adminCase } = storeToRefs(lwaCase);

const router = useRouter();
const route = useRoute();

const fileStore = useFileStore();
const fileList = ref([]);

const { gdNo } = route.query;

const instNm = route.query.instNm + ' 사례';

onBeforeMount(async () => {
  await lwaCase.searchCase(route.query.caseNo as string);
});

const moveList = () => {
  const params = new URLSearchParams();
  const keys = Object.keys(route.query);

  for (const key of keys) {
    if (key === 'caseNo') {
      continue;
    }

    params.append(key, route.query[key]);
  }

  router.push(`/servicepvsn?${params.toString()}`, { external: true });
};

watch(adminCase, async (newValue) => {
  if (newValue.atchFileId) {
    const { data } = await fileStore.fileList(newValue.atchFileId);
    fileList.value = data;
  }
});

const ext = (fileNm: string) => {
  const extPosition = fileNm.lastIndexOf('.');
  return fileNm.substring(extPosition + 1);
};

const fileSize = (fileSize: number) => {
  return `${Math.ceil(fileSize / 1024)}KB`;
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
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
            :breadcrumb-title="instNm"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '서비스 제공기관' },
              { text: '기관 상세', active: true }
            ]"
          />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-view-box">
            <div class="content-header">
              <span class="category-span" v-if="!!adminCase.lwaCtgryNm">{{
                adminCase.lwaCtgryNm
              }}</span>
              <div class="info-box">
                <div class="title-box">
                  <h4>{{ adminCase.caseTtl }}</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span"
                    >작성일: {{ adminCase.frstRegDt.substring(0, 10) }}</span
                  >
                  <span class="hit-span">조회수: {{ adminCase.inqCnt }}</span>
                </div>
              </div>
            </div>
            <div class="content-body">
              <dl class="qustion-dl">
                <dt v-if="!!adminCase.caseQstnCn">질문</dt>
                <dd v-html="adminCase.caseQstnCn" />
              </dl>
              <dl class="answer-dl">
                <dt v-if="!!adminCase.caseQstnCn">답변</dt>
                <dd v-html="adminCase.caseCn" />
              </dl>
            </div>

            <div class="content-footer" v-if="adminCase.atchFileId != null">
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
                      @click="download(file.atchFileId, file.atchFileSeq)"
                    >
                      <i class="icon-download"></i>
                      <span class="text">다운로드</span>
                    </button>

                    <button
                      type="button"
                      :title="`${file.orgnlFileNm} 첨부파일 미리보기 새 창 열림`"
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
              class="btn-basic primary"
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
