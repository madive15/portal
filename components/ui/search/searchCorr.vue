<script setup lang="ts"></script>

<template>
  <!--type2  결과 내 재검색-->
  <div class="re-search__wrap">
    <div class="sch-title">연관</div>
    <div class="sch-keyword">
      <ul class="keyword-list">
        <li class="linked-item">
          <button type="button" class="btn-keyword">
            <span>법률 상담</span>
          </button>
        </li>
        <li class="linked-item">
          <button type="button" class="btn-keyword">
            <span>법률지원(양육비)</span>
          </button>
        </li>
        <li class="linked-item">
          <button type="button" class="btn-keyword">
            <span>법률지원(양육비)</span>
          </button>
        </li>
      </ul>
    </div>
    <div class="search-box__sub">
      <label for="research">
        <span class="sr-only">결과 내 재검색</span>
      </label>
      <input
        type="text"
        id="research"
        class="input-search"
        placeholder="결과 내 재검색"
      />
      <button type="button" class="btn-sch" title="결과 내 재검색"></button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
