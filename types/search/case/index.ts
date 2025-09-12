// 사례
export type CaseListQueryType = {
  searchQuery: string;
  instNo: string;
  caseClsfCd: string;
  reSearchQuery: string[];
  page: number;
  size: number;
  sort: string;
  defaultText: string;
};

export type CaseListType = {
  dqId: string;
  caseNo: string;
  caseTtl: string;
  caseCn: string;
  caseClsfCd: string;
  caseClsfNm: string;
  ctgryNo: string;
  ctgryNm: string;
  upCtgryNo: string;
  instNo: string;
  instNm: string;
  path: string;
  pathNm: string;
  regDt: string;
  weight: number;
};
