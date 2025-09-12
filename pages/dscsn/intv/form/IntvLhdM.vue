<!--
* 화면명 : 법률홈닥터 면접상담 입력 폼
* 화면ID : LASP_CON_028
* 파일명 : IntvLhdM
* 작성자 : 김정남
* 화면설명 : 법률홈닥터 면접상담 입력 폼 페이지
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
import { reactive } from 'vue';
import axios from 'axios';
import { useInqStore } from '~/stores/inq';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import { useLoginStore } from '~/stores/login';

definePageMeta({
  layout: 'pub2nd'
});

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();

const activeKey = ref([1, 2]);

const { showAlert } = useCustomAlert();

// 필요 데이터 중 입력하지 않고, 이전 페이지 등에서 넘겨받아야 할 데이터 목록
interface defaultFormData {
  inst: string;
  instNo: string;
  date: string;
  time: string;
  type: string;
}

const formRef = ref();

const nameRef = ref();
const phoneRef = ref();
const applicationDetailRef = ref();
const targetRef = ref();
const categoryRef = ref();
const caseNoRef = ref();
const caseSelect1Ref = ref();
const caseSelect2Ref = ref();
const caseSelect3Ref = ref();
const caseSelect4Ref = ref();
const caseSelect5Ref = ref();
const selectionCaseRef = ref();
const selectionCaseDetailRef = ref();
const titleRef = ref();
const contentRef = ref();

const refMap: Record<string, Ref<any>> = {
  dscsnAplcntNm: nameRef,
  dscsnAplcntMblTelno: phoneRef,
  rcgPathCd: applicationDetailRef,
  cnslTgt: targetRef,
  tgtType: categoryRef,
  cnslType: caseNoRef,
  cnslTypeDtl1: caseSelect1Ref,
  cnslTypeDtl2: caseSelect2Ref,
  cnslTypeDtl3: caseSelect3Ref,
  cnslTypeDtl4: caseSelect4Ref,
  cnslTypeDtl5: caseSelect5Ref,
  // addCnslType: selectionCaseRef,
  // addCnslTypeDtl: selectionCaseDetailRef,
  dscsnTtl: titleRef,
  dscsnCn: contentRef
};

const rcgPathCdMap = {
  A: '홍보물',
  B: '주변권유',
  C: '인터넷',
  D: '타기관의뢰',
  Z: '기타'
};

const cnslType = ref('');
const caseMap = {
  '1': '민사',
  '2': '가사',
  '3': '형사',
  '4': '행정',
  '5': '기타'
};
const caseSelectMap = {
  1: {
    '1': '근로관계',
    '2': '대여금',
    '3': '손해배상',
    '4': '임대차',
    '5': '회생⋅파산',
    '6': '기타'
  },
  2: {
    '1': '가족관계',
    '2': '양육비',
    '3': '유언⋅상속',
    '4': '이혼',
    '5': '자녀친권',
    '6': '기타'
  },
  3: {
    '1': '가정폭력',
    '2': '성폭력',
    '3': '학교폭력',
    '6': '기타'
  },
  4: {
    '1': '건축물',
    '2': '귀화,체류,출입국 등',
    '3': '기초수급',
    '4': '요양급여',
    '6': '기타'
  },
  5: {
    '1': '개인정보보호법',
    '2': '인권침해',
    '6': '기타'
  }
};

// 폼 항목
const form = reactive({
  dscsnAplcntNm: '',
  dscsnAplcntMblTelno: '',
  smsCert: false,
  inst: '',
  date: '',
  time: '',
  rcgPathCd: [],
  cnslTgt: [],
  tgtType: [],
  cnslType: '',
  cnslTypeDtl: [],
  cnslTypeDtl1: [],
  cnslTypeDtl2: [],
  cnslTypeDtl3: [],
  cnslTypeDtl4: [],
  cnslTypeDtl5: [],
  // addCnslType: '',
  // addCnslTypeDtl: '',
  dscsnTtl: '',
  dscsnCn: ''
});
// 폼 항목

