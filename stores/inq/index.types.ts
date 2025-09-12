export type InqRequestType = {
  pno: string;
  mbrTypeCd: MbrTypeCd;
  mbrIdntfId: string;
  trmsAgreYn: boolean;
  prvcClctAgreYn: boolean;
  uiiPvsnAgreYn: boolean;
  userIdntfNo: string;
  mbrNm: string;
  instNo: string;
  userId: string;
  userPswd: string;
  mbrMblTelno: string;
  mbrTelno: string;
  mbrEmlAddr: string;
  dmnEmlAddr: string;
  dmnEmlAddrCd: string;
  mbrNtn: string;
  mbrBrdt: string;
  mbrGndrCd: string;
  captchaNumber: string;
  certTypeCd: CertTypeCd;
  zip: string;
  mbrAddr: string;
  mbrDaddr: string;
  emlRcptnAgreYn: boolean;
  smsRcptnAgreYn: boolean;
  ntnMblTelno: string;
  whdwlRsnCd: string;
  whdwlRsn: string;
  ntnTelno: string;
  comMbrsttyagt: ComMbrsttyagt;
  ntnPhone1?: string;
  firstTelNo?: string;
  secondTelNo?: string;
  thirdTelNo?: string;
};

export type ComMbrsttyagt = {
  sttyAgtNm: string;
  sttyAgtMblTelno: string; // 모바일 연락처
  sttyAgtGndrCd: string; // 성별
  sttyAgtBrdt: string; // 법정대리인 생년월일
  prvcClctAgreYn: boolean; // 개인정보 수집여부
  prvcPvsnAgreYn: boolean; // 개인정보 제공여부
  sttyAgtAgreYn: boolean; // 법정대리인 동의여부
};

/**
 * 001: 모바일
 * 002: 아이핀
 * 003: 실명인증
 * 004: 여권정보
 * */
export type CertTypeCd = '001' | '002' | '003' | '004';
/**
 * U01: 일반, 14세 미만
 * U02: 일반, 14세 이상
 * O01: 재외국민
 * F01: 외국인
 *
 * */
export type MbrTypeCd = '' | 'U02' | 'U01' | 'O01' | 'F01' | 'P01';
