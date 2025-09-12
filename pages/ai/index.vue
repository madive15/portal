<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import '~/assets/style/swiper.css';
import Truncatetext from '~/components/common/truncatetext.vue';
import { ref, onMounted } from 'vue';
import { useAiStore } from '~/stores/ai';
import NewModal from '~/components/common/Newmodal.vue';
import { useModal } from '~/composables/useModal';
import LayerPopup from '~/components/common/layerPopup.vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { marked } from 'marked';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useMenuStore } from '~/stores/common/menu';
import CommonTitle from '~/components/ui/title/title.vue';
const menuStore = useMenuStore();
const { headTitle } = storeToRefs(menuStore);
useHead({
  title: headTitle.value
});
const { showAlert } = useCustomAlert();

const router = useRouter();
const swiperRef = ref<SwiperType | null>(null);
const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};
const aiInputs = ref();

const AiStore = useAiStore();
const {
  message,
  llm,
  autocomplete,
  llmHistList,
  autocompleteList,
  resetAutocomplete
} = storeToRefs(AiStore);

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);

onMounted(() => {
  AiStore.resetAutocomplete();
  if (auth.value.mbrTypeCd == 'P01') {
    AiStore.getAutocomplete();
  }
  AiStore.getLlmHist();
  console.log('llmHistList', llmHistList);
  if (llmHistList.length < 1 || llmHistList) {
    AiStore.getAutocomplete();
  }
});

const llmHist = ref([]);
//대화기록
const modal = useModal();

// Enter 키 이벤트 처리
const handleEnter = (event) => {
  event.preventDefault();
  handleSearch();
};

// 검색 버튼 클릭 시 호출되는 함수
const handleSearch = () => {
  if (!message.value.query) {
    return;
  }

  if (message.value.query.trim().length > 1000) {
    showAlert({
      icon: 'info',
      html: '입력 글자는 1000자를 넘을 수 없습니다. <br /> 1000자 이내로 수정하여 다시 입력해주세요.'
    });

    return;
  }

  message.value.query = message.value.query
    .toString()
    .replaceAll('[기본질의]', '')
    .replaceAll('\n', '');
  router.push({
    path: '/ai/result',
    external: true
  });
};

const setText = (slide) => {
  message.value.query = slide.toString().replaceAll('[기본질의]', '');
  aiInputs.value.focus();
};

/**
 * 대화이력 조회
 */

const modalOpenModal = (index) => {
  llmHist.value = [];
  llm.value.crtDt = llmHistList.value.at(index).crtDt;
  llmHist.value.push(...llmHistList.value.at(index).aiConfigDtlListResult);
  modal.openModal();
};

const autoLink = (text) => {
  return text.replace(/<a href="(https?:\/\/[^\s]+|www\.[^\s]+)"/g, (match) => {
    if (!match.includes('target="_blank"')) {
      return match.replace(
        '<a',
        '<a target="_blank" title="새 창 열림" rel="noopener noreferrer"'
      );
    }
  });
};

marked.setOptions({
  breaks: true,
  gfm: true
});
//마크다운
const renderMarkdown = (markdown: string) => {
  const replaceMarkdown = markdown
    .replace(/~/g, ' ~ ')
    .replace(/\s{2, }/g, ' ');
  const makdowns = marked(replaceMarkdown);
  return autoLink(makdowns);
};
</script>

