import {ref} from "vue";
import type { Page } from "~/types/common";
import type {
    InstitutionListType,
    InstitutionListQueryType
} from "~/types/search/institution";
import { cloneDeep } from "lodash-es";
import {
    DEFAULT_INSTITUTION_LIST,
    DEFAULT_INSTITUTION_LIST_QUERY
} from "~/constants/search/institution";
import type {SearchGroupListType} from "~/types/search";
import {DEFAULT_GROUP_LIST} from "~/constants/search";

export const useInstitutionStore = defineStore('institution', () => {

    const searchInstitutionList = async () => {
        // resetInstitutionList();

        const { data } = await useAxios({ useLoading: true }).post('/api/search/institution', institutionListQuery.value);
        institutionList.value = data.pageList;
        institutionTotalList.value = data.pageList;
        institutionGroupList.value = data.groupList;
    };

    const reSearchInstitutionList = async () => {
        // resetInstitutionList();

        const { data } = await useAxios({ useLoading: true }).post('/api/search/institution', institutionListQuery.value);
        institutionList.value = data.pageList;
    };

    const resetInstitutionList = () => {
        institutionList.value = cloneDeep(DEFAULT_INSTITUTION_LIST);
    };

    const resetInstitutionTotalList = () => {
        institutionTotalList.value = cloneDeep(DEFAULT_INSTITUTION_LIST);
    };

    const institutionListQuery = ref<InstitutionListQueryType>(
        cloneDeep(DEFAULT_INSTITUTION_LIST_QUERY)
    );

    const resetInstitutionListQuery = () => {
        institutionListQuery.value = cloneDeep(DEFAULT_INSTITUTION_LIST_QUERY);
    };

    const institutionList = ref<Page<InstitutionListType>>(
        cloneDeep(DEFAULT_INSTITUTION_LIST)
    );

    const institutionTotalList = ref<Page<InstitutionListType>>(
        cloneDeep(DEFAULT_INSTITUTION_LIST)
    );

    const institutionGroupList = ref<SearchGroupListType>(
        cloneDeep(DEFAULT_GROUP_LIST)
    );

    return {
        institutionListQuery,
        institutionList,
        institutionTotalList,
        institutionGroupList,
        searchInstitutionList,
        resetInstitutionListQuery,
        reSearchInstitutionList,
        resetInstitutionList,
        resetInstitutionTotalList
    };
});