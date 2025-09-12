import type { Page } from '~/types/common';
import type {
  AddressQueryType,
  AddressType
} from '~/stores/common/address.types';
import { cloneDeep } from 'lodash-es';
import {
  DEFAULT_ADDRESS_QUERY,
  DEFAULT_ADDRESS_RESULTS
} from '~/stores/common/address.const';

export const useAddressPopup = defineStore('useAddressPopup', () => {
  const open = ref<boolean>(false);
  const addressQuery = ref<AddressQueryType>(cloneDeep(DEFAULT_ADDRESS_QUERY));
  const addresses = ref<Page<AddressType>>(cloneDeep(DEFAULT_ADDRESS_RESULTS));

  const searchAddresses = () => {
    return useAxios().get('/api/address', {
      params: addressQuery.value
    });
  };

  const openAddressPopup = () => {
    open.value = true;
  };

  const closeAddressPopup = () => {
    open.value = false;
  };

  return {
    open,
    addressQuery,
    addresses,
    searchAddresses,
    openAddressPopup,
    closeAddressPopup
  };
});
