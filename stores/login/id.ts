import { cloneDeep } from 'lodash-es';
import type { SearchIdQueryType } from '~/stores/login/id.types';
import { DEFAULT_SEARCH_ID_QUERY } from '~/stores/login/id.const';

export const useSearchIdStore = defineStore('useSearchIdStore', () => {
  const query = ref(cloneDeep(DEFAULT_SEARCH_ID_QUERY));

  const resetQuery = () => {
    query.value = cloneDeep(DEFAULT_SEARCH_ID_QUERY);
  };

  /**
   * 인증번호 발송
   * @param query
   */
  const processSearchIdSendSms = (query: SearchIdQueryType) => {
    return useAxios().post('/api/login/id/sms/send', query);
  };

  const processSearchIdVerifySms = (query: SearchIdQueryType) => {
    return useAxios().post('/api/login/id/sms/result', query);
  };

  const processSearchIdEasyAuth = () => {
    return useAxios().get('/api/login/id/easy/auth');
  };

  const processSearchIdSendEmail = (query: SearchIdQueryType) => {
    return useAxios().post('/api/login/id/email/send', query);
  };

  return {
    query,
    resetQuery,
    processSearchIdSendSms,
    processSearchIdVerifySms,
    processSearchIdEasyAuth,
    processSearchIdSendEmail
  };
});
