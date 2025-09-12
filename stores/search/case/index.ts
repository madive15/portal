import {ref} from "vue";
import type { Page } from "~/types/common";
import type {
  CaseListType,
  CaseListQueryType
} from "~/types/search/case";
import { cloneDeep } from "lodash-es";
import {
  DEFAULT_CASE_LIST,
  DEFAULT_CASE_LIST_QUERY
} from "~/constants/search/case";
import type {SearchGroupListType} from "~/types/search";
import {DEFAULT_GROUP_LIST} from "~/constants/search";

export const useCaseStore = defineStore('case', () => {

  // 사례
  const searchCaseList = async () => {
    // resetCaseList();

    const { data } = await useAxios({ useLoading: true }).post('/api/search/case', caseListQuery.value);
    caseList.value = data.pageList;
    caseTotalList.value = data.pageList;
    caseGroupList.value = data.groupList;
  };

  const reSearchCaseList = async () => {
    // resetCaseList();

    const { data } = await useAxios({ useLoading: true }).post('/api/search/case', caseListQuery.value);
    caseList.value = data.pageList;
  };

  const resetCaseList = () => {
    caseList.value = cloneDeep(DEFAULT_CASE_LIST);
  };

  const resetCaseTotalList = () => {
    caseTotalList.value = cloneDeep(DEFAULT_CASE_LIST);
  };

  const caseListQuery = ref<CaseListQueryType>(
    cloneDeep(DEFAULT_CASE_LIST_QUERY)
  );

  const resetCaseListQuery = () => {
    caseListQuery.value = cloneDeep(DEFAULT_CASE_LIST_QUERY);
  };

  const caseList = ref<Page<CaseListType>>(
    cloneDeep(DEFAULT_CASE_LIST)
  );

  const caseTotalList = ref<Page<CaseListType>>(
      cloneDeep(DEFAULT_CASE_LIST)
  );

  const caseGroupList = ref<SearchGroupListType>(
    cloneDeep(DEFAULT_GROUP_LIST)
  );


  return {
    caseListQuery,
    caseList,
    caseTotalList,
    caseGroupList,
    searchCaseList,
    resetCaseListQuery,
    reSearchCaseList,
    resetCaseList,
    resetCaseTotalList
  };
});
