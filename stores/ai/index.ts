import type {
    MessageType,
    AutocompleteType,
    SatisfactionType,
    LlmType,
    AutocompleteResultType,
    LlmResultType, MessageResultType,
} from '~/types/ai';
import {DEFAULT_AUTOCOMPLETE, DEFAULT_LLM, DEFAULT_MESSAGE, DEFAULT_SATISFACTION} from "~/constants/ai";
import { cloneDeep } from "lodash-es";
import {ref} from "vue";
import type {ServiceListQueryType, ServiceListType} from "~/types/search/service";
import {DEFAULT_SERVICE_LIST, DEFAULT_SERVICE_LIST_QUERY} from "~/constants/search/service";
import type {Page} from "~/types/common";
import type {SearchGroupListType} from "~/types/search";
import {DEFAULT_GROUP_LIST} from "~/constants/search";

export const useAiStore = defineStore('useAiStore', () => {

    const message = ref<MessageType>(
        cloneDeep(DEFAULT_MESSAGE)
    );

    const llm = ref<LlmType>(
        cloneDeep(DEFAULT_LLM)
    );

    const autocomplete = ref<AutocompleteType>(
        cloneDeep(DEFAULT_AUTOCOMPLETE)
    );

    const resetAutocomplete = () => {
        autocomplete.value = cloneDeep(DEFAULT_AUTOCOMPLETE);
    };

    const satisfaction = ref<SatisfactionType>(
        cloneDeep(DEFAULT_SATISFACTION)
    );

    const autocompleteList = ref<AutocompleteResultType[]>([]);
    const llmHistList = ref<LlmResultType[]>([]);
    const llmHist = ref<LlmResultType[]>([]);
    const messageList = ref<MessageResultType[]>([]);
    const candidateList = ref<MessageResultType[]>([]);

    const getMessage = async () => {
        if (message.value.sessionId) {
            message.value.multiturnYn = 'true';
        } else {
            message.value.multiturnYn = 'false';
        }

        const { data } = await useAxios().post('/api/ai/getMessage', message.value);
        message.value.sessionId = data.sessionId;
        message.value.mngSn = data.mngSn;
        data.candidateList = data.extraAnses[0].candidateList;
        messageList.value.push(data);
        candidateList.value = [];
        candidateList.value.push(data.extraAnses[0].candidateList);
    };

    const getAutocomplete = async () => {
        autocompleteList.value = [];
        const { data } = await useAxios().post('/api/ai/getAutocomplete', autocomplete.value);
        autocompleteList.value.push(...data.autoCompletes);
        if(data.autoCompletes.length < 3){
            autocomplete.value.query = "[기본질의]"
            const { data } = await useAxios().post('/api/ai/getAutocomplete', autocomplete.value);
            autocompleteList.value.push(...data.autoCompletes);
        }
    };

    const getLlmHist  = async () => {
        llmHistList.value = [];
        const { data } = await useAxios().post('/api/ai/getLlmHist', llm.value);
        llmHistList.value.push(...data);
    };

    const setSatisfaction = (param :SatisfactionType) => {
        return useAxios().post('/api/ai/setSatisfaction', param);
    };

    const delLlmHist = (param :LlmType) => {
        return useAxios().post('/api/ai/delLlmHist', param);
    };

    const delAllLlmHist = (param :LlmType) => {
        return useAxios().post('/api/ai/delAllLlmHist', param);
    };

    return {
        getMessage,
        getAutocomplete,
        setSatisfaction,
        getLlmHist,
        delLlmHist,
        delAllLlmHist,
        autocomplete,
        llm,
        message,
        satisfaction,
        llmHist,
        autocompleteList,
        llmHistList,
        candidateList,
        messageList,
        resetAutocomplete,

    };
});