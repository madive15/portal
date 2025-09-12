<script setup lang="ts">
import { useRouter } from 'vue-router';
import caseSlide from '~/components/main/caseslide.vue';
import lawSlide from '~/components/main/lawslide.vue';

const activeTab = ref('case');
</script>

<template>
  <div class="latest-box">
    <div class="content-header">
      <button
        :class="{ active: activeTab === 'case' }"
        @click="activeTab = 'case'"
      >
        <span class="title-box icon-type1"> 상담사례 </span>
      </button>
      <button
        :class="{ active: activeTab === 'law' }"
        @click="activeTab = 'law'"
      >
        <span class="title-box icon-type2"> 법률서식 </span>
      </button>
    </div>

    <div class="content-body">
      <caseSlide v-show="activeTab === 'case'" :slice-num="3" />
      <lawSlide v-show="activeTab === 'law'" :slice-num="3" />
    </div>
    <div class="more-box">
      <NuxtLink
        :to="
          activeTab === 'case'
            ? '/statuteinfo/discussion/list'
            : '/statuteinfo/template/supremecourt/list'
        "
        class="btn more-button"
        :title="activeTab === 'case' ? '상담사례' : '법률서식'"
        :external="true"
      >
        <span class="text-span">더보기</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
