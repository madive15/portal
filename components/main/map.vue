<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMapStore } from '~/stores/main/map';
import { storeToRefs } from 'pinia';
import { useSrchStore } from '~/stores/srch';
import type { MapSvcCtgryInfo, MapSvcCtgryIstInfo } from '~/types/main/map';

type MapSvcCtgryIstInfosWithId = MapSvcCtgryIstInfo & { id: number };

const mapSvcCtgryInfo = ref<MapSvcCtgryInfo[]>([]);
const mapSvcCtgryIstInfo = ref<MapSvcCtgryIstInfo[]>([]);
const listData = ref<MapSvcCtgryIstInfosWithId[]>([]);
const resetData = ref<MapSvcCtgryIstInfosWithId[]>([]);

const mapInfo = useMapStore();
const { MapSvcCtgryInfoList, MapSvcCtgryIstInfoList } = storeToRefs(mapInfo);

const searchStore = useSrchStore();

onBeforeMount(async () => {
  reset();
  await Promise.all([
    mapInfo.searchMapSvcCtgryInfoList(),
    mapInfo.searchMapSvcCtgryIstInfoList()
  ]);
  mapSvcCtgryInfo.value = [...MapSvcCtgryInfoList.value];
  mapSvcCtgryIstInfo.value = [...MapSvcCtgryIstInfoList.value];

  let data = mapSvcCtgryIstInfo.value.map((item, index) => ({
    ...item,
    id: index + 1
  }));

  // 도
  data = data.filter((item) => item.rgnCd === '01');

  // 유형별기관 코드
  data = data.filter((item) => item.ctgryNo === '1010000000');

  listData.value = data.filter((item) => item.rgnCd === '01').splice(0, 2);
  resetData.value = data.filter((item) => item.rgnCd === '01').splice(0, 2);
});

const gotoMap = () => {
  const router = useRouter();
  router.push({
    path: '/myservice/lawmap',
    query: {
      sido: selectedSido.value,
      gugun: selectedGugunNm.value,
      svcCtgry: selectedMapSvcCtgry.value,
      q: mapSvcCtgryNm.value
    },
    external: true
  });
};

const currentLat = ref<Number | null>(null);
const currentLng = ref<Number | null>(null);

const selectedSido = ref<string>('서울특별시');
const selectedGugun = ref<string>('seoul_');
const selectedGugunNm = ref<string>('');
const selectedGugunField = ref<any>({
  name: '',
  region: 'seoul',
  field: '',
  right: 183,
  top: 207
});
const activeImageSrc = ref<string>(''); // 초기에는 비워둠
const selectedMapSvcCtgry = ref<string>('1010000000');

const mapSvcCtgryNm = ref<string>('');

const getCurrentPosition = (): Promise<{
  lat: number;
  lng: number;
  sido?: string;
  gugun?: string;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error('Geolocation not supported'));
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;

        currentLat.value = lat;
        currentLng.value = lng;

        // const jsonData = await searchStore
        //   .getReverseGeocoding(lat, lng)
        //   .then((data: string) => {
        //     return JSON.parse(data);
        //   });
        //
        // const currentRegion = jsonData.documents.filter(
        //   (item: any) => item.region_type == 'H'
        // )[0];
        // let { region_1depth_name: sido, region_2depth_name: gugun } =
        //   currentRegion;
        //
        // // sido 에서 "특별시, 광역시, 특별자치" 제외
        // sido = sido.replace(/(특별시|광역시|특별자치)/, '');
        // selectedSido.value = sido;
        //
        // const sidoArray = mapList.filter((item) => item.name === sido);
        // if (sidoArray.length <= 0) {
        //   return;
        // }
        //
        // const gugunArray = sidoArray[0].field.filter(
        //   (item) => item.name === gugun
        // );
        // if (gugunArray.length <= 0) {
        //   return;
        // }
        //
        // activeImageSrc.value = `/image/main/${gugunArray[0].region}_${gugunArray[0].field}.png`;
        // selectedGugun.value = `${gugunArray[0].region}_${gugunArray[0].field}`;
        // selectedGugunNm.value = gugunArray[0].name;
        // selectedGugunField.value = gugunArray[0];

        resolve({
          lat,
          lng
          // sido,
          // gugun
        });
      },
      (err) => reject(err)
    );
  });
};

onMounted(() => {
  // 현재위치 조회 요청
  getCurrentPosition();
});

export type mapType = {
  id: number;
  name: string;
  region: string;
  code: string;
  field: fieldType[];
};

export type fieldType = {
  name: string;
  region: string;
  field: string;
  right: number;
  top: number;
};

