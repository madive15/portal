import type { CaseListType, CaseListQueryType } from '~/types/search/case';
import type { Page } from '~/types/common';

// 사례
export const DEFAULT_CASE_LIST_QUERY: CaseListQueryType = {
  searchQuery: '',
  instNo: '',
  caseClsfCd: '',
  reSearchQuery: [],
  page: 1,
  size: 20,
  sort: 'A',
  defaultText: '20개씩 보기'
};

export const DEFAULT_CASE_LIST: Page<CaseListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};
