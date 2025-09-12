<!--
 * 화면명 : 상담 예약 화면
 * 화면ID : LASP_CON_015(면접), LASP_CON_016(화상), LASP_CON_017(기관면접), LASP_CON_019(기관전화)
 * 파일명 : DscsnRsvtM.vue
 * 작성자 : 조현주
 * 화면 설명 : 면접상담/화상상담/전화상담 예약하는 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.12  조현주   최초생성
-->

<script setup lang="ts">
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CalendarLayer from '~/components/ui/calendar/calendarLayer.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import Icon from '~/components/ui/icon/icon.vue';
import * as commonApis from '~/composables/common';
import { onMounted, reactive, type Ref, ref } from 'vue';
import type { CommonCode } from '~/types';
import type {
  InstNoListByLwClsfOutVO,
  IntvDscsnRsvtInVO,
  RgnCdListOutVO,
  SggListByCtpvInstListOutVO,
  IFHrChcFormVO
} from '~/types/dscsn/rsvt';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import * as dscsnApis from '~/composables/dscsn';
import axios from 'axios';
import dayjs from 'dayjs';

const { showAlert } = useCustomAlert();
const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

definePageMeta({
  layout: 'pub2nd'
});

/** 라우터 선언 **/
const route = useRoute();

/**
 * 사건 별 기관의 가능여부 정보 (default : false)
 */
const instInfo = reactive({
  kla: false, // 공단
  lhm: false, // 상담소
  lqa: false, // 상담원
  lhd: false // 홈닥터
});

/**
 * 선택한 예약 정보 (조회 시 사용되는 정보)
 */
const selectedRsvtInfo: Ref<IntvDscsnRsvtInVO> = ref({
  lwClsfCd: '',
  rgnCd: '',
  rgnNm: ''
});

/**
 * 가능기관/시간목록 조회 param 담아두기위한 변수 선언
 */
const initPrams = {
  dscsnSeCd: '',
  resvGbn: '',
  orgCd: '',
  ctStdgCd: '', //시도
  ggStdgCd: '', //구군
  zip: '',
  resvFrDt: '',
  resvToDt: ''
};
const sParams = ref({ ...initPrams });

/**
 * 선택한 예약정보 초기값
 */
const initRsvtParam = {
  instSe: '', // 기관 구분을 위한 value
  rsvtNo: '', // 예약번호
  dscsnRsvtInstNo: '', // 상담예약기관번호 orgCd
  dscsnRsvtInstNm: '', // 기관명 orgNm
  stdgCd: '', // 법정동코드
  rgnCd: '', // 지역코드
  rsvtYmd: '', // 예약일자
  rsvtHm: '', // 예약시분
  dowCd: '' // 요일코드
};

/**
 * 선택한 예약정보
 */
const rsvtParam = ref({ ...initRsvtParam });

/**
 * 캘린더 레이어 expanded control을 위한 변수 선언
 */
const calendarRef = ref();

/**
 * name : onBeforeMount
 * desc :
 */
