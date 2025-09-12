<script setup lang="ts">
import { find } from 'lodash-es';

const mbrEmlAddr = defineModel('mbrEmlAddr');
const dmnEmlAddr = defineModel('dmnEmlAddr');
const dmnEmlAddrCd = defineModel('dmnEmlAddrCd');

const commonCodeStore = useCommonCodeStore();

const { data: codeList } = useQuery({
  queryKey: ['EMAIL_CODE', 'CO0019'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

watch(dmnEmlAddrCd, (newValue) => {
  if (!newValue) {
    dmnEmlAddr.value = '';
  } else {
    const item = find(
      codeList.value,
      (item) => item.value === (newValue as string)
    );

    dmnEmlAddr.value = item.label;
  }
});

const emailInput = ref();
const emailCdInput = ref();

const focus = () => {
  emailInput.value.focus();
  return;
};

const focus2 = () => {
  return emailCdInput.value.focus();
};

defineExpose({
  focus,
  focus2
});
</script>

<template>
  <div class="email-confirm-box">
    <label for="emailhead1">
      <span class="sr-only">이메일 아이디 입력</span>
    </label>
    <a-input
      class="text-bx"
      id="emailhead1"
      v-model:value="mbrEmlAddr"
      ref="emailInput"
      placeholder="이메일 입력"
      maxlength="200"
    />
    <span class="dash">@</span>
    <label for="emailend2">
      <span class="sr-only">이메일 주소 입력</span>
    </label>
    <a-input
      class="text-bx"
      id="emailend2"
      :disabled="!!dmnEmlAddrCd"
      v-model:value="dmnEmlAddr"
      ref="emailCdInput"
    />

    <label for="emailend3">
      <span class="sr-only">이메일 도메인 선택</span>
    </label>
    <a-select
      class="common-select"
      id="emailend3"
      v-model:value="dmnEmlAddrCd"
      style="width: 150px"
    >
      <a-select-option value="">직접입력</a-select-option>
      <a-select-option :value="code.value" v-for="code in codeList">
        {{ code.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
@use './scss/EmailInput';
</style>
