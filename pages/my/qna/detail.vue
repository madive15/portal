<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useBoardArticleStore } from '~/stores/bbs';
import { useFileStore } from '~/stores/file';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
const router = useRouter();
const route = useRoute();

const fileStore = useFileStore();
const boardArticleStore = useBoardArticleStore();
const { boardArticle } = storeToRefs(boardArticleStore);

const baTypeCodes = await useCommonCodeStore().searchCommonCodeList('QNA_TYPE');

const categoryName = (baType: string) => {
  return baTypeCodes.find((item) => item.value === baType)?.label;
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const ext = (fileNm: string) => {
  const extPosition = fileNm.lastIndexOf('.');
  return fileNm.substring(extPosition + 1);
};

const fileSize = (fileSize: number) => {
  return `${Math.ceil(fileSize / 1024)}KB`;
};

const fileList = ref([]);
const answerFileList = ref([]);

let showYn = ref('');
watch(
  () => boardArticle.value?.asaBoardAnswer?.baId,
  async (newValue) => {
    // console.log('baId:::' + boardArticle.value.asaBoardAnswer.baId);
    showYn = boardArticle.value.asaBoardAnswer.baId;

    /*const { data2 } = await fileStore.fileList(
      boardArticle.value?.asaBoardAnswer?.atchFileId
    );
    answerFileList.value = data2;
    console.log('answerFileList.value:::' + answerFileList.value);*/
  }
);

const moveUpdateBoardArticlePage = () => {
  router.push(`/my/qna?baId=${boardArticle.value.baId}`, { external: true });
};

const movePage = () => {
  router.push('/my/qna/list', { external: true });
};

onBeforeMount(async () => {
  await boardArticleStore.searchBoardArticle(route.query.baId as number);

  if (boardArticle.value.atchFileId) {
    const { data } = await fileStore.fileList(boardArticle.value.atchFileId);
    fileList.value = data;
  }

  if (boardArticle.value.asaBoardAnswer.atchFileId) {
    const { data } = await fileStore.fileList(
      boardArticle.value.asaBoardAnswer.atchFileId
    );
    answerFileList.value = data;
  }
});
const shortcut = () => {
  alert('미리보기');
};
/*onUnmounted(() => {
  boardArticleStore.resetBoardArticle();
});*/
</script>

<template>
  <div class="sub-wrap" id="board-view">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!-- breadcrumb에서 :showPrintButton=true일시 인쇄하기 버튼이 보입니다. -->
          <Breadcrumb
            breadcrumb-title="문의내용"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '마이페이지' },
              { text: '나의 문의내역' },
              { text: '문의내용', active: true }
            ]"
          />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-view-box">
            <div class="content-header">
              <span
                class="category-span"
                v-if="
                  boardArticle.baType !== null && boardArticle.baType !== ''
                "
                >{{ categoryName(boardArticle.baType) }}</span
              >
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
            </div>

            <div class="content-footer">
              <div class="file-wrap-box">
                <div class="file-box" v-for="file in fileList">
                  <div class="file-title-box">
                    <span class="title-span">첨부파일 </span>
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
                    <span
                      >파일설명<b style="margin-left: 20px">{{
                        file.atxtExpln
                      }}</b></span
                    >
                  </div>

                  <div class="file-info-box">
                    <button
                      class="btn download-button"
                      v-if="!!file.atchFileId"
                      :title="file.orgnlFileNm"
                      @click="() => download(boardArticle.atchFileId)"
                    >
                      <span class="icon-span">
                        <img
                          v-if="
                            file.atchFileExtnNm === 'Doc' ||
                            file.atchFileExtnNm === 'docx' ||
                            file.atchFileExtnNm === 'word'
                          "
                          src="~/assets/image/sub/file/doc.svg"
                          alt="문서 파일(DOC)다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'hwp' ||
                            file.atchFileExtnNm === 'hwpx'
                          "
                          src="~/assets/image/sub/file/hwp.svg"
                          alt="한글 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'JPG' ||
                            file.atchFileExtnNm === 'PNG' ||
                            file.atchFileExtnNm === 'gif' ||
                            file.atchFileExtnNm === 'jpg' ||
                            file.atchFileExtnNm === 'png' ||
                            file.atchFileExtnNm === 'jpeg'
                          "
                          src="~/assets/image/sub/file/img.svg"
                          alt="이미지 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'PDF' ||
                            file.atchFileExtnNm === 'pdf'
                          "
                          src="~/assets/image/sub/file/pdf.svg"
                          alt="PDF 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Ppt' ||
                            file.atchFileExtnNm === 'pptx'
                          "
                          src="~/assets/image/sub/file/ppt.svg"
                          alt="PPT 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Txt' ||
                            file.atchFileExtnNm === 'txt'
                          "
                          src="~/assets/image/sub/file/txt.svg"
                          alt="TXT 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'xls' ||
                            file.atchFileExtnNm === 'xlsx'
                          "
                          src="~/assets/image/sub/file/xls.svg"
                          alt="엑셀(xls) 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Zip' ||
                            file.atchFileExtnNm === 'rar'
                          "
                          src="~/assets/image/sub/file/zip.svg"
                          alt="압축파일(zip) 다운로드"
                        />

                        <img
                          v-if="file.atchFileExtnNm == null"
                          src="~/assets/image/sub/file/etc.svg"
                          alt="파일 다운로드"
                        />
                      </span>
                    </button>
                    <CommonButton
                      height="sm"
                      variants="primary"
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
              title="수정"
              variants="primary"
              @click="moveUpdateBoardArticlePage"
              v-show="!showYn"
              width="sm"
            >
              수정
            </CommonButton>
          </div>
          <div class="board-comment-box" v-show="showYn">
            <div class="content-header">
              <div class="info-box">
                <div class="title-box">
                  <h4>답변내용</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span"
                    >작성일:
                    {{ boardArticle.asaBoardAnswer.frstRegDt.substring(0, 10) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="content-body">
              <p v-html="boardArticle.asaBoardAnswer.baContentHtml"></p>
            </div>

            <div class="content-footer">
              <div class="file-wrap-box">
                <div class="file-box" v-for="file in answerFileList">
                  <div class="file-title-box">
                    <span class="title-span">첨부파일</span>
                    <span class="file-span">
                      <a
                        href="javascript:void(0)"
                        @click="
                          () => download(file.atchFileId, file.atchFileSeq)
                        "
                        >{{
                          `${file.orgnlFileNm} [${ext(file.orgnlFileNm)}, ${fileSize(file.atchFileSz)}] ${file.atxtExpln}`
                        }}</a
                      >
                    </span>
                    <span> </span>
                  </div>

                  <div class="file-info-box">
                    <button
                      class="btn download-button"
                      v-if="!!file.atchFileId"
                      :title="file.orgnlFileNm"
                      @click="() => download(boardArticle.atchFileId)"
                    >
                      <span class="icon-span">
                        <img
                          v-if="
                            file.atchFileExtnNm === 'Doc' ||
                            file.atchFileExtnNm === 'docx' ||
                            file.atchFileExtnNm === 'word'
                          "
                          src="~/assets/image/sub/file/doc.svg"
                          alt="문서 파일(DOC)다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'hwp' ||
                            file.atchFileExtnNm === 'hwpx'
                          "
                          src="~/assets/image/sub/file/hwp.svg"
                          alt="한글 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'JPG' ||
                            file.atchFileExtnNm === 'PNG' ||
                            file.atchFileExtnNm === 'gif' ||
                            file.atchFileExtnNm === 'jpg' ||
                            file.atchFileExtnNm === 'png' ||
                            file.atchFileExtnNm === 'jpeg'
                          "
                          src="~/assets/image/sub/file/img.svg"
                          alt="이미지 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'PDF' ||
                            file.atchFileExtnNm === 'pdf'
                          "
                          src="~/assets/image/sub/file/pdf.svg"
                          alt="PDF 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Ppt' ||
                            file.atchFileExtnNm === 'pptx'
                          "
                          src="~/assets/image/sub/file/ppt.svg"
                          alt="PPT 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Txt' ||
                            file.atchFileExtnNm === 'txt'
                          "
                          src="~/assets/image/sub/file/txt.svg"
                          alt="TXT 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'xls' ||
                            file.atchFileExtnNm === 'xlsx'
                          "
                          src="~/assets/image/sub/file/xls.svg"
                          alt="엑셀(xls) 파일 다운로드"
                        />

                        <img
                          v-if="
                            file.atchFileExtnNm === 'Zip' ||
                            file.atchFileExtnNm === 'rar'
                          "
                          src="~/assets/image/sub/file/zip.svg"
                          alt="압축파일(zip) 다운로드"
                        />

                        <img
                          v-if="file.atchFileExtnNm == null"
                          src="~/assets/image/sub/file/etc.svg"
                          alt="파일 다운로드"
                        />
                      </span>
                    </button>
                    <CommonButton
                      :title="`${file.orgnlFileNm} 첨부파일 미리보기 새 창 열림`"
                      height="sm"
                      variants="primary"
                      v-if="!!file.pdfId"
                      @click="shortcut(file.pdfId)"
                    >
                      <i class="icon-shortcut"></i>
                      <span class="text">바로보기</span>
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
              @click="movePage"
              width="sm"
            >
              목록으로
            </CommonButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/ntc/detail.scss';
</style>
