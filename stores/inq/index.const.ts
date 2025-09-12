import type { InqRequestType } from '~/stores/inq/index.types';

export const DEFAULT_INQ_REQUEST: InqRequestType = {
  // 1. COM_USERTYPE
  userIdntfNo: '',
  // 2. COM_MBR
  mbrTypeCd: '',
  mbrNm: '',
  mbrIdntfId: '',
  mbrEmlAddr: '',
  dmnEmlAddrCd: '',
  dmnEmlAddr: '',
  mbrGndrCd: '',
  mbrBrdt: '',
  mbrTelno: '',
  mbrMblTelno: '',
  trmsAgreYn: false,
  prvcClctAgreYn: false, // 개인정보수집동의여부
  uiiPvsnAgreYn: false, // 개인식별정보동의여부
  emlRcptnAgreYn: false,
  smsRcptnAgreYn: false,
  mbrNtn: 'KOR',
  zip: '',
  mbrAddr: '',
  mbrDaddr: '',
  pno: '',
  ntnTelno: '',
  certTypeCd: '001', // certClsfCd
  ntnMblTelno: '',

  // 3. COM_USER
  userId: '',
  userPswd: '',

  // 4. COM_MBRSTTYAGT
  comMbrsttyagt: {
    sttyAgtNm: '',
    prvcClctAgreYn: false,
    prvcPvsnAgreYn: false,
    sttyAgtAgreYn: false,
    sttyAgtBrdt: '',
    sttyAgtGndrCd: '',
    sttyAgtMblTelno: ''
  },

  // 기타
  instNo: '',
  captchaNumber: ''
};
