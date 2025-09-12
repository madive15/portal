<script setup lang="ts">
import { computed, ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ko } from './utils/datepicker-locale-ko';
import axios from 'axios';
import dayjs from 'dayjs';
// 달력 상단 제목: "6월", "7월"
// const monthTitle = (date: Date) => `${date.getMonth() + 1}월`;
const today = new Date();
const twoMonthsLater = new Date(today);
twoMonthsLater.setMonth(today.getMonth() + 2);

// const dayjsToday = dayjs();
// const oneMonthAgo = computed(() => dayjsToday.subtract(0, 'month'));
// const oneMonthLater = computed(() => dayjsToday.add(1, 'month'));

// 날짜 범위 선택
const selectedRange = ref<[Date] | null>(null);

const props = defineProps<{
  eventTab: string;
  modelValue: string | null;
}>();

const selectDate = defineModel({
  type: String,
  default: ''
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

// ✅ Datepicker 열기 위한 ref
const dpRef = ref();

// 이벤트 날짜들
// const eventDates = [
//   new Date('2025-06-25'),
//   new Date('2025-06-27'),
//   new Date('2025-07-17')
// ];

const eventDates = ref<Date[]>([]);
const holidays = ref<Date[]>([]);

const fetchHoliday = async () => {
  const holidayList = await axios.get('/api/holidays');

  eventDates.value = holidayList.data.map((str) => new Date(str));
  holidays.value = holidayList.data.map((str) => new Date(str));
};

const fetchSchedule = async () => {
  const today = new Date().toISOString().split('T')[0];
  // const ableSchedule = await axios.get('/api/schedule-count', {
  //   params: {
  //     date: today,
  //     cd: props.eventTab
  //   }
  // });
  //
  // console.log(ableSchedule);
};

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

    fetchHoliday();

    fetchSchedule();

    // 디폴트 날짜
    if (!selectDate.value) {
      selectDate.value = today.toISOString().slice(0, 10);
    }

    // emit('update:modelValue', selectDate.value);
    emit('update:modelValue', today.toISOString().split('T')[0]);
  });
});

watch(selectedRange, (val) => {
  let dateObj: Date | null = null;
  if (Array.isArray(val) && val[0] instanceof Date) {
    dateObj = val[0];
  } else if (val instanceof Date) {
    dateObj = val;
  }
  if (dateObj) {
    const formatted = dateObj.toISOString().slice(0, 10);
    emit('update:modelValue', formatted);
  }
});

watch(
  () => props.eventTab,
  async (newTab) => {
    if (!newTab) return;

    fetchSchedule();
  }
);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      selectedRange.value = [new Date(val)];
    } else {
      selectedRange.value = null;
    }
  },
  { immediate: true }
);

watch(selectDate, (newVal) => {
  emit('update:modelValue', newVal);
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
        :range="false"
        :close-on-auto-apply="false"
        :enable-time-picker="false"
        :locale="ko"
        :highlight="eventDates"
        :disabled-dates="eventDates"
        :inline="true"
        :min-date="today"
        :max-date="twoMonthsLater"
        format="yyyy-MM-dd"
      />
    </div>
  </div>
</template>

<style scoped></style>
