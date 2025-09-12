<!--
 * 화면명 : 전자접수신청_대한법률구조공단 기타 입력폼
 * 화면ID : LASP_ELE_011
 * 파일명 : ElrcptKlacEtcM
 * 작성자 : 김정남
 * 화면 설명 : 대한법률구조공단 입력폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.04  김정남   최초생성
 2025.08.25  김정남   첨부파일 기능 등 공통항목 처리
-->

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import { telephoneNumber } from '~/utils/TextUtils';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';

import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import AddrInput from '~/components/common/AddrInputRules.vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import { useLoginStore } from '~/stores/login';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import ElrcptFile from '~/components/common/ElrcptFile.vue';
import { FileUploadRowData } from '~/components/data/docAtchfileRow.vue';

definePageMeta({
  layout: 'pub2nd'
});
let addrKey = 0;
let bFileView = false;
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();
const { showAlert } = useCustomAlert();

const activeKey = ref([1, 2, 3, 4]);

onBeforeMount(() => {
  if (authenticated.value) {
    bFileView = route.query.status === 'V';

    if (route.query.incdntAplyNo === undefined) {
      if (route.query.slfDgnsNo != undefined) {
        form.slfDgnsNo = route.query.slfDgnsNo;
      } else {
        form.slfDgnsNo = '1'; // 자가진단번호가 없는 경우 테스트를 위해 임시로 넣는다.
      }
      selectUserInfo();
      selectSlfdgnsInfo(form.slfDgnsNo);
    } else {
      form.incdntAplyNo = route.query.incdntAplyNo;
      form.status = route.query.status;
      selectincdntAplyInfo();
    }
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

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();

  form.aplcntRlprNm = response.data.mbrNm;
  form.aplcntMblTelno = response.data.mbrMblTelno;
  if (response.data.mbrEmlAddr !== '') {
    form.aplcntEmlAddr =
      response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  }
  form.aplcntTelno = response.data.mbrTelno;
  form.aplcntZip = response.data.zip;
  form.aplcntAddr = response.data.mbrAddr;
  form.aplcntDaddr = response.data.mbrDaddr;
  form.frstRgtrId = response.data.userId;
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
 * name : selectincdntAplyInfo
 * desc : 등록된 사건정보를 가져온다.
 */
const selectincdntAplyInfo = async () => {
  const formData = new FormData();

  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await axios.post(
    '/api/elrcpt/klac/selectKlacAplyInfo',
    formData
  );

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });

  if (response.data.aplcntRlprBrdt != null) {
    const str = response.data.aplcntRlprBrdt; // "yyyyMMdd"
    const year = parseInt(str.substring(0, 4), 10);
    const month = parseInt(str.substring(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(str.substring(6, 8), 10);

    aplcntBrdt.value = new Date(year, month, day);
  }

  if (response.data.otherRlprBrdt != null) {
    const str = response.data.otherRlprBrdt; // "yyyyMMdd"
    const year = parseInt(str.substring(0, 4), 10);
    const month = parseInt(str.substring(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(str.substring(6, 8), 10);

    otherBrdt.value = new Date(year, month, day);
  }

  if (response.data.smsRcptnAgreYn == 'Y') {
    form.agre.push('sms');
  }

  if (response.data.emlRcptnAgreYn == 'Y') {
    form.agre.push('eml');
  }

  selectSlfdgnsInfo(form.slfDgnsNo);

  addrKey = addrKey + 1;
};

const formRef = ref();
const nameRef = ref();
const brdtRef = ref();
const phoneRef = ref();
const emlRef = ref();
const placeRef = ref();
const otherNmRef = ref();
const applFactSumryRef = ref();

const fileRef = ref(null);

const aplyFileList = ref<FileUploadRowData[]>([]);

// 폼 항목
const form = reactive({
  atchFileId: '',
  status: '',
  incdntAplyNo: '',
  instNo: '',
  aplyPrgrsSttsCd: '',
  slfDgnsNo: '',
  prvcClctUtztnPrpsAgreYn: '',
  tdptyPvsnAgreYn: '',
  casePvsnAgreYn: '',
  aplyDt: '',
  aplcntRlprSeCd: 'I001',
  aplcntRlprSeq: '1',
  aplcntTrprSeCd: 'J002',
  aplcntRlprNm: '',
  aplcntRlprBrdt: '',
  aplcntZip: '',
  aplcntAddr: '',
  aplcntDaddr: '',
  aplcntMblTelno: '',
  aplcntEmlAddr: '',
  aplcntDlvyLoc: '',
  aplcntTelno: '',
  aplcntCr: '',
  otherRlprSeCd: 'I002',
  otherRlprSeq: '2',
  otherTrprSeCd: 'J002',
  otherRlprNm: '',
  otherRlprBrdt: '',
  otherZip: '',
  otherAddr: '',
  otherDaddr: '',
  otherMblTelno: '',
  otherEmlAddr: '',
  otherDlvyLoc: '',
  otherTelno: '',
  incdntNm: '',
  rlApplAmt: '',
  applFactSumry: '',
  agre: [],
  indvPvsnAgreYn: '',
  smsRcptnAgreYn: '',
  emlRcptnAgreYn: '',
  frstRgtrId: ''
});

// 접수 폼 상단 사건, 대상자, 기준소득 항목 입력
const incdnt = ref<string>(''); // 사건
const instatrpr = ref<string>(''); // 대상자
const mdicm = ref<string>(''); // 기준소득

// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  aplcntRlprNm: [valid.required()],
  aplcntRlprBrdt: [valid.required()],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntMblTelno: [valid.mobile(), valid.required()],
  aplcntEmlAddr: [valid.email(), valid.required()],
  aplcntDlvyLoc: [valid.required()],
  otherRlprNm: [valid.required()]
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
 * name : insertBtn
 * desc : 대한법률구조공단 전자접수 신청 저장 버튼
 */
const insertBtn = async () => {
  if (applFactSumryRef.value != undefined) {
    if (applFactSumryRef.value.getTextValue().trim() !== '') {
      form.applFactSumry = applFactSumryRef.value.getValue();
    }
  }

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
    // insertForm();
    fileRef.value.transferFiles();
  }
};

/**
 * name : tmpBtn
 * desc : 대한법률구조공단 전자접수 신청 임시저장 버튼
 */
const tmpBtn = async () => {
  if (applFactSumryRef.value != undefined) {
    if (applFactSumryRef.value.getTextValue().trim() !== '') {
      form.applFactSumry = applFactSumryRef.value.getValue();
    }
  }

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
    // insertForm();
    fileRef.value.transferFiles();
  }
};

/**
 * name : updateBtn
 * desc : 신청정보 입력내용 수정 버튼
 */
const updateBtn = async () => {
  if (applFactSumryRef.value != undefined) {
    if (applFactSumryRef.value.getTextValue().trim() !== '') {
      form.applFactSumry = applFactSumryRef.value.getValue();
    }
  }

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
    // updateForm();
    fileRef.value.transferFiles();
  }
};

/**
 * name : insertForm
 * desc : 데이터 저장.
 */
const insertForm = async () => {
  const formData = new FormData();

  form.instNo = 'I001000000';

  form.prvcClctUtztnPrpsAgreYn = 'Y';
  form.tdptyPvsnAgreYn = 'Y';
  form.casePvsnAgreYn = 'Y';
  form.indvPvsnAgreYn = 'Y';

  const today = new Date();
  const aplyDt = today.toISOString().slice(0, 10).replace(/-/g, '');
  form.aplyDt = aplyDt;

  let smsRcptnAgreYn = 'N';
  let emlRcptnAgreYn = 'N';
  for (let i = 0; i < form.agre.length; i++) {
    if (form.agre[i] == 'sms') smsRcptnAgreYn = 'Y';
    if (form.agre[i] == 'eml') emlRcptnAgreYn = 'Y';
  }

  form.smsRcptnAgreYn = smsRcptnAgreYn;
  form.emlRcptnAgreYn = emlRcptnAgreYn;

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });
  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));
  const response = await useAxios().post(
    '/api/elrcpt/klac/insertKlacForm',
    formData
  );

  if (response.status == 200) {
    let prgrsStts = '';
    if (form.aplyPrgrsSttsCd == 'A01') {
      prgrsStts = '임시저장';
    } else {
      prgrsStts = '저장';
    }

    const result = await showAlert({
      icon: 'info',
      html: `전자접수 ${prgrsStts}이 완료되었습니다.`
    });

    if (result.isConfirmed) {
      navigateTo('/elrcpt/ElrcptCmptnInfo');
    }
  } else {
    alert('오류확인');
    console.log(response);
  }
};

