import {cloneDeep} from 'lodash-es';
import type {IstInfo, SvcCtgryIstInfo} from '~/types/main/categorySlide';
import {useAxios} from '~/composables/useAxios';

const DEFAULT_SVC_CTGRY_IST_INFO: SvcCtgryIstInfo = {
  ctgryNo: '',
  ctgryNm: '',
  cnt: 0,
};

const DEFAULT_IST_INFO: IstInfo = {
  ctgryNo: '',
  ctgryNm: '',
  instNm: '',
  content: '',
  src: ''
};

export const useSvcCtgryIstInfoStore = defineStore('useSvcCtgryIstInfoStore', () => {
  const SvcCtgryIstInfoList = ref<SvcCtgryIstInfo>(cloneDeep(DEFAULT_SVC_CTGRY_IST_INFO));
  const IstInfoList = ref<IstInfo>(cloneDeep(DEFAULT_IST_INFO));

  const resetSvcCtgryIstInfoList = () => {
    SvcCtgryIstInfoList.value = cloneDeep(DEFAULT_SVC_CTGRY_IST_INFO);
  };

  const resetIstInfoList = () => {
    IstInfoList.value = cloneDeep(DEFAULT_IST_INFO);
  };

  // 서비스 유형별 기관정보 리스트 조회
  const searchSvcCtgryIstInfoList = async () => {
    try {
      resetSvcCtgryIstInfoList();

      const { data } = await useAxios().get('/api/main/searchSvcCtgryIstInfoList');

      SvcCtgryIstInfoList.value = data;
    } catch (e) {
      resetSvcCtgryIstInfoList();
    }
  };

  // 기관정보 리스트 조회
  const searchIstInfoList = async () => {
    try {
      resetIstInfoList();

      const { data } = await useAxios().get('/api/main/searchIstInfoList');

      IstInfoList.value = data;
    } catch (e) {
      resetIstInfoList();
    }
  };


  return {
    SvcCtgryIstInfoList,
    IstInfoList,
    searchSvcCtgryIstInfoList,
    searchIstInfoList
  };
});
