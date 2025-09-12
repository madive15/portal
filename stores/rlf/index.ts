import { cloneDeep } from 'lodash-es';
import type { CaseType, CaseTypeQuery } from '~/types/rlf';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_CASE_QUERY_VALUE: CaseTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: 'CASE_TTL',
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

export const useRlfStore = defineStore('useRlfStore', () => {
  const caseTypeQuery = ref<CaseTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const rlfCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_PAGE));

  const rlfCaseDetail = ref<CaseType>(cloneDeep(DEFAULT_CASE));

  const resetQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    rlfCaseList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetCaseStore = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    resetList();
  };

  const resetCase = () => {
    rlfCaseDetail.value = cloneDeep(DEFAULT_CASE);
  };

  const searchRlfCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/rlf/rlfCaseList', {
        params: {
          ...caseTypeQuery.value
        }
      });

      rlfCaseList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchCase = async (params) => {
    const { data } = await useAxios().get('/api/rlf/detail', {
      params
    });

    // data.caseCn 에 HTML 태그가 없는지 확인하고, 없으면 <br> 태그로 변경
    if (data.caseCn.indexOf('<') === -1) {
      data.caseCn = data.caseCn.replace(/\n/g, '<br />');
    }

    rlfCaseDetail.value = {
      ...data,
      answerFileList: data.answerFileList ?? []
    };
  };

  return {
    resetQuery,
    caseTypeQuery,
    rlfCaseList,
    rlfCaseDetail,
    searchCase,
    resetCaseStore,
    searchRlfCaseList
  };
});
