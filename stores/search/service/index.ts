import {ref} from "vue";
import type { Page } from "~/types/common";
import type {
  ServiceListType,
  ServiceListQueryType
} from "~/types/search/service";
import { cloneDeep } from "lodash-es";
import {
  DEFAULT_SERVICE_LIST,
  DEFAULT_SERVICE_LIST_QUERY
} from "~/constants/search/service";
import type {SearchGroupListType} from "~/types/search";
import {DEFAULT_GROUP_LIST} from "~/constants/search";

export const useServiceStore = defineStore('service', () => {

  // 서비스
  const searchServiceList = async () => {
    // resetServiceList();

    const { data } = await useAxios({ useLoading: true }).post('/api/search/service', serviceListQuery.value);
    serviceList.value = data.pageList;
    serviceTotalList.value = data.pageList;
    serviceGroupList.value = data.groupList;
  };

  const reSearchServiceList = async () => {
    // resetServiceList();

    const { data } = await useAxios({ useLoading: true }).post('/api/search/service', serviceListQuery.value);
    serviceList.value = data.pageList;
  };

  const resetServiceList = () => {
    serviceList.value = cloneDeep(DEFAULT_SERVICE_LIST);
  };

  const resetServiceTotalList = () => {
    serviceTotalList.value = cloneDeep(DEFAULT_SERVICE_LIST);
  };

  const serviceListQuery = ref<ServiceListQueryType>(
      cloneDeep(DEFAULT_SERVICE_LIST_QUERY)
  );

  const resetServiceListQuery = () => {
    serviceListQuery.value = cloneDeep(DEFAULT_SERVICE_LIST_QUERY);
  };

  const serviceList = ref<Page<ServiceListType>>(
      cloneDeep(DEFAULT_SERVICE_LIST)
  );

  const serviceTotalList = ref<Page<ServiceListType>>(
      cloneDeep(DEFAULT_SERVICE_LIST)
  );

  const serviceGroupList = ref<SearchGroupListType>(
      cloneDeep(DEFAULT_GROUP_LIST)
  );

  return {
    serviceListQuery,
    serviceList,
    serviceTotalList,
    serviceGroupList,
    searchServiceList,
    resetServiceListQuery,
    reSearchServiceList,
    resetServiceList,
    resetServiceTotalList
  };
});
