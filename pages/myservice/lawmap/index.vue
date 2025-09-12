<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { onMounted, ref } from 'vue';
import { useSrchStore } from '~/stores/srch';
import type { SidoResult } from '~/types/srch';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import useBreakpoint from 'ant-design-vue/es/_util/hooks/useBreakpoint';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTitle from '~/components/ui/title/title.vue';

const KAKAO_MAP_KEY = '623f4ed08a2b0655be91a725a7ce7d94';

interface Place {
  place_name: string;
  address_name: string;
  x: string;
  y: string;
  phone?: string;
  instNo?: string;
  urlAddr?: string;
}

// 선택1 findSrchSvcList UserSrchListResult
const searchStore = useSrchStore();
const {
  srchSvc,
  srchInst,
  srchMap,
  legalWelfareInstituteQuery,
  legalWelfareInstituteResult,
  sidoList,
  gugunList
} = storeToRefs(searchStore);

const srchSvcLoading = ref<boolean>(false);
const sidoLoading = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

// route에서 query params 받아올 값, sido, svcCtgry, q
const { sido, gugun, svcCtgry, q } = route.query;

// 검색창 열기
const searchOpen = ref(false);
const list = ref<any[] | null>(null);
const searchKeyword = ref('');
const searchByCoord = ref<boolean>(false); // 현재위치 기준조회

const DefautText = ref('법률·판례·소송 일반정보');
const DefautTextSido = ref('서울특별시');
const DefautTextGugun = ref('전체');

// Default 좌표
const defaultLatLng = {
  lat: 37.5664056,
  lng: 126.9778222
};

const currentLat = ref<Number>(defaultLatLng.lat);
const currentLng = ref<Number>(defaultLatLng.lng);

const activeBtn = ref('1010000000');
const selectedSido = ref<SidoResult>({
  stdgCd: '1100000000',
  nm: '서울특별시',
  lat: defaultLatLng.lat,
  lot: defaultLatLng.lng
});

const selectedSidoNm = ref<String>('서울특별시');
const selectedGugun = ref<SidoResult>();
const selectedGugunNm = ref<String>('');

const changeBtn = (index) => {
  activeBtn.value = index.ctgryNo;
  DefautText.value = index.ctgryNm;

  doSearch();
};

const setCenterPlace = (item: Place) => {
  const pos = new kakao.maps.LatLng(Number(item.x), Number(item.y));
  window.map.setCenter(pos);
  showPlaceInfoBox.value = false;
};

const makeCall = (item: Place) => {
  if (item.phone) {
    window.open(`tel:${item.phone}`);
  }
};

const msg = ref('');

const changeSido = (sido: SidoResult | string) => {
  if (typeof sido === 'string') {
    if (sido === selectedSidoNm.value) {
      return;
    }
  } else {
    if (sido.stdgCd == selectedSido.value?.stdgCd) {
      return;
    }
  }

  DefautTextGugun.value = '전체';
  if (sido !== '') {
    DefautTextSido.value = sido.nm;
    gugunList.value = [];
    searchResults.value = [];
    // 개별지역 선택시 지도 센터 변경
    searchSidoList(sido.nm);
    selectedSido.value = sido;
    selectedSidoNm.value = sido.nm;
    selectedGugun.value = null;
    selectedGugunNm.value = '';

    if (window.map) {
      try {
        window.map.setCenter(new kakao.maps.LatLng(sido.lat, sido.lot));

        if (['01', '02', '03', '04', '05'].includes(sido.stdgCd)) {
          window.map.setLevel(8);
        } else if (['06', '07', '08'].includes(sido.stdgCd)) {
          window.map.setLevel(7);
        } else if (['09'].includes(sido.stdgCd)) {
          // window.map.setCenter(new kakao.maps.LatLng(37.544698, 126.982965));
          window.map.setLevel(10);
        } else if (['10'].includes(sido.stdgCd)) {
          // window.map.setCenter(new kakao.maps.LatLng(37.59071, 128.40778));
          window.map.setLevel(10);
        } else if (['11', '12', '17'].includes(sido.stdgCd)) {
          window.map.setLevel(10);
        } else if (['16'].includes(sido.stdgCd)) {
          // window.map.setCenter(new kakao.maps.LatLng(35.408631, 128.59256));
          window.map.setLevel(10);
        }
      } catch (e) {
        console.error('map changeLoc error', e);
      }

      doSearch();
    }
  } else {
    DefautTextSido.value = '전체';
    selectedSido.value = null;
    selectedSidoNm.value = '';
    selectedGugun.value = null;
    selectedGugunNm.value = '';
    gugunList.value = [];
    searchResults.value = [];

    doSearch();
  }
};

