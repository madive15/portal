<!--
 * 화면명 : 면접상담 입력 및 상세 화면
 * 화면ID : LASP_CON_025
 * 파일명 : IntvLhmM
 * 작성자 : 조현주
 * 화면 설명 : 면접상담 신청내용을 입력하거나 상세내용을 조회 및 수정하는 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.07.29  조현주   최초생성
-->

<script setup lang="ts">
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import {
  Accordion,
  AccordionHead,
  AccordionIcon,
  AccordionItem
} from '~/components/ui/accordion';
import { onMounted, reactive, ref, type Ref } from 'vue';

import * as dscsnApis from '~/composables/dscsn';
import type { DscsnRsvtDtInVO } from '~/types/dscsn/rsvt';
import * as valid from '~/utils/validation';
import CommonSelect from '~/pages/components/select/CommonSelect.vue';
import CommonRadioGroup from '~/pages/components/select/CommonRadio.vue';
import NumberInput from '~/components/common/numberInput.vue';
import AddrInput from '~/components/common/AddrInputRules.vue';
import TelNumInput2 from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { useLoginStore } from '~/stores/login';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'pub2nd'
});

const route = useRoute();
const { showAlert } = useCustomAlert();

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

/**
 * name : onBeforeMount
 * desc :
 */
onBeforeMount(() => {
  // 로그인 여부에 따라 분기
  if (authenticated.value) {
    //
  } else {
    showAlert({
      icon: 'info',
      html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then(() => {
        navigateTo({
          path: '/login', //추후 anyid로 변경
          query: { redirect: route.fullPath } // 현재 페이지 전체 경로
        });
      })
      .catch(() => {});
  }
});

/**
 * accordion-item default 1 & 혼인관계,자녀관계 영역 x
 */
const activeKey = ref([1, 2, 3, 6]);
const showAccordionItems = ref(false);

/**
 * ref 선언 : 상담내용(contentRef)
 */
const contentRef = ref();

/**
 * ref 선언 : 전체폼(formRef)
 */
const formRef = ref();

/**
 * ref 선언 : 상담자주소(aplcntAddrRef), 상대방주소(otherAddrRef)
 */
const aplcntAddrRef = ref(null);
const otherAddrRef = ref(null);

/**
 * 상담예약시간조회(selectedInfo) Ref
 */
const selectedInfo: Ref<DscsnRsvtDtInVO> = ref({
  rsvtNo: ''
});

/**
 * 데이터 선언
 */
const form = reactive({
  // param
  status: '',
  dscsnAplyNo: '',
  instNo: '',
  prvcClctUtztnPrpsAgreYn: '',

  // 기본정보
  prSttsCd: '',
  prSttsNm: '',
  mbrNo: '',
  rsvtNo: '',
  dscsnAplcntNm: '',
  dscsnAplcntMblTelno: '',
  smsRcptnAgreYn: '',
  dscsnAplcntEmlAddr: '',
  emlRcptnAgreYn: '',
  dscsnRsvtDt: '',
  dscsnClsfCd: '',

  // 신청자 정보
  aplcntRlprNm: '',
  aplcntRlprTelno: '',
  aplcntGndrCd: '',
  aplcntRlprBrdt: '',
  aplcntRlprZip: '',
  aplcntRlprAddr: '',
  aplcntRlprDaddr: '',
  aplcntNtnltyCd: '',
  aplcntBfrNtnltyCd: '',
  aplcntAcbgCd: '',
  aplcntCrCd: '',
  aplcntRestAstAmt: '',
  aplcntCashAstAmt: '',
  aplcntLmrntAstAmt: '',
  aplcntMpAstAmt: '',
  aplcntMmIncmAmt: '',

  // 상대자 정보
  otherRlprNm: '',
  otherRlprTelno: '',
  otherGndrCd: '',
  otherRlprBrdt: '',
  otherRlprZip: '',
  otherRlprAddr: '',
  otherRlprDaddr: '',
  otherNtnltyCd: '',
  otherBfrNtnltyCd: '',
  otherAcbgCd: '',
  otherCrCd: '',
  otherRestAstAmt: '',
  otherCashAstAmt: '',
  otherLmrntAstAmt: '',
  otherMpAstAmt: '',
  otherMmIncmAmt: '',

  // 혼인관계
  mrgSeCd: '',
  rmrgSeCd: '',
  intlMrgYn: '',
  mrgDclrYr: '',
  mrgElyrs: '',
  mrgMcnt: '',
  sprtnElyrs: '',
  sprtnMcnt: '',

  // 자녀관계
  mlChldCnt: '',
  fmlChldCnt: '',
  ageCnCn: '',
  udAgeYn: '',
  etcMlChldCnt: '',
  etcFmlChldCnt: '',
  etcAgeCnCn: '',
  etcUdAgeYn: '',
  bfrOnslfMrgMlChldCnt: '',
  bfrOnslfMrgFmlChldCnt: '',
  bfrOnslfMrgAgeCnCn: '',
  bfrOnslfMrgUdAgeYn: '',
  bfrTrprMrgMlChldCnt: '',
  bfrTrprMrgFmlChldCnt: '',
  bfrTrprMrgAgeCnCn: '',
  bfrTrprMrgUdAgeYn: '',

  // 상담내용
  dscsnCn: ''
});

/**
 * 화면 로딩 시
 */
onMounted(async () => {
  // 넘겨받는 param에 따라 입력폼/상세폼 구분
  if (!!route.query.dscsnAplyNo) {
    // 임시 주석
    // if ('1' === '1') {
    // 상담신청번호가 들어온 경우 : 상세폼
    form.dscsnAplyNo = 'A250809I0020001'; // 임시 하드코딩
    form.status = 'U'; // 임시 하드코딩
    // form.dscsnAplyNo = route.query.dscsnAplyNo;
    // form.status = route.query.status;
    // selectIntvLhmAplyInfo(); //조회
  } else {
    // 상담신청번호가 없는 경우 : 입력폼
    // TODO 넘겨받은 param 중 저장이 필요한 data set
    form.instNo = 'I002000000'; // 임시 하드코딩
    form.rsvtNo = '250809-112001'; //임시 하드코딩
    selectedInfo.value.rsvtNo = '250809-112001'; //임시 하드코딩
    // form.prvcClctUtztnPrpsAgreYn = route.query.prvcClctUtztnPrpsAgreYn; //개인정보수집이용목적동의여부
  }
  initializedData(); //기초데이터
});

/**
 * name : selectedInfo
 * desc : 상담예약시간 조회
 */
const selectDscsnRsvtDt = async () => {
  const payload = selectedInfo.value;
  const response = await dscsnApis.selectDscsnRsvtDt(payload);
  form.dscsnRsvtDt = response.data.dscsnRsvtDt;
};

/**
 * name : selectLoginInfo
 * desc : 로그인 정보 조회
 */
const selectLoginInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();
  // console.log('response.data: ', response.data);
  form.dscsnAplcntNm = response.data.mbrNm;
  form.mbrNo = response.data.mbrNo;
  form.dscsnAplcntMblTelno = response.data.mbrMblTelno;
  if (response.data.mbrEmlAddr !== '') {
    form.dscsnAplcntEmlAddr =
      response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  }
};

/**
 * name : initializedData
 * desc : 기본정보 set
 */
const initializedData = async () => {
  await selectLoginInfo();
  await selectDscsnRsvtDt();
};

/**
 * name : changeDscsnClsf
 * desc : 상담분류 selectBox 선택 이벤트
 */
const changeDscsnClsf = (event) => {
  if (event === '01') {
    //부부상담일 경우 : 혼인관계, 자녀관계 영역 show & open
    showAccordionItems.value = true;
    activeKey.value = [1, 2, 3, 4, 5, 6];
  } else {
    showAccordionItems.value = false;
    activeKey.value = [1, 2, 3, 6];
  }
};

/**
 * name : changeAplcntRlprBrdt
 * desc : 날짜 변경 핸들러 (신청자 생년월일)
 */
const aplcntBrdt = ref<Date | null>(null);
const onAplcntRlprBrdt = (val: Date | null) => {
  if (val) {
    form.aplcntRlprBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

/**
 * name : changeOtherRlprBrdt
 * desc : 날짜 변경 핸들러 (상대방 생년월일)
 */
const otherBrdt = ref<Date | null>(null);
const onOtherRlprBrdt = (val: Date | null) => {
  if (val) {
    form.otherRlprBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

/**
 * name : changeMrgSeCd
 * desc : 혼인형태 첫번째 selectBox 선택 이벤트
 */
const isRmrgSeCdDisabled = ref(true); //초기에는 비활성화
const changeMrgSeCd = (event) => {
  if (event === '01') {
    isRmrgSeCdDisabled.value = true;
    form.rmrgSeCd = ''; //초기화
  } else {
    isRmrgSeCdDisabled.value = false;
  }
};

/**
 * name :
 * desc : validation 규칙 설정
 */
const formRules = {
  dscsnAplcntNm: [valid.required()],
  dscsnAplcntMblTelno: [valid.required(), valid.mobile()],
  dscsnAplcntEmlAddr: [valid.email()],
  dscsnClsfCd: [valid.required()],
  aplcntRlprNm: [valid.required()],
  aplcntRlprTelno: [valid.required(), valid.telNum()],
  aplcntGndrCd: [valid.required()],
  aplcntRlprBrdt: [valid.required()],
  aplcntNtnltyCd: [valid.required()],
  aplcntAcbgCd: [valid.required()],
  aplcntCrCd: [valid.required()],
  otherRlprNm: [valid.required()],
  otherRlprTelno: [valid.required(), valid.telNum()],
  otherGndrCd: [valid.required()],
  otherRlprBrdt: [valid.required()],
  otherNtnltyCd: [valid.required()],
  otherAcbgCd: [valid.required()],
  otherCrCd: [valid.required()],
  dscsnCn: [valid.required()]
};

/**
 * name :insertIntvLhmAply
 * desc : 신청하기 btn click 이벤트 (입력폼)
 */
//TODO 연계필요 LHM-005
const insertIntvLhmAply = async () => {
  form.dscsnCn = ''; //초기화
  if (contentRef.value != undefined) {
    //에디터에 입력한 값 form.dscsnCn set
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  try {
    const [formValid, aplcntAddrValid, otherAddrValid] = await Promise.all([
      formRef.value?.validate() ?? false,
      aplcntAddrRef.value?.validate() ?? false,
      otherAddrRef.value?.validate() ?? false
    ]);

    if (!formValid || !aplcntAddrValid || !otherAddrValid) {
      return;
    }

    const confirm = await showAlert({
      icon: 'question',
      html: `작성하신 내용으로 상담예약을 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });
    if (confirm.isConfirmed) {
      //폼 데이터
      const formData = new FormData();

      //선언된 값을 append로 넣어준다.
      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });

      try {
        const res = await axios
          .post('/api/dscsn/insertIntvLhmAply', formData)
          .then(() => {
            navigateTo('/dscsn/intv/IntvRsvtCmptnInfo?rsvtNo=' + form.rsvtNo);
          });
      } catch (err) {
        console.log('axios failed', err);
      }
    }
  } catch (err) {
    console.log('상담 입력폼 제출', err);
  }
};

/**
 * name :deleteIntvLhmRsvt
 * desc : 취소하기 btn click 이벤트 (입력폼)
 */
//TODO 연계필요 LHM-004
const deleteIntvLhmRsvt = async () => {
  const confirm = await showAlert({
    icon: 'question',
    html: `예약을 취소 하시겠습니까? 취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야 합니다.`,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });
  if (confirm.isConfirmed) {
    //폼 데이터
    const formData = new FormData();

    //선언된 값을 append로 넣어준다.
    Object.keys(form).forEach(function (i) {
      formData.append(i, form[i]);
    });
    try {
      const res = await axios
        .post('/api/dscsn/deleteIntvLhmRsvt', formData)
        .then(() => {
          navigateTo('/');
        });
    } catch (err) {
      console.log('axios failed', err);
    }
  }
};

/**
 * name : selectIntvLhmAplyInfo
 * desc : 면접상담신청정보 조회 (수정폼)
 */
const selectIntvLhmAplyInfo = async () => {
  const response = await axios.get('/api/dscsn/selectIntvLhmAplyInfo', {
    params: {
      dscsnAplyNo: form.dscsnAplyNo
    }
  });

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });
};

/**
 * name :deleteIntvLhmAply
 * desc : 예약취소 btn click 이벤트 (수정폼)
 */
//TODO 연계필요 LHM-008
const deleteIntvLhmAply = async () => {
  const confirm = await showAlert({
    icon: 'question',
    html: `예약을 취소 하시겠습니까? 취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야 합니다.`,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });
  if (confirm.isConfirmed) {
    navigateTo('/');
  }
};

/**
 * name :updateIntvLhmAply
 * desc : 수정하기 btn click 이벤트 (수정폼)
 */
//TODO 연계필요 LHM-005
const updateIntvLhmAply = async () => {
  form.dscsnCn = ''; //초기화
  if (contentRef.value != undefined) {
    //에디터에 입력한 값 form.dscsnCn set
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  const formValid = await formRef.value?.validate();

  if (!formValid) {
    console.log('유효성 검사 실패!');
  } else {
    console.log('유효성 검사 성공');
    const confirm = await showAlert({
      icon: 'question',
      html: `입력한 정보로 예약 정보를 수정하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });
    if (confirm.isConfirmed) {
      // navigateTo('/my/dscsn/rsvt/list');
    }
  }
};

/**
 * name : myPageMove
 * desc : 마이페이지 상담예약내역으로 이동
 */
const myPageMove = async () => {
  const confirm = await showAlert({
    icon: 'question',
    html: '상담예약내역으로 이동하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });
  if (confirm.isConfirmed) {
    navigateTo('/my/dscsn/rsvt/list');
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- <Breadcrumb :showPrintButton="true" /> -->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>면접상담</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button">
                  <span class="text-span"> 뒤로가기 </span></button
                ><button class="btn print-button">
                  <span class="text-span"> 인쇄하기 </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          한국가정법률상담소 면접상담 상세정보
        </CommonTitle>
        <a-form
          :model="form"
          :rules="formRules"
          ref="formRef"
          :validate-on-rule-change="ture"
        >
          <Accordion v-model:activeKey="activeKey" variant="gray">
            <template #expandIcon="{ isActive }">
              <AccordionIcon :isActive="isActive" />
            </template>
            <AccordionItem key="1">
              <template #header>
                <AccordionHead title="기본정보">
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
                  <i class="red-span">*</i
                  ><span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    면접상담 기본정보의 성명, 휴대전화번호, 이메일,
                    상담예약시간, 상담분류 입력에관한 표
                  </caption>
                  <tbody>
                    <tr v-if="route.query.dscsnAplyNo">
                      <th scope="row">
                        상태
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <span class="is-emphasis">
                          {{ form.prSttsNm }}
                        </span>
                      </td>
                      <th scope="row">예약번호</th>
                      <td>
                        <span class="is-emphasis">
                          {{ form.rsvtNo }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        성명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <a-form-item
                          name="dscsnAplcntNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnAplcntNm"
                            :maxlength="30"
                            disabled
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        휴대전화번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-group-box">
                          <div class="form-item__number">
                            <a-form-item
                              name="dscsnAplcntMblTelno"
                              label="휴대전화번호"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <TelNumInput2
                                cd-group-id="CO0017"
                                v-model="form.dscsnAplcntMblTelno"
                                readonly="Y"
                              />
                            </a-form-item>
                          </div>
                          <a-checkbox
                            class="check-bx"
                            name="type"
                            v-model:value="form.smsRcptnAgreYn"
                            @change="
                              (e) =>
                                (form.smsRcptnAgreYn = e.target.checked
                                  ? 'Y'
                                  : 'N')
                            "
                            >SMS 수신동의 (예약번호 수신 시
                            필요합니다.)</a-checkbox
                          >
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-group-box">
                          <a-form-item
                            name="dscsnAplcntEmlAddr"
                            label="이메일"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <EmailInput v-model="form.dscsnAplcntEmlAddr" />
                          </a-form-item>
                          <a-checkbox
                            class="check-bx"
                            name="type"
                            v-model:value="form.emlRcptnAgreYn"
                            @change="
                              (e) =>
                                (form.emlRcptnAgreYn = e.target.checked
                                  ? 'Y'
                                  : 'N')
                            "
                            >이메일 수신동의</a-checkbox
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상담예약시간</th>
                      <td>
                        <div class="item-column">
                          <span
                            class="is-emphasis"
                            style="display: inline-flex; align-items: center"
                          >
                            {{ form.dscsnRsvtDt }}
                          </span>
                          <CommonButton height="sm" v-if="form.status === 'U'"
                            >변경</CommonButton
                          >
                        </div>
                      </td>
                      <th scope="row">
                        상담분류
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="dscsnClsfCd"
                          label="상담분류"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="dscsnClsf"
                            v-model:value="form.dscsnClsfCd"
                            codeGroupId="CO0045"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                            @change="changeDscsnClsf($event)"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="상담자 정보">
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
                  <i class="red-span">*</i
                  ><span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    면접상담 내담자 정보의 성명, 전화, 성별, 연령, 주소, 국적,
                    이전 국적, 학력, 직업, 추가정보 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntRlprNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntRlprNm"
                            :maxlength="30"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        전화
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntRlprTelno"
                            label="전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput2
                              cd-group-id="CO0018"
                              v-model="form.aplcntRlprTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        성별
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntGndrCd"
                          label="성별"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonRadioGroup
                            code-group-id="CO0014"
                            v-model:value="form.aplcntGndrCd"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        생년월일
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="aplcntRlprBrdt"
                              label="생년월일"
                              :labelCol="{ class: 'sr-only' }"
                              style="width: 200px"
                            >
                              <div class="date-picker__group">
                                <VueDatePicker
                                  name="aplcntRlprBrdt"
                                  id="write-period-aplcntRlprBrdt"
                                  :year-range="[
                                    new Date().getFullYear() - 100,
                                    new Date().getFullYear() + 5
                                  ]"
                                  v-model="aplcntBrdt"
                                  locale="ko"
                                  :enable-time-picker="false"
                                  :format="'yyyy-MM-dd'"
                                  :auto-apply="true"
                                  :clearable="false"
                                  :transitions="false"
                                  :highlight-week-days="[0]"
                                  :week-start="0"
                                  placeholder="생년월일 선택"
                                  hide-input-icon
                                  @update:model-value="onAplcntRlprBrdt"
                                />
                              </div>
                            </a-form-item>
                          </div>
                        </div>
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
                          v-model:zip="form.aplcntRlprZip"
                          v-model:addr="form.aplcntRlprAddr"
                          v-model:dAddr="form.aplcntRlprDaddr"
                          esntlYn="Y"
                          ref="aplcntAddrRef"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        국적
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntNtnltyCd"
                          label="국적"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="aplcntNtnltyCd"
                            v-model:value="form.aplcntNtnltyCd"
                            codeGroupId="CO0092"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">이전 국적</th>
                      <td>
                        <a-form-item
                          name="aplcntBfrNtnltyCd"
                          label="이전 국적"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="aplcntBfrNtnltyCd"
                            v-model:value="form.aplcntBfrNtnltyCd"
                            codeGroupId="CO0092"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        학력
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntAcbgCd"
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="aplcntAcbgCd"
                            v-model:value="form.aplcntAcbgCd"
                            codeGroupId="CO0047"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        직업
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntCrCd"
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="aplcntCrCd"
                            v-model:value="form.aplcntCrCd"
                            codeGroupId="CO0048"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">추가정보</th>
                      <td colspan="3">
                        <div class="txt-form-box lines">
                          <div class="txt-form">
                            <span class="pre-txt">부동산</span>
                            <a-form-item
                              name="aplcntRestAstAmt"
                              label="부동산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.aplcntRestAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">현금</span>
                            <a-form-item
                              name="aplcntCashAstAmt"
                              label="현금"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.aplcntCashAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">전월세</span>
                            <a-form-item
                              name="aplcntLmrntAstAmt"
                              label="전월세"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.aplcntLmrntAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">동산</span>
                            <a-form-item
                              name="aplcntMpAstAmt"
                              label="동산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.aplcntMpAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">월수입</span>
                            <a-form-item
                              name="aplcntMmIncmAmt"
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.aplcntMmIncmAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="3">
              <template #header>
                <AccordionHead title="상대자 정보">
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
                  <i class="red-span">*</i
                  ><span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    면접상담 상대자 정보의 성명, 전화, 성별, 연령, 주소, 국적,
                    이전 국적, 학력, 직업, 추가정보 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="otherRlprNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherRlprNm"
                            :maxlength="30"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        전화
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="otherRlprTelno"
                            label="전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput2
                              cd-group-id="CO0018"
                              v-model="form.otherRlprTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        성별
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="otherGndrCd"
                          label="성별"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonRadioGroup
                            code-group-id="CO0014"
                            v-model:value="form.otherGndrCd"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        생년월일
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="otherRlprBrdt"
                              label="생년월일"
                              :labelCol="{ class: 'sr-only' }"
                              style="width: 200px"
                            >
                              <div class="date-picker__group">
                                <VueDatePicker
                                  name="otherRlprBrdt"
                                  id="otherRlprBrdt"
                                  :year-range="[
                                    new Date().getFullYear() - 100,
                                    new Date().getFullYear() + 5
                                  ]"
                                  v-model="otherBrdt"
                                  locale="ko"
                                  :enable-time-picker="false"
                                  :format="'yyyy-MM-dd'"
                                  :auto-apply="true"
                                  :clearable="false"
                                  :transitions="false"
                                  :highlight-week-days="[0]"
                                  :week-start="0"
                                  placeholder="생년월일 선택"
                                  hide-input-icon
                                  @update:model-value="onOtherRlprBrdt"
                                />
                              </div>
                            </a-form-item>
                          </div>
                        </div>
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
                        <!-- TODO rules 적용 여부 값 추가하기 -->
                        <AddrInput
                          v-model:zip="form.otherRlprZip"
                          v-model:addr="form.otherRlprAddr"
                          v-model:dAddr="form.otherRlprDaddr"
                          esntlYn="Y"
                          ref="otherAddrRef"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        국적
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="otherNtnltyCd"
                          label="국적"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="otherNtnltyCd"
                            v-model:value="form.otherNtnltyCd"
                            codeGroupId="CO0092"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">이전 국적</th>
                      <td>
                        <a-form-item
                          name="otherBfrNtnltyCd"
                          label="이전 국적"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="otherBfrNtnltyCd"
                            v-model:value="form.otherBfrNtnltyCd"
                            codeGroupId="CO0092"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        학력
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="otherAcbgCd"
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="otherAcbgCd"
                            v-model:value="form.otherAcbgCd"
                            codeGroupId="CO0047"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        직업
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="otherCrCd"
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <CommonSelect
                            id="otherCrCd"
                            v-model:value="form.otherCrCd"
                            codeGroupId="CO0048"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">추가정보</th>
                      <td colspan="3">
                        <div class="txt-form-box lines">
                          <div class="txt-form">
                            <span class="pre-txt">부동산</span>
                            <a-form-item
                              name="otherRestAstAmt"
                              label="부동산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.otherRestAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">현금</span>
                            <a-form-item
                              name="otherCashAstAmt"
                              label="현금"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.otherCashAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">전월세</span>
                            <a-form-item
                              name="otherLmrntAstAmt"
                              label="전월세"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.otherLmrntAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">동산</span>
                            <a-form-item
                              name="otherMpAstAmt"
                              label="동산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.otherMpAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">월수입</span>
                            <a-form-item
                              name="otherMmIncmAmt"
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="8"
                                v-model="form.otherMmIncmAmt"
                              />
                            </a-form-item>
                            <span class="txt">만원</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="4" v-if="showAccordionItems">
              <template #header>
                <AccordionHead title="혼인관계" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    면접상담 혼인관계의 혼인형태, 혼인신고, 혼인기간, 별거기간
                    입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">혼인형태</th>
                      <td>
                        <div class="selct-form-box">
                          <CommonSelect
                            id="mrgSeCd"
                            v-model:value="form.mrgSeCd"
                            codeGroupId="CO0071"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                            @change="changeMrgSeCd($event)"
                          />
                          <CommonSelect
                            id="rmrgSeCd"
                            v-model:value="form.rmrgSeCd"
                            codeGroupId="CO0093"
                            pType="S"
                            placeholder="선택"
                            css="common-select"
                            :disabled="isRmrgSeCdDisabled"
                          />
                          <a-checkbox
                            class="check-bx"
                            name="type"
                            v-model:value="form.intlMrgYn"
                            @change="
                              (e) =>
                                (form.intlMrgYn = e.target.checked ? 'Y' : 'N')
                            "
                            >국제결혼
                          </a-checkbox>
                        </div>
                      </td>
                      <th scope="row">혼인신고</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="mrgDclrYr"
                              label="혼인신고-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="4"
                                v-model="form.mrgDclrYr"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">혼인기간</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="mrgElyrs"
                              label="혼인기간-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="4"
                                v-model="form.mrgElyrs"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="mrgMcnt"
                              label="혼인기간-개월"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="2"
                                v-model="form.mrgMcnt"
                              />
                            </a-form-item>
                            <span class="txt">개월</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">별거기간</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="sprtnElyrs"
                              label="별거기간-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="4"
                                v-model="form.sprtnElyrs"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="sprtnMcnt"
                              label="별거기간-개월"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="2"
                                v-model="form.sprtnMcnt"
                              />
                            </a-form-item>
                            <span class="txt">개월</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="5" v-if="showAccordionItems">
              <template #header>
                <AccordionHead title="자녀관계" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    면접상담 자녀관계의 친자, 혼인외자, 전처소생, 전부소생
                    입력에관한 표
                  </caption>
                  <tbody>
                    <!-- TODO 화면설계 확인 필요 -->
                    <tr>
                      <th scope="row">친자</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="mlChldCnt"
                              label="친자-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.mlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="fmlChldCnt"
                              label="친자-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.fmlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                          <div class="txt-form">
                            <span
                              class="pc-only"
                              style="width: 30px; height: 1px"
                              aria-hidden="true"
                            ></span>
                            <span class="pre-txt">연령</span>
                            <a-form-item
                              name="ageCnCn"
                              label="친자-연령"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.ageCnCn"
                                :maxlength="60"
                              />
                            </a-form-item>
                            <a-checkbox
                              class="check-bx"
                              name="type"
                              v-model:value="form.udAgeYn"
                              @change="
                                (e) =>
                                  (form.udAgeYn = e.target.checked ? 'Y' : 'N')
                              "
                              >미성년
                            </a-checkbox>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">혼인외자</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="etcMlChldCnt"
                              label="혼인외자-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.etcMlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="etcFmlChldCnt"
                              label="혼인외자-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.etcFmlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                          <div class="txt-form">
                            <span
                              class="pc-only"
                              style="width: 30px; height: 1px"
                              aria-hidden="true"
                            ></span>
                            <span class="pre-txt">연령</span>
                            <a-form-item
                              name="etcAgeCnCn"
                              label="혼인외자-연령"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.etcAgeCnCn"
                                :maxlength="60"
                              />
                            </a-form-item>
                            <a-checkbox
                              class="check-bx"
                              name="type"
                              v-model:value="form.etcUdAgeYn"
                              @change="
                                (e) =>
                                  (form.etcUdAgeYn = e.target.checked
                                    ? 'Y'
                                    : 'N')
                              "
                              >미성년
                            </a-checkbox>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">전처소생</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="bfrOnslfMrgMlChldCnt"
                              label="전처소생-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.bfrOnslfMrgMlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="bfrOnslfMrgFmlChldCnt"
                              label="전처소생-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.bfrOnslfMrgFmlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                          <div class="txt-form">
                            <span
                              class="pc-only"
                              style="width: 30px; height: 1px"
                              aria-hidden="true"
                            ></span>
                            <span class="pre-txt">연령</span>
                            <a-form-item
                              name="bfrOnslfMrgAgeCnCn"
                              label="전처소생-연령"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.bfrOnslfMrgAgeCnCn"
                                :maxlength="60"
                              />
                            </a-form-item>
                            <a-checkbox
                              class="check-bx"
                              name="type"
                              v-model:value="form.bfrOnslfMrgUdAgeYn"
                              @change="
                                (e) =>
                                  (form.bfrOnslfMrgUdAgeYn = e.target.checked
                                    ? 'Y'
                                    : 'N')
                              "
                              >미성년
                            </a-checkbox>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">전부소생</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="bfrTrprMrgMlChldCnt"
                              label="전부소생-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.bfrTrprMrgMlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="bfrTrprMrgFmlChldCnt"
                              label="전부소생-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <NumberInput
                                :maxlength="3"
                                v-model="form.bfrTrprMrgFmlChldCnt"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                          <div class="txt-form">
                            <span
                              class="pc-only"
                              style="width: 30px; height: 1px"
                              aria-hidden="true"
                            ></span>
                            <span class="pre-txt">연령</span>
                            <a-form-item
                              name="bfrTrprMrgAgeCnCn"
                              label="전부소생-연령"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.bfrTrprMrgAgeCnCn"
                                :maxlength="60"
                              />
                            </a-form-item>
                            <a-checkbox
                              class="check-bx"
                              name="type"
                              v-model:value="form.bfrTrprMrgUdAgeYn"
                              @change="
                                (e) =>
                                  (form.bfrTrprMrgUdAgeYn = e.target.checked
                                    ? 'Y'
                                    : 'N')
                              "
                              >미성년
                            </a-checkbox>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="6">
              <template #header>
                <AccordionHead title="상담내용" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    상담내용 입력 폼
                  </caption>
                  <tbody>
                    <a-form-item
                      name="dscsnCn"
                      label="상담내용"
                      :label-col="{ style: { display: 'none' } }"
                    >
                      <lazy-data-editor
                        ref="contentRef"
                        :initial-value="form.dscsnCn"
                      />
                    </a-form-item>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>

          <div class="form-bottom-box">
            <BullList type="refMark">
              <li class="blue">본인 예약이 원칙입니다.</li>
              <li class="blue">
                휴대전화번호가 변경된 경우에는 상담원 대표전화 (1644-7077) 로
                문의하여 변경하여 주시기 바랍니다.
              </li>
            </BullList>
          </div>

          <ButtonGroup align="center" class="!mt-50px" v-if="form.status">
            <CommonButton
              variants="line-black"
              width="sm-1"
              @click="deleteIntvLhmAply"
              v-if="form.status === 'U'"
              >예약취소</CommonButton
            >
            <CommonButton
              variants="primary"
              width="sm-1"
              @click="updateIntvLhmAply"
              v-if="form.status === 'U'"
              >수정하기</CommonButton
            >
            <CommonButton
              to="#"
              variants="line-primary"
              width="sm-1"
              @click="myPageMove"
              v-if="form.status === 'U' || form.status === 'R'"
              >목록</CommonButton
            >
            <button @click="selectIntvLhmAplyInfo" type="button">test</button>
          </ButtonGroup>
          <ButtonGroup align="center" class="!mt-50px" v-else>
            <CommonButton
              variants="primary"
              width="xs"
              @click="insertIntvLhmAply"
              >신청하기</CommonButton
            >
            <CommonButton
              variants="line-primary"
              width="xs"
              @click="deleteIntvLhmRsvt"
            >
              취소하기
            </CommonButton>
          </ButtonGroup>
        </a-form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/intv/IntvLhmM';
</style>
