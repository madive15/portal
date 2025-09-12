<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  provide,
  ref
} from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { useModal } from '~/composables/useModal';
import NewModal from '~/components/common/Newmodal.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import 'assets/style/swiper.css';
import { useAiStore } from '~/stores/ai';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import ServiceResult from '~/pages/ai/result/serviceresult.vue';
import ExampleResult from '~/pages/ai/result/exampleresult.vue';
import PublicResult from '~/pages/ai/result/publicresult.vue';
import FormResult from '~/pages/ai/result/formresult.vue';
import { storeToRefs } from 'pinia';
import { useCaseStore } from '~/stores/ai/case';
import { useServiceStore } from '~/stores/ai/service';
import { useTemplateStore } from '~/stores/ai/template';
import { useInstitutionStore } from '~/stores/ai/institution';
import { useLoadingStore } from '~/stores';
import { useLoginStore } from '~/stores/login';
import { marked } from 'marked';
import { useMenuStore } from '~/stores/common/menu';
import CommonTabs from "~/components/ui/tab/tab.vue";
import CommonTabItem from "~/components/ui/tab/tabitem.vue";

const menuStore = useMenuStore();
const { headTitle } = storeToRefs(menuStore);
useHead({
  title: headTitle.value
});

const { showAlert } = useCustomAlert();
const router = useRouter();
const listContainer = ref([]);
const isLoading = ref(true);
const check = ref([]);
const checks = ref([]);
const aiInputs = ref();
const keywords = ['http', 'https'];
const AiStore = useAiStore();
const {
  message,
  llm,
  llmHist,
  autocomplete,
  satisfaction,
  llmHistList,
  autocompleteList,
  candidateList,
  messageList
} = storeToRefs(AiStore);

const caseStore = useCaseStore();
const { caseList, caseListQuery } = storeToRefs(caseStore);

const serviceStore = useServiceStore();
const { serviceList, serviceListQuery } = storeToRefs(serviceStore);

const templateStore = useTemplateStore();
const { templateList, templateListQuery } = storeToRefs(templateStore);

const institutionStore = useInstitutionStore();
const { institutionList, institutionListQuery } = storeToRefs(institutionStore);

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);

// 참고자료
const modal1 = useModal();
// 좋아요
const modal2 = useModal();
// 싫어요
const modal3 = useModal();
//대화기록
const modal4 = useModal();
const scrollContainer = ref<HTMLElement | null>(null);
const modalText = ref({ query: '', answer: '', srcNm: '' });

const serviceCnt = 0;
const caseCnt = 0;
const templateCnt = 0;
const institutionCnt = 0;

function generateCryptoKey() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
const tabKey = ref(generateCryptoKey());

/**
 * Llm 대화 조회
 */
const getLlmStore = async () => {
  await AiStore.getLlmHist();
};

/**
 * Llm 조회 로직
 */
const getAiStore = async () => {
  isLoading.value = true;
  autocomplete.value.query = message.value.query;
  caseStore.resetCaseListQuery();
  serviceStore.resetServiceListQuery();
  templateStore.resetTemplateListQuery();
  institutionStore.resetInstitutionListQuery();
  caseListQuery.value.searchQuery = message.value.query;
  serviceListQuery.value.searchQuery = message.value.query;
  templateListQuery.value.searchQuery = message.value.query;
  institutionListQuery.value.searchQuery = message.value.query;
  await AiStore.getAutocomplete()
    .then(() => {})
    .catch(() => {
      isLoading.value = false;
    });
  await AiStore.getMessage()
    .then(() => {})
    .catch(() => {
      isLoading.value = false;
    });
  await getLlmStore();

  message.value.query = '';
  autocomplete.value.query = '';
  isLoading.value = false;
};

