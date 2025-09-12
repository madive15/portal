<!--
 * 화면명 : 전자접수신청_대한변협법률구조재단 입력폼
 * 화면ID : LASP_ELE_016
 * 파일명 : ElrcptLegalaidM
 * 작성자 : 김정남
 * 화면 설명 : 대한변협법률구조재단 입력폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.19  김정남   최초생성
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
import RrnoInput from '~/components/common/RrnoInputRules.vue';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import * as elrcptApis from '~/composables/elrcpt';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import LegalaidAssetRelRmkPopup from '~/components/common/LegalaidAssetRelRmkPopup.vue';
import { useLoginStore } from '~/stores/login';
import ElrcptFile from '~/components/common/ElrcptFile.vue';
import { FileUploadRowData } from '~/components/data/docAtchfileRow.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'pub2nd'
});
let addrKey = 0;
let bFileView = false;
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const activeKey = ref([1, 2, 3, 4, 5, 6, 7, 8]);

const route = useRoute();
const { showAlert } = useCustomAlert();

const commonCodeStore = useCommonCodeStore();

// 직업코드 호출
const crcd = 'CO0048';
const { data: crCdList } = useQuery({
  queryKey: ['code', crcd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

// 사건종류 호출
const caseCd = 'CO0073';
const { data: caseCdList } = useQuery({
  queryKey: ['code', caseCd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

// 모바일 여부
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
};

onBeforeMount(() => {
  window.removeEventListener('resize', checkScreenSize);

  if (authenticated.value) {
    bFileView = route.query.status === 'V';

    if (route.query.incdntAplyNo === undefined) {
      // 신규라면 자가진단번호를 받고 조회한다.
      if (route.query.slfDgnsNo != undefined) {
        form.slfDgnsNo = route.query.slfDgnsNo;
      } else {
        form.slfDgnsNo = 'J25081300002'; // 자가진단번호가 없는 경우 테스트를 위해 임시로 넣는다.
      }
      selectUserInfo(); // 신규인 경우 사용자 정보를 조회한다.
      selectSlfdgnsInfo(form.slfDgnsNo);
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

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  // 사건신청번호가 들어온다면 조회한다.
});

// 접수 폼 상단 사건, 대상자, 기준소득 항목 입력
const incdnt = ref<string>(''); // 사건
const instatrpr = ref<string>(''); // 대상자
const mdicm = ref<string>(''); // 기준소득

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();
  form.aplcntRlprNm = response.data.mbrNm;
  form.aplcntMblTelno = response.data.mbrMblTelno;
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

const formRef = ref();
const incdntExplnRef = ref();
const evdcRef = ref();

// 가족관계 항목 행추가,삭제를 위한 작성
const femRelList = ref([
  { name: '', relation: '', age: '', job: '', income: '', cohabit: '' }
]);

const fileRef = ref(null);

const aplyFileList = ref<FileUploadRowData[]>([]);

// form 선언
const form = reactive({
  atchFileId: '',
  status: '',
  incdntAplyNo: '', // 사건신청번호
  instNo: 'I004000000', // 기관번호
  aplyDt: '', // 신청일자
  aplyPrgrsSttsCd: '', // 신청진행상태
  slfDgnsNo: '', // 자가진단번호
  prvcClctUtztnPrpsAgreYn: 'Y', // 개인정보수집이용동의
  tdptyPvsnAgreYn: 'Y', // 제3자제공동의
  prvcPrcsAgreYn: 'Y', // 개인정보처리동의여부
  indvPvsnAgreYn: 'N', // 개인제공동의여부

  // 신청인 정보
  aplcntRlprSeCd: 'I001', // 신청인 구분
  aplcntRlprSeq: '1', // 신청인 순서
  aplcntTrprSeCd: 'J002', // 대상자구분
  aplcntRlprNm: '', // 신청인 성명
  aplcntRlprRrno: '', // 신청인 주민등록번호
  aplcntZip: '', // 신청인 우편번호
  aplcntAddr: '', // 신청인 주소
  aplcntDaddr: '', // 신청인 상세주소
  aplcntMblTelno: '', // 신청인 휴대폰
  aplcntCrCd: '', // 신청인 직업코드
  aplcntMpAstAmt: '', // 신청인 동산자산
  aplcntRestAstAmt: '', // 신청인 부동산자산
  aplcntMmIncmAmt: '', // 신청인 월수입

  // 상대자 정보
  otherRlprSeCd: 'I002', // 상대자 구분
  otherRlprSeq: '2', // 상대자 순서
  otherTrprSeCd: 'J002', // 대상자구분
  otherRlprNm: '', // 상대자 성명
  otherRlprBrdt: '', // 상대자 생년월일
  otherZip: '', // 상대자 우편번호
  otherAddr: '', // 상대자 주소
  otherDaddr: '', // 상대자 상세주소
  otherMblTelno: '', // 상대자 휴대폰
  otherCrCd: '', // 상대자 직업코드
  otherPrptAmt: '', // 상대자 자산
  otherMmIncmAmt: '', // 상대자 월수입

  // 사건정보
  incdntNm: '', // 사건명
  caseCd: '', // 사건종류
  caseNo: '', // 재판 사건번호
  incdntExpln: '', // 사건개요
  evdc: '', // 증거

  // 가족관계
  femRel: '',

  // 신청인의 월수입
  mmIncmAmt: '',
  mmIncmDtl: '',
  bnfcYn: '',

  // 신청인의 주거
  housType: '', // 주거형태
  housTypeEtc: '', // 주거형태(기타) 입력내용
  housOwnType: '', // 주거소유형태
  housOwnNm: '', // 주거소유자(신청인 또는 가족소유일 때)
  housDpst: '', // 보증금
  housRentAmt: '', // 월세
  housOwnEtc: '', // 주거소유자(기타) 입력항목

  // 신청인과 가족이 보유한 재산내역
  restAstAmt: '', // 부동산
  dpstAstAmt: '', // 예금
  vhclAstAmt: '', // 자동차
  pensAstAmt: '', // 연금
  etcAstAmt: '', // 기타

  notiCnfrmAgreYn: '', // 무료법률구조사업 이용자 고지사항 확인
  instNm: '', // 상담소 이름
  otherTel1: '', // 연락처
  rprsvNm: '', // 대표자명

  rlprNm: '', // 신청인명
  otherTel2: '', // 연락처

  frstRgtrId: ''
});

const formRules: Record<string, RuleObject[]> = {
  aplcntRlprNm: [valid.required()],
  aplcntRlprRrno: [valid.required(), valid.rlprRrno()],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntMblTelno: [valid.required(), valid.mobile()],
  otherRlprNm: [valid.required()],
  otherRlprBrdt: [valid.required()],
  otherAddressGroup: [valid.addressGroup(form, 'otherZip', 'otherAddr')],
  otherMblTelno: [valid.required(), valid.mobile()],
  incdntNm: [valid.required()],
  caseCd: [valid.required()]
};

/**
 * name : changeHousType
 * desc :주거형태 변경 시 기타 입력칸 빈칸으로 변경
 */
const changeHousType = (e) => {
  if (e.target.value != '06') {
    form.housTypeEtc = '';
  }
};

/**
 * name : changeHousOwnType
 * desc : 소유관계 변경 시 해당 항목 외 입력칸 빈칸으로 변경
 */
const changeHousOwnType = (e) => {
  if (e.target.value != '01') {
    form.housOwnNm = '';
  }

  if (e.target.value != '02' && e.target.value != '03') {
    form.housDpst = '';
  }

  if (e.target.value != '03') {
    form.housRentAmt = '';
  }

  if (e.target.value != '04') {
    form.housOwnEtc = '';
  }
};

/**
 * name : clickAddFemRel
 * desc : 가족관계 행추가 버튼 이벤트
 */
const clickAddFemRel = () => {
  // alert('행추가');
  femRelList.value.push({
    name: '',
    relation: '',
    age: '',
    job: '',
    income: '',
    cohabit: ''
  });
};

/**
 * name : clickRemoveFemRel
 * desc : 가족관계 행삭제 버튼 이벤트
 */
const clickRemoveFemRel = () => {
  if (femRelList.value.length > 0) {
    femRelList.value.pop(); // 마지막 행 삭제
  } else {
    alert('삭제할 행이 존재하지 않습니다.');
  }
};

/**
 * name : changeOtherRlprBrdt
 * desc : 날짜 변경 핸들러 (상대방 생년월일)
 */
const otherRlprBrdt = ref<Date | null>(null);
const onOtherRlprBrdt = (val: Date | null) => {
  if (val) {
    form.otherRlprBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

/**
 * name : tmprStrgBtn
 * desc : 대한변협법률구조재단 전자접수 신청 데이터 임시저장
 */
const tmprStrgBtn = async () => {
  if (incdntExplnRef.value != undefined) {
    if (incdntExplnRef.value.getTextValue().trim() !== '') {
      form.incdntExpln = incdntExplnRef.value.getValue();
    }
  }

  if (evdcRef.value != undefined) {
    if (evdcRef.value.getTextValue().trim() !== '') {
      form.evdc = evdcRef.value.getValue();
    }
  }

  await formRef.value.validate();

  if (form.prvcPrcsAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `개인정보처리에 동의해주셔야 합니다.`
    });
    return;
  }

  if (form.indvPvsnAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `개인제공동의여부에 동의해주셔야 합니다.`
    });
    return;
  }

  if (form.notiCnfrmAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `무료법률구조사업 이용자 고지사항 확인에 동의해주셔야 합니다.`
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
    form.aplyPrgrsSttsCd = 'A01'; //임시저장
    // insertForm();
    fileRef.value.transferFiles();
  }
};

/**
 * name : insertBtn
 * desc : 대한변협법률구조재단 전자접수 신청 데이터 저장
 */
const insertBtn = async () => {
  if (incdntExplnRef.value != undefined) {
    if (incdntExplnRef.value.getTextValue().trim() !== '') {
      form.incdntExpln = incdntExplnRef.value.getValue();
    }
  }

  if (evdcRef.value != undefined) {
    if (evdcRef.value.getTextValue().trim() !== '') {
      form.evdc = evdcRef.value.getValue();
    }
  }

  await formRef.value.validate();

  if (form.prvcPrcsAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `개인정보처리에 동의해주셔야 합니다.`
    });
    return;
  }

  if (form.indvPvsnAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `개인제공동의여부에 동의해주셔야 합니다.`
    });
    return;
  }

  if (form.notiCnfrmAgreYn !== 'Y') {
    showAlert({
      icon: 'warning',
      html: `무료법률구조사업 이용자 고지사항 확인에 동의해주셔야 합니다.`
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
 * name : insertForm
 * desc : 데이터 저장.
 */
const insertForm = async () => {
  const formData = new FormData();

  const today = new Date();
  const aplyDt = today.toISOString().slice(0, 10).replace(/-/g, '');
  form.aplyDt = aplyDt;

  insertFemRel();

  //선언된 값을 append로 넣어준다.
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });
  formData.append('IncdntFileList', JSON.stringify(aplyFileList.value));

  const response = await useAxios().post(
    '/api/elrcpt/legalaid/insertLegalaidForm',
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
 * name : insertFemRel
 * desc : 가족관계를 json 형태로 변환하여 저장
 */
const insertFemRel = () => {
  // 가족관계 항목을 배열형태로 만들고, json 타입으로 저장
  // 1) 배열 -> {'1': {...}, '2': {...}} 형태로 변환
  const members: Record<string, FemRelRow> = femRelList.value.reduce(
    (acc, row, idx) => {
      acc[(idx + 1).toString()] = {
        name: row.name ?? '',
        relation: row.relation ?? '',
        age: row.age ?? '',
        job: row.job ?? '',
        income: row.income ?? '',
        cohabit: row.cohabit ?? ''
      };
      return acc;
    },
    {} as Record<string, FemRelRow>
  );

  // 필요 시: 공백 트림
  Object.values(members).forEach((m) => {
    m.name = m.name?.trim();
    m.relation = m.relation?.trim();
    m.age = m.age?.trim();
    m.job = m.job?.trim();
    m.income = m.income?.trim();
    m.cohabit = m.cohabit?.trim();
  });

  const jsonText = JSON.stringify(members);
  form.femRel = jsonText;
};

/**
 * name : showRmk
 * desc : 재산관계진술서 작성시 유의사항 팝업
 */
const modalRef = ref<InstanceType<typeof LegalaidAssetRelRmkPopup>>();
const showRmk = () => {
  modalRef.value?.open();
};

const transferSuccessHandle = async (fileList) => {
  aplyFileList.value = fileList;

  // if (form.status == 'U') {
  //   updateForm();
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
          대한변협법률구조재단 전자접수 신청
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
                    전자접수 신청 신청인 정보의 성명, 주민번호, 주소, 핸드폰,
                    직업, 자산 입력에관한 표
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
                        주민번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="aplcntRlprRrno"
                            label="주민번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <RrnoInput v-model="form.aplcntRlprRrno" />
                          </a-form-item>
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
                              ref="phoneRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">직업</th>
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
                              v-for="job in crCdList"
                              :value="job.value"
                              >{{ job.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">자산</th>
                      <td colspan="3">
                        <div class="txt-form-box">
                          <div class="txt-form">
                            <span class="pre-txt" v-if="!isMobile">
                              동&nbsp;&nbsp;&nbsp;산
                            </span>
                            <a-form-item
                              name=""
                              label="자산-동산"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-280px"
                            >
                              <a-input
                                class="text-bx"
                                :placeholder="isMobile ? '동산' : ''"
                                :maxlength="22"
                                v-model:value="form.aplcntMpAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                          <div class="txt-form">
                            <span class="pre-txt" v-if="!isMobile">부동산</span>
                            <a-form-item
                              name=""
                              label="자산-부동산"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-280px"
                            >
                              <a-input
                                class="text-bx"
                                :placeholder="isMobile ? '부동산' : ''"
                                :maxlength="22"
                                v-model:value="form.aplcntRestAstAmt"
                              />
                            </a-form-item>
                            <span class="txt">원</span>
                          </div>
                          <div class="txt-form">
                            <span class="pre-txt" v-if="!isMobile">월수입</span>
                            <a-form-item
                              name=""
                              label="자산-월수입"
                              :labelCol="{ class: 'sr-only' }"
                              class="!w-200px lg:!w-280px"
                            >
                              <a-input
                                class="text-bx"
                                :placeholder="isMobile ? '월수입' : ''"
                                :maxlength="22"
                                v-model:value="form.aplcntMmIncmAmt"
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
                    전자접수 신청 상대방 정보의 성명, 생년월일, 주소, 핸드폰,
                    직업, 자산, 월수입 입력에관한 표
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
                        생년월일
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
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
                              v-model="otherRlprBrdt"
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
                      <th scope="row">
                        주소
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <div class="form-item__addr">
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
                        </div>
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
                            name="otherMblTelno"
                            label="휴대전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.otherMblTelno"
                              ref="phoneRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                      <th scope="row">직업</th>
                      <td>
                        <a-form-item
                          name=""
                          label="직업"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-select
                            class="common-select"
                            v-model:value="form.otherCrCd"
                          >
                            <a-select-option
                              v-for="job in crCdList"
                              :value="job.value"
                              >{{ job.text }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">자산</th>
                      <td>
                        <a-form-item
                          name=""
                          label="자산"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.otherPrptAmt"
                            :maxlength="22"
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
                    전자접수 신청 사건정보의 사건명, 사건의 종류, 신청 관련 재판
                    사건번호, 사건의 개요, 증거 입력에관한 표
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
                            :maxlength="100"
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
                        <a-form-item
                          name="caseCd"
                          label="사건의 종류"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-radio-group v-model:value="form.caseCd">
                            <a-radio
                              v-for="caseCd in caseCdList"
                              class="radio-bx"
                              :value="caseCd.value"
                              >{{ caseCd.text }}</a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">신청 관련 재판 사건번호</th>
                      <td>
                        <a-form-item
                          name=""
                          label="신청 관련 재판 사건번호"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.caseNo"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">사건의 개요</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <lazy-data-editor
                          ref="incdntExplnRef"
                          :initial-value="form.incdntExpln"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">증거</th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <lazy-data-editor
                          ref="evdcRef"
                          :initial-value="form.evdc"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="4">
              <template #header>
                <AccordionHead title="가족관계" />
              </template>
              <div class="receipt-submit-box">
                <div class="submit-top mt-20px">
                  <div class="top-txt">
                    <span class="flag">선택</span> 추가버튼을 클릭하여
                    가족관계를 추가해서 등록하세요.
                  </div>
                  <div class="top-btns">
                    <button
                      type="button"
                      class="btn add"
                      @click="clickAddFemRel"
                    >
                      행추가
                    </button>
                    <button
                      type="button"
                      class="btn del"
                      @click="clickRemoveFemRel"
                    >
                      행삭제
                    </button>
                  </div>
                </div>
                <div class="table-box-wrap">
                  <button class="form-info-bt" type="button" @click="showRmk">
                    <span>작성시 유의사항</span>
                  </button>
                  <LegalaidAssetRelRmkPopup
                    :width="1100"
                    :full="true"
                    ref="modalRef"
                  />
                  <div class="table-box">
                    <table>
                      <caption>
                        전자접수 신청 가족관계의 성명, 신청인과 관계, 나이,
                        직업, 월수입, 동거여부 입력에관한 표
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">성명</th>
                          <th scope="col">신청인과 관계</th>
                          <th scope="col">나이</th>
                          <th scope="col">직업</th>
                          <th scope="col">월수입</th>
                          <th scope="col">동거여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, index) in femRelList" :key="index">
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '성명' : ''"
                              v-model:value="row.name"
                              :maxlength="30"
                            />
                          </td>
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '신청인과 관계' : ''"
                              v-model:value="row.relation"
                              :maxlength="30"
                            />
                          </td>
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '나이' : ''"
                              v-model:value="row.age"
                              :maxlength="10"
                            />
                          </td>
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '직업' : ''"
                              v-model:value="row.job"
                              :maxlength="30"
                            />
                          </td>
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '월수입' : ''"
                              v-model:value="row.income"
                              :maxlength="100"
                            />
                          </td>
                          <td class="title-td">
                            <a-input
                              class="text-bx"
                              :placeholder="isMobile ? '동거여부' : ''"
                              v-model:value="row.cohabit"
                              :maxlength="30"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem key="5">
              <template #header>
                <AccordionHead title="신청인의 월수입" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청 신청인의 월수입의 금액, 내역, 수급권자여부
                    입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">금액</th>
                      <td>
                        <a-form-item
                          name=""
                          label="금액"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.mmIncmAmt"
                            :maxlength="22"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">내역</th>
                      <td>
                        <a-form-item
                          name=""
                          label="내역"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.mmIncmDtl"
                            :maxlength="22"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">수급권자여부</th>
                      <td colspan="3">
                        <a-radio-group v-model:value="form.bnfcYn">
                          <a-radio class="radio-bx" value="Y"
                            >국민기초생활보장법상의 수급권자임</a-radio
                          >
                          <a-radio class="radio-bx" value="N"
                            >수급권자 아님</a-radio
                          >
                        </a-radio-group>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="6">
              <template #header>
                <AccordionHead title="신청인의 주거" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청 신청인의 주거의 형태, 소유관계 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">형태</th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group
                            v-model:value="form.housType"
                            @change="changeHousType"
                          >
                            <div class="step-group">
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="01"
                                  >아파트</a-radio
                                >
                              </div>
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="02"
                                  >단독주택</a-radio
                                >
                              </div>
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="03"
                                  >다가구주택</a-radio
                                >
                              </div>
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="04"
                                  >연립주택</a-radio
                                >
                              </div>
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="05"
                                  >다세대주택</a-radio
                                >
                              </div>
                            </div>
                            <div class="step-group">
                              <div class="radio-group-box wide">
                                <a-radio class="radio-bx" value="06"
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
                                      v-model:value="form.housTypeEtc"
                                      :readonly="form.housType != '06'"
                                      :maxlength="30"
                                    />
                                  </a-form-item>
                                </div>
                              </div>
                            </div>
                          </a-radio-group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">소유관계</th>
                      <td>
                        <div class="radio-group-wrap">
                          <a-radio-group
                            v-model:value="form.housOwnType"
                            @change="changeHousOwnType"
                          >
                            <div class="step-group">
                              <div class="radio-group-box wide">
                                <a-radio class="radio-bx" value="01"
                                  >신청인 또는 가족 소유</a-radio
                                >
                                <div class="radio-input-group">
                                  <div class="txt-form-box">
                                    <div class="txt-form">
                                      <span v-if="!isMobile" class="pre-txt"
                                        >소유자</span
                                      >
                                      <a-form-item
                                        name=""
                                        label="소유자"
                                        :labelCol="{ class: 'sr-only' }"
                                        class="!w-200px lg:!w-280px"
                                      >
                                        <a-input
                                          class="text-bx"
                                          :placeholder="
                                            isMobile ? '소유자' : ''
                                          "
                                          :readonly="form.housOwnType != '01'"
                                          v-model:value="form.housOwnNm"
                                          :maxlength="30"
                                        />
                                      </a-form-item>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="step-group">
                              <div class="radio-group-box">
                                <a-radio class="radio-bx" value="02"
                                  >임대차(전세)</a-radio
                                >
                              </div>
                              <div class="radio-group-box wide">
                                <a-radio class="radio-bx" value="03"
                                  >임대차(월세)</a-radio
                                >
                                <div class="radio-input-group">
                                  <div class="txt-form-box">
                                    <div class="txt-form">
                                      <span v-if="!isMobile" class="pre-txt"
                                        >보증금</span
                                      >
                                      <a-form-item
                                        name=""
                                        label="보증금"
                                        :labelCol="{ class: 'sr-only' }"
                                        class="!w-200px lg:!w-280px"
                                      >
                                        <a-input
                                          class="text-bx"
                                          :placeholder="
                                            isMobile ? '보증금' : ''
                                          "
                                          :readonly="
                                            form.housOwnType != '02' &&
                                            form.housOwnType != '03'
                                          "
                                          v-model:value="form.housDpst"
                                          :maxlength="30"
                                        />
                                      </a-form-item>
                                      <span class="txt">원</span>
                                    </div>
                                    <div class="txt-form">
                                      <span v-if="!isMobile" class="pre-txt"
                                        >월세</span
                                      >
                                      <a-form-item
                                        name=""
                                        label="월세"
                                        :labelCol="{ class: 'sr-only' }"
                                        class="!w-200px lg:!w-280px"
                                      >
                                        <a-input
                                          class="text-bx"
                                          :placeholder="isMobile ? '월세' : ''"
                                          :readonly="form.housOwnType != '03'"
                                          v-model:value="form.housRentAmt"
                                          :maxlength="30"
                                        />
                                      </a-form-item>
                                      <span class="txt">원</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="step-group">
                              <div class="radio-group-box wide">
                                <a-radio class="radio-bx" value="04"
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
                                      v-model:value="form.housOwnEtc"
                                      :readonly="form.housOwnType != '04'"
                                      :maxlength="30"
                                    />
                                  </a-form-item>
                                </div>
                              </div>
                            </div>
                          </a-radio-group>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="7">
              <template #header>
                <AccordionHead title="신청인과 가족들이 보유한 재산내역" />
              </template>
              <div class="common-form__area">
                <table>
                  <caption>
                    전자접수 신청인과 가족들이 보유한 재산내역의 부동산, 예금,
                    자동차, 연금, 기타 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">부동산</th>
                      <td>
                        <a-form-item
                          name=""
                          label="부동산"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.restAstAmt"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">예금</th>
                      <td>
                        <a-form-item
                          name=""
                          label="예금"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dpstAstAmt"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">자동차</th>
                      <td>
                        <a-form-item
                          name=""
                          label="자동차"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.vhclAstAmt"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">연금</th>
                      <td>
                        <a-form-item
                          name=""
                          label="연금"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.pensAstAmt"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">기타</th>
                      <td>
                        <a-form-item
                          name=""
                          label="기타"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.etcAstAmt"
                            :maxlength="100"
                          />
                        </a-form-item>
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

          <div class="receipt-agree-box">
            <div class="agree-content-box">
              <div class="agree-tit">개인정보처리 동의서</div>
              <div class="agree-content">
                <div class="agree-content-in">
                  <div>
                    「의뢰자는 위 기재 법률구조신청과 관련하여
                    대한법률구조공단이 개인정보보호법에서 정한
                    민감정보(건강정보, 고유식별정보(주민등록번호, 외국인등록번호
                    등)가 포함된 자료를 제출받은 경우에 법률구조사무를 수행하기
                    위하여 해당 개인정보를 처리하는데 동의하며, 또한 개인정보
                    보유 및 이용기간은 재판의 문서작성 등 관련 사무의 목적에
                    의하여 처리하여야 하는 자의 개인정보처리에 대한 동의를
                    거부할 권리가 있다는 사실 및 동의 거부 시에 법률구조를 받을
                    수 없는 불이익이 따를 수 있다는 사실을 충분히 설명 듣고
                    이해하여 동의합니다.」
                  </div>
                </div>
              </div>
            </div>
            <div class="guide-box">
              <div class="txt">
                <span class="num">※</span>본인은 상기 내용을 확인하였으며
                동의합니다.
              </div>
              <a-radio-group v-model:value="form.prvcPrcsAgreYn">
                <a-radio class="radio-bx" value="Y">동의합니다.</a-radio>
                <a-radio class="radio-bx" value="N">동의하지 않습니다.</a-radio>
              </a-radio-group>
            </div>
          </div>

          <div class="receipt-agree-box">
            <div class="agree-content-box">
              <div class="agree-tit">개인제공 동의서</div>
              <div class="agree-content">
                <div class="agree-content-in">
                  <div>
                    「의뢰자는 위 기재 법률구조신청과 관련하여
                    대한법률구조공단이 의뢰자로부터 취득한 성명, 주소, 전화번호,
                    법률구조과정 등의 개인정보를 법률구조 수행협조사, 정부기관,
                    무료법률구조절차를 증언기관 등에 제공하여 고객만족도 향상 등
                    정책자료로 활용하도록 하는데 동의하며, 또한 개인정보를
                    제공받는 자의 개인정보 보유 및 이용기간은 형사 또는 준공으로
                    의뢰자의 개인정보를 제공하였다는 것과 개인정보 제공에 대한
                    동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른
                    불이익이 없다는 사실을 충분히 설명 듣고 이해하여
                    동의합니다.」
                  </div>
                </div>
              </div>
            </div>
            <div class="guide-box">
              <div class="txt">
                <span class="num">※</span>본인은 상기 내용을 확인하였으며
                동의합니다.
              </div>
              <a-radio-group v-model:value="form.indvPvsnAgreYn">
                <a-radio class="radio-bx" value="Y">동의합니다.</a-radio>
                <a-radio class="radio-bx" value="N">동의하지 않습니다.</a-radio>
              </a-radio-group>
            </div>
          </div>

          <div class="receipt-agree-box">
            <!--스토킹/데이트 폭력-->
            <div class="agree-content-box">
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
                      권익증진에 기여하며, 피해자에게 무료 법률상담 및 법률구조
                      등 법률지원을 제공함으로써 성폭력 사건을 예방하고,
                      피해자가 침해당한 권리를 구제하고자 합니다.
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
                      않도록 돕는 역할과 스토킹/데이트 폭력 사건의
                      민사·가사소송을 대리합니다. 구조변호사는 법률구조 공단에서
                      위촉하였으며 위촉변호사와의 상담 및 소송은 무료입니다.
                      다만 위촉변호사가 소송 수행 시 발생하는 인지·송달료 등
                      실비는 본인 부담입니다. 위촉변호사의 소송수행이 종료된
                      이후에는 무료 지원이 종료되며, 인지, 송달료를 미납하거나
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
                        만족도조사서’를 작성하시어, 대한법률구조공단(법률구조
                        공단 무료상담전화 : 02-3476-6515)로 연락주시기
                        바랍니다.</strong
                      >
                    </li>
                  </BullList>
                </div>
              </div>
            </div>
            <!--//스토킹/데이트 폭력-->
            <!--성폭력-->
            <div class="agree-content-box" v-if="false">
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
                      <strong>여성가족부 무료법률구조사업은</strong> 성폭력
                      피해자 증가에 따른 피해자 인권보호 및 권익증진에 기여하고,
                      피해자에게 무료 법률상담 및 법률구조 등 법률지원을
                      제공함으로써 성폭력 사건을 예방하고, 피해자가 침해당한
                      권리를 구제하고자 합니다.
                    </li>
                    <li class="!block !text-[15px]">
                      <strong>여성가족부 무료법률구조사업은</strong> 성폭력
                      피해자라면 누구나 지원받을 수 있으며, 구조 범위는 성폭력
                      피해 관련 민사·형사·가사사건, 헌법소원 등을 대리합니다.
                      <strong>무료법률구조제도</strong> 지원받는 과정에서
                      상담사나 변호사와 충분히 협의하여야 하며 피해내용을
                      과장하거나 허위를 알려서는 안됩니다.
                    </li>
                    <li class="!block !text-[15px]">
                      <strong>무료법률구조사업 위촉변호사는</strong> 형사소송을
                      대리하여 형사사건·재판과정에서 피해자의 인권이 침해되지
                      않도록 보호하는 역할과 성폭력 사건의 민사·가사소송을
                      대리합니다. 구조변호인은 대한변호사협회에서 위촉하였으며
                      위촉변호사와의 상담 및 소송은 무료입니다. 다만
                      위촉변호사가 소송을 수행하는 과정 중의 환의에 대해서도
                      다른 수임료 및 성공보수는 받지 않습니다. 사선으로 변호사를
                      이미 선임하였을 경우 지원이 불가합니다. 무료법률구조사업
                      지원은 재판이 확정된 시점에서 종료되며, 인지·송달료를
                      미납하거나 위촉변호사와의 연락이 장기간 되지 않을 경우
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
                        >무료법률구조 신청인은 과도한 소송을 요구할
                        경우,</strong
                      >
                      그에 따른 소송비용을 신청인이 자부담하여야 할 수도
                      있습니다. 또한
                      <strong
                        >패소할 경우, 상대방이 신청인에게 소송비용을
                        청구</strong
                      >할 수 있으므로 이 점을 충분히 고려하여 소송 및 소의 제기
                      여부를 결정해주시기 바랍니다(패소 시 청구 받은 비용은
                      자부담).
                    </li>
                    <li class="!block !text-[15px]">
                      <strong>성폭력 피해자나 피해자 지원기관의 종사자</strong
                      >가 무고, 명예훼손 등으로 피고소될 경우에도 법률구조가
                      지원됩니다.
                    </li>
                    <li class="!block !text-[15px]">
                      <strong
                        >사건이 종료된 후에는 반드시 ‘무료법률구조이용자
                        만족도조사서’를 작성하시어,
                        대한법률구조공단(무료상담전화: 02-3476-6515)로 송부해
                        주시기 바랍니다.</strong
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
                        <a-input
                          class="text-bx"
                          :maxlength="100"
                          v-model:value="form.instNm"
                        />
                      </a-form-item>
                    </td>
                    <th scope="row">연락처</th>
                    <td>
                      <div class="form-item__number">
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.otherTel1"
                        />
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
                        <a-input
                          class="text-bx"
                          v-model:value="form.rprsvNm"
                          :maxlength="30"
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
              <a-radio-group v-model:value="form.notiCnfrmAgreYn">
                <a-radio class="radio-bx" value="Y">동의합니다.</a-radio>
                <a-radio class="radio-bx" value="N">동의하지 않습니다.</a-radio>
              </a-radio-group>
            </div>
            <div class="common-form__area">
              <table>
                <caption>
                  무료법률구조사업 이용자 고지사항 확인 동의서의 신청인 명,
                  연락처 입력에관한 표
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
                        <a-input
                          class="text-bx"
                          v-model:value="form.rlprNm"
                          :maxlength="30"
                        />
                      </a-form-item>
                    </td>
                    <th scope="row">연락처</th>
                    <td>
                      <div class="form-item__number">
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.otherTel2"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
@use '~/assets/style/pages/elrcpt/form/ElrcptLegalaidM';
</style>
