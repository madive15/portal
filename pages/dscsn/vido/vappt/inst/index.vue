<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumbNew.vue';
import { useRoute } from 'vue-router';
import CalendarNew from '~/components/ui/calendar/calendarNew.vue';
import axios from 'axios';
import { useLoginStore } from '~/stores/login';

const route = useRoute();
const { showAlert } = useCustomAlert();

const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);
const instNo = route.query.inst;

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

const AREA_TAB_TYPE = {
  TAB1: { name: 'AREA_TAB1', time: '10:00' },
  TAB2: { name: 'AREA_TAB2', time: '10:20' },
  TAB3: { name: 'AREA_TAB3', time: '10:40' },
  TAB4: { name: 'AREA_TAB4', time: '11:00' },
  TAB5: { name: 'AREA_TAB5', time: '11:20' },
  TAB6: { name: 'AREA_TAB6', time: '11:40' },
  TAB7: { name: 'AREA_TAB7', time: '01:00' },
  TAB8: { name: 'AREA_TAB8', time: '01:20' },
  TAB9: { name: 'AREA_TAB9', time: '01:40' },
  TAB10: { name: 'AREA_TAB10', time: '02:00' },
  TAB11: { name: 'AREA_TAB11', time: '02:20' },
  TAB12: { name: 'AREA_TAB12', time: '02:40' },
  TAB13: { name: 'AREA_TAB13', time: '03:00' },
  TAB14: { name: 'AREA_TAB14', time: '03:20' },
  TAB15: { name: 'AREA_TAB15', time: '03:40' },
  TAB16: { name: 'AREA_TAB16', time: '04:00' },
  TAB17: { name: 'AREA_TAB17', time: '04:20' },
  TAB18: { name: 'AREA_TAB18', time: '04:40' }
} as const;

type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];
type AREA_KEY = (typeof AREA_TAB_TYPE)[keyof typeof AREA_TAB_TYPE];

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
}

const stateTab = reactive<Reactive>({
  activeEventTab: EVENT_TAB_TYPE.TAB2,
  activeAreaTab: null
});

const selectedTabCode = ref<string>('01');
const _onChangeEventTab = (id: EVENT_KEY) => {
  stateTab.activeEventTab = id;
  selectedTabCode.value = id.code;
};
const _onChangeAreaTab = (id: AREA_KEY) => {
  const button = document.querySelector(
    `button.time${id.time?.replace(':', '')}`
  );
  if (button?.classList.contains('disabled')) {
    return; // disabled 클래스가 있으면 클릭 무시
  }

  if (stateTab.activeAreaTab === id) {
    stateTab.activeAreaTab = null;
  } else {
    stateTab.activeAreaTab = id;
  }
};

const inst = ref<string>('');
if (route.query.inst != undefined && route.query.inst != '') {
  inst.value = route.query.inst;
}

const selectDate = ref<string>('');

watch(selectDate, (newVal) => {
  selectSchedule(newVal);
  const selectYear = newVal.split('-')[0];
  const selectMonth = newVal.split('-')[1];
  const selectDay = newVal.split('-')[2];

  selectDateString.value = `${selectYear}년 ${selectMonth}월 ${selectDay}일`;

  stateTab.activeAreaTab = null;
});

