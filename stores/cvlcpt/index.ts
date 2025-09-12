import { cloneDeep } from 'lodash-es';
import type { TmpltType, TmpltTypeQuery, LwaCtgryType } from '~/types/cvlcpt';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_CASE_QUERY_VALUE: TmpltTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: '',
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
  atchFileId: '',
  ctgryNo: '',
  tmpltNo: ''
};

const DEFAULT_PAGE: Page<TmpltType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_CASE: TmpltType = {
  comCdNm: '',
  tmpltNm: '',
  path: '',
  tmpltExpln: '',
  frstRegDt: '',
  inqCnt: '',
  atchFileId: '',
  pdfId: '',
  atchFileSeq: '',
  atchFileDwnldCnt: '',
  fileList: []
};

export const useCvlcptStore = defineStore('useCvlcptStore', () => {
  const tmpltTypeQuery = ref<TmpltTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const cvlcptCaseList = ref<Page<TmpltType>>(cloneDeep(DEFAULT_PAGE));

  const lwaCtgry = ref<LwaCtgryType[]>([]);

  const resetQuery = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    cvlcptCaseList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetLwaCtgry = () => {
    lwaCtgry.value = [];
  };

  const resetCaseStore = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    resetList();
  };

  const findLwaCtgry = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/cvlcpt/lwaCtgry', {
        params: {
          ...tmpltTypeQuery.value
        }
      });

      lwaCtgry.value = data;
    } catch (e) {
      resetLwaCtgry();
    }
  };

  const searchCvlcptCaseList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/cvlcpt/cvlcptTmpltList', {
        params: {
          ...tmpltTypeQuery.value
        }
      });

      cvlcptCaseList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const updateTmpltDwn = async () => {
    try {
      await useAxios().post('/api/cvlcpt/updateTmpltDwn', tmpltTypeQuery.value);
    } catch (e) {
      console.log('업데이트실패');
    }
  };

  return {
    resetQuery,
    lwaCtgry,
    tmpltTypeQuery,
    cvlcptCaseList,
    resetCaseStore,
    resetLwaCtgry,
    findLwaCtgry,
    searchCvlcptCaseList,
    updateTmpltDwn
  };
});
