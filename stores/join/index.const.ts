import type { JoinRequestType } from '~/stores/join/index.types';

export const DEFAULT_JOIN_REQUEST: JoinRequestType = {
  certTypeCd: '001',
  pno: '',
  mbrTypeCd: '',
  uiiPvsnAgreYn: false, // 개인식별정보동의여부
  prvcClctAgreYn: false, // 개인정보수집동의여부
  trmsAgreYn: false,
  dmnEmlAddr: '',
  dmnEmlAddrCd: '',
  instNo: '',
  mbrEmlAddr: '',
  mbrMblTelno: '',
  mbrNm: '',
  mbrTelno: '',
  userId: '',
  userIdntfNo: '',
  userPswd: '',
  mbrNtn: 'KOR',
  mbrBrdt: '',
  mbrGndrCd: '',
  captchaNumber: '',
  mbrIdntfId: '',
  zip: '',
  mbrAddr: '',
  mbrDaddr: '',
  emlRcptnAgreYn: true,
  smsRcptnAgreYn: true,
  ntnMblTelno: '',
  ntnTelno: '',
  comMbrsttyagt: {
    sttyAgtNm: '',
    prvcClctAgreYn: false,
    prvcPvsnAgreYn: false,
    sttyAgtAgreYn: false,
    sttyAgtBrdt: '',
    sttyAgtGndrCd: '',
    sttyAgtMblTelno: ''
  }
};
