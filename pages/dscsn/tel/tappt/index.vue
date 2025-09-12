<script setup lang="ts">
import { useRoute } from 'vue-router';
import CalendarLayer from '~/components/ui/calendar/calendarLayerNew.vue';
import axios from 'axios';

const route = useRoute();

definePageMeta({
  layout: 'pub2nd'
});

interface instItem {
  name: string;
  no: string;
}

const instNo = route.query.inst;
const inst = ref<instItem>();

if (instNo != undefined && instNo != '') {
  let item = {
    name: '',
    no: instNo
  };
  if (instNo == 'I001000000') {
    item.name = '대한법률구조공단';
  } else if (instNo == 'I002000000') {
    item.name = '한국가정법률상담소';
    item.name = '대한가정법률복지상담원';
  } else if (instNo == 'I004000000') {
    item.name = '홈닥터';
  }

  inst.value = item;
}

const EVENT_TAB_TYPE = {
  TAB1: { name: 'EVENT_TAB1', code: '01', case: '민사, 형사, 행정 등 사건' },
  TAB2: {
    name: 'EVENT_TAB2',
    code: '02',
    case: '이혼, 친권, 양육비, 가족관계 등 가사사건'
  },
  TAB3: { name: 'EVENT_TAB3', code: '03', case: '개인회생, 개인파산사건' },
  TAB4: { name: 'EVENT_TAB4', code: '04', case: '기타 사건' }
} as const;
const AREA_TAB_TYPE = {
  TAB1: 'AREA_TAB1',
  TAB2: 'AREA_TAB2',
  TAB3: 'AREA_TAB3',
  TAB4: 'AREA_TAB4',
  TAB5: 'AREA_TAB5',
  TAB6: 'AREA_TAB6',
  TAB7: 'AREA_TAB7',
  TAB8: 'AREA_TAB8',
  TAB9: 'AREA_TAB9',
  TAB10: 'AREA_TAB10',
  TAB11: 'AREA_TAB11',
  TAB12: 'AREA_TAB12',
  TAB13: 'AREA_TAB13',
  TAB14: 'AREA_TAB14',
  TAB15: 'AREA_TAB15',
  TAB16: 'AREA_TAB16',
  TAB17: 'AREA_TAB17'
} as const;
const TIME_TAB_TYPE = {
  TAB1: { name: 'TIME_TAB1', time: '10:00' },
  TAB2: { name: 'TIME_TAB2', time: '10:20' },
  TAB3: { name: 'TIME_TAB3', time: '10:40' },
  TAB4: { name: 'TIME_TAB4', time: '11:00' },
  TAB5: { name: 'TIME_TAB5', time: '11:20' },
  TAB6: { name: 'TIME_TAB6', time: '11:40' },
  TAB7: { name: 'TIME_TAB7', time: '01:00' },
  TAB8: { name: 'TIME_TAB8', time: '01:20' },
  TAB9: { name: 'TIME_TAB9', time: '01:40' },
  TAB10: { name: 'TIME_TAB10', time: '02:00' },
  TAB11: { name: 'TIME_TAB11', time: '02:20' },
  TAB12: { name: 'TIME_TAB12', time: '02:40' },
  TAB13: { name: 'TIME_TAB13', time: '03:00' },
  TAB14: { name: 'TIME_TAB14', time: '03:20' },
  TAB15: { name: 'TIME_TAB15', time: '03:40' },
  TAB16: { name: 'TIME_TAB16', time: '04:00' },
  TAB17: { name: 'TIME_TAB17', time: '04:20' },
  TAB18: { name: 'TIME_TAB18', time: '04:40' }
} as const;

type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];
type AREA_KEY = (typeof AREA_TAB_TYPE)[keyof typeof AREA_TAB_TYPE];
type TIME_KEY = (typeof TIME_TAB_TYPE)[keyof typeof TIME_TAB_TYPE];

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
  activeTimeTab: TIME_KEY | null;
}

