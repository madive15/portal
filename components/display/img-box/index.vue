<script setup lang="ts">
import { reactive, computed } from 'vue';

interface Props {
  useScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  useScroll: false
});

const state = reactive({
  isOpen: true
});

const isScroll = computed(() => props.useScroll);

const onCloseDimBox = () => {
  state.isOpen = false;
};
</script>

<template>
  <div
    :class="[
      'img-box-wrap',
      isScroll && 'is-scroll',
      !state.isOpen && 'is-active'
    ]"
  >
    <slot></slot>
    <button
      type="button"
      class="img-dim-box"
      @click="onCloseDimBox"
      v-if="state.isOpen"
    >
      <span class="guide-txt">
        좌우로 스크롤 하시면<br />
        더 많은 내용을 보실 수 있습니다.
      </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
