<!--
 * 파일명 : docAtchfileForm
 * 작성자 : KJH
 * 설명   : 전자접수 공통 업로드 컴포넌트
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.08  KJH     최초생성
-->
<script setup lang="ts">
import { ref } from 'vue';
import FileUploadRow, { FileUploadRowData } from './comAtchfileRow.vue';
import { useFileStore } from '~/stores/atchfile';

/* alert창 선언 */
const { showAlert } = useCustomAlert();

const atchFileStore = useFileStore();

const props = defineProps({
  view: {
    type: Boolean,
    default: false
  },
  evdncDocSeCd: {
    type: String
  },
  docId: {
    type: String
  },
  atchFileId: {
    type: String
  }
});

let uploader = '';
const uuid = 'uploader_' + Date.now();

/* 자식 data ref 배열 */
const rows = ref<FileUploadRowData[]>([]);

/**
 * name : addRow
 * desc : 자식 data 행 추가
 */
const addRow = () => {
  rows.value.push({
    view: props.view,
    id: props.evdncDocSeCd + '-' + props.docId + '-' + Date.now(),
    rowStatus: 'I',
    sbmsnMthdCd: '', //제출방법코드(D001: 나의서식, D002: 파일첨부, D003: 전자증명서)
    atchFileId: '', //첨부파일ID
    orgnlFileNm: '' //원본파일명
  });
};

/**
 * name : updateRow
 * desc : 자식 data 행 수정
 */
const updateRow = (index: number, rowData: FileUploadRowData) => {
  rows.value[index] = {
    ...rowData,
    rowStatus: `${rowData.rowStatus}` == 'N' ? 'U' : 'I'
  };
};

/**
 * name : deleteRow
 * desc : 자식 data 행 삭제
 */
const deleteRow = () => {
  const index = rows.value.length - 1;
  const rowData = rows.value[index];

  if (`${rowData.atchFileId}`) {
    rows.value[index] = { ...rowData, rowStatus: 'D' };
  } else {
    rows.value[index] = { ...rowData, rowStatus: 'D' };
    //rows.value.splice(-1, 1);
  }
};

/**
 * name : transferFiles
 * desc : 파일 전송
 */
const transferFiles = async () => {
  // 유효성 체크
  for (const rowData of rows.value) {
    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      const file = <HTMLInputElement>(
        document.getElementById('inputLocalFile_' + `${rowData.id}`)
      );

      // 나의서식 체크
      if (`${rowData.sbmsnMthdCd}` == 'D001') {
        const btnMyDoc = <HTMLButtonElement>(
          document.getElementById('btnMyDoc_' + `${rowData.id}`)
        );
      }
      // 파일첨부 체크
      else if (`${rowData.sbmsnMthdCd}` == 'D002') {
        const btnLocalFile = <HTMLDivElement>(
          document.getElementById('btnLocalFile_' + `${rowData.id}`)
        );

        if (!file.value) {
          showAlert({
            icon: 'warning', //error, warning
            text: '파일을 등록해주세요.'
          });
          btnLocalFile.focus();
          return;
        }
      }
      // 전자증명서 체크
      else if (`${rowData.sbmsnMthdCd}` == 'D003') {
        const btnEzForm = <HTMLButtonElement>(
          document.getElementById('btnEzForm_' + `${rowData.id}`)
        );
      }
    }
  }

  // 로컬첨부파일 업로드
  for (const rowData of rows.value) {
    const index = rows.value.indexOf(rowData);

    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      const file = <HTMLInputElement>(
        document.getElementById('inputLocalFile_' + `${rowData.id}`)
      );

      let atchFileId = `${rowData.atchFileId}`;

      // 기존 첨부파일이 없다면
      if (!atchFileId) {
        // 첨부파일ID 생성
        const { data } = await atchFileStore.createAtchFileId('elrcpt');

        atchFileId = data.atchFileId;
        rows.value[index] = { ...rowData, atchFileId: atchFileId };
      }
      console.log('atchFileId >>> ' + atchFileId);

      // 로컬파일을 DEXT5UPLOAD에 추가
      DEXT5UPLOAD.AddLocalFileObject(
        file,
        JSON.stringify({ atchFileId: atchFileId }),
        uploader
      );
    }
  }
  console.log(DEXT5UPLOAD.GetFileObjectList(uploader));

  // 공통첨부파일 업로드
  DEXT5UPLOAD.SetConfig(
    'HandlerUrl',
    '/api/comAtchFile/uploadComAtchFile',
    uploader
  );

  DEXT5UPLOAD.Transfer(uploader);
};

