/**
 * 대한변협법률구조재단(성폭력피해자) 전자접수 신청<br/>
 * ELR_INCDNTAPLYCN
 */
export type ElrIncdntAplyCn = {
  incdntNm: string /* 사건명 */;
  incdntKndCd: string /* 사건종류코드 */;
  ctIncdntNo: string /* 법원사건번호 */;
  incdntOtln: string /* 사건개요 */;
  evdncCn: string /* 증빙내용 */;
  aplcntMicmAmt: string /* 신청자월수입금액 */;
  aplcntMicmDsctn: string /* 신청자거주지종류코드 */;
  aplcntRsdcKndCd: string /* 신청자거주지종류기타사항 */;
  aplcntRsdcKndEtcMttr: string /* 소유구분코드 */;
  psnSeCd: string /* 부동산소유자명 */;
  restOwnrNm: string /* 임대보증금액 */;
  rentGrnteAmt: string /* 월세금액 */;
  mrntAmt: string /* 소유관계기타사항 */;
  psnPelEtcMttr: string /* 부동산재산내역 */;
  svgPrptDsctn: string /* 예금재산내역 */;
  vhclPrptDsctn: string /* 차량재산내역 */;
  pnPrptDsctn: string /* 연금재산내역 */;
  etcPrptDsctn: string /* 기타재산내역 */;
  vstPathCd: string /* 방문경로코드 */;
  roblYn: string /* 기초생활수급자여부 */;
};

/**
 * 대한변협법률구조재단(성폭력피해자) 전자접수 신청<br/>
 * ELR_INCDNTSTKGDATE
 */
export type ElrIncdntStkgDate = {
  incdntAplyNo: string /* 사건신청번호 */;
  incdntNm: string /* 사건명 */;
  incdntKndCd: string /* 사건종류코드 */;
  incdntOtln: string /* 사건개요 */;
  evdncCn: string /* 증빙내용 */;
  prvcPrcsAgreYn: string /* 개인정보처리동의여부 */;
  prvcPrvsnAgreYn: string /* 방문경로코드 */;
  incdntNo: string /* 사건번호 */;
  rqsrNm: string /* 의뢰인명 */;
  aplcntNm: string /* 신청자명 */;
};

/**
 * 대한변협법률구조재단(성폭력피해자) 전자접수 신청<br/>
 * ELR_INCDNTSXVL
 */
export type ElrIncdntSxvl = {
  incdntAplyNo: string /* 사건신청번호 */;
  aplyNo: string /* 신청번호 */;
  picNm: string /* 담당자명 */;
  sxvlIncdntKndCd: string /* 성폭력사건종류코드 */;
  sxvlIncdntKndEtcMttr: string /* 성폭력사건종류기타사항 */;
  incdntOtln: string /* 사건개요 */;
  vctmLastAcbgCd: string /* 피해자최종학력코드 */;
  vctmCrCd: string /* 피해자직업코드 */;
  vctmMrgSeCd: string /* 피해자결혼구분코드 */;
  mrgEtcRsn: string /* 결혼기타사유 */;
  vctmChldYn: string /* 피해자자녀여부 */;
  hsPsnYn: string /* 주택소유여부 */;
  ecnmEtcYn: string /* 경제기타여부 */;
  vctmMmEarnAmt: string /* 피해자월소득금액 */;
  vctmSptFamYn: string /* 피해자부양가족여부 */;
  excptnMttr: string /* 특이사항 */;
  bfrLwaYn: string /* 이전법률구조여부 */;
  lwaNeedExpln: string /* 법률구조필요설명 */;
  tkcgLwyrNm: string /* 담당변호사명 */;
  lwyrOfcTelno: string /* 변호사사무실전화번호 */;
  lwyrOfcFxno: string /* 변호사사무실팩스번호 */;
  aplcntNm: string /* 신청자명 */;
  vctmMmEarnCd: string /* 피해자월소득코드 */;
  lwyrMbrTelno: string /* 변호사휴대전화번호 */;
  lwyrEmlAddr: string /* 변호사이메일주소 */;
  ecnmEtcCn: string /* 경제기타내용 */;
  mmEarnEtcCn: string /* 월소득기타내용 */;
  job: string;
};

/**
 * 대한변협법률구조재단(성폭력피해자) 전자접수 신청<br/>
 * 입증자료제출
 */
export type EvdncData = {};

/**
 *
 */
export type IncdntAplyRlpr = {
  incdntAplyNo: string /* 사건신청번호 */;
  rlprSeCd: string /* 관계자구분코드 */;
  rlprSeq: string /* 관계자순서 */;
  trprSeCd: string /* 대상자구분코드 */;
  rlprNm: string /* 관계자명 */;
  rlprBrdt: string /* 관계자생년월일 */;
  rlprRrno: string /* 관계자주민등록번호 */;
  gndrCd: string /* 성별코드 */;
  rlprMblTelno: string /* 관계자휴대전화번호 */;
  rlprTelno: string /* 관계자전화번호 */;
  fxno: string /* 팩스번호 */;
  rlprZip: string /* 관계자우편번호 */;
  rlprAddr: string /* 관계자주소 */;
  rlprDaddr: string /* 관계자상세주소 */;
  emlAddr: string /* 이메일주소 */;
  rprsvYn: string /* 대표자여부 */;
  brno: string /* 사업자등록번호 */;
  crno: string /* 법인등록번호 */;
  tpbizNm: string /* 업종명 */;
  rprsvNm: string /* 대표자명 */;
  homeWrcSeCd: string /* 자택직장구분코드 */;
};
