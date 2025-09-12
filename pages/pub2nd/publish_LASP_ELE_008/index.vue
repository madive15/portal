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

const radioSelected = ref('');
const residentRegNum1 = ref('');
const residentRegNum2 = ref('');
const myName = ref('');
const incomeScore = ref('');
const annualIncome = ref('');

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
      title="구조대상자 해당여부 계산하기(지역가입자 또는 건강보험 미가입자)"
      :width="720"
      :full="true"
    >
      <template #footer>
        <CommonButton variants="primary" width="xs">적용</CommonButton>
        <CommonButton width="xs"> 닫기 </CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="1" type="circle">
          구조대상자 해당여부 계산하기<br class="mo-only" />(지역가입자 또는
          건강보험 미가입자)
        </CommonTitle>

        <div class="form-area">
          <div class="form-box bx-line">
            <div class="form-item">
              <span class="label-txt">구분</span>
              <div class="inner">
                <a-radio-group v-model:value="radioSelected">
                  <a-radio class="radio-bx" value="지역가입자"
                    >지역가입자</a-radio
                  >
                  <a-radio class="radio-bx" value="건강보험미가입자"
                    >건강보험미가입자</a-radio
                  >
                  <a-radio class="radio-bx" value="건강보험미가입자(피부양자)"
                    >건강보험미가입자(피부양자)</a-radio
                  >
                </a-radio-group>
              </div>
            </div>
          </div>
          <!-- 지역가입자 선택 할 경우 노출 -->
          <div class="form-box bx-line">
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
          <!-- 건강보험미가입자 & 건강보험미가입자(피부양자) 선택 할 경우 노출 -->
          <div class="form-box bx-line">
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
              <span class="label-txt">소득점수</span>
              <div class="inner">
                <a-input
                  id="ipText"
                  class="text-bx"
                  title="소득점수 입력"
                  v-model:value="incomeScore"
                />
              </div>
            </div>
            <div class="form-item">
              <span class="label-txt">연소득</span>
              <div class="inner">
                <a-input
                  id="ipText"
                  class="text-bx"
                  title="연소득 입력"
                  v-model:value="annualIncome"
                />
              </div>
            </div>
          </div>
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
