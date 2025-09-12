<script setup lang="ts">
import { useAxios } from '~/composables/useAxios';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useVerifyStore } from '~/stores/login/verify';
import CommonButton from '~/components/ui/button/button.vue';

const { showAlert } = useCustomAlert();

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});

const verifyStore = useVerifyStore();
const { certNumVerify } = storeToRefs(verifyStore);

// const disabled = computed(() => props.value?.length < 6);

const handleRequest = () => {
  if (props.value?.length == 0) {
    showAlert({
      icon: 'info',
      text: '인증번호를 입력해주세요.'
    });
  } else {
    verifyStore
      .processCertVerifySms(props.value as string)
      .then(() => {
        certNumVerify.value.certNumVerify = true;
        showAlert({ icon: 'success', text: '인증되었습니다' });
      })
      .catch((e) => {
        message.error('인증번호 문자가 일치하지 않습니다.');
      });
  }
};
</script>

<template>
  <CommonButton variants="gray" @click="handleRequest"> 인증확인 </CommonButton>
</template>

<style scoped lang="scss">
@use './scss/CertButton';
</style>
