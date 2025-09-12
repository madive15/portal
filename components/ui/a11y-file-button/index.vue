<script setup lang="ts">
import { reactive, computed } from 'vue';

interface Props {
  title?: string;
}

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  title: '파일첨부'
});

const slots = defineSlots<{
  input: (props: {}) => any;
}>();

const root = ref<HTMLDivElement | null>(null);
const btn = ref<HTMLDivElement | null>(null);

const onClickFile = () => {
  const target = root.value?.querySelector('input');
  target?.click();
};

onMounted(() => {
  btn.value?.addEventListener('click', onClickFile);
});
onUnmounted(() => {
  btn.value?.removeEventListener('click', onClickFile);
});
</script>

<template>
  <div class="a11y-file" ref="root">
    <button type="button" class="a11y-btn" v-bind="$attrs" ref="btn">
      {{ title }}
    </button>
    <slot name="input"></slot>
  </div>
</template>

<style scoped lang="scss">
.a11y-file {
  position: relative;
  width: 100%;
  height: 100%;
}
.a11y-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
