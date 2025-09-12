import type { AxiosResponse } from 'axios';
import type {
  ElrcptSlfDgnsCmmVO,
  IncdntDtlOutVO
} from '~/types/elrcpt/index.ts';
// import { customParamsSerializer } from '~/composables/paramsSerializer';

// 사건 정보 조회
export const selectIncdntInfo = (
  ctgryNo: string
): Promise<AxiosResponse<IncdntDtlOutVO[]>> => {
  return useAxios().get('/api/user/elrcpt/incdntInfo', { params: { ctgryNo } });
};

// 사건 신청정보 수정
export const updateIncdntAplyInfo = (
  payload
): Promise<AxiosResponse<IncdntDtlOutVO[]>> => {
  return useAxios().get('/api/user/elrcpt/aplyInfo', { params: payload });
};

/*
 * 자가진단접수 정보를 통하여 사건명, 구조대상자, 소득요건 정보 조회
 */
export const selectSlfDgnsCmmInfo = async (
  slfDgnsNo: string
): Promise<AxiosResponse<ElrcptSlfDgnsCmmVO>> => {
  return useAxios().get('/api/elrcpt/cmm/selectSlfDgnsCmmInfo', {
    params: { slfDgnsNo }
  });
};

/*
 * 로그인 정보 조회
 */
export const selectLoginInfo = async (): Promise<void> => {
  // console.log('API selectLoginInfo!!');
  return useAxios().get('/api/my/selectLoginInfo');
};
