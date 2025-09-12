<script setup lang="ts">
// props로 상태와 함수를 받아옵니다.
defineProps<{
  isVisible: boolean;
  closeModal: () => void;
}>();
</script>

<template>
  <div v-if="isVisible" class="modal-box" id="custom-modal-box">
    <div class="bg-box" v-if="isVisible" @click="closeModal">
      <div class="text-box" @click.stop>
        <div class="content-header">
          <slot> </slot>
        </div>
        <slot>
          <p>
            이미 가입되어 있는 정보입니다.<br />
            로그인이나 아이디 찾기를<br />
            진행하여 주시기 바랍니다.
          </p>
          <button class="btn confirm-button" @click="closeModal">확인</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/headermodal';
</style>
