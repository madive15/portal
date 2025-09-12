import type {
  InstitutionListQueryType,
  InstitutionListType
} from '~/types/search/institution';
import type { Page } from '~/types/common';

export const DEFAULT_INSTITUTION_LIST_QUERY: InstitutionListQueryType = {
  searchQuery: '',
  instClsfCd: '',
  reSearchQuery: [],
  page: 1,
  size: 12,
  sort: 'A',
  defaultText: '12개씩 보기'
};

export const DEFAULT_INSTITUTION_LIST: Page<InstitutionListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};
