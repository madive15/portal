<!--
 * 파일명 : docAtchfileRow
 * 작성자 : KJH
 * 설명   : 전자접수 공통 업로드 컴포넌트
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.08  KJH     최초생성
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import { useFileStore } from '~/stores/atchfile';
import Icon from '~/components/ui/icon/icon.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ElrcptGdPopup from '~/pages/elrcpt/ElrcptGdPopup.vue';
import MyDocPopup from '~/pages/elrcpt/MyDocPopup.vue';

const atchFileStore = useFileStore();

type FileUploadRowData = {
  view: boolean;
  id: number;
  rowStatus: string; //행상태
  atchFileId: string; //첨부파일아이디
  atchFileSeq: number; //첨부파일순서
  strgFileNm: string; //저장파일명
  orgnlFileNm: string; //원본파일명
  atchFilePathNm: string; //첨부파일경로명
  atchFileKndNm: string; //첨부파일종류명
  pdfId: string; //PDF아이디
  myDocAtchFileId: string; //나의서류첨부파일아이디
  myDocAtchFileSeq: number; //나의서류첨부파일순서
  sbmsnMthdCd: string; //제출방법코드 (D001: 나의서식, D002: 파일첨부, D003: 전자증명서)
  esntlYn: string;
  newYn: string;
  label: string;
  value: string;
  docId: string;
  docNm: string;
  gbnCd: string;
  insrncSbsrSeCd: string;
  titleNm: string;
};

const props = defineProps<{
  rowData: FileUploadRowData;
  selOp: FileUploadRowData;
}>();

const emit = defineEmits(['update']);

/* alert창 선언 */
const { showAlert } = useCustomAlert();

/* 제출안내 팝업 */
const elrcptGdModal = ref(null);
/* 나의서류 팝업 */
const myDocModal = ref(null);

const selVal = ref();

/**
 * name : btn_ezForm_click
 * desc : 전자증명 버튼 클릭
 */
const btn_ezForm_click = () => {
  // Row 초기화
  resetRow('D003');
};

/**
 * name : btn_guide_click
 * desc : 제출안내 버튼 클릭
 */
const btn_guide_click = () => {
  // 제출안내 팝업 호출
  elrcptGdModal.value.showModal();
};

/**
 * name : btn_localFile_click
 * desc : 파일첨부 버튼 클릭
 */
const btn_localFile_click = () => {
  // Row 초기화
  resetRow('D002');
};

/**
 * name : input_localFile_fileChange
 * desc : 파일첨부 input 파일변경
 */
const input_localFile_fileChange = (e: Event) => {
  const file = (<HTMLInputElement>e.target).files?.[0];

  const allowFileExt = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'hwp',
    'hwpx',
    'jpeg',
    'jpg',
    'png'
  ];
  const fileExt = file.name.split('.').pop().toLowerCase();

  // 확장자 체크
  if (!allowFileExt.includes(fileExt)) {
    showAlert({
      icon: 'warning', //error, warning
      text: fileExt + '는 허용하지 않는 확장자입니다.'
    });
    return;
  }

  // Row 데이터 수정
  emit('update', {
    ...props.rowData,
    sbmsnMthdCd: 'D002',
    orgnlFileNm: file.name
  });
};

/**
 * name : btn_myDoc_click
 * desc : 나의서류 버튼 클릭
 */
const btn_myDoc_click = () => {
  // Row 초기화
  resetRow('D001');
  // 나의서류 팝업 호출
  myDocModal.value.showModal();
};

/**
 * name : selectMyDoc
 * desc : 나의 서류 목록 팝업에서 선택한 데이터의 seq, fileId 담는 함수
 */
const selectMyDoc = (data) => {
  // Row 데이터 수정
  emit('update', {
    ...props.rowData,
    orgnlFileNm: data.orgnlFileNm,
    myDocAtchFileId: data.atchFileId,
    myDocAtchFileSeq: data.atchFileSeq
  });
};

/**
 * name : isVisibleRow
 * desc : Row Visible 처리
 */
const isVisibleRow = computed(() => {
  return props.rowData.rowStatus != 'D';
});

/**
 * name : setActiveEzForm
 * desc : 전자증명 버튼 활성화
 */
const setActiveEzForm = computed(() => {
  return props.rowData.sbmsnMthdCd === 'D003' ? 'is-active' : '';
});
/**
 * name : setActiveLocalFile
 * desc : 파일첨부 버튼 활성화
 */
const setActiveLocalFile = computed(() => {
  return props.rowData.sbmsnMthdCd === 'D002' ? 'is-active' : '';
});
/**
 * name : setActiveMyDoc
 * desc : 나의서류 버튼 활성화
 */
const setActiveMyDoc = computed(() => {
  return props.rowData.sbmsnMthdCd === 'D001' ? 'is-active' : '';
});

/**
 * name : resetRow
 * desc : Row 초기화
 */
const resetRow = (sbmsnMthdCd: string) => {
  // Row 데이터 수정
  emit('update', {
    ...props.rowData,
    sbmsnMthdCd: sbmsnMthdCd,
    orgnlFileNm: '',
    myDocAtchFileId: '',
    myDocAtchFileSeq: ''
  });

  const inputLocalFile = <HTMLInputElement>(
    document.getElementById('inputLocalFile_' + props.rowData.id)
  );
  inputLocalFile.value = '';
};

