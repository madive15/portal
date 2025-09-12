<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import dayjs, { type Dayjs } from 'dayjs';
import CalendarLayer from '~/components/common/calendar/calendarLayer.vue';
import type { CommonCode } from '~/types';
import type {
  IntvDscsnRsvtInVO,
  RgnCdListOutVO,
  InstNoListByLwClsfOutVO,
  InstPlanListOutVO,
  AvailRsvtPlanTimeList,
  AvailRsvtPlanListByInst,
  AvailRsvtTimeListByPlan,
  SelectedPlaneTime,
  SggListByCtpvInstOutVO
} from '~/types/dscsn/rsvt';
import * as commonApis from '~/composables/common';
import * as dscsnApis from '~/composables/dscsn';
import * as dscsnConst from '~/constants/dscsn/index';
import { useLoginStore } from '~/stores/login';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';

const { showAlert } = useCustomAlert();
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const EVENT_TAB_TYPE = dscsnConst.EVENT_TAB_TYPE;
const AREA_TAB_TYPE = dscsnConst.AREA_TAB_TYPE;
type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];
type AREA_KEY = (typeof AREA_TAB_TYPE)[keyof typeof AREA_TAB_TYPE];

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
}
const stateTab = reactive<Reactive>({
  // activeEventTab: EVENT_TAB_TYPE.TAB1,
  // activeAreaTab: AREA_TAB_TYPE.TAB1
  activeEventTab: EVENT_TAB_TYPE.TAB2,
  activeAreaTab: AREA_TAB_TYPE.TAB1
});

// Check point
// 사건선택, 지역선택, 날짜 선택, onPlan, 인경우 모두 payload 정보 초기화 필요

// 법률구분코드 List
const lwClsfCdList: Ref<CommonCode[]> = ref([]);
// 지역코드 List
const rgnCdList: Ref<RgnCdListOutVO[]> = ref([]);

// 법률구분별 기관정보
const instNolistByLwClsfCd: Ref<InstNoListByLwClsfOutVO[]> = ref([]);

// 법률구분(사건)에 따른 기관목록
const availableInstList = computed(() => {
  if (selectedRsvtInfo.value.lwClsfCd != '') {
    return instNolistByLwClsfCd.value
      .filter((inst) => inst.lwClsfCd == selectedRsvtInfo.value.lwClsfCd)
      .map((inst) => inst.instNo);
  } else {
    return instNolistByLwClsfCd.value.map((inst) => inst.instNo);
  }
});

// 시군구 목록
const sggList: Ref<SggListByCtpvInstListOutVO[]> = ref([]);

const availSggList = computed(() => {
  return sggList.value;
});
// 캘릭더노출 예약유효날짜
// const availableRsvtDates = ref([]);
const availableRsvtDates = computed(() => {
  return [
    ...new Set(dscsnConst.SAMPLE_RSVT_PLAN_1.map((item) => item.trgtYmd))
  ];
});

// 예약가능날짜 active
const activePlane = ref<Record<string, boolean>>({});