const stateTab = reactive<Reactive>({
  activeEventTab: EVENT_TAB_TYPE.TAB2,
  activeAreaTab: null,
  activeTimeTab: null
});

const area = ref<string>('');

const _onChangeEventTab = (id: EVENT_KEY) => {
  stateTab.activeEventTab = id;
};
const _onChangeAreaTab = (id: AREA_KEY, e: Event) => {
  const target = e.currentTarget as HTMLElement;
  const parent = target.parentNode;
  if (stateTab.activeAreaTab === id) {
    stateTab.activeAreaTab = null;
  } else {
    stateTab.activeAreaTab = id;
  }

  stateTab.activeTimeTab = null;
  nextTick(() => {
    if (!parent) return;
    const heightTarget = parent.querySelector('.sub-area-box') as HTMLElement;
    const height = heightTarget?.querySelector('.sub-area-items')?.clientHeight;
    if (heightTarget) heightTarget.style.height = `${height}px`;
  });
};

const _onChangeTimeTab = (id: TIME_KEY) => {
  const button = document.querySelector(
    `button.time${id.time?.replace(':', '')}`
  );

  if (button?.classList.contains('disabled')) {
    return; // disabled 클래스가 있으면 클릭 무시
  }

  if (stateTab.activeTimeTab === id) {
    stateTab.activeTimeTab = null;
  } else {
    stateTab.activeTimeTab = id;
  }
};

const selectDate = reactive({ selectStartDate: '', selectEndDate: '' });

interface listItem {
  name: string;
  date: string;
}

interface timeItem {
  name: string;
  time: string;
}

const areaList1 = ref<listItem[]>([]);
const areaList2 = ref<listItem[]>([]);
const areaList3 = ref<listItem[]>([]);
const areaList4 = ref<listItem[]>([]);

const clickArea = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLButtonElement;

  area.value = target.textContent ?? '';
  document.querySelectorAll('button.sub-area-item').forEach((button) => {
    button.classList.remove('is-emphasis', 'is-active');
  });
  target.classList.add('is-emphasis', 'is-active');
};

watch(area, (newVal, oldVal) => {
  if (!newVal) return;

  selectDate.selectEndDate = '';
  selectDate.selectStartDate = '';

  areaList1.value = [];
  areaList2.value = [];
  areaList3.value = [];
  areaList4.value = [];
});

watch(selectDate, (val) => {
  const start = new Date(val.selectStartDate);
  const end = new Date(val.selectEndDate);

  areaList1.value = [];
  areaList2.value = [];
  areaList3.value = [];
  areaList4.value = [];

  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, 0);
    const day = String(dt.getDate()).padStart(2, 0);

    const formatted = `${year}-${month}-${day}`;

    const item: listItem = {
      name: area.value,
      date: formatted
    };

    areaList1.value.push(item);
    areaList2.value.push(item);
    areaList3.value.push(item);
    areaList4.value.push(item);
  }
});

const center = ref<listItem>(null);

