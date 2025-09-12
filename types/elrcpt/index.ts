export type userElrcptOutVO = {
  instNm: string;
  trprNm: string;
  aplyPrgrsSttsCd: string;
  frstRegDt: string;
  comCdNm: string;
  incdntId: string;
  incdntNm: string;

  no: number;
};
export type userElrcptInVO = {
  ctgr: string;
  mbrNo: string;
};

/**
 * name :OpenAtrprTypeInqPopupVO
 * desc : 부모화면, 구조대상자 유형 찾기 팝업 간의 파라미터 객체
 */
export type OpenAtrprTypeInqPopupVO = {
  instNo: string;
};

/**
 * name : AtrprTypeListVO
 * desc : 구조대상자 유형 리스트
 */
export type AtrprTypeListVO = {
  atrprNo: string;
  ctgryNo: string;
  trprNm: string;
  trprExpln: string;
  aplyPsbltyIncdntNm: string;
  lwsCstNm: string /* 소송비용명 */;
  lwyrPayNm: string /* 변호사보수명 */;
  famFreeSeNm: string /* 가족무료구분명 */;
  sbmsnDoc: string[];
  issuInstNm: string[];
  itntIssuNm: string[];
};

/**
 * name : ElrcptAplyInVO
 * desc : 전자접수신청 카테고리 조회 파라미터 객체
 */
export type ElrcptAplyInVO = {
  ctgryNo: string;
  incdntId: string;
  instNo: string;
  mngInstNo: string;
  mdicmNo: string;
  mbrNo: string;
  atrprNo: string;
};

export type userElrcptAtrprInVO = {
  searchNm: string;
  searchCtgr: string;
  instNo: string;

  size: number;
  page: number;
  limitSize?: number;
};
export type userElrcptAtrprOutVO = {
  atrprNo: string;
  ctgryNo: string;
  trprNm: string;
  trprExpln: string;
  aplyPsbltyIncdntNm: string;
  lwsCstNm: string /* 소송비용명 */;
  lwyrPayNm: string /* 변호사보수명 */;
  famFreeSeNm: string /* 가족무료구분명 */;
  sbmsnDoc: string[];
  issuInstNm: string[];
  itntIssuNm: string[];
  total: number;
};

export type userElrcptAtrprCtgr = {
  ctgryNo: string;
  lwaCtgryNm: string;
};

export interface IncdntDtlOutVO {
  incdntVO: IncdntVO; // 사건
  instincdntListVO: InstincdntVO[]; // 기관사건 List
  incdntevdncdocListVO?: IncdntevdncdocVO[]; // 사건증빙문서 List
}

export interface IncdntVO {
  incdntId: string; // 사건아이디
  incdntNm: string; // 사건명
  incdntExpln: string; // 사건설명
  aplyMthdCd: string; // 신청방법코드
  aplyMthdNm: string; // 신청방법명
}

export interface InstincdntVO {
  incdntId: string; // 사건아이디
  mngInstNo: string; // 관리기관번호
  mngInstNm: string; // 관리기관명
  elrcptMthdSeCd: string; // 전자접수방법구분코드
  urlNo: string; // URL번호
  urlAddr: string; // URL주소
  docId: string; // 문서아이디
  instIndt: string; // 기관소개
  instLgoFileId: string; // 기관로고파일아이디
  instLgoFileSeq: number; // 기관로고파일순서
}

export interface IncdntevdncdocVO {
  incdntId: string; // 사건아이디
  docId: string; // 문서아이디
  docNm: string; // 문서명
  esntlYn: string; // 필수여부
}

export interface IncdntAplyInVO {
  earnCrtrRlvtYn: string; // 소득기준해당여부(Y = 중위소득 정보 필요)
  mdicmVO?: ElrMdicm; // 중위소득
  mdicmdtlListVO?: ElrMdicmdtl[]; // 중위소득상세 List
  slfdgnsVO: ElrSlfdgns; // 자가진단
  incdntaplyVOincdntaplyVO: ElrIncdntaply; // 사건신청
}

export interface ElrMdicm {
  mdicmNo?: string; // 중위소득번호
  icrtSeCd: string; // 소득율구분코드
  hhmCnt: number; // 가구원수
  mmEarnSumAmt: number; // 월소득합계금액
  atrprYn: boolean; // 구조대상자여부
  useYn: boolean; // 사용여부
  frstRgtrId?: string;
  frstRegDt?: string;
  lastMdfrId?: string;
  lastMdfcnDt?: string;
}

export interface ElrMdicmdtl {
  mdicmNo?: string; // 중위소득번호
  insrncSbsrSeCd: string; // 보험가입자구분코드
  rtpyrSeq?: number; // 납부자순서
  sbsrFlnm: string; // 가입자성명
  hlthIspm: number; // 건강보험료
  earnScr: number; // 소득점수
  anlEarnAmt: number; // 연간소득금액
  mmEarnAmt: number; // 월소득금액
  frstRgtrId?: string;
  frstRegDt?: string;
  lastMdfrId?: string;
  lastMdfcnDt?: string;
}

export interface ElrSlfdgns {
  slfDgnsNo?: string; // 자가진단번호
  mbrNo?: string; // 회원번호
  incdntId: string; // 사건아이디
  instNo: string; // 기관번호
  mdicmNo?: string; // 중위소득번호
  atrprNo?: string; // 구조대상자번호
  slfDgnsNm?: string; // 자가진단명
  useYn: boolean; // 사용여부
  frstRgtrId?: string;
  frstRegDt?: string;
  lastMdfrId?: string;
  lastMdfcnDt?: string;
}

export interface ElrIncdntaply {
  incdntAplyNo?: string; // 사건신청번호
  instNo: string; // 기관번호
  aplyDt?: string; // 신청일자
  aplyPrgrsSttsCd: string; // 신청진행상태코드
  slfDgnsNo?: string; // 자가진단번호
  prvcClctUtztnPrpsAgreYn?: boolean; // 개인정보수집이용목적동의여부
  tdptyPvsnAgreYn?: boolean; // 제3자제공동의여부
  casePvsnAgreYn?: boolean; // 사례제공동의여부
  rghtUdsdAgreYn?: boolean; // 권리이해동의여부
  bfrIncdntAplyNo?: string; // 이전사건신청번호
  smsRcptnAgreYn?: boolean; // SMS수신동의여부
  emlRcptnAgreYn?: boolean; // 이메일수신동의여부
  faceDscsnAgreYn?: boolean; // 대면상담동의여부
  prvcPrcsAgreYn?: boolean; // 개인정보처리동의여부
  indvPvsnAgreYn?: boolean; // 개인제공동의여부
  frstRgtrId?: string;
  frstRegDt?: string;
  lastMdfrId?: string;
  lastMdfcnDt?: string;
}

export interface ElrcptSlfDgnsCmmVO {
  incdntNm?: string; // 사건
  instMngTrprNm?: string; // 대상자
  icrtSeNm?: string; // 소득요건
}
