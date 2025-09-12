<script setup lang="ts">
import { useMenuStore } from '~/stores/common/menu';
import CommonTitle from '~/components/ui/title/title.vue';

const menuStore = useMenuStore();
const { contentTitle, breadcrumbItems, headTitle } = storeToRefs(menuStore);

useHead({
  title: headTitle.value
});

export type BreadcrumbItem = {
  text: string;
  to?: string;
  active?: boolean;
};

export type TitleBreadCrumbType = {
  breadcrumbTitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
  showPrintButton?: boolean;
};

const props = defineProps<TitleBreadCrumbType>();

const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <CommonTitle tag="h2" class="sr-only" size="1">본문 내용 시작</CommonTitle>
  <div class="breadcrumb-title-box">
    <div class="title-box">
      <CommonTitle tag="h3" size="1">{{ contentTitle.menuName }}</CommonTitle>
    </div>
    <div class="breadcrumb-box">
      <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
        <ol class="breadcrumb">
          <!-- 홈 아이템 -->
          <li class="breadcrumb-item home-item">홈</li>
          <!-- 브레드크럼 항목 렌더링 -->
          <template v-if="breadcrumbItems.length <= 3">
            <li
              v-for="(item, index) in breadcrumbItems"
              :key="index"
              :class="['breadcrumb-item text-item', { active: item.active }]"
            >
              {{ item.text }}
            </li>
          </template>
          <template v-else>
            <!-- '...' 표시 -->
            <li class="breadcrumb-item text-item">...</li>
            <!-- 마지막 항목 -->
            <li
              :class="[
                'breadcrumb-item text-item',
                {
                  active: breadcrumbItems[breadcrumbItems.length - 1].active
                }
              ]"
            >
              {{ breadcrumbItems[breadcrumbItems.length - 1].text }}
            </li>
          </template>
        </ol>
        <div class="btns-breadcrumb">
          <button class="btn prev-button" @click="handleGoBack">
            <span class="text-span"> 뒤로가기 </span>
          </button>
          <button
            v-if="props.showPrintButton"
            class="btn print-button"
            @click="handlePrint"
          >
            <span class="text-span"> 인쇄하기 </span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
