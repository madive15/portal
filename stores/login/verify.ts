import { cloneDeep } from 'lodash-es';
import { DEFAULT_CERT_NUM_VERIFY } from '~/stores/login/verify.const';

export const useVerifyStore = defineStore('useVerifyStore', () => {
  const certNumVerify = ref(cloneDeep(DEFAULT_CERT_NUM_VERIFY));

  const resetCertNumVerify = () => {
    certNumVerify.value = cloneDeep(DEFAULT_CERT_NUM_VERIFY);
  };

  /**
   * 인증번호 확인
   * @param certNumVerify
   */

  const processCertVerifySms = (certNum: string) => {
    return useAxios().post('/api/login/cert/sms/verify', null, {
      params: {
        certNum: certNum
      }
    });
  };

  //
  return {
    certNumVerify,
    resetCertNumVerify,
    processCertVerifySms
  };
});