const planList: Ref<InstPlanListOutVO[]> = ref([]);
// 예약가능 plane
const availRsvtPlaneList = computed(() => {
  const planes = new Map();
  if (planList.value) {
    for (const item of planList.value) {
      for (const inst of availableInstList.value) {
        if (inst == item.instNo) {
          if (!planes.has(item.instNo)) {
            planes.set(item.instNo, {
              instNo: item.instNo,
              instNm: item.instNm,
              trgtYmdList: [],
              _tmpMap: new Map()
            });
          }

          activePlane.value[item.instNo + item.trgtYmd + item.trgtHm] = false;

          const planesGroup = planes.get(item.instNo);
          const planesKey = item.brofNo
            ? `${item.brofNo}_${item.trgtYmd}`
            : `${item.instNo}_${item.trgtYmd}`;

          if (!planesGroup._tmpMap.has(planesKey)) {
            const newPlane = {
              key: item.instNo + item.trgtYmd + item.trgtHm,
              brofNo: item.brofNo ? item.brofNo : item.instNo,
              brofNm: item.brofNm ? item.brofNm : selectedRsvtInfo.value.rgnNm,
              trgtYmd: item.trgtYmd,
              expsrTrgtYmd: `${item.trgtYmd.slice(0, 4)}.${item.trgtYmd.slice(4, 6)}.${item.trgtYmd.slice(6, 8)}`,
              trgHmList: []
            };
            planesGroup.trgtYmdList.push(newPlane);
            planesGroup._tmpMap.set(planesKey, newPlane);
          }

          planesGroup._tmpMap.get(planesKey).trgHmList.push({
            timeKey: item.trgtYmd + item.trgtHm,
            time: item.trgtHm,
            expsrTime: `${item.trgtHm.slice(0, 2)}:${item.trgtHm.slice(2, 4)}`,
            isActive: false
          });
        }
      }
    }

    return Array.from(planes.values()).map((plane) => {
      // 1. planes 정렬: trgtYmd > brofNm 기준
      plane.trgtYmdList.sort(
        (a: AvailRsvtTimeListByPlan, b: AvailRsvtTimeListByPlan) => {
          const ymdCompare = a.trgtYmd.localeCompare(b.trgtYmd);
          if (ymdCompare !== 0) return ymdCompare;
          return a.brofNm.localeCompare(b.brofNm);
        }
      );

      // 2. trgHmList 정렬: time 기준
      for (const data of plane.trgtYmdList) {
        data.trgHmList.sort(
          (a: AvailRsvtTimeListByPlan, b: AvailRsvtTimeListByPlan) =>
            a.time.localeCompare(b.time)
        );
      }

      delete plane._tmpMap;
      return plane;
    });
  } else {
    return [];
  }
  // for (const item of planList.value) {
  //   for (const inst of availableInstList.value) {
  //     if (inst == item.instNo) {
  //       if (!planes.has(item.instNo)) {
  //         planes.set(item.instNo, {
  //           instNo: item.instNo,
  //           instNm: item.instNm,
  //           trgtYmdList: [],
  //           _tmpMap: new Map()
  //         });
  //       }
  //
  //       activePlane.value[item.instNo + item.trgtYmd + item.trgtHm] = false;
  //
  //       const planesGroup = planes.get(item.instNo);
  //       const planesKey = item.brofNo
  //         ? `${item.brofNo}_${item.trgtYmd}`
  //         : `${item.instNo}_${item.trgtYmd}`;
  //
  //       if (!planesGroup._tmpMap.has(planesKey)) {
  //         const newPlane = {
  //           key: item.instNo + item.trgtYmd + item.trgtHm,
  //           brofNo: item.brofNo ? item.brofNo : item.instNo,
  //           brofNm: item.brofNm ? item.brofNm : selectedRsvtInfo.value.rgnNm,
  //           trgtYmd: item.trgtYmd,
  //           expsrTrgtYmd: `${item.trgtYmd.slice(0, 4)}.${item.trgtYmd.slice(4, 6)}.${item.trgtYmd.slice(6, 8)}`,
  //           trgHmList: []
  //         };
  //         planesGroup.trgtYmdList.push(newPlane);
  //         planesGroup._tmpMap.set(planesKey, newPlane);
  //       }
  //
  //       planesGroup._tmpMap.get(planesKey).trgHmList.push({
  //         timeKey: item.trgtYmd + item.trgtHm,
  //         time: item.trgtHm,
  //         expsrTime: `${item.trgtHm.slice(0, 2)}:${item.trgtHm.slice(2, 4)}`,
  //         isActive: false
  //       });
  //     }
  //   }
  // }
  //
  // return Array.from(planes.values()).map((plane) => {
  //   // 1. planes 정렬: trgtYmd > brofNm 기준
  //   plane.trgtYmdList.sort(
  //     (a: AvailRsvtTimeListByPlan, b: AvailRsvtTimeListByPlan) => {
  //       const ymdCompare = a.trgtYmd.localeCompare(b.trgtYmd);
  //       if (ymdCompare !== 0) return ymdCompare;
  //       return a.brofNm.localeCompare(b.brofNm);
  //     }
  //   );
  //
  //   // 2. trgHmList 정렬: time 기준
  //   for (const data of plane.trgtYmdList) {
  //     data.trgHmList.sort(
  //       (a: AvailRsvtTimeListByPlan, b: AvailRsvtTimeListByPlan) =>
  //         a.time.localeCompare(b.time)
  //     );
  //   }
  //
  //   delete plane._tmpMap;
  //   return plane;
  // });
});

// 예약가능 시간 목록
const availableTime: Ref<AvailRsvtTimeListByPlan[]> = ref([]);
const selectedPlaneTime: Ref<SelectedPlaneTime> = ref({
  instNo: '',
  instNm: '',
  brofNo: '',
  brofNm: '',
  trgtYmd: '',
  expsrTrgtYmd: '',
  trgtHm: '',
  expsrTrgtHm: ''
});