/**
 * name : transferComplete
 * desc : 파일 전송 완료 후
 */
const transferComplete = async (uploadId) => {
  console.log('##TransferComplete >>');
  const uploadJson = DEXT5UPLOAD.GetNewUploadListForJson(uploadId);

  const markArr: Array = uploadJson.mark;
  const atchFileIdArr: Array = [];

  markArr.forEach((mark, index) => {
    const markJson = JSON.parse(mark);
    atchFileIdArr.push(markJson.atchFileId);
  });
  console.log(atchFileIdArr);

  rows.value.forEach((rowData, index) => {
    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      const uploadIndex = atchFileIdArr.indexOf(`${rowData.atchFileId}`);

      rows.value[index] = {
        ...rowData,
        strgFileNm: uploadJson.uploadName[uploadIndex], //저장파일명
        orgnlFileNm: uploadJson.originalName[uploadIndex], //원본파일명
        atchFilePathNm: uploadJson.uploadPath[uploadIndex], //첨부파일경로명
        atchFileKndNm: uploadJson.mimeType[uploadIndex] //첨부파일종류명
      };
      console.log(rows.value[index]);
    }
  });

  //서버에서 @ModelAttribute 로 받을 경우
  //appendArrayToFormData(formData, 'comAtchFileListVO', rows.value);

  // 공통첨부파일 등록
  const { data } = await atchFileStore.insertComAtchFile(rows.value);
};

/**
 * name : appendArrayToFormData
 * desc : Array 타입을 FormData로 변환
 */
const appendArrayToFormData = (formData: FormData, key: string, array: T[]) => {
  array.forEach((item, index) => {
    Object.entries(item).forEach(([field, value]) => {
      formData.append(`${key}[${index}].${field}`, String(value));
    });
  });
};

/**
 * name : onMounted
 * desc : 컴포넌트 mount
 */
onMounted(() => {
  const script = document.createElement('script');
  script.src = '/dext5/js/dext5upload.js';

  script.onload = () => {
    DEXT5UPLOAD.config.Event = {
      // 파일 전송 완료 후 처리 로직
      TransferComplete: (uploadId) => {
        transferComplete(uploadId);
      }
    };

    DEXT5UPLOAD.config.UploadMethodHtml4 = '1'; //html4에 대한 설정 (0: swf, 1: standard)
    DEXT5UPLOAD.config.UploadHolder = uuid;

    const dext5 = new Dext5Upload();
    uploader = dext5.ID;
  };

  document.head.appendChild(script);

  addRow();
});
</script>

<template>
  <client-only>
    <div class="submit-top">
      <div class="top-txt">
        <span class="flag">선택</span>
        추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.
      </div>
      <div class="top-btns" v-if="!props.view">
        <button type="button" class="btn add" @click="addRow">행추가</button>
        <button type="button" class="btn del" @click="deleteRow">행삭제</button>
        <button type="button" class="btn" @click="transferFiles">업로드</button>
      </div>
    </div>
    <div class="submit-module">
      <!--module-->
      <FileUploadRow
        v-for="(row, index) in rows"
        :key="row.id"
        :rowData="row"
        @update="updateRow(index, $event)"
      />
      <!--//module-->
    </div>
    <div :id="`${uuid}`" style="display: none"></div>
  </client-only>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKcabM';
</style>
