<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import { useModal } from '~/composables/useModal';
import Modal from '~/components/common/modal.vue';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { ref } from 'vue';
import NewModal from '~/components/common/Newmodal.vue';
import { useSearchIdStore } from '~/stores/login/id';
import { useVerifyStore } from '~/stores/login/verify';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import Icon from '~/components/ui/icon/icon.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { find } from 'lodash-es';

const router = useRouter();
const modal1 = useModal();
const modal2 = useModal();
const modal3 = useModal();

const { showAlert } = useCustomAlert();

const searchIdStore = useSearchIdStore();
const { query } = storeToRefs(searchIdStore);

const verifyStore = useVerifyStore();
const { certNumVerify } = storeToRefs(verifyStore);

onBeforeMount(async () => {
  searchIdStore.resetQuery();
  verifyStore.resetCertNumVerify();
});

const result = ref({});

const captchaImageUrl = ref('/api/captcha');

const reload = ref('');

const idInputRef = ref();
const idEmailInputRef = ref();
const captchaNumInputRef = ref();
const secondTelNoRef = ref();
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

const processSearchIdEasyAuth = () => {
  searchIdStore
    .processSearchIdEasyAuth()
    .then(({ data }) => {
      if (!data) {
        showAlert({ icon: 'info', text: '가입정보를 확인해주세요.' });
        return;
      }
      result.value = data;
      searchIdStore.resetQuery();
      modal1.openModal();
    })
    .catch(() => {
      showAlert({ icon: 'info', text: '가입정보를 확인해주세요.' });
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

  searchIdStore
    .processSearchIdVerifySms(query.value)
    .then(({ data }) => {
      if (!data) {
        showAlert({ icon: 'info', text: '아이디 정보를 찾을 수 없습니다.' });
        return;
      }
      result.value = data;
      searchIdStore.resetQuery();
      certNumVerify.value.certNumVerify = false;
      reloadCaptchaImage();
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

  searchIdStore
    .processSearchIdSendEmail(query.value)
    .then(() => {
      modal3.openModal();
    })
    .catch((error) => {
      if (error.status === 400) {
        showAlert({ icon: 'error', text: '아이디 정보를 찾을 수 없습니다.' });
        return;
      }
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
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- 비밀번호 찾기, 아이디찾기, 장기 미사용 안내는 폼이 동일하거나 추가가 되어 있습니다. 장기 미사용 휴면계정 안내 result는 dormancy.vue에 있습니다.-->
        <breadcrumb
          breadcrumb-title="아이디 찾기"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '아이디 찾기', active: true }
          ]"
        />
        <div class="tab-box" id="password-tab-box">
          <Tab class="type-full">
            <TabItem title="휴대폰으로 찾기">
              <a-form
                class="tab-content-box"
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
                      휴대푠으로 찾기의 이름, 자동입력방지문자, 휴대전화,
                      인증번호 입력의 관련 표
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
                      <tr>
                        <th scope="row">
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

                          <!--                          <div class="item-column">-->
                          <!--                            <common-tel-num-input-->
                          <!--                              v-model="query.mbrMblTelno"-->
                          <!--                              cd-group-id="CO0017"-->
                          <!--                              ref="secondTelNoRef"-->
                          <!--                            />-->
                          <!--                            <common-mbr-mbltelno-cert-button-->
                          <!--                              api="/api/login/id/sms/send"-->
                          <!--                              :value="query.mbrMblTelno"-->
                          <!--                            />-->
                          <!--                          </div>-->
                        </td>
                      </tr>
                      <tr>
                        <th>
                          인증번호
                          <span class="red-span"
                            >* <span class="sr-only">필수 입력 항목</span></span
                          >
                        </th>
                        <td>
                          <div class="form-item__number">
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
                  <!-- 아이디 찾기일시 버튼 텍스트는 아이디 찾기로 바뀌어야 합니다. -->
                  <CommonButton
                    title="아이디 찾기"
                    variants="primary"
                    width="xxl"
                    type="submit"
                  >
                    <!--@click="processSearchIdVerifySms"-->
                    아이디 찾기
                  </CommonButton>
                </CommonButtonGroup>
              </a-form>
            </TabItem>
            <TabItem title="간편인증으로 찾기">
              <div class="tab-content-box">
                <!-- 아이디 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. start -->
                <div class="auth-box">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-xl-6 col-12">
                      <div class="info-box">
                        <div class="text-box">
                          <strong>간편 인증</strong>
                          <p>
                            민간인증서를 통해 편리하게<br />
                            본인확인을 받을 수 있는 서비스입니다.
                          </p>
                        </div>
                        <div class="button-box">
                          <CommonButton
                            variants="primary"
                            title="간편인증으로 아이디 찾기"
                            width="xxl"
                            @click="modal2.openModal()"
                          >
                            <span class="text">간편인증으로 아이디 찾기</span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/join/certification_go.svg"
                                alt="인증하기"
                              />
                            </span>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 아이디 간편인증 찾기 입니다 아이디 간편인증 찾기에는 위 table-box, button-box는 없고 이부분만 있어야 합니다. end -->
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
                    표시는 필수 입력 사항입니다.
                  </span>
                  <table>
                    <caption>
                      이메일로 찾기의 이름, 이메일 입력의 관한 표
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
                          <!--                          <div class="email-confirm-box">-->
                          <!--                            <common-email-input-->
                          <!--                              v-model:mbr-eml-addr="query.mbrEmlAddr"-->
                          <!--                              v-model:dmn-eml-addr-cd="query.dmnEmlAddrCd"-->
                          <!--                              v-model:dmn-eml-addr="query.dmnEmlAddr"-->
                          <!--                              ref="emailInputRef"-->
                          <!--                            />-->
                          <!--                          </div>-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <CommonButtonGroup align="center">
                  <CommonButton
                    variants="primary"
                    width="xxl"
                    title="아이디 찾기"
                    type="submit"
                  >
                    <span class="text">아이디 찾기</span>
                  </CommonButton>
                  <CommonModal
                    v-model:open="modal3.isVisible.value"
                    :maskClosable="false"
                    title="주소 검색"
                  >
                    <div>
                      <p class="text-msg">
                        회원님의 이메일로<br />아이디 정보를 발송하였습니다.
                      </p>
                    </div>
                    <template #footer>
                      <CommonButton
                        variants="primary"
                        key="submit"
                        @click="modal3.closeModal"
                      >
                        확인
                      </CommonButton>
                    </template>
                  </CommonModal>
                </CommonButtonGroup>
              </a-form>
            </TabItem>
          </Tab>
        </div>
      </div>
      <CommonModal
        ref="modalRef2"
        title="아이디 찾기 결과"
        v-model:open="modal1.isVisible.value"
        :maskClosable="false"
      >
        <template #footer>
          <CommonButton
            width="md"
            variants="primary"
            key="submit"
            @click="moveToLogin"
          >
            로그인
          </CommonButton>
        </template>
        <div>
          <p class="text-msg">회원님의 아이디 정보 입니다.</p>
          <div class="user-info__result">
            <dl>
              <dt>아이디</dt>
              <dd>{{ result.userId }}</dd>
            </dl>
          </div>
        </div>
      </CommonModal>
    </section>
    <NewModal
      :is-visible="modal2.isVisible.value"
      :close-modal="modal2.closeModal"
      :show-header="true"
      modalClass="easy-modal"
      header-text="간편인증"
      :show-close-button="true"
      headeretctitle="법률구조서비스 플랫폼"
      headeretc-class="modify-new-title-h5"
    >
      <easyauxpopup
        :modal="modal2"
        :visible="modal2.isVisible.value"
        @submit="processSearchIdEasyAuth"
      />
    </NewModal>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/search/id.scss';
</style>
