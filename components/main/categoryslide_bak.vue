<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useSvcCtgryIstInfoStore } from '~/stores/main/categorySlide';
import EmptyLogo from 'assets/image/main/emptylogo.png';
import Truncatetext from '~/components/common/truncatetext.vue';

const categorySwiperRef = ref<SwiperType | null>(null);
const serviceSwiperRef = ref<SwiperType | null>(null);
const InfoSlideRef = ref<SwiperType | null>(null);

const onCategorySwiper = (swiper: SwiperType) => {
  categorySwiperRef.value = swiper;
};

const onServiceSwiper = (swiper: SwiperType) => {
  serviceSwiperRef.value = swiper;

  swiper.on('slideChange', () => handleSlideChange(swiper));
};

const onInfoSwiper = (swiper: SwiperType) => {
  InfoSlideRef.value = swiper;

  initializeAttribute(swiper.slides);
};

const initializeAttribute = (slides) => {
  Array.from(slides).forEach((slide) => {
    const targetLinkTag = slide.querySelectorAll('.slide-link');

    targetLinkTag.forEach((item) => {
      item.setAttribute('aria-hidden', 'true');
      item.setAttribute('tabindex', '-1');
    });
  });
};

const getSwiperProps = (slideValue) => ({
  activeIndex: slideValue.realIndex,
  // 추후 탭 내 목록개수에 따라 수정해야함
  viewCount: 4
});

const handleSlideChange = (swiper) => {
  if (!swiper) return;

  const activeSlide = swiper.slides[swiper.realIndex];
  const activeSlideInSlides = activeSlide.querySelectorAll('.swiper-slide');
  updateSlideAccessibility(swiper.slides, activeSlideInSlides);
};

const updateSlideAccessibility = (slides, swiper) => {
  if (!slides || !swiper) return;

  const { activeIndex, viewCount } = getSwiperProps(InfoSlideRef.value);
  // console.log(activeIndex, viewCount);

  for (let i = activeIndex; i < activeIndex + viewCount; i++) {
    const slide = swiper[i];
    const targetLinkTags = slide.querySelectorAll('.slide-link');

    targetLinkTags.forEach((item) => {
      item.setAttribute('aria-hidden', 'false');
      item.setAttribute('tabindex', '0');
    });
  }
};

onMounted(() => {
  if (serviceSwiperRef.value) {
    serviceSwiperRef.value.on('slideChange', () =>
      handleSlideChange(serviceSwiperRef.value)
    );
  }
});

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

watch(selectedCategoryId, async () => {
  await nextTick();

  if (InfoSlideRef.value) {
    initializeAttribute(InfoSlideRef.value.slides);
  }

  if (serviceSwiperRef.value) {
    findActiveSlide(serviceSwiperRef.value);
  }
});
</script>

<template>
  <div class="category-slide-box">
    <button type="button" class="category-btn category-prev">
      <span class="sr-only">이전 슬라이드 보기</span>
    </button>

    <Swiper
      @swiper="onCategorySwiper"
      :slides-per-view="'auto'"
      :modules="[Navigation]"
      :navigation="{
        nextEl: '.category-next',
        prevEl: '.category-prev'
      }"
      :allow-touch-move="false"
      :breakpoints="{
        1199: {
          spaceBetween: 30
        },
        0: {
          spaceBetween: 10
        }
      }"
    >
      <!--      <SwiperSlide-->
      <!--          v-for="slide in categorySlidelist"-->
      <!--          :key="slide.id"-->
      <!--          :class="slide.class"-->
      <!--      >-->
      <!--        <div-->
      <!--            class="category"-->
      <!--            :class="{-->
      <!--            green: slide.id === 1,-->
      <!--            navy: slide.id === selectedCategoryId-->
      <!--          }"-->
      <!--            @click="onClick(slide.id, slide.ctgryNo)"-->
      <!--        >-->
      <!--          <p>{{ slide.ctgryNm }} ({{ slide.cnt }}개)</p>-->
      <!--        </div>-->
      <!--      </SwiperSlide>-->
      <SwiperSlide
        v-for="slide in categorySlidelist"
        :key="slide.id"
        :class="slide.class"
        class="category-slide-wrap"
      >
        <button
          class="category"
          type="button"
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

    <button type="button" class="category-btn category-next">
      <span class="sr-only">다음 슬라이드 보기</span>
    </button>
  </div>

  <!-- 외부 Swiper (service-class) -->
  <div class="service-slide-box">
    <button type="button" class="btn service-prev">
      <span class="sr-only">이전 슬라이드 보기</span>
    </button>

    <Swiper
      @swiper="onServiceSwiper"
      ref="serviceSwiperRef"
      :slides-per-view="1"
      :loop="true"
      :modules="[Navigation]"
      class="service-class"
      @slideChange="onTopSlideChange"
    >
      <SwiperSlide
        v-for="slide in categorySlidelist"
        :key="slide.id"
        :class="slide.class"
      >
        <!-- 내부 Swiper -->
        <Swiper
          @swiper="onInfoSwiper"
          ref="InfoSlideRef"
          :slides-per-view="4"
          :loop="true"
          :modules="[Navigation]"
          :breakpoints="{
            1199: {
              spaceBetween: 40
            },
            0: {
              spaceBetween: 10
            }
          }"
          :navigation="{
            nextEl: '.service-next',
            prevEl: '.service-prev'
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
                class="slide-link"
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
      <span class="sr-only">다음 슬라이드 보기</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/categoryslide';
</style>
