<!--
 * 화면명 : 전자접수신청_성폭력
 * 화면ID : LASP_ELE_019
 * 파일명 : ElrcptLegalaidSxvl
 * 작성자 : 이동규
 * 화면 설명 : 대한변협법률구조재단에 성폭력 사건으로 전자접수 신청하는 화면
 * 공통코드 : RLPR_SE_CD(CO0067)
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.06         이동규       최초생성
 2025.08.13         문경훈       파일명변경
-->

<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import * as elrcptApis from '~/composables/elrcpt';
import * as valid from '~/utils/validation';
import CommonRadioGroup from '~/pages/components/select/CommonRadio.vue';
import {
  Accordion,
  AccordionHead,
  AccordionIcon,
  AccordionItem
} from '~/components/ui/accordion';
import type {
  ElrIncdntAplyCn,
  ElrIncdntStkgDate,
  ElrIncdntSxvl,
  EvdncData,
  IncdntAplyRlpr
} from '~/types/elrcpt/sxvl';
import { cloneDeep } from 'lodash-es';
import axios from 'axios';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import EmailNumInput from '~/components/common/EmailInputRules.vue';
import AddrInput from '~/components/common/AddrInputRules.vue';
import MyDocPopup from '~/pages/elrcpt/MyDocPopup.vue';
import ElrcptGdPopup from '~/pages/elrcpt/ElrcptGdPopup.vue';
// import form from '~/pages/components/layout/form.vue';
import { reactive, ref, watch, defineComponent } from 'vue';
import CommonSelect from '~/pages/components/select/CommonSelect.vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { useLoginStore } from '~/stores/login';
let addrKey = 0;

/** form */
const formRef = ref();

const activeKey = ref([1]);
const { showAlert } = useCustomAlert();
const route = useRoute();

const selectedValues = ref();

// 모바일 여부
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
};

const lwyrMbrTelnoRef = ref();
const lwyrEmlAddrRef = ref();

/** 사건 성폭력 접수 엔드포인트 */
const INCDNT_SXVL_APLY_ENDPOINT = '/api/user/elrcpt/sxvl/incdnt';

/** 전자접수 사건 신청 내용 초기값 */
// const DEFAULT_INCDNT_APLY_CN: ElrIncdntAplyCn = {
//   incdntNm: '' /* 사건명 */,
//   incdntKndCd: '' /* 사건종류코드 */,
//   ctIncdntNo: '' /* 법원사건번호 */,
//   incdntOtln: '' /* 사건개요 */,
//   evdncCn: '' /* 증빙내용 */,
//   aplcntMicmAmt: '' /* 신청자월수입금액 */,
//   aplcntMicmDsctn: '' /* 신청자거주지종류코드 */,
//   aplcntRsdcKndCd: '' /* 신청자거주지종류기타사항 */,
//   aplcntRsdcKndEtcMttr: '' /* 소유구분코드 */,
//   psnSeCd: '' /* 부동산소유자명 */,
//   restOwnrNm: '' /* 임대보증금액 */,
//   rentGrnteAmt: '' /* 월세금액 */,
//   mrntAmt: '' /* 소유관계기타사항 */,
//   psnPelEtcMttr: '' /* 부동산재산내역 */,
//   svgPrptDsctn: '' /* 예금재산내역 */,
//   vhclPrptDsctn: '' /* 차량재산내역 */,
//   pnPrptDsctn: '' /* 연금재산내역 */,
//   etcPrptDsctn: '' /* 기타재산내역 */,
//   vstPathCd: '' /* 방문경로코드 */,
//   roblYn: '' /* 기초생활수급자여부 */
// };

/** 전자접수 사건 스토킹 데이트 초기값 */
// const DEFAULT_INCDNT_STKG_DATE = {
//   incdntAplyNo: '' /* 사건신청번호 */,
//   incdntNm: '' /* 사건명 */,
//   incdntKndCd: '' /* 사건종류코드 */,
//   incdntOtln: '' /* 사건개요 */,
//   evdncCn: '' /* 증빙내용 */,
//   prvcPrcsAgreYn: '' /* 개인정보처리동의여부 */,
//   prvcPrvsnAgreYn: '' /* 방문경로코드 */,
//   incdntNo: '' /* 사건번호 */,
//   rqsrNm: '' /* 의뢰인명 */,
//   aplcntRlprNm: '' /* 신청자명 */
// };
//
// const DEFAULT_INCDNT_SXVL = {
//   incdntAplyNo: '' /* 사건신청번호 */,
//   aplyNo: '' /* 신청번호 */,
//   picNm: '' /* 담당자명 */,
//   sxvlIncdntKndCd: '' /* 성폭력사건종류코드 */,
//   sxvlIncdntKndEtcMttr: '' /* 성폭력사건종류기타사항 */,
//   incdntOtln: '' /* 사건개요 */,
//   vctmLastAcbgCd: '' /* 피해자최종학력코드 */,
//   vctmCrCd: '' /* 피해자직업코드 */,
//   vctmMrgSeCd: '' /* 피해자결혼구분코드 */,
//   mrgEtcRsn: '' /* 결혼기타사유 */,
//   vctmChldYn: '' /* 피해자자녀여부 */,
//   hsPsnYn: '' /* 주택소유여부 */,
//   ecnmEtcCn: '' /* 경제기타여부 */,
//   vctmMmEarnCd: '' /* 피해자월소득금액 */,
//   vctmSptFamYn: '' /* 피해자부양가족여부 */,
//   excptnMttr: '' /* 특이사항 */,
//   bfrLwaYn: '' /* 이전법률구조여부 */,
//   lwaNeedExpln: '' /* 법률구조필요설명 */,
//   tkcgLwyrNm: '' /* 담당변호사명 */,
//   lwyrOfcTelno: '' /* 변호사사무실전화번호 */,
//   lwyrOfcFxno: '' /* 변호사사무실팩스번호 */,
//   aplcntRlprNm: '' /* 신청자명 */,
//   vctmMmEarnCd: '' /* 피해자월소득코드 */,
//   lwyrMbrTelno: '' /* 변호사휴대전화번호 */,
//   lwyrEmlAddr: '' /* 변호사이메일주소 */
// };

// const DEFAULT_INCDNT_APLY_RLPR = {
//   incdntAplyNo: '' /* 사건신청번호 */,
//   rlprSeCd: '' /* 관계자구분코드 */,
//   rlprSeq: '' /* 관계자순서 */,
//   trprSeCd: '' /* 대상자구분코드 */,
//   rlprNm: '' /* 관계자명 */,
//   rlprBrdt: '' /* 관계자생년월일 */,
//   rlprRrno: '' /* 관계자주민등록번호 */,
//   gndrCd: '' /* 성별코드 */,
//   rlprMblTelno: '' /* 관계자휴대전화번호 */,
//   rlprTelno: '' /* 관계자전화번호 */,
//   fxno: '' /* 팩스번호 */,
//   rlprZip: '' /* 관계자우편번호 */,
//   rlprAddr: '' /* 관계자주소 */,
//   rlprDaddr: '' /* 관계자상세주소 */,
//   emlAddr: '' /* 이메일주소 */,
//   rprsvYn: '' /* 대표자여부 */,
//   brno: '' /* 사업자등록번호 */,
//   crno: '' /* 법인등록번호 */,
//   tpbizNm: '' /* 업종명 */,
//   rprsvNm: '' /* 대표자명 */,
//   homeWrcSeCd: '' /* 자택직장구분코드 */
// };

// TODO - 작업

