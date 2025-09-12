<script setup lang="ts">
import FileUploadRow, {
  FileUploadRowData
} from '~/components/data/docAtchfileRow.vue';
import { ref } from 'vue';
import { useFileStore } from '~/stores/atchfile';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { isNull } from '~/utils/commonUtils';

/* alert창 선언 */
const { showAlert } = useCustomAlert();

const paramProps = defineProps({
  view: {
    type: Boolean,
    default: false
  },
  incdntAplyNo: String, //사건신청번호
  slfDgnsNo: String //자가진단번호
});

/** 자식이 노출하는 타입 정의 */
type ChildExpose = {
  focusSelectDocId: () => void;
  focusInputFileNm: () => void;
};
/** 자식 컴포넌트들을 ref 배열로 관리 */
const childRefs = ref<(ChildExpose | null)[]>([]);
/** ref 설정 함수 (v-for에서 ref를 동적으로 바인딩) */
const setChildRef = (index: number) => {
  return (el: ChildExpose | null) => {
    childRefs.value[index] = el;
  };
};

/** 사건파일정보리스트 */
const incdntFileList = ref<FileUploadRowData[]>([]);

/** 파일 전체리스트 **/
const totFileList = ref<FileUploadRowData[]>([]);
/** 전자증명 파일리스트 **/
const ezFormFileList = ref<FileUploadRowData[]>([]);
/** 파일첨부 파일리스트 **/
const localFileFileList = ref<FileUploadRowData[]>([]);
/** 나의서류 파일리스트 **/
const myDocFileList = ref<FileUploadRowData[]>([]);

/** 사건선택셀렉트리스트 **/
const incdntSelList = ref<FileUploadRowData[]>([]);
/** 중위소득직장사가입자선택셀렉트리스트 **/
const mdicmSelA001List = ref<FileUploadRowData[]>([]);
/** 중위소득지역가입자선택셀렉트리스트 **/
const mdicmSelA002List = ref<FileUploadRowData[]>([]);
/** 중위소득피부양자선택셀렉트리스트 **/
const mdicmSelA003List = ref<FileUploadRowData[]>([]);
/** 중위소득미가입자선택셀렉트리스트 **/
const mdicmSelA004List = ref<FileUploadRowData[]>([]);
/** 대상자선택셀렉트리스트 **/
const atrprSelList = ref<FileUploadRowData[]>([]);

/** 대상자선택존재여부 확인 **/
let atrprSelYn = ref('Y');

/** 사건선택존재여부 확인 **/
let incdntnSelYn = ref('Y');

/** 대상자명  **/
let atrprTitle = '';
/** 사건명 **/
let incdntTitle = '';

// DEXT5UPLOAD 관련 변수 선언 start
const atchFileStore = useFileStore();
let uploader = '';
const uploaderId = 'uploader_' + Date.now();
const emit = defineEmits(['callback']);
// DEXT5UPLOAD 관련 변수 선언 end

