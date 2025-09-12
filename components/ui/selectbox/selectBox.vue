<script setup lang="ts">
import { ThemeConfig } from 'ant-design-vue/lib/config-provider/context';
const FONT_FAMILY =
    '"Pretendard GOV Variable", "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

const DEFAULT_THEME: ThemeConfig = {
  token: {
    fontFamily: `${FONT_FAMILY}`,
    fontSize: 15,
    fontSizeIcon: 12,

  },
  components: {
    Select: {
      controlHeight: 40, // option 높이값
      colorPrimary: '#3E80EB', // 선택된 색상 보더라인이 같이 감
      colorText: '#555555',
      controlItemBgHover: '#EDF1F5',
      controlItemBgActive: '#EDF1F5'
    }
  }
};

const options = ref<SelectProps['options']>([
  { value: 'jack', label: 'Jack(100)' },
  { value: 'luck', label: 'Lucy(101)' },
]);
</script>

<template>
  <a-config-provider :theme="DEFAULT_THEME">
    <label for="select2">
      <span class="sr-only">검색 기준 선택</span>
    </label>
    <a-select
      id="select2"
      v-model:value="value"
      class="common-select"
      placeholder="test"
      :options="options"

    />
  </a-config-provider>
</template>

<style scoped>

</style>