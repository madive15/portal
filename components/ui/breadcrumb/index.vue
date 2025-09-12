<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';

export type BreadcrumbItem = {
  menuid: number;
  text: string;
  to?: string;
};

export type TitleBreadCrumbType = {
  breadcrumbTitle: string;
  breadcrumbItems: BreadcrumbItem[];
  showPrintButton?: boolean;
};

const props = defineProps<TitleBreadCrumbType>();

const lastItem = computed(
  () => props.breadcrumbItems[props.breadcrumbItems.length - 1]
);

const handleGoBack = () => window.history.back();
const handlePrint = () => window.print();
</script>

<template>
  <h2 class="sr-only">본문 내용 시작</h2>
  <div class="breadcrumb-title-box">
    <div class="title-box">
      <h3>{{ props.breadcrumbTitle }}</h3>
    </div>

    <div class="breadcrumb-box">
      <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
        <ol class="breadcrumb">
          <!-- 홈 -->
          <li class="breadcrumb-item home-item">
            <NuxtLink to="/">홈</NuxtLink>
          </li>

          <template v-if="props.breadcrumbItems.length <= 3">
            <li
              v-for="(item, index) in props.breadcrumbItems"
              :key="item.menuid ?? index"
              class="breadcrumb-item text-item"
              :class="{ active: index === props.breadcrumbItems.length - 1 }"
            >
              <NuxtLink
                v-if="index !== props.breadcrumbItems.length - 1"
                :to="item.to"
              >
                {{ item.text }}
              </NuxtLink>
              <template v-else>
                {{ item.text }}
              </template>
            </li>
          </template>
          <template v-else>
            <li class="breadcrumb-item text-item">...</li>
            <li class="breadcrumb-item text-item active">
              {{ lastItem.text }}
            </li>
          </template>
        </ol>

        <!-- 뒤로가기 / 인쇄하기 버튼 -->
        <div class="btns-breadcrumb">
          <button class="btn prev-button" @click="handleGoBack">
            <span class="text-span">뒤로가기</span>
          </button>

          <button
            v-if="props.showPrintButton"
            class="btn print-button"
            @click="handlePrint"
          >
            <span class="text-span">인쇄하기</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
