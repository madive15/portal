export type EasySrchTypeListResult = {
  ctgryNo: string;
  ctgryNm: string;
};

export type EasySrchTrprListResult = {
  ctgryNo: string;
  ctgryNm: string;
};

export type EasySrchInstClsfListResult = {
  comCd: string;
  comCdNm: string;
};

export type EasySrchRgnListResult = {
  comCd: string;
  comCdNm: string;
};

export type EasySrchSubTypeListResult = {
  ctgryNo: string;
  ctgryNm: string;
};

export type EasySrchSubTrprListResult = {
  ctgryNo: string;
  lwaCtgryNm: string;
};

export type EasySrchSubInstListResult = {
  instNo: string;
  instNm: string;
  instClsfCd: string;
};

export type EasySrchQueryType = { type: 'type' | 'trpr' | 'inst' | 'rgn' };

export type EasySrchListTypeQuery = EasySrchQueryType & {
  typeCd: string;
  typeNm: string;
  children: {
    subTypeCd: string;
    subTypeNm: string;
  }[];
};

export type EasySrchListTrprQuery = EasySrchQueryType & {
  trprCd: string;
  trprNm: string;
  children: {
    subTrprCd: string;
    subTrprNm: string;
  }[];
};

export type EasySrchListInstQuery = EasySrchQueryType & {
  instClsfCd: string;
  instClsfNm: string;
  children: {
    instNo: string;
    instNm: string;
  }[];
};

export type EasySrchListRgnQuery = EasySrchQueryType & {
  rgnCd: string;
  rgnNm: string;
};

export type EasySrchListQuery =
  | EasySrchListTypeQuery
  | EasySrchListTrprQuery
  | EasySrchListInstQuery
  | EasySrchListRgnQuery;

export type SrchTypeQuery = {
  srvcSvc: [];
  srvc: [];
  page: number;
  size: number;
  srvcInst: [];
  srvcMap: [];
  srvcTtl: string;
  srchSvcChk: [];
  srchChk: [];
  srchInstChk: [];
  desc: 'C' | 'Y' | 'T';
};
