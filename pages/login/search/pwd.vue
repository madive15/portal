<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import { useModal } from '~/composables/useModal';
import Modal from '~/components/common/modal.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import NewModal from '~/components/common/Newmodal.vue';
import { useSearchPasswordStore } from '~/stores/login/pw';
import { useVerifyStore } from '~/stores/login/verify';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { find } from 'lodash-es';
import CommonModal from '~/components/ui/modal/modal.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
const router = useRouter();
const modal1 = useModal();
const modal2 = useModal();
const modal3 = useModal();
const modal4 = useModal();

const { showAlert } = useCustomAlert();

const searchPasswordStore = useSearchPasswordStore();
const { query } = storeToRefs(searchPasswordStore);

const verifyStore = useVerifyStore();
const { certNumVerify } = storeToRefs(verifyStore);

const searchUserId = ref('');

onBeforeMount(async () => {
  searchPasswordStore.resetQuery();
  verifyStore.resetCertNumVerify();
});

const confirmPassword = ref('');
const disabledSmsBtn = computed(
  () =>
    query.value.userId.length < 6 ||
    query.value.captchaNum.length < 6 ||
    query.value.certNum.length < 6 ||
    query.value.mbrNm.length < 2 ||
    query.value.mbrMblTelno.length < 10
);

const disabledEmailBtn = computed(
  () =>
    query.value.userId.length < 6 ||
    query.value.mbrNm.length < 2 ||
    query.value.dmnEmlAddr.length < 3 ||
    query.value.mbrEmlAddr.length < 6
);

const captchaImageUrl = ref('/api/captcha');
const captchaAudioUrl = ref('/api/captcha/audio');
const reload = ref('');

const idInputRef = ref();
const idEmailInputRef = ref();
const nameInputRef = ref();
const nameEmailInputRef = ref();
const captchaNumInputRef = ref();
const TelNoRef = ref();
const certNumVerifyRef = ref();
const emailInputRef = ref();

const reloadCaptchaImage = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomValue = array[0] / (0xffffffff + 1);
  reload.value = '?reload' + randomValue;
  captchaImageUrl.value = captchaImageUrl.value + reload.value;
};

const playCaptchaAudio = () => {
  const audio = new Audio('/api/captcha/audio?' + reload.value);
  audio.play();
};

const verifyPasswordPattern = (value: string) => {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)/.test(value);
};

const processSearchPasswordVerifySms = () => {
  if (!query.value.mbrNm) {
    message.error('이름을 입력해주세요.');
    nameInputRef.value.focus();
    return;
  }

  if (!query.value.captchaNum) {
    message.error('자동입력방지문자를 입력해주세요.');
    captchaNumInputRef.value.focus();
    return;
  }
  if (!query.value.userId) {
    message.error('아이디를 입력해주세요.');
    idInputRef.value.focus();
    return;
  }

  if (!query.value.mbrMblTelno) {
    message.error('휴대전화를 입력해주세요.');
    TelNoRef.value.firstFocus();
    return;
  } else {
    const mbrMblTelno = query.value.mbrMblTelno.split('-');

    if (!mbrMblTelno[0]) {
      message.error('휴대폰 첫 번째 자리가 잘못되었습니다.');
      TelNoRef.value.firstFocus();
      return;
    }

    if (!/\d{3,4}/.test(mbrMblTelno[1])) {
      message.error('휴대폰 두 번째 자리가 잘못되었습니다.');
      TelNoRef.value.focus();
      return;
    }

    if (!/\d{4}/.test(mbrMblTelno[2])) {
      message.error('휴대폰 세 번째 자리가 잘못되었습니다.');
      TelNoRef.value.focus();
      return;
    }
  }

  if (!certNumVerify.value.certNumVerify) {
    message.error('인증번호가 확인되지 않았습니다.');
    certNumVerifyRef.value.focus();
    return;
  }

  searchUserId.value = query.value.userId;
  searchPasswordStore
    .processSearchPasswordVerifySms(query.value)
    .then(() => {
      reloadCaptchaImage();
      searchPasswordStore.resetQuery();
      certNumVerify.value.certNumVerify = false;
      modal1.openModal();
    })
    .catch(() => {
      reloadCaptchaImage();
      showAlert({ icon: 'error', text: '회원정보를 찾을 수 없습니다.' });
    });
};

