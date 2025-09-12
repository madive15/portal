<script setup lang="ts">
import Gnb from '~/components/common/gnb.vue';
import Mobilegnb from '~/components/common/mobilegnb.vue';
import Masthead from '~/components/ui/header/masthead.vue';
import GnbWeb from '~/components/ui/header/gnbWeb.vue';
import Icon from '~/components/ui/icon/icon.vue';
</script>

<template>
  <a href="#common-content" class="skip-navi">본문내용 바로가기</a>
  <header class="main-header">
    <div class="main-header__wrap">
      <div class="header-top-box">
        <div class="header-first-wrap">
          <div class="container">
            <masthead />
          </div>
        </div>
      </div>
      <nav class="header-gnb">
        <div class="container">
          <h1 class="logo">
            <NuxtLink class="navbar-brand" :to="'/'" :external="true">
              <img src="/assets/image/main/hd_logo.png" alt="대국민플랫폼" />
            </NuxtLink>
          </h1>
          <div class="header-last-box pc-visible">
            <div class="user-option-box">
              <!-- 로그아웃/로그인 -->
              <ul class="user-nav__list d-none">
                <li class="item d-none">
                  <button class="btn login-button" type="button">
                    <strong>로그아웃</strong>
                  </button>
                </li>
                <li class="item">
                  <button class="btn login-button" type="button">
                    <Icon name="login" />
                    <strong>로그인</strong>
                  </button>
                </li>

                <li class="item d-none">
                  <button class="btn join-button">
                    <Icon name="join" />
                    <strong>마이페이지</strong>
                  </button>
                </li>
                <li class="item">
                  <button class="btn join-button">
                    <Icon name="join" />
                    <strong>회원가입</strong>
                  </button>
                </li>
                <li class="item">
                  <button class="btn customer-button">
                    <Icon name="customerService" />
                    <strong>고객센터</strong>
                  </button>
                </li>
              </ul>
              <!-- 로그인일시 navbar-nav d-none 에서 d-none을 빼주세요 -->
              <ul class="user-nav__list">
                <li class="item">
                  <button class="btn logout-button" type="button">
                    <Icon name="logout" />
                    <strong>로그아웃</strong>
                  </button>
                </li>
                <li class="item">
                  <button class="btn mypage-button">
                    <Icon name="mypage" />
                    <strong>마이페이지</strong>
                  </button>
                </li>

                <li class="item">
                  <button class="btn customer-button">
                    <Icon name="customerService" />
                    <strong>고객센터</strong>
                  </button>
                </li>
              </ul>
            </div>
            <div class="auth-option-box">
              <ul class="auth-nav__list">
                <li class="auth-li d-none">
                  <span class="time-span"> 29:34 </span>
                  <button class="btn auth-button">인증해제</button>
                </li>
                <li class="view-screen-li">
                  <button class="btn minus-button">
                    <img
                      src="/assets/image/main/top_minus.svg"
                      alt="화면크기 작게"
                    />
                  </button>
                  <span class="view-screen-num-span">100%</span>
                  <button class="btn plus-button">
                    <img
                      src="/assets/image/main/top_plus.svg"
                      alt="화면크기 크게"
                    />
                  </button>
                </li>
                <li class="lang-li">
                  <lazy-common-google-translate />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <gnbWeb />
    </div>
  </header>
</template>

<style scoped></style>
