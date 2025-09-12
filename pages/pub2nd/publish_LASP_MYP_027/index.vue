<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VueDatePicker from "@vuepic/vue-datepicker";
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
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
      title="상담예약시간 변경"
      :width="780"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">취소</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="1" type="circle">날짜 조회</CommonTitle>
        <p class="date-description-txt">
          날짜 조회에서 변경 희망일자를 선택한 후 조회해 주세요.<br class="pc-only" />
          해당일에 예약가능한 기관과 시간이 있는 날짜만 선택 가능하며 조회된 희망기관 및 시간을 확인하여 선택 해 주세요.<br />
          ※단, 예약변경 시 동일한  법률상담기관내에서만 변경 가능합니다.
        </p>
        <div class="date-search-box">
          <VueDatePicker
              name="writePeriodStart"
              id="write-period-start"
              :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
              v-model="startDt"
              locale="ko"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :auto-apply="true"
              :clearable="false"
              :transitions="false"
              :highlight-week-days="[0]"
              :week-start="0"
              placeholder="날짜 선택"
              hide-input-icon
          />
          <CommonButton variants="primary" width="xs">조회</CommonButton>
        </div>
        <ul class="date-info-list">
          <li>
            <div class="date-info-cont">
              <div class="info-box">
                <dl class="first">
                  <dt>예약기관</dt>
                  <dd>서울중앙지부</dd>
                </dl>
                <dl>
                  <dt>날짜</dt>
                  <dd>2025년 05월 22일</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>11 : 00</dd>
                </dl>
              </div>
              <CommonButton variants="primary" width="xs" height="sm">선택</CommonButton>
            </div>
          </li>
          <li>
            <div class="date-info-cont">
              <div class="info-box">
                <dl class="first">
                  <dt>예약기관</dt>
                  <dd>서울중앙지부</dd>
                </dl>
                <dl>
                  <dt>날짜</dt>
                  <dd>2025년 05월 22일</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>11 : 00</dd>
                </dl>
              </div>
              <CommonButton variants="primary" width="xs" height="sm">선택</CommonButton>
            </div>
          </li>
          <li>
            <div class="date-info-cont">
              <div class="info-box">
                <dl class="first">
                  <dt>예약기관</dt>
                  <dd>서울중앙지부</dd>
                </dl>
                <dl>
                  <dt>날짜</dt>
                  <dd>2025년 05월 22일</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>11 : 00</dd>
                </dl>
              </div>
              <CommonButton variants="primary" width="xs" height="sm">선택</CommonButton>
            </div>
          </li>
        </ul>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
