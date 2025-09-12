<script setup lang="ts">
import { ref, computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ko } from './utils/datepicker-locale-ko';
import dayjs, { type Dayjs } from 'dayjs';
import CalendarModal from '~/components/ui/calendar/calendarModal.vue';

interface IProps {
  availableRsvtDates: string[];
}

// 이벤트 날짜들
const eventDates = [
  new Date('2025-06-25'),
  new Date('2025-06-27'),
  new Date('2025-07-01')
];

const props = defineProps<IProps>();
const selectedDates = defineModel<[Date, Date] | null>('selectedDates');
const emits = defineEmits(['selectedDatesRange']);
// 유효 예약 구좌 날짜
const availableRsvtDates = computed(() => {
  return props.availableRsvtDates.map((dateStr) => dayjs(dateStr).toDate());
});

// 달력 상단 제목: "6월", "7월"
// const monthTitle = (date: Date) => `${date.getMonth() + 1}월`;

const today = new Date();
const twoMonthsLater = new Date(today);
twoMonthsLater.setMonth(today.getMonth() + 2);

// ✅ Datepicker 열기 위한 ref
const dpRef = ref();

const dayNames = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
];

// 노출TEXT - 시작일
const startText = computed(() => {
  const start = selectedDates.value?.[0];
  if (!start) return '시작일 선택';
  const yoil = dayNames[start.getDay()];
  return `<div class="bx">
          <p class="bx"> ${start.getFullYear()}년</p>
          <p class="bx">${start.getMonth() + 1}월 ${start.getDate()}일 </p>
          <span class="day">(${yoil})</span>
          </div>`;
});
// 노출TEXT - 종요일
const endText = computed(() => {
  const end = selectedDates.value?.[1];
  if (!end) return '종료일 선택';
  const yoil = dayNames[end.getDay()];
  return `<div class="bx">
          <p>${end.getFullYear()}년</p>
          <p>${end.getMonth() + 1}월 ${end.getDate()}일</p>
          <span class="day">(${yoil})</span>
          </div>`;
});

// Datepicker 열기
const isExpanded = ref(false);
const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

//Calendar Layer 밖에 클릭 하면 Layer 닫기
const clickOutside = (e: MouseEvent | KeyboardEvent) => {
  if (dpRef.value && !dpRef.value?.contains(e.target as Node)) {
    isExpanded.value = false;
    emits('selectedDatesRange');
  }
};

onMounted(() => {
  document.addEventListener('click', clickOutside);
  document.addEventListener('keydown', clickOutside);

  // setDefaultDates();
});
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside);
  document.removeEventListener('keydown', clickOutside);
});

// mo 달력 modal 창 열기
const showCalendarRef = ref();
function openCalendar() {
  showCalendarRef.value?.openModal();
}

// For mobile Start
const confirmedRange = ref<[Date, Date] | null>(null);

const startDate = computed(() => confirmedRange.value?.[0] || null);
const endDate = computed(() => confirmedRange.value?.[1] || null);

const onDateConfirmed = (range: [Date, Date]) => {
  confirmedRange.value = range;
};
// For mobile End

// wheel 이벤트 차단
onMounted(() => {
  nextTick(() => {
    const rootEl = document.body;

    if (rootEl) {
      const allScrollEls = rootEl.querySelectorAll('[class^="dp__"]');

      allScrollEls.forEach((el: Element) => {
        el.addEventListener('wheel', (e) => e.stopImmediatePropagation(), {
          passive: false
        });
      });
    }
  });
});
</script>

<template>
  <div class="calendar-schedule__area pc-visible" ref="dpRef">
    <div class="calendar-wrap">
      <div class="date-select__area">
        <!-- 외부 날짜 클릭 영역 -->
        <button
          type="button"
          class="bx-period"
          @click="toggle"
          style="cursor: pointer"
        >
          <span class="date" v-html="startText"> </span>
          <span class="date" v-html="endText"> </span>
        </button>
      </div>
    </div>
    <!-- Datepicker 본체 (숨기지 않아도 잘 작동) -->
    <div>
      <div class="bx-layer pc-visible" :class="{ active: isExpanded }">
        <Datepicker
          v-model="selectedDates"
          :auto-apply="true"
          :multi-calendars="2"
          :range="true"
          :close-on-auto-apply="false"
          :enable-time-picker="false"
          :highlight="availableRsvtDates"
          :inline="true"
          :min-date="today"
          :max-date="twoMonthsLater"
          format="yyyy-MM-dd"
        />
      </div>
    </div>
  </div>

  <div class="calendar-schedule__area mo-visible">
    <div class="calendar-wrap">
      <div class="date-select__area">
        <!-- 외부 날짜 클릭 영역 -->
        <button
          type="button"
          class="bx-period"
          @click="openCalendar"
          style="cursor: pointer"
        >
          <!-- 시작일 -->
          <span class="date" v-if="startDate">
            <span class="bx">
              <span>{{ startDate.getFullYear() }}년</span>
              <span
                >{{ startDate.getMonth() + 1 }}월
                {{ startDate.getDate() }}일</span
              >
              <span class="day">({{ dayNames[startDate.getDay()] }})</span>
            </span>
          </span>
          <span class="date" v-else> 시작일 선택 </span>
          <!-- 종료일 -->
          <span class="date" v-if="endDate">
            <span class="bx">
              <span>{{ endDate.getFullYear() }}년</span>
              <span
                >{{ endDate.getMonth() + 1 }}월 {{ endDate.getDate() }}일</span
              >
              <span class="day">({{ dayNames[endDate.getDay()] }})</span>
            </span>
          </span>
          <span class="date" v-else>종료일 선택</span>
        </button>
      </div>
    </div>
    <CalendarModal ref="showCalendarRef" @confirm="onDateConfirmed" />
  </div>
</template>
