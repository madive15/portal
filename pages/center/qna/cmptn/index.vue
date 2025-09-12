<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Satisfaction from '~/components/common/satisfaction.vue';
const router = useRouter();
const movePage = () => {
  router.push('/', { external: true });
};
const movePage2 = () => {
  router.push('/my/qna/list', { external: true });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="고객센터"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '고객센터' },
            { text: '시스템 이용 문의' },
            { text: '시스템 이용 문의글작성완료', active: true }
          ]"
        />
        <center-tab />
        <!--        <div class="navigation-box">-->
        <!--          <div class="container">-->
        <!--            <div class="row custom-tab">-->
        <!--              <div class="col-xl-3 col-12 left-col">-->
        <!--                <NuxtLink :to="'/center/ntc/list'"> 공지사항 </NuxtLink>-->
        <!--              </div>-->
        <!--              <div class="col-xl-3 col-12 left-col">-->
        <!--                <NuxtLink :to="'/center/faq/list'"> 자주찾는 질문 </NuxtLink>-->
        <!--              </div>-->
        <!--              <div class="col-xl-3 col-12 left-col active">-->
        <!--                <NuxtLink :to="'/center/qna'"> 시스템 이용 문의 </NuxtLink>-->
        <!--              </div>-->
        <!--              <div class="col-xl-3 col-12 right-col">-->
        <!--                <NuxtLink :to="'/center/gd'"> 이용안내 </NuxtLink>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="result-box">
          <div class="img-box">
            <img
              src="/image/sub/customer/send.svg"
              alt="시스템 이용 문의 완료"
            />
          </div>
          <div class="text-box">
            <h4>
              문의하신 내용이 <br class="mo-only" />정상적으로 접수되었습니다.
            </h4>
            <p>
              문의에 대한 답변은 <br class="mo-only" />내 문의내역에서 확인
              가능하십니다.
            </p>
          </div>
          <div class="button-box">
            <button
              type="button"
              title="홈페이지 메인"
              class="btn-basic primary"
              style="margin-right: 10px"
              @click="movePage"
            >
              <span class="text">홈페이지 메인</span>
            </button>

            <button
              type="button"
              title="나의 문의내역"
              class="btn-basic"
              @click="movePage2"
            >
              <span class="text">나의 문의내역</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/qna/cmptn/index.scss';
</style>
