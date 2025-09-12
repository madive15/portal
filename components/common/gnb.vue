<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '~/stores/search';
import { storeToRefs } from 'pinia';
import AllGnb from '~/components/common/AllGnb.vue';
import MainAllSearch from '~/components/allsearch/mainallsearch.vue';
import MainlayerPopup from '~/components/main/MainlayerPopup.vue';
import { useMenuStore } from '~/stores/common/menu';
import GnbImg1 from '~/assets/image/main/gnb_img1.png';
import GnbImg2 from '~/assets/image/main/gnb_img2.png';
import GnbImg3 from '~/assets/image/main/gnb_img3.png';
import GnbImg4 from '~/assets/image/main/gnb_img4.png';
import GnbImg5 from '~/assets/image/main/gnb_img5.png';

const GNBImages = [GnbImg1, GnbImg2, GnbImg3, GnbImg4, GnbImg5];

const searchStore = useSearchStore();
const { searchAsync } = storeToRefs(searchStore);

const menuStore = useMenuStore();
const { gnb } = storeToRefs(menuStore);

const route = useRoute();

// 현재 열려 있는 메뉴의 인덱스
// 아무것도 열려있지 않을 때는 null
const gnbRef = ref<HTMLElement | null>(null);
const openMenuIndex = ref<number | null>(null);
// 접근성: 포커스 작업
const contentFocusRef = ref<HTMLElement | null>(null);
const subjectFocusRef = ref<HTMLElement | null>(null);

// 서비스유형 start
const srvcGnbSelected = ref();

const srvcChildrenList = computed(() => {
  return !!srvcGnbSelected.value
    ? srvcGnbSelected.value.children
    : gnb.value.find((item) => item.moduleNm === 'SRVC')?.children?.[0]
        ?.children;
});

const toggleFocus = (item: any) => {
  srvcGnbSelected.value = item;
};
// 서비스유형 end

// 법률구조 start
const lwaGnbSelected = ref();

const lwaChildrenList = computed(() => {
  return !!lwaGnbSelected.value
    ? lwaGnbSelected.value.children
    : gnb.value.find((item) => item.moduleNm === 'LWA')?.children?.[0]
        ?.children;
});

const toggleFocusLwa = (item: any) => {
  lwaGnbSelected.value = item;
};
// 법률구조 end

const toggleMenu = (index: number) => {
  // 현재 열려있는 메뉴를 다시 클릭하면 닫기
  if (openMenuIndex.value === index) {
    openMenuIndex.value = null;
  } else {
    // 다른 메뉴 클릭 시 기존 메뉴 닫고 새로운 메뉴 열기
    openMenuIndex.value = index;
  }
  openSearch.value = false;
  openGnb.value = false;
};

const openGnb = ref(false);
const showAiPopup = ref(false);
const openSearch = ref(false);

// 버튼 클릭 시 openGnb 토글
function toggleGnb() {
  openGnb.value = !openGnb.value;

  if (openGnb.value) {
    openSearch.value = false;
    openMenuIndex.value = null;
  }
}

// 검색 버튼 클릭 시 검색창 토글
const toggleSearch = () => {
  searchAsync.value.searchQuery = '';
  openSearch.value = !openSearch.value;

  if (openSearch.value) {
    openGnb.value = false;
    openMenuIndex.value = null;
  }
};

