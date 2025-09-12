import type { LoginType, AuthType } from '~/stores/login/index.types';

export const DEFAULT_LOGIN_VALUE: LoginType = {
  memberId: '',
  password: '',
  remember: false
};

export const DEFAULT_AUTH_VALUE: AuthType = {
  authenticated: false,
  lastLoginDate: '',
  memberId: '',
  memberName: '',
  lgnDt: '',
  mbrTypeCd: ''
};
