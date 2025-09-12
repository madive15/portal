import {cloneDeep} from 'lodash-es';
import type {IstInfo} from '~/types/main/relateSlide';
import {useAxios} from '~/composables/useAxios';

const DEFAULT_IST_INFO: IstInfo = {
  instNo: '',
  instNm: '',
  src: ''
};

export const useRelateSlideStore = defineStore('useRelateSlideStore', () => {
  const IstInfoList = ref<IstInfo>(cloneDeep(DEFAULT_IST_INFO));

  const resetIstInfoList = () => {
    IstInfoList.value = cloneDeep(DEFAULT_IST_INFO);
  };

  // 참여기관 리스트 조회
  const searchIstInfoList = async () => {
    try {
      resetIstInfoList();

      const { data } = await useAxios().get('/api/main/searchRelateSlideList');

      IstInfoList.value = data;
    } catch (e) {
      resetIstInfoList();
    }
  };

  return {
    IstInfoList,
    searchIstInfoList
  };
});
