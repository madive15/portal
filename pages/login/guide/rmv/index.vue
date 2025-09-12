<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';

const router = useRouter();
const { showAlert } = useCustomAlert();
const data = ref({
  mbrNm: '',
  userId: '',
  mbrMblTelno: '--',
  captchaNumber: '',
  certNum: '',
  mbrEmlAddr: '',
  dmnEmlAddr: '',
  dmnEmlAddrCd: ''
});

const captchaImageUrl = ref('/api/captcha');
const reload = ref('');
const reloadCaptchaImage = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomValue = array[0] / (0xffffffff + 1);
  reload.value = '?reload=' + randomValue;
  captchaImageUrl.value = '/api/captcha' + reload.value;
};

const playCaptchaAudio = () => {
  const audio = new Audio('/api/captcha/audio?' + reload.value);
  audio.play();
};

const disabledMobile = computed(
  () =>
    data.value.mbrNm.length < 2 ||
    data.value.userId.length < 6 ||
    data.value.mbrMblTelno.length < 12 ||
    data.value.captchaNumber.length !== 6 ||
    data.value.certNum.length !== 6
);

const handleRmvSmsMbr = async () => {
  useAxios()
    .post('/api/cert/rmv/sms', data.value)
    .then(async () => {
      await showAlert({
        icon: 'success',
        text: '사용자 잠김 처리가 해제되었습니다.'
      });

      await router.push('/login', { external: true });
    });
};

const handleRmvCertMbr = () => {
  showAlert({
    icon: 'error',
    text: '간편인증은 아직 지원하지 않습니다.'
  });
};

const disabledEmail = computed(
  () =>
    data.value.mbrNm.length < 2 ||
    data.value.userId.length < 6 ||
    data.value.mbrEmlAddr.length < 4 ||
    !data.value.dmnEmlAddr
);

const handleRmvEmailMbr = () => {
  useAxios()
    .post('/api/cert/email', data.value)
    .then(async () => {
      await showAlert({
        icon: 'success',
        text: '사용자 잠김 해제 메일을 발송하였습니다.'
      });

      await router.push('/login', { external: true });
    });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="장기미사용 해제"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '장기미사용 해제', active: true }
          ]"
        />
        <div class="tab-box" id="password-tab-box">
          <Tab class="type-full">
            <TabItem title="휴대폰으로 찾기">
              <div class="tab-content-box">
                <div class="table-box">
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
                            <label for="user-name-input">
                              <span class="sr-only">이름 입력</span>
                            </label>
                            <input
                              type="text"
                              class="form-control name-input"
                              id="user-name-input"
                              maxlength="50"
                              v-model="data.mbrNm"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          자동입력방지문자
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <div class="group-box head-group-box">
                            <img
                              :src="captchaImageUrl"
                              alt="자동입력 방지 문자"
                              class="h-8"
                            />
                            <button
                              type="button"
                              class="btn reflash-button"
                              @click="reloadCaptchaImage"
                            >
                              <span class="icon-span">
                                <img
                                  src="/image/sub/login/btn_refresh.svg"
                                  alt="새로고침"
                                />
                              </span>
                              <span class="text-span">새로고침</span>
                            </button>
                            <button type="button" class="btn voice-button">
                              <span class="icon-span">
                                <img
                                  src="/image/sub/login/btn_voice.svg"
                                  alt="음성듣기"
                                />
                              </span>
                              <span class="text-span" @click="playCaptchaAudio"
                                >음성듣기</span
                              >
                            </button>
                          </div>
                          <label for="numinput2">
                            <span class="sr-only">자동입력 방지문자 입력</span>
                          </label>
                          <common-number-input
                            key="recapchar-input"
                            class="form-control number-confirm-input"
                            id="numinput2"
                            maxlength="6"
                            v-model="data.captchaNumber"
                            placeholder="자동입력 방지문자를 입력하세요"
                          />
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
                          <div class="lost-box">
                            <label for="user-id-input">
                              <span class="sr-only">아이디 입력</span>
                            </label>
                            <input
                              type="text"
                              class="form-control id-input"
                              id="user-id-input"
                              v-model="data.userId"
                              maxlength="16"
                            />
                          </div>
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
                          <div class="cellphone-wrap">
                            <common-tel-num-input
                              v-model="data.mbrMblTelno"
                              cd-group-id="CO0017"
                            />
                            <common-mbr-mbltelno-cert-button
                              :value="data.mbrMblTelno"
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
                          <div class="lost-box">
                            <label for="user-id-input">
                              <span class="sr-only">인증번호 입력</span>
                            </label>
                            <input
                              type="text"
                              class="form-control id-input"
                              id="user-id-input"
                              maxlength="6"
                              v-model="data.certNum"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="button-box">
                  <button
                    type="button"
                    class="btn confirm-button"
                    :disabled="disabledMobile"
                    @click="handleRmvSmsMbr"
                  >
                    휴대전화 인증
                  </button>
                </div>
              </div>
            </TabItem>
            <TabItem title="간편인증으로 찾기">
              <div class="tab-content-box">
                <!-- 아이디 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. start -->
                <div class="auth-box">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-xl-6 col-12">
                      <div class="info-box">
                        <div class="img-box">
                          <img
                            src="/image/sub/login/login01.svg"
                            alt="간편인증"
                          />
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
                            class="btn cellphone-button"
                            @click="handleRmvCertMbr"
                          >
                            <span class="text-span">간편인증</span>
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
                <!-- 아이디 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. end -->
              </div>
            </TabItem>
            <TabItem title="이메일로 찾기">
              <div class="tab-content-box">
                <div class="table-box">
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
                          <div class="lost-box">
                            <label for="user-name-input">
                              <span class="sr-only">이름 입력</span>
                            </label>
                            <input
                              type="text"
                              class="form-control name-input"
                              id="user-name-input"
                              v-model="data.mbrNm"
                              maxlength="50"
                            />
                          </div>
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
                          <div class="lost-box">
                            <label for="user-id-input">
                              <span class="sr-only">아이디 입력</span>
                            </label>
                            <input
                              type="text"
                              class="form-control id-input"
                              id="user-id-input"
                              maxlength="16"
                              v-model="data.userId"
                            />
                          </div>
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
                          <div class="email-confirm-box">
                            <common-email-input
                              v-model:mbr-eml-addr="data.mbrEmlAddr"
                              v-model:dmn-eml-addr-cd="data.dmnEmlAddrCd"
                              v-model:dmn-eml-addr="data.dmnEmlAddr"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="button-box">
                  <button
                    type="button"
                    class="btn confirm-button"
                    :disabled="disabledEmail"
                    @click="handleRmvEmailMbr"
                  >
                    이메일 발송
                  </button>
                </div>
              </div>
            </TabItem>
          </Tab>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/guide/rmv/index.scss';
</style>
