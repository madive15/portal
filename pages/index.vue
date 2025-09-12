<script setup lang="ts">
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useModalFocus } from '~/composables/useModalFocus';
import MainHeader from '~/components/common/NewMainHeader.vue';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import caseSlide from '~/components/main/caseslide.vue';
import lawSlide from '~/components/main/lawslide.vue';
import categorySlide from '~/components/main/categoryslide.vue';
import relateSlide from '~/components/main/relateslide.vue';
import easy from '~/components/main/easyslide.vue';
import mapSearch from '~/components/main/map.vue';
import { Vue3Fullpage } from 'vue3-fullpage';

definePageMeta({
  layout: 'main'
});

const { showAlert } = useCustomAlert();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
const {
  modalFocusRef: modalFocusRef2,
  returnFocusRef: returnFocusRef2,
  createModalFocus: createModalFocus2,
  removeModalFocus: removeModalFocus2
} = useModalFocus();

const allItems = [
  {
    id: 1,
    img: '/image/main/main_icon01.svg',
    title: '법률·판례·소송 일반정보',
    upCtgryNo: '1010000000'
  },
  {
    id: 2,
    img: '/image/main/main_icon02.svg',
    title: '법률상담 및 소송지원',
    upCtgryNo: '1020000000'
  },
  {
    id: 3,
    img: '/image/main/main_icon03.svg',
    title: '채무조정 / 금융복지',
    upCtgryNo: '1030000000'
  },
  {
    id: 4,
    img: '/image/main/main_icon04.svg',
    title: '임대차 / 전세사기',
    upCtgryNo: '1040000000'
  },
  {
    id: 5,
    img: '/image/main/main_icon05.svg',
    title: '임금체불',
    upCtgryNo: '1050000000'
  },
  {
    id: 6,
    img: '/image/main/main_icon06.svg',
    title: '범죄피해 / 가정·성 아동·학교폭력 피해',
    upCtgryNo: '1060000000'
  },
  {
    id: 7,
    img: '/image/main/main_icon07.svg',
    title: '양육비 / 아동·청년',
    upCtgryNo: '1070000000'
  },
  {
    id: 8,
    img: '/image/main/main_icon08.svg',
    title: '소비자 / 의료 / 환경 / 저작권',
    upCtgryNo: '1080000000'
  },
  {
    id: 9,
    img: '/image/main/main_icon09.svg',
    title: '정보통신 / 전자거래 / 상사중재',
    upCtgryNo: '1090000000'
  },
  {
    id: 10,
    img: '/image/main/main_icon10.svg',
    title: '공익사건 / 법교육 / 법률복지',
    upCtgryNo: '1100000000'
  }
];

// 모바일 여부
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// 처음에 4개만 보이도록
const visibleCount = ref(4);

// 모바일일 때만 더보기 로직 적용, PC에서는 모든 아이템 표시
const visibleItems = computed(() => {
  if (isMobile.value) {
    // 모바일: visibleCount까지만 표시
    return allItems.slice(0, visibleCount.value);
  } else {
    // PC: 모든 아이템 표시
    return allItems;
  }
});

// 더보기 버튼 클릭 시 6개씩 추가
const loadMore = () => {
  if (isMobile.value && visibleCount.value < allItems.length) {
    visibleCount.value += 6;
  }
};

// 더보기 버튼 표시 여부: 모바일이고, 아직 모든 아이템 안보였을 때
const showMoreButton = computed(() => {
  return isMobile.value && visibleCount.value < allItems.length;
});

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

onBeforeMount(() => {
  searchStore.trend();
});

// 통합검색창
const searchStore = useSearchStore();

const { searchMain, trendList } = storeToRefs(searchStore);

const router = useRouter();

// 검색어 입력 상태
const searchQuery = ref('');

// 인기검색어
const clickTrendKwd = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  searchQuery.value = kwd.replace(reg, '');
  searchBtnClick();
};

// 인기검색어 키워드 필터링
const filterTrendList = computed(() =>
  trendList.value
    .filter((item) => item.keyword)
    .map((item, index) => ({
      number: index + 1,
      label: item.keyword
    }))
);

const firstTrend = ref({});
watch(filterTrendList, (newValue) => {
  if (newValue.length > 0) {
    firstTrend.value = newValue[0];
  }
});

