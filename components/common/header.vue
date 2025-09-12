<script setup lang="ts">
import Gnb from '~/components/common/gnb.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import mobilegnb from '~/components/common/mobilegnb.vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '~/stores/login';
import { useDefaultStore } from '~/stores';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import Masthead from '~/components/ui/header/masthead.vue';
import { useRequestURL } from '#app';
import axios from 'axios';

const router = useRouter();
const { showAlert } = useCustomAlert();

// 로그인/로그아웃`
const loginStore = useLoginStore();
const { auth, authenticated, sessionTimeout } = storeToRefs(loginStore);

// 남은 시간(초) - 30분 = 1800초
let timer: ReturnType<typeof setInterval> | null = null;

// 시간 포맷 함수 (초 -> mm : ss)
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
};

const formattedTime = ref(formatTime(0));

const confirmPopupText = computed(() =>
  auth.value.mbrTypeCd === 'P01'
    ? '인증해제까지 5분 남았습니다.<br />인증시간을 연장하시겠습니까?'
    : '로그아웃까지 5분 남았습니다.<br />로그인을 연장하시겠습니까?'
);

// 타이머 시작 함수
const startTimer = () => {
  timer = setInterval(() => {
    const second = sessionTimeout.value.diff(dayjs(), 'second');
    if (second > 0) {
      formattedTime.value = formatTime(second);

      if (second === 300) {
        showAlert({
          icon: 'info',
          html: confirmPopupText.value,
          showCancelButton: true,
          confirmButtonText: '연장',
          cancelButtonText: '취소'
        })
          .then((result) => {
            if (result.isConfirmed) {
              useAxios().post('/api/login/extend');
            }
          })
          .catch(() => {});
      }
    } else {
      Swal.close();
      loginStore.logout();

      // 시간 만료 시 타이머 정지 및 추가 로직 가능
      clearInterval(timer!);
      timer = null;
    }
  }, 1000);
};

// 인증해제 버튼 클릭 핸들러
const handleDisableAuth = async () => {
  // 원하는 로직 수행: 타이머 정지
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  await loginStore.logout();
  // SweetAlert 경고창 표시
  showAlert({
    title: '인증 해제',
    text: '인증이 해제ddd되었습니다.',
    icon: 'success'
  });

  router.push('/', { external: true });
};

// 컴포넌트 마운트 시 타이머 시작
onMounted(() => {
  startTimer();
});

// 컴포넌트 언마운트 시 타이머 정지
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const GoToLogin = async () => {
  const res = await axios.get('/api/anyid/ip');
  const iframe = document.querySelector('iframe#urlIframe');
  const url = new URL(useRequestURL().origin);
  const baseOrigin = `${url.protocol}//${url.hostname}`;
  const port = res.data == 'local' ? ':8080' : '';
  iframe.src = baseOrigin + port + `/sample/test.jsp`;
  console.log('hhhhh');
};

const GoToLogin2 = async () => {
  router.push('/login', { external: true });
};

const GoToMypage = () => {
  // router.push('/my/qna/list', { external: true });
  router.push('/my/dscsn/rsvt/list', { external: true });
};

const GoToJoin = () => {
  router.push('/join', { external: true });
};

const GoToCustomer = () => {
  router.push('/center/ntc/list', { external: true });
};

const handleFavirate = () => {
  showAlert({
    icon: 'success',
    text: '즐겨찾기 되었습니다.',
    confirmButtonText: '확인'
  });
};

const logout = async () => {
  await loginStore.logout();
  message.info('로그아웃되었습니다.');
  router.push('/', { external: true });
};

const defaultStore = useDefaultStore();
const { zoomLevel } = storeToRefs(defaultStore);
const changeZoom = (value: number) => {
  //console.log('changeZoom', value);
  if (value === 1 && zoomLevel.value >= 200) {
    return;
  }
  if (value === -1 && zoomLevel.value <= 50) {
    return;
  }
  defaultStore.setZoomLevel(zoomLevel.value + value * 10);
  document.documentElement.style.transform = `scale(${zoomLevel.value / 100})`;
  document.documentElement.style.transformOrigin = '0 0';
  document.documentElement.style.overflowX = 'auto';
};

onMounted(() => {
  if (zoomLevel.value !== 100) {
    document.documentElement.style.transform = `scale(${zoomLevel.value / 100})`;
    document.documentElement.style.transformOrigin = '0 0';
  }
});
</script>