const complete = ref(false);
const processChangeSearchPassword = () => {
  searchPasswordStore
    .processChangeSearchPassword(query.value)
    .then(() => {
      searchPasswordStore.resetQuery();
      complete.value = true;
    })
    .catch(() => {
      showAlert({ icon: 'error', text: '인증 정보가 올바르지 않습니다..' });
      modal1.closeModal();
      searchPasswordStore.resetQuery();
    });
};

const findUserIdSearchPasswordEasyAuth = () => {
  searchPasswordStore
    .findUserIdSearchPasswordEasyAuth()
    .then(({ data }) => {
      query.value.userId = data.userId;
      modal4.openModal();
    })
    .catch(() => {
      showAlert({ icon: 'error', text: '인증정보를 다시 한 번 확인해주세요.' });
    });
};

const processSearchPasswordEasyAuth = () => {
  searchPasswordStore
    .processSearchPasswordEasyAuth(query.value)
    .then(() => {
      searchPasswordStore.resetQuery();
      complete.value = true;
    })
    .catch(() => {
      showAlert({ icon: 'error', text: '인증 정보가 올바르지 않습니다..' });
      modal4.closeModal();
      searchPasswordStore.resetQuery();
    });
};

const processSearchPasswordSendEmail = () => {
  if (!query.value.mbrNm) {
    message.error('이름을 입력해주세요.');
    nameEmailInputRef.value.focus();
    return;
  }

  if (!query.value.userId) {
    message.error('아이디를 입력해주세요.');
    idEmailInputRef.value.focus();
    return;
  }

  const email = query.value.mbrEmlAddr + '@' + query.value.dmnEmlAddr;
  if (!/\w.*/g.test(email)) {
    message.error('이메일을 입력해주세요');
    emailInputRef.value.focus();
    return;
  } else {
    if (
      !(query.value.dmnEmlAddrCd || /\w+\.\w{2,}/g.test(query.value.dmnEmlAddr))
    ) {
      message.error('이메일 주소가 잘못되었습니다.');
      emailInputRef.value.focus2();
      return;
    }
  }

  searchPasswordStore
    .processSearchPasswordSendEmail(query.value)
    .then(() => {
      modal2.openModal();
    })
    .catch(() => {
      showAlert({
        icon: 'error',
        text: '입력 정보를 다시 한 번 확인해주세요.'
      });
      modal4.closeModal();
      searchPasswordStore.resetQuery();
    });
};

