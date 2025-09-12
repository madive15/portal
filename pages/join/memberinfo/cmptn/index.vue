<script setup lang="ts">
import { useRouter } from 'vue-router';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGrouop from '~/components/ui/button/buttonGroup.vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useJoinStore } from '~/stores/join';

const router = useRouter();
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);
const goToHome = () => {
  router.push('/', { external: true });
};
onMounted(() => {
  sessionStorage.removeItem('signUpVerify');
});
const goToLogin = () => {
  router.push('/login', { external: true });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="회원가입"
          :breadcrumbItems="[{ text: '회원가입', active: true }]"
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
              <div class="step-text-box">
                <strong>04.</strong>
                <span>정보입력</span>
              </div>
            </li>

            <li class="col-xl col-12 step5">
              <div class="step-text-box active">
                <strong>05.</strong>
                <span>가입완료<span class="sr-only">(현재단계)</span></span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section2">
      <div class="container">
        <div class="logo-box">
          <img
            src="~/assets/image/main/hd_logo.png"
            alt="회원가입 완료 법률구조플랫폼"
          />
          <h4>회원가입이 완료되었습니다.</h4>
        </div>
        <div class="text-box">
          <div class="info-box">
            <span class="title-span">아이디</span>
            <span class="vr"></span>
            <span class="id-span">{{ joinRequest.userId }}</span>
          </div>
          <p>
            회원가입을 진심으로 축하드립니다.<br />
            법률구조플랫폼에서 제공하는 회원서비스를 자유롭게 이용하실 수
            있습니다.
          </p>
        </div>
        <CommonButtonGrouop align="center">
          <CommonButton variants="gray" width="sm" @click="goToHome">
            홈으로
          </CommonButton>
          <CommonButton variants="primary" width="sm" @click="goToLogin">
            로그인
          </CommonButton>
        </CommonButtonGrouop>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/memberinfo/cmptn/index.scss';
</style>