const changeGugun = (gugun: SidoResult | string) => {
  if (typeof gugun === 'string') {
    if (gugun == selectedGugunNm.value) return;
  } else {
    if (gugun.stdgCd == selectedGugun.value?.stdgCd) return;
  }

  searchResults.value = [];
  if (gugun == '') {
    DefautTextGugun.value = '전체';
    selectedGugun.value = null;
    selectedGugunNm.value = '';

    doSearch();
  } else {
    DefautTextGugun.value = gugun.nm;
    selectedGugun.value = gugun;
    selectedGugunNm.value = gugun.nm;

    if (!searchByCoord.value) {
      currentLat.value = gugun.lat;
      currentLng.value = gugun.lot;
    }

    doSearch();

    if (window.map) {
      try {
        window.map.setCenter(new kakao.maps.LatLng(gugun.lat, gugun.lot));
      } catch (e) {
        // 보안약점 조치 대응을 위한 의미없는 메세지 세팅...
        msg.value = '지도가 아직 준비되지 않았어요.';
      }
    }
  }
};

const openSearchModal = ref(true);
const searchResults = ref<Place[] | null>(null);

let markers: any[] = [];
let infowindows: any[] = [];
let originalList: Place[] = [];

async function searchSrchSvcList() {
  srchSvcLoading.value = true;
  try {
    await searchStore.searchSrchSvcList();
  } catch (error) {
    // 보안약점 조치 대응을 위한 의미없는 메세지 세팅...
    msg.value = '서비스 목록을 받아오지 못했어요.';
  } finally {
    srchSvcLoading.value = false;
  }
}

async function searchSidoList(sidoNm?: string) {
  sidoLoading.value = true;
  await searchStore.getSidoList(sidoNm);
  sidoLoading.value = false;
}

async function searchLegalWelfareInstituteMap() {
  sidoLoading.value = true;

  if (activeBtn.value != '') {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchCategory: activeBtn.value
    };
  }

  await searchStore.searchLegalWelfareInstituteMap(false);
  sidoLoading.value = false;
}

const getCurrentPosition = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error('Geolocation not supported'));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => reject(err)
    );
  });
};

// 마커 전체 제거
const clearMarkers = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  for (let i = 0; i < infowindows.length; i++) {
    infowindows[i].setMap(null);
  }
  infowindows = [];
  clusterer.value?.clear();
  infoWindowClusterer.value?.clear();
};

// 커스텀 마커 생성
const clusterer = ref<any>(null);
const infoWindowClusterer = ref<any>(null);

const showPlaceInfoBox = ref(false);
const showPlaceInfo = ref<Place | null>(null);

const createCustomMarker = (place: Place, index: number) => {
  const markerImage = new kakao.maps.MarkerImage(
    '/image/sub/myservice/map_maker.png',
    new kakao.maps.Size(29, 42),
    {
      offset: new kakao.maps.Point(14, 42)
    }
  );

  const pos = new kakao.maps.LatLng(Number(place.x), Number(place.y));
  const marker = new kakao.maps.Marker({
    position: pos,
    image: markerImage,
    map: window.map
  });

  const infowindow = new kakao.maps.CustomOverlay({
    position: pos,
    content: `<div style="padding:4px;font-size:12px;background-color:#1e3561;color:white;">${place.place_name}</div>`,
    yAnchor: 3.2
  });
  infowindow.setMap(window.map);
  infowindows.push(infowindow);

  // 마커 클릭 이벤트
  kakao.maps.event.addListener(marker, 'click', () => {
    // 마커 클릭시 하단 Infobox 표출
    showPlaceInfoBox.value = true;
    showPlaceInfo.value = place;
  });

  markers.push(marker);

  return infowindow;
};

// 오버레이 생성 함수 (각 결과를 오버레이로 표시)
const createCustomOverlay = (place: Place, index: number) => {
  // 원하는 HTML 구조를 만들어줍니다.
  // 여기서 list-box 형태로 place_name, address_name, phone 등을 HTML로 구성
  const content = document.createElement('div');
  content.className = 'custom-overlay-box';

  // 예: 검색 리스트와 유사한 구조
  const titleEl = document.createElement('h3');
  titleEl.className = 'title';
  titleEl.textContent = place.place_name;
  content.appendChild(titleEl);

  // 위치 설정
  const pos = new kakao.maps.LatLng(Number(place.y), Number(place.x));
  // const overlay = new kakao.maps.CustomOverlay({
  //   position: pos,
  //   content: content,
  //   yAnchor: 1,
  //   map: map.value,
  // });

  const overlay = new kakao.maps.Marker({
    map: window.map,
    position: pos
  });

  markers.push(overlay);
};

