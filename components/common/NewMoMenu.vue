<script setup lang="ts">
import Masthead from '~/components/ui/header/masthead.vue';
import CommonAccordion from '~/components/ui/accordion/accordion.vue';
import CommonAccordionItem from '~/components/ui/accordion/accordionitem.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useRouter } from 'vue-router';
import { useLoginStore } from '~/stores/login';
import { useMenuStore } from '~/stores/common/menu';
import Icon from '~/components/ui/icon/icon.vue';
import axios from 'axios';
import { useRequestURL } from '#app';

const loginStore = useLoginStore();
const { auth, authenticated } = storeToRefs(loginStore);

const menuStore = useMenuStore();
const { siteMap } = storeToRefs(menuStore);

const emits = defineEmits(['close']);

export type AccordionItem = {
  id: string; // collapse ID
  title: string;
  links: { text: string; to: string }[];
};

// 아코디언 아이템 배열
const accordionItems = computed(() =>
  siteMap.value.filter((item) => item.menuGnbUseYn)
);

const { showAlert } = useCustomAlert();

const handleFavirate = () => {
  let shortcut = '';

  // Mac vs Windows 단축키 안내
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  shortcut = isMac ? 'Command (⌘) + D' : 'Ctrl + D';

  showAlert({
    icon: 'success',
    text: '이 페이지를 즐겨찾기 하시려면 ' + shortcut + '를 눌러주세요!',
    confirmButtonText: '확인'
  });
};

const router = useRouter();

const GoToLogin = async () => {
  // router.push('/login', { external: true });
  // navigateTo('/login');
  // emits('close');
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

const GoToMypage = () => {
  if (authenticated.value) {
    // 로그인, 본인인증 시
    // router.push('/my/dscsn/rsvt/list', { external: true });
    navigateTo('/my/dscsn/rsvt/list');
  } else {
    // 비회원 상담조회 화면으로 이동
    alert('비회원 상담조회 개발 후 해당화면으로 이동 수정필요');
  }
  emits('close');
};

const GoToJoin = () => {
  // router.push('/join', { external: true });
  navigateTo('/join');
  emits('close');
};

const GoToCustomer = () => {
  // router.push('/center/ntc/list', { external: true });
  navigateTo('/center/ntc/list');
  emits('close');
};

const logout = async () => {
  await loginStore.logout();

  // message.info('로그아웃되었습니다.');
  showAlert({
    icon: 'success',
    text: '로그아웃되었습니다.',
    confirmButtonText: '확인'
  });
  emits('close');
  navigateTo('/');

  // router.push('/', { external: true });
};
</script>

<template>
  <div class="lnb-menu__area">
    <div class="lnb-layer">
      <masthead />
      <div class="lnb-header">
        <strong>
          <img src="/assets/image/main/hd_logo.png" alt="대국민플랫폼" />
        </strong>
        <button type="button" @click="$emit('close')" class="btn-close">
          <span class="sr-only">닫기</span>
        </button>
      </div>
      <div class="lnb-body">
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
        <div class="navbar-wrap">
          <button
            type="button"
            class="btn-icon__login"
            v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
            @click="GoToLogin"
          >
            <Icon name="login" />
            <span class="text">로그인</span>
          </button>
          <button
            type="button"
            class="btn-icon__login"
            v-if="authenticated && auth.mbrTypeCd !== 'P01'"
            @click="logout"
          >
            <Icon name="logout" />
            <span class="text">로그아웃</span>
          </button>
          <button type="button" class="btn-icon__join" @click="GoToMypage">
            <Icon name="mypage" />
            <span class="text">마이페이지</span>
          </button>
          <button
            type="button"
            class="btn-icon__join"
            v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
            @click="GoToJoin"
          >
            <Icon name="join" />
            <span class="text">회원가입</span>
          </button>
          <button type="button" class="btn-icon__cs" @click="GoToCustomer">
            <Icon name="customerService" />
            <span class="text">고객센터</span>
          </button>
        </div>
        <CommonAccordion>
          <CommonAccordionItem
            v-for="item in accordionItems"
            :key="item.menuId"
            :header="item.menuName"
          >
            <div class="edge-bx">
              <ul class="lng-menu__wrap">
                <li v-for="data in item.children" :key="data.menuId">
                  <NuxtLink :to="data.menuUrl" class="menu-item">{{
                    data.menuName
                  }}</NuxtLink>
                </li>
              </ul>
            </div>
          </CommonAccordionItem>
        </CommonAccordion>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
