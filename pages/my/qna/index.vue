<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { ref, computed } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useBoardArticleStore } from '~/stores/bbs';
import { useFileStore } from '~/stores/file';

const { showAlert } = useCustomAlert();

const router = useRouter();
const route = useRoute();

//const editorRef = ref();
const baTitleRef = ref();
const baContentRef = ref();

const boardArticleStore = useBoardArticleStore();
const { boardArticle, boardConfig } = storeToRefs(boardArticleStore);

const baTypeCodes = await useCommonCodeStore().searchCommonCodeList('QNA_TYPE');

const fileInfoList = ref([]); // 파일정보 목록

onBeforeMount(async () => {
  boardConfig.value.bcId = '200000';
  await boardArticleStore.searchBoardArticle(route.query.baId as number);
});

const baTypeCodeOptions = computed(() => {
  return [{ label: '선택', value: '' }, ...baTypeCodes];
});

// 빈 값 체크
const disabled = computed(() => {
  return !boardArticle.value.baType;
});

const updateBoardArticle = () => {
  if (!boardArticle.value.baType) {
    message.error('구분을 선택해주세요.');
    return;
  }
  if (!boardArticle.value.baTitle) {
    message.error('제목을 입력해주세요.');
    baTitleRef.value.focus();
    return;
  }
  //const baContentHtml = editorRef.value.getTextValue().trim();

  if (!boardArticle.value.baContentHtml) {
    message.error('내용을 입력해주세요.');
    baContentRef.value.focus();
    return;
  }

  Modal.confirm({
    title: `1:1문의 수정하기`,
    content: `입력한 내용으로 1:1문의하기를 수정하시겠습니까?`,
    okText: '확인',
    cancelText: '취소',
    onOk: async () => {
      try {
        const res = await useAxios().post(
          '/api/board/updateBoardArticle/atxt',
          {
            boardArticle: boardArticle.value,
            fileList: fileInfoList.value
          }
        );
        if (res.status === 200) {
          message.success('게시물이 저장되었습니다.');
          movePage();
        }
      } catch (e) {
        console.error(e);
        message.error('관리자에게 문의 바랍니다.');
      }

      // 파일 업데이트
      // if (fileInfoList.value > 0) {
      //   try {
      //     const res = useAxios().post(
      //       '/api/atchFileId/atxtExpln/update',
      //       fileInfoList.value
      //     );
      //   } catch (e) {
      //     //showAlert({title:})
      //     message.error('관리자에게 문의 바랍니다.');
      //     return;
      //   }
      // }
      //
      // boardArticle.value.baContentHtml = editorRef.value.getValue();
      // boardArticleStore
      //   .updateBoardArticle()
      //   .then(() => {
      //     message.success('게시물이 저장되었습니다.');
      //     movePage();
      //   })
      //   .catch(() => message.error('게시물 저장 중 에러가 발생되었습니다.'));
    }
  });
};

const movePage = () => {
  boardArticleStore.resetBoardArticle();
  router.push('/my/qna/list', { external: true });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="문의내용"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: '나의 문의내역' },
            { text: '문의수정', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="form-box">
          <div class="reason-box">
            <label for="reason">구분선택</label>
            <a-select
              id="select"
              class="common-select"
              placeholder="선택"
              v-model:value="boardArticle.baType"
              :options="baTypeCodeOptions"
            />
          </div>
          <div class="title-box">
            <label for="title">제목</label>
            <a-input
              id="ipText"
              class="text-bx"
              placeholder="제목을 입력해 주세요"
              v-model:value="boardArticle.baTitle"
              ref="baTitleRef"
            />
          </div>
          <div class="content-box">
            <label for="content">내용</label>

            <!--            <lazy-data-editor-->
            <!--              ref="editorRef"-->
            <!--              :initial-value="boardArticle.baContentHtml"-->
            <!--            />-->

            <a-textarea
              placeholder="내용 입력"
              v-model:value="boardArticle.baContentHtml"
              ref="baContentRef"
            ></a-textarea>
          </div>

          <div class="file-box">
            <strong>파일첨부</strong>
            <data-fileuploadrmrk
              v-model:atch-file-id="boardArticle.atchFileId"
              v-model:file-info-list="fileInfoList"
              :view="false"
              mode="normal"
              module="bbs"
              :max-count="5"
            />
            <p class="notice-p">※ 첨부파일 용량은 5M이하로 올려주세요.</p>
          </div>

          <div class="submit-box">
            <button
              type="button"
              title="수정"
              class="btn-basic primary"
              @click="updateBoardArticle"
              style="margin-right: 10px"
            >
              <span class="text">수정</span>
            </button>
            <button
              type="button"
              title="목록으로"
              class="btn-basic primary"
              @click="movePage"
            >
              <span class="text">목록으로</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/qna/index.scss';
</style>