const doSearch = async () => {
  if (searchKeyword.value) {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchKeyword: searchKeyword.value
    };
  } else {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchKeyword: ''
    };
  }

  if (activeBtn.value != '') {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchCategory: activeBtn.value
    };
  } else {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchCategory: ''
    };
  }

  if (searchByCoord.value) {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      userLat: currentLat.value,
      userLot: currentLng.value,
      searchRegion: ''
    };
  } else {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      userLat: null,
      userLot: null
    };
  }

  if (selectedSidoNm.value != '') {
    var selectedAddr = selectedSidoNm.value;
    if (selectedGugunNm.value != '') {
      selectedAddr += ` ${selectedGugunNm.value}`;
    }

    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchAddr: selectedAddr
    };
  } else {
    legalWelfareInstituteQuery.value = {
      ...legalWelfareInstituteQuery.value,
      searchRegion: '',
      searchAddr: ''
    };
  }

  await searchStore.searchLegalWelfareInstituteMap(false);
  const list = legalWelfareInstituteResult.value;

  clearMarkers();

  searchResults.value = list.map((item: any) => {
    return {
      instNo: item.instNo,
      place_name: item.brofNm,
      address_name: item.brofAddr,
      x: item.brofLat,
      y: item.brofLot,
      phone: item.brofTel,
      urlAddr: item.urlAddr
    };
  });
  originalList = [...searchResults.value];

  for (let i = 0; i < searchResults.value.length; i++) {
    createCustomMarker(searchResults.value[i], i);
  }
  clusterer.value = new kakao.maps.MarkerClusterer({
    map: window.map,
    markers: markers,
    averageCenter: true,
    minLevel: 6
  });
  infoWindowClusterer.value = new kakao.maps.MarkerClusterer({
    map: window.map,
    markers: infowindows,
    averageCenter: true,
    minLevel: 6,
    styles: [
      {
        display: 'none'
      }
    ]
  });
};

// 거리 계산 함수
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// 거리(m) 계산 함수
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // 지구 반지름(km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // KM
  return d;
};

const activeButton = ref('newest');
// 거리순 정렬
const sortByDistance = () => {
  if (!searchResults.value) return;
  searchResults.value.sort((a, b) => {
    const distA = getDistance(
      Number(currentLat.value),
      Number(currentLng.value),
      Number(a.x),
      Number(a.y)
    );
    const distB = getDistance(
      Number(currentLat.value),
      Number(currentLng.value),
      Number(b.x),
      Number(b.y)
    );
    return distA - distB;
  });
  activeButton.value = 'closest';
  console.log('sortByDistance', searchResults.value);
};

// 원래 순서(최신순) 복원
const sortByOriginalOrder = () => {
  if (!searchResults.value) return;
  searchResults.value = [...originalList];
  activeButton.value = 'newest';
};

const sidoMap = {
  서울: '서울',
  부산: '부산',
  대구: '대구',
  인천: '인천',
  광주: '광주',
  대전: '대전',
  울산: '울산',
  세종: '세종',
  경기도: '경기',
  강원도: '강원',
  충청북도: '충북',
  충청남도: '충남',
  전라북도: '전북',
  전라남도: '전남',
  경상북도: '경북',
  경상남도: '경남',
  제주도: '제주'
};

onMounted(async () => {
  // kakao script load
  const script1 = document.createElement('script');
  const script2 = document.createElement('script');
  script1.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6805619df2ce78e0e8f9e6803478d249&autoload=false`;
  script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6805619df2ce78e0e8f9e6803478d249&autoload=false&libraries=services,clusterer`;
  script2.onload = () => {
    kakao.maps.load(() => {
      var container = document.getElementById('lawmap');
      var rvContainer = document.getElementById('roadview_container');
      var options = {
        center: new kakao.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng),
        level: 7
      };
      const mapObj = new kakao.maps.Map(container, options);
      map.value = mapObj;
      window.map = mapObj;

      // LoadView
      const rv = new kakao.maps.Roadview(rvContainer);
      const rvClient = new kakao.maps.RoadviewClient();
      window.rv = rv;
      window.rvClient = rvClient;
      // 로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록합니다
      kakao.maps.event.addListener(rv, 'position_changed', function () {
        var rvPosition = window.rv.getPosition();
        window.map.setCenter(rvPosition);

        if (roadView.value) {
          roadViewPilotMarker.value.setPosition(rvPosition);
        }
      });

      goToMyLocation();
    });
  };
  document.body.appendChild(script2);
  // document.body.appendChild(script1);

  await Promise.all([
    searchSrchSvcList(),
    searchSidoList(),
    searchLegalWelfareInstituteMap()
  ]);

  if (srchMap.value && Array.isArray(srchMap.value) && route.query.sido) {
    const sidoQuery = String(route.query.sido);

    if (sidoQuery) {
      const sido = sidoList.value.find((item) => item.nm == sidoQuery);

      if (sido) {
        selectedSido.value = sido;
        selectedSidoNm.value = sido.nm;
        DefautTextSido.value = sido.nm;

        // 구군 리스트 불러오기
        await Promise.all([searchSidoList(sido.nm)]);

        // 구군 쿼리 있는경우 구군 선택 처리
        if (route.query.gugun !== '전체') {
          const gugunQuery = String(route.query.gugun);
          const gugun = gugunList.value.find((item) => item.nm == gugunQuery);
          if (gugun) {
            selectedGugun.value = gugun;
            selectedGugunNm.value = gugun.nm;
            DefautTextGugun.value = gugun.nm;
            window.map.setCenter(new kakao.maps.LatLng(gugun.lat, gugun.lot));
          }
        } else {
          window.map.setCenter(new kakao.maps.LatLng(sido.lat, sido.lot));
        }
      }
    }
  }

  if (srchSvc.value && Array.isArray(srchSvc.value) && route.query.svcCtgry) {
    const svcCtgry = String(route.query.svcCtgry);
    const svc = srchSvc.value.find((item) => {
      return item.ctgryNo === svcCtgry;
    });

    if (svc) {
      DefautText.value = svc.ctgryNm;
      activeBtn.value = svc.ctgryNo;
    }
  }
  if (route.query.q) {
    searchKeyword.value = String(route.query.q);
  }

  searchSidoList(selectedSidoNm.value);

  doSearch();
});