const generateUnqueId = (prefix = 'uid'): string => {
  /*if (typeof crypto !== 'undefined' && crypto.randomUUID()) {
    return `${prefix}-${crypto.randomUUID()}`;
  }*/
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 * name : addRow
 * desc : 자식 data 행 추가 구분코드와 보험가입자구분코드를 넣어준다.
 */
const addRow = (pGbnCd, pInsrncSbsrSeCd) => {
  let evdncDocSeCd = ''; //증빙문서구분코드
  if (pGbnCd === '01') {
    //대상자
    evdncDocSeCd = 'G005'; //선택구조대상자첨부파일 선택 구조대상자 첨부파일
  } else if (pGbnCd === '02') {
    //중위소득
    evdncDocSeCd = 'G007'; //선택중위소득첨부파일 선택 중위소득 첨부파일
  } else if (pGbnCd === '03') {
    //사건
    evdncDocSeCd = 'G003'; //개별선택구조대상사건첨부파일 개별 선택 구조대상사건 첨부파일
  }

  totFileList.value.push({
    docId: '',
    view: false, //paramProps.view,
    id: generateUnqueId(),
    rowStatus: 'I',
    atchFileId: '', //첨부파일ID
    orgnlFileNm: '', //원본파일명
    sbmsnMthdCd: 'D002', //제출방법코드(D001: 나의서식, D002: 파일첨부, D003: 전자증명서)
    displayYn: 'Y',
    gbnCd: pGbnCd,
    insrncSbsrSeCd: pInsrncSbsrSeCd,
    evdncDocSeCd: evdncDocSeCd //증빙문서구분코드
  });
};

/**
 * name : updateRow
 * desc : 자식 data 행 수정
 */
const updateRow = (index: number, rowData: FileUploadRowData) => {
  totFileList.value[index] = {
    ...rowData,
    rowStatus: `${rowData.rowStatus}` == 'N' ? 'U' : 'I'
  };
};

/**
 * name : deleteRow
 * desc : 자식 data 행 삭제
 */
const deleteRow = async (pGbnCd, pInsrncSbsrSeCd) => {
  /*const idx = incdntFileList.value.findIndex(
    (item) => item.gbn === pGbnCd && item.insrncSbsrSeCd === pInsrncSbsrSeCd
  );*/
  const submit = await showAlert({
    icon: 'question',
    html: '첨부파일을 삭제 하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    let fIdx = '';
    let atchFileId = '';
    for (let i = totFileList.value.length; i >= 0; i--) {
      const gbnCd = totFileList.value[i]?.gbnCd ?? null;
      const insrncSbsrSeCd = totFileList.value[i]?.insrncSbsrSeCd ?? '';
      const esntlYn = totFileList.value[i]?.esntlYn ?? '';
      atchFileId = totFileList.value[i]?.atchFileId ?? '';

      if (
        gbnCd === pGbnCd &&
        insrncSbsrSeCd === pInsrncSbsrSeCd &&
        esntlYn !== 'Y'
      ) {
        fIdx = i;
        break;
      }
    }
    if (fIdx !== -1) {
      if (atchFileId === '') {
        //파일 아이디 없으면 삭제
        totFileList.value.splice(fIdx, 1);
      } else {
        //첨부파일 아이디가 존재하면 상태값만 D로 만듬
        totFileList.value[fIdx] = {
          ...totFileList.value[fIdx],
          rowStatus: 'D'
        };
      }
    }
  }
};

/**
 * name : transferFilesVaildation
 * desc : 파일 전송 유효성 체크
 */
const transferFilesVaildation = async () => {
  for (const rowData of totFileList.value) {
    const index = totFileList.value.indexOf(rowData);
    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      // 문서아이디 필수 체크
      if (isNull(`${rowData.docId}`)) {
        childRefs.value[index]?.focusSelectDocId();
        await showAlert({
          icon: 'warning', //error, warning
          text: '제출서류를 선택해주세요.'
        });
        return false;
      }

      // 제출방법 필수 체크
      if (isNull(`${rowData.sbmsnMthdCd}`)) {
        childRefs.value[index]?.focusInputFileNm();
        await showAlert({
          icon: 'warning', //error, warning
          text: '제출방법을 선택해주세요.'
        });
        return false;
      }

      // 나의서식 필수 체크
      if (`${rowData.sbmsnMthdCd}` == 'D001') {
        if (
          isNull(`${rowData.myDocAtchFileId}`) ||
          isNull(`${rowData.myDocAtchFileSeq}`)
        ) {
          childRefs.value[index]?.focusInputFileNm();
          await showAlert({
            icon: 'warning', //error, warning
            text: '나의서류를 등록해주세요.'
          });
          return false;
        }
      }
      // 파일첨부 필수 체크
      else if (`${rowData.sbmsnMthdCd}` == 'D002') {
        const file = <HTMLInputElement>(
          document.getElementById('inputLocalFile_' + `${rowData.id}`)
        );

        if (!file.value) {
          childRefs.value[index]?.focusInputFileNm();
          await showAlert({
            icon: 'warning', //error, warning
            text: '파일을 등록해주세요.'
          });
          return false;
        }
      }
      // 전자증명서 필수 체크
      else if (`${rowData.sbmsnMthdCd}` == 'D003') {
      }
    }
  }

  return true;
};

/**
 * name : transferFiles
 * desc : 파일 전송
 */
const transferFiles = async () => {
  // 유효성 체크
  if (!(await transferFilesVaildation())) return;

  try {
    for (const rowData of totFileList.value) {
      const index = totFileList.value.indexOf(rowData);

      // 입력, 수정 상태일 경우만
      if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
        // 전자증명 skip
        if (`${rowData.sbmsnMthdCd}` === 'D003') {
          totFileList.value[index] = { ...rowData, rowStatus: 'N' };
        }

        let atchFileId = `${rowData.atchFileId}`;

        //등록
        if (`${rowData.rowStatus}` === 'I') {
          // 첨부파일아이디 생성
          const { data } = await atchFileStore.createAtchFileId('elrcpt');

          atchFileId = data.atchFileId;
          totFileList.value[index] = { ...rowData, atchFileId: atchFileId };
        }
        //수정
        else if (`${rowData.rowStatus}` === 'U') {
          // 첨부파일아이디가 없다면
          if (isNull(atchFileId)) {
            throw new Error('첨부파일아이디가 존재하지 않습니다.');
          }
        }

        // 파일첨부 일 경우 로컬파일을 DEXT5UPLOAD에 추가
        if (`${rowData.sbmsnMthdCd}` == 'D002') {
          const file = <HTMLInputElement>(
            document.getElementById('inputLocalFile_' + `${rowData.id}`)
          );

          DEXT5UPLOAD.AddLocalFileObject(
            file,
            JSON.stringify({ atchFileId: atchFileId }),
            uploader
          );
        }
      }
    }
  } catch (e) {
    // DEXT5UPLOAD 파일리스트를 모두 삭제
    //DEXT5UPLOAD.DeleteAllFile(uploader);

    console.error(e);
    await showAlert({
      icon: 'error', //error, warning
      text: '파일을 처리하는 도중 에러가 발생되었습니다.'
    });
    return;
  }
  console.log('======>');
  console.log(DEXT5UPLOAD.GetFileObjectList(uploader));

  if (DEXT5UPLOAD.GetFileObjectList(uploader).length > 0) {
    // 공통첨부파일 업로드
    DEXT5UPLOAD.SetConfig(
      'HandlerUrl',
      '/api/comAtchFile/uploadComAtchFile',
      uploader
    );

    DEXT5UPLOAD.Transfer(uploader);
  } else {
    // 공통첨부파일 등록
    insertComAtchFile();
  }
};

