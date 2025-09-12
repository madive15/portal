import { useAxios } from '~/composables/useAxios';
import type { CommonCode } from '~/types';

// 공통코드 목록 조회
export const selectComCdList = async (
  codeGroupId: string
): Promise<CommonCode[]> => {
  const { data } = await useAxios().get('/api/code/codeList', {
    params: { codeGroupId }
  });
  return data;
};
