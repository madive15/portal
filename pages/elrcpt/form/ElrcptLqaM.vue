<!--
 * 화면명 : 전자접수신청_대한가정법률복지상담원 입력폼
 * 화면ID : LASP_ELE_015
 * 파일명 : ElrcptLqaM
 * 작성자 : 김정남
 * 화면 설명 : 대한가정법률복지상담원 입력폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.18  김정남   최초생성
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

definePageMeta({
  layout: 'pub2nd'
});
let addrKey = 0;
let bFileView = false;
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

/** 아코디언 전체 열기 */
const activeKey = ref([1, 2, 3, 4]);

const route = useRoute();
const { showAlert } = useCustomAlert();

/** 필요한 공통코드 호출  */
const commonCodeStore = useCommonCodeStore();

// 종교
const rlgnCd = 'CO0095';
const { data: rlgnList } = useQuery({
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

onBeforeMount(() => {
  if (authenticated.value) {
    bFileView = route.query.status === 'V';

    // 사건신청번호가 들어온다면 조회한다.
    if (route.query.incdntAplyNo === undefined) {
      // 신규라면 자가진단번호를 받고 조회한다.
      if (route.query.slfDgnsNo != undefined) {
        form.slfDgnsNo = route.query.slfDgnsNo;
      } else {
        form.slfDgnsNo = '3'; // 자가진단번호가 없는 경우 테스트를 위해 임시로 넣는다.
      }
      selectUserInfo(); // 신규인 경우 사용자 정보를 조회한다.
    } else {
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
  form.aplcntGndrCd = response.data.mbrGndrCd;
  form.aplcntRlprBrdt = response.data.mbrBrdt;
  form.aplcntRlprMblTelno = response.data.mbrMblTelno;
  if (response.data.mbrEmlAddr !== '') {
    form.aplcntEmlAddr =
      response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  }
  form.aplcntZip = response.data.zip;
  form.aplcntAddr = response.data.mbrAddr;
  form.aplcntDaddr = response.data.mbrDaddr;
  form.frstRgtrId = response.data.userId;
};

/** form */
const formRef = ref();
const cnRef = ref();

/** form 선언 */
const form = reactive({
  atchFileId: '',
  status: '',
  incdntAplyNo: '',
  instNo: 'I003000000',
  aplyPrgrsSttsCd: '',
  slfDgnsNo: '', // 자가진단번호
  prvcClctUtztnPrpsAgreYn: 'Y', // 개인정보수집이용목적 동의
  tdptyPvsnAgreYn: 'Y', // 제3자 제공동의
  casePvsnAgreYn: 'Y', // 사례제공동의
  rghtUdsdAgreYn: 'Y', // 권리이해동의
  aplyDt: '', // 신청일

  aplcntRlprSeCd: 'I001',
  aplcntRlprSeq: '1',
  aplcntTrprSeCd: 'J002', // 대상자구분
  aplcntRlprNm: '', // 신청인 성명
  aplcntGndrCd: '', // 신청인 성별코드
  aplcntZip: '', // 신청인 우편번호
  aplcntAddr: '', // 신청인 주소
  aplcntDaddr: '', // 신청인 상세주소
  aplcntRlrsdZip: '', // 신청인 실거주지우편번호
  aplcntRlrsdAddr: '', // 신청인 실거주지주소
  aplcntRlrsdDaddr: '', // 신청인 실거주지상세주소
  aplcntRlprMblTelno: '', // 신청인 휴대폰
  aplcntEmlAddr: '', // 신청인 이메일
  aplcntRlprBrdt: '', // 신청인 생년월일
  aplcntRlgnCd: '', // 신청인 종교코드
  aplcntAcbgCd: '', // 신청인 학력코드
  aplcntCrrNm: '', // 신청인 경력
  aplcntCrcd: '', // 신청인 직업코드
  aplcntPrptAmt: '', // 신청인 재산금액
  aplcntLfMthdNm: '', // 신청인 생활방법명
  aplcntMmIncmAmt: '', // 신청인 월수입

  otherRlprSeCd: 'I002',
  otherRlprSeq: '2',
  otherTrprSeCd: 'J002', // 대상자구분
  otherRlprNm: '', // 피신청인 성명
  otherGndrCd: '', // 피신청인 성별코드
  otherZip: '', // 피신청인 우편번호
  otherAddr: '', // 피신청인 주소
  otherDaddr: '', // 피신청인 상세주소
  otherRlrsdZip: '', // 피신청인 실거주지우편번호
  otherRlrsdAddr: '', // 피신청인 실거주지주소
  otherRlrsdDaddr: '', // 피신청인 실거주지상세주소
  otherRlprMblTelno: '', // 피신청인 휴대폰
  otherEmlAddr: '', // 피신청인 이메일
  otherRlprBrdt: '', // 피신청인 생년월일
  otherRlgnCd: '', // 피신청인 종교코드
  otherAcbgCd: '', // 피신청인 학력코드
  otherCrrNm: '', // 피신청인 경력
  otherCrcd: '', // 피신청인 직업코드
  otherPrptAmt: '', // 피신청인 재산금액
  otherLfMthdNm: '', // 피신청인 생활방법명
  otherMmIncmAmt: '', // 피신청인 월수입

  rlprRelNm: '', // 내담자와 상대자와의 관계
  applFld: '', // 신청분야

  cn: '', // 신청내용

  faceDscsnAgreYn: '', // 대면상담 동의여부 (Y 아니면 신청불가)

  frstRgtrId: '' // 최초작성자 아이디
});

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

// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  aplcntRlprNm: [valid.required()],
  aplcntGndrCd: [valid.required()],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntRlprMblTelno: [valid.required(), valid.mobile()],
  otherRlprNm: [valid.required()],
  otherGndrCd: [valid.required()],
  otherAddressGroup: [valid.addressGroup(form, 'otherZip', 'otherAddr')],
  otherRlprMblTelno: [valid.required(), valid.mobile()]
};

/**
 * name : insertBtn
 * desc : 한국가정법률상담소 전자접수 신청 데이터 저장
 */
const insertBtn = async () => {
  if (cnRef.value != undefined) {
    if (cnRef.value.getTextValue().trim() !== '') {
      form.cn = cnRef.value.getValue();
    }
  }
  await formRef.value.validate();

  if (form.faceDscsnAgreYn != 'Y') {
    showAlert({
      icon: 'warning',
      html: `대면상담 필수안내에 동의해주셔야 합니다.`
    });
    return;
  }

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
  if (cnRef.value != undefined) {
    if (cnRef.value.getTextValue().trim() !== '') {
      form.cn = cnRef.value.getValue();
    }
  }

  await formRef.value.validate();

  if (form.faceDscsnAgreYn != 'Y') {
    showAlert({
      icon: 'warning',
      html: `대면상담 필수안내에 동의해주셔야 합니다.`
    });
    return;
  }

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
 * name : insertForm
 * desc : 데이터 저장.
 */
const insertForm = async () => {
  const formData = new FormData();

  console.log(form);

  const today = new Date();
  const aplyDt = today.toISOString().slice(0, 10).replace(/-/g, '');
  form.aplyDt = aplyDt;

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));

  const response = await useAxios().post(
    '/api/elrcpt/lqa/insertLqaForm',
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

const transferSuccessHandle = async (fileList) => {
  aplyFileList.value = fileList;
  // if (form.status == 'U') {
  // updateForm();
  // } else {
  insertForm();
  // }
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
          대한가정법률복지상담원 전자접수 신청
        </CommonTitle>

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
                    전자접수 신청 신청인 정보의 성명, 성별, 주소, 실거주지,
                    연락처, 이메일, 연령, 종교, 학력, 경력, 직업, 재산,
                    생활방법, 월수입, 내담자와 상대자와의 관례, 신청분야
                    입력에관한 표
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
                            :maxlength="30"
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
                          <a-radio-group v-model:value="form.aplcntGndrCd">
                            <a-radio class="radio-bx" value="01">남</a-radio>
                            <a-radio class="radio-bx" value="02">여</a-radio>
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
                        연락처
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntRlprMblTelno"
                            label="연락처"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.aplcntRlprMblTelno"
                              ref="phoneInputRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-item__email">
                          <EmailInput
                            v-model="form.aplcntEmlAddr"
                            ref="mailInputRef"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">생년월일</th>
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
                              v-for="list in rlgnList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">학력</th>
                      <td>
                        <a-form-item
                          name=""
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.aplcntAcbgCd"
                          >
                            <a-select-option
                              v-for="list in acbgList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                      <th scope="row">경력</th>
                      <td>
                        <a-form-item
                          name=""
                          label="경력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntCrrNm"
                            :maxlength="30"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">직업</th>
                      <td>
                        <a-form-item
                          name=""
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.aplcntCrcd"
                          >
                            <a-select-option
                              v-for="list in crList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                      <th scope="row">재산</th>
                      <td>
                        <a-form-item
                          name=""
                          label="재산"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntPrptAmt"
                            :maxlength="22"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">생활방법</th>
                      <td>
                        <a-form-item
                          name=""
                          label="생활방법"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntLfMthdNm"
                            :maxlength="30"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">월수입</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.aplcntMmIncmAmt"
                                :maxlength="22"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        내담자와<br class="pc-only" />상대자와의 관례
                      </th>
                      <td>
                        <a-form-item
                          name=""
                          label="내담자와 상대자와의 관례"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.rlprRelNm"
                            :maxlength="22"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">신청분야</th>
                      <td>
                        <a-form-item
                          name=""
                          label="신청분야"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.applFld"
                            :maxlength="22"
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
                <AccordionHead title="피신청인 정보">
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
                    전자접수 신청 피신청인 정보의 성명, 성별, 주소, 실거주지,
                    연락처, 이메일, 연령, 종교, 학력, 경력, 직업, 재산,
                    생활방법, 월수입 입력에관한 표
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
                            :maxlength="30"
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
                          <a-radio-group v-model:value="form.otherGndrCd">
                            <a-radio class="radio-bx" value="01">남</a-radio>
                            <a-radio class="radio-bx" value="02">여</a-radio>
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
                        연락처
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="otherRlprMblTelno"
                            label="연락처"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.otherRlprMblTelno"
                              ref="phoneInputRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <EmailInput
                          v-model="form.otherEmlAddr"
                          ref="mailInputRef"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">생년월일</th>
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
                                  id="write-period-otherRlprBrdt"
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
                              v-for="list in rlgnList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">학력</th>
                      <td>
                        <a-form-item
                          name=""
                          label="학력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.otherAcbgCd"
                          >
                            <a-select-option
                              v-for="list in acbgList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                      <th scope="row">경력</th>
                      <td>
                        <a-form-item
                          name=""
                          label="경력"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherCrrNm"
                            :maxlength="30"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">직업</th>
                      <td>
                        <a-form-item
                          name=""
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            id=""
                            class="common-select"
                            placeholder="선택"
                            v-model:value="form.otherCrcd"
                          >
                            <a-select-option
                              v-for="list in crList"
                              :value="list.value"
                              >{{ list.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                      <th scope="row">재산</th>
                      <td>
                        <a-form-item
                          name=""
                          label="재산"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherPrptAmt"
                            :maxlength="22"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">생활방법</th>
                      <td>
                        <a-form-item
                          name=""
                          label="생활방법"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherLfMthdNm"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">월수입</th>
                      <td>
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <a-form-item
                              name=""
                              label="월수입"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-300px"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="form.otherMmIncmAmt"
                                :maxlength="22"
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
                <AccordionHead title="화해조정 신청 내용" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청 화해조정 신청 내용의 내용 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">내용</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <lazy-data-editor
                          ref="cnRef"
                          :initial-value="form.cn"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="select-result-box mt-20px">
                <div class="check-tit-box">
                  <span class="ico-check-info"></span>
                  <strong
                    >신청인은 대한가정법률복지상담원의 화해조정 서비스를
                    이용하기 위해<br />
                    대면상담이 필수적임을 안내 받았으며, 이에 동의합니다.
                  </strong>
                </div>
                <a-radio-group v-model:value="form.faceDscsnAgreYn">
                  <a-radio class="radio-bx" value="Y">예</a-radio>
                  <a-radio class="radio-bx" value="N"
                    >아니요(‘아니오’로 응답한 경우 조정화해 신청불가)
                  </a-radio>
                </a-radio-group>
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
        <ButtonGroup align="center" class="!mt-50px">
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
@use '~/assets/style/pages/elrcpt/form/ElrcptLqaM';
</style>
