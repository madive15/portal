
export type SrchType = {
  ctgryNm: string,
  ctgryNo: string,
  comCd:string,
  comCdNm:string,
  lwaCtgryNm:string,
  instClsfCd :string,
  artclNm2?: string,
  artclNm3?: string,
};

export type SrchTypeQuery = {
  srvcSvc: [],
  srvc: [],
  page: number;
  size: number;
  srvcInst: [],
  srvcMap: [],
  srvcTtl: string,
  srchSvcChk: [],
  srchChk: [],
  srchInstChk: [],
  desc: string
}

export type SrchMainType = {
  srvcNo  : string,
  srvcTtl : string,
  srvcExpln  : string,
  svcPath : string,
  trprNm : string,
  instNm : string,
  instNo : string,
  rgnNmInst: string,
  mth: string,
  period : string,
  process : string,
  chk : string,
  prep : string,
  aftinto : string,
  caseCnt : string,
  tmpltCnt: string,
    urls :[]
}

export type LegalWelfareInstituteMapQuery = {
    searchCategory: string;
    searchKeyword: string;
    searchRegion: string;
    userLat: string;
    userLot: string;
}

export type LegalWelfareInstituteMapResult = {
    relInstNo: string;
    instNo: string;
    instNm: string;
    instZip: string;
    instAddr: string;
    instDAddr: string;
    instTel: string;
    instLat: string;
    instLot: string;
    urlAddr: string;
    distance: string;
}

export type SidoResult = {
    stdgCd: string;
    nm: string
    lat: string;
    lot: string;
}