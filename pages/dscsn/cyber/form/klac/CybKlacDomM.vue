<!--
* 화면명 : 대한법률구조공단 국내 사이버상담 폼
* 화면ID : LASP_CON_029
* 파일명 : CybKlacDomM
* 작성자 : 김정남
* 화면설명 : 대한법률구조공단 국내 사이버상담 페이지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
변경일       변경자       변경내역
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
2025.07.21  김정남       최초생성
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

const commonCodeStore = useCommonCodeStore();
const cd = 'CO0030';
const { data: codeList } = useQuery({
  queryKey: ['code', cd],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const cd2 = 'CO0049';
const { data: codeList2 } = useQuery({
  queryKey: ['code', cd2],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const formRef = ref();
const nameRef = ref();
const telInputRef = ref();
const phoneInputRef = ref();
const rcgPathRef = ref();
const titleRef = ref();
const contentRef = ref();
const passwordRef = ref();
const passwordCheckRef = ref();

const refMap: Record<string, Ref<any>> = {
  dscsnAplcntNm: nameRef,
  dscsnAplcntMblTelno: phoneInputRef,
  rcgPathCd: rcgPathRef,
  wrtr_pswd: passwordRef,
  passwordCheck: passwordCheckRef,
  dscsnTtl: titleRef,
  dscsnCn: contentRef
};

// 폼 항목
const form = reactive({
  dscsnAplyNo: '',
  status: '',
  instNo: 'I001000000',
  dscsnSeCd: '4',
  prSttsCd: 'D01',
  dscsnAplcntNm: '',
  dscsnAplcntTelno: '',
  dscsnAplcntMblTelno: '',
  smsCert: false,
  dscsnAplcntEmlAddr: '',
  emailCert: false,
  wrtr_pswd: '',
  passwordCheck: '',
  rgncd: '',
  rgndetail: '',
  rcgPathCd: '',
  rcgPathCdNm: '',
  dscsnTtl: '',
  dscsnCn: '',
  rlsYn: 'N',
  tdptyPvsnAgreYn: 'N',
  smsRcptnAgreYn: '',
  emlRcptnAgreYn: ''
});
// 폼 항목

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
};

/**
 * name : selectDscsnInfo
 * desc : 등록된 상담정보를 가져온다
 */
const selectDscsnInfo = async () => {
  const formData = new FormData();
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await axios.post('/api/dscsn/selectKlacDomInfo', formData);

  const rcgList = await useAxios().get('/api/dscsn/cmm/selectBrofList', {
    params: {
      comCd: response.data.rgncd,
      instNo: form.instNo
    }
  });

  brofList.value = rcgList.data ?? [];
  resetRgndetailIfInvalid();

  optionsKey.value++;

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });
};

onBeforeMount(() => {
  if (authenticated.value) {
    if (route.query.dscsnAplyNo === undefined) {
      selectUserInfo();
    } else {
      form.dscsnAplyNo = route.query.dscsnAplyNo;
      form.status = route.query.status;
      selectDscsnInfo();
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
 * desc : 인지경로 목록을 가져온다.
 */
const selectRcgPathCd = (event) => {
  const selectedValue = event.target.value;
  form.rcgPathCd = selectedValue;

  const selectedItem = codeList2.value?.find(
    (item) => item.value === selectedValue
  );

  form.rcgPathCdNm = selectedItem?.text || '';
};

const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntNm: [valid.required()],
  dscsnAplcntMblTelno: [valid.required(), valid.mobile()],
  rcgPathCd: [valid.required()],
  dscsnTtl: [valid.required()],
  dscsnCn: [
    valid.required(),
    { max: 4000, message: '4000자 이내로 입력하세요.' }
  ],
  wrtr_pswd: [{ min: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' }],
  passwordCheck: [
    {
      validator: (_, value) => {
        if (value !== form.wrtr_pswd) {
          return Promise.reject('비밀번호가 일치하지 않습니다.');
        }
        return Promise.resolve();
      },
      trigger: ['blur', 'change']
    }
  ]
};

/**
 * name : insertBtn
 * desc : 대한법률구조공단 사이버상담(국내) 신청 데이터 저장
 */
const insertBtn = async () => {
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
        '/api/dscsn/insertCybKlacDomAply',
        formData
      );

      if (response.status == 200) {
        const result = await showAlert({
          icon: 'info',
          html: '상담신청이 완료되었습니다.'
        });

        if (result.isConfirmed) {
          navigateTo(
            '/dscsn/cyber/CyberRsvtCmptnInfo?dscsnAplyNo=' + response.data
          );
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

/**
 * name : updateBtn
 * desc : 대한법률구조공단 사이버상담(국내) 신청 데이터 수정
 */
const updateBtn = async () => {
  if (contentRef.value != undefined) {
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  try {
    await formRef.value.validate();

    const submit = await showAlert({
      icon: 'question',
      html: '작성하신 내용으로 예약내용을 수정하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });

    if (submit.isConfirmed) {
      const formData = new FormData();
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
        '/api/dscsn/updateCybKlacDomAply',
        formData
      );

      if (response.status == 200) {
        const result = await showAlert({
          icon: 'info',
          html: '상담신청 수정이 완료되었습니다.'
        });

        if (result.isConfirmed) {
          navigateTo(
            '/dscsn/cyber/CyberRsvtCmptnInfo?dscsnAplyNo=' + response.data
          );
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

const brofList = ref([]); // API 결과 담을 배열
const optionsKey = ref(0); // 강제 재렌더용 키

const resetRgndetailIfInvalid = () => {
  const exists = brofList.value.some((it) => it.brofNo === form.rgndetail);
  if (!exists) {
    form.rgndetail = undefined; // 또는 null/'' 프로젝트 규칙에 맞게
  }
};

/**
 * name : changeZone
 * desc : 대한법률구조공단 사이버상담(국내) 방문가능 공단사무소 목록 조회
 */
const changeZone = async (val) => {
  const response = await useAxios().get('/api/dscsn/cmm/selectBrofList', {
    params: {
      comCd: val,
      instNo: form.instNo
    }
  });

  brofList.value = response.data ?? [];
  resetRgndetailIfInvalid();

  // 내부 캐시까지 완전히 초기화하고 싶다면 키 증가
  optionsKey.value++;
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
            <h3>사이버상담</h3>
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
          대한법률구조공단 사이버상담 안내
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              사이버상담 접수 및 답변현황 등 정확한 안내를 위해 휴대전화번호를
              정확히 기입해 주시기 바랍니다.
            </li>
            <li>
              휴대전화번호를 고의로 잘못 기재한 경우 안내를 받으실 수 없으며,
              사이버상담실 이용에 일정한 제한이 있습니다.
            </li>
          </BullList>
        </div>

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
                    사이버상담 기본정보의 성명, 전화번호, 휴대전화번호, 이메일,
                    비밀번호, 비밀번호 확인, 상담예약시간, 방문가능 공단사무소,
                    인지경로 입력에관한 표
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
                            ref="nameRef"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">전화번호</th>
                      <td>
                        <div class="form-item__number">
                          <TelNumInput
                            cd-group-id="CO0018"
                            v-model="form.dscsnAplcntTelno"
                            ref="telInputRef"
                          />
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
                        <div class="form-group-box">
                          <div class="form-item__number">
                            <a-form-item
                              name="dscsnAplcntMblTelno"
                              label="휴대전화번호"
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
                      <th scope="row">비밀번호</th>
                      <td>
                        <a-form-item
                          name="password"
                          label="비밀번호"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            type="password"
                            v-model:value="form.wrtr_pswd"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">비밀번호 확인</th>
                      <td>
                        <a-form-item
                          name="passwordCheck"
                          label="비밀번호 확인"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            type="password"
                            v-model:value="form.passwordCheck"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">방문가능 공단사무소</th>
                      <td colspan="3">
                        <div class="selct-form-box">
                          <a-form-item
                            name="rgncd"
                            label="방문가능 공단사무소 지역"
                            :labelCol="{ class: 'sr-only' }"
                            class="w-auto"
                          >
                            <a-select
                              id=""
                              class="common-select"
                              placeholder="선택"
                              v-model:value="form.rgncd"
                              @change="changeZone"
                            >
                              <a-select-option
                                v-for="zone in codeList"
                                :value="zone.value"
                                >{{ zone.text }}</a-select-option
                              >
                              <!--                          <a-select-option value="2"-->
                              <!--                            >공단사무소2</a-select-option-->
                              <!--                          >-->
                            </a-select>
                          </a-form-item>
                          <a-form-item
                            name="rgndetail"
                            label="방문가능 공단사무소 사무실"
                            :labelCol="{ class: 'sr-only' }"
                            class="w-auto"
                          >
                            <a-select
                              id=""
                              class="common-select"
                              placeholder="선택"
                              v-model:value="form.rgndetail"
                            >
                              <a-select-option
                                v-for="item in brofList"
                                :key="item.brofNo"
                                :value="item.brofNo"
                              >
                                {{ item.brofNm }}
                              </a-select-option>
                            </a-select>
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        인지경로
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <div class="form-group-box">
                          <BullList type="refMark">
                            <li>귀하는 공단의 법률서비스를 어떻게 아셨나요?</li>
                          </BullList>
                          <a-form-item
                            name="rcgPathCd"
                            label="인지경로"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-radio-group
                              v-model:value="form.rcgPathCd"
                              @change="selectRcgPathCd"
                              ref="rcgPathRef"
                            >
                              <a-radio
                                class="radio-bx"
                                v-for="list in codeList2"
                                :value="list.value"
                                >{{ list.text }}</a-radio
                              >
                            </a-radio-group>
                          </a-form-item>
                        </div>
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
                    사이버상담 상담내용입력의 제목, 내용, 공개여부, 제3자
                    정보제공 및 공개 동의여부 입력에관한 표
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
                    <tr>
                      <th scope="row">공개여부</th>
                      <td>
                        <a-radio-group v-model:value="form.rlsYn">
                          <a-radio class="radio-bx" value="Y">공개</a-radio>
                          <a-radio class="radio-bx" value="N">비공개</a-radio>
                        </a-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">제3자 정보제공 및 공개 동의여부</th>
                      <td>
                        <a-radio-group v-model:value="form.tdptyPvsnAgreYn">
                          <a-radio class="radio-bx" value="Y">예</a-radio>
                          <a-radio class="radio-bx" value="N">아니요</a-radio>
                        </a-radio-group>
                        <CommonTable class="mt-17px">
                          <caption>
                            사이버상담 제3자 정보제공 및 공개 동의여부 구분,
                            내용 에관한 표
                          </caption>
                          <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">구분</th>
                              <th scope="col">내용</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>개인정보</td>
                              <td>
                                이름·주민등록번호·주소·전화번호·아이디(ID)·전자우편(E-mail)·신체·교육·소득·신용정보
                                그 밖에 특정 개인의 과거 및 현재의 상황이나
                                상태를 나타낼 수 있는 정보 등
                              </td>
                            </tr>
                            <tr>
                              <td>민감정보</td>
                              <td>
                                사상·신념, 노동조합·정당의 가입·탈퇴, 정치적
                                견해, 건강, 성생활 등에 관한 정보, 그 밖에
                                정보주체의 사생활을 현저히 침해할 우려가 있는
                                개인정보로서 대통령령으로 정하는
                                정보(개인정보보호법 제23조)
                              </td>
                            </tr>
                            <tr>
                              <td>공개가 부적절한 경우</td>
                              <td>
                                내용부실, 비 소관사항, 악의적인 비방내용,
                                공개취지에 어긋나는 내용 등
                              </td>
                            </tr>
                          </tbody>
                        </CommonTable>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>
        </a-form>

        <ButtonGroup align="center" class="!mt-50px" v-if="form.status == 'U'">
          <CommonButton variants="primary" width="xs" @click="updateBtn">
            수정하기
          </CommonButton>
          <CommonButton variants="line-primary" width="xs" @click="cancel">
            취소하기
          </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="center" class="!mt-50px" v-else>
          <CommonButton variants="primary" width="xs" @click="insertBtn">
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
@use 'assets/style/pages/dscsn/cyber/klac/CyberKlacDomM';
</style>