const selectSchedule = async (newVal) => {
  // 1. 안보이는 시간 다 보이게 처리하고 현재 선택했던 시간 선택 해제
  const liList = document.querySelectorAll('li.result-group-btns-li');
  liList.forEach((li) => {
    const timeTxt = li.querySelector('div.main-txt')?.textContent;

    li.classList.remove('hide');
    li.querySelector('button')?.classList.remove('is-active');
    li.querySelector('button')?.classList.remove('disabled');
    li.querySelector('div.main-txt').innerHTML = timeTxt;
  });

  // 2. 일정에 따른 기관 예약 조회
  const response = await axios.get('/api/schedule-list/inst', {
    params: {
      date: newVal,
      cd: stateTab.activeEventTab.code,
      inst: inst.value
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
};

const selectDateString = ref<string>('');

const save = async () => {
  // 중복여부 체크 후 다른 얼럿을 띄워야함.
  // 중복은 기관은 동일할 필요 없이 같은 사건으로 있기만 하면 중복체크

  const response = await axios.get('/api/schedule-doppler-check', {
    params: {
      cd: stateTab.activeEventTab.code,
      inst: inst.value
    }
  });

  if (response.data == 'success') {
    // 중복 없음
    showAlert({
      icon: 'info',
      html: `${selectDateString.value} ${stateTab.activeAreaTab.time} 으로 예약을 신청하셨습니다.<br/>개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야 예약이 완료됩니다.`,
      confirmButtonText: '확인'
    }).then((result) => {
      if (result.isConfirmed) {
        alert('상담신청 페이지 이동');
      }
    });
  } else if (response.data == 'check') {
    // 다른 기관, 같은 사건 중복
    showAlert({
      icon: 'info',
      html: `${selectInst} ${selectDateString.value} ${stateTab.activeAreaTab.time} 으로 예약을 신청하셨습니다.<br/>개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야 예약이 완료됩니다.<br/>아울러 다른 기관에도 예약을 신청 하신 내역이 있습니다. 동일사안 중복 상담의 경우 최종적으로 예약이 거절될 수 있습니다.`,
      confirmButtonText: '확인'
    }).then((result) => {
      if (result.isConfirmed) {
        alert('상담신청 페이지 이동');
      }
    });
  } else if (response.data == 'login') {
    showAlert({
      icon: 'error',
      html: `로그인이 필요합니다.`,
      confirmButtonText: '확인'
    }).then((result) => {
      if (result.isConfirmed) {
        alert('로그인 페이지 이동');
      }
    });
  } else {
    // 같은 기관, 같은 사건 중복
    showAlert({
      icon: 'error',
      html: `해당 상담기관에 이미 상담예약건이 존재합니다.<br/>상담예약은 동일기관에 중복으로 신청할 수 없습니다.`,
      confirmButtonText: '확인'
    }).then((result) => {
      if (result.isConfirmed) {
        alert('정지');
      }
    });
  }
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
    !stateTab.activeAreaTab ||
    selectDate.value === ''
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
            </div>
            <div class="box-right">
              <div class="select-period-wrap">
                <h4 class="sr-only">기간 선택</h4>
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
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            'time1000',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB1.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB1)"
                        >
                          <div class="main-txt">10:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB2.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time1020'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB2)"
                        >
                          <div class="main-txt">10:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB3.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time1040'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB3)"
                        >
                          <div class="main-txt">10:40</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time1100">
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB4.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time1100'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB4)"
                        >
                          <div class="main-txt">11:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB5.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time1120'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB5)"
                        >
                          <div class="main-txt">11:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB6.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time1140'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB6)"
                        >
                          <div class="main-txt">11:40</div>
                        </button>
                      </li>
                    </ul>

                    <strong class="time-tit">오후</strong>
                    <ul class="result-group-btns time0120">
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB7.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0100'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB7)"
                        >
                          <div class="main-txt">01:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB8.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0120'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB8)"
                        >
                          <div class="main-txt">01:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB9.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0140'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB9)"
                        >
                          <div class="main-txt">01:40</div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-group-btns time0200">
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB10.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0200'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB10)"
                        >
                          <div class="main-txt">02:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB11.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0220'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB11)"
                        >
                          <div class="main-txt">02:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB12.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0240'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB12)"
                        >
                          <div class="main-txt">02:40</div>
                        </button>
                      </li>
                    </ul>

                    <ul class="result-group-btns time0300">
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB13.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0300'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB13)"
                        >
                          <div class="main-txt">03:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB14.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0320'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB14)"
                        >
                          <div class="main-txt">03:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB15.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0340'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB15)"
                        >
                          <div class="main-txt">03:40</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns time0400">
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB16.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0400'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB16)"
                        >
                          <div class="main-txt">04:00</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB17.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0420'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB17)"
                        >
                          <div class="main-txt">04:20</div>
                        </button>
                      </li>
                      <li class="result-group-btns-li">
                        <button
                          type="button"
                          :class="[
                            'result-group-btn',
                            stateTab.activeAreaTab &&
                              AREA_TAB_TYPE.TAB18.name ===
                                stateTab.activeAreaTab.name &&
                              'is-active',
                            'time0440'
                          ]"
                          @click.prevent="_onChangeAreaTab(AREA_TAB_TYPE.TAB18)"
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
@use '~/assets/style/pages/dscsn/vido/vappt/inst.scss';
</style>
