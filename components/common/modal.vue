<script setup lang="ts">
import { ref } from 'vue';

const modalRef = ref<HTMLElement | null>(null);

// props로 상태와 함수를 받아옵니다.
defineProps<{
  isVisible: boolean;
  closeModal: () => void;
  showHeader?: boolean;
  headerText?: string;
  showCloseButton?: boolean;
}>();

defineExpose({
  modalRef
});
</script>

<template>
  <div v-if="isVisible" class="modal-box" id="custom-modal-box" ref="modalRef">
    <div class="bg-box" v-if="isVisible" @click="closeModal">
      <div class="text-box" @click.stop>
        <!-- 모달 헤더 -->
        <div v-if="showHeader" class="modal-header">
          <h2>{{ headerText }}</h2>
          <button
            type="button"
            v-if="showCloseButton"
            title="모달 닫기"
            class="close-button"
            @click="closeModal"
          >
            <span class="text">X</span>
          </button>
        </div>

        <!-- 모달 내용 -->
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/modal';
</style>
