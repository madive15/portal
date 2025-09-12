<script setup lang="ts">
import { useAxios } from '~/composables/useAxios';
import { storeToRefs } from 'pinia';
import { useVerifyStore } from '~/stores/login/verify';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonButton from '~/components/ui/button/button.vue';
const props = defineProps({
  value: {
    type: String,
    required: true
  },
  api: {
    type: String,
    required: true
  }
});

const verifyStore = useVerifyStore();
const { certNumVerify } = storeToRefs(verifyStore);
const { showAlert } = useCustomAlert();

const disabled = computed(() => props.value?.length < 12);

const isRequested = ref(false);
const requestTime = ref(0);
const isTimeout = computed(() => isRequested.value && requestTime.value === 0);
const timer = ref();

const btnTtl = ref('인증번호 발송');

const handleRequest = () => {
  // 유효한 휴대번호인지 확인
  const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  if (props.value?.length < 12 || !regex.test(props.value)) {
    showAlert({
      icon: 'info',
      text: '휴대전화 번호를 입력해주세요.'
    });
  } else {
    useAxios()
      .post(props.api, {
        mbrMblTelno: props.value
      })
      .then(() => {
        isRequested.value = true;

        btnTtl.value = '인증번호 재발송';

        requestTime.value = 180;
        timer.value = setInterval(() => {
          requestTime.value--;
          if (requestTime.value === 0) {
            clearInterval(timer.value);
            return;
          }
        }, 1000);
      });
  }
};

watch(requestTime, (newValue) => {
  if (timer && newValue < 1) {
    clearInterval(timer.value);
  }
});

const timeout = computed(() => {
  const minutes = Math.floor(requestTime.value / 60);
  const second = requestTime.value % 60;

  return `${minutes > 0 ? minutes + '분 ' : ''}${String(second).padStart(2, '0')}초`;
});

watch(certNumVerify.value, (newValue) => {
  if (newValue.certNumVerify) {
    requestTime.value = 0;
    isRequested.value = false;
  } else {
    requestTime.value = 0;
    isRequested.value = false;
    btnTtl.value = '인증번호 발송';
  }
});
</script>

<template>
  <!--  <button-->
  <!--    class="btn normal-button"-->
  <!--    @click="handleRequest"-->
  <!--    :disabled="disabled || certNumVerify.certNumVerify"-->
  <!--  >-->
  <CommonButton variants="gray" @click="handleRequest">
    {{ btnTtl }}
  </CommonButton>
  <span v-if="requestTime > 0">{{ timeout }}</span>
  <span v-if="isTimeout && !certNumVerify.certNumVerify">
    인증번호 유효시간이 만료되었습니다. 새로 발송해주세요.
  </span>
</template>

<style scoped lang="scss">
@use './scss/MbrMbltelnoCertButton';
</style>
