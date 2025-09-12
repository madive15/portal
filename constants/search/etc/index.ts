import type { EtcListQueryType, EtcListType } from '~/types/search/etc';
import type { Page } from '~/types/common';

export const DEFAULT_ETC_LIST_QUERY: EtcListQueryType = {
  searchQuery: '',
  startDt: '',
  endDt: '',
  reSearchQuery: [],
  page: 1,
  size: 20,
  sort: 'A',
  defaultText: '20개씩 보기'
};

export const DEFAULT_ETC_LIST: Page<EtcListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};
