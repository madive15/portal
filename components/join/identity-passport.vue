<script setup lang="ts">
import { useJoinStore } from '~/stores/join';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

const { showAlert } = useCustomAlert();

const data = ref<{
  mbrNm: string;
  pno: string;
  mbrNtn: string;
  mbrBrdt: string;
  captchaNumber: string;
}>({ mbrNm: '', pno: '', mbrNtn: '', mbrBrdt: '', captchaNumber: '' });

const mbrNmRef = ref();
const pnoRef = ref();
const mbrNtnRef = ref();
const mbrBrdtRef = ref();
const captchaNumberRef = ref();

const next = () => {
  if (!data.value.mbrNm) {
    message.error('이름을 입력해주세요.');
    mbrNmRef.value.focus();
    return;
  }
  if (!data.value.pno) {
    message.error('여권번호를 입력해주세요.');
    pnoRef.value.focus();
    return;
  }
  if (!data.value.mbrNtn) {
    message.error('국적을 선택해주세요.');
    mbrNtnRef.value.focus();
    return;
  }
  if (!data.value.mbrBrdt) {
    message.error('생년월일을 입력해주세요.');
    mbrBrdtRef.value.focus();
    return;
  }
  if (!data.value.captchaNumber) {
    message.error('자동입력방지문자를 입력해주세요.');
    captchaNumberRef.value.focus();
    return;
  }
  joinRequest.value.mbrNm = data.value.mbrNm;
  joinRequest.value.pno = data.value.pno;
  joinRequest.value.mbrNtn = data.value.mbrNtn;
  joinRequest.value.mbrBrdt = data.value.mbrBrdt;
  joinRequest.value.captchaNumber = data.value.captchaNumber;

  joinStore
    .updateJoinRequest()
    .then(() => {
      router.push('/join/memberinfo', { external: true });
    })
    .catch((e) => {
      if (e.status === 400) {
        showAlert({
          icon: 'error',
          text: '자동 입력 방지 문자가 틀렸습니다.'
        });
      } else {
        // showAlert({
        //   icon: 'error',
        //   text: '여권 정보 처리에 실패하였습니다.'
        // });
      }
    });
};

const disabled = computed(() => {
  return (
    data.value.mbrNm.length < 2 ||
    data.value.pno.length < 3 ||
    !data.value.mbrNtn ||
    data.value.mbrBrdt.length !== 8 ||
    data.value.captchaNumber.length !== 6
  );
});

const ntnCodeList = ref([]);

onBeforeMount(() => {
  useCommonCodeStore()
    .searchNtnCodeList()
    .then((data) => {
      ntnCodeList.value = data;
    });
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

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
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
            <label for="passUserName">
              <span class="sr-only">이름 입력</span>
            </label>
            <a-input
              id="passUserName"
              maxlength="40"
              ref="mbrNmRef"
              type="text"
              class="text-bx"
              v-model:value="data.mbrNm"
            />
          </div>
        </div>

        <div class="col-xl-4 col-12">
          <div class="title-box">
            <strong>여권번호</strong>
            <span class="red-span"
              >*<span class="sr-only">필수 입력 항목</span></span
            >
          </div>
        </div>

        <div class="col-xl-8 col-12">
          <div class="input-box">
            <label for="passNumber">
              <span class="sr-only">여권번호 입력</span>
            </label>
            <a-input
              id="passNumber"
              maxlength="30"
              ref="pnoRef"
              type="text"
              class="text-bx"
              v-model:value="data.pno"
            />
          </div>
        </div>

        <div class="col-xl-4 col-12">
          <div class="title-box">
            <strong>국적</strong>
            <span class="red-span"
              >*<span class="sr-only">필수 입력 항목</span></span
            >
          </div>
        </div>
        <div class="col-xl-8 col-12">
          <div class="input-box">
            <label for="passCountrySelect">
              <span class="sr-only">국적 선택</span>
            </label>
            <a-select
              id="passCountrySelect"
              class="common-select"
              v-model:value="data.mbrNtn"
              ref="mbrNtnRef"
              placeholder="선택"
            >
              <a-select-option
                v-for="ntnCode in ntnCodeList"
                :key="ntnCode.value"
                :value="ntnCode.value"
              >
                {{ ntnCode.label }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="col-xl-4 col-12">
          <div class="title-box">
            <strong>생년월일</strong>
            <span class="red-span"
              >*<span class="sr-only">필수 입력 항목</span></span
            >
          </div>
        </div>
        <div class="col-xl-8 col-12">
          <div class="input-box">
            <label for="passBirthDay">
              <span class="sr-only">생년월일 입력</span>
            </label>
            <common-number-input
              key="name-input"
              class="text-bx"
              id="passBirthDay"
              maxlength="8"
              v-model="data.mbrBrdt"
              ref="mbrBrdtRef"
              placeholder="생년월일 8자리 (YYYY-MM-DD)"
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
            <img :src="captchaImageUrl" alt="자동입력 방지 문자" class="h-8" />
            <button
              type="button"
              title="새로고침"
              class="btn-basic sm"
              @click="reloadCaptchaImage"
            >
              <span class="text">새로고침</span>
            </button>
            <button
              type="button"
              title="음성듣기"
              class="btn-basic sm"
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
      <CommonButton title="확인" variants="primary" width="sm" @click="next">
        <span class="text">확인</span>
      </CommonButton>
    </CommonButtonGroup>
  </div>
</template>

<style scoped lang="scss">
@use './scss/identity-passport';
</style>
