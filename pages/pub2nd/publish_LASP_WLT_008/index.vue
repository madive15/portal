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
      title="대학졸업증명서"
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
                구분
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <a-radio-group>
                  <a-radio class="radio-bx" value="대학(교)">대학(교)</a-radio>
                  <a-radio class="radio-bx" value="대학원(석사)"
                    >대학원(석사)</a-radio
                  >
                  <a-radio class="radio-bx" value="대학원(박사)"
                    >대학원(박사)</a-radio
                  >
                </a-radio-group>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                대학교(대학원)
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <div class="form-item__addr">
                  <div class="item-column">
                    <a-form-item
                      label="대학교(대학원)"
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
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"
                >전공학과
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <a-form-item
                  name=""
                  label="전공학과"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt"
                >발급 종류 및 부수
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <div class="space-between">
                  <div>
                    <strong>국문</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="국문 발급 부수"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span>부</span>
                    </div>
                  </div>
                  <div>
                    <strong>영문</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="영문 발급 부수"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span>부</span>
                    </div>
                  </div>
                </div>
                <BullList type="dot">
                  <li>
                    여러 부수를 한 번에 신청하셔도 업무처리비는 동일합니다.
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">업무처리비 </span>
              <div class="inner">
                <div class="space-between">
                  <div>
                    <strong>국문</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="국문 업무처리비"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" readonly />
                      </a-form-item>
                      <span>원</span>
                    </div>
                  </div>
                  <div>
                    <strong>영문</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="영문 업무처리비"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" readonly />
                      </a-form-item>
                      <span>원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">
                수령기관
                <span class="red-span">
                  *<span class="sr-only">필수 입력 항목</span>
                </span>
              </span>
              <div class="inner">
                <div class="form-item__addr">
                  <div class="item-column">
                    <a-form-item
                      label="수령기관"
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
                <BullList type="dot">
                  <li>수령기관별 업무처리비가 다릅니다.</li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">수수료 </span>
              <div class="inner">
                <div class="space-between">
                  <div>
                    <strong>부수</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="발급 부수"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" readonly />
                      </a-form-item>
                      <span>부</span>
                    </div>
                  </div>
                  <div>
                    <strong>처리비</strong>
                    <div class="form-txt-box">
                      <a-form-item
                        name=""
                        label="처리비"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" readonly />
                      </a-form-item>
                      <span>원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">합계 </span>
              <div class="inner">
                <div class="form-txt-box">
                  <a-form-item
                    name=""
                    label="합계"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" readonly />
                  </a-form-item>
                  <span>원</span>
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
