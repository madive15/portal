<script setup lang="ts">
import { onMounted, ref } from 'vue';

const showPopup = ref(false);
const popupRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  popupWidth?: number | string;
  popupHeight?: number | string;
  popupHeaderTitleText: string;
  isVisible: boolean;
}>();

onMounted(() => {
  const isFirstVisit = !sessionStorage.getItem('aivisited');
  if (isFirstVisit) {
    showPopup.value = true;
    sessionStorage.setItem('aivisited', 'true');
  }
});

const closePopupOnCheck = (e: Event) => {
  const checkbox = e.target as HTMLInputElement;

  if (checkbox.checked) {
    showPopup.value = false;
  }
};

const popupWrapStyle = computed(() => ({
  width:
    props.popupWidth !== undefined
      ? typeof props.popupWidth === 'number'
        ? `${props.popupWidth}px`
        : props.popupWidth
      : undefined,
  height:
    props.popupHeight !== undefined
      ? typeof props.popupHeight === 'number'
        ? `${props.popupHeight}px`
        : props.popupHeight
      : undefined
}));

const emit = defineEmits<{ 'update:isVisible': (value: boolean) => void }>();

defineExpose({
  popupRef
});

function closePopup() {
  emit('update:isVisible', false);
}
</script>

<template>
  <!-- 레이어 팝업 -->

  <div
    class="layer-popup"
    v-if="isVisible"
    :style="popupWrapStyle"
    ref="popupRef"
  >
    <div class="layer-header">
      <h2>{{ props.popupHeaderTitleText }}</h2>
    </div>
    <div class="layer-content">
      <slot></slot>
      <button class="layer-close" @click="closePopup">
        <span class="sr-only">닫기</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/components/ui/popup/popup.scss';
</style>
