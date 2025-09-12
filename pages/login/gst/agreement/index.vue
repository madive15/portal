<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useRouter } from 'vue-router';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useJoinStore } from '~/stores/join';

const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);
const router = useRouter();

// sweetalert
const { showAlert } = useCustomAlert();

const submit = () => {
  router.push('/login/gst', { external: true });
};

const allAgree = computed({
  get() {
    return joinRequest.value.uiiPvsnAgreYn && joinRequest.value.prvcClctAgreYn;
  },
  set(newValue) {
    joinRequest.value.uiiPvsnAgreYn = newValue;
    joinRequest.value.prvcClctAgreYn = newValue;
  }
});

// 뒤로가기
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="비회원 로그인 약관동의"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '비회원 로그인' },
            { text: '약관동의', active: true }
          ]"
        />

        <div class="all-agree-box">
          <a-checkbox class="check-bx" v-model:checked="allAgree"
            >전체동의</a-checkbox
          >
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="aggre-info-box">
          <div class="card">
            <div class="card-header">
              <h4>개인정보 수집 및 서비스 이용에 대한 안내 (필수)</h4>
            </div>
            <div class="card-body">
              <div class="aggre-text-box">
                <h5>제 1장 총칙</h5>
                <dl>
                  <dt>제1조(목적)</dt>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                </dl>
                <h5>제 2장 총칙</h5>
                <dl>
                  <dt>제2조(목적)</dt>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="aggre-radio-box">
            <a-radio-group v-model:value="joinRequest.prvcClctAgreYn">
              <a-radio
                class="radio-bx"
                title="개인정보 수집 및 서비스 이용에 대한 안내 (필수)"
                :value="true"
              >
                동의합니다.</a-radio
              >
              <a-radio
                class="radio-bx"
                title="개인정보 수집 및 서비스 이용에 대한 안내 (필수)"
                :value="false"
                >동의하지 않습니다.</a-radio
              >
            </a-radio-group>
          </div>
        </div>
      </div>
    </section>
    <section class="section3">
      <div class="container">
        <div class="aggre-info-box">
          <div class="card">
            <div class="card-header">
              <h4>개인정보의 수집&middot;이용 동의 (필수)</h4>
            </div>
            <div class="card-body">
              <div class="aggre-text-box">
                <p class="top-p">
                  법률구조서비스 대국민포털 이용을 위한 회원가입 시 필요한
                  개인정보를 수집∙이용하려고 합니다. 다음 내용을 확인 후
                  동의하여 주시기 바랍니다.
                </p>
                <table>
                  <caption>
                    개인정보의 수집&middot;이용 동의 (필수)의 수집&middot;이용
                    목적, 수집&middot;이용 항목, 보유기간 관련 표
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">수집&middot;이용 목적</th>
                      <th scope="col">수집&middot;이용 항목</th>
                      <th scope="col">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>사이트 이용을 위한 회원가입</td>
                      <td>
                        필수 : 이름, 아이디, 비밀번호, 주소,<br />
                        휴대전화번호, 전화번호, 이메일주소
                      </td>
                      <td class="red-td">회원 탈퇴 시까지</td>
                    </tr>
                  </tbody>
                </table>
                <p class="end-p">
                  ※ 위와 같이 개인정보의 수집 및 이용하는데 동의를 거부할 권리가
                  있습니다. 그러나, 동의를 거부할 경우 사이트 이용을 위한
                  회원가입 시 제한을 받을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div class="aggre-radio-box">
            <a-radio-group v-model:value="joinRequest.uiiPvsnAgreYn">
              <a-radio
                class="radio-bx"
                title="개인정보의 수집&middot;이용 동의 (필수)"
                :value="true"
              >
                동의합니다.</a-radio
              >
              <a-radio
                class="radio-bx"
                title="개인정보의 수집&middot;이용 동의 (필수)"
                :value="false"
                >동의하지 않습니다.</a-radio
              >
            </a-radio-group>
          </div>
        </div>
      </div>
    </section>
    <!--
    <section class="section4">
      <div class="container">
        <div class="aggre-info-box">
          <div class="aggre-radio-box">
            <div class="form-check">
              <label class="form-check-label" for="agree3-yes">
                ※ 개인정보 수집.이용 및 고유식별정보 처리에 동의하지 않는 경우
                비회원 로그인 서비스를 이용하실 수 없습니다.
              </label>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <section class="section5">
      <div class="button-box">
        <button type="button" class="btn cancle-button" @click="goBack">
          취소
        </button>
        <button
          type="button"
          class="btn confirm-button"
          :disabled="!allAgree"
          @click="submit"
        >
          확인
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/gst/agreement/index.scss';
</style>
