<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useVerifyStore } from '~/stores/login/verify';

const props = defineProps({
  modelValue: {
    type: String,
    default: '-'
  }
});
const emit = defineEmits(['update:modelValue']);

const number = computed({
  get: () => telephoneNumber(props.modelValue),
  set: (val: string) => emit('update:modelValue', val)
});

const first = computed({
  get() {
    if (number.value !== null) {
      const numbers = number.value.split('-');
      return numbers[0] || '';
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers[0] = newValue;
    number.value = numbers.join('-');
  }
});

const second = computed({
  get() {
    if (number.value !== null) {
      const numbers = number.value.split('-');
      return numbers[1] || '';
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers[1] = newValue;
    number.value = numbers.join('-');
  }
});

const firstRrno = ref();
const secondRrno = ref();

// 숫자만 입력되도록 필터
const numType = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, '');
};
</script>

<template>
  <div>
    <div class="Rrno-box">
      <label :for="`rrno-input1`">
        <span class="sr-only">주민번호 앞자리</span>
      </label>
      <input
        type="text"
        class="form-control rrno-input1"
        :id="`rrno-input2`"
        maxlength="6"
        v-model="first"
        ref="firstRrno"
        @input="numType"
      />

      <span class="dash">-</span>

      <label :for="`rrno-input2`">
        <span class="sr-only">주민번호 뒷자리</span>
      </label>
      <input
        class="form-control rrno-input2"
        :id="`rrno-input2`"
        maxlength="7"
        v-model="second"
        ref="secondRrno"
        @input="numType"
        type="password"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/RrnoInput';
</style>
