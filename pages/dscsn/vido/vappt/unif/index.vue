<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumbNew.vue';
import CalendarNew from '~/components/ui/calendar/calendarNew.vue';
import axios from 'axios';
import { useLoginStore } from '~/stores/login';
import debounce from 'lodash.debounce';
import CalendarLayer from '~/components/ui/calendar/calendarLayer.vue';
import { type Ref, ref } from 'vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonButton from '~/components/ui/button/button.vue';
import type { DscsnRsvtDtInVO } from '~/types/dscsn/rsvt';
import type { IFHrChcDescVO } from '~/types/dscsn/rsvt';

const { showAlert } = useCustomAlert();

const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);

definePageMeta({
  layout: 'pub2nd'
});

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

type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];

interface inst {
  no: string;
  name: string;
}

const instList = ref<inst[]>([
  { no: 'I001000000', name: '대한법률복지공단' },
  { no: 'I002000000', name: '한국가정법률상담소' },
  { no: 'I003000000', name: '대한가정법률복지상담원' },
  { no: 'I004000000', name: '대한변협법률구조공단' }
]);

const times = ref<string[]>([
  '10:00',
  '10:20',
  '10:40',
  '11:00',
  '11:20',
  '11:40',
  '01:00',
  '01:20',
  '01:40',
  '02:00',
  '02:20',
  '02:40',
  '03:00',
  '03:20',
  '03:40',
  '04:00',
  '04:20',
  '04:40'
]);

const timeList1 = ref<selectTimeList[]>([]); //10:00
const timeList2 = ref<selectTimeList[]>([]); //10:20
const timeList3 = ref<selectTimeList[]>([]); //10:40
const timeList4 = ref<selectTimeList[]>([]); //11:00
const timeList5 = ref<selectTimeList[]>([]); //11:20
const timeList6 = ref<selectTimeList[]>([]); //11:40

const timeList7 = ref<selectTimeList[]>([]); //13:00
const timeList8 = ref<selectTimeList[]>([]); //13:20
const timeList9 = ref<selectTimeList[]>([]); //13:40
const timeList10 = ref<selectTimeList[]>([]); //14:00
const timeList11 = ref<selectTimeList[]>([]); //14:20
const timeList12 = ref<selectTimeList[]>([]); //14:40
const timeList13 = ref<selectTimeList[]>([]); //15:00
const timeList14 = ref<selectTimeList[]>([]); //15:20
const timeList15 = ref<selectTimeList[]>([]); //15:40
const timeList16 = ref<selectTimeList[]>([]); //16:00
const timeList17 = ref<selectTimeList[]>([]); //16:20
const timeList18 = ref<selectTimeList[]>([]); //16:40

const selectDateString = ref<string>('');

const selectedTabCode = ref<string>('01');

const selectDate = ref<string>('');
// const selectedRange = ref<[string, string] | null>(null);

const selectTime = ref<string>('');

const selectInst = ref<inst>(null);

interface selectTimeList {
  inst_no: string;
  inst_name: string;
  time: string;
}

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
}

const stateTab = reactive<Reactive>({
  activeEventTab: EVENT_TAB_TYPE.TAB1
});

const _onChangeEventTab = (id: EVENT_KEY) => {
  stateTab.activeEventTab = id;
  selectedTabCode.value = id.code;
};

const _onChangeTime = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLButtonElement;
  const mainTxt = target.querySelector('.main-txt');
  const subTxt = target.querySelector('.sub-txt');
  const subTxtContent = subTxt?.textContent;
  document.querySelectorAll('.result-group-btn').forEach((button) => {
    button.classList.remove('is-active');
  });

  target.classList.add('is-active');
  selectTime.value = mainTxt?.textContent;

  let instNo = '';

  if (subTxtContent == '대한법률복지공단') {
    instNo = 'I001000000';
  } else if (subTxtContent == '한국가정법률상담소') {
    instNo = 'I002000000';
  } else if (subTxtContent == '대한가정법률복지상담원') {
    instNo = 'I003000000';
  } else if (subTxtContent == '대한변협법률구조재단') {
    instNo = 'I004000000';
  }

  const item = {
    no: instNo,
    name: subTxtContent
  };

  selectInst.value = item;
};

