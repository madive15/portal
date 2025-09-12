<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, toRefs } from 'vue';
import type { Reactive } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { useLoginStore } from '~/stores/login';

import type { IncdntDtlOutVO } from '~/types/elrcpt/index.ts';
import * as lwaCtgryApis from '~/composables/lwaCtgry';
import * as elrcptApis from '~/composables/elrcpt';

import { useCustomAlert } from '~/composables/useCustomAlert';
const { showAlert } = useCustomAlert();

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const stepSections = ref([]); // 각 섹션의 top 위치
const activeStep = ref(0); // 현재 활성화된 step 인덱스

// 각 스텝 컨텐츠의 위치 계산
const updateSectionOffsets = () => {
  stepSections.value = Array.from(
    document.querySelectorAll('.step-section')
  ).map((el) => {
    return {
      id: el.id,
      offsetTop: el.offsetTop
    };
  });
};

// 스크롤 이벤트 핸들러
const onScroll = () => {
  const scrollY = window.scrollY + 100; // 약간의 offset 보정
  for (let i = stepSections.value.length - 1; i >= 0; i--) {
    if (scrollY >= stepSections.value[i].offsetTop) {
      activeStep.value = i;
      break;
    }
  }
};

// mount/unmount hooks
onMounted(() => {
  updateSectionOffsets();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', updateSectionOffsets);

  // 로그인 완료상태
  if (authenticated.value) {
    selecteLwaCtgryList();
  } else {
    showAlert({
      icon: 'info',
      html: '전자접수 신청은 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인 페이지로 이동 합니다',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    })
      .then((result) => {
        if (result.isConfirmed) {
          // 로그인 페이지 이동
          // anyID 로그인페이지 및 재랜딩 수정필요
          navigateTo('/login');
        }
      })
      .catch(() => {});
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', updateSectionOffsets);
});

const activeTab = ref<string | null>(null);
const activeDepth2Index = ref<number | null>(null);
const activeDepth3Index = ref<number | null>(null);

const selectedIncdnt: Reactive<IncdntDtlOutVO> = reactive({
  incdntVO: {},
  instincdntListVO: [],
  incdntevdncdocListVO: []
});

// 신청정보
const selectedElrcptInfo = ref({
  incdntId: '',
  mngInstNo: ''
});
// const { incdntVO, instincdntListVO, incdntevdncdocListVO } =
//   toRefs(selectedIncdnt);

// PC 사건 선택 Event start
const setActiveTab = (ctgryNo: string) => {
  resetSelected();
  activeTab.value = ctgryNo;
  activeDepth2Index.value = null;
  activeDepth3Index.value = null;

  selectedCtgry.value.ctgrylv1No = ctgryNo;
  selectedCtgry.value.ctgryNo = ctgryLv2List.value.length === 0 ? ctgryNo : '';

  selectedIncdnt.incdntVO = null;
  selectedIncdnt.instincdntListVO = null;
  selectedIncdnt.incdntevdncdocListVO = null;
};

const selectDepth2 = (ctgryNo: string, index: number) => {
  resetSelected();
  activeDepth2Index.value = index;
  activeDepth3Index.value = null;

  selectedCtgry.value.ctgrylv2No = ctgryNo;
  selectedCtgry.value.ctgryNo = ctgryLv3List.value.length === 0 ? ctgryNo : '';
};

const selectDepth3 = (ctgryNo: string, index: number) => {
  resetSelected();
  activeDepth3Index.value = index;

  selectedCtgry.value.ctgrylv3No = ctgryNo;
  selectedCtgry.value.ctgryNo = ctgryNo;
};
// PC 사건 선택 Event end

// 모바일 사건 선택 Event
const selectCtgryMo = (depth: number) => {
  resetSelected();
  if (depth === 1) {
    selectedCtgry.value.ctgrylv2No = null;
    selectedCtgry.value.ctgrylv3No = null;

    selectedCtgry.value.ctgryNo =
      ctgryLv2List.value.length === 0
        ? selectedCtgry.value['ctgrylv' + depth + 'No']
        : '';
  } else if (depth === 2) {
    selectedCtgry.value.ctgrylv3No = null;

    selectedCtgry.value.ctgryNo =
      ctgryLv3List.value.length === 0
        ? selectedCtgry.value['ctgrylv' + depth + 'No']
        : '';
  } else {
    selectedCtgry.value.ctgryNo = selectedCtgry.value['ctgrylv' + depth + 'No'];
  }
};

// 셀렉트 박스

const radioSelected2 = ref('');
const radioSelected3 = ref('');
const radioSelected4 = ref('');
const radioSelected5 = ref('');

const isAvailStep2Aply: Ref<boolean | null> = ref(null);
const isAvailStep3Aply: Ref<boolean | null> = ref(null);

const isReadyElrcpt = ref(null);

// 기관선택
const selectTab = (mngInstNo: string) => {
  selectedElrcptInfo.value.mngInstNo = mngInstNo;
  console.log('selectTab mngInstNo:', mngInstNo);
};

// 모바일 Step 드롭다운
// 각 단계별 드롭다운 상태 개별 관리
const isDropdownOpen1 = ref(false);
const isDropdownOpen2 = ref(false);
const isDropdownOpen3 = ref(false);
const isDropdownOpen4 = ref(false);

const toggleDropdown = (step: number) => {
  switch (step) {
    case 1:
      if (!isDropdownOpen1.value) isDropdownOpen1.value = true;
      else isDropdownOpen1.value = false;
      break;
    case 2:
      if (!isDropdownOpen2.value) isDropdownOpen2.value = true;
      else isDropdownOpen2.value = false;
      break;
    case 3:
      if (!isDropdownOpen3.value) isDropdownOpen3.value = true;
      else isDropdownOpen3.value = false;
      break;
    case 4:
      if (!isDropdownOpen4.value) isDropdownOpen4.value = true;
      else isDropdownOpen4.value = false;
      break;
  }
};

const closeDropdown = (step: number) => {
  if (step === 1) isDropdownOpen1.value = false;
  else if (step === 2) isDropdownOpen2.value = false;
  else if (step === 3) isDropdownOpen3.value = false;
  else if (step === 4) isDropdownOpen4.value = false;
};

// 선택 사건 카테고리
const selectedCtgry = ref({
  ctgryNo: '',
  ctgrylv1No: null,
  ctgrylv2No: null,
  ctgrylv3No: null
});

// 전체 사건 카테고리 목록
const ctgryList = ref([]);
// 사건 카테고리 lv1 목록
const ctgryLv1List = computed(() => {
  return ctgryList.value.filter((item) => item.lwaCtgryLvl === 1);
});
// 사건 카테고리 lv2 목록
const ctgryLv2List = computed(() => {
  return ctgryList.value.filter(
    (item) => item.upCtgryNo === selectedCtgry.value.ctgrylv1No
  );
});
// 사건 카테고리 lv3 목록
const ctgryLv3List = computed(() => {
  return ctgryList.value.filter(
    (item) => item.upCtgryNo === selectedCtgry.value.ctgrylv2No
  );
});

// 사건 카테고리 조회
const selecteLwaCtgryList = async () => {
  // 범주 분류코드 : 500 - 사건
  const response = await lwaCtgryApis.selectLwaCtgryList('500'); // 범주 분류코드 : 500 - 사건
  ctgryList.value = response.data;
};

const selectIncdntInfo = async (ctgryNo: string) => {
  const response = await elrcptApis.selectIncdntInfo(ctgryNo);
  selectedIncdnt.incdntVO = response.data.incdntVO;
  selectedIncdnt.instincdntListVO = response.data.instincdntListVO;
  selectedIncdnt.incdntevdncdocListVO = response.data.incdntevdncdocListVO;

  if (
    selectedIncdnt.incdntVO.aplyMthdCd === '01' &&
    selectedIncdnt.incdntevdncdocListVO.length == 0
  ) {
    if (
      selectedIncdnt.instincdntListVO.length === 1 &&
      selectedIncdnt.instincdntListVO[0].mngInstNo === 'I003000000'
    ) {
      // 상담원만 신청
      showAlert({
        icon: 'info',
        html: '서울,경기지역만 전자접수 신청이 가능하여 접수승인이 안될수도 있습니다.<br />계속 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니요'
      })
        .then((result) => {
          if (result.isConfirmed) {
            //
            isAvailStep2Aply.value = true;
            isReadyElrcpt.value = true;
          } else {
            isAvailStep2Aply.value = false;
            isReadyElrcpt.value = false;
          }
        })
        .catch(() => {});
    } else {
      isAvailStep2Aply.value = true;
      isAvailStep3Aply.value = true;
    }
  }

  if (selectedIncdnt.instincdntListVO.length > 0) {
    selectedElrcptInfo.value.mngInstNo =
      selectedIncdnt.instincdntListVO[0].mngInstNo;
  }

  console.log('selectIncdntInfo selectedIncdnt::', selectedIncdnt);
  console.log(
    'selectIncdntInfo selectedInstNo::',
    selectedElrcptInfo.value.mngInstNo
  );
};
// 선택값 초기화
const resetSelected = () => {
  selectedIncdnt.incdntVO = null;
  selectedIncdnt.instincdntListVO = [];
  selectedIncdnt.incdntevdncdocListVO = [];
  isAvailStep2Aply.value = null;
  isReadyElrcpt.value = null;
};

watch(
  selectedCtgry,
  (newValue) => {
    if (newValue.ctgryNo) {
      selectIncdntInfo(newValue.ctgryNo);
    }
  },
  { deep: true }
);

watch(isAvailStep2Aply, (newValue) => {
  if (newValue === false) {
    isReadyElrcpt.value = false;
  }
});
// watch(isAvailStep2Aply, (newValue) => {
//   if (
//     newValue &&
//     selectedIncdnt.instincdntListVO.length === 1 &&
//     selectedIncdnt.instincdntListVO[0].mngInstNo === 'I003000000'
//   ) {
//     alert('Test');
//   }
// });
//
// watch(selectedElrcptInfo.value.mngInstNo, (newValue) => {
//   console.log('selectedElrcptInfo.value.mngInstNo::', newValue);
// });
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :show-print-button="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="electronic-app-wrap">
          <div class="step-box pc-only">
            <ol>
              <li :class="{ 'is-active': activeStep === 0 }">
                <!-- 현재 단계일 경우 class="is-active"추가 -->
                <NuxtLink to="#step1" class="step-cont step1">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">01</span>
                  </span>
                  <span class="tit-box">
                    <span>사건</span><span>확인</span>
                    <span class="sr-only">(현재단계)</span
                    ><!-- 접근성 : class="is-active"가 있을경우 추가 -->
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 1 }">
                <NuxtLink to="#step2" class="step-cont step2">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">02</span>
                  </span>
                  <span class="tit-box">
                    <span>기관</span><span>확인</span>
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 2 }">
                <NuxtLink to="#step3" class="step-cont step3">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">03</span>
                  </span>
                  <span class="tit-box">
                    <span>구조</span><span>대상자</span><span>유형</span>
                  </span>
                </NuxtLink>
              </li>
              <li :class="{ 'is-active': activeStep === 3 }">
                <NuxtLink to="#step4" class="step-cont step4">
                  <span class="txt-box">
                    <span class="step-txt">STEP</span>
                    <span class="number">04</span>
                  </span>
                  <span class="tit-box">
                    <span>소득요건</span><span>확인</span>
                  </span>
                </NuxtLink>
              </li>
            </ol>
          </div>
          <div class="cont-box">
            <!-- Step 1 Contents -->
            <div id="step1" class="step-section">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-1"
                  :aria-expanded="isDropdownOpen1 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen1 }"
                  @click="toggleDropdown(1)"
                >
                  <!-- Description 1: 작성 내용이 1단계 일땐 disabled 어트리뷰트 추가 / 2단계부터 disabled 삭제 -->
                  <!-- Description 1-1: disabled일 경우 dorpdown 이벤트 작동 안하게 -->
                  <!-- Description 2 : 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">01</span>
                  </span>
                  <span class="txt-tit">사건확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen1 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(1)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(1)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4 class="title-heading-1 circle type-dashed">
                전자접수 신청이 가능한 사건을 선택해주세요.
              </h4>
              <div class="incidents-wrap">
                <div class="tab-box-wrap pc-only">
                  <!-- 탭 목록 -->
                  <ul class="nav" role="tablist">
                    <li
                      v-for="ctgry in ctgryLv1List"
                      :key="ctgry.ctgryNo"
                      class="nav-item"
                    >
                      <button
                        type="button"
                        :id="`${ctgry.ctgryNo}-tab`"
                        class="nav-link"
                        :class="{ 'is-active': activeTab === ctgry.ctgryNo }"
                        role="tab"
                        :aria-controls="ctgry.ctgryNo"
                        :aria-selected="activeTab === ctgry.ctgryNo"
                        @click="setActiveTab(ctgry.ctgryNo)"
                      >
                        <span>{{ ctgry.ctgryNm1 }}</span>
                      </button>
                    </li>
                  </ul>

                  <!-- 탭 콘텐츠 -->
                  <div class="tab-content">
                    <div
                      v-for="ctgry in ctgryLv1List"
                      :key="ctgry.ctgryNo"
                      :id="ctgry.ctgryNo"
                      class="tab-panel"
                      :class="{ 'is-active': activeTab === ctgry.ctgryNo }"
                      role="tabpanel"
                      :aria-labelledby="`${ctgry.ctgryNo}-tab`"
                    >
                      <div class="depth-cont depth2">
                        <button
                          v-for="(ctgry, index) in ctgryLv2List"
                          :key="index"
                          type="button"
                          class="btn"
                          :class="{ 'is-active': activeDepth2Index === index }"
                          :title="activeDepth2Index === index ? '선택됨' : ''"
                          @click="selectDepth2(ctgry.ctgryNo, index)"
                        >
                          {{ ctgry.ctgryNm2 }}
                        </button>
                      </div>

                      <!-- depth3 -->
                      <div
                        v-if="
                          activeDepth2Index !== null && ctgryLv3List.length > 0
                        "
                        class="depth-cont depth3"
                      >
                        <button
                          v-for="(ctgry, index) in ctgryLv3List"
                          :key="index"
                          type="button"
                          class="btn"
                          :class="{
                            'is-active': activeDepth3Index === index
                          }"
                          :title="activeDepth3Index === index ? '선택됨' : ''"
                          @click="selectDepth3(ctgry.ctgryNo, index)"
                        >
                          {{ ctgry.ctgryNm3 }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 더미 컨텐츠 -->
                  <div class="incidents-info-box type-center" v-if="!activeTab">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <p>
                        상단의 사건분류탭을 선택하시면,<br />
                        <strong>전자접수 가능한 사건 목록</strong>이 자동으로
                        보여집니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab-select-wrap mo-only">
                  <!-- 1Depth -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="사건 선택"
                    v-model:value="selectedCtgry.ctgrylv1No"
                    @change="selectCtgryMo(1)"
                  >
                    <a-select-option
                      v-for="ctgry in ctgryLv1List"
                      :key="ctgry.ctgryNo"
                      :value="ctgry.ctgryNo"
                      >{{ ctgry.ctgryNm1 }}</a-select-option
                    >
                  </a-select>
                  <!-- 2Depth : 1Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    v-if="ctgryLv2List.length > 0"
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                    v-model:value="selectedCtgry.ctgrylv2No"
                    @change="selectCtgryMo(2)"
                  >
                    <a-select-option
                      v-for="ctgry in ctgryLv2List"
                      :key="ctgry.ctgryNo"
                      :value="ctgry.ctgryNo"
                      >{{ ctgry.ctgryNm2 }}</a-select-option
                    >
                  </a-select>
                  <!-- 3Depth : 2Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    v-if="ctgryLv3List.length > 0"
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                    v-model:value="selectedCtgry.ctgrylv3No"
                    @change="selectCtgryMo(3)"
                  >
                    <a-select-option
                      v-for="ctgry in ctgryLv3List"
                      :key="ctgry.ctgryNo"
                      :value="ctgry.ctgryNo"
                      >{{ ctgry.ctgryNm3 }}</a-select-option
                    >
                  </a-select>
                </div>
                <!--사건내용-->
                <div
                  class="tab-result-box"
                  v-if="
                    selectedIncdnt.incdntVO && selectedIncdnt.incdntVO.incdntId
                  "
                >
                  <div v-if="selectedIncdnt.incdntVO.aplyMthdCd === '02'">
                    <div class="tab-content">
                      <div
                        id="agency-1"
                        class="tab-panel"
                        role="tabpanel"
                        aria-labelledby="agency-1-tab"
                      >
                        <div
                          v-html="selectedIncdnt.incdntVO.incdntExpln"
                          contenteditable="true"
                        ></div>

                        <div
                          v-if="
                            selectedIncdnt.instincdntListVO &&
                            selectedIncdnt.instincdntListVO.length > 0
                          "
                        >
                          <div
                            class="agency-link-banner"
                            v-for="inst in selectedIncdnt.instincdntListVO"
                            :key="inst.mngInstNo"
                          >
                            <NuxtLink
                              title="새 창 열림"
                              class="link-box"
                              :to="inst.urlAddr"
                              external
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span class="img-box">
                                <img
                                  v-if="inst.mngInstNo === 'I001000000'"
                                  src="/image/sub/counsel/counsel_top_txt.png"
                                  :alt="inst.mngInstNm"
                                />
                                <img
                                  v-if="inst.mngInstNo === 'I030000000'"
                                  src="/image/sub/counsel/counsel_top_txt_08.png"
                                  :alt="inst.mngInstNm"
                                />
                                <img
                                  v-if="inst.mngInstNo === 'I019000000'"
                                  src="/image/sub/counsel/counsel_top_txt_05.png"
                                  :alt="inst.mngInstNm"
                                />
                                <img
                                  v-if="inst.mngInstNo === 'I013000000'"
                                  src="/image/sub/counsel/counsel_top_txt_07_01.png"
                                  :alt="inst.mngInstNm"
                                />
                                <img
                                  v-if="inst.mngInstNo === 'I014000000'"
                                  src="/image/sub/counsel/counsel_top_txt_07_02.png"
                                  :alt="inst.mngInstNm"
                                />

                                <img
                                  v-if="inst.mngInstNo === 'I032000000'"
                                  src="/image/sub/counsel/counsel_top_txt_06.png"
                                  :alt="inst.mngInstNm"
                                />
                                <img
                                  v-if="inst.mngInstNo === 'I028000000'"
                                  src="/image/sub/counsel/counsel_top_txt_09.png"
                                  :alt="inst.mngInstNm"
                                />
                              </span>
                              <span
                                class="txt-box"
                                v-html="inst.instIndt"
                              ></span>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="incidents-desc-box">
                      <div class="check-tit-box">
                        <span class="ico-check-info"></span>
                        <strong
                          >{{ selectedIncdnt.incdntVO.incdntNm }}이란?</strong
                        >
                      </div>
                      <p
                        class="bul-dot"
                        v-html="selectedIncdnt.incdntVO.incdntExpln"
                        contenteditable="true"
                      ></p>
                    </div>
                    <div
                      class="inner-con-box"
                      v-if="selectedIncdnt.incdntevdncdocListVO.length > 0"
                    >
                      <h5 class="receipt-tit type-border">
                        전자접수 신청 제출 서류
                      </h5>
                      <div class="docs-list-box">
                        <ul>
                          <li
                            v-for="(
                              doc, index
                            ) in selectedIncdnt.incdntevdncdocListVO"
                            :key="index"
                          >
                            <div class="docs-cont-box">
                              <span class="bul-dot">{{ doc.docNm }}</span>
                              <span
                                class="badge required"
                                v-if="doc.esntlYn === 'Y'"
                                >필수</span
                              >
                              <span class="badge" v-else>선택</span>
                            </div>
                          </li>
                        </ul>
                        <p class="bul-dot">
                          법률구조신청을 전자적으로 신청하고자 하는 사람은
                          전자접수 신청사건에 해당하고, 각 입증자료를 제출하여야
                          합니다.
                        </p>
                      </div>
                    </div>
                    <div
                      class="inner-con-box"
                      v-if="selectedIncdnt.incdntevdncdocListVO.length > 0"
                    >
                      <div class="select-result-box">
                        <div class="check-tit-box">
                          <span class="ico-check-info"></span>
                          <strong
                            >전자접수 신청을 위해 필요자료 제출이
                            가능하십니까?</strong
                          >
                        </div>

                        <a-radio-group v-model:value="isAvailStep2Aply">
                          <a-radio class="radio-bx" :value="true">예</a-radio>
                          <a-radio class="radio-bx" :value="false"
                            >아니요</a-radio
                          >
                        </a-radio-group>
                      </div>
                    </div>
                    <!--                    <div-->
                    <!--                      class="inner-con-box"-->
                    <!--                      v-if="isAvailStep2Aply === false"-->
                    <!--                    >-->
                    <!--                      <div class="incidents-info-box">-->
                    <!--                        <div class="txt-box">-->
                    <!--                          <span class="ico-incidents-info"></span>-->
                    <!--                          <ul class="list">-->
                    <!--                            <li>-->
                    <!--                              <p class="bul-dot">-->
                    <!--                                전자접수 신청이 불가능합니다.-->
                    <!--                              </p>-->
                    <!--                            </li>-->
                    <!--                            <li>-->
                    <!--                              <p class="bul-dot">-->
                    <!--                                법률 구조기관에 내방하여 상담하여 주시기-->
                    <!--                                바랍니다.-->
                    <!--                              </p>-->
                    <!--                            </li>-->
                    <!--                          </ul>-->
                    <!--                        </div>-->
                    <!--                        <div class="btn-box">-->
                    <!--                          <NuxtLink to="#" class="btn-basic primary">-->
                    <!--                            <span class="text">면접상담예약 바로가기</span>-->
                    <!--                          </NuxtLink>-->
                    <!--                        </div>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 1 Contents -->

            <!-- Step 2 Contents -->
            <div id="step2" class="step-section" v-if="isAvailStep2Aply">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-2"
                  :aria-expanded="isDropdownOpen2 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen2 }"
                  @click="toggleDropdown(2)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">02</span>
                  </span>
                  <span class="txt-tit">기관확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen2 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(2)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(2)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4
                class="title-heading-1 circle type-dashed"
                v-if="selectedIncdnt.instincdntListVO.length > 0"
              >
                기관을 선택 해주세요.
              </h4>
              <div class="incidents-wrap">
                <div class="tab-wrap">
                  <ul
                    class="nav"
                    role="tablist"
                    v-for="inst in selectedIncdnt.instincdntListVO"
                  >
                    <li class="nav-item">
                      <button
                        type="button"
                        id="agency-1-tab"
                        class="nav-link"
                        :class="{
                          'is-active':
                            selectedElrcptInfo.mngInstNo === `${inst.mngInstNo}`
                        }"
                        role="tab"
                        :aria-controls="inst.mngInstNo"
                        :aria-selected="
                          selectedElrcptInfo.mngInstNo === `${inst.mngInstNo}`
                        "
                        @click="selectTab(inst.mngInstNo)"
                      >
                        <span class="img-box">
                          <img
                            v-if="inst.mngInstNo === 'I002000000'"
                            src="/image/sub/counsel/counsel_top_txt_02.png"
                            alt="법률구조법인 한국가정법률상담소"
                          />
                          <img
                            v-if="inst.mngInstNo === 'I003000000'"
                            src="/image/sub/counsel/counsel_top_txt_03.png"
                            alt="법률구조법인 대한가정법률복지상담원"
                          />
                          <img
                            v-if="inst.mngInstNo === 'I004000000'"
                            src="/image/sub/counsel/counsel_top_txt_07.png"
                            alt="재단법인 대한변협법률구조재단"
                          />
                          <img
                            v-if="inst.mngInstNo === 'I001000000'"
                            src="/image/sub/counsel/counsel_top_txt.png"
                            alt="대한법률구조공단"
                          />
                        </span>
                        <span class="txt-box" v-html="inst.instIndt"></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- //Step 2 Contents -->

            <!-- Step 3 Contents -->

            <div id="step3" class="step-section" v-if="isAvailStep3Aply">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-3"
                  :aria-expanded="isDropdownOpen3 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen3 }"
                  @click="toggleDropdown(3)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">03</span>
                  </span>
                  <span class="txt-tit">구조대상자 유형</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen3 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(3)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link"
                      @click.native="closeDropdown(3)"
                    >
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4 class="title-heading-1 circle type-dashed">
                구조 대상자 유형을 선택 해주세요.
              </h4>
              <div class="incidents-wrap">
                <div class="inner-cont-box">
                  <div class="btn-box">
                    <button type="button" class="btn-basic type2">
                      <span class="text">구조대상 유형 찾기</span>
                    </button>
                  </div>
                  <a-radio-group
                    class="type-vertical"
                    v-model:value="radioSelected2"
                  >
                    <a-radio class="radio-bx" value="소액임차인."
                      >소액임차인.</a-radio
                    >
                    <a-radio
                      class="radio-bx"
                      value="장애인(장애정도가 심하지 않은 장애인-일부유료, 종전 4-6급)"
                      >장애인(장애정도가 심하지 않은 장애인-일부유료, 종전
                      4-6급)</a-radio
                    >
                    <a-radio class="radio-bx" value="임금등 체불 (피해근로자)"
                      >임금등 체불 (피해근로자)</a-radio
                    >
                  </a-radio-group>
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >구조대상자는 다중 선택하여 구조대상자 별로 상세정보를
                      확인할 수 있습니다.</span
                    >
                  </p>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">구조대상자 상세정보</h5>
                  <div class="grid-box">
                    <dl class="info-dl-box">
                      <dt>구조대상자 정의</dt>
                      <dd>
                        <span class="txt"
                          >「주택임대차보호법」에서 정한 소액임차인에 해당하는
                          자</span
                        >
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">신청 가능한 사건</h5>
                  <div class="grid-box">
                    <dl class="info-dl-box">
                      <dt>신청가능한 사건</dt>
                      <dd>
                        <span class="txt">주택임대차보증금 관련 사건</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">구조대상자 입증자료</h5>
                  <div class="grid-box type-col3-ran">
                    <dl class="info-dl-box">
                      <dt>제출서류</dt>
                      <dd>
                        <span class="txt">주택임대차계약서</span>
                        <span class="txt">가족관계증명서</span>
                        <span class="txt">기본증명서</span>
                      </dd>
                    </dl>
                    <dl class="info-dl-box">
                      <dt>발급기관</dt>
                      <dd>
                        <span class="txt">-</span>
                        <span class="txt">시ㆍ군ㆍ구ㆍ읍ㆍ면ㆍ동사무소</span>
                        <span class="txt">수산업협동조합</span>
                      </dd>
                    </dl>
                    <dl class="info-dl-box">
                      <dt>인터넷발급</dt>
                      <dd>
                        <span class="txt">-</span>
                        <span class="txt">정부24</span>
                        <span class="txt">정부24</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">소송비용</h5>
                  <div class="grid-box type-col3">
                    <dl class="info-dl-box">
                      <dt>소송비용</dt>
                      <dd>
                        <span class="txt">무료</span>
                      </dd>
                    </dl>
                    <dl class="info-dl-box">
                      <dt>변호사보수</dt>
                      <dd>
                        <span class="txt">무료</span>
                      </dd>
                    </dl>
                    <dl class="info-dl-box">
                      <dt>가족에대한 무료</dt>
                      <dd>
                        <span class="txt">무료</span>
                      </dd>
                    </dl>
                  </div>
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >무료법률구조대상자에 해당하는 경우에도 감정료 등의 경우
                      일부 비용이 발생할 수 있고 승소가액이 3억을 초과하는 경우
                      소송비용과 변호사 보수 모두 부담하여야 합니다.</span
                    >
                  </p>
                </div>
                <div class="inner-con-box">
                  <div class="select-result-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong
                        >선택하신 구조대상자의 입증자료 제출이 가능하며, 지원
                        대상 사건에 해당합니까?</strong
                      >
                    </div>
                    <a-radio-group v-model:value="radioSelected3">
                      <a-radio class="radio-bx" value="예">예</a-radio>
                      <a-radio class="radio-bx" value="아니요">아니요</a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div class="inner-con-box">
                  <div class="incidents-info-box">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <ul class="list">
                        <li>
                          <p class="bul-dot">전자접수 신청이 불가능합니다.</p>
                        </li>
                        <li>
                          <p class="bul-dot">
                            법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div class="btn-box">
                      <NuxtLink to="#" class="btn-basic primary">
                        <span class="text">면접상담예약 바로가기</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 3 Contents -->

            <!-- Step 4 Contents -->
            <div id="step4" class="step-section" v-if="false">
              <div class="step-dropdown-menu mo-only">
                <button
                  type="button"
                  class="step-toggle-btn step-4"
                  :aria-expanded="isDropdownOpen4 ? 'true' : 'false'"
                  :class="{ show: isDropdownOpen4 }"
                  @click="toggleDropdown(4)"
                >
                  <!-- Description: 각 단계마다 step-1, step-2, step-3, step-4 다르게 클래스 추가 -->
                  <span class="txt-step">
                    <span class="txt">STEP</span>
                    <span class="num">04</span>
                  </span>
                  <span class="txt-tit">소득요건 확인</span>
                </button>
                <ul
                  class="step-dropdown-list"
                  :class="{ show: isDropdownOpen4 }"
                >
                  <!-- Description: 각 단계마다 선택을 한 리스트의 항목만 노출 예) 1,2단계만 선택할 경우 1,2단계 항목만 노출  -->
                  <li>
                    <NuxtLink
                      to="#step1"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 01</span>
                      <span class="txt-tit">사건확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step2"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 02</span>
                      <span class="txt-tit">기관확인</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step3"
                      class="step-link"
                      @click.native="closeDropdown(4)"
                    >
                      <span class="txt-step">STEP 03</span>
                      <span class="txt-tit">구조대상자 유형</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="#step4"
                      class="step-link is-active"
                      title="선택됨"
                      @click.native="closeDropdown(4)"
                      ><!-- 각 단계에 맞는 class="is-active" 추가 -->
                      <span class="txt-step">STEP 04</span>
                      <span class="txt-tit">소득요건 확인</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <h4 class="title-heading-1 circle type-dashed">
                구조대상자의 소득요건 확인
              </h4>
              <div class="incidents-wrap">
                <div class="inner-cont-box">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >선택하신 대상자는 기준중위소득 150% 이하에 한하여
                      법률구조를 받을 수 있습니다.</span
                    >
                  </p>
                  <div class="btn-box">
                    <button type="button" class="btn-basic type2">
                      <span class="text">기준중위소득 확인하기</span>
                    </button>
                  </div>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit type-border">기준중위소득제한</h5>
                  <div class="grid-box">
                    <dl class="info-dl-box">
                      <dt>기준중위소득제한 기준</dt>
                      <dd>
                        <span class="txt">150%</span>
                      </dd>
                    </dl>
                    <dl class="info-dl-box">
                      <dt>소득요건 해당여부</dt>
                      <dd>
                        <span class="txt">해당</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="inner-con-box">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >기준중위소득 적용예외 대상자에 해당하는 경우 바로
                      전자접수 신청을 하실 수 있습 니다.(단, 주장사실 입증자료
                      필요)<br />기준중위소득 125% 또는 150%의 제한을 받는 경우
                      중위소득판정절차를 진행한 후 전자접수 신청을 진행하시기
                      바랍니다.</span
                    >
                  </p>
                </div>
                <div class="inner-con-box">
                  <h5 class="receipt-tit">
                    기준중위소득 소득요건 증빙을 위해 아래 서류 제출이
                    필요합니다.
                  </h5>
                  <div class="common-table__box">
                    <table>
                      <caption>
                        기준중위소득 소득요건 증빙 제출 서류의 통제출서류,
                        주민등록표 등본(세대원 수 확인)에 대한 표
                      </caption>
                      <thead>
                        <tr>
                          <th colspan="2" scope="col">통제출서류</th>
                          <th colspan="2" scope="col">
                            주민등록표 등본(세대원 수 확인)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowspan="4">건강보험가입자</td>
                          <td rowspan="2">직장가입자</td>
                          <td>건강보험납부사실확인서</td>
                          <td rowspan="2">택1</td>
                        </tr>
                        <tr>
                          <td class="bdr">건강보험고지서(소득점수 확인)</td>
                        </tr>
                        <tr>
                          <td>지역가입자</td>
                          <td>지역보험료부과내역확인서</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>피부양자</td>
                          <td>건강보험자격확인서</td>
                          <td>피부양자 모두 제출</td>
                        </tr>
                        <tr>
                          <td colspan="2" rowspan="5">건강보험 미가입자</td>
                          <td>근로소득원천징수영수증</td>
                          <td rowspan="5">택1</td>
                        </tr>
                        <tr>
                          <td class="bdr">보수지급명세서</td>
                        </tr>
                        <tr>
                          <td class="bdr">소득금액증명서(세무서)</td>
                        </tr>
                        <tr>
                          <td class="bdr">국민연금산정용가입내역확인서</td>
                        </tr>
                        <tr>
                          <td class="bdr">국민연금지급내역확인서</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="inner-con-box">
                  <div class="select-result-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong>
                        선택하신 "어업인"의 소득요건을 해당합니다.
                        <br class="pc-only" />구조대상자의 입증자료 제출이
                        가능하며, 지원 대상 사건에 해당합니까?
                      </strong>
                    </div>
                    <a-radio-group v-model:value="radioSelected4">
                      <a-radio class="radio-bx" value="예">예</a-radio>
                      <a-radio class="radio-bx" value="아니요">아니요</a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div class="inner-con-box">
                  <div class="select-result-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong
                        >전자접수 신청을 위해 필요자료 제출이 가능하십니까?
                      </strong>
                    </div>
                    <a-radio-group v-model:value="radioSelected5">
                      <a-radio class="radio-bx" value="예">예</a-radio>
                      <a-radio class="radio-bx" value="아니요">아니요</a-radio>
                    </a-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 4 Contents -->

            <!--접수신청-->

            <div v-if="isReadyElrcpt === true">
              <div class="inner-con-box">
                <p class="info-txt-ex-mark">
                  <span class="txt">동일사건으로 중복 접수는 불가합니다.</span>
                </p>
              </div>
              <div class="inner-con-box">
                <CommonButtonGroup align="center" class="!mt-50px">
                  <CommonButton variants="line-primary" width="lg">
                    전자접수 임시저장하기
                  </CommonButton>
                  <CommonButton variants="primary" width="lg">
                    전자접수 신청하기
                  </CommonButton>
                </CommonButtonGroup>
              </div>
            </div>
            <div class="inner-con-box" v-else-if="isReadyElrcpt === false">
              <div class="incidents-info-box">
                <div class="txt-box">
                  <span class="ico-incidents-info"></span>
                  <ul class="list">
                    <li>
                      <p class="bul-dot">전자접수 신청이 불가능합니다.</p>
                    </li>
                    <li>
                      <p class="bul-dot">
                        법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="btn-box">
                  <NuxtLink to="#" class="btn-basic primary">
                    <span class="text">면접상담예약 바로가기</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
