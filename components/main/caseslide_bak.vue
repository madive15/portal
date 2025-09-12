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
    <div class="prev-next-button-box">
      <!-- 커스텀 이전 버튼 -->
      <button type="button" class="btn swiper-button-prev-case">
        <span class="sr-only">이전</span>
      </button>
      <!-- 커스텀 다음 버튼 -->
      <button type="button" class="btn swiper-button-next-case">
        <span class="sr-only">다음</span>
      </button>
    </div>
    <Swiper
      @swiper="onSwiper"
      :modules="[Navigation]"
      :loop="true"
      :navigation="{
        nextEl: '.swiper-button-next-case',
        prevEl: '.swiper-button-prev-case'
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
            v-for="slide in dscsnList.slice(0, 4)"
            :key="slide.id"
            :class="slide.class"
            class="case-slide"
          >
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
          </SwiperSlide>
          <!--          기존 구조 -->
          <!--          <SwiperSlide-->
          <!--              v-for="slide in dscsnList.slice(0, 4)"-->
          <!--              :key="slide.id"-->
          <!--              :class="slide.class"-->
          <!--          >-->
          <!--            <div class="latest-list-wrap">-->
          <!--              <div class="text-box">-->
          <!--                <span class="category-span" v-if="slide.type != null">-->
          <!--                  {{ slide.type }}-->
          <!--                </span>-->
          <!--                <span v-if="slide.type == null" style="padding: 5px;font-size: 13px;border-radius: 5px;">-->
          <!--                </span>-->
          <!--                <NuxtLink @click="movePage1(slide)" style="cursor: pointer">-->
          <!--                  <truncatetext :max-length="30" :text="slide.title" />-->
          <!--                </NuxtLink>-->
          <!--              </div>-->
          <!--              <div class="latest-button-box">-->
          <!--                <button class="btn more-button" >-->
          <!--                  <NuxtLink @click="movePage1(slide)">-->
          <!--                    <img-->
          <!--                        src="/assets/image/main/go_wh.svg"-->
          <!--                        alt="최근게시물 바로가기"-->
          <!--                    />-->
          <!--                  </NuxtLink>-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </SwiperSlide>-->
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
            v-for="slide in rlfList.slice(0, 4)"
            :key="slide.id"
            :class="slide.class"
            class="case-slide"
          >
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
          </SwiperSlide>
          <!--          기존 구조 -->
          <!--          <SwiperSlide-->
          <!--              v-for="slide in rlfList.slice(0, 4)"-->
          <!--              :key="slide.id"-->
          <!--              :class="slide.class"-->
          <!--          >-->
          <!--            <div class="latest-list-wrap">-->
          <!--              <div class="text-box">-->
          <!--                <span class="category-span" v-if="slide.type != null">-->
          <!--                  {{ slide.type }}-->
          <!--                </span>-->
          <!--                <span v-if="slide.type == null" style="padding: 5px;font-size: 13px;border-radius: 5px;">-->
          <!--                </span>-->
          <!--                <NuxtLink @click="movePage2(slide)" style="cursor: pointer">-->
          <!--                  <truncatetext :max-length="30" :text="slide.caseTtl" />-->
          <!--                </NuxtLink>-->
          <!--              </div>-->
          <!--              <div class="latest-button-box">-->
          <!--                <button class="btn more-button" >-->
          <!--                  <NuxtLink @click="movePage2(slide)">-->
          <!--                    <img-->
          <!--                        src="/assets/image/main/go_wh.svg"-->
          <!--                        alt="최근게시물 바로가기"-->
          <!--                    />-->
          <!--                  </NuxtLink>-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </SwiperSlide>-->
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
    .truncate-span {
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

  .latest-button-box {
    .more-button {
      width: 35px;
      height: 35px;
      background-color: #355797;
      text-align: center;
      align-content: center;
      border-radius: 50%;
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

.swiper-wrapper {
  .case-slide:not(:first-of-type) {
    border-top: 1px solid #e1e3e1;
  }
}
.main-latest-board-box {
  //.swiper-slide:not(:first-child) {
  //  border-top: 1px solid #e1e3e1;
  //}

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
    &.swiper-button-prev-case {
      left: -18px;
      &::after {
        background-image: url('/assets/image/main/map_left.svg');
      }
    }

    &.swiper-button-next-case {
      right: -18px;
      &::after {
        background-image: url('/assets/image/main/map_right.svg');
      }
    }
  }
}

@media (max-width: 1199px) {
  .swiper-button-next-case {
    right: -8px !important;
    z-index: 1;
  }
  .swiper-button-prev-case {
    left: -12px !important;
    z-index: 1;
  }

  .main-latest-board-box {
    .latest-list-wrap {
      .latest-button-box .btn.more-button {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .latest-button-box img {
        width: 8px;
        margin-left: 2px;
      }
      .text-box {
        padding: 10px 0 10px 10px;
      }
      .truncate-span {
        font-size: 14px;
      }
      .text-box .category-span {
        font-size: 12px;
      }
    }
  }

  .main-latest-board-box {
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
