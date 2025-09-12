<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ref } from 'vue';
import '~/assets/style/swiper.css';
import { useRelateSlideStore } from '~/stores/main/relateSlide';
import { storeToRefs } from 'pinia';
import EmptyLogo from '~/assets/image/main/emptylogo.png';

const swiperRef = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

const relateSlides = ref([]);

const useRelateSlideInfo = useRelateSlideStore();
const { IstInfoList } = storeToRefs(useRelateSlideInfo);

onBeforeMount(async () => {
  await Promise.all([useRelateSlideInfo.searchIstInfoList()]);
  relateSlides.value = [...IstInfoList.value];
});

const slides = computed(() => {
  return relateSlides.value.map((item, index) => ({
    ...item,
    id: index + 1,
    class: 'slide-item' + (index + 1),
    instNo: item.instNo != null ? item.instNo : '',
    instNm: item.instNm != null ? item.instNm : '',
    src: item.src != null ? item.src : ''
  }));
});

// export type SlideType = {
//   id: number;
//   class: string;
//   src: string;
// };

// const slides: SlideType[] = [
//   {
//     id: 1,
//     class: 'slide-item1',
//     src: '/image/main/related_logo01.png'
//   },
//   {
//     id: 2,
//     class: 'slide-item2',
//     src: '/image/main/related_logo02.png'
//   },
//   {
//     id: 3,
//     class: 'slide-item3',
//     src: '/image/main/related_logo03.png'
//   },
//   {
//     id: 4,
//     class: 'slide-item4',
//     src: '/image/main/related_logo04.png'
//   },
//   {
//     id: 5,
//     class: 'slide-item5',
//     src: '/image/main/related_logo05.png'
//   }
// ];
</script>

<template>
  <div class="site-box">
    <button type="button" class="btn arrow-left">
      <span class="sr-only">이전 참여기관 슬라이드</span>
    </button>

    <Swiper
      @swiper="onSwiper"
      :slides-per-view="4"
      :space-between="54"
      :loop="true"
      :modules="[Navigation, Keyboard]"
      :keyboard="{
        enabled: true,
        onlyInViewport: true
      }"
      :navigation="{
        nextEl: '.arrow-right',
        prevEl: '.arrow-left'
      }"
      :breakpoints="{
        1199: {
          spaceBetween: 54,
          slidesPerView: 4
        },
        992: {
          spaceBetween: 54,
          slidesPerView: 4
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        500: {
          spaceBetween: 20,
          slidesPerView: 2
        },
        380: {
          spaceBetween: 20,
          slidesPerView: 1.5
        },
        0: {
          spaceBetween: 20,
          slidesPerView: 1
        }
      }"
      :allow-touch-move="true"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id" :class="slide.class">
        <div class="site">
          <img
            :src="`/api/image?atchFileId=${slide.atchFileId}&atchFileSeq=${slide.atchFileSeq}`"
            :alt="slide.instNm"
            style="height: 40px"
            v-if="slide.atchFileId"
          />
          <img :src="EmptyLogo" :alt="slide.instNm" v-else />
        </div>
      </SwiperSlide>
    </Swiper>

    <button type="button" class="btn arrow-right">
      <span class="sr-only">다음 참여기관 슬라이드</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/relateslide';
</style>