watch(
  selectDate,
  (newVal) => {
    if (newVal) {
      selectSchedule(newVal);
      // const selectYear = newVal.split('-')[0];
      // const selectMonth = newVal.split('-')[1];
      // const selectDay = newVal.split('-')[2];
      //
      // selectDateString.value = `${selectYear}년 ${selectMonth}월 ${selectDay}일`;
    }
  },
  { immediate: true }
);

let latestCallId = 0;

const selectSchedule = async (newVal) => {
  const currentCallId = ++latestCallId;

  // 1. 안보이는 시간 다 보이게 처리하고 현재 선택했던 시간 선택 해제
  timeList1.value = [];
  timeList2.value = [];
  timeList3.value = [];
  timeList4.value = [];
  timeList5.value = [];
  timeList6.value = [];
  timeList7.value = [];
  timeList8.value = [];
  timeList9.value = [];
  timeList10.value = [];
  timeList11.value = [];
  timeList12.value = [];
  timeList13.value = [];
  timeList14.value = [];
  timeList15.value = [];
  timeList16.value = [];
  timeList17.value = [];
  timeList18.value = [];

  // 2. 일정에 따른 기관 예약 조회
  // const response = await axios.get('/api/schedule-list/all', {
  //   params: {
  //     date: newVal,
  //     cd: stateTab.activeEventTab.code
  //   }
  // });
  //
  // if (currentCallId !== latestCallId) {
  //   return;
  // }

  iFHrChcDescVO.value.dscsnSeCd = '2'; // DSCSN_SE_CD (1:면접, 2:화상)
  iFHrChcDescVO.value.orgCd = '';
  iFHrChcDescVO.value.resvFrDt = selectDate.value
    .replace('-', '')
    .replace('-', '');
  iFHrChcDescVO.value.resvToDt = selectDate.value
    .replace('-', '')
    .replace('-', '');

  //상담소
  const resLhm = axios
    .get('/api/dscsn/rsvt/selectLhmHrChcList', {
      params: iFHrChcDescVO.value
    })
    .then((res) => console.log('IF-LHM-002 :: ', res.data));

  //상담원
  const resLqa = axios
    .get('/api/dscsn/rsvt/selectLqaHrChcList', {
      params: iFHrChcDescVO.value
    })
    .then((res) => console.log('IF-LQA-002 :: ', res.data));

  if (currentCallId !== latestCallId) {
    return;
  }

  const item = await resLhm.data;

  for (let i = 0; i < times.value.length; i++) {
    const time = times.value[i];

    for (let j = 0; j < instList.value.length; j++) {
      const instData = instList.value[j];

      const listItem = {
        inst_no: instData.no,
        inst_name: instData.name,
        time: time
      };

      switch (time) {
        case '10:00':
          timeList1.value.push(listItem);
          break;
        case '10:20':
          timeList2.value.push(listItem);
          break;
        case '10:40':
          timeList3.value.push(listItem);
          break;
        case '11:00':
          timeList4.value.push(listItem);
          break;
        case '11:20':
          timeList5.value.push(listItem);
          break;
        case '11:40':
          timeList6.value.push(listItem);
          break;
        case '01:00':
          timeList7.value.push(listItem);
          break;
        case '01:20':
          timeList8.value.push(listItem);
          break;
        case '01:40':
          timeList9.value.push(listItem);
          break;
        case '02:00':
          timeList10.value.push(listItem);
          break;
        case '02:20':
          timeList11.value.push(listItem);
          break;
        case '02:40':
          timeList12.value.push(listItem);
          break;
        case '03:00':
          timeList13.value.push(listItem);
          break;
        case '03:20':
          timeList14.value.push(listItem);
          break;
        case '03:40':
          timeList15.value.push(listItem);
          break;
        case '04:00':
          timeList16.value.push(listItem);
          break;
        case '04:20':
          timeList17.value.push(listItem);
          break;
        case '04:40':
          timeList18.value.push(listItem);
          break;
      }
    }
  }

  await nextTick();

  // 기관별 조회한 일정을 가져와서 현재 보이는 시간과 같은 시간이 있다면 시간 안보이게 처리
  for (let i = 0; i < item.length; i++) {
    const scheduleList = item[i];

    for (let j = 0; j < scheduleList.length; j++) {
      const schedule = scheduleList[j];
      const instNo = schedule.instNo;
      const instNm = schedule.instNm;
      const rsvtHr = schedule.rsvtHr;

      // inst 값으로 기관 위치 찾고 rsvtHr로 시간 찾아서 지워야함
      const timeButton = document.querySelectorAll(`button.time${rsvtHr}`);

      if (instNo === 'I001000000') {
        timeButton[0].parentElement.classList.add('hide');
      } else if (instNo === 'I002000000') {
        timeButton[1].parentElement.classList.add('hide');
      } else if (instNo === 'I003000000') {
        timeButton[2].parentElement.classList.add('hide');
      } else if (instNo === 'I004000000') {
        timeButton[3].parentElement.classList.add('hide');
      }
    }
  }
};

