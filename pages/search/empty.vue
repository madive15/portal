<script setup lang="ts">
// 요약보기
const isExpanded = ref(false);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="board-empty-box">
          <div class="img-box">
            <img
              src="/image/sub/customer/none.svg"
              alt="결과가 존재하지 않습니다"
            />
          </div>
          <div class="text-box">
            <p>검색된 결과가 존재하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/empty.scss';
</style>
