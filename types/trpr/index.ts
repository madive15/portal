export type TrprType = {
  trprNo: string;
  tmpltType: string;
  trprNm: string;
  serviceName: string;
  useYn: '' | true | false;
  tmpltAnswer: TrprAnswerType;
  fileList: [];
  frstRegDt: string;
};

export type TrprTypeQuery = {
  startDate: string;
  endDate: string;
  keyword: string;
  keywordType: '' | 'TMPLT_NO' | 'TMPLT_NM';
  tmpltType: string;
  useYn: '' | true | false;
  page: number;
  size: number;
  frstRegDt: string;
};

export type TrprAnswerType = {
  trprNo: string;
  trprNm: string;
  tmpltType: string;
  useYn: boolean;
  serviceName: string;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
};
