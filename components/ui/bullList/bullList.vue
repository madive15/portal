<script setup lang="ts">
type ListType = 'dot' | 'number' | 'refMark';
type NumberStyle = 'period' | 'encode' | 'circle';

const props = defineProps<{
  type: ListType;
  numberStyle?: NumberStyle;
}>();
// 기본 리스트 타입 클래스
const listTypeClass = computed(() => {
  switch (props.type) {
    case 'dot':
      return 'counsel-bull-list';
    case 'number':
      return 'counsel-num-list';
    case 'refMark':
      return 'counsel-bull-sub-list';
  }
});
// 숫자 스타일 클래스 (ul 추가 스타일)
const numberStyleClass = computed(() => {
  if (props.type !== 'number') return '';
  switch (props.numberStyle) {
    case 'period':
      return 'num-type1';
    case 'encode':
      return 'num-type2';
    case 'circle':
      return 'num-type3';
    default:
      return '';
  }
});
</script>

<template>
  <ul :class="[listTypeClass, numberStyleClass]">
    <slot />
  </ul>
</template>

<style scoped lang="scss"></style>
