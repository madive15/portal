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
      title="전자접수심사"
      :width="770"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">닫기</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <div class="common-form__area">
          <table>
            <caption>접수심사의 심사결정일자, 승인여부, 심사결정내용에 관한 표</caption>
            <tbody>
              <tr>
                <th scope="row">심사결정일자</th>
                <td class="title-td">2025-05-23</td>
              </tr>
              <tr>
                <th scope="row">승인여부</th>
                <td class="title-td">승인</td>
              </tr>
              <tr>
                <th scope="row">심사결정내용</th>
                <td class="title-td">
                  접수한 신청서를 검토결과 구조접수를 진행하기로 했습니다.
                  다음 절차에 따라서 진행 예정입니다.
                  진행절차
                  ~~~~`
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CommonModal>
  </div>
  <!-- 여기부터 모달 컨텐츠 -->
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
