import {ref} from "vue";
import type { Page } from "~/types/common";
import type {
  TemplateListType,
  TemplateListQueryType
} from "~/types/search/template";
import { cloneDeep } from "lodash-es";
import {
  DEFAULT_TEMPLATE_LIST,
  DEFAULT_TEMPLATE_LIST_QUERY
} from "~/constants/search/template";
import type {SearchGroupListType} from "~/types/search";
import {DEFAULT_GROUP_LIST} from "~/constants/search";

export const useTemplateStore = defineStore('template', () => {

  // 서식
  const searchTemplateList = async () => {
    // resetTemplateList();
    templateListQuery.value.size = 10;
    const { data } = await useAxios({ useLoading: true }).post('/api/ai/template', templateListQuery.value);

    templateList.value = data.pageList;
    templateTotalList.value = data.pageList;
    templateGroupList.value = data.groupList;
  };

  const reSearchTemplateList = async () => {
    // resetTemplateList();

    const { data } = await useAxios({ useLoading: true }).post('/api/ai/template', templateListQuery.value);
    templateList.value = data.pageList;
  };

  const resetTemplateList = () => {
    templateList.value = cloneDeep(DEFAULT_TEMPLATE_LIST);
  };

  const resetTemplateTotalList = () => {
    templateTotalList.value = cloneDeep(DEFAULT_TEMPLATE_LIST);
  };

  const templateListQuery = ref<TemplateListQueryType>(
      cloneDeep(DEFAULT_TEMPLATE_LIST_QUERY)
  );

  const resetTemplateListQuery = () => {
    templateListQuery.value = cloneDeep(DEFAULT_TEMPLATE_LIST_QUERY);
  };

  const templateList = ref<Page<TemplateListType>>(
      cloneDeep(DEFAULT_TEMPLATE_LIST)
  );

  const templateTotalList = ref<Page<TemplateListType>>(
      cloneDeep(DEFAULT_TEMPLATE_LIST)
  );

  const templateGroupList = ref<SearchGroupListType>(
      cloneDeep(DEFAULT_GROUP_LIST)
  );

  return {
    templateListQuery,
    templateList,
    templateTotalList,
    templateGroupList,
    searchTemplateList,
    resetTemplateListQuery,
    reSearchTemplateList,
    resetTemplateList,
    resetTemplateTotalList
  };
});
