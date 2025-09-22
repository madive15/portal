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
  year: '',
  gi: '',
  year2: '',
  gi2: ''
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
      title="부가가치세과세표준증명"
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
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                사업자등록번호
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner resident-number">
                <a-input class="text-bx" title="사업자등록번호 앞자리 입력" />
                <span aria-hidden="true">-</span>
                <a-input class="text-bx" title="사업자등록번호 가운데 입력" />
                <span aria-hidden="true">-</span>
                <a-input class="text-bx" title="사업자등록번호 뒷자리 입력" />
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
                주민(법인)등록번호 공개여부
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <a-radio-group>
                  <a-radio class="radio-bx" value="공개">공개</a-radio>
                  <a-radio class="radio-bx" value="비공개">비공개</a-radio>
                </a-radio-group>
                <BullList type="dot">
                  <li>비공개 선택 시 출력 예 : 800101-*******</li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"
                >과세기간
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <div class="space-between">
                  <div>
                    <strong>과세시작년도</strong>
                    <div class="form-txt-box">
                      <a-select
                        v-model:value="form.year"
                        class="common-select"
                        title="시작 년도 선택"
                      >
                        <a-select-option value="2025">2025</a-select-option>
                        <a-select-option value="2024">2024</a-select-option>
                      </a-select>
                      <span>년</span>
                      <a-select
                        v-model:value="form.gi"
                        class="common-select"
                        title="시작 기 선택"
                      >
                        <a-select-option value="1">1</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                      </a-select>
                      <span>기</span>
                    </div>
                  </div>
                  <div>
                    <strong>과세종료년도</strong>
                    <div class="form-txt-box">
                      <a-select
                        v-model:value="form.year2"
                        class="common-select"
                        title="종료 년도 선택"
                      >
                        <a-select-option value="2025">2025</a-select-option>
                        <a-select-option value="2024">2024</a-select-option>
                      </a-select>
                      <span>년</span>
                      <a-select
                        v-model:value="form.gi2"
                        class="common-select"
                        title="종료 기 선택"
                      >
                        <a-select-option value="1">1</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                      </a-select>
                      <span>기</span>
                    </div>
                  </div>
                </div>
                <BullList type="dot">
                  <li>
                    2013년 이후분에 대한 간이과세자의 과세표준증명원은
                    과세기간을 "1기"로 선택
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"
                >발급희망개업일자
                <span class="select-span">(선택)</span>
              </span>
              <div class="inner">
                <a-form-item
                  name=""
                  label="발급희망개업일자"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" />
                </a-form-item>
                <BullList type="dot">
                  <li>
                    개업일자를 모를 경우 공란으로 신청 후 상단에 표시되는
                    안내확인
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                용도(제출처)
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <div class="form-item__addr">
                  <div class="item-column">
                    <a-form-item
                      label="용도(제출처)"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        readonly
                        placeholder="검색 버튼을 눌러주세요"
                      />
                    </a-form-item>
                    <CommonButton variants="primary">검색</CommonButton>
                  </div>
                </div>
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
