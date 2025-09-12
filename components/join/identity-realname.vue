<script setup lang="ts">
import { useJoinStore } from '~/stores/join';
import dayjs from 'dayjs';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';

const props = withDefaults(
  defineProps<{ mode: 'DOMESTIC' | 'INTERNATIONAL' }>(),
  {
    mode: 'DOMESTIC'
  }
);

const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

const data = ref<{
  name: string;
  jumin1: string;
  jumin2: string;
  captchaNumber: string;
}>({
  name: '',
  jumin1: '',
  jumin2: '',
  captchaNumber: ''
});

const dataNameRef = ref();
const dataJumin1Ref = ref();
const dataJumin2Ref = ref();
const captchaNumberRef = ref();

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

const identityNumberTitle = computed(() => {
  return props.mode === 'DOMESTIC' ? '주민등록번호' : '외국인등록번호';
});

const createChannel = () => {
  const channel = new BroadcastChannel('auth');

  const messageFn = async (event: any) => {
    if (event.data === 'success') {
      const data = await joinStore.searchAuthResult();
      joinRequest.value.mbrNm = data.name;
      joinRequest.value.mbrBrdt = data.birth;
      joinRequest.value.mbrGndrCd = data.gender;

      const birth = dayjs(data.birth, 'YYYYMMDD');
      const diff = dayjs().diff(birth, 'year');

      if (diff < 14) {
        joinRequest.value.mbrTypeCd = 'U01';
      }

      if (
        joinRequest.value.certTypeCd === '001' ||
        joinRequest.value.certTypeCd === '002'
      ) {
        await showAlert({
          icon: 'info',
          html: '인증이 완료되었습니다.'
        });
      } else if (joinRequest.value.certTypeCd === '002') {
        await showAlert({
          icon: 'info',
          text: '실명인증이 완료되었습니다.'
        });
      }

      channel.close();
      await router.push('/join/memberinfo', { external: true });
      return;
    }

    if (event.data === 'duplicate') {
      await showAlert({
        icon: 'info',
        html: '이미 가입되어 있는 정보입니다.<br/>로그인이나 아이디 찾기를<br/>진행하여 주시기 바랍니다.'
      });

      channel.close();
      await router.push('/login', { external: true });
      return;
    }

    if (event.data === 'fail') {
      if (joinRequest.value.certTypeCd === '003') {
        await showAlert({
          icon: 'info',
          html: `실명인증에 실패하였습니다.<br />이름, ${nameTitle}를 확인하십시오.`
        });
      }
    }
  };

  window.addEventListener('message', messageFn);
};

const requestVerify = () => {
  if (!data.value.name) {
    message.error('이름을 입력해주세요.');
    dataNameRef.value.focus();
    return;
  }
  if (data.value.jumin1.length != 6) {
    message.error('주민등록번호 앞자리가 잘못되었습니다.');
    dataJumin1Ref.value.focus();
    return;
  }
  if (data.value.jumin2.length != 7) {
    message.error('주민등록번호 뒷자리가 잘못되었습니다.');
    dataJumin2Ref.value.focus();
    return;
  }
  if (!data.value.captchaNumber) {
    message.error('자동입력방지문자를 입력해주세요.');
    captchaNumberRef.value.focus();
    return;
  }
  createChannel();
  joinRequest.value.certTypeCd = '003';
  document.auth.submit();
};

const router = useRouter();
const goBack = () => {
  router.back();
};

const disabled = computed(
  () =>
    data.value.name.length < 2 ||
    data.value.jumin1.length !== 6 ||
    data.value.jumin2.length !== 7 ||
    data.value.captchaNumber.length !== 6
);
</script>

