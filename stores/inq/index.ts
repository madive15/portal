import type { InqRequestType } from '~/stores/inq/index.types';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_INQ_REQUEST } from '~/stores/inq/index.const';
import { defineStore } from 'pinia';

export const useInqStore = defineStore('useInqStore', () => {
  const inqRequest = ref<InqRequestType>(cloneDeep(DEFAULT_INQ_REQUEST));

  const resetJoinRequest = () => {
    inqRequest.value = cloneDeep(DEFAULT_INQ_REQUEST);
  };
  /*

  const searchAuthResult = async () => {
    const { data } = await useAxios().get('/api/auth/result');
    return data;
  };

  const existsUserId = (userId: string) => {
    return useAxios().get('/api/mbr/existsUserId', {
      params: {
        userId
      }
    });
  };

  const createUser = () => {
    return useAxios().post('/api/join', joinRequest.value);
  };

  const updateJoinRequest = () => {
    return useAxios().post('/api/auth/passport/request', joinRequest.value);
  };
*/

  return {
    inqRequest,
    resetJoinRequest
  };
});
