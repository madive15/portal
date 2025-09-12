<!--
 * 화면명 : 전자접수신청_대한상사중재원 국내알선
 * 화면ID : LASP_ELE_020
 * 파일명 : ElrcptKcabM
 * 작성자 : 안태정
 * 화면 설명 : 대한상사중재원 국내알선 입력폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.03  안태정   최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';
import type { ElrIncdntaplyrlprVO } from '~/types/elrcpt';
import EmailInput from '~/components/common/EmailInputRules.vue';
import AddrInput from '~/components/common/AddrInputRules.vue';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import { telephoneNumber } from '~/utils/TextUtils';
import { onMounted, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import axios from 'axios';
import * as dscsnApis from '~/composables/dscsn';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { useAxios } from '~/composables/useAxios';
import ElrcptFile from '~/components/common/ElrcptFile.vue';
import { FileUploadRowData } from '~/components/data/docAtchfileRow.vue';
import { useLoginStore } from '~/stores/login';
definePageMeta({
  layout: 'pub2nd'
});
let addrKey = 0;
let bFileView = false;
const route = useRoute();
//alert창 선언
const { showAlert } = useCustomAlert();
/** 아코디언 전체 열기 */
const activeKey = ref([1, 2, 3, 4, 8]);
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

/** form */
const formRef = ref();

const fileRef = ref(null);

const aplyFileList = ref<FileUploadRowData[]>([]);

onBeforeMount(() => {
  if (authenticated.value) {
    if (route.query.status === 'V') {
      bFileView = true; //뷰상태면 파일다운로드 버튼 표출
    } else {
      bFileView = false;
    }
    form.slfDgnsNo = route.query.slfDgnsNo;
    if (route.query.incdntAplyNo === undefined) {
      selectUserInfo(); //신규일 경우 사용자 정보를 가져온다.
    } else {
      form.incdntAplyNo = route.query.incdntAplyNo;
      form.status = route.query.status;
      selectincdntAplyInfo(); //입력 정보 조회
    }
  } else {
    showAlert({
      icon: 'info',
      html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
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
};

/** form 선언 */
const form = reactive({
  atchFileId: '',
  status: '',
  incdntAplyNo: '',
  instNo: '', // 기관번호 //
  aplyPrgrsSttsCd: '', // 신청진행상태코드
  slfDgnsNo: '', // 자가진단번호 //
  prvcClctUtztnPrpsAgreYn: 'Y', // 개인정보수집이용목적동의여부
  tdptyPvsnAgreYn: 'Y', // 제3자제공동의여부
  casePvsnAgreYn: 'Y', // 사례제공동의여부
  rghtUdsdAgreYn: 'Y', // 권리이해동의여부
  smsRcptnAgreYn: '', // SMS수신동의여부
  emlRcptnAgreYn: '', // 이메일수신동의여부
  faceDscsnAgreYn: '', // 대면상담동의여부
  indvPvsnAgreYn: '', // 개인제공동의여부
  prvcPrcsAgreYn: '', // 개인정보처리동의여부
  aplyDt: '', // 신청일자

  // 신청자 정보
  aplcntRlprNm: '', // 신청인명
  aplcntRprsvNm: '', // 신청인정보 대표자명
  aplcntZip: '', // 신청인우편번호
  aplcntAddr: '', // 신청인주소
  aplcntDaddr: '', // 신청인상세주소
  aplcntPicNm: '', // 신청인정보 담당자명
  aplcntEmlAddr: '', // 신청인이메일주소
  aplcntTelno: '', // 신청인전화번호
  aplcntFxno: '', // 신청인팩스번호
  aplcntMblTelno: '', // 신청인휴대전화번호
  aplcntRlprSeCd: '', // 신청인구분코드 ,
  aplcntRlprSeq: '', // 신청인순서 ,
  // 대리인 정보
  agtRlprNm: '', // 대리인명
  agtMblTelno: '', // 대리인휴대전화번호
  agtZip: '', // 대리인우편번호
  agtAddr: '', // 대리인주소
  agtDaddr: '', // 대리인상세주소
  agtRlprSeCd: '', //대리인구분코드,
  agtRlprSeq: '', //대리인순서,
  // 상대방 정보

  otherRlprNm: '', // 상대방명
  otherRprsvNm: '', // 상대방정보 대표자명
  otherZip: '', // 상대방우편번호
  otherAddr: '', // 상대방주소
  otherDaddr: '', // 상대방상세주소

  otherPicNm: '', // 상대방정보 담당자명
  otherEmlAddr: '', // 상대방이메일주소
  otherTelno: '', // 상대방전화번호
  otherFxno: '', // 상대방팩스번호
  otherMblTelno: '', // 상대방휴대전화번호
  otherRlprSeCd: '', // 상대방구분코드 ,
  otherRlprSeq: '', //상대방순서 ,

  //임시
  delYn: '', //삭제여부
  //신청정보
  trubOcrnRsnKornCnts: '', //분쟁발생사유한글내용
  reqKornCnts: '' //요구사항
});

// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  aplcntRlprNm: [{ required: true, message: '신청인 상호명을 입력해주세요.' }],
  aplcntDaddr: [{ required: true, message: '신청인 주소를 입력해주세요.' }],
  aplcntTelno: [
    {
      validator: (_, value) => {
        if (!value || isValidTelno(value)) {
          return Promise.resolve();
        }
        return Promise.reject('신청인 전화번호의 형식이 올바르지 않습니다.');
      },
      trigger: ['blur', 'change']
    }
  ],
  otherRlprNm: [{ required: true, message: '피신청인 상호명을 입력해주세요.' }],
  otherDaddr: [{ required: true, message: '피신청인 주소를 입력해주세요.' }],
  otherTelno: [
    {
      validator: (_, value) => {
        if (!value || isValidTelno(value)) {
          return Promise.resolve();
        }
        return Promise.reject('피신청인 전화번호의 형식이 올바르지 않습니다.');
      },
      trigger: ['blur', 'change']
    }
  ],
  trubOcrnRsnKornCnts: [
    { required: true, message: '거래 및 분쟁발생 경위를 입력해주세요.' }
  ],
  reqKornCnts: [{ required: true, message: '요구사항을 입력해주세요.' }]
};

/**
 * name : isValidTelno
 * desc : 전화번호의 유효성을 검사한다.
 */
const isValidTelno = (telno: string): boolean => {
  const telnoRegex = /^0\d{1,2}-\d{3,4}-\d{4}$/;
  return telnoRegex.test(telno);
};

/**
 * name : tmprStrgBtn
 * desc : 임시저장버튼 클릭시 신규 저장한다.
 */
const tmprStrgBtn = async () => {
  //insModalRef.value?.open();
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
    fileRef.value.transferFiles();
  }
};

/**
 * name : insertForm
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
    fileRef.value.transferFiles();
  }
};

/**
 * name : updateBtn
 * desc : 수정버튼 클릭시 수정한다.
 */
const updateBtn = async () => {
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
    fileRef.value.transferFiles();
  }
};

const transferSuccessHandle = async (fileList) => {
  aplyFileList.value = fileList;
  if (form.status == 'I') {
    updateForm();
  } else {
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
  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));
  try {
    const response = await axios
      .post('/api/elrcpt/kcab/insertKcabForm', formData)
      .then(() => {
        navigateTo('/elrcpt/ElrcptCmptnInfo');
      });
  } catch (err) {
    console.log('axios failed', err);
  }
};
/**
 * name : updateForm
 * desc : 수정한다.
 */
const updateForm = async () => {
  //폼 데이터
  const formData = new FormData();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });
  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));
  const response = await axios.post(
    '/api/elrcpt/kcab/updateKcabForm',
    formData
  );
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

  const response = await axios.post(
    '/api/elrcpt/kcab/selectKcabAplyInfo',
    formData
  );

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });
  addrKey = addrKey + 1;
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="법률구조신청서"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한상사중재원 전자접수 신청
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
                    전자접수 신청 신청인 정보의 상호명(한글, 성명), 대표자명,
                    주소, 담당자명, 이메일, 전화번호, 팩스번호, 휴대전화,
                    대리인명, 대리인연락처, 대리인주소 입력에관한 표
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
                        상호명(한글, 성명)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name=""
                          label="상호명(한글, 성명)"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntRlprNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">대표자명</th>
                      <td>
                        <a-form-item
                          name=""
                          label="대표자명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntRprsvNm"
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
                          v-model:zip="form.aplcntZip"
                          v-model:addr="form.aplcntAddr"
                          v-model:dAddr="form.aplcntDaddr"
                          :key="addrKey"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">담당자명</th>
                      <td>
                        <a-form-item
                          name=""
                          label="담당자명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.aplcntPicNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <EmailInput v-model="form.aplcntEmlAddr" />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        전화번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.aplcntTelno"
                        />
                      </td>
                      <th scope="row">팩스번호</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.aplcntFxno"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">휴대전화</th>
                      <td colspan="3">
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.aplcntMblTelno"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">대리인명</th>
                      <td>
                        <a-form-item
                          name=""
                          label="대리인명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.agtRlprNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">대리인 연락처</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.agtMblTelno"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">대리인 주소</th>
                      <td colspan="3">
                        <AddrInput
                          v-model:zip="form.agtZip"
                          v-model:addr="form.agtAddr"
                          v-model:dAddr="form.agtDaddr"
                          :key="addrKey"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="피신청인(상대방)정보">
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
                <!-- <a-flex justify="flex-end" class="lg:mt-20px lg:mb-10px">
                <a-checkbox value="" name="type">
                  신청자정보와 동일하면 체크하세요
                </a-checkbox>
              </a-flex> -->
                <table>
                  <caption>
                    전자접수 신청 피신청인(상대방)정보의 상호명(한글, 성명),
                    대표자명, 주소, 담당자명, 이메일, 전화번호, 팩스번호,
                    휴대전화 입력에관한 표
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
                        상호명(한글, 성명)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name=""
                          label="상호명(한글, 성명)"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherRlprNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">대표자명</th>
                      <td>
                        <a-form-item
                          name=""
                          label="대표자명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherRprsvNm"
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
                          v-model:zip="form.otherZip"
                          v-model:addr="form.otherAddr"
                          v-model:dAddr="form.otherDaddr"
                          :key="addrKey"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">담당자명</th>
                      <td>
                        <a-form-item
                          name=""
                          label="담당자명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherPicNm"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <EmailInput v-model="form.otherEmlAddr" />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        전화번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.otherTelno"
                        />
                      </td>
                      <th scope="row">팩스번호</th>
                      <td>
                        <TelNumInput
                          cd-group-id="CO0018"
                          v-model="form.otherFxno"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">휴대전화</th>
                      <td colspan="3">
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.otherMblTelno"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="3">
              <template #header>
                <AccordionHead title="거래 및 분쟁발생 경위">
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
                    전자접수 신청 거래 및 분쟁발생 경위의 거래 및 분쟁발생 경위,
                    요구사항(구체적인 금액으로 표시요망) 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        거래 및<br class="pc-only" />분쟁발생 경위
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-textarea
                          class="textarea-bx"
                          id="textMessage"
                          placeholder="1,000 글자 이내로, 가급적 육하원칙에 맞춰 작성하여 주십시요"
                          v-model:value="form.trubOcrnRsnKornCnts"
                          :maxlength="1000"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        요구사항<br class="pc-only" />(구체적인 금액으로
                        표시요망)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-textarea
                          class="textarea-bx"
                          id="textMessage"
                          placeholder="1,000 글자 이내로, 가급적 육하원칙에 맞춰 작성하여 주십시요"
                          v-model:value="form.reqKornCnts"
                          :maxlength="1000"
                        />
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
              <ElrcptFile
                ref="fileRef"
                :view="bFileView"
                :slfDgnsNo="form.slfDgnsNo"
                :incdntAplyNo="form.incdntAplyNo"
                @callback="transferSuccessHandle"
              ></ElrcptFile>
            </AccordionItem>
          </Accordion>

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
            <CommonButton
              variants="line-primary"
              width="lg"
              @click="tmprStrgBtn"
            >
              임시저장
            </CommonButton>
            <CommonButton variants="primary" width="lg" @click="insertBtn">
              전자접수 신청완료
            </CommonButton>
          </ButtonGroup>
        </a-form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/form/ElrcptKcabM';
</style>
