<script setup lang="ts"></script>

<template>
  <!-- type4. 고객센터-->
  <div class="search-center__wrap">
    <label for="board">
      <span class="sr-only">검색 기준</span>
    </label>
    <a-select class="common-select" id="board">
      <a-select-option value="1">제목</a-select-option>
      <a-select-option value="2">제목</a-select-option>
    </a-select>
    <label for="search">
      <span class="sr-only">검색어 입력</span>
    </label>
    <input
      type="text"
      class="input-search"
      id="search"
      placeholder="검색어를 입력해 주세요."
    />
    <div class="search-info__btns">
      <button type="button" class="btn btn-sch">
        <span class="text">검색</span>
      </button>
      <button type="button" class="btn btn-reset">
        <span class="text">초기화</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
