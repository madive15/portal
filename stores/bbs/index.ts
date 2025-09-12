import type {
  BoardArticleListQueryType,
  BoardArticleListType,
  BoardArticleSelectBcId,
  BoardArticleSelectKeyword,
  BoardArticleType,
  BoardConfigType,
  BoardTabListResultType
} from '~/types/bbs';
import type { Page } from '~/types/common';
import { cloneDeep } from 'lodash-es';
import {
  DEFAULT_BOARD_ARTICLE,
  DEFAULT_BOARD_ARTICLE_LIST,
  DEFAULT_BOARD_ARTICLE_SELECT_BCID,
  DEFAULT_BOARD_ARTICLE_SELECT_KEYWORD,
  DEFAULT_BOARD_ARTICLE_LIST_QUERY,
  DEFAULT_BOARD_CONFIG,
  DEFAULT_BOARD_TAB
} from '~/constants/bbs';
import { useAxios } from '~/composables/useAxios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { toBytes } from '~/utils/BlobUtils';

export const useBoardArticleStore = defineStore('useBoardArticleStore', () => {
  const boardConfig = ref<BoardConfigType>(cloneDeep(DEFAULT_BOARD_CONFIG));

  const boardListQuery = ref<BoardArticleListQueryType>(
    cloneDeep(DEFAULT_BOARD_ARTICLE_LIST_QUERY)
  );

  const boardSelBcId = ref<BoardArticleSelectBcId>(
    cloneDeep(DEFAULT_BOARD_ARTICLE_SELECT_BCID)
  );

  const boardSelKeyword = ref<BoardArticleSelectKeyword>(
    cloneDeep(DEFAULT_BOARD_ARTICLE_SELECT_KEYWORD)
  );

  const boardTabList = ref<BoardTabListResultType>(
    cloneDeep(DEFAULT_BOARD_TAB)
  );

  const boardList = ref<Page<BoardArticleListType>>(
    cloneDeep(DEFAULT_BOARD_ARTICLE_LIST)
  );

  const myAnswerList = ref<Page<BoardArticleListType>>(
    cloneDeep(DEFAULT_BOARD_ARTICLE_LIST)
  );

  const boardArticle = ref<BoardArticleType>(cloneDeep(DEFAULT_BOARD_ARTICLE));

  const searchBoardConfig = async (menuUrl: string) => {
    if (!boardConfig.value.bcId) {
      const { data } = await useAxios().get('/api/board/boardConfig', {
        params: {
          menuUrl
        }
      });
      boardConfig.value = data;
    }
  };

  const searchBoardTabList = async (type: string) => {
    const { data } = await useAxios().get('/api/board/boardTabList', {
      params: {
        ...boardListQuery.value,
        bcId: boardConfig.value.bcId,
        bcType: type
      }
    });

    boardTabList.value = data;
  };

  const resetBoardListQuery = () => {
    boardListQuery.value = cloneDeep({
      ...DEFAULT_BOARD_ARTICLE_LIST_QUERY,
      bcId: boardConfig.value.bcId
    });
  };

  const resetBoardList = () => {
    boardList.value = cloneDeep(DEFAULT_BOARD_ARTICLE_LIST);
  };

  const resetMyAnswerList = () => {
    myAnswerList.value = cloneDeep(DEFAULT_BOARD_ARTICLE_LIST);
  };

  const resetBoardArticle = () => {
    boardArticle.value = cloneDeep(DEFAULT_BOARD_ARTICLE);
  };

  const searchBoardArticleList = async (selBcId: number) => {
    //공지사항 or 자주찾는 질문 선택했을 때
    if (Number(boardSelBcId.value.selBcId) !== selBcId) {
      //boardConfig.value 얘를 초기화하는 부분이 없어서 여기서 바꿔줬음
      boardConfig.value = cloneDeep({
        ...DEFAULT_BOARD_CONFIG,
        bcId: selBcId
      });

      //현재 선택된 게시판 종류
      boardSelBcId.value = cloneDeep({
        ...DEFAULT_BOARD_ARTICLE_SELECT_BCID,
        selBcId: selBcId
      });

      //게시판이 변경되었을 때 초기화 시켜주기
      boardListQuery.value = cloneDeep({
        ...DEFAULT_BOARD_ARTICLE_LIST_QUERY,
        bcId: selBcId,
        selectKey: '0',
        keyword: '',
        page: 1
      });
      //검색단어 입력해서 검색할 때
    } else if (
      boardSelKeyword.value.selKeyword !== boardListQuery.value.keyword
    ) {
      //마지막 검색단어 변경해 주기
      boardSelKeyword.value = cloneDeep({
        ...DEFAULT_BOARD_ARTICLE_SELECT_KEYWORD,
        selKeyword: boardListQuery.value.keyword
      });

      //검색단어를 넣고 검색할 때 - page를 1로 초기화 한다.
      boardListQuery.value = cloneDeep({
        ...boardListQuery.value,
        bcId: selBcId,
        page: 1
      });
    }

    const { data } = await useAxios().get('/api/board/boardArticleList', {
      params: {
        ...boardListQuery.value
      }
    });

    boardList.value = data;
  };

  const searchBoardMyAnswerList = async () => {
    const { data } = await useAxios().get('/api/my/qna/qnaList', {
      params: {
        ...boardListQuery.value,
        bcId: boardConfig.value.bcId
      }
    });

    myAnswerList.value = data;
  };

  const searchBoardArticle = async (baId: number) => {
    const { data } = await useAxios().get('/api/board/boardArticle', {
      params: {
        baId
      }
    });

    boardArticle.value = {
      ...data,
      asaBoardAnswer:
        data.asaBoardAnswer ?? cloneDeep(DEFAULT_BOARD_ARTICLE.asaBoardAnswer)
    };
  };

  const updateBoardArticle = () => {
    return useAxios().post('/api/board/updateBoardArticle', {
      ...boardArticle.value,
      bcId: boardConfig.value.bcId
    });
  };

  const updateViewCount = () => {
    return useAxios().post('/api/board/updateViewCount', {
      ...boardArticle.value,
      bcId: boardConfig.value.bcId
    });
  };

  const downloadBoardArticleFile = (baId: number) => {
    useAxios()
      .get('/api/board/downloadBoardArticleFile', {
        params: {
          baId
        }
      })
      .then(({ data }) => {
        const a = document.createElement('a');
        const blob = toBytes(data.data, data.mimeType);
        a.href = URL.createObjectURL(blob);
        a.download = data.filename;
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
      });
  };

  const deleteBoardArticleList = () => {
    return useAxios().post('/api/board/deleteBoardArticleList', null, {
      params: {
        baId: boardArticle.value.baId
      }
    });
  };

  const existsFixNoticeCount = () => {
    return useAxios().get('/api/board/existsFixNoticeCount', {
      params: {
        bcId: boardConfig.value.bcId
      }
    });
  };

  return {
    boardListQuery,
    boardList,
    myAnswerList,
    boardArticle,
    boardConfig,
    boardTabList,
    resetBoardListQuery,
    resetBoardList,
    resetMyAnswerList,
    resetBoardArticle,
    searchBoardConfig,
    searchBoardTabList,
    searchBoardArticleList,
    searchBoardArticle,
    searchBoardMyAnswerList,
    updateBoardArticle,
    updateViewCount,
    downloadBoardArticleFile,
    deleteBoardArticleList,
    existsFixNoticeCount
  };
});