/**
 * name : updateForm
 * desc : 전자접수 신청내용을 수정한다.
 */
const updateForm = async () => {
  const formData = new FormData();

  let smsRcptnAgreYn = 'N';
  let emlRcptnAgreYn = 'N';
  for (let i = 0; i < form.agre.length; i++) {
    if (form.agre[i] == 'sms') smsRcptnAgreYn = 'Y';
    if (form.agre[i] == 'eml') emlRcptnAgreYn = 'Y';
  }

  form.smsRcptnAgreYn = smsRcptnAgreYn;
  form.emlRcptnAgreYn = emlRcptnAgreYn;

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios().post(
    '/api/elrcpt/klac/updateKlacForm',
    formData
  );

  // if (response.status == 200) {
  // const result = await showAlert({
  //   icon: 'info',
  //   html: `전자접수 수정이 완료되었습니다.`
  // });
  // }
};

/**
 * name : myPageMove
 * desc : 마이페이지 상담예약내역으로 이동한다.
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

const transferSuccessHandle = async (fileList) => {
  aplyFileList.value = fileList;

  if (form.status == 'U') {
    updateForm();
  } else {
    insertForm();
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전자접수 신청"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="title-heading-1">대한법률구조공단 법률구조 신청</h4>

        <a-form :model="form" :rules="formRules" ref="formRef">
          <Accordion v-model:activeKey="activeKey" variant="gray">
            <template #expandIcon="{ isActive }">
              <AccordionIcon :isActive="isActive" />
            </template>
            <AccordionItem key="1">
              <template #header>
                <AccordionHead title="의뢰자 정보">
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
                    전자접수 신청 의뢰자 정보의 성명, 생년월일, 주소, 연락처,
                    이메일, 송달장소, 연락처, 직업(대상자), 알림동의 입력에관한
                    표
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
                            ref="nameRef"
                            :maxlength="100"
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
                        <div class="form-item__addr">
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
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        연락처
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
                              ref="phoneRef"
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
                          <EmailInput
                            v-model="form.aplcntEmlAddr"
                            ref="emlRef"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        송달장소
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="aplcntDlvyLoc"
                          label="송달장소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntDlvyLoc"
                            ref="placeRef"
                            :maxlength="200"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">연락처</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0018"
                            v-model="form.aplcntTelno"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">직업(대상자)</th>
                      <td colspan="3">
                        <a-form-item
                          name=""
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntCr"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">알림동의</th>
                      <td colspan="3">
                        <a-checkbox-group v-model:value="form.agre">
                          <a-checkbox class="check-bx" value="sms" name="type">
                            문자메시지 수신동의
                          </a-checkbox>
                          <a-checkbox class="check-bx" value="eml" name="type">
                            전자우편 수신동의
                          </a-checkbox>
                        </a-checkbox-group>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="상대방 정보">
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
                    전자접수 신청 상대방 정보의 성명, 생년월일, 주소, 연락처,
                    이메일, 송달장소, 연락처 입력에관한 표
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
                            ref="otherNmRef"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">생년월일</th>
                      <td>
                        <a-form-item
                          name="otherRlprBrdt"
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
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">주소</th>
                      <td colspan="3">
                        <div class="form-item__addr">
                          <AddrInput
                            v-model:zip="form.otherZip"
                            v-model:addr="form.otherAddr"
                            v-model:dAddr="form.otherDaddr"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">연락처</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0017"
                            v-model="form.otherMblTelno"
                          />
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <EmailInput
                          v-model="form.otherEmlAddr"
                          ref="clientEmlAddrRef"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">송달장소</th>
                      <td>
                        <a-form-item
                          name=""
                          label="송달장소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherDlvyLoc"
                            :maxlength="200"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">연락처</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0018"
                            v-model="form.otherTelno"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="3">
              <template #header>
                <AccordionHead title="신청사실의 요지" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청사실의 요지의 사건명, 구조신청금액, 신청사실의
                    요지 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">사건명</th>
                      <td>
                        <a-form-item
                          name=""
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
                      <th scope="row">구조신청금액</th>
                      <td>
                        <a-form-item
                          name=""
                          label="구조신청금액"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.rlApplAmt"
                            :maxlength="10"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">신청사실의 요지</th>
                      <td colspan="3">
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <lazy-data-editor
                          ref="applFactSumryRef"
                          :initial-value="form.applFactSumry"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="4">
              <template #header>
                <AccordionHead title="입증자료제출" />
              </template>

              <ElrcptFile
                ref="fileRef"
                :view="bFileView"
                :slfDgnsNo="form.slfDgnsNo"
                :incdntAplyNo="form.incdntAplyNo"
                @callback="transferSuccessHandle"
              ></ElrcptFile>

              <!--              <div class="receipt-form-info">-->
              <!--                <div class="tit">법률구조대상자[가정폭력피해여성] 증빙서류</div>-->
              <!--                <div class="info-box">-->
              <!--                  <div class="info-top">-->
              <!--                    법률구조대상자 입증을 위해 아래와 같은 증빙서류 제출이-->
              <!--                    필요합니다.-->
              <!--                  </div>-->
              <!--                  <ul class="info-list">-->
              <!--                    <li>-->
              <!--                      <span class="num">1.</span>「국민기초생활 보장법-->
              <!--                      시행규칙」제38조제4항에 따른 차상위계층 확인서-->
              <!--                    </li>-->
              <!--                    <li>-->
              <!--                      <span class="num">2.</span>특정 급여자격 확인서 입증자료-->
              <!--                    </li>-->
              <!--                  </ul>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="receipt-submit-box">-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                          <div class="guide-txt">-->
              <!--                            <span class="num">※</span>전자접수 신청 사건의-->
              <!--                            구비서류를 전자증명서로 편리하게 제출할 수 있습니다.-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input is-active">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">-->
              <!--                      <span class="flag">선택</span>-->
              <!--                      추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.-->
              <!--                    </div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                          <div class="guide-txt">-->
              <!--                            <span class="num">※</span>전자접수 신청 사건의-->
              <!--                            구비서류를 전자증명서로 편리하게 제출할 수 있습니다.-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input is-active">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="receipt-form-info">-->
              <!--                <div class="tit">-->
              <!--                  <div>-->
              <!--                    기준중위소득 소득요건 입증자료-->
              <!--                    <span class="sub"-->
              <!--                      >소득제한 125% 또는 150% 대상자의 추가제출 서류</span-->
              <!--                    >-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="info-box">-->
              <!--                  <div class="info-top">-->
              <!--                    기준중위소득 소득요건 입증을 위하여 증빙서류 제출이-->
              <!--                    필요합니다.-->
              <!--                    <br class="pc-only" />-->
              <!--                    건강보험가입자 유형에 따라 제출가능 한 서류를 택1하여-->
              <!--                    등록해주세요.-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="receipt-submit-box">-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">[건강보험직장가입자]</div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">[건강보험지역가입자]</div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">[건강보험피부양자]</div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">[건강보험미가입자]</div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="receipt-form-info">-->
              <!--                <div class="tit">-->
              <!--                  사건관련 제출[이혼(가정폭력피해여성)] 필요서류-->
              <!--                </div>-->
              <!--                <div class="info-box">-->
              <!--                  <div class="info-top">-->
              <!--                    전자접수 신청사건 관련하여 아래와 같은 서류 제출이-->
              <!--                    필요합니다.-->
              <!--                  </div>-->
              <!--                  <ul class="info-list">-->
              <!--                    <li><span class="num">1.</span>주민등록등본(필수)</li>-->
              <!--                    <li>-->
              <!--                      <span class="num">2.</span>사업자등록증(상대방이 상인인-->
              <!--                      경우)(선택)-->
              <!--                    </li>-->
              <!--                    <li>-->
              <!--                      <span class="num">3.</span>물품인수증이나 거래장부(선택)-->
              <!--                    </li>-->
              <!--                    <li>-->
              <!--                      <span class="num">4.</span>법인등기사항증명서(상대방이-->
              <!--                      법인인 경우)(선택)-->
              <!--                    </li>-->
              <!--                    <li><span class="num">5.</span>매매계약서(선택)</li>-->
              <!--                    <li><span class="num">6.</span>기타(선택)</li>-->
              <!--                  </ul>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="receipt-submit-box">-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">-->
              <!--                      <span class="flag filled">필수</span>-->
              <!--                      <strong>주민등록등본</strong>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div class="receipt-submit-item">-->
              <!--                  <div class="submit-top">-->
              <!--                    <div class="top-txt">-->
              <!--                      <span class="flag">선택</span>-->
              <!--                      추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.-->
              <!--                    </div>-->
              <!--                    <div class="top-btns">-->
              <!--                      <button type="button" class="btn add">행추가</button>-->
              <!--                      <button type="button" class="btn del">행삭제</button>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="submit-module">-->
              <!--                    &lt;!&ndash;module&ndash;&gt;-->
              <!--                    <div class="module-unit">-->
              <!--                      <div class="module-in">-->
              <!--                        <div class="select-forms">-->
              <!--                          <div class="forms-in">-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-select-->
              <!--                                class="common-select"-->
              <!--                                placeholder="선택"-->
              <!--                              >-->
              <!--                                <a-select-option value="1"-->
              <!--                                  >선택 1</a-select-option-->
              <!--                                >-->
              <!--                                <a-select-option value="2"-->
              <!--                                  >선택 2</a-select-option-->
              <!--                                >-->
              <!--                              </a-select>-->
              <!--                            </a-form-item>-->
              <!--                            <a-form-item-->
              <!--                              name=""-->
              <!--                              label=""-->
              <!--                              :labelCol="{ class: 'sr-only' }"-->
              <!--                            >-->
              <!--                              <a-input class="text-bx" placeholder="첨부파일" />-->
              <!--                            </a-form-item>-->
              <!--                          </div>-->
              <!--                          <div class="guide-txt">-->
              <!--                            <span class="num">※</span>전자접수 신청 사건의-->
              <!--                            구비서류를 전자증명서로 편리하게 제출할 수 있습니다.-->
              <!--                          </div>-->
              <!--                        </div>-->
              <!--                        <div class="select-btns">-->
              <!--                          <button type="button" class="btn is-active">-->
              <!--                            <span class="txt">전자증명</span>-->
              <!--                          </button>-->
              <!--                          <div class="btn file-input">-->
              <!--                            <AllyFileButton class="txt">-->
              <!--                              <template #input>-->
              <!--                                <label for="fileInput"-->
              <!--                                  ><span class="sr-only">파일첨부</span></label-->
              <!--                                >-->
              <!--                                <input-->
              <!--                                  type="file"-->
              <!--                                  id="fileInput"-->
              <!--                                  class="sr-only"-->
              <!--                                  aria-hidden="true"-->
              <!--                                  tabindex="-1"-->
              <!--                                />-->
              <!--                              </template>-->
              <!--                            </AllyFileButton>-->
              <!--                          </div>-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">나의서류</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                        <div class="del-btn">-->
              <!--                          <button type="button" class="btn">-->
              <!--                            <span class="txt">삭제</span>-->
              <!--                          </button>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    &lt;!&ndash;//module&ndash;&gt;-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <div class="select-result-box">-->
              <!--                <div class="check-tit-box">-->
              <!--                  <span class="ico-check-info"></span>-->
              <!--                  <strong>입증자료를 입력 완료 하시겠습니까?</strong>-->
              <!--                </div>-->
              <!--                <a-radio-group>-->
              <!--                  <a-radio class="radio-bx" value="예">예</a-radio>-->
              <!--                  <a-radio class="radio-bx" value="아니요">아니요</a-radio>-->
              <!--                </a-radio-group>-->
              <!--              </div>-->
            </AccordionItem>
          </Accordion>
        </a-form>

        <ButtonGroup align="center" class="!mt-50px" v-if="form.status">
          <CommonButton
            variants="line-black"
            width="sm-1"
            @click="selectincdntAplyInfo"
            >예약취소</CommonButton
          >
          <CommonButton variants="primary" width="sm-1" @click="updateBtn"
            >수정하기</CommonButton
          >
          <CommonButton
            to="#"
            variants="line-primary"
            width="sm-1"
            @click="myPageMove"
            >목록</CommonButton
          >
        </ButtonGroup>
        <ButtonGroup align="center" class="!mt-50px" v-else>
          <CommonButton variants="line-primary" width="lg" @click="tmpBtn">
            임시저장
          </CommonButton>
          <CommonButton variants="primary" width="lg" @click="insertBtn">
            전자접수 신청완료
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKlacEtcM';
</style>
