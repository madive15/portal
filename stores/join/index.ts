import type { JoinRequestType } from '~/stores/join/index.types';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_JOIN_REQUEST } from '~/stores/join/index.const';
import { defineStore } from 'pinia';

export const useJoinStore = defineStore(
  'useJoinStore',
  () => {
    const joinRequest = ref<JoinRequestType>(cloneDeep(DEFAULT_JOIN_REQUEST));

    const resetJoinRequest = () => {
      joinRequest.value = cloneDeep(DEFAULT_JOIN_REQUEST);
    };

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

    return {
      joinRequest,
      resetJoinRequest,
      searchAuthResult,
      existsUserId,
      createUser,
      updateJoinRequest
    };
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
);
