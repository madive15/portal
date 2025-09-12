<script setup lang="ts">
const number = defineModel({
  type: String,
  default: '--'
});

const props = defineProps({
  cdGroupId: {
    type: String,
    required: true
  }
});

const commonCodeStore = useCommonCodeStore();

const { data: codeList } = useQuery({
  queryKey: ['code', props.cdGroupId],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const first = computed({
  get() {
    const numbers = number.value.split('-');
    return numbers[0];
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(0, 1, newValue);
    number.value = numbers.join('-');
  }
});

const second = computed({
  get() {
    const numbers = number.value.split('-');
    return numbers[1];
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(1, 1, newValue);
    number.value = numbers.join('-');
  }
});

const third = computed({
  get() {
    const numbers = number.value.split('-');
    return numbers[2];
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(2, 1, newValue);
    number.value = numbers.join('-');
  }
});
</script>

<template>
  <div class="cellphone-box">
    <label for="phone-input1">
      <span class="sr-only">선택</span>
    </label>
    <select
      class="form-select number-select"
      title="휴대전화 식별번호"
      v-model="first"
    >
      <option value="">선택</option>
      <option
        :key="`select-code-${mbrMblTelnoCode.value}`"
        :value="mbrMblTelnoCode.value"
        v-for="mbrMblTelnoCode in codeList"
      >
        {{ mbrMblTelnoCode.label }}
      </option>
    </select>
    <span class="dash">-</span>
    <label for="phone-input2">
      <span class="sr-only">휴대전화 가운데 자리</span>
    </label>
    <a-input
      type="text"
      id="phone-input2"
      class="text-bx"
      maxlength="4"
      v-model:value="second"
    />
    <span class="dash">-</span>
    <label for="phone-input3">
      <span class="sr-only">휴대전화 마지막 자리</span>
    </label>
    <a-input
      type="text"
      id="phone-input3"
      class="text-bx"
      maxlength="4"
      v-model:value="third"
    />
  </div>
</template>

<style scoped lang="scss">
@use './scss/EasyAuthTelNumInput';
</style>
