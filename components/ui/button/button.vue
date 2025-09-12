<script setup lang="ts">
import { useAttrs, computed } from 'vue';
import { NuxtLink } from '#components';

defineOptions({ inheritAttrs: false });

type Width = 'xs' | 'sm' | 'sm-1' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
type Height = 'sm' | 'md';
type Variants =
  | 'primary'
  | 'line-primary'
  | 'gray'
  | 'line-black'
  | 'line-blue'
  | 'de-mapping'
  | 'mapping'
  | 'approval';
type FontSize = 'sm' | 'md';

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  width?: Width;
  height?: Height;
  tooltipText?: string;
  tooltipId?: string;
  variants?: Variants;
  fontsize?: FontSize;
  to?: string;
}>();

const attrs = useAttrs();

const referenceEl = ref<HTMLElement | null>(null);
const tooltipEl = ref<HTMLElement | null>(null);
const visible = ref(false);

// 외부에서 접근 가능하도록 expose
defineExpose({
  el: referenceEl
});

// `to` 값이 존재하면 NuxtLink로 렌더링
const isNuxtLink = computed(() => !!props.to);
// 사용할 태그 결정: NuxtLink 또는 button
const componentTag = computed(() => {
  return isNuxtLink.value ? NuxtLink : 'button';
});

// class 제외한 나머지만 전달
const mergedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return {
    ...rest,
    ...(isNuxtLink.value ? {} : { disabled: props.disabled }),
    ...(isNuxtLink.value && props.disabled
      ? { 'aria-disabled': 'true', tabindex: -1 }
      : {}),
    ...(props.tooltipText ? { 'data-target': tooltipId } : {})
  };
});

// 병합 + 중복 제거된 class 계산
const mergedClass = computed(() => {
  const w = props.width ? `w-${props.width}` : '';
  const h = props.height ? `h-${props.height}` : '';
  const variant = props.variants ? props.variants : '';
  const fontsize = props.fontsize ? `fs-${props.fontsize}` : '';
  const classList = [
    variant,
    fontsize,
    ...(attrs.class ? attrs.class.split(' ') : []),
    'btn-basic',
    w,
    h
  ];
  return [...new Set(classList)];
});

//tooltip
const tooltipId =
  props.tooltipId || `tooltip-${Math.random().toString(36).slice(2, 10)}`;

function updatePosition() {
  if (!referenceEl.value || !tooltipEl.value) return;

  const rect = referenceEl.value.getBoundingClientRect();

  tooltipEl.value.style.top = `${rect.top - tooltipEl.value.offsetHeight - 8}px`; // scrollY 제거
  tooltipEl.value.style.left = `${rect.left + rect.width / 2 - tooltipEl.value.offsetWidth / 2}px`; // scrollX 제거
}

function showTooltip() {
  if (!props.tooltipText?.trim()) return;
  visible.value = true;
  nextTick(() => {
    requestAnimationFrame(updatePosition);
  });
}

function hideTooltip() {
  visible.value = false;
}

onMounted(() => {
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);
});
onUnmounted(() => {
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});
</script>

<template>
  <div
    v-if="props.tooltipText?.trim() && visible"
    ref="tooltipEl"
    :id="tooltipId"
    role="tooltip"
    class="common-tooltip"
    :aria-describedby="tooltipId"
  >
    <div class="tooltip-inner">
      {{ props.tooltipText }}
    </div>
    <span class="tooltip-arrow"></span>
  </div>

  <component
    ref="referenceEl"
    :is="componentTag"
    :to="isNuxtLink ? props.to : undefined"
    :type="!isNuxtLink ? props.type || 'button' : undefined"
    :class="mergedClass"
    v-bind="mergedAttrs"
    @focus="showTooltip"
    @blur="hideTooltip"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <span v-if="$slots['left-icon']" class="left-icon">
      <slot name="left-icon" />
    </span>

    <span class="text">
      <slot />
    </span>

    <span v-if="$slots['right-icon']" class="right-icon">
      <slot name="right-icon" />
    </span>
  </component>
</template>

<style scoped lang="scss"></style>
