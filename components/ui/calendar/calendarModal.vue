<script setup lang="ts">
import { ko } from '~/components/ui/calendar/utils/datepicker-locale-ko';
import Datepicker from '@vuepic/vue-datepicker';
import CommonButton from '~/components/ui/button/button.vue';
import { ref, computed, nextTick, watch } from 'vue';
import dayjs from 'dayjs';

// const today = new Date();
// const twoMonthsLater = new Date(today);
// twoMonthsLater.setMonth(today.getMonth() + 2);
const dayjsToday = dayjs();
const oneMonthAgo = computed(() => dayjsToday.subtract(0, 'month'));
const oneMonthLater = computed(() => dayjsToday.add(1, 'month'));

type DateRange = [Date, Date] | null;
const selectedRange = ref<DateRange>(null);
const dpRef = ref();

// 이벤트 날짜들
const eventDates = {
  dates: [
    new Date('2025-06-25'),
    new Date('2025-06-27'),
    new Date('2025-07-26')
  ]
};

const dayNames = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
];

const startText = computed(() => {
  const start = selectedRange.value?.[0];
  if (!start) return '시작일 선택';
  const yoil = dayNames[start.getDay()];
  return `<div class="bx">
    <p class="bx">${start.getFullYear()}년</p>
    <p class="bx">${start.getMonth() + 1}월 ${start.getDate()}일</p>
    <span class="day">(${yoil})</span>
  </div>`;
});

const endText = computed(() => {
  const end = selectedRange.value?.[1];
  if (!end) return '종료일 선택';
  const yoil = dayNames[end.getDay()];
  return `<div class="bx">
    <p>${end.getFullYear()}년</p>
    <p>${end.getMonth() + 1}월 ${end.getDate()}일</p>
    <span class="day">(${yoil})</span>
  </div>`;
});

const emit = defineEmits<{
  (e: 'confirm', payload: [Date, Date]): void;
}>();

function handleCancel() {
  if (selectedRange.value) {
    emit('confirm', selectedRange.value);
  }
  isVisible.value = false;
}

const isVisible = ref(false);
function openModal() {
  isVisible.value = true;
}
defineExpose({ openModal });

/**  모달이 열릴 때 Datepicker DOM 렌더 후 스크롤 이벤트 차단 */
// watch(isVisible, async (val) => {
//   if (!val) return;

//   await nextTick();

//   const rootEl = dpRef.value?.$el;
//   if (!rootEl) return;

//   const scrollEls = rootEl.querySelectorAll(
//     '.dp__calendar, .dp__instance_calendar'
//   );
//   scrollEls.forEach((el: Element) => {
//     ['wheel', 'touchmove'].forEach((eventType) => {
//       el.addEventListener(
//         eventType,
//         (e) => {
//           e.preventDefault();
//           e.stopPropagation();
//         },
//         { passive: false }
//       );
//     });
//   });
// });
</script>

<template>
  <a-modal
    class="common-modal-wrap modal-basic"
    v-model:open="isVisible"
    title="날짜 선택"
    :closable="true"
  >
    <template #closeIcon>
      <span class="sr-only modal-btn__prev">이전</span>
    </template>
    <template #footer>
      <CommonButton
        class="primary"
        width="md"
        height="md"
        @click="handleCancel"
        ti
      >
        확인
      </CommonButton>
    </template>

    <div>
      <div class="calendar-schedule__area">
        <div class="date-select__area">
          <button type="button" class="bx-period">
            <span class="date" v-html="startText"></span>
            <span class="date" v-html="endText"></span>
          </button>
        </div>

        <div class="calendar-wrap">
          <Datepicker
            v-if="isVisible"
            ref="dpRef"
            v-model="selectedRange"
            :auto-apply="true"
            :multi-calendars="2"
            :range="true"
            :close-on-auto-apply="false"
            :enable-time-picker="false"
            locale="ko"
            :highlight="eventDates"
            :inline="true"
            :min-date="oneMonthAgo.format('YYYY-MM-DD')"
            :max-date="oneMonthLater.format('YYYY-MM-DD')"
            :month-change-on-scroll="false"
            prevent-min-max-navigation
            :config="{
              noSwipe: true
            }"
            format="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped></style>
