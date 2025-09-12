export default defineNuxtPlugin(() => {
  // 기관명 Text 바꾸는 필터링 플러그인 (템플릿에서만 사용)
  return {
    provide: {
      // FIXME: instInfoOverride 로 통합 해요..
      instNmOverride: (instNm: string, instNo?: string, srvcNo?: string) => {
        return instNm;
      },
      // FIXME: instInfoOverride 로 통합 해요..
      instAddrOverride: (
        instAddr: string,
        instNo?: string,
        srvcNo?: string
      ) => {
        return instAddr;
      },
      instInfoOverride: (info: any) => {
        // FIXME: 하위기관 / 지부 정리되면 해당기능과 서비스 매핑해서 사용 하도록 해야 함
        return info;
      },
      // FIXME: instInfoOverride 로 통합 해요..
      instTelOverride: (instTel: string, instNo?: string, srvcNo?: string) => {
        return instTel;
      }
    }
  };
});
