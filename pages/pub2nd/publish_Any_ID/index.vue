<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="법률구조 플랫폼 사용자 로그인"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="anyid-top">
          <div class="tit">로그인 방식을 선택해주세요.</div>
          <div class="sub">
            정부 통합로그인은 한 번의 로그인으로 연계된 모든 공공 웹서비스를
            이용할 수 있는 인증 서비스입니다.
          </div>
        </div>

        <div class="anyid-main">
          <!--통합 로그인 영역-->
          <div id="anyidc" class="certify-sel-wrap">통합 로그인 영역</div>
          <!--//통합 로그인 영역-->

          <!--일반사용자 로그인 영역-->
          <div class="certify-sel-wrap">
            <div class="tit-wrap">
              <h3 class="certify-tit">일반사용자 로그인</h3>
            </div>
            <ul class="certify-type">
              <li>
                <button class="login-link normal">
                  <h4 class="type-tit">법률구조 플랫폼 아이디</h4>
                  <p class="type-desc pc-only">
                    법률구조 플랫폼 회원가입시 등록한 아이디와 비밀번호를
                    이용하여 로그인하는 서비스입니다.
                  </p>
                </button>
              </li>
              <!-- 25.06.30 추가 -->
              <li>
                <button class="login-link non-login">
                  <h4 class="type-tit">비회원 로그인(개인)</h4>
                  <p class="type-desc pc-only">
                    회원가입 없이 성명, 주민등록번호로 로그인
                  </p>
                </button>
              </li>
              <!-- //25.06.30 추가 -->
            </ul>
          </div>
          <!--일반사용자 로그인 영역-->

          <!--본인확인 영역-->
          <div class="certify-sel-wrap">
            <div class="tit-wrap">
              <h3 class="certify-tit">본인확인</h3>
            </div>
            <ul class="certify-type">
              <li>
                <button class="login-link cellphone">
                  <h4 class="type-tit">휴대폰 인증</h4>
                  <p class="type-desc pc-only">
                    로그인 하지 않고 본인명의로 등록된 휴대폰을 통해 본인확인을
                    받을 수 있는 서비스입니다.
                  </p>
                </button>
              </li>
              <li>
                <button class="login-link ipin">
                  <h4 class="type-tit">아이핀(I-PIN)인증</h4>
                  <p class="type-desc pc-only">
                    로그인 하지 않고 개인식별 번호를 발급받아 인터넷상에서
                    본인확인을 받을 수 있는 서비스입니다.
                  </p>
                </button>
              </li>
            </ul>
          </div>
          <!--본인확인 영역-->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
