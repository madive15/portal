<!--
* 화면명 : 대한가정법률복지상담원 면접상담 입력 폼
* 화면ID : LASP_CON_027
* 파일명 : IntvLqaM
* 작성자 : 김정남
* 화면설명 : 대한가정법률복지상담원 면접상담 입력 폼 페이지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
변경일       변경자       변경내역
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
2025.07.14  김정남       최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumbNew.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useLoginStore } from '~/stores/login';
import { useInqStore } from '~/stores/inq';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import AddrInput from '~/components/common/AddrInputRules.vue';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';

// pub27

definePageMeta({
  layout: 'pub2nd'
});

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();

const activeKey = ref([1, 2, 3, 4, 5, 6, 7]);

const { showAlert } = useCustomAlert();

const commonCodeStore = useCommonCodeStore();

const cd = 'CO0052';
const { data: codeList1 } = useQuery({
  queryKey: ['code', cd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const cd2 = 'CO0053';
const { data: codeList2 } = useQuery({
  queryKey: ['code', cd2],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const rlgnCd = 'CO0095';
const { data: codeList3 } = useQuery({
  queryKey: ['code', rlgnCd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

// 학력
const acbgCd = 'CO0047';
const { data: acbgList } = useQuery({
  queryKey: ['code', acbgCd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

// 직업
const crCd = 'CO0048';
const { data: crList } = useQuery({
  queryKey: ['code', crCd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const formRef = ref();

const nameInputRef = ref();
const phoneInputRef = ref();
const genderRef = ref();
const ageInputRef = ref();

const clientNameRef = ref();
const clientGenderRef = ref();
const clientAddrRef = ref();
const clientAgeRef = ref();
const clientEducationRef = ref();
const clientJobRef = ref();

const spouseNameRef = ref();
const spouseGenderRef = ref();
const spouseAddrRef = ref();
const spouseAgeRef = ref();
const spouseEducationRef = ref();
const spouseJobRef = ref();

const titleRef = ref();
const contentRef = ref();

const refMap: Record<string, Ref<any>> = {
  dscsnAplcntNm: nameInputRef,
  dscsnAplcntMblTelno: phoneInputRef,
  defaultGender: genderRef,
  age: ageInputRef,
  aplcntNm: clientNameRef,
  aplcntGndrCd: clientGenderRef,
  aplcntZip: clientAddrRef,
  aplcntAddr: clientAddrRef,
  aplcntDaddr: clientAddrRef,
  aplcntBrdt: clientAgeRef,
  aplcntAcgbCd: clientEducationRef,
  aplcntCrCd: clientJobRef,
  otherNm: spouseNameRef,
  otherGndrCd: spouseGenderRef,
  otherZip: spouseAddrRef,
  otherAddr: spouseAddrRef,
  otherDaddr: spouseAddrRef,
  otherBrdt: spouseAgeRef,
  otherAcgbCd: spouseEducationRef,
  otherCrCd: spouseJobRef,
  dscsnTtl: titleRef,
  dscsnCn: contentRef
};

const form = reactive({
  // 기본정보
  instNo: '',
  dscsnSeCd: '',
  prSttsCd: '',
  dscsnAplcntNm: '',
  dscsnAplcntMblTelno: '',
  smsCert: false,
  dscsnAplcntEmlAddr: '@',
  emailCert: false,
  defaultGender: '',
  age: '',
  inst: '',
  date: '',
  time: '',
  rcgPathCd: '',
  rlprRelNm: '',
  rcgPathCdNm: '',
  mccPtcpCd: '',
  mccPtcpPrdCd: '',

  // 내담자정보
  aplcntRlprSeCd: '01',
  aplcntRlprSeq: '1',
  aplcntNm: '',
  aplcntGndrCd: '',
  aplcntZip: '',
  aplcntAddr: '',
  aplcntDaddr: '',
  aplcntRlrsdZip: '',
  aplcntRlrsdAddr: '',
  aplcntRlrsdDaddr: '',
  aplcntBrdt: '',
  aplcntRlgnCd: '',
  aplcntAcgbCd: '',
  aplcntCrCd: '',
  aplcntCrrCd: '',
  aplcntCashAstAnt: '',
  aplcntLivMthd: '',
  aplcntMmIncmAnt: '',
  // 상대자정보
  otherRlprSeCd: '01',
  otherRlprSeq: '2',
  otherNm: '',
  otherGndrCd: '',
  otherZip: '',
  otherAddr: '',
  otherDaddr: '',
  otherRlrsdZip: '',
  otherRlrsdAddr: '',
  otherRlrsdDaddr: '',
  otherBrdt: '',
  otherRlgnCd: '',
  otherAcgbCd: '',
  otherCrCd: '',
  otherCrrCd: '',
  otherCashAstAnt: '',
  otherLivMthd: '',
  otherMmIncmAnt: '',

  // 혼인관계
  mrgHow: '',
  mrgMAge: '',
  mrgFAge: '',
  mrgYear: '',
  mrgMonthly: '',
  mrgDay: '',
  mrgSeparationYear: '',
  mrgSeparationMonthly: '',
  mrgSeparationDay: '',
  mrgState: '',
  mrgType: '',
  // 자녀관계
  childMCnt: '',
  childMAge: '',
  childFCnt: '',
  childFAge: '',
  childOtherMCnt: '',
  childOtherFCnt: '',
  clientChildPrevMarriageM: '',
  clientChildPrevMarriageF: '',
  spouseChildPrevMarriageM: '',
  spouseChildPrevMarriageF: '',

  // 가족관계
  clientRelationM: '',
  clientRelationF: '',
  clientRelationOrder: '',
  spouseRelationM: '',
  spouseRelationF: '',
  spouseRelationOrder: '',
  clientParentM: '',
  clientParentF: '',
  clientParentMSeparation: '',
  clientParentFSeparation: '',
  clientParentMDying: '',
  clientParentFDying: '',
  spouseParentM: '',
  spouseParentF: '',
  spouseParentMSeparation: '',
  spouseParentFSeparation: '',
  spouseParentMDying: '',
  spouseParentFDying: '',
  otherHousemate: '',
  otherHousemateYear: '',
  otherHousemateMonthly: '',

  // 상담내용
  dscsnTtl: '',
  dscsnCn: '',

  smsRcptnAgreYn: '',
  emlRcptnAgreYn: ''
});

/**
 * name : changeLoginUserRlprBrdt
 * desc : 날짜 변경 핸들러 (신청자 생년월일)
 */
const age = ref<Date | null>(null);
const onLoginUserRlprBrdt = (val: Date | null) => {
  if (val) {
    form.age = dayjs(val).format('YYYY-MM-DD');
  }
};

/**
 * name : changeAplcntRlprBrdt
 * desc : 날짜 변경 핸들러 (신청자 생년월일)
 */
const aplcntBrdt = ref<Date | null>(null);
const onAplcntRlprBrdt = (val: Date | null) => {
  if (val) {
    form.aplcntBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

/**
 * name : changeOtherRlprBrdt
 * desc : 날짜 변경 핸들러 (상대방 생년월일)
 */
const otherBrdt = ref<Date | null>(null);
const onOtherRlprBrdt = (val: Date | null) => {
  if (val) {
    form.otherBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();

  form.dscsnAplcntNm = response.data.mbrNm;
  form.dscsnAplcntMblTelno = response.data.mbrMblTelno;
  form.dscsnAplcntEmlAddr =
    response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  form.defaultGender = response.data.mbrGndrCd;
};

onBeforeMount(() => {
  if (authenticated.value) {
    selectUserInfo();
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.',
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

const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntNm: [valid.required()],
  dscsnAplcntMblTelno: [valid.required(), valid.mobile()],
  defaultGender: [valid.required()],
  age: [valid.required()],
  aplcntNm: [valid.required()],
  aplcntGndrCd: [valid.required()],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntBrdt: [valid.required()],
  aplcntAcgbCd: [valid.required()],
  aplcntCrCd: [valid.required()],
  otherNm: [valid.required()],
  otherGndrCd: [valid.required()],
  otherAddressGroup: [valid.addressGroup(form, 'otherZip', 'otherAddr')],
  otherBrdt: [valid.required()],
  otherAcgbCd: [valid.required()],
  otherCrCd: [valid.required()],
  dscsnTtl: [valid.required()],
  dscsnCn: [valid.required(), { max: 200, message: '200자 이내로 입력하세요.' }]
};

/**
 * name : submitIntvLawqaForm
 * desc : 대한변협법률구조재단 사이버상담 신청 데이터 저장
 */
const submitIntvLawqaForm = async () => {
  if (contentRef.value != undefined) {
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  try {
    await formRef.value.validate();

    const submit = await showAlert({
      icon: 'question',
      html: '작성하신 내용으로 상담예약 하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });

    if (submit.isConfirmed) {
      const formData = new FormData();
      form.instNo = 'I003000000';
      form.dscsnSeCd = '1';
      form.prSttsCd = 'D01';
      form.rcgPathCd = 'Z';

      let smsRcptnAgreYn = 'N';
      let emlRcptnAgreYn = 'N';
      if (form.smsCert) smsRcptnAgreYn = 'Y';
      if (form.emailCert) emlRcptnAgreYn = 'Y';
      form.smsRcptnAgreYn = smsRcptnAgreYn;
      form.emlRcptnAgreYn = emlRcptnAgreYn;

      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });

      const response = await axios.post(
        '/api/dscsn/insertIntvLqaAply',
        formData
      );

      if (response.status == 200) {
        const result = await showAlert({
          icon: 'info',
          html: '상담신청이 완료되었습니다.'
        });

        if (result.isConfirmed) {
          navigateTo('/dscsn/intv/IntvRsvtCmptnInfo?rsvtNo=' + response.data);
        }
      }
    }
  } catch (err) {
    const errField = err.errorFields?.[0]?.name?.[0];
    if (errField && refMap[errField]?.value) {
      if (typeof refMap[errField].value.focus === 'function') {
        if (errField === 'dscsnAplcntMblTelno') {
          const ref = refMap[errField].value;
          if (!ref.first) {
            ref.firstFocus?.();
          } else {
            ref.focus?.();
          }
        } else {
          refMap[errField].value.focus();
        }
      }
    }
  }
};

const cancel = () => {
  showAlert({
    icon: 'question',
    html: `예약을 취소하시겠습니까?<br/>취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야합니다.`,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      navigateTo('/');
    }
  });
};

// 메뉴 넣으면 지워야함
const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
// 메뉴 넣으면 지워야함
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
                <button class="btn prev-button" @click="handleGoBack">
                  <span class="text-span"> 뒤로가기 </span>
                </button>
                <button class="btn print-button" @click="handlePrint">
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
          대한가정법률복지상담원 면접상담 상세정보
        </CommonTitle>
        <a-form :model="form" :rules="formRules" ref="formRef">
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
                    상담예약 기본정보의 성명, 휴대전화번호, 이메일, 성별,
                    생년월일, 상담예약시간, 내담자와 상대자와의 관계, 상담원
                    알게 된 경로, 부부캠프 참가 의향, 참가시기 입력에관한 표
                  </caption>
                  <tbody>
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
                            ref="nameInputRef"
                            :maxlength="100"
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
                              label="연락처"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <TelNumInput
                                cd-group-id="CO0017"
                                v-model="form.dscsnAplcntMblTelno"
                                ref="phoneInputRef"
                              />
                            </a-form-item>
                          </div>
                          <a-checkbox
                            class="check-bx"
                            value=""
                            name="type"
                            v-model:checked="form.smsCert"
                            >SMS 수신동의 (예약번호 수신 시
                            필요합니다.)</a-checkbox
                          >
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-group-box">
                          <div class="form-item__email">
                            <EmailInput
                              v-model="form.dscsnAplcntEmlAddr"
                              ref="mailInputRef"
                            />
                          </div>
                          <a-checkbox
                            class="check-bx"
                            value=""
                            name="type"
                            v-model:checked="form.emailCert"
                            >이메일 수신동의</a-checkbox
                          >
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
                          name="defaultGender"
                          label="성별"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-radio-group
                            v-model:value="form.defaultGender"
                            ref="genderRef"
                          >
                            <a-radio class="radio-bx" value="01">남성</a-radio>
                            <a-radio class="radio-bx" value="02">여성</a-radio>
                          </a-radio-group>
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
                              name="age"
                              label="생년월일"
                              :labelCol="{ class: 'sr-only' }"
                              style="width: 200px"
                            >
                              <div class="date-picker__group">
                                <VueDatePicker
                                  name="age"
                                  id="write-period-age"
                                  :year-range="[
                                    new Date().getFullYear() - 100,
                                    new Date().getFullYear() + 5
                                  ]"
                                  v-model="age"
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
                                  @update:model-value="onLoginUserRlprBrdt"
                                />
                              </div>
                            </a-form-item>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상담예약시간</th>
                      <td colspan="3">
                        <span class="is-emphasis">
                          [대한법률구조공단] 인천지부 2025.04.10 11:00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">내담자와 상대자와의 관계</th>
                      <td>
                        <a-form-item
                          name="rlprRelNm"
                          label="내담자와 상대자와의 관계"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.rlprRelNm"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">상담원 알게 된 경로</th>
                      <td>
                        <a-form-item
                          name="rcgPathCdNm"
                          label="상담원 알게 된 경로"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.rcgPathCdNm"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">부부캠프 참가 의향</th>
                      <td>
                        <a-radio-group v-model:value="form.mccPtcpCd">
                          <a-radio
                            class="radio-bx"
                            v-for="list in codeList1"
                            :value="list.value"
                            >{{ list.text }}</a-radio
                          >
                        </a-radio-group>
                      </td>
                      <th scope="row">참가시기</th>
                      <td>
                        <a-radio-group v-model:value="form.mccPtcpPrdCd">
                          <a-radio
                            class="radio-bx"
                            v-for="list in codeList2"
                            :value="list.value"
                            >{{ list.text }}</a-radio
                          >
                        </a-radio-group>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="내담자 정보">
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
                    면접상담 내담자 정보의 성명, 성별, 주소, 실거주지, 생년월일,
                    종교, 학력, 직업, 추가정보 입력에관한 표
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
                          name="aplcntNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntNm"
                            ref="clientNameRef"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
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
                          <a-radio-group
                            v-model:value="form.aplcntGndrCd"
                            ref="clientGenderRef"
                          >
                            <a-radio class="radio-bx" value="01">남성</a-radio>
                            <a-radio class="radio-bx" value="02">여성</a-radio>
                          </a-radio-group>
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
                        <a-form-item
                          name="aplcntAddressGroup"
                          label="주소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <AddrInput
                            v-model:zip="form.aplcntZip"
                            v-model:addr="form.aplcntAddr"
                            v-model:dAddr="form.aplcntDaddr"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">실거주지</th>
                      <td colspan="3">
                        <AddrInput
                          v-model:zip="form.aplcntRlrsdZip"
                          v-model:addr="form.aplcntRlrsdAddr"
                          v-model:dAddr="form.aplcntRlrsdDaddr"
                        />
                      </td>
                    </tr>
                    <tr>
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
                              name="aplcntBrdt"
                              label="생년월일"
                              :labelCol="{ class: 'sr-only' }"
                              style="width: 200px"
                            >
                              <div class="date-picker__group">
                                <VueDatePicker
                                  name="aplcntBrdt"
                                  id="write-period-aplcntBrdt"
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
                      <th scope="row">종교</th>
                      <td>
                        <a-form-item
                          name=""
                          label="종교"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.aplcntRlgnCd"
                          >
                            <a-select-option
                              v-for="list in codeList3"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
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
                          name="aplcntAcgbCd"
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.aplcntAcgbCd"
                            ref="clientEducationRef"
                          >
                            <a-select-option
                              v-for="list in acbgList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
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
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.aplcntCrCd"
                            ref="clientJobRef"
                          >
                            <a-select-option
                              v-for="list in crList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">추가정보</th>
                      <td colspan="3">
                        <div class="txt-form-box lines">
                          <div class="txt-form">
                            <span class="pre-txt">직업경력</span>
                            <a-form-item
                              name=""
                              label="직업경력"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.aplcntCrrCd"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">년(개월)</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">재산</span>
                            <a-form-item
                              name=""
                              label="재산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.aplcntCashAstAnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">생활방법</span>
                            <a-form-item
                              name=""
                              label="생활방법"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.aplcntLivMthd"
                                :maxlength="22"
                              />
                            </a-form-item>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">월수입</span>
                            <a-form-item
                              name=""
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.aplcntMmIncmAnt"
                                :maxlength="22"
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
                    면접상담 내담자 정보의 성명, 성별, 주소, 실거주지, 생년월일,
                    종교, 학력, 직업, 추가정보 입력에관한 표
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
                          name="otherNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherNm"
                            ref="spouseNameRef"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
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
                          <a-radio-group
                            v-model:value="form.otherGndrCd"
                            ref="spouseGenderRef"
                          >
                            <a-radio class="radio-bx" value="01">남성</a-radio>
                            <a-radio class="radio-bx" value="02">여성</a-radio>
                          </a-radio-group>
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
                        <a-form-item
                          name="otherAddressGroup"
                          label="주소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <AddrInput
                            v-model:zip="form.otherZip"
                            v-model:addr="form.otherAddr"
                            v-model:dAddr="form.otherDaddr"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">실거주지</th>
                      <td colspan="3">
                        <AddrInput
                          v-model:zip="form.otherRlrsdZip"
                          v-model:addr="form.otherRlrsdAddr"
                          v-model:dAddr="form.otherRlrsdDaddr"
                        />
                      </td>
                    </tr>
                    <tr>
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
                              name="otherBrdt"
                              label="생년월일"
                              :labelCol="{ class: 'sr-only' }"
                              style="width: 200px"
                            >
                              <div class="date-picker__group">
                                <VueDatePicker
                                  name="otherBrdt"
                                  id="write-period-otherBrdt"
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
                      <th scope="row">종교</th>
                      <td>
                        <a-form-item
                          name=""
                          label="종교"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.otherRlgnCd"
                          >
                            <a-select-option
                              v-for="list in codeList3"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
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
                          name="otherAcgbCd"
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.otherAcgbCd"
                            ref="spouseEducationRef"
                          >
                            <a-select-option
                              v-for="list in acbgList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
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
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.otherCrCd"
                            ref="spouseJobRef"
                          >
                            <a-select-option
                              v-for="list in crList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">추가정보</th>
                      <td colspan="3">
                        <div class="txt-form-box lines">
                          <div class="txt-form">
                            <span class="pre-txt">직업경력</span>
                            <a-form-item
                              name=""
                              label="직업경력"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherCrrCd"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">년(개월)</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">재산</span>
                            <a-form-item
                              name=""
                              label="재산"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherCashAstAnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">생활방법</span>
                            <a-form-item
                              name=""
                              label="생활방법"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherLivMthd"
                                :maxlength="22"
                              />
                            </a-form-item>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">월수입</span>
                            <a-form-item
                              name=""
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherMmIncmAnt"
                                :maxlength="22"
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
            <AccordionItem key="4">
              <template #header>
                <AccordionHead title="혼인관계" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    면접상담 혼인관계의 혼인방법, 혼인연령, 혼인기간, 별거기간,
                    혼인신고, 혼인형태 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">혼인방법</th>
                      <td>
                        <a-select
                          id=""
                          class="common-select"
                          placeholder="선택"
                          v-model:value="form.mrgHow"
                        >
                          <a-select-option value="1">연예</a-select-option>
                          <a-select-option value="2">중매</a-select-option>
                          <a-select-option value="3">절충</a-select-option>
                          <a-select-option value="4">강제</a-select-option>
                          <a-select-option value="5">기타</a-select-option>
                        </a-select>
                      </td>
                      <th scope="row">혼인연령</th>
                      <td>
                        <div class="txt-form-box lines">
                          <div class="txt-form">
                            <span class="pre-txt">남</span>
                            <a-form-item
                              name=""
                              label="남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgMAge"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">세</span>
                          </div>
                          <div class="txt-line" aria-hidden="true">/</div>
                          <div class="txt-form">
                            <span class="pre-txt">여</span>
                            <a-form-item
                              name=""
                              label="여"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgFAge"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">세</span>
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
                              name=""
                              label="혼인기간-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgYear"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="혼인기간-개월"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgMonthly"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">개월</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="혼인기간-일"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgDay"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">일</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">별거기간</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="별거기간-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgSeparationYear"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="별거기간-개월"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgSeparationMonthly"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">개월</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="별거기간-일"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.mrgSeparationDay"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">일</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">혼인신고</th>
                      <td>
                        <a-radio-group v-model:value="form.mrgState">
                          <a-radio class="radio-bx" value="true">유</a-radio>
                          <a-radio class="radio-bx" value="false">무</a-radio>
                        </a-radio-group>
                      </td>
                      <th scope="row">혼인형태</th>
                      <td>
                        <a-select
                          id=""
                          class="common-select"
                          placeholder="선택"
                          v-model:value="form.mrgType"
                        >
                          <a-select-option value="1">초혼</a-select-option>
                          <a-select-option value="2">미혼</a-select-option>
                          <a-select-option value="3">기혼</a-select-option>
                          <a-select-option value="4">미망인</a-select-option>
                          <a-select-option value="5">상처</a-select-option>
                          <a-select-option value="6">이혼</a-select-option>
                          <a-select-option value="7">재혼</a-select-option>
                        </a-select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="5">
              <template #header>
                <AccordionHead title="자녀관계" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    면접상담 자녀관계의 자녀, 기타소생, 내담자 전혼소생, 상대자
                    전혼소생 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">자녀</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="자녀-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childMCnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="자녀-살"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childMAge"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">살</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="자녀-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childFCnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="자녀-살"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childFAge"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">살</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">기타소생</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="기타소생-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childOtherMCnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="기타소생-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.childOtherFCnt"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">내담자 전혼소생</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="내담자 전혼소생-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.clientChildPrevMarriageM"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="내담자 전혼소생-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.clientChildPrevMarriageF"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">상대자 전혼소생</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="상대자 전혼소생-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.spouseChildPrevMarriageM"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="상대자 전혼소생-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.spouseChildPrevMarriageF"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀</span>
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
                <AccordionHead title="가족관계" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    면접상담 가족관계의 내담자, 상대자, 내담자 부모, 상대자
                    부모, 기타동거인 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">내담자</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="내담자-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.clientRelationM"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="내담자-녀중"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.clientRelationF"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀중</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="내담자-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.clientRelationOrder"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">(남)</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">상대자</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="상대자-남"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.spouseRelationM"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">남</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="상대자-녀중"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.spouseRelationF"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">녀중</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="상대자-녀"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.spouseRelationOrder"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">(녀)</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">내담자 부모</th>
                      <td colspan="3">
                        <div class="inline-form-box">
                          <div class="inline-form-item">
                            동거 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentM"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentF"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                          <div class="inline-form-item">
                            별거 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentMSeparation"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentFSeparation"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                          <div class="inline-form-item">
                            사망 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentMDying"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.clientParentFDying"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상대자 부모</th>
                      <td colspan="3">
                        <div class="inline-form-box">
                          <div class="inline-form-item">
                            동거 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentM"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentF"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                          <div class="inline-form-item">
                            별거 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentMSeparation"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentFSeparation"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                          <div class="inline-form-item">
                            사망 (
                            <div class="txt-form-box lines">
                              <div class="txt-form">
                                <span class="pre-txt">부</span>
                                <a-form-item
                                  name=""
                                  label="부"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentMDying"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                              <div class="txt-line" aria-hidden="true">/</div>
                              <div class="txt-form">
                                <span class="pre-txt">모</span>
                                <a-form-item
                                  name=""
                                  label="모"
                                  :labelCol="{ class: 'sr-only' }"
                                >
                                  <a-input
                                    class="text-bx"
                                    v-model:value="form.spouseParentFDying"
                                    :maxlength="22"
                                  />
                                </a-form-item>
                                <span class="txt">년</span>
                              </div>
                            </div>
                            )
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">기타동거인</th>
                      <td colspan="3">
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="otherHousemate"
                              label="기타동거인-와"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherHousemate"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">와</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="otherHousemateYear"
                              label="기타동거인-년"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherHousemateYear"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">년</span>
                          </div>
                          <div class="txt-form">
                            <a-form-item
                              name="otherHousemateMonthly"
                              label="기타동거인-개월"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherHousemateMonthly"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">개월</span>
                          </div>
                          <div class="txt-form">
                            <span class="txt">동거</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="7">
              <template #header>
                <AccordionHead title="상담내용입력">
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
                    면접상담 상담내용입력의 제목, 내용 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        제목
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="dscsnTtl"
                          label="제목"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnTtl"
                            ref="titleRef"
                            :maxlength="255"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        내용
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-form-item
                          name="dscsnCn"
                          label="내용"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <lazy-data-editor
                            ref="contentRef"
                            :initial-value="form.dscsnCn"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>
        </a-form>

        <div class="form-bottom-box">
          <BullList type="refMark">
            <li class="blue">본인 예약이 원칙입니다.</li>
            <li class="blue">
              SMS수신동의, 메일 수신동의를 하지 않을 경우 예약확인을 위한
              예약번호를 받을 수 없어 예약 변경, 취소가 어려우니 반드시 1개 이상
              수신동의 하여주시기 바랍니다.
            </li>
            <li class="blue">
              휴대전화번호가 변경된 경우에는 상담원 대표전화 (02-3675-0142,
              0143) 로 문의하여 변경하여 주시기 바랍니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton
            variants="primary"
            width="xs"
            @click="submitIntvLawqaForm"
          >
            신청하기
          </CommonButton>
          <CommonButton variants="line-primary" width="xs" @click="cancel">
            취소하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/intv/form/IntvLawqaM';
</style>
