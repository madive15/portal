<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useFileStore } from '~/stores/file';
import { useBoardArticleStore } from '~/stores/bbs';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import Icon from '~/components/ui/icon/icon.vue';
const router = useRouter();
const route = useRoute();

const moveList = () => {
  router.push('/center/faq/list', { external: true });
};

const fileStore = useFileStore();
const boardArticleStore = useBoardArticleStore();
const { boardArticle } = storeToRefs(boardArticleStore);

const fileList = ref([]);

const baTypeCodes = await useCommonCodeStore().searchCommonCodeList('FAQ_TYPE');
const baNuriCodes = await useCommonCodeStore().searchCommonCodeList('PBL_NURI');

const categoryName = (baType: string) => {
  return baTypeCodes.find((item) => item.value === baType)?.label;
};

const downImg = (baId) => {
  // console.log('download~!!!');
  // console.log('baId:::' + baId);
  boardArticleStore.downloadBoardArticleFile(baId as number);
};

onBeforeMount(() => {
  boardArticleStore.searchBoardArticle(route.query.baId as number);
});

watch(boardArticle, async (newValue) => {
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

// 공공누리 이미지 유형별 불러올때

type NuRiProps = {
  type: number;
};

const props = defineProps<NuRiProps>();
</script>

<template>
  <div class="sub-wrap" id="board-view">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!-- breadcrumb에서 :showPrintButton=true일시 인쇄하기 버튼이 보입니다. -->
          <Breadcrumb
            breadcrumb-title="고객센터"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '고객센터' },
              { text: '자주찾는 질문', active: true }
            ]"
          />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-view-box">
            <div class="content-header">
              <span class="category-span">{{
                categoryName(boardArticle.baType)
              }}</span>
              <div class="info-box">
                <div class="title-box">
                  <h4>{{ boardArticle.baTitle }}</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span"
                    >작성일: {{ boardArticle.frstRegDt.substring(0, 10) }}</span
                  >
                  <span class="hit-span">조회수: {{ boardArticle.baHit }}</span>
                </div>
              </div>
            </div>
            <div class="content-body">
              <p v-html="boardArticle.baContentHtml"></p>
              <div class="nuri-type-box">
                <div class="img-box">
                  <!-- 유형별로 다른 이미지 표시 -->
                  <img
                    v-if="type === 1"
                    src="~/assets/image/sub/etc/copyright01.png"
                    alt="출처표시"
                  />
                  <img
                    v-else-if="type === 2"
                    src="~/assets/image/sub/etc/copyright02.png"
                    alt="출처표시 + 상업적 이용금지"
                  />
                  <img
                    v-else-if="type === 3"
                    src="~/assets/image/sub/etc/copyright03.png"
                    alt="출처표시 + 변경금지"
                  />
                  <img
                    v-else-if="type === 4"
                    src="~/assets/image/sub/etc/copyright04.png"
                    alt="출처표시 + 상업적 이용금지 + 변경금지"
                  />
                </div>

                <div class="img-text-box">
                  <!-- 유형별 안내 문구도 분기 처리 -->
                  <p v-if="type === 1">
                    법률구조플랫폼이 보유한
                    <b class="highlight">[문화PD] 이미지명</b><br />
                    본 저작물은 "공공누리"
                    <span class="text-re-span">제1유형:출처표시</span> 조건에
                    따라 이용 할 수 있습니다.
                  </p>
                  <p v-else-if="type === 2">
                    법률구조플랫폼이 보유한
                    <b class="highlight">[문화PD] 이미지명</b><br />
                    본 저작물은 "공공누리"
                    <span class="text-re-span"
                      >제2유형:출처 표시 + 상업적 이용금지</span
                    >
                    조건에 따라 이용 할 수 있습니다.
                  </p>
                  <p v-else-if="type === 3">
                    법률구조플랫폼이 보유한
                    <b class="highlight">[문화PD] 이미지명</b><br />
                    본 저작물은 "공공누리"
                    <span class="text-re-span"
                      >제3유형:출처 표시 + 변경금지</span
                    >
                    조건에 따라 이용 할 수 있습니다.
                  </p>
                  <p v-else-if="type === 4">
                    법률구조플랫폼이 보유한
                    <b class="highlight">[문화PD] 이미지명</b><br />
                    본 저작물은 "공공누리"
                    <span class="text-re-span"
                      >제4유형:출처 표시 + 상업적 이용금지 + 변경금지</span
                    >
                    조건에 따라 이용 할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div class="content-footer">
              <div class="file-wrap-box">
                <div class="file-box" v-for="file in fileList">
                  <div class="file-title-box">
                    <span class="title-span">첨부파일</span>
                    <span class="file-span">
                      <a
                        href="javascript:void(0)"
                        @click="
                          () => download(file.atchFileId, file.atchFileSeq)
                        "
                        >{{
                          `${file.orgnlFileNm} [${ext(file.orgnlFileNm)}, ${fileSize(file.atchFileSz)}]`
                        }}</a
                      >
                    </span>
                  </div>

                  <div class="file-info-box">
                    <button
                      class="btn download-button"
                      v-if="!!file.atchFileId"
                      :title="file.orgnlFileNm"
                      @click="
                        () =>
                          download(boardArticle.atchFileId, file.atchFileSeq)
                      "
                    >
                      <span class="icon-span">
                        <img
                          v-if="
                            'doc|docx'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/doc.svg"
                          alt="문서 파일(DOC)다운로드"
                        />

                        <img
                          v-else-if="
                            'hwp|hwpx'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/hwp.svg"
                          alt="한글 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            'gif|jpg|png|jpeg'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/img.svg"
                          alt="이미지 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            file.atchFileExtnNm.toLowerCase() === 'pdf'
                          "
                          src="~/assets/image/sub/file/pdf.svg"
                          alt="PDF 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            'ppt|pptx'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/ppt.svg"
                          alt="PPT 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            file.atchFileExtnNm.toLowerCase() === 'txt'
                          "
                          src="~/assets/image/sub/file/txt.svg"
                          alt="TXT 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            'xls|xlsx'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/xls.svg"
                          alt="엑셀(xls) 파일 다운로드"
                        />

                        <img
                          v-else-if="
                            'zip|rar'.includes(
                              file.atchFileExtnNm.toLowerCase()
                            )
                          "
                          src="~/assets/image/sub/file/zip.svg"
                          alt="압축파일(zip) 다운로드"
                        />

                        <img
                          v-else
                          src="~/assets/image/sub/file/etc.svg"
                          alt="파일 다운로드"
                        />
                      </span>
                    </button>
                    <CommonButton
                      title="바로보기"
                      variants="primary"
                      height="sm"
                      :title="`${file.orgnlFileNm} 첨부파일 미리보기 새 창 열림`"
                      v-if="!!file.pdfId"
                      @click="shortcut(file.pdfId)"
                    >
                      <template #left-icon>
                        <Icon name="shortcut" />
                      </template>
                      바로보기
                    </CommonButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="button-list-box">
            <CommonButton
              title="목록으로"
              variants="primary"
              width="sm"
              @click="moveList"
            >
              <span class="text">목록으로</span>
            </CommonButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/faq/detail.scss';
</style>
