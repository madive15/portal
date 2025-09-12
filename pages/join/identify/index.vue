<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useJoinStore } from '~/stores/join';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';

const router = useRouter();
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

const { showAlert } = useCustomAlert();
const radioSelected = ref(joinRequest.value.certTypeCd);

const handleRadioChange = (event) => {
  console.log(event)
  joinRequest.value.certTypeCd = event.target.value;
}

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
              <div class="step-text-box active">
                <strong>03.</strong>
                <span>본인확인<span class="sr-only">(현재단계)</span></span>
              </div>
            </li>

            <li class="col-xl col-12 step4">
              <div class="step-text-box">
                <strong>04.</strong>
                <span>정보입력</span>
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

        <div class="text-box" v-if="joinRequest.mbrTypeCd === 'U02'">
          <ul>
            <li>회원가입을 하기 위해서는 반드시 본인인증을 해야 합니다.</li>
            <li>
              만 14세 미만 아동은 회원가입 시, 보호자의 동의가 함께 진행되어야
              합니다.
            </li>
            <li>
              개인정보보호법 제22조 6항 및 정보통신망법 제31조 1항에 따라, 만
              14세 미만 아동은 회원가입 시 보호자(법정대리인)의 동의 없이는
              회원가입을 할 수 없습니다.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <template v-if="joinRequest.mbrTypeCd === 'U02'">
      <div class="mt-20">
        <join-identity-mobile-ipin />
      </div>
    </template>

    <template v-if="joinRequest.mbrTypeCd === 'O01'">
      <div class="mt-20">
        <join-identity-realname mode="DOMESTIC" />
      </div>
    </template>

    <template
      v-if="joinRequest.mbrTypeCd === 'F01' || joinRequest.mbrTypeCd === 'E99'"
    >
      <section class="section2 mt-30">
        <div class="container">
          <div class="cert-radio-box">
            <div class="form-check">
              <a-radio-group v-model:value="radioSelected" @change="handleRadioChange">
                <a-radio type="radio" name="type" id="type1" class="radio-bx" value="003">등록외국인<br class="mo-only" />(실명확인)</a-radio>
                <a-radio type="radio" name="type" id="type2" class="radio-bx" value="001">등록외국인<br class="mo-only" />(본인확인)</a-radio>
                <a-radio type="radio" name="type" id="type3" class="radio-bx" value="004">미등록외국인<br class="mo-only" />(여권)</a-radio>
              </a-radio-group>
            </div>
          </div>

          <template v-if="joinRequest.certTypeCd === '003'">
            <join-identity-realname mode="INTERNATIONAL" />
          </template>
          <template
            v-if="
              joinRequest.certTypeCd === '001' ||
              joinRequest.certTypeCd === '002'
            "
          >
            <join-identity-mobile-ipin />
          </template>
          <template v-if="joinRequest.certTypeCd === '004'">
            <join-identity-passport />
          </template>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/identify/index.scss';
</style>