/**
 * name : transferComplete
 * desc : 파일 전송 완료 후
 */
const transferComplete = async (uploadId) => {
  const uploadJson = DEXT5UPLOAD.GetNewUploadListForJson(uploadId);
  //console.log(uploadJson);

  // 전자증명 등록
  await insertEzForm();
  // 파일첨부 등록
  await insertLocalFile(uploadJson);
  // 나의서식 등록
  await insertMyDoc();

  emit('callback', totFileList.value);
};

/**
 * name : insertComAtchFile
 * desc : 공통첨부파일 등록
 */
const insertComAtchFile = async () => {
  // 전자증명 등록
  await insertEzForm();
  // 나의서식 등록
  await insertMyDoc();

  emit('callback', totFileList.value);
};

/**
 * name : insertEzForm
 * desc : 전자증명 등록
 */
const insertEzForm = async () => {
  let cnt = 0;

  // 초기화
  ezFormFileList.value = [];

  // 데이터 세팅
  for (const rowData of totFileList.value) {
    const index = totFileList.value.indexOf(rowData);

    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      // 전자증명
      if (`${rowData.sbmsnMthdCd}` === 'D003') {
        ezFormFileList.value.push({
          ...rowData
        });

        cnt++;
      }
    }
  }

  if (cnt > 0) {
  }
};

/**
 * name : insertLocalFile
 * desc : 파일첨부 등록
 */
