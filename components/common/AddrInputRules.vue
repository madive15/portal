<script setup lang="ts">
import CommonButton from '~/components/ui/button/button.vue';
import { useModalFocus } from '~/composables/useModalFocus';
import { ref, reactive, defineExpose, watch } from 'vue';
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();

/**
 * name : props
 * desc : 부모창에서 넘겨받는 파라미터를 세팅한다.
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  addr: {
    type: String,
    default: ''
  },
  dAddr: {
    type: String,
    default: ''
  },
  esntlYn: {
    type: String,
    default: 'N'
  }
});
const emit = defineEmits(['update:zip', 'update:addr', 'update:dAddr']);
const daddrRef = ref();
let daddrKey = 0;
watch(
  () => props.dAddr,
  (val) => {
    /*
    console.log('2222');
    daddrRef.value = val;
    //daddrRef.$forceUpdate();
    daddrKey = daddrKey + 1;
    console.log('daddrKey = > ' + daddrKey);
    */
  }
);
/**
 * name : emitZip
 * desc : 주소검색팝업에서 넘겨받은 우편번호를 세팅한다.
 */
const emitZip = computed({
  get: () => props.zip,
  set: (val: string) => emit('update:zip', val)
});

/**
 * name : emitAddr
 * desc : 주소검색팝업에서 넘겨받은 주소를 세팅한다.
 */
const emitAddr = computed({
  get: () => props.addr,
  set: (val: string) => emit('update:addr', val)
});

/**
 * name : emitDaddr
 * desc : 상세주소에서 넘겨받은 상세주소를 세팅한다.
 */
const emitDaddr = computed({
  get: () => props.dAddr,
  set: (val: string) => emit('update:dAddr', val)
});

/**
 * name : watch(open)
 * desc : 주소검색 팝업창의 오픈여부를 체크하여 창을 띄우고 닫는다.
 */
const open = ref(false);
watch(open, (newValue) => {
  if (!newValue) {
    removeModalFocus();
  }
});

/**
 * name : errors
 * desc : 에러 메시지 관리하는 객체
 */
const errors = reactive({
  zip: '',
  daddr: ''
});

/**
 * name: errorMsg
 * desc : 필드 별 에러메시지
 */
const errorMsg = {
  zip: '우편번호는 필수입력 값입니다.',
  daddr: '상세주소는 필수입력 값입니다.'
};

/**
 * name : clearError
 * desc : 필드값 입력 검사 후 에러 설정/해제
 */
const clearError = (field, value) => {
  if (!value.trim()) {
    errors[field] = errorMsg[field];
  } else {
    errors[field] = '';
  }
};
watch(emitZip, (newVal) => {
  if (!newVal || !newVal.trim()) {
    errors.zip = errorMsg.zip;
  } else {
    errors.zip = '';
  }
});

/**
 * name : validation
 * desc : 부모화면에서 호출 할 validation
 */
const validate = () => {
  // 필수여부(esntlYn) === N일 경우
  if (props.esntlYn === 'N') {
    errors.zip = '';
    errors.daddr = '';
    return true;
  }
  // 초기화
  errors.zip = '';
  errors.daddr = '';

  let valid = true;
  if (!emitZip.value.trim()) {
    errors.zip = errorMsg.zip;
    valid = false;
  }
  if (!emitDaddr.value.trim()) {
    errors.daddr = errorMsg.daddr;
    valid = false;
  }
  return valid;
};

const focus = () => daddrRef.value?.focus?.();

defineExpose({
  validate
});
</script>

<template>
  <div class="form-item__addr">
    <div class="item-column">
      <a-form-item name="zip" label="주소" :labelCol="{ class: 'sr-only' }">
        <a-input
          id="address-search-input"
          readonly
          class="text-bx"
          v-model:value="emitZip"
        />
        <div class="ant-form-item-explain-error" v-if="errors.zip">
          {{ errors.zip }}
        </div>
      </a-form-item>
      <CommonButton
        title="우편번호 찾기"
        variants="primary"
        width="sm"
        @click="
          () => {
            open = true;
            //createModalFocus();
          }
        "
      >
        우편번호 찾기
      </CommonButton>

      <common-search-address
        v-model:open="open"
        v-model:zip="emitZip"
        v-model:mbr-addr="emitAddr"
        v-model:modal-focus="modalFocusRef"
      />
    </div>
    <a-form-item
      name="mbrAddr"
      label="주소상세2(선택 시 자동입력)"
      :labelCol="{ class: 'sr-only' }"
    >
      <a-input
        id="address-input1"
        type="text"
        placeholder="우편번호 검색을 통해 자동 입력됩니다."
        readonly
        class="text-bx full"
        v-model:value="emitAddr"
      />
    </a-form-item>

    <a-form-item
      name="mbrDaddr"
      label="주소상세3"
      :labelCol="{ class: 'sr-only' }"
    >
      <a-input
        id="address-input2"
        type="text"
        :maxlength="50"
        class="text-bx full"
        v-model:value="emitDaddr"
        ref="daddrRef"
        :key="daddrKey"
        @blur="clearError('daddr', dAddr)"
      />
      <div class="ant-form-item-explain-error" v-if="errors.daddr">
        {{ errors.daddr }}
      </div>
    </a-form-item>
  </div>
</template>

<style scoped lang="scss"></style>
