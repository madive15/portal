<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useNuxtApp, useRequestURL } from '#app';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useAuthStore } from '~/stores/auth';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useModalFocus } from '~/composables/useModalFocus';
import { anyidAdaptor } from '@/apis/utility';
import axios from 'axios';

const ssoAuth = useAuthStore();
const { sso } = storeToRefs(ssoAuth);
const config = ref<Record<string, any> | null>(null);

const router = useRouter();
const loginStore = useLoginStore();

const { showAlert } = useCustomAlert();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
const { auth, userId, authenticated } = storeToRefs(loginStore);
const redirect = ref('/');

const initListener = () => {
  window.removeEventListener('message', handleIframeMessage);
  window.addEventListener('message', handleIframeMessage); // 메시지 리스너 추가
};

// CSS 로더
function loadCss(href: string) {
  if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  document.head.appendChild(link);
}

// 스크립트 태그 1개 로더 (중복 로딩 방지 + 순서 보장)
function loadScriptTag(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const el = document.createElement('script');
    el.src = src;
    el.async = false; // 순서 보장 (manifest -> vendor -> app)
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(el);
  });
}

// Any-ID가 의존하는 core 스크립트 로드
async function loadCoreScripts() {
  // 개발(3100)↔스프링(8080) 분기. Nginx가 /core 프록시면 ''로 바꿔도 됨.
  const origin = 'http://dev.helplaw24.go.kr';
  const scripts = [
    `${origin}/core/js/manifest.js`,
    `${origin}/core/js/vendor.js`,
    `${origin}/core/js/app.js`
  ];
  for (const src of scripts) {
    console.log('js script', src);
    await loadScriptTag(src);
  }
}

// /api/init 호출로 config 로드
async function apiInit() {
  const tx = new URLSearchParams(window.location.search).get('tx') ?? '';
  if (!tx) {
    console.log('tx 파라미터가 URL에 존재하지 않습니다.');
  }
  try {
    const nuxtApp = useNuxtApp() as any;
    if (nuxtApp.$axios) {
      const res = await nuxtApp.$axios.get('/api/init', { params: { tx } });
      alert(res);
      config.value = res.data;
    } else {
      // axios 플러그인이 없으면 $fetch 사용
      config.value = await $fetch('/api/init', {
        method: 'GET',
        query: { tx }
      });
    }
  } catch (err: any) {
    alert(`response >> ${err}`);
  }
}

// Any-ID 모듈 초기화
function initAnyId() {
  const AnyidC = (window as any).AnyidC;
  if (!AnyidC) {
    console.error('AnyidC가 아직 로드되지 않았습니다.');
    return;
  }

  const localConfig = config.value || {};

  AnyidC.LOAD_MODULE(
    Object.assign(
      {
        // routeMode: 'history', // 필요 시 활성화
        contextRoot: '',
        success: (data: any) => {
          const adaptor = anyidAdaptor(sso.value);
          console.log('success data : ', data);
          adaptor.success(data);
        },
        fail: (err: any) => {
          console.log('err : ', err);
        },
        log: (data: any) => {
          console.log('여기여기');
          console.log('log : ', data);
        }
      },
      localConfig
    )
  );
}

onBeforeMount(async () => {
  redirect.value = router.currentRoute.value.query.redirect as string;
  initListener();
});

onMounted(async () => {
  const origin = location.port === '3100' ? 'http://localhost' : '';
  loadCss(`${origin}/core/css/app.css`);
  await apiInit(); // config 먼저 확보
  await loadCoreScripts(); // core 스크립트 순차 로드
  initAnyId(); // Any-ID 시작
  //await apiInit(); // config 먼저 확보
});

const handleIframeMessage = (event: any) => {
  if (event.data && event.data.purpose === 'loginSuccess') {
    query();
  } else if (event.data && event.data.purpose === 'error') {
    showAlert({
      icon: 'info',
      html: event.data.message
    });
  }
};
const query = async () => {
  await loginStore.loadAuthorized();
  window.removeEventListener('message', handleIframeMessage);
  router.push({ path: '/' });
};

const GoToLogin = () => {
  window.removeEventListener('message', handleIframeMessage);
  router.push('/login', { external: true });
};

const GoToGstLogin = () => {
  window.removeEventListener('message', handleIframeMessage);
  router.push('/login/gst', { external: true });
};

const handleGoBack = () => {
  window.removeEventListener('message', handleIframeMessage);
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- <Breadcrumb :showPrintButton="true" /> -->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>법률구조 플랫폼 사용자 로그인</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button">
                  <span class="text-span" @click="handleGoBack">
                    뒤로가기
                  </span>
                </button>
                <!--<button class="btn print-button" @click="handlePrint">
                  <span class="text-span"> 인쇄하기 </span>
                </button>-->
              </div>
            </nav>
          </div>
        </div>
        <!--//퍼블리싱용 Breadcrumb-->
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

          <div id="container">
            <!-- 컨텐츠 영역 -->
            <div class="auth-inner type-short">
              <div class="conts-area login-type">
                <div id="anyidc"></div>
                <!-- //본인인증방식 선택 -->
              </div>
              <!-- //컨텐츠 영역 -->
            </div>
            <!-- //컨텐츠 영역 -->
          </div>
          <!--일반사용자 로그인 영역-->
          <div class="certify-sel-wrap">
            <div class="tit-wrap">
              <h3 class="certify-tit">일반사용자 로그인</h3>
            </div>
            <ul class="certify-type">
              <li>
                <button class="login-link normal" @click="GoToLogin">
                  <h4 class="type-tit">법률구조 플랫폼 아이디</h4>
                  <p class="type-desc pc-only">
                    법률구조 플랫폼 회원가입시 등록한 아이디와 비밀번호를
                    이용하여 로그인하는 서비스입니다.
                  </p>
                </button>
              </li>
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
                <button class="login-link cellphone" @click="GoToGstLogin">
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
@use '~/assets/style/pages/login/anyid/index.scss';
</style>