/** form 선언 */
const form = reactive({
  aplyCn: '', // 사건내용
  incdntAplyNo: '', // 사건신청번호
  delYn: '', // 삭제여부
  // 신청인 정보
  aplcntSeCd: '', // 신청인 구분코드
  aplcntSeq: '', // 신청인순서
  aplcntRlprNm: '', // 신청인명
  picNm: '', // 기관인 경우 담당자
  aplcntZip: '', // 신청인우편번호
  aplcntAddr: '', // 신청인주소
  aplcntDaddr: '', // 신청인상세주소
  aplcntMblTelno: '', // 신청인 핸드폰번호
  aplcntEmlAddr: '', // 신청인 이메일주소
  aplcntTelno: '', // 신청인 전화번호
  aplcntFxno: '', // 신청인 팩스번호

  // 피해자 정보
  vctmSeCd: '', // 피해자 구분코드
  vctmSeq: '', // 피해자순서
  vctmRlprNm: '', // 피해자명
  vctmZip: '', // 피해자우편번호
  vctmAddr: '', // 피해자주소
  vctmDaddr: '', // 피해자상세주소
  vctmMblTelno: '', // 피해자 핸드폰번호
  vctmEmlAddr: '', // 피해자 이메일주소
  vctmTelno: '', // 피해자 전화번호
  vctmFxno: '', // 피해자 팩스번호

  // 사건 정보
  incdntNm: '', // 사건명
  sxvlIncdntKndCd: '', // 사건의 종류
  sxvlIncdntKndEtcMttr: '', // 사건의 종류 기타사항
  incdntOtln: '', // 사건의 개요

  // 피해자의 인적상황
  vctmLastAcbgCd: '', // 피해자의 최종학력
  vctmCrCd: '', // 피해자의 직업
  vctmMrgSeCd: '', // 피해자의 혼인상태
  mrgEtcRsn: '', // 결혼기타사유
  vctmChldYn: '', // 피해자의 자녀
  hsPsnYn: '', // 주택소유여부
  ecnmEtcCn: '', // 경제기타여부
  vctmMmEarnCd: '', // 피해자의 월소득
  mmEarnEtcCn: '', // 월소득기타내용
  vctmSptFamYn: '', // 피해자의 부양가족유무
  bfrLwaYn: '', // 이전에 법률구조 받은경험유무
  excptnMttr: '', // 기타 특이사항

  // 구조필요성에 대한 의견
  lwaNeedExpln: '', // 내용

  // 변호사정보
  tkcgLwyrNm: '', // 담당 변호사명
  lwyrMbrTelno: '', // 변호사 핸드폰번호
  lwyrEmlAddr: '', // 변호사 이메일주소
  lwyrOfcTelno: '', // 변호사 전화번호
  lwyrOfcFxno: '', // 변호사 팩스번호

  // 입증자료제출

  // 사건신청
  // TODO - 추후 하드코딩제거
  instNo: 'I030000000', // 기관번호
  aplyPrgrsSttsCd: '', // 신청진행상태코드
  slfDgnsNo: '100', // 자가진단번호
  prvcClctUtztnPrpsAgreYn: '', // 개인정보수집이용목적동의여부
  tdptyPvsnAgreYn: '', // 제3자제공동의여부
  casePvsnAgreYn: '', // 사례제공동의여부
  rghtUdsdAgreYn: '', // 권리이해동의여부
  smsRcptnAgreYn: '', // SMS수신동의여부
  emlRcptnAgreYn: '', // 이메일수신동의여부
  faceDscsnAgreYn: '', // 대면상담동의여부
  indvPvsnAgreYn: '', // 개인제공동의여부
  prvcPrcsAgreYn: '', // 개인정보처리동의여부
  aplyDt: '', // 신청일자

  // 동의여부
  instNm: '', // 상담소명(기관명)
  instTelno: '', // 연락처
  instRprsvNm: '', // 대표자명
  infrmMttrAgreYn: '', // 고지사항동의여부

  // 증빙문서조회
  incdntId: '', // 사건아이디
  atrprNo: '' // 대상자번호
});

// 접수 폼 상단 사건, 대상자, 기준소득 항목 입력
const incdnt = ref<string>(''); // 사건
const instatrpr = ref<string>(''); // 대상자
const mdicm = ref<string>(''); // 기준소득

// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  // 신청인 정보
  aplcntRlprNm: [valid.required()],
  aplcntZip: [valid.required()],
  aplcntAddr: [valid.required()],
  aplcntDaddr: [valid.required()],
  aplcntMblTelno: [valid.required(), valid.mobile()],
  aplcntEmlAddr: [valid.required(), valid.email()],
  // 피해자 정보
  vctmRlprNm: [valid.required()],
  vctmZip: [valid.required()],
  vctmAddr: [valid.required()],
  vctmDaddr: [valid.required()],
  vctmMblTelno: [valid.required(), valid.mobile()],
  vctmEmlAddr: [valid.required(), valid.email()],

  // 사건정보
  incdntNm: [valid.required()],
  sxvlIncdntKndCd: [valid.required()],
  // incdntKndEtcMttr: [valid.required()],

  // 변호사정보
  tkcgLwyrNm: [valid.required()],
  lwyrMbrTelno: [valid.required(), valid.mobile()],
  // 동의여부
  instNm: [valid.required()]
};

/** 사건신청자 */
// const incdntAplcnt = ref<IncdntAplyRlpr>(cloneDeep(DEFAULT_INCDNT_APLY_RLPR));
/** 사건피해자 */
// const incdntVctm = ref<IncdntAplyRlpr>(cloneDeep(DEFAULT_INCDNT_APLY_RLPR));
/** 전자접수 사건 신청 내용 */
// const incdntAplyCn = ref<ElrIncdntAplyCn>(cloneDeep(DEFAULT_INCDNT_APLY_CN));
/** 전자접수 사건 스토킹 데이트 */
// const incdntStkgDate = ref<ElrIncdntStkgDate>(
//   cloneDeep(DEFAULT_INCDNT_STKG_DATE)
// );

/** 전자접수 사건 성폭력 */
// const incdntSxvl = ref<ElrIncdntSxvl>(cloneDeep(DEFAULT_INCDNT_SXVL));

/** 입증 자료<br/>첨부파일 */
const evdncData = ref<EvdncData>();

/** 나의 서류 팝업 */
const myDocModal = ref(null);

/**
 * ref 선언 : 상담내용(contentRef)
 */
const contentRef = ref();

/** 제출안내 팝업 */
const elrcptGdModal = ref(null);

/** 입증자료 입력완료 여부 */
const evdncDataCfmtnYn = ref('');

/** 고지사항확인동의여부 */
const infrmMttrAgreYn = ref('');

/** 사건증빙문서 목록 리스트 */
const incdntevdncdocList = ref();

/** 사건증빙문서 목록 (사건명) */
const incdntLst = ref();

/** 대상자증빙문서 목록 리스트 */
const trprevdncdocList = ref();

/** 대상자증빙문서 목록 (구조대상자명) */
const trprList = ref();
/** 세션정보조회 */
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

// /** 등록된 자가진단 번호 */
// const slfDgnsNo: string =
//   typeof route.query.slfDgnsNo === 'string' ? route.query.slfDgnsNo : '';
//
// /** 등록된 자가진단 번호 */
// const instNo: string =
//   typeof route.query.instNo === 'string' ? route.query.instNo : '';
/**
 * name : onBeforeMount
 * desc : onMounted 발생 전에 발생
 **/
