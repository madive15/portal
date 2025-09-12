import { cloneDeep } from 'lodash-es';
import type {
  SvcCtgryType,
  SvcMenuType,
  SvcType,
  SvcTypeQuery,
  SvcUrlType,
  SvcListType,
  SvcTabListType,
  TmpltType,
  CaseType
} from '~/types/svctype';
import { useAxios } from '~/composables/useAxios';
import type { LocationQueryValue } from 'vue-router';
import type { Page } from '~/types/common';

const DEFAULT_SVC: SvcType = {
  srvcNo: '',
  ctgryNo: '',
  instNo: '',
  regSttsCd: '',
  srvcTtl: '',
  srvcExpln: '',
  sortSeq: 0,
  useYn: true,
  frstRegDt: '',
  gdCn: '',
  gdNm: '',
  instNm: ''
};

const DEFAULT_MENU: SvcMenuType = {
  ctgryNo: '',
  ctgryNm: '',
  upCtgryNo: '',
  cnt: 0
};

const DEFAULT_CTGRY: SvcCtgryType = {
  ctgryNo: '',
  ctgryNm: '',
  upCtgryNo: ''
};

const DEFAULT_URL: SvcUrlType = {
  instNo: '',
  instNm: '',
  urlNm: '',
  urlAddr: ''
};

const DEFAULT_LIST: SvcListType = {
  srvcNo: '',
  srvcTtl: '',
  srvcExpln: '',
  trprNm: '',
  trprCtgry: '',
  svcCtgry: '',
  instNo: '',
  instNm: '',
  addr: '',
  instTelno: ''
};

const INIT_SVC_TYPE_QUERY_VALUE: SvcTypeQuery = {
  page: 1,
  size: 10,
  instNm: '',
  srvcNo: '',
  upCtgryNo: '',
  keyword: '',
  desc: '',
  instNo: '',
  defaultText: '10개씩 보기'
};

const DEFAULT_TAB: SvcTabListType = {
  srvcNo: '',
  gdNo: '',
  gdTtl: '',
  gdClsfCd: '',
  gdCn: '',
  sortSeq: '',
  bbsTypeCd: ''
};

const DEFAULT_PAGE: Page<SvcType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_PAGE2: Page<TmpltType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_PAGE3: Page<CaseType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

// Deprecated
export const useSvcTypeStore = defineStore('useSvcTypeStore', () => {
  const svcTypeQuery = ref<SvcTypeQuery>(cloneDeep(INIT_SVC_TYPE_QUERY_VALUE));
  const svcTypeCaseQuery = ref<SvcTypeQuery>(
    cloneDeep(INIT_SVC_TYPE_QUERY_VALUE)
  );
  const svcList = ref<Page<SvcType>>(cloneDeep(DEFAULT_PAGE));
  const svcMenuList = ref<SvcMenuType>(cloneDeep(DEFAULT_MENU));
  const svcCtgryList = ref<SvcCtgryType[]>([]);
  const svcUrl = ref<SvcUrlType[]>([]);

  const svcTypeTmpltList = ref<Page<TmpltType>>(cloneDeep(DEFAULT_PAGE2));
  const svcTypeCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE3));

  const svc = ref<SvcListType[]>([]);
  const svcTabList = ref<SvcTabListType[]>([]);

  const svcCtgry = ref([]);

  const resetCaseStore = () => {
    svcTypeQuery.value = cloneDeep(INIT_SVC_TYPE_QUERY_VALUE);
    resetList();
  };

  const resetSvcTypeCaseQuery = () => {
    svcTypeCaseQuery.value = cloneDeep(INIT_SVC_TYPE_QUERY_VALUE);
    searchSvcTypeCaseList();
  };

  const resetSvcTypeQuery = () => {
    svcTypeQuery.value = cloneDeep(INIT_SVC_TYPE_QUERY_VALUE);
    searchSvcTypeTmpltList();
  };

  const resetTabList = () => {
    svcTabList.value = [];
  };

  const resetList = () => {
    svcList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetUrlList = () => {
    svcUrl.value = [];
  };

  const resetTmpltList = () => {
    svcTypeTmpltList.value = cloneDeep(DEFAULT_PAGE2);
  };

  const resetCaseList = () => {
    svcTypeCaseList.value = cloneDeep(DEFAULT_PAGE3);
  };

  const searchSvcTypeTmpltList = async () => {
    const { data } = await useAxios().get('/api/svctype/svcTypeTmpltList', {
      params: {
        ...svcTypeQuery.value
      }
    });

    svcTypeTmpltList.value = data;
  };

  const searchSvcTypeCaseList = async () => {
    const { data } = await useAxios().get('/api/svctype/svcTypeCaseList', {
      params: {
        ...svcTypeCaseQuery.value
      }
    });

    svcTypeCaseList.value = data;
  };

  const searchSvcTypeList = async () => {
    try {
      const { data } = await useAxios().get('/api/svctype/svcTypeList', {
        params: {
          ...svcTypeQuery.value
        }
      });
      svcList.value = data;
    } catch (e) {
      console.log('error on searchSvcTypeList', e);
    }
  };

  const searchSvcTypeMenuList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/svctype/svcTypeMenuList');

      svcMenuList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchSvcTypeCtgryList = async () => {
    svcCtgryList.value = [];
    try {
      const { data } = await useAxios().get('/api/svctype/svcTypeCtgryList', {
        params: {
          ...svcTypeQuery.value
        }
      });
      svcCtgryList.value = [...data];
    } catch (e) {
      console.log(e);
    }
  };

  const searchSvcTypeUrlList = async (params) => {
    try {
      resetUrlList();

      const { data } = await useAxios().get('/api/svctype/svcTypeUrlList', {
        params
      });
      svcUrl.value = data;
    } catch (e) {
      resetUrlList();
    }
  };

  const searchSvcList = async (
    srvcNo: string | null | LocationQueryValue[]
  ) => {
    try {
      resetUrlList();

      const { data } = await useAxios().get('/api/svctype/svcList', {
        params: {
          srvcNo
        }
      });
      svc.value = data;
    } catch (e) {
      resetUrlList();
    }
  };

  const searchSvcTabList = async (
    srvcNo: string | null | LocationQueryValue[]
  ) => {
    try {
      resetTabList();

      const { data } = await useAxios().get('/api/svctype/svcTabList', {
        params: {
          srvcNo
        }
      });
      svcTabList.value = data;
    } catch (e) {
      resetTabList();
    }
  };

  return {
    svcList,
    svcUrl,
    svcTypeQuery,
    svcMenuList,
    svcCtgryList,
    svcCtgry,
    svc,
    svcTabList,
    svcTypeTmpltList,
    svcTypeCaseList,
    svcTypeCaseQuery,
    searchSvcTypeList,
    searchSvcList,
    searchSvcTypeUrlList,
    resetCaseStore,
    searchSvcTypeMenuList,
    searchSvcTypeCtgryList,
    searchSvcTabList,
    searchSvcTypeTmpltList,
    searchSvcTypeCaseList,
    resetTabList,
    resetSvcTypeCaseQuery,
    resetSvcTypeQuery
  };
});
