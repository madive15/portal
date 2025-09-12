export type SearchPasswordType = {
  userId: string;
  mbrNm: string;
  captchaNum: string;
  mbrMblTelno: string;
  certNum: string;
  mbrEmlAddr: string;
  dmnEmlAddrCd: string;
  dmnEmlAddr: string;
  userPswd: string;
  userIdntfNo: string;
};

export type ChangePasswordQuery = {
  userPswd: string;
  confirmPswd: string;
};
