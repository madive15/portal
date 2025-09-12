<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/stores/common/menu';
import { useSearchStore } from '~/stores/search';
import GnbImg1 from '~/assets/image/main/gnb_img1.png';
import GnbImg2 from '~/assets/image/main/gnb_img2.png';
import GnbImg3 from '~/assets/image/main/gnb_img3.png';
import GnbImg4 from '~/assets/image/main/gnb_img4.png';
import GnbImg5 from '~/assets/image/main/gnb_img5.png';
import GnbImg6_1 from '~/assets/image/main/gnb_img6-1.png';
import GnbImg6_2 from '~/assets/image/main/gnb_img6-2.png';
import SearchComb from '~/components/search/GnbSearchComb.vue';
import AllMenu from '~/components/common/NewAllMenu.vue';
import MainlayerPopup from '~/components/main/MainlayerPopup.vue';
import MoMenu from '~/components/common/NewMoMenu.vue';

interface menuItems {
  menuId: string;
  upMenuId: string;
  menuName: string;
  menuUrl: string;
  menuDepth: number;
  menuLinkTarget: string;
  moduleNm: null;
  menuOrder: number;
  menuGnbUseYn: null;
  children: any;
}

interface SubTab {
  tabTitle: string;
  items: any;
  subTitle?: string;
}
interface MenuCategory {
  title: string;
  tabs: SubTab[]; // 서브탭 구조로 변경
}
const GNBImages = [
  GnbImg1,
  GnbImg2,
  GnbImg3,
  GnbImg4,
  GnbImg5,
  GnbImg6_1,
  GnbImg6_2
];
const isOpen = ref(false);
const allMenuToggle = ref(false);
const showAiPopup = ref(false);

// 열린 메뉴 인덱스
const openIndex = ref<number | null>(null);

const searchStore = useSearchStore();
const { searchAsync } = storeToRefs(searchStore);

const menuStore = useMenuStore();
const { gnb, gnbMenuList } = storeToRefs(menuStore);

const menuList: ComputedRef<MenuCategory[]> = computed(() => {
  return gnbMenuList.value.map((menuGroup, groupIndex) => ({
    ...menuGroup,
    tabs: menuGroup.tabs.map((tab, tabIndex) => {
      let image;

      if (groupIndex === 5) {
        // index가 5일 때는 tabIndex 기준으로 다른 이미지 할당
        image = tabIndex === 0 ? GnbImg6_1 : GnbImg6_2;
      } else {
        image = GNBImages[groupIndex];
      }

      return {
        ...tab,
        gnbImages: image
      };
    })
  }));
});

const route = useRoute();

// 현재 열려 있는 메뉴의 인덱스
// 아무것도 열려있지 않을 때는 null
const gnbRef = ref<HTMLElement | null>(null);

const toggleMenu = (type?: 'isOpen' | 'allMenu' | number) => {
  isOpen.value = false;
  allMenuToggle.value = false;
  openIndex.value = null;

  if (type === 'isOpen') {
    // 검색 버튼 클릭 시
    isOpen.value = true;
    searchAsync.value.searchQuery = '';
  } else if (type === 'allMenu') {
    allMenuToggle.value = true;
  } else if (typeof type === 'number') {
    openIndex.value = type;
  }
};

// 각 메뉴별 현재 선택된 탭 인덱스
const selectedTabIndex = ref<number[]>(menuList.value.map(() => 0));

// 탭 클릭 시 해당 탭 인덱스를 변경
const selectTab = (cateIndex: number, tabIndex: number) => {
  selectedTabIndex.value[cateIndex] = tabIndex;
};

const isExpanded = ref(false);

const handleClose = () => {
  isExpanded.value = false;
  isOpen.value = false;
  allMenuToggle.value = false;
  openIndex.value = null;
};

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
    openIndex.value = null;
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
    openIndex.value = null;
  }
}
</script>

<template>
  <div class="gnb-menu__area" ref="gnbRef">
    <div class="container">
      <ul class="gnb-menu__wrap pc-visible">
        <li
          v-for="(category, cateIndex) in menuList"
          :key="cateIndex"
          class="category-item"
        >
          <router-link
            to=""
            @click.prevent="
              toggleMenu(openIndex === cateIndex ? undefined : cateIndex)
            "
            class="menu-title"
            :class="{ active: openIndex === cateIndex }"
          >
            {{ category.title }}
          </router-link>
          <div class="gnb-layer__menu" v-if="openIndex === cateIndex">
            <div class="menu-cont">
              <div class="bx">
                <!-- 탭 버튼 -->
                <div class="menu-header">
                  <button
                    type="button"
                    v-for="(tab, tabIndex) in category.tabs"
                    :key="tabIndex"
                    :class="{
                      active: selectedTabIndex[cateIndex] === tabIndex
                    }"
                    class="tit"
                    :title="`${selectedTabIndex[cateIndex] === tabIndex ? '선택됨' : ''}`"
                    @click="selectTab(cateIndex, tabIndex)"
                  >
                    <span class="text">
                      {{ tab.tabTitle }}
                    </span>
                  </button>
                </div>
                <!-- 탭에 따라 메뉴 변경 -->
                <div class="menu-body">
                  <div
                    v-for="(menuItem, menuIndex) in category.tabs[
                      selectedTabIndex[cateIndex]
                    ].menuItems"
                    :key="menuIndex"
                  >
                    <h3 v-if="menuItem.subTitle">{{ menuItem.subTitle }}</h3>
                    <ul>
                      <li
                        v-for="(item, itemIndex) in menuItem.items"
                        :key="itemIndex"
                        class="item"
                      >
                        <NuxtLink :to="`${item.menuUrl}`" :external="true">
                          <span class="text-span">{{ item.menuName }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <img
                :src="category.tabs[selectedTabIndex[cateIndex]]?.gnbImages"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
      <div class="gnb-side__wrap">
        <div class="button-item">
          <button
            type="button"
            class="btn-gnb__search"
            @click="toggleMenu(isOpen ? undefined : 'isOpen')"
          >
            <span class="sr-only">검색</span>
          </button>
          <div class="gnb-layer__menu" v-if="isOpen">
            <div class="menu-cont">
              <SearchComb @close="isOpen = false" />
              <button type="button" class="btn-close" @click="isOpen = false">
                <span class="sr-only">닫기</span>
              </button>
            </div>
          </div>
        </div>
        <!--  PC  전체 메뉴-->
        <div class="button-item pc-visible">
          <button
            type="button"
            class="btn-gnb__all"
            @click="toggleMenu(allMenuToggle ? undefined : 'allMenu')"
          >
            <span class="sr-only">전체메뉴</span>
          </button>
          <div class="gnb-layer__menu" v-if="allMenuToggle">
            <div class="menu-cont">
              <AllMenu
                @close="allMenuToggle = false"
                @openAiPopup="showAiPopup = true"
              />

              <button type="button" class="btn-close" @click="handleClose">
                <span class="sr-only">닫기</span>
              </button>
            </div>
          </div>
          <MainlayerPopup
            class="all-pop"
            :is-visible="showAiPopup"
            @update:isVisible="(val) => (showAiPopup = val)"
          />
        </div>
        <!--  MO  전체 메뉴-->
        <div class="button-item mo-visible">
          <button
            type="button"
            class="btn-gnb__all"
            @click="isExpanded = !isExpanded"
          >
            <span class="sr-only">전체메뉴</span>
          </button>
          <MoMenu :class="{ active: isExpanded }" @close="handleClose" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
