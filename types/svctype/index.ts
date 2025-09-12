import type { TmpltAnswerType } from '~/types/tmplt';

export type SvcType = {
  srvcNo: string;
  ctgryNo: string;
  instNo: string;
  regSttsCd: string;
  srvcTtl: string;
  srvcExpln: string;
  sortSeq: number;
  useYn: '' | true | false;
  frstRegDt: string;
  gdCn: string;
  gdNm: string;
  instNm: string;
};

export type SvcUrlType = {
  instNo: string;
  instNm: string;
  urlNm: string;
  urlAddr: string;
};

export type SvcTypeQuery = {
  page: number;
  size: number;
  instNm: string;
  srvcNo: string;
  upCtgryNo: string;
  keyword: string;
  desc: string;
  instNo: string;
  defaultText: string;
};

export type SvcMenuType = {
  ctgryNo: string;
  ctgryNm: string;
  upCtgryNo: string;
  cnt: number;
};

export type SvcCtgryType = {
  ctgryNo: string;
  ctgryNm: string;
  upCtgryNo: string;
};

export type SvcListType = {
  srvcNo: string;
  srvcTtl: string;
  srvcExpln: string;
  trprNm: string;
  trprCtgry: string;
  svcCtgry: string;
  instNo: string;
  instNm: string;
  addr: string;
  instTelno: string;
  srchExcpYn: string;
};

export type SvcTabListType = {
  srvcNo: string;
  gdNo: string;
  gdTtl: string;
  gdClsfCd: string;
  gdCn: string;
  sortSeq: string;
  bbsTypeCd: string;
};

export type TmpltType = {
  tmpltNo: string;
  useYn: string;
  tmpltNm: string;
  inqCnt: string;
  frstRegDt: string;
  atchFileId: string;
  ctgryNo: string;
  lwactgrynm: string;
  lwactgrynm2: string;
  pdfId: string;
  atchFileDwnldCnt: string;
  fileList: [];
};

export type CaseType = {
  caseNo: string;
  useYn: string;
  caseTtl: string;
  caseClsfCd: string;
  caseQstnCn: string;
  frstRegDt: string;
  inqCnt: string;
  ctgryNo: string;
  lwactgrynm: string;
  srvcNo: string;
  caseCn: string;
};