const mapList: mapType[] = [
  {
    id: 1,
    name: '서울특별시',
    region: 'seoul',
    code: '01',
    field: [
      {
        name: '강남구',
        region: 'seoul',
        field: 'gangnam',
        right: 64,
        top: 234
      },
      {
        name: '강동구',
        region: 'seoul',
        field: 'gangdong',
        right: -6,
        top: 169
      },
      {
        name: '강북구',
        region: 'seoul',
        field: 'gangbuk',
        right: 142,
        top: 24
      },
      {
        name: '강서구',
        region: 'seoul',
        field: 'gangseo',
        right: 336,
        top: 138
      },
      {
        name: '관악구',
        region: 'seoul',
        field: 'gwanak',
        right: 214,
        top: 291
      },
      {
        name: '광진구',
        region: 'seoul',
        field: 'gwangjin',
        right: 73,
        top: 181
      },
      {
        name: '구로구',
        region: 'seoul',
        field: 'guro',
        right: 308,
        top: 260
      },
      {
        name: '금천구',
        region: 'seoul',
        field: 'geumcheon',
        right: 282,
        top: 300
      },
      {
        name: '노원구',
        region: 'seoul',
        field: 'nowon',
        right: 74,
        top: 6
      },
      {
        name: '도봉구',
        region: 'seoul',
        field: 'dobong',
        right: 141,
        top: 1
      },
      {
        name: '동대문구',
        region: 'seoul',
        field: 'dongdaemun',
        right: 113,
        top: 133
      },
      {
        name: '동작구',
        region: 'seoul',
        field: 'dongjak',
        right: 218,
        top: 258
      },
      {
        name: '마포구',
        region: 'seoul',
        field: 'mapo',
        right: 242,
        top: 155
      },
      {
        name: '서대문구',
        region: 'seoul',
        field: 'seodaemun',
        right: 235,
        top: 129
      },
      {
        name: '서초구',
        region: 'seoul',
        field: 'seocho',
        right: 94,
        top: 248
      },
      {
        name: '성동구',
        region: 'seoul',
        field: 'sungdong',
        right: 121,
        top: 183
      },
      {
        name: '성북구',
        region: 'seoul',
        field: 'sungbuk',
        right: 121,
        top: 91
      },
      {
        name: '송파구',
        region: 'seoul',
        field: 'songpa',
        right: 19,
        top: 225
      },
      {
        name: '양천구',
        region: 'seoul',
        field: 'yangcheon',
        right: 324,
        top: 212
      },
      {
        name: '영등포구',
        region: 'seoul',
        field: 'yeongdeungpo',
        right: 261,
        top: 207
      },
      {
        name: '용산구',
        region: 'seoul',
        field: 'yongsan',
        right: 183,
        top: 207
      },
      {
        name: '은평구',
        region: 'seoul',
        field: 'eunpyeong',
        right: 232,
        top: 62
      },
      {
        name: '종로구',
        region: 'seoul',
        field: 'jongro',
        right: 174,
        top: 96
      },
      {
        name: '중구',
        region: 'seoul',
        field: 'junggu',
        right: 170,
        top: 183
      },
      {
        name: '중랑구',
        region: 'seoul',
        field: 'jungrang',
        right: 69,
        top: 111
      }
    ]
  },
  {
    id: 2,
    name: '부산광역시',
    region: 'busan',
    code: '02',
    field: [
      {
        name: '강서구',
        region: 'busan',
        field: 'gangseo',
        right: 239,
        top: 161
      },
      {
        name: '금정구',
        region: 'busan',
        field: 'geumjeong',
        right: 124,
        top: 81
      },
      {
        name: '기장군',
        region: 'busan',
        field: 'gijang',
        right: -7,
        top: 1
      },
      {
        name: '남구',
        region: 'busan',
        field: 'namgu',
        right: 132,
        top: 229
      },
      {
        name: '동구',
        region: 'busan',
        field: 'donggu',
        right: 188,
        top: 244
      },
      {
        name: '동래구',
        region: 'busan',
        field: 'dongrae',
        right: 142,
        top: 163
      },
      {
        name: '부산진구',
        region: 'busan',
        field: 'busanji',
        right: 173,
        top: 190
      },
      {
        name: '북구',
        region: 'busan',
        field: 'bukku',
        right: 191,
        top: 112
      },
      {
        name: '사하구',
        region: 'busan',
        field: 'saha',
        right: 229,
        top: 266
      },
      {
        name: '사상구',
        region: 'busan',
        field: 'sasang',
        right: 222,
        top: 192
      },
      {
        name: '서구',
        region: 'busan',
        field: 'seogu',
        right: 215,
        top: 251
      },
      {
        name: '수영구',
        region: 'busan',
        field: 'suyeong',
        right: 114,
        top: 207
      },
      {
        name: '연제구',
        region: 'busan',
        field: 'yeonje',
        right: 146,
        top: 192
      },
      {
        name: '영도구',
        region: 'busan',
        field: 'yeongdo',
        right: 162,
        top: 292
      },
      {
        name: '중구',
        region: 'busan',
        field: 'junggu',
        right: 187,
        top: 275
      },
      {
        name: '해운대구',
        region: 'busan',
        field: 'haeundae',
        right: 70,
        top: 139
      }
    ]
  },
  {
    id: 3,
    name: '대구광역시',
    region: 'daegu',
    code: '03',
    field: [
      {
        name: '군위군',
        region: 'daegu',
        field: 'gunwi',
        right: -4,
        top: 2
      },
      {
        name: '남구',
        region: 'daegu',
        field: 'namgu',
        right: 119,
        top: 246
      },
      {
        name: '달서구',
        region: 'daegu',
        field: 'dalseo',
        right: 134,
        top: 246
      },
      {
        name: '달성군',
        region: 'daegu',
        field: 'dalsung',
        right: 81,
        top: 196
      },
      {
        name: '동구',
        region: 'daegu',
        field: 'donggu',
        right: 51,
        top: 151
      },
      {
        name: '북구',
        region: 'daegu',
        field: 'bukku',
        right: 113,
        top: 158
      },
      {
        name: '서구',
        region: 'daegu',
        field: 'seogu',
        right: 142,
        top: 223
      },
      {
        name: '수성구',
        region: 'daegu',
        field: 'suseong',
        right: 66,
        top: 235
      },
      {
        name: '중구',
        region: 'daegu',
        field: 'junggu',
        right: 127,
        top: 230
      }
    ]
  },
  {
    id: 4,
    name: '인천광역시',
    region: 'incheon',
    code: '04',
    field: [
      {
        name: '강화군',
        region: 'incheon',
        field: 'ganghwa',
        right: 178,
        top: 0
      },
      {
        name: '계양구',
        region: 'incheon',
        field: 'gyeyang',
        right: -6,
        top: 140
      },
      {
        name: '남구',
        region: 'incheon',
        field: 'namgu',
        right: 69,
        top: 238
      },
      {
        name: '남동구',
        region: 'incheon',
        field: 'namdong',
        right: 1,
        top: 247
      },
      {
        name: '동구',
        region: 'incheon',
        field: 'donggu',
        right: 101,
        top: 229
      },
      {
        name: '부평구',
        region: 'incheon',
        field: 'bupyeong',
        right: 14,
        top: 200
      },
      {
        name: '서구',
        region: 'incheon',
        field: 'seogu',
        right: 49,
        top: 102
      },
      {
        name: '연수구',
        region: 'incheon',
        field: 'yeongsu',
        right: 61,
        top: 274
      },
      {
        name: '웅진군',
        region: 'incheon',
        field: 'ongjin',
        right: 343,
        top: 174
      },
      {
        name: '중구',
        region: 'incheon',
        field: 'junggu',
        right: 105,
        top: 164
      }
    ]
  },
  {
    id: 5,
    name: '광주광역시',
    region: 'gwangju',
    code: '05',
    field: [
      {
        name: '광산구',
        region: 'gwangju',
        field: 'gwangsan',
        right: 172,
        top: 7
      },
      {
        name: '남구',
        region: 'gwangju',
        field: 'namgu',
        right: 98,
        top: 153
      },
      {
        name: '동구',
        region: 'gwangju',
        field: 'donggu',
        right: 4,
        top: 138
      },
      {
        name: '북구',
        region: 'gwangju',
        field: 'bukku',
        right: -5,
        top: 0
      },
      {
        name: '서구',
        region: 'gwangju',
        field: 'seogu',
        right: 122,
        top: 115
      }
    ]
  },
  {
    id: 6,
    name: '대전광역시',
    region: 'daejeon',
    code: '06',
    field: [
      {
        name: '대덕구',
        region: 'daejeon',
        field: 'daedeok',
        right: 52,
        top: 22
      },
      {
        name: '동구',
        region: 'daejeon',
        field: 'donggu',
        right: -5,
        top: 74
      },
      {
        name: '서구',
        region: 'daejeon',
        field: 'seogu',
        right: 178,
        top: 149
      },
      {
        name: '유성구',
        region: 'daejeon',
        field: 'yuseong',
        right: 182,
        top: 1
      },
      {
        name: '중구',
        region: 'daejeon',
        field: 'junggu',
        right: 112,
        top: 181
      }
    ]
  },
  {
    id: 7,
    name: '울산광역시',
    region: 'ulsan',
    code: '07',
    field: [
      {
        name: '남구',
        region: 'ulsan',
        field: 'namgu',
        right: 58,
        top: 169
      },
      {
        name: '동구',
        region: 'ulsan',
        field: 'donggu',
        right: -1,
        top: 147
      },
      {
        name: '북구',
        region: 'ulsan',
        field: 'bukku',
        right: -6,
        top: 54
      },
      {
        name: '울주군',
        region: 'ulsan',
        field: 'ulju',
        right: 70,
        top: 0
      },
      {
        name: '중구',
        region: 'ulsan',
        field: 'junggu',
        right: 96,
        top: 129
      }
    ]
  },
  {
    id: 8,
    name: '경기도',
    region: 'gyeonggi',
    code: '09',
    field: [
      {
        name: '가평군',
        region: 'gyeonggi',
        field: 'gapyeong',
        right: 46,
        top: 70
      },
      {
        name: '고양시',
        region: 'gyeonggi',
        field: 'goyang',
        right: 186,
        top: 153
      },
      {
        name: '과천시',
        region: 'gyeonggi',
        field: 'gwacheon',
        right: 172,
        top: 229
      },
      {
        name: '광명시',
        region: 'gyeonggi',
        field: 'gwangmyeong',
        right: 208,
        top: 223
      },
      {
        name: '광주시',
        region: 'gyeonggi',
        field: 'gwangju',
        right: 86,
        top: 215
      },
      {
        name: '구리시',
        region: 'gyeonggi',
        field: 'guri',
        right: 146,
        top: 185
      },
      {
        name: '군포시',
        region: 'gyeonggi',
        field: 'gunpo',
        right: 195,
        top: 260
      },
      {
        name: '김포시',
        region: 'gyeonggi',
        field: 'gimpo',
        right: 228,
        top: 144
      },
      {
        name: '남양주시',
        region: 'gyeonggi',
        field: 'namyangju',
        right: 99,
        top: 146
      },
      {
        name: '동두천시',
        region: 'gyeonggi',
        field: 'dongjucheon',
        right: 151,
        top: 100
      },
      {
        name: '부천시',
        region: 'gyeonggi',
        field: 'bucheon',
        right: 225,
        top: 203
      },
      {
        name: '성남시',
        region: 'gyeonggi',
        field: 'sungnam',
        right: 142,
        top: 232
      },
      {
        name: '수원시',
        region: 'gyeonggi',
        field: 'suwon',
        right: 167,
        top: 268
      },
      {
        name: '시흥시',
        region: 'gyeonggi',
        field: 'siheung',
        right: 213,
        top: 237
      },
      {
        name: '안산시',
        region: 'gyeonggi',
        field: 'ansan',
        right: 202,
        top: 261
      },
      {
        name: '안성시',
        region: 'gyeonggi',
        field: 'ansung',
        right: 70,
        top: 326
      },
      {
        name: '안양시',
        region: 'gyeonggi',
        field: 'anyang',
        right: 190,
        top: 235
      },
      {
        name: '양주시',
        region: 'gyeonggi',
        field: 'yangju',
        right: 158,
        top: 100
      },
      {
        name: '연천군',
        region: 'gyeonggi',
        field: 'yeoncheon',
        right: 143,
        top: 2
      },
      {
        name: '양평군',
        region: 'gyeonggi',
        field: 'yangpyeong',
        right: -6,
        top: 178
      },
      {
        name: '여주시',
        region: 'gyeonggi',
        field: 'yeoju',
        right: 12,
        top: 243
      },
      {
        name: '오산시',
        region: 'gyeonggi',
        field: 'osan',
        right: 176,
        top: 311
      },
      {
        name: '용인시',
        region: 'gyeonggi',
        field: 'yongin',
        right: 88,
        top: 263
      },
      {
        name: '의정부시',
        region: 'gyeonggi',
        field: 'uijeongbu',
        right: 153,
        top: 150
      },
      {
        name: '의왕시',
        region: 'gyeonggi',
        field: 'uiwang',
        right: 176,
        top: 251
      },
      {
        name: '이천시',
        region: 'gyeonggi',
        field: 'icheon',
        right: 42,
        top: 266
      },
      {
        name: '파주시',
        region: 'gyeonggi',
        field: 'paju',
        right: 181,
        top: 80
      },
      {
        name: '포천시',
        region: 'gyeonggi',
        field: 'pocheon',
        right: 85,
        top: 25
      },
      {
        name: '평택시',
        region: 'gyeonggi',
        field: 'pyeongtaek',
        right: 153,
        top: 328
      },
      {
        name: '하남시',
        region: 'gyeonggi',
        field: 'hanam',
        right: 121,
        top: 201
      },
      {
        name: '화성시',
        region: 'gyeonggi',
        field: 'hwasung',
        right: 151,
        top: 286
      }
    ]
  },
  {
    id: 9,
    name: '강원특별자치도',
    region: 'kangwon',
    code: '10',
    field: [
      {
        name: '고성군',
        region: 'kangwon',
        field: 'goseong',
        right: 135,
        top: 1
      },
      {
        name: '동해시',
        region: 'kangwon',
        field: 'donghae',
        right: 33,
        top: 230
      },
      {
        name: '삼척시',
        region: 'kangwon',
        field: 'samcheok',
        right: -8,
        top: 255
      },
      {
        name: '속초시',
        region: 'kangwon',
        field: 'sokcho',
        right: 130,
        top: 86
      },
      {
        name: '양양군',
        region: 'kangwon',
        field: 'yangyang',
        right: 95,
        top: 99
      },
      {
        name: '영월군',
        region: 'kangwon',
        field: 'yeongwol',
        right: 79,
        top: 274
      },
      {
        name: '원주시',
        region: 'kangwon',
        field: 'wonju',
        right: 192,
        top: 250
      },
      {
        name: '인제군',
        region: 'kangwon',
        field: 'injae',
        right: 147,
        top: 57
      },
      {
        name: '양구군',
        region: 'kangwon',
        field: 'yanggu',
        right: 213,
        top: 70
      },
      {
        name: '정선군',
        region: 'kangwon',
        field: 'jeongseon',
        right: 66,
        top: 236
      },
      {
        name: '제천시',
        region: 'kangwon',
        field: 'jaecheon',
        right: 45,
        top: 156
      },
      {
        name: '철원군',
        region: 'kangwon',
        field: 'cheolwon',
        right: 302,
        top: 67
      },
      {
        name: '춘천시',
        region: 'kangwon',
        field: 'chuncheon',
        right: 231,
        top: 124
      },
      {
        name: '평창군',
        region: 'kangwon',
        field: 'pyeongchang',
        right: 105,
        top: 181
      },
      {
        name: '화천군',
        region: 'kangwon',
        field: 'hwacheon',
        right: 255,
        top: 66
      },
      {
        name: '홍천군',
        region: 'kangwon',
        field: 'hongcheon',
        right: 134,
        top: 157
      },
      {
        name: '횡성군',
        region: 'kangwon',
        field: 'hoengseong',
        right: 186,
        top: 214
      }
    ]
  },
  {
    id: 10,
    name: '충청북도',
    region: 'chungbuk',
    code: '11',
    field: [
      {
        name: '괴산군',
        region: 'chungbuk',
        field: 'goesan',
        right: 139,
        top: 105
      },
      {
        name: '단양군',
        region: 'chungbuk',
        field: 'danyang',
        right: -6,
        top: 31
      },
      {
        name: '보은군',
        region: 'chungbuk',
        field: 'boeun',
        right: 177,
        top: 210
      },
      {
        name: '영동군',
        region: 'chungbuk',
        field: 'yeongdong',
        right: 146,
        top: 304
      },
      {
        name: '옥천군',
        region: 'chungbuk',
        field: 'okcheon',
        right: 186,
        top: 264
      },
      {
        name: '음성군',
        region: 'chungbuk',
        field: 'eumseong',
        right: 213,
        top: 37
      },
      {
        name: '제천시',
        region: 'chungbuk',
        field: 'jaecheon',
        right: 65,
        top: 0
      },
      {
        name: '진천군',
        region: 'chungbuk',
        field: 'jincheon',
        right: 264,
        top: 69
      },
      {
        name: '증평군',
        region: 'chungbuk',
        field: 'jeungpyeong',
        right: 239,
        top: 129
      },
      {
        name: '청주시',
        region: 'chungbuk',
        field: 'cheongju',
        right: 213,
        top: 155
      },
      {
        name: '충주시',
        region: 'chungbuk',
        field: 'chungju',
        right: 121,
        top: 13
      }
    ]
  },
  {
    id: 11,
    name: '충청남도',
    region: 'chungnam',
    code: '12',
    field: [
      {
        name: '계룡시',
        region: 'chungnam',
        field: 'gyeryong',
        right: 72,
        top: 268
      },
      {
        name: '공주시',
        region: 'chungnam',
        field: 'gongju',
        right: 99,
        top: 144
      },
      {
        name: '금산군',
        region: 'chungnam',
        field: 'geumsan',
        right: -8,
        top: 290
      },
      {
        name: '논산시',
        region: 'chungnam',
        field: 'nonsan',
        right: 84,
        top: 263
      },
      {
        name: '당진시',
        region: 'chungnam',
        field: 'dangjin',
        right: 225,
        top: 1
      },
      {
        name: '보령시',
        region: 'chungnam',
        field: 'boryeong',
        right: 262,
        top: 202
      },
      {
        name: '부여군',
        region: 'chungnam',
        field: 'buyeo',
        right: 161,
        top: 250
      },
      {
        name: '서산시',
        region: 'chungnam',
        field: 'seosan',
        right: 280,
        top: 15
      },
      {
        name: '서천군',
        region: 'chungnam',
        field: 'seocheon',
        right: 225,
        top: 316
      },
      {
        name: '아산시',
        region: 'chungnam',
        field: 'asan',
        right: 146,
        top: 38
      },
      {
        name: '예산군',
        region: 'chungnam',
        field: 'yaesan',
        right: 193,
        top: 96
      },
      {
        name: '천안시',
        region: 'chungnam',
        field: 'cheonan',
        right: 63,
        top: 37
      },
      {
        name: '청양군',
        region: 'chungnam',
        field: 'cheongyang',
        right: 173,
        top: 177
      },
      {
        name: '태안군',
        region: 'chungnam',
        field: 'taean',
        right: 357,
        top: 48
      },
      {
        name: '홍성군',
        region: 'chungnam',
        field: 'hongseong',
        right: 246,
        top: 139
      }
    ]
  },
  {
    id: 12,
    name: '전북특별자치도',
    region: 'jeonbuk',
    code: '13',
    field: [
      {
        name: '고창군',
        region: 'jeonbuk',
        field: 'gochang',
        right: 332,
        top: 219
      },
      {
        name: '군산시',
        region: 'jeonbuk',
        field: 'gunsan',
        right: 301,
        top: 41
      },
      {
        name: '김제시',
        region: 'jeonbuk',
        field: 'gimje',
        right: 251,
        top: 92
      },
      {
        name: '남원시',
        region: 'jeonbuk',
        field: 'namwon',
        right: 76,
        top: 234
      },
      {
        name: '무주군',
        region: 'jeonbuk',
        field: 'muju',
        right: -5,
        top: 40
      },
      {
        name: '부안군',
        region: 'jeonbuk',
        field: 'buan',
        right: 330,
        top: 143
      },
      {
        name: '순창군',
        region: 'jeonbuk',
        field: 'sunchang',
        right: 181,
        top: 231
      },
      {
        name: '완주군',
        region: 'jeonbuk',
        field: 'wanju',
        right: 159,
        top: 13
      },
      {
        name: '익산시',
        region: 'jeonbuk',
        field: 'iksan',
        right: 231,
        top: 0
      },
      {
        name: '임실군',
        region: 'jeonbuk',
        field: 'imsil',
        right: 133,
        top: 149
      },
      {
        name: '장수군',
        region: 'jeonbuk',
        field: 'jangsu',
        right: 55,
        top: 118
      },
      {
        name: '전주시',
        region: 'jeonbuk',
        field: 'jeonju',
        right: 209,
        top: 94
      },
      {
        name: '정읍시',
        region: 'jeonbuk',
        field: 'jeongeup',
        right: 236,
        top: 156
      },
      {
        name: '진안군',
        region: 'jeonbuk',
        field: 'jinan',
        right: 85,
        top: 52
      }
    ]
  },
  {
    id: 13,
    name: '전라남도',
    region: 'jeonnam',
    code: '14',
    field: [
      {
        name: '강진군',
        region: 'jeonnam',
        field: 'gangjin',
        right: 207,
        top: 198
      },
      {
        name: '광양시',
        region: 'jeonnam',
        field: 'gwangyang',
        right: 2,
        top: 77
      },
      {
        name: '곡성군',
        region: 'jeonnam',
        field: 'gokseong',
        right: 88,
        top: 41
      },
      {
        name: '구례군',
        region: 'jeonnam',
        field: 'gurye',
        right: 43,
        top: 36
      },
      {
        name: '나주시',
        region: 'jeonnam',
        field: 'naju',
        right: 205,
        top: 106
      },
      {
        name: '담양군',
        region: 'jeonnam',
        field: 'damyang',
        right: 159,
        top: 5
      },
      {
        name: '보성군',
        region: 'jeonnam',
        field: 'boseong',
        right: 83,
        top: 140
      },
      {
        name: '순천시',
        region: 'jeonnam',
        field: 'suncheon',
        right: 50,
        top: 84
      },
      {
        name: '영광군',
        region: 'jeonnam',
        field: 'yeonggwang',
        right: 263,
        top: 8
      },
      {
        name: '장성군',
        region: 'jeonnam',
        field: 'jangseong',
        right: 195,
        top: 1
      },
      {
        name: '여수시',
        region: 'jeonnam',
        field: 'yeosu',
        right: -6,
        top: 166
      },
      {
        name: '고흥군',
        region: 'jeonnam',
        field: 'goheung',
        right: 59,
        top: 191
      },
      {
        name: '무안군',
        region: 'jeonnam',
        field: 'muan',
        right: 279,
        top: 90
      },
      {
        name: '목포시',
        region: 'jeonnam',
        field: 'mokpo',
        right: 300,
        top: 147
      },
      {
        name: '신안군',
        region: 'jeonnam',
        field: 'shinan',
        right: 361,
        top: 141
      },
      {
        name: '영암군',
        region: 'jeonnam',
        field: 'yeongam',
        right: 214,
        top: 158
      },
      {
        name: '완도군',
        region: 'jeonnam',
        field: 'wando',
        right: 197,
        top: 319
      },
      {
        name: '장흥군',
        region: 'jeonnam',
        field: 'jangheung',
        right: 169,
        top: 169
      },
      {
        name: '진도군',
        region: 'jeonnam',
        field: 'jindo',
        right: 318,
        top: 248
      },
      {
        name: '함평군',
        region: 'jeonnam',
        field: 'hampyeong',
        right: 259,
        top: 60
      },
      {
        name: '화순군',
        region: 'jeonnam',
        field: 'hwasun',
        right: 134,
        top: 77
      },
      {
        name: '해남군',
        region: 'jeonnam',
        field: 'haenam',
        right: 240,
        top: 214
      }
    ]
  },
  {
    id: 14,
    name: '경상북도',
    region: 'gyeongbuk',
    code: '15',
    field: [
      {
        name: '경산시',
        region: 'gyeongbuk',
        field: 'gyeongsan',
        right: 195,
        top: 281
      },
      {
        name: '경주시',
        region: 'gyeongbuk',
        field: 'gyeongju',
        right: 79,
        top: 270
      },
      {
        name: '고령군',
        region: 'gyeongbuk',
        field: 'goryeong',
        right: 296,
        top: 314
      },
      {
        name: '구미시',
        region: 'gyeongbuk',
        field: 'gumi',
        right: 269,
        top: 180
      },
      {
        name: '김천시',
        region: 'gyeongbuk',
        field: 'gimcheon',
        right: 327,
        top: 197
      },
      {
        name: '문경시',
        region: 'gyeongbuk',
        field: 'mungyeong',
        right: 299,
        top: 55
      },
      {
        name: '봉화군',
        region: 'gyeongbuk',
        field: 'bonghwa',
        right: 129,
        top: 9
      },
      {
        name: '상주시',
        region: 'gyeongbuk',
        field: 'sangju',
        right: 311,
        top: 105
      },
      {
        name: '성주군',
        region: 'gyeongbuk',
        field: 'seongju',
        right: 306,
        top: 249
      },
      {
        name: '안동시',
        region: 'gyeongbuk',
        field: 'andong',
        right: 174,
        top: 78
      },
      {
        name: '예천군',
        region: 'gyeongbuk',
        field: 'yecheon',
        right: 246,
        top: 67
      },
      {
        name: '영덕군',
        region: 'gyeongbuk',
        field: 'yeongdeok',
        right: 86,
        top: 119
      },
      {
        name: '영양군',
        region: 'gyeongbuk',
        field: 'yeongyang',
        right: 116,
        top: 66
      },
      {
        name: '영주시',
        region: 'gyeongbuk',
        field: 'yeongju',
        right: 221,
        top: 16
      },
      {
        name: '영천시',
        region: 'gyeongbuk',
        field: 'yeongcheon',
        right: 154,
        top: 236
      },
      {
        name: '울릉군',
        region: 'gyeongbuk',
        field: 'ulleung',
        right: -7,
        top: 151
      },
      {
        name: '울진군',
        region: 'gyeongbuk',
        field: 'uljin',
        right: 81,
        top: 1
      },
      {
        name: '의성군',
        region: 'gyeongbuk',
        field: 'uiseong',
        right: 202,
        top: 143
      },
      {
        name: '청도군',
        region: 'gyeongbuk',
        field: 'cheongdo',
        right: 173,
        top: 321
      },
      {
        name: '청송군',
        region: 'gyeongbuk',
        field: 'cheongsong',
        right: 127,
        top: 135
      },
      {
        name: '칠곡군',
        region: 'gyeongbuk',
        field: 'chilgok',
        right: 259,
        top: 246
      },
      {
        name: '포항시',
        region: 'gyeongbuk',
        field: 'pohang',
        right: 67,
        top: 204
      }
    ]
  },
  {
    id: 15,
    name: '경상남도',
    region: 'gyeonnam',
    code: '16',
    field: [
      {
        name: '거제시',
        region: 'gyeonnam',
        field: 'geoje',
        right: 120,
        top: 298
      },
      {
        name: '거창군',
        region: 'gyeonnam',
        field: 'geochang',
        right: 295,
        top: 1
      },
      {
        name: '고성군',
        region: 'gyeonnam',
        field: 'goseong',
        right: 175,
        top: 247
      },
      {
        name: '김해시',
        region: 'gyeonnam',
        field: 'gimhae',
        right: 49,
        top: 166
      },
      {
        name: '남해군',
        region: 'gyeonnam',
        field: 'namhae',
        right: 300,
        top: 314
      },
      {
        name: '밀양시',
        region: 'gyeonnam',
        field: 'milyang',
        right: 53,
        top: 89
      },
      {
        name: '사천시',
        region: 'gyeonnam',
        field: 'sacheon',
        right: 270,
        top: 242
      },
      {
        name: '산청군',
        region: 'gyeonnam',
        field: 'sancheong',
        right: 292,
        top: 102
      },
      {
        name: '양산시',
        region: 'gyeonnam',
        field: 'yangsan',
        right: -5,
        top: 118
      },
      {
        name: '의령군',
        region: 'gyeonnam',
        field: 'uiryeong',
        right: 203,
        top: 124
      },
      {
        name: '진주시',
        region: 'gyeonnam',
        field: 'jinju',
        right: 219,
        top: 184
      },
      {
        name: '창녕군',
        region: 'gyeonnam',
        field: 'changnyeong',
        right: 147,
        top: 76
      },
      {
        name: '창원시',
        region: 'gyeonnam',
        field: 'hangwon',
        right: 95,
        top: 169
      },
      {
        name: '통영시',
        region: 'gyeonnam',
        field: 'tongyeong',
        right: 192,
        top: 303
      },
      {
        name: '하동군',
        region: 'gyeonnam',
        field: 'hadong',
        right: 334,
        top: 194
      },
      {
        name: '함안군',
        region: 'gyeonnam',
        field: 'haman',
        right: 168,
        top: 166
      },
      {
        name: '함양군',
        region: 'gyeonnam',
        field: 'hamyang',
        right: 355,
        top: 44
      },
      {
        name: '합천군',
        region: 'gyeonnam',
        field: 'hapcheon',
        right: 220,
        top: 25
      }
    ]
  },
  {
    id: 16,
    name: '제주특별자치도',
    region: 'jeju',
    code: '17',
    field: [
      {
        name: '구좌읍',
        region: 'jeju',
        field: 'kujwa',
        right: 18,
        top: 1
      },
      {
        name: '남원읍',
        region: 'jeju',
        field: 'namwon',
        right: 98,
        top: 92
      },
      {
        name: '대정읍',
        region: 'jeju',
        field: 'daejeong',
        right: 361,
        top: 142
      },
      {
        name: '성산읍',
        region: 'jeju',
        field: 'seongsan',
        right: 5,
        top: 43
      },
      {
        name: '서귀포시',
        region: 'jeju',
        field: 'seogwipo',
        right: 183,
        top: 106
      },
      {
        name: '안덕면',
        region: 'jeju',
        field: 'andeok',
        right: 294,
        top: 120
      },
      {
        name: '애월읍',
        region: 'jeju',
        field: 'aewol',
        right: 233,
        top: 39
      },
      {
        name: '우도면',
        region: 'jeju',
        field: 'udo',
        right: -2,
        top: 0
      },
      {
        name: '조천읍',
        region: 'jeju',
        field: 'jocheon',
        right: 119,
        top: 3
      },
      {
        name: '제주시',
        region: 'jeju',
        field: 'jeju',
        right: 169,
        top: 14
      },
      {
        name: '표선면',
        region: 'jeju',
        field: 'pyoseon',
        right: 56,
        top: 65
      },
      {
        name: '한경면',
        region: 'jeju',
        field: 'hankyung',
        right: 365,
        top: 105
      },
      {
        name: '한림읍',
        region: 'jeju',
        field: 'hanrim',
        right: 324,
        top: 66
      }
    ]
  }
];

// 현재 선택된 도에 해당하는 시/군 목록
const selectedGugunOptions = computed(() => {
  const selectedMap = mapList.find((map) => map.name === selectedSido.value);
  // selectedGugun.value = '';
  return selectedMap ? selectedMap.field : [];
});

// 선택된 도에 해당하는 이미지 경로
const selectedSidoRegion = computed(() => {
  const selectedMap = mapList.find((map) => map.name === selectedSido.value);
  return selectedMap?.region;
});

// 선택된 도에 해당하는 이미지 경로
const mapImageSrc = computed(() => {
  // activeImageSrc.value = '';
  const selectedMap = mapList.find((map) => map.name === selectedSido.value);
  return selectedMap ? `/image/main/map_${selectedMap.region}.png` : '';
});

// 도가 바뀌면, 이전에 선택했던 시/군 선택값 초기화
const sidoChanged = (e) => {
  selectedSido.value = e.name;

  const selectedMap = mapList.find((map) => map.name === selectedSido.value);
  selectedGugun.value = `${selectedMap?.region}_`;
  selectedGugunField.value = {};
  selectedGugunNm.value = '전체';
  activeImageSrc.value = '';
};

const gugunChanged = (e) => {
  selectedGugun.value = e;
  const [region, field] = selectedGugun.value.split('_');

  if (field) {
    const gugun = mapList
      .find((map) => map.name === selectedSido.value)
      ?.field.find((item) => item.field === field);
    selectedGugunField.value = gugun;
    selectedGugunNm.value = gugun.name;
    activeImageSrc.value = `/image/main/${region}_${field}.png`;
  } else {
    selectedGugun.value = `${region}_`;
    selectedGugunField.value = {};
    selectedGugunNm.value = '전체';
    activeImageSrc.value = '';
  }
};

