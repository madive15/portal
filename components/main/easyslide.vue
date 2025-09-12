<script setup lang="ts">
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { storeToRefs } from 'pinia';
import { useEasySlideInfoStore } from '~/stores/main/easySlide';

// 모달 상태
const isModalVisible = ref(false);

// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false;
};

// "서비스유형" 클릭 이벤트 핸들러
const onServiceTypeClick = () => {
  isModalVisible.value = true;
};

const swiperRef = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

const easySlideInfoList = ref([]);
const easySlideSubInfoList = ref([]);
const menuSlides = ref([]);
const subMenuSlides = ref([]);

let param = {
  type: 0,
  easySlideCd: '',
  easySlideSubCd: ''
};

const easySlideInfo = useEasySlideInfoStore();
const { EasySlideInfoList, EasySlideSubInfoList } = storeToRefs(easySlideInfo);

onBeforeMount(async () => {
  await Promise.all([
    easySlideInfo.searchEasySlideInfoList(),
    easySlideInfo.searchEasySlideSubInfoList()
  ]);
  easySlideInfoList.value = [...EasySlideInfoList.value];
  easySlideSubInfoList.value = [...EasySlideSubInfoList.value];
});

export type tabSlideType = {
  id: number;
  class: string;
  title: string;
};

const tabSlides: tabSlideType[] = [
  { id: 1, class: 'slide-item1', title: '서비스 유형' },
  { id: 2, class: 'slide-item2', title: '서비스 대상자' },
  { id: 3, class: 'slide-item3', title: '서비스 기관' },
  { id: 4, class: 'slide-item4', title: '지역 정보' }
];

// 상태 변수
const activeName = ref<string>(''); // active-name
const nonActiveNames = ref<string[]>([]); // non-active-name1~3
const isTabSelectVisible = ref<boolean>(false); // 화면 토글

// 탭 버튼 클릭 이벤트
const onClick = (clickedIndex: number) => {
  activeName.value = tabSlides[clickedIndex].title;

  param = { ...param, type: clickedIndex + 1 };
  menuSlidesArrange(clickedIndex + 1);

  // tabSlides의 순서를 유지하면서 activeName을 제외한 나머지 항목 설정
  nonActiveNames.value = tabSlides
    .filter((_, index) => index !== clickedIndex)
    .map((item) => item.title);

  isTabSelectVisible.value = true;
};

// non-active-name 클릭 이벤트
const nonActiveNameClick = (clickedName: string) => {
  // 클릭된 항목을 activeName으로 설정
  activeName.value = clickedName;

  // 제목 구분
  let id = 0;
  if (clickedName.includes('유형')) {
    id = 1;
  } else if (clickedName.includes('대상자')) {
    id = 2;
  } else if (clickedName.includes('기관')) {
    id = 3;
  } else {
    id = 4;
  }
  subMenuSlides.value = [];
  menuSlidesArrange(id);

  param = { ...param, type: id };

  // 기존 tabSlides 순서를 기준으로 activeName 제외 나머지 항목 다시 설정
  nonActiveNames.value = tabSlides
    .filter((item) => item.title !== activeName.value)
    .map((item) => item.title);
};

// 초기화 이벤트
const reset = () => {
  activeName.value = '';
  nonActiveNames.value = [];
  isTabSelectVisible.value = false;
  param = { type: 0, easySlideCd: '', easySlideSubCd: '' };
  subMenuSlides.value = [];
  selectedSubTab.value = null;
  selectedMenu.value = null;
};

const selectedSubTab = ref<number | null>(null); // sub-tab-menu 선택 상태
const selectedMenu = ref<number | null>(null); // slide-text 선택 상태

// sub-tab-menu 클릭 이벤트
const toggleSubTabActive = (id: number, easySlideSubCd: string) => {
  selectedSubTab.value = selectedSubTab.value === id ? null : id; // 같은 항목이면 해제

  if (selectedSubTab.value !== null) {
    param = { ...param, easySlideSubCd: easySlideSubCd };
  } else {
    param = { ...param, easySlideSubCd: '' };
  }
};

// slide-text 클릭 이벤트
const toggleMenuActive = (id: number, typeCd: string, easySlideCd: string) => {
  selectedMenu.value = selectedMenu.value === id ? null : id; // 같은 항목이면 해제

  subMenuSlidesArrange(typeCd, easySlideCd);
};

// 리스트 목록 정리 작업
const menuSlidesArrange = (id: number) => {
  const dataList = easySlideInfoList.value
    .map((item, index) => ({
      ...item,
      id: index + 1,
      class: 'slide-item' + (index + 1),
      typeCd: item.typeCd != 0 ? item.typeCd : 0,
      easySlideCd: item.easySlideCd != null ? item.easySlideCd : '',
      title: item.easySlideNm != null ? item.easySlideNm : ''
    }))
    .filter((item) => item.typeCd === id);

  menuSlides.value = [...dataList];
};

// 세부내용 리스트 목록 정리 작업
const subMenuSlidesArrange = (typeCd: string, easySlideCd: string) => {
  let dataList = [];

  if (selectedMenu.value !== null) {
    param = { ...param, easySlideCd: easySlideCd };

    dataList = easySlideSubInfoList.value
      .map((item, index) => ({
        ...item,
        id: index + 1,
        class: 'slide-item' + (index + 1),
        typeCd: item.typeCd != 0 ? item.typeCd : 0,
        easySlideSubCd: item.easySlideSubCd != null ? item.easySlideSubCd : '',
        title: item.easySlideSubNm != null ? item.easySlideSubNm : ''
      }))
      .filter(
        (item) => item.typeCd === typeCd && item.easySlideCd === easySlideCd
      );
  } else {
    param = { ...param, easySlideCd: '' };
  }

  subMenuSlides.value = [...dataList];
};

