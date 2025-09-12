<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import 'assets/style/swiper.css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'pub2nd'
});

const swiperRef = ref<SwiperType | null>(null);
const swiperRef2 = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};
const onSwiper2 = (swiper: SwiperType) => {
  swiperRef2.value = swiper;
};

</script>

<template>
  <div class="sub-content-box" id="ai-result-box">
    <!-- Description : ai-left-wrap 기존 그대로 -->
    <div class="right-content-box">
      <section class="section1">
        <div class="container">
          <h3 class="sr-only">검색 결과 컨텐츠 정보</h3>
          <!-- Description : 탭 추가 -->
          <CommonTabs :platform-tab-show="true" className="tabs-type-1">
            <CommonTabItem title="법률지원서비스 찾기">
              <div class="fixed-box mo-only">
                <h3 class="tit">
                  <button
                    type="button"
                    class="chat-open-btn"
                  >
                    대화 기록 열기
                  </button>
                </h3>
              </div>
              <div class="ai-result-wrap page-result-wrap" ref="fixedBoxRef">
                <div class="content-result result1">
                  <div ref="scrollContainer" class="result-content-body">
                    <div
                      class="content-inner-wrap-div"
                      ref="listContainer"
                    >
                      <div class="result-content-header">
                        <div class="user-icon-box">
                          <img
                            src="/assets/image/sub/ai/chatting_profile.svg"
                            alt="질문 유저"
                          />
                        </div>
                        <div class="user-question-box">
                          <p>임시 질문</p>
                        </div>
                      </div>
                      <div class="result-content-inner-body">
                        <div class="result-answer-icon-box">
                          <img
                            src="/assets/image/sub/ai/chatting_ai.svg"
                            alt="답변"
                          />
                        </div>
                        <div class="result-answer-box">
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                        </div>
                      </div>
                      <div class="etc-data-box">
                        <div class="slide-box">
                          <div class="content-header">
                            <div class="title-box">
                              <strong>참고 자료</strong>
                            </div>
                            <div class="prev-next-button-box">
                              <!-- 커스텀 이전 버튼 -->
                              <button class="btn swiper-button-prev">
                                <img
                                  src="/assets/image/sub/ai/slide_left.svg"
                                  alt="추천질문 슬라이드 왼쪽"
                                />
                              </button>
                              <!-- 커스텀 다음 버튼 -->
                              <button class="btn swiper-button-next">
                                <img
                                  src="/assets/image/sub/ai/slide_right.svg"
                                  alt="추천질문 슬라이드 오른쪽"
                                />
                              </button>
                            </div>
                          </div>
                          <div class="content-body">
                            <Swiper
                              @swiper="onSwiper"
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
                                  slidesPerView: 6
                                },
                                0: {
                                  slidesPerView: 2,
                                  spaceBetween: 12
                                }
                              }"
                            >
                              <SwiperSlide class="slide-item1">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item2">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item3">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item4">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item5">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item6">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item7">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>

                        <div class="best-worst-box">
                          <button
                            title="좋아요"
                            class="btn best-button"
                          >
                            <img
                              src="/assets/image/sub/ai/like_bl.svg"
                              alt=""
                            />
                          </button>
                          <button
                            title="싫어요"
                            class="btn worst-button"
                          >
                            <img
                              src="/assets/image/sub/ai/dislike_bl.svg"
                              alt=""
                            />
                          </button>
                          <button
                            title="복사하기"
                            class="btn pasted-button"
                          >
                            <img
                              src="/assets/image/sub/ai/copy_bl.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hit-question-box">
                    <dl>
                      <dt>추천 질문</dt>
                      <dd>
                        <button
                          type="button"
                          title="추천 질문 선택"
                        >
                          <span class="truncate-span">무료 법률상담이 가능한 기관을 알려줘</span>
                        </button>
                      </dd>
                      <dd>
                        <button
                          type="button"
                          title="추천 질문 선택"
                        >
                          <span class="truncate-span">무료 법률상담이 가능한 기관을 알려줘</span>
                        </button>
                      </dd>
                      <dd>
                        <button
                          type="button"
                          title="추천 질문 선택"
                        >
                          <span class="truncate-span">무료 법률상담이 가능한 기관을 알려줘</span>
                        </button>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </CommonTabItem>
            <CommonTabItem title="법령 쉽게 찾기">
              <div class="fixed-box mo-only">
                <h3 class="tit">
                  <button
                    type="button"
                    class="chat-open-btn"
                  >
                    대화 기록 열기
                  </button>
                </h3>
              </div>
              <div class="ai-result-wrap page-result-wrap" ref="fixedBoxRef">
                <div class="content-result result2"><!-- Description : result2 클래스 추가 -->
                  <div ref="scrollContainer" class="result-content-body">
                    <div
                      class="content-inner-wrap-div"
                      ref="listContainer"
                    >
                      <div class="result-content-header">
                        <div class="user-icon-box">
                          <img
                            src="/assets/image/sub/ai/chatting_profile.svg"
                            alt="질문 유저"
                          />
                        </div>
                        <div class="user-question-box">
                          <p>임시 질문2</p>
                        </div>
                      </div>
                      <div class="result-content-inner-body">
                        <div class="result-answer-icon-box">
                          <img
                            src="/assets/image/sub/ai/chatting_ai.svg"
                            alt="답변"
                          />
                        </div>
                        <div class="result-answer-box">
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                          <p>답변 설명</p>
                        </div>
                      </div>
                      <div class="etc-data-box">
                        <div class="slide-box">
                          <div class="content-header">
                            <div class="title-box">
                              <strong>참고 자료</strong>
                            </div>
                            <div class="prev-next-button-box">
                              <!-- 커스텀 이전 버튼 -->
                              <button class="btn swiper-button-prev">
                                <img
                                  src="/assets/image/sub/ai/slide_left.svg"
                                  alt="추천질문 슬라이드 왼쪽"
                                />
                              </button>
                              <!-- 커스텀 다음 버튼 -->
                              <button class="btn swiper-button-next">
                                <img
                                  src="/assets/image/sub/ai/slide_right.svg"
                                  alt="추천질문 슬라이드 오른쪽"
                                />
                              </button>
                            </div>
                          </div>
                          <div class="content-body">
                            <Swiper
                              @swiper="onSwiper2"
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
                                  slidesPerView: 6
                                },
                                0: {
                                  slidesPerView: 2,
                                  spaceBetween: 12
                                }
                              }"
                            >
                              <SwiperSlide class="slide-item1">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="관련자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트  텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item2">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item3">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item4">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item5">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item6">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                              <SwiperSlide class="slide-item7">
                                <button
                                  type="button"
                                  class="btn-slide-ex"
                                >
                                  <CommonBadge tag-badge-text="유사자료" /><!-- Description : 뱃지 추가 -->
                                  <strong class="slide-title">의료사고 안내</strong><!-- Description : 타이틀 추가 -->
                                  <div class="text-strong">
                                    <p>텍스트</p>
                                  </div>
                                </button>
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>

                        <div class="best-worst-box">
                          <button
                            title="좋아요"
                            class="btn best-button"
                          >
                            <img
                              src="/assets/image/sub/ai/like_bl.svg"
                              alt=""
                            />
                          </button>
                          <button
                            title="싫어요"
                            class="btn worst-button"
                          >
                            <img
                              src="/assets/image/sub/ai/dislike_bl.svg"
                              alt=""
                            />
                          </button>
                          <button
                            title="복사하기"
                            class="btn pasted-button"
                          >
                            <img
                              src="/assets/image/sub/ai/copy_bl.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hit-question-box">
                    <dl>
                      <dt>추천 질문</dt>
                      <dd>
                        <button
                          type="button"
                          title="추천 질문 선택"
                        >
                          <span class="truncate-span">무료 법률상담이 가능한 기관을 알려줘</span>
                        </button>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </CommonTabItem>
          </CommonTabs>
          <!-- Description : 검색영역 마크업 위치 변경 -->
          <div class="result-search-wrap new-result-search-wrap">
            <div class="ai-search-box">
              <div class="new-answer-box">
                <button class="btn new-chatting-button">
                  <img
                    src="~/assets/image/sub/ai/new_chat.svg"
                    alt="새대화"
                  />
                </button>
              </div>
              <div class="input-box">
                <label for="aiInput">
                  <span class="sr-only"
                    >궁금하신 사항을 자유롭게 입력해주세요.</span
                  >
                </label>
                <textarea
                  class="form-control ai-search-input"
                  id="aiInput"
                  ref="aiInputs"
                  rows="1"
                  placeholder="궁금하신 사항을 자유롭게 입력해주세요."
                />
                <div class="button-box">
                  <button class="btn mike-button">
                    <span class="sr-only">음성인식</span>
                  </button>
                  <button
                    type="button"
                    class="btn search-button"
                  >
                    <img
                      src="/assets/image/sub/ai/search_send.svg"
                      alt="인공지능 검색하기"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Description : tab-box 검색결과 영역 탭과 동일 선상으로 위치 변경 -->
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
