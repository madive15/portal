import type { GridCodeType } from '~/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAxios } from '~/composables/useAxios';

export const useDefaultStore = defineStore('defaultStore', () => {
  const zoomLevel = ref<number>(100);
  const nonLoadedTranslate = ref(true);

  const setZoomLevel = (level: number) => {
    zoomLevel.value = level;
  };

  return {
    zoomLevel,
    nonLoadedTranslate,
    setZoomLevel
  };
});

export const useLoadingStore = defineStore('useLoadingStore', () => {
  const loadCount = ref<number>(0);

  const incrementLoadCount = () => {
    loadCount.value++;
  };

  const decrementLoadCount = () => {
    loadCount.value--;
  };

  const resetLoadCount = () => {
    loadCount.value = 0;
  };

  const isLoading = computed(() => {
    return loadCount.value > 0;
  });

  return {
    isLoading,
    resetLoadCount,
    incrementLoadCount,
    decrementLoadCount
  };
});

export const useCommonCodeStore = defineStore('useCommonCodeStore', () => {
  const searchCommonCodeList = async (
    codeGroupId: string
  ): Promise<GridCodeType[]> => {
    if (!codeGroupId) {
      return [];
    }

    const { data } = await useAxios().get('/api/code/codeList', {
      params: {
        codeGroupId
      }
    });
    return data;
  };

  const searchNtnCodeList = async () => {
    const { data } = await useAxios().get('/api/code/ntnCodeList');
    return data;
  };

  return {
    searchCommonCodeList,
    searchNtnCodeList
  };
});