watch(
  () => route.fullPath,
  () => {
    openGnb.value = false;
    openMenuIndex.value = null;
  }
);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 2) 언마운트 시 이벤트 제거
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(e: MouseEvent) {
  if (!gnbRef.value) return;
  if (!gnbRef.value.contains(e.target as Node)) {
    openMenuIndex.value = null;
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-xl nav-bottom" ref="gnbRef">
    <div class="container nav-bottom-container align-items-center">
      <div class="collapse navbar-collapse" id="navbox1">
        <ul class="navbar-nav">
          <li
            v-for="(item, i) in gnb"
            :class="[
              `nav-item nav-item${i + 1}`,
              { 'active-item': openMenuIndex === i }
            ]"
            @click.stop="toggleMenu(i)"
          >
            <button
              type="button"
              class="nav-btn-item"
              :aria-expanded="openMenuIndex === i"
            >
              <span class="text-span">{{ item.menuName }}</span>
              <span class="icon-span">
                <img
                  src="/assets/image/main/top_up.svg"
                  v-if="openMenuIndex === i"
                  class="click-gnb-menu-img"
                  alt=""
                />
                <img src="/assets/image/main/top_down.svg" v-else alt="" />
              </span>
            </button>
            <div
              class="gnb-menu-box"
              v-show="openMenuIndex === i"
              v-if="item.moduleNm !== 'SRVC'"
            >
              <div class="container">
                <div class="gnb-wrap-box row">
                  <div class="left-gnb-menu-box col-xl-9">
                    <div class="gnb-header">
                      <h2 class="gnb-title-txt">{{ item.menuName }}</h2>
                    </div>
                    <div class="gnb-body">
                      <ul>
                        <li v-for="child in item.children">
                          <NuxtLink :to="child.menuUrl" :external="true">
                            <span class="disc-span" />
                            <span class="text-span">{{ child.menuName }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="right-gnb-menu-box col-xl-3">
                    <div class="img-box">
                      <img :src="GNBImages[i]" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TODO 사례/서식 메뉴 위치 조절 -->

            <!-- <div
              class="gnb-menu-box"
              v-show="openMenuIndex === i"
              v-if="item.moduleNm === 'CASE_TMPLT'"
            >
              <div class="container">
                <div class="gnb-wrap-box row">
                  <div class="left-gnb-menu-box col-xl-9">
                    <div class="gnb-header">
                      <h2 class="gnb-title-txt">{{ item.menuName }}</h2>
                    </div>
                    <div class="gnb-body case-gnb-body">
                      <ul>
                        <li v-for="child in item.children">
                          <NuxtLink :to="child.menuUrl" :external="true">
                            <span class="disc-span" />
                            <span class="text-span">{{ child.menuName }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="right-gnb-menu-box col-xl-3">
                    <div class="img-box">
                      <img :src="GNBImages[i]" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- TODO 서비스 유형 -->
            <div
              class="gnb-menu-box"
              v-show="openMenuIndex === i"
              v-if="item.moduleNm === 'SRVC'"
            >
              <div class="container">
                <div class="gnb-wrap-box row">
                  <div class="left-gnb-menu-box col-xl-9">
                    <div class="gnb-header">
                      <h2
                        :class="[
                          'gnb-title-txt',
                          {
                            active:
                              !srvcGnbSelected ||
                              srvcGnbSelected.menuId === item.children[0].menuId
                          }
                        ]"
                      >
                        <button
                          type="button"
                          class="gnb-tit-btn"
                          :title="`${
                            !srvcGnbSelected ||
                            srvcGnbSelected.menuId === item.children[0].menuId
                              ? '선택됨'
                              : ''
                          }`"
                          @click.stop="
                            () => {
                              toggleFocus(item.children[0]);
                            }
                          "
                        >
                          {{ item.children[0].menuName }}
                        </button>
                      </h2>
                      <div class="splitter"></div>
                      <h2
                        :class="[
                          'gnb-title-txt',
                          {
                            active:
                              !!srvcGnbSelected &&
                              srvcGnbSelected.menuId === item.children[1].menuId
                          }
                        ]"
                        :title="`${
                          !!srvcGnbSelected &&
                          srvcGnbSelected.menuId === item.children[1].menuId
                            ? '선택됨'
                            : ''
                        }`"
                        @click.stop="
                          () => {
                            toggleFocus(item.children[1]);
                          }
                        "
                      >
                        <button type="button" class="gnb-tit-btn">
                          {{ item.children[1].menuName }}
                        </button>
                      </h2>
                    </div>
                    <div class="gnb-body">
                      <ul>
                        <li v-for="child in srvcChildrenList">
                          <NuxtLink :to="child.menuUrl" :external="true">
                            <span class="disc-span" />
                            <span class="text-span">{{ child.menuName }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="right-gnb-menu-box col-xl-3">
                    <div class="img-box">
                      <img :src="GNBImages[i]" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- One-stop 법률구조-->
            <div
              class="gnb-menu-box"
              v-show="openMenuIndex === i"
              v-if="item.moduleNm == 'LWA'"
            >
              <div class="container">
                <div class="gnb-wrap-box row">
                  <div class="left-gnb-menu-box col-xl-9">
                    <!--                    <div class="gnb-header">-->
                    <!--                      <h2 class="gnb-title-txt">-->
                    <!--                        {{ item.children[0].menuName }}-->
                    <!--                      </h2>-->
                    <!--                    </div>-->
                    <div class="gnb-header">
                      <h2
                        :class="[
                          'gnb-title-txt',
                          {
                            active:
                              !lwaGnbSelected ||
                              lwaGnbSelected.menuId === item.children[0].menuId
                          }
                        ]"
                      >
                        <button
                          type="button"
                          class="gnb-tit-btn"
                          :title="`${
                            !lwaGnbSelected ||
                            lwaGnbSelected.menuId === item.children[0].menuId
                              ? '선택됨'
                              : ''
                          }`"
                          @click.stop="
                            () => {
                              toggleFocusLwa(item.children[0]);
                            }
                          "
                        >
                          {{ item.children[0].menuName }}
                        </button>
                      </h2>
                      <div class="splitter"></div>
                      <h2
                        :class="[
                          'gnb-title-txt',
                          {
                            active:
                              !!lwaGnbSelected &&
                              lwaGnbSelected.menuId === item.children[1].menuId
                          }
                        ]"
                        :title="`${
                          !!lwaGnbSelected &&
                          lwaGnbSelected.menuId === item.children[1].menuId
                            ? '선택됨'
                            : ''
                        }`"
                        @click.stop="
                          () => {
                            toggleFocusLwa(item.children[1]);
                          }
                        "
                      >
                        <button type="button" class="gnb-tit-btn">
                          {{ item.children[1].menuName }}
                        </button>
                      </h2>
                    </div>
                    <div class="gnb-body">
                      <div v-if="lwaChildrenList[0].children.length > 0">
                        <div v-for="child in lwaChildrenList">
                          <div>
                            {{ child.menuName }}
                          </div>
                          <div>
                            <ul>
                              <li v-for="data in child.children">
                                <NuxtLink :to="data.menuUrl" :external="true">
                                  <span class="disc-span" />
                                  <span class="text-span">{{
                                    data.menuName
                                  }}</span>
                                </NuxtLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <ul>
                          <li v-for="child in lwaChildrenList">
                            <NuxtLink :to="child.menuUrl" :external="true">
                              <span class="disc-span" />
                              <span class="text-span">{{
                                child.menuName
                              }}</span>
                            </NuxtLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="right-gnb-menu-box col-xl-3">
                    <div class="img-box">
                      <img :src="GNBImages[i]" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="collapse navbar-collapse justify-end" id="navbox4">
        <button
          type="button"
          class="btn main-search-button"
          @click="toggleSearch"
        >
          <span class="sr-only">검색</span>
        </button>
        <MainAllSearch v-if="openSearch" @close="openSearch = false" />
        <button type="button" class="btn all-menu-button" @click="toggleGnb">
          <span class="sr-only">전체메뉴</span>
        </button>
        <!-- 모바일 전체 메뉴 버튼 -->
        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#myOffcanvas"
          aria-controls="myOffcanvas"
        >
          <span class="sr-only">전체메뉴</span>
        </button>
        <AllGnb
          v-if="openGnb"
          @close="openGnb = false"
          @openAiPopup="showAiPopup = true"
        />
        <MainlayerPopup
          class="all-pop"
          :is-visible="showAiPopup"
          @update:isVisible="(val) => (showAiPopup = val)"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
