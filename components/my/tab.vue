<script setup lang="ts">
import { useLoginStore } from '~/stores/login';
import { storeToRefs } from 'pinia';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);
const dropdownCategory = ref('');

onBeforeMount(async () => {
  tabList.forEach((data) => {
    if (data.link.includes(route.path)) {
      dropdownCategory.value = data.label;
      return;
    }
  });
});

const myTabList = computed(() => {
  if (auth.mbrTypeCd == 'P01' || auth.mbrTypeCd == 'P02') {
    return tabList.filter((tab) => tab.isForSimpleAuth);
  } else {
    return tabList;
  }
});
const tabList = [
  {
    link: '/my/dscsn/rsvt/RsvtDsctnList',
    label: '상담예약 내역',
    isForSimpleAuth: true
  },
  { link: '/my/elrcpt/list', label: '전자접수현황', isForSimpleAuth: false },
  {
    link: '/my/dscsn/cyber/CybdsnDsctnList',
    label: '사이버상담 내역',
    isForSimpleAuth: true
  },
  { link: '/my/qna/list', label: '나의 문의내역', isForSimpleAuth: false },
  { link: '/my/pswd/check', label: '비밀번호 변경', isForSimpleAuth: false },
  { link: '/my/info/check', label: '회원정보수정', isForSimpleAuth: false },
  { link: '/my/whdwl', label: '회원탈퇴', isForSimpleAuth: false },
  { link: '/my/doc/list', label: '나의서류관리', isForSimpleAuth: false }
];

const activeIndex = ref<number | null>(null);
function setActive(tab) {
  dropdownCategory.value = tab.label;
  router.push(tab.link);
}
</script>

<template>
  <div class="common-category__button">
    <div
      class="btn-select__wrap mo-only"
      v-if="auth.mbrTypeCd !== 'P01' || auth.mbrTypeCd !== 'P02'"
    >
      <DropdownBasic
        class="select-type"
        v-model="dropdownCategory"
        label="상담예약 내역"
      >
        <template #default="{ select }">
          <ul role="menu">
            <li
              v-for="tab in myTabList"
              role="menuitem"
              tabindex="0"
              @click="select(tab.label)"
              @keydown.enter.prevent="select(tab.label)"
            >
              <router-link :to="tab.link" class="btn-auto">
                {{ tab.label }}
              </router-link>
            </li>
          </ul>
        </template>
      </DropdownBasic>
    </div>
    <div class="btn-tab__wrap-gap pc-only">
      <router-link
        to="/components/components"
        class="btn-auto"
        v-for="tab in myTabList"
        :class="{ active: dropdownCategory === tab.label }"
        @click="setActive(tab)"
        >{{ tab.label }}</router-link
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/tab';
</style>
