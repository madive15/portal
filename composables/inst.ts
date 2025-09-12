import type { AxiosResponse } from 'axios';
import { customParamsSerializer } from '~/composables/paramsSerializer';
import type {
  InstInfoListInVO,
  InstInfoListOutVO,
  InstListInVO,
  InstListOutVO
} from '~/types/inst';
import { useAxios } from '~/composables/useAxios';

// 기관 목록 조회
export const selectInstList = (
  payload: InstListInVO
): Promise<AxiosResponse<InstListOutVO[], any>> => {
  return useAxios().get('/api/inst/list', { params: payload });
};

// 기관 정보 목록 조회
export const selecInstInfoList = (
  payload: InstInfoListInVO
): Promise<AxiosResponse<InstInfoListOutVO[], any>> => {
  return useAxios().get('/api/inst/infoList', {
    params: payload,
    paramsSerializer: customParamsSerializer
  });
};
