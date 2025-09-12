<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import '~/assets/style/swiper.css';
import CommonTitle from '~/components/ui/title/title.vue';

definePageMeta({
  layout: 'pub2nd'
});

const swiperRef = ref<SwiperType | null>(null);
const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};
</script>

<template>
  <div class="sub-content-box" id="ai-qustion">
    <section class="section1">
      <div class="container">
        <span class="ai-tag">생성형 법률지원서비스 검색</span
        ><!-- Description : 마크업 추가 -->
        <CommonTitle tag="h2" size="1">
          <picture>
            <source
              media="(max-width: 1199px)"
              srcset="/image/sub/ai/ai_main_title_01_mo.png"
            />
            <!-- Description : 이미지 경로 수정 -->
            <source
              media="(min-width: 1200px)"
              srcset="/image/sub/ai/ai_main_title_01_pc.png"
            />
            <!-- Description : 이미지 경로 수정 -->
            <img
              src="/image/sub/ai/ai_main_title_01_pc.png"
              alt="특화된 AI 기술로 법률구조플랫폼이 더 빠르고 쉽게 찾아드립니다."
            /><!-- Description : 이미지 경로 수정 -->
          </picture>
        </CommonTitle>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="slide-box">
          <div class="content-header">
            <div class="title-box">
              <CommonTitle tag="h3" size="1">대화목록</CommonTitle>
            </div>
            <div class="prev-next-button-box">
              <!-- 커스텀 이전 버튼 -->
              <button class="btn swiper-button-prev">
                <img
                  src="/assets/image/sub/ai/slide_left.svg"
                  alt="이전 추천질문 슬라이드"
                />
              </button>
              <!-- 커스텀 다음 버튼 -->
              <button class="btn swiper-button-next">
                <img
                  src="/assets/image/sub/ai/slide_right.svg"
                  alt="다음 추천질문 슬라이드"
                />
              </button>
            </div>
          </div>
          <div class="content-body">
            <Swiper
              @swiper="onSwiper"
              :slides-per-view="5"
              :loop="false"
              :modules="[Navigation]"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }"
              :allow-touch-move="false"
              :space-between="20"
              :breakpoints="{
                1199: {
                  slidesPerView: 5,
                  direction: 'horizontal',
                  spaceBetween: 20
                },
                0: {
                  slidesPerView: 3,
                  allowTouchMove: true,
                  direction: 'vertical',
                  spaceBetween: 8
                }
              }"
              class="chat-swiper-container"
            >
              <SwiperSlide class="slide-item1">
                <button
                  type="button"
                  title="대화기록 팝업 창 열기"
                  class="btn-ai-slide"
                >
                  <span title="양육비" class="truncate-span">
                    <span>양육비</span>
                  </span>
                </button>
              </SwiperSlide>
              <SwiperSlide class="slide-item2">
                <button
                  type="button"
                  title="추천 질문 선택"
                  class="btn-ai-slide"
                >
                  <span class="question-span">
                    <img src="/assets/image/sub/ai/Q.svg" alt="추천질문" />
                  </span>
                  <span
                    title="<span></span>무료 법률상담이 가능한 기관을 알려줘"
                    class="truncate-span"
                  >
                    <span>무료 법률상담이 가능한 기관을 알려줘</span>
                  </span>
                </button>
              </SwiperSlide>
              <SwiperSlide class="slide-item3">
                <button
                  type="button"
                  title="대화기록 팝업 창 열기"
                  class="btn-ai-slide"
                >
                  <span title="양육비" class="truncate-span">
                    <span>양육비</span>
                  </span>
                </button>
              </SwiperSlide>
              <SwiperSlide class="slide-item4">
                <button
                  type="button"
                  title="대화기록 팝업 창 열기"
                  class="btn-ai-slide"
                >
                  <span title="양육비" class="truncate-span">
                    <span>양육비</span>
                  </span>
                </button>
              </SwiperSlide>
              <SwiperSlide class="slide-item5">
                <button
                  type="button"
                  title="대화기록 팝업 창 열기"
                  class="btn-ai-slide"
                >
                  <span title="양육비" class="truncate-span">
                    <span>양육비</span>
                  </span>
                </button>
              </SwiperSlide>
              <SwiperSlide class="slide-item6">
                <button
                  type="button"
                  title="대화기록 팝업 창 열기"
                  class="btn-ai-slide"
                >
                  <span title="양육비" class="truncate-span">
                    <span>양육비</span>
                  </span>
                </button>
              </SwiperSlide>
            </Swiper>
            <div class="ai-search-box">
              <div class="input-box">
                <label for="aiInput">
                  <span class="sr-only"
                    >궁금하신 사항을 자유롭게 입력해 주세요.</span
                  >
                </label>
                <textarea
                  class="form-control ai-search-input"
                  id="aiInput"
                  ref="aiInputs"
                  placeholder="궁금하신 사항을 자유롭게 입력해 주세요."
                />
                <div class="button-box">
                  <button class="btn mike-button">
                    <span class="sr-only">음성인식</span>
                  </button>
                  <button type="button" class="btn search-button">
                    <img
                      src="~/assets/image/sub/ai/search_send.svg"
                      alt="인공지능 검색"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
