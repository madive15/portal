<script setup lang="ts">
import { computed } from 'vue';

type TitleSize = '1' | '2' | '3' | '4' | '5';
type IconType = 'bar' | 'circle' | 'dot' | 'arrow';
interface Props {
  tag?: keyof HTMLElementTagNameMap; // 기본 태그: h1~h6, div 등
  size?: TitleSize;
  type?: IconType;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h1',
  size: '',
  type: ''
});

// size에 따라 클래스명을 매핑
const titleClass = computed(() => {
  const validSizes: TitleSize[] = ['1', '2', '3', '4', '5'];
  const sizeClass = validSizes.includes(props.size as TitleSize)
    ? `title-heading-${props.size}`
    : 'title-heading';
  return [sizeClass, props.type].filter(Boolean).join(' ');
});
</script>

<template>
  <component :is="tag" :class="titleClass">
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
