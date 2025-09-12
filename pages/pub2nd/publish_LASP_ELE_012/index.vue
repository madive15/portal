<script setup lang="ts">
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

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
      title="전자접수시스템 구비서류 전자증명서 제출안내"
      :width="720"
      :full="true"
    >
      <div class="body-cont-wrap">
        <div class="top-info-box">
          <span class="ico-box"></span>
          <span class="txt-box">
            전자접수 신청 사건의 구비서류(주민등록등본 등)를
            <br class="pc-only" />전자증명서로 편리하게 제출할 수 있습니다.
          </span>
        </div>
        <CommonTitle tag="h2" size="1" type="circle"> 준비사항 </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>법률구조 플랫폼 회원 가입</li>
            <li>전자접수 신청서 작성 및 임시저장</li>
            <li>법률구조 플랫폼 전자증명서 앱(APP) 설치</li>
          </BullList>
        </div>
        <CommonTitle tag="h2" size="1" type="circle" class="mt-40px">
          전자증명서 제출방법
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="number" number-style="encode" class="!gap-y-4px">
            <li class="!text-[16px] !text-[#222]">
              전자접수 신청서 작성 및 임시저장
            </li>
            <li class="!text-[16px] !text-[#222]">
              [법률구조 플랫폼 앱(APP)”]실행 및 로그인
            </li>
            <li class="!text-[16px] !text-[#222]">
              전자접수 신청사건 선택(전자접수 사건이 임시저장되어야 보임)
            </li>
            <li class="!text-[16px] !text-[#222]">
              제출전 증명서 선택 후 제출버튼 클릭(미발급 시 발급 후 제출)
            </li>
            <li class="!text-[16px] !text-[#222]">
              법률구조 플랫폼 홈페이지에서 작성완료 후 전자서명 버튼 클릭
            </li>
            <li class="!text-[16px] !text-[#222]">
              알림톡 수신된 전자서명(싸인오케이) 확인 및 서명 후 제출
            </li>
          </BullList>
          <BullList type="refMark" class="!mt-4px">
            <li class="!text-[16px] !text-[#222]">
              전자서명을 제출해야 전자접수 신청이 완료됩니다.
            </li>
          </BullList>
        </div>
      </div>

      <template #footer>
        <CommonButton
          variants="primary"
          width="md"
          height="md"
          @click="modalRef?.close()"
        >
          확인
        </CommonButton>
      </template>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
