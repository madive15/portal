export type TmpltType = {
  comCdNm: string;
  tmpltNm: string;
  path: string;
  tmpltExpln: string;
  frstRegDt: string;
  inqCnt: number;
  atchFileId: string;
  atchFileSeq: string;
  atchFileDwnldCnt: number;
  pdfId: string;
  lwaCtgryNm: string;
  ctgryNo: string;
  upCtgryNo: string;
  fileList: [];
};

export type TmpltTypeQuery = {
  startDate: string;
  endDate: string;
  keyword: string;
  keywordType: '' | 'CASE_TTL' | 'CASE_NO';
  defautText: string;
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
  upCtgryNo: string;
  atchFileId: string;
  tmpltNo: string;
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
