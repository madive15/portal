<script setup lang="ts">
import type { MyDscsnListInVO } from '~/types/dscsn/rsvt';

const payload = defineModel<MyDscsnListInVO>('payload');
const emits = defineEmits(['search']);

const search = () => {
  emits('search');
};

const reset = () => {
  payload.value = { ...payload.value, selectKey: '1', keyword: '' };
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
      v-model:value="payload.selectKey"
    >
      <a-select-option value="1">제목</a-select-option>
      <a-select-option value="2">제목+내용</a-select-option>
    </a-select>
    <label for="search">
      <span class="sr-only">검색어 입력</span>
    </label>
    <input
      type="text"
      class="input-search"
      id="search"
      placeholder="검색어를 입력해 주세요."
      v-model="payload.keyword"
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

<style scoped lang="scss"></style>