const easySearchPage = () => {
  let data = '';

  if (param.easySlideCd !== '') {
    data = data + 'type=' + param.type;
    data = data + '&easySlideCd=' + param.easySlideCd;
    if (param.easySlideSubCd !== '') {
      data = data + '&easySlideSubCd=' + param.easySlideSubCd;
    }
  } else {
    alert('하나의 내용을 선택하셔야 검색이 가능합니다.');
    return;
  }

  location.href = '/myservice/easysearch?' + data;
};
</script>

<template>
  <!-- 처음 보이는 탭 선택 화면 -->
  <div v-if="!isTabSelectVisible" class="row tab-div" id="tabDivBox">
    <div class="col-xl-3 col-12">
      <div class="title-box">
        <strong>손쉬운 찾기</strong>
        <span class="icon-span">
          <img src="/assets/image/main/main_check.svg" alt="" />
        </span>
      </div>
      <div class="reset-box">
        <button class="btn reset-button" @click="reset">
          <span class="text-span">초기화</span>
          <span class="icon-span">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
              <path
                d="M12.2938 7.9C11.8828 10.7868 9.52528 13 6.6786 13C3.5424 13 1 10.3137 1 7C1 3.68629 3.5424 1 6.6786 1C9.00717 1 11.0084 2.48091 11.8847 4.6"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.9993 2.5V5.50009H10.1758"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="col-xl-9 col-12">
      <!-- 탭 버튼 -->
      <ul class="easy-search-select-box">
        <li v-for="(tab, index) in tabSlides" :key="tab.id">
          <button type="button" class="tab-btn" @click="onClick(index)">
            {{ tab.title }}
          </button>
        </li>
      </ul>
    </div>
  </div>

  <!-- 선택된 결과 화면 -->
  <div v-if="isTabSelectVisible" class="row tab-select-div">
    <div class="col-xl-12">
      <div class="row">
        <div class="col-xl-2">
          <!-- active-name -->
          <span class="active-name"> {{ activeName }}</span>
          <div class="reset-box">
            <button class="btn reset-button" @click="reset">
              <span class="text-span">초기화</span>
              <span class="icon-span">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                  <path
                    d="M12.2938 7.9C11.8828 10.7868 9.52528 13 6.6786 13C3.5424 13 1 10.3137 1 7C1 3.68629 3.5424 1 6.6786 1C9.00717 1 11.0084 2.48091 11.8847 4.6"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.9993 2.5V5.50009H10.1758"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <!-- mobile -->
        <div
          class="col-xl-2 col-12 d-flex flex-column justify-center mo-flex d-block d-xl-none mb-3"
        >
          <ul class="switch-screen-tab">
            <li v-for="(name, index) in nonActiveNames" :key="index">
              <button
                type="button"
                @click="nonActiveNameClick(name)"
                class="non-active-name"
              >
                {{ name }}
              </button>
            </li>
          </ul>
        </div>
        <div class="col-xl-10 slide-service">
          <div class="row" style="padding-left: 50px">
            <div class="col-xl-10 d-flex">
              <div style="width: calc(100% - 140px)">
                <div class="col-xl-12 d-flex position-relative">
                  <button class="btn swiper-button-prev-case">
                    <span class="sr-only">이전 {{ activeName }} 슬라이드</span>
                  </button>
                  <Swiper
                    @swiper="onSwiper"
                    :slides-per-view="'auto'"
                    :modules="[Navigation]"
                    :navigation="{
                      nextEl: '.swiper-button-next-case',
                      prevEl: '.swiper-button-prev-case'
                    }"
                    :allow-touch-move="false"
                    :space-between="10"
                    class="tab-menu-div"
                  >
                    <SwiperSlide
                      v-for="slide in menuSlides"
                      :key="slide.id"
                      :class="[
                        'slide-text',
                        { active: selectedMenu === slide.id }
                      ]"
                      @click="
                        toggleMenuActive(
                          slide.id,
                          slide.typeCd,
                          slide.easySlideCd
                        )
                      "
                    >
                      <button type="button">{{ slide.title }}</button>
                    </SwiperSlide>
                  </Swiper>
                  <button class="btn swiper-button-next-case">
                    <span class="sr-only">다음 {{ activeName }} 슬라이드</span>
                  </button>
                </div>
                <ul class="easy-sub-wrap">
                  <li v-for="(menu, index) in subMenuSlides" :key="menu.id">
                    <button
                      type="button"
                      :class="[
                        'sub-tab-menu',
                        { active: selectedSubTab === menu.id }
                      ]"
                      @click="toggleSubTabActive(menu.id, menu.easySlideSubCd)"
                    >
                      {{ menu.title }}
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-select-search-btn">
                <button type="button" @click="easySearchPage()">
                  <span>찾기</span>
                </button>
              </div>
            </div>
            <div
              class="col-xl-2 d-flex flex-column justify-center mo-flex d-none d-xl-block box-non-active-name"
            >
              <ul class="switch-screen-tab">
                <li v-for="(name, index) in nonActiveNames" :key="index">
                  <button
                    type="button"
                    @click="nonActiveNameClick(name)"
                    class="non-active-name"
                  >
                    {{ name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/easyslide';
</style>
