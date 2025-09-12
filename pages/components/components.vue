<script setup lang="ts">
import { ref } from 'vue';
import InputForm from '~/components/ui/input/inputform.vue';
import Identifier from '~/components/ui/footer/identifier.vue';
import Tag from '~/components/ui/tag/tag.vue';
import Spinner from '~/components/ui/spinner/spinner.vue';
import CardA from '~/components/ui/card/cardA.vue';
import CardB from '~/components/ui/card/cardB.vue';
import CardC from '~/components/ui/card/cardC.vue';
import CardDPub from '~/components/ui/card/cardDPub.vue';
import CardD from '~/components/ui/card/cardD.vue';
import SideTabMenu from '~/components/ui/sidemenu/sideTabMenuPub.vue';
import SideToggleMenu from '~/components/ui/sidemenu/sideToggleMenu.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import SearchComb from '~/components/ui/search/searchComb.vue';
import SearchCorr from '~/components/ui/search/searchCorr.vue';
import SearchSort from '~/components/ui/search/searchSort.vue';
import SearchCs from '~/components/ui/search/searchCs.vue';
import Masthead from '~/components/ui/header/masthead.vue';
import CommonAccordionItem from '~/components/ui/accordion/accordionitem.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonAccordion from '~/components/ui/accordion/accordion.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonDropDown from '~/components/ui/dropdown/dropdown.vue';
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import SelectBox from '~/components/ui/selectbox/selectBox.vue';
import CommonPopup from '~/components/ui/popup/popup.vue';
import CommonTableTypeA from '~/components/ui/table/tabletypeA.vue';
import CommonTableTypeB from '~/components/ui/table/tabletypeB.vue';
import CommonTableTypeC from '~/components/ui/table/tabletypeC.vue';
import CommonTableTypeD from '~/components/ui/table/tabletypeD.vue';
import CommonTableTypeE from '~/components/ui/table/tabletypeE.vue';
import CommonTableTypeF from '~/components/ui/table/tabletypeF.vue';
import CommonServiceTab from '~/components/ui/tab/servicedepth.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import DropdownButton from '~/components/ui/dropdown/dropdownbutton.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';

import StepIndicator from '~/pages/components/stepIndicator.vue';
import CalendarLayer from '~/components/ui/calendar/calendarLayer.vue';
import Calendar from '~/components/ui/calendar/calendar.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import TabItemAuto from '~/components/ui/tab/tabItemAuto.vue';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import ModalInnerForm from '~/components/ui/modal/modalInnerForm.vue';
import GnbImg1 from 'assets/image/main/gnb_img1.png';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import CommonTegBedge from '~/components/ui/tag/tagbedge.vue';
import dayjs from 'dayjs';

definePageMeta({
  layout: 'guide'
});

const showPopup = ref(false);
function openPopup() {
  showPopup.value = true;
}

const textAreaData = ref('');
const radioSelected = ref('');
const checkSelected = ref<string[]>([]);
const optSelected1 = ref<string[]>([]);
const optSelected2 = ref<string[]>([]);
const optSelected3 = ref<string[]>([]);
const inputTextData = ref('');
const selectedTab = ref('');
const tabs = ref<Tab[]>([
  { name: 'serviceCont1', label: '서비스 내용' },
  { name: 'serviceCont2', label: '서비스 대상자' }
]);

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '브레드크럼 메뉴타이틀',
  menuitem: [
    { menuid: 1, text: '메뉴1', to: '/test1' },
    { menuid: 2, text: '메뉴2', to: '/test2' },
    { menuid: 3, text: '메뉴3', to: '/test3' },
    { menuid: 4, text: '메뉴3', to: '/test3' },
    { menuid: 6, text: '마지막 메뉴', to: '/test5' }
  ]
};
const dropdownSelected = ref('');
const dropdownOption = ref('');
const dropdownSearch2 = ref({ label: '양육비', number: 1 });
const formTextarea = ref('');

const modalRef = ref<boolean>(false);
const modalRef2 = ref<boolean>(false);
const modalRef3 = ref<InstanceType<typeof InnerForm> | null>(null);
const modalRef4 = ref<boolean>(false);
const modalRef5 = ref<boolean>(false);
const modalRef6 = ref<boolean>(false);
const modalRef7 = ref<boolean>(false);
const showModal = () => {
  modalRef.value?.open();
};
const showModal2 = () => {
  modalRef2.value?.open();
};
const showModal3 = () => {
  modalRef3.value?.open();
};
const showModal4 = () => {
  modalRef4.value?.open();
};
const showModal5 = () => {
  modalRef5.value?.open();
};
const showModal6 = () => {
  modalRef6.value?.open();
};
const showModal7 = () => {
  modalRef7.value?.open();
};

const activeIndex = ref(0);
const tabTitle = ['공지사항', '자주찾는 질문', '시스템 이용 문의', '이용안내'];

const activeMenuIndex = ref(0);
const tabTitle2 = [
  '전체',
  '노동',
  '주택임대차',
  '상가임대차',
  '손해배상',
  '민사일반',
  '물권',
  '채권'
];

const activeIndex3 = ref(0);
const tabTitle3 = ref<MenuCategory[]>([
  {
    title: { tabItem: '법률상담현황', linkUrl: '' },
    subTitle: [
      { item: '상담예약현황', subLink: '/' },
      { item: '사이버상담내역', subLink: '/' }
    ]
  },
  {
    title: { tabItem: '전자접수현황', linkUrl: '/' }
  },
  {
    title: { tabItem: '전자통지', linkUrl: '' },
    subTitle: [
      { item: '상담예약현황', subLink: '/' },
      { item: '사이버상담내역', subLink: '/' }
    ]
  },
  {
    title: { tabItem: '나의서류관리', linkUrl: '/' }
  },
  {
    title: { tabItem: '시스템 문의 내역', linkUrl: '/' }
  },
  {
    title: { tabItem: '회원정보 관리', linkUrl: '' },
    subTitle: [
      { item: '상담예약현황', subLink: '/' },
      { item: '사이버상담내역', subLink: '/' }
    ]
  }
]);
const selectedValues3 = ref<(string | null)[]>(tabTitle3.value.map(() => null));

// onMounted(() => {
//   // setMenuActive(0);
//   // console.log('right-icon slot:', $slots['right-icon']);
// });
const dropdownCategory = ref('');
const dropdownMenuCategory = ref('');
const dropdownTabCategory = ref('');
const dropdownTabCategor2 = ref('');

const page = ref(1);
const size = ref(10);
const changePage = (value) => {
  page.value = value;
};

