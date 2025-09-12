// 서식
export type TemplateListQueryType = {
  searchQuery: string;
  instNo: string;
  tmpltClsfCd: string;
  reSearchQuery: string[];
  page: number;
  size: number;
  sort: string;
  defaultText: string;
};

export type TemplateListType = {
  dqId: string;
  tmpltNo: string;
  tmpltNm: string;
  tmpltExpln: string;
  tmpltClsfCd: string;
  tmpltClsfNm: string;
  ctgryNo: string;
  ctgryNm: string;
  upCtgryNo: string;
  instNo: string;
  instNm: string;
  path: string;
  pathNm: string;
  regDt: string;
  weight: number;
  inqCnt: number;
  atchFileId: string;
  strgFileNm: string;
  orgnlFileNm: string;
  atchFilePathNm: string;
  pdfId: string;
  atchFileList: AtchFileListType[];
};

export type AtchFileListType = {
  atchFileSeq: number;
  strgFileNm: string;
  orgnlFileNm: string;
  atchFilePathNm: string;
  pdfId: string;
};
