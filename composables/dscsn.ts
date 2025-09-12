import type { AxiosResponse } from 'axios';
import type {
  MyDscsnListInVO,
  MyDscsnListOutVO,
  CheckMyRsvtInVO,
  CheckMyRsvtOutVO,
  InstNoListByLwClsfOutVO,
  RgnCdListOutVO,
  SelectedPlaneTime,
  SggListByCtpvInstInVO,
  IntvDscsnRsvtInVO,
  SggListByCtpvInstOutVO,
  DscsnRsvtDtInVO,
  DscsnRsvtDtOutVO
} from '~/types/dscsn/rsvt';
import type { ListResponse } from '~/types';
import * as dscsnConst from '~/constants/dscsn';
import { customParamsSerializer } from '~/composables/paramsSerializer';
import { useAxios } from '~/composables/useAxios';

// 나의 상담 목록 조회
export const selectMyDscsnList = (
  payload: MyDscsnListInVO
): Promise<AxiosResponse<ListResponse<MyDscsnListOutVO>>> => {
  return useAxios().get('/api/user/dscsn/myDscsnList', { params: payload });
};

// 나의 상담예약 중복체크
export const checkMyRsvt = (
  payload: CheckMyRsvtInVO
): Promise<AxiosResponse<CheckMyRsvtOutVO>> => {
  return useAxios().get('/api/user/dscsn/checkMyRsvt', { params: payload });
};

// 지역코드 목록조회
export const selectRgnCdList = (): Promise<AxiosResponse<RgnCdListOutVO[]>> => {
  return useAxios().get('/api/user/dscsn/rgnCdList');
};

// 법률구분코드별 기관번호 목록 조회
export const selectInstByLwClsf = (
  payload: InstNoListByLwClsfOutVO
): Promise<AxiosResponse<InstNoListByLwClsfOutVO[]>> => {
  return useAxios().get('/api/user/dscsn/instByLwClsf', { params: payload });
};

// 지역별 기관 기초단체 목록 조회
export const selectSggList = async (
  payload: SggListByCtpvInstInVO
): Promise<AxiosResponse<SggListByCtpvInstOutVO>> => {
  const axios = useAxios();
  return await axios.get('/api/user/dscsn/sggList', {
    params: payload,
    paramsSerializer: customParamsSerializer
  });
};

// 상담예약정보 목록 조회
export const selectInstPlanList = async (payload: IntvDscsnRsvtInVO) => {
  console.log('API selectInstPlanList payload:', payload);
  if (payload.lwClsfCd == '01') {
    return [];
  } else if (payload.lwClsfCd == '02') {
    return dscsnConst.SAMPLE_RSVT_PLAN_1;
  } else if (payload.lwClsfCd == '03') {
    return dscsnConst.SAMPLE_RSVT_PLAN_2;
  } else if (payload.lwClsfCd == '04') {
    return dscsnConst.SAMPLE_RSVT_PLAN_3;
  }
};

/**
 * 상담예약시간 조회
 */
export const selectDscsnRsvtDt = async (
  payload: DscsnRsvtDtInVO
): Promise<AxiosResponse<DscsnRsvtDtOutVO>> => {
  // console.log('params', payload);
  return useAxios().get('/api/user/dscsn/dscsnRsvtDt', { params: payload });
};

/**
 * 상담신청정보 조회
 */
export const selectDscsnAplyInfo = async (
  payload: DscsnRsvtDtInVO
): Promise<AxiosResponse<DscsnRsvtDtOutVO>> => {
  return useAxios().get('/api/user/dscsn/selectCyberDscsnAplyInfo', {
    params: payload
  });
};

/**
 * 로그인 정보 조회
 */
export const selectLoginInfo = async (): Promise<void> => {
  // console.log('API selectLoginInfo!!');
  return useAxios().get('/api/my/selectLoginInfo');
};
