<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import '~/assets/style/swiper.css';
import { ref } from 'vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import { useCaseStore } from '~/stores/case';
import { useTmpltStore } from '~/stores/tmplt';
import { storeToRefs } from 'pinia';

interface Props {
  sliceNum?: number;
}

const props = withDefaults(defineProps<Props>(), {
  sliceNum: 4
});

const swiperRef = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

const router = useRouter();
const route = useRoute();

const lwaCase = useCaseStore();
const { caseList, caseDscsnMainList, caseRlfMainList } = storeToRefs(lwaCase);

onBeforeMount(async () => {
  await Promise.all([
    lwaCase.findMainRlfCaseList(),
    lwaCase.findMainDscsnCaseList()
  ]);
});

const dscsnList = computed(() => {
  return caseDscsnMainList.value.map((item, index) => ({
    ...item,
    id: index,
    class: 'slide-item' + index,
    type: item.lwaCtgryNm,
    title: item.caseTtl,
    url: '/statuteinfo/discussion/detail?caseNo=' + item.caseNo
  }));
});

const rlfList = computed(() => {
  return caseRlfMainList.value.map((item, index) => ({
    ...item,
    id: index,
    class: 'slide-item' + index,
    type: item.lwaCtgryNm,
    title: item.caseTtl,
    url: '/statuteinfo/legalaid/detail?caseNo=' + item.caseNo
  }));
});

const movePage1 = (slide) => {
  router.push(`/statuteinfo/discussion/detail?caseNo=${slide.caseNo}`, {
    external: true
  });
};

const movePage2 = (slide) => {
  router.push(`/statuteinfo/legalaid/detail?caseNo=${slide.caseNo}`, {
    external: true
  });
};
</script>

<template>
  <div class="main-latest-board-box">
    <button type="button" class="btn swiper-button-prev-case">
      <span class="sr-only">이전 상담사례 슬라이드</span>
    </button>

    <Swiper
      @swiper="onSwiper"
      :modules="[Navigation]"
      :loop="true"
      :navigation="{
        nextEl: '.swiper-button-next-case',
        prevEl: '.swiper-button-prev-case'
      }"
      :allow-touch-move="true"
      :space-between="50"
    >
      <SwiperSlide>
        <ul class="slide-board-list">
          <li v-for="slide in dscsnList.slice(0, sliceNum)" class="item">
            <div class="latest-list-wrap">
              <div class="text-box list-link">
                <button
                  type="button"
                  @click="movePage1(slide)"
                  class="list-btn"
                >
                  <span class="category-span" v-if="slide.type != null">
                    {{ slide.type }}
                  </span>
                  <span
                    v-if="slide.type == null"
                    style="padding: 5px; font-size: 13px; border-radius: 5px"
                  >
                  </span>
                  <truncatetext
                    :max-length="30"
                    :text="slide.title"
                    class="text"
                  />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </SwiperSlide>

      <SwiperSlide>
        <ul class="slide-board-list">
          <li v-for="slide in rlfList.slice(0, sliceNum)" class="item">
            <div class="latest-list-wrap">
              <div class="text-box list-link">
                <button
                  type="button"
                  @click="movePage2(slide)"
                  class="list-btn"
                >
                  <span class="category-span" v-if="slide.type != null">
                    {{ slide.type }}
                  </span>
                  <span
                    v-if="slide.type == null"
                    style="padding: 5px; font-size: 13px; border-radius: 5px"
                  >
                  </span>
                  <truncatetext
                    :max-length="30"
                    :text="slide.caseTtl"
                    class="text"
                  />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </SwiperSlide>
    </Swiper>

    <button type="button" class="btn swiper-button-next-case">
      <span class="sr-only">다음 상담사례 슬라이드</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/caseslide';
</style>
