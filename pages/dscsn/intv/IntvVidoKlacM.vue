<!--
 * 화면명 : 면접/화상상담 입력폼
 * 화면ID : LASP_CON_024
 * 파일명 : IntvVidoKlacEdit
 * 작성자 : 노한서
 * 화면 설명 : 공단의 면접/화상상담 입력폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.07.28  노한서   최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumb.vue';
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
import { computed, reactive } from 'vue';
import { find } from 'lodash-es';
import CommonSelect from '~/pages/components/select/CommonSelect.vue';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import axios from 'axios';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import * as dscsnApis from '~/composables/dscsn';
import { selectLoginInfo } from '~/composables/dscsn';
import { useLoginStore } from '~/stores/login';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'pub2nd'
});

/** 라우터 선언 **/
const route = useRoute();

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

/**
 * name : onBeforeMount
 * desc :
 */
onBeforeMount(() => {
  // 로그인 여부에 따라 분기
  if (authenticated.value) {
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
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

// 필요 데이터 중 입력하지 않고, 이전 페이지 등에서 넘겨받아야 할 데이터 목록
interface defaultFormData {
  rsvtNo: string;
  inst: string;
  instNo: string;
  date: string;
  time: string;
  type: string;
}

interface loginData {
  name: string;
  mbrNo: string;
  mblTelno: string;
}

// 메뉴 넣으면 지워야함
const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};

const activeKey = ref([1, 2]);
const formRef = ref();
const { showAlert } = useCustomAlert();

const dscsnAplcntRlprNmRef = ref();
const rcgPathCdRef = ref();
const dscsnCnRef = ref();
const bfrDscsnEmpNmRef = ref();
const dscsnAplcntTelnoRef = ref();
const dscsnAplcntMblTelnoRef = ref();
const emlAddrRef = ref({
  emlId: '',
  dmnEmlAddrCd: '',
  dmnEmlAddr: ''
});

// valid 체크할 때 쓰는 것 같긴 한데 다시 확인
const refMap: Record<string, Ref<any>> = {
  dscsnAplcntRlprNm: dscsnAplcntRlprNmRef,
  dscsnAplcntTelno: dscsnAplcntTelnoRef,
  dscsnAplcntMblTelno: dscsnAplcntMblTelnoRef,
  aplcntEmlAddr: emlAddrRef,
  rcgPathCd: rcgPathCdRef,
  dscsnCn: dscsnCnRef,
  bfrDscsnEmpNm: bfrDscsnEmpNmRef
};

// 테스트를 위하여 데이터를 넘겨받았다고 가정
const sampleData = ref<defaultFormData>({
  rsvtNo: '250801-112001',
  inst: '대한법률구조공단',
  instNo: 'I001000000',
  date: '2025.07.30',
  time: '11:20',
  type: '1'
});

// 테스트를 위하여 데이터를 넘겨받았다고 가정
const loginSampleData = ref<loginData>({
  name: '김공단',
  mbrNo: 'P010000051',
  mblTelno: '010-1234-5678'
});

//폼 항목
const form = reactive({
  rsvtNo: '250801-112001',
  inst: '',
  instNo: '',
  date: '',
  time: '',
  dscsnSeCd: '',
  dscsnAplyNo: 'A250801I0010001',
  mbrNo: loginSampleData.value.mbrNo,
  dscsnRsvtInstNo: sampleData.value.instNo,
  rgnCd: '',
  rsvtYmd: '',
  rsvtHm: '',
  dowCd: '',
  bfrRsvtNo: '',
  bfrDscsnEmpNm: '',
  ntfctnRcptnAgreYn: false,
  dscsnAplcntRlprNm: '',
  dscsnAplcntTelno: '',
  dscsnAplcntMblTelno: '',
  dscsnAplcntEmlAddr: '',
  rcgPathCd: '',
  elnewsRcptnAgreYn: false,
  smsRcptnAgreYn: false,
  emlRcptnAgreYn: false,
  dscsnCn: ''
});

// 이메일 공통코드, 공통 컴포넌트화 되면 수정
const emlTypeCodes = await useCommonCodeStore().searchCommonCodeList('CO0019');

const emlTypeCodeOptions = computed(() => {
  return [...emlTypeCodes];
});

// 인지경로 공통코드, 공통 컴포넌트화 되면 수정
const rcgPathTypeCodes =
  await useCommonCodeStore().searchCommonCodeList('CO0049');

const rcgPathTypeCodeOptions = computed(() => {
  return [...rcgPathTypeCodes];
});

// 화면 마운트 될 때 form에 set해줌
onMounted(() => {
  form.rsvtNo = sampleData.value.rsvtNo;
  form.inst = sampleData.value.inst;
  form.instNo = sampleData.value.instNo;
  form.date = sampleData.value.date;
  form.time = sampleData.value.time;
  form.dscsnSeCd = sampleData.value.type;

  form.dscsnAplcntRlprNm = loginSampleData.value.name;
  form.dscsnAplcntMblTelno = loginSampleData.value.mblTelno;
  selectUserInfo();
});

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();
  form.dscsnAplcntRlprNm = response.data.mbrNm;
  form.dscsnAplcntMblTelno = response.data.mbrMblTelno;
  if (response.data.mbrEmlAddr !== '') {
    form.dscsnAplcntEmlAddr =
      response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
  }
  form.dscsnAplcntTelno = response.data.mbrTelno;
};
// 유효성 검사 규칙
const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntRlprNm: [{ required: true, message: '성명을 입력해주세요.' }],
  dscsnAplcntMblTelno: [
    { required: true, message: '휴대전화번호를 입력해주세요.' },
    {
      validator: (_, value) => {
        if (!value || isValidTelno(value)) {
          return Promise.resolve();
        }
        return Promise.reject('휴대전화번호의 형식이 올바르지 않습니다.');
      },
      trigger: ['blur', 'change']
    }
  ],
  dscsnAplcntTelno: [
    {
      validator: (_, value) => {
        if (!value || isValidTelno(value)) {
          return Promise.resolve();
        }
        return Promise.reject('전화번호의 형식이 올바르지 않습니다.');
      },
      trigger: ['blur', 'change']
    }
  ],
  rcgPathCd: [{ required: true, message: '인지경로를 선택해주세요.' }],
  dscsnCn: [{ required: true, message: '내용을 입력해주세요.' }]
  // dscsnAplcntEmlAddr: [
  //   {
  //     validator: (_, value) => {
  //       const email = `${emlAddrRef.value.emlId}@${emlAddrRef.value.dmnEmlAddr}`;
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (!emlAddrRef.value.emlId || !emlAddrRef.value.dmnEmlAddr) {
  //         return Promise.reject('이메일을 입력해주세요');
  //       }
  //       if (!emailRegex.test(email)) {
  //         return Promise.reject('이메일 주소 형식이 올바르지 않습니다.');
  //       }
  //       return Promise.resolve();
  //     },
  //     trigger: ['blur', 'change']
  //   }
  // ]
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
 * name : isValidEmlAddr
 * desc : 이메일 주소의 유효성을 검사한다.
 */
const isValidEmlAddr = (addr: string): boolean => {
  const emlAddrRegex = /\w+\.\w{2,}/g;
  return emlAddrRegex.test(addr);
};

// TODO 연계 필요 KLA-005
/**
 * name : submitDscsnForm
 * desc : 상담 폼을 제출한다.
 */
const submitDscsnForm = async () => {
  // 필수값 유효성 체크, 예약완료 알림, 예약완료 페이지로 이동
  // 필수값 미입력 시 미입력항목 고지

  // 이메일 form에 담기
  /*
  form.dscsnAplcntEmlAddr =
    emlAddrRef.value.emlId + '@' + emlAddrRef.value.dmnEmlAddr;
   */

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
      //폼 데이터
      const formData = new FormData();

      //선언된 값을 append로 넣어준다.
      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });
      try {
        const res = await axios
          .post('/api/dscsn/klac/insertKlacForm', formData)
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
  console.log('submit >>> ', form);
};

// TODO 연계 필요 KLA-004
const cancelDscsnForm = async () => {
  showAlert({
    icon: 'question',
    html: `예약을 취소하시겠습니까?<br/>취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야합니다.`,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      navigateTo('/');
      // alert('메인페이지로 이동');
    }
  });

  // Modal.confirm({
  //   type: 'info',
  //   content: `예약을 취소 하시겠습니까? 취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야 합니다.`,
  //   okText: '확인',
  //   cancelText: '취소',
  //   onOk: () => {
  //     navigateTo('/');
  //     close();
  //   }
  // });
};

