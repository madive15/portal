export type EtcListQueryType = {
  searchQuery: string;
  startDt: string;
  endDt: string;
  reSearchQuery: string;
  page: number;
  size: number;
  sort: string;
  defaultText: string;
};

export type EtcListType = {
  dqId: string;
  bbsId: string;
  bbsNm: string;
  bbsClsfCd: string;
  bbsClsfNm: string;
  pstTtl: string;
  pstCn: string;
  regDt: string;
  weight: number;
  inqCnt: number;
};
