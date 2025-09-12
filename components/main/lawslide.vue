<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import '~/assets/style/swiper.css';
import { ref } from 'vue';
import Truncatetext from '~/components/common/truncatetext.vue';
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

const boardSlides = ref([]);
const boardSlides2 = ref([]);

const tmpltStore = useTmpltStore();
const { tmpltCvlcptMain, tmpltSpclMain } = storeToRefs(tmpltStore);

onBeforeMount(async () => {
  await Promise.all([
    tmpltStore.searchMainCvlcptTmpltList(),
    tmpltStore.searchMainSpclTmpltList()
  ]);
  boardSlides.value = [...tmpltCvlcptMain.value];
  boardSlides2.value = [...tmpltSpclMain.value];
});

const cvlcptList = computed(() => {
  return boardSlides.value.map((item, index) => ({
    ...item,
    id: index,
    class: 'slide-item' + index,
    type: item.path,
    title: item.tmpltNm,
    tmpltNo: item.tmpltNo,
    url: '/statuteinfo/template/supremecourt/list'
  }));
});

const spclList = computed(() => {
  return boardSlides2.value.map((item, index) => ({
    ...item,
    id: index,
    class: 'slide-item' + index,
    type: item.path,
    title: item.tmpltNm,
    tmpltNo: item.tmpltNo,
    url: '/statuteinfo/template/korea/list'
  }));
});

const movePage1 = (tmpltNo) => {
  router.push(`/statuteinfo/template/supremecourt/list?tmpltNo=${tmpltNo}`, {
    external: true
  });
};

const movePage2 = (tmpltNo) => {
  router.push(`/statuteinfo/template/korea/list?tmpltNo=${tmpltNo}`, {
    external: true
  });
};
</script>

<template>
  <div class="main-latest-board-box">
    <button type="button" class="btn swiper-button-prev-law">
      <span class="sr-only">이전 법률서식 슬라이드</span>
    </button>

    <Swiper
      @swiper="onSwiper"
      :modules="[Navigation]"
      :loop="true"
      :navigation="{
        nextEl: '.swiper-button-next-law',
        prevEl: '.swiper-button-prev-law'
      }"
      :allow-touch-move="true"
      :space-between="50"
    >
      <SwiperSlide>
        <ul class="slide-board-list">
          <li v-for="slide in cvlcptList.slice(0, sliceNum)" class="item">
            <div class="latest-list-wrap">
              <div class="text-box list-link">
                <button
                  type="button"
                  @click="movePage1(slide.tmpltNo)"
                  class="list-btn"
                >
                  <span class="category-span" v-if="slide.type != null">
                    {{ slide.type }}
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
          <li v-for="slide in spclList.slice(0, sliceNum)" class="item">
            <div class="latest-list-wrap">
              <div class="text-box list-link">
                <button @click="movePage2(slide.tmpltNo)" class="list-btn">
                  <span class="category-span" v-if="slide.type != null">
                    {{ slide.type }}
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
    </Swiper>

    <button type="button" class="btn swiper-button-next-law">
      <span class="sr-only">다음 법률서식 슬라이드</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './scss/lawslide';
</style>
