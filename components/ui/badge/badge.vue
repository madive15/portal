<script setup lang="ts">
import { computed } from 'vue';

type BadgeSize = '1' | '2';
type TagType = 'gray' | 'color-l-pink' | 'color-mint' | 'color-gray';

const props = defineProps<{
  tagBadgeText: string;
  size?: BadgeSize;
  type?: TagType;
}>();

// size에 따라 클래스명을 매핑
const badgeClass = computed(() => {
  const validSizes: BadgeSize[] = ['1', '2'];
  const sizeClass = validSizes.includes(props.size as BadgeSize)
    ? `common-tag-badge--s${props.size}`
    : 'common-tag-badge';
  return [sizeClass, props.type].filter(Boolean).join(' ');
});
</script>

<template>
  <div class="tag-badge-box">
    <a-tag :class="badgeClass">{{ tagBadgeText }}</a-tag>
  </div>
</template>

<style scoped lang="scss"></style>
