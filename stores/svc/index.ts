import { cloneDeep } from 'lodash-es';
import type {
  SvcType,
  SvcTypeQuery,
  SvcUrlType,
  SrvcType,
  SvcSnsType,
  SvcInstType,
  SvcSummeryType,
  SvcMenuType,
  boardTypeQuery,
  CaseType,
  BoardType,
  CaseTypeQuery
} from '~/types/svc';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';
import type { LocationQueryValue } from 'vue-router';

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
  instNm: '',
  svcNm: '',
  addr: '',
  instInfo: '',
  instSvc: '',
  hpUrl: '',
  caseCnt: '',
  tmpltCnt: '',
  rgnNmInst: '',
  mth: '',
  period: '',
  process: '',
  chk: '',
  prep: '',
  aftinto: '',
  urls: [],
  comCdNm: '',
  instTelNo: '',
  instLot: '',
  instLat: ''
};

const DEFAULT_PAGE: Page<SvcType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_PAGE2: Page<SrvcType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_SRVC: SrvcType = {
  srvcTtl: '',
  srvcExpln: '',
  trprNm: '',
  urls: []
};

const DEFAULT_SNS: SvcSnsType = {
  urlNm: '',
  urlAddr: '',
  urlTypeCd: ''
};

const DEFAULT_SUMMERY: SvcSummeryType = {
  srvcNo: '',
  ctgryNo: '',
  instNo: '',
  instNm: '',
  col1: '',
  col2: '',
  col3: '',
  col4: '',
  col5: '',
  col6: '',
  sCnt: 0
};

const DEFAULT_INST: SvcInstType = {
  upGdNo: '',
  gdNo: '',
  gdNm: '',
  gdTtl: '',
  gdCn: '',
  useYn: true,
  scrnIndctYn: '',
  expsrYn: '',
  sortSeq: '',
  lvl: '',
  gdClsfCd: '',
  bbsTypeCd: '',
  rmrkCn: '',
  imgUseYn: '',
  atchFileId: ''
};

const DEFAULT_MENU: SvcMenuType = {
  comCd: '',
  comCdNm: '',
  cnt: 0
};

const DEFAULT_URL: SvcUrlType = {
  instNo: '',
  instNm: '',
  urlNm: '',
  urlAddr: ''
};

const INIT_SVC_QUERY_VALUE: SvcTypeQuery = {
  ctgryNo: '',
  instNm: '',
  instNo: '',
  page: 1,
  size: 12,
  desc: 'N',
  check: [],
  bbsId: '',
  keyword: '',
  defaultText: '12개씩 보기',
  keywordType: 'CASE_TTL',
  srchExcpYn: false
};

const INIT_CASE_QUERY_VALUE: CaseTypeQuery = {
  ctgryNo: '',
  instNm: '',
  instNo: '',
  page: 1,
  size: 10,
  desc: 'N',
  check: [],
  bbsId: '',
  keyword: '',
  defaultText: '10개씩 보기',
  keywordType: 'CASE_TTL'
};

const INIT_BOARD_QUERY_VALUE: boardTypeQuery = {
  instNm: '',
  instNo: '',
  page: 1,
  size: 10,
  desc: 'N',
  check: [],
  bbsId: '',
  keyword: '',
  keywordType: 'CASE_TTL',
  defaultText: '10개씩 보기'
};

const DEFAULT_CASE_PAGE: Page<CaseType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

const DEFAULT_BOARD: BoardType = {
  pstSn: '',
  bbsId: '',
  pstClsfCd: '',
  pstSeq: '',
  pstTtl: '',
  pstCn: '',
  pstInqCnt: '',
  atchFileId: '',
  imgAtchFileId: '',
  imgAtchFileSeq: ''
};

const DEFAULT_PAGE3: Page<BoardType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