const onChagnePlane = (
  instData: AvailRsvtPlanListByInst,
  plane: AvailRsvtPlanListByInst
) => {
  for (const key in activePlane.value) {
    activePlane.value[key] = key == plane.key;
  }

  plane.trgHmList.map((item) => ({
    ...item,
    isActive: false
  }));

  availableTime.value = plane.trgHmList;

  console.log('availableTime.value:', availableTime.value);
  selectedPlaneTime.value = {
    ...selectedPlaneTime.value,
    instNo: instData.instNo,
    instNm: instData.instNm,
    brofNo: plane.brofNo,
    brofNm: plane.brofNm,
    trgtYmd: plane.trgtYmd,
    expsrTrgtYmd: plane.expsrTrgtYmd
  };
};

const selectedPlaneTimeText = computed(() => {
  if (selectedPlaneTime) {
    return (
      '[' +
      selectedPlaneTime.value.instNm +
      '] ' +
      selectedPlaneTime.value.brofNm +
      ' ' +
      selectedPlaneTime.value.expsrTrgtYmd
    );
  } else {
    return '';
  }
});

const selectedPlaneTimeAlertText = computed(() => {
  if (selectedPlaneTime) {
    return (
      selectedPlaneTime.value.instNm +
      ' ' +
      selectedPlaneTime.value.brofNm +
      ' ' +
      selectedPlaneTime.value.trgtYmd.slice(0, 4) +
      '년 ' +
      selectedPlaneTime.value.trgtYmd.slice(4, 6) +
      '월 ' +
      selectedPlaneTime.value.trgtYmd.slice(6, 8) +
      '일 ' +
      selectedPlaneTime.value.expsrTrgtHm +
      '(으)로 예약을 신청하셨습니다. 개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야 예약이 완료됩니다.'
    );
  } else {
    return '';
  }
});

const onChangeTime = (data: AvailRsvtTimeListByPlan) => {
  for (const item of availableTime.value) {
    if (item.timeKey === data.timeKey) {
      item.isActive = !item.isActive;
    } else {
      item.isActive = false;
    }
  }

  console.log('onChangeTime planList::', planList.value);

  selectedPlaneTime.value = {
    ...selectedPlaneTime.value,
    trgtHm: data.time,
    expsrTrgtHm: data.expsrTime
  };

  console.log('availRsvtPlaneList:', availRsvtPlaneList.value);
  console.log('availableTime.value:', availableTime.value);
};

// 선택된 날짜
const selectedDates = ref<[Date, Date] | null>(null);

// 선택한 예약 정보
const selectedRsvtInfo: Ref<IntvDscsnRsvtInVO> = ref({
  lwClsfCd: '',
  rgnCd: '',
  rgnNm: ''
});

// 사용자 현재 위치
const userCurrentLat = ref();
const userCurrentLng = ref();

const userRgn = ref({
  stdgCd: '', // 시도코드
  ctpvNm: '', // 시 이름
  SggNm: '' // 기초단체 이름
});

onMounted(() => {
  if (authenticated.value) {
    // 법률구분코드 목록조회
    // selectLwClsfCdList();
    // // 법률구분코드별 기관 목록조회
    // selectInstByLwClsf();
    // // 지역코드 목록조회
    // selectRgnCdList();
    initializedData();
    nextTick(() => {
      // getCurrentPosition();
    });
    // selectInstPlanList();
  } else {
    showAlert({
      icon: 'info', //'상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다..<br />로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then(() => {
        navigateTo('/login');
      })
      .catch(() => {});
  }
});

const getEventClassName = (idx: number): EVENT_KEY => {
  const key = ('TAB' + (idx + 1)) as keyof typeof EVENT_TAB_TYPE;
  return EVENT_TAB_TYPE[key];
};

const getAreaClassName = (idx: number): AREA_KEY => {
  const key = ('TAB' + (idx + 1)) as keyof typeof AREA_TAB_TYPE;
  return AREA_TAB_TYPE[key];
};

const initializedData = async () => {
  // 기본 날짜 선택
  setDefaultDates();
  // 법률구분코드 목록조회
  await selectLwClsfCdList();
  // 법률구분코드별 기관 목록조회
  await selectInstByLwClsf();
  // 지역코드 목록조회
  await selectRgnCdList();

  await setUserLctn();
  // getCurrentPosition();
  selectInstPlanList();
};

