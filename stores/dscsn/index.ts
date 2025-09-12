import { cloneDeep } from 'lodash-es';
import type {
  CaseType,
  CaseTypeQuery,
  LwaCtgryMenu,
  LwaCtgryType
} from '~/types/dscsn';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_CASE_QUERY_VALUE: CaseTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: 'CASE_TTL',
  defautText: '10개씩 보기',
  caseSe: [],
  useYn: '',
  page: 1,
  inqCnt: 0,
  size: 10,
  instNo: '',
  desc: 'N',
  upCtgryNo: '',
  tmpCtgryNo: '',
  pdfId: '',
  srvcNo: '',
  ctgryNo: ''
};

const DEFAULT_PAGE: Page<CaseType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_CASE: CaseType = {
  caseNo: '',
  useYn: false,
  caseQstnCn: '',
  frstRegDt: '',
  caseTtl: '',
  comCdNm: '',
  path: '',
  srvcNo: '',
  upCtgryNo: '',
  ctgryNo: '',
  caseCn: '',
  sortSeq: 0,
  regInstNo: '',
  atchFileId: '',
  caseSe: '',
  caseClsf: '',
  fileList: [],
  inqCnt: 0,
  lwaCtgryNm: '',
  pdfId: ''
};

export const useDscsnStore = defineStore('useDscsnStore', () => {
  const caseTypeQuery = ref<CaseTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const dscsnCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE));

  const lwaCtgry = ref<LwaCtgryType[]>([]);

  const lwaCtgryMenu = ref<LwaCtgryMenu[]>([]);

  const dscsnCaseDetail = ref<CaseType>(cloneDeep(DEFAULT_CASE));

  const resetQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    dscsnCaseList.value = cloneDeep(DEFAULT_PAGE);
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

  const resetCase = () => {
    dscsnCaseDetail.value = cloneDeep(DEFAULT_CASE);
  };

  const findLwaCtgry = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/dscsn/lwaCtgry', {
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

      const { data } = await useAxios().get('/api/dscsn/dscsnCaseList', {
        params: {
          ...caseTypeQuery.value
        }
      });

      dscsnCaseList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const findLwaCtgryMenu = async (instNo: string) => {
    try {
      resetLwaCtgryMenu();

      const { data } = await useAxios().get('/api/dscsn/lwaCtgryMenu', {
        params: {
          ...caseTypeQuery.value,
          instNo
        }
      });

      lwaCtgryMenu.value = data;
    } catch (e) {
      resetLwaCtgryMenu();
    }
  };

  const searchCase = async (params) => {
    const { data } = await useAxios().get('/api/dscsn/detail', {
      params
    });

    // data.caseCn 에 HTML 태그가 없는지 확인하고, 없으면 <br> 태그로 변경
    if (data.caseCn.indexOf('<') === -1) {
      data.caseCn = data.caseCn.replace(/\n/g, '<br>');
    }

    dscsnCaseDetail.value = {
      ...data,
      answerFileList: data.answerFileList ?? []
    };
  };

  return {
    resetQuery,
    lwaCtgry,
    caseTypeQuery,
    dscsnCaseList,
    lwaCtgryMenu,
    dscsnCaseDetail,
    searchCase,
    resetCaseStore,
    resetLwaCtgryMenu,
    resetLwaCtgry,
    findLwaCtgryMenu,
    searchDscsnCaseList,
    findLwaCtgry
  };
});
