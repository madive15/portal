import type {AutocompleteType, LlmType, MessageType, SatisfactionType} from "~/types/ai";

export const DEFAULT_MESSAGE: MessageType = {
    userId : '',
    sessionId : '',
    query : '',
    mngSn : '',
    mbrTypeCd : '',
};

export const DEFAULT_LLM: LlmType = {
    mngSn:'',
    crtDt:''
};

export const DEFAULT_AUTOCOMPLETE: AutocompleteType = {
    query:'[기본질의]'
};


export const DEFAULT_SATISFACTION: SatisfactionType = {
    index:'',
    agtNm: '',
    qry: '',
    repoId: '',
    userId: '',
    sessId: '',
    actType: '',
    id: '',
    answer: '',
    answerName: '',
    daName: '',
    reli: '0',
    satisfactionNum: '',
    inquiryTitle: 'Llm의견',
    inquiryContents: ''
};