// selectedSi가 변경될 때 활성화된 이미지 경로 업데이트
// watch(selectedGugun, (newValue) => {
//   if (newValue) {
//     const [region, field] = newValue.split('_');
//     selectedGugunField.value = mapList
//       .find((map) => map.name === selectedSido.value)
//       ?.field.find((item) => item.field === field);
//     activeImageSrc.value = `/image/main/${region}_${field}.png`;
//   } else {
//     activeImageSrc.value = ''; // 선택 해제 시 비워둠
//   }
// });

const reset = () => {
  selectedSido.value = '서울특별시';
  selectedGugun.value = 'seoul_';
  selectedGugunNm.value = '전체';
  selectedGugunField.value = {
    name: '',
    region: 'seoul',
    field: ''
    // right: 183,
    // top: 207
  };
  activeImageSrc.value = '';
  // activeImageSrc.value = '/image/main/seoul_yongsan.png';
  selectedMapSvcCtgry.value = '1010000000';
  mapSvcCtgryNm.value = '';
  listData.value = [...resetData.value];
};

const mapDataListSelect = () => {
  const data = mapSvcCtgryNm.value;
  const selectedMap = mapList.find((map) => map.name === selectedSido.value);

  if (!selectedMap) {
    return;
  }

  let mapDataList = mapSvcCtgryIstInfo.value.map((item, index) => ({
    ...item,
    id: index + 1,
    instNm: item.instNm != null ? item.instNm : ''
  }));

  // 도
  mapDataList = mapDataList.filter((item) => item.rgnCd === selectedMap.code);

  // 유형별기관 코드
  if (selectedMapSvcCtgry.value) {
    mapDataList = mapDataList.filter(
      (item) => item.ctgryNo === selectedMapSvcCtgry.value
    );
  }

  if (data !== '') {
    mapDataList = mapDataList.filter((item) => item.instNm.includes(data));
  }

  listData.value = [...mapDataList].splice(0, 2);
};

