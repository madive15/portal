<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import '~/assets/style/swiper.css';
import { ref } from 'vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import { useTmpltStore } from '~/stores/tmplt';
import { storeToRefs } from 'pinia';

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
    <div class="prev-next-button-box">
      <!-- 커스텀 이전 버튼 -->
      <button type="button" class="btn swiper-button-prev-law">
        <span class="sr-only">이전</span>
      </button>
      <!-- 커스텀 다음 버튼 -->
      <button type="button" class="btn swiper-button-next-law">
        <span class="sr-only">다음</span>
      </button>
    </div>
    <Swiper
      @swiper="onSwiper"
      :modules="[Navigation]"
      :loop="true"
      :navigation="{
        nextEl: '.swiper-button-next-law',
        prevEl: '.swiper-button-prev-law'
      }"
      :allow-touch-move="false"
      :space-between="50"
    >
      <SwiperSlide>
        <Swiper
          @swiper="onSwiper"
          :space-between="20"
          :slides-per-view="3"
          :direction="'vertical'"
          class="vertical-swiper"
        >
          <SwiperSlide
            v-for="slide in cvlcptList.slice(0, 4)"
            :key="slide.id"
            :class="slide.class"
            class="law-slide"
          >
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
            <!--            기존 소스-->
            <!--            <div class="latest-list-wrap">-->
            <!--              <div class="text-box">-->
            <!--                <span class="category-span" v-if="slide.type != null">-->
            <!--                  {{ slide.type }}-->
            <!--                </span>-->
            <!--                <NuxtLink @click="movePage1(slide.tmpltNo)" style="cursor: pointer">-->
            <!--                  <truncatetext :max-length="30" :text="slide.title" />-->
            <!--                </NuxtLink>-->
            <!--              </div>-->
            <!--              <div class="latest-button-box">-->
            <!--                <button class="btn more-button">-->
            <!--                  <NuxtLink @click="movePage1(slide.tmpltNo)" >-->
            <!--                    <img-->
            <!--                        src="/assets/image/main/go_wh.svg"-->
            <!--                        alt="최근게시물 바로가기"-->
            <!--                    />-->
            <!--                  </NuxtLink>-->
            <!--                </button>-->
            <!--              </div>-->
            <!--            </div>-->
          </SwiperSlide>
        </Swiper>
      </SwiperSlide>

      <SwiperSlide>
        <Swiper
          @swiper="onSwiper"
          :space-between="20"
          :slides-per-view="3"
          :direction="'vertical'"
          class="vertical-swiper"
        >
          <SwiperSlide
            v-for="slide in spclList.slice(0, 4)"
            :key="slide.id"
            :class="slide.class"
            class="law-slide"
          >
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
            <!--            기존 소스 -->
            <!--            <div class="latest-list-wrap">-->
            <!--              <div class="text-box">-->
            <!--                <span class="category-span" v-if="slide.type != null">-->
            <!--                  {{ slide.type }}-->
            <!--                </span>-->
            <!--                <NuxtLink @click="movePage2(slide.tmpltNo)" style="cursor: pointer">-->
            <!--                  <truncatetext :max-length="30" :text="slide.title" />-->
            <!--                </NuxtLink>-->
            <!--              </div>-->
            <!--              <div class="latest-button-box">-->
            <!--                <button class="btn more-button">-->
            <!--                  <NuxtLink  @click="movePage2(slide.tmpltNo)">-->
            <!--                    <img-->
            <!--                        src="/assets/image/main/go_wh.svg"-->
            <!--                        alt="최근게시물 바로가기"-->
            <!--                    />-->
            <!--                  </NuxtLink>-->
            <!--                </button>-->
            <!--              </div>-->
            <!--            </div>-->
          </SwiperSlide>
        </Swiper>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.main-latest-board-box {
  max-height: 336px;
  height: 100%;

  .latest-list-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.5px;
      color: #373f57;
    }
    .text-box {
      display: flex;
      flex-direction: column;
      row-gap: 7px;
      padding: 12px 0;

      .category-span {
        padding: 5px;
        font-size: 13px;
        border-radius: 5px;
        width: fit-content;
        color: #373f57;
      }
    }

    &:first-child {
      .text-box {
        .category-span {
          background-color: #e8f7fe;
        }
      }
    }
  }
}

.text-box {
  position: relative;
  width: 100%;
}
.list-link {
  width: 100%;
  cursor: pointer;
  padding: 12px 8px 12px 2px !important;
  .list-btn {
    display: flex;
    flex-direction: column;
    row-gap: 7px;
    padding-right: 46px !important;

    .text {
      display: inline-flex;
    }
  }
  &::after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 35px;
    height: 35px;
    background-color: #355797;
    border-radius: 50%;
    background-image: url('/assets/image/main/go_wh.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
}

.swiper-slide {
  .law-slide:not(:first-of-type) {
    border-top: 1px solid #e1e3e1;
  }
}

.main-latest-board-box {
  /*swiper-slide:not(:first-child) {border-top: 1px solid #e1e3e1;}*/
  .latest-list-wrap {
    &:first-of-type {
      .text-box .category-span {
        background-color: #e8f7fe;
      }
    }
    &:nth-child(2) {
      .text-box .category-span {
        background-color: #fef6e8;
      }
    }
    &:last-child {
      .text-box .category-span {
        background-color: #e8fef3;
      }
    }
  }
}

.prev-next-button-box {
  .btn {
    width: 40px;
    height: 40px;
    background-color: white !important;
    border-radius: 50%;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    border: 1px solid #ccc !important;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    &.swiper-button-prev-law {
      left: -18px;
      &::after {
        background-image: url('/assets/image/main/map_left.svg');
      }
    }

    &.swiper-button-next-law {
      right: -18px;
      &::after {
        background-image: url('/assets/image/main/map_right.svg');
      }
    }
  }
}

@media (max-width: 1199px) {
  .swiper-button-next-law {
    right: -8px !important;
    z-index: 1;
  }

  .swiper-button-prev-law {
    left: -12px !important;
    z-index: 1;
  }
  .main-latest-board-box {
    .latest-list-wrap {
      .latest-button-box {
        .btn.more-button {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }

        img {
          width: 8px;
          margin-left: 2px;
        }
      }

      .text-box {
        padding: 10px 0 10px 10px;

        span.truncate-span {
          font-size: 14px;
        }

        span.category-span {
          font-size: 12px;
        }
      }
    }

    .vertical-swiper {
      .swiper-slide {
        margin-bottom: 10px !important;

        &:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
  }
}
</style>