/**
 * name : fileDownload
 * desc : 파일 다운로드
 */
const fileDownload = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await atchFileStore.downloadAtchFile(
    atchFileId,
    atchFileSeq
  );
  DownloadUtils.download(data);
};

/** 컴포넌트 mount */
onMounted(() => {
  if (props.rowData.esntlYn === 'Y') {
  }
});

/**
 * name : focusSelectDocId
 * desc : 제출서류 focus
 */
const focusSelectDocId = () => {
  const selectDocId = <HTMLSelectElement>(
    document.getElementById('selectDocId_' + props.rowData.id)
  );
  selectDocId.focus();
};

/**
 * name : focusInputFileNm
 * desc : 파일명 focus
 */
const focusInputFileNm = () => {
  const inputFileNm = <HTMLInputElement>(
    document.getElementById('inputFileNm_' + props.rowData.id)
  );
  inputFileNm.focus();
};

/** 부모창에서 호출할 함수 정의 */
defineExpose({
  focusSelectDocId,
  focusInputFileNm
});
</script>

<template>
  <client-only>
    <div class="module-unit" v-show="isVisibleRow">
      <div class="module-in">
        <div class="select-forms">
          <div class="forms-in">
            <a-form-item
              :labelCol="{ class: 'sr-only' }"
              v-if="props.rowData.esntlYn !== 'Y'"
            >
              <a-select
                class="common-select"
                placeholder="선택"
                v-bind:id="'selectDocId_' + props.rowData.id"
                v-model:value="props.rowData.docId"
                :disabled="props.rowData.view"
              >
                <template v-for="opt in props.selOp">
                  <a-select-option
                    :value="opt.value"
                    :key="opt.value"
                    v-if="opt.esntlYn === 'N' || props.rowData.esntlYn === 'Y'"
                  >
                    {{ opt.docNm }}
                  </a-select-option>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="{ class: 'sr-only' }">
              <a-input
                class="text-bx"
                placeholder="첨부파일"
                v-bind:id="'inputFileNm_' + props.rowData.id"
                v-model:value="props.rowData.orgnlFileNm"
                readonly
              />
            </a-form-item>
          </div>
        </div>
        <div class="select-btns" v-if="props.rowData.view">
          <CommonButton
            v-if="!!props.rowData.atchFileId"
            :title="`${props.rowData.orgnlFileNm} 다운로드`"
            @click="
              () =>
                fileDownload(
                  props.rowData.atchFileId,
                  props.rowData.atchFileSeq
                )
            "
          >
            <template #left-icon>
              <Icon name="downloadAtt" />
            </template>
            다운로드
          </CommonButton>
          <CommonButton
            v-if="!!props.rowData.pdfId"
            :title="`${props.rowData.orgnlFileNm} PDF 문서 바로보기 (새 창에서 열림)`"
            :to="`/streamdocs/view/sd;streamdocsId=${props.rowData.pdfId}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <template #left-icon>
              <Icon name="shortcut" />
            </template>
            바로보기
          </CommonButton>
        </div>
        <div class="select-btns" v-else-if="!props.rowData.view">
          <!--전자증명-->
          <button
            type="button"
            class="btn"
            :class="setActiveEzForm"
            @click="btn_ezForm_click"
          >
            <span class="txt">전자증명</span>
          </button>
          <!--//전자증명-->
          <!--파일첨부-->
          <div
            class="btn file-input"
            :class="setActiveLocalFile"
            @click="btn_localFile_click"
          >
            <AllyFileButton class="txt">
              <template #input>
                <label for="fileInput">
                  <span class="sr-only">파일첨부</span>
                </label>
                <input
                  type="file"
                  v-bind:id="'inputLocalFile_' + props.rowData.id"
                  class="sr-only"
                  aria-hidden="true"
                  tabindex="-1"
                  @change="input_localFile_fileChange"
                />
              </template>
            </AllyFileButton>
          </div>
          <!--//파일첨부-->
          <!--나의서류-->
          <button
            type="button"
            class="btn"
            :class="setActiveMyDoc"
            @click="btn_myDoc_click"
          >
            <span class="txt">나의서류</span>
          </button>
          <!--//나의서류-->
        </div>
        <div class="del-btn" v-if="!props.rowData.view">
          <button
            type="button"
            class="btn"
            @click="resetRow(`${props.rowData.sbmsnMthdCd}`)"
            v-if="
              props.rowData.sbmsnMthdCd === 'D001' ||
              props.rowData.sbmsnMthdCd === 'D002'
            "
          >
            <span class="txt">삭제</span>
          </button>
          <button
            type="button"
            class="btn"
            @click="btn_guide_click"
            v-if="props.rowData.sbmsnMthdCd === 'D003'"
          >
            <span class="txt">제출안내</span>
          </button>
        </div>
      </div>
    </div>
  </client-only>
  <!-- 제출안내 팝업 Component -->
  <ElrcptGdPopup ref="elrcptGdModal" />
  <!-- 나의서류 팝업 Component -->
  <MyDocPopup ref="myDocModal" @myDoc="selectMyDoc" />
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKcabM';
</style>
