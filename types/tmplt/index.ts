export type TmpltType = {
  tmpltNo: string;
  tmpltType: string;
  tmpltNm: string;
  serviceName: string;
  useYn: '' | true | false;
  tmpltAnswer: TmpltAnswerType;
  fileList: [];
  frstRegDt: string;
  pdfId: string;
  atchFileDwmldCnt: number;
  lwaCtgryText: string;
};

export type TmpltMainType = {
  tmpltNo: string;
  useYn: boolean;
  tmpltNm: string;
  frstRegDt: string;
  atchFileId: string;
  path: string;
  srvcNo: string;
};

export type TmpltTypeQuery = {
  startDate: string;
  endDate: string;
  keyword: string;
  keywordType: '' | 'TMPLT_NO' | 'TMPLT_NM';
  tmpltType: string;
  useYn: '' | true | false;
  page: number;
  size: number;
  frstRegDt: string;
  desc: string;
  instNo: string;
  ctgryNo?: string;
  defaultText: string;
};

export type TmpltAnswerType = {
  tmpltNo: string;
  tmpltNm: string;
  tmpltType: string;
  useYn: boolean;
  serviceName: string;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
  pdfId: string;
};
