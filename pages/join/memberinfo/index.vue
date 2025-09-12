<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useModalFocus } from '~/composables/useModalFocus';
import { useModal } from '~/composables/useModal';
import { useJoinStore } from '~/stores/join';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';
import dayjs from 'dayjs';
import type { ComMbrsttyagt } from '~/stores/join/index.types';
import { ref } from 'vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { find } from 'lodash-es';
const { showAlert } = useCustomAlert();

const router = useRouter();
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
const startPasswordValidation = ref<boolean>(false);
const radioSelected = ref(true);
const existsUserIdChk = ref<boolean>(false);

const telnoInputDisabled = ref<boolean>(false);
onBeforeMount(() => {
  if (joinRequest.value.mbrMblTelno) {
    sliceTelNo(joinRequest.value.mbrMblTelno);
    telnoInputDisabled.value = true;
  }
  const verifyYn = sessionStorage.getItem('signUpVerify');
  if (verifyYn !== 'Y') {
    Modal.info({ title: '정상적인 접근이 아닙니다' });
    router.push('/');
  }
});

const existsUserId = () => {
  const { userId } = joinRequest.value;
  if (userId.trim().length < 6) {
    showAlert({
      icon: 'warning',
      text: '아이디는 6 ~ 16자리입니다.'
    });
    return;
  }

  joinStore
    .existsUserId(userId)
    .then(() => {
      showAlert({
        icon: 'success',
        text: '사용하실 수 있는 아이디입니다.'
      });
      existsUserIdChk.value = true;
    })
    .catch(() => {
      showAlert({
        icon: 'error',
        text: '중복된 아이디입니다.'
      });
    });
};

// const confirmPassword = ref<string>('');
// const noMatchedPassword = computed(() => {
//   if (!joinRequest.value.userPswd) {
//     return '';
//   } else if (joinRequest.value.userPswd !== confirmPassword.value) {
//     return 'unmatched';
//   } else {
//     return 'matched';
//   }
// });
// const verifyPasswordPattern = (value: string) => {
//   if (value.length > 8) {
//     return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)/.test(value);
//   } else {
//     return false;
//   }
// };

const ntnCodeList = await useCommonCodeStore().searchNtnCodeList();

const modal2 = useModal();
const modal3 = useModal();

// 14세 미만 체크박스 클릭시 모달 나옴 해제시는 안나옴
const handleCheckboxChange = (event) => {
  if (event.target.checked) {
    modal2.openModal();
  }
};

const idInputRef = ref();
const pwInputRef = ref();
const confirmPasswordRef = ref();
const TelNoRef = ref();
const TelNoRef1 = ref();
const emailInputRef = ref();

const goToLogin = () => {
  router.push('/login', { external: true });
};

const disabledMbrsttyagt = computed(() => {
  return !agree.value.prvcPvsnAgreYn || !agree.value.prvcClctAgreYn;
});

const handleCertMbrsttyagt = () => {
  useAxios()
    .post('/api/auth/request/mbrsttyagt')
    .then(() => {
      document.auth.action = `/auth/mobile/request`;
      document.auth.submit();
    });
};

const agree = ref<ComMbrsttyagt>({
  sttyAgtMblTelno: '',
  sttyAgtGndrCd: '',
  sttyAgtBrdt: '',
  sttyAgtNm: '',
  prvcClctAgreYn: false,
  prvcPvsnAgreYn: false,
  sttyAgtAgreYn: false
});

onMounted(() => {
  const channel = new BroadcastChannel('auth');
  const channelFn = async (event) => {
    if (event.data === 'success' || event.data === 'duplicate') {
      const data = await joinStore.searchAuthResult();

      const birth = dayjs(data.birth, 'YYYYMMDD');
      const diff = dayjs().diff(birth, 'year');

      if (diff < 19) {
        await showAlert({
          icon: 'error',
          text: '미성년자는 법정대리인이 될 수 없습니다.'
        });
        return;
      }

      joinRequest.value.comMbrsttyagt = {
        ...agree.value,
        sttyAgtNm: data.name,
        sttyAgtMblTelno: data.mobileNo,
        sttyAgtBrdt: data.birth,
        sttyAgtGndrCd: data.gender
      };

      window.removeEventListener('message', channelFn);
      channel.close();
      modal2.closeModal();
      modal3.openModal();
    } else {
      await showAlert({
        icon: 'error',
        text: '본인인증에 실패하였습니다.'
      });
    }
  };

  window.addEventListener('message', channelFn);
});

const handleRcptnAgreYn = (event) => {
  joinRequest.value.emlRcptnAgreYn = event.target.value;
  joinRequest.value.smsRcptnAgreYn = event.target.value;
};

