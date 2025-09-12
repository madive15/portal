export type InstListInVO = {
  elrcptTrgtYn?: string; // 전자접수대상여부
  dscsnTrgtYn?: string; // 상담대상여부
};

export type InstListOutVO = {
  instNo?: string; // 기관번호
  instNm: string; // 기관명
};

export type InstInfoListInVO = {
  instNoList: String[];
};

export type InstInfoListOutVO = {
  instNo: string; // 기관번호
  instNm: string; // 기관명
  instIndt: string; //기관소개
  instLgoFileId: string; // 기관로고파일아이디
  instLgoFileSeq: string; // 기관로고파일순서
};
