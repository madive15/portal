import { cloneDeep } from 'lodash-es';
import type { TrprAnswerType, TrprType, TrprTypeQuery } from '~/types/trpr';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_TMPLT_QUERY_VALUE: TrprTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: '',
  tmpltType: '',
  useYn: '',
  page: 1,
  size: 15,
  frstRegDt: ''
};

const DEFAULT_PAGE: Page<TrprType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_TMPLT: TrprType = {
  trprNo: '',
  tmpltType: '',
  trprNm: '',
  serviceName: '',
  fileList: [],
  useYn: false,
  frstRegDt: '',
  tmpltAnswer: {
    trprNo: '',
    trprNm: '',
    tmpltType: '',
    serviceName: '',
    frstRegDt: '',
    frstRgtrId: '',
    lastMdfcnDt: '',
    lastMdfrId: '',
    useYn: true
  }
};

export const useTrprStore = defineStore('useTrprStore', () => {
  const trprTypeQuery = ref<TrprTypeQuery>(cloneDeep(INIT_TMPLT_QUERY_VALUE));

  const trprList = ref<Page<TrprType>>(cloneDeep(DEFAULT_PAGE));

  const trpr = ref<TrprType>(cloneDeep(DEFAULT_TMPLT));

  const resetList = () => {
    trprList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetTrpr = () => {
    trpr.value = cloneDeep(DEFAULT_TMPLT);
  };

  const resetTrprStore = () => {
    trprTypeQuery.value = cloneDeep(INIT_TMPLT_QUERY_VALUE);
    resetList();
    resetTrpr();
  };

  const searchTrprList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/tmpltKr/tmpltList', {
        params: {
          ...trprTypeQuery.value
        }
      });

      trprList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchTrpr = async (tmpltNo: string, ctgryNo: string) => {
    const { data } = await useAxios().get('/api/tmpltKr/detail', {
      params: {
        tmpltNo,
        ctgryNo
      }
    });

    trpr.value = {
      ...data,
      tmpltAnswer: data.tmpltAnswer ?? cloneDeep(DEFAULT_TMPLT.tmpltAnswer),
      answerFileList: data.answerFileList ?? []
    };
  };

  return {
    trprTypeQuery,
    trprList,
    trpr,
    resetTrprStore,
    resetTrpr,
    searchTrprList,
    searchTrpr
  };
});