watch(
  () => messageList.value,
  async () => {
    await nextTick();
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  },
  { deep: true }
);
watch(
  () => caseListQuery.value.searchQuery,
  async (newValue) => {
    await caseStore.searchCaseList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => serviceListQuery.value.searchQuery,
  async (newValue) => {
    serviceListQuery.value.size = 4;
    await serviceStore.searchServiceList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => templateListQuery.value.searchQuery,
  async (newValue) => {
    await templateStore.searchTemplateList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => institutionListQuery.value.searchQuery,
  async (newValue) => {
    await institutionStore.searchInstitutionList();
    tabKey.value = generateCryptoKey();
  }
);

/**
 * 화면 전환시 Llm 조회
 */
await onBeforeMount(() => {
  if (!message.value.query) {
    router.push({
      path: '/ai',
      external: true
    });
    return false;
  }
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
  message.value.sessionId = '';
  message.value.mngSn = '';
  messageList.value = [];
  autocomplete.value.query = message.value.query;
  message.value.mbrTypeCd = auth.value.mbrTypeCd;
  getAiStore();
});

// Enter 키 이벤트 처리
const handleEnter = (event) => {
  event.preventDefault();
  handleSearch();
};

/**
 * 검색 버튼 클릭 시 호출되는 함수
 */
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

  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
  getAiStore();
};

const isSearchActive = ref(true);
const openSearch = () => {
  if (!message.value.query) {
    toggleSearch();
  }
};
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
};

const modalOpenModal = async (div, results, index) => {
  console.log('results', results);
  satisfaction.value.inquiryContents = '';
  satisfaction.value.qry = results.query;
  satisfaction.value.repoId = results.repoId;
  satisfaction.value.userId = results.userId;
  satisfaction.value.sessId = results.sessId;
  satisfaction.value.answer = results.answer;
  satisfaction.value.id = results.id;
  satisfaction.value.satisfactionNum = div;
  satisfaction.value.index = index;
  if (div > 1) {
    modal2.openModal();
  } else {
    modal3.openModal();
  }
};

const listCnt = (index: number) => {
  let serviceCnt = serviceList.value.totalElements;
  let caseCnt = caseList.value.totalElements;
  let templateCnt = templateList.value.totalElements;
  let institutionCnt = institutionList.value.totalElements;
  switch (index) {
    case 0:
      return formatComma(serviceCnt);
    case 1:
      return formatComma(institutionCnt);
    case 2:
      return formatComma(caseCnt);
    case 3:
      return formatComma(templateCnt);
  }
};

provide('listCnt', listCnt);

// 더보기 탭 이동
const tabRef = ref();
provide('tabRef', tabRef);

const loadingStore = useLoadingStore();

/**
 * 만족도 저장 로직
 * @param div
 */
const handleSubmit = async (div) => {
  satisfaction.value.inquiryContents += check.value.join() + '\n';
  if (!satisfaction.value.id) {
    satisfaction.value.id = messageList.value.at(satisfaction.value.index).id;
  }
  console.log('auth.value', auth.value);
  if (!satisfaction.value.userId) {
    satisfaction.value.userId = auth.value.memberId;
  }
  AiStore.setSatisfaction(satisfaction.value)
    .then(({ data }) => {
      satisfaction.value.id = data.id;
      messageList.value.at(satisfaction.value.index).id = data.id;
      showAlert({
        icon: 'success',
        text: '답변해주셔서 감사합니다.',
        confirmButtonText: '확인'
      });
      if (div > 1) {
        messageList.value.at(satisfaction.value.index).liked = true;
        messageList.value.at(satisfaction.value.index).disliked = false;
        modal2.closeModal();
      } else {
        messageList.value.at(satisfaction.value.index).liked = false;
        messageList.value.at(satisfaction.value.index).disliked = true;
        modal3.closeModal();
      }
      satisfaction.value.inquiryContents = '';
      check.value = [];
    })
    .catch(() => {
      isLoading.value = false;
    });
};

/**
 * 추천질문 복사
 * @param slide
 */
const setText = (slide) => {
  message.value.query = slide.toString().replaceAll('[기본질의]', '');
  aiInputs.value.focus();
};

/**
 * 새 대화 클릭
 */
const newText = () => {
  message.value.sessionId = '';
  message.value.mngSn = '';
  messageList.value = [];
  caseStore.resetCaseListQuery();
  serviceStore.resetServiceListQuery();
  templateStore.resetTemplateListQuery();
  institutionStore.resetInstitutionListQuery();
};

/**
 * 대화이력 조회
 */
const modal4OpenModal = (index) => {
  llmHist.value = [];
  llmHist.value = llmHistList.value.at(index).aiConfigDtlListResult;
  llm.value.crtDt = llmHistList.value.at(index).crtDt;
  modal4.openModal();
};

/**
 * 대화 기록 삭제
 * @param mngSn
 */
const removeItem = async (mngSn, index) => {
  const result = await showAlert({
    icon: 'warning',
    text: '대화기록을 정말 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  });

  if (result.isConfirmed) {
    llm.value.mngSn = mngSn;
    AiStore.delLlmHist(llm.value)
      .then(async ({}) => {
        await getLlmStore();
        await showAlert({
          icon: 'success',
          text: '대화기록이 삭제되었습니다.',
          confirmButtonText: '확인'
        });
        if (index == '0') {
          newText();
        }
      })
      .catch(() => {});
  }
};

/**
 * 대화 기록 전체 삭제
 * @param mngSn
 */
const removeAllItem = async (mngSn) => {
  const result = await showAlert({
    icon: 'warning',
    text: '전체 대화기록을 정말 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  });

  if (result.isConfirmed) {
    llm.value.mngSn = mngSn;
    AiStore.delAllLlmHist(llm.value)
      .then(async ({}) => {
        await getLlmStore();
        await showAlert({
          icon: 'success',
          text: '전체 대화기록이 삭제되었습니다.',
          confirmButtonText: '확인'
        });
        modal4.closeModal();
        newText();
      })
      .catch(() => {});
  }
};

const swiperRef = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

const selectedSlide = ref<null>(null);

const openSlideModal = (slide) => {
  if (keywords.some((keyword) => slide.srcNm.includes(keyword))) {
    window.open(slide.srcNm, '_blank', 'noopener noreferrer');
  } else {
    modalText.value.answer = '';
    modalText.value.query = '';
    modalText.value.srcNm = '';
    selectedSlide.value = slide;
    modalText.value.answer = slide.answer;
    modalText.value.query = slide.query;
    modalText.value.srcNm = slide.srcNm;
    modal1.openModal();
  }
};

const handleCopy = async (id: string, index: number) => {
  messageList.value = messageList.value.map((messageList) => ({
    ...messageList,
    isCopied: false
  }));
  messageList.value.at(index).isCopied = true;
  const element = document.getElementById(id);
  if (!element) return;

  const textToCopy = element.textContent;
  if (!textToCopy) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showAlert({
        icon: 'success',
        text: '클립보드에 복사되었습니다.',
        confirmButtonText: '확인'
      });
    } catch (err) {
      console.error('Clipboard API error:', err);
    }
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showAlert({
        icon: 'success',
        text: '클립보드에 복사되었습니다.',
        confirmButtonText: '확인'
      });
    } catch (err) {
      console.error('Fallback copy error:', err);
    }
    document.body.removeChild(textarea);
  }
};

// 드롭다운 메뉴 닫기
const allDropDownClose = ref(false);

const dropDownClose = () => {
  allDropDownClose.value = !allDropDownClose.value;
};

provide('allDropDownClose', allDropDownClose);

const onTabChange = (index: number) => {
  dropDownClose();
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

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
  chatHistorySidebar.value = !isMobile.value;
};
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const chatHistorySidebar = ref(true);
const leftSideTitleBox = ref<HTMLElement | null>(null);
const openCloseSidebar = (state: boolean) => {
  if (isMobile.value) {
    chatHistorySidebar.value = state;
  }

  if (state) {
    nextTick(() => {
      leftSideTitleBox.value?.focus();
    });
  }
};

/**
 * 모바일 대화창 보기
 */
const fixedBoxRef = ref<HTMLElement | null>(null);
const isFixedBoxActive = ref(false);

const handleScroll = () => {
  if (fixedBoxRef.value) {
    const offsetTop = fixedBoxRef.value.offsetTop;
    const scrollY = window.scrollY || window.pageYOffset;
    isFixedBoxActive.value = scrollY > offsetTop;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <div class="sub-content-box" id="ai-result-box">
    <!--    기존 작업물-->
    <!--    <div class="left-side-box" v-if="auth.mbrTypeCd != 'P01'">-->
    <!--      <div class="content-header">-->
    <!--        <div class="title-box">-->
    <!--          <h5>대화 기록</h5>-->
    <!--        </div>-->
    <!--        <div class="new-chatting-button-box">-->
    <!--          <button-->
    <!--              type="button"-->
    <!--              class="btn new-chatting-button"-->
    <!--              @click="removeAllItem"-->
    <!--              :disabled="isLoading"-->
    <!--          >-->
    <!--              <span class="icon-span d-none">-->
    <!--                <img-->
    <!--                    src="/assets/image/sub/ai/plus.svg"-->
    <!--                    alt="새 대화"-->
    <!--                />-->
    <!--              </span>-->
    <!--            <span class="title-span"> 전체 삭제 </span>-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="content-body">-->
    <!--        <ul v-if="llmHistList.length > 0">-->
    <!--          <li v-for="(item, index) in llmHistList" :key="index">-->
    <!--            <button-->
    <!--                title="대화기록 팝업 창 열기"-->
    <!--                class="answer-list-txt"-->
    <!--                @click="modal4OpenModal(index)"-->
    <!--            >-->
    <!--              <truncatetext-->
    <!--                  :max-length="11"-->
    <!--                  :text="item.aiConfigDtlListResult[0].qstnCn"-->
    <!--              />-->
    <!--            </button>-->
    <!--            <button-->
    <!--                type="button"-->
    <!--                class="btn chatting-delete-button"-->
    <!--                @click="removeItem(item.mngSn, index)"-->
    <!--                :disabled="isLoading"-->
    <!--            >-->
    <!--              삭제-->
    <!--            </button>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--        <ul v-else>-->
    <!--          <li>대화기록이 없습니다.</li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </div>-->
    <div
      class="ai-left-wrap"
      v-if="chatHistorySidebar && auth.mbrTypeCd != 'P01'"
    >
      <div class="bg-box"></div>
      <div class="left-side-box">
        <div class="content-header">
          <div class="title-box" ref="leftSideTitleBox">
            <strong>대화 기록</strong>
          </div>
          <div class="new-chatting-button-box">
            <button
              type="button"
              class="btn new-chatting-button"
              @click="removeAllItem"
              :disabled="isLoading"
            >
              <span class="icon-span d-none">
                <img src="/assets/image/sub/ai/plus.svg" alt="새 대화" />
              </span>
              <span class="title-span"> 전체 삭제 </span>
            </button>
          </div>
        </div>
        <div class="content-body">
          <ul v-if="llmHistList.length > 0">
            <li v-for="(item, index) in llmHistList" :key="index">
              <button
                type="button"
                title="대화기록 팝업 창 열기"
                class="answer-list-txt"
                @click="modal4OpenModal(index)"
              >
                <truncatetext
                  :max-length="140"
                  :text="item.aiConfigDtlListResult[0].qstnCn"
                />
              </button>
              <button
                type="button"
                class="btn chatting-delete-button"
                @click="removeItem(item.mngSn, index)"
                :disabled="isLoading"
              >
                삭제
              </button>
            </li>
          </ul>
          <ul v-else>
            <li>대화기록이 없습니다.</li>
          </ul>
        </div>
      </div>
      <div class="close-btn-wrap mo-only">
        <button
          type="button"
          @click="openCloseSidebar(false)"
          class="close-btn"
        >
          <span class="sr-only">닫기</span>
        </button>
      </div>
    </div>
    <div class="right-content-box">
      <section class="section1">
        <div class="container">
          <div class="fixed-box mo-only" :class="{ active: isFixedBoxActive }">
            <h3 class="tit">
              <button
                type="button"
                @click="openCloseSidebar(true)"
                class="chat-open-btn"
              >
                대화 기록 열기
              </button>
            </h3>
          </div>
          <div class="modal-wrap-box">
            <!-- modal만 모아놨습니다. -->
            <NewModal
              :is-visible="modal1.isVisible.value"
              :close-modal="modal1.closeModal"
              :header-text="modalText.query"
              :show-close-button="true"
              :show-date-header="true"
              modal-class="al-modal slide-popup-modal"
            >
              <div class="ai-result-box">
                <div class="content-result result1">
                  <div class="result-content-body">
                    <div class="result-answer-box">
                      <p v-html="renderMarkdown(modalText.answer)"></p>
                    </div>
                    <div class="source-box" v-if="modalText.srcNm.length > 0">
                      <label for="sourceInput" class="source-label">출처</label>
                      <a
                        class="text-span"
                        :href="modalText.srcNm"
                        target="_blank"
                        title="새 창 열림"
                        rel="noopener noreferrer"
                      >
                        {{ modalText.srcNm }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </NewModal>

            <NewModal
              :is-visible="modal2.isVisible.value"
              :close-modal="modal2.closeModal"
              :show-close-button="false"
              modal-class="like-popup-modal"
            >
              <div class="like-pop-box">
                <label class="like-label" for="likeArea"
                  >마음에 드신 내용을 입력해주세요</label
                >
                <textarea
                  class="form-control like-area"
                  id="likeArea"
                  placeholder="내용 입력"
                  v-model="satisfaction.inquiryContents"
                />
                <div class="like-submit-box button-modal-box">
                  <button
                    type="button"
                    class="btn cancle-button"
                    @click="modal2.closeModal()"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    class="btn submit-button"
                    @click="handleSubmit(2)"
                  >
                    제출
                  </button>
                </div>
              </div>
            </NewModal>

            <NewModal
              :is-visible="modal3.isVisible.value"
              :close-modal="modal3.closeModal"
              modal-class="dislike-popup-modal like-popup-modal"
            >
              <div class="dislike-pop-box">
                <strong class="like-label"
                  >마음에 들지 않는 내용을 입력해주세요</strong
                >
                <div class="dislike-check-box">
                  <div class="form-check check-1" tabindex="4">
                    <label class="form-check-label" for="check1">
                      사실이 아닌 답변
                    </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="사실이 아닌 답변"
                      id="check1"
                      v-model="check"
                    />
                  </div>
                  <div class="form-check" tabindex="5">
                    <label class="form-check-label" for="check2">
                      도움이 되지 않거나 관련성이 없는 답변
                    </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="도움이 되지 않거나 관련성이 없는 답변"
                      id="check2"
                      v-model="check"
                    />
                  </div>
                </div>
                <label class="like-label" for="dislikeArea" tabindex="6">
                  <span class="sr-only">
                    마음에 들지 않는 내용을 입력해주세요
                  </span>
                </label>
                <textarea
                  tabindex="7"
                  class="form-control like-area"
                  id="dislikeArea"
                  placeholder="내용 입력"
                  v-model="satisfaction.inquiryContents"
                />
                <div class="like-submit-box button-modal-box">
                  <button
                    tabindex="8"
                    type="button"
                    class="btn cancle-button"
                    @click="modal3.closeModal()"
                  >
                    취소
                  </button>
                  <button
                    tabindex="9"
                    type="button"
                    class="btn submit-button"
                    @click="handleSubmit(1)"
                  >
                    제출
                  </button>
                </div>
              </div>
            </NewModal>
            <NewModal
              :is-visible="modal4.isVisible.value"
              :close-modal="modal4.closeModal"
              header-text="대화기록"
              :show-close-button="true"
              :show-date-header="true"
              modal-class="ai-modal chatting-list-modal"
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
          </div>

          <div v-if="messageList.length == 0 && isLoading" class="ai-wrap">
            <div class="result-content-header">
              <div class="user-icon-box">
                <img
                  src="/assets/image/sub/ai/chatting_profile.svg"
                  alt="질문 유저"
                />
              </div>
              <div class="user-question-box">
                <p>{{ message.query }}</p>
              </div>
            </div>
            <div class="result-content-body loding-body">
              <div class="placeholder-box placeholder-glow d-none">
                <ul>
                  <li class="placeholder loading-placeholder-li"></li>
                  <li class="placeholder loading-placeholder-back-li"></li>
                  <li class="placeholder loading-placeholder-li"></li>
                  <li class="placeholder loading-placeholder-li"></li>
                  <li class="placeholder loading-placeholder-back-li"></li>
                  <li class="placeholder loading-placeholder-li"></li>
                  <li class="placeholder loading-placeholder-li"></li>
                  <li class="placeholder loading-placeholder-back-li"></li>
                  <li class="placeholder loading-placeholder-li"></li>
                </ul>
              </div>
              <div class="loding-box">
                <div class="loding-ai-box">
                  <p>법률구조 서비스 플랫폼 AI 가 답변 준비중 입니다….</p>
                </div>
              </div>
            </div>
            <div class="request-question-box loading-request-box">
              <strong>추천 질문</strong>
              <ul class="d-none">
                <li class="placeholder loading-placeholder-li"></li>
                <li class="placeholder loading-placeholder-back-li"></li>
              </ul>
            </div>
          </div>
          <div v-else class="ai-result-wrap page-result-wrap" ref="fixedBoxRef">
            <div class="content-result result1">
              <div ref="scrollContainer" class="result-content-body">
                <div
                  class="content-inner-wrap-div"
                  v-for="(results, index) in messageList"
                  :key="`${index}`"
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
                      <p>{{ results.query }}</p>
                    </div>
                  </div>
                  <div class="result-content-inner-body">
                    <div class="result-answer-icon-box">
                      <img
                        src="/assets/image/sub/ai/chatting_ai.svg"
                        alt="답변"
                      />
                    </div>
                    <div
                      class="result-answer-box"
                      :id="`copy-text-${index}`"
                      v-html="renderMarkdown(results.answer)"
                    ></div>
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
                          <SwiperSlide
                            v-for="(extraAnse, index) in results.candidateList"
                            :key="index"
                            :class="`slide-item${index + 1}`"
                          >
                            <button
                              type="button"
                              :title="
                                keywords.some((keyword) =>
                                  extraAnse.srcNm.includes(keyword)
                                )
                                  ? '새 창 열림'
                                  : ''
                              "
                              class="btn-slide-ex"
                              @click="openSlideModal(extraAnse)"
                            >
                              <div class="text-strong">
                                <p
                                  v-html="
                                    extraAnse.query.replaceAll('_', '<br>')
                                  "
                                />
                              </div>
                              <!--                              <p v-html="extraAnse.answer.slice(0,30)"></p>-->
                            </button>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>

                    <div class="best-worst-box">
                      <button
                        title="좋아요"
                        class="btn best-button"
                        :class="{ 'active-button': results.liked }"
                        @click="modalOpenModal(2, results, index)"
                      >
                        <img
                          v-if="!results.liked"
                          src="/assets/image/sub/ai/like_bl.svg"
                          alt=""
                        />
                        <img
                          v-else
                          src="/assets/image/sub/ai/like_wh.svg"
                          alt=""
                        />
                      </button>
                      <button
                        title="싫어요"
                        class="btn worst-button"
                        :class="{ 'active-button': results.disliked }"
                        @click="modalOpenModal(1, results, index)"
                      >
                        <img
                          v-if="!results.disliked"
                          src="/assets/image/sub/ai/dislike_bl.svg"
                          alt=""
                        />
                        <img
                          v-else
                          src="/assets/image/sub/ai/dislike_wh.svg"
                          alt=""
                        />
                      </button>
                      <button
                        title="복사하기"
                        class="btn pasted-button"
                        :class="{ 'active-button': results.isCopied }"
                        @click="handleCopy(`copy-text-${index}`, index)"
                      >
                        <img
                          v-if="!results.isCopied"
                          src="/assets/image/sub/ai/copy_bl.svg"
                          alt=""
                        />
                        <img
                          v-else
                          src="/assets/image/sub/ai/copy_wh.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="new-loading"
                  v-if="messageList.length !== 0 && isLoading"
                >
                  <div class="ai-wrap2">
                    <div class="placeholder-box placeholder-glow d-none">
                      <ul>
                        <li class="placeholder loading-placeholder-li"></li>
                        <li
                          class="placeholder loading-placeholder-back-li"
                        ></li>
                        <li class="placeholder loading-placeholder-li"></li>
                        <li class="placeholder loading-placeholder-li"></li>
                        <li
                          class="placeholder loading-placeholder-back-li"
                        ></li>
                        <li class="placeholder loading-placeholder-li"></li>
                        <li class="placeholder loading-placeholder-li"></li>
                        <li
                          class="placeholder loading-placeholder-back-li"
                        ></li>
                        <li class="placeholder loading-placeholder-li"></li>
                      </ul>
                    </div>
                  </div>
                  <div class="loding-box">
                    <div class="loding-ai-box">
                      <p>법률구조 서비스 플랫폼 AI 가 답변 준비중 입니다….</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hit-question-box">
                <dl>
                  <dt>추천 질문</dt>
                  <dd
                    v-for="(recommend, index) in autocompleteList.slice(0, 3)"
                    :key="`${index}`"
                  >
                    <button
                      type="button"
                      title="추천 질문 선택"
                      @click="setText(recommend)"
                    >
                      <truncatetext
                        :max-length="60"
                        :text="
                          recommend.toString().replaceAll('[기본질의]', '')
                        "
                      />
                      <span class="icon-span d-none">
                        <img src="/assets/image/sub/ai/plus.svg" alt="" />
                      </span>
                    </button>
                  </dd>
                </dl>
              </div>
            </div>
            <div
              class="result-search-wrap new-result-search-wrap"
              v-if="!isLoading"
            >
              <div :class="['ai-search-box', { active: isSearchActive }]">
                <div class="new-answer-box">
                  <button class="btn new-chatting-button" @click="newText">
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
                    v-model="message.query"
                    @keyup.enter="handleSearch"
                    @keydown.enter="handleEnter"
                  />
                  <div class="button-box">
                    <!-- 2차때 쓰이는 거라 css에서 display:none 해놨습니다. -->
                    <button class="btn mike-button">
                      <img
                        src="/assets/image/sub/ai/search_voice.svg"
                        alt="음성인식"
                      />
                    </button>
                    <button
                      type="button"
                      class="btn search-button"
                      @click="!message.query ? openSearch() : handleSearch()"
                    >
                      <img
                        src="/assets/image/sub/ai/search.svg"
                        alt="검색창 열기"
                        v-if="!message.query"
                      />
                      <img
                        src="/assets/image/sub/ai/search_send.svg"
                        alt="인공지능 검색하기"
                        v-else
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-box">
            <h4>검색결과</h4>
            <CommonTabs :platform-tab-show="true" ref="tabRef" :key="tabKey" @click="onTabChange">
              <CommonTabItem :title="`서비스(${listCnt(0)})`">
                <ServiceResult />
              </CommonTabItem>
              <CommonTabItem :title="`기관(${listCnt(1)})`">
                <PublicResult />
              </CommonTabItem>
              <CommonTabItem :title="`사례(${listCnt(2)})`">
                <ExampleResult />
              </CommonTabItem>
              <CommonTabItem :title="`서식(${listCnt(3)})`">
                <FormResult />
              </CommonTabItem>
            </CommonTabs>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/ai/result/index.scss';
</style>
