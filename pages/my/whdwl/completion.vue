<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
const router = useRouter();

const loginStore = useLoginStore();

onMounted(() => {
  Promise.all([loginStore.logout()]);
});
const movePage = () => {
  router.push('/', { external: true });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="탈퇴완료"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: '회원탈퇴' },
            { text: '탈퇴완료', active: true }
          ]"
        />
        <div class="navigation-box">
          <div class="container">
            <!--            <div class="row">
              <div class="col-xl-4 col-12 left-col">
                <NuxtLink :to="'#'"> 나의 문의내역 </NuxtLink>
              </div>
              <div class="col-xl-4 col-12">
                <NuxtLink :to="'#'"> 회원정보수정 </NuxtLink>
              </div>
              <div class="col-xl-4 col-12 right-col active">
                <NuxtLink :to="'#'"> 회원탈퇴 </NuxtLink>
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="withdraw-box">
          <div class="img-box">
            <img src="/image/sub/my/whdwl/secession.svg" alt="" />
          </div>
          <h4>그동안 이용해 주셔서 감사합니다.</h4>
          <p>
            더 좋은 법률구조 서비스를 만들기 위해<br
              class="mo-only"
            />노력하겠습니다.
          </p>
          <div class="button-box">
            <button
              type="button"
              title="홈페이지 메인"
              class="btn-basic primary"
              @click="movePage"
            >
              <span class="text">홈페이지 메인</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/whdwl/completion.scss';
</style>