const clickCenter = async (event: MouseEvent) => {
  // 시간항목 취소선 없애고 다시 클릭할 수 있게 만들기
  // 시간 항목 취소선 없애기
  const liList = document.querySelectorAll('li.result-time-btns-li');

  liList.forEach((li) => {
    const timeTxt = li.querySelector('div.main-txt')?.textContent;

    li.querySelector('button')?.classList.remove('is-active');
    li.querySelector('button')?.classList.remove('disabled');
    li.querySelector('div.main-txt').innerHTML = timeTxt;
  });

  const target = event.currentTarget as HTMLButtonElement;
  const mainTxt = target.querySelector('.main-txt');
  const subTxt = target.querySelector('.sub-txt');

  // 선택한 날짜와 기관 정보를 가지고 스케줄 조회
  const response = await axios.get('/api/schedule-list/inst', {
    params: {
      date: subTxt?.textContent,
      cd: stateTab.activeEventTab.code,
      inst: instNo
    }
  });

  const item = response.data;

  await nextTick();

  // 기관별 조회한 일정을 가져와서 현재 보이는 시간과 같은 시간이 있다면 시간 안보이게 처리
  for (let i = 0; i < item.length; i++) {
    const scheduleList = item[i];

    for (let j = 0; j < scheduleList.length; j++) {
      const schedule = scheduleList[j];
      const scheduleRsvtHr = schedule.rsvtHr;

      // inst 값으로 기관 위치 찾고 rsvtHr로 시간 찾아서 지워야함
      const timeButton = document.querySelector(`button.time${scheduleRsvtHr}`);
      // timeButton.parentElement.classList.add('hide');

      const mainTxt = timeButton.querySelector('div.main-txt');
      const timeTxt = mainTxt.textContent;
      mainTxt.innerHTML = `<del>${timeTxt}</del>`;
      mainTxt?.parentElement.classList.add('disabled');
    }
  }

  // 센터 선택 버튼들을 모두 초기화
  document.querySelectorAll('button.result-group-btn').forEach((btn) => {
    btn.classList.remove('is-active');
  });

  // 클릭한 센터 버튼을 활성화
  target.classList.add('is-active');

  center.value = {
    name: mainTxt?.textContent,
    date: subTxt?.textContent
  };

  // console.log(
  //   `[${inst.value?.name}] ${mainTxt?.textContent} ${subTxt?.textContent}`
  // );
};

const isButtonDisabled = computed(() => {
  return (
    !stateTab.activeEventTab ||
    !stateTab.activeTimeTab ||
    area.value === '' ||
    center.value === null ||
    selectDate.selectStartDate === '' ||
    selectDate.selectEndDate === ''
  );
});
</script>

