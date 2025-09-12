<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue';

const props = defineProps<{
  modelValue: any;
  label?: string;
  number?: number | string;
  hasList?: boolean;
  btnSelected?: boolean;
  to?: string;
}>();

function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null;
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object | boolean): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const toggle = async () => {
  open.value = !open.value;
  if (open.value) {
    await nextTick();
    focusFirst();
  }
};

const close = () => {
  open.value = false;
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
  <div
    :class="['common-dropdown', { active: open, 'sub-list': hasList }]"
    ref="root"
  >
    <!-- to가 있을 경우 <NuxtLink>로 렌더링 -->
    <NuxtLink
      v-if="props.to && props.to !== ''"
      :to="props.to"
      class="btn-auto"
      :class="{ 'is-selected': props.btnSelected }"
      :title="props.btnSelected ? '선택됨' : ''"
    >
      <span class="num-span" v-if="modelValue?.number">
        {{ modelValue.number }}
      </span>
      {{ isObject(modelValue) ? modelValue.label : modelValue || label }}
    </NuxtLink>

    <button
      v-else
      type="button"
      ref="dropdownBtn"
      class="btn-auto"
      :class="{ 'is-selected': props.btnSelected }"
      :title="props.btnSelected ? '선택됨' : ''"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.arrow-down.prevent="focusFirst"
      aria-haspopup="true"
    >
      <span class="num-span" v-if="modelValue?.number">{{
        modelValue.number
      }}</span>
      {{ isObject(modelValue) ? modelValue.label : modelValue || label }}
    </button>
    <transition name="fade-slide">
      <div
        v-if="open && hasList"
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