// 검색 버튼 클릭
const searchBtnClick = () => {
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    // 검색어가 있는 경우
    searchMain.value.searchQuery = searchQuery.value;
    searchMain.value.reSearchQuery = [];
    router.push(`/search/basicresult`, { external: true });
  } else {
    // 검색어가 없는 경우
    showAlert({
      icon: 'info',
      text: '검색어를 입력하세요.'
    });
  }
};

const moveAiPage = () => {
  useAxios()
    .get('/api/login/status')
    .then(() => {
      router.push('/ai', { external: true });
    })
    .catch(() => {
      router.push('/login/ai', { external: true });
    });
};

import '~/assets/style/fullpage.css';
import Footer from '~/components/common/footer.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MainlayerPopup from '~/components/main/MainlayerPopup.vue';

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

// 팝업 열림 여부를 관리할 state
const showAiPopup = ref(false);

// 버튼 클릭 시 팝업 열기
function openAiPopup() {
  showAiPopup.value = true;
}

function onPageEnter(index: Number) {
  nextTick(() => {
    const selectCss = document.querySelector('[aria-label="Go to New More"]');

    if (index == 4 || index == 5) {
      if (selectCss != null) {
        selectCss.classList.add('is-active');
      }
    } else {
      if (selectCss != null) {
        selectCss.classList.remove('is-active');
      }
    }
  });
}

// 풀페이지 네비게이션 접근성 이벤트 추가 2025.04.07
onMounted(() => {
  // 모든 네비게이션 링크에 role="button" 추가
  const fullPageNav = document.querySelector('.vue3-fullpage__navigation');
  const fullPageNavLinks = fullPageNav.querySelectorAll('a');

  fullPageNavLinks.forEach((link) => {
    link.setAttribute('role', 'button');
    link.setAttribute('tabindex', '0');

    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        link.click();
      }
    });
  });
});

import Typed from 'typed.js';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

let typed: Typed | null = null;
let scroller: number | null = null;

// onMounted(() => {
//   typed = new Typed('#MainAiSearchInput', {
//     strings: ['전세사기를 당했는데 도움을 받을 수 있는 방법을 알려줘'],
//     typeSpeed: 110,
//     backSpeed: 1,
//     loop: true,
//     attr: 'value'
//   });
//
//   scroller = window.setInterval(() => {
//     const el = document.getElementById('MainAiSearchInput') as HTMLInputElement;
//     if (el) {
//       el.scrollLeft = el.scrollWidth;
//     }
//   }, 50);
// });
//
// onBeforeUnmount(() => {
//   if (typed) {
//     typed.destroy();
//   }
//   if (scroller) {
//     clearInterval(scroller);
//   }
// });

/* 상담사례/법률서식 모바일에서 탭메뉴 대응 */
const activeTab = ref('case');

/*커스텀 fullpage nav*/
const FOCUS_TAG =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
const fullpageNum = ref(0);
const onChangePage = (key: string) => {
  const el = document.querySelector(`#${key}`);
  el?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const firstFocusTag = el?.querySelectorAll(FOCUS_TAG)[0] as HTMLElement;
    firstFocusTag?.focus({ preventScroll: true });
  }, 500);
};
</script>