const isExpanded = ref(false); // panel1
const isExpanded2 = ref(false); // panel2

//test
function handleClick(index: number) {
  console.log('클릭된 숫자 index:', index);
}

//날짜입력 VueDatePicker
const startDt = ref<Date | null>(null);
const endDt = ref<Date | null>(null);

// 포맷 문자열 (VueDatePicker 옵션에도 사용)
const displayFormat = 'yyyy-MM-dd';

// 날짜 변경 핸들러
const onStartDateChange = (val: Date | null) => {
  if (val) {
    console.log('시작일:', dayjs(val).format('YYYY-MM-DD'));
  }
};

const onEndDateChange = (val: Date | null) => {
  if (val) {
    console.log('종료일:', dayjs(val).format('YYYY-MM-DD'));
  }
};
</script>

<template>
  <section class="container">
    <article>
      <h2 class="common-title">공식 배너 (Masthead)</h2>
      <div class="content">
        <header class="site-header">
          <div class="header-first-wrap">
            <div class="container">
              <masthead />
            </div>
          </div>
        </header>
      </div>
    </article>

    <article>
      <h2 class="common-title">운영기관 식별자(Identifier)</h2>
      <div class="content">
        <footer>
          <Identifier />
        </footer>
      </div>
    </article>

    <article>
      <h2 class="common-title">Icons</h2>
      <div class="content">
        <div
          class="pb-center"
          style="
            background-color: #d9d9d9;
            align-items: flex-end;
            flex-wrap: wrap;
          "
        >
          <!--  icon 옵션 아이콘명(name) , 사이즈(width,height)-->
          <Icon name="home" />
          <Icon name="print" />
          <Icon name="plus" />
          <Icon name="arrowRight" :width="15" :height="24" />
          <Icon name="shortcut" />
          <Icon name="shortcutBlue" />
          <Icon name="shortcutWhite" />
          <Icon name="downloadAtt" />
          <Icon name="downloadArea" />
          <Icon name="notice" />
          <Icon name="refreshBlue" :width="30" :height="30" />
          <Icon name="login" />
          <Icon name="logout" />
          <Icon name="join" />
          <Icon name="mypage" />
          <Icon name="customerService" />
          <Icon name="refreshDark" />
          <Icon name="voice" />
        </div>
      </div>
    </article>
    <article>
      <h2 class="common-title">bull-list</h2>
      <div class="content">
        <!--
      type
      1.number
       number-style
        -period 1.
        -encode ①
        -circle circleStyle
      2.dot
       dot-style
        -blue dot background
      3. refMark
        - ※ remark
      -->
        <BullList type="number" number-style="period">
          <li>
            <strong>비대면 법률구조 신청</strong>: 법률구조기관사무실을 직접
            찾아가거나 우편을 이용하는 번거로움 없이, 시간과 장소에 구애받지
            않고 인터넷 접속이 가능한 곳 어디에서든 법률구조 지원을 신청할 수
            있습니다.
          </li>
          <li>
            <strong>공식적인 절차 시작</strong>: 단순히 법률 정보를 검색하는
            것을 넘어, 사용자의 구체적인 사건에 대해
            <strong
              >법률구조기관의 공식적인 검토와 실제적인 법률구조 지원(예: 소송
              구조 결정 심사) 절차 진행을 요청하는 공식적인 신청 행위</strong
            >입니다.
          </li>
        </BullList>
        <BullList type="number" number-style="encode">
          <li>
            생활보호법이 정한 보호대상자인 경우 : 시・읍・면・동장의
            생활보호대상자증명서
          </li>
          <li>생계가 곤란한 자인 경우 : 재산상태를 확인할 수 있는 서류</li>
        </BullList>
        <BullList type="number" number-style="circle">
          <li><strong>가족관계 :</strong> 배우자, 부모, 동거 중인 형제자매</li>
          <li><strong>가족관계 :</strong> 배우자, 부모, 동거 중인 형제자매</li>
        </BullList>
        <BullList type="dot">
          <li>법률구조 전자접수란</li>
        </BullList>
        <BullList type="refMark">
          <li class="blue">법률구조 전자접수란</li>
        </BullList>
      </div>
    </article>
    <article>
      <h2 class="common-title">Button</h2>
      <div class="content">
        <div
          class="pb-center"
          style="
            align-items: flex-end;
            flex-wrap: wrap;
            background-color: #fff;
            flex-direction: column;
          "
        >
          <!--
          1.type (기본 button),submit, reset"
          2. disabled
          3. ButtonGroup align 정렬 위치 지정 - left, right,center ,center-right(가운데 및 오른쪽)
          4. title - 버튼 타이틀,
          5. variants 버튼 스타일- primary,line-primary, gray,
          6. 아이콘 정렬 - #icon-left 아이콘 왼쪽 정렬, #icon-right 아이콘 오른쪽 정렬
          7. to 링크 걸면 NextLink로 변환
          -->
          <!--
           width-size
           xs= 90px, sm= 100px, sm-1= 110px, md= 150px, lg= 180px, xl= 260, xxl= 315px,
           height-size
           sm = 28px, md= 40px,
           font-size
           sm= 13px, md=15px
            -->

          <CommonButton
            variants="line-primary"
            width="sm"
            height="sm"
            title="면접상담"
            fontsize="sm"
            to="/"
            target="_blank"
          >
            NextLink
            <template #right-icon>
              <Icon name="shortcutBlue" />
            </template>
          </CommonButton>
          <CommonButton
            variants="line-primary"
            width="sm"
            height="sm"
            title="화상상담"
            fontsize="sm"
            to="/"
          >
            NextLink
            <template #right-icon>
              <Icon name="shortcutBlue" />
            </template>
          </CommonButton>

          <CommonButton variants="primary" width="full" title="로그인">
            로그인
          </CommonButton>

          <CommonButton
            variants="line-primary"
            width="sm"
            height="sm"
            title="수정"
            fontsize="sm"
          >
            수정
          </CommonButton>
          <CommonButton
            variants="line-blue"
            width="lg"
            height="md"
            title="건강보험 납입조회"
          >
            건강보험 납입조회
          </CommonButton>

          <CommonButton variants="line-black" width="sm" title="상담취소">
            상담취소
          </CommonButton>

          <ButtonGroup align="left">
            <CommonButton
              variants="line-primary"
              width="md"
              height="md"
              title="이번만 허용"
            >
              이번만 허용
            </CommonButton>
            <CommonButton
              variants="line-primary"
              width="md"
              height="md"
              title="방문할 때마다 허용"
            >
              방문할 때마다 허용
            </CommonButton>
            <CommonButton
              variants="line-primary"
              width="md"
              height="md"
              title="허용 안 함"
            >
              허용 안 함
            </CommonButton>
          </ButtonGroup>

          <ButtonGroup align="right">
            <CommonButton variants="primary" width="sm" title="목록으로">
              목록으로
            </CommonButton>
          </ButtonGroup>

          <ButtonGroup align="right">
            <CommonButton variants="primary" width="sm-1" title="확인">
              확인
            </CommonButton>
          </ButtonGroup>

          <ButtonGroup align="right">
            <CommonButton variants="primary" width="sm-1" title="우편번호 찾기">
              우편번호 찾기
            </CommonButton>
          </ButtonGroup>

          <ButtonGroup align="center-right" title="취소">
            <CommonButton width="xs"> 취소 </CommonButton>
            <CommonButton
              variants="primary"
              width="sm-1"
              disabled="disabled"
              title="회원정보 수정"
            >
              회원정보 수정
            </CommonButton>
            <CommonButton variants="line-primary" width="xs" title="회원탈퇴">
              회원탈퇴
            </CommonButton>
          </ButtonGroup>

          <ButtonGroup align="right">
            <CommonButton width="xs" height="md"> 취소 </CommonButton>
            <CommonButton variants="primary" width="xs" height="md">
              제출
            </CommonButton>
          </ButtonGroup>

          <a-space :size="[8, 8]" wrap>
            <CommonButton @click="handleClick(1)" variants="primary">
              다운로드
            </CommonButton>
            <CommonButton @click="handleClick(2)">
              자세히 보기
              <template #right-icon>
                <Icon name="arrowRight" />
              </template>
            </CommonButton>
            <CommonButton @click="handleClick(3)">
              관련기관 바로가기
              <template #right-icon>
                <Icon name="plus" />
              </template>
            </CommonButton>
            <CommonButton @click="handleClick(4)">
              홈페이지 바로가기
              <template #right-icon>
                <Icon name="shortcut" />
              </template>
            </CommonButton>
            <CommonButton @click="handleClick(5)">
              <template #left-icon>
                <Icon name="downloadAtt" />
              </template>
              다운로드
            </CommonButton>
            <CommonButton @click="handleClick(6)" variants="primary">
              <template #left-icon>
                <Icon name="shortcutWhite" />
              </template>
              바로보기
            </CommonButton>
            <CommonButton height="sm"> 뒤로가기 </CommonButton>
          </a-space>
        </div>
      </div>
    </article>
    <article>
      <h2 class="common-title">Form</h2>
      <div class="content">
        <div class="bg-white">
          <!-- 컴포넌트X  단순 layout 입니다 파일안에 태그 그대로 가져다 쓰시면 됩니다 -->
          <InputForm />
        </div>
      </div>
    </article>
    <article>
      <h2 class="common-title">Input Text</h2>
      <div class="content">
        <label for="ipText">
          <span class="sr-only">Input Text</span>
        </label>
        <a-input
          id="ipText"
          class="text-bx"
          placeholder="여기에 입력하세요!!"
          v-model:value="inputTextData"
        />
      </div>
    </article>
    <article>
      <h2 class="common-title">라디오 버튼 (Radio button)</h2>
      <div class="content">
        <a-radio-group v-model:value="radioSelected">
          <a-radio class="radio-bx" value="1">Sponsor</a-radio>
          <a-radio class="radio-bx" value="2">Venue</a-radio>
        </a-radio-group>
        <p class="test-input">선택된 값: {{ radioSelected }}</p>
      </div>
    </article>
    <article>
      <h2 class="common-title">체크박스 (Checkbox)</h2>
      <div class="content">
        <a-checkbox-group v-model:value="checkSelected">
          <a-checkbox class="check-bx" value="soccer" name="type"
            >soccer</a-checkbox
          >
          <a-checkbox class="check-bx" value="basketall" name="type"
            >basketall</a-checkbox
          >
          <a-checkbox class="check-bx" value="tennis" name="type"
            >tennis</a-checkbox
          >
        </a-checkbox-group>
        <p class="test-input">선택된 값 : {{ checkSelected }}</p>
      </div>
    </article>
    <article>
      <h2 class="common-title">Input Text</h2>
      <div class="content">
        <label for="textMessage">
          <span class="sr-only">textarea</span>
        </label>
        <a-textarea
          class="textarea-bx"
          id="textMessage"
          placeholder="최대 200자 입력 가능"
          :maxlength="200"
          v-model:value="formTextarea"
        />
      </div>
    </article>

    <article>
      <h2 class="common-title">태그 (Tag)-antd style</h2>
      <div class="content">
        <a-space :size="[8, 8]" wrap>
          <Tag tagName="유형 : 법률·판례·소송 일반정보" />
          <Tag tagName="법률·판례·소송 일반정보" />
          <Tag tagName="법률·판례·소송 일반정보2" />
        </a-space>
      </div>
    </article>
    <article>
      <h2 class="common-title">셀렉트 (Select) - antd style</h2>
      <div class="content">
        <div class="pb-center">
          <label for="select">
            <span class="sr-only">선택</span>
          </label>
          <a-select id="select" class="common-select" placeholder="선택">
            <a-select-option value="1">선택 1</a-select-option>
            <a-select-option value="2">선택 2</a-select-option>
          </a-select>
          <!--          <SelectBox />-->
        </div>
      </div>
    </article>
    <article>
      <h2 class="common-title">스피너 (Spinner)</h2>
      <div class="content">
        <spinner />
      </div>
    </article>
    <article>
      <h2 class="common-title">날짜 입력 필드(vue3 기본컴포넌트)</h2>
      <div class="content">
        <div class="bg-white">
          <div style="display: flex; flex-direction: column">
            <div class="date-picker__group">
              <VueDatePicker
                name="writePeriodStart"
                id="write-period-start"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="startDt"
                locale="ko"
                :enable-time-picker="false"
                :format="displayFormat"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="시작일 선택"
                hide-input-icon
                @update:model-value="onStartDateChange"
              />
              <span class="more-span">~</span>
              <VueDatePicker
                name="writePeriodEnd"
                id="write-period-end"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="endDt"
                locale="ko"
                :enable-time-picker="false"
                :format="displayFormat"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="마지막날 선택"
                hide-input-icon
                @update:model-value="onEndDateChange"
              />
            </div>
          </div>
        </div>
      </div>
    </article>

    <article>
      <h2 class="common-title">건너뛰기 링크(Skip link)</h2>
      <div class="content">
        <div id="skip-nav" class="skip-nav">
          <a href="#container">본문 바로가기</a>
        </div>
      </div>
    </article>

    <article>
      <h2 class="common-title">구조화 목록 (Structured list)</h2>
      <div class="content">
        <div class="bg-white">
          <h3 class="common-title__sub-sm">서비스</h3>
          <!--UI분류 서비스CardA, 기관CardB, 사례CardC, 서식CardD -->
          <div class="card-list">
            <CardA
              title="서비스 제목1"
              textLine="3"
              content="ddfdfdfdf"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
            />
            <CardA
              title="서비스 제목2"
              textLine="3"
              badge="지부단독"
              content="콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
            />
            <CardA
              title="서비스 제목3"
              textLine="3"
              content="콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
            />
            <CardA
              title="서비스 제목4"
              textLine="3"
              content="ddfdfdfdf"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
            />
          </div>

          <h3 class="common-title__sub-sm">기관</h3>
          <div class="card-list">
            <CardB
              title="기관 이름"
              textLine="4"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="제공서비스"
              dlDd="제공서비스 목록, 제공서비스 목록, 제공서비스 목록, 제공서비스 목록"
            />
          </div>

          <h3 class="common-title__sub-sm">사례</h3>
          <div class="card-list">
            <CardC
              title="대법원“부부가 공동으로 진ㅅㄷㅌㅅ "
              badge="기관사례"
              textLine="2"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="작성일"
              dlDd="2025-00-00"
              dlDt2="조회수"
              dlDd2="1000"
            />
            <CardC
              title="신용회복지원 신청 및 채무 조정합의서(군복무자 및 입대예정자용)"
              badge="기관사례"
              textLine="2"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="작성일"
              dlDd="2025-00-00"
              dlDt2="조회수"
              dlDd2="1000"
            />
          </div>

          <h3 class="common-title__sub-sm">서식</h3>
          <div class="card-list">
            <!-- 컴포넌트X  단순 layout 입니다 파일안에 태그 그대로 가져다 쓰시면 됩니다 -->
            <CardDPub />
          </div>
        </div>
      </div>
    </article>

    <article>
      <h2 class="common-title">사이드 메뉴</h2>
      <div class="content">
        <ul class="bg-white" style="padding-bottom: 50px">
          <li>
            <h3 style="font-size: 16px; padding-bottom: 20px">
              기본형에 1depth 타이틀 표시 필요할때
            </h3>
            <SideToggleMenu title="서비스 제공기관">
              <ul class="side-menu__list">
                <li class="side-menu__item menu-all">
                  <router-link to="/" class="active" title="경제적 취약계층(34)"
                    >전체(34)</router-link
                  >
                </li>
                <li class="side-menu__item">
                  <router-link to="/" class="active" title="경제적 취약계층(34)"
                    >경제적 취약계층(34)
                  </router-link>
                </li>
                <li class="side-menu__item">
                  <router-link to="/" title="경제적 취약계층(34)"
                    >경제적 취약계층(34)
                  </router-link>
                </li>
              </ul>
            </SideToggleMenu>
          </li>
          <li>
            <h3 style="font-size: 16px; padding: 20px 0">
              탭메뉴 노출 될 경우
            </h3>
            <SideTabMenu :tabs="tabs" v-model:activeTab="selectedTab">
              <template #serviceCont1>
                <!-- UI 컨텐츠 추가 -->
                <ul class="side-menu__list">
                  <li class="side-menu__item">
                    <router-link
                      to="/"
                      class="active"
                      title="경제적 취약계층(34)"
                      >법률·판례·소송 일반정보(13)
                    </router-link>
                  </li>
                  <li class="side-menu__item">
                    <router-link to="/" title="경제적 취약계층(34)"
                      >경제적 취약계층(34)
                    </router-link>
                  </li>
                </ul>
                <!--// UI 컨텐츠 추가 -->
              </template>
              <template #serviceCont2>
                <!-- UI 컨텐츠 추가 -->
                <ul class="side-menu__list">
                  <li class="side-menu__item">
                    <router-link
                      to="/"
                      class="active"
                      title="경제적 취약계층(34)"
                      >법률·판례·소송 일반정보(13)
                    </router-link>
                  </li>
                  <li class="side-menu__item">
                    <router-link to="/" title="경제적 취약계층(34)"
                      >경제적 취약계층(34)
                    </router-link>
                  </li>
                  <li class="side-menu__item">
                    <router-link to="/" title="범죄/재해/환경 피해자(19)"
                      >범죄/재해/환경 피해자(19)
                    </router-link>
                  </li>
                </ul>
                <!--// UI 컨텐츠 추가 -->
              </template>
            </SideTabMenu>
          </li>
        </ul>
      </div>
    </article>

    <article>
      <h2 class="common-title">검색창/옵션</h2>
      <div class="content">
        <div
          class="bg-white pb-center"
          style="flex-direction: column; gap: 20px; padding: 20px"
        >
          <!-- 검색 모두 컴포넌트X  단순 layout 입니다 파일안에 태그 그대로 가져다 쓰시면 됩니다 -->
          <SearchComb />
          <SearchCorr />
          <SearchSort />
          <SearchCs />
        </div>
      </div>
    </article>

    <article>
      <h2 class="common-title">맥락적 도움말 (Contextual help)</h2>
      <div class="content">
        <a-space :size="[8, 8]" wrap>
          <CommonButton
            variants="line-primary"
            width="md"
            height="md"
            tooltipId="tooltip-btn1"
            tooltipText="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이 적용됩니다."
          >
            버튼
          </CommonButton>
          <CommonButton
            variants="primary"
            width="md"
            height="md"
            tooltipId="tooltip-btn2"
            tooltipText="컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."
          >
            검색
          </CommonButton>
        </a-space>
        <a-space :size="[8, 8]" wrap>
          <!--          <CommonTooltip-->
          <!--            textTitle="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이 적용됩니다.1"-->
          <!--            placement="bottom"-->
          <!--            class="btn-basic primary"-->
          <!--          >-->
          <!--            버튼명-->
          <!--          </CommonTooltip>-->
          <!--          <CommonTooltip-->
          <!--            textTitle="컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."-->
          <!--            :disabled="true"-->
          <!--            class="btn-basic primary"-->
          <!--          >-->
          <!--            검색-->
          <!--          </CommonTooltip>-->
          <!--          <CommonTooltip-->
          <!--            textTitle="여기가 내용 컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."-->
          <!--            class="btn-basic primary"-->
          <!--            id="testId"-->
          <!--          >-->
          <!--            초기화-->
          <!--          </CommonTooltip>-->
        </a-space>
      </div>
    </article>

    <article>
      <h2 class="common-title">제목</h2>
      <div class="content">
        <div class="pb-center" style="flex-direction: column">
          <!-- 컴포넌트 X 추후삭제
           <h1 class="common-title">페이지 타이틀</h1>
          <h2 class="common-title__sub">콘텐츠 타이틀1</h2>
          <h3 class="common-title__sub-sm">콘텐츠 타이틀2</h3>
          <h4 class="common-title__tb">테이블 타이틀3</h4>
          <h5 class="common-text">본문4</h5>
          <h6 class="common-text__sub">디테일6</h6>
          <span class="common-text__error">검색,오류6</span>
          <h4 class="title-heading-1 bar">h4 - title-heading-1</h4>
          <h4 class="title-heading-1 circle">h4 - title-heading-1</h4>
          <h5 class="title-heading-2 dot">h5 - title-heading-2</h5>
          -->

          <!--
          타이틀 컴포넌트
          옵션:
          1. tag(감싸는 태그 지정)
          2. size(font-size 없으면 기본 28px)  1= 21px, 2=18px, 3=16px, 4=15px, 5=14px
          3. type 타이틀 앞에 아이콘 스타일 'bar','circle','dot'
          -->

          <CommonTitle tag="h4">컴포넌트 대제목입니다</CommonTitle>
          <CommonTitle tag="h4" size="1">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="2">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="3">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="4">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="5">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h4">타이틀 앞에 아이콘 있는경우</CommonTitle>
          <CommonTitle tag="h3" size="2" type="circle"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h4" size="3" type="circle"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h3" size="2" type="bar"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h4" size="3" type="bar"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h5" size="2" type="dot"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h2" size="2" type="arrow"
            >컴포넌트 중간 제목</CommonTitle
          >
        </div>
      </div>
    </article>

    <article>
      <h1 class="common-title">페이지네이션</h1>
      <div class="content">
        <CommonPagenation
          :page="page"
          :size="size"
          :total-elements="100"
          :show-pagination-count="10"
          @change="changePage"
        />
      </div>
    </article>

    <article>
      <h1 class="common-title">모달</h1>
      <div class="content">
        <!--        <ul style="margin-bottom: 30px">-->
        <!--          <li>modal-click-button-text : 모달 버튼 텍스트</li>-->
        <!--          <li>modal-header-text : 모달 헤더 제목 텍스트</li>-->
        <!--          <li>-->
        <!--            modal-width : 모달 width 크기 지정 숫자만 지정시 px로 계산됨-->
        <!--            :modal-width로 사용시 number, modal-width로 사용시 string-->
        <!--          </li>-->
        <!--          <li>모달 내용은 slot로 하여 내용을 만들 수 있도록 지정</li>-->
        <!--        </ul>-->
        <!--        <CommonModal-->
        <!--          modal-click-button-text="모달"-->
        <!--          modal-header-text="모달 헤더 제목"-->
        <!--          modal-width="440px"-->
        <!--          ok-text="확인"-->
        <!--          cancel-text="취소"-->
        <!--        >-->
        <!--          <div class="undefined-box">모달내용</div>-->
        <!--        </CommonModal>-->
        <a-space :size="[8, 8]" wrap>
          <button type="button" class="btn-basic primary" @click="showModal">
            <span class="text">모바일 full size</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal7">
            <span class="text">height full size</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal2">
            <span class="text">아이디 찾기 결과</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal3">
            <span class="text">비밀번호 재설정</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal4">
            <span class="text">모달 컴포넌트 primary</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal5">
            <span class="text">모달 컴포넌트 record</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal6">
            <span class="text">모달 컴포넌트 bgNone</span>
          </button>
        </a-space>
        <!--
        modal 옵션
        1. title : 헤더 타이틀
        2. :width : 모달 가로창 사이즈
        3. type : 모달 해더 색상 primary,record,bgNone
        4. 모바일에서 컨텐츠 내용 화면 full size 일때 :full="true"
        5. 컨텐츠 내용 화면 height 가 full size 일때 :hFull="true"
         -->
        <CommonModal
          ref="modalRef"
          title="모달 타이틀 모바일에서 full size 일때"
          :full="true"
        >
          <div>
            대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나
            결정이 필요하거나 여러 작업을 포함할 수 있습니다.
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
          <template #footer>
            <CommonButton
              variants="gray"
              width="md"
              height="md"
              @click="modalRef?.close()"
            >
              취소
            </CommonButton>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              type="submit"
              @click="open?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <CommonModal
          ref="modalRef7"
          title="모달 타이틀  height full size 일때"
          :hFull="true"
        >
          <div>
            대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나
            결정이 필요하거나 여러 작업을 포함할 수 있습니다.
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
          <template #footer>
            <CommonButton
              variants="gray"
              width="md"
              height="md"
              @click="modalRef7?.close()"
            >
              취소
            </CommonButton>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              type="submit"
              @click="open?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>

        <!-- 아이디 찾기 결과 -->
        <CommonModal ref="modalRef2" title="아이디 찾기 결과22">
          <div>
            <p class="text-msg">회원님의 아이디 정보 입니다.</p>
            <div class="user-info__result">
              <dl>
                <dt>아이디</dt>
                <dd>hong1988</dd>
              </dl>
              <div class="info-text">
                회원가입을 진심으로 축하드립니다. 법률구조플랫폼에서 제공하는
                회원서비스를 자유롭게 이용하실 수 있습니다.
              </div>
            </div>
          </div>
          <template #footer>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              @click="modalRef2?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <!-- 비밀번호 재설정 레이아웃 컴포넌트는 <CommonModal>만 해당-->
        <ModalInnerForm ref="modalRef3" />
        <CommonModal
          ref="modalRef4"
          :width="800"
          title="대화기록"
          type="primary"
        >
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              @click="modalRef4?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <CommonModal ref="modalRef5" type="record">
          <template #title>
            <h2 class="main-title">비밀번호 재설정</h2>
            <span class="sub-title"
              >영문+숫자+특수문자 조합으로 입력해 주세요</span
            >
          </template>
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              @click="modalRef5?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <CommonModal
          ref="modalRef6"
          type="bgNone"
          title="주소 검색"
          :width="320"
        >
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              @click="modalRef6?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
      </div>
    </article>

    <article>
      <h1 class="common-title">badge</h1>
      <div class="content">
        <ul style="margin-bottom: 30px">
          <li>
            , size="1" 1, 2... 사이즈 지정 type=gary 회색 배경, type 없으면 기본
            스타일
          </li>
        </ul>
        <a-space :size="[8, 8]" wrap>
          <CommonBadge tag-badge-text="채무조정/금융복지 > 채무조정 및 지원" />
          <CommonBadge tag-badge-text="대한법률구조공단" />
          <CommonBadge tag-badge-text="공지" size="2" />
          <CommonBadge tag-badge-text="지부단독" size="1" type="gray" />
          <CommonBadge tag-badge-text="상담완료" size="1" />
          <CommonBadge tag-badge-text="내방안함" size="1" type="color-l-pink" />
          <CommonBadge tag-badge-text="절차교시" size="1" type="color-mint" />
          <CommonBadge tag-badge-text="심사중" size="1" type="color-gray" />
        </a-space>
      </div>
    </article>

    <article>
      <h1 class="common-title">breadcrumb</h1>
      <div class="content">
        <ul style="margin-bottom: 30px">
          <li>브레드크럼은 최대 4개까지 표시가 되며 5개부터는 ...이 된다.</li>
        </ul>
        <CommonBreadCrumb
          :breadcrumb-title="breadcrumbMenuItem.menutitle"
          :showPrintButton="true"
          :breadcrumbItems="breadcrumbMenuItem.menuitem"
        />
      </div>
    </article>

    <article>
      <h1 class="common-title">Tab</h1>
      <div class="content">
        <div class="bg-white">
          <CommonTabs :platform-tab-show="true">
            <CommonTabItem title="탭제목 11"> 1 </CommonTabItem>
            <CommonTabItem title="탭제목 11"> 2 </CommonTabItem>
            <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
          </CommonTabs>

          <CommonTabs :platform-none-width-tab-show="true">
            <CommonTabItem title="글자가 큰 제목">
              탭 안 내용1
              <CommonTabs :platform-two-depth-tab-show="true">
                <CommonTabItem title="탭 안의 탭을 사용할때(플랫폼안내용)">
                  1
                </CommonTabItem>
                <CommonTabItem title="플랫폼 안내용 탭"> 2 </CommonTabItem>
                <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
              </CommonTabs>
            </CommonTabItem>
            <CommonTabItem title="글자가 작은 제목"> 2 </CommonTabItem>
            <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
          </CommonTabs>

          <h2 class="common-title__sub">탭 버튼 유형1</h2>
          <div class="common-category__button">
            <div class="btn-select__wrap mo-visible">
              <DropdownBasic
                class="select-type"
                v-model="dropdownCategory"
                label="공지 사항"
              >
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('공지 사항')"
                      @keydown.enter.prevent="select('공지 사항')"
                    >
                      공지 사항
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('자주찾는 질문')"
                      @keydown.enter.prevent="select('자주찾는 질문')"
                    >
                      자주찾는 질문
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('시스템 이용 문의')"
                      @keydown.enter.prevent="select('시스템 이용 문의')"
                    >
                      시스템 이용 문의
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('이용안내')"
                      @keydown.enter.prevent="select('이용안내')"
                    >
                      이용안내
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
            <div class="btn-tab__wrap-gap pc-visible">
              <TabItemAuto
                v-for="(tabItem, index) in tabTitle"
                :key="index"
                :modelValue="activeIndex === index"
                @update:modelValue="activeIndex = index"
                @click="handleClick(index)"
                >{{ tabItem }}</TabItemAuto
              >
            </div>
          </div>

          <h2 class="common-title__sub">탭 버튼 유형2</h2>
          <div class="common-category__button">
            <div class="btn-select__wrap mo-visible">
              <DropdownBasic
                class="menu-type"
                v-model="dropdownMenuCategory"
                label="전체"
              >
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('전체')"
                      @keydown.enter.prevent="select('전체')"
                    >
                      전체
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('노동')"
                      @keydown.enter.prevent="select('노동')"
                    >
                      노동
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('주택임대차')"
                      @keydown.enter.prevent="select('주택임대차')"
                    >
                      주택임대차
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('상가임대차')"
                      @keydown.enter.prevent="select('상가임대차')"
                    >
                      상가임대차
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
            <div class="btn-tab__wrap pc-visible">
              <TabItemAuto
                v-for="(tabItem, index) in tabTitle2"
                :key="index"
                :modelValue="activeMenuIndex === index"
                @update:modelValue="activeMenuIndex = index"
                @click="handleClick(index)"
                >{{ tabItem }}</TabItemAuto
              >
            </div>
          </div>

          <h2 class="common-title__sub">탭 버튼 유형3</h2>
          <div class="common-category__button">
            <div class="btn-tab__wrap-gap pc-visible">
              <DropdownTab
                class="tab-type"
                v-for="(tabItem, index) in tabTitle3"
                :label="tabItem.title.tabItem"
                :to="tabItem.title.linkUrl"
                :btnSelected="activeIndex3 === index"
                :key="index"
                :modelValue="selectedValues3[index]"
                :hasList="
                  Array.isArray(tabItem.subTitle) && tabItem.subTitle.length > 0
                "
                @update:modelValue="(val) => (selectedValues3[index] = val)"
                @click="() => (activeIndex3 = index)"
              >
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      v-for="(sub, subIndex) in tabItem.subTitle"
                      :key="subIndex"
                      @click="select(sub.item)"
                      @keydown.enter.prevent="select(sub.item)"
                    >
                      <nuxt-link :to="sub.subLink">
                        {{ sub.item }}
                      </nuxt-link>
                    </li>
                  </ul>
                </template>
              </DropdownTab>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article>
      <h1 class="common-title">Accordion</h1>
      <div class="content">
        <!--     옵션 variant= gary-->
        <CommonAccordion>
          <CommonAccordionItem key="1" header="아코디언 타이틀">
            <a-collapse accordion>
              <a-collapse-panel key="1-1-1" header="2뎁스 A">
                내용입니다.1-1-1
              </a-collapse-panel>
              <a-collapse-panel key="1-1-2" header="2뎁스 B">
                내용입니다. 1-1-2
              </a-collapse-panel>
            </a-collapse>
          </CommonAccordionItem>
          <CommonAccordionItem key="2" header="아코디언 타이틀">
            내용입니다2.
          </CommonAccordionItem>
          <CommonAccordionItem key="3" header="아코디언 타이틀">
            내용입니다3.
          </CommonAccordionItem>
        </CommonAccordion>
      </div>
    </article>

    <article>
      <h1 class="common-title">Table</h1>
      <h2 class="common-title__sub">사례(카테고리없음)</h2>
      <div class="content">
        <!-- 컴포넌트X  단순 layout 입니다 파일안에 <CommonTable class="pc-visible"> 태그 그대로 가져다 쓰시면 됩니다 -->
        <CommonTableTypeA />
        <h2 class="common-title__sub">사례(카테고리있음)</h2>
        <CommonTableTypeB />

        <h2 class="common-title__sub">
          서식 (다운로드 버튼 없이 아이콘만 있음)
        </h2>
        <CommonTableTypeC />
        <h2 class="common-title__sub">서식 (다운로드 버튼과 아이콘)</h2>
        <CommonTableTypeD />
        <h2 class="common-title__sub">공지사항,자주찾는질문</h2>
        <CommonTableTypeE />
        <h2 class="common-title__sub">마이페이지 나의문의내역</h2>
        <CommonTableTypeF />
        <!--// 컴포넌트X  단순 layout 입니다 파일안에 <CommonTable class="pc-visible"> 태그 그대로 가져다 쓰시면 됩니다 -->
      </div>
    </article>

    <article>
      <h1 class="common-title">DropDown</h1>
      <div class="content">
        <h2 class="common-title__sub">테이블 검색</h2>
        <!--        <CommonDropDown-->
        <!--          :platform-table-drop-down-show="true"-->
        <!--          dropClickButtonText="목록 선택"-->
        <!--          :dropDownItems="[-->
        <!--            { key: '0', label: '10개씩 보기' },-->
        <!--            { key: '1', label: '20개씩 보기' },-->
        <!--            { key: '2', label: '30개씩 보기' }-->
        <!--          ]"-->
        <!--        />-->
        <div class="dropdown-area">
          <label for="dropdown">
            <span class="sr-only">검색 기준 선택</span>
          </label>
          <DropdownBasic
            class="select-type"
            v-model="dropdownOption"
            label="목록 선택"
          >
            <template #default="{ select }">
              <ul role="menu">
                <li
                  role="menuitem"
                  tabindex="0"
                  @click="select('10개씩 보기')"
                  @keydown.enter.prevent="select('10개씩 보기')"
                >
                  10개씩 보기
                </li>
                <li
                  role="menuitem"
                  tabindex="0"
                  @click="select('20개씩 보기')"
                  @keydown.enter.prevent="select('20개씩 보기')"
                >
                  20개씩 보기
                </li>
                <li
                  role="menuitem"
                  tabindex="0"
                  @click="select('30개씩 보기')"
                  @keydown.enter.prevent="select('30개씩 보기')"
                >
                  30개씩 보기
                </li>
              </ul>
            </template>
          </DropdownBasic>
        </div>

        <h2 class="common-title__sub">서비스</h2>
        <!--        <CommonDropDown-->
        <!--          :platform-service-drop-down-show="true"-->
        <!--          :platform-service-icon-show="true"-->
        <!--          dropClickButtonText="기관 관련 페이지"-->
        <!--          :dropDownItems="[-->
        <!--            { key: '0', label: '대표홈페이지' },-->
        <!--            { key: '1', label: '법률홈닥터' },-->
        <!--            { key: '2', label: '마을변호사' }-->
        <!--          ]"-->
        <!--        />-->
        <DropdownButton
          class="button-type"
          v-model="dropdownSelected"
          label="기관 관련 페이지"
        >
          <template #default="{ select }">
            <ul role="menu">
              <li
                role="menuitem"
                tabindex="0"
                @click="select('대표홈페이지')"
                @keydown.enter.prevent="select('대표홈페이지')"
              >
                대표홈페이지
                <img
                  src="/image/sub/service/shortcut_blue.svg"
                  alt="바로가기"
                  class="shortcut"
                />
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="select('법률홈닥터')"
                @keydown.enter.prevent="select('법률홈닥터')"
              >
                법률홈닥터
                <img
                  src="/image/sub/service/shortcut_blue.svg"
                  alt="바로가기"
                  class="shortcut"
                />
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="select('마을변호사')"
                @keydown.enter.prevent="select('마을변호사')"
              >
                마을변호사
                <img
                  src="/image/sub/service/shortcut_blue.svg"
                  alt="바로가기"
                  class="shortcut"
                />
              </li>
            </ul>
          </template>
        </DropdownButton>

        <h2 class="common-title__sub">메인 인기검색어</h2>
        <!--        <CommonDropDown-->
        <!--          :platform-main-hit-search-drop-down-show="true"-->
        <!--          dropClickButtonText="양육비"-->
        <!--          :dropDownItems="[-->
        <!--            { key: '0', label: '양육비' },-->
        <!--            { key: '1', label: '법률' },-->
        <!--            { key: '2', label: '양육비를 왜 주어야 하나요?' }-->
        <!--          ]"-->
        <!--        />-->

        <DropdownBasic class="search-type" v-model="dropdownSearch2">
          <template #default="{ select }">
            <ul role="menu">
              <li
                role="menuitem"
                tabindex="0"
                @click="select({ label: '양육비', number: '1' })"
                @keydown.enter.prevent="
                  select({ label: '양육비', number: '1' })
                "
              >
                <span class="num-span">1</span>
                양육비
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="select({ label: '법률', number: '2' })"
                @keydown.enter.prevent="select({ label: '법률', number: '2' })"
              >
                <span class="num-span">2</span>
                법률
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="
                  select({ label: '양육비를 왜 주어야 하나요?', number: '3' })
                "
                @keydown.enter.prevent="
                  select({ label: '양육비를 왜 주어야 하나요?', number: '3' })
                "
              >
                <span class="num-span">3</span>
                양육비를 왜 주어야 하나요?
              </li>
            </ul>
          </template>
        </DropdownBasic>
      </div>
    </article>

    <article>
      <h1 class="common-title">Popup</h1>
      <div class="content">
        <a-button
          class="btn-basic primary"
          @click="
            () => {
              openPopup();
            }
          "
          >팝업</a-button
        >
        <CommonPopup
          popup-header-title-text="팝업"
          popup-width="900px"
          v-model:isVisible="showPopup"
        >
          내용입니다만.
        </CommonPopup>
      </div>
    </article>
    <article>
      <h1 class="common-title">service tab slide</h1>
      <div class="content">
        <CommonServiceTab />
      </div>
    </article>
    <article>
      <h1 class="common-title">단계 표시기</h1>
      <div class="content">
        <div class="bg-white">
          <StepIndicator />
        </div>
      </div>
    </article>
    <article>
      <h1 class="common-title">DatePicker calendars</h1>
      <div class="content">
        <div class="bg-white" style="background-color: #f5f5f9 !important">
          <h2 class="common-title__sub">Calendar 레이어</h2>
          <CalendarLayer />

          <h2 class="common-title__sub">Calendar 페이지</h2>
          <Calendar />
        </div>
      </div>
    </article>
    <article>
      <h1 class="common-title">ETC</h1>
      <div class="content">
        <div class="bg-white">
          <h2 class="common-title__sub">만족도 조사</h2>
          <!-- 컴포넌트X  단순 layout 입니다 파일안에 태그 그대로 가져다 쓰시면 됩니다 -->
          <inputSatisfaction />

          <h2 class="common-title__sub">panel 유형 1</h2>
          <div class="common-panel__area" :class="{ active: isExpanded }">
            <div class="panel-toggle__btn mo-visible">
              <button type="button" @click="isExpanded = !isExpanded">
                {{ isExpanded ? '조건 접기' : ' 조건 펼치기' }}
              </button>
            </div>
            <div class="panel-content">
              <div class="button-wrap">
                <span class="bx">
                  <input type="checkbox" class="hidden-item" id="chk1" />
                  <label for="chk1">법률·판례·소송 일반정보</label>
                </span>
                <span class="bx">
                  <input type="checkbox" class="hidden-item" id="chk2" />
                  <label for="chk2">법률상담 및 소송지원</label>
                </span>
                <span class="bx">
                  <input type="checkbox" class="hidden-item" id="chk3" />
                  <label for="chk3">채무조정/ 금융복지</label>
                </span>
                <span class="bx">
                  <input type="checkbox" class="hidden-item" id="chk4" />
                  <label for="chk4">임대차/ 전세사기</label>
                </span>
                <span class="bx">
                  <input type="checkbox" class="hidden-item" id="chk5" />
                  <label for="chk5">임금체불</label>
                </span>
              </div>
              <div class="check-wrap">
                <a-checkbox class="check-bx" value="1" name="type"
                  >범죄피해자 지원 일반</a-checkbox
                >
                <a-checkbox class="check-bx" value="2" name="type"
                  >가정폭력/성폭력/아동학대</a-checkbox
                >
                <a-checkbox class="check-bx" value="3" name="type"
                  >학교폭력피해자 무료법률구조</a-checkbox
                >
                <a-checkbox class="check-bx" value="4" name="type"
                  >가상자산투자피해자 무료법률구조</a-checkbox
                >
              </div>
            </div>
          </div>

          <h2 class="common-title__sub">panel 유형 2</h2>
          <div
            class="common-panel__area result-edge"
            :class="{ active: isExpanded2 }"
          >
            <div class="panel-toggle__btn mo-visible">
              <button type="button" @click="isExpanded2 = !isExpanded2">
                {{ isExpanded2 ? '옵션 접기' : ' 옵션 펼치기' }}
              </button>
            </div>
            <div class="panel-content">
              <CommonTable type="default" class="sch-tb">
                <caption>
                  기타 항목의 기관, 결과 내 재검색, 선택한 검색 조건 옵션 선택
                  표
                </caption>
                <colgroup>
                  <col style="width: 14%" />
                  <col style="width: 86%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">기관</th>
                    <td>
                      <a-checkbox-group
                        v-model:value="optSelected1"
                        class="check-group"
                      >
                        <a-checkbox class="check-bx" value="soccer" name="type"
                          >법률구조관리공단</a-checkbox
                        >
                        <a-checkbox
                          class="check-bx"
                          value="basketall"
                          name="type"
                          >한국가정법률상담소</a-checkbox
                        >
                      </a-checkbox-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">사례 구분</th>
                    <td>
                      <div class="chk-bx">
                        <div class="bx">
                          <a-checkbox-group
                            v-model:value="optSelected2"
                            class="check-group"
                          >
                            <a-checkbox
                              class="check-bx"
                              value="soccer"
                              name="opt2"
                              >전체</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="basketall"
                              name="opt2"
                              >대법원 전자민원서식</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="tennis"
                              name="opt2"
                              >대한법률구조 공단서식</a-checkbox
                            >
                          </a-checkbox-group>
                        </div>
                        <div class="bx">
                          <a-checkbox-group
                            v-model:value="optSelected3"
                            class="check-group"
                          >
                            <a-checkbox
                              class="check-bx"
                              value="soccer"
                              name="opt3"
                              >soccer</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="basketall"
                              name="opt3"
                              >basketall</a-checkbox
                            >
                            <a-checkbox
                              class="check-bx"
                              value="tennis"
                              name="opt3"
                              >tennis</a-checkbox
                            >
                          </a-checkbox-group>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">결과내 재검색</th>
                    <td>
                      <div class="research-bx__td">
                        <input type="text" class="input-search" />
                        <button
                          type="button"
                          class="btn-sch"
                          title="검색"
                        ></button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">선택한 검색 조건</th>
                    <td>
                      <a-space :size="[0, 8]" wrap class="tag-bx">
                        <Tag tagName="기관 : 법률구조관리공단" />
                        <Tag tagName="법률·판례·소송 일반정보" />
                        <Tag tagName="검색어 : 지급" />
                      </a-space>
                      <ButtonGroup align="center">
                        <CommonButton
                          variants="primary"
                          width="md"
                          height="md"
                          tooltipId="tooltip-sch__btn1"
                          tooltipText="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이 적용됩니다."
                          >검색</CommonButton
                        >

                        <CommonButton
                          variants="line-primary"
                          width="md"
                          height="md"
                          tooltipId="tooltip-sch__btn2"
                          tooltipText="여기가 내용 컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."
                        >
                          초기화

                          <template #right-icon
                            ><Icon name="refreshBlue"
                          /></template>
                        </CommonButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </CommonTable>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.container {
  article {
    & > .common-title {
      font-size: 20px;
      color: #1d1d1d;
      font-weight: 700;
      padding: 60px 0 30px;
    }
    .common-title__sub {
      padding: 30px 0 20px;
    }
    .common-title__sub-sm {
      padding: 30px 0 0px;
    }
  }
  .content {
    padding: 40px;
    border-radius: 20px;
    background-color: #f8f8f8;
    .bg-white {
      background-color: #fff;
      padding: 30px;
    }
    .pb-center {
      display: flex;
      gap: 15px;
      padding: 50px 0;
      justify-content: center;
      & [class^='common-title'] {
        & + [class^='common-title'] {
          padding: 0;
        }
      }
    }
    .test-input {
      margin-top: 15px;
    }
  }
}
</style>
