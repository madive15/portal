<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'pub2nd'
});

const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>
    <CommonModal
      ref="modalRef"
      title="서식 미리보기"
      :width="1280"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">닫기</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <div class="img-box">
          <img src="/image/sub/mypage/temp_img.jpg" alt="서식 미리보기" />
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