<template>
  <form
    name="auth"
    action="/auth/name/request"
    method="post"
    target="_blank"
    title="새 창 열림"
  >
    <input type="hidden" name="name" v-model="data.name" />
    <input type="hidden" name="jumin1" v-model="data.jumin1" />
    <input type="hidden" name="jumin2" v-model="data.jumin2" />
    <input type="hidden" name="captchaNumber" v-model="data.captchaNumber" />
  </form>

  <section class="section2">
    <div class="container">
      <div class="info-wrap">
        <span class="red-span">*</span>
        <span class="text-span">표시는 필수 입력 사항입니다.</span>
        <div class="info-box">
          <div class="row">
            <div class="col-xl-4 col-12">
              <div class="title-box">
                <strong>이름</strong>
                <span class="red-span"
                  >*<span class="sr-only">필수 입력 항목</span></span
                >
              </div>
            </div>

            <div class="col-xl-8 col-12">
              <div class="input-box">
                <label for="name-input">
                  <span class="sr-only">이름 입력</span>
                </label>
                <a-input
                  type="text"
                  id="name-input"
                  class="text-bx"
                  maxlength="30"
                  v-model:value="data.name"
                  ref="dataNameRef"
                />
              </div>
            </div>

            <div class="col-xl-4 col-12">
              <div class="title-box">
                <strong>{{ identityNumberTitle }}</strong>
                <span class="red-span"
                  >* <span class="sr-only">필수 입력 항목</span></span
                >
              </div>
            </div>

            <div class="col-xl-8 col-12">
              <div class="input-box input-group-box">
                <label for="number-input1">
                  <span class="sr-only"
                    >{{ identityNumberTitle }} 앞자리 입력</span
                  >
                </label>
                <common-number-input
                  key="number-input1"
                  class="text-bx"
                  style="width: 100%"
                  id="number-input1"
                  type="text"
                  maxlength="6"
                  v-model="data.jumin1"
                  pattern="[0-9]*"
                  ref="dataJumin1Ref"
                />
                <span class="dash">-</span>
                <label for="number-input2">
                  <span class="sr-only"
                    >{{ identityNumberTitle }} 뒷자리 입력</span
                  >
                </label>
                <common-number-input
                  key="number-input2"
                  class="text-bx"
                  style="width: 100%"
                  id="number-input2"
                  type="password"
                  maxlength="7"
                  v-model="data.jumin2"
                  ref="dataJumin2Ref"
                />
              </div>
            </div>

            <div class="col-xl-4 col-12">
              <div class="title-box">
                <strong>자동입력방지문자</strong>
                <span class="red-span"
                  >*<span class="sr-only">필수 입력 항목</span></span
                >
              </div>
            </div>

            <div class="col-xl-8 col-12">
              <div class="input-box input-group-box flex-box">
                <img
                  :src="captchaImageUrl"
                  alt="자동입력 방지 문자"
                  style="height: 30px"
                />
                <button
                  type="button"
                  class="btn-basic sm"
                  title="새로고침"
                  @click="reloadCaptchaImage"
                >
                  <span class="text">새로고침</span>
                </button>
                <button
                  type="button"
                  class="btn-basic sm"
                  title="음성듣기"
                  @click="playCaptchaAudio"
                >
                  <span class="text">음성듣기</span>
                </button>
              </div>
              <div class="recapchar-input-box">
                <label for="recapchar-input">
                  <span class="sr-only">자동입력방지문자 입력</span>
                </label>
                <common-number-input
                  key="recapchar-input"
                  type="text"
                  class="text-bx"
                  id="recapchar-input"
                  maxlength="6"
                  v-model="data.captchaNumber"
                  ref="captchaNumberRef"
                />
                <span>자동입력 방지문자를 입력하세요.</span>
              </div>
            </div>
          </div>
        </div>

        <CommonButtonGroup align="center">
          <CommonButton title="취소" variants="gray" width="sm" @click="goBack">
            <span class="text">취소</span>
          </CommonButton>
          <CommonButton
            title="취소"
            variants="primary"
            width="sm"
            @click="requestVerify"
          >
            <span class="text">확인</span>
          </CommonButton>
        </CommonButtonGroup>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use './scss/identity-realname';
</style>
