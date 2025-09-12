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
      title="주민등록등본 발급신청"
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
        <CommonTitle tag="h2" size="1" type="circle">신청 내용</CommonTitle>

        <div class="form-area">
          <div class="form-box bx-line">
            <div class="form-item">
              <span class="label-txt">주민등록상 주소 확인(필수)</span>
              <div class="inner">
                <!-- 시 선택 -->
                <a-select
                  v-model:value="form.city"
                  class="common-select"
                  title="시 선택"
                >
                  <a-select-option value="서울특별시"
                    >서울특별시</a-select-option
                  >
                  <a-select-option value="부산광역시"
                    >부산광역시</a-select-option
                  >
                </a-select>

                <!-- 구/도 선택 -->
                <a-select
                  v-model:value="form.district"
                  class="common-select"
                  title="구/도 선택"
                >
                  <a-select-option value="구로구">구로구</a-select-option>
                  <a-select-option value="강서구">강서구</a-select-option>
                </a-select>
              </div>
              <BullList type="refMark">
                <li class="blue">
                  회원정보 등록된 주소입니다. 주민등록상 주소와 다를 경우
                  변경하세요.
                </li>
              </BullList>
            </div>
          </div>

          <div class="form-box bx-line">
            <div class="form-item">
              <span class="label-txt">발급형태 선택(필수)</span>
              <div class="inner">
                <a-radio-group v-model:value="form.issueType">
                  <a-radio class="radio-bx" value="전체 발급"
                    >전체 발급</a-radio
                  >
                  <a-radio class="radio-bx" value="선택 발급"
                    >선택 발급</a-radio
                  >
                </a-radio-group>
              </div>
              <BullList type="dot">
                <li>
                  과거주소 변동사항을 제외한 모든 정보가 표시됩니다. (예:
                  주민등록번호 뒷자리, 세대 정보 등)
                </li>
              </BullList>
            </div>
          </div>
        </div>

        <CommonTitle tag="h2" size="1" type="circle">수령방법</CommonTitle>

        <div class="form-area">
          <div class="form-box bx-line">
            <div class="form-item">
              <span class="label-txt">구분(필수)</span>
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
                  <a-radio class="radio-bx" value="등기보통우편"
                    >등기보통우편</a-radio
                  >
                  <a-radio class="radio-bx" value="일반보통우편"
                    >일반보통우편</a-radio
                  >
                </a-radio-group>
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
