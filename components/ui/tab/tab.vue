<script setup lang="ts">
import { ref, provide, defineExpose } from 'vue';

type TabOptions = {
  title?: string;
  titleContent?: any;
  className?: string;
  url?: string;
};

const attrs = useAttrs();
const props = defineProps<{
  defaultActiveTab?: number;
  useHistoryState?: boolean;
  platformTabShow?: boolean;
  platformNoneWidthTabShow?: boolean;
  platformCategoryShow?: boolean;
  platformTwoDepthTabShow?: boolean;
}>();

const emit = defineEmits(['click']);

const tabTitles = ref<TabOptions[]>([]);
const activeTabIndex = ref(props.defaultActiveTab || 0);

const addTab = (options: TabOptions) => {
  if (options.titleContent && !options.className) {
    options.className = 'br-tabitem';
  }
  tabTitles.value.push(options);
  return tabTitles.value.length - 1;
};

const clearTabs = () => {
  tabTitles.value = [];
  activeTabIndex.value = 0;
};

provide('addTab', addTab);
provide('clearTabs', clearTabs);
provide('activeTabIndex', activeTabIndex);

const goToTabByUrl = (url: string) => {
  const idx = tabTitles.value.findIndex((t) => t.url === url);
  if (idx >= 0) {
    activeTabIndex.value = idx;
  }
};

if (props.useHistoryState) {
  if (window.history.state?.tabIndex !== undefined) {
    activeTabIndex.value = window.history.state.tabIndex;
  } else {
    activeTabIndex.value = props.defaultActiveTab || 0;
  }

  watch(activeTabIndex, (newValue) => {
    window.history.replaceState(
      { ...window.history.state, tabIndex: newValue } || { tabIndex: newValue },
      ''
    );
  });
}

// 메서드를 부모에 노출
defineExpose({
  goToTabByUrl,
  activeTabIndex
});

const handleClick = (index: number) => {
  if (activeTabIndex.value === index) {
    // 동일탭 클릭시 return
    return;
  }
  activeTabIndex.value = index;
  emit('click', index);
};
</script>

<template>
  <div class="common-platform-tab-box" v-if="platformTabShow" v-bind="attrs">
    <div class="common-platform-tabs tabs">
      <ul class="tab-headers">
        <li
          v-for="(tab, index) in tabTitles"
          :key="index"
          :class="[
            'tab-header',
            { active: activeTabIndex === index },
            tab.className
          ]"
          @click="handleClick(index)"
          :data-tab-url="tab.url"
          :id="index"
        >
          <button
            type="button"
            class="tab-btn"
            :title="activeTabIndex === index ? '선택됨' : ''"
          >
            <template v-if="tab.title">{{ tab.title }}</template>
            <template v-else>
              <component :is="tab.titleContent"></component>
            </template>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <slot></slot>
      </div>
    </div>
  </div>

  <div
    class="common-platform-none-width-tab-box"
    v-if="platformNoneWidthTabShow"
    v-bind="attrs"
  >
    <div class="common-platform-none-width-tabs tabs">
      <ul class="tab-headers">
        <li
          v-for="(tab, index) in tabTitles"
          :key="index"
          :class="[
            'tab-header',
            { active: activeTabIndex === index },
            tab.className
          ]"
          @click="handleClick(index)"
          :data-tab-url="tab.url"
          :id="index"
        >
          <button
            type="button"
            class="tab-btn"
            :title="activeTabIndex === index ? '선택됨' : ''"
          >
            <template v-if="tab.title">{{ tab.title }}</template>
            <template v-else>
              <component :is="tab.titleContent"></component>
            </template>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <slot></slot>
      </div>
    </div>
  </div>

  <div
    class="common-platform-two-depth-tab-box"
    v-if="platformTwoDepthTabShow"
    v-bind="attrs"
  >
    <div class="common-platform-two-depth-tabs tabs type2">
      <ul class="tab-headers">
        <li
          v-for="(tab, index) in tabTitles"
          :key="index"
          :class="[
            'tab-header',
            { active: activeTabIndex === index },
            tab.className
          ]"
          @click="handleClick(index)"
          :data-tab-url="tab.url"
          :id="index"
        >
          <button
            type="button"
            class="tab-btn"
            :title="activeTabIndex === index ? '선택됨' : ''"
          >
            <template v-if="tab.title">{{ tab.title }}</template>
            <template v-else>
              <component :is="tab.titleContent"></component>
            </template>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
