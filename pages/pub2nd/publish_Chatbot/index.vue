<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import '~/assets/style/swiper.css';

definePageMeta({
  layout: 'pub2nd'
});

// Swiper 이벤트
const swiperRef = ref<SwiperType | null>(null);
const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

// 검색영역 메뉴 더보기 이벤트
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
};
const closeMenu = () => {
  isMenuOpen.value = false
};

const inputTextData = ref('');
</script>

<template>
  <div class="sub-content-box">
    <!-- Chat Bot 마크업 -->
    <div class="chat-bot">
      <header class="chat-header">
        <h1 class="logo">
          <span class="sr-only">맞춤형 법률복지 법률구조 플랫폼</span>
        </h1>
      </header>
      <section class="chat-body">
        <div class="chat-info-wrap">
          <span class="ico-chat"></span>
          <h2 class="chat-tit">
            <strong>법률구조서비스 챗봇</strong>입니다.<br />
            원하시는 항목을 선택해주세요.
          </h2>
          <p class="chat-info-description">로그인하면 생성형 AI가 더 자세하게 상담해드릴 수 있어요.</p>
          <div class="chat-info-slide-box">
            <Swiper
              @swiper="onSwiper"
              class="chat-swiper"
              :modules="[Navigation]"
              :loop="false"
              :allow-touch-move="true"
              :space-between="10"
              :breakpoints="{
                768: {
                  slidesPerView: '2.7'
                },
                0: {
                  slidesPerView: '1.3'
                }
              }"
            >
              <SwiperSlide class="slide-item">
                <div class="chat-info-cont">
                  <div class="tit-box type1">
                    <h3 class="tit">
                      <span>기관 안내</span>
                      <span>한눈에 확인!</span>
                    </h3>
                  </div>
                  <ul class="btn-list">
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">기관 안내</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide class="slide-item">
                <div class="chat-info-cont">
                  <div class="tit-box type2">
                    <h3 class="tit">
                      <span>서비스 안내</span>
                      <span>한눈에 확인!</span>
                    </h3>
                  </div>
                  <ul class="btn-list">
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">서비스 내용</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">서비스 대상자</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide class="slide-item">
                <div class="chat-info-cont">
                  <div class="tit-box type3">
                    <h3 class="tit">
                      <span>매칭서비스</span>
                      <span>한눈에 확인!</span>
                    </h3>
                  </div>
                  <ul class="btn-list">
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">매칭 서비스</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide class="slide-item">
                <div class="chat-info-cont">
                  <div class="tit-box type4">
                    <h3 class="tit">
                      <span>법률정보</span>
                      <span>한눈에 확인!</span>
                    </h3>
                  </div>
                  <ul class="btn-list">
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">법률 정보</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide class="slide-item">
                <div class="chat-info-cont">
                  <div class="tit-box type5">
                    <h3 class="tit">
                      <span>법률정보</span>
                      <span>한눈에 확인!</span>
                    </h3>
                  </div>
                  <ul class="btn-list">
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">플랫폼 안내</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="chat-info-btn">
                        <span class="txt">기관 안내</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="message-box">
          <div class="question">
            <div class="qna-box">
              <div class="inner-cont-box">
                <p>기관 안내</p>
              </div>
              <span class="time-info">09:36</span>
            </div>
          </div>
          <div class="answer">
            <span class="ico-chat"></span>
            <div class="qna-box">
              <div class="inner-cont-box">
                <p>기관 안내 기관 안내 관 안내 기관 안내 관 안내 기관 안내 관 안내 기관 안내</p>
              </div>
              <span class="time-info">09:36</span>
            </div>
          </div>
          <div class="question">
            <div class="qna-box">
              <div class="inner-cont-box">
                <p>기관 안내 기관 안내</p>
              </div>
              <span class="time-info">09:36</span>
            </div>
          </div>
          <div class="answer">
            <span class="ico-chat"></span>
            <div class="qna-box">
              <div class="inner-cont-box">
                <strong>대한법률구조공단</strong>
                <p>대한법률구조공단은 법률지식이 부족하면서도 경제적으로 어려워 법의 보호를 충분히 받지 못하는 사람들에게 법률상담, 변호사에 의한 소송대리 및 형사변호 등의 법률적 지원을 하기 위하여 설립된 공공기관입니다.<br/><br/>▶주소 : (39660)경상북도 김천시 혁시2로 26 대한법률구조공단<br />▶대표전화 : 054-810-0132</p>
                <ul class="qna-link-list">
                  <li>
                    <NuxtLink to="#" class="chat-qna-link">
                      <span class="txt">기관 정보 자세히 보기</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="#" class="chat-qna-link">
                      <span class="txt">지원 서비스 보기</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <span class="time-info">09:36</span>
              <div class="btn-box">
                <button type="button" class="btn-next">
                  <span class="txt">다음</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="chat-footer">
        <div class="chat-search-wrap">
          <div class="chat-menu-box">
            <button
              type="button"
              :class="['btn-menu-more', { 'is-active': isMenuOpen }]"
              :ariaExpanded="isMenuOpen.toString()"
              @click="toggleMenu"
            >
              <span class="sr-only">메뉴 더보기</span>
              <span class="bar-box">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </span>
            </button>
            <div class="chat-menu-list" v-show="isMenuOpen">
              <ul>
                <li>
                  <button type="button" class="sub-menu-btn">
                    <span class="txt">플랫폼 안내</span>
                  </button>
                </li>
                <li>
                  <button type="button" class="sub-menu-btn">
                    <span class="txt">기관 안내</span>
                  </button>
                </li>
                <li>
                  <button type="button" class="sub-menu-btn">
                    <span class="txt">서비스 안내</span>
                  </button>
                </li>
                <li>
                  <button type="button" class="sub-menu-btn">
                    <span class="txt">생성형AI 상담</span>
                  </button>
                </li>
              </ul>
              <button
                type="button"
                class="chat-menu-close"
                @click="closeMenu"
              >
                <span class="sr-only">닫기</span>
              </button>
            </div>
          </div>
          <form class="chat-input-box">
            <label for="ipText">
              <span class="sr-only">질문하실 내용을 입력해 주세요.</span>
            </label>
            <a-input
              id="ipText"
              class="text-bx"
              placeholder="질문하실 내용을 입력해 주세요."
              v-model:value="inputTextData"
            />
            <div class="btn-box">
              <button type="button" class="chat-mike-btn">
                <span class="sr-only">음성검색</span>
              </button>
              <button type="button" class="chat-search-btn">
                <span class="sr-only">검색</span>
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
    <!-- //Chat Bot 마크업 -->
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