const isLoaded = ref(false);
const onReady = () => {
  if (isLoaded.value) return;

  isLoaded.value = true;
};

const map = ref<any>(null);

// 지도 확대
const zoomIn = () => {
  if (!map) return;

  const level = window.map.getLevel();
  window.map.setLevel(level - 1);
};

// 지도 축소
const zoomOut = () => {
  if (!map) return;
  const level = window.map.getLevel();
  window.map.setLevel(level + 1);
};

// 항공뷰 토글
const skyView = ref(false);
const toggleSkyView = () => {
  if (!window.map) return;
  skyView.value = !skyView.value;

  if (skyView.value) {
    window.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
  } else {
    window.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
  }
};

// 로드뷰 토글
const roadView = ref(false);
const roadViewPilotMarker = ref<any>();
const toggleRoadView = () => {
  if (!map.value) return;
  roadView.value = !roadView.value;

  if (roadView.value) {
    document.getElementById('roadview_container').style.display =
      'inline-block';
    window.map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

    // 카카오에서 제공하는 로드뷰 동동이 마커
    const markerImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
      new kakao.maps.Size(26, 46),
      {
        spriteSize: new kakao.maps.Size(1666, 168),
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46)
      }
    );

    const marker = new kakao.maps.Marker({
      position: window.map.getCenter(),
      image: markerImage,
      draggable: true,
      map: window.map
    });

    // 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'dragstart', function (mouseEvent) {
      kakao.maps.event.preventMap();
    });

    kakao.maps.event.addListener(marker, 'dragend', function (mouseEvent) {
      var position = marker.getPosition();
      showRoadView(position);
    });

    marker.setMap(window.map);
    window.map.relayout();
    window.map.setCenter(marker.getPosition());
    showRoadView(marker.getPosition());

    roadViewPilotMarker.value = marker;
  } else {
    window.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    if (roadViewPilotMarker.value) {
      roadViewPilotMarker.value.setMap(null);
      roadViewPilotMarker.value = null;
    }
    window.map.relayout();
    window.map.setCenter(window.map.getCenter());
    document.getElementById('roadview_container').style.display = 'none';
  }
};

const showRoadView = (position) => {
  window.map.relayout();
  window.rv.relayout();
  // 로드뷰의 위치를 지도의 중심으로 설정합니다
  window.rvClient.getNearestPanoId(position, 50, function (panoId) {
    if (!panoId) {
      document.getElementById('roadview_container').style.display = 'none';
      // console.log('해당 위치에 로드뷰 데이터가 없습니다.');
      return;
    } else {
      document.getElementById('roadview_container').style.display =
        'inline-block';
      // console.log('panoId', panoId);
      window.rv.setPanoId(panoId, position);
    }
  });
};

// 내 위치로 이동
const goToMyLocation = () => {
  if (!map) return;

  // get current position
  getCurrentPosition()
    .then(({ lat, lng }) => {
      currentLat.value = lat;
      currentLng.value = lng;
      const center = new kakao.maps.LatLng(lat, lng);
      window.map.setCenter(center);
      /* 2025.08.09 안태정 주석처리 2025.08.11 주석해제*/
      searchStore.getReverseGeocoding(lat, lng).then((data) => {
        const jsonData = JSON.parse(data);
        jsonData.documents
          .filter((item: any) => item.region_type == 'H')
          .forEach((item: any) => {
            // console.log('reverse geocoding item', item);
            // FIXME: 상단 지역별 기관조회 선택을 바꿔줘야 하나? 아닌가? 뭐지?
          });
      });
    })
    .catch((err) => {
      window.map.setCenter(
        new kakao.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng)
      );
      console.error(err);
    });
};

