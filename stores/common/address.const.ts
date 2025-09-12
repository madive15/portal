import type { Page } from '~/types/common';
import type {
  AddressQueryType,
  AddressType
} from '~/stores/common/address.types';

export const DEFAULT_ADDRESS_QUERY: AddressQueryType = {
  keyword: '',
  page: 1,
  size: 5
};

export const DEFAULT_ADDRESS_RESULTS: Page<AddressType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};
