export interface CybdsnDsctnVO {
  page: number;
  size: number;
  instNo?: string; // 기관번호
  dscsnSeCd?: string; // 상담구분코드
  selectKey?: string; // 검색조건 구분
  keyword?: string; // 검색어
  // 제목
  //제목+내용
  //공개여부
}

export interface CybdsnDsctnListVO {
  no?: number; // 번호
  dscsnAplyNo: string; // 상담신청번호
  dscsnSeCd: string; // 상담구분코드
  dscsnSeNm: string; //상담구분명
  instNo: string; // 기관번호
  instNm: string; // 기관명
  rsvtHr: string; // 예약시간
  brofNo: string; // 기관번호(지부)
  brofNm: string; // 기관명(지부)
  rcptYmd: string; // 접수일자
  // 확정여부
  prSttsCd?: string; // 진행상태코드 (상담상태)
  prSttsNm?: string; // 진행상태명
  // 상담결과
  rlsYn?: string; //공개여부
  dscsnTtl?: string; //제목
  //답변상태
}

export interface MyDscsnListInVO {
  page: number;
  size: number;
  instNo?: string; // 기관번호
  dscsnSeCd?: string; // 상담구분코드
  selectKey?: string; // 검색조건 구분
  keyword?: string; // 검색어
  // 제목
  //제목+내용
  //공개여부
}

export interface MyDscsnListOutVO {
  no?: number; // 번호
  dscsnAplyNo: string; // 상담신청번호
  dscsnSeCd: string; // 상담구분코드
  dscsnSeNm: string; //상담구분명
  instNo: string; // 기관번호
  instNm: string; // 기관명
  rsvtHr: string; // 예약시간
  brofNo: string; // 기관번호(지부)
  brofNm: string; // 기관명(지부)
  rcptYmd: string; // 접수일자
  // 확정여부
  prSttsCd?: string; // 진행상태코드 (상담상태)
  prSttsNm?: string; // 진행상태명
  // 상담결과
  rlsYn?: string; //공개여부
  dscsnTtl?: string; //제목
  //답변상태
}

export interface CheckMyRsvtInVO {
  mbrNo?: string; // 회원번호
  instNo: string; // 기관번호
  dscsnSeCd: string; // 상담구분코드
}

export interface CheckMyRsvtOutVO {
  sameInstType: number; // 동일기관,동일유형 중복
  sameInst: number; // 동일기관 중복
  sameType: number; // 동일유형 중복
}

export interface IntvDscsnRsvtInVO {
  lwClsfCd: string; // 법률구분코드
  rgnCd: string; // 지역코드
  rgnNm: string; // 지역명
}

export interface RgnCdListOutVO {
  rgnCd: string; // 지역코드
  rgnNm: string; // 지역명
  lat: number; // 지역 - 위도
  lng: number; // 지역 - 경도
  stdgCd: string; // 시도지역코드?
  compVal: string;
}

export interface InstNoListByLwClsfOutVO {
  lwClsfCd: string; // 법률구분코드
  instNo: string; // 기관번호
}

export interface SggListByCtpvInstInVO {
  instNoList: string[]; // 기관번호 List
  lat: string; // 사용자 위도
  lng: string; // 사용자 경도
}
export interface SggListByCtpvInstListOutVO {
  stdgCd: string; // 시도코드
  ctpvNm: string; // 시도명
  sggNm: string; // 시군구명
  compVal: string;
  isActive: boolean;
}

export interface SggListByCtpvInstOutVO {
  ctpvNm: string; // 시도명
  list: SggListByCtpvInstListOutVO[];
}

export interface InstPlanListOutVO {
  key: string;
  instNo: string;
  instNm: string;
  brofNo?: string;
  brofNm?: string;
  trgtYmd: string;
  trgtHm: string;
}

export interface AvailRsvtPlanTimeList {
  instNo: string;
  instNm: string;
  planes: AvailRsvtPlanListByInst[];
}

export interface AvailRsvtPlanListByInst {
  key: string;
  brofNo?: string;
  brofNm?: string;
  trgtYmd: string;
  expsrTrgtYmd: string;
  trgHmList: AvailRsvtTimeListByPlan[];
}

export interface AvailRsvtTimeListByPlan {
  timeKey: string;
  time: string;
  expsrTime: string;
  isActive: boolean;
}
export interface SelectedPlaneTime {
  instNo: string;
  instNm: string;
  brofNo: string;
  brofNm: string;
  trgtYmd: string;
  expsrTrgtYmd: string;
  trgtHm: string;
  expsrTrgtHm: string;
}

export interface DscsnRsvtDtInVO {
  rsvtNo: string;
  dscsnAplyNo: string;
}

export interface DscsnRsvtDtOutVO {
  rsvtNo: string; // 예약번호
  instNo: string; // 상담예약기관번호
  instNm: string; // 상담예약기관명
  instTelno: string; // 기관전화번호
  rsvtYmd: string; // 예약일자
  rsvtHr: string; // 예약시간
  brofNo: string; // 기관번호(지부)
  brofNm: string; // 기관명(지부)
  rcptDt: string; //접수일자
  dscsnTtl: string; //상담내용
  dscsnCn: string; //상담내용
  brofAddr: string; //기관주소
  brofDaddr: string; //기관상세주소
  brofRprsTelno: string; //지사전화번호
  atchFileId: string; //파일아이디
  atchFileSeq: string; // 파일순번
}

/**
 * 가능기관/시간목록 조회 paramVO (상담소, 상담원)
 */
export interface IFHrChcDescVO {
  dscsnSeCd: string; // 상담구분코드
  orgCd: string; // 기관코드
  resvFrDt: string; // 예약가능시작일자
  resvToDt: string; // 예약가능종료일자
}
/**
 * 가능기관/시간목록 조회 returnVO
 */
export interface IFHrChcFormVO {
  // 전체 공통
  orgCd: string; // 예약기관코드
  flag: string; // 예약가능여부

  // 상담소, 상담원
  dscsnSeCd: string; // 상담구분코드
  trgtYmd: string; // 대상일자
  dowCd: string; // 요일코드
  trgtHm: string; // 대상시분
  dscsnPvsnNocs: string; // 상담제공건수
  dscsnAltmntNocs: string; // 상담배정건수

  // 공단
  stdgCd: string; // 법정동코드
  zip: string; // 우편번호

  // 공단, 홈닥터
  orgNm: string; // 예약기관명칭
  reserveDe: string; // 예약일자
  reserveTime: string; // 예약시간
  totCnt: string; // 전체건수
  chkCnt: string; // 예약가능건수
  wdayCode: string; // 요일코드 (1:일 ~ 7:토)

  key: string;
  timeTxt: string;
  isActive: boolean;
}
