<!--
 * 화면명 : 전자접수신청_성폭력
 * 화면ID : LASP_ELE_019
 * 파일명 : ElrcptAply
 * 작성자 : 이동규
 * 화면 설명 : 대한변협법률구조재단에 성폭력 사건으로 전자접수 신청하는 화면
 * 공통코드 : RLPR_SE_CD(CO0067)
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.06         이동규       최초생성
-->

<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
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
import form from '~/pages/components/layout/form.vue';
import { ref } from 'vue';

const activeKey = ref([1]);
const { showAlert } = useCustomAlert();

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
const DEFAULT_INCDNT_APLY_CN: ElrIncdntAplyCn = {
  incdntNm: '' /* 사건명 */,
  incdntKndCd: '' /* 사건종류코드 */,
  ctIncdntNo: '' /* 법원사건번호 */,
  incdntOtln: '' /* 사건개요 */,
  evdncCn: '' /* 증빙내용 */,
  aplcntMicmAmt: '' /* 신청자월수입금액 */,
  aplcntMicmDsctn: '' /* 신청자거주지종류코드 */,
  aplcntRsdcKndCd: '' /* 신청자거주지종류기타사항 */,
  aplcntRsdcKndEtcMttr: '' /* 소유구분코드 */,
  psnSeCd: '' /* 부동산소유자명 */,
  restOwnrNm: '' /* 임대보증금액 */,
  rentGrnteAmt: '' /* 월세금액 */,
  mrntAmt: '' /* 소유관계기타사항 */,
  psnPelEtcMttr: '' /* 부동산재산내역 */,
  svgPrptDsctn: '' /* 예금재산내역 */,
  vhclPrptDsctn: '' /* 차량재산내역 */,
  pnPrptDsctn: '' /* 연금재산내역 */,
  etcPrptDsctn: '' /* 기타재산내역 */,
  vstPathCd: '' /* 방문경로코드 */,
  roblYn: '' /* 기초생활수급자여부 */
};

/** 전자접수 사건 스토킹 데이트 초기값 */
const DEFAULT_INCDNT_STKG_DATE = {
  incdntAplyNo: '' /* 사건신청번호 */,
  incdntNm: '' /* 사건명 */,
  incdntKndCd: '' /* 사건종류코드 */,
  incdntOtln: '' /* 사건개요 */,
  evdncCn: '' /* 증빙내용 */,
  prvcPrcsAgreYn: '' /* 개인정보처리동의여부 */,
  prvcPrvsnAgreYn: '' /* 방문경로코드 */,
  incdntNo: '' /* 사건번호 */,
  rqsrNm: '' /* 의뢰인명 */,
  aplcntNm: '' /* 신청자명 */
};

const DEFAULT_INCDNT_SXVL = {
  incdntAplyNo: '' /* 사건신청번호 */,
  aplyNo: '' /* 신청번호 */,
  picNm: '' /* 담당자명 */,
  sxvlIncdntKndCd: '' /* 성폭력사건종류코드 */,
  sxvlIncdntKndEtcMttr: '' /* 성폭력사건종류기타사항 */,
  incdntOtln: '' /* 사건개요 */,
  vctmLastAcbgCd: '' /* 피해자최종학력코드 */,
  vctmCrCd: '' /* 피해자직업코드 */,
  vctmMrgSeCd: '' /* 피해자결혼구분코드 */,
  mrgEtcRsn: '' /* 결혼기타사유 */,
  vctmChldYn: '' /* 피해자자녀여부 */,
  hsPsnYn: '' /* 주택소유여부 */,
  ecnmEtcYn: '' /* 경제기타여부 */,
  vctmMmEarnAmt: '' /* 피해자월소득금액 */,
  vctmSptFamYn: '' /* 피해자부양가족여부 */,
  excptnMttr: '' /* 특이사항 */,
  bfrLwaYn: '' /* 이전법률구조여부 */,
  lwaNeedExpln: '' /* 법률구조필요설명 */,
  tkcgLwyrNm: '' /* 담당변호사명 */,
  lwyrOfcTelno: '' /* 변호사사무실전화번호 */,
  lwyrOfcFxno: '' /* 변호사사무실팩스번호 */,
  aplcntNm: '' /* 신청자명 */,
  vctmMmEarnCd: '' /* 피해자월소득코드 */,
  lwyrMbrTelno: '' /* 변호사휴대전화번호 */,
  lwyrEmlAddr: '' /* 변호사이메일주소 */
};

