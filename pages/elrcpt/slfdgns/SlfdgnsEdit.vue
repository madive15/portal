<script setup lang="ts">
/*
 * 화면명 : 전자접수신청
 * 화면ID : LASP_ELE_003
 * 파일명 : SlfdgnsEdit
 * 작성자 : 문경훈
 * 화면 설명 : 전자접수안내 및 전자접수 이용절차 설명화면
 * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 * 변경일          변경자       변경내역
 * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 * 2025.07.29     문경훈       최초생성
 * 2025.08.04     이동규       LASP_ELE_003_03 작업 진행
 */

import { onMounted, onUnmounted, reactive, ref, onBeforeMount } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { cloneDeep } from 'lodash-es';
import { useAxios } from '~/composables/useAxios';
import * as elrcptApis from '~/composables/elrcpt';
import type {
  AtrprTypeListVO,
  ElrcptAplyInVO,
  OpenAtrprTypeInqPopupVO
} from '~/types/elrcpt';
import CommonButton from '~/components/ui/button/button.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import axios from 'axios';
import SelectInsrncPayPopup from '~/components/elrcpt/hltmInsrnc/SelectInsrncPayPopup.vue';
import InsrncPayPopupList from '~/components/elrcpt/hltmInsrnc/InsrncPayPopupList.vue';

/** alert창 선언 */
const { showAlert } = useCustomAlert();
/** 세션정보조회 */
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
/** 각 섹션의 top 위치 */
const stepSections = ref([]);
/** 현재 활성화된 step 인덱스 */
const activeStep = ref(0);
/** 라우터 선언 **/
const route = useRoute();
/**
 * name : updateSectionOffsets
 * desc : 각 스텝 컨텐츠의 위치 계산
 **/
const updateSectionOffsets = () => {
  stepSections.value = Array.from(
    document.querySelectorAll('.step-section')
  ).map((el) => {
    return {
      id: el.id,
      offsetTop: el.offsetTop
    };
  });
};

/**
 * name : onScroll
 * desc : 스크롤 이벤트 핸들러
 **/
const onScroll = () => {
  const scrollY = window.scrollY + 100; // 약간의 offset 보정
  for (let i = stepSections.value.length - 1; i >= 0; i--) {
    if (scrollY >= stepSections.value[i].offsetTop) {
      activeStep.value = i;
      break;
    }
  }
};

/**
 * name : onBeforeMount
 * desc : onMounted 발생 전에 발생
 **/
onBeforeMount(() => {
  // 로그인 완료상태
  if (authenticated.value) {
    // selectUserInfo();
    selectIncdntCtgry1LvList();
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
});

/**
 * name : onMounted
 * desc : 화면 최초 load시 발생
 **/
onMounted(() => {
  updateSectionOffsets();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', updateSectionOffsets);
});

/**
 * name : onUnmounted
 * desc : 화면 load 이후 발생
 **/
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', updateSectionOffsets);
});
/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await elrcptApis.selectLoginInfo();
};
/** 구조대상자 유형 찾기 팝업 오픈 여부를 결정 파라미터 */
const openAtrprTypeInq = ref(false);
/** 구조대상자 유형 찾기 팝업 호출 파라미터 기본 값 */
const DEFAULT_ATRPR_TYPE_INQ_POPUP_PARAM: OpenAtrprTypeInqPopupVO = {
  instNo: ''
};
/** 구조대상자 유형 찾기 팝업 호출 파라미터  */
const atrprTypeInqPopupParam = ref<OpenAtrprTypeInqPopupVO>(
  cloneDeep(DEFAULT_ATRPR_TYPE_INQ_POPUP_PARAM)
);

/** 조회하여 선택한 구조대상자 유형 리스트 */
const atrprTypeList = ref<AtrprTypeListVO>([]);

/** 전자접수신청 카테고리 조회 파라미터 */
const DEFAULT_ELRCPTAPLY_IN_VO: ElrcptAplyInVO = {
  ctgryNo: '',
  incdntId: '',
  instNo: '',
  mbrNo: '',
  mdicmNo: '',
  atrprNo: ''
};
/** 전자접수신청 사건 카테고리 조회 파라미터 */
const elrcptAplyInVO = ref<ElrcptAplyInVO>(cloneDeep(DEFAULT_ELRCPTAPLY_IN_VO));
/** 전자접수신청 사건 카테고리 1레벨 리스트 */
const tab1LvList = ref();
/** 전자접수신청 사건 카테고리 2레벨 리스트 */
const tab2LvList = ref();
/** 전자접수신청 사건 카테고리 3레벨 리스트 */
const tab3LvList = ref();
/** 사건 설명영역 데이터 */
const incdntDtlExpln = ref();
/** 전자접수 신청 제출 서류 리스트 */
const incdntAplySbmsnList = ref();
/** 제출서류 존재여부 */
const hasDocId = ref();
/** 1레벨 탭 조회시 렌더링 값 설정 */
const render = ref('false');
/** 필요자료 제출 가능여부 div */
const showSbmsnQstnDiv = ref(false);
/** 표출기관 리스트 */
const instList = ref();
/** 기관상세조회 */
const instDtl = ref('');
/** 구조대상자 상세조회 */
const sprtTrgtDtl = ref('');
/** 구조대상자 팝업 렌더링 값 설정 */
const atrprYn = ref(false);
/** 지원대상사건여부 렌더링 값 설정 */
const sprtTrgtIncdntYnRndr = ref(false);
/** 중위기준소득제한 렌더링 값 설정 */
const crtrMdicmIdntyRndr = ref(false);
const afterPopup = ref(false); // TODO - 임시
/** 중위기준소득제한 있는/없는 경우 */
const crtrMdicmIdntyYn = ref('');
/** 자가진단번호 */
const slfDgnsNo = ref('');
/** 폼 항목 */
const form = reactive({
  // 자가진단
  mbrNo: '',
  incdntId: '',
  instNo: '',
  mdicmNo: '',
  slfDgnsNm: '',
  useYn: '',
  atrprNo: '',
  frstRgtrId: ''
  // 사건신청
  // aplyPrgrsSttsCd: '',
  // bfrIncdntAplyNo: '',
  // prvcClctUtztnPrpsAgreYn: '', // 개인정보수집이용목적동의여부
  // tdptyPvsnAgreYn: '', // 제3자제공동의여부
  // casePvsnAgreYn: '', // 사례제공동의여부
  // rghtUdsdAgreYn: '', // 권리이해동의여부
  // smsRcptnAgreYn: '', // SMS수신동의여부
  // emlRcptnAgreYn: '', // 이메일수신동의여부
  // faceDscsnAgreYn: '', // 대면상담동의여부
  // indvPvsnAgreYn: '', // 개인제공동의여부
  // prvcPrcsAgreYn: '', // 개인정보처리동의여부
  // aplyDt: ''
});

