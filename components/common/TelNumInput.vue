<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useVerifyStore } from '~/stores/login/verify';

const number = defineModel({
  type: String,
  default: '--'
});

const verifyStore = useVerifyStore();
const { certNumVerify } = storeToRefs(verifyStore);

const props = defineProps({
  cdGroupId: {
    type: String,
    required: true
  },
  certifyYn: String,
  readonly: String
});

const commonCodeStore = useCommonCodeStore();

const { data: codeList } = useQuery({
  queryKey: ['code', props.cdGroupId],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const first = computed({
  get() {
    if (number.value) {
      const numbers = number.value.split('-');
      return numbers[0];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(0, 1, newValue);
    number.value = numbers.join('-');
  }
});

const second = computed({
  get() {
    if (number.value) {
      const numbers = number.value.split('-');
      return numbers[1];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(1, 1, newValue);
    number.value = numbers.join('-');
  }
});

const third = computed({
  get() {
    if (number.value) {
      const numbers = number.value.split('-');
      return numbers[2];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = number.value.split('-');
    numbers.splice(2, 1, newValue);
    number.value = numbers.join('-');
  }
});

const firstTelNo = ref();
const secondTelNo = ref();
const thirdTelNo = ref();

const focus = () => {
  if (second.value === undefined || second.value.length < 3) {
    return secondTelNo.value.focus();
  } else {
    return thirdTelNo.value.focus();
  }
};

const firstFocus = () => {
  return firstTelNo.value.focus();
};

const firstLabel =
  props.cdGroupId === 'CO0017' ? '휴대전화 식별번호' : '일반전화 지역번호';
const secondLabel =
  props.cdGroupId === 'CO0017'
    ? '휴대전화 가운데 자리'
    : '일반전화 가운데 자리';
const thirdLabel =
  props.cdGroupId === 'CO0017'
    ? '휴대전화 마지막 자리'
    : '일반전화 마지막 자리';

const idSel = props.cdGroupId === 'CO0017' ? 'mbPhone' : 'phone';
defineExpose({
  focus,
  firstFocus,
  first
});
</script>

<template>
  <div class="cellphone-box">
    <label :for="`${idSel}-sel`">
      <span class="sr-only">{{ firstLabel }}</span>
    </label>
    <select
      :id="`${idSel}-sel`"
      class="form-select number-select"
      v-model="first"
      :disabled="
        certNumVerify.certNumVerify ||
        props.certifyYn == 'Y' ||
        props?.readonly == 'Y'
      "
      ref="firstTelNo"
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
    <label :for="`${idSel}-input2`">
      <span class="sr-only">{{ secondLabel }}</span>
    </label>
    <input
      type="text"
      class="form-control cellphone-input2"
      :id="`${idSel}-input2`"
      maxlength="4"
      v-model="second"
      :disabled="certNumVerify.certNumVerify || props.certifyYn == 'Y'"
      ref="secondTelNo"
      :readonly="props?.readonly == 'Y'"
    />
    <span class="dash">-</span>
    <label :for="`${idSel}-input3`">
      <span class="sr-only">{{ thirdLabel }}</span>
    </label>
    <input
      type="text"
      class="form-control cellphone-input3"
      :id="`${idSel}-input3`"
      maxlength="4"
      v-model="third"
      :disabled="certNumVerify.certNumVerify || props.certifyYn == 'Y'"
      :readonly="props?.readonly == 'Y'"
      ref="thirdTelNo"
    />
  </div>
</template>

<style scoped lang="scss">
@use './scss/TelNumInput';
</style>
