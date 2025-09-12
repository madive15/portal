<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSvcCtgryIstInfoStore } from '~/stores/main/categorySlide';
import EmptyLogo from 'assets/image/main/emptylogo.png';
import Truncatetext from '~/components/common/truncatetext.vue';

const categorySwiperRef = ref<SwiperType | null>(null);
const serviceSwiperRef = ref<SwiperType | null>(null);

const onCategorySwiper = (swiper: SwiperType) => {
  categorySwiperRef.value = swiper;
};

const onServiceSwiper = (swiper: SwiperType) => {
  serviceSwiperRef.value = swiper;
};

const categorySlides = ref([]);
const istInfoSlides = ref([]);
let istInfoSlidelist = ref([]);

const svcCtgryIstInfo = useSvcCtgryIstInfoStore();
const { SvcCtgryIstInfoList, IstInfoList } = storeToRefs(svcCtgryIstInfo);

onBeforeMount(async () => {
  await Promise.all([
    svcCtgryIstInfo.searchSvcCtgryIstInfoList(),
    svcCtgryIstInfo.searchIstInfoList()
  ]);
  categorySlides.value = [...SvcCtgryIstInfoList.value];
  istInfoSlides.value = [...IstInfoList.value];

  istInfoSlidelist = istInfoSlides.value
    .map((item, index) => ({
      ...item,
      id: index + 1,
      class: 'slide-item' + (index + 1),
      ctgryNo: item.ctgryNo != null ? item.ctgryNo : '',
      ctgryNm: item.ctgryNm != null ? item.ctgryNm : '',
      instNm: item.instNm != null ? item.instNm : '',
      content: item.content != null ? item.content : '',
      src: item.src != null ? item.src : ''
    }))
    .filter((item) => item.ctgryNo === '1000000000')
    .reverse();
});

const categorySlidelist = computed(() => {
  return categorySlides.value.map((item, index) => ({
    ...item,
    id: index + 1,
    class: 'slide-item' + (index + 1),
    ctgryNo: item.ctgryNo,
    ctgryNm: item.ctgryNm,
    cnt: item.cnt
  }));
});

// 현재 선택된 category ID
const selectedCategoryId = ref<number | null>(1);

// 클릭 이벤트: 외부 Swiper 이동
const onClick = (id: number, ctgryNo: string) => {
  selectedCategoryId.value = id;

  istInfoSlidelist = istInfoSlides.value
    .map((item, index) => ({
      ...item,
      id: index + 1,
      class: 'slide-item' + (index + 1),
      ctgryNo: item.ctgryNo != null ? item.ctgryNo : '',
      ctgryNm: item.ctgryNm != null ? item.ctgryNm : '',
      instNm: item.instNm != null ? item.instNm : '',
      content: item.content != null ? item.content : '',
      atchFileId: !!item.atchFileId ? item.atchFileId : '',
      atchFileSeq: !!item.atchFileSeq ? item.atchFileSeq : ''
    }))
    .filter((item) => item.ctgryNo === ctgryNo);

  // 외부 Swiper(service-class) 이동
  if (serviceSwiperRef.value) {
    const targetIndex = categorySlidelist.value.find(
      (value) => value.id === id
    );
    if (targetIndex.id !== -1) {
      serviceSwiperRef.value.slideTo(targetIndex.id);
    }
  }
};
</script>

<template>
  <div class="category-slide-box">
    <button type="button" class="category-prev category-btn">
      <span class="sr-only">이전 서비스 유형별 참여기관 카테고리 슬라이드</span>
    </button>

    <Swiper
      @swiper="onCategorySwiper"
      :slides-per-view="'auto'"
      :modules="[Navigation, Keyboard]"
      :navigation="{
        nextEl: '.category-next',
        prevEl: '.category-prev'
      }"
      :keyboard="{
        enabled: true,
        onlyInViewport: true
      }"
      :breakpoints="{
        1199: {
          spaceBetween: 30
        },
        0: {
          spaceBetween: 10
        }
      }"
    >
      <SwiperSlide
        v-for="slide in categorySlidelist"
        :key="slide.id"
        :class="[
          'category-slide-wrap',
          slide.class,
          { active: selectedCategoryId === slide.id }
        ]"
        :title="selectedCategoryId === slide.id ? '선택됨' : ''"
      >
        <button
          type="button"
          class="category"
          :class="{
            green: slide.id === 1,
            navy: slide.id === selectedCategoryId
          }"
          @click="onClick(slide.id, slide.ctgryNo)"
        >
          <p>{{ slide.ctgryNm }} ({{ slide.cnt }}개)</p>
        </button>
      </SwiperSlide>
    </Swiper>

    <button type="button" class="category-next category-btn">
      <span class="sr-only">다음 서비스 유형별 참여기관 카테고리 슬라이드</span>
    </button>
  </div>

  <!-- 외부 Swiper (service-class) -->
  <div class="service-slide-box">
    <button type="button" class="btn service-prev">
      <span class="sr-only">이전 서비스 유형별 참여기관 슬라이드</span>
    </button>

    <Swiper
      @swiper="onServiceSwiper"
      :slides-per-view="1"
      class="service-class"
    >
      <SwiperSlide
        v-for="slide in categorySlidelist"
        :key="slide.id"
        :class="{
          [slide.class]: true,
          'd-none': slide.id !== selectedCategoryId
        }"
      >
        <!-- 내부 Swiper -->
        <Swiper
          :slides-per-view="4"
          :space-between="10"
          :modules="[Navigation, Keyboard]"
          :breakpoints="{
            1199: {
              slidesPerView: 4
            },
            780: {
              slidesPerView: 3
            },
            460: {
              slidesPerView: 2
            },
            0: {
              slidesPerView: 1
            }
          }"
          :navigation="{
            nextEl: '.service-next',
            prevEl: '.service-prev'
          }"
          :keyboard="{
            enabled: true,
            onlyInViewport: true
          }"
          class="service-inner-class"
        >
          <SwiperSlide
            v-for="service in istInfoSlidelist"
            :key="service.id"
            :class="service.class"
          >
            <div class="slide">
              <NuxtLink
                :to="`/servicepvsn?instNo=${service.instNo}`"
                :external="true"
              >
                <div class="logo-box">
                  <img
                    :src="`/api/image?atchFileId=${service.atchFileId}&atchFileSeq=${service.atchFileSeq}`"
                    :alt="service.instNm"
                    style="height: 40px"
                    v-if="service.atchFileId"
                  />
                  <img :src="EmptyLogo" :alt="service.instNm" v-else />
                </div>
                <div class="title-box">
                  <truncatetext :max-length="10" :text="service.instNm" />
                </div>
                <div class="text-box">
                  <truncatetext
                    class="category-content-text-box-span"
                    :max-length="32"
                    :text="service.content"
                  />
                </div>
              </NuxtLink>
            </div>
          </SwiperSlide>
        </Swiper>
      </SwiperSlide>
    </Swiper>
    <button type="button" class="btn service-next">
      <span class="sr-only">다음 서비스 유형별 참여기관 슬라이드</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/categoryslide';
</style>