const DEFAULT_INCDNT_APLY_RLPR = {
  incdntAplyNo: '' /* 사건신청번호 */,
  rlprSeCd: '' /* 관계자구분코드 */,
  rlprSeq: '' /* 관계자순서 */,
  trprSeCd: '' /* 대상자구분코드 */,
  rlprNm: '' /* 관계자명 */,
  rlprBrdt: '' /* 관계자생년월일 */,
  rlprRrno: '' /* 관계자주민등록번호 */,
  gndrCd: '' /* 성별코드 */,
  rlprMblTelno: '' /* 관계자휴대전화번호 */,
  rlprTelno: '' /* 관계자전화번호 */,
  fxno: '' /* 팩스번호 */,
  rlprZip: '' /* 관계자우편번호 */,
  rlprAddr: '' /* 관계자주소 */,
  rlprDaddr: '' /* 관계자상세주소 */,
  emlAddr: '' /* 이메일주소 */,
  rprsvYn: '' /* 대표자여부 */,
  brno: '' /* 사업자등록번호 */,
  crno: '' /* 법인등록번호 */,
  tpbizNm: '' /* 업종명 */,
  rprsvNm: '' /* 대표자명 */,
  homeWrcSeCd: '' /* 자택직장구분코드 */
};

/** 사건신청자 */
const incdntAplcnt = ref<IncdntAplyRlpr>(cloneDeep(DEFAULT_INCDNT_APLY_RLPR));
/** 사건피해자 */
const incdntVctm = ref<IncdntAplyRlpr>(cloneDeep(DEFAULT_INCDNT_APLY_RLPR));
/** 전자접수 사건 신청 내용 */
const incdntAplyCn = ref<ElrIncdntAplyCn>(cloneDeep(DEFAULT_INCDNT_APLY_CN));

/** 전자접수 사건 스토킹 데이트 */
const incdntStkgDate = ref<ElrIncdntStkgDate>(
  cloneDeep(DEFAULT_INCDNT_STKG_DATE)
);

/** 전자접수 사건 성폭력 */
const incdntSxvl = ref<ElrIncdntSxvl>(cloneDeep(DEFAULT_INCDNT_SXVL));

/** 입증 자료<br/>첨부파일 */
const evdncData = ref<EvdncData>();

/* 나의 서류 팝업 */
const myDocModal = ref(null);

/* 제출안내 팝업 */
const elrcptGdModal = ref(null);

