<script setup lang="ts">
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ko } from './utils/datepicker-locale-ko';
// 달력 상단 제목: "6월", "7월"
// const monthTitle = (date: Date) => `${date.getMonth() + 1}월`;
const today = new Date();
const twoMonthsLater = new Date(today);
twoMonthsLater.setMonth(today.getMonth() + 2);

// 날짜 범위 선택
const selectedRange = ref<[Date, Date] | null>(null);

// ✅ Datepicker 열기 위한 ref
const dpRef = ref();

// 이벤트 날짜들
const eventDates = [
  new Date('2025-06-25'),
  new Date('2025-06-27'),
  new Date('2025-07-01')
];

// wheel 이벤트 차단
onMounted(() => {
  nextTick(() => {
    const rootEl = dpRef.value?.$el;

    if (rootEl) {
      const allScrollEls = rootEl.querySelectorAll('[class^="dp__"]');

      allScrollEls.forEach((el: Element) => {
        el.addEventListener('wheel', (e) => e.stopImmediatePropagation(), {
          passive: false
        });
      });
    }
  });
  console.log('[onMounted - ko]', ko);
});
</script>

<template>
  <div class="calendar-schedule__area">
    <div class="calendar-wrap intv">
      <Datepicker
        ref="dpRef"
        v-model="selectedRange"
        :auto-apply="true"
        :multi-calendars="2"
        :range="true"
        :close-on-auto-apply="false"
        :enable-time-picker="false"
        :locale="ko"
        :highlight="eventDates"
        :inline="true"
        :min-date="today"
        :max-date="twoMonthsLater"
        format="yyyy-MM-dd"
      />
    </div>
  </div>
</template>

<style scoped></style>
