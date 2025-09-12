<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useError } from '#app';

const router = useRouter();
const error = useError();

const goBack = () => {
  router.back();
};

definePageMeta({
  layout: 'sub'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section-404">
      <div class="wrap">
        <img src="/image/sub/error/404.svg" alt="에러 페이지" />
        <div class="title-404">
          <p v-if="error?.statusCode === 404">404 PAGE NOT FOUND</p>
          <p v-else-if="error?.statusCode === 500">500 INTERNAL SERVER ERROR</p>
          <p v-else>{{ error?.statusCode }}ERROR PAGE</p>
        </div>
        <div class="text-404">
          <p>
            요청하신 페이지가 존재하지 않거나,<br class="mo-only" />변경되어
            찾을 수 없습니다.
          </p>
          <p>주소를 다시 확인해주세요.</p>
        </div>
        <div class="btns">
          <button class="v-btn btn-white" @click="goBack">이전으로</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/error.scss';
</style>