onMounted(() => {
  initConstant();
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

/**
 * name : initConstant
 * desc : 각 상수 객체의 값 초기화
 */
const initConstant = () => {
  incdntAplcnt.value.rlprSeCd = 'I001'; // I001: 의뢰자(신청자)
  incdntVctm.value.rlprSeCd = 'I003'; // I003: 피해자
};

/**
 * name : tmprStrgBtn
 * desc : 임시저장버튼 클릭시 신규 저장한다.
 */
const tmprStrgBtn = async () => {
  //insModalRef.value?.open();

  const submit = await showAlert({
    icon: 'question',
    html: '임시저장 하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });

  if (submit.isConfirmed) {
    // TODO: 저장 데이터 설정
    form.aplyPrgrsSttsCd = 'A01'; //임시저장
    insertForm();
  }
};

/**
 * name : insertForm
 * desc : 신규 저장한다.
 */
const insertForm = async () => {
  //폼 데이터
  const formData = new FormData();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  // 서버 측 엔드포인트
  const response = await axios.post(INCDNT_SXVL_APLY_ENDPOINT, formData);
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
                <span class="txt">민사사건 > 계약관계 > 대여금</span>
              </div>
            </li>
            <li>
              <div class="select-info-item">
                <span class="flag">대&nbsp;상&nbsp;자</span>
                <span class="txt"
                  >사회적취약계층 > 임금 등 체불 피해근로자</span
                >
              </div>
            </li>
            <li>
              <div class="select-info-item">
                <span class="flag">소득요건</span>
                <span class="txt">기준소득 > 120%</span>
              </div>
            </li>
          </ul>
        </div>

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
                  전자접수 신청 신청인 정보의 성명(기관명), 기관인 경우 담당자,
                  주소, 핸드폰, 이메일, 전화, 팩스 입력에관한 표
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
                        name=""
                        label="성명(기관명)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="incdntSxvl.aplcntNm"
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
                        <a-input
                          class="text-bx"
                          v-model:value="incdntSxvl.picNm"
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
                        v-model:zip="incdntAplcnt.rlprZip"
                        v-model:addr="incdntAplcnt.rlprAddr"
                        v-model:dAddr="incdntAplcnt.rlprDaddr"
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
                    <td colspan="3">
                      <TelNumInput
                        cd-group-id="CO0017"
                        v-model="incdntAplcnt.rlprMblTelno"
                      />
                    </td>
                    <th scope="row">
                      이메일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <EmailInput v-model="incdntAplcnt.emlAddr" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">전화</th>
                    <td>
                      <TelNumInput
                        cd-group-id="CO0018"
                        v-model="incdntAplcnt.rlprTelno"
                      />
                    </td>
                    <th scope="row">팩스</th>
                    <td>
                      <TelNumInput
                        cd-group-id="CO0018"
                        v-model="incdntAplcnt.fxno"
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
                <a-checkbox value="" name="type">
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
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="성명(기관명)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="incdntVctm.rlprNm"
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
                        v-model:zip="incdntVctm.rlprZip"
                        v-model:addr="incdntVctm.rlprAddr"
                        v-model:dAddr="incdntVctm.rlprDaddr"
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
                    <td colspan="3">
                      <TelNumInput
                        cd-group-id="CO0017"
                        v-model="incdntVctm.rlprMblTelno"
                      />
                    </td>
                    <th scope="row">
                      이메일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <EmailInput v-model="incdntVctm.emlAddr" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">전화</th>
                    <td>
                      <TelNumInput
                        cd-group-id="CO0018"
                        v-model="incdntVctm.rlprTelno"
                      />
                    </td>
                    <th scope="row">팩스</th>
                    <td>
                      <TelNumInput
                        cd-group-id="CO0018"
                        v-model="incdntVctm.fxno"
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
                        name=""
                        label="사건명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="incdntAplyCn.incdntNm"
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
                        <a-radio-group v-model:value="incdntAplyCn.incdntKndCd">
                          <!-- TODO : CO0073 가져와서 radio 버튼 매핑 -->
                          <div class="step-group">
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value=""
                                >형사고소대리</a-radio
                              >
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value=""
                                >형사번호</a-radio
                              >
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value=""
                                >민사소송</a-radio
                              >
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value=""
                                >가사소송</a-radio
                              >
                            </div>
                          </div>
                          <div class="step-group">
                            <div class="radio-group-box wide">
                              <a-radio class="radio-bx" value="">기타</a-radio>
                              <div class="radio-input-group">
                                <a-form-item
                                  name=""
                                  label="기타"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="
                                      incdntSxvl.sxvlIncdntKndEtcMttr
                                    "
                                  />
                                </a-form-item>
                              </div>
                            </div>
                          </div>
                        </a-radio-group>
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
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        v-model:value="incdntAplyCn.incdntOtln"
                        placeholder="최대 200자 입력 가능"
                        :maxlength="200"
                      />
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
                      피해자가 아동이라면 보호자의 직업과 재정상태를 표시합니다.
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
                  직업, 혼인상태, 자녀, 경제적상황, 월소득, 부양가족유무, 이전에
                  법률구조를 받은 경형이 있는지 여부, 기타 특이사항 입력에관한
                  표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">최종학력</th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">최종학력</a-select-option>
                        <a-select-option value="2">최종학력2</a-select-option>
                      </a-select>
                    </td>
                    <th scope="row">직업</th>
                    <td>
                      <a-form-item
                        name=""
                        label="직업"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="incdntSxvl.job"
                        />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">혼인상태</th>
                    <td>
                      <div class="radio-group-wrap">
                        <a-radio-group v-model:value="incdntSxvl.vctmMrgSeCd">
                          <div class="step-group">
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="01"
                                >미혼</a-radio
                              >
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="02"
                                >기혼</a-radio
                              >
                            </div>
                          </div>
                          <div class="step-group">
                            <div class="radio-group-box wide">
                              <a-radio class="radio-bx" value="03"
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
                                    v-model:value="incdntSxvl.mrgEtcRsn"
                                  />
                                </a-form-item>
                              </div>
                            </div>
                          </div>
                        </a-radio-group>
                      </div>
                    </td>
                    <th scope="row">자녀</th>
                    <td>
                      <a-radio-group v-model:value="incdntSxvl.vctmChldYn">
                        <a-radio class="radio-bx" value="Y">유</a-radio>
                        <a-radio class="radio-bx" value="N">무</a-radio>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">경제적상황</th>
                    <td>
                      <div class="radio-group-wrap">
                        <a-radio-group v-model:value="incdntSxvl.hsPsnYn">
                          <div class="step-group">
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="Y"
                                >주택보유</a-radio
                              >
                            </div>
                          </div>
                          <div class="step-group">
                            <div class="radio-group-box wide">
                              <a-radio class="radio-bx" value="N">기타</a-radio>
                              <div class="radio-input-group">
                                <a-form-item
                                  name=""
                                  label="기타"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="incdntSxvl.ecnmEtcCn"
                                  />
                                </a-form-item>
                              </div>
                            </div>
                          </div>
                        </a-radio-group>
                      </div>
                    </td>
                    <th scope="row">월소득</th>
                    <td>
                      <div class="radio-group-wrap">
                        <a-radio-group v-model:value="incdntSxvl.vctmMmEarnCd">
                          <!-- TODO: 코드 정의서 상 명확하지 않음 -->
                          <div class="step-group">
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="E001"
                                >상</a-radio
                              >
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="E002"
                                >중</a-radio
                              >
                            </div>
                          </div>
                          <div class="step-group">
                            <div class="radio-group-box wide">
                              <a-radio class="radio-bx" value="E003"
                                >하</a-radio
                              >
                              <div class="radio-input-group">
                                <div class="txt-form-box">
                                  <div class="txt-form">
                                    <a-form-item
                                      name=""
                                      label="하"
                                      :labelCol="{ class: 'sr-only' }"
                                      class="!w-200px lg:!w-280px"
                                    >
                                      <a-input
                                        class="text-bx"
                                        v-model:value="incdntSxvl.mmEarnEtcCn"
                                      />
                                    </a-form-item>
                                    <span class="txt">만원 정도</span>
                                  </div>
                                </div>
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
                      <a-radio-group v-model:value="incdntSxvl.vctmSptFamYn">
                        <a-radio class="radio-bx" value="Y">유</a-radio>
                        <a-radio class="radio-bx" value="N">무</a-radio>
                      </a-radio-group>
                    </td>
                    <th scope="row">
                      이전에 법률구조를<br class="pc-only" />
                      받은경형이 있는지 여부
                    </th>
                    <td>
                      <a-radio-group v-model:value="incdntSxvl.bfrLwaYn">
                        <a-radio class="radio-bx" value="Y">유</a-radio>
                        <a-radio class="radio-bx" value="N">무</a-radio>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">기타 특이사항</th>
                    <td colspan="3">
                      <label for="textMessage">
                        <span class="sr-only">textarea</span>
                      </label>
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        placeholder="1000글자 이내로 작성"
                        :maxlength="1000"
                        v-model:value="incdntSxvl.excptnMttr"
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
                        v-model:value="incdntSxvl.lwaNeedExpln"
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
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="담당 변호사명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="incdntSxvl.tkcgLwyrNm"
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
                            v-model="incdntSxvl.lwyrMbrTelno"
                            ref="lwyrMbrTelnoRef"
                          />
                        </a-form-item>
                      </div>
                    </td>
                    <th scope="row">이메일</th>
                    <td>
                      <div class="form-item__email">
                        <EmailNumInput
                          v-model="incdntSxvl.lwyrEmlAddr"
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
                          v-model="incdntSxvl.lwyrOfcTelno"
                        />
                      </div>
                    </td>
                    <th scope="row">팩스</th>
                    <td>
                      <div class="form-item__number">
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="incdntSxvl.lwyrOfcFxno"
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
              <div class="tit">법률구조대상자[가정폭력피해여성] 증빙서류</div>
              <div class="info-box">
                <div class="info-top">
                  법률구조대상자 입증을 위해 아래와 같은 증빙서류 제출이
                  필요합니다.
                </div>
                <ul class="info-list">
                  <li>
                    <span class="num">1.</span>「국민기초생활 보장법
                    시행규칙」제38조제4항에 따른 차상위계층 확인서
                  </li>
                  <li>
                    <span class="num">2.</span>특정 급여자격 확인서 입증자료
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
                            <a-select class="common-select" placeholder="선택">
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
                            <a-select class="common-select" placeholder="선택">
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
                            <a-select class="common-select" placeholder="선택">
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
                            <a-select class="common-select" placeholder="선택">
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
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-select class="common-select" placeholder="선택">
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
                            <a-select class="common-select" placeholder="선택">
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
                        <button type="button" class="btn is-active">
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

            <div class="receipt-form-info">
              <div class="tit">
                <div>
                  기준중위소득 소득요건 입증자료
                  <span class="sub"
                    >소득제한 125% 또는 150% 대상자의 추가제출 서류</span
                  >
                </div>
              </div>
              <div class="info-box">
                <div class="info-top">
                  기준중위소득 소득요건 입증을 위하여 증빙서류 제출이
                  필요합니다.
                  <br class="pc-only" />
                  건강보험가입자 유형에 따라 제출가능 한 서류를 택1하여
                  등록해주세요.
                </div>
              </div>
            </div>

            <div class="receipt-submit-box">
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험직장가입자]</div>
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
                            <a-select class="common-select" placeholder="선택">
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
                        <button type="button" class="btn is-active">
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
                  <div class="top-txt">[건강보험지역가입자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험피부양자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험미가입자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
            </div>

            <div class="receipt-form-info">
              <div class="tit">
                사건관련 제출[이혼(가정폭력피해여성)] 필요서류
              </div>
              <div class="info-box">
                <div class="info-top">
                  전자접수 신청사건 관련하여 아래와 같은 서류 제출이 필요합니다.
                </div>
                <ul class="info-list">
                  <li><span class="num">1.</span>주민등록등본(필수)</li>
                  <li>
                    <span class="num">2.</span>사업자등록증(상대방이 상인인
                    경우)(선택)
                  </li>
                  <li>
                    <span class="num">3.</span>물품인수증이나 거래장부(선택)
                  </li>
                  <li>
                    <span class="num">4.</span>법인등기사항증명서(상대방이
                    법인인 경우)(선택)
                  </li>
                  <li><span class="num">5.</span>매매계약서(선택)</li>
                  <li><span class="num">6.</span>기타(선택)</li>
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
                            <a-select class="common-select" placeholder="선택">
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
                            <a-select class="common-select" placeholder="선택">
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
              <a-radio-group>
                <a-radio class="radio-bx" value="예">예</a-radio>
                <a-radio class="radio-bx" value="아니요">아니요</a-radio>
              </a-radio-group>
            </div>
          </AccordionItem>
        </Accordion>

        <div class="receipt-agree-box">
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
                    <strong>여성가족부 무료법률구조사업은</strong> 스토킹/데이트
                    폭력 피해자 증가에 따른 피해자 인권보호 및 권익증진에
                    기여하며, 피해자에게 무료 법률상담 및 법률구조 등 법률지원을
                    제공함으로써 성폭력 사건을 예방하고, 피해자가 침해당한
                    권리를 구제하고자 합니다.
                  </li>
                  <li class="!block !text-[15px]">
                    <strong>여성가족부 무료법률구조사업은</strong> 스토킹/데이트
                    폭력 피해자라면 누구나 지원받을 수 있으며, 구조 범위는 폭력
                    피해로 관련 민사·형사·가사사건, 헌법소원 등을 대리합니다.
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
                      name=""
                      label="상담소 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                  </td>
                  <th scope="row">연락처</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="mobile"
                        label="연락처 식별번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select class="common-select" placeholder="선택">
                          <a-select-option value="1">선택 1</a-select-option>
                          <a-select-option value="2">선택 2</a-select-option>
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile2"
                        label="연락처 가운데 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile3"
                        label="연락처 마지막 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">대표자 명</th>
                  <td colspan="3">
                    <a-form-item
                      name=""
                      label="대표자 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
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
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
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
                      name=""
                      label="신청인 명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                  </td>
                  <th scope="row">연락처</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="mobile"
                        label="연락처 식별번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select class="common-select" placeholder="선택">
                          <a-select-option value="1">선택 1</a-select-option>
                          <a-select-option value="2">선택 2</a-select-option>
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile2"
                        label="연락처 가운데 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile3"
                        label="연락처 마지막 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="line-primary" width="lg">
            임시저장
          </CommonButton>
          <CommonButton variants="primary" width="lg">
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
@use '../../../assets/style/pages/elrcpt/sxvl/ElrcptAply.scss';
</style>
