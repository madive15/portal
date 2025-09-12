<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({ layout: 'pub2nd' });

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
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', updateSectionOffsets);
});

const activeTab = ref<string | null>(null);
const activeDepth2Index = ref<number | null>(null);
const activeDepth3Index = ref<number | null>(null);

function setActiveTab(tabId: string) {
  activeTab.value = tabId;
  activeDepth2Index.value = null;
  activeDepth3Index.value = null;
}

function selectDepth2(index: number) {
  activeDepth2Index.value = index;
  activeDepth3Index.value = null;
}

function selectDepth3(index: number) {
  activeDepth3Index.value = index;
}

const tabData: Record<string, Array<{ label: string; sub?: string[] }>> = {
  'incidents-1': [
    {
      label: 'Tab1 depth2 menu1',
      sub: [
        'Tab1 depth2 menu1[1]',
        'Tab1 depth2 menu1[2]',
        'Tab1 depth2 menu1[3]'
      ]
    },
    { label: 'Tab1 depth2 menu2' },
    { label: 'Tab1 depth2 menu3' },
    { label: 'Tab1 depth2 menu4' }
  ],
  'incidents-2': [
    {
      label: '계약관계',
      sub: [
        '대여금',
        '약정금',
        '보증채무금',
        '계약금반환',
        '구상금',
        '매매대금',
        '공사대금'
      ]
    },
    { label: '근로관계' },
    { label: '임대차관계' },
    { label: '부당이득/손해배상' },
    { label: '기타 민사사건' },
    { label: '기타 민사사건' },
    { label: '기타 민사사건' },
    { label: '기타 민사사건' }
  ],
  'incidents-3': [
    { label: 'Tab3 depth2 menu1' },
    { label: 'Tab3 depth2 menu2' },
    { label: 'Tab3 depth2 menu3' }
  ],
  'incidents-4': [
    { label: 'Tab4 depth2 menu1' },
    { label: 'Tab4 depth2 menu2' }
  ],
  'incidents-5': [
    { label: 'Tab5 depth2 menu1' },
    { label: 'Tab5 depth2 menu2' },
    { label: 'Tab5 depth2 menu3' },
    { label: 'Tab5 depth2 menu4' }
  ]
};

const tabList = [
  { id: 'incidents-1', label: '화해조정' },
  { id: 'incidents-2', label: '민사사건' },
  { id: 'incidents-3', label: '가사사건' },
  { id: 'incidents-4', label: '채무조정/불법사금융' },
  { id: 'incidents-5', label: '기타 법률분쟁' }
];

// 셀렉트 박스
const radioSelected = ref('');
const radioSelected2 = ref('');
const radioSelected3 = ref('');
const radioSelected4 = ref('');
const radioSelected5 = ref('');

// 기관선택 탭메뉴
const activeAgencyTab = ref('agency-1');