// 법률구분코드 목록조회
const selectLwClsfCdList = async () => {
  lwClsfCdList.value = await commonApis.selectComCdList('CO0041'); // 그룹코드명: 법률구분코드
  // selectedRsvtInfo.value.lwClsfCd = lwClsfCdList.value[0].value
  //   ? lwClsfCdList.value[0].value
  //   : ''; // 민사
  selectedRsvtInfo.value.lwClsfCd = lwClsfCdList.value[1].value
    ? lwClsfCdList.value[1].value
    : ''; // 이혼,친권
};

// 법률구분코드별 기관 목록조회
const selectInstByLwClsf = async () => {
  const response = await dscsnApis.selectInstByLwClsf();
  instNolistByLwClsfCd.value = response.data;
};

// 지역코드 목록조회
const selectRgnCdList = async () => {
  const reponse = await dscsnApis.selectRgnCdList(); // 그룹코드명: 지역코드
  rgnCdList.value = reponse.data.map((item) => ({
    ...item,
    lat: Number(item.lat),
    lng: Number(item.lng)
  }));
};

// 기본 날짜 선택
const setDefaultDates = () => {
  selectedDates.value = [dayjs().toDate(), dayjs().add(30, 'day').toDate()];
};

// 위치확인 동의 -> 사용자 위치의 광역 "기준>전체"
// 위치확인 부동의 -> "서울>전체"
const getCurrentPosition = (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported'));
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;

        resolve({
          lat,
          lng
        });
      },
      (err) => {
        // reject(err)
        if (err.code === 1) {
          // 2025.07.02
          // https 또는 localhost 접근 하지 않아 code:1 발생중
          console.log('https 또는 localhost 접근 하지 않아 code:1 발생');
          // userCurrentLat.value = rgnCdList.value[0].lat;
          // userCurrentLng.value = rgnCdList.value[0].lng;
          // 기본값 서울
          resolve({ lat: rgnCdList.value[0].lat, lng: rgnCdList.value[0].lng });
        } else if (
          err.code === err.PERMISSION_DENIED ||
          err.code === err.TIMEOUT
        ) {
          console.log('사용자가 위치 접근 거부 또는 tiemout');
        } else {
          console.log('기타 위치 오류::', err);
        }
      },
      {
        timeout: 20000 // 20초 내 응답 없으면 TIMEOUT
      }
    );
  });
};
// 사용자 위치정보에 의한 지역 선택
const setUserLctn = async () => {
  userCurrentLat.value = await getCurrentPosition();
  // console.log('setUserLctn:', userCurrentLat.value);
  // await getCurrentPosition();
  await selecteSggList(userCurrentLat.value.lat, userCurrentLat.value.lng);
};

const selecteSggList = async (lat: string, lng: string) => {
  sggList.value = [];
  const payload = {
    instNoList: availableInstList.value,
    lat: lat, // 사용자 위도
    lng: lng // 사용자 경도
  };
  const response = await dscsnApis.selecteSggList(payload);
  console.log('selecteSggList response:', response);

  sggList.value = response.data.list.map((item) => ({
    ...item,
    isActive: false
  }));

  const all = {
    stdgCd: '',
    ctpvNm: response.data.ctpvNm,
    sggNm: '전체',
    isActive: true
  };
  sggList.value.unshift(all);

  console.log('selecteSggList::', sggList.value);
};
// 1. 사건선택 (법률구분코드 선택)
const onChangeLwClsfTab = (item: CommonCode, idx: number) => {
  stateTab.activeEventTab = getEventClassName(idx);
  selectedRsvtInfo.value.lwClsfCd = item.value ? item.value : '';
  selectInstPlanList();
};

// 2. 지역 선택

const onChangeRgnTab = (item: RgnCdListOutVO, idx: number, e: Event) => {
  selecteSggList(item.lat, item.lng);
  nextTick(() => {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentNode;

    if (stateTab.activeAreaTab === getAreaClassName(idx)) {
      stateTab.activeAreaTab = null;
    } else {
      stateTab.activeAreaTab = getAreaClassName(idx);
    }
    if (!parent) return;
    const heightTarget = parent.querySelector('.sub-area-box') as HTMLElement;
    const height = heightTarget?.querySelector('.sub-area-items')?.clientHeight;
    if (heightTarget) heightTarget.style.height = `${height}px`;
  });

  selectedRsvtInfo.value.rgnCd = item.rgnCd;
  console.log('onChangeRgnTab item:::', item);

  console.log('onChangeRgnTab selectedRsvtInfo::', selectedRsvtInfo.value);
};

// 상담예약 plan 조회
const selectInstPlanList = async () => {
  const payload = selectedRsvtInfo.value;
  planList.value = await dscsnApis.selectInstPlanList(payload);
  // 예약가능 시간정보 초기화
  availableTime.value = [];
};

