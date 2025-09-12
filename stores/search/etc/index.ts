import {ref} from "vue";
import type { Page } from "~/types/common";
import type {
    EtcListType,
    EtcListQueryType
} from "~/types/search/etc";
import { cloneDeep } from "lodash-es";
import {
    DEFAULT_ETC_LIST,
    DEFAULT_ETC_LIST_QUERY
} from "~/constants/search/etc";

export const useEtcStore = defineStore('etc', () => {

    const searchEtcList = async () => {
        // resetEtcList();

        const { data } = await useAxios({ useLoading: true }).post('/api/search/etc', etcListQuery.value);
        etcList.value = data.pageList;
        etcTotalList.value = data.pageList;
    };

    const reSearchEtcList = async () => {
        // resetEtcList();

        const { data } = await useAxios({ useLoading: true }).post('/api/search/etc', etcListQuery.value);
        etcList.value = data.pageList;
    };

    const resetEtcList = () => {
        etcList.value = cloneDeep(DEFAULT_ETC_LIST);
    };

    const resetEtcTotalList = () => {
        etcTotalList.value = cloneDeep(DEFAULT_ETC_LIST);
    };

    const etcListQuery = ref<EtcListQueryType>(
        cloneDeep(DEFAULT_ETC_LIST_QUERY)
    );

    const resetEtcListQuery = () => {
        etcListQuery.value = cloneDeep(DEFAULT_ETC_LIST_QUERY);
    };

    const etcList = ref<Page<EtcListType>>(
        cloneDeep(DEFAULT_ETC_LIST)
    );

    const etcTotalList = ref<Page<EtcListType>>(
        cloneDeep(DEFAULT_ETC_LIST)
    );

    return {
        etcListQuery,
        etcList,
        etcTotalList,
        searchEtcList,
        resetEtcListQuery,
        reSearchEtcList,
        resetEtcList,
        resetEtcTotalList
    };
});
