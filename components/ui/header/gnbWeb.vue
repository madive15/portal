<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import GnbImg1 from '~/assets/image/main/gnb_img1.png';
import GnbImg2 from '~/assets/image/main/gnb_img2.png';
import GnbImg3 from '~/assets/image/main/gnb_img3.png';
import GnbImg4 from '~/assets/image/main/gnb_img4.png';
import GnbImg5 from '~/assets/image/main/gnb_img5.png';
import GnbImg6_1 from '~/assets/image/main/gnb_img6-1.png';
import GnbImg6_2 from '~/assets/image/main/gnb_img6-2.png';
import SearchComb from '~/components/ui/search/searchComb.vue';
import AllMenu from '~/components/ui/header/allMenu.vue';
import MoMenu from '~/components/ui/header/moMenu.vue';

interface SubTab {
  tabTitle: string;
  items: string[];
  subTitle?: string;
}
interface MenuCategory {
  title: string;
  tabs: SubTab[]; // 서브탭 구조로 변경
}
const menuList = ref<MenuCategory[]>([
  {
    title: '플랫폼 안내',
    tabs: [
      {
        tabTitle: '플랫폼 안내',
        menuItems: [
          {
            items: [
              '개요',
              '추진사항',
              '플랫폼제공서비스',
              '플랫폼 시스템',
              '플랫폼 참여기관'
            ]
          }
        ],
        gnbImages: GnbImg1
      }
    ]
  },
  {
    title: '나의 서비스찾기',
    tabs: [
      {
        tabTitle: '나의 서비스찾기',
        menuItems: [
          {
            items: ['손쉬운찾기', '법률복지지도']
          }
        ],
        gnbImages: GnbImg2
      }
    ]
  },
  {
    title: '서비스 유형',
    tabs: [
      {
        tabTitle: '서비스 내용',
        menuItems: [
          {
            items: [
              '법률·판례·소송 일반정보',
              '법률상담 및 소송지원',
              '채무조정/금융복지',
              '임대차/전세사기',
              '임금체불',
              '범죄피해/가정·성·아동·학교폭력 피해',
              '양육비/아동·청년',
              '소비자/의료/환경/저작권',
              '정보통신/전자거래/상사중재',
              '공익사건/법교육/법률복지'
            ]
          }
        ],
        gnbImages: GnbImg3
      },
      {
        tabTitle: '서비스 대상자',
        menuItems: [
          {
            items: [
              '경제적 취약계층',
              '사회적 취약계층',
              '범죄/재해/환경 피해자',
              '임차인/임대인/전세사기피해자',
              '소비자/소상공인/중소기업인',
              '국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등',
              '경찰/소방/제대군인/의사상자',
              '예술인/농어업인/특수직업군',
              '기준중위소득 125% 이하 국민',
              '외국인'
            ]
          }
        ],
        gnbImages: GnbImg3
      }
    ]
  },
  {
    title: '서비스제공기관',
    tabs: [
      {
        tabTitle: '서비스제공기관',
        menuItems: [
          {
            items: [
              '법률구조기관',
              '정부부처 및 법원',
              '지자체 산하기관',
              '공공기관',
              '특수법인 및 단체'
            ]
          }
        ],
        gnbImages: GnbImg4
      }
    ]
  },
  {
    title: '사례/서식',
    tabs: [
      {
        tabTitle: '사례/서식',
        menuItems: [
          {
            items: [
              '법률상담사례',
              '법률구조사례',
              '법률서식(법원 소송안내마당)',
              '법률서식(대한법률구조공단)'
            ]
          }
        ],
        gnbImages: GnbImg5
      }
    ]
  },
  {
    title: 'One-Stop 법률구조',
    tabs: [
      {
        tabTitle: '법률상담',
        menuItems: [
          {
            subTitle: '법률상담 방법',
            items: ['면접상담', '화상상담', '전화상담', '사이버 상담']
          },
          {
            subTitle: '법률상담 기관',
            items: [
              '대한법률구조공단',
              '한국가정법률상담소',
              '대한가정법률복지상담원',
              '법률홈닥터'
            ]
          },
          {
            subTitle: '양육비/신용회복/금융복지/상사중재 상담',
            items: [
              '양육비 상담',
              '신용회복 상담',
              '서울/경기도 금융복지상담',
              '상사중재 관련 상담'
            ]
          }
        ],
        gnbImages: GnbImg6_1
      },
      {
        tabTitle: '법률구조 전자접수',
        menuItems: [
          {
            subTitle: '상담기관',
            items: [
              '법률상담사례',
              '법률구조사례',
              '법률서식(법원 소송안내마당)',
              '법률서식(대한법률구조공단)'
            ]
          }
        ],
        gnbImages: GnbImg6_2
      }
    ]
  }
]);

const isOpen = ref(false);
const allMenuToggle = ref(false);

// 열린 메뉴 인덱스
const openIndex = ref<number | null>(null);
const root = ref<HTMLElement | null>(null);

const toggleMenu = (type?: 'isOpen' | 'allMenu' | number) => {
  isOpen.value = false;
  allMenuToggle.value = false;
  openIndex.value = null;

  if (type === 'isOpen') isOpen.value = true;
  else if (type === 'allMenu') allMenuToggle.value = true;
  else if (typeof type === 'number') openIndex.value = type;
};
// 각 메뉴별 현재 선택된 탭 인덱스
const selectedTabIndex = ref<number[]>(menuList.value.map(() => 0));

// 탭 클릭 시 해당 탭 인덱스를 변경
const selectTab = (cateIndex: number, tabIndex: number) => {
  selectedTabIndex.value[cateIndex] = tabIndex;
};
const isExpanded = ref(false);
const handleClose = (e: MouseEvent) => {
  isExpanded.value = false;
  isOpen.value = false;
  allMenuToggle.value = false;
  openIndex.value = null;
};
const onClickOutside = (e: MouseEvent) => {
  if (!root.value?.contains(e.target as Node)) {
    handleClose();
  }
};
onMounted(() => {
  document.addEventListener('mousedown', onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside);
});
</script>

<template>
  <div class="gnb-menu__area" ref="root">
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
            >{{ category.title }}</router-link
          >
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
                        <router-link to="">
                          <span class="text-span">{{ item }}</span>
                        </router-link>
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
              <SearchComb />
              <button type="button" class="btn-close" @click="handleClose">
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
              <AllMenu />
              <button type="button" class="btn-close" @click="handleClose">
                <span class="sr-only">닫기</span>
              </button>
            </div>
          </div>
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