<!--
순서
1. 사건분류 선택 (반드시 1번이 선택되어있을것)
2. 지역 선택 (아직 우측 기관, 시간 항목이 비어있어야함.)
3. 날짜 선택 (선택 후 기관 리스트가 나와야하고, 시작일 ~ 종료일 내에 영업일이 나타나야함)
4. 기관 선택 (선택 후 시간 선택항목이 나와야함)
-->
<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- <Breadcrumb :showPrintButton="true" /> -->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>전화상담</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button">
                  <span class="text-span"> 뒤로가기 </span></button
                ><button class="btn print-button">
                  <span class="text-span"> 인쇄하기 </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-reservation-box">
          <div class="inner">
            <div class="box-left">
              <div class="select-event-wrap">
                <h4>사건 선택</h4>
                <ul class="select-event-items pc-only">
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type02',
                        EVENT_TAB_TYPE.TAB2.name ===
                          stateTab.activeEventTab.name && 'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB2.name ===
                        stateTab.activeEventTab.name
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB2)"
                    >
                      <div class="tit">
                        이혼, 친권, <br />
                        양육비, 가족관계 <br />
                        등 가사사건
                      </div>
                    </button>
                  </li>
                  <li v-if="instNo == 'I001000000' || instNo == 'I004000000'">
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type01',
                        EVENT_TAB_TYPE.TAB1.name ===
                          stateTab.activeEventTab.name && 'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB1.name ===
                        stateTab.activeEventTab.name
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB1)"
                    >
                      <div class="tit">
                        민사, 형사,<br />
                        행정 등 사건
                      </div>
                    </button>
                  </li>
                  <li v-if="instNo == 'I001000000'">
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type03',
                        EVENT_TAB_TYPE.TAB3.name ===
                          stateTab.activeEventTab.name && 'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB3.name ===
                        stateTab.activeEventTab.name
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB3)"
                    >
                      <div class="tit">
                        개인회생,<br />
                        개인파산사건
                      </div>
                    </button>
                  </li>
                  <li v-if="instNo == 'I001000000' || instNo == 'I004000000'">
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type04',
                        EVENT_TAB_TYPE.TAB4.name ===
                          stateTab.activeEventTab.name && 'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB4.name ===
                        stateTab.activeEventTab.name
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB4)"
                    >
                      <div class="tit">기타 사건</div>
                    </button>
                  </li>
                </ul>
                <a-select
                  id="select"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1"
                    >민사, 형사, 행정등 사건</a-select-option
                  >
                  <a-select-option value="2"
                    >이혼, 친권, 양육비, 가족관계 등 가사사건</a-select-option
                  >
                  <a-select-option value="3"
                    >개인회생, 개인파산사건</a-select-option
                  >
                  <a-select-option value="4">기타 사건</a-select-option>
                </a-select>
              </div>
              <div class="select-area-wrap">
                <h4>지역 선택</h4>
                <ul class="select-area-items pc-only">
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB1, $event)
                      "
                    >
                      <div class="tit">서울</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item is-active">
                            전체
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강남구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강동구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강북구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강서구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            관악구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            광진구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            구로구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            금천구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            노원구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            도봉구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            동대문구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            동작구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            마포구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            서대문구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            서초구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            성동구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            성북구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            송파구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            양천구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            영등포구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            용산구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            은평구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            종로구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            중구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            중랑구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB2, $event)
                      "
                    >
                      <div class="tit">부산</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강서구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            금정구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            기장군
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            남구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            동구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            동래구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            부산진구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            북구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            사상구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            사하구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            서구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            수영구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            연제구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            영도구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            중구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            해운대구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB3, $event)
                      "
                    >
                      <div class="tit">대구</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            군위군
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            남구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            달서구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            달성군
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            동구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            북구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            서구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            수성구
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            중구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB4, $event)
                      "
                    >
                      <div class="tit">인천</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            인천
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB5, $event)
                      "
                    >
                      <div class="tit">광주</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            광주
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB6, $event)
                      "
                    >
                      <div class="tit">대전</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            대전
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB7, $event)
                      "
                    >
                      <div class="tit">울산</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            울산
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB8, $event)
                      "
                    >
                      <div class="tit">세종</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            세종
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB9, $event)
                      "
                    >
                      <div class="tit">경기</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            경기
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB10, $event)
                      "
                    >
                      <div class="tit">강원</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            강원
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB11, $event)
                      "
                    >
                      <div class="tit">충북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            충북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB12, $event)
                      "
                    >
                      <div class="tit">충남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            충남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB13, $event)
                      "
                    >
                      <div class="tit">전북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB14, $event)
                      "
                    >
                      <div class="tit">전남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB15, $event)
                      "
                    >
                      <div class="tit">경북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            경북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB16, $event)
                      "
                    >
                      <div class="tit">경남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            경남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB17, $event)
                      "
                    >
                      <div class="tit">제주</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            전체
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="sub-area-item"
                            @click.prevent="clickArea"
                          >
                            제주
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <a-select
                  id="select2"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1">서울</a-select-option>
                  <a-select-option value="2">경기</a-select-option>
                  <a-select-option value="3">부산</a-select-option>
                  <a-select-option value="4">대구</a-select-option>
                </a-select>
                <a-select
                  id="select3"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1">전체</a-select-option>
                  <a-select-option value="2">강동구</a-select-option>
                  <a-select-option value="3">강서구</a-select-option>
                  <a-select-option value="4">강남구</a-select-option>
                </a-select>
              </div>
            </div>
            <div class="box-right">
              <div class="select-period-wrap">
                <h4 class="sr-only">기간 선택</h4>
                <div class="select-period-result">
                  <div class="period-result-group">
                    <CalendarLayer
                      v-model:select-start-date="selectDate.selectStartDate"
                      v-model:select-end-date="selectDate.selectEndDate"
                    />
                  </div>
                </div>
              </div>
              <div class="select-result-wrap">
                <h4 class="sr-only">선택 결과</h4>
                <!-- <div class="select-result-date">
                  <h5>날짜선택</h5>
                </div> -->
                <div class="select-result-group">
                  <div class="result-group-box">
                    <h5>대한법률구조공단</h5>
                    <ul class="result-group-btns">
                      <li v-for="(item, index) in areaList1" :key="index">
                        <button
                          type="button"
                          class="result-group-btn"
                          @click.prevent="clickCenter"
                        >
                          <div class="main-txt">{{ item.name }}</div>
                          <div class="sub-txt">{{ item.date }}</div>
                        </button>
                      </li>
                    </ul>

                    <h5>대한가정법률복지상담원</h5>
                    <ul class="result-group-btns">
                      <li v-for="(item, index) in areaList2" :key="index">
                        <button
                          type="button"
                          class="result-group-btn"
                          @click.prevent="clickCenter"
                        >
                          <div class="main-txt">{{ item.name }}</div>
                          <div class="sub-txt">{{ item.date }}</div>
                        </button>
                      </li>
                    </ul>

                    <h5>한국가정법률상담소</h5>
                    <ul class="result-group-btns">
                      <li v-for="(item, index) in areaList3" :key="index">
                        <button
                          type="button"
                          class="result-group-btn"
                          @click.prevent="clickCenter"
                        >
                          <div class="main-txt">{{ item.name }}</div>
                          <div class="sub-txt">{{ item.date }}</div>
                        </button>
                      </li>
                    </ul>
                    <h5>법률홈닥터</h5>
                    <ul class="result-group-btns">
                      <li v-for="(item, index) in areaList4" :key="index">
                        <button
                          type="button"
                          class="result-group-btn"
                          @click.prevent="clickCenter"
                        >
                          <div class="main-txt">{{ item.name }}</div>
                          <div class="sub-txt">{{ item.date }}</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="select-result-time">
                  <div class="result-time-box">
                    <h5>시간</h5>
                    <div class="select-txt">
                      <!--                      [대한법률구조공단] 인천지부 2025.04.10-->
                    </div>
                    <strong class="time-tit">오전</strong>
                    <ul class="result-time-btns time1000">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            'time1000',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB1.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB1)"
                        >
                          <div class="main-txt">10:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB2.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time1020'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB2)"
                        >
                          <div class="main-txt">10:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB3.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time1040'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB3)"
                        >
                          <div class="main-txt">10:40</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-time-btns time1100">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB4.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time1100'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB4)"
                        >
                          <div class="main-txt">11:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB5.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time1120'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB5)"
                        >
                          <div class="main-txt">11:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB6.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time1140'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB6)"
                        >
                          <div class="main-txt">11:40</div>
                        </button>
                      </li>
                    </ul>

                    <strong class="time-tit">오후</strong>
                    <ul class="result-time-btns time0120">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB7.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0100'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB7)"
                        >
                          <div class="main-txt">01:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB8.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0120'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB8)"
                        >
                          <div class="main-txt">01:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB9.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0140'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB9)"
                        >
                          <div class="main-txt"><del>01:40</del></div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-time-btns time0200">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB10.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0200'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB10)"
                        >
                          <div class="main-txt">02:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB11.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0220'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB11)"
                        >
                          <div class="main-txt">02:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB12.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0240'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB12)"
                        >
                          <div class="main-txt">02:40</div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-time-btns time0300">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB13.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0300'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB13)"
                        >
                          <div class="main-txt">03:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB14.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0320'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB14)"
                        >
                          <div class="main-txt">03:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB15.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0340'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB15)"
                        >
                          <div class="main-txt">03:40</div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-time-btns time0400">
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB16.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0400'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB16)"
                        >
                          <div class="main-txt">04:00</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB17.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0420'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB17)"
                        >
                          <div class="main-txt">04:20</div>
                        </button>
                      </li>
                      <li class="result-time-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-time-btn',
                            stateTab.activeTimeTab &&
                              TIME_TAB_TYPE.TAB18.name ===
                                stateTab.activeTimeTab.name &&
                              'is-active',
                            'time0440'
                          ]"
                          @click.prevent="_onChangeTimeTab(TIME_TAB_TYPE.TAB18)"
                        >
                          <div class="main-txt">04:40</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="button-box">
          <button
            type="button"
            class="btn type02"
            :disabled="isButtonDisabled"
            @click.prevent="save"
          >
            예약하기</button
          ><button type="button" class="btn type01">예약확인</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/tel/tappt/index.scss';
</style>
