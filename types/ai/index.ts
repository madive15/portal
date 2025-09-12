export type MessageType = {
    userId : string;
    sessionId : string;
    query : string;
    mngSn : string;
    mbrTypeCd : string;
    multiturnYn : string;
};

export type AutocompleteType = {
    query: string;
};

export type SatisfactionType = {
    index: string;
    agtNm: string;
    qry: string;
    repoId: string;
    userId: string;
    sessId: string;
    actType: string;
    id: string;
    answer: string;
    answerName: string;
    daName: string;
    reli: string;
    satisfactionNum: string;
    inquiryTitle: string;
    inquiryContents: string;
};

export type LlmType = {
    mngSn: string;
    crtDt: string;
};

export type MessageResultType = {
    repoId: string;      // 저장소ID
    agentName: string;   // 에이전트명
    userId: string;      // 사용자ID
    sessionId: string;   // 대화세션 ID
    query: string;       // 입력질의
    answerName: string;          // 답변명
    answer: string;              // 답변
    answerDetail: string;        // 상세답변
    autoCompletes: string[];   // 자동완성 목록
    recommendQuery: string[];   //추천질의
    id: string;   // 등록,수정,삭제된 리뷰로그 id
    mngSn: string;
    liked: boolean;
    disliked: boolean;
    isCopied: boolean;
    extraAnses: [{
            qstnCn: string;
            ansCn: string;
    }];
    candidateList : string[];
};

export type LlmResultType = {
    mngSn: string;
    crtDt: string;
    aiConfigDtlListResult : {
        qstnCn : string;
        ansCn : string;
    }
};

export type AutocompleteResultType = {
    autoCompletes: string;
};
