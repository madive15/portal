<script setup lang="ts">
interface Props {
  variant?: 'standard' | 'gray';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'standard'
});

const activeKey = defineModel<number[]>('activeKey');

const slots = defineSlots<{
  default: (props: {}) => any;
  expandIcon: (props: { isActive: boolean }) => any;
}>();

const hasSlot = (name: 'expandIcon') => {
  return !!slots[name];
};
</script>

<template>
  <div :class="['common-accordion-box', variant]">
    <a-collapse
      expand-icon-position="end"
      class="common-accordion-wrap"
      v-model:activeKey="activeKey"
    >
      <template #expandIcon="{ isActive }" v-if="hasSlot('expandIcon')">
        <slot name="expandIcon" :isActive="isActive"></slot>
      </template>
      <slot></slot>
    </a-collapse>
  </div>
</template>

<style scoped lang="scss">
//@use 'accordion';
</style>
