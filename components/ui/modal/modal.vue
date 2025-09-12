<script setup lang="ts">
import { ref, defineExpose, useSlots } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  title?: string;
  width?: number | string;
  type?: 'primary' | 'record' | 'bgNone';
  full?: boolean;
  hFull?: boolean;
}>();

const slots = useSlots();
const visible = ref(false);
const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};

defineExpose({ open, close });

const modalClass = computed(() => {
  const fullSize = props.full ? 'mo-full__auto' : '';
  const hFullSize = props.hFull ? 'h-full__auto' : '';
  const typeClass =
    {
      primary: 'modal-primary',
      record: 'modal-record',
      bgNone: 'modal-none'
    }[props.type || ''] ?? 'modal-basic';
  return [fullSize, hFullSize, typeClass];
});

const footerSlot = computed(() => {
  return typeof slots.footer === 'function' ? slots.footer() : null;
});
</script>

<template>
  <a-modal
    v-model:visible="visible"
    v-bind="props.width ? { width: props.width } : {}"
    :title="props.title"
    :class="['common-modal-wrap', modalClass]"
    :footer="footerSlot"
  >
    <template #title>
      <slot name="title">
        <!-- 기본 제목 (슬롯 안 쓰면 fallback) -->
        {{ props.title }}
      </slot>
    </template>
    <!-- 본문 영역 -->
    <slot />
    <!-- footer 영역 -->
    <template #footer>
      <slot name="footer" />
    </template>
  </a-modal>
</template>

<style scoped></style>
