import type { AuthType, LoginType } from '~/stores/login/index.types';
import { cloneDeep } from 'lodash-es';
import {
  DEFAULT_AUTH_VALUE,
  DEFAULT_LOGIN_VALUE
} from '~/stores/login/index.const';
import type { ChangePasswordQuery } from '~/stores/login/pw.types';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const useLoginStore = defineStore('useLoginStore', () => {
  const auth = ref<AuthType>(cloneDeep(DEFAULT_AUTH_VALUE));
  const authentication = ref<AuthenticationType>(
    cloneDeep(DEFAULT_LOGIN_VALUE)
  );

  const userId = ref('');
  const sessionTimeout = ref<Dayjs>(dayjs().add(1800, 'second'));

  const resetTimeout = () => {
    sessionTimeout.value = dayjs().add(1800, 'second');
  };

  const loadAuthorized = async () => {
    const { data } = await useAxios().get('/api/login/status');
    auth.value = data;
  };

  const logout = async () => {
    auth.value = cloneDeep(DEFAULT_AUTH_VALUE);
    await useAxios().post(`/api/logout`);
  };

  const login = (member: LoginType) => {
    return useAxios().post('/api/login', member);
  };

  const authenticated = computed(() => {
    return auth.value.authenticated;
  });

  const updateUserPswd = (query: ChangePasswordQuery) => {
    return useAxios().post('/api/login/password', query);
  };

  return {
    authentication,
    authenticated,
    auth,
    userId,
    loadAuthorized,
    logout,
    login,
    sessionTimeout,
    resetTimeout,
    updateUserPswd
  };
});
