import { cloneDeep } from 'lodash-es';
import { DEFAULT_SEARCH_PASSWORD_QUERY } from '~/stores/login/pw.const';
import type { SearchPasswordType } from '~/stores/login/pw.types';

export const useSearchPasswordStore = defineStore(
  'useSearchPasswordStore',
  () => {
    const query = ref<SearchPasswordType>(
      cloneDeep(DEFAULT_SEARCH_PASSWORD_QUERY)
    );

    const resetQuery = () => {
      query.value = cloneDeep(DEFAULT_SEARCH_PASSWORD_QUERY);
    };

    const processSearchPasswordSendSms = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/sms/send', query);
    };

    const processSearchPasswordVerifySms = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/sms/verify', query);
    };

    const processChangeSearchPassword = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/sms', query);
    };

    const processSearchPasswordSendEmail = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/email/send', query);
    };

    const findSearchPasswordTokenStatus = (token: stringw) => {
      return useAxios().get('/api/login/password/email/status', {
        params: {
          token
        }
      });
    };

    const processSearchPasswordEmailToken = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/email/verify', query);
    };

    const findUserIdSearchPasswordEasyAuth = () => {
      return useAxios().get('/api/login/password/search/id');
    };

    const processSearchPasswordEasyAuth = (query: SearchPasswordType) => {
      return useAxios().post('/api/login/password/easy/auth', query);
    };

    return {
      query,
      resetQuery,
      processSearchPasswordSendSms,
      processSearchPasswordVerifySms,
      processChangeSearchPassword,
      processSearchPasswordSendEmail,
      findSearchPasswordTokenStatus,
      processSearchPasswordEmailToken,
      findUserIdSearchPasswordEasyAuth,
      processSearchPasswordEasyAuth
    };
  }
);