const insertLocalFile = async (uploadJson: any) => {
  if (!uploadJson) return;

  const markArr: Array<T> = uploadJson.mark;
  const atchFileIdArr: Array<T> = [];

  markArr.forEach((mark, index) => {
    const markJson = JSON.parse(mark);
    atchFileIdArr.push(markJson.atchFileId);
  });

  let cnt = 0;

  // 초기화
  localFileFileList.value = [];

  // 데이터 세팅
  for (const rowData of totFileList.value) {
    const index = totFileList.value.indexOf(rowData);

    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      // 파일첨부
      if (`${rowData.sbmsnMthdCd}` === 'D002') {
        const uploadIndex = atchFileIdArr.indexOf(`${rowData.atchFileId}`);

        localFileFileList.value.push({
          ...rowData,
          strgFileNm: uploadJson.uploadName[uploadIndex], //저장파일명
          orgnlFileNm: uploadJson.originalName[uploadIndex], //원본파일명
          atchFilePathNm: uploadJson.uploadPath[uploadIndex], //첨부파일경로명
          atchFileKndNm: uploadJson.mimeType[uploadIndex] //첨부파일종류명
        });

        cnt++;
      }
    }
  }

  if (cnt > 0) {
    console.log('파일첨부 파일 목록 >>>>>');
    console.log(localFileFileList.value);

    // 공통첨부파일 등록
    await atchFileStore.insertComAtchFile(localFileFileList.value).then(() => {
      // 부모 컴포넌트 callback 함수 호출
      //emit('callback', totFileList.value);
      // DEXT5UPLOAD 파일리스트를 모두 삭제
      //DEXT5UPLOAD.DeleteAllFile(uploader);
      console.log(DEXT5UPLOAD.GetFileObjectList(uploader));
    });
  }
};

/**
 * name : insertMyDoc
 * desc : 나의서식 등록
 */
const insertMyDoc = async () => {
  let cnt = 0;

  // 초기화
  myDocFileList.value = [];

  // 데이터 세팅
  for (const rowData of totFileList.value) {
    const index = totFileList.value.indexOf(rowData);

    // 입력, 수정 상태일 경우만
    if (['I', 'U'].includes(`${rowData.rowStatus}`)) {
      // 나의서식
      if (`${rowData.sbmsnMthdCd}` === 'D001') {
        // 공통첨부파일 조회
        const response = await atchFileStore.selectComAtchFile(
          `${rowData.myDocAtchFileId}`,
          Number(`${rowData.myDocAtchFileSeq}`)
        );

        myDocFileList.value.push({
          ...rowData,
          strgFileNm: response.data.strgFileNm, //저장파일명
          orgnlFileNm: response.data.orgnlFileNm, //원본파일명
          atchFilePathNm: response.data.atchFilePathNm, //첨부파일경로명
          atchFileKndNm: response.data.atchFileKndNm //첨부파일종류명
        });

        cnt++;
      }
    }
  }

  if (cnt > 0) {
    console.log('나의서식 파일 목록 >>>>>');
    console.log(myDocFileList.value);

    // 공통첨부파일(복사) 등록
    await atchFileStore.insertComAtchFileCopy(myDocFileList.value).then(() => {
      // 부모 컴포넌트 callback 함수 호출
      //emit('callback', totFileList.value);
    });
  }
};

/**
 * name : onMounted
 * desc : 컴포넌트 mount
 */
onMounted(() => {
  //사건신청번호가 들어온다면 조회한다.
  if (paramProps.incdntAplyNo === '') {
    selectElrcptFileList();
  } else {
    selectElrcptFileCateList();
  }
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
    DEXT5UPLOAD.config.UploadHolder = uploaderId;

    const dext5 = new Dext5Upload();
    uploader = dext5.ID;
  };

  document.head.appendChild(script);
});

/**
 * name : selectElrcptFileCateList
 * desc : 카테고리 정보를 가져온다.
 */
