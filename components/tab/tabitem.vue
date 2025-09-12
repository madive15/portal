<script setup lang="ts">
import { inject, computed, useSlots } from 'vue';

const props = defineProps<{
  title?: string;
  className?: string;
  url?: string;
  value?: string;
}>();

const addTab = inject('addTab') as (options: {
  title?: string;
  titleContent?: any;
  className?: string;
  url?: string;
  value?: string;
}) => number;
const activeTabIndex = inject('activeTabIndex') as Ref<number>;

const slots = useSlots();

const index = addTab({
  title: props.title,
  titleContent: slots.title,
  className: props.className,
  url: props.url,
  value: props.value
});

const isActive = computed(() => activeTabIndex.value === index);
</script>

<template>
  <div v-if="isActive" :id="`tab-content-${index + 1}`">
    <slot></slot>
  </div>
</template>
