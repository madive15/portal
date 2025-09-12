<script setup lang="ts">
import { watch, ref } from 'vue';
const router = useRouter();
interface Tab {
  name: string;
  label: string;
  url: string;
}
const props = defineProps<{
  tabs: Tab[];
  defaultTab?: string;
}>();
//tabs가 없을 경우 빈 배열을 기본값으로 설정하여 오류방지
const activeTab = ref('');

//tabs가 변경될 때 activeTab을 업데이트
watch(
  () => props.tabs,
  (newTabs) => {
    if (!activeTab.value && newTabs.length) activeTab.value = newTabs[0].name;
  }
);

onBeforeMount(async () => {
  if (props.tabs?.length == 0) {
    activeTab.value = props.tabs[0].name;
  } else {
    if (props.defaultTab.startsWith('1')) activeTab.value = props.tabs[0].name;
    else activeTab.value = props.tabs[1].name;
  }
});

const isExpanded = ref(false);

const movePage = (url) => {
  location.href = url;
};
</script>

<template>
  <div class="side-menu__area" :class="{ expanded: isExpanded }">
    <div class="side-toggle__btn">
      <button
        type="button"
        class="toggle-btn"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? '메뉴 접기' : ' 메뉴 펼치기' }}
      </button>
    </div>
    <div class="side-tab">
      <div class="side-tab__buttons">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          class="btn"
          :class="{ active: tab.name === activeTab }"
          @click="movePage(tab.url)"
          :title="`${tab.label}${tab.name === activeTab ? '선택됨' : ''}`"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="side-tab__content">
        <slot :name="activeTab"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