const commonCodeStore = useCommonCodeStore();
const cd2 = 'CO0049';
const { data: codeList2 } = useQuery({
  queryKey: ['code', cd2],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

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

// 고정으로 입력되어야 할 데이터(이 데이터들은 수정되어선 안됨)
onMounted(() => {
  selectUserInfo();
});

const caseEvent = (event) => {
  form.cnslType = event.target.value;
  cnslType.value = caseMap[event.target.value] || '';
  form.cnslTypeDtl1 = [];
  form.cnslTypeDtl2 = [];
  form.cnslTypeDtl3 = [];
  form.cnslTypeDtl4 = [];
  form.cnslTypeDtl5 = [];
  cnslTypeDtl.value = [];
};

watch(
  () => [
    form.cnslType,
    form.cnslTypeDtl1,
    form.cnslTypeDtl2,
    form.cnslTypeDtl3,
    form.cnslTypeDtl4,
    form.cnslTypeDtl5
  ],
  () => {
    const no = form.cnslType;
    const selectedList = form[`cnslTypeDtl${no}`] || [];
    const map = caseSelectMap[no] || {};

    form.cnslTypeDtl = selectedList.map((val) => map[val] || '');
  },
  { immediate: true, deep: true }
);

// const changePath = (event) => {
//   rcgPathCd.value = event.target.value;
// };

const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntNm: [valid.required()],
  dscsnAplcntMblTelno: [valid.required(), valid.mobile()],
  rcgPathCd: [valid.required()],
  cnslTgt: [valid.required()],
  tgtType: [valid.required()],
  cnslType: [
    valid.required(),
    {
      validator: (_, value) => {
        const selected = value?.toString?.();
        if (!selected) {
          return Promise.reject('상담유형을 선택해주세요.');
        }

        // caseSelectX 중 선택된 항목 확인
        const map = {
          '1': form.cnslTypeDtl1,
          '2': form.cnslTypeDtl2,
          '3': form.cnslTypeDtl3,
          '4': form.cnslTypeDtl4,
          '5': form.cnslTypeDtl5
        };

        const selectedDetail = map[selected] || [];

        if (!selectedDetail.length) {
          return Promise.reject('상담유형의 상세항목을 1개 이상 선택해주세요.');
        }

        return Promise.resolve();
      },
      trigger: ['change', 'blur']
    }
  ],
  // addCnslType: [valid.required()],
  // addCnslTypeDtl: [valid.required()],
  dscsnTtl: [valid.required()],
  dscsnCn: [
    valid.required(),
    { max: 4000, message: '4000자 이내로 입력하세요.' }
  ]
};

/**
 * name : submitIntvLawhdForm
 * desc : 대한변협법률구조재단 사이버상담 신청 데이터 저장
 */
const submitIntvLawhdForm = async () => {
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
      formData.append('instNo', 'I054000000');
      formData.append('dscsnSeCd', '1');
      formData.append('prSttsCd', 'D01');

      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });

      const splitCd = form.rcgPathCd.join(',').split(',');
      let cdNm = '';
      for (let i = 0; i < splitCd.length; i++) {
        cdNm += rcgPathCdMap[splitCd[i]];
        cdNm += ',';
      }
      cdNm = cdNm.substring(0, cdNm.lastIndexOf(','));
      formData.append('rcgPathCdNm', cdNm); // 인지경로/신청경위

      formData.append('rlprRelNm', form.cnslTgt.join(',')); // 상담대상

      let smsRcptnAgreYn = 'N';
      if (form.smsCert) smsRcptnAgreYn = 'Y';
      formData.append('smsRcptnAgreYn', smsRcptnAgreYn);

      const response = await axios.post(
        '/api/dscsn/insertIntvLhdAply',
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
        if (errField == 'dscsnAplcntMblTelno') {
          const ref = refMap[errField].value;
          if (!ref.first) {
            ref.firstFocus?.(); // select가 선택되지 않은 경우
          } else {
            ref.focus?.(); // 입력란으로 포커스
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

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
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
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          :breadcrumbTitle="`면접상담`"
        />
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          법률홈닥터 면접상담 상세정보
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
                    상담예약 기본정보의 성명, 휴대전화번호, 상담예약시간,
                    신청경위 입력에관한 표
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
                          name="dscsnAplcntNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnAplcntNm"
                            :maxlength="100"
                            ref="nameRef"
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
                                ref="phoneRef"
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
                    </tr>
                    <tr>
                      <th scope="row">상담예약시간</th>
                      <td>
                        <span class="is-emphasis">
                          [대한법률구조공단] 인천지부 2025.04.10 11:00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        신청경위
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="rcgPathCd"
                          label="신청경위"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-checkbox-group
                            v-model:value="form.rcgPathCd"
                            ref="applicationDetailRef"
                          >
                            <a-checkbox class="check-bx" value="B" name="type"
                              >주변권유</a-checkbox
                            >
                            <a-checkbox class="check-bx" value="D" name="type"
                              >타기관의뢰</a-checkbox
                            >
                            <a-checkbox class="check-bx" value="A" name="type"
                              >홍보물</a-checkbox
                            >
                            <a-checkbox class="check-bx" value="C" name="type"
                              >인터넷</a-checkbox
                            >
                            <a-checkbox class="check-bx" value="Z" name="type"
                              >기타</a-checkbox
                            >
                          </a-checkbox-group>
                        </a-form-item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
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
                    면접상담 상담내용입력의 상담대상, 대상자유형, 상담 유형
                    (기본선택), 상담 유형 (추가선택), 제목, 내용 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        상담대상
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="cnslTgt"
                          label="상담대상"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-checkbox-group
                            v-model:value="form.cnslTgt"
                            ref="targetRef"
                          >
                            <a-checkbox
                              class="check-bx"
                              value="본인"
                              name="type"
                              >본인</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="가족"
                              name="type"
                              >가족</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="지인"
                              name="type"
                              >지인</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="기타"
                              name="type"
                              >기타</a-checkbox
                            >
                          </a-checkbox-group>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        대상자유형
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="tgtType"
                          label="대상자유형"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-checkbox-group
                            v-model:value="form.tgtType"
                            ref="categoryRef"
                          >
                            <a-checkbox
                              class="check-bx"
                              value="결혼이주여성"
                              name="type"
                            >
                              결혼이주여성
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="기초생활수급자"
                              name="type"
                            >
                              기초생활수급자
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="독거노인"
                              name="type"
                            >
                              독거노인
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="독립유공자후손"
                              name="type"
                            >
                              독립유공자후손
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="범죄피해자"
                              name="type"
                            >
                              범죄피해자
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="북한이탈주민"
                              name="type"
                            >
                              북한이탈주민
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="장애인"
                              name="type"
                            >
                              장애인
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="한부모가정"
                              name="type"
                            >
                              한부모가정
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="기타"
                              name="type"
                            >
                              기타
                            </a-checkbox>
                            <a-checkbox
                              class="check-bx"
                              value="차상위계층"
                              name="type"
                            >
                              차상위계층
                            </a-checkbox>
                          </a-checkbox-group>
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        상담 유형 (기본선택)
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="cnslType"
                          label="대상자유형"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-radio-group
                            v-model:value="form.cnslType"
                            @change="caseEvent"
                            ref="caseNoRef"
                          >
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="1"
                                >민사 :
                              </a-radio>
                              <a-checkbox-group
                                v-model:value="form.cnslTypeDtl1"
                                :disabled="form.cnslType !== '1'"
                                ref="caseSelect1Ref"
                              >
                                <a-checkbox
                                  class="check-bx"
                                  value="1"
                                  name="type"
                                >
                                  근로관계
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="2"
                                  name="type"
                                >
                                  대여금
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="3"
                                  name="type"
                                >
                                  손해배상
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="4"
                                  name="type"
                                >
                                  임대차
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="5"
                                  name="type"
                                >
                                  회생⋅파산
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="6"
                                  name="type"
                                >
                                  기타
                                </a-checkbox>
                              </a-checkbox-group>
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="2"
                                >가사 :
                              </a-radio>
                              <a-checkbox-group
                                v-model:value="form.cnslTypeDtl2"
                                :disabled="form.cnslType !== '2'"
                                ref="caseSelect2Ref"
                              >
                                <a-checkbox
                                  class="check-bx"
                                  value="1"
                                  name="type"
                                >
                                  가족관계
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="2"
                                  name="type"
                                >
                                  양육비
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="3"
                                  name="type"
                                >
                                  유언⋅상속
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="4"
                                  name="type"
                                >
                                  이혼
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="5"
                                  name="type"
                                >
                                  자녀친권
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="6"
                                  name="type"
                                >
                                  기타
                                </a-checkbox>
                              </a-checkbox-group>
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="3"
                                >형사 :
                              </a-radio>
                              <a-checkbox-group
                                v-model:value="form.cnslTypeDtl3"
                                :disabled="form.cnslType !== '3'"
                                ref="caseSelect3Ref"
                              >
                                <a-checkbox
                                  class="check-bx"
                                  value="1"
                                  name="type"
                                >
                                  가정폭력
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="2"
                                  name="type"
                                >
                                  성폭력
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="3"
                                  name="type"
                                >
                                  학교폭력
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="6"
                                  name="type"
                                >
                                  기타
                                </a-checkbox>
                              </a-checkbox-group>
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="4"
                                >행정 :
                              </a-radio>
                              <a-checkbox-group
                                v-model:value="form.cnslTypeDtl4"
                                :disabled="form.cnslType !== '4'"
                                ref="caseSelect4Ref"
                              >
                                <a-checkbox
                                  class="check-bx"
                                  value="1"
                                  name="type"
                                >
                                  건축물
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="2"
                                  name="type"
                                >
                                  귀화,체류,출입국 등
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="3"
                                  name="type"
                                >
                                  기초수급
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="4"
                                  name="type"
                                >
                                  요양급여
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="6"
                                  name="type"
                                >
                                  기타
                                </a-checkbox>
                              </a-checkbox-group>
                            </div>
                            <div class="radio-group-box">
                              <a-radio class="radio-bx" value="5"
                                >기타 :
                              </a-radio>
                              <a-checkbox-group
                                v-model:value="form.cnslTypeDtl5"
                                :disabled="form.cnslType !== '5'"
                                ref="caseSelect5Ref"
                              >
                                <a-checkbox
                                  class="check-bx"
                                  value="1"
                                  name="type"
                                >
                                  개인정보보호법
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="2"
                                  name="type"
                                >
                                  인권침해
                                </a-checkbox>
                                <a-checkbox
                                  class="check-bx"
                                  value="6"
                                  name="type"
                                >
                                  기타
                                </a-checkbox>
                              </a-checkbox-group>
                            </div>
                          </a-radio-group>
                        </a-form-item>
                      </td>
                    </tr>
                    <!--                    <tr>-->
                    <!--                      <th scope="row">-->
                    <!--                        상담 유형 (추가선택)-->
                    <!--                        <span class="red-span">-->
                    <!--                          *<span class="sr-only">필수 입력 항목</span>-->
                    <!--                        </span>-->
                    <!--                      </th>-->
                    <!--                      <td>-->
                    <!--                        <div class="selct-form-box">-->
                    <!--                          <a-form-item-->
                    <!--                            name="addCnslType"-->
                    <!--                            label="상담 유형 (추가선택)"-->
                    <!--                            :labelCol="{ class: 'sr-only w-auto' }"-->
                    <!--                            class="w-auto"-->
                    <!--                          >-->
                    <!--                            <a-select-->
                    <!--                              id=""-->
                    <!--                              class="common-select"-->
                    <!--                              placeholder="선택"-->
                    <!--                              v-model:value="form.addCnslType"-->
                    <!--                              ref="selectionCaseRef"-->
                    <!--                            >-->
                    <!--                              <a-select-option value="1"-->
                    <!--                                >상담 유형</a-select-option-->
                    <!--                              >-->
                    <!--                              <a-select-option value="2"-->
                    <!--                                >상담 유형2</a-select-option-->
                    <!--                              >-->
                    <!--                            </a-select>-->
                    <!--                          </a-form-item>-->
                    <!--                          <a-form-item-->
                    <!--                            name="addCnslTypeDtl"-->
                    <!--                            label="상담 유형 (추가선택) 상세"-->
                    <!--                            :labelCol="{ class: 'sr-only' }"-->
                    <!--                            class="w-auto"-->
                    <!--                          >-->
                    <!--                            <a-select-->
                    <!--                              id=""-->
                    <!--                              class="common-select"-->
                    <!--                              placeholder="선택"-->
                    <!--                              v-model:value="form.addCnslTypeDtl"-->
                    <!--                              ref="selectionCaseDetailRef"-->
                    <!--                            >-->
                    <!--                              <a-select-option value="1"-->
                    <!--                                >상담 유형</a-select-option-->
                    <!--                              >-->
                    <!--                              <a-select-option value="2"-->
                    <!--                                >상담 유형2</a-select-option-->
                    <!--                              >-->
                    <!--                            </a-select>-->
                    <!--                          </a-form-item>-->
                    <!--                        </div>-->
                    <!--                      </td>-->
                    <!--                    </tr>-->
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

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton
            variants="primary"
            width="xs"
            @click="submitIntvLawhdForm"
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
@use 'assets/style/pages/dscsn/intv/form/IntvLawhdM';
</style>
