<script setup lang="ts">
import { useLoginStore } from '~/stores/login';
import { storeToRefs } from 'pinia';
import Dropdown from '~/components/dropdown/Dropdown.vue';

const route = useRoute();
const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);
const DefaultText = ref('');

onBeforeMount(async () => {
  tabList.forEach((data) => {
    if (route.path.startsWith(data.link)) {
      DefaultText.value = data.label;
      return;
    }
  });
});

const tabList = [
  { link: '/center/ntc/list', label: '공지사항', hidden: ' ' },
  { link: '/center/faq/list', label: '자주찾는 질문', hidden: ' ' },
  { link: '/center/qna', label: '시스템 이용 문의', hidden: 'P01' },
  { link: '/center/gd', label: '이용안내', hidden: ' ' }
];

const className = computed(() => {
  return auth.value.mbrTypeCd !== 'P01'
    ? 'col-xl-3 col-12 left-col'
    : 'col-xl-4 col-12 left-col';
});
</script>

<template>
  <div class="navigation-box">
    <div class="mo-select-box-root mo-only">
      <label for="categoryType">
        <span class="sr-only">검색 카테고리 선택</span>
      </label>
      <Dropdown
        :button-text="DefaultText"
        :drop-slots="true"
        class="select-box"
      >
        <li class="hit-li" v-for="tab in tabList" :key="index">
          <NuxtLink :to="tab.link" :external="true" class="btn-item">
            {{ tab.label }}
          </NuxtLink>
        </li>
      </Dropdown>
    </div>
    <div class="container pc-only">
      <div class="row custom-tab">
        <template v-for="tab in tabList">
          <div
            v-if="auth.mbrTypeCd !== tab.hidden"
            :class="[
              className,
              route.path.startsWith(tab.link) ? ' active' : '',
              { active: DefaultText === tab.label }
            ]"
            :key="tab.link"
          >
            <NuxtLink
              :to="tab.link"
              :external="true"
              :title="DefaultText === tab.label ? '선택됨' : ''"
            >
              {{ tab.label }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/tab';
</style>