const selectElrcptFileCateList = async () => {
  const res = await useAxios()
    .get(
      '/api/elrcpt/cmm/selectElrcptFileList?slfDgnsNo=' + paramProps.slfDgnsNo
    )
    .then((res) => {
      incdntFileList.value = res.data;
      let atrptIdx = 1;
      let incdntIdx = 1;
      for (let i = 0; i < incdntFileList.value.length; i++) {
        const esntlYn = incdntFileList.value[i]?.esntlYn ?? null;
        const gbnCd = incdntFileList.value[i]?.gbnCd ?? null;
        const titleNm = incdntFileList.value[i]?.titleNm ?? null;
        if (gbnCd === '01' && atrprTitle === '') {
          atrprTitle = titleNm;
        } else if (gbnCd === '03' && incdntTitle === '') {
          incdntTitle = titleNm;
        }
        if (esntlYn === 'Y') {
          //필수일 경우 fileList에 추가
          if (gbnCd === '01') {
            incdntFileList.value[i].seq = atrptIdx;
            atrptIdx = atrptIdx + 1;
          } else if (gbnCd === '03') {
            incdntFileList.value[i].seq = incdntIdx;
            incdntIdx = incdntIdx + 1;
          }
        } else {
          if (gbnCd === '01') {
            //대상자 셀렉트박스에 추가
            atrprSelList.value.push(incdntFileList.value[i]);
            incdntFileList.value[i].seq = atrptIdx;
            atrptIdx = atrptIdx + 1;
          } else if (gbnCd === '02') {
            //중위소득 셀렉트박스에 추가
            const insrncSbsrSeCd =
              incdntFileList.value[i]?.insrncSbsrSeCd ?? null;
            if (insrncSbsrSeCd === 'A001') {
              mdicmSelA001List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A002') {
              mdicmSelA002List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A003') {
              mdicmSelA003List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A004') {
              mdicmSelA004List.value.push(incdntFileList.value[i]);
            }
          } else if (gbnCd === '03') {
            //사건 셀렉트박스에 추가
            incdntSelList.value.push(incdntFileList.value[i]);
            incdntFileList.value[i].seq = incdntIdx;
            incdntIdx = incdntIdx + 1;
          }
        }
      }
      if (atrprSelList.value.length === 0) {
        atrprSelYn = 'N';
      }
      if (incdntSelList.value.length === 0) {
        incdntnSelYn = 'N';
      }
      selectElrcptAplyFileList();
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : selectElrcptAplyFileList
 * desc : 대상자, 중위소득, 사건 파일 정보를 가져온다.
 */
const selectElrcptAplyFileList = async () => {
  const aplyres = await useAxios()
    .get(
      '/api/elrcpt/cmm/selectElrcptAplyFileList?incdntAplyNo=' +
        paramProps.incdntAplyNo
    )
    .then((res) => {
      totFileList.value = res.data;
      for (let i = 0; i < totFileList.value.length; i++) {
        totFileList.value[i].view = paramProps.view;
        if (totFileList.value[i].esntlYn !== 'Y') {
          //필수가 아닌경우 표출여부를 Y로 세팅한다.
          totFileList.value[i].displayYn = 'Y';
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
/**
 * name : selectElrcptFileList
 * desc : 대상자, 중위소득, 사건정보 파일 정보를 가져온다.
 */
const selectElrcptFileList = async () => {
  const res = await useAxios()
    .get(
      '/api/elrcpt/cmm/selectElrcptFileList?slfDgnsNo=' + paramProps.slfDgnsNo
    )
    .then((res) => {
      incdntFileList.value = res.data;
      let atrptIdx = 1;
      let incdntIdx = 1;
      for (let i = 0; i < incdntFileList.value.length; i++) {
        const esntlYn = incdntFileList.value[i]?.esntlYn ?? null;
        const gbnCd = incdntFileList.value[i]?.gbnCd ?? null;
        const titleNm = incdntFileList.value[i]?.titleNm ?? null;
        if (gbnCd === '01' && atrprTitle === '') {
          atrprTitle = titleNm;
        } else if (gbnCd === '03' && incdntTitle === '') {
          incdntTitle = titleNm;
        }
        if (esntlYn === 'Y') {
          if (gbnCd === '01') {
            incdntFileList.value[i].seq = atrptIdx;
            atrptIdx = atrptIdx + 1;
          } else if (gbnCd === '03') {
            incdntFileList.value[i].seq = incdntIdx;
            incdntIdx = incdntIdx + 1;
          }
          //필수일 경우 fileList에 추가
          totFileList.value.push({
            ...incdntFileList.value[i],
            view: paramProps.view,
            id: generateUnqueId(),
            rowStatus: incdntFileList.value[i]?.atchFileId ? 'N' : 'I',
            sbmsnMthdCd: incdntFileList.value[i]?.sbmsnMthdCd ?? 'D002'
            // atchFileId: 'I0010000000000003969',
            // atchFileSeq: 1,
            // orgnlFileNm: '필수 설치 프로그램.hwpx',
            // pdfId: 'OlR5wrkIlghzBD7R9ePNXfPZkbUxucwFgeRBbpZLpyk'
          });
        } else {
          if (gbnCd === '01') {
            //대상자 셀렉트박스에 추가
            atrprSelList.value.push(incdntFileList.value[i]);
            incdntFileList.value[i].seq = atrptIdx;
            atrptIdx = atrptIdx + 1;
          } else if (gbnCd === '02') {
            //중위소득 셀렉트박스에 추가
            const insrncSbsrSeCd =
              incdntFileList.value[i]?.insrncSbsrSeCd ?? null;
            if (insrncSbsrSeCd === 'A001') {
              mdicmSelA001List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A002') {
              mdicmSelA002List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A003') {
              mdicmSelA003List.value.push(incdntFileList.value[i]);
            } else if (insrncSbsrSeCd === 'A004') {
              mdicmSelA004List.value.push(incdntFileList.value[i]);
            }
          } else if (gbnCd === '03') {
            //사건 셀렉트박스에 추가
            incdntSelList.value.push(incdntFileList.value[i]);
            incdntFileList.value[i].seq = incdntIdx;
            incdntIdx = incdntIdx + 1;
          }
        }
      }

      if (atrprSelList.value.length === 0) {
        atrprSelYn = 'N';
      }
      if (incdntSelList.value.length === 0) {
        incdntnSelYn = 'N';
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

defineExpose({
  transferFiles
});

const setView = (isView) => {
  totFileList.value.forEach((rowData, index) => {
    totFileList.value[index] = {
      ...totFileList.value[index],
      view: isView
    };
  });
};
</script>

<template>
  <!--  <ButtonGroup align="center" class="!mt-50px">
    <CommonButton variants="line-primary" width="lg" @click="setView(false)">
      등록/수정
    </CommonButton>
    <CommonButton variants="primary" width="lg" @click="setView(true)">
      상세조회
    </CommonButton>
  </ButtonGroup>-->
  <div class="receipt-form-info">
    <div class="tit">법률구조대상자 {{ atrprTitle }} 증빙서류</div>
    <div class="info-box">
      <div class="info-top">
        법률구조대상자 입증을 위해 아래와 같은 증빙서류 제출이 필요합니다.
      </div>
      <ul class="info-list">
        <li v-for="(row, index) in incdntFileList">
          <template v-if="row.gbnCd === '01'">
            <span class="num">{{ row.seq }}. </span> {{ row.docNm }}
            <template v-if="row.esntlYn === 'Y'"> (필수)</template>
            <template v-else> (선택)</template>
          </template>
        </li>
      </ul>
    </div>
  </div>

  <div class="receipt-submit-box">
    <div class="receipt-submit-item">
      <template v-for="(row, index) in totFileList">
        <template v-if="row.gbnCd === '01'">
          <div class="submit-top" v-if="row.esntlYn === 'Y'">
            <div class="top-txt">
              <span class="flag filled">필수</span>
              <strong>{{ row.docNm }}</strong>
            </div>
          </div>
          <div class="submit-module">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="incdntFileList"
              v-if="row.esntlYn === 'Y'"
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </div>
        </template>
      </template>
    </div>
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">
          <span class="flag">선택</span>
          추가버튼을 클릭하여 제출 가능한 서류를 등록하세요
        </div>
        <div class="top-btns" v-if="!paramProps.view">
          <button type="button" class="btn add" @click="addRow('01', '')">
            행추가
          </button>
          <button type="button" class="btn del" @click="deleteRow('01', '')">
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '01'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="atrprSelList"
              v-if="row.displayYn === 'Y' && row.gbnCd === '01'"
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="receipt-form-info">
    <div class="tit">
      <div>
        기준중위소득 소득요건 입증자료
        <span class="sub">소득제한 125% 또는 150% 대상자의 추가제출 서류</span>
      </div>
    </div>
    <div class="info-box">
      <div class="info-top">
        기준중위소득 소득요건 입증을 위하여 증빙서류 제출이 필요합니다.
        <br class="pc-only" />
        건강보험가입자 유형에 따라 제출가능 한 서류를 택1하여 등록해주세요.
      </div>
    </div>
  </div>

  <div class="receipt-submit-box">
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">[건강보험직장가입자]</div>
        <div class="top-btns">
          <button type="button" class="btn add" @click="addRow('02', 'A001')">
            행추가
          </button>
          <button
            type="button"
            class="btn del"
            @click="deleteRow('02', 'A001')"
          >
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '02'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="mdicmSelA001List"
              v-if="
                row.displayYn === 'Y' &&
                row.gbnCd === '02' &&
                row.insrncSbsrSeCd === 'A001'
              "
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">[건강보험지역가입자]</div>
        <div class="top-btns">
          <button type="button" class="btn add" @click="addRow('02', 'A002')">
            행추가
          </button>
          <button
            type="button"
            class="btn del"
            @click="deleteRow('02', 'A002')"
          >
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '02'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="mdicmSelA002List"
              v-if="
                row.displayYn === 'Y' &&
                row.gbnCd === '02' &&
                row.insrncSbsrSeCd === 'A002'
              "
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">[건강보험피부양자]</div>
        <div class="top-btns">
          <button type="button" class="btn add" @click="addRow('02', 'A003')">
            행추가
          </button>
          <button
            type="button"
            class="btn del"
            @click="deleteRow('02', 'A003')"
          >
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '02'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="mdicmSelA003List"
              v-if="
                row.displayYn === 'Y' &&
                row.gbnCd === '02' &&
                row.insrncSbsrSeCd === 'A003'
              "
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">[건강보험미가입자]</div>
        <div class="top-btns">
          <button type="button" class="btn add" @click="addRow('02', 'A004')">
            행추가
          </button>
          <button
            type="button"
            class="btn del"
            @click="deleteRow('02', 'A004')"
          >
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '02'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="mdicmSelA004List"
              v-if="
                row.displayYn === 'Y' &&
                row.gbnCd === '02' &&
                row.insrncSbsrSeCd === 'A004'
              "
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="receipt-form-info">
    <div class="tit">사건관련 제출[{{ incdntTitle }}] 필요서류</div>
    <div class="info-box">
      <div class="info-top">
        전자접수 신청사건 관련하여 아래와 같은 서류 제출이 필요합니다.
      </div>
      <ul class="info-list">
        <li v-for="(row, index) in incdntFileList">
          <template v-if="row.gbnCd === '03'">
            <span class="num">{{ row.seq }}. </span> {{ row.docNm }}
            <template v-if="row.esntlYn === 'Y'"> (필수)</template>
            <template v-else> (선택)</template>
          </template>
        </li>
      </ul>
    </div>
  </div>

  <div class="receipt-submit-box">
    <div class="receipt-submit-item">
      <template v-for="(row, index) in totFileList">
        <template v-if="row.gbnCd === '03'">
          <div class="submit-top" v-if="row.esntlYn === 'Y'">
            <div class="top-txt">
              <span class="flag filled">필수</span>
              <strong>{{ row.docNm }}</strong>
            </div>
          </div>
          <div class="submit-module">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="incdntFileList"
              v-if="row.esntlYn === 'Y'"
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </div>
        </template>
      </template>
    </div>
    <div class="receipt-submit-item">
      <div class="submit-top">
        <div class="top-txt">
          <span class="flag">선택</span>
          추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.
        </div>
        <div class="top-btns" v-if="!paramProps.view">
          <button type="button" class="btn add" @click="addRow('03', '')">
            행추가
          </button>
          <button type="button" class="btn del" @click="deleteRow('03', '')">
            행삭제
          </button>
        </div>
      </div>
      <div class="submit-module">
        <template v-for="(row, index) in totFileList">
          <template v-if="row.gbnCd === '03'">
            <FileUploadRow
              :key="row.id"
              :rowData="row"
              :selOp="incdntSelList"
              v-if="
                row.displayYn === 'Y' &&
                row.gbnCd === '03' &&
                row.rowStatus !== 'D'
              "
              @update="updateRow(index, $event)"
              :ref="setChildRef(index)"
            />
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="select-result-box">
    <div class="check-tit-box">
      <span class="ico-check-info"></span>
      <strong>입증자료를 입력 완료 하시겠습니까?</strong>
    </div>
    <a-radio-group>
      <a-radio class="radio-bx" value="예">예</a-radio>
      <a-radio class="radio-bx" value="아니요">아니요</a-radio>
    </a-radio-group>
  </div>
  <div :id="`${uploaderId}`" style="display: none"></div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKcabM';
</style>