function selectTab(tabId: string) {
  activeAgencyTab.value = tabId;
}

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
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전자접수 신청"
        />
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
                    <li v-for="tab in tabList" :key="tab.id" class="nav-item">
                      <button
                        type="button"
                        :id="`${tab.id}-tab`"
                        class="nav-link"
                        :class="{ 'is-active': activeTab === tab.id }"
                        role="tab"
                        :aria-controls="tab.id"
                        :aria-selected="activeTab === tab.id"
                        @click="setActiveTab(tab.id)"
                      >
                        <span>{{ tab.label }}</span>
                      </button>
                    </li>
                  </ul>

                  <!-- 탭 콘텐츠 -->
                  <div class="tab-content">
                    <div
                      v-for="tab in tabList"
                      :key="tab.id"
                      :id="tab.id"
                      class="tab-panel"
                      :class="{ 'is-active': activeTab === tab.id }"
                      role="tabpanel"
                      :aria-labelledby="`${tab.id}-tab`"
                    >
                      <div class="depth-cont depth2">
                        <button
                          v-for="(item, index) in tabData[tab.id]"
                          :key="index"
                          type="button"
                          class="btn"
                          :class="{ 'is-active': activeDepth2Index === index }"
                          :title="activeDepth2Index === index ? '선택됨' : ''"
                          @click="selectDepth2(index)"
                        >
                          {{ item.label }}
                        </button>
                      </div>

                      <!-- depth3 -->
                      <div
                        v-if="
                          activeDepth2Index !== null &&
                          tabData[tab.id][activeDepth2Index]?.sub
                        "
                        class="depth-cont depth3"
                      >
                        <button
                          v-for="(label, subIndex) in tabData[tab.id][
                            activeDepth2Index
                          ].sub"
                          :key="subIndex"
                          type="button"
                          class="btn"
                          :class="{
                            'is-active': activeDepth3Index === subIndex
                          }"
                          :title="
                            activeDepth3Index === subIndex ? '선택됨' : ''
                          "
                          @click="selectDepth3(subIndex)"
                        >
                          {{ label }}
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
                  >
                    <a-select-option value="1">화해조정</a-select-option>
                    <a-select-option value="2">민사사건</a-select-option>
                    <a-select-option value="3">가사사건</a-select-option>
                    <a-select-option value="4"
                      >채무조정/불법사금융</a-select-option
                    >
                    <a-select-option value="5">기타 법률분쟁</a-select-option>
                  </a-select>
                  <!-- 2Depth : 1Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                  >
                    <a-select-option value="1-1">계약관계</a-select-option>
                    <a-select-option value="1-2">근로관계</a-select-option>
                    <a-select-option value="1-3">임대차관계</a-select-option>
                    <a-select-option value="1-4"
                      >부당이득/손해배상</a-select-option
                    >
                    <a-select-option value="1-5">기타 민사사건</a-select-option>
                  </a-select>
                  <!-- 3Depth : 2Depth 메뉴 중 하위 메뉴가 있을 시 노출 -->
                  <a-select
                    id="select"
                    class="common-select"
                    placeholder="분류 선택"
                  >
                    <a-select-option value="1-1-1">대여금</a-select-option>
                    <a-select-option value="1-1-2">약정금</a-select-option>
                    <a-select-option value="1-1-3">보증채무금</a-select-option>
                    <a-select-option value="1-1-4">계약금반환</a-select-option>
                    <a-select-option value="1-1-5">구상금</a-select-option>
                  </a-select>
                </div>
                <div class="tab-result-box">
                  <div class="incidents-desc-box">
                    <div class="check-tit-box">
                      <span class="ico-check-info"></span>
                      <strong>대여금이란?</strong>
                    </div>
                    <p class="bul-dot">
                      한쪽 당사자(채권자)가 다른 당사자(채무자)에게 돈을
                      빌려주었으나, 정해진 기간 안에 돌려받지 못하여 법원에 돈을
                      돌려받기 위한 소송을 제기한 사건
                    </p>
                  </div>
                  <div class="inner-con-box">
                    <h5 class="receipt-tit type-border">
                      전자접수 신청 제출 서류
                    </h5>
                    <div class="docs-list-box">
                      <ul>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot">주민등록등본</span>
                            <span class="badge required">필수</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot"
                              >법인등기사항증명서(상대방이 법인인 경우)</span
                            >
                            <span class="badge">선택</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot">변제한 자료(영수증 등)</span>
                            <span class="badge">선택</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot"
                              >대위변제증명서 또는 대위변제확인서</span
                            >
                            <span class="badge">선택</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot"
                              >금전소비대차계약서/대출거래약정서 등</span
                            >
                            <span class="badge">선택</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot"
                              >사업자등록증(상대방이 상인인 경우)</span
                            >
                            <span class="badge">선택</span>
                          </div>
                        </li>
                        <li>
                          <div class="docs-cont-box">
                            <span class="bul-dot">기타 각종 서류</span>
                            <span class="badge">선택</span>
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
                  <div class="inner-con-box">
                    <div class="select-result-box">
                      <div class="check-tit-box">
                        <span class="ico-check-info"></span>
                        <strong
                          >전자접수 신청을 위해 필요자료 제출이
                          가능하십니까?</strong
                        >
                      </div>
                      <a-radio-group v-model:value="radioSelected">
                        <a-radio class="radio-bx" value="예">예</a-radio>
                        <a-radio class="radio-bx" value="아니요"
                          >아니요</a-radio
                        >
                      </a-radio-group>
                    </div>
                  </div>
                  <div class="inner-con-box">
                    <div class="incidents-info-box">
                      <div class="txt-box">
                        <span class="ico-incidents-info"></span>
                        <BullList type="dot" class="!gap-y-10px">
                          <li class="!font-normal !text-[14px] lg:!text-[16px]">
                            전자접수 신청이 불가능합니다.
                          </li>
                          <li class="!font-normal !text-[14px] lg:!text-[16px]">
                            법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                          </li>
                        </BullList>
                      </div>
                      <div class="btn-box">
                        <CommonButton variants="primary" width="md">
                          면접상담예약 바로가기
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 1 Contents -->

            <!-- Step 2 Contents -->
            <div id="step2" class="step-section">
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
              <h4 class="title-heading-1 circle type-dashed">
                기관을 선택 해주세요.
              </h4>
              <div class="incidents-wrap">
                <div class="tab-wrap">
                  <ul class="nav" role="tablist">
                    <li class="nav-item">
                      <button
                        type="button"
                        id="agency-1-tab"
                        class="nav-link"
                        :class="{ 'is-active': activeAgencyTab === 'agency-1' }"
                        role="tab"
                        aria-controls="agency-1"
                        :aria-selected="activeAgencyTab === 'agency-1'"
                        @click="selectTab('agency-1')"
                      >
                        <span class="img-box">
                          <img
                            src="/image/sub/counsel/counsel_top_txt_02.png"
                            alt="법률구조법인 한국가정법률상담소"
                          />
                        </span>
                        <span class="txt-box"
                          >한국가정법률상담소는 가정문제 전문 법률구조기관으로
                          가사사건을 비롯하여 민사, 형사, 파산·면책사건 등
                          법률문제 전반에 걸쳐 무료 법률상담을 진행합니다.</span
                        >
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        type="button"
                        id="agency-2-tab"
                        class="nav-link"
                        :class="{ 'is-active': activeAgencyTab === 'agency-2' }"
                        role="tab"
                        aria-controls="agency-2"
                        :aria-selected="activeAgencyTab === 'agency-2'"
                        @click="selectTab('agency-2')"
                      >
                        <span class="img-box">
                          <img
                            src="/image/sub/counsel/counsel_top_txt_03.png"
                            alt="법률구조법인 대한가정법률복지상담원"
                          />
                        </span>
                        <span class="txt-box"
                          >대한가정법률복지상담원은 경제적으로 어렵거나 법을 잘
                          몰라 호소할 곳조차 찾지 못하는 어려운 분들을 위해
                          설립된 법률구조기관입니다.
                          대한가정법률복지상담원에서는 법률상담, 화해조정과 대서
                          및 무료 소송대리 등의 법률구조서비스를
                          지원합니다.</span
                        >
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        type="button"
                        id="agency-3-tab"
                        class="nav-link"
                        :class="{ 'is-active': activeAgencyTab === 'agency-3' }"
                        role="tab"
                        aria-controls="agency-3"
                        :aria-selected="activeAgencyTab === 'agency-3'"
                        @click="selectTab('agency-3')"
                      >
                        <span class="img-box">
                          <img
                            src="/image/sub/counsel/counsel_top_txt_07.png"
                            alt="재단법인 대한변협법률구조재단"
                          />
                        </span>
                        <span class="txt-box"
                          >대한변협법률구조재단에서는 민사, 형사, 가사, 행정,
                          헌번소원 등 법률구조가 필요한 모든 사건을 법률 구조
                          대상사건으로 진행하고 있습니다.</span
                        >
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        type="button"
                        id="agency-4-tab"
                        class="nav-link"
                        :class="{ 'is-active': activeAgencyTab === 'agency-4' }"
                        role="tab"
                        aria-controls="agency-4"
                        :aria-selected="activeAgencyTab === 'agency-4'"
                        @click="selectTab('agency-4')"
                      >
                        <span class="img-box">
                          <img
                            src="/image/sub/counsel/counsel_top_txt.png"
                            alt="대한법률구조공단"
                          />
                        </span>
                        <span class="txt-box"
                          >대한법률구조공단은 법률지식이 부족하면서도 경제적으로
                          어려워 법의 보호를 충분히 받지 못하는 사람들에게
                          법률상담, 변호사에 의한 소송대리 및 형사변호 등의
                          법률적 지원을 하기 위하여 설립된 공공기관입니다.</span
                        >
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div
                      id="agency-1"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-1-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-1' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit"
                                >주택/상가건물 임대차분쟁조정 안내</strong
                              >
                              <p>
                                집주인과 세입자 사이에 분쟁이 생겼을 때, 법원
                                소송 전에 쉽고 빠르게 문제를 해결할 수 있는
                                방법이 있어요. 바로 주택/상가건물 임대차분쟁조정
                                제도입니다
                              </p>
                            </div>
                            <div class="box">
                              <strong class="info-tit"
                                >분쟁조정 제도가 좋은 이유</strong
                              >

                              <BullList type="dot" class="!gap-y-3px">
                                <li
                                  class="!font-normal !text-[#555] !text-[14px] lg:!text-[16px]"
                                >
                                  빠르고 저렴해요: 법원 소송보다 훨씬 짧은 기간
                                  안에 적은 비용으로 해결할 수 있어요.
                                </li>
                                <li
                                  class="!font-normal !text-[#555] !text-[14px] lg:!text-[16px]"
                                >
                                  전문가의 도움을 받아요: 변호사, 감정평가사 등
                                  전문가들이 참여하여 공정하게 해결을
                                  도와줍니다.
                                </li>
                                <li
                                  class="!font-normal !text-[#555] !text-[14px] lg:!text-[16px]"
                                >
                                  부담이 적어요: 딱딱한 법정 분위기 대신 대화로
                                  서로 합의점을 찾도록 돕습니다.
                                </li>
                                <li
                                  class="!font-normal !text-[#555] !text-[14px] lg:!text-[16px]"
                                >
                                  법적 효력이 있어요: 조정이 성립되면 법원의
                                  확정 판결과 같은 효력이 있어서 안전하게 분쟁을
                                  마무리할 수 있습니다.
                                </li>
                              </BullList>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">
                        대한법률구조공단 주택•상가건물임대차분쟁조정위원회를
                        방문해서 문제를 해결해보세요
                      </p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img
                              src="/image/sub/counsel/counsel_top_txt.png"
                              alt="대한법률구조공단"
                            />
                          </span>
                          <span class="txt-box"
                            >대한법률구조공단은 법률지식이 부족하면서도
                            경제적으로 어려워 법의 보호를 충분히 받지 못하는
                            사람들에게 법률상담, 변호사에 의한 소송대리 및
                            형사변호 등의 법률적 지원을 하기 위하여 설립된
                            공공기관입니다.</span
                          >
                        </NuxtLink>
                      </div>
                    </div>
                    <div
                      id="agency-2"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-2-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-2' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit">중재안내</strong>
                              <p>
                                중재란 분쟁 당사자 간의 합의로 법원의 재판이
                                아닌 당사자들이 선정한 중재인의 판정에 의하여
                                분쟁을 최종 해결하는 제도입니다.
                              </p>
                            </div>
                            <div class="box">
                              <strong class="info-tit">중재의 특징</strong>
                              <ul class="list">
                                <li>
                                  <p class="bul-dot">
                                    각 분야의 전문가인 중재인의 판정
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    시간과 비용을 절약할 수 있는 단심제
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    법원의 확정판결과 동일한 효력
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    뉴욕협약에 의한 국제적 효력
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    당사자들의 비밀을 보장해 주는 비공개심리
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    당사자들의 충분한 진술기회 보장
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <div class="box">
                              <strong class="info-tit"
                                >중재가 적합한 분야</strong
                              >
                              <ul class="list">
                                <li>
                                  <p class="bul-dot">
                                    분쟁이 복잡하고 전문적인 판단이 필요한
                                    분야(건설, 금융, 합작투자 등)
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    신속한 해결이 사업에 핵심적 영향을 미치는
                                    분야(IT, 지식재산권, 노사 등)
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    외국인이 관련된 국제투자 및 국제거래(무역,
                                    해사, 해외투자 등)
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    영업비밀 보호가 중요한 분야(첨단기술,
                                    방위산업, 엔터테인먼트 등)
                                  </p>
                                </li>
                                <li>
                                  <p class="bul-dot">
                                    일반 대중이 자주 사용하며, 저렴하고 신속한
                                    해결이 필요한 경우 (부동산, 도소매 및 판매,
                                    인테리어, 광고 등)
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">
                        대한법률구조공단 주택•상가건물임대차분쟁조정위원회를
                        방문해서 문제를 해결해보세요
                      </p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img
                              src="/image/sub/counsel/counsel_top_txt_08.png"
                              alt="KCAB"
                            />
                          </span>
                          <span class="txt-box"
                            >1966. 3. 22. 설립된 상설 법정 중재기관으로 국내외
                            상거래에서 발생하는 분쟁을 사전에 예방하고 발생된
                            분쟁을 중재·조정·알선을 통하여 신속하고 공정하게
                            해결함으로써 건전한 상거래 풍토를 조성하고 나아가
                            국가산업경제 발전에 기여하고 있습니다.</span
                          >
                        </NuxtLink>
                      </div>
                    </div>
                    <div
                      id="agency-3"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-3-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-3' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit"
                                >양육비 이행 지원 서비스 소개 안내</strong
                              >
                              <p>
                                양육비 이행 지원 서비스는 양육부·모(양육비
                                채권자)의 신청을 받아 비양육 부·모로부터
                                양육비를 지급받을 수 있도록 당사자 간 협의성립,
                                양육비 관련 소송, 추심, 불이행 시 제재조치 등을
                                지원하는 서비스입니다. 양육부·모(양육비
                                채권자)는 필요한 서비스를 지원받기 위해 각각의
                                단계마다 서비스 제공 기관을 일일이 찾아갈 필요
                                없이 이행관리원에 1회 신청만으로 종합지원
                                서비스가 가능합니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">
                        양육비이행관리원을 방문해서 문제를 해결해보세요
                      </p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img
                              src="/image/sub/counsel/counsel_top_txt_05.png"
                              alt="양육비이행관리원"
                            />
                          </span>
                          <span class="txt-box"
                            >양육비 이행확보에 관한 전문기관으로 양육비
                            법률상담·소송·한시적 양육비 긴급지원 등의 업무를
                            하고 있습니다.</span
                          >
                        </NuxtLink>
                      </div>
                    </div>
                    <div
                      id="agency-4"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-4-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-4' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit">개인회생제도란</strong>
                              <p>
                                총 채무액이 무담보채무의 경우 10억원,
                                담보부채무의 경우 15억원 이하인 개인채무자가
                                장래 계속적 또는 반복적으로 수입을 얻을 가능성이
                                있는 경우에 3년 내지 5년간 일정한 금액을
                                변제하면 나머지 채무의 면제를 받을 수 있는
                                제도입니다.<br />(보증인은 개인회생인가의 효력이
                                없어 채권추심의 대상).
                              </p>
                            </div>
                            <div class="box">
                              <strong class="info-tit">채무상담이란</strong>
                              <p>
                                현재의 소득으로는 본인의 채무를 정상적으로
                                상환할 수 없는 채무자를 대상으로 실질적
                                변제가능성을 고려한 채무 변경(연체이자 감면,
                                원금 일부감면, 상환기간연장 등)을 통하여
                                채무자의 경제적 회생을 지원하는 절차입니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">
                        서민금융복지센터를 방문해서 문제를 해결해보세요
                      </p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img
                              src="/image/sub/counsel/counsel_top_txt_07_01.png"
                              alt="서울금융복지상담센터"
                            />
                          </span>
                          <span class="txt-box"
                            >서울금융복지상담센터는 가계부채 문제를 복지적
                            해법으로 접근하여 금융취약계층 서울시민에게
                            금융·법률·복지를 결합한 원스톱 서비스를 제공해
                            드리고 있으며 금융복지전문 상담관이
                            금융복지종합상담을 도와드리고 있습니다.</span
                          >
                        </NuxtLink>
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img
                              src="/image/sub/counsel/counsel_top_txt_07_02.png"
                              alt="경기도서민금융복지지원센터"
                            />
                          </span>
                          <span class="txt-box"
                            >경기도민의 금융복지 및 가정재무와 관련된
                            상담서비스를 제공하고, 경기도와 지자체 및 정부에서
                            실시하고 있는 복지서비스의 연계를 통해서 서민들의
                            성공적인 경제적 자립과 회생을 지원하는
                            서민금융안전망 역할을 위해 설립된 기관입니다.</span
                          >
                        </NuxtLink>
                      </div>
                    </div>
                    <!-- SB에 추가된 사항 마크업
                    <div
                      id="agency-5"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-5-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-5' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit">신용회복위원회란</strong>
                              <p>일대일 심층 신용상담을 통해 정상적으로 채무를 상환할 수 없는 분들에게는 이자율 인하, 채무감면, 상환기간 연장을 통해 신용회복을 도와드리고, 법원과 업무 연계로 개인회생·파산 신청도 지원하고 있습니다</p>
                              <p>채무조정 이후 성실하게 채무를 상환 중인 분들에게 저리로 긴급생계자금을 지원해 드리며,<br />올바른 신용문화 정착을 위해 다양한 계층을 대상으로 신용교육을 실시하고 있습니다.</p>
                              <p>또한, 신용복지컨설팅으로 채무문제 해결뿐만 아니라 신용도 상승까지 지원하여 서민의 금융 생활 안정에 기여하고 있습니다.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">신용회복위원회을 방문해서 문제를 해결해보세요</p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img src="/image/sub/counsel/counsel_top_txt_06.png" alt="신용회복위원회" />
                          </span>
                          <span class="txt-box">신용회복위원회는 2002년 창립된 채무종합상담기구로, 「서민의 금융생활 지원에 관한 법률」에 의거한 특수법인입니다. 과중한 채무와 신용문제로 어려움을 겪고 계시는 분들에게 신용회복과 경제적 재기를 지원하고 있습니다.</span>
                        </NuxtLink>
                      </div>
                    </div>
                    <div
                      id="agency-6"
                      class="tab-panel"
                      role="tabpanel"
                      aria-labelledby="agency-6-tab"
                      :class="{ 'is-active': activeAgencyTab === 'agency-6' }"
                    >
                      <div class="incidents-info-box">
                        <div class="txt-box">
                          <span class="ico-incidents-info"></span>
                          <div class="info-txt-box">
                            <div class="box">
                              <strong class="info-tit">불법사금융이란</strong>
                              <p>법정최고이자율(연20%)을 초과하여 이자를 수취하는 행위<br />(예) 30만원을 대출하고 일주일 뒤 50만원을 수취하는 경우 연이자율은 3,476.2%으로 법정최고이자율(연20%)을 현저하게 초과하는 행위로서 불법입니다.<br />등록하지 아니한 채 대부(중개)업 광고를 하는 행위<br />폭행, 협박 등을 수반한 불법채권추심 행위<br />대출과 무관한 개인정보 등을 요구하는 행위<br />대출중개수수료를 대부를 받는 거래상대방으로부터 받는 행위</p>
                            </div>
                            <div class="box">
                              <strong class="info-tit">채무자 대리인 및 소송변호사 무료지원 제도</strong>
                              <p>불법사금융 피해자가 법률구조공단 변호사를 채무자 대리인 및 소송대리인으로 선임하여,<br />각종 소송대리 및 법률상담 서비스를 지원받는 제도입니다.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="sub-info-txt">금융감독원을 방문해서 문제를 해결해보세요</p>

                      <div class="agency-link-banner">
                        <NuxtLink to="#" title="새 창 열림" class="link-box">
                          <span class="img-box">
                            <img src="/image/sub/counsel/counsel_top_txt_09.png" alt="금융감독원" />
                          </span>
                          <span class="txt-box">신용회복위원회는 2002년 창립된 채무종합상담기구로, 「서민의 금융생활 지원에 관한 법률」에 의거한 특수법인입니다. 과중한 채무와 신용문제로 어려움을 겪고 계시는 분들에게 신용회복과 경제적 재기를 지원하고 있습니다.</span>
                        </NuxtLink>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 2 Contents -->

            <!-- Step 3 Contents -->
            <div id="step3" class="step-section">
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
                    <CommonButton variants="line-blue" width="md" height="md">
                      구조대상 유형 찾기
                    </CommonButton>
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
                      <BullList type="dot" class="!gap-y-10px">
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          전자접수 신청이 불가능합니다.
                        </li>
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                        </li>
                      </BullList>
                    </div>
                    <div class="btn-box">
                      <CommonButton variants="primary" width="md">
                        면접상담예약 바로가기
                      </CommonButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 3 Contents -->

            <!-- Step 4 Contents -->
            <div id="step4" class="step-section">
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
                    <CommonButton variants="line-blue" width="md" height="md">
                      기준중위소득 확인하기
                    </CommonButton>
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
                  <CommonTable class="mt-10px">
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
                  </CommonTable>
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
                <div class="inner-con-box">
                  <p class="info-txt-ex-mark">
                    <span class="txt"
                      >동일사건으로 중복 접수는 불가합니다.</span
                    >
                  </p>
                </div>
                <div class="inner-con-box">
                  <div class="button-box">
                    <CommonButton variants="line-primary" width="md">
                      전자접수임시저장하기
                    </CommonButton>
                    <CommonButton variants="primary" width="md">
                      전자접수 신청하기
                    </CommonButton>
                  </div>
                </div>
                <div class="inner-con-box">
                  <div class="incidents-info-box">
                    <div class="txt-box">
                      <span class="ico-incidents-info"></span>
                      <BullList type="dot" class="!gap-y-10px">
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          전자접수 신청이 불가능합니다.
                        </li>
                        <li class="!font-normal !text-[14px] lg:!text-[16px]">
                          법률 구조기관에 내방하여 상담하여 주시기 바랍니다.
                        </li>
                      </BullList>
                    </div>
                    <div class="btn-box">
                      <CommonButton variants="primary" width="md">
                        면접상담예약 바로가기
                      </CommonButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //Step 4 Contents -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
