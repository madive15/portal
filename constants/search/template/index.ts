import type {
  TemplateListQueryType,
  TemplateListType
} from '~/types/search/template';
import type { Page } from '~/types/common';

// 서식
export const DEFAULT_TEMPLATE_LIST_QUERY: TemplateListQueryType = {
  searchQuery: '',
  instNo: '',
  tmpltClsfCd: '',
  reSearchQuery: [],
  page: 1,
  size: 9,
  sort: 'A',
  defaultText: '9개씩 보기'
};

export const DEFAULT_TEMPLATE_LIST: Page<TemplateListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};