// select change 시 input에 setting
const changeDmnEmlAddr = () => {
  const item = find(
    emlTypeCodeOptions.value,
    (item) => item.value === emlAddrRef.value.dmnEmlAddrCd
  );
};

// 인지경로코드 선택시 label setting
// const changeRcgPathCd = () => {
//   const item = find(
//     rcgPathTypeCodeOptions.value,
//     (item) => item.value === form.value.rcgPathCd
//   );
//   form.value.rcgPathCdNm = item.label;
// };
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
                  <span class="text-span" @click="handleGoBack">
                    뒤로가기
                  </span></button
                ><button class="btn print-button">
                  <span class="text-span" @click="handlePrint"> 인쇄하기 </span>
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
          대한법률구조공단 면접상담 상세정보
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
                    면접상담 상세정보의 성명, 전화번호, 휴대전화번호, 이메일,
                    상담예약시간, 인지경로 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명
                        <span class="red-span"
                          >* <span class="sr-only">필수 입력 항목</span></span
                        >
                      </th>
                      <td>
                        <a-form-item
                          name="dscsnAplcntRlprNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnAplcntRlprNm"
                            :maxlength="100"
                            disabled
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">전화번호</th>
                      <td>
                        <div class="form-item__number">
                          <a-form-item
                            name="dscsnAplcntTelno"
                            label="일반전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <TelNumInput
                              cd-group-id="CO0018"
                              v-model="form.dscsnAplcntTelno"
                              ref="dscsnAplcntTelnoRef"
                            />
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        휴대전화번호
                        <span class="red-span"
                          >* <span class="sr-only">필수 입력 항목</span></span
                        >
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
                                ref="dscsnAplcntMblTelnoRef"
                              />
                            </a-form-item>
                          </div>
                          <a-checkbox
                            class="check-bx"
                            name="type"
                            v-model:value="form.smsRcptnAgreYn"
                            @change="
                              ({ target: { checked } }) =>
                                (form.smsRcptnAgreYn = checked)
                            "
                            >SMS 수신동의 (예약번호 수신 시
                            필요합니다.)</a-checkbox
                          >
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-group-box">
                          <EmailInput v-model="form.dscsnAplcntEmlAddr" />
                          <a-checkbox
                            class="check-bx"
                            value=""
                            name="type"
                            v-model:value="form.emlRcptnAgreYn"
                            @change="
                              ({ target: { checked } }) =>
                                (form.emlRcptnAgreYn = checked)
                            "
                            >이메일 수신동의</a-checkbox
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상담예약시간</th>
                      <td colspan="3">
                        <span class="is-emphasis">
                          [{{ sampleData.inst }}] 인천지부 2025.04.10 11:00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        인지경로
                        <span class="red-span"
                          >* <span class="sr-only">필수 입력 항목</span></span
                        >
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
                              class="radio-bx"
                              name="rcgPathCd"
                              ref="rcgPathCdRef"
                              v-model:value="form.rcgPathCd"
                              :options="rcgPathTypeCodeOptions"
                            />
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
                    면접상담 상세정보의 내용, 이전상담직원, 예약공석정보
                    입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        내용
                        <span class="red-span"
                          >* <span class="sr-only">내용</span></span
                        >
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
                          <a-textarea
                            class="textarea-bx"
                            id="textMessage"
                            placeholder="최대 200자 입력 가능"
                            :maxlength="200"
                            v-model:value="form.dscsnCn"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">이전상담직원</th>
                      <td>
                        <div class="form-group-box">
                          <a-form-item
                            name=""
                            label="이전상담직원"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input
                              class="text-bx"
                              v-model:value="form.bfrDscsnEmpNm"
                            />
                          </a-form-item>
                          <BullList type="refMark">
                            <li>
                              이전 상담직원 입력은 공단 내 업무처리용 정보이며,
                              공단 사정상 예약 시 입력한 이전 상담직원과
                              상담자가 일치하지 않을 수 있음을 양해
                              부탁드립니다.
                            </li>
                          </BullList>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">예약공석정보</th>
                      <td>
                        <div class="form-group-box">
                          <a-checkbox
                            class="check-bx"
                            name="type"
                            v-model:value="form.ntfctnRcptnAgreYn"
                            @change="
                              ({ target: { checked } }) =>
                                (form.ntfctnRcptnAgreYn = checked)
                            "
                            >알림수신동의</a-checkbox
                          >
                          <BullList type="refMark">
                            <li>
                              알림수신 동의할 경우 예약공석 발생 시 해당정보가
                              알림톡으로 전송되어 간편한 예약변경이 가능합니다.
                            </li>
                          </BullList>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>
        </a-form>
        <div class="form-bottom-box">
          <a-checkbox
            class="check-bx"
            name="type"
            v-model:value="form.elnewsRcptnAgreYn"
            @change="
              ({ target: { checked } }) => (form.elnewsRcptnAgreYn = checked)
            "
            >전자사보 수신동의
          </a-checkbox>

          <BullList type="refMark">
            <li class="blue">본인 예약이 원칙입니다.</li>
            <li class="blue">
              SMS수신동의, 메일 수신동의를 하지 않을 경우 예약확인을 위한
              예약번호를 받을 수 없어 예약 변경, 취소가 어려우니 반드시 1개 이상
              수신동의 하여주시기 바랍니다.
            </li>
            <li class="blue">
              휴대전화번호가 변경된 경우에는 공단 대표전화 (054-810-0132) 및
              예약기관에 문의하여 변경하여 주시기 바랍니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs" @click="submitDscsnForm"
            >신청하기</CommonButton
          >
          <CommonButton
            variants="line-primary"
            width="xs"
            @click="cancelDscsnForm"
          >
            취소하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/intv/IntvVidoKlacEdit.scss';
</style>