onBeforeMount(() => {
  // 로그인 완료상태
  if (authenticated.value) {
    // TODO - 추후 하드코딩 제거
    // 신청폼이 이미 존재 CASE
    // route.query.incdntAplyNo = 'S250820I0300002';
    // 자가진단번호 - 사건, 대상자, 소득요건 조회
    route.query.slfDgnsNo = 'J25081300008';
    // 사건아이디 - 제출필요서류
    route.query.incdntId = 'C000000018';
    // 대상자번호 - 제출필요서류
    route.query.atrprNo = 'L000000038';

    form.incdntId = route.query.incdntId;
    form.atrprNo = route.query.atrprNo;

    // 자가진단번호로 사건, 구조대상자, 소득요건 정보 조회
    selectSlfdgnsInfo(form.slfDgnsNo);
    // 사건증빙문서목록조회
    selectIncdntevdncdocList();
    // 대상자증빙문서목록조회
    selectTrprevdncdocList();

    initConstant();

    if (route.query.incdntAplyNo === undefined) {
      //신규일 경우 사용자 정보를 가져온다.
      selectLoginInfo();
    } else {
      form.incdntAplyNo = route.query.incdntAplyNo;

      showAlert({
        icon: 'info',
        html: '기존에 작성중인 신청서가 존재합니다. <br /> 작성중인 신청서를 불러옵니다.'
      });

      //사건신청번호가 들어온다면 조회한다.
      selectincdntAplyInfo(); //입력 정보 조회
    }
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

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

/**
 * name : selectLoginInfo
 * desc : 로그인 정보 조회
 */
const selectLoginInfo = async () => {
  const response = await elrcptApis.selectLoginInfo();
  // console.log('response.data: ', response.data);
  form.aplcntRlprNm = response.data.mbrNm;
  form.aplcntMblTelno = response.data.mbrMblTelno;

  if (response.data.mbrEmlAddr !== '') {
    form.aplcntEmlAddr =
      response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  }

  console.log('form.value.aplcntRlprNm :::' + form.aplcntRlprNm);
  console.log('form.value.aplcntMblTelno :::' + form.aplcntMblTelno);
  console.log('form.value.aplcntEmlAddr :::' + form.aplcntEmlAddr);
};

/**
 * name : initConstant
 * desc : 각 상수 객체의 값 초기화
 */
const initConstant = () => {
  form.aplcntSeCd = 'I001'; // I001: 의뢰자(신청자)
  form.vctmSeCd = 'I003'; // I003: 피해자
};

/**
 * name : selectincdntAplyInfo
 * desc : 사건정보를 불러온다.
 */
const selectincdntAplyInfo = async () => {
  //폼 데이터
  const formData = new FormData();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios().post(
    '/api/elrcpt/legalaidSxvl/selectLegalaidAplyInfo',
    formData
  );

  // Object.keys(response.data).forEach(function (i) {
  //   // 사건신청내용 parsing
  //   if (i === 'aplyCn' && typeof response.data[i] === 'string') {
  //     try {
  //       const parsed = JSON.parse(response.data[i]);
  //       // parsed된거 다시 form에 담아줌
  //       Object.keys(parsed).forEach(function (j) {
  //         form[j] = parsed[j];
  //       });
  //     } catch (e) {
  //       console.error('aplyCn JSON parse 에러:', e);
  //     }
  //   } else {
  //     form[i] = response.data[i];
  //   }
  // });

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });

  addrKey = addrKey + 1;
};

/**
 * name : tmprStrgBtn
 * desc : 임시저장버튼 클릭시 신규 저장한다.
 */
const tmprStrgBtn = async () => {
  // TODO - 수정된 사항 없을시 알림필요
  await formRef.value.validate();

  const submit = await showAlert({
    icon: 'question',
    html: '임시저장 하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    form.aplyPrgrsSttsCd = 'A01'; //임시저장
    // 사건신청번호가 없으면 신규, 있으면 수정
    if (route.query.incdntAplyNo === undefined) {
      insertForm();
    } else {
      updateForm();
    }
  }
};

/**
 * name : insertBtn
 * desc : 저장버튼 클릭시 신규 저장한다.
 */
const insertBtn = async () => {
  await formRef.value.validate();

  const submit = await showAlert({
    icon: 'question',
    html:
      '필수 구비서류가 정확히 제출되지 않으면 신청이 최종적으로 완료되지 않아서\n' +
      '  심사 또는 처리 과정이 정상적으로 진행되지 않을 수 있습니다.',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    form.aplyPrgrsSttsCd = 'A02'; //신청
    // 사건신청번호가 없으면 신규, 있으면 수정
    if (route.query.incdntAplyNo === undefined) {
      insertForm();
    } else {
      updateForm();
    }
  }
};

/**
 * name : insertForm
 * desc : 신규 저장한다.
 */
const insertForm = async () => {
  form.incdntOtln = ''; //초기화
  if (contentRef.value != undefined) {
    //에디터에 입력한 값 form.incdntOtln set
    if (contentRef.value.getTextValue().trim() !== '') {
      form.incdntOtln = contentRef.value.getValue();
    }
  }

  //폼 데이터
  const formData = new FormData();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });
  // formData.append('incdntFileList', JSON.stringify(incdntFileList.value));
  try {
    const response = await useAxios()
      .post('/api/elrcpt/legalaidSxvl/insertLegalaidForm', formData)
      .then(() => {
        // 임시저장은 alert 호출, 신청은 신청완료화면 호출
        if (form.aplyPrgrsSttsCd === 'A02') {
          navigateTo('/elrcpt/ElrcptCmptnInfo');
        } else {
          showAlert({
            icon: 'info',
            html: '임시저장 되었습니다.'
          });
        }
      });
    // const response = await useAxios
    //   .post('/api/elrcpt/kcab/insertKcabForm', formData)
    //   .then(() => {
    //     alert('전자접수완료(LASP_ELE_018) 화면으로 이동');
    //     // navigateTo('/elrcpt/ElrcptCmptnInfo');
    //   });
  } catch (err) {
    console.log('axios failed', err);
  }
};

/**
 * name : updateForm
 * desc : 수정하여 저장한다.
 */
const updateForm = async () => {
  await formRef.value.validate();
  //폼 데이터
  const formData = new FormData();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios()
    .post('/api/elrcpt/legalaidSxvl/updateLegalaidForm', formData)
    .then(() => {
      // 임시저장은 alert 호출, 신청은 신청완료화면 호출
      if (form.aplyPrgrsSttsCd === 'A02') {
        navigateTo('/elrcpt/ElrcptCmptnInfo');
      } else {
        showAlert({
          icon: 'info',
          html: '임시저장 되었습니다.'
        });
      }
    });
};

/**
 * name : showMyDocPopup
 * desc : 나의 서류 팝업을 호출한다
 */
const showMyDocPopup = () => {
  if (myDocModal.value) {
    myDocModal.value.showModal();
  }
};

/* 나의 서류 목록 팝업에서 전달받은 seq, fileId를 담는 변수 */
const myDocData = ref(null);

/**
 * name : selectMyDoc
 * desc : 나의 서류 목록 팝업에서 선택한 데이터의 seq, fileId 담는 함수
 */
const selectMyDoc = (data) => {
  myDocData.value = data;
  // TODO 전달받은 데이터를 어떻게 사용?
};

const showElrcptGdPopup = () => {
  if (elrcptGdModal.value) {
    elrcptGdModal.value.showModal();
  }
};
/**
 * name : sameInfoChange
 * desc : 체크시 신청인정보를 피해자정보 폼으로 복사
 */
const sameInfoChange = (val) => {
  const checked = (val.target as HTMLInputElement).checked;
  if (checked) {
    form.vctmRlprNm = form.aplcntRlprNm;
    form.vctmZip = form.aplcntZip;
    form.vctmAddr = form.aplcntAddr;
    form.vctmDaddr = form.aplcntDaddr;
    form.vctmMblTelno = form.aplcntMblTelno;
    form.vctmEmlAddr = form.aplcntEmlAddr;
    form.vctmTelno = form.aplcntTelno;
    form.vctmFxno = form.aplcntFxno;
  } else {
    form.vctmRlprNm = '';
    form.vctmZip = '';
    form.vctmAddr = '';
    form.vctmDaddr = '';
    form.vctmMblTelno = '';
    form.vctmEmlAddr = '';
    form.vctmTelno = '';
    form.vctmFxno = '';
  }
};
/**
 * name : onEtcRadioChg
 * desc : 기타 input박스 초기화
 */
const onEtcRadioChg = (cd) => {
  // 기타항목(07), 사건종류코드(CO0073)
  if (form.vctmMrgSeCd !== '07' && cd === 'CO0073') {
    form.sxvlIncdntKndEtcMttr = '';
  }

  // if (cd === 'CO0073') {
  //   form.sxvlIncdntKndEtcMttr = '';
  // }
  // if (cd === '07') {
  //   form.sxvlIncdntKndCd = '07';
  // }

  // 기타(03), 혼인상태코드(CO0078)
  if (form.vctmMrgSeCd !== '03' && cd === 'CO0078') {
    form.mrgEtcRsn = '';
  }

  // 주택보유여부(Y)
  if (form.hsPsnYn === 'Y') {
    form.ecnmEtcCn = '';
  }
};
/**
 * name : onEvdncDataCfmtnRadioChg
 * desc : 고지사항확인동의여부 표출
 */
const onEvdncDataCfmtnRadioChg = (val) => {
  if (val.target.value === 'Y') {
    evdncDataCfmtnYn.value = 'Y';
  } else {
    evdncDataCfmtnYn.value = 'N';
  }
};

/**
 * name : onInfrmMttrAgreYnRadioChg
 * desc : 전자접수 신청완료 버튼 표출
 */
const onInfrmMttrAgreYnRadioChg = (val) => {
  if (val.target.value === 'Y') {
    infrmMttrAgreYn.value = 'Y';
  } else {
    infrmMttrAgreYn.value = 'N';
  }
};

/**
 * name: selectSlfdgnsInfo
 * desc: 자가진단번호를 통해 사건, 구조대상자, 소득요건 정보를 가져온다.
 */
const selectSlfdgnsInfo = async (slfDgnsNo: string) => {
  const response = await elrcptApis.selectSlfDgnsCmmInfo(slfDgnsNo);

  incdnt.value = response.data.incdntNm;
  instatrpr.value = response.data.instMngTrprNm;
  mdicm.value = response.data.icrtSeNm;
};

/**
 * name: selectIncdntevdncdocList
 * desc: 사건증빙문서 목록 조회
 */
// TODO - 사건증빙문서, 대상자증빙문서 목록 조회 필요
// 작업중
const selectIncdntevdncdocList = async () => {
  // 폼 데이터
  const formData = new FormData();

  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios().post(
    '/api/elrcpt/legalaidSxvl/selectIncdntevdncdocList',
    formData
  );

  incdntevdncdocList.value = response.data;
  // 사건명 세팅
  incdntLst.value = response.data[0];
};

/**
 * name: selectTrprevdncdocList
 * desc: 대상자증빙문서 목록 조회
 */
const selectTrprevdncdocList = async () => {
  //폼 데이터
  const formData = new FormData();

  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios().post(
    '/api/elrcpt/legalaidSxvl/selectTrprevdncdocList',
    formData
  );

  trprevdncdocList.value = response.data;
  // 구조대상자명 세팅
  trprList.value = response.data[0];
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :showPrintButton="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한변협법률구조재단(성폭력피해자)
        </CommonTitle>
        <div class="receipt-select-infos">
          <ul>
            <li>
              <div class="select-info-item">
                <span class="flag">사&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;건</span>
                <span class="txt">{{ incdnt }}</span>
              </div>
            </li>
            <li>
              <div class="select-info-item">
                <span class="flag">대&nbsp;상&nbsp;자</span>
                <span class="txt">{{ instatrpr }}</span>
              </div>
            </li>
            <li>
              <div class="select-info-item">
                <span class="flag">소득요건</span>
                <span class="txt">{{ mdicm }}</span>
              </div>
            </li>
          </ul>
        </div>
        <a-form :model="form" :rules="formRules" ref="formRef">
          <Accordion v-model:activeKey="activeKey" variant="gray">
            <template #expandIcon="{ isActive }">
              <AccordionIcon :isActive="isActive" />
            </template>
            <AccordionItem key="1">
              <template #header>
                <AccordionHead title="신청인 정보">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area colgroup">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i>
                  <span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    전자접수 신청 신청인 정보의 성명(기관명), 기관인 경우
                    담당자, 주소, 핸드폰, 이메일, 전화, 팩스 입력에관한 표
                  </caption>
                  <colgroup>
                    <col width="12%" />
                    <col width="38%" />
                    <col width="12%" />
                    <col width="38%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명(기관명)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntRlprNm"
                          label="성명(기관명)"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntRlprNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">기관인 경우 담당자</th>
                      <td>
                        <a-form-item
                          name=""
                          label="기관인 경우 담당자"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" v-model:value="form.picNm" />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        주소
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <AddrInput
                          v-model:zip="form.aplcntZip"
                          v-model:addr="form.aplcntAddr"
                          v-model:dAddr="form.aplcntDaddr"
                          :key="addrKey"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        핸드폰
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntMblTelno"
                            label="휴대전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.aplcntMblTelno"
                              readonly="Y"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">
                        이메일
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntEmlAddr"
                          label="이메일"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <EmailInput v-model="form.aplcntEmlAddr" />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">전화</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.aplcntTelno"
                        />
                      </td>
                      <th scope="row">팩스</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.aplcntFxno"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="피해자 정보">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area colgroup">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i>
                  <span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <a-flex justify="flex-end" class="lg:mt-20px lg:mb-10px">
                  <a-checkbox name="type" @change="sameInfoChange">
                    신청자정보와 동일하면 체크하세요
                  </a-checkbox>
                </a-flex>
                <table>
                  <caption>
                    전자접수 신청 피해자 정보의 성명(기관명), 주소, 핸드폰,
                    이메일, 전화, 팩스 입력에관한 표
                  </caption>
                  <colgroup>
                    <col width="12%" />
                    <col width="38%" />
                    <col width="12%" />
                    <col width="38%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명(기관명)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colSpan="3">
                        <a-form-item
                          name="vctmRlprNm"
                          label="성명(기관명)"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.vctmRlprNm"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        주소
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <AddrInput
                          v-model:zip="form.vctmZip"
                          v-model:addr="form.vctmAddr"
                          v-model:dAddr="form.vctmDaddr"
                          :key="addrKey"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        핸드폰
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="vctmMblTelno"
                          label="핸드폰"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <TelNumInput
                            cd-group-id="CO0017"
                            v-model="form.vctmMblTelno"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        이메일
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="vctmEmlAddr"
                          label="이메일"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <EmailInput v-model="form.vctmEmlAddr" />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">전화</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.vctmTelno"
                        />
                      </td>
                      <th scope="row">팩스</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.vctmFxno"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="3">
              <template #header>
                <AccordionHead title="사건정보">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i>
                  <span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    전자접수 신청 사건정보의 사건명, 사건의 종류, 사건의 개요
                    입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        사건명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="incdntNm"
                          label="사건명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.incdntNm"
                            :maxlength="50"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        사건의 종류
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group>
                            <div class="step-group">
                              <div class="radio-group-box">
                                <a-form-item
                                  name="sxvlIncdntKndCd"
                                  label="사건의 종류"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <CommonRadioGroup
                                    code-group-id="CO0073"
                                    v-model:value="form.sxvlIncdntKndCd"
                                    ref="selectedValues"
                                    css="radio-bx"
                                    @change="onEtcRadioChg('CO0073')"
                                  />
                                </a-form-item>
                                <!--                                TODO - 박스위치 수정필요-->
                                <div class="radio-input-group">
                                  <a-form-item
                                    name="sxvlIncdntKndEtcMttr"
                                    label="기타"
                                    :labelCol="{ class: 'sr-only' }"
                                  >
                                    <a-input
                                      class="text-bx"
                                      v-model:value="form.sxvlIncdntKndEtcMttr"
                                      :disabled="form.sxvlIncdntKndCd !== '07'"
                                    />
                                  </a-form-item>
                                </div>
                              </div>
                            </div>
                          </a-radio-group>
                          <!--                          TODO - 기타인풋박스 작업중-->
                          <!--                          <a-radio-group>-->
                          <!--                            <div class="step-group">-->
                          <!--                              <div class="radio-group-box">-->
                          <!--                                <a-form-item-->
                          <!--                                  name="sxvlIncdntKndCd"-->
                          <!--                                  label="사건의 종류"-->
                          <!--                                  :labelCol="{ class: 'sr-only' }"-->
                          <!--                                >-->
                          <!--                                  <CommonRadioGroup-->
                          <!--                                    code-group-id="CO0073"-->
                          <!--                                    :ignoreValues="['07']"-->
                          <!--                                    v-model:value="form.sxvlIncdntKndCd"-->
                          <!--                                    ref="selectedValues"-->
                          <!--                                    css="radio-bx"-->
                          <!--                                    @change="onEtcRadioChg('CO0073')"-->
                          <!--                                  />-->
                          <!--                                </a-form-item>-->
                          <!--                              </div>-->
                          <!--                            </div>-->
                          <!--                            <div class="step-group">-->
                          <!--                              <div class="radio-group-box wide">-->
                          <!--                                <a-radio-->
                          <!--                                  class="radio-bx"-->
                          <!--                                  v-model:value="form.sxvlIncdntKndCd"-->
                          <!--                                  >기타</a-radio-->
                          <!--                                >-->
                          <!--                                <div class="radio-input-group">-->
                          <!--                                  <a-form-item-->
                          <!--                                    name=""-->
                          <!--                                    label="기타"-->
                          <!--                                    :labelCol="{ class: 'sr-only' }"-->
                          <!--                                    @change="onEtcRadioChg('07')"-->
                          <!--                                  >-->
                          <!--                                    <a-input-->
                          <!--                                      class="text-bx"-->
                          <!--                                      v-model:value="form.sxvlIncdntKndEtcMttr"-->
                          <!--                                    />-->
                          <!--                                  </a-form-item>-->
                          <!--                                </div>-->
                          <!--                              </div>-->
                          <!--                            </div>-->
                          <!--                          </a-radio-group>-->
                        </div>
                        <BullList type="refMark">
                          <li class="blue">
                            형사변호는 피해자가 피소되어 변호사 변호가 필요할 때
                            체크합니다.
                          </li>
                        </BullList>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">사건의 개요</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-form-item
                          name="incdntOtln"
                          label="사건의개요"
                          :label-col="{ style: { display: 'none' } }"
                        >
                          <lazy-data-editor
                            ref="contentRef"
                            :initial-value="form.incdntOtln"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>

            <AccordionItem key="5">
              <template #header>
                <AccordionHead title="피해자의 인적상황(경제적 상황)">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <span>
                        피해자가 아동이라면 보호자의 직업과 재정상태를
                        표시합니다.
                      </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area">
                <p class="form-ess_info mo-only">
                  <span>
                    피해자가 아동이라면 보호자의 직업과 재정상태를 표시합니다.
                  </span>
                </p>
                <table>
                  <caption>
                    전자접수 신청 피해자의 인적상황(경제적 상황) 의 최종학력,
                    직업, 혼인상태, 자녀, 경제적상황, 월소득, 부양가족유무,
                    이전에 법률구조를 받은 경형이 있는지 여부, 기타 특이사항
                    입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">최종학력</th>
                      <td>
                        <CommonSelect
                          id="vctmLastAcbgCd"
                          v-model:value="form.vctmLastAcbgCd"
                          codeGroupId="CO0047"
                          pType="S"
                          placeholder="선택"
                          css="common-select"
                        />
                      </td>
                      <th scope="row">직업</th>
                      <td>
                        <a-form-item
                          name=""
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="job"
                            v-model:value="form.vctmCrCd"
                            codeGroupId="CO0048"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">혼인상태</th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group>
                            <div class="step-group">
                              <div class="radio-group-box">
                                <CommonRadioGroup
                                  code-group-id="CO0078"
                                  v-model:value="form.vctmMrgSeCd"
                                  css="radio-bx"
                                  @change="onEtcRadioChg('CO0078')"
                                />
                                <div class="radio-input-group">
                                  <a-form-item
                                    name=""
                                    label="기타"
                                    :labelCol="{ class: 'sr-only' }"
                                  >
                                    <a-input
                                      class="text-bx"
                                      v-model:value="form.mrgEtcRsn"
                                      :disabled="form.vctmMrgSeCd !== '03'"
                                    />
                                  </a-form-item>
                                </div>
                              </div>
                            </div>
                          </a-radio-group>

                          <!--                        <a-radio-group v-model:value="incdntSxvl.vctmMrgSeCd">-->
                          <!--                          <div class="step-group">-->
                          <!--                            <div class="radio-group-box wide">-->
                          <!--                              <a-radio class="radio-bx" value="03"-->
                          <!--                                >기타</a-radio-->
                          <!--                              >-->
                          <!--                              <div class="radio-input-group">-->
                          <!--                                <a-form-item-->
                          <!--                                  name=""-->
                          <!--                                  label="기타"-->
                          <!--                                  :labelCol="{ class: 'sr-only' }"-->
                          <!--                                >-->
                          <!--                                  <a-input-->
                          <!--                                    class="text-bx"-->
                          <!--                                    v-model:value="incdntSxvl.mrgEtcRsn"-->
                          <!--                                  />-->
                          <!--                                </a-form-item>-->
                          <!--                              </div>-->
                          <!--                            </div>-->
                          <!--                          </div>-->
                          <!--                        </a-radio-group>-->
                        </div>
                      </td>
                      <th scope="row">자녀</th>
                      <td>
                        <a-radio-group v-model:value="form.vctmChldYn">
                          <a-radio class="radio-bx" value="Y">유</a-radio>
                          <a-radio class="radio-bx" value="N">무</a-radio>
                        </a-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">경제적상황</th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group
                            v-model:value="form.hsPsnYn"
                            @change="onEtcRadioChg"
                          >
                            <div class="step-group">
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="Y"
                                  >주택보유</a-radio
                                >
                                <a-radio class="radio-bx" value="N"
                                  >기타</a-radio
                                >
                                <div class="radio-input-group">
                                  <a-form-item
                                    name=""
                                    label="기타"
                                    :labelCol="{ class: 'sr-only' }"
                                  >
                                    <a-input
                                      class="text-bx"
                                      v-model:value="form.ecnmEtcCn"
                                      :disabled="
                                        form.hsPsnYn === 'Y' ||
                                        form.hsPsnYn === ''
                                      "
                                    />
                                  </a-form-item>
                                </div>
                              </div>
                            </div>
                            <!--                          <div class="step-group">-->
                            <!--                            <div class="radio-group-box wide">-->
                            <!--                              <a-radio class="radio-bx" value="N">기타</a-radio>-->
                            <!--                              <div class="radio-input-group">-->
                            <!--                                <a-form-item-->
                            <!--                                  name=""-->
                            <!--                                  label="기타"-->
                            <!--                                  :labelCol="{ class: 'sr-only' }"-->
                            <!--                                >-->
                            <!--                                  <a-input-->
                            <!--                                    class="text-bx"-->
                            <!--                                    v-model:value="incdntSxvl.ecnmEtcCn"-->
                            <!--                                    :disabled="incdntSxvl.hsPsnYn === 'Y'"-->
                            <!--                                  />-->
                            <!--                                </a-form-item>-->
                            <!--                              </div>-->
                            <!--                            </div>-->
                            <!--                          </div>-->
                          </a-radio-group>
                        </div>
                      </td>
                      <th scope="row">월소득</th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group v-model:value="form.vctmMmEarnCd">
                            <!-- TODO: 코드 정의서 상 명확하지 않음 -->
                            <!-- TODO - '하' 인 경우 input박스 비활성화 필요? -->
                            <div class="step-group">
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="1">상</a-radio>
                                <a-radio class="radio-bx" value="2">중</a-radio>
                                <a-radio class="radio-bx" value="3">하</a-radio>
                                <div class="radio-input-group">
                                  <a-form-item
                                    name=""
                                    label="하"
                                    :labelCol="{ class: 'sr-only' }"
                                    class="!w-200px lg:!w-280px"
                                  >
                                    <a-input
                                      class="text-bx"
                                      v-model:value="form.mmEarnEtcCn"
                                    />
                                  </a-form-item>
                                  <span class="txt">만원 정도</span>
                                </div>
                              </div>
                            </div>
                          </a-radio-group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">부양가족유무</th>
                      <td>
                        <a-radio-group v-model:value="form.vctmSptFamYn">
                          <a-radio class="radio-bx" value="Y">유</a-radio>
                          <a-radio class="radio-bx" value="N">무</a-radio>
                        </a-radio-group>
                      </td>
                      <th scope="row">
                        이전에 법률구조를<br class="pc-only" />
                        받은경형이 있는지 여부
                      </th>
                      <td>
                        <a-radio-group v-model:value="form.bfrLwaYn">
                          <a-radio class="radio-bx" value="Y">유</a-radio>
                          <a-radio class="radio-bx" value="N">무</a-radio>
                        </a-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">기타 특이사항</th>
                      <td colSpan="3">
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-textarea
                          class="textarea-bx"
                          id="textMessage"
                          placeholder="1000글자 이내로 작성"
                          :maxlength="1000"
                          v-model:value="form.excptnMttr"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="6">
              <template #header>
                <AccordionHead title="구조필요성에 대한 의견" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청 구조필요성에 대한 의견 의 내용 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">내용</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-textarea
                          class="textarea-bx"
                          id="textMessage"
                          placeholder="(여성인권과의 관련성 및 피해자의 경제 상황을 고려하여 자세히 기재 요망)"
                          :maxlength="200"
                          v-model:value="form.lwaNeedExpln"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="7">
              <template #header>
                <AccordionHead title="변호사정보">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i>
                  <span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    전자접수 변호사정보의 담당 변호사명, 핸드폰, 이메일, 전화,
                    팩스 입력에관한 표
                  </caption>
                  <colgroup>
                    <col width="12%" />
                    <col width="38%" />
                    <col width="12%" />
                    <col width="38%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        담당 변호사명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colSpan="3">
                        <a-form-item
                          name="tkcgLwyrNm"
                          label="담당 변호사명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.tkcgLwyrNm"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        핸드폰
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="lwyrMbrTelno"
                            label="휴대전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.lwyrMbrTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-item__email">
                          <EmailNumInput
                            v-model="form.lwyrEmlAddr"
                            ref="lwyrEmlAddrRef"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">전화</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0018"
                            v-model="form.lwyrOfcTelno"
                          />
                        </div>
                      </td>
                      <th scope="row">팩스</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0018"
                            v-model="form.lwyrOfcFxno"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="8">
              <template #header>
                <AccordionHead title="입증자료제출" />
              </template>
              <div class="receipt-form-info">
                <!--              TODO - []안에 선택한 구조대상자 표시 -->
                <div class="tit">
                  법률구조대상자[{{ trprList.atrprLstNm }}] 증빙서류
                </div>
                <div class="info-box">
                  <div class="info-top">
                    법률구조대상자 입증을 위해 아래와 같은 증빙서류 제출이
                    필요합니다.
                  </div>
                  <ul class="info-list">
                    <li v-for="(item, index) in trprevdncdocList">
                      <span class="num">{{ index + 1 }}.</span
                      >{{ item.trprDocNm }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="receipt-submit-box">
                <div class="receipt-submit-item">
                  <div class="submit-module">
                    <!--module-->
                    <div class="module-unit">
                      <div class="module-in">
                        <div class="select-forms">
                          <div class="forms-in">
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                              >
                                <a-select-option value="1"
                                  >선택 1</a-select-option
                                >
                                <a-select-option value="2"
                                  >선택 2</a-select-option
                                >
                              </a-select>
                            </a-form-item>
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input class="text-bx" placeholder="첨부파일" />
                            </a-form-item>
                          </div>
                          <div class="guide-txt">
                            <span class="num">※</span>전자접수 신청 사건의
                            구비서류를 전자증명서로 편리하게 제출할 수 있습니다.
                          </div>
                        </div>
                        <div class="select-btns">
                          <button
                            type="button"
                            class="btn is-active"
                            @click="showElrcptGdPopup"
                          >
                            <span class="txt">제출안내</span>
                          </button>
                          <div class="btn">
                            <AllyFileButton class="txt">
                              <template #input>
                                <label for="fileInput"
                                  ><span class="sr-only">파일첨부</span></label
                                >
                                <input
                                  type="file"
                                  id="fileInput"
                                  class="sr-only"
                                  aria-hidden="true"
                                  tabindex="-1"
                                />
                              </template>
                            </AllyFileButton>
                          </div>
                          <button type="button" class="btn">
                            <span class="txt">나의서류</span>
                          </button>
                        </div>
                        <div class="del-btn">
                          <button type="button" class="btn">
                            <span class="txt">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="module-unit">
                      <div class="module-in">
                        <div class="select-forms">
                          <div class="forms-in">
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                              >
                                <a-select-option value="1"
                                  >선택 1</a-select-option
                                >
                                <a-select-option value="2"
                                  >선택 2</a-select-option
                                >
                              </a-select>
                            </a-form-item>
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input class="text-bx" placeholder="첨부파일" />
                            </a-form-item>
                          </div>
                        </div>
                        <div class="select-btns">
                          <button type="button" class="btn">
                            <span class="txt">전자증명</span>
                          </button>
                          <div class="btn file-input is-active">
                            <AllyFileButton class="txt">
                              <template #input>
                                <label for="fileInput"
                                  ><span class="sr-only">파일첨부</span></label
                                >
                                <input
                                  type="file"
                                  id="fileInput"
                                  class="sr-only"
                                  aria-hidden="true"
                                  tabindex="-1"
                                />
                              </template>
                            </AllyFileButton>
                          </div>
                          <button type="button" class="btn">
                            <span class="txt">나의서류</span>
                          </button>
                        </div>
                        <div class="del-btn">
                          <button type="button" class="btn">
                            <span class="txt">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="module-unit">
                      <div class="module-in">
                        <div class="select-forms">
                          <div class="forms-in">
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                              >
                                <a-select-option value="1"
                                  >선택 1</a-select-option
                                >
                                <a-select-option value="2"
                                  >선택 2</a-select-option
                                >
                              </a-select>
                            </a-form-item>
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input class="text-bx" placeholder="첨부파일" />
                            </a-form-item>
                          </div>
                        </div>
                        <div class="select-btns">
                          <button type="button" class="btn">
                            <span class="txt">전자증명</span>
                          </button>
                          <div class="btn file-input">
                            <AllyFileButton class="txt">
                              <template #input>
                                <label for="fileInput"
                                  ><span class="sr-only">파일첨부</span></label
                                >
                                <input
                                  type="file"
                                  id="fileInput"
                                  class="sr-only"
                                  aria-hidden="true"
                                  tabindex="-1"
                                />
                              </template>
                            </AllyFileButton>
                          </div>
                          <button
                            type="button"
                            class="btn is-active"
                            @click="showMyDocPopup"
                          >
                            <span class="txt">나의서류</span>
                          </button>
                        </div>
                        <div class="del-btn">
                          <button type="button" class="btn">
                            <span class="txt">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!--//module-->
                  </div>
                </div>
                <!--                            <div class="receipt-submit-item">-->
                <!--                              <div class="submit-top">-->
                <!--                                <div class="top-txt">-->
                <!--                                  <span class="flag">선택</span>-->
                <!--                                  추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.-->
                <!--                                </div>-->
                <!--                                <div class="top-btns">-->
                <!--                                  <button type="button" class="btn add">행추가</button>-->
                <!--                                  <button type="button" class="btn del">행삭제</button>-->
                <!--                                </div>-->
                <!--                              </div>-->
                <!--                              <div class="submit-module">-->
                <!--                                &lt;!&ndash;module&ndash;&gt;-->
                <!--                                <div class="module-unit">-->
                <!--                                  <div class="module-in">-->
                <!--                                    <div class="select-forms">-->
                <!--                                      <div class="forms-in">-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-select class="common-select" placeholder="선택">-->
                <!--                                            <a-select-option value="1"-->
                <!--                                              >선택 1</a-select-option-->
                <!--                                            >-->
                <!--                                            <a-select-option value="2"-->
                <!--                                              >선택 2</a-select-option-->
                <!--                                            >-->
                <!--                                          </a-select>-->
                <!--                                        </a-form-item>-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-input class="text-bx" placeholder="첨부파일" />-->
                <!--                                        </a-form-item>-->
                <!--                                      </div>-->
                <!--                                      <div class="guide-txt">-->
                <!--                                        <span class="num">※</span>전자접수 신청 사건의-->
                <!--                                        구비서류를 전자증명서로 편리하게 제출할 수 있습니다.-->
                <!--                                      </div>-->
                <!--                                    </div>-->
                <!--                                    <div class="select-btns">-->
                <!--                                      <button type="button" class="btn is-active">-->
                <!--                                        <span class="txt">전자증명</span>-->
                <!--                                      </button>-->
                <!--                                      <div class="btn file-input">-->
                <!--                                        <AllyFileButton class="txt">-->
                <!--                                          <template #input>-->
                <!--                                            <label for="fileInput"-->
                <!--                                              ><span class="sr-only">파일첨부</span></label-->
                <!--                                            >-->
                <!--                                            <input-->
                <!--                                              type="file"-->
                <!--                                              id="fileInput"-->
                <!--                                              class="sr-only"-->
                <!--                                              aria-hidden="true"-->
                <!--                                              tabindex="-1"-->
                <!--                                            />-->
                <!--                                          </template>-->
                <!--                                        </AllyFileButton>-->
                <!--                                      </div>-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">나의서류</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                    <div class="del-btn">-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">삭제</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                  </div>-->
                <!--                                </div>-->
                <!--                                <div class="module-unit">-->
                <!--                                  <div class="module-in">-->
                <!--                                    <div class="select-forms">-->
                <!--                                      <div class="forms-in">-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-select class="common-select" placeholder="선택">-->
                <!--                                            <a-select-option value="1"-->
                <!--                                              >선택 1</a-select-option-->
                <!--                                            >-->
                <!--                                            <a-select-option value="2"-->
                <!--                                              >선택 2</a-select-option-->
                <!--                                            >-->
                <!--                                          </a-select>-->
                <!--                                        </a-form-item>-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-input class="text-bx" placeholder="첨부파일" />-->
                <!--                                        </a-form-item>-->
                <!--                                      </div>-->
                <!--                                    </div>-->
                <!--                                    <div class="select-btns">-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">전자증명</span>-->
                <!--                                      </button>-->
                <!--                                      <div class="btn file-input is-active">-->
                <!--                                        <AllyFileButton class="txt">-->
                <!--                                          <template #input>-->
                <!--                                            <label for="fileInput"-->
                <!--                                              ><span class="sr-only">파일첨부</span></label-->
                <!--                                            >-->
                <!--                                            <input-->
                <!--                                              type="file"-->
                <!--                                              id="fileInput"-->
                <!--                                              class="sr-only"-->
                <!--                                              aria-hidden="true"-->
                <!--                                              tabindex="-1"-->
                <!--                                            />-->
                <!--                                          </template>-->
                <!--                                        </AllyFileButton>-->
                <!--                                      </div>-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">나의서류</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                    <div class="del-btn">-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">삭제</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                  </div>-->
                <!--                                </div>-->
                <!--                                <div class="module-unit">-->
                <!--                                  <div class="module-in">-->
                <!--                                    <div class="select-forms">-->
                <!--                                      <div class="forms-in">-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-select class="common-select" placeholder="선택">-->
                <!--                                            <a-select-option value="1"-->
                <!--                                              >선택 1</a-select-option-->
                <!--                                            >-->
                <!--                                            <a-select-option value="2"-->
                <!--                                              >선택 2</a-select-option-->
                <!--                                            >-->
                <!--                                          </a-select>-->
                <!--                                        </a-form-item>-->
                <!--                                        <a-form-item-->
                <!--                                          name=""-->
                <!--                                          label=""-->
                <!--                                          :labelCol="{ class: 'sr-only' }"-->
                <!--                                        >-->
                <!--                                          <a-input class="text-bx" placeholder="첨부파일" />-->
                <!--                                        </a-form-item>-->
                <!--                                      </div>-->
                <!--                                    </div>-->
                <!--                                    <div class="select-btns">-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">전자증명</span>-->
                <!--                                      </button>-->
                <!--                                      <div class="btn file-input">-->
                <!--                                        <AllyFileButton class="txt">-->
                <!--                                          <template #input>-->
                <!--                                            <label for="fileInput"-->
                <!--                                              ><span class="sr-only">파일첨부</span></label-->
                <!--                                            >-->
                <!--                                            <input-->
                <!--                                              type="file"-->
                <!--                                              id="fileInput"-->
                <!--                                              class="sr-only"-->
                <!--                                              aria-hidden="true"-->
                <!--                                              tabindex="-1"-->
                <!--                                            />-->
                <!--                                          </template>-->
                <!--                                        </AllyFileButton>-->
                <!--                                      </div>-->
                <!--                                      <button type="button" class="btn is-active">-->
                <!--                                        <span class="txt">나의서류</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                    <div class="del-btn">-->
                <!--                                      <button type="button" class="btn">-->
                <!--                                        <span class="txt">삭제</span>-->
                <!--                                      </button>-->
                <!--                                    </div>-->
                <!--                                  </div>-->
                <!--                                </div>-->
                <!--                                &lt;!&ndash;//module&ndash;&gt;-->
                <!--                              </div>-->
                <!--                            </div>-->
              </div>
              <!--TODO - 기준중위소득입증 대상자이면 표출-->

              <!--                          <div class="receipt-form-info">-->
              <!--                            <div class="tit">-->
              <!--                              <div>-->
              <!--                                기준중위소득 소득요건 입증자료-->
              <!--                                <span class="sub"-->
              <!--                                  >소득제한 125% 또는 150% 대상자의 추가제출 서류</span-->
              <!--                                >-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                            <div class="info-box">-->
              <!--                              <div class="info-top">-->
              <!--                                기준중위소득 소득요건 입증을 위하여 증빙서류 제출이-->
              <!--                                필요합니다.-->
              <!--                                <br class="pc-only" />-->
              <!--                                건강보험가입자 유형에 따라 제출가능 한 서류를 택1하여-->
              <!--                                등록해주세요.-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                          </div>-->

              <!--                          <div class="receipt-submit-box">-->
              <!--                            <div class="receipt-submit-item">-->
              <!--                              <div class="submit-top">-->
              <!--                                <div class="top-txt">[건강보험직장가입자]</div>-->
              <!--                                <div class="top-btns">-->
              <!--                                  <button type="button" class="btn add">행추가</button>-->
              <!--                                  <button type="button" class="btn del">행삭제</button>-->
              <!--                                </div>-->
              <!--                              </div>-->
              <!--                              <div class="submit-module">-->
              <!--                                &lt;!&ndash;module&ndash;&gt;-->
              <!--                                <div class="module-unit">-->
              <!--                                  <div class="module-in">-->
              <!--                                    <div class="select-forms">-->
              <!--                                      <div class="forms-in">-->
              <!--                                        <a-form-item-->
              <!--                                          name=""-->
              <!--                                          label=""-->
              <!--                                          :labelCol="{ class: 'sr-only' }"-->
              <!--                                        >-->
              <!--                                          <a-select class="common-select" placeholder="선택">-->
              <!--                                            <a-select-option value="1"-->
              <!--                                              >선택 1</a-select-option-->
              <!--                                            >-->
              <!--                                            <a-select-option value="2"-->
              <!--                                              >선택 2</a-select-option-->
              <!--                                            >-->
              <!--                                          </a-select>-->
              <!--                                        </a-form-item>-->
              <!--                                        <a-form-item-->
              <!--                                          name=""-->
              <!--                                          label=""-->
              <!--                                          :labelCol="{ class: 'sr-only' }"-->
              <!--                                        >-->
              <!--                                          <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                                        </a-form-item>-->
              <!--                                      </div>-->
              <!--                                    </div>-->
              <!--                                    <div class="select-btns">-->
              <!--                                      <button type="button" class="btn">-->
              <!--                                        <span class="txt">전자증명</span>-->
              <!--                                      </button>-->
              <!--                                      <div class="btn file-input">-->
              <!--                                        <AllyFileButton class="txt">-->
              <!--                                          <template #input>-->
              <!--                                            <label for="fileInput"-->
              <!--                                              ><span class="sr-only">파일첨부</span></label-->
              <!--                                            >-->
              <!--                                            <input-->
              <!--                                              type="file"-->
              <!--                                              id="fileInput"-->
              <!--                                              class="sr-only"-->
              <!--                                              aria-hidden="true"-->
              <!--                                              tabindex="-1"-->
              <!--                                            />-->
              <!--                                          </template>-->
              <!--                                        </AllyFileButton>-->
              <!--                                      </div>-->
              <!--                                      <button type="button" class="btn is-active">-->
              <!--                                        <span class="txt">나의서류</span>-->
              <!--                                      </button>-->
              <!--                                    </div>-->
              <!--                                    <div class="del-btn">-->
              <!--                                      <button type="button" class="btn">-->
              <!--                                        <span class="txt">삭제</span>-->
              <!--                                      </button>-->
              <!--                                    </div>-->
              <!--                                  </div>-->
              <!--                                </div>-->
              <!--                                &lt;!&ndash;//module&ndash;&gt;-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                            <div class="receipt-submit-item">-->
              <!--                              <div class="submit-top">-->
              <!--                                <div class="top-txt">[건강보험지역가입자]</div>-->
              <!--                                <div class="top-btns">-->
              <!--                                  <button type="button" class="btn add">행추가</button>-->
              <!--                                  <button type="button" class="btn del">행삭제</button>-->
              <!--                                </div>-->
              <!--                              </div>-->
              <!--                              <div class="submit-module">-->
              <!--                                &lt;!&ndash;module&ndash;&gt;-->
              <!--                                &lt;!&ndash;//module&ndash;&gt;-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                            <div class="receipt-submit-item">-->
              <!--                              <div class="submit-top">-->
              <!--                                <div class="top-txt">[건강보험피부양자]</div>-->
              <!--                                <div class="top-btns">-->
              <!--                                  <button type="button" class="btn add">행추가</button>-->
              <!--                                  <button type="button" class="btn del">행삭제</button>-->
              <!--                                </div>-->
              <!--                              </div>-->
              <!--                              <div class="submit-module">-->
              <!--                                &lt;!&ndash;module&ndash;&gt;-->
              <!--                                &lt;!&ndash;//module&ndash;&gt;-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                            <div class="receipt-submit-item">-->
              <!--                              <div class="submit-top">-->
              <!--                                <div class="top-txt">[건강보험미가입자]</div>-->
              <!--                                <div class="top-btns">-->
              <!--                                  <button type="button" class="btn add">행추가</button>-->
              <!--                                  <button type="button" class="btn del">행삭제</button>-->
              <!--                                </div>-->
              <!--                              </div>-->
              <!--                              <div class="submit-module">-->
              <!--                                &lt;!&ndash;module&ndash;&gt;-->
              <!--                                &lt;!&ndash;//module&ndash;&gt;-->
              <!--                              </div>-->
              <!--                            </div>-->
              <!--                          </div>-->

              <div class="receipt-form-info">
                <div class="tit">
                  사건관련 제출[{{ incdntLst.incdntLstNm }}] 필요서류
                </div>
                <div class="info-box">
                  <div class="info-top">
                    전자접수 신청사건 관련하여 아래와 같은 서류 제출이
                    필요합니다.
                  </div>
                  <ul class="info-list">
                    <li
                      v-for="(item, index) in incdntevdncdocList"
                      :key="index"
                    >
                      <span class="num">{{ index + 1 }}.</span
                      >{{ item.incdntDocNm }}({{
                        item.incdntEsntlYn === 'Y' ? '필수' : '선택'
                      }})
                    </li>
                  </ul>
                </div>
              </div>

              <div class="receipt-submit-box">
                <div class="receipt-submit-item">
                  <div class="submit-top">
                    <div class="top-txt">
                      <span class="flag filled">필수</span>
                      <strong>주민등록등본</strong>
                    </div>
                  </div>
                  <div class="submit-module">
                    <!--module-->
                    <div class="module-unit">
                      <div class="module-in">
                        <div class="select-forms">
                          <div class="forms-in">
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                              >
                                <a-select-option value="1"
                                  >선택 1</a-select-option
                                >
                                <a-select-option value="2"
                                  >선택 2</a-select-option
                                >
                              </a-select>
                            </a-form-item>
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input class="text-bx" placeholder="첨부파일" />
                            </a-form-item>
                          </div>
                        </div>
                        <div class="select-btns">
                          <button type="button" class="btn is-active">
                            <span class="txt">전자증명</span>
                          </button>
                          <div class="btn file-input">
                            <AllyFileButton class="txt">
                              <template #input>
                                <label for="fileInput"
                                  ><span class="sr-only">파일첨부</span></label
                                >
                                <input
                                  type="file"
                                  id="fileInput"
                                  class="sr-only"
                                  aria-hidden="true"
                                  tabindex="-1"
                                />
                              </template>
                            </AllyFileButton>
                          </div>
                          <button type="button" class="btn">
                            <span class="txt">나의서류</span>
                          </button>
                        </div>
                        <div class="del-btn">
                          <button type="button" class="btn">
                            <span class="txt">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!--//module-->
                  </div>
                </div>
                <div class="receipt-submit-item">
                  <div class="submit-top">
                    <div class="top-txt">
                      <span class="flag">선택</span>
                      추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.
                    </div>
                    <div class="top-btns">
                      <button type="button" class="btn add">행추가</button>
                      <button type="button" class="btn del">행삭제</button>
                    </div>
                  </div>
                  <div class="submit-module">
                    <!--module-->
                    <div class="module-unit">
                      <div class="module-in">
                        <div class="select-forms">
                          <div class="forms-in">
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                              >
                                <a-select-option value="1"
                                  >선택 1</a-select-option
                                >
                                <a-select-option value="2"
                                  >선택 2</a-select-option
                                >
                              </a-select>
                            </a-form-item>
                            <a-form-item
                              name=""
                              label=""
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input class="text-bx" placeholder="첨부파일" />
                            </a-form-item>
                          </div>
                          <div class="guide-txt">
                            <span class="num">※</span>전자접수 신청 사건의
                            구비서류를 전자증명서로 편리하게 제출할 수 있습니다.
                          </div>
                        </div>
                        <div class="select-btns">
                          <button type="button" class="btn is-active">
                            <span class="txt">전자증명</span>
                          </button>
                          <div class="btn file-input">
                            <AllyFileButton class="txt">
                              <template #input>
                                <label for="fileInput"
                                  ><span class="sr-only">파일첨부</span></label
                                >
                                <input
                                  type="file"
                                  id="fileInput"
                                  class="sr-only"
                                  aria-hidden="true"
                                  tabindex="-1"
                                />
                              </template>
                            </AllyFileButton>
                          </div>
                          <button type="button" class="btn">
                            <span class="txt">나의서류</span>
                          </button>
                        </div>
                        <div class="del-btn">
                          <button type="button" class="btn">
                            <span class="txt">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!--//module-->
                  </div>
                </div>
              </div>

              <div class="select-result-box">
                <div class="check-tit-box">
                  <span class="ico-check-info"></span>
                  <strong>입증자료를 입력 완료 하시겠습니까?</strong>
                </div>
                <a-radio-group
                  v-model:value="evdncDataCfmtnYn"
                  @change="onEvdncDataCfmtnRadioChg"
                >
                  <a-radio class="radio-bx" value="Y">예</a-radio>
                  <a-radio class="radio-bx" value="N">아니요</a-radio>
                </a-radio-group>
              </div>
            </AccordionItem>
          </Accordion>
        </a-form>

        <div class="receipt-agree-box" v-if="evdncDataCfmtnYn === 'Y'">
          <!--스토킹/데이트 폭력-->
          <div class="agree-content-box" v-if="false">
            <div class="agree-tit">
              무료법률구조사업 이용자 고지사항 확인 동의서
            </div>
            <div class="agree-content">
              <div class="agree-content-in">
                <div>
                  귀하는 스토킹/데이트 폭력 피해자로서 여성가족부의
                  <strong>무료법률구조사업(소송지원)</strong>과 대한변호사협회
                  및 대한법률구조공단의 무료법률구조제도를 신청하기 전에
                  지원하는 상담기관에서 반드시 다음과 같은 사항을 고지, 반복
                  고지를 확인한 후 동의서에 서명해주시기 바랍니다.
                </div>
                <BullList type="number" number-style="period" class="mt-20px">
                  <li class="!block !text-[15px]">
                    <strong>여성가족부 무료법률구조사업은</strong>
                    스토킹/데이트 폭력 피해자 증가에 따른 피해자 인권보호 및
                    권익증진에 기여하며, 피해자에게 무료 법률상담 및 법률구조 등
                    법률지원을 제공함으로써 성폭력 사건을 예방하고, 피해자가
                    침해당한 권리를 구제하고자 합니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>여성가족부 무료법률구조사업은</strong>
                    스토킹/데이트 폭력 피해자라면 누구나 지원받을 수 있으며,
                    구조 범위는 폭력 피해로 관련 민사·형사·가사사건, 헌법소원
                    등을 대리합니다.
                    <strong>무료법률구조제도</strong> 지원받는 과정에서 상담사
                    및 변호사와의 상담 내용은 철저히 비밀이 보장되며, 지원
                    여부는 상담결과에 따라 결정될 수 있습니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>무료법률구조사업 위촉변호사는</strong> 형사소송을
                    대리하여 형사사건·재판과정에서 피해자의 인권이 침해되지
                    않도록 돕는 역할과 스토킹/데이트 폭력 사건의 민사·가사소송을
                    대리합니다. 구조변호사는 법률구조 공단에서 위촉하였으며
                    위촉변호사와의 상담 및 소송은 무료입니다. 다만 위촉변호사가
                    소송 수행 시 발생하는 인지·송달료 등 실비는 본인 부담입니다.
                    위촉변호사의 소송수행이 종료된 이후에는 무료 지원이
                    종료되며, 인지, 송달료를 미납하거나 위촉변호사와의 연락이
                    장기간 되지 않을 경우 무료법률구조사업이 종료될 수 있습니다.
                    이에 대한 사항은 무료법률구조사업 만족도조사서에 반드시
                    기재해 주시기 바랍니다. 무료법률구조사업 만족도조사 작성에
                    응하지 않을 경우 무료법률구조사업 지원이 중단될 수 있으니,
                    무료법률구조사업 지원이 필요하신 분은 반드시 고지사항의
                    문의사항이 있었는지, 상담사 및 지원기관 상담자와의 면담을
                    마친 후 확인·서명해 주시기 바랍니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong
                      >무료법률구조 신청인은 피소된 소송으로부터 청구를 받을
                      경우
                    </strong>
                    그에 따른 소송비용은 신청인의 자부담이 발생할 수 있습니다.
                    또한
                    <strong
                      >패소할 경우, 상대방이 신청인에게 소송비용을 청구할 수
                      있습니다.</strong
                    >
                  </li>
                  <li class="!block !text-[15px]">
                    <strong
                      >스토킹/데이트 폭력 피해자 지원기간 중 형사사건 동행자
                      무고, 명예훼손 등으로 피소될 경우</strong
                    >법률구조가 지원됩니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong
                      >사건이 종료된 후에는 반드시 ‘무료법률구조이용자
                      만족도조사서’를 작성하시어, 대한법률구조공단(법률구조 공단
                      무료상담전화 : 02-3476-6515)로 연락주시기
                      바랍니다.</strong
                    >
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <!--//스토킹/데이트 폭력-->
          <!--              TODO - 성폭력이면 해당 동의서 표출 -->
          <!--성폭력-->
          <div class="agree-content-box">
            <div class="agree-tit">
              무료법률구조사업 이용자 고지사항 확인 동의서
            </div>
            <div class="agree-content">
              <div class="agree-content-in">
                <div>
                  귀하는 성폭력 피해자로서 여성가족부의
                  <strong>무료법률구조사업(소송지원)</strong>과 대한변호사협회
                  및 대한법률구조공단의 무료법률구조제도를 신청하기 전에
                  지원하는 상담기관에서 반드시 다음과 같은 사항을
                  <strong>고지, 반복 고지,</strong> 받으며 이를 확인한 후
                  동의서에 서명해주시기 바랍니다.
                </div>
                <BullList type="number" number-style="period" class="mt-20px">
                  <li class="!block !text-[15px]">
                    <strong>여성가족부 무료법률구조사업은</strong> 성폭력 피해자
                    증가에 따른 피해자 인권보호 및 권익증진에 기여하고,
                    피해자에게 무료 법률상담 및 법률구조 등 법률지원을
                    제공함으로써 성폭력 사건을 예방하고, 피해자가 침해당한
                    권리를 구제하고자 합니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>여성가족부 무료법률구조사업은</strong> 성폭력
                    피해자라면 누구나 지원받을 수 있으며, 구조 범위는 성폭력
                    피해 관련 민사·형사·가사사건, 헌법소원 등을 대리합니다.
                    <strong>무료법률구조제도</strong> 지원받는 과정에서 상담사나
                    변호사와 충분히 협의하여야 하며 피해내용을 과장하거나 허위를
                    알려서는 안됩니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>무료법률구조사업 위촉변호사는</strong> 형사소송을
                    대리하여 형사사건·재판과정에서 피해자의 인권이 침해되지
                    않도록 보호하는 역할과 성폭력 사건의 민사·가사소송을
                    대리합니다. 구조변호인은 대한변호사협회에서 위촉하였으며
                    위촉변호사와의 상담 및 소송은 무료입니다. 다만 위촉변호사가
                    소송을 수행하는 과정 중의 환의에 대해서도 다른 수임료 및
                    성공보수는 받지 않습니다. 사선으로 변호사를 이미 선임하였을
                    경우 지원이 불가합니다. 무료법률구조사업 지원은 재판이
                    확정된 시점에서 종료되며, 인지·송달료를 미납하거나
                    위촉변호사와의 연락이 장기간 되지 않을 경우
                    무료법률구조사업이 종료될 수 있습니다. 이에 대한 사항은
                    무료법률구조사업 만족도조사서에 반드시 기재해 주시기
                    바랍니다. 무료법률구조사업 만족도조사 작성에 응하지 않을
                    경우 무료법률구조사업 지원이 중단될 수 있으니,
                    무료법률구조사업 지원이 필요하신 분은 반드시 고지사항의
                    문의사항이 있었는지, 상담사 및 지원기관 상담자와의 면담을
                    마친 후 확인·서명해 주시기 바랍니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong
                      >무료법률구조 신청인은 과도한 소송을 요구할 경우,</strong
                    >
                    그에 따른 소송비용을 신청인이 자부담하여야 할 수도 있습니다.
                    또한
                    <strong
                      >패소할 경우, 상대방이 신청인에게 소송비용을 청구</strong
                    >할 수 있으므로 이 점을 충분히 고려하여 소송 및 소의 제기
                    여부를 결정해주시기 바랍니다(패소 시 청구 받은 비용은
                    자부담).
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>성폭력 피해자나 피해자 지원기관의 종사자</strong>가
                    무고, 명예훼손 등으로 피고소될 경우에도 법률구조가
                    지원됩니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong
                      >사건이 종료된 후에는 반드시 ‘무료법률구조이용자
                      만족도조사서’를 작성하시어, 대한법률구조공단(무료상담전화:
                      02-3476-6515)로 송부해 주시기 바랍니다.</strong
                    >
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <!--//성폭력-->
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>본 상담소는 위 사항을 무료법률구조
              신청인이 이해하도록 고지하였습니다.
            </div>
          </div>
          <div class="common-form__area">
            <table>
              <caption>
                무료법률구조사업 이용자 고지사항 확인 동의서의 상담소 명,
                연락처, 대표자명 입력에관한 표
              </caption>
              <tbody>
                <tr>
                  <th scope="row">상담소 명</th>
                  <td>
                    <a-form-item
                      name="instNm"
                      label="상담소 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" v-model:value="form.instNm" />
                    </a-form-item>
                  </td>
                  <th scope="row">연락처</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="instTelno"
                        label="연락처 식별번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.instTelno"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">대표자 명</th>
                  <td colSpan="3">
                    <a-form-item
                      name=""
                      label="대표자 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="form.instRprsvNm"
                      />
                    </a-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>무료법률구조 신청인(본인)은 위와 같은
              사항을 상담소로부터 고지 받았으며, 이에 동의합니다.
            </div>
            <a-radio-group
              @change="onInfrmMttrAgreYnRadioChg"
              v-model:value="form.infrmMttrAgreYn"
            >
              <a-radio class="radio-bx" value="Y">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="N">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
          <div class="common-form__area">
            <table>
              <caption>
                무료법률구조사업 이용자 고지사항 확인 동의서의 신청인 명, 연락처
                입력에관한 표
              </caption>
              <tbody>
                <tr>
                  <th scope="row">신청인 명</th>
                  <td>
                    <a-form-item
                      name="aplcntRlprNm"
                      label="신청인 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="form.aplcntRlprNm"
                        readonly="Y"
                      />
                    </a-form-item>
                  </td>
                  <th scope="row">연락처</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="aplcntMblTelno"
                        label="연락처 식별번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.aplcntMblTelno"
                          readonly="Y"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ButtonGroup
          align="center"
          class="!mt-50px"
          v-if="infrmMttrAgreYn === 'Y' || form.infrmMttrAgreYn === 'Y'"
        >
          <CommonButton variants="line-primary" width="lg" @click="tmprStrgBtn">
            임시저장
          </CommonButton>
          <CommonButton variants="primary" width="lg" @click="insertBtn">
            전자접수 신청완료
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
  <!-- 나의서류 팝업 Component -->
  <MyDocPopup ref="myDocModal" @myDoc="selectMyDoc" />
  <ElrcptGdPopup ref="elrcptGdModal" />
</template>

<style scoped lang="scss">
@use '../../../assets/style/pages/elrcpt/form/ElrcptLegalaidSxvl.scss';
</style>