export const useSvcStore = defineStore('useSvcStore', () => {
  const svcTypeQuery = ref<SvcTypeQuery>(cloneDeep(INIT_SVC_QUERY_VALUE));

  const boardTypeQuery = ref<boardTypeQuery>(cloneDeep(INIT_BOARD_QUERY_VALUE));

  const caseTypeQuery = ref<CaseTypeQuery>(cloneDeep(INIT_CASE_QUERY_VALUE));

  const svcUrl = ref<SvcUrlType>(cloneDeep(DEFAULT_URL));
  const svcList = ref<Page<SvcType>>(cloneDeep(DEFAULT_PAGE));
  const srvc = ref<Page<SrvcType>>(cloneDeep(DEFAULT_PAGE2));
  const svcSns = ref<SvcSnsType[]>([]);
  const svcInst = ref<SvcInstType>(cloneDeep(DEFAULT_INST));

  const svcBoradList = ref<Page<BoardType>>(cloneDeep(DEFAULT_PAGE3));
  const svcBoardDetail = ref<BoardType>(cloneDeep(DEFAULT_BOARD));

  const svcSummery = ref<SvcSummeryType>(cloneDeep(DEFAULT_SUMMERY));

  const svcCaseList = ref<Page<CaseType>>(cloneDeep(DEFAULT_CASE_PAGE));

  const svcInfoList = ref<SvcType>(cloneDeep(DEFAULT_SVC));

  const svcType = ref<SvcMenuType>(cloneDeep(DEFAULT_MENU));

  const resetCaseStore = () => {
    svcTypeQuery.value = cloneDeep(INIT_SVC_QUERY_VALUE);
    resetList();
  };

  const resetSvcTypeQuery = () => {
    svcTypeQuery.value = cloneDeep(INIT_SVC_QUERY_VALUE);
    searchSrvcList();
  };

  const resetQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_SVC_QUERY_VALUE);
  };

  const resetCaseTypeQuery = () => {
    caseTypeQuery.value = cloneDeep(INIT_CASE_QUERY_VALUE);
    searchCaseList();
  };

  const resetBoardTypeQuery = () => {
    boardTypeQuery.value = cloneDeep(INIT_BOARD_QUERY_VALUE);
    searchBoardList();
  };

  const resetList = () => {
    svcList.value = cloneDeep(DEFAULT_PAGE);
  };

  const resetBoardList = () => {
    svcBoradList.value = cloneDeep(DEFAULT_PAGE3);
  };

  const resetBoardDetailList = () => {
    svcBoardDetail.value = cloneDeep(DEFAULT_BOARD);
  };

  const resetUrlList = () => {
    svcUrl.value = cloneDeep(DEFAULT_URL);
  };

  const resetInfoList = () => {
    svcInfoList.value = cloneDeep(DEFAULT_SVC);
  };

  const resetSnsList = () => {
    svcSns.value = [];
  };

  const resetSummery = () => {
    svcSummery.value = cloneDeep(DEFAULT_SUMMERY);
  };

  const resetInstList = () => {
    svcSns.value = [];
  };

  const resetSrvc = () => {
    srvc.value = cloneDeep(DEFAULT_PAGE2);
  };

  const resetCaseList = () => {
    svcCaseList.value = cloneDeep(DEFAULT_CASE_PAGE);
  };

  const searchCaseList = async () => {
    const { data } = await useAxios().get('/api/svc/findCaseList', {
      params: {
        ...caseTypeQuery.value
      }
    });

    svcCaseList.value = data;
  };

  const searchSvcList = async () => {
    try {
      resetList();

      svcTypeQuery.value;
      const params = new URLSearchParams();

      const values = Object.values(svcTypeQuery.value);
      Object.keys(svcTypeQuery.value).forEach((item, index) => {
        params.append(item, <string>values[index]);
      });

      const { data } = await useAxios().get('/api/svc/svcList', {
        params
      });

      for (var i = 0; i < data.content.length; i++) {
        data.content[i].urls = data.content[i].urls.map((item: any) => {
          return {
            text: item.urlNm,
            to: item.urlAddr
          };
        });
      }
      svcList.value = data;
      /*     const { data } = await useAxios().get('/api/svc/svcList', {
        params: {
          ...svcTypeQuery.value
        }
      });

      for(var i = 0; i<data.content.length; i++){
        data.content[i].urls = data.content[i].urls.map((item: any) => {
          return {
            text: item.urlNm,
            to: item.urlAddr
          }
        })
      }

      svcList.value = data;*/
    } catch (e) {
      resetList();
    }
  };

  const searchSrvcList = async () => {
    try {
      const { data } = await useAxios().get('/api/svc/srvcList', {
        params: {
          ...svcTypeQuery.value
        }
      });
      srvc.value = data;
      svcTypeQuery.value = {
        ...svcTypeQuery.value,
        page: data.number + 1,
        size: data.size
      };

      for (var i = 0; i < data.content.length; i++) {
        data.content[i].urls = data.content[i].urls.map((item: any) => {
          return {
            text: item.urlNm,
            to: item.urlAddr
          };
        });
      }
    } catch (e) {
      resetList();
    }
  };

  const searchSvcUrlList = async (instNo: string) => {
    try {
      resetUrlList();

      const { data } = await useAxios().get('/api/svc/svcUrlList', {
        params: {
          instNo
        }
      });
      svcUrl.value = data;
    } catch (e) {
      resetUrlList();
    }
  };

  const searchSvcUrlList2 = async (instNo: string) => {
    try {
      resetUrlList();

      const { data } = await useAxios().get('/api/svc/svcUrlList', {
        params: {
          instNo
        }
      });
      svcUrl.value = data;
    } catch (e) {
      resetUrlList();
    }
  };

  const searchBoardDetailList = async () => {
    try {
      resetBoardDetailList();

      const { data } = await useAxios().get('/api/svc/boardDetailList', {
        params: {
          ...boardTypeQuery.value
        }
      });
      svcBoardDetail.value = data;
    } catch (e) {
      resetBoardDetailList();
    }
  };

  const searchSvcSnsList = async (instNo: string) => {
    try {
      resetSnsList();

      const { data } = await useAxios().get('/api/svc/snsList', {
        params: {
          instNo
        }
      });
      svcSns.value = data;
    } catch (e) {
      resetSnsList();
    }
  };

  const searchSvcInfoList = async (instNo: string) => {
    try {
      resetInfoList();

      const { data } = await useAxios().get('/api/svc/svcInfoList', {
        params: {
          instNo
        }
      });
      svcInfoList.value = data;
    } catch (e) {
      resetInfoList();
    }
  };

  const searchSvcMenuList = async () => {
    try {
      resetSnsList();

      const { data } = await useAxios().get('/api/svc/menuList');
      svcType.value = data;
    } catch (e) {
      resetSnsList();
    }
  };

  const searchSvcInstList = async (
    instNo: string | null | LocationQueryValue[]
  ) => {
    try {
      resetInstList();

      const { data } = await useAxios().get('/api/svc/instList', {
        params: {
          instNo
        }
      });
      svcInst.value = data;
    } catch (e) {
      resetInstList();
    }
  };

  const searchBoardList = async () => {
    try {
      resetBoardList();

      const { data } = await useAxios().get('/api/svc/boardList', {
        params: {
          ...boardTypeQuery.value
        }
      });
      svcBoradList.value = data;
    } catch (e) {
      resetBoardList();
    }
  };

  const findSummery = async (instNo: string | LocationQueryValue[] | null) => {
    try {
      resetSummery();

      const { data } = await useAxios().get('/api/svc/findSummery', {
        params: {
          instNo
        }
      });
      svcSummery.value = data;
    } catch (e) {
      resetSummery();
    }
  };

  return {
    svcList,
    svcUrl,
    svcTypeQuery,
    srvc,
    svcSns,
    svcInst,
    svcSummery,
    svcType,
    svcInfoList,
    svcCaseList,
    caseTypeQuery,
    svcBoradList,
    svcBoardDetail,
    boardTypeQuery,
    resetQuery,
    searchBoardList,
    searchBoardDetailList,
    searchSvcUrlList2,
    searchSvcSnsList,
    searchSvcList,
    searchSvcUrlList,
    searchSrvcList,
    resetCaseStore,
    searchSvcInstList,
    findSummery,
    resetSummery,
    searchSvcMenuList,
    searchSvcInfoList,
    resetSrvc,
    searchCaseList,
    resetSvcTypeQuery,
    resetCaseTypeQuery,
    resetBoardTypeQuery
  };
});