/**
 * name : iFHrChcDescVO
 * desc : 시간선택 목록 조회 파라미터 ref
 */
const iFHrChcDescVO: Ref<IFHrChcDescVO> = ref({
  dscsnSeCd: '',
  orgCd: '',
  resvFrDt: '',
  resvToDt: ''
});

const save = async () => {
  // 상담소
  const lhmDupYn = axios
    .get('/api/dscsn/rsvt/selectLhmDupYn', {
      params: {
        dscsnSeCd: '2' //화상상담
      }
    })
    .then((res) => console.log('IF-LHM-001 결과 :: ', res.data.lhmDupYn));

  // 상담원
  const lqaDupYn = axios
    .get('/api/dscsn/rsvt/selectLqaDupYn', {
      params: {
        dscsnSeCd: '2' //화상상담
      }
    })
    .then((res) => console.log('IF-LQA-001 결과 :: ', res.data.lqaDupYn));

  // await showAlert({
  //   icon: 'info',
  //   html: `IF-LHM-001 결과 : ${lhmDupYn.data.resLhmData}`,
  //   showCancelButton: false,
  //   confirmButtonText: '확인'
  // });
  //
  // await showAlert({
  //   icon: 'info',
  //   html: `IF-LQA-001 결과 : ${lqaDupYn.data.resLqaData}`,
  //   showCancelButton: false,
  //   confirmButtonText: '확인'
  // });

  // const response = await axios.get('/api/schedule-doppler-check', {
  //   params: {
  //     cd: stateTab.activeEventTab.code,
  //     inst: selectInst.value.no
  //   }
  // });
  // if (response.data == 'success') {
  //   // 중복 없음
  //   showAlert({
  //     icon: 'info',
  //     html: `${selectInst.value.name} ${selectDateString.value} ${stateTab.activeAreaTab.time} 으로 예약을 신청하셨습니다.<br/>개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야 예약이 완료됩니다.`,
  //     confirmButtonText: '확인'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       alert('상담신청 페이지 이동');
  //     }
  //   });
  // } else if (response.data == 'check') {
  //   // 다른 기관, 같은 사건 중복
  //   showAlert({
  //     icon: 'info',
  //     html: `${selectInst.value.name} ${selectDateString.value} ${stateTab.activeAreaTab.time} 으로 예약을 신청하셨습니다.<br/>개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야 예약이 완료됩니다.<br/>아울러 다른 기관에도 예약을 신청 하신 내역이 있습니다. 동일사안 중복 상담의 경우 최종적으로 예약이 거절될 수 있습니다.`,
  //     confirmButtonText: '확인'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       alert('상담신청 페이지 이동');
  //     }
  //   });
  // } else if (response.data == 'login') {
  //   showAlert({
  //     icon: 'error',
  //     html: `로그인이 필요합니다.`,
  //     confirmButtonText: '확인'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       alert('로그인 페이지 이동');
  //     }
  //   });
  // } else {
  //   // 같은 기관, 같은 사건 중복
  //   showAlert({
  //     icon: 'error',
  //     html: `해당 상담기관에 이미 상담예약건이 존재합니다.<br/>상담예약은 동일기관에 중복으로 신청할 수 없습니다.`,
  //     confirmButtonText: '확인'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       alert('정지');
  //     }
  //   });
  // }
};

const check = async () => {
  const authenticated = auth?.value.authenticated;

  if (authenticated) {
    alert('마이페이지 > 상담예약으로 이동');
  } else {
    alert('로그인 페이지로 이동');
  }
};

