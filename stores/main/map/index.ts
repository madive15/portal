import {cloneDeep} from 'lodash-es';
import {useAxios} from '~/composables/useAxios';
import type {MapSvcCtgryInfo, MapSvcCtgryIstInfo} from "~/types/main/map";

const DEFAULT_MAP_SVC_CTGRY_INFO: MapSvcCtgryInfo = {
  ctgryNo: '',
  ctgryNm: ''
};

const DEFAULT_MAP_SVC_CTGRY_IST_INFO: MapSvcCtgryIstInfo = {
  ctgryNo: '',
  ctgryNm: '',
  sortSeq: '',
  instNo: '',
  rgnCd: '',
  rgnNm: '',
  instNm: '',
  instAddr: '',
  urlAddr: ''
};

export const useMapStore = defineStore('useMapStore', () => {
  const MapSvcCtgryInfoList = ref<MapSvcCtgryInfo[]>([cloneDeep(DEFAULT_MAP_SVC_CTGRY_INFO)]);
  const MapSvcCtgryIstInfoList = ref<MapSvcCtgryIstInfo[]>([cloneDeep(DEFAULT_MAP_SVC_CTGRY_IST_INFO)]);

  const resetMapSvcCtgryInfoList = () => {
    MapSvcCtgryInfoList.value = [cloneDeep(DEFAULT_MAP_SVC_CTGRY_INFO)];
  };

  const resetMapSvcCtgryIstInfoList = () => {
    MapSvcCtgryIstInfoList.value = [cloneDeep(DEFAULT_MAP_SVC_CTGRY_IST_INFO)];
  };

  // 법률복지지도 > 유형별 기관 조회 리스트
  const searchMapSvcCtgryInfoList = async () => {
    try {
      resetMapSvcCtgryInfoList();

      const { data } = await useAxios().get('/api/main/searchMapSvcCtgryInfoList');

      MapSvcCtgryInfoList.value = data;
    } catch (e) {
      resetMapSvcCtgryInfoList();
    }
  };

  const searchMapSvcCtgryIstInfoList = async () => {
    try {
      resetMapSvcCtgryIstInfoList();

      const { data } = await useAxios().get('/api/main/searchMapSvcCtgryIstInfoList');

      MapSvcCtgryIstInfoList.value = data;
    } catch (e) {
      resetMapSvcCtgryIstInfoList();
    }
  };

  return {
    MapSvcCtgryInfoList,
    MapSvcCtgryIstInfoList,
    searchMapSvcCtgryInfoList,
    searchMapSvcCtgryIstInfoList
  };
});
