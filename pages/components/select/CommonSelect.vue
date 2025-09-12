<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import axios from 'axios';

//서버에서 가져온 ComCd List를 담을 VO 객체
interface CommonCode {
  value: string;
  label: string;
}

//Component 선언
export default defineComponent({
  name: 'CommonSelect', // component name
  props: {
    // 호출 페이지에서 선언된 property
    id: {
      // select id
      type: String,
      default: 'custom-select'
    },
    css: {
      // select css class
      type: String,
      default: 'form-select view-select'
    },
    codeGroupId: {
      // 가져올 공통 코드의 group id
      type: String,
      required: true
    },
    modelValue: {
      // select value
      type: String,
      default: ''
    },
    pType: {
      // 전체(A), 선택(S), 직접입력(E)
      type: String,
      default: ''
    },
    disabled: {
      // disabled 여부
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'], // 이벤트 선언
  setup(props, { emit }) {
    // select box 초기화 (이 곳에서 return 한 객체는 template 에서 호출하여 사용할 수 있다.
    const selectedValue = ref<string>(props.modelValue); // 초기 선택된 값을 담을 변수
    const options = ref<CommonCode[]>([]); // 서버에서 조회한 comcd list를 담을 변수
    const internalId = computed(() => {
      // select id
      return (
        props.id || `selectComCd-${Math.random().toString(36).substring(2, 10)}` // id 가 비어있을 경우 random id 생성
      );
    });

    const fetchOptions = async () => {
      // group code 를 이용해 comcd list 를 조회한다.
      try {
        const response = await axios.get<CommonCode[]>('/api/code/codeList', {
          params: { codeGroupId: props.codeGroupId }
        });
        options.value = response.data;
      } catch (error) {
        console.error('공통코드 조회 실패:', error);
      }
    };

    // option 변경 시 이벤트
    const onChange = () => {
      emit('update:modelValue', selectedValue.value);
      emit('change', selectedValue.value);
    };

    watch(
      () => props.modelValue,
      (val) => {
        selectedValue.value = val;
      }
    );

    watch(
      () => props.codeGroupId,
      () => {
        fetchOptions();
      },
      { immediate: true }
    );

    // component 렌더링시 조회를 실행
    onMounted(() => {
      fetchOptions();
    });

    return {
      internalId,
      selectedValue,
      options,
      onChange
    };
  }
});
</script>

<template>
  <a-select
    :id="internalId"
    v-model:value="selectedValue"
    @change="onChange"
    :disabled="disabled"
    :class="css"
  >
    <a-select-option value="" v-if="pType === 'S'" disabled
      >선택</a-select-option
    >
    <a-select-option value="" v-if="pType === 'E'">직접입력</a-select-option>
    <a-select-option value="All" v-if="pType === 'A'">전체</a-select-option>
    <a-select-option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      >{{ option.label }}
    </a-select-option>
  </a-select>
</template>

<style scoped></style>