const open = ref(false);
watch(open, (newValue) => {
  if (!newValue) {
    removeModalFocus();
  }
});

const nationCheck = joinRequest.value.mbrTypeCd === 'O01' ? '거주국가' : '국적';
const addressCheck = joinRequest.value.mbrTypeCd === 'F01' ? '주소, ' : '';
const passportCheck =
  joinRequest.value.certTypeCd === '004' ? '여권번호, ' : '';

const captionText =
  joinRequest.value.mbrTypeCd === 'U02'
    ? '회원가입 정보입력의 이름, 아이디, 비밀번호, 비밀번호확인, 주소, 휴대전화, 전화번호, 이메일, 정보 수신여부 입력에관한 표'
    : `회원가입 정보입력의 이름, 아이디, 비밀번호, 비밀번호확인, ${nationCheck}, ${addressCheck}휴대전화, 전화번호, 이메일, ${passportCheck}정보 수신여부 입력에관한 표`;

const commonCodeStore = useCommonCodeStore();
const { data: codeList } = useQuery({
  queryKey: ['EMAIL_CODE', 'CO0019'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});
const { data: telcodeList } = useQuery({
  queryKey: ['code', 'CO0017'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});
const formRef = ref();
const emailChange = () => {
  const item = find(
    codeList.value,
    (item) => item.value === (joinRequest.value.dmnEmlAddrCd as string)
  );

  joinRequest.value.dmnEmlAddr = item.label;
};

const sliceTelNo = (telNo) => {
  joinRequest.value.firstTelNo = telNo.slice(0, 3);
  joinRequest.value.secondTelNo = telNo.slice(3, 7);
  joinRequest.value.thirdTelNo = telNo.slice(7);
};

const onFinish = (values: any) => {
  if (!existsUserIdChk.value) {
    Modal.info({
      title: '아이디 중복확인을 해주세요'
    });
    return;
  }
  if (
    !(
      joinRequest.value.dmnEmlAddrCd ||
      /\w+\.\w{2,}/g.test(joinRequest.value.dmnEmlAddr)
    )
  ) {
    message.error('이메일 주소가 잘못되었습니다.');
    emailInputRef.value.focus2();
    return;
  }

  joinRequest.value.mbrMblTelno =
    joinRequest.value.firstTelNo +
    joinRequest.value.secondTelNo +
    joinRequest.value.thirdTelNo;

  joinStore
    .createUser()
    .then(() => {
      router.push('/join/memberinfo/cmptn', { external: true });
    })
    .catch((error) => {
      Modal.info({
        title: '중복된 회원입니다. 아이디, 비밀번호 찾기를 이용해주세요'
      });
      console.error(error);
    });
};

const onFinishFailed = (errorInfo: any) => {
  message.error(errorInfo.errorFields[0].errors);
};
</script>

<template>
  <form name="auth" method="post" target="_blank" title="새 창 열림"></form>
  <div class="sub-content-box" id="register-form">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="회원가입"
          :breadcrumbItems="[
            { text: '회원가입', active: false },
            { text: '정보입력', active: true }
          ]"
        />
        <div class="step-box">
          <ol class="row row-cols-5">
            <li class="col-xl col-12 step1">
              <div class="step-text-box">
                <strong>01.</strong>
                <span>회원유형</span>
              </div>
            </li>

            <li class="col-xl col-12 step2">
              <div class="step-text-box">
                <strong>02.</strong>
                <span>약관동의</span>
              </div>
            </li>

            <li class="col-xl col-12 step3">
              <div class="step-text-box">
                <strong>03.</strong>
                <span>본인확인</span>
              </div>
            </li>

            <li class="col-xl col-12 step4">
              <div class="step-text-box active">
                <strong>04.</strong>
                <span>정보입력<span class="sr-only">(현재단계)</span></span>
              </div>
            </li>

            <li class="col-xl col-12 step5">
              <div class="step-text-box">
                <strong>05.</strong>
                <span>가입완료</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <a-form
          :model="joinRequest"
          @finish="onFinish"
          name="basic"
          @finishFailed="onFinishFailed"
          validate-trigger="change"
          ref="formRef"
        >
          <div class="common-form__area">
            <p class="form-ess_info">
              <span> <i class="red-span">*</i></span>
              표시는 필수 입력 사항입니다.
            </p>
            <table>
              <caption>
                {{
                  captionText
                }}
              </caption>
              <tbody>
                <tr>
                  <th scope="row">이름</th>
                  <td>{{ joinRequest.mbrNm }}</td>
                </tr>
                <tr>
                  <th scope="row">
                    아이디
                    <span class="red-span"
                      ><i>*</i>
                      <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="item-column">
                      <a-form-item
                        name="userId"
                        label="아이디"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '아이디를 입력하세요'
                          },
                          { min: 6, message: '6글자 이상 입력하세요' }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          ref="idInputRef"
                          key="id-input"
                          id="id-input"
                          maxlength="16"
                          v-model:value="joinRequest.userId"
                        />
                      </a-form-item>

                      <!--  사용하실 수 있는 아이디 이미 사용중인 아이디 모달 -->
                      <CommonButton
                        title="중복확인"
                        variants="primary"
                        @click="existsUserId"
                        width="sm"
                      >
                        중복확인
                      </CommonButton>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    비밀번호
                    <span class="red-span">
                      <i>*</i><span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <!--TODO-->
                    <div class="input-outline">
                      <div class="input-group__bx">
                        <a-form-item
                          name="userPswd"
                          label="비밀번호"
                          :labelCol="{ class: 'sr-only' }"
                          :rules="[
                            {
                              required: true,
                              message: '비밀번호를 입력하세요'
                            },
                            {
                              pattern:
                                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).{9,}/,
                              message:
                                '영문, 숫자, 특수문자를 포함해 9자 이상 입력하세요'
                            }
                          ]"
                        >
                          <a-input
                            id="password-input"
                            class="text-bx"
                            type="password"
                            maxlength="12"
                            v-model:value="joinRequest.userPswd"
                            ref="pwInputRef"
                          />
                          <!--                          @focusin.once="startPasswordValidation = true"-->
                        </a-form-item>
                      </div>
                      <p class="input-info">
                        9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    비밀번호확인
                    <span class="red-span"
                      ><i>*</i>
                      <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <a-form-item
                      name="confirmPassword"
                      label="비밀번호"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          required: true,
                          message: '비밀번호 규칙이 올바르지 않습니다.'
                        },
                        {
                          validator: (_, value, callback) => {
                            if (value !== joinRequest.userPswd) {
                              callback('비밀번호가 일치하지 않습니다.');
                            }
                            callback();
                          }
                        }
                      ]"
                    >
                      <a-input
                        id="password-confirm-input"
                        type="password"
                        maxlength="12"
                        class="text-bx"
                        v-model:value="joinRequest.confirmPassword"
                        ref="confirmPasswordRef"
                      />
                    </a-form-item>
                  </td>
                </tr>
                <!-- 외국인 회원가입 폼에서는 거주코드를 나옵니다. 재외국민은 주소까지 나와야 합니다. v-if로 분기하세요. start -->
                <tr
                  v-if="
                    joinRequest.mbrTypeCd === 'O01' ||
                    joinRequest.mbrTypeCd === 'F01'
                  "
                >
                  <th scope="row">
                    {{ joinRequest.mbrTypeCd === 'O01' ? '거주국가' : '국적' }}
                  </th>
                  <td>
                    <a-form-item
                      name="mbrNtn"
                      label="국적"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select
                        id="conturySelect"
                        class="common-select"
                        placeholder="선택"
                        v-model:value="joinRequest.mbrNtn"
                      >
                        <a-select-option
                          v-for="ntnCode in ntnCodeList"
                          :key="ntnCode.value"
                          :value="ntnCode.value"
                        >
                          {{ ntnCode.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </td>
                </tr>
                <tr v-if="joinRequest.mbrTypeCd === 'O01'">
                  <th scope="row">
                    휴대전화
                    <span class="red-span">
                      <i>*</i><span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <a-form-item
                      name="ntnMblTelno"
                      label="휴대전화"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        { required: true, message: '전화번호를 입력해주세요' }
                      ]"
                    >
                      <common-number-space-input
                        class="text-bx"
                        id="foreigner-input1"
                        v-model="joinRequest.ntnMblTelno"
                        maxlength="20"
                        ref="TelNoRef1"
                      />
                    </a-form-item>
                  </td>
                </tr>
                <tr v-if="joinRequest.mbrTypeCd === 'O01'">
                  <th scope="row">전화번호</th>
                  <td>
                    <a-form-item
                      name="phone"
                      label="전화번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <common-number-space-input
                        class="text-bx"
                        id="foreigner-input2"
                        v-model="joinRequest.ntnTelno"
                        maxlength="20"
                      />
                    </a-form-item>
                  </td>
                </tr>

                <!-- 외국인 회원가입 폼에서는 거주코드를 나옵니다. 재외국민은 주소까지 나와야 합니다. v-if로 분기하세요. end -->
                <tr v-if="joinRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">주소</th>
                  <td>
                    <div class="form-item__addr">
                      <div class="item-column">
                        <a-form-item
                          name="zip"
                          label="주소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            id="address-search-input"
                            readonly
                            class="text-bx"
                            v-model:value="joinRequest.zip"
                          />
                        </a-form-item>
                        <CommonButton
                          title="우편번호 찾기"
                          variants="primary"
                          width="sm"
                          @click="
                            () => {
                              open = true;
                              //createModalFocus();
                            }
                          "
                          ref="returnFocusRef"
                        >
                          우편번호 찾기
                        </CommonButton>

                        <common-search-address
                          v-model:open="open"
                          v-model:zip="joinRequest.zip"
                          v-model:mbr-addr="joinRequest.mbrAddr"
                          v-model:modal-focus="modalFocusRef"
                        />
                      </div>
                      <a-form-item
                        name="mbrAddr"
                        label="주소상세2(선택 시 자동입력)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          id="address-input1"
                          type="text"
                          maxlength="50"
                          placeholder="우편번호 검색을 통해 자동 입력됩니다."
                          readonly
                          class="text-bx full"
                          v-model:value="joinRequest.mbrAddr"
                        />
                      </a-form-item>

                      <a-form-item
                        name="mbrDaddr"
                        label="주소상세3"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          id="address-input2"
                          type="text"
                          maxlength="50"
                          class="text-bx full"
                          v-model:value="joinRequest.mbrDaddr"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr v-if="joinRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">
                    휴대전화
                    <span class="red-span">
                      <i>*</i> <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="firstTelNo"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '휴대폰 첫 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-select
                          class="common-select"
                          placeholder="선택"
                          v-model:value="joinRequest.firstTelNo"
                          :disabled="telnoInputDisabled"
                        >
                          <a-select-option value="">선택</a-select-option>
                          <a-select-option
                            v-for="code in telcodeList"
                            v-model:value="code.value"
                            >{{ code.label }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="secondTelNo"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            min: 4,
                            message: '휴대폰 두 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="joinRequest.secondTelNo"
                          maxlength="4"
                          :disabled="telnoInputDisabled"
                        />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="thirdTelNo"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            min: 4,
                            message: '휴대폰 세 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="joinRequest.thirdTelNo"
                          maxlength="4"
                          :disabled="telnoInputDisabled"
                        />
                      </a-form-item>
                    </div>
                    <!--                    <a-form-item-->
                    <!--                      name="mbrMblTelno"-->
                    <!--                      label="휴대전화"-->
                    <!--                      :labelCol="{ class: 'sr-only' }"-->
                    <!--                    >-->
                    <!--                      <common-tel-num-input-->
                    <!--                        v-model="joinRequest.mbrMblTelno"-->
                    <!--                        cd-group-id="CO0017"-->
                    <!--                        ref="TelNoRef"-->
                    <!--                      />-->
                    <!--                    </a-form-item>-->
                  </td>
                </tr>
                <tr v-if="joinRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">전화번호</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="mbrTelno"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <common-tel-num-input
                          v-model="joinRequest.mbrTelno"
                          cd-group-id="CO0018"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    이메일
                    <span class="red-span"
                      ><i>*</i>
                      <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="form-item__email">
                      <a-form-item
                        name="mbrEmlAddr"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '이메일을 입력해주세요'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          id="emailhead1"
                          v-model:value="joinRequest.mbrEmlAddr"
                          ref="emailInput"
                          placeholder="이메일 입력"
                        />
                      </a-form-item>
                      <span class="dash">@</span>
                      <a-form-item
                        name="dmnEmlAddr"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          id="emailend2"
                          :disabled="!!joinRequest.dmnEmlAddrCd"
                          ref="emailCdInput"
                          v-model:value="joinRequest.dmnEmlAddr"
                        />
                      </a-form-item>
                      <a-form-item
                        name="email3"
                        label="이메일 선택"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select
                          class="common-select"
                          id="emailend3"
                          v-model:value="joinRequest.dmnEmlAddrCd"
                          @change="emailChange"
                        >
                          <a-select-option value="">직접입력</a-select-option>
                          <a-select-option
                            :value="code.value"
                            v-for="code in codeList"
                          >
                            {{ code.label }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr
                  v-if="
                    joinRequest.mbrTypeCd === 'F01' &&
                    joinRequest.certTypeCd === '004'
                  "
                >
                  <th scope="row">
                    여권번호
                    <span class="red-span"
                      >* <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="item-column">
                      <a-form-item
                        name="pno"
                        label="여권번호"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input your passport No!'
                          }
                        ]"
                      >
                        <a-input
                          id="password-input"
                          type="text"
                          class="text-bx"
                          readonly
                          v-model:value="joinRequest.pno"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">정보 수신여부</th>
                  <td>
                    <a-form-item
                      name="infoRec"
                      label="정보 수신여부"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-radio-group
                        v-model:value="joinRequest.smsRcptnAgreYn"
                        @change="handleRcptnAgreYn($event)"
                      >
                        <a-radio
                          type="radio"
                          name="aggre"
                          id="aggre-input"
                          class="radio-bx"
                          :value="true"
                          >수신</a-radio
                        >
                        <a-radio
                          type="radio"
                          name="aggre"
                          id="denied-aggre-input"
                          class="radio-bx"
                          :value="false"
                          >미수신</a-radio
                        >
                      </a-radio-group>
                    </a-form-item>

                    <p class="input-info">
                      ※ 이메일 및 SMS미수신 시 지원업무 진행사항 등의 정보를
                      받으실 수 없습니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ButtonGroup align="center">
            <CommonButton class="gray" width="sm" @click="goToLogin">
              취소
            </CommonButton>
            <CommonButton type="submit" class="primary" width="sm">
              확인
            </CommonButton>
          </ButtonGroup>
        </a-form>
        <!-- 만 14세 미만 일 경우는 여기로 v-if 분기하세요 start -->
        <div class="info-text-box" v-if="joinRequest.mbrTypeCd === 'U01'">
          <ul>
            <li>
              만 14세 미만 어린이는 보호자(법정대리인)와 함께 가입해 주시기
              바랍니다.
            </li>
            <li>
              정보통신망이용촉진 및 정보보호 등에 관한 법률 제 21조 제 1항에서
              만 14세 미만 아동의 개인정보 수집 시 부모의 동의를 얻도록 규정하고
              있습니다.
            </li>
            <li>
              만 14세 미만 어린이의 경우 회원가입 시 보호자(법정대리인)의
              본인인증을 통한 가입 동의가 필요합니다.
            </li>
          </ul>
        </div>
        <div class="chird-check-box" v-if="joinRequest.mbrTypeCd === 'U01'">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              @change="handleCheckboxChange"
              v-model="agree.sttyAgtAgreYn"
              :value="true"
              id="chird-check"
            />
            <label class="form-check-label" for="chird-check">
              만 14세 미만 이용자의 개인정보 수집·이용·제공에 관한 사항에
              법정대리인 동의.
            </label>
          </div>

          <common-modal
            :isVisible="modal2.isVisible.value"
            :closeModal="modal2.closeModal"
          >
            <div id="aggre-chird-check-box">
              <strong>법정대리인 동의</strong>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="aggre-chird-check-input1"
                  @change="
                    ({ target: { checked } }) =>
                      (agree.prvcClctAgreYn = checked)
                  "
                />
                <label class="form-check-label" for="aggre-chird-check-input1">
                  본인은 14세 미만 인자의 법정대리인임을 확인하며,<br />
                  해당 이용자의 서비스 이용약관 및 개인정보 수집<br />
                  이용에 동의합니다.
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="aggre-chird-check-input2"
                  @change="
                    ({ target: { checked } }) =>
                      (agree.prvcPvsnAgreYn = checked)
                  "
                />
                <label class="form-check-label" for="aggre-chird-check-input2">
                  법정대리인의 개인정보 수집 및 이용하는 것에 동의<br />
                  합니다.
                </label>
              </div>
            </div>

            <button
              type="button"
              class="btn confirm-button"
              @click="handleCertMbrsttyagt"
              :disabled="disabledMbrsttyagt"
            >
              <span class="text-span">법정대리휴대폰 인증하기</span>
              <span class="icon-span">
                <img src="/image/sub/join/certification_go.svg" alt="" />
              </span>
            </button>
          </common-modal>
        </div>
        <div class="chird-confirm-box" v-if="joinRequest.mbrTypeCd === 'U01'">
          <common-modal
            :isVisible="modal3.isVisible.value"
            :closeModal="modal3.closeModal"
          >
            <p>법정대리인 휴대전화 인증이 완료되었습니다.</p>
            <button
              type="button"
              class="btn confirm-button"
              @click="modal3.closeModal"
            >
              확인
            </button>
          </common-modal>
        </div>

        <!-- 만 14세 미만 일 경우는 여기로 v-if 분기하세요 end -->

        <!--        <div class="confirm-box">-->
        <!--          <button type="button" class="cancle-button btn" @click="goToLogin">-->
        <!--            취소-->
        <!--          </button>-->
        <!--          <button type="button" class="submit-button btn" @click="join">-->
        <!--            확인-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/memberinfo/index.scss';
</style>
