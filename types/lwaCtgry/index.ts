export type UseLwaCtgryCaseListType = {
  no: number;
  caseNo: string;
  ctgryNm: string;
  caseTtl: string;
  frstRegDt: string;
  inqCnt: number;
};

export type UseLwaCtgryTmpltListType = {
  no: number;
  caseNo: string;
  ctgryNm: string;
  caseTtl: string;
  frstRegDt: string;
  inqCnt: number;
};

export type UseLwaCtgryListQueryType = {
  page: number;
  size: number;
  desc: string;
  keywordType: string;
  keyword: string;
  upCtgryNo: string;
  ctgryNo: string;
  instNo: string;
  ctgryWholYn: string;
};

export type UseLwaCtgryItemListType = {
  value: string;
  text: string;
  upCode: string;
};

export type LwaCtgryListType = {
  value: string;
  label: string;
  upCode: string;
  lvlL: number;
  sortSeq: number;
  downListYn: string;
  topCode: string;
  text: string;
  lwaCtgrySeCd: string;
};

export interface CtgryListOutVO {
  ctgryNo?: string; // 법률구조범주번호
  instNo?: string; // 기관번호
  upCtgryNo?: string; // 상위법률구조범주번호
  lwaCtgryLvl?: number; // 법률구조범주레벨
  ctgryNo1?: string; // 범주번호1
  ctgryNo2?: string; // 범주번호2
  ctgryNo3?: string; // 범주번호3
  ctgryNm1?: string; // 범주명1
  ctgryNm2?: string; // 범주명2
  ctgryNm3?: string; // 범주명2
}
