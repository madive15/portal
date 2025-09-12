<script setup lang="ts">
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';
import { ref } from 'vue';

const modalRef = ref<HTMLElement | null>(null);

// props로 상태와 함수를 받아옵니다.
defineProps<{
  isVisible: boolean;
  closeModal: () => void;
  showHeader?: boolean;
  headerText?: string;
  headeretctitle?: string;
  showCloseButton?: boolean;
  dateText?: string;
  showDateHeader?: boolean;
  modalClass?: string;
  headeretcClass?: string;
}>();

defineExpose({
  modalRef
});
</script>

<template>
  <use-focus-trap v-if="isVisible">
    <div
      :class="['modal-box', modalClass]"
      id="custom-modal-box"
      ref="modalRef"
    >
      <div class="bg-box">
        <!-- 접근성 이슈로 @click="closeModal" 제거 -->
        <div class="text-box">
          <!-- 모달 헤더 -->
          <div v-if="showHeader" class="modal-header">
            <h1 v-if="headerText">{{ headerText }}</h1>
            <h2
              v-if="headeretctitle"
              :class="['modal-etc-title', headeretcClass]"
            >
              {{ headeretctitle }}
            </h2>
          </div>

          <!-- ai 모달 날짜 포함 헤더 -->

          <div v-if="showDateHeader" class="modal-header ai-modal-header">
            <div class="ai-modal-title-box">
              <h1>{{ headerText }}</h1>
              <span v-if="dateText" class="ai-date-span">{{ dateText }}</span>
            </div>
          </div>

          <!-- 모달 내용 -->
          <div class="modal-body">
            <slot></slot>
          </div>
          <button
            type="button"
            title="팝업 닫기"
            v-if="showCloseButton"
            class="btn close-button"
            @click="closeModal"
          >
            <span class="sr-only">팝업 닫기</span>
          </button>
        </div>
      </div>
    </div>
  </use-focus-trap>
</template>

<style scoped lang="scss">
@use './scss/Newmodal';
</style>
