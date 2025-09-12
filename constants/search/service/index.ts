import type {
  ServiceListQueryType,
  ServiceListType
} from '~/types/search/service';
import type { Page } from '~/types/common';

// 서비스
export const DEFAULT_SERVICE_LIST_QUERY: ServiceListQueryType = {
  searchQuery: '',
  instNo: '',
  ctgryNo: '',
  trprNo: '',
  reSearchQuery: [],
  page: 1,
  size: 12,
  sort: 'A',
  defaultText: '12개씩 보기'
};

export const DEFAULT_SERVICE_LIST: Page<ServiceListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

export const DEFAULT_SERVICE: ServiceListType = {
  dqId: '',
  srvcNo: '',
  srvcTtl: '',
  srvcExpln: '',
  ctgryNo: '',
  ctgryNm: '',
  ctgryPathNm: '',
  trprNo: '',
  trprNm: '',
  trprPathNm: '',
  instNo: '',
  instNm: '',
  regDt: '',
  weight: 0,
  inqCnt: 0,
  svcCnt: 0,
  smryTtl1: '',
  smryTtl2: '',
  smryTtl3: '',
  smryTtl4: '',
  smryTtl5: '',
  smryTtl6: '',
  smryNm1: '',
  smryNm2: '',
  smryNm3: '',
  smryNm4: '',
  smryNm5: '',
  smryNm6: '',
  expanded: false
};
