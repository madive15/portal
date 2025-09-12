// 서비스
export type ServiceListQueryType = {
  searchQuery: string;
  instNo: string;
  ctgryNo: string;
  trprNo: string;
  reSearchQuery: string[];
  page: number;
  size: number;
  sort: string;
  defaultText: string;
};

export type ServiceListType = {
  dqId: string;
  srvcNo: string;
  srvcTtl: string;
  srvcExpln: string;
  ctgryNo: string;
  ctgryNm: string;
  ctgryPathNm: string;
  trprNo: string;
  trprNm: string;
  trprPathNm: string;
  instNo: string;
  instNm: string;
  regDt: string;
  weight: number;
  inqCnt: number;
  svcCnt: number;
  smryTtl1: string;
  smryTtl2: string;
  smryTtl3: string;
  smryTtl4: string;
  smryTtl5: string;
  smryTtl6: string;
  smryNm1: string;
  smryNm2: string;
  smryNm3: string;
  smryNm4: string;
  smryNm5: string;
  smryNm6: string;
  expanded: boolean;
};