const moveToLogin = () => {
  router.push('/login', { external: true });
};
const commonCodeStore = useCommonCodeStore();
const { data: codeList } = useQuery({
  queryKey: ['EMAIL_CODE', 'CO0019'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});
const { data: telcodeList } = useQuery({
  queryKey: ['code', 'CO0017'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const firstOnFinish = (values: any) => {
  query.value.mbrMblTelno = `${query.value.firstTelNo}-${query.value.secondTelNo}-${query.value.thirdTelNo}`;

  searchUserId.value = query.value.userId;
  searchPasswordStore
    .processSearchPasswordVerifySms(query.value)
    .then(() => {
      reloadCaptchaImage();
      searchPasswordStore.resetQuery();
      certNumVerify.value.certNumVerify = false;
      modal1.openModal();
    })
    .catch(() => {
      reloadCaptchaImage();
      showAlert({ icon: 'error', text: '회원정보를 찾을 수 없습니다.' });
    });
};

const firstFinishFailed = (e: any) => {
  message.error(e.errorFields[0].errors);
};

const secondOnFinish = (v) => {
  if (
    !(query.value.dmnEmlAddrCd || /\w+\.\w{2,}/g.test(query.value.dmnEmlAddr))
  ) {
    message.error('이메일 주소가 잘못되었습니다.');
    emailInputRef.value.focus2();
    return;
  }
  searchPasswordStore
    .processSearchPasswordSendEmail(query.value)
    .then(() => {
      modal2.openModal();
    })
    .catch(() => {
      showAlert({
        icon: 'error',
        text: '입력 정보를 다시 한 번 확인해주세요.'
      });
      modal4.closeModal();
      searchPasswordStore.resetQuery();
    });
};
const secondOnFinishFailed = (e) => {
  message.error(e.errorFields[0].errors);
};

const emailChange = () => {
  const item = find(
    codeList.value,
    (item) => item.value === (query.value.dmnEmlAddrCd as string)
  );

  query.value.dmnEmlAddr = item.label;
};
const onFinish = () => {
  processChangeSearchPassword();
};
const onFinishFailed = (e) => {
  message.error(e.errorFields[0].errors);
};

const onFinish2 = () => {
  processSearchPasswordEasyAuth();
};
const onFinishFailed2 = (e) => {
  message.error(e.errorFields[0].errors);
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- 비밀번호 찾기, 아이디찾기, 장기 미사용 안내는 폼이 동일하거나 추가가 되어 있습니다. 장기 미사용 휴면계정 안내 result는 dormancy.vue에 있습니다.-->
        <breadcrumb
          breadcrumb-title="비밀번호 재설정"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '비밀번호 찾기' },
            { text: '비밀번호 재설정', active: true }
          ]"
        />
        <div class="tab-box" id="password-tab-box">
          <Tab class="type-full">
            <TabItem title="휴대폰으로 찾기">
              <a-form
                :model="query"
                @finish="firstOnFinish"
                @finishFail="firstFinishFailed"
              >
                <div class="common-form__area">
                  <span class="info-txt">
                    <span class="red-span">*</span>
                    표시는 필수 입력 사항입니다.
                  </span>
                  <table>
                    <caption>
                      휴대푠으로 찾기의 이름, 자동입력방지문자, 아이디,
                      휴대전화, 인증번호 입력의 관련 표
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">
                          이름
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <div class="lost-box">
                            <a-form-item
                              name="mbrNm"
                              label="이름"
                              :labelCol="{ class: 'sr-only' }"
                              :rules="[
                                {
                                  required: true,
                                  message: '이름을 입력해주세요'
                                }
                              ]"
                            >
                              <a-input
                                type="text"
                                class="text-bx"
                                id="phoneUserName"
                                placeholder="이름을 입력하세요"
                                v-model:value="query.mbrNm"
                                ref="idInputRef"
                              />
                            </a-form-item>
                          </div>
                        </td>
                      </tr>
                      <!-- 아이디 찾기에 들어가는 내용입니다 v-if로 분기하세요 -->
                      <tr scope="row">
                        <th>
                          자동입력방지문자
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <div class="prevent-auto-input-wrap">
                            <div class="group-box head-group-box">
                              <img
                                :src="captchaImageUrl"
                                alt="자동입력 방지 문자"
                                class="h-8"
                              />
                              <CommonButton
                                variants="gray"
                                title="새로고침"
                                class="btn-basic"
                                @click="reloadCaptchaImage"
                              >
                                <template #left-icon>
                                  <Icon name="refreshDark" />
                                </template>
                                새로고침
                              </CommonButton>
                              <CommonButton
                                variants="gray"
                                title="음성듣기"
                                @click="playCaptchaAudio"
                              >
                                <template #left-icon>
                                  <Icon name="voice" />
                                </template>
                                음성듣기
                              </CommonButton>
                            </div>
                            <a-form-item
                              name="captchaNum"
                              label="자동입력방지문자 입력"
                              :labelCol="{ class: 'sr-only' }"
                              :rules="[
                                {
                                  min: 6,
                                  required: true,
                                  message: '자동입력방지문자를 입력해주세요'
                                }
                              ]"
                            >
                              <common-number-input
                                key="recapchar-input"
                                class="text-bx full"
                                style="
                                  width: 329px;
                                  height: 50px;
                                  margin-top: 10px;
                                "
                                id="numinput2"
                                maxlength="6"
                                v-model="query.captchaNum"
                                placeholder="자동입력 방지문자를 입력하세요"
                                ref="captchaNumInputRef"
                              />
                            </a-form-item>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          아이디
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
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
                              v-model:value="query.userId"
                            />
                          </a-form-item>
                          <!--                          <div class="lost-box">-->
                          <!--                            <label for="phoneUserId">-->
                          <!--                              <span class="sr-only">아이디 입력</span>-->
                          <!--                            </label>-->
                          <!--                            <a-input-->
                          <!--                              class="text-bx"-->
                          <!--                              placeholder="아이디를 입력하세요"-->
                          <!--                              v-model:value="query.userId"-->
                          <!--                              type="text"-->
                          <!--                              id="phoneUserId"-->
                          <!--                              v-model="query.userId"-->
                          <!--                              ref="idInputRef"-->
                          <!--                            />-->
                          <!--                          </div>-->
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          휴대전화
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
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
                                  message:
                                    '휴대폰 첫 번째 자리가 잘못되었습니다.'
                                }
                              ]"
                            >
                              <a-select
                                class="common-select"
                                placeholder="선택"
                                v-model:value="query.firstTelNo"
                                :disabled="certNumVerify.certNumVerify"
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
                                  message:
                                    '휴대폰 두 번째 자리가 잘못되었습니다.'
                                }
                              ]"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="query.secondTelNo"
                                :disabled="certNumVerify.certNumVerify"
                                maxlength="4"
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
                                  message:
                                    '휴대폰 세 번째 자리가 잘못되었습니다.'
                                }
                              ]"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="query.thirdTelNo"
                                :disabled="certNumVerify.certNumVerify"
                                maxlength="4"
                              />
                            </a-form-item>
                            <common-mbr-mbltelno-cert-button
                              api="/api/login/id/sms/send"
                              :value="`${query.firstTelNo}-${query.secondTelNo}-${query.thirdTelNo}`"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          인증번호
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <div class="item-column">
                            <a-form-item
                              name="certNum"
                              label="인증번호입력"
                              :labelCol="{ class: 'sr-only' }"
                              :rules="[
                                {
                                  required: true,
                                  message: '인증번호를 입력해주세요.'
                                }
                              ]"
                            >
                              <a-input
                                type="text"
                                class="text-bx full"
                                id="user-id-input"
                                v-model:value="query.certNum"
                                :disabled="certNumVerify.certNumVerify"
                                ref="certNumVerifyRef"
                              />
                            </a-form-item>

                            <common-cert-button :value="query.certNum" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <CommonButtonGroup align="center">
                  <CommonButton
                    type="submit"
                    title="비밀번호 재설정"
                    variants="primary"
                    width="xxl"
                  >
                    비밀번호 재설정
                  </CommonButton>
                </CommonButtonGroup>
              </a-form>
            </TabItem>
            <TabItem title="간편인증으로 찾기">
              <div class="tab-content-box">
                <!-- 비밀번호 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. start -->
                <div class="auth-box">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-xl-6 col-12">
                      <div class="info-box">
                        <div class="img-box">
                          <img src="/image/sub/login/login01.svg" alt="" />
                        </div>
                        <div class="text-box">
                          <strong>간편 인증</strong>
                          <p>
                            민간인증서를 통해 편리하게<br />
                            본인확인을 받을 수 있는 서비스입니다.
                          </p>
                        </div>
                        <div class="button-box">
                          <button
                            type="button"
                            title="간편인증으로 비밀번호 찾기"
                            class="btn-basic primary"
                            @click="modal3.openModal()"
                          >
                            <span class="text">간편인증으로 비밀번호 찾기</span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/join/certification_go.svg"
                                alt="인증하기"
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 비밀번호 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. end -->
              </div>
            </TabItem>
            <TabItem title="이메일로 찾기">
              <a-form
                :model="query"
                @finish="secondOnFinish"
                @finishFailed="secondOnFinishFailed"
              >
                <div class="common-form__area">
                  <span class="info-txt">
                    <span class="red-span">*</span>
                    표시는 필수 입력 사항입니다.</span
                  >
                  <table>
                    <caption>
                      이메일로 찾기의 이름, 아이디, 이메일 입력의 관한 표
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">
                          이름
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <a-form-item
                            name="mbrNm"
                            label="이름"
                            :labelCol="{ class: 'sr-only' }"
                            :rules="[
                              {
                                required: true,
                                message: '이름을 입력하세요'
                              }
                            ]"
                          >
                            <a-input
                              type="text"
                              class="text-bx"
                              id="emailUserName"
                              v-model:value="query.mbrNm"
                              ref="idEmailInputRef"
                              placeholder="이름을 입력하세요"
                            />
                          </a-form-item>
                        </td>
                      </tr>
                      <!-- 아이디찾기 이메일로 찾기 시에는 아이디 tr은 없어야 합니다. 이름, 이메일만 있습니다. -->
                      <tr>
                        <th scope="row">
                          아이디
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
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
                              v-model:value="query.userId"
                            />
                          </a-form-item>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          이메일
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
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
                                v-model:value="query.mbrEmlAddr"
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
                                :disabled="!!query.dmnEmlAddrCd"
                                ref="emailCdInput"
                                v-model:value="query.dmnEmlAddr"
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
                                v-model:value="query.dmnEmlAddrCd"
                                @change="emailChange"
                              >
                                <a-select-option value=""
                                  >직접입력</a-select-option
                                >
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
                    </tbody>
                  </table>
                </div>
                <CommonButtonGroup align="center">
                  <CommonButton
                    type="submit"
                    title="이메일 발송"
                    variants="primary"
                    width="xxl"
                  >
                    이메일 발송
                  </CommonButton>
                  <a-modal
                    class="common-modal-wrap modal-basic"
                    v-model:open="modal2.isVisible.value"
                    :maskClosable="false"
                    title="비밀번호 재설정 안내"
                  >
                    <template #footer>
                      <button
                        type="button"
                        class="btn-basic primary"
                        key="submit"
                        @click="moveToLogin"
                      >
                        <span class="text">로그인</span>
                      </button>
                    </template>
                    <div>
                      <p class="text-msg">
                        회원님의 이메일로<br />비밀번호 안내정보를
                        발송하였습니다.
                      </p>
                    </div>
                  </a-modal>
                </CommonButtonGroup>
              </a-form>
            </TabItem>
          </Tab>
        </div>
      </div>
    </section>
    <CommonModal v-model:open="modal1.isVisible.value" title="비밀번호 재설정">
      <a-form
        :model="query"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        name="basic"
      >
        <div v-if="!complete">
          <p class="text-msg">새로 사용할 비밀번호를 입력해주세요.</p>

          <div class="common-form__area">
            <dl class="dp-flex-item">
              <dt>아이디</dt>
              <dd>
                <span class="form-text">{{ searchUserId }}</span>
              </dd>
            </dl>
            <dl class="dp-flex-item">
              <dt>새 비밀번호</dt>
              <dd>
                <div class="input-outline">
                  <div class="input-group__bx">
                    <a-form-item
                      name="userPswd"
                      label="비밀번호"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).{9,}/,
                          required: true,
                          message: '비밀번호 규칙이 올바르지 않습니다.'
                        }
                      ]"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="query.userPswd"
                        type="password"
                      />
                    </a-form-item>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="dp-flex-item">
              <dt>새 비밀번호 확인</dt>
              <dd>
                <div class="input-outline">
                  <div class="input-group__bx">
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
                            if (value !== query.userPswd) {
                              callback('비밀번호가 일치하지 않습니다.');
                            }
                            callback();
                          }
                        }
                      ]"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="query.confirmPassword"
                        type="password"
                      />
                    </a-form-item>
                  </div>
                </div>
              </dd>
            </dl>
            <p class="input-info">
              9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분 ※ 사용은
              불가능한 특수문자 예 : <, > , _ , “, ‘
            </p>
          </div>
          <ButtonGroup align="center">
            <CommonButton class="gray" width="sm" @click="modal1.closeModal()">
              취소
            </CommonButton>
            <CommonButton
              class="primary"
              type="submit"
              width="sm"
              html-type="submit"
            >
              확인
            </CommonButton>
          </ButtonGroup>
        </div>
      </a-form>
      <div v-show="complete">
        <p class="text-msg">
          비밀번호가 재설정 되었습니다.<br />
          변경된 비밀번호로 로그인 하세요.
        </p>
        <CommonButtonGroup align="center">
          <CommonButton variants="primary" @click="moveToLogin"
            >로그인</CommonButton
          >
        </CommonButtonGroup>
      </div>
    </CommonModal>
    <!--    <a-modal-->
    <!--      class="common-modal-wrap modal-basic"-->
    <!--      v-model:open="modal1.isVisible.value"-->
    <!--       -->
    <!--      title="비밀번호 재설정"-->
    <!--    >-->
    <!--      <template #footer>-->
    <!--        <button-->
    <!--          type="button"-->
    <!--          class="btn-basic gray"-->
    <!--          v-if="!complete"-->
    <!--          @click="modal1.closeModal"-->
    <!--        >-->
    <!--          <span class="text">취소</span>-->
    <!--        </button>-->
    <!--        <button-->
    <!--          type="button"-->
    <!--          class="btn-basic primary"-->
    <!--          key="submit"-->
    <!--          v-if="!complete"-->
    <!--          :disabled="-->
    <!--            !verifyPasswordPattern(query.userPswd) ||-->
    <!--            confirmPassword !== query.userPswd-->
    <!--          "-->
    <!--          @click="processChangeSearchPassword"-->
    <!--        >-->
    <!--          <span class="text">확인</span>-->
    <!--        </button>-->

    <!--        <button-->
    <!--          type="button"-->
    <!--          class="btn-basic primary"-->
    <!--          key="submit"-->
    <!--          v-if="complete"-->
    <!--          @click="moveToLogin"-->
    <!--        >-->
    <!--          <span class="text">로그인</span>-->
    <!--        </button>-->
    <!--      </template>-->
    <!--      <div v-if="!complete">-->
    <!--        <p class="text-msg">새로 사용할 비밀번호를 입력해주세요.</p>-->
    <!--        <div class="common-form__area">-->
    <!--          <dl class="dp-flex-item">-->
    <!--            <dt>아이디</dt>-->
    <!--            <dd>-->
    <!--              <span class="form-text">{{ searchUserId }}</span>-->
    <!--            </dd>-->
    <!--          </dl>-->
    <!--          <dl class="dp-flex-item">-->
    <!--            <dt>새 비밀번호</dt>-->
    <!--            <dd>-->
    <!--              <div class="input-outline">-->
    <!--                <div class="input-group__bx">-->
    <!--                  <label for="newpassword"-->
    <!--                    ><span class="sr-only">비밀번호</span></label-->
    <!--                  >-->
    <!--                  <a-input-->
    <!--                    type="password"-->
    <!--                    id="newpassword"-->
    <!--                    class="text-bx"-->
    <!--                    v-model:value="query.userPswd"-->
    <!--                    placeholder="새 비밀번호를 입력하세요"-->
    <!--                  />-->
    <!--                  <span-->
    <!--                    class="ins-text"-->
    <!--                    v-if="!verifyPasswordPattern(query.userPswd)"-->
    <!--                  >-->
    <!--                    비밀번호 규칙이 올바르지 않습니다.-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </dd>-->
    <!--          </dl>-->
    <!--          <dl class="dp-flex-item">-->
    <!--            <dt>새 비밀번호 확인</dt>-->
    <!--            <dd>-->
    <!--              <div class="input-outline">-->
    <!--                <div class="input-group__bx">-->
    <!--                  <label for="newpasswordconfirm"-->
    <!--                    ><span class="sr-only">비밀번호</span></label-->
    <!--                  >-->
    <!--                  <a-input-->
    <!--                    type="password"-->
    <!--                    id="newpasswordconfirm"-->
    <!--                    class="text-bx"-->
    <!--                    v-model:value="confirmPassword"-->
    <!--                    placeholder="새 비밀번호 확인을 입력하세요"-->
    <!--                  />-->
    <!--                  <span-->
    <!--                    class="ins-text"-->
    <!--                    v-if="confirmPassword !== query.userPswd"-->
    <!--                  >-->
    <!--                    비밀번호 규칙이 올바르지 않습니다.-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </dd>-->
    <!--          </dl>-->
    <!--          <p class="input-info">-->
    <!--            9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분 ※ 사용은-->
    <!--            불가능한 특수문자 예 : <, > , _ , “, ‘-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <div v-show="complete">-->
    <!--        <p class="text-msg">-->
    <!--          비밀번호가 재설정 되었습니다.<br />-->
    <!--          변경된 비밀번호로 로그인 하세요.-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </a-modal>-->

    <CommonModal v-model:open="modal4.isVisible.value" title="비밀번호 재설정">
      <a-form
        :model="query"
        @finish="onFinish2"
        @finishFailed="onFinishFailed2"
        name="basic"
      >
        <div v-if="!complete">
          <p class="text-msg">새로 사용할 비밀번호를 입력해주세요.</p>

          <div class="common-form__area">
            <dl class="dp-flex-item">
              <dt>새 비밀번호</dt>
              <dd>
                <div class="input-outline">
                  <div class="input-group__bx">
                    <a-form-item
                      name="userPswd"
                      label="비밀번호"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).{9,}/,
                          required: true,
                          message: '비밀번호 규칙이 올바르지 않습니다.'
                        }
                      ]"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="query.userPswd"
                        type="password"
                      />
                    </a-form-item>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="dp-flex-item">
              <dt>새 비밀번호 확인</dt>
              <dd>
                <div class="input-outline">
                  <div class="input-group__bx">
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
                            if (value !== query.userPswd) {
                              callback('비밀번호가 일치하지 않습니다.');
                            }
                            callback();
                          }
                        }
                      ]"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="query.confirmPassword"
                        type="password"
                      />
                    </a-form-item>
                  </div>
                </div>
              </dd>
            </dl>
            <p class="input-info">
              9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분 ※ 사용은
              불가능한 특수문자 예 : <, > , _ , “, ‘
            </p>
          </div>
          <ButtonGroup align="center">
            <CommonButton class="gray" width="sm" @click="modal4.closeModal()">
              취소
            </CommonButton>
            <CommonButton
              class="primary"
              type="submit"
              width="sm"
              html-type="submit"
            >
              확인
            </CommonButton>
          </ButtonGroup>
        </div>
      </a-form>
      <div v-show="complete">
        <p class="text-msg">
          비밀번호가 재설정 되었습니다.<br />
          변경된 비밀번호로 로그인 하세요.
        </p>
        <CommonButtonGroup align="center">
          <CommonButton variants="primary" @click="moveToLogin"
            >로그인</CommonButton
          >
        </CommonButtonGroup>
      </div>
    </CommonModal>

    <NewModal
      :is-visible="modal3.isVisible.value"
      :close-modal="modal3.closeModal"
      :show-header="true"
      modalClass="easy-modal"
      header-text="간편인증"
      :show-close-button="true"
      headeretctitle="법률구조서비스 플랫폼"
      headeretc-class="modify-new-title-h5"
    >
      <easyauxpopup
        :modal="modal3"
        :visible="modal3.isVisible.value"
        @submit="findUserIdSearchPasswordEasyAuth"
      />
    </NewModal>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/search/pwd.scss';
</style>
