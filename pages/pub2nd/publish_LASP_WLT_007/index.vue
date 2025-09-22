<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
import BullList from '~/components/ui/bullList/bullList.vue';

definePageMeta({
  layout: 'pub2nd'
});

// 선택값 상태 분리
const form = reactive({
  city: '',
  district: '',
  issueType: '', // "발급형태 선택(필수)"
  receiveMethod: '' // "수령방법 > 구분(필수)"
});

// 모달 제어
const modalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const showModal = () => modalRef.value?.open();
const closeModal = () => modalRef.value?.close();

onMounted(() => {
  showModal();
});

// 적용 버튼 클릭 예시
const onApply = () => {
  // TODO: 유효성 검사 & 제출 로직
  // console.log(form);
  closeModal();
};
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal
      ref="modalRef"
      title="국가 유공자(유족또는가족)확인서"
      :width="720"
      :full="true"
    >
      <template #footer>
        <CommonButton variants="primary" width="xs" @click="onApply"
          >신청하기</CommonButton
        >
        <CommonButton width="xs" @click="closeModal">취소하기</CommonButton>
      </template>

      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="1" type="circle">신청인 정보</CommonTitle>

        <div class="form-area">
          <p class="form-ess_info">
            <i class="red-span">*</i><span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"> 성명 </span>
              <div class="inner">
                <a-form-item
                  name=""
                  label="성명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" readonly value="장성진" />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"> 주민등록번호 </span>
              <div class="inner resident-number">
                <a-input
                  class="text-bx"
                  title="주민등록번호 앞자리 입력"
                  readonly
                />
                <span aria-hidden="true">-</span>
                <a-input
                  class="text-bx"
                  type="password"
                  readonly
                  title="주민등록번호 뒷자리 입력"
                />
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h2" size="1" type="circle">신청 내용</CommonTitle>

        <div class="form-area">
          <p class="form-ess_info">
            <i class="red-span">*</i><span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                보훈번호
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner resident-number">
                <a-input class="text-bx" title="보훈번호 앞자리 입력" />
                <span aria-hidden="true">-</span>
                <a-input class="text-bx" title="보훈번호 뒷자리 입력" />
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                제출처
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <a-form-item label="제출처" :labelCol="{ class: 'sr-only' }">
                  <a-input class="text-bx" />
                </a-form-item>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h2" size="1" type="circle">수령방법</CommonTitle>

        <div class="form-area">
          <p class="form-ess_info">
            <i class="red-span">*</i><span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <div class="form-box bx-line">
            <div class="form-item">
              <span class="label-txt">
                구분
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <a-radio-group v-model:value="form.receiveMethod">
                  <a-radio class="radio-bx" value="온라인발급(본인출력)"
                    >온라인발급(본인출력)</a-radio
                  >
                  <a-radio class="radio-bx" value="온라인발급(전자문서지갑)"
                    >온라인발급(전자문서지갑)</a-radio
                  >
                  <span>
                    <a-radio class="radio-bx" value="온라인발급(제3자제출)"
                      >온라인발급(제3자제출)</a-radio
                    >
                    <CommonButton height="sm" fontsize="sm">
                      수신인 등록
                      <template #right-icon>
                        <Icon name="shortcut" />
                      </template>
                    </CommonButton>
                  </span>
                </a-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
