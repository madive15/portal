<script setup lang="ts">
import { ref } from 'vue';

type TableStyle = 'default' | 'bordered';
const props = defineProps<{
  type?: TableStyle; // 스타일 타입
  // tableStyle?: string; //
  // addClass?: string; // 부모가 넘기는 추가 클래스
}>();

// 테이블 스타일 타입 (추가되는 스타일 여기에 추가)
const TableClass = computed(() => {
  const baseClassMap: Record<TableStyle, string> = {
    default: 'common-table__box',
    bordered: 'table-box'
  };
  const typeClass = props.type ? baseClassMap[props.type] : '';
  // const extraClass = props.tableStyle || '';
  // const addClass = props.addClass || '';

  return baseClassMap[props.type ?? 'default'];
});
</script>

<template>
  <div :class="TableClass">
    <table>
      <slot />
    </table>
  </div>
</template>

<style scoped lang="scss"></style>
