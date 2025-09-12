import {cloneDeep} from 'lodash-es';
import type {EasySlideInfo, EasySlideSubInfo} from '~/types/main/easySlide';
import {useAxios} from '~/composables/useAxios';

const DEFAULT_EASY_SLIDE_INFO: EasySlideInfo = {
  typeCd: 0,
  typeNm: '',
  easySlideCd: '',
  easySlideNm: ''
};

const DEFAULT_EASY_SLIDE_SUB_INFO: EasySlideSubInfo = {
  typeCd: 0,
  typeNm: '',
  easySlideCd: '',
  easySlideNm: '',
  easySlideSubCd: '',
  easySlideSubNm: ''
};

export const useEasySlideInfoStore = defineStore('useEasySlideInfoStore', () => {
  const EasySlideInfoList = ref<EasySlideInfo>(cloneDeep(DEFAULT_EASY_SLIDE_INFO));
  const EasySlideSubInfoList = ref<EasySlideSubInfo>(cloneDeep(DEFAULT_EASY_SLIDE_SUB_INFO));

  const resetEasySlideInfoList = () => {
    EasySlideInfoList.value = cloneDeep(DEFAULT_EASY_SLIDE_INFO);
  };

  const resetEasySlideSubInfoList = () => {
    EasySlideSubInfoList.value = cloneDeep(DEFAULT_EASY_SLIDE_SUB_INFO);
  };

  // 서비스 통합 리스트(서비스 유형[1], 서비스 대상자[2], 서비스 기관[3], 지역 정보[4])
  const searchEasySlideInfoList = async () => {
    try {
      resetEasySlideInfoList();

      const { data } = await useAxios().get('/api/main/searchEasySlideInfoList');

      EasySlideInfoList.value = data;
    } catch (e) {
      resetEasySlideInfoList();
    }
  };

  // 서비스 통합 리스트(서비스 유형[1], 서비스 대상자[2], 서비스 기관[3], 지역 정보[4])
  const searchEasySlideSubInfoList = async () => {
    try {
      resetEasySlideSubInfoList();

      const { data } = await useAxios().get('/api/main/searchEasySlideSubInfoList');

      EasySlideSubInfoList.value = data;
    } catch (e) {
      resetEasySlideSubInfoList();
    }
  };

  return {
    EasySlideInfoList,
    EasySlideSubInfoList,
    searchEasySlideInfoList,
    searchEasySlideSubInfoList
  };
});
