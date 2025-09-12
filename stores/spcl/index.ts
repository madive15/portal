import { cloneDeep } from 'lodash-es';
import type {
  TmpltType,
  TmpltTypeQuery,
  LwaCtgryMenu,
  LwaCtgryType
} from '~/types/spcl';
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
  ctgryNo: '',
  atchFileId: '',
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
  inqCnt: 0,
  atchFileId: '',
  atchFileSeq: '',
  atchFileDwnldCnt: 0,
  pdfId: '',
  lwaCtgryNm: '',
  ctgryNo: '',
  upCtgryNo: '',
  fileList: []
};

export const useSpclStore = defineStore('useSpclStore', () => {
  const tmpltTypeQuery = ref<TmpltTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const spclTmpltList = ref<Page<TmpltType>>(cloneDeep(DEFAULT_PAGE));

  const lwaCtgry = ref<LwaCtgryType[]>([]);

  const lwaCtgryMenu = ref<LwaCtgryMenu[]>([]);

  const resetQuery = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
  };

  const resetList = () => {
    spclTmpltList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetLwaCtgry = () => {
    lwaCtgry.value = [];
  };

  const resetLwaCtgryMenu = () => {
    lwaCtgryMenu.value = [];
  };

  const resetCaseStore = () => {
    tmpltTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    resetList();
  };

  const findLwaCtgry = async () => {
    try {
      resetLwaCtgry();

      const { data } = await useAxios().get('/api/spcl/lwaCtgry', {
        params: {
          ...tmpltTypeQuery.value
        }
      });

      lwaCtgry.value = data;
    } catch (e) {
      resetLwaCtgry();
    }
  };

  const updateTmpltDwn = async () => {
    try {
      await useAxios().post('/api/spcl/updateTmpltDwn', tmpltTypeQuery.value);
    } catch (e) {
      console.log('업데이트실패');
    }
  };

  const searchSpclTmpltList = async () => {
    try {
      resetList();

      const { data } = await useAxios().get('/api/spcl/spclTmpltList', {
        params: {
          ...tmpltTypeQuery.value
        }
      });

      spclTmpltList.value = data;
    } catch (e) {
      resetList();
    }
  };

  const findLwaCtgryMenu = async (instNo: string) => {
    try {
      resetLwaCtgryMenu();

      const { data } = await useAxios().get('/api/spcl/lwaCtgryMenu', {
        params: {
          ...tmpltTypeQuery.value,
          instNo
        }
      });

      lwaCtgryMenu.value = data;
    } catch (e) {
      resetLwaCtgryMenu();
    }
  };


  return {
    lwaCtgry,
    tmpltTypeQuery,
    spclTmpltList,
    lwaCtgryMenu,
    resetQuery,
    resetCaseStore,
    resetLwaCtgryMenu,
    resetLwaCtgry,
    findLwaCtgryMenu,
    findLwaCtgry,
    searchSpclTmpltList,
    updateTmpltDwn
  };
});
