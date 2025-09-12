<script setup lang="ts">
import { ref, computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ko } from './utils/datepicker-locale-ko';
import CalendarModal from '~/components/ui/calendar/calendarModal.vue';
import dayjs from 'dayjs';

// 달력 상단 제목: "6월", "7월"
// const monthTitle = (date: Date) => `${date.getMonth() + 1}월`;

// const today = new Date();
// const twoMonthsLater = new Date(today);
// twoMonthsLater.setMonth(today.getMonth() + 2);

const dayjsToday = dayjs();
const oneMonthAgo = computed(() => dayjsToday.subtract(0, 'month'));
const oneMonthLater = computed(() => dayjsToday.add(1, 'month'));
// console.log(
//   oneMonthAgo.value.format('YYYY-MM-DD'),
//   oneMonthLater.value.format('YYYY-MM-DD'),
//   '!!!'
// );

// 날짜 범위 선택
const selectedRange = ref<[Date, Date] | null>(null);

// ✅ Datepicker 열기 위한 ref
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

const props = defineProps<{
  modelValue: [Date, Date] | null;
  defaultBgng?: string;
  defaultEnd?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', payload: [string, string] | null): void;
}>();

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

// 날짜 string
// const bgngYmd = computed(() => {
//   const bgng = selectedRange.value?.[0];
//   if (!bgng) return '시작일 선택';
//   const yoil = dayNames[bgng.getDay()];
//   return `${bgng.getFullYear()}-${bgng.getMonth() + 1}-${bgng.getDate()}(${yoil})`;
// });
//
// const endYmd = computed(() => {
//   const end = selectedRange.value?.[1];
//   if (!end) return '종료일 선택';
//   const yoil = dayNames[end.getDay()];
//   return `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}(${yoil})`;
// });

// Datepicker 열기
const isExpanded = ref(false);
const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

// Calendar Layer 밖에 클릭 하면 Layer 닫기
const clickOutside = (e: Event) => {
  if (dpRef.value && !dpRef.value?.contains(e.target as Node)) {
    // Layer가 열려있고 선택된 날짜가 있을 때만 emit
    // if (isExpanded.value && selectedRange.value) {
    //   emit('closed', bgngYmd.value, endYmd.value);
    // }
    isExpanded.value = false;
  }
};

// 화면 로딩 시
onMounted(() => {
  document.addEventListener('click', clickOutside);
  document.addEventListener('keydown', clickOutside);

  // 디폴트 날짜 set
  const today = new Date();
  const endDay = new Date();
  endDay.setDate(today.getDate() + 30);

  selectedRange.value = [today, endDay];
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

const confirmedRange = ref<[Date, Date] | null>(null);

const startDate = computed(() => confirmedRange.value?.[0] || null);
const endDate = computed(() => confirmedRange.value?.[1] || null);

const onDateConfirmed = (range: [Date, Date]) => {
  confirmedRange.value = range;
};

// emit 날짜 format
const formatDateWithDay = (date: Date): string => {
  const format = date.toISOString().slice(0, 10);
  // const yoil = dayNames[date.getDay()];
  // return `${format}(${yoil})`;
  return `${format}`;
};

watch(
  () => props.modelValue,
  (val) => {
    if (val && val[0] && val[1]) {
      selectedRange.value = [new Date(val[0]), new Date(val[1])];
    } else {
      selectedRange.value = null;
    }
  },
  { immediate: true }
);

watch(selectedRange, (val) => {
  if (val) {
    const bgngDate = formatDateWithDay(val[0]);
    const endDate = formatDateWithDay(val[1]);
    emit('update:modelValue', [bgngDate, endDate]);
  } else {
    emit('update:modelValue', null);
  }
});

// wheel 이벤트 차단
// onMounted(() => {
//   nextTick(() => {
//     const rootEl = document.body;

//     if (rootEl) {
//       const allScrollEls = rootEl.querySelectorAll('[class^="dp__"]');

//       allScrollEls.forEach((el: Element) => {
//         el.addEventListener('wheel', (e) => e.stopImmediatePropagation(), {
//           passive: false
//         });
//       });
//     }
//   });
// });

/**
 * 부모에서 접근 가능하도록 expose
 */
defineExpose({
  isExpanded
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
          format="yyyy-MM-dd"
          :config="{}"
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