/**
 * name : selectIncdntCtgry1LvList
 * desc : 대상사건이 포함된 １레벨 사건 카테고리 조회
 **/
const selectIncdntCtgry1LvList = async () => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectIncdntCtgry1LvList')
    .then((res) => {
      tab1LvList.value = res.data;
      render.value = true;
      console.log(tab1LvList.value);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : selectIncdntCtgry2lvList
 * desc : 대상사건이 포함된 2레벨 카테고리 조회
 **/
const selectIncdntCtgry2lvList = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  console.log(elrcptAplyInVO.value);
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectIncdntCtgry2lvList', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      // 카테고리 조회 데이터가 없으면 해당 파라미터로 신청가능한 사건 상세조회
      if (result.data.length <= 0) {
        selectIncdntDtlInq(elrcptAplyInVO);

        return;
      }
      tab2LvList.value = result.data;
      console.log(tab2LvList.value);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : selectIncdntCtgry3lvList
 * desc : 대상사건이 포함된 3레벨 카테고리 조회
 **/
const selectIncdntCtgry3lvList = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectIncdntCtgry3lvList', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      // 카테고리 조회 데이터가 없으면 해당 파라미터로 신청가능한 사건 상세조회

      if (result.data.length <= 0) {
        selectIncdntDtlInq(elrcptAplyInVO);

        return;
      }
      tab3LvList.value = result.data;
      console.log(result.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : selectIncdntDtlInq
 * desc : 전자접수 신청가능한 사건 상세조회
 **/
const selectIncdntDtlInq = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectIncdntDtlInq', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      /** 사건명, 사건설명 */
      incdntDtlExpln.value = result.data[0];
      /** 전자접수 신청 제출서류 */
      incdntAplySbmsnList.value = result.data.map((rslt) => ({
        esntlYn: rslt.esntlYn,
        docNm: rslt.docNm,
        docId: rslt.docId
      }));
      /** 제출서류 존재여부 */
      hasDocId.value = incdntAplySbmsnList.value[0].docId;
      showSbmsnQstnDiv.value = true;

      // 기관목록조회 파라미터 세팅
      elrcptAplyInVO.value.incdntId = result.data[0].incdntId;
      // 기관목록조회
      selectInstList(elrcptAplyInVO);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : selectInstList
 * desc : 기관목록조회
 **/
const selectInstList = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectInstList', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      console.log('param ::: ' + elrcptAplyInVO.value.incdntId);
      console.log('기관list count ::: ' + result.data.length);
      console.log(result);

      // instList.value = result.data;
      instList.value = result.data.map((result) => ({
        instNo: result.instNo,
        mngInstNm: result.mngInstNm,
        content: result.content,
        atchFileId: '/api/image?atchFileId=' + result.atchFileId,
        atchFileSeq: '&atchFileSeq=' + result.atchFileSeq
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * name : selectInstDtlInq
 * desc : 기관상세조회
 **/
const selectInstDtlInq = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectInstDtlInq', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      instDtl.value = result.data[0];
      // 사건설명 세팅
      instDtl.value.incdntExpln = incdntDtlExpln.value.incdntExpln;

      // 첨부파일값 세팅
      const atchFileId = instDtl.value.atchFileId;
      const atchFileSeq = instDtl.value.atchFileSeq;

      instDtl.value.atchFileId = '/api/image?atchFileId=' + atchFileId;
      instDtl.value.atchFileSeq = '&atchFileSeq=' + atchFileSeq;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * name : selectSprtTrgtDtl
 * desc : 구조대상자상세조회(기준중위소득제한)
 **/
const selectSprtTrgtDtl = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectSprtTrgtDtl', {
      params: elrcptAplyInVO.value
    })
    .then((result) => {
      sprtTrgtDtl.value = result.data[0];
      // E001 - 125% , E002 - 150%, E003 - 해당없음
      console.log('대상자명 ::: ' + sprtTrgtDtl.value.trprNm);
      console.log('소득율구분코드 ::: ' + sprtTrgtDtl.value.icrtSeCd);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * name : resetStep1
 * desc : Step1 카테고리 초기화
 **/
const resetStep1 = () => {
  // 사건설명
  incdntDtlExpln.value = null;
  // 전자접수 신청 제출서류
  incdntAplySbmsnList.value = null;
  hasDocId.value = null;
  // 필요자료 제출 가능여부
  showSbmsnQstnDiv.value = false;
  radioSelected.value = null;
};
/**
 * name : resetStep2
 * desc : Step2 카테고리 초기화
 **/
const resetStep2 = () => {
  // 기관목록
  instList.value = null;
  // 기관상세조회
  instDtl.value = null;
  // 기관선택값 초기화
  activeAgencyTab.value = null;
};
/**
 * name : resetStep3
 * desc : Step3 카테고리 초기화
 **/
const resetStep3 = () => {
  // 구조대상자유형
  atrprYn.value = null;
  // 구조대상자 유형 지원 대상 사건여부
  radioSelected3.value = null;
  // 구조대상자 라디오버튼 리스트
  atrprTypeList.value = null;
  // 구조대상자 상세정보 데이터
  displayAtrprContents.value = null;
  // 구조대상자 상세조회(기준중위소득제한)
  sprtTrgtDtl.value = null;
};
/**
 * name : resetStep4
 * desc : Step4 카테고리 초기화
 **/
const resetStep4 = () => {
  // 중위소득제한 렌더링
  crtrMdicmIdntyRndr.value = null;
  // 입증자료 제출 가능여부
  sprtTrgtIncdntYnRndr.value = false;
  // 필요자료 제출 가능여부
  radioSelected4.value = null;
  // 전자접수 신청하기 영역
  radioSelected5.value = null;
};

const activeTab = ref<string | null>(null);
const activeDepth2Index = ref<number | null>(null);
const activeDepth3Index = ref<number | null>(null);

/**
 * name : setActiveTab
 * desc : 1레벨 탭 클릭시 2레벨 사건 카테고리 조회
 **/
const setActiveTab = (ctgryNo: string) => {
  // 3레벨 이하 초기화
  tab3LvList.value = null;
  resetStep1();
  resetStep2();
  resetStep3();
  resetStep4();

  elrcptAplyInVO.value.ctgryNo = ctgryNo;
  // 레벨2 조회
  selectIncdntCtgry2lvList(elrcptAplyInVO);

  activeTab.value = ctgryNo;
  activeDepth2Index.value = null;
  activeDepth3Index.value = null;
};

/**
 * name : selectDepth2
 * desc : 2레벨 버튼 클릭시 3레벨 사건 카테고리 조회
 **/
const selectDepth2 = (ctgryNo: string) => {
  resetStep1();
  resetStep2();
  resetStep3();
  resetStep4();

  elrcptAplyInVO.value.ctgryNo = ctgryNo;
  // 레벨3 조회
  selectIncdntCtgry3lvList(elrcptAplyInVO);

  activeDepth2Index.value = ctgryNo;
  activeDepth3Index.value = null;
};

/**
 * name : selectDepth3
 * desc : 3레벨 버튼 클릭시 사건 조회
 **/
const selectDepth3 = (ctgryNo: string) => {
  resetStep2();
  resetStep3();
  resetStep4();

  elrcptAplyInVO.value.ctgryNo = ctgryNo;
  // 사건 상세조회
  selectIncdntDtlInq(elrcptAplyInVO);
  // 라디오버튼 초기화
  radioSelected.value = null;
  activeDepth3Index.value = ctgryNo;
};

/** 셀렉트 박스 */
const radioSelected = ref('');
const radioSelected2 = ref('');
const radioSelected3 = ref('');
const radioSelected4 = ref('');
const radioSelected5 = ref('');

/** 기관선택 탭메뉴 */
const activeAgencyTab = ref(null);
const displayAtrprContents = ref(false);
const displayLwsCstInfo = ref(false);

/**
 * name : selectTab
 * desc : 기관상세조회
 **/
const selectTab = (instNo: string) => {
  instDtl.value = null;
  activeAgencyTab.value = null;
  resetStep3();
  resetStep4();

  activeAgencyTab.value = instNo;
  console.log('activeAgencyTab.value ::: ' + activeAgencyTab.value);
  elrcptAplyInVO.value.instNo = instNo;
  // 기관상세조회
  selectInstDtlInq(elrcptAplyInVO);
  // 구조대상자 유형 팝업 노출
  atrprYn.value = true;
};

/**
 * name : needDataSbmsnYn
 * desc : 필요자료제출 가능여부 라디오버튼
 **/
const needDataSbmsnYn = (val) => {
  instDtl.value = null;
  activeAgencyTab.value = null;
  resetStep3();
  resetStep4();

  if (val.target.value === 'Y') {
    const list = instList.value;

    for (const item of list) {
      // 기관목록중 상담원만 해당하면 알림발생
      if (list.length === 1 && item.instNo === 'I003000000') {
        // 상담원만 신청
        showAlert({
          icon: 'info',
          html: '서울,경기지역만 전자접수 신청이 가능하여 접수승인이 안될수도 있습니다.<br />계속 하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '예',
          cancelButtonText: '아니요'
        })
          .then((result) => {
            if (result.isConfirmed) {
              radioSelected.value = 'Y';
            } else {
              radioSelected.value = 'N';
            }
          })
          .catch(() => {});
      }
    }
  } else {
    radioSelected.value = 'N';
  }
};

/**
 * name : goToElrcpt
 * desc : 면접상담예약 화면으로 이동
 **/
const goToElrcpt = () => {
  navigateTo('/dscsn/intv');
};

/**
 * name : movePage
 * desc : 선택한 홈페이지 새창이동
 **/
const movePage = (addUrl: string, se: string) => {
  // se(구분) : NPAG = 새창, EXS = 기존
  if (se === 'NPAG') {
    window.open(addUrl);
  } else {
    location.href = url;
  }
};

/**
 * name : sprtTrgtIncdntYn
 * desc : 구조대상자 유형 지원 대상 사건여부 라디오 버튼(예 / 아니오)
 **/
const sprtTrgtIncdntYn = (value) => {
  if (value.target.value === 'Y') {
    // 구조대상자 상세조회 (구조대상자 팝업에서 받아온 라디오버튼 변경시 param값 바뀜
    selectSprtTrgtDtl(elrcptAplyInVO);
    radioSelected3.value = 'Y';
  } else {
    radioSelected3.value = 'N';
  }
};

/**
 * name : sprtTrgtIncdntYn2
 * desc : 지원 대상 사건여부2 라디오 버튼(예 / 아니오)
 **/
const sprtTrgtIncdntYn2 = (value) => {
  // 전자접수 신청하기 영역 초기화
  radioSelected5.value = null;

  if (value.target.value === 'Y') {
    radioSelected4.value = 'Y';
  } else {
    // 아니오 누른경우
    showAlert({
      icon: 'info',
      html: '법률구조 전자접수 신청에 부적합니다.<br /> 내방하여 상담하여 주시기 바랍니다.'
    });
    radioSelected4.value = 'N';
  }
};

/**
 * name : needDataSbmsnYn2
 * desc : 필요 자료 제출여부2 라디오 버튼(예 / 아니오)
 **/
const needDataSbmsnYn2 = (value) => {
  if (value.target.value === 'Y') {
    radioSelected5.value = 'Y';
  } else {
    // 아니오 누른경우
    showAlert({
      icon: 'info',
      html: '법률구조 전자접수 신청에 부적합니다.<br /> 내방하여 상담하여 주시기 바랍니다.'
    });
    radioSelected5.value = 'N';
  }
};

// 모바일 Step 드롭다운
// 각 단계별 드롭다운 상태 개별 관리
const isDropdownOpen1 = ref(false);
const isDropdownOpen2 = ref(false);
const isDropdownOpen3 = ref(false);
const isDropdownOpen4 = ref(false);

const toggleDropdown = (step: number) => {
  switch (step) {
    case 1:
      if (!isDropdownOpen1.value) isDropdownOpen1.value = true;
      else isDropdownOpen1.value = false;
      break;
    case 2:
      if (!isDropdownOpen2.value) isDropdownOpen2.value = true;
      else isDropdownOpen2.value = false;
      break;
    // TODO : 모바일용인지 분석 필요, class = "step-dropdown-menu mo-only" 태그 안에 있음     이동규
    case 3:
      if (!isDropdownOpen3.value) isDropdownOpen3.value = true;
      else isDropdownOpen3.value = false;
      break;
    case 4:
      if (!isDropdownOpen4.value) isDropdownOpen4.value = true;
      else isDropdownOpen4.value = false;
      break;
  }
};

/**
 * name : openAtrprTypeInqPopup
 * desc : 구조대상자 유형 찾기 팝업 호출 버튼 클릭 시 호출되는 함수
 */
const openAtrprTypeInqPopup = () => {
  radioSelected2.value = ''; // 선택되어있는 구조대상자 유형 초기화

  // atrprTypeInqPopupParam.value.instNo = 'I001000000'; // TODO: Step.2에서 기관 선택하는 것에 따라서 값 할당 필요
  atrprTypeInqPopupParam.value.instNo = elrcptAplyInVO.value.instNo;

  openAtrprTypeInq.value = true;
};

/** 건강보험납입 조회 팝업 표시여부 */
const openSelectInsrncPayPopup = ref(false);
/** 직장가입자 보험납입내역 목록 팝업 표시여부 */
const openInsrncPayPopupList = ref(false);
const selectInsrncPayPopupParam = reactive({
  param: ''
});

const insrncPayPopup = ref();
const getSelectInsrncPayPopup = (val) => {
  insrncPayPopup.value = val;

  // 다음 모달 열기
  openInsrncPayPopupList.value = true;
};

/**
 * name : openCrtrMdicmIdntyPopUp
 * desc : 기준 중위소득 확인하기 팝업 호출 버튼 클릭 시 호출되는 함수
 */
const openCrtrMdicmIdntyPopUp = () => {
  // TODO: 기준 중위소득 확인 팝업 미완성

  // 팝업 열기
  openSelectInsrncPayPopup.value = true;

  // showAlert({
  //   icon: 'info',
  //   html: '기준 중위소득 확인 팝업 미개발로 기준중위소득 제한 없는 케이스 임의 데이터 호출',
  //   showCancelButton: true,
  //   confirmButtonText: '기준중위소득 제한 있는경우',
  //   cancelButtonText: '기준중위소득 제한 없는경우'
  // })
  //   .then((result) => {
  //     if (result.isConfirmed) {
  //       // crtrMdicmIdntyYn.value = 'Y'; // 기준중위소득제한 있는경우
  //       // sprtTrgtIncdntYnRndr.value = true; // 지원대상사건여부(8번)
  //       // crtrMdicmIdntyRndr.value = true; // 12번
  //
  //       crtrMdicmIdntyYn.value = 'N'; // 기준중위소득 제한 없는경우
  //       sprtTrgtIncdntYnRndr.value = false; // 지원대상사건여부(8번)
  //       radioSelected4.value = 'Y'; // 필요자료 제출 가능여부(9번)
  //       crtrMdicmIdntyRndr.value = false; // 12번
  //       afterPopup.value = true; // TODO - 소득요건 해당여부 (임시)
  //     } else {
  //       crtrMdicmIdntyYn.value = 'N'; // 기준중위소득 제한 없는경우
  //       sprtTrgtIncdntYnRndr.value = false; // 지원대상사건여부(8번)
  //       radioSelected4.value = 'Y'; // 필요자료 제출 가능여부(9번)
  //       crtrMdicmIdntyRndr.value = false; // 12번
  //       afterPopup.value = true; // TODO - 소득요건 해당여부 (임시)
  //     }
  //   })
  //   .catch(() => {});
};

/**
 * name : tempElrcptAplySlfdgns
 * desc : 전자접수신청 자가진단 임시저장
 */
const tempElrcptAplySlfdgns = async (se: string) => {
  const submit = await showAlert({
    icon: 'question',
    html: '임시저장 하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    // form.aplyPrgrsSttsCd = 'A01'; //임시저장
    insertForm(se);
  }
};
/**
 * name : submitElrcptAplySlfdgns
 * desc : 전자접수신청 자가진단 저장
 */
const submitElrcptAplySlfdgns = async (se: string) => {
  const submit = await showAlert({
    icon: 'question',
    html: '전자접수 신청화면으로 이동 하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    // form.aplyPrgrsSttsCd = 'A01'; //임시저장
    insertForm(se);
  }
};

/**
 * name : insertForm
 * desc : 폼 신청
 */
const insertForm = async (se: string) => {
  const formData = new FormData();

  form.incdntId = elrcptAplyInVO.value.incdntId;
  form.instNo = elrcptAplyInVO.value.instNo;
  form.mdicmNo = ''; // ?
  form.atrprNo = '';
  form.slfDgnsNm = ''; // ?
  form.useYn = 'Y'; // ?

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await axios.post(
    '/api/elrcpt/slfdgns/insertSlfdgnsAply',
    formData
  );

  // 자가진단번호를 가져와서 임시저장 여부 판단필요??
  // 자가진단번호 조회해서 신청페이지로 넘겨줌
  selectSlfDgnsNo(elrcptAplyInVO);

  if (response.status == 200) {
    let prgrsStts = '';
    if (se === 'tmp') {
      prgrsStts = '임시저장';
    } else {
      prgrsStts = '저장';
    }
    console.log('다음페이지로 넘겨줄거야 slfDgnsNo.value' + slfDgnsNo.value);

    const result = await showAlert({
      icon: 'info',
      html: `전자접수 ${prgrsStts}이 완료되었습니다.`
    });
    // 신청방법코드
    const aplyMthdCd = instDtl.value.aplyMthdCd;
    // 폼URL
    const moveUrl = instDtl.value.urlForm;

    console.log('신청방법코드 01 - 신청폼 / 02 - 폼URL ::: ' + aplyMthdCd);

    // 신청방법코드가 01이면 우리 신청폼으로 이동 02면 신청url로 보냄
    if (aplyMthdCd === '01') {
      if (result.isConfirmed) {
        // navigateTo('/elrcpt/form/ElrcptKlacEtcM');
        navigateTo({
          // TODO - 기관번호에 따라 신청폼 path 변경되어야함.
          path: `/elrcpt/form/ElrcptLegalaidSxvl`,
          query: {
            slfDgnsNo: slfDgnsNo.value
            // ,instNo: elrcptAplyInVO.value.instNo
          }
        });
      }
    } else if (aplyMthdCd === '02') {
      window.open(moveUrl);
    }
  } else {
    alert('오류확인');
    console.log(response);
  }
};
/**
 * name : selectSlfDgnsNo
 * desc : 자가진단번호 조회
 * @param elrcptAplyInVO
 * TODO 조회시 일단 MAX로 조회중. 중위소득, 구조대상자번호 받으면 수정필요
 */
const selectSlfDgnsNo = async (elrcptAplyInVO: ElrcptAplyInVO) => {
  await useAxios()
    .get('/api/elrcpt/slfdgns/selectSlfDgnsNo', {
      params: elrcptAplyInVO.value
    })
    .then((res) => {
      slfDgnsNo.value = res.data[0].slfDgnsNo;
      console.log('slfDgnsNo.value ::: ' + slfDgnsNo.value);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * name : getAtrprTypeList
 * desc : 구조대상자 유형 찾기 팝업에서 제출 버튼을 클릭하여 전달한 구조대상자의 데이터 리스트를 처리하는 함수
 * @param val   선택한 구조대상자의 데이터 리스트
 */
const getAtrprTypeList = (val) => {
  atrprTypeList.value = val;
  // 첫번째 라디오버튼 selected 처리
  radioSelected2.value = val[0];
};

/**
 * name : watch<br/>
 * desc : 구조대상자 유형 라디오 버튼 클릭 상태에 따라서 구조대상자 유형 설명 영역의 렌더링 여부를  결정
 */
watch(radioSelected2, (newVal) => {
  // 구조대상자 상세조회(중위소득제한) 초기화
  sprtTrgtDtl.value = null;
  // // 구조자료 입증자료 제출가능여부 라디오 초기화
  radioSelected3.value = null;

  // 구조대상자 상세조회 함수 param 세팅
  elrcptAplyInVO.value.atrprNo = newVal.atrprNo;

  displayAtrprContents.value = !!newVal;
  displayLwsCstInfo.value = !!(
    newVal.famFreeSeNm ||
    newVal.lwyrPayNm ||
    newVal.lwsCstNm
  );
});

const closeDropdown = (step: number) => {
  if (step === 1) isDropdownOpen1.value = false;
  else if (step === 2) isDropdownOpen2.value = false;
  else if (step === 3) isDropdownOpen3.value = false;
  else if (step === 4) isDropdownOpen4.value = false;
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :show-print-button="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="electronic-app-wrap">
          <div class="step-box pc-only">
            <ol>
              <li :class="{ 'is-active': activeStep === 0 }">
                <!-- 현재 단계일 경우 class="is-active"추가 -->
                <NuxtLink class="step-cont step1">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">01</span>
                  </span>
                  <span class="tit-box">
                    <span>사건</span><span>확인</span>
                    <span class="sr-only">(현재단계)</span
                    ><!-- 접근성 : class="is-active"가 있을경우 추가 -->
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 1 }">
                <NuxtLink class="step-cont step2">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">02</span>
                  </span>
                  <span class="tit-box">
                    <span>기관</span><span>확인</span>
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 2 }">
                <NuxtLink class="step-cont step3">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">03</span>
                  </span>
                  <span class="tit-box">
                    <span>구조</span><span>대상자</span><span>유형</span>
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 3 }">
                <NuxtLink class="step-cont step4">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">04</span>
                  </span>
                  <span class="tit-box">
                    <span>소득요건</span><span>확인</span>
                  </span>
                </NuxtLink>
              </li>
            </ol>
          </div>
          <div class="cont-box">
            <!-- Step 1 Contents -->
            <div id="step1" class="step-section">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-1"
                  :aria-expanded="isDropdownOpen1 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen1 }"
                  @click="toggleDropdown(1)"
                >
                  <!-- Description 1: 작성 내용이 1단계 일땐 disabled 어트리뷰트 추가 / 2단계부터 disabled 삭제 -->
                  <!-- Description 1-1: disabled일 경우 dorpdown 이벤트 작동 안하게 -->
                  <!-- Description 2 : 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">01</span>
                  </span>
                  <span class="txt-tit">사건확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen1 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(1)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4 class="title-heading-1 circle type-dashed">
                전자접수 신청이 가능한 사건을 선택해주세요.
              </h4>
              <div class="incidents-wrap">
                <div class="tab-box-wrap pc-only">
                  <!-- 탭 목록 -->
                  <ul class="nav" role="tablist">
                    <li
                      v-for="tab in tab1LvList"
                      :key="tab.ctgryNo"
                      class="nav-item"
                      v-if="render"
                    >
                      <button
                        type="button"
                        :id="`${tab.ctgryNo}-tab`"
                        class="nav-link"
                        :class="{ 'is-active': activeTab === tab.ctgryNo }"
                        role="tab"
                        :aria-controls="tab.ctgryNo"
                        :aria-selected="activeTab === tab.ctgryNo"
                        @click="setActiveTab(tab.ctgryNo)"
                      >
                        <span>{{ tab.lwaCtgryNm }}</span>
                      </button>
                    </li>
                  </ul>
                  <!-- 탭 콘텐츠 -->
                  <div class="tab-content">
                    <div
                      v-for="tab in tab1LvList"
                      :key="tab.ctgryNo"
                      :id="tab.ctgryNo"
                      class="tab-panel"
                      :class="{ 'is-active': activeTab === tab.ctgryNo }"
                      role="tabpanel"
                      :aria-labelledby="`${tab.ctgryNo}-tab`"
                    >
                      <div class="depth-cont depth2">
                        <button
                          v-for="tab in tab2LvList"
                          :key="tab.ctgryNo"
                          type="button"
                          class="btn"
                          :class="{
                            'is-active': activeDepth2Index === tab.ctgryNo
                          }"
                          :title="
                            activeDepth2Index === tab.ctgryNo ? '선택됨' : ''
                          "
                          @click="selectDepth2(tab.ctgryNo)"
                        >
                          {{ tab.lwaCtgryNm }}
                        </button>
                      </div>
                      <!-- depth3 -->
                      <div
                        v-if="activeDepth2Index !== null && tab3LvList"
                        class="depth-cont depth3"
                      >
                        <button
                          v-for="tab in tab3LvList"
                          :key="tab.ctgryNo"
                          type="button"
                          class="btn"
                          :class="{
                            'is-active': activeDepth3Index === tab.ctgryNo
                          }"
                          :title="
                            activeDepth3Index === tab.ctgryNo ? '선택됨' : ''
                          "
                          @click="selectDepth3(tab.ctgryNo)"
                        >
                          {{ tab.lwaCtgryNm }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 더미 컨텐츠 -->
                  <div class="incidents-info-box type-center" v-if="!activeTab">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <p>
                        상단의 사건분류탭을 선택하시면,<br />
                        <strong>전자접수 가능한 사건 목록</strong>이 자동으로
                        보여집니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab-select-wrap mo-only">
                  <!-- 1Depth -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="사건 선택"
                  >
                    <a-select-option value="1">화해조정</a-select-option>
                    <a-select-option value="2">민사사건</a-select-option>
                    <a-select-option value="3">가사사건</a-select-option>
                    <a-select-option value="4"
                      >채무조정/불법사금융</a-select-option
                    >
                    <a-select-option value="5">기타 법률분쟁</a-select-option>
                  </a-select>
                  <!-- 2Depth : 1Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                  >
                    <a-select-option value="1-1">계약관계</a-select-option>
                    <a-select-option value="1-2">근로관계</a-select-option>
                    <a-select-option value="1-3">임대차관계</a-select-option>
                    <a-select-option value="1-4"
                      >부당이득/손해배상</a-select-option
                    >
                    <a-select-option value="1-5">기타 민사사건</a-select-option>
                  </a-select>
                  <!-- 3Depth : 2Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                  >
                    <a-select-option value="1-1-1">대여금</a-select-option>
                    <a-select-option value="1-1-2">약정금</a-select-option>
                    <a-select-option value="1-1-3">보증채무금</a-select-option>
                    <a-select-option value="1-1-4">계약금반환</a-select-option>
                    <a-select-option value="1-1-5">구상금</a-select-option>
                  </a-select>
                </div>
                <div class="tab-result-box">
                  <div v-if="incdntDtlExpln" class="incidents-desc-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong>{{ incdntDtlExpln.incdntNm }}이란?</strong>
                    </div>
                    <p class="bul-dot" v-html="incdntDtlExpln.incdntExpln"></p>
                  </div>
                  <div v-if="hasDocId" class="inner-con-box">
                    <h5 class="receipt-tit type-border">
                      전자접수 신청 제출 서류
                    </h5>
                    <div class="docs-list-box">
                      <ul>
                        <li
                          v-for="item in incdntAplySbmsnList"
                          :key="item.ctgryNo"
                        >
                          <div class="docs-cont-box">
                            <span class="bul-dot">{{ item.docNm }}</span>
                            <span
                              :class="
                                item.esntlYn === 'Y'
                                  ? 'badge required'
                                  : 'badge'
                              "
                              >{{
                                item.esntlYn === 'Y' ? '필수' : '선택'
                              }}</span
                            >
                          </div>
                        </li>
                      </ul>
                      <p class="bul-dot">
                        법률구조신청을 전자적으로 신청하고자 하는 사람은
                        전자접수 신청사건에 해당하고, 각 입증자료를 제출하여야
                        합니다.
                      </p>
                    </div>
                  </div>
                  <div class="inner-con-box" v-if="showSbmsnQstnDiv">
                    <div class="select-result-box">
                      <div class="check-tit-box">
                        <span class="ico-check-info"></span>
                        <strong
                          >전자접수 신청을 위해 필요자료 제출이
                          가능하십니까?</strong
                        >
                      </div>
                      <a-radio-group
                        v-model:value="radioSelected"
                        @change="needDataSbmsnYn"
                      >
                        <a-radio class="radio-bx" value="Y">예</a-radio>
                        <a-radio class="radio-bx" value="N">아니요</a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                  <div class="inner-con-box" v-if="radioSelected === 'N'">
                    <div class="incidents-info-box">
                      <div class="txt-box">
                        <span class="ico-incidents-info"></span>
                        <BullList type="dot" class="!gap-y-10px">
                          <li class="!font-normal !text-[14px] lg:!text-[16px]">
                            전자접수 신청이 불가능합니다.
                          </li>
                          <li class="!font-normal !text-[14px] lg:!text-[16px]">
                            법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                          </li>
                        </BullList>
                      </div>
                      <div class="btn-box">
                        <CommonButton
                          variants="primary"
                          width="md"
                          @click="goToElrcpt"
                        >
                          면접상담예약 바로가기
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 1 Contents -->

            <!-- Step 2 Contents -->
            <div id="step2" class="step-section">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-2"
                  :aria-expanded="isDropdownOpen2 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen2 }"
                  @click="toggleDropdown(2)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">02</span>
                  </span>
                  <span class="txt-tit">기관확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen2 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(2)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <h4
                class="title-heading-1 circle type-dashed"
                v-if="radioSelected === 'Y'"
              >
                기관을 선택 해주세요.
              </h4>
              <div class="incidents-wrap" v-if="radioSelected === 'Y'">
                <div class="tab-wrap">
                  <ul class="nav" role="tablist">
                    <li
                      class="nav-item"
                      v-for="item in instList"
                      :key="item.instNo"
                    >
                      <button
                        type="button"
                        :id="`${item.instNo}-tab`"
                        class="nav-link"
                        :class="{
                          'is-active': activeAgencyTab === item.instNo
                        }"
                        role="tab"
                        :aria-controls="item.instNo"
                        :aria-selected="activeAgencyTab === item.instNo"
                        @click="selectTab(item.instNo)"
                      >
                        <span class="img-box">
                          <img
                            :src="item.atchFileId + item.atchFileSeq"
                            :alt="item.mngInstNm"
                          />
                        </span>
                        <span class="txt-box" v-html="item.content"></span>
                      </button>
                    </li>
                  </ul>

                  <div class="tab-content" v-if="instDtl">
                    <div
                      :id="instDtl.instNo"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-1-tab"
                      :class="{
                        'is-active': activeAgencyTab === instDtl.instNo
                      }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box" v-html="instDtl.incdntExpln"></div>
                          </div>
                        </div>
                      </div>
                      <p class="sub-info-txt">
                        {{ instDtl.mngInstNm }}을(를) 방문해서 문제를
                        해결해보세요
                      </p>
                      <div class="agency-link-banner">
                        <NuxtLink
                          @click="movePage(instDtl.urlAddr, 'NPAG')"
                          title="새 창 열림"
                          class="link-box"
                        >
                          <span class="img-box">
                            <img
                              :src="instDtl.atchFileId + instDtl.atchFileSeq"
                              :alt="instDtl.mngInstNm"
                            />
                          </span>
                          <span class="txt-box" v-html="instDtl.content"></span>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 2 Contents -->
            <!-- Step 3 Contents -->
            <div id="step3" class="step-section">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-3"
                  :aria-expanded="isDropdownOpen3 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen3 }"
                  @click="toggleDropdown(3)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">03</span>
                  </span>
                  <span class="txt-tit">구조대상자 유형</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen3 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(3)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4 class="title-heading-1 circle type-dashed" v-if="atrprYn">
                구조 대상자 유형을 선택 해주세요.
              </h4>
              <div class="incidents-wrap" v-if="atrprYn">
                <div class="inner-cont-box">
                  <div class="btn-box">
                    <CommonButton
                      @click="openAtrprTypeInqPopup"
                      variants="line-blue"
                      width="md"
                      height="md"
                      >구조대상 유형 찾기</CommonButton
                    >
                  </div>
                  <a-radio-group
                    class="type-vertical"
                    v-model:value="radioSelected2"
                  >
                    <div v-for="item in atrprTypeList">
                      <a-radio class="radio-bx" :value="item">{{
                        item.trprNm
                      }}</a-radio>
                    </div>
                  </a-radio-group>
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >구조대상자는 다중 선택하여 구조대상자 별로 상세정보를
                      확인할 수 있습니다.</span
                    >
                  </p>
                </div>
                <div v-if="displayAtrprContents">
                  <div class="inner-con-box">
                    <h5 class="receipt-tit type-border">구조대상자 상세정보</h5>
                    <div class="grid-box">
                      <dl class="info-dl-box">
                        <dt>구조대상자 정의</dt>
                        <dd>
                          <span class="txt">{{
                            radioSelected2?.trprExpln ?? ''
                          }}</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="inner-con-box">
                    <h5 class="receipt-tit type-border">신청 가능한 사건</h5>
                    <div class="grid-box">
                      <dl class="info-dl-box">
                        <dt>신청가능한 사건</dt>
                        <dd>
                          <span class="txt">{{
                            radioSelected2?.aplyPsbltyIncdntNm
                          }}</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="inner-con-box">
                    <h5 class="receipt-tit type-border">구조대상자 입증자료</h5>
                    <div class="grid-box type-col3">
                      <dl class="info-dl-box">
                        <dt>제출서류</dt>
                        <dd>
                          <span
                            class="txt"
                            v-for="doc in radioSelected2?.sbmsnDoc"
                            >{{ doc }}</span
                          >
                        </dd>
                      </dl>
                      <dl class="info-dl-box">
                        <dt>발급기관</dt>
                        <dd>
                          <span
                            class="txt"
                            v-for="issuInst in radioSelected2?.issuInstNm"
                            >{{ issuInst }}</span
                          >
                        </dd>
                      </dl>
                      <dl class="info-dl-box">
                        <dt>인터넷발급</dt>
                        <dd>
                          <span
                            class="txt"
                            v-for="itntIssu in radioSelected2?.itntIssuNm"
                            >{{ itntIssu }}</span
                          >
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="inner-con-box" v-if="displayLwsCstInfo">
                    <h5 class="receipt-tit type-border">소송비용</h5>
                    <div class="grid-box type-col3">
                      <dl class="info-dl-box">
                        <dt>소송비용</dt>
                        <dd>
                          <span class="txt">{{
                            radioSelected2.lwsCstNm ?? '-'
                          }}</span>
                        </dd>
                      </dl>
                      <dl class="info-dl-box">
                        <dt>변호사보수</dt>
                        <dd>
                          <span class="txt">{{
                            radioSelected2.lwyrPayNm ?? '-'
                          }}</span>
                        </dd>
                      </dl>
                      <dl class="info-dl-box">
                        <dt>가족에대한 무료</dt>
                        <dd>
                          <span class="txt">{{
                            radioSelected2.famFreeSeNm ?? '-'
                          }}</span>
                        </dd>
                      </dl>
                    </div>
                    <p class="info-txt-ex-mark">
                      <span class="txt"
                        >무료법률구조대상자에 해당하는 경우에도 감정료 등의 경우
                        일부 비용이 발생할 수 있고 승소가액이 3억을 초과하는
                        경우 소송비용과 변호사 보수 모두 부담하여야
                        합니다.</span
                      >
                    </p>
                  </div>
                  <div class="inner-con-box">
                    <div class="select-result-box">
                      <div class="check-tit-box">
                        <span class="ico-check-info"></span>
                        <strong
                          >선택하신 구조대상자의 입증자료 제출이 가능하며, 지원
                          대상 사건에 해당합니까?</strong
                        >
                      </div>
                      <a-radio-group
                        v-model:value="radioSelected3"
                        @change="sprtTrgtIncdntYn"
                      >
                        <a-radio class="radio-bx" value="Y">예</a-radio>
                        <a-radio class="radio-bx" value="N">아니요</a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                </div>
                <div class="inner-con-box" v-if="radioSelected3 === 'N'">
                  <div class="incidents-info-box">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <BullList type="dot" class="!gap-y-10px">
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          전자접수 신청이 불가능합니다.
                        </li>
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                        </li>
                      </BullList>
                    </div>
                    <div class="btn-box">
                      <CommonButton
                        variants="primary"
                        width="md"
                        @click="goToElrcpt"
                      >
                        면접상담예약 바로가기
                      </CommonButton>
                    </div>
                  </div>
                </div>
              </div>
              <elrcpt-slfdgns-atrpr-type-inq-popup
                v-model:open="openAtrprTypeInq"
                v-model:params="atrprTypeInqPopupParam"
                @trpr-val="getAtrprTypeList"
              />
            </div>
            <!-- //Step 3 Contents -->

            <!-- Step 4 Contents -->
            <div id="step4" class="step-section">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-4"
                  :aria-expanded="isDropdownOpen4 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen4 }"
                  @click="toggleDropdown(4)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">04</span>
                  </span>
                  <span class="txt-tit">소득요건 확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen4 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(4)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4
                class="title-heading-1 circle type-dashed"
                v-if="radioSelected3 === 'Y'"
              >
                구조대상자의 소득요건 확인
              </h4>
              <div class="incidents-wrap" v-if="radioSelected3 === 'Y'">
                <div class="inner-cont-box">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >선택하신 대상자는 기준중위소득 150% 이하에 한하여
                      법률구조를 받을 수 있습니다.</span
                    >
                  </p>
                  <!--                        TODO 작업중-->
                  <div class="btn-box">
                    <CommonButton
                      variants="line-blue"
                      width="md"
                      height="md"
                      @click="openCrtrMdicmIdntyPopUp"
                    >
                      기준중위소득 확인하기
                    </CommonButton>
                  </div>
                </div>
                <select-insrnc-pay-popup
                  v-model:open="openSelectInsrncPayPopup"
                  v-model:params="selectInsrncPayPopupParam"
                  @insrnc-pay-info-list="getSelectInsrncPayPopup"
                />
                <insrnc-pay-popup-list
                  v-model:open="openInsrncPayPopupList"
                  v-model:params="insrncPayPopup"
                />
                <!--                <div class="inner-con-box" v-show="!crtrMdicmIdntyRndr">-->
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">기준중위소득제한</h5>
                  <div class="grid-box">
                    <dl class="info-dl-box">
                      <dt>기준중위소득제한 기준</dt>
                      <dd>
                        <!--                        <span class="txt" v-if="!afterPopup">150%</span>-->
                        <span class="txt" v-if="sprtTrgtDtl.icrtSeCd === 'E001'"
                          >125%</span
                        >
                        <span
                          class="txt"
                          v-else-if="sprtTrgtDtl.icrtSeCd === 'E002'"
                          >150%</span
                        >
                        <!--                        E001 - 125% , E002 - 150%, E003 - 제한없음-->
                        <!--                        <span class="txt" v-else>150%</span>-->
                        <span class="txt" v-else>제한없음</span>
                      </dd>
                    </dl>
                    <!--                    TODO - 팝업 완성시 소득요건 해당여부 조회-->
                    <dl class="info-dl-box" v-show="!sprtTrgtDtl.icrtSeCd">
                      <dt>소득요건 해당여부</dt>
                      <dd>
                        <span class="txt">해당</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="inner-con-box">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >기준중위소득 적용예외 대상자에 해당하는 경우 바로
                      전자접수 신청을 하실 수 있습 니다.(단, 주장사실 입증자료
                      필요)<br />기준중위소득 125% 또는 150%의 제한을 받는 경우
                      중위소득판정절차를 진행한 후 전자접수 신청을 진행하시기
                      바랍니다.</span
                    >
                  </p>
                </div>
                <div class="inner-con-box" v-show="sprtTrgtDtl.icrtSeCd">
                  <h5 class="receipt-tit">
                    기준중위소득 소득요건 증빙을 위해 아래 서류 제출이
                    필요합니다.
                  </h5>
                  <CommonTable class="mt-10px">
                    <caption>
                      기준중위소득 소득요건 증빙 제출 서류의 통제출서류,
                      주민등록표 등본(세대원 수 확인)에 대한 표
                    </caption>
                    <thead>
                      <tr>
                        <th colspan="2" scope="col">통제출서류</th>
                        <th colspan="2" scope="col">
                          주민등록표 등본(세대원 수 확인)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowspan="4">건강보험가입자</td>
                        <td rowspan="2">직장가입자</td>
                        <td>건강보험납부사실확인서</td>
                        <td rowspan="2">택1</td>
                      </tr>
                      <tr>
                        <td class="bdr">건강보험고지서(소득점수 확인)</td>
                      </tr>
                      <tr>
                        <td>지역가입자</td>
                        <td>지역보험료부과내역확인서</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>피부양자</td>
                        <td>건강보험자격확인서</td>
                        <td>피부양자 모두 제출</td>
                      </tr>
                      <tr>
                        <td colspan="2" rowspan="5">건강보험 미가입자</td>
                        <td>근로소득원천징수영수증</td>
                        <td rowspan="5">택1</td>
                      </tr>
                      <tr>
                        <td class="bdr">보수지급명세서</td>
                      </tr>
                      <tr>
                        <td class="bdr">소득금액증명서(세무서)</td>
                      </tr>
                      <tr>
                        <td class="bdr">국민연금산정용가입내역확인서</td>
                      </tr>
                      <tr>
                        <td class="bdr">국민연금지급내역확인서</td>
                      </tr>
                    </tbody>
                  </CommonTable>
                </div>
                <div class="inner-con-box" v-show="sprtTrgtIncdntYnRndr">
                  <div class="select-result-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong>
                        선택하신 "어업인"의 소득요건을 해당합니다.
                        <br class="pc-only" />구조대상자의 입증자료 제출이
                        가능하며, 지원 대상 사건에 해당합니까?
                      </strong>
                    </div>
                    <a-radio-group
                      v-model:value="radioSelected4"
                      @change="sprtTrgtIncdntYn2"
                    >
                      <a-radio class="radio-bx" value="Y">예</a-radio>
                      <a-radio class="radio-bx" value="N">아니요</a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div
                  class="inner-con-box"
                  v-if="radioSelected4 === 'Y' || !sprtTrgtDtl.icrtSeCd"
                >
                  <div class="select-result-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong
                        >전자접수 신청을 위해 필요자료 제출이 가능하십니까?
                      </strong>
                    </div>
                    <a-radio-group
                      v-model:value="radioSelected5"
                      @change="needDataSbmsnYn2"
                    >
                      <a-radio class="radio-bx" value="Y">예</a-radio>
                      <a-radio class="radio-bx" value="N">아니요</a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div
                  class="inner-con-box"
                  v-if="radioSelected4 === 'N' || radioSelected5 === 'N'"
                >
                  <div class="incidents-info-box">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <BullList type="dot" class="!gap-y-10px">
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          전자접수 신청이 불가능합니다.
                        </li>
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                        </li>
                      </BullList>
                    </div>
                    <div class="btn-box">
                      <CommonButton
                        variants="primary"
                        width="md"
                        @click="goToElrcpt"
                      >
                        면접상담예약 바로가기
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div class="inner-con-box" v-if="radioSelected5 === 'Y'">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >동일사건으로 중복 접수는 불가합니다.</span
                    >
                  </p>
                </div>
                <!--                TODO - 기준중위소득 제한 없는경우 띄어줘야함.(!sprtTrgtDtl.icrtSeCd)(공통되면 표시하기)-->
                <!--                <div class="receipt-select-infos">-->
                <!--                  <ul>-->
                <!--                    <li>-->
                <!--                      <div class="select-info-item">-->
                <!--                        <span class="flag"-->
                <!--                          >사&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;건</span-->
                <!--                        >-->
                <!--                        <span class="txt">민사사건 > 계약관계 > 대여금</span>-->
                <!--                      </div>-->
                <!--                    </li>-->
                <!--                    <li>-->
                <!--                      <div class="select-info-item">-->
                <!--                        <span class="flag">대&nbsp;상&nbsp;자</span>-->
                <!--                        <span class="txt"-->
                <!--                          >사회적취약계층 > 임금 등 체불 피해근로자</span-->
                <!--                        >-->
                <!--                      </div>-->
                <!--                    </li>-->
                <!--                    <li>-->
                <!--                      <div class="select-info-item">-->
                <!--                        <span class="flag">소득요건</span>-->
                <!--                        <span class="txt">기준소득 > 120%</span>-->
                <!--                      </div>-->
                <!--                    </li>-->
                <!--                  </ul>-->
                <!--                </div>-->

                <div class="inner-con-box" v-if="radioSelected5 === 'Y'">
                  <div class="button-box">
                    <CommonButton
                      variants="line-primary"
                      width="md"
                      @click="tempElrcptAplySlfdgns('tmp')"
                    >
                      전자접수임시저장하기
                    </CommonButton>
                    <!--                    <CommonButton-->
                    <!--                      variants="primary"-->
                    <!--                      width="md"-->
                    <!--                      v-if="crtrMdicmIdntyYn === 'Y'"-->
                    <!--                      @click="movePage(instDtl.urlAddr, 'EXS')"-->
                    <!--                    >-->
                    <!--                      전자접수 신청하기-->
                    <!--                    </CommonButton>-->
                    <CommonButton
                      variants="primary"
                      width="md"
                      v-if="crtrMdicmIdntyYn === 'N' || !sprtTrgtDtl.icrtSeCd"
                      @click="submitElrcptAplySlfdgns('sbm')"
                    >
                      전자접수 계속하기
                    </CommonButton>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 4 Contents -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/slfdgns/SlfdgnsEdit.scss';
</style>
