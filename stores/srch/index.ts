import { cloneDeep } from 'lodash-es';
import type {
  SrchType,
  SrchTypeQuery,
  SrchMainType,
  LegalWelfareInstituteMapQuery,
  LegalWelfareInstituteMapResult,
  SidoResult,
} from '~/types/srch';
import { useAxios } from '~/composables/useAxios';
import type { Page } from '~/types/common';

const DEFAULT_SRCH: SrchType = {
  ctgryNm: '',
  ctgryNo: '',
  comCd: '',
  comCdNm: '',
  lwaCtgryNm: '',
  instClsfCd: ''
};

const DEFAULT_SRCH_MAIN: SrchMainType = {
  srvcNo: '',
  srvcTtl: '',
  srvcExpln: '',
  svcPath: '',
  trprNm: '',
  instNm: '',
  instNo: '',
  rgnNmInst: '',
  mth: '',
  period: '',
  process: '',
  chk: '',
  prep: '',
  aftinto: '',
  caseCnt: '',
  tmpltCnt: '',
  urls :[]
};

const INIT_SRVC_QUERY_VALUE: SrchTypeQuery = {
  srvcSvc: [],
  srvc: [],
  srvcInst: [],
  srvcMap: [],
  page: 1,
  size: 12,
  srvcTtl: '',
  srchSvcChk: [],
  srchChk: [],
  srchInstChk: [],
  desc: 'N'
};

const DEFAULT_PAGE: Page<SrchMainType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

export const useSrchStore = defineStore('useSrchStore', () => {
  const srchTypeQuery = ref<SrchTypeQuery>(cloneDeep(INIT_SRVC_QUERY_VALUE));

  const srchSvc = ref<SrchType[]>([]);
  const srch = ref<SrchType>(cloneDeep(DEFAULT_SRCH));
  const srchInst = ref<SrchType>(cloneDeep(DEFAULT_SRCH));
  const srchMap = ref<SrchType[]>(cloneDeep([DEFAULT_SRCH]));

  const srchSvcChk = ref<SrchType>(cloneDeep(DEFAULT_SRCH));
  const srchInstChk = ref<SrchType>(cloneDeep(DEFAULT_SRCH));
  const srchChk = ref<SrchType[]>([]);

  const srchMain = ref<Page<SrchMainType>>(cloneDeep(DEFAULT_PAGE));

  const legalWelfareInstituteQuery = ref<LegalWelfareInstituteMapQuery>();
  const legalWelfareInstituteResult = ref<
    Array<LegalWelfareInstituteMapResult>
  >([]);

  const sidoList = ref<SidoResult[]>([]);
  const selectedSidoNm = ref('');
  const gugunList = ref<SidoResult[]>([]);

  const resetList = () => {
    srchSvc.value = [];
  };

  const resetSrchSvcChk = () => {
    srchSvcChk.value = cloneDeep(DEFAULT_SRCH);
  };

  const resetSrchInstChk = () => {
    srchInstChk.value = cloneDeep(DEFAULT_SRCH);
  };

  const resetSrchChk = () => {
    srchChk.value = [];
  };

  const searchSrchSvcList = async () => {
    try {
      resetList();
      const { data } = await useAxios().get('/api/srch/srchSvcList');
      srchSvc.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchSrchList = async (reset = true) => {
    try {
      if (reset) {
        resetList();
      }
      const { data } = await useAxios().get('/api/srch/srchList');
      srch.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchSrchInstList = async (reset = true) => {
    try {
      resetList();
      const { data } = await useAxios().get('/api/srch/srchInstList');
      srchInst.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchSrchMapList = async (reset = true) => {
    try {
      if (reset) {
        resetList();
      }
      const { data } = await useAxios().get('/api/srch/srchMapList');
      srchMap.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchLegalWelfareInstituteMap = async (reset = true) => {
    try {
      if (reset) {
        resetList();
      }

      const { data } = await useAxios().get(
        '/api/srch/searchLegalWelfareInstituteMap',
        {
          params: {
            ...legalWelfareInstituteQuery.value
          }
        }
      );
      legalWelfareInstituteResult.value = data;
    } catch (e) {
      resetList();
    }
  };

  const selectSrchSvcList = async () => {
    try {
      resetSrchSvcChk();
      const { data } = await useAxios().get('/api/srch/srchSvcList/list');
      srchSvcChk.value = data;
    } catch (e) {
      resetSrchSvcChk();
    }
  };

  const selectSrchInstList = async () => {
    try {
      resetSrchInstChk();
      const { data } = await useAxios().get('/api/srch/srchInstList/list');
      srchInstChk.value = data;
    } catch (e) {
      resetSrchInstChk();
    }
  };

  const selectSrchList = async () => {
    try {
      resetSrchChk();
      const { data } = await useAxios().get('/api/srch/srchList/list');
      srchChk.value = data;
    } catch (e) {
      resetSrchChk();
    }
  };

  const selectSrchMainList = async () => {
    try {
      resetList();

      srchTypeQuery.value;
      const params = new URLSearchParams();

      const values = Object.values(srchTypeQuery.value);
      Object.keys(srchTypeQuery.value).forEach((item, index) => {
        params.append(item, <string>values[index]);
      });

      const { data } = await useAxios().get('/api/srch/srchMainList',
          {
            params
          }
      );

      for(var i = 0; i<data.content.length; i++){
        data.content[i].urls = data.content[i].urls.map((item: any) => {
          return {
            text: item.urlNm,
            to: item.urlAddr
          }
        })
      }
      srchMain.value = data;
    } catch (e) {
      resetList();
    }
  };

  const getReverseGeocoding = async (lat: number, lng: number) => {
    const { data } = await useAxios().get('/api/srch/map/reverseGeocoding', {
        params: {
          lat,
          lng
        }
    });
    return data;
  }

  const getSidoList = async (sidoNm?: string) => {
    if (sidoNm) {
      selectedSidoNm.value = sidoNm;
      const { data } = await useAxios().get('/api/srch/sidoList', {
        params: {
          sidoNm
        }
      });
      gugunList.value = data;
    } else {
      const { data } = await useAxios().get('/api/srch/sidoList');
      sidoList.value = data;
      gugunList.value = [];

    }
  }

  return {
    srchSvc,
    srch,
    srchInst,
    srchMap,
    srchSvcChk,
    srchTypeQuery,
    srchMain,
    srchInstChk,
    srchChk,
    legalWelfareInstituteQuery,
    legalWelfareInstituteResult,
    sidoList,
    selectedSidoNm,
    gugunList,
    searchSrchSvcList,
    searchSrchList,
    searchSrchInstList,
    searchSrchMapList,
    selectSrchSvcList,
    selectSrchMainList,
    selectSrchInstList,
    selectSrchList,
    searchLegalWelfareInstituteMap,
    getReverseGeocoding,
    getSidoList,
  };
});