const selectedDatesRange = () => {
  console.log('selectedCalendar:::', selectedDates.value);
};

const checkRsvt = () => {
  // 상담예약 중복확인하기
  const result = 'isOkay';

  if (result == 'isOkay') {
    showAlert({
      icon: 'info',
      html: selectedPlaneTimeAlertText.value
    });
  }
};

const goToMyDscsn = async () => {
  navigateTo('/my/dscsn/rsvt/list');
};

// 확인용
// watch(selectedDates, (newVal) => {
//   console.log('change selectedDates', newVal);
// });

watch(availableInstList, () => {
  console.log('availableInstList:', availableInstList.value);
});

watch(availRsvtPlaneList, () => {
  console.log('availRsvtPlaneList:', availRsvtPlaneList.value);
});
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
        <div class="counsel-reservation-box">
          <div class="inner">
            <div class="box-left">
              <div class="select-event-wrap">
                <h4>사건 선택</h4>
                <ul class="select-event-items pc-only">
                  <li v-for="(item, idx) in lwClsfCdList" :key="item.value">
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type0' + (idx + 1),
                        getEventClassName(idx) === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        getEventClassName(idx) === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="onChangeLwClsfTab(item, idx)"
                    >
                      <span class="tit">
                        {{ item.label }}
                      </span>
                    </button>
                  </li>
                </ul>
                <a-select
                  id="select"
                  class="common-select mo-only"
                  placeholder="선택"
                  v-model:value="selectedRsvtInfo.lwClsfCd"
                >
                  <a-select-option
                    v-for="item in lwClsfCdList"
                    :key="item.value"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </div>
              <div class="select-area-wrap">
                <h4>지역 선택</h4>
                <ul class="select-area-items pc-only">
                  <li v-for="(item, idx) in rgnCdList" :key="item.rgnCd">
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        getAreaClassName(idx) === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        getAreaClassName(idx) === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="onChangeRgnTab(item, idx, $event)"
                    >
                      <span class="tit">{{ item.rgnNm }}</span>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="getAreaClassName(idx) === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li v-for="sgg in availSggList" :key="item.stdgCd">
                          <button
                            type="button"
                            :class="[
                              'sub-area-item',
                              sgg.isActive && 'is-active'
                            ]"
                          >
                            {{ sgg.sggNm }}
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
                  <a-select-option
                    v-for="item in rgnCdList"
                    :key="item.rgnCd"
                    >{{ item.rgnNm }}</a-select-option
                  >
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
                      v-model:selected-dates="selectedDates"
                      :available-rsvt-dates="availableRsvtDates"
                      @selectedDatesRange="selectedDatesRange"
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
                    <div v-if="availRsvtPlaneList.length > 0">
                      <div v-for="data in availRsvtPlaneList">
                        <h5>{{ data.instNm }}</h5>
                        <ul class="result-group-btns">
                          <li v-for="child in data.trgtYmdList">
                            <button
                              type="button"
                              :class="[
                                'result-group-btn',
                                activePlane[child.key] && 'is-active'
                              ]"
                              @click="onChagnePlane(data, child)"
                            >
                              <span class="main-txt">{{
                                child.brofNm ? child.brofNm : '서울'
                              }}</span>
                              <span class="sub-txt">{{
                                child.expsrTrgtYmd
                              }}</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-else>
                      <div class="guide-txt">
                        조회 가능한 예약건이 없습니다. 조건을 날짜나 필요 시
                        지역을 변경해 주세요
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="select-result-time"
                  v-if="availRsvtPlaneList.length > 0"
                >
                  <div class="result-time-box">
                    <h5>시간</h5>
                    <div v-if="availableTime.length > 0">
                      <div class="select-txt">
                        {{ selectedPlaneTimeText }}
                      </div>
                      <ul class="result-time-btns">
                        <li v-for="item in availableTime">
                          <button
                            type="button"
                            :class="[
                              'result-time-btn',
                              item.isActive && 'is-active'
                            ]"
                            @click="onChangeTime(item)"
                          >
                            <span class="main-txt">{{ item.expsrTime }}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div v-else>
                      <div class="guide-txt">예약 대상을 선택해 주세요.</div>
                    </div>
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
            :disabled="!selectedPlaneTime.trgtHm"
            @click="checkRsvt"
          >
            예약하기</button
          ><button type="button" class="btn type01" @click="goToMyDscsn">
            예약확인
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/rsvt/intv/index.scss';
</style>
