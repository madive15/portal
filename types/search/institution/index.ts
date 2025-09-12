export type InstitutionListQueryType = {
  searchQuery: string;
  instClsfCd: string;
  reSearchQuery: string[];
  page: number;
  size: number;
  sort: string;
  defaultText: string;
};

export type InstitutionListType = {
  dqId: string;
  instNo: string;
  instNm: string;
  instExpln: string;
  instSrvc: string;
  instClsfCd: string;
  instClsfNm: string;
  instAddr: string;
  instLat: string;
  instLot: string;
  arrUrl: string;
  hpUrl: string;
  urlList: object[];
  regDt: string;
  weight: number;
  inqCnt: number;
};
