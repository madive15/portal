<script setup lang="ts">
import { ref, provide } from 'vue';

interface Tab {
  title: any[];   // VNode 배열
  content: any[]; // VNode 배열
}

const tabs = ref<Tab[]>([]);
const activeTabIndex = ref(0);

const addTab = (tab: Tab) => {
  tabs.value.push(tab);
  return tabs.value.length - 1;
};

provide('addTab', addTab);
provide('activeTabIndex', activeTabIndex);
</script>

<template>
  <ul class="nav nav-pills mb-3" role="tablist">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      class="nav-item"
      role="presentation"
    >
      <button
        class="nav-link"
        :class="{ active: activeTabIndex === index }"
        type="button"
        role="tab"
        @click="activeTabIndex = index"
      >
        <!-- title VNode 배열 렌더링 -->
        <template v-for="(vn,i) in tab.title" :key="i">
          <component :is="vn"></component>
        </template>
      </button>
    </li>
  </ul>

  <div class="tab-content">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-pane fade"
      :class="{ 'show active': activeTabIndex === index }"
      role="tabpanel"
      tabindex="0"
    >
      <!-- content VNode 배열 렌더링 -->
      <template v-for="(vn,i) in tab.content" :key="i">
        <component :is="vn"></component>
      </template>
    </div>
  </div>
</template>
