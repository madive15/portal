<!--
* 화면명 : 대한가정법률복지상담원 사이버상담 폼
* 화면ID : LASP_CON_032
* 파일명 : CybLqaM
* 작성자 : 김정남
* 화면설명 : 대한가정법률복지상담원 사이버상담 페이지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
변경일       변경자       변경내역
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
2025.07.28  김정남       최초생성
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
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import { useLoginStore } from '~/stores/login';

definePageMeta({
  layout: 'pub2nd'
});

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();

const activeKey = ref([1, 2]);

const { showAlert } = useCustomAlert();

const formRef = ref();
const nameRef = ref();
const phoneInputRef = ref();
const genderRef = ref();
const ageRef = ref();
const titleRef = ref();
const contentRef = ref();

const refMap: Record<string, Ref<any>> = {
  dscsnAplcntNm: nameRef,
  dscsnAplcntMblTelno: phoneInputRef,
  aplcntGndrCd: genderRef,
  aplcntBrdt: ageRef,
  dscsnTtl: titleRef,
  dscsnCn: contentRef
};

// 폼 항목
const form = reactive({
  dscsnAplyNo: '',
  status: '',
  instNo: 'I003000000',
  dscsnSeCd: '4',
  prSttsCd: 'D01',
  dscsnAplcntNm: '',
  dscsnAplcntMblTelno: '',
  smsCert: false,
  dscsnAplcntEmlAddr: '@',
  emailCert: false,
  aplcntGndrCd: '',
  aplcntBrdt: '',
  wrtr_pswd: '',
  dscsnTtl: '',
  dscsnCn: '',
  rlsYn: '',
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
  form.aplcntGndrCd = response.data.mbrGndrCd;
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

  const response = await axios.post(
    '/api/dscsn/selectCybLqaAplyInfo',
    formData
  );

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });

  if (form.smsRcptnAgreYn == 'Y') {
    form.smsCert = true;
  }

  if (form.emlRcptnAgreYn == 'Y') {
    form.emailCert = true;
  }

  if (response.data.aplcntBrdt != null) {
    const str = response.data.aplcntBrdt; // "yyyyMMdd"
    const year = parseInt(str.substring(0, 4), 10);
    const month = parseInt(str.substring(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(str.substring(6, 8), 10);

    aplcntBrdt.value = new Date(year, month, day);
  }
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

const genderEvent = (event) => {
  form.aplcntGndrCd = event.target.value;
};

const changeRls = (event) => {
  form.rlsYn = event.target.value;
};

const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntNm: [valid.required()],
  dscsnAplcntMblTelno: [valid.required(), valid.mobile()],
  aplcntGndrCd: [valid.required()],
  aplcntBrdt: [valid.required()],
  rlsYn: [valid.required()],
  dscsnTtl: [valid.required()],
  dscsnCn: [valid.required(), { max: 200, message: '200자 이내로 입력하세요.' }]
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
 * name : insertBtn
 * desc : 대한가정법률복지상담원 사이버상담 신청 데이터 저장
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
        '/api/dscsn/insertCybLqaAply',
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

/**
 * name : updateBtn
 * desc : 대한가정법률복지상담원 사이버상담 신청 데이터 수정
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
        '/api/dscsn/updateCybLqaAply',
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
          대한가정법률복지상담원 사이버상담 안내
        </CommonTitle>
        <CommonTitle tag="h5" size="2" type="dot">
          사이버 상담을 신청하시기 먼저 확인해 보세요!
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="number" number-style="circle">
            <li>
              <div class="txt-wrap">
                이전 법률상담사례 찾기를 통해 고객님의 사례와 유사한 상담사례가
                있는지 확인해 보시기 바랍니다.
                <CommonButton
                  height="sm"
                  fontsize="sm"
                  variants="line-primary"
                  class="mt-[-3px]"
                  to="/statuteinfo/discussion/list"
                >
                  바로가기
                  <template #right-icon>
                    <Icon name="shortcutBlue" />
                  </template>
                </CommonButton>
              </div>
            </li>
            <li>
              법률구조 플랫폼은 법률상담 당사자가 아닌 대국민 편의를 위해
              법률구조 가관 및 국가·공공기관 등에서 제공하는 법률상담을 연계하는
              시스템으로 실제 법률상담 진행 및 처리는 해당 참여기관에 있습니다.
            </li>
            <li>
              공단은 한정된 상담 인원을 활용하여 많은 국민들에게 사이버상담
              서비스를 제공하게 됨에 따라 부득이하게 일별 상담건수(일 70건)를
              정하게 되었습니다.<br />
              구체적인 사실관계의 확인이나 관련 자료에 대한 검토가 요구되는
              사안은 예약 후 방문상담, 간략한 상담은 전화상담(국번없이 132)을
              이용하여 주시기 바랍니다
            </li>
            <li>
              <div class="txt-wrap">
                상담내용 신규 입력만 가능하며 답변 확인은 마이페이지에서 확인
                바랍니다.
                <CommonButton
                  height="sm"
                  fontsize="sm"
                  variants="line-primary"
                  class="mt-[-3px]"
                  to="/my/dscsn/cyber/list"
                >
                  바로가기
                  <template #right-icon>
                    <Icon name="shortcutBlue" />
                  </template>
                </CommonButton>
              </div>
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
                    사이버상담 기본정보의 성명, 비밀번호 휴대전화번호, 이메일,
                    성별, 생년월일 입력에관한 표
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
                      <th scope="row">비밀번호</th>
                      <td>
                        <a-input
                          class="text-bx"
                          v-model:value="form.wrtr_pswd"
                          type="password"
                        />
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
                            <TelNumInput
                              cd-group-id="CO0017"
                              v-model="form.dscsnAplcntMblTelno"
                              ref="phoneInputRef"
                            />
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
                          name="aplcntGndrCd"
                          label="성별"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-radio-group
                            v-model:value="form.aplcntGndrCd"
                            @change="genderEvent"
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
                              name="aplcntBrdt"
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
                    사이버상담 상담내용입력의 공개여부, 제목, 내용 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        공개여부
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="rlsYn"
                          label="공개여부"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-radio-group
                            v-model:value="form.rlsYn"
                            @change="changeRls"
                          >
                            <a-radio class="radio-bx" value="Y">공개</a-radio>
                            <a-radio class="radio-bx" value="N">비공개</a-radio>
                          </a-radio-group>
                        </a-form-item>
                      </td>
                    </tr>
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
@use 'assets/style/pages/dscsn/cyber/lawqa/CyberLawqaM';
</style>