const isButtonDisabled = computed(() => {
  return (
    !stateTab.activeEventTab ||
    selectDate.value === '' ||
    selectTime.value === ''
  );
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :breadcrumb-title="'화상상담'"
          :show-print-button="true"
          :breadcrumb-items="[
            { text: '법률상담' },
            { text: '화상상담', active: true }
          ]"
        />
        <!--퍼블리싱용 Breadcrumb-->
        <!--        <h2 class="sr-only">본문 내용 시작</h2>-->
        <!--        <div class="breadcrumb-title-box">-->
        <!--          <div class="title-box">-->
        <!--            <h3>화상상담</h3>-->
        <!--          </div>-->
        <!--          <div class="breadcrumb-box">-->
        <!--            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">-->
        <!--              <ol class="breadcrumb">-->
        <!--                &lt;!&ndash; 홈 아이템 &ndash;&gt;-->
        <!--                <li class="breadcrumb-item home-item">홈</li>-->

        <!--                <li class="breadcrumb-item text-item">법률상담</li>-->

        <!--                <li class="breadcrumb-item text-item active">화상상담</li>-->
        <!--                &lt;!&ndash; 브레드크럼 항목 렌더링 &ndash;&gt;-->
        <!--              </ol>-->
        <!--              <div class="btns-breadcrumb">-->
        <!--                <button class="btn prev-button">-->
        <!--                  <span class="text-span"> 뒤로가기 </span></button-->
        <!--                ><button class="btn print-button">-->
        <!--                  <span class="text-span"> 인쇄하기 </span>-->
        <!--                </button>-->
        <!--              </div>-->
        <!--            </nav>-->
        <!--          </div>-->
        <!--        </div>-->
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
                  <li>
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
                  <li>
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
            </div>
            <div class="box-right">
              <div
                class="select-period-wrap"
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                "
              >
                <h4 class="sr-only">기간 선택</h4>
                <!--                <div class="select-period-result" style="width: 100%">-->
                <!--                  <CalendarLayer v-model="selectedRange" />-->
                <!--                </div>-->
                <!--                <CommonButton-->
                <!--                  variants="primary"-->
                <!--                  width="xs"-->
                <!--                  @click="selectHrChcList"-->
                <!--                  >조회</CommonButton-->
                <!--                >-->
              </div>

              <div class="select-result-wrap">
                <h4 class="sr-only">선택 결과</h4>
                <div class="select-result-date">
                  <h5>날짜선택</h5>
                  <CalendarNew
                    v-model="selectDate"
                    :eventTab="selectedTabCode"
                  />
                </div>
                <div class="select-result-group">
                  <div class="result-group-box">
                    <h5>시간선택</h5>
                    <strong class="time-tit">오전</strong>
                    <ul class="result-group-btns time1000">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList1"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1000"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">10:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-group-btns time1020">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList2"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1020"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">10:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time1040">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList3"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1040"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">10:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time1100">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList4"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1100"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">11:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time1120">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList5"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1120"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">11:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time1140">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList6"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time1140"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">11:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>

                    <strong class="time-tit">오후</strong>
                    <ul class="result-group-btns time0100">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList7"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0100"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">01:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0120">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList8"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0120"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">01:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0140">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList9"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0140"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">01:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0200">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList10"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0200"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">02:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0220">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList11"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0220"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">02:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0240">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList12"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0240"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">02:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0300">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList13"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0300"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">03:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0320">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList14"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0320"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">03:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0340">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList15"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0340"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">03:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0400">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList16"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0400"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">04:00</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0420">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList17"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0420"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">04:20</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0440">
                      <li
                        class="result-group-btns-li"
                        v-for="(item, index) in timeList18"
                        :key="index"
                      >
                        <button
                          type="button"
                          class="result-group-btn time0440"
                          @click.prevent="_onChangeTime"
                        >
                          <div class="main-txt">04:40</div>
                          <div class="sub-txt">{{ item.inst_name }}</div>
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
            @click="save"
          >
            예약하기
          </button>
          <button type="button" class="btn type01" @click="check">
            예약확인
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/vido/vappt/vcslt.scss';
</style>
