<script setup lang="ts">
import { ko } from '~/components/ui/calendar/utils/datepicker-locale-ko';
import Datepicker from '@vuepic/vue-datepicker';

// 📌 달력 상단 제목: "6월", "7월"
// const monthTitle = (date: Date) => `${date.getMonth() + 1}월`;

const today = new Date();
const twoMonthsLater = new Date(today);
twoMonthsLater.setMonth(today.getMonth() + 2);

// 날짜 범위 선택
type DateRange = [Date, Date] | null;
const selectedRange = ref<DateRange>(null);

// Datepicker 열기 위한 ref
const dpRef = ref();

// 이벤트 날짜들
const eventDates = [
  new Date('2025-06-25'),
  new Date('2025-06-27'),
  new Date('2025-07-01')
];

const dayNames = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
];

// 날짜 쪼개기
const startText = computed(() => {
  const start = selectedRange.value?.[0];
  if (!start) return '시작일 선택';
  const yoil = dayNames[start.getDay()];
  return `<div class="bx">
          <p class="bx"> ${start.getFullYear()}년</p>
          <p class="bx">${start.getMonth() + 1}월 ${start.getDate()}일 </p>
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

// 확인 버튼 클릭 → emit 실행
function handleCancel() {
  if (selectedRange.value) {
    console.log('🎯 자식 emit 실행:', selectedRange.value);
    emit('confirm', selectedRange.value);
  }
  isVisible.value = false;
}

const isVisible = ref(false);
function openModal() {
  isVisible.value = true;
}
defineExpose({ openModal });

// 이슈: 모달창 안에 달력  마우스 wheel ,touchmove  이벤트 실행 안되게 코드 추가 했지만 실행되고 있음
onMounted(() => {
  nextTick(() => {
    const rootEl = dpRef.value?.$el;
    if (!rootEl) return;

    const scrollEls = rootEl.querySelectorAll('.dp__calendar_wrap');

    scrollEls.forEach((el: Element) => {
      ['wheel', 'touchmove'].forEach((eventType) => {
        el.addEventListener(
          eventType,
          (e) => {
            e.stopPropagation();
            e.preventDefault();
          },
          { passive: false }
        );
      });
    });
  });
});
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
      <button type="button" class="btn-basic primary" @click="handleCancel">
        <span class="text">확인</span>
      </button>
    </template>
    <div>
      <div class="calendar-schedule__area">
        <!-- 날짜 선택 시 기간 표시 -->
        <div class="date-select__area">
          <button type="button" class="bx-period">
            <!-- 시작일 -->
            <span class="date" v-html="startText"> </span>
            <!-- 종료일 -->
            <span class="date" v-html="endText"> </span>
          </button>
        </div>
        <div class="calendar-wrap">
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
    </div>
  </a-modal>
</template>

<style scoped></style>