<template>
  <layerPopup v-if="auth.mbrTypeCd == 'P01'" />
  <layerPopup />
  <div id="common-content">
    <div class="sub-content-box" id="ai-qustion">
      <section class="section1">
        <div class="container">
          <!--          <h2>-->
          <!--            특화된-->
          <!--            <span class="img-span">-->
          <!--              <img-->
          <!--                src="~/assets/image/main/ai_img2.png"-->
          <!--                alt="ai 타이틀"-->
          <!--              />-->
          <!--            </span>-->
          <!--            기술로 법률구조 플랫폼이<br />-->
          <!--            더 <span class="bold-disc-span">빠</span>-->
          <!--            <span class="bold-disc-span">르</span>-->
          <!--            <span class="bold-disc-span">고</span>-->
          <!--            <span class="bold-disc-span ms-2">쉽</span>-->
          <!--            <span class="bold-disc-span">게</span>-->
          <!--            찾아드립니다.-->
          <!--          </h2>-->
          <CommonTitle tag="h2" size="1">
            <picture>
              <source
                media="(max-width: 1199px)"
                srcset="~/assets/image/main/ai_main_title_mo.png"
              />
              <source
                media="(min-width: 1200px)"
                srcset="~/assets/image/main/ai_main_title_pc.png"
              />
              <img
                src="~/assets/image/main/ai_main_title_pc.png"
                alt="특화된 AI 기술로 법률구조플랫폼이 더 빠르고 쉽게 찾아드립니다."
              />
            </picture>
          </CommonTitle>
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="slide-box">
            <div class="content-header">
              <div class="title-box">
                <CommonTitle tag="h3" size="1">{{
                  llmHistList.length > 0 ? '대화목록' : '추천 질문'
                }}</CommonTitle>
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
                <SwiperSlide
                  v-for="(llm, index) in llmHistList"
                  :key="index"
                  :class="`slide-item${index + 1}`"
                  v-if="llmHistList.length > 0"
                >
                  <!--                  <div class="text-box">-->
                  <!--                    <p>-->
                  <!--                      <truncatetext-->
                  <!--                        :max-length="85"-->
                  <!--                        :text="llm.aiConfigDtlListResult[0].qstnCn"-->
                  <!--                      />-->
                  <!--                    </p>-->
                  <!--                  </div>-->
                  <button
                    type="button"
                    title="대화기록 팝업 창 열기"
                    class="btn-ai-slide"
                    @click="modalOpenModal(index)"
                  >
                    <truncatetext
                      :max-length="85"
                      :text="llm.aiConfigDtlListResult[0].qstnCn"
                    />
                  </button>
                </SwiperSlide>
                <SwiperSlide
                  v-for="(auto, index) in autocompleteList"
                  :key="index + 1"
                  :class="`slide-item${index + 1}`"
                  @click="setText(auto)"
                  v-else
                >
                  <button
                    type="button"
                    title="추천 질문 선택"
                    class="btn-ai-slide"
                    @click="modalOpenModal(index)"
                  >
                    <span class="question-span">
                      <img src="/assets/image/sub/ai/Q.svg" alt="추천질문" />
                    </span>
                    <truncatetext
                      :max-length="85"
                      :text="auto.toString().replaceAll('[기본질의]', '')"
                    />
                  </button>
                </SwiperSlide>
              </Swiper>
              <NewModal
                ref="modalRef"
                :is-visible="modal.isVisible.value"
                :close-modal="modal.closeModal"
                header-text="대화기록"
                modal-class="ai-modal"
                :show-close-button="true"
                :show-date-header="true"
                :date-text="llm.crtDt"
              >
                <div class="ai-result-box">
                  <div
                    class="content-result result1"
                    v-for="(chattingList, index) in llmHist"
                    :key="`${index}`"
                  >
                    <div class="result-content-header">
                      <div class="user-icon-box">
                        <img
                          src="/assets/image/sub/ai/chatting_profile.svg"
                          alt="질문 유저"
                        />
                      </div>
                      <div class="user-question-box">
                        <p>{{ chattingList.qstnCn }}</p>
                      </div>
                    </div>
                    <div class="result-content-body">
                      <div class="result-answer-icon-box">
                        <img
                          src="/assets/image/sub/ai/chatting_ai.svg"
                          alt="답변"
                        />
                      </div>
                      <div class="result-answer-box">
                        <p v-html="renderMarkdown(chattingList.ansCn)"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </NewModal>
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
                    v-model="message.query"
                    @keyup.enter="handleSearch"
                    @keydown.enter="handleEnter"
                  />
                  <div class="button-box">
                    <!-- 2차때 쓰이는 거라 css에서 display:none 해놨습니다. -->
                    <button type="button" class="btn mike-button">
                      <img
                        src="~/assets/image/sub/ai/search_voice.svg"
                        alt="음성인식"
                      />
                    </button>
                    <button
                      type="button"
                      class="btn search-button"
                      @click="handleSearch"
                      :disabled="!message.query"
                    >
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
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/ai/index.scss';
</style>
