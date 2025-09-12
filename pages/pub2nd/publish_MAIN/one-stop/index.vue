<script setup lang="ts">
import { useRouter } from 'vue-router';
</script>

<template>
  <div class="latest-box">
    <div class="content-header">
      <div class="title-box icon-type1">One-Stop 법률구조</div>
    </div>
    <div class="content-body">
      <div class="main-latest-board-box">
        <div class="box-item">
          <div class="box-tit">법률<br />상담</div>
          <div class="box-sum-list">
            <nuxt-link to="#" class="sum-item">
              <img src="/image/main/icon_step_02_catagory_01.png" alt="" />
              <span>면접상담</span>
            </nuxt-link>
            <nuxt-link to="#" class="sum-item">
              <img src="/image/main/icon_step_02_catagory_02.png" alt="" />
              <span>화상상담</span>
            </nuxt-link>
            <nuxt-link to="#" class="sum-item">
              <img src="/image/main/icon_step_02_catagory_03.png" alt="" />
              <span>전화상담</span>
            </nuxt-link>
            <nuxt-link to="#" class="sum-item">
              <img src="/image/main/icon_step_02_catagory_04.png" alt="" />
              <span>온라인상담</span>
            </nuxt-link>
          </div>
        </div>
        <div class="box-item">
          <div class="box-tit">전자<br />접수</div>
          <div class="box-link-list">
            <nuxt-link to="#" class="link-item">
              <strong>안내</strong>
              <span>
                누구나 쉽게 이해할 수<br class="pc-only" />
                있도록 안내해드려요.
              </span>
            </nuxt-link>
            <nuxt-link to="#" class="link-item">
              <strong>신청</strong>
              <span>
                클릭 한 번으로<br class="pc-only" />
                법률지원을 신청해보세요.
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="more-box">
      <NuxtLink
        :to="'/statuteinfo/discussion/list'"
        class="btn more-button"
        title="상담사례"
        :external="true"
      >
        <span class="text-span"> 더보기 </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