<template>
  <!-- pc -->
  <div id="common-content" class="main-wrap" v-if="!isMobile">
    <section :class="{ 'fix-active': isFixed }" class="search-menu-section">
      <div class="bg-box">
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-12">
              <div class="search-box">
                <div class="content-header">
                  <h2>
                    <span class="txt">
                      <img
                        src="/assets/image/main/main_text.png"
                        alt="나에게 필요한 법률서비스"
                      />
                    </span>
                    <span> <b>법률구조 플랫폼</b> 으로 해결하세요. </span>
                  </h2>
                </div>
                <div class="content-body">
                  <div class="main-search-box input-group">
                    <label for="mainSearchInput">
                      <span class="sr-only">찾고 싶은 검색어를 입력하세요</span>
                    </label>
                    <input
                      id="mainSearchInput"
                      type="text"
                      maxlength="100"
                      placeholder="찾고 싶은 검색어를 입력하세요."
                      v-model="searchQuery"
                      autocomplete="off"
                      class="form-control main-search-input"
                      @keyup.enter="searchBtnClick()"
                    />
                    <button
                      type="button"
                      class="btn search-button"
                      @click="searchBtnClick"
                    >
                      <img
                        src="/assets/image/main/main_search.svg"
                        alt="메인 검색"
                      />
                    </button>
                  </div>
                  <div class="hit-search-word-box">
                    <span class="title-span">인기검색어</span>
                    <DropdownBasic class="search-type" v-model="firstTrend">
                      <template #default="{ select }">
                        <ul role="menu">
                          <li
                            v-for="item in filterTrendList"
                            role="menuitem"
                            tabindex="0"
                            @click="clickTrendKwd(item.label)"
                            @keydown.enter.prevent="clickTrendKwd(item.label)"
                          >
                            <span class="num-span">{{ item.number }}</span>
                            {{ item.label }}
                          </li>
                        </ul>
                      </template>
                    </DropdownBasic>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-12">
              <div class="main-ai-box">
                <strong class="ai-box-tit">
                  생성형
                  <span class="icon-span icon-big">
                    <img src="/assets/image/main/ai_img2.png" alt="AI" />
                  </span>
                  검색 서비스
                </strong>
                <div class="ai-search-box">
                  <div class="text-box">
                    <img
                      src="/assets/image/main/main_ai_text_animation.gif"
                      alt="예) 전세사기를 당했는데 도움을 받을 수 있나요 도움을 받을 수 있나요"
                    />
                  </div>
                  <!--                  <input-->
                  <!--                    class="form-control main-ai-search-input"-->
                  <!--                    id="MainAiSearchInput"-->
                  <!--                    type="text"-->
                  <!--                    readonly-->
                  <!--                  />-->
                  <!--                  <label for="MainAiSearchInput" />-->
                  <!--                  <button class="btn main-ai-search-button">-->
                  <!--                    <img-->
                  <!--                      src="/assets/image/main/ai_search.svg"-->
                  <!--                      alt="생성형 AI 검색"-->
                  <!--                    />-->
                  <!--                  </button>-->
                </div>

                <div class="ai-select-box">
                  <div class="ai-switch-box">
                    <button
                      type="button"
                      @click="moveAiPage"
                      class="btn ai-move-button"
                    >
                      <span class="img-span">
                        <img
                          src="/assets/image/main/ai_shortcut1.png"
                          alt="ai 검색 바로가기"
                        />
                      </span>
                      <span class="text-span">AI 검색<br />바로가기</span>
                    </button>

                    <button
                      type="button"
                      @click="
                        () => {
                          openAiPopup();
                          createModalFocus();
                        }
                      "
                      class="btn ai-information-button"
                      ref="returnFocusRef"
                    >
                      <span class="img-span">
                        <img
                          src="/assets/image/main/ai_shortcut2.png"
                          alt="ai 검색 이용방법"
                        />
                      </span>
                      <span class="text-span">AI검색<br />이용방법</span>
                    </button>

                    <MainlayerPopup
                      ref="modalFocusRef"
                      :isVisible="showAiPopup"
                      @update:isVisible="
                        (val) => {
                          removeModalFocus();
                          return (showAiPopup = val);
                        }
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="vue-fullpage-nav">
      <ul>
        <li :class="{ 'is-active': fullpageNum === 0 || fullpageNum === 1 }">
          <button
            role="tab"
            :aria-selected="fullpageNum === 0 || fullpageNum === 1"
            aria-controls="top-new-more"
            id="tab1"
            @click="() => onChangePage('top-new-more')"
          >
            <span class="text">메인/손쉬운 찾기</span>
          </button>
        </li>
        <li :class="{ 'is-active': fullpageNum === 2 }">
          <button
            role="tab"
            :aria-selected="fullpageNum === 2"
            aria-controls="main-law-map"
            id="tab2"
            @click="() => onChangePage('main-law-map')"
          >
            <span class="text">법률복지지도</span>
          </button>
        </li>
        <li :class="{ 'is-active': fullpageNum === 3 }">
          <button
            role="tab"
            :aria-selected="fullpageNum === 3"
            aria-controls="main-board-slide"
            id="tab3"
            @click="() => onChangePage('main-board-slide')"
          >
            <span class="text">사례/서식</span>
          </button>
        </li>
        <li :class="{ 'is-active': fullpageNum === 4 || fullpageNum === 5 }">
          <button
            role="tab"
            :aria-selected="fullpageNum == 4 || fullpageNum == 5"
            aria-controls="new-more"
            id="tab4"
            @click="() => onChangePage('new-more')"
          >
            <span class="text">참여기관</span>
          </button>
        </li>
      </ul>
    </div>
    <Vue3Fullpage
      :update-history="false"
      :disable-classes="false"
      navigation-dot-class="nav-with-labels"
      @page-enter="onPageEnter"
      v-model="fullpageNum"
    >
      <section
        role="tabpanel"
        aria-labelledby="tab1"
        id="top-new-more"
        class="top-new-more-section scroll-section"
      >
        <h3 class="sr-only">메인/손쉬운 찾기</h3>
        <section class="main-quick-menu-section">
          <div class="container">
            <div class="row gy-xl-0 gy-2">
              <!-- 표시되는 아이템들 -->
              <div
                class="col-xl col-6"
                v-for="(item, index) in visibleItems"
                :key="item.id"
              >
                <div class="quick-box">
                  <NuxtLink
                    :to="`/servicetype/list?upCtgryNo=${item.upCtgryNo}`"
                    :external="true"
                  >
                    <div class="img-box">
                      <img :src="item.img" alt="" />
                    </div>
                    <div class="text-box">
                      <span v-html="item.title.replace('\n', '<br/>')"></span>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <!-- 모바일일 때만 보여지는 '더보기' 버튼 -->
              <div class="col-12 d-block d-xl-none" v-if="showMoreButton">
                <div class="more-box">
                  <button class="btn more-button" @click="loadMore">
                    <span class="text-span">더보기</span>
                    <span class="icon-span">
                      <img
                        src="/assets/image/mo/icons_view_more.svg"
                        alt="더보기"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="main-easy-search-section">
          <div class="container">
            <easy />
          </div>
        </section>
      </section>

      <section
        role="tabpanel"
        aria-labelledby="tab2"
        id="main-law-map"
        class="main-law-map-section scroll-section"
      >
        <h3 class="sr-only">법률복지지도</h3>
        <div class="container">
          <div class="row justify-content-between">
            <mapSearch />
          </div>
        </div>
      </section>

      <section
        role="tabpanel"
        aria-labelledby="tab3"
        id="main-board-slide"
        class="main-latest-board-section scroll-section"
      >
        <h3 class="sr-only">사례/서식</h3>
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-12 left-col">
              <div class="latest-box">
                <div class="content-header">
                  <div class="title-box icon-type1">
                    <h4>상담사례</h4>
                  </div>
                </div>
                <div class="content-body">
                  <caseSlide />
                </div>
                <div class="more-box">
                  <NuxtLink
                    :to="'/statuteinfo/discussion/list'"
                    class="btn more-button"
                    title="상담사례"
                    :external="true"
                  >
                    <span class="text-span"> 더보기 </span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-12 right-col">
              <div class="latest-box">
                <div class="content-header">
                  <div class="title-box icon-type2">
                    <h4>법률서식</h4>
                  </div>
                </div>
                <div class="content-body">
                  <lawSlide />
                </div>
                <div class="more-box">
                  <NuxtLink
                    :to="'/statuteinfo/template/supremecourt/list'"
                    class="btn more-button"
                    title="법률서식"
                    :external="true"
                  >
                    <span class="text-span"> 더보기 </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        role="tabpanel"
        aria-labelledby="tab4"
        id="new-more"
        class="new-more-section scroll-section end-section"
      >
        <h3 class="sr-only">참여기관</h3>
        <section class="main-information-section">
          <div class="container">
            <h4>서비스 유형별 참여기관</h4>
            <!-- 카테고리 슬라이드 -->
            <categorySlide />
            <!-- 서비스 카드 슬라이드 -->
          </div>
        </section>
        <section class="related-site-section">
          <div class="container">
            <div class="flex-wrap">
              <div class="text">참여기관</div>
              <relateSlide />
            </div>
          </div>
        </section>
      </section>

      <Footer class="fp-auto-height scroll-section" />
    </Vue3Fullpage>
  </div>

  <!-- mobile -->
  <div id="common-content" class="wrap main-wrap" v-else>
    <MainHeader :is-fixed="isFixed" />
    <section class="search-menu-section">
      <div class="bg-box">
        <h2 class="sr-only">메인 본문 내용 시작</h2>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-12">
              <div class="search-box">
                <div class="content-header">
                  <h4>
                    나에게 필요한 법률서비스<br /><span
                      ><b>법률구조 플랫폼</b>으로 해결하세요.</span
                    >
                  </h4>
                  <img
                    src="/assets/image/main/main_illustration.png"
                    alt="메인 검색 페이지"
                  />
                </div>
                <div class="content-body">
                  <div class="main-search-box input-group">
                    <label for="mainSearchInputMo">
                      <span class="sr-only">찾고 싶은 검색어를 입력하세요</span>
                    </label>
                    <input
                      class="form-control main-search-input"
                      id="mainSearchInputMo"
                      type="text"
                      maxlength="100"
                      placeholder="찾고 싶은 검색어를 입력하세요."
                      v-model="searchQuery"
                      autocomplete="off"
                      @keyup.enter="searchBtnClick()"
                    />
                    <button class="btn search-button" @click="searchBtnClick">
                      <img
                        src="/assets/image/main/main_search.svg"
                        alt="메인 검색"
                      />
                    </button>
                  </div>
                  <div class="hit-search-word-box">
                    <span class="title-span">인기검색어</span>
                    <Dropdown
                      :drop-button-slots="true"
                      :drop-slots="true"
                      drop-class="main-hit-drop"
                      :items="filterTrendList.slice(0, 1)"
                    >
                      <template v-if="filterTrendList.length > 0">
                        <li
                          class="hit-li"
                          v-for="(list, index) in filterTrendList"
                          :key="index"
                          :items="list"
                        >
                          <button
                            type="button"
                            class="hit-btn"
                            @click="clickTrendKwd(list.keyword)"
                          >
                            <span class="num-span">{{ index + 1 }}</span>
                            <span class="text-span">{{ list.keyword }}</span>
                          </button>
                        </li>
                      </template>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-12">
              <div class="main-ai-box">
                <h4>
                  <span class="icon-span icon-small">
                    <img
                      src="/assets/image/main/ai_img1.png"
                      alt="생성형 AI 검색 서비스 설명"
                    />
                  </span>
                  생성형
                  <span class="icon-span icon-big">
                    <img
                      src="/assets/image/main/ai_img2.png"
                      alt="생성형 AI 검색 서비스 설명"
                    />
                  </span>
                  검색 서비스
                </h4>
                <div class="ai-search-box">
                  <label for="MainAiSearchInput">
                    <span class="sr-only">찾고 싶은 검색어를 입력하세요</span>
                  </label>
                  <input
                    class="form-control main-ai-search-input"
                    id="MainAiSearchInput"
                    type="text"
                  />
                  <button class="btn main-ai-search-button">
                    <img
                      src="/assets/image/main/ai_search.svg"
                      alt="생성형 AI 검색"
                    />
                  </button>
                </div>
                <div class="ai-select-box">
                  <div class="ai-switch-box">
                    <button class="btn ai-move-button" @click="moveAiPage">
                      <span class="img-span">
                        <img
                          src="/assets/image/main/ai_shortcut1.png"
                          alt="ai 검색 바로가기"
                        />
                      </span>
                      <span class="text-span">AI 검색<br />바로가기</span>
                    </button>

                    <button
                      class="btn ai-information-button"
                      @click="
                        () => {
                          openAiPopup();
                          createModalFocus2();
                        }
                      "
                      ref="returnFocusRef2"
                    >
                      <span class="img-span">
                        <img
                          src="/assets/image/main/ai_shortcut2.png"
                          alt="ai 검색 이용방법"
                        />
                      </span>
                      <span class="text-span">AI검색<br />이용방법</span>
                    </button>

                    <MainlayerPopup
                      ref="modalFocusRef2"
                      :isVisible="showAiPopup"
                      @update:isVisible="
                        (val) => {
                          removeModalFocus2();
                          return (showAiPopup = val);
                        }
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="main-snap-y">
      <section id="top-new-more" class="top-new-more-section scroll-section">
        <h4 class="sr-only" id="mo-main-tit-search">메인/손쉬운 찾기</h4>
        <section class="main-quick-menu-section">
          <div class="container">
            <div class="row gy-xl-0 gy-2">
              <!-- 표시되는 아이템들 -->
              <div
                class="col-xl col-6"
                v-for="(item, index) in visibleItems"
                :key="item.id"
              >
                <div class="quick-box">
                  <NuxtLink
                    :to="`/servicetype/list?upCtgryNo=${item.upCtgryNo}`"
                    :external="true"
                  >
                    <div class="img-box">
                      <img :src="item.img" :alt="item.title + ''" />
                    </div>
                    <div class="text-box">
                      <span v-html="item.title.replace('\n', '<br/>')"></span>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <!-- 모바일일 때만 보여지는 '더보기' 버튼 -->
              <div class="col-12 d-block d-xl-none" v-if="showMoreButton">
                <div class="more-box">
                  <button
                    class="btn more-button"
                    @click="loadMore"
                    aria-labelledby="mo-main-tit-search"
                  >
                    <span class="text-span">더보기</span>
                    <span class="icon-span">
                      <img
                        src="/assets/image/mo/icons_view_more.svg"
                        alt="더보기"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="main-easy-search-section">
          <div class="container">
            <easy />
          </div>
        </section>
      </section>

      <section id="main-law-map" class="main-law-map-section scroll-section">
        <div class="container">
          <div class="row justify-content-between">
            <mapSearch />
          </div>
        </div>
      </section>

      <section
        id="main-latest-board"
        class="main-latest-board-section scroll-section"
      >
        <div class="container">
          <div class="row">
            <div class="latest-box">
              <div class="content-header">
                <button
                  :class="{ active: activeTab === 'case' }"
                  @click="activeTab = 'case'"
                >
                  <span class="title-box icon-type1"> 상담사례 </span>
                </button>
                <button
                  :class="{ active: activeTab === 'law' }"
                  @click="activeTab = 'law'"
                >
                  <span class="title-box icon-type2"> 법률서식 </span>
                </button>
              </div>

              <div class="content-body">
                <caseSlide v-show="activeTab === 'case'" />
                <lawSlide v-show="activeTab === 'law'" />
              </div>
              <div class="more-box">
                <NuxtLink
                  :to="
                    activeTab === 'case'
                      ? '/statuteinfo/discussion/list'
                      : '/statuteinfo/template/supremecourt/list'
                  "
                  class="btn more-button"
                  :title="activeTab === 'case' ? '상담사례' : '법률서식'"
                  :external="true"
                >
                  <span class="text-span">더보기</span>
                </NuxtLink>
              </div>
            </div>
            <!--            <div class="col-xl-6 col-12 left-col">-->
            <!--              <div class="latest-box">-->
            <!--                <div class="content-header">-->
            <!--                  <div class="title-box icon-type1">-->
            <!--                    <h3>상담사례</h3>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="content-body">-->
            <!--                  <caseSlide />-->
            <!--                </div>-->
            <!--                <div class="more-box">-->
            <!--                  <NuxtLink :to="'/statuteinfo/discussion/list'" class="btn more-button" title="상담사례">-->
            <!--                    <span class="text-span">더보기</span>-->
            <!--                  </NuxtLink>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="col-xl-6 col-12 right-col">-->
            <!--              <div class="latest-box">-->
            <!--                <div class="content-header">-->
            <!--                  <div class="title-box icon-type2">-->
            <!--                    <h3>법률서식</h3>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="content-body">-->
            <!--                  <lawSlide />-->
            <!--                </div>-->
            <!--                <div class="more-box">-->
            <!--                  <NuxtLink :to="'/statuteinfo/template/supremecourt/list'" class="btn more-button" title="상담사례">-->
            <!--                    <span class="text-span">더보기</span>-->
            <!--                  </NuxtLink>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </section>

      <section
        id="new-more"
        class="new-more-section scroll-section service-section"
      >
        <section class="main-information-section">
          <div class="container">
            <h4>서비스 유형별 참여기관</h4>
            <!-- 카테고리 슬라이드 -->
            <categorySlide />
            <!-- 서비스 카드 슬라이드 -->
          </div>
        </section>
        <section class="related-site-section">
          <div class="container">
            <div class="flex-wrap">
              <div class="text">참여기관</div>
              <relateSlide />
            </div>
          </div>
        </section>
      </section>

      <Footer class="scroll-section-end" />

      <div class="main-navigation">
        <ul>
          <li @click="gotoPage('#top-new-more')">메인</li>
          <li @click="gotoPage('#main-law-map')">법률복지지도</li>
          <li @click="gotoPage('#main-latest-board')">상담사례 법률서식</li>
          <li @click="gotoPage('#new-more')">서비스 유형별 기관정보</li>
        </ul>
      </div>
    </div>
    <!--    <div class="content">-->
    <!--      <div class="main-wrap">-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/index.scss';
</style>
