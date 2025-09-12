<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
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
const myName = ref('');
const healthIns = ref('');

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
      title="가구당 월평균 소득"
      :width="720"
      :full="true"
    >
      <template #footer>
        <CommonButton variants="primary" width="xs">적용</CommonButton>
        <CommonButton width="xs"> 닫기 </CommonButton>
      </template>
      <div class="body-cont-wrap">
        <div class="form-area">
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">성명</span>
              <div class="inner">
                <a-input
                  id="ipText"
                  class="text-bx"
                  title="성명 입력"
                  v-model:value="myName"
                />
              </div>
            </div>
            <div class="form-item">
              <span class="label-txt">건강보험료</span>
              <div class="inner">
                <a-input
                  id="ipText"
                  class="text-bx"
                  title="건강보험료 입력"
                  v-model:value="healthIns"
                />
              </div>
            </div>
            <CommonButton variants="line-blue" width="sm-1" height="md">
              계산하기
            </CommonButton>
          </div>
          <p class="form-info-txt bul-refer">
            건강보험료 입력시
            <strong class="txt">노인장기요양보험료를 제외한 금액</strong>을
            입력하세요.
          </p>
          <div class="form-footer">
            <p>월 소득은 <span class="price">999,999,999</span>원 입니다.</p>
          </div>
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
