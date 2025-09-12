import { cloneDeep } from 'lodash-es';
import type {
  CaseType,
  CaseTypeQuery,
  LwaCtgryMenu,
  LwaCtgryType,
  LwaCtgryType2,
  CaseMainType
} from '~/types/case';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_CASE_QUERY_VALUE: CaseTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: '',
  caseSe: [],
  useYn: '',
  page: 1,
  inqCnt: 0,
  size: 10,
  instNo: '',
  desc: 'N',
  ctgryNo: '',
  tmpCtgryNo: '',
  pdfId: '',
  srvcNo:''
};

const DEFAULT_PAGE: Page<CaseType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_CASE: CaseType = {
  caseNo: '',
  ctgryNo: '',
  caseTtl: '',
  caseCn: '',
  sortSeq: 0,
  regInstNo: '',
  atchFileId: '',
  caseQstnCn: '',
  caseSe: '',
  caseClsf: '',
  srvcNo: '',
  frstRegDt: '',
  fileList: [],
  useYn: false,
  inqCnt: 0,
  lwaCtgryNm: '',
  pdfId: ''
};

export const useCaseStore = defineStore('useCaseStore', () => {
  const caseTypeQuery = ref<CaseTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const caseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE));

  const caseDscsnMainList = ref<CaseMainType>([]);

  const caseRlfMainList = ref<CaseMainType>([]);

  const lwaCtgry = ref<LwaCtgryType[]>([]);

  const lwaCtgryTmp = ref<LwaCtgryType[]>([]);

  const lwaCtgryTmpNm = ref<LwaCtgryType2[]>([]);

  const lwaCtgryMenu = ref<LwaCtgryMenu[]>([]);

  const adminCase = ref<CaseType>(cloneDeep(DEFAULT_CASE));

  const resetQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    caseList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetLwaCtgry = () => {
    lwaCtgry.value = [];
  };

  const resetLwaCtgryMenu = () => {
    lwaCtgryMenu.value = [];
  };

  const resetCase = () => {
    adminCase.value = cloneDeep(DEFAULT_CASE);
  };

  const resetCaseStore = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    resetList();
  };

  const searchCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/case/caseList', {
        params: {
          ...caseTypeQuery.value
        }
      });

      caseList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const findMainDscsnCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/case/mainDscsnCaseList');

      caseDscsnMainList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const findMainRlfCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/case/mainRlfCaseList');

      caseRlfMainList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const findLwaCtgry = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/case/findLwaCtgry', {
        params: {
          ...caseTypeQuery.value
        }
      });

      lwaCtgry.value = data;
    } catch (e) {
      resetLwaCtgry();
    }
  };

  const findLwaCtgryTmp = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/tmplt/findLwaCtgry', {
        params: {
          ...caseTypeQuery.value
        }
      });

      lwaCtgryTmp.value = data;
    } catch (e) {
      resetLwaCtgry();
    }
  };

  const findLwaCtgryNm = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/tmplt/findLwaCtgryNm', {
        params: {
          ...caseTypeQuery.value
        }
      });

      lwaCtgryTmpNm.value = data;
    } catch (e) {
      resetLwaCtgry();
    }
  };

  const findLwaCtgryMenu = async () => {
    try {
      resetLwaCtgryMenu();

      const { data } = await useAxios().get('/api/case/findLwaCtgryMenu', {
        params: {
          ...caseTypeQuery.value
        }
      });

      lwaCtgryMenu.value = data;
    } catch (e) {
      resetLwaCtgryMenu();
    }
  };

  const searchCase = async (params) => {
    const { data } = await useAxios().get('/api/case/detail', {
      params: {
        caseNo: params
      }
    });

    if (data.caseCn.indexOf('<') === -1) {
      data.caseCn = data.caseCn.replace(/\n/g, '<br />');
    }

    adminCase.value = {
      ...data,
      answerFileList: data.answerFileList ?? []
    };
  };

  const crateCase = () => {
    return useAxios().post('/api/case/createCase', adminCase.value);
  };

  const updateCase = () => {
    return useAxios().post('/api/case/updateCase', adminCase.value);
  };

  const deleteCaseList = (data: CaseType[]) => {
    const params = new URLSearchParams();
    data.forEach((item) => {
      params.append('baId', item.caseNo);
    });

    return useAxios().post('/api/case/deleteCaseList', null, {
      params
    });
  };

  return {
    resetQuery,
    caseTypeQuery,
    caseList,
    adminCase,
    caseDscsnMainList,
    caseRlfMainList,
    resetCaseStore,
    resetCase,
    searchCaseList,
    searchCase,
    deleteCaseList,
    crateCase,
    updateCase,
    findMainDscsnCaseList,
    findMainRlfCaseList

  };
});
