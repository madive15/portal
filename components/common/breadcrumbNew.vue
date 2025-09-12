<script setup lang="ts">
import { ref } from 'vue';
import { useMenuStore } from '~/stores/common/menu';

const menuStore = useMenuStore();
const { contentTitle, breadcrumbItems, headTitle } = storeToRefs(menuStore);

const props = defineProps<TitleBreadCrumbType>();

const propsTitle = props.breadcrumbItems
  ? props?.breadcrumbItems.map(({ text }) => text).join(' > ') +
    ' | 법률구조 플랫폼'
  : '';
const propsContentTitle = props.breadcrumbTitle ? props.breadcrumbTitle : '';

const pageTitle = ref(propsTitle != '' ? propsTitle : headTitle.value);
const pageContentTitle = ref(
  propsContentTitle != '' ? propsContentTitle : contentTitle.value.menuName
);

useHead({
  // title: headTitle.value
  title: pageTitle.value
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

const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <h2 class="sr-only">본문 내용 시작</h2>
  <div class="breadcrumb-title-box">
    <div class="title-box">
      <h3>{{ pageContentTitle }}</h3>
    </div>
    <div class="breadcrumb-box">
      <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
        <ol class="breadcrumb">
          <!-- 홈 아이템 -->
          <li class="breadcrumb-item home-item">홈</li>
          <!-- 브레드크럼 항목 렌더링 -->
          <template
            v-if="props.breadcrumbItems && props.breadcrumbItems.length <= 3"
          >
            <li
              v-for="(item, index) in props.breadcrumbItems"
              :key="index"
              :class="['breadcrumb-item text-item', { active: item.active }]"
            >
              {{ item.text }}
            </li>
          </template>
          <template v-else>
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
