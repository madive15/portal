<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardArticleStore } from '~/stores/bbs';

const route = useRoute();
const boardArticleStore = useBoardArticleStore();
const { boardConfig, boardListQuery } = storeToRefs(boardArticleStore);

type PropType = {
  title: string;
};

const props = defineProps<PropType>();

await useBoardArticleStore().searchBoardConfig(route.path);

/*
(100000, '공지사항', 'NTC');
(200000, '1:1문의', 'QNA');-- 1:1문의
(300000, 'FAQ', 'FAQ'); -- 자주찾는질문
 */
const search = async () => {
  const bcId = boardConfig.value.bcId as string;

  let type = '';
  let schListOpt = 1;

  if (bcId == '100000') {
    type = 'NTC_TYPE';
  } else if (bcId == '200000') {
    type = 'QNA_TYPE';
    schListOpt = 2;
  } else if (bcId == '300000') {
    type = 'FAQ_TYPE';
  }
  await useBoardArticleStore().searchBoardTabList(type);

  if (schListOpt === 1) {
    await boardArticleStore.searchBoardArticleList(Number(bcId));
  } else if (schListOpt === 2) {
    // 1:1 문의하기
    await boardArticleStore.searchBoardMyAnswerList();
  }
};

const reset = () => {
  boardArticleStore.resetBoardListQuery();
};
</script>

<template>
  <div class="search-center__wrap">
    <label for="board">
      <span class="sr-only">검색 기준</span>
    </label>
    <a-select
      class="common-select"
      id="board"
      v-model:value="boardListQuery.selectKey"
    >
      <a-select-option value="0">제목</a-select-option>
      <a-select-option value="1">내용</a-select-option>
      <a-select-option value="2">제목+내용</a-select-option>
      <a-select-option value="3">분류</a-select-option>
    </a-select>
    <label for="search">
      <span class="sr-only">검색어 입력</span>
    </label>
    <input
      type="text"
      class="input-search"
      id="search"
      placeholder="검색어를 입력해 주세요."
      v-model="boardListQuery.keyword"
    />
    <div class="search-info__btns">
      <button type="button" class="btn btn-sch" @click="search">
        <span class="text">검색</span>
      </button>
      <button type="button" class="btn btn-reset" @click="reset">
        <span class="text">초기화</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './boardsearch';
</style>
