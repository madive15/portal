import { cloneDeep } from 'lodash-es';
import type {
  CaseType,
  CaseTypeQuery,
  LwaCtgryMenu,
  LwaCtgryType,
} from '~/types/lawcase';
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

export const useLawCaseStore = defineStore('useLawCaseStore', () => {
  const caseTypeQuery = ref<CaseTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const dscsnCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE));

  const rlfCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE));

  const lwaCtgry = ref<LwaCtgryType[]>([]);

  const lwaCtgryMenu = ref<LwaCtgryMenu[]>([]);


  const resetQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    dscsnCaseList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetRlfList = () => {
    rlfCaseList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetLwaCtgry = () => {
    lwaCtgry.value = [];
  };

  const resetLwaCtgryMenu = () => {
    lwaCtgryMenu.value = [];
  };

  const resetCaseStore = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    resetList();
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


  const searchDscsnCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/dscsn/caseList', {
        params: {
          ...caseTypeQuery.value
        }
      });

      dscsnCaseList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchRlfCaseList = async () => {
    try {
      resetRlfList();

      const { data } = await useAxios().get('/api/rlf/caseList', {
        params: {
          ...caseTypeQuery.value
        }
      });

      rlfCaseList.value = data;
    } catch (e) {
      resetRlfList();
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



  return {
    resetQuery,
    lwaCtgry,
    caseTypeQuery,
    rlfCaseList,
    dscsnCaseList,
    lwaCtgryMenu,
    resetCaseStore,
    resetLwaCtgryMenu,
    resetLwaCtgry,
    findLwaCtgryMenu,
    searchDscsnCaseList,
    findLwaCtgry,
    searchRlfCaseList
  };
});
