<script setup lang="ts">
import { find } from 'lodash-es';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue']);

// 공통 코드 가져오기
const commonCodeStore = useCommonCodeStore();
const { data: codeList } = useQuery({
  queryKey: ['EMAIL_CODE', 'CO0019'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

// 입력 필드 ref
const emailInput = ref();
const emailCdInput = ref();

// 로컬 상태
const localEmail = ref(props.modelValue || '@');

// modelValue가 외부에서 변경되면 localEmail에도 반영
watch(
  () => props.modelValue,
  (val) => {
    if (val !== localEmail.value) {
      localEmail.value = val || '@';
    }
  }
);

// 이메일 앞자리
const mbrEmlAddr = computed({
  get: () => localEmail.value.split('@')[0] || '',
  set: (val: string) => {
    const domain = dmnEmlAddr.value;
    localEmail.value = `${val}@${domain}`;
    emit('update:modelValue', localEmail.value);
  }
});

// 이메일 도메인
const dmnEmlAddr = computed({
  get: () => localEmail.value.split('@')[1] || '',
  set: (val: string) => {
    const id = mbrEmlAddr.value;
    localEmail.value = `${id}@${val}`;
    emit('update:modelValue', localEmail.value);
  }
});

// 도메인 코드 (select)
const dmnEmlAddrCd = ref('');

watch(dmnEmlAddrCd, (newValue) => {
  if (!newValue) {
    dmnEmlAddr.value = '';
  } else {
    const item = find(codeList.value, (item) => item.value === newValue);
    if (item?.label) {
      dmnEmlAddr.value = item.label;
    }
  }
});

// 포커스 외부 노출
const focus = () => emailInput.value?.focus?.();
const focus2 = () => emailCdInput.value?.focus?.();
defineExpose({ focus, focus2 });

// 이메일 아이디 형식 체크
const emailIdType = (event) => {
  const raw = event.target.value;
  // 영문자, 숫자, 특수문자만 허용하는 정규 표현식
  const filtered = raw.replace(/[^a-zA-Z0-9._-]/g, '');
  if (raw !== filtered) {
    event.target.value = filtered;
  }
  mbrEmlAddr.value = filtered;
};
</script>

<template>
  <div class="form-item__email">
    <!-- 이메일 아이디 -->
    <!--    <label for="emailhead1"
      ><span class="sr-only">이메일 아이디 입력</span></label
    >-->
    <a-form-item
      name="emailhead1"
      label="이메일 아이디 입력"
      :labelCol="{ class: 'sr-only' }"
    >
      <a-input
        class="text-bx"
        id="emailhead1"
        v-model:value="mbrEmlAddr"
        ref="emailInput"
        placeholder="이메일 입력"
        :maxlength="200"
        @input="emailIdType"
      />
    </a-form-item>
    <span class="dash">@</span>

    <!-- 이메일 도메인 직접입력 -->
    <!--    <label for="emailend2"><span class="sr-only">이메일 주소 입력</span></label>-->
    <a-form-item
      name="emailend2"
      label="이메일 도메인 입력"
      :labelCol="{ class: 'sr-only' }"
    >
      <a-input
        class="text-bx"
        id="emailend2"
        :disabled="!!dmnEmlAddrCd"
        v-model:value="dmnEmlAddr"
        ref="emailCdInput"
      />
    </a-form-item>
    <!-- 이메일 도메인 선택 -->
    <!--    <label for="emailend3"
      ><span class="sr-only">이메일 도메인 선택</span></label
    >-->
    <a-form-item
      name="emailend3"
      label="이메일 도메인 선택"
      :labelCol="{ class: 'sr-only' }"
    >
      <a-select
        class="common-select"
        id="emailend3"
        v-model:value="dmnEmlAddrCd"
        style="width: 150px"
        placeholder="도메인 선택"
      >
        <a-select-option value="">직접입력</a-select-option>
        <a-select-option
          v-for="code in codeList"
          :key="code.value"
          :value="code.value"
        >
          {{ code.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<style scoped lang="scss">
@use './scss/EmailInput';
</style>
