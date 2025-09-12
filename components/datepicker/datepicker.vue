<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';

const props = defineProps<{
  modelValue: string | null;
  format?: string;
  placeholder: string | null;
}>();

const emit = defineEmits(['update:modelValue']);

let datePickerInstance: any = null;
const datePickerInput = ref<HTMLInputElement | null>(null);
const datePickerContainer = ref<HTMLDivElement | null>(null);

const formatDate = (dateObj: Date | null, format: string): string => {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }
  const year = dateObj.getFullYear();
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const day = `0${dateObj.getDate()}`.slice(-2);

  switch (format) {
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;

    default:
      return dateObj.toISOString().split('T')[0];
  }
};

const formattedValue = computed(() => {
  if (props.modelValue) {
    const dateObj = new Date(props.modelValue);
    return formatDate(dateObj, props.format || 'yyyy-MM-dd');
  }
  return '';
});

onMounted(async () => {
  if (
    import.meta.client &&
    datePickerContainer.value &&
    datePickerInput.value
  ) {
    const { default: DatePicker } = await import('tui-date-picker');
    await import('tui-date-picker/dist/tui-date-picker.min.css');
    datePickerInstance = new DatePicker(datePickerContainer.value, {
      date: props.modelValue ? new Date(props.modelValue) : undefined,
      input: {
        element: datePickerInput.value,
        format: props.format || 'yyyy-MM-dd'
      },
      showAlways: false,
      autoClose: true,
      language: 'ko'
    });

    datePickerInstance.on('change', () => {
      const selectedDate = datePickerInstance.getDate();
      const formattedDate = formatDate(
        selectedDate,
        props.format || 'yyyy-MM-dd'
      );

      emit('update:modelValue', formattedDate);

      if (datePickerInput.value) {
        datePickerInput.value.value = formattedDate;
      }
    });
  }
});

onBeforeUnmount(() => {
  if (datePickerInstance) {
    datePickerInstance.destroy();
    datePickerInstance = null;
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (datePickerInstance) {
      const dateObj = newValue ? new Date(newValue) : null;
      if (dateObj && !isNaN(dateObj.getTime())) {
        datePickerInstance.setDate(dateObj);
      } else {
        datePickerInstance.setNull();
      }
    }
    if (datePickerInput.value) {
      datePickerInput.value.value = formattedValue.value;
    }
  }
);
</script>

<template>
  <div class="date-picker__group">
    <input
      ref="datePickerInput"
      type="text"
      :value="formattedValue"
      :placeholder="placeholder"
      readonly
      class="date-input form-control"
    />
    <div ref="datePickerContainer"></div>
  </div>
</template>

<style scoped>
.date-input {
  width: 200px;
  height: 40px;
  border: solid 1px #dadce1;
  font-size: 15px;
  color: #555;
  letter-spacing: -0.3px;
  box-shadow: none;
  position: relative;
}
</style>
