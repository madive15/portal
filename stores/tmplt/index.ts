import { cloneDeep } from 'lodash-es';
import type { TmpltMainType, TmpltType, TmpltTypeQuery } from '~/types/tmplt';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';

const INIT_TMPLT_QUERY_VALUE: TmpltTypeQuery = {
  startDate: '',
  endDate: '',
  keyword: '',
  keywordType: '',
  tmpltType: '',
  useYn: '',
  page: 1,
  size: 10,
  frstRegDt: '',
  desc: 'N',
  instNo: '',
  ctgryNo: '',
  defaultText: '10개씩 보기'
};

const DEFAULT_PAGE: Page<TmpltType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_TMPLT: TmpltType = {
  tmpltNo: '',
  tmpltType: '',
  tmpltNm: '',
  serviceName: '',
  fileList: [],
  useYn: false,
  frstRegDt: '',
  tmpltAnswer: {
    tmpltNo: '',
    tmpltNm: '',
    tmpltType: '',
    serviceName: '',
    frstRegDt: '',
    frstRgtrId: '',
    lastMdfcnDt: '',
    lastMdfrId: '',
    useYn: true,
    pdfId: ''
  },
  pdfId: '',
  atchFileDwmldCnt: 0
};

const DEFAULT_MAIN: TmpltMainType = {
  tmpltNo: '',
  useYn: false,
  tmpltNm: '',
  frstRegDt: '',
  atchFileId: '',
  path: '',
  srvcNo: ''
};

// Deprecated
export const useTmpltStore = defineStore('useTmpltStore', () => {
  const tmpltTypeQuery = ref<TmpltTypeQuery>(cloneDeep(INIT_TMPLT_QUERY_VALUE));

  const tmpltList = ref<Page<TmpltType>>(cloneDeep(DEFAULT_PAGE));

  const tmplt = ref<TmpltType>(cloneDeep(DEFAULT_TMPLT));

  const tmpltCvlcptMain = ref<TmpltMainType>(cloneDeep(DEFAULT_MAIN));

  const tmpltSpclMain = ref<TmpltMainType>(cloneDeep(DEFAULT_MAIN));

  const resetQuery = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_TMPLT_QUERY_VALUE);
  };

  const resetTmpltTypeQuery = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_TMPLT_QUERY_VALUE);
    searchTmpltList();
  };

  const resetList = () => {
    tmpltList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetTmplt = () => {
    tmplt.value = cloneDeep(DEFAULT_TMPLT);
  };

  const resetTmpltStore = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_TMPLT_QUERY_VALUE);
    resetList();
    resetTmplt();
  };

  const searchTmpltList = async () => {
    const { data } = await useAxios().get('/api/user/tmplt/tmpltList', {
      params: {
        ...tmpltTypeQuery.value
      }
    });

    tmpltList.value = data;
  };

  const searchMainCvlcptTmpltList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/case/mainCvlcptTmpltList');

      tmpltCvlcptMain.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchMainSpclTmpltList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/case/mainSpclTmpltList');

      tmpltSpclMain.value = data;
    } catch (e) {
      resetList();
    }
  };

  const searchTmplt = async (tmpltNo: string, ctgryNo: string) => {
    const { data } = await useAxios().get('/api/tmplt/detail', {
      params: {
        tmpltNo,
        ctgryNo
      }
    });

    tmplt.value = {
      ...data,
      tmpltAnswer: data.tmpltAnswer ?? cloneDeep(DEFAULT_TMPLT.tmpltAnswer),
      answerFileList: data.answerFileList ?? []
    };
  };

  return {
    resetQuery,
    tmpltTypeQuery,
    tmpltList,
    tmplt,
    tmpltCvlcptMain,
    tmpltSpclMain,
    resetTmpltStore,
    resetTmplt,
    searchTmpltList,
    searchTmplt,
    searchMainCvlcptTmpltList,
    searchMainSpclTmpltList,
    resetTmpltTypeQuery
  };
});
