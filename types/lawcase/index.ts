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
};

export type CaseTypeQuery = {
  startDate: string;
  endDate: string;
  keyword: string;
  keywordType: '' | 'CASE_TTL' | 'CASE_NO';
  caseSe: string[];
  useYn: '' | true | false;
  page: number;
  size: number;
  inqCnt: number;
  instNo: string;
  desc: string;
  ctgryNo: string;
  tmpCtgryNo: string;
  pdfId: string;
  srvcNo: string;
};

export type LwaCtgryType = {
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
};


export type LwaCtgryMenu = {
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
  lwaCtgryNm1: string;
};
