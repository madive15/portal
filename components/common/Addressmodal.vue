<script setup lang="ts">
// props로 상태와 함수를 받아옵니다.
defineProps<{
  isVisible: boolean;
  closeModal: () => void;
  showHeader?: boolean;
  headerText?: string;
  showCloseButton?: boolean;
}>();
</script>

<template>
  <div v-if="isVisible" class="modal-box" id="custom-modal-box">
    <div class="bg-box" v-if="isVisible" @click="closeModal">
      <div class="text-box" @click.stop>
        <!-- 모달 헤더 -->
        <div v-if="showHeader" class="modal-header">
          <h5>{{ headerText }}</h5>
          <button
            v-if="showCloseButton"
            class="btn close-button"
            @click="closeModal"
          >
            <img src="/image/sub/login/popup_close.svg" alt="모달 닫기" />
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
@use './scss/Addressmodal';
</style>
