<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps<{
  label: string;
  modelValue: string;
  number?: number;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const open = ref(false);
const rendered = ref(false);
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const root = ref<HTMLElement | null>(null);

const toggle = async () => {
  open.value = !open.value;
  if (open.value) {
    rendered.value = true;
    await nextTick();
    focusFirst();
  }
};
const close = () => {
  open.value = false;
  // if (dropdownBtn.value instanceof HTMLButtonElement) {
  //   dropdownBtn.value.focus();
  // } else {
  //   console.warn('btn.value is not a button', dropdownBtn.value);
  // }
};
const select = (value: string) => {
  emit('update:modelValue', value);
  close();
};
const focusable = (): HTMLElement[] => {
  return root.value
    ? Array.from(root.value.querySelectorAll('[role="menuitem"]'))
    : [];
};
const focusFirst = () => {
  const items = focusable();
  if (items.length) items[0].focus();
};
const focusNext = () => {
  const items = focusable();
  if (!items.length) return;
  const index = items.indexOf(document.activeElement as HTMLElement);
  items[(index + 1) % items.length]?.focus();
};
const focusPrev = () => {
  const items = focusable();
  if (!items.length) return;
  const index = items.indexOf(document.activeElement as HTMLElement);
  items[(index - 1 + items.length) % items.length]?.focus();
};
const onClickOutside = (e: MouseEvent) => {
  if (!root.value?.contains(e.target as Node)) {
    close();
  }
};
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div :class="['common-dropdown', { active: open }]" ref="root">
    <button
      type="button"
      ref="dropdownBtn"
      class="btn-basic"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.arrow-down.prevent="focusFirst"
      aria-haspopup="true"
    >
      <span class="text">{{ modelValue || label }}</span>
      <span class="icon-plus"></span>
    </button>
    <transition name="fade-slide">
      <div
        v-if="open"
        role="menu"
        class="list"
        @keydown.esc="close"
        @keydown.arrow-up.prevent="focusPrev"
        @keydown.arrow-down.prevent="focusNext"
      >
        <slot :close="close" :select="select" />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use 'dropdown.scss';
</style>