const gotoInstDetail = (item: Place) => {
  if (item.instNo) {
    // router.push({
    //   path: '/servicepvsn',
    //   query: {
    //     instNo: item.instNo
    //   }
    // });
    window.open(`/servicepvsn?instNo=${item.instNo}`, '_blank');
  } else {
    console.error('gotoInstDetail item.instNo is null');
  }
};

const gotoInstWebsite = (item: Place) => {
  if (item.urlAddr) {
    window.open(item.urlAddr, '_blank');
  }
};

const toggleCurrentLocationSearch = (e: Event) => {
  searchByCoord.value = (e.target as HTMLInputElement).checked;

  if (searchByCoord.value) {
    selectedSidoNm.value = '';
    selectedSido.value = null;
    selectedGugunNm.value = '';
    selectedGugun.value = null;
    getCurrentPosition()
      .then(({ lat, lng }) => {
        currentLat.value = lat;
        currentLng.value = lng;
        setCenterPlace({
          place_name: '현재위치',
          address_name: '',
          x: String(lat),
          y: String(lng)
        });
        doSearch();
      })
      .catch((err) => {
        console.error(err);
        // searchByCoord.value = false;
        setCenterPlace({
          place_name: '현재위치(Fallback)',
          address_name: '',
          x: String(currentLat.value),
          y: String(currentLng.value)
        });
      });
  }
  doSearch();
};
</script>

