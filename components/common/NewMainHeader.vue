<script setup lang="ts">
import Masthead from '~/components/ui/header/masthead.vue';
import GnbWeb from '~/components/common/NewGnbWeb.vue';
import Icon from '~/components/ui/icon/icon.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useDefaultStore } from '~/stores';
import { useRequestURL } from '#app';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
//import { anyidAdaptor } from '~/apis/utility';
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';

const ssoAuth = useAuthStore();
const { sso } = storeToRefs(ssoAuth);
const router = useRouter();
const { showAlert } = useCustomAlert();

// 로그인/로그아웃
const loginStore = useLoginStore();
const { auth, authenticated, sessionTimeout } = storeToRefs(loginStore);

// 로그인
const GoToLogin = async () => {
  const res = await axios.get('/api/anyid/ip');
  const iframe = document.querySelector('iframe#urlIframe');
  const url = new URL(useRequestURL().origin);
  const baseOrigin = `${url.protocol}//${url.hostname}`;
  const port = res.data == 'local' ? ':8080' : '';
  iframe.src = baseOrigin + port + `/sample/test.jsp`;

  // typeof endPoint !== 'undefined'
  //   ? this.agencyContextPath + endPoint
  //   : this.agencyContextPath;
  //ssoLoginPage('', '3');

  console.log('hhhhh');
};

// 이전로그인
const GoToLogin2 = async () => {
  // router.push('/login', { external: true });
  navigateTo('/login');
};

// 로그아웃
const logout = async () => {
  loginStore.logout().then(() => {
    message.info('로그아웃되었습니다.');
    // router.push('/', { external: true });

    //const adaptor = anyidAdaptor(sso.value);
    //adaptor.ssoLogout('/');
  });
};

// 마이페이지
const GoToMypage = () => {
  if (authenticated.value) {
    // 로그인, 본인인증 시
    // router.push('/my/dscsn/rsvt/list', { external: true });
    navigateTo('/my/dscsn/rsvt/MyDsctnRsvtList');
  } else {
    // 비회원 상담조회 화면으로 이동
    alert('비회원 상담조회 개발 후 해당화면으로 이동 수정필요');
  }
};

// 회원가입
const GoToJoin = () => {
  // router.push('/join', { external: true });
  navigateTo('/join');
};

// 고객센터
const GoToCustomer = () => {
  // router.push('/center/ntc/list', { external: true });
  navigateTo('/center/ntc/list');
};

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
    text: '인증이 해제되었습니다.',
    icon: 'success'
  });
};

// fix-active 상태를 관리하는 ref
const isFixed = ref(false);

// 스크롤 감지 함수
const handleScroll = () => {
  // 예: 페이지 상단에서 100px 이상 스크롤되면 fix-active 클래스를 추가
  isFixed.value = window.scrollY > 100;
};

// 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 초기 상태 설정
  handleScroll();
});

// 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const defaultStore = useDefaultStore();
const { zoomLevel } = storeToRefs(defaultStore);
const changeZoom = (value: number) => {
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
              <ul class="user-nav__list">
                <li
                  class="item"
                  v-if="authenticated && auth.mbrTypeCd !== 'P01'"
                >
                  <button
                    class="btn logout-button"
                    type="button"
                    @click="logout"
                  >
                    <Icon name="logout" />
                    <strong>로그아웃</strong>
                  </button>
                </li>
                <li
                  class="item"
                  v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
                >
                  <button
                    class="btn login-button"
                    type="button"
                    @click="GoToLogin"
                  >
                    <Icon name="login" />
                    <strong>로그인</strong>
                  </button>
                </li>
                <li
                  class="item"
                  v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
                >
                  <button
                    class="btn login-button"
                    type="button"
                    @click="GoToLogin2"
                  >
                    <Icon name="login" />
                    <strong>이전로그인</strong>
                  </button>
                </li>
                <li
                  class="item"
                  v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
                >
                  <button class="btn join-button" @click="GoToJoin">
                    <Icon name="join" />
                    <strong>회원가입</strong>
                  </button>
                </li>
                <li
                  class="item"
                  v-if="authenticated && auth.mbrTypeCd !== 'P01'"
                >
                  <button class="btn mypage-button" @click="GoToMypage">
                    <Icon name="mypage" />
                    <strong>마이페이지</strong>
                  </button>
                </li>
                <li class="item">
                  <button class="btn customer-button" @click="GoToCustomer">
                    <Icon name="customerService" />
                    <strong>고객센터</strong>
                  </button>
                </li>
              </ul>
            </div>
            <div class="auth-option-box">
              <ul class="auth-nav__list">
                <li class="auth-li" v-if="authenticated">
                  <span class="time-span"> {{ formattedTime }} </span>
                  <button class="btn auth-button" @click="handleDisableAuth">
                    인증해제
                  </button>
                </li>
                <li class="view-screen-li">
                  <button class="btn minus-button" @click="changeZoom(-1)">
                    <img
                      src="/assets/image/main/top_minus.svg"
                      alt="화면크기 작게"
                    />
                  </button>
                  <span
                    class="view-screen-num-span"
                    v-text="`${zoomLevel}%`"
                  ></span>
                  <button class="btn plus-button" @click="changeZoom(1)">
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