/* 접근성 수정 - 법률지도 select -> dropdown으로 대체 */
// 코멘트 (작업 완료 후 주석 삭제)
// 1. Dropdown 공통 컴포넌트에 추가해서 사용이 가능할 지 확인 필요 (공통 컴포넌트 작업시 class명 공통에 맞게 재정의 가능)
// 2. 이벤트 추가 필요 - dropdown-list에서 키보드 tab 이동 벗어났을 시 드롭다운 닫힘 이벤트 필요
// 3. 이벤트 추가 필요 - dropdown-menu-box 외 영역 클릭시 드롭다운 닫힘 이벤트 필요
const isOpen = ref(false);
const selectedItem = ref('서울특별시');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (name) => {
  selectedItem.value = name;
  isOpen.value = false; // 선택 후 드롭다운 닫기
};
</script>

<template>
  <div class="search-info-col">
    <div class="main-law-search-box">
      <div class="title-box">
        <h4>법률복지지도</h4>
        <span class="icon-span">
          <img src="/assets/image/main/title_img.png" alt="" />
        </span>
      </div>
      <div class="map-search-container">
        <div class="search-form-box">
          <div class="search-drop-box">
            <span class="icon-span" @click="getCurrentPosition">
              <img src="/assets/image/main/location_icon.svg" alt="위치 검색" />
            </span>

            <!-- 기존 소스 -->
            <!-- 도 선택 -->
            <!--          <label for="LawMapSelect1" />-->
            <!--          <select-->
            <!--            class="form-select do-select"-->
            <!--            v-model="selectedSido"-->
            <!--            @change="sidoChanged"-->
            <!--            id="LawMapSelect1"-->
            <!--            title="법률복지지도 도 선택"-->
            <!--          >-->
            <!--            <option v-for="list in mapList" :key="list.id" :value="list.name">-->
            <!--              {{ list.name }}-->
            <!--            </option>-->
            <!--          </select>-->

            <Dropdown :button-text="selectedSido" :drop-slots="true">
              <li class="hit-li" v-for="list in mapList" :key="list.id">
                <button
                  type="button"
                  class="btn-item"
                  @click="sidoChanged(list)"
                  :title="selectedSido === list.name ? '선택됨' : ''"
                >
                  <span class="text-span">{{ list.name }}</span>
                </button>
              </li>
            </Dropdown>

            <!-- 시/군 선택 -->
            <!--          <label for="LawMapSelect2" />-->
            <!--          <select-->
            <!--            class="form-select si-select-"-->
            <!--            v-model="selectedGugun"-->
            <!--            @change="gugunChanged"-->
            <!--            id="LawMapSelect2"-->
            <!--            title="법률복지지도 시/군 선택"-->
            <!--          >-->
            <!--            <option :value="`${selectedSidoRegion}_`">전체</option>-->
            <!--            <option-->
            <!--              v-for="field in selectedGugunOptions"-->
            <!--              :key="field.name"-->
            <!--              :value="field.region.concat('_').concat(field.field)"-->
            <!--            >-->
            <!--              {{ field.name }}-->
            <!--            </option>-->
            <!--          </select>-->

            <Dropdown :button-text="selectedGugunNm" :drop-slots="true">
              <li>
                <button
                  type="button"
                  class="btn-item"
                  @click="gugunChanged(`${selectedSidoRegion}_`)"
                  :title="
                    selectedGugun === `${selectedSidoRegion}_` ? '선택됨' : ''
                  "
                >
                  <span class="text-span">전체</span>
                </button>
              </li>
              <li
                class="hit-li"
                v-for="field in selectedGugunOptions"
                :key="field.name"
              >
                <button
                  type="button"
                  class="btn-item"
                  @click="
                    gugunChanged(field.region.concat('_').concat(field.field))
                  "
                  :title="
                    selectedGugun ===
                    field.region.concat('_').concat(field.field)
                      ? '선택됨'
                      : ''
                  "
                >
                  <span class="text-span">{{ field.name }}</span>
                </button>
              </li>
            </Dropdown>
          </div>
          <div class="option-box">
            <button
              class="btn reset-button"
              @click="reset"
              title="법률복지지도"
            >
              <span class="text-span"> 초기화 </span>
              <span class="icon-span">
                <img src="/assets/image/main/refresh_dark.svg" alt="" />
              </span>
            </button>
            <button
              class="btn more-button"
              @click="gotoMap"
              title="법률복지지도"
            >
              <span class="text-span"> 더보기 </span>
              <span class="icon-span">
                <img src="/assets/image/main/plus_dark.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
        <div class="map-wrap">
          <div class="map-title-box">
            <strong>{{ selectedSido }}</strong>
          </div>
          <div class="map-img-box">
            <!-- 기본 지도 -->
            <img :src="mapImageSrc" alt="지도" />
            <!-- 활성화된 지역 지도 -->
            <img
              v-if="activeImageSrc"
              :src="activeImageSrc"
              alt="지도 활성화 지역"
              :class="[
                'select-map-blue',
                `${selectedGugunField.region}-${selectedGugunField.field}`
              ]"
              :style="{
                top: selectedGugunField?.top + 'px',
                right: selectedGugunField?.right + 'px'
              }"
            />
          </div>
        </div>
      </div>
      <div class="inst-search-container">
        <div class="lawmap-select-box">
          <div class="select-box box1">
            <label for="LawSelect1">
              <span class="pc-only">유형별기관조회</span>
              <span class="mo-only sr-only">유형별기관조회</span>
            </label>
            <select
              class="form-select law-select"
              id="LawSelect1"
              v-model="selectedMapSvcCtgry"
            >
              <option
                v-for="mapSvcCtgryInfo in mapSvcCtgryInfo"
                :value="mapSvcCtgryInfo.ctgryNo"
              >
                {{ mapSvcCtgryInfo.ctgryNm }}
              </option>
            </select>
          </div>
          <div class="select-box box2">
            <label for="PublicInput">
              <span class="pc-only">기관명 검색</span>
              <span class="mo-only sr-only">기관명 검색</span>
            </label>
            <input
              class="form-control public-input"
              id="PublicInput"
              placeholder="기관명 검색"
              v-model="mapSvcCtgryNm"
            />
          </div>
          <button class="btn search-button" @click="gotoMap">
            <img
              src="/assets/image/main/location_search.svg"
              alt="법률복지지도 검색"
            />
          </button>
        </div>
        <div class="search-result-box" v-for="info in listData">
          <div class="row">
            <div class="col-xl-8 col-8">
              <div class="text-box">
                <dl>
                  <dt>{{ info.instNm }}</dt>
                  <dd>
                    <span class="icon-span">
                      <img
                        src="/assets/image/main/location_icon.svg"
                        alt="법률복지지도 검색결과 위치"
                      />
                    </span>
                    <span class="text-span">
                      {{ info.instAddr }}
                    </span>
                  </dd>
                  <dd>
                    <span class="icon-span">
                      <img
                        src="/assets/image/main/address.svg"
                        alt="법률복지지도 검색결과 위치"
                      />
                    </span>
                    <span class="text-span">
                      {{ info.instAddr }}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="col-xl-4 col-4">
              <div class="search-result-button-box">
                <NuxtLink
                  :to="`/servicepvsn?instNo=${info.instNo}`"
                  target="_blank"
                  title="새 창 열림"
                >
                  <button class="btn information-button d-none d-xl-block">
                    자세히<br />보기
                  </button>
                </NuxtLink>

                <button class="btn homepage-move-button d-none d-xl-block">
                  <NuxtLink
                    :to="`${info.urlAddr}`"
                    target="_blank"
                    title="새 창 열림"
                  >
                    <span class="icon-span">
                      <img src="/assets/image/main/shortcut.svg" alt="" />
                    </span>
                    <span class="text-span">
                      홈페이지<br />
                      바로가기
                    </span>
                  </NuxtLink>
                </button>
                <!-- mobile -->
                <button class="btn information-button d-block d-xl-none">
                  <NuxtLink
                    :to="`/servicepvsn?instNo=${info.instNo}`"
                    :external="true"
                  >
                    자세히 보기
                  </NuxtLink>
                </button>
                <button class="btn homepage-move-button d-block d-xl-none">
                  <NuxtLink
                    :to="`${info.urlAddr}`"
                    target="_blank"
                    :title="`${info.instNm} 새 창 열림`"
                  >
                    <span class="icon-span">
                      <img
                        src="/assets/image/main/shortcut.svg"
                        alt="홈페이지 바로가기"
                      />
                    </span>
                    <span class="text-span"> 홈페이지 </span>
                  </NuxtLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/map';
</style>
