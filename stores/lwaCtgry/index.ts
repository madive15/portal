import { useAxios } from '~/composables/useAxios';
import type { Page } from '~/types/common';
import { cloneDeep } from 'lodash-es';
import type {
  UseLwaCtgryCaseListType,
  UseLwaCtgryItemListType,
  UseLwaCtgryListQueryType,
  UseLwaCtgryTmpltListType
} from '~/types/lwaCtgry';

const DEFAULT_USE_LWA_CTGRY_LIST_QUERY: UseLwaCtgryListQueryType = {
  page: 1,
  size: 10,
  desc: 'N',
  keywordType: 'title',
  keyword: '',
  upCtgryNo: '',
  ctgryNo: '',
  instNo: '',
  ctgryWholYn: 'Y'
};

const DEFAULT_USE_LWA_CTGRY_CASE_LIST_PAGE: Page<UseLwaCtgryCaseListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_USE_LWA_CTGRY_TMPLT_LIST_PAGE: Page<UseLwaCtgryTmpltListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

export const useLwaCtgryStore = defineStore('useLwaCtgryStore', () => {
  // 사례 리스트
  const useLwaCtgryCaseList = ref<Page<UseLwaCtgryCaseListType>>(
    cloneDeep(DEFAULT_USE_LWA_CTGRY_CASE_LIST_PAGE)
  );

  // 서식 리스트
  const useLwaCtgryTmpltList = ref<Page<UseLwaCtgryTmpltListType>>(
    cloneDeep(DEFAULT_USE_LWA_CTGRY_TMPLT_LIST_PAGE)
  );

  // 리스트 조회 조건
  const useLwaCtgryListQuery = ref<UseLwaCtgryListQueryType>(
    cloneDeep(DEFAULT_USE_LWA_CTGRY_LIST_QUERY)
  );

  // 하위 카테고리 리스트(전체)
  const useLwaCtgryItemAllList = ref<UseLwaCtgryItemListType[]>([]);

  // 하위 카테고리 리스트(select option용)
  const useLwaCtgryItemList = ref<UseLwaCtgryItemListType[]>([]);

  // 선택한 상위 카테고리 명
  const upCtgryNm = ref<string>('');

  // 선택한 하위 카테고리 명
  const ctgryNm = ref<string>('');

  // 사례 리스트 조회 API
  const findUseLwaCtgryCaseList = async () => {
    const { data } = await useAxios().get(
      '/api/lwaCtgry/findUseLwaCtgryCaseList',
      {
        params: {
          ...useLwaCtgryListQuery.value
        }
      }
    );

    useLwaCtgryCaseList.value = data;
  };

  // 하위 카테고리 리스트 조회(전체) API
  const findChildCtgryList = async (
    clsfCtgryNo: string,
    instNo: string,
    lwaCtgrySeCd: string
  ) => {
    const { data } = await useAxios().get('/api/lwaCtgry/findChildCtgryList', {
      params: {
        upCtgryNo: clsfCtgryNo,
        instNo: instNo,
        lwaCtgrySeCd: lwaCtgrySeCd
      }
    });

    useLwaCtgryItemAllList.value = data;
    changeUseLwaCtgryItemList();
  };

  // 하위 카테고리 리스트 셋팅
  const changeUseLwaCtgryItemList = () => {
    if (
      useLwaCtgryListQuery.value.upCtgryNo !== '' &&
      useLwaCtgryListQuery.value.ctgryWholYn === 'N'
    ) {
      useLwaCtgryItemList.value = [
        { value: '', text: '전체', upCode: '' },
        ...useLwaCtgryItemAllList.value.filter(
          (item) => item.upCode === useLwaCtgryListQuery.value.upCtgryNo
        )
      ];
    } else {
      useLwaCtgryItemList.value = [
        { value: '', text: '전체', upCode: '' },
        ...useLwaCtgryItemAllList.value
      ];
    }
    ctgryNm.value = '';
  };

  // 서식 리스트 조회 API
  const findUseLwaCtgryTmpltList = async () => {
    const { data } = await useAxios().get(
      '/api/lwaCtgry/findUseLwaCtgryTmpltList',
      {
        params: {
          ...useLwaCtgryListQuery.value
        }
      }
    );

    useLwaCtgryTmpltList.value = data;
  };

  // 서비스 유형, 제공기관의 카테고리 조회 API
  const findLwaCtgryList = async (
    instNo: string,
    srvcNo: string,
    lwaCtgrySeCd: string
  ) => {
    return useAxios().get('/api/lwaCtgry/findLwaCtgryList', {
      params: {
        instNo: instNo,
        srvcNo: srvcNo,
        lwaCtgrySeCd: lwaCtgrySeCd
      }
    });
  };

  return {
    useLwaCtgryCaseList,
    useLwaCtgryListQuery,
    useLwaCtgryTmpltList,
    useLwaCtgryItemAllList,
    useLwaCtgryItemList,
    upCtgryNm,
    ctgryNm,
    findUseLwaCtgryCaseList,
    findChildCtgryList,
    changeUseLwaCtgryItemList,
    findUseLwaCtgryTmpltList,
    findLwaCtgryList
  };
});