<template>
  <a href="#common-content" class="skip-navi">본문내용 바로가기</a>
  <header class="site-header site-sub-header">
    <div class="header-pc-box">
      <div class="header header-top-box">
        <div class="header-first-wrap">
          <div class="container">
            <div class="header-first-box">
              <masthead />
            </div>
            <div class="header-last-box">
              <div id="navbox2">
                <!-- 로그아웃/로그인 -->
                <ul class="navbar-nav">
                  <li
                    class="nav-item"
                    v-if="authenticated && auth.mbrTypeCd !== 'P01'"
                  >
                    <button
                      type="button"
                      class="btn login-button"
                      @click="logout"
                    >
                      <strong>로그아웃</strong>
                    </button>
                  </li>
                  <li
                    class="nav-item"
                    v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
                  >
                    <button
                      type="button"
                      class="btn login-button"
                      @click="GoToLogin"
                    >
                      <strong>로그인</strong>
                    </button>
                  </li>
                  <li
                    class="nav-item"
                    v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
                  >
                    <button
                      type="button"
                      class="btn login-button"
                      @click="GoToLogin2"
                    >
                      <strong>이전로그인</strong>
                    </button>
                  </li>
                  <!-- 마이페이지/회원가입 -->
                  <li
                    class="nav-item"
                    v-if="authenticated && auth.mbrTypeCd !== 'P01'"
                  >
                    <button
                      type="button"
                      class="btn join-button"
                      @click="GoToMypage"
                    >
                      <strong>마이페이지</strong>
                    </button>
                  </li>
                  <li class="nav-item" v-else>
                    <button
                      type="button"
                      class="btn join-button"
                      @click="GoToJoin"
                    >
                      <strong>회원가입</strong>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      type="button"
                      class="btn customer-button"
                      @click="GoToCustomer"
                    >
                      <strong>고객센터</strong>
                    </button>
                  </li>
                </ul>
                <!-- 로그인일시 navbar-nav d-none 에서 d-none을 빼주세요 -->
                <ul class="navbar-nav d-none">
                  <li class="nav-item">
                    <button type="button" class="btn logout-button">
                      <strong>로그아웃</strong>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="btn mypage-button">
                      <strong>마이페이지</strong>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      type="button"
                      class="btn customer-button"
                      @click="GoToCustomer"
                    >
                      <strong>고객센터</strong>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="header-top-option-box">
                <ul class="option-ul">
                  <li v-if="authenticated" class="option-li auth-li">
                    <span class="time-span">
                      {{ formattedTime }}
                    </span>
                    <button
                      type="button"
                      class="btn auth-button"
                      @click="handleDisableAuth"
                    >
                      인증해제
                    </button>
                  </li>
                  <!--
                  <li class="option-li favirate-li">
                    <NuxtLink :to="'#'" @click="handleFavirate">
                      <span class="icon-span">
                        <img
                          src="/assets/image/main/top_favorites.svg"
                          alt="즐겨찾기"
                        />
                      </span>
                      <span class="text-span">즐겨찾기</span>
                    </NuxtLink>
                  </li>
                  -->
                  <li class="option-li view-screen-li">
                    <button
                      type="button"
                      class="btn minus-button"
                      @click="changeZoom(-1)"
                    >
                      <span class="sr-only">화면크기 작게</span>
                    </button>
                    <span
                      class="view-screen-num-span"
                      v-text="`${zoomLevel}%`"
                    ></span>
                    <button
                      type="button"
                      class="btn plus-button"
                      @click="changeZoom(1)"
                    >
                      <span class="sr-only">화면크기 크게</span>
                    </button>
                  </li>
                  <li class="option-li lang-li">
                    <lazy-common-google-translate />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-xl nav-top">
        <div class="container nav-top-container">
          <h1 class="logo">
            <NuxtLink class="navbar-brand" :to="'/'" :external="true">
              <img
                src="/assets/image/main/hd_logo.png"
                alt="맞춤형 법률복지 법률구조 플랫폼"
              />
            </NuxtLink>
          </h1>

          <gnb />

          <!--<button
            class="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#myOffcanvas"
            aria-controls="myOffcanvas"
          >
            <img
              src="/assets/image/mo/mo_top_menu.svg"
              alt="모바일 햄버거 박스"
            />
          </button>-->
        </div>
        <mobilegnb />
        <!--<mobilegnb />-->
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use './scss/header';
</style>