onBeforeMount(() => {
  if (!route.query.availInst || !route.query.dscsnSeCd) {
    Modal.info({ title: '정상적인 접근이 아닙니다' });
    navigateTo('/');
  }
  // 로그인 여부에 따라 분기
  if (authenticated.value) {
    // console.log('route.query :: ', route.query);
    sParams.value.dscsnSeCd = route.query.dscsnSeCd; // 1:면접 2:화상 3: 전화
  } else {
    showAlert({
      icon: 'info',
      html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
});

/**
 * 법률구분코드 List (사건 선택)
 */
const lwClsfCdList: Ref<CommonCode[]> = ref([]);

/**
 * name : selectLwClsfCdList
 * desc : 법률구분코드 목록조회 (CO0041)
 */
const selectLwClsfCdList = async () => {
  lwClsfCdList.value = await commonApis.selectComCdList('CO0041'); // 그룹코드명: 법률구분코드
  const val = route.query.lwClsfCd
    ? route.query.lwClsfCd
    : lwClsfCdList.value[0].value
      ? lwClsfCdList.value[0].value
      : ''; // 민사
  selectedRsvtInfo.value.lwClsfCd = val;
  selectedLwClsfCd.value.lwClsfCd = val;

  if (!!route.query.lwClsfCd) {
    // 법률구분코드 넘어온 경우
    const idx = lwClsfCdList.value.findIndex(
      (item) => item.value === route.query.lwClsfCd
    );
    stateTab.activeEventTab = getLwClsfClassName(idx);
  }
};

/**
 * 법률구분별 기관정보 List
 */
const instNolistByLwClsfCd: Ref<InstNoListByLwClsfOutVO[]> = ref([]);
const selectedLwClsfCd: Ref<InstNoListByLwClsfOutVO> = ref({
  lwClsfCd: '',
  instNo: ''
});

/**
 * name : selectInstByLwClsf
 * desc : 법률구분코드별 기관 목록조회
 */
const selectInstByLwClsf = async () => {
  const payload = selectedLwClsfCd.value;
  const response = await dscsnApis.selectInstByLwClsf(payload);
  instNolistByLwClsfCd.value = response.data;
  // console.log('instNolistByLwClsfCd.value:: ', instNolistByLwClsfCd.value);

  // 각 기관별 가능여부 정보 set
  instInfo.kla = instNolistByLwClsfCd.value.some(
    (item) => item.instNo === 'I001000000' /*공단*/
  );
  instInfo.lhm = instNolistByLwClsfCd.value.some(
    (item) => item.instNo === 'I002000000' /*상담소*/
  );
  instInfo.lqa = instNolistByLwClsfCd.value.some(
    (item) => item.instNo === 'I003000000' /*상담원*/
  );
  instInfo.lhd = instNolistByLwClsfCd.value.some(
    (item) => item.instNo === 'I054000000' /*홈닥터*/
  );

  const availInst = route.query.availInst;
  if (availInst !== 'A') {
    Object.keys(instInfo).forEach((key) => {
      if (key !== availInst) {
        instInfo[key] = false; //availInst 외에는 false
      }
    });

    if (instInfo[availInst] && instInfo.hasOwnProperty(availInst)) {
      instInfo[availInst] = true;
    }
  }

  // console.log('selectInstByLwClsf ::: ', instInfo);
};

const selectedLwClsfNm = computed(
  () =>
    lwClsfCdList.value.find(
      (item) => item.value === selectedRsvtInfo.value.lwClsfCd
    )?.label
);

/**
 * name : availableInstList
 * desc : 법률구분(사건)에 따른 기관 목록조회
 */
const availableInstList = computed(() => {
  // console.log('availableInstList :: ', selectedRsvtInfo.value.lwClsfCd);
  if (selectedRsvtInfo.value.lwClsfCd != '') {
    return instNolistByLwClsfCd.value
      .filter((inst) => inst.lwClsfCd == selectedRsvtInfo.value.lwClsfCd)
      .map((inst) => inst.instNo);
  } else {
    return instNolistByLwClsfCd.value.map((inst) => inst.instNo);
  }
});

/**
 * 지역코드 List
 */
const rgnCdList: Ref<RgnCdListOutVO[]> = ref([]);

/**
 * name : selectLwClsfCdList
 * desc : 지역코드 목록조회 (CO0030)
 */
const selectRgnCdList = async () => {
  const reponse = await dscsnApis.selectRgnCdList(); // 그룹코드명: 지역코드

  rgnCdList.value = reponse.data.map((item) => ({
    ...item,
    lat: Number(item.lat),
    lng: Number(item.lng),
    compVal: String(item.compVal)
  }));
};

// 위치확인 동의 -> 사용자 위치의 광역 "기준>전체"
// 위치확인 부동의 -> "서울>전체"
/**
 * 사용자 현재 위치
 */
const userCurrentLat = ref();
const userCurrentLng = ref();

const userRgn = ref({
  stdgCd: '', // 시도코드
  ctpvNm: '', // 시 이름
  SggNm: '' // 기초단체 이름
});

/**
 * 군구 List
 */
const sggList: Ref<SggListByCtpvInstListOutVO[]> = ref([]);

/**
 * name : getCurrentPosition
 * desc : 사용자 위치정보 확인
 */
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
          console.log('https 또는 localhost 접근 하지 않아 code:1 발생');
          // userCurrentLat.value = rgnCdList.value[0].lat;
          // userCurrentLng.value = rgnCdList.value[0].lng;
          // 기본값 서울
          resolve({
            lat: rgnCdList.value[0].lat,
            lng: rgnCdList.value[0].lng
          });
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

/**
 * name : setUserLctn
 * desc : 사용자 위치정보에 의한 지역 선택
 */
const setUserLctn = async () => {
  userCurrentLat.value = await getCurrentPosition();
  await selectSggList(userCurrentLat.value.lat, userCurrentLat.value.lng);
};

/**
 * name : selectSggList
 * desc : 시군구 목록 조회
 */
const selectSggList = async (lat: string, lng: string) => {
  sggList.value = [];

  const payload = {
    instNoList: availableInstList.value,
    lat: lat, // 사용자 위도
    lng: lng // 사용자 경도
  };

  const response = await dscsnApis.selectSggList(payload);

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

  if (response.data.ctpvNm === null || response.data.ctpvNm === '') {
    selectedRsvtInfo.value.rgnCd = rgnCdList.value[0].rgnCd;
    selectedRsvtInfo.value.rgnNm = rgnCdList.value[0].rgnNm;
    sParams.value.ctStdgCd = rgnCdList.value[0].stdgCd;
  } else {
    selectedRsvtInfo.value.rgnCd =
      rgnCdList.value.find((item) => item.rgnNm === response.data.ctpvNm)
        ?.rgnCd ?? '';
    selectedRsvtInfo.value.rgnNm = response.data.ctpvNm;
    sParams.value.ctStdgCd =
      rgnCdList.value.find((item) => item.rgnNm === response.data.ctpvNm)
        ?.stdgCd ?? '';
  }
  // console.log('selectSggList ?? ::', sggList.value);
};

const availSggList = computed(() => {
  if (selectedRsvtInfo.value.rgnNm != '') {
    const sidoVal = rgnCdList.value.find(
      (item) => item.rgnNm === selectedRsvtInfo.value.rgnNm
    );

    return [
      sggList.value[0],
      ...sggList.value.filter((item) => item.compVal === sidoVal?.compVal)
    ];
  }
});

/**
 * name : initializedData
 * desc :
 */
const initializedData = async () => {
  // 법률구분코드 목록 조회 (사건 선택 영역)
  await selectLwClsfCdList();

  // 법률구분코드별 기관 목록조회
  await selectInstByLwClsf();

  // 지역코드 목록조회 (지역 선택 : 시도)
  await selectRgnCdList();

  // 사용자 위치정보에 의한 지역 선택 (구군)
  await setUserLctn();

  // 플랜 조회
  selectInstPlanList();
};

/**
 * 요일 공통코드 조회
 */
const dowCdList = await useCommonCodeStore().searchCommonCodeList('CO0046');

/**
 * name : onMounted
 * desc :
 */
onMounted(() => {
  initializedData();
});

/**
 * name : getCdNm
 * desc : param : 요일코드
 *        return : 코드명
 */
const getCdNm = (code) => {
  const item = dowCdList.find((c) => c.value === code);
  return item ? item.label?.slice(0, 1) : code;
};

/**
 * name : EVENT_TAB_TYPE
 * desc : 법률 구분 (사건 선택) 영역 (CO0041)
 */
const EVENT_TAB_TYPE = {
  TAB1: 'EVENT_TAB1',
  TAB2: 'EVENT_TAB2',
  TAB3: 'EVENT_TAB3',
  TAB4: 'EVENT_TAB4'
} as const;
type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];

/**
 * name : getLwClsfClassName
 * desc : 법률 구분 (사건 선택) getEventClassName
 */
const getLwClsfClassName = (idx: number): EVENT_KEY => {
  const key = ('TAB' + (idx + 1)) as keyof typeof EVENT_TAB_TYPE;
  return EVENT_TAB_TYPE[key];
};

/**
 * name : onChangeEventTab
 * desc : 사건 선택 시 이벤트
 */
const onChangeLwClsfTab = async (item: CommonCode, idx: number) => {
  stateTab.activeEventTab = getLwClsfClassName(idx);
  selectedRsvtInfo.value.lwClsfCd = item.value ? item.value : '';
  selectedLwClsfCd.value.lwClsfCd = item.value ? item.value : '';
  await selectInstByLwClsf();
  await selectRgnCdList();
  await selectInstPlanList();
};

/**
 * name : AREA_TAB_TYPE
 * desc : 지역 선택 영역 (CO0030)
 */
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
type AREA_KEY = (typeof AREA_TAB_TYPE)[keyof typeof AREA_TAB_TYPE];

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
}

const stateTab = reactive<Reactive>({
  activeEventTab: EVENT_TAB_TYPE.TAB1,
  activeAreaTab: AREA_TAB_TYPE.TAB1
});

/**
 * name : getRgnClassName
 * desc : 지역 선택 getAreaClassName
 */
const getRgnClassName = (idx: number): AREA_KEY => {
  const key = ('TAB' + (idx + 1)) as keyof typeof AREA_TAB_TYPE;
  return AREA_TAB_TYPE[key];
};

/**
 * name : onChangeRgnTab
 * desc : 지역(시도) 선택 시 이벤트
 */
const onChangeRgnTab = (item: RgnCdListOutVO, idx: number, e: Event) => {
  // console.log('onChangeRgnTab:: ', e);
  // selectSggList(item.lat, item.lng, item.rgnNm); // 조회 -> 필터 변경
  nextTick(() => {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentNode;

    if (stateTab.activeAreaTab === getRgnClassName(idx)) {
      stateTab.activeAreaTab = null;
    } else {
      stateTab.activeAreaTab = getRgnClassName(idx);
    }
    if (!parent) return;
    const heightTarget = parent.querySelector('.sub-area-box') as HTMLElement;
    const height = heightTarget?.querySelector('.sub-area-items')?.clientHeight;
    if (heightTarget) heightTarget.style.height = `${height}px`;

    // sggList active control
    for (const sgg of availSggList.value) {
      if (sgg.sggNm === '전체') {
        sgg.isActive = true;
        sParams.value.ggStdgCd = ''; //구군 초기화
      } else {
        sgg.isActive = false;
      }
    }
  });

  selectedRsvtInfo.value.rgnCd = item.rgnCd; //시도
  selectedRsvtInfo.value.rgnNm = item.rgnNm;
  sParams.value.ctStdgCd = item.stdgCd;

  selectInstPlanList(); // 플랜 조회
};

/**
 * name : onChangeSggTab
 * desc : 지역(구군) 선택 시 이벤트
 */
const onChangeSggTab = (sgg: SggListByCtpvInstListOutVO, e: Event) => {
  // active control
  for (const item of availSggList.value) {
    item.isActive = item.sggNm === sgg.sggNm;
  }
  sParams.value.ggStdgCd = sgg.stdgCd; //지역코드

  selectInstPlanList();
};

/**
 * 선택된 날짜
 */
// const selectedDates = ref<[Date, Date] | null>(null);
const selectedDates = ref({
  resvFrDt: '', // 예약가능시작일자
  resvToDt: '' // 예약가능종료일자
});

/**
 * name : selectInstHrList
 * desc : 날짜선택했을 때 이벤트
 */
const selectedDatesRange = (event) => {
  if (event) {
    selectedDates.value.resvFrDt = event[0].replaceAll('-', '');
    selectedDates.value.resvToDt = event[1].replaceAll('-', '');

    sParams.value.resvFrDt = selectedDates.value.resvFrDt;
    sParams.value.resvToDt = selectedDates.value.resvToDt;

    selectInstPlanList();
  }
};

/**
 * 캘린더 노출 예약유효 날짜
 */
const availableRsvtDates = computed(() => {
  return [
    // ...new Set(dscsnConst.SAMPLE_RSVT_PLAN_1.map((item) => item.trgtYmd))
  ];
});

/**
 * 플랜 조회 list
 */
const klaPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const lhmPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const lqaPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const lhdPlanList: Ref<IFHrChcFormVO[]> = ref([]);

/**
 * 선택할 플랜 list
 */
const availKlaPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const availLhmPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const availLqaPlanList: Ref<IFHrChcFormVO[]> = ref([]);
const availLhdPlanList: Ref<IFHrChcFormVO[]> = ref([]);

/**
 * 시간 list
 */
const availableTime: Ref<IFHrChcFormVO[]> = ref([]);

/**
 * 예약가능날짜 active
 */
const activePlane = ref<Record<string, boolean>>({});

/**
 * 플랜 List 조회 성공 flag (default: 0)
 */
const selectFlag = reactive({
  klaFlag: '0',
  lhmFlag: '0',
  lqaFlag: '0',
  lhdFlag: '0'
});

/**
 * name : selectInstPlanList
 * desc : 상담예약 plan 조회
 */
const selectInstPlanList = async () => {
  if (
    instInfo.kla &&
    (route.query.availInst === 'A' || route.query.availInst === 'kla')
  ) {
    selectKlaPlanList();
  }

  if (
    instInfo.lhm &&
    (route.query.availInst === 'A' || route.query.availInst === 'lhm')
  ) {
    selectLhmPlanList();
  }

  if (
    instInfo.lqa &&
    (route.query.availInst === 'A' || route.query.availInst === 'lqa')
  ) {
    selectLqaPlanList();
  }

  if (
    instInfo.lhd &&
    (route.query.availInst === 'A' || route.query.availInst === 'lhd')
  ) {
    selectLhdPlanList();
  }

  // 예약가능 시간정보 초기화
  availableTime.value = [];

  // 선택된 정보 초기화
  rsvtParam.value = { ...initRsvtParam };

  // active 초기화
  Object.keys(activePlane.value).forEach((k) => (activePlane.value[k] = false));

  // 캘린더 열려있으면 닫기
  if (calendarRef.value) {
    calendarRef.value.isExpanded = false;
  }
};

/**
 * name : selectKlaPlanList
 * desc : 상담예약 plan 조회 (공단)
 */
const selectKlaPlanList = async () => {
  const formData = new FormData();

  formData.append('resvGbn', sParams.value.dscsnSeCd);
  formData.append('stdgCd', sParams.value.ggStdgCd || sParams.value.ctStdgCd);
  formData.append('resvFrDt', sParams.value.resvFrDt);
  formData.append('resvToDt', sParams.value.resvToDt);
  formData.append('orgCd', sParams.value.orgCd);
  // formData.append('zip', sParams.value.zip); TODO
  try {
    axios
      .get('/api/dscsn/rsvt/selectKlaHrChcList', {
        params: Object.fromEntries(formData)
      })
      .then((res) => {
        selectFlag.klaFlag = '1';
        klaPlanList.value = res.data;

        // 플랜 영역에서 사용할 컬럼 추출
        const mappedList = klaPlanList.value.map((item) => ({
          orgCd: item.orgCd,
          orgNm: item.orgNm,
          reserveDe: item.reserveDe,
          stdgCd: item.stdgCd,
          wdayCode: item.wdayCode,
          zip: item.zip
        }));

        // 중복제거
        const map = new Map<String, (typeof mappedList)[0]>();
        mappedList.forEach((item) => {
          const keyStr = `${item.orgCd}-${item.reserveDe}`;
          if (!map.has(keyStr)) map.set(keyStr, item);
        });

        // key 부여
        availKlaPlanList.value = Array.from(map.values()).map(
          (item, index) => ({
            ...item,
            key: `kla${index + 1}`
          })
        );

        // console.log('klaPlanList :: ', availKlaPlanList.value);
      });
  } catch (err) {
    selectFlag.klaFlag = '0';
    console.log('axios failed', err);
  }
};

/**
 * name : selectLhmPlanList
 * desc : 상담예약 plan 조회 (상담소)
 */
const selectLhmPlanList = async () => {
  const formData = new FormData();

  formData.append('dscsnSeCd', sParams.value.dscsnSeCd);
  formData.append('resvFrDt', sParams.value.resvFrDt);
  formData.append('resvToDt', sParams.value.resvToDt);
  formData.append('orgCd', sParams.value.orgCd);
  // formData.append('??', sParams.value.sggCd || sParams.value.rngCd); TODO 지역 추가 예정

  const formParam = new URLSearchParams(formData);

  try {
    axios
      .get('/api/dscsn/rsvt/selectLhmHrChcList', {
        params: Object.fromEntries(formParam)
      })
      .then((res) => {
        selectFlag.lhmFlag = '1';
        lhmPlanList.value = res.data;

        // 플랜 영역에서 사용할 컬럼 추출
        const mappedList = lhmPlanList.value.map((item) => ({
          orgCd: item.orgCd,
          orgNm: item.orgNm,
          trgtYmd: item.trgtYmd,
          dowCd: item.dowCd
        }));

        // 중복제거
        const map = new Map<String, (typeof mappedList)[0]>();
        mappedList.forEach((item) => {
          const keyStr = `${item.orgCd}-${item.trgtYmd}`;
          if (!map.has(keyStr)) map.set(keyStr, item);
        });

        // key 부여
        availLhmPlanList.value = Array.from(map.values()).map(
          (item, index) => ({
            ...item,
            key: `lhm${index + 1}`
          })
        );

        // console.log('lhmPlanList :: ', availLhmPlanList.value);
      });
  } catch (err) {
    selectFlag.lhmFlag = '0';
    console.log('axios failed', err);
  }
};

/**
 * name : selectLqaPlanList
 * desc : 상담예약 plan 조회 (상담원)
 */
const selectLqaPlanList = async () => {
  const formData = new FormData();

  formData.append('dscsnSeCd', sParams.value.dscsnSeCd);
  formData.append('resvFrDt', sParams.value.resvFrDt);
  formData.append('resvToDt', sParams.value.resvToDt);
  formData.append('orgCd', sParams.value.orgCd);
  // formData.append('??', sParams.value.sggCd || sParams.value.rngCd); TODO 지역 추가 예정

  const formParam = new URLSearchParams(formData);

  try {
    axios
      .get('/api/dscsn/rsvt/selectLqaHrChcList', {
        params: Object.fromEntries(formParam)
      })
      .then((res) => {
        selectFlag.lqaFlag = '1';
        lqaPlanList.value = res.data;

        // 플랜 영역에서 사용할 컬럼 추출
        const mappedList = lqaPlanList.value.map((item) => ({
          orgCd: item.orgCd,
          orgNm: item.orgNm,
          trgtYmd: item.trgtYmd,
          dowCd: item.dowCd
        }));

        // 중복제거
        const map = new Map<String, (typeof mappedList)[0]>();
        mappedList.forEach((item) => {
          const keyStr = `${item.orgCd}-${item.trgtYmd}`;
          if (!map.has(keyStr)) map.set(keyStr, item);
        });

        // key 부여
        availLqaPlanList.value = Array.from(map.values()).map(
          (item, index) => ({
            ...item,
            key: `lqa${index + 1}`
          })
        );

        // console.log('lqaPlanList :: ', availLqaPlanList.value);
      });
  } catch (err) {
    selectFlag.lqaFlag = '0';
    console.log('axios failed', err);
  }
};

/**
 * name : selectLhdPlanList
 * desc : 상담예약 plan 조회 (홈닥터)
 */
const selectLhdPlanList = async () => {
  const formData = new FormData();

  formData.append('resvGbn', sParams.value.dscsnSeCd);
  formData.append('stdgCd', sParams.value.ggStdgCd || sParams.value.ctStdgCd);
  formData.append('resvFrDt', sParams.value.resvFrDt);
  formData.append('resvToDt', sParams.value.resvToDt);
  formData.append('orgCd', sParams.value.orgCd);

  const formParam = new URLSearchParams(formData).toString();

  try {
    axios.get('/api/dscsn/rsvt/selectLhdHrChcList?' + formParam).then((res) => {
      selectFlag.lhdFlag = '1';
      lhdPlanList.value = res.data;

      // 플랜 영역에서 사용할 컬럼 추출
      const mappedList = lhdPlanList.value.map((item) => ({
        orgCd: item.orgCd,
        orgNm: item.orgNm,
        reserveDe: item.reserveDe,
        wdayCode: item.wdayCode
      }));

      // 중복제거
      const map = new Map<String, (typeof mappedList)[0]>();
      mappedList.forEach((item) => {
        const keyStr = `${item.orgCd}-${item.reserveDe}`;
        if (!map.has(keyStr)) map.set(keyStr, item);
      });

      // key 부여
      availLhdPlanList.value = Array.from(map.values()).map((item, index) => ({
        ...item,
        key: `lhd${index + 1}`
      }));

      // console.log('lhdPlanList :: ', availLhdPlanList.value);
    });
  } catch (err) {
    selectFlag.lhdFlag = '0';
    console.log('axios failed', err);
  }
};

/**
 * name : refreshKla
 * desc : 상담예약 plan 재조회 (공단)
 */
const refreshKla = async () => {
  selectKlaPlanList();
};

/**
 * name : refreshLhm
 * desc : 상담예약 plan 재조회 (상담소)
 */
const refreshLhm = async () => {
  selectLhmPlanList();
};

/**
 * name : refreshLqa
 * desc : 상담예약 plan 재조회 (상담원)
 */
const refreshLqa = async () => {
  selectLqaPlanList();
};

/**
 * name : refreshLhd
 * desc : 상담예약 plan 재조회 (홈닥터)
 */
const refreshLhd = async () => {
  selectLhdPlanList();
};

/**
 * name : onChangePlan
 * desc : 플랜 목록에서 선택 시 이벤트
 */
const onChangePlan = (item) => {
  const trgtData = item;
  // console.log('onChangePlan-item::', trgtData);

  // 선택된 정보 초기화
  rsvtParam.value = { ...initRsvtParam };

  // active 초기화
  Object.keys(activePlane.value).forEach((k) => (activePlane.value[k] = false));

  // 예약가능 시간정보 초기화
  availableTime.value = [];

  // 클릭된 플랙 active
  activePlane.value[trgtData.key] = true;

  // 시간 list 만들기
  const instNm = trgtData.key.slice(0, 3);
  switch (instNm) {
    case 'kla':
      availableTime.value = klaPlanList.value
        .filter(
          (item) =>
            item.reserveDe === trgtData.reserveDe &&
            item.orgCd === trgtData.orgCd
        )
        .map((item) => {
          const formattedDate = dayjs(item.reserveDe, 'YYYYMMDD').format(
            'YYYY.DD.MM'
          );
          return {
            ...item,
            timeTxt: `[대한법률구조공단] ${item.orgNm} ${formattedDate}`,
            key: `kla`
          };
        });
      break;

    case 'lhm':
      availableTime.value = lhmPlanList.value
        .filter((item) => item.trgtYmd === trgtData.trgtYmd)
        .map((item) => {
          const formattedDate = dayjs(item.trgtYmd, 'YYYYMMDD').format(
            'YYYY.DD.MM'
          );
          return {
            ...item,
            timeTxt: `[한국가정법률상담소] ${item.orgCd} ${formattedDate}`, //TODO orgCd->orgNm 수정 필요
            key: `lhm`
          };
        });
      break;

    case 'lqa':
      availableTime.value = lqaPlanList.value
        .filter((item) => item.trgtYmd === trgtData.trgtYmd)
        .map((item) => {
          const formattedDate = dayjs(item.trgtYmd, 'YYYYMMDD').format(
            'YYYY.DD.MM'
          );
          return {
            ...item,
            timeTxt: `[대한가정법률복지상담원] ${item.orgCd} ${formattedDate}`, //TODO orgCd->orgNm 수정 필요
            key: `lqa`
          };
        });
      break;

    case 'lhd':
      availableTime.value = lhdPlanList.value
        .filter((item) => item.reserveDe === trgtData.reserveDe)
        .map((item) => {
          const formattedDate = dayjs(item.reserveDe, 'YYYYMMDD').format(
            'YYYY.DD.MM'
          );
          return {
            ...item,
            timeTxt: `[법률홈닥터] ${item.orgNm} ${formattedDate}`,
            key: `lhd`
          };
        });
      break;

    default:
  }

  rsvtParam.value.instSe = instNm;
  rsvtParam.value.dscsnRsvtInstNo = trgtData.orgCd;
  rsvtParam.value.dscsnRsvtInstNm = trgtData.orgNm;
  rsvtParam.value.stdgCd = trgtData.stdgCd;
  rsvtParam.value.dowCd = trgtData.dowCd || trgtData.wdayCode;
  rsvtParam.value.rsvtYmd = trgtData.reserveDe || trgtData.trgtYmd;
  // console.log('availableTime.value::', availableTime.value);
};

/**
 * name : onChangeTime
 * desc : 시간 영역 선택 시 이벤트
 */
const onChangeTime = (item) => {
  const trgtData = item;
  const trgtTime = trgtData.reserveTime || trgtData.trgtHm;
  rsvtParam.value.rsvtHm = trgtTime;

  // active control
  for (const item of availableTime.value) {
    const compTime = item.reserveTime || item.trgtHm;
    if (trgtTime === compTime) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  }
};

/**
 * name : isButtonDisabled
 * desc : 예약하기 버튼 disabled control
 */
const isButtonDisabled = computed(() => {
  return (
    !stateTab.activeEventTab ||
    !selectedDates.value ||
    rsvtParam.value.rsvtHm === ''
  );
});

/**
 * name : selectKlaDupYn
 * desc : 중복여부 조회 (공단)
 */
const selectKlaDupYn = async () => {
  const res = await axios.get('/api/dscsn/rsvt/selectKlaDupYn', {
    params: {
      dscsnSeCd: sParams.value.dscsnSeCd
    }
  });
  return res.data.dupYn;
};

/**
 * name : selectLhmDupYn
 * desc : 중복여부 조회 (상담소)
 */
const selectLhmDupYn = async () => {
  const res = await axios.get('/api/dscsn/rsvt/selectLhmDupYn', {
    params: {
      dscsnSeCd: sParams.value.dscsnSeCd
    }
  });
  return res.data.dupYn;
};

/**
 * name : selectLqaDupYn
 * desc : 중복여부 조회 (상담원)
 */
const selectLqaDupYn = async () => {
  const res = await axios.get('/api/dscsn/rsvt/selectLqaDupYn', {
    params: {
      dscsnSeCd: sParams.value.dscsnSeCd
    }
  });
  return res.data.dupYn;
};

/**
 * name : selectLhdDupYn
 * desc : 중복여부 조회 (홈닥터)
 */
const selectLhdDupYn = async () => {
  const res = await axios.get('/api/dscsn/rsvt/selectLhdDupYn', {
    params: {
      dscsnSeCd: sParams.value.dscsnSeCd
    }
  });
  return res.data.dupYn;
};

/**
 * 중복여부 조회 전체 함수 배열
 */
const dupFuncs = [
  { inst: 'kla', name: '대한법률복지공단', fn: selectKlaDupYn },
  { inst: 'lhm', name: '한국가정법률상담소', fn: selectLhmDupYn },
  { inst: 'lqa', name: '대한가정법률복지상담원', fn: selectLqaDupYn },
  { inst: 'lhd', name: '대한변협법률구조공단', fn: selectLhdDupYn }
];

/**
 * 기관별 중복여부 조회 매핑
 */
const mapping = {
  kla: { name: '대한법률복지공단', fn: selectKlaDupYn },
  lhm: { name: '한국가정법률상담소', fn: selectLhmDupYn },
  lqa: { name: '대한가정법률복지상담원', fn: selectLqaDupYn },
  lhd: { name: '대한변협법률구조공단', fn: selectLhdDupYn }
};

/**
 * name : selectAllDupYn
 * desc : 전체 중복여부 조회 (예약하기 버튼 클릭 시 실행되는 fn)
 */
const selectAllDupYn = async () => {
  const mainFunc = mapping[rsvtParam.value.instSe];
  if (!mainFunc) return;

  // 동일기관 중복여부 조회
  const result = await mainFunc.fn();
  if (result === 'Y') {
    await showAlert({
      icon: 'info',
      html: `해당 상담기관에 이미 상담예약건이 존재합니다.<br/>상담예약은 동일기관에 중복으로 신청할 수 없습니다.`,
      confirmButtonText: '확인'
    });
    return 'false';
  }

  // 나머지 기관 중복여부 조회
  const others = await Promise.all(
    dupFuncs
      .filter((f) => f.fn !== mainFunc.fn)
      .map(async (f) => {
        const r = await f.fn();
        return { name: f.name, result: r };
      })
  );

  // 나머지 기관 null/undifined 체크
  if (others.some((o) => o.result === null || o.result === undefined)) {
    await showAlert({
      icon: 'error',
      html: `중복된 상담예약 건을 조회하는 도중 오류가 발생했습니다.<br/>예약하기를 다시 클릭해 주세요`,
      confirmButtonText: '확인'
    });
    return;
  }

  // 나머지 기관 Y 여부 확인
  const msg = `개인정보 수집 및 이용 동의 후 상담내용을 입력하고 신청하기를 클릭해야<br/>예약이 완료됩니다.`;

  const yList = others.filter((o) => o.result === 'Y').map((o) => o.name);
  if (yList.length > 0) {
    // Y가 있을 때
    const confirm = await showAlert({
      icon: 'info',
      html: `${yList.join(', ')}에 예약을 신청하셨습니다.<br/>${msg}<br/>아울러 다른 기관에도 예약을 신청 하신 내역이 있습니다.<br/>동일사안 중복 상담의 경우 최종적으로 예약이 거절될 수 있습니다.`,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });
    if (!confirm.isConfirmed) return 'false';
  } else {
    // Y가 없을 때
    const confirm = await showAlert({
      icon: 'info',
      showCancelButton: true,
      html: `${mainFunc.name} ${rsvtParam.value.dscsnRsvtInstNm} ${dayjs(rsvtParam.value.rsvtYmd, 'YYYYMMDD').format('YYYY년 MM월 DD일')}(${getCdNm(rsvtParam.value.dowCd)}) ${dayjs(rsvtParam.value.rsvtHm, 'HHmm').format('HH:mm')}(으)로 예약을 신청하셨습니다. ${msg}`,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });
    if (!confirm.isConfirmed) return 'false';
  }
};

/**
 * name : insertRsvtReg
 * desc : 예약 선점 등록
 */
const insertRsvtReg = async () => {
  // 필요한 값 set
  const instSe = rsvtParam.value.instSe;

  const formData = new FormData();

  formData.append('instSe', instSe);
  formData.append('resvGbn', sParams.value.dscsnSeCd);
  formData.append('dscsnSeCd', sParams.value.dscsnSeCd);
  formData.append('orgCd', rsvtParam.value.dscsnRsvtInstNo);
  formData.append('resveDt', rsvtParam.value.rsvtYmd);
  formData.append('resveTm', rsvtParam.value.rsvtHm);
  formData.append('rsvtYmd', rsvtParam.value.rsvtYmd);
  formData.append('rsvtHm', rsvtParam.value.rsvtHm);
  formData.append('stdgCd', rsvtParam.value.stdgCd);
  formData.append('dowCd', rsvtParam.value.dowCd);
  formData.append('region', selectedRsvtInfo.value.rgnNm);

  try {
    await axios.post('/api/dscsn/rsvt/insertRsvtReg', formData).then((res) => {
      rsvtParam.value.rsvtNo = res.data.retCd || res.data.rsvtNo;
    });
  } catch (err) {
    console.log('axios failed', err);
  }
};

/**
 * name : insertRsvtRegRmv
 * desc : 예약 선점 해제하기
 */
const insertRsvtRegRmv = async () => {
  const formData = new FormData();
  const pDscsnSeCd = sParams.value.dscsnSeCd;

  formData.append('instSe', rsvtParam.value.instSe);
  formData.append('dscsnSeCd', pDscsnSeCd);
  formData.append('orgCd', rsvtParam.value.dscsnRsvtInstNo);
  formData.append('rsvtNo', rsvtParam.value.rsvtNo);
  formData.append('resvGbn', pDscsnSeCd);
  formData.append('resveNo', rsvtParam.value.rsvtNo);

  try {
    await axios
      .post('/api/dscsn/rsvt/insertRsvtRegRmv', formData)
      .then((res) => {
        if (res.data.retCd === 'Y') {
          showAlert({
            icon: 'error',
            html: `예약에 실패했습니다.<br/>예약하기를 다시 클릭해 주세요`,
            confirmButtonText: '확인'
          });
        } else {
          showAlert({
            icon: 'error',
            html: `${res.data.retMsg}`,
            confirmButtonText: '확인'
          });
        }
      });
  } catch (err) {
    console.log('axios failed', err);
  }
};

/**
 * name : checkRsvt
 * desc : 예약하기 버튼 클릭 이벤트
 */
const checkRsvt = async () => {
  // 중복체크
  const dypYnFn = await selectAllDupYn();

  if (dypYnFn === 'false') return;

  // 예약 선점 및 저장
  insertRsvtReg().then(() => {
    rsvtParam.value.rgnCd = selectedRsvtInfo.value.rgnCd;
    try {
      axios
        .get('/api/dscsn/rsvt/insertRsvtInfo', { params: rsvtParam.value })
        .then((res) => {
          if (res.data.resultFlag === '1') {
            navigateTo('/dscsn/form/ps1'); //TODO post 방식으로 데이터 넘겨줘야 함
          } else {
            insertRsvtRegRmv();
          }
        });
    } catch (err) {
      console.log('axios failed', err);
    }
  });
};

/**
 * name : goToMyDscsn
 * desc : 예약확인 버튼 클릭 이벤트
 */
const goToMyDscsn = async () => {
  if (authenticated.value) {
    // 1. 로그인 -> 나의 상담 목록 내역(회원)
    // 2. 본인인증 -> 나의 상담 목록 내역(본인인증)
    navigateTo('/my/dscsn/rsvt/RsvtDsctnList');
  } else {
    // TODO 로그인 여부에 따라 분기 필요.. 비회원 상담내역 개발 후 추가 예정
    // 3. 로그아웃(비회원) -> 나의 상담 조회(비회원)
    console.log('비회원 상담조회 이동');
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- TODO 임시 -->
        <Breadcrumb
          v-if="route.query.dscsnSeCd === '1'"
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="면접상담"
        />
        <Breadcrumb
          v-if="route.query.dscsnSeCd === '2'"
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="화상상담"
        />
        <Breadcrumb
          v-if="route.query.dscsnSeCd === '3'"
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전화상담"
        />
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
                        getLwClsfClassName(idx) === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        getLwClsfClassName(idx) === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="onChangeLwClsfTab(item, idx)"
                    >
                      <div class="tit" style="letter-spacing: 0">
                        {{ item.label }}
                      </div>
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
                        getRgnClassName(idx) === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        getRgnClassName(idx) === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="onChangeRgnTab(item, idx, $event)"
                    >
                      <div class="tit">{{ item.rgnNm }}</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="getRgnClassName(idx) === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li v-for="sgg in availSggList" :key="item.stdgCd">
                          <button
                            type="button"
                            :class="[
                              'sub-area-item',
                              sgg.isActive && 'is-active'
                            ]"
                            @click.prevent="onChangeSggTab(sgg, $event)"
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
                  <a-select-option
                    v-for="item in availSggList"
                    :key="item.stdgCd"
                    >{{ item.sggNm }}</a-select-option
                  >
                </a-select>
              </div>
            </div>
            <div class="box-right">
              <div class="select-period-wrap">
                <h4 class="sr-only">기간 선택</h4>
                <div class="select-period-result">
                  <CalendarLayer
                    v-model:selected-dates="selectedDates"
                    @update:model-value="selectedDatesRange($event)"
                    ref="calendarRef"
                  />
                </div>
              </div>
              <div class="select-result-wrap">
                <h4 class="sr-only">선택 결과</h4>
                <!-- <div class="select-result-date">
                  <h5>날짜선택</h5>
                </div> -->
                <div class="select-result-group">
                  <div class="result-group-box">
                    <div
                      v-if="
                        instInfo.kla === true &&
                        (route.query.availInst === 'A' ||
                          route.query.availInst === 'kla')
                      "
                      style="padding-bottom: 10px"
                    >
                      <CommonTitle tag="h5" size="1" type="dot">
                        대한법률구조공단
                      </CommonTitle>
                      <div v-if="selectFlag.klaFlag === '1'">
                        <div v-if="availKlaPlanList.length > 0">
                          <ul class="result-group-btns">
                            <li
                              v-for="(item, index) in availKlaPlanList"
                              :key="`kla${index + 1}`"
                            >
                              <button
                                type="button"
                                :class="[
                                  'result-group-btn',
                                  activePlane[item.key] && 'is-active'
                                ]"
                                @click="onChangePlan(item)"
                              >
                                <div class="main-txt">{{ item.orgNm }}</div>
                                <div class="sub-txt">
                                  {{
                                    dayjs(item.reserveDe).format('YYYY.MM.DD')
                                  }}
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          <div class="guide-txt" style="padding: 10px">
                            조회 가능한 예약건이 없습니다. 조건을 변경해 주세요
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="no-result-group">
                          <span class="info-message"
                            >※ 해당 기관의 예약 가능일자 가져오기가
                            실패하였습니다. 다시 조회하시려면, 새로고침 버튼을
                            클릭하세요.</span
                          >
                          <CommonButton
                            width="sm"
                            height="sm"
                            variants="line-blue"
                            @click="refreshKla"
                          >
                            새로고침
                            <template #right-icon>
                              <Icon name="refreshDark" />
                            </template>
                          </CommonButton>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        instInfo.lhm === true &&
                        (route.query.availInst === 'A' ||
                          route.query.availInst === 'lhm')
                      "
                      style="padding: 7px"
                    >
                      <CommonTitle tag="h5" size="1" type="dot">
                        한국가정법률상담소
                      </CommonTitle>
                      <div v-if="selectFlag.lhmFlag === '1'">
                        <div v-if="availLhmPlanList.length > 0">
                          <ul class="result-group-btns">
                            <li
                              v-for="(item, index) in availLhmPlanList"
                              :key="`lhm${index + 1}`"
                            >
                              <button
                                type="button"
                                :class="[
                                  'result-group-btn',
                                  activePlane[item.key] && 'is-active'
                                ]"
                                @click="onChangePlan(item)"
                              >
                                <!-- TODO orgNm 보이도록 수정 필요 -->
                                <div class="main-txt">{{ item.orgCd }}</div>
                                <div class="sub-txt">
                                  {{ dayjs(item.trgtYmd).format('YYYY.MM.DD') }}
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          <div class="guide-txt" style="padding: 10px">
                            조회 가능한 예약건이 없습니다. 조건을 변경해 주세요
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="no-result-group">
                          <span class="info-message"
                            >※ 해당 기관의 예약 가능일자 가져오기가
                            실패하였습니다. 다시 조회하시려면, 새로고침 버튼을
                            클릭하세요.</span
                          >
                          <CommonButton
                            width="sm"
                            height="sm"
                            variants="line-blue"
                            @click="refreshLhm"
                          >
                            새로고침
                            <template #right-icon>
                              <Icon name="refreshDark" />
                            </template>
                          </CommonButton>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        instInfo.lqa === true &&
                        (route.query.availInst === 'A' ||
                          route.query.availInst === 'lqa')
                      "
                      style="padding: 7px"
                    >
                      <CommonTitle tag="h5" size="1" type="dot">
                        대한가정법률복지상담원
                      </CommonTitle>
                      <div v-if="selectFlag.lqaFlag === '1'">
                        <div v-if="availLqaPlanList.length > 0">
                          <ul class="result-group-btns">
                            <li
                              v-for="(item, index) in availLqaPlanList"
                              :key="`lqa${index + 1}`"
                            >
                              <button
                                type="button"
                                :class="[
                                  'result-group-btn',
                                  activePlane[item.key] && 'is-active'
                                ]"
                                @click="onChangePlan(item)"
                              >
                                <!-- TODO orgNm 보이도록 수정 필요 -->
                                <div class="main-txt">{{ item.orgCd }}</div>
                                <div class="sub-txt">
                                  {{ dayjs(item.trgtYmd).format('YYYY.MM.DD') }}
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          <div class="guide-txt" style="padding: 10px">
                            조회 가능한 예약건이 없습니다. 조건을 변경해 주세요
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="no-result-group">
                          <span class="info-message"
                            >※ 해당 기관의 예약 가능일자 가져오기가
                            실패하였습니다. 다시 조회하시려면, 새로고침 버튼을
                            클릭하세요.</span
                          >
                          <CommonButton
                            width="sm"
                            height="sm"
                            variants="line-blue"
                            @click="refreshLqa"
                          >
                            새로고침
                            <template #right-icon>
                              <Icon name="refreshDark" />
                            </template>
                          </CommonButton>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        instInfo.lhd === true &&
                        (route.query.availInst === 'A' ||
                          route.query.availInst === 'lhd')
                      "
                      style="padding: 7px"
                    >
                      <CommonTitle tag="h5" size="1" type="dot">
                        법률홈닥터
                      </CommonTitle>
                      <div v-if="selectFlag.lhdFlag === '1'">
                        <div v-if="availLhdPlanList.length > 0">
                          <ul class="result-group-btns">
                            <li
                              v-for="(item, index) in availLhdPlanList"
                              :key="`lhd${index + 1}`"
                            >
                              <button
                                type="button"
                                :class="[
                                  'result-group-btn',
                                  activePlane[item.key] && 'is-active'
                                ]"
                                @click="onChangePlan(item)"
                              >
                                <div class="main-txt">{{ item.orgNm }}</div>
                                <div class="sub-txt">
                                  {{
                                    dayjs(item.reserveDe).format('YYYY.MM.DD')
                                  }}
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          <div class="guide-txt" style="padding: 10px">
                            조회 가능한 예약건이 없습니다. 조건을 변경해 주세요
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="no-result-group">
                          <span class="info-message"
                            >※ 해당 기관의 예약 가능일자 가져오기가
                            실패하였습니다. 다시 조회하시려면, 새로고침 버튼을
                            클릭하세요.</span
                          >
                          <CommonButton
                            width="sm"
                            height="sm"
                            variants="line-blue"
                            @click="refreshLhd"
                          >
                            새로고침
                            <template #right-icon>
                              <Icon name="refreshDark" />
                            </template>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="Object.values(instInfo).every((v) => v === false)"
                    >
                      <span class="info-message"
                        >해당 기관에서는 [{{ selectedLwClsfNm }}]을 취급하지
                        않습니다.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="select-result-time">
                  <div class="result-time-box">
                    <CommonTitle tag="h5" size="1" type="dot">
                      시간
                    </CommonTitle>
                    <div v-if="availableTime.length > 0">
                      <div class="select-txt">
                        {{ availableTime[0].timeTxt }}
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
                            <div
                              :class="[
                                'main-txt',
                                { cancelled: item.flag === 'N' }
                              ]"
                              v-if="
                                availableTime[0].key === 'kla' ||
                                availableTime[0].key === 'lhd'
                              "
                            >
                              {{
                                dayjs(item.reserveTime, 'HHmm').format('HH:mm')
                              }}
                            </div>
                            <div
                              :class="[
                                'main-txt',
                                { cancelled: item.flag === 'N' }
                              ]"
                              v-else
                            >
                              {{ dayjs(item.trgtHm, 'HHmm').format('HH:mm') }}
                            </div>
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

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton
            variants="primary"
            width="xs"
            :disabled="isButtonDisabled"
            @click="checkRsvt"
            >예약하기</CommonButton
          >
          <CommonButton variants="line-primary" width="xs" @click="goToMyDscsn">
            예약확인
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/rsvt/DscsnRsvtM';
.cancelled {
  /*시간 취소선*/
  text-decoration: line-through;
  color: gray;
}
</style>
