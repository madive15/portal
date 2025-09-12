<script lang="ts" setup>
import { useInstitutionStore } from '~/stores/search/institution';
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const KAKAO_MAP_KEY = '6805619df2ce78e0e8f9e6803478d249';

definePageMeta({
  layout: 'empty'
});

interface Place {
  place_name: string;
  address_name: string;
  lat: string;
  lng: string;
  phone?: string;
  instNo?: string;
  urlAddr?: string;
}

const route = useRoute();

const svcTypeStore = useSvcTypeStore();
const { svc } = storeToRefs(svcTypeStore);

const { $instInfoOverride } = useNuxtApp();

const srvcInfo = computed(() => {
  return svc.value.length === 0 ? null : $instInfoOverride(svc.value[0]);
});

// Default 좌표
const coordinate = {
  lat: 37.565554,
  lng: 126.977999
};

const currentLat = ref<Number>(coordinate.lat);
const currentLng = ref<Number>(coordinate.lng);

const createCustomMarker = (place: Place, index: number) => {
  const markerImage = new kakao.maps.MarkerImage(
    '/image/sub/myservice/map_maker.png',
    new kakao.maps.Size(29, 42),
    {
      offset: new kakao.maps.Point(14, 42)
    }
  );

  const pos = new kakao.maps.LatLng(Number(place.lat), Number(place.lng));
  const marker = new kakao.maps.Marker({
    position: pos,
    image: markerImage,
    map: window.map
  });

  const infowindow = new kakao.maps.InfoWindow({
    content: `<div style="min-width:150px;text-align:center;padding:5px;font-size:12px;background-color:#1e3561;color:white;">${place.place_name}</div>`
  });
  infowindow.open(window.map, marker);

  return marker;
};

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
    })
    .catch((err) => {
      window.map.setCenter(
        new kakao.maps.LatLng(coordinate.lat, coordinate.lng)
      );
    });
};

const isMarkerPlaced = ref<boolean>(false);

const placeMarker = () => {
  console.log('placeMarker');
  if (isMarkerPlaced.value) {
    console.log('marker is already there');
    return;
  }

  console.log('srvcInfo', srvcInfo.value);
  if (srvcInfo.value != null && window.map) {
    if (!srvcInfo.value.instLat || !srvcInfo.value.instLot) {
      console.log('no coord');
      return;
    }
    console.log('lat', srvcInfo.value.instLat);
    console.log('lot', srvcInfo.value.instLot);
    const place = {
      place_name: srvcInfo.value.instNm,
      address_name: srvcInfo.value.addr,
      lat: srvcInfo.value.instLat,
      lng: srvcInfo.value.instLot
    };
    const center = new kakao.maps.LatLng(place.lat, place.lng);
    const marker = createCustomMarker(place, 0);
    marker.setMap(window.map);
    isMarkerPlaced.value = true;
    window.map.setCenter(center);
  }
};

const closeWindow = () => {
  window.close();
};

watch(svc, (value) => {
  if (!isMarkerPlaced.value && value && window.map) {
    placeMarker();
  }
});

onBeforeMount(async () => {
  const { srvcNo, instNo } = route.query;
  await svcTypeStore.searchSvcList(srvcNo);
});

onMounted(() => {
  // kakao script load
  const script2 = document.createElement('script');
  script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6805619df2ce78e0e8f9e6803478d249&autoload=false&libraries=services,clusterer`;
  script2.onload = () => {
    kakao.maps.load(() => {
      var container = document.getElementById('map');

      var options = {
        level: 7
      };

      if (srvcInfo.value != null) {
        options.center = new kakao.maps.LatLng(
          srvcInfo.value.instLat,
          srvcInfo.value.instLot
        );
      } else {
        options.center = new kakao.maps.LatLng(coordinate.lat, coordinate.lng);
      }

      console.log('options', options);

      const mapObj = new kakao.maps.Map(container, options);
      map.value = mapObj;
      window.map = mapObj;

      if (srvcInfo.value != null) {
        placeMarker();
      } else {
        goToMyLocation();
      }
    });
  };
  document.body.appendChild(script2);
});
</script>

<template>
  <div class="map_popup">
    <div class="map_popup_header">
      <div>
        <img src="/assets/image/main/hd_logo.png" alt="대국민플랫폼" />
      </div>
      <div
        style="
          flex-grow: 1;
          height: 4rem;
          line-height: 1.5rem;
          padding: 0.5rem 2rem;
          vertical-align: middle;
        "
      >
        <template v-if="srvcInfo">
          <span class="font-weight-bold">{{
            $instNmOverride(srvcInfo.instNm, srvcInfo.instNo, srvcInfo.srvcNo)
          }}</span
          ><br />
          <span>{{ srvcInfo.srvcTtl }}</span>
        </template>
      </div>
      <div class="closeButton">
        <button @click="closeWindow">닫기</button>
      </div>
    </div>
    <div class="map_container">
      <div id="map"></div>
    </div>
    <div class="map_popup_footer">
      <span v-if="srvcInfo">{{
        $instAddrOverride(srvcInfo.addr, srvcInfo.instNo, srvcInfo.srvcNo)
      }}</span>
      <span v-else>법률구조플랫폼</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/servicetype/map.scss';
</style>
