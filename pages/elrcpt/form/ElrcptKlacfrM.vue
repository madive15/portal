<!--
 * 화면명 : 전자접수신청_한국가정법률상담소 기본정보 입력 폼
 * 화면ID : LASP_ELE_014_02
 * 파일명 : ElrcptKlacfrM
 * 작성자 : 김정남
 * 화면 설명 : 한국가정법률상담소 기본정보 입력 폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.04  김정남   최초생성
 2025.08.12  김정남   기능 작성 및 validation check
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';
import AddrInput from '~/components/common/AddrInputRules.vue';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import * as elrcptApis from '~/composables/elrcpt';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import { useLoginStore } from '~/stores/login';
import ElrcptFile from '~/components/common/ElrcptFile.vue';
import { FileUploadRowData } from '~/components/data/docAtchfileRow.vue';
import { ref } from 'vue';
import axios from 'axios';

definePageMeta({
  layout: 'pub2nd'
});

let addrKey = 0;
let bFileView = false;

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();
const { showAlert } = useCustomAlert();

/** 아코디언 전체 열기 */
const activeKey = ref([1, 2, 3, 4]);

onBeforeMount(() => {
  if (authenticated.value) {
    bFileView = route.query.status === 'V';

    if (route.query.incdntAplyNo === undefined) {
      // 신규라면 자가진단번호를 받고 조회한다.
      if (route.query.slfDgnsNo != undefined) {
        form.slfDgnsNo = route.query.slfDgnsNo;
      } else {
        form.slfDgnsNo = '2'; // 자가진단번호가 없는 경우 테스트를 위해 임시로 넣는다.
      }
      selectUserInfo(); // 신규인 경우 사용자 정보를 조회한다.
      selectSlfdgnsInfo(form.slfDgnsNo);
    } else {
      form.incdntAplyNo = route.query.incdntAplyNo;
      form.status = route.query.status;
      selectincdntAplyInfo(); //입력 정보 조회
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

const commonCodeStore = useCommonCodeStore();
const cd = 'CO0048';
const { data: jobList } = useQuery({
  queryKey: ['code', cd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();
  form.aplcntRlprNm = response.data.mbrNm;
  form.aplcntRlprBrdt = response.data.mbrBrdt;
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
    '/api/elrcpt/klacfr/selectKlacfrAplyInfo',
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

  selectSlfdgnsInfo(form.slfDgnsNo);

  addrKey = addrKey + 1;
};

/** form */
const formRef = ref();
const rmkRef = ref();

const fileRef = ref(null);

const aplyFileList = ref<FileUploadRowData[]>([]);

/** form 선언 */
const form = reactive({
  atchFileId: '',
  status: '',
  incdntAplyNo: '', // 사건신청번호
  instNo: 'I002000000', // 기관번호
  aplyPrgrsSttsCd: '', // 신청진행상태
  slfDgnsNo: '', // 자가진단번호
  prvcClctUtztnPrpsAgreYn: 'Y', // 개인정보수집이용동의
  tdptyPvsnAgreYn: 'Y', // 제3자제공동의
  casePvsnAgreYn: 'Y', // 사례제공동의
  rghtUdsdAgreYn: 'Y', // 권리이해동의
  aplyDt: '',
  // 신청자 정보
  aplcntRlprSeCd: 'I001', // 신청인 구분
  aplcntRlprSeq: '1', // 신청인 순서
  aplcntTrprSeCd: 'J002', // 대상자구분
  aplcntRlprNm: '', // 신청인 성명
  aplcntRlprBrdt: '', // 신청인 생년월일
  aplcntCrCd: '', // 신청인 직업
  aplcntZip: '', // 신청인 우편번호
  aplcntAddr: '', // 신청인 주소
  aplcntDaddr: '', // 신청인 상세주소
  aplcntMblTelno: '', // 신청인 휴대폰
  aplcntTelno: '', // 신청인 집전화
  aplcntEmg1Telno: '', // 신청인 비상연락망1
  aplcntEmg2Telno: '', // 신청인 비상연락망2
  aplcntEmg3Telno: '', // 신청인 비상연락망3
  aplcntEmlAddr: '', // 신청인 이메일
  aplcntPrptAmt: '', // 신청인 자산
  aplcntMmIncmAmt: '', // 신청인 월급
  // 상대자 정보
  otherRlprSeCd: 'I002', // 상대자 구분
  otherRlprSeq: '2', // 상대자 순서
  otherTrprSeCd: 'J002', // 대상자구분
  otherRlprNm: '', // 상대자 성명
  otherRlprBrdt: '', // 상대자 생년월일
  otherCrCd: '', // 상대자 직업코드
  otherZip: '', // 상대자 우편번호
  otherAddr: '', // 상대자 주소
  otherDaddr: '', // 상대자 상세주소
  otherMblTelno: '', // 상대자 휴대전화번호
  otherTelno: '', // 상대자 집전화번호
  otherPrptAmt: '', // 상대자 자산
  otherMmIncmAmt: '', // 상대자 월수입
  // 비고
  incdntNm: '', // 비고 신청사건명
  rmk: '', // 비고 특이사항
  frstRgtrId: '' // 최초작성자 아이디
});

// 접수 폼 상단 사건, 대상자, 기준소득 항목 입력
const incdnt = ref<string>(''); // 사건
const instatrpr = ref<string>(''); // 대상자
const mdicm = ref<string>(''); // 기준소득

// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  aplcntRlprNm: [valid.required()],
  aplcntRlprBrdt: [valid.required()],
  aplcntCrCd: [valid.required()],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntMblTelno: [valid.required(), valid.mobile()],
  aplcntTelno: [valid.required(), valid.telNum()],
  aplcntEmg1Telno: [valid.required(), valid.mobile()],
  aplcntEmg2Telno: [valid.required(), valid.mobile()],
  aplcntEmg3Telno: [valid.required(), valid.mobile()],
  aplcntEmlAddr: [valid.required(), valid.email()],
  otherRlprNm: [valid.required()],
  otherRlprBrdt: [valid.required()],
  otherCrCd: [valid.required()]
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
 * desc : 한국가정법률상담소 전자접수 신청 데이터 저장
 */
const insertBtn = async () => {
  if (rmkRef.value != undefined) {
    if (rmkRef.value.getTextValue().trim() !== '') {
      form.rmk = rmkRef.value.getValue();
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
 * name : tmprStrgBtn
 * desc : 한국가정법률상담소 전자접수 신청 데이터 임시저장
 */
const tmprStrgBtn = async () => {
  if (rmkRef.value != undefined) {
    if (rmkRef.value.getTextValue().trim() !== '') {
      form.rmk = rmkRef.value.getValue();
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
    form.aplyPrgrsSttsCd = 'A01'; // 임시저장
    // insertForm();
    fileRef.value.transferFiles();
  }
};

/**
 * name : updateBtn
 * desc : 한국가정법률상담소 전자접수 신청 데이터 수정
 */
const updateBtn = async () => {
  if (rmkRef.value != undefined) {
    if (rmkRef.value.getTextValue().trim() !== '') {
      form.rmk = rmkRef.value.getValue();
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
    updateForm();
    // fileRef.value.transferFiles();
  }
};

/**
 * name : insertForm
 * desc : 데이터 저장.
 */
const insertForm = async () => {
  const formData = new FormData();

  const today = new Date();
  const aplyDt = today.toISOString().slice(0, 10).replace(/-/g, '');
  form.aplyDt = aplyDt;

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));

  const response = await useAxios().post(
    '/api/elrcpt/klacfr/insertKlacfrForm',
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

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));

  const response = await useAxios().post(
    '/api/elrcpt/klacfr/updateKlacfrForm',
    formData
  );

  if (response.status == 200) {
    const result = await showAlert({
      icon: 'info',
      html: `전자접수 수정이 완료되었습니다.`
    });

    if (result.isConfirmed) {
      navigateTo('/elrcpt/ElrcptCmptnInfo');
    }
  }

  // if (response.status == 200) {
  // const result = await showAlert({
  //   icon: 'info',
  //   html: `전자접수 수정이 완료되었습니다.`
  // });
  // }
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
        <CommonTitle tag="h4" size="1">
          한국가정법률상담소 전자접수 신청
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
                    전자접수 신청 신청인 정보의 성명, 생년월일, 직업, 주소,
                    휴대전화번호, 집전화번호, 비상연락망1, 비상연락망2,
                    비상연락망3, 이메일, 자산, 월수입 입력에관한 표
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
                      <td colspan="3">
                        <a-form-item
                          name="aplcntRlprNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntRlprNm"
                            :maxlength="100"
                          />
                        </a-form-item>
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
                            class="common-select"
                            v-model:value="form.aplcntCrCd"
                          >
                            <a-select-option
                              v-for="job in jobList"
                              :value="job.value"
                              >{{ job.text }}</a-select-option
                            >
                          </a-select>
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
                        휴대전화번호
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
                        집전화번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntTelno"
                            label="집전화"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0018"
                              v-model="form.aplcntTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        비상연락망1
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                        <br class="pc-only" />(연락처)
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntEmg1Telno"
                            label="비상연락망1"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.aplcntEmg1Telno"
                              ref="phoneRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">
                        비상연락망2
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                        <br class="pc-only" />(연락처)
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntEmg2Telno"
                            label="비상연락망2"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.aplcntEmg2Telno"
                              ref="phoneRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        비상연락망3
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                        <br class="pc-only" />(연락처)
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntEmg3Telno"
                            label="비상연락망3"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.aplcntEmg3Telno"
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
                      <th scope="row">자산</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="aplcntPrptAmt"
                              label="자산"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                type="number"
                                v-model:value="form.aplcntPrptAmt"
                                :maxlength="100"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">월수입</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="aplcntMmIncmAmt"
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                type="number"
                                v-model:value="form.aplcntMmIncmAmt"
                                :maxlength="100"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                        </div>
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
                    전자접수 신청 상대방 정보의 성명, 생년월일, 직업, 주소,
                    휴대전화번호, 집전화번호, 자산, 월수입 입력에관한 표
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
                      <td colspan="3">
                        <a-form-item
                          name="otherRlprNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherRlprNm"
                            :maxlength="100"
                          />
                        </a-form-item>
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
                          </div>
                        </div>
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
                            class="common-select"
                            v-model:value="form.otherCrCd"
                          >
                            <a-select-option
                              v-for="job in jobList"
                              :value="job.value"
                              >{{ job.text }}</a-select-option
                            >
                          </a-select>
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
                      <th scope="row">휴대전화번호</th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="otherMblTelno"
                            label="휴대전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.otherMblTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">집전화번호</th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="otherTelno"
                            label="집전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0018"
                              v-model="form.otherTelno"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">자산</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="otherPrptAmt"
                              label="자산"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherPrptAmt"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                        </div>
                      </td>
                      <th scope="row">월수입</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name="otherMmIncmAmt"
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherMmIncmAmt"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
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
                <AccordionHead title="비고" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청 비고의 신청사건명, 특이사항 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">신청사건명</th>
                      <td>
                        <a-form-item
                          name="incdntNm"
                          label="신청사건명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.incdntNm"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">특이사항</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <lazy-data-editor
                          ref="rmkRef"
                          :initial-value="form.rmk"
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
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKlacfrM';
</style>
