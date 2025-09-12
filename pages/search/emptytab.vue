<script setup lang="ts"></script>

<template>
  <div class="board-empty-box">
    <div class="img-box">
      <img src="/image/sub/customer/none.svg" alt="결과가 존재하지 않습니다" />
    </div>
    <div class="text-box">
      <p>해당 검색어로 검색된 결과가 존재하지 않습니다.</p>
      <p>검색값을 수정하거나 선택한 검색 조건을 조정하세요.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/emptytab.scss';
</style>
