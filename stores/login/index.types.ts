export type LoginType = {
  memberId: string;
  password: string;
  remember: boolean;
};

export type AuthType = {
  memberId: string;
  memberName: string;
  lastLoginDate: string;
  authenticated: boolean;
  lgnDt: string;
  status?: AuthStatusType;
  mbrTypeCd: string;
};

export type AuthStatusType = 'SUCCESS' | 'CHANGE_PASSWORD' | 'LONG_TERM_LOGIN';