<template>
  <div class="sub-content-box" id="law-map">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="법률복지지도"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '나의 서비스찾기' },
            { text: '법률복지지도', active: true }
          ]"
        />
        <!-- 반응형 모바일 개발 추가사항:법률복지지도 -->
        <div class="mo-law-map-select-box mo-only">
          <div class="mo-select-wrap">
            <div class="mo-title-box">유형별 기관조회</div>
            <div class="mo-select-box">
              <div class="select-root">
                <Dropdown
                  :buttonText="DefautText"
                  :drop-slots="true"
                  class="select-box"
                >
                  <li
                    class="hit-li"
                    v-for="(item, index) in srchSvc"
                    :key="index"
                  >
                    <button
                      type="button"
                      class="btn-item"
                      @click="changeBtn(item)"
                      :title="activeBtn === item.ctgryNo ? '선택됨' : ''"
                    >
                      <span class="text-span">{{ item.ctgryNm }}</span>
                    </button>
                  </li>
                </Dropdown>
              </div>
            </div>
          </div>
          <div class="mo-select-wrap">
            <div class="mo-select-wrap">
              <div class="mo-title-box">
                지역별 기관조회
                <div class="checkbox-root">
                  <input type="checkbox" name="" value="1" id="test" />
                  <label for="test"> 현재위치 기준 조회 </label>
                </div>
              </div>
              <div class="mo-select-box">
                <div class="select-root">
                  <label for="localInstitutionSel">
                    <span class="sr-only">지역별 기관조회 선택</span>
                  </label>
                  <Dropdown
                    :buttonText="DefautTextSido"
                    :drop-slots="true"
                    class="select-box"
                  >
                    <li class="hit-li">
                      <button
                        type="button"
                        class="btn-item"
                        @click="changeSido('')"
                        :title="selectedSidoNm === '' ? '선택됨' : ''"
                      >
                        <span class="text-span">전체</span>
                      </button>
                    </li>
                    <li
                      class="hit-li"
                      v-for="(item, index) in sidoList"
                      :key="index"
                    >
                      <button
                        type="button"
                        class="btn-item"
                        @click="changeSido(item)"
                        :title="selectedSidoNm === item.nm ? '선택됨' : ''"
                      >
                        <span class="text-span">{{ item.nm }}</span>
                      </button>
                    </li>
                  </Dropdown>
                </div>
                <div class="select-root">
                  <label for="localInstitutionDetailSel">
                    <span class="sr-only">지역별 기관조회 세부 선택</span>
                  </label>
                  <Dropdown
                    :buttonText="DefautTextGugun"
                    :drop-slots="true"
                    class="select-box"
                  >
                    <li class="hit-li">
                      <button
                        type="button"
                        class="btn-item"
                        @click="changeGugun('')"
                        :title="selectedGugunNm === '' ? '선택됨' : ''"
                      >
                        <span class="text-span">전체</span>
                      </button>
                    </li>
                    <li
                      class="hit-li"
                      v-for="(item, index) in gugunList"
                      :key="index"
                    >
                      <button
                        type="button"
                        class="btn-item"
                        @click="changeGugun(item)"
                        :title="selectedGugunNm === item.nm ? '선택됨' : ''"
                      >
                        <span class="text-span">{{ item.nm }}</span>
                      </button>
                    </li>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--// 반응형 모바일 개발 추가사항 -->
        <div class="pc-only">
          <div class="pt-3 text-right">
            <input
              type="checkbox"
              name="searchNearByFlag"
              value="1"
              id="law-map-checkcbox"
              @change="toggleCurrentLocationSearch"
            />
            <label for="law-map-checkbox"> 현재위치 기준 조회 </label>
          </div>

          <div v-if="srchSvc" class="select-wrap">
            <div class="title-box">
              유형별 기관조회
              <!--div style="color: white">반영</div-->
            </div>
            <div class="select-box">
              <div class="flex-box grid-col5">
                <!-- searchStore.srchSvc 로 btn 그림 -->
                <template v-for="item in srchSvc">
                  <button
                    type="button"
                    class="select-btn"
                    :class="{ active: activeBtn === item.ctgryNo }"
                    :title="activeBtn === item.ctgryNo ? '선택됨' : ''"
                    @click="changeBtn(item)"
                  >
                    {{ item.ctgryNm }}
                  </button>
                </template>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="card p-4">데이터가 없습니다.</div>
          </div>
          <div v-if="sidoList && !searchByCoord" class="location-wrap">
            <div class="title-box">지역별 기관조회</div>
            <div class="select-box">
              <div class="flex-box grid-col9">
                <button
                  type="button"
                  class="loc-btn"
                  :class="{ active: selectedSidoNm === '' }"
                  :title="selectedSidoNm === '' ? '선택됨' : ''"
                  @click="changeSido('')"
                >
                  전체
                </button>
                <template v-for="item in sidoList">
                  <button
                    type="button"
                    class="loc-btn"
                    :class="{ active: selectedSidoNm === item.nm }"
                    :title="selectedSidoNm === item.nm ? '선택됨' : ''"
                    @click="changeSido(item)"
                  >
                    {{ item.nm }}
                  </button>
                </template>
              </div>
            </div>
            <div
              v-if="selectedSidoNm != '' && gugunList"
              class="select-box mt-4 line-box"
            >
              <div class="flex-box grid-col9">
                <button
                  type="button"
                  class="loc-btn"
                  :class="{ active: selectedGugunNm == '' }"
                  :title="selectedGugunNm == '' ? '선택됨' : ''"
                  @click="changeGugun('')"
                >
                  전체
                </button>
                <template v-for="item in gugunList">
                  <button
                    type="button"
                    class="loc-btn"
                    :class="{ active: selectedGugunNm == item.nm }"
                    :title="selectedGugunNm == item.nm ? '선택됨' : ''"
                    @click="changeGugun(item)"
                  >
                    {{ item.nm }}
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section2">
      <div class="container">
        <p class="text mb-3" v-show="false">
          최초 정보는 내 위치 기준 반경 10km 이내의 기관정보를 조회합니다.
        </p>
        <div class="map-box">
          <div class="map-info-box">
            <div :class="`map-container ${roadView ? 'with-roadview' : ''}`">
              <div id="lawmap" class="map">
                <!-- 지도영역 -->
              </div>

              <!-- 검색창 열기 버튼 -->
              <button
                type="button"
                class="search-button"
                @click="openSearchModal = true"
                v-if="!openSearchModal"
              >
                <img src="/assets/image/sub/myservice/open.svg" alt="맵" />
                <p>검색창 열기</p>
              </button>

              <!-- 검색창 -->
              <div class="search-box" v-if="openSearchModal">
                <div class="search-wrap">
                  <label for="law-map-text">
                    <span class="sr-only">기관명 검색</span>
                  </label>
                  <input
                    type="text"
                    v-model="searchKeyword"
                    placeholder="기관명 검색"
                    id="law-map-text"
                    @keyup.enter="doSearch"
                  />
                  <button class="find-btn" @click="doSearch">
                    <img
                      src="/assets/image/sub/myservice/search_for_institution.svg"
                      alt="기관명 검색"
                    />
                  </button>
                </div>
                <div class="message-wrap">
                  <div class="text">
                    전국 기준의 기관정보 조회가 가능합니다.
                  </div>
                  <div class="order-box">
                    <button
                      type="button"
                      class="closest"
                      :class="{ active: activeButton === 'closest' }"
                      :title="activeButton === 'closest' ? '선택됨' : ''"
                      @click="sortByDistance"
                    >
                      거리순
                    </button>
                    <button
                      type="button"
                      class="newest"
                      :class="{ active: activeButton === 'newest' }"
                      :title="activeButton === 'newest' ? '선택됨' : ''"
                      @click="sortByOriginalOrder"
                    >
                      최신순
                    </button>
                  </div>
                </div>

                <div class="list-wrap">
                  <div
                    v-if="searchResults && searchResults.length > 0"
                    v-for="(item, i) in searchResults"
                    :key="i"
                    class="list-box"
                  >
                    <CommonTitle
                      tag="h4"
                      size="3"
                      @click="setCenterPlace(item)"
                      class="title"
                    >
                      {{ item.place_name }}
                    </CommonTitle>
                    <p class="address" @click="setCenterPlace(item)">
                      {{ item.address_name }}
                    </p>
                    <div class="tel-box" @click="makeCall(item)">
                      <div class="img-box">
                        <img
                          src="/assets/image/sub/myservice/tel.svg"
                          alt="전화번호"
                        />
                      </div>
                      <p>{{ item.phone || '연락처 정보 없음' }}</p>
                    </div>
                    <div class="buttons">
                      <button
                        type="button"
                        title="자세히 보기"
                        class="btn detail"
                        @click="gotoInstDetail(item)"
                      >
                        <span class="text">자세히 보기</span>
                        <i class="icon-view"></i>
                      </button>
                      <button
                        type="button"
                        title="홈페이지 바로가기"
                        class="btn shortcut"
                        v-if="item.urlAddr"
                        @click="gotoInstWebsite(item)"
                      >
                        <span class="text">홈페이지 바로가기</span>
                        <img
                          src="/assets/image/sub/myservice/shortcut_black.svg"
                          alt="바로가기"
                        />
                      </button>
                    </div>
                  </div>
                  <div
                    v-else-if="searchResults && searchResults.length === 0"
                    class="list-box-none"
                  >
                    <img
                      src="/assets/image/sub/myservice/no_results.svg"
                      alt="검색결과 없을때"
                    />
                    <p>검색된 결과가 존재하지 않습니다.</p>
                  </div>
                </div>

                <button class="close-wrap" @click="openSearchModal = false">
                  <span class="sr-only">닫기</span>
                </button>
              </div>

              <!-- 현재 내위치 버튼 -->
              <div class="map-tools">
                <button
                  type="button"
                  class="map-tool-btn position-btn"
                  @click="goToMyLocation"
                  title="현재위치 보기"
                >
                  <img
                    src="/assets/image/sub/myservice/location.svg"
                    alt="현재위치"
                  />
                </button>
                <button
                  type="button"
                  class="map-tool-btn"
                  :class="[{ active: skyView }]"
                  @click="toggleSkyView"
                  title="항공뷰 보기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="항공뷰"
                    viewBox="0 0 25 25"
                  >
                    <path
                      d="M8.77,8.95c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                    <path
                      d="M6.07,10.8c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                    <path
                      d="M3.36,12.65c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                    <path
                      d="M7.46,24.85c-.12,0-.24-.03-.35-.09-.21-.12-.35-.35-.35-.6v-3.33c0-.22.1-.42.28-.55l2.8-2.12v-4.64l-7.62,3.07c-.21.09-.46.06-.65-.07-.19-.13-.31-.35-.31-.58v-3.02c0-.23.11-.44.3-.57l8.27-5.66v-3.87c0-1.47,1.19-2.66,2.66-2.66s2.66,1.19,2.66,2.66v3.87l8.27,5.66c.19.13.3.34.3.57v3.02c0,.23-.11.45-.31.58-.19.13-.43.16-.65.07l-7.61-3.07v4.64l2.8,2.12c.17.13.28.34.28.55v3.33c0,.25-.13.48-.35.6-.21.12-.48.12-.69,0l-4.7-2.68-4.7,2.68c-.11.06-.23.09-.34.09ZM8.15,21.17v1.79l4-2.29c.21-.12.48-.12.69,0l4,2.29v-1.79l-2.8-2.12c-.17-.13-.28-.34-.28-.55v-6.01c0-.23.11-.45.31-.58.19-.13.43-.15.65-.07l7.61,3.07v-1.62l-8.27-5.66c-.19-.13-.3-.34-.3-.57V2.81c0-.7-.57-1.27-1.27-1.27s-1.27.57-1.27,1.27v4.24c0,.23-.11.44-.3.57L2.66,13.29v1.62l7.62-3.07c.21-.09.46-.06.65.07.19.13.31.35.31.58v6.01c0,.22-.1.42-.28.55l-2.8,2.12Z"
                    />
                    <path
                      d="M16.23,8.95c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                    <path
                      d="M18.93,10.8c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                    <path
                      d="M21.64,12.65c-.38,0-.7-.31-.7-.7v-1.79c0-.38.31-.7.7-.7s.7.31.7.7v1.79c0,.38-.31.7-.7.7Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="map-tool-btn"
                  :class="[{ active: roadView }]"
                  @click="toggleRoadView"
                  title="로드뷰 보기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="로드뷰"
                    viewBox="0 0 25 25"
                  >
                    <path
                      d="M7.78,18.33h0c-.21,0-.42-.09-.56-.26L1.74,11.62s-.03-.04-.05-.06c-.82-1.21-1.25-2.63-1.25-4.11C.44,3.4,3.73.1,7.78.1s7.34,3.29,7.34,7.34c0,1.47-.43,2.89-1.25,4.11-.01.02-.03.04-.05.06l-5.48,6.46c-.14.16-.34.26-.56.26ZM2.88,10.7l4.9,5.77,4.9-5.77c.64-.96.98-2.09.98-3.26,0-3.24-2.64-5.88-5.88-5.88S1.9,4.2,1.9,7.45c0,1.17.34,2.29.98,3.26ZM13.27,11.14h0,0ZM7.78,10.6c-1.75,0-3.18-1.43-3.18-3.18s1.43-3.18,3.18-3.18,3.18,1.43,3.18,3.18-1.43,3.18-3.18,3.18ZM7.78,5.7c-.95,0-1.72.77-1.72,1.72s.77,1.72,1.72,1.72,1.72-.77,1.72-1.72-.77-1.72-1.72-1.72Z"
                    />
                    <path
                      d="M23.83,24.9H1.17c-.4,0-.73-.33-.73-.73s.33-.73.73-.73h22.66c.4,0,.73.33.73.73s-.33.73-.73.73Z"
                    />
                    <path
                      d="M23.83,14.31h-12.57c-.4,0-.73-.33-.73-.73s.33-.73.73-.73h12.57c.4,0,.73.33.73.73s-.33.73-.73.73Z"
                    />
                    <g>
                      <path
                        d="M4.09,19.6H1.17c-.4,0-.73-.33-.73-.73s.33-.73.73-.73h2.92c.4,0,.73.33.73.73s-.33.73-.73.73Z"
                      />
                      <path
                        d="M15.3,19.6h-5.61c-.4,0-.73-.33-.73-.73s.33-.73.73-.73h5.61c.4,0,.73.33.73.73s-.33.73-.73.73Z"
                      />
                      <path
                        d="M23.83,19.6h-2.92c-.4,0-.73-.33-.73-.73s.33-.73.73-.73h2.92c.4,0,.73.33.73.73s-.33.73-.73.73Z"
                      />
                    </g>
                  </svg>
                </button>
              </div>

              <!-- info-wrap 내에서 검색결과 첫번째를 표시한다고 가정 -->
              <!-- 결과가 최소 1개 이상일 때 최대 2개까지만 표시 -->
              <div class="info-wrap" v-if="showPlaceInfoBox && showPlaceInfo">
                <div class="info-box">
                  <div class="icon-box" @click="setCenterPlace(showPlaceInfo)">
                    <img
                      src="/assets/image/sub/myservice/address.svg"
                      alt="법률복지지도 검색결과 위치"
                    />
                  </div>
                  <div class="title-box" @click="setCenterPlace(showPlaceInfo)">
                    {{ showPlaceInfo.place_name }}
                  </div>
                  <div class="address-box">
                    <div class="upside-wrap">
                      <div
                        class="shortcut-box"
                        @click="gotoInstDetail(showPlaceInfo)"
                      >
                        <img
                          src="/assets/image/sub/myservice/shortcut_blue.svg"
                          alt="연관검색어"
                        />
                      </div>
                      <span class="tel-box">{{
                        showPlaceInfo.phone || '연락처 정보 없음'
                      }}</span>
                      <span class="distance"></span>
                    </div>
                    <div class="downside-wrap">
                      {{ showPlaceInfo.address_name }}
                    </div>
                  </div>

                  <div @click="showPlaceInfoBox = false">
                    <img
                      class="close"
                      src="/assets/image/sub/myservice/close.svg"
                      alt="닫기"
                      style="
                        cursor: pointer;
                        width: 12px;
                        height: 12px;
                        vertical-align: top;
                      "
                    />
                  </div>
                </div>
              </div>

              <!-- 확대축소 버튼-->
              <div class="zoom-box">
                <button
                  type="button"
                  title="지도 확대하기"
                  class="plus"
                  @click="zoomIn"
                >
                  <img
                    src="/assets/image/sub/myservice/map_plus.svg"
                    alt="지도확대"
                  />
                </button>
                <button
                  type="button"
                  title="지도 축소하기"
                  class="minus"
                  @click="zoomOut"
                >
                  <img
                    src="/assets/image/sub/myservice/map_minus.svg"
                    alt="지도축소"
                  />
                </button>
              </div>
            </div>
            <div id="roadview_container" class="roadview-container">
              <div id="lawmap_roadview" class="roadview">
                <!-- 로드뷰영역 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/myservice/lawmap/index.scss';
</style>
