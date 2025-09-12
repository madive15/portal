import {ref} from "vue";
import type {
  SearchMainType,
  KeywordType,
  MenuType
} from "~/types/search";
import { cloneDeep } from "lodash-es";
import {
  DEFAULT_SEARCH_MAIN_TYPE
} from "~/constants/search";
import {useAxios} from "~/composables/useAxios";

export const useSearchStore = defineStore('search', () => {

  const searchMain = ref<SearchMainType>(
      cloneDeep(DEFAULT_SEARCH_MAIN_TYPE)
  );

  const searchAsync = ref<SearchMainType>(
      cloneDeep(DEFAULT_SEARCH_MAIN_TYPE)
  );

  const trendList = ref<KeywordType[]>([]);

  const relationList = ref<KeywordType[]>([]);

  const totalRelationList = ref<KeywordType[]>([]);

  const recentList = ref<KeywordType[]>([]);

  const menuList = ref<MenuType[]>([]);

  const totalMenuList = ref<MenuType[]>([]);

  const trend = async () => {
    resetTrendList();

    const { data } = await useAxios().post('/api/search/trend');

    trendList.value = data;
  };

  const resetTrendList = () => {
    trendList.value = [];
  };

  const recent = async () => {
    resetRecentList();

    const { data } = await useAxios().post('/api/search/recent');

    recentList.value = data;
  };

  const resetRecentList = () => {
    recentList.value = [];
  };

  const relation = async () => {
    if(searchAsync.value.searchQuery.trim() != '') {
      const { data } = await useAxios().post('/api/search/relation', searchAsync.value);

      relationList.value = data;
    } else {
      resetRelationList();
    }
  };

  const totalRelation = async () => {
    resetRelationList();

    const { data } = await useAxios().post('/api/search/relation', searchMain.value);

    totalRelationList.value = data;
  };

  const resetRelationList = () => {
    relationList.value = [];
  };

  const resetTotalRelationList = () => {
    totalRelationList.value = [];
  };

  const menu = async () => {
    if(searchAsync.value.searchQuery.trim() != '') {
      const { data } = await useAxios().post('/api/search/menu', searchAsync.value);

      menuList.value = data;
    } else {
      resetMenuList();
    }
  };

  const totalMenu = async () => {
    resetMenuList();

    const { data } = await useAxios().post('/api/search/menu', searchMain.value);

    totalMenuList.value = data;
  };

  const resetMenuList = () => {
    menuList.value = [];
  };

  const resetTotalMenuList = () => {
    totalMenuList.value = [];
  };

  const personalLog = async() => {
    await useAxios().post('/api/search/personal', searchMain.value);
  }

  return {
    searchMain,
    searchAsync,
    trendList,
    recentList,
    relationList,
    totalRelationList,
    menuList,
    totalMenuList,
    trend,
    recent,
    relation,
    totalRelation,
    menu,
    totalMenu,
    resetTrendList,
    resetRelationList,
    resetTotalRelationList,
    resetMenuList,
    resetTotalMenuList,
    personalLog
  };
});
