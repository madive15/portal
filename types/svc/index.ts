export type SvcType = {
  srvcNo: string;
  ctgryNo: string;
  instNo: string;
  regSttsCd: string;
  srvcTtl: string;
  srvcExpln: string;
  frstRegDt: string;
  gdCn: string;
  gdNm: string;
  instNm: string;
  svcNm: string;
  addr: string;
  instInfo: string;
  instSvc: string;
  hpUrl: string;
  caseCnt: string;
  tmpltCnt: string;
  rgnNmInst: string;
  mth: string;
  period: string;
  process: string;
  chk: string;
  prep: string;
  aftinto: string;
  sortSeq: number;
  useYn: boolean;
  urls: [];
  comCdNm: string;
  instTelNo: string;
  instLot: string;
  instLat: string;
};

export type SrvcType = {
  srvcTtl: string;
  srvcExpln: string;
  trprNm: string;
  urls: [];
};

export type SvcInstType = {
  upGdNo: string;
  gdNo: string;
  gdNm: string;
  gdTtl: string;
  gdCn: string;
  useYn: boolean;
  scrnIndctYn: string;
  expsrYn: string;
  sortSeq: string;
  lvl: string;
  gdClsfCd: string;
  bbsTypeCd: string;
  rmrkCn: string;
  imgUseYn: string;
  atchFileId: string;
};

export type SvcMenuType = {
  comCd: string;
  comCdNm: string;
  cnt: number;
};

export type SvcSnsType = {
  urlNm: string;
  urlAddr: string;
  urlTypeCd: string;
};

export type SvcUrlType = {
  instNo: string;
  instNm: string;
  urlNm: string;
  urlAddr: string;
};

export type SvcTypeQuery = {
  ctgryNo?: string;
  subCategoryNo?: string;
  instNm: string;
  instNo: string;
  page: number;
  size: number;
  desc: string;
  bbsId: string;
  check: [];
  keyword: string;
  defaultText: string;
  keywordType: 'CASE_TTL' | 'CASE_QSTN_CN' | '';
};

export type CaseTypeQuery = {
  ctgryNo?: string;
  subCategoryNo?: string;
  instNm: string;
  instNo: string;
  page: number;
  size: number;
  desc: string;
  bbsId: string;
  check: [];
  keyword: string;
  defaultText: string;
  keywordType: 'CASE_TTL' | 'CASE_QSTN_CN' | '';
  srchExcpYn: boolean;
};

export type boardTypeQuery = {
  ctgryNo?: string;
  subCategoryNo?: string;
  instNm: string;
  instNo: string;
  page: number;
  size: number;
  desc: string;
  bbsId: string;
  check: [];
  keyword: string;
  keywordType: 'CASE_TTL' | 'CASE_QSTN_CN' | '';
  defaultText: string;
};

export type SvcSummeryType = {
  srvcNo: string;
  ctgryNo: string;
  instNo: string;
  instNm: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  sCnt: number;
};

export type CaseType = {
  caseNo: string;
  ctgryNo: string;
  caseTtl: string;
  caseCn: string;
  sortSeq: number;
  regInstNo: string;
  atchFileId: string;
  caseQstnCn: string;
  caseSe: string;
  caseClsf: string;
  srvcNo: string;
  useYn: '' | true | false;
  frstRegDt: string;
  fileList: [];
  inqCnt: number;
  lwaCtgryNm: string;
  pdfId: string;
  lwaCtgryText: string;
};

export type BoardType = {
  pstSn: string;
  bbsId: string;
  pstClsfCd: string;
  pstSeq: string;
  pstTtl: string;
  pstCn: string;
  pstInqCnt: string;
  atchFileId: string;
  imgAtchFileId: string;
  imgAtchFileSeq: string;
};
