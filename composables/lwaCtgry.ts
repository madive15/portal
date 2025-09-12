import type { AxiosResponse } from 'axios';
import type { CtgryListOutVO } from '~/types/lwaCtgry/';
import { useAxios } from '~/composables/useAxios';

// 범주 목록 조회
export const selectLwaCtgryList = (
  ctgrySeCd: String
): Promise<AxiosResponse<CtgryListOutVO[], any>> => {
  return useAxios().get('/api/lwaCtgry/ctgryList', {
    params: { ctgrySeCd }
  });
};
