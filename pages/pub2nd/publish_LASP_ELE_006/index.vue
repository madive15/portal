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

const residentRegNum1 = ref('');
const residentRegNum2 = ref('');

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
      title="건강보험 납입조회"
      :width="720"
      :full="true"
    >
      <div class="body-cont-wrap">
        <div class="form-area">
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">주민등록번호</span>
              <div class="inner">
                <a-input
                  id="ipText"
                  class="text-bx"
                  title="주민등록번호 앞자리 입력"
                  v-model:value="residentRegNum1"
                />
                <span aria-hidden="true">-</span>

                <a-input-password
                  id="ipText2"
                  class="text-bx"
                  title="주민등록번호 뒷자리 입력"
                  v-model:value="residentRegNum2"
                >
                  <template #iconRender="v">
                    <button
                      :title="
                        v
                          ? '주민등록번호 뒷자리 보기'
                          : '주민등록번호 뒷자리 숨기기'
                      "
                    >
                      <eye-two-tone v-if="v" />
                      <eye-invisible-outlined v-else />
                    </button>
                  </template>
                </a-input-password>
              </div>
            </div>

            <CommonButton variants="line-blue" width="xs" height="md">
              조회
            </CommonButton>
          </div>
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
