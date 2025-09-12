<script setup lang="ts">
import { useCustomAlert } from '~/composables/useCustomAlert';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '~/stores/login';
import { useMenuStore } from '~/stores/common/menu';
const loginStore = useLoginStore();
const { auth, authenticated } = storeToRefs(loginStore);

const menuStore = useMenuStore();
const { siteMap } = storeToRefs(menuStore);

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
  showAlert({
    icon: 'success',
    text: '즐겨찾기 되었습니다.',
    confirmButtonText: '확인'
  });
};

const router = useRouter();

const GoToLogin = () => {
  router.push('/login', { external: true });
};

const GoToMypage = () => {
  router.push('/my/qna/list', { external: true });
};

const GoToJoin = () => {
  router.push('/join', { external: true });
};

const GoToCustomer = () => {
  router.push('/center/ntc/list', { external: true });
};

const logout = async () => {
  await loginStore.logout();
  message.info('로그아웃되었습니다.');
  router.push('/', { external: true });
};
</script>

<template>
  <div class="mognb-wrap">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="myOffcanvas"
      aria-labelledby="myOffcanvasLabel"
    >
      <div class="off-top-box">
        <div class="header-first-wrap">
          <div class="container">
            <div class="header-first-box">
              <span class="icon-span">
                <img
                  src="/assets/image/main/top_nurizip.png"
                  alt="누리집 태극기"
                />
              </span>
              <span class="text-span">
                이 누리집은 대한민국 공식 전자정부 누리집입니다.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="offcanvas-header">
        <strong class="offcanvas-title" id="myOffcanvasLabel">
          <img src="/assets/image/main/hd_logo.png" alt="대국민플랫폼" />
        </strong>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span class="sr-only">닫기</span>
        </button>
      </div>

      <div class="offcanvas-body">
        <div class="etc-box">
          <div class="favirate-box" @click="handleFavirate">
            <span class="icon-span">
              <img src="/assets/image/main/top_favorites.svg" alt="즐겨찾기" />
            </span>
            <span class="text-span">즐겨찾기</span>
          </div>
          <div class="lang-box"></div>
        </div>
        <div class="register-box">
          <!-- 비로그인시 -->
          <ul class="navbar-nav">
            <li
              class="nav-item"
              v-if="authenticated && auth.mbrTypeCd !== 'P01'"
            >
              <button
                class="btn logout-button"
                type="button"
                @click="logout"
                data-bs-dismiss="offcanvas"
              >
                <img src="/assets/image/main/logout.svg" alt="로그아웃" />
                <strong>로그아웃</strong>
              </button>
            </li>
            <li
              class="nav-item"
              v-if="!authenticated && auth.mbrTypeCd !== 'P01'"
            >
              <button
                class="btn login-button"
                type="button"
                @click="GoToLogin"
                data-bs-dismiss="offcanvas"
              >
                <img src="/assets/image/main/login.svg" alt="로그인" />
                <strong>로그인</strong>
              </button>
            </li>

            <li
              class="nav-item"
              v-if="authenticated && auth.mbrTypeCd !== 'P01'"
            >
              <button
                class="btn mypage-button"
                @click="GoToMypage"
                data-bs-dismiss="offcanvas"
              >
                <img src="/assets/image/main/my_page.svg" alt="마이페이지" />
                <strong>마이페이지</strong>
              </button>
            </li>

            <li class="nav-item" v-else>
              <button
                class="btn join-button"
                @click="GoToJoin"
                data-bs-dismiss="offcanvas"
              >
                <img src="/assets/image/main/join.svg" alt="회원가입" />
                <strong>회원가입</strong>
              </button>
            </li>
            <li class="nav-item">
              <button
                class="btn customer-button"
                @click="GoToCustomer"
                data-bs-dismiss="offcanvas"
              >
                <img
                  src="/assets/image/main/service_center.svg"
                  alt="고객센터"
                />
                <strong>고객센터</strong>
              </button>
            </li>
          </ul>
          <!-- 로그인일시 navbar-nav d-none 에서 d-none을 빼주세요 -->
          <ul class="navbar-nav d-none">
            <li class="nav-item">
              <button class="btn logout-button" type="button">
                <img src="/assets/image/main/logout.svg" alt="로그아웃" />
                <strong>로그아웃</strong>
              </button>
            </li>
            <li class="nav-item">
              <button class="btn mypage-button">
                <img src="/assets/image/main/my_page.svg" alt="마이페이지" />
                <strong>마이페이지</strong>
              </button>
            </li>
            <li class="nav-item">
              <button class="btn customer-button">
                <img
                  src="/assets/image/main/service_center.svg"
                  alt="고객센터"
                />
                <strong>고객센터</strong>
              </button>
            </li>
          </ul>
        </div>
        <div class="menu-box">
          <div class="accordion" id="accordionExample">
            <div
              v-for="(item, index) in accordionItems"
              :key="item.menuId"
              class="accordion-item"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#${item.menuId}`"
                  aria-expanded="false"
                  :aria-controls="item.menuId"
                >
                  {{ item.menuName }}
                </button>
              </h2>
              <div
                :id="item.menuId"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <ul>
                    <li v-for="(link, i) in item.children" :key="i">
                      <NuxtLink :to="link.menuUrl" :external="true">
                        {{ link.menuName }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
