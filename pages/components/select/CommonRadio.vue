<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import axios from 'axios';
import { useCustomAlert } from '~/composables/useCustomAlert';
const { showAlert } = useCustomAlert();

// transaction을 통해 가져온 데이터를 담을 VO
interface CommonCode {
  comCd: string; //코드
  comCdNm: string; //레이블
}

// radio 레이블과 값 선언
interface RadioOption {
  label: string; // 레이블
  value: string; // 값
}

export default defineComponent({
  name: 'CommonRadioGroup', //공통 라디오 버튼의 이름
  props: {
    //프로퍼티 선언
    id: {
      type: String,
      default: ''
    },
    css: {
      // select css class
      type: String,
      default: 'view-select'
    },
    codeGroupId: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    ariaDescribedby: {
      type: String,
      default: ''
    }
    // 라디오버튼 호출 제외할 코드 필요시 사용
    // ,
    // ignoreValues: {
    //   type: Array,
    //   default: () => []
    // }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selectedValues = ref<string>(props.modelValue);
    const radioOptions = ref<RadioOption[]>([]);

    const internalId = computed(() => {
      return (
        props.id || `radio-group-${Math.random().toString(36).substring(2, 10)}`
      );
    });

    const fetchOptions = async () => {
      try {
        const response = await axios.get<CommonCode[]>('/api/code/codeList', {
          params: { codeGroupId: props.codeGroupId }
        });
        // 라디오버튼 호출 제외할 코드 필요시 사용
        // radioOptions.value = response.data
        //   .filter((item) => !props.ignoreValues.includes(item.value))
        //   .map((item) => ({ label: item.label, value: item.value }));

        radioOptions.value = response.data.map((item) => ({
          label: item.label,
          value: item.value
        }));
      } catch (error) {
        alert();
        console.error('공통코드 조회 실패:', error);
      }
    };

    // Ant Design Vue의 a-radio-group에서는 @change로 전달되는 인자가 string이 아니라 Event 객체.
    // 실제 값을 가져오려면 e.target.value로 접근.
    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      emit('update:modelValue', value);
      emit('change', value);

      /*
      showAlert({
        icon: 'info',
        html:
          '선택한 데이터는 아래와 같습니다. <br /><br />' + selectedValues.value
      });

      return;
      */
    };

    watch(
      () => props.modelValue, //값이 변경될 때 마다 실행
      (val) => {
        selectedValues.value = val;
      }
    );

    watch(
      () => props.codeGroupId, //공통코드 그룹ID가 변경될 때 마다 실행
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          selectedValues.value = '';
          emit('update:modelValue', '');
          radioOptions.value = [];
          fetchOptions();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      fetchOptions();
    });

    return {
      selectedValues,
      radioOptions,
      internalId,
      onChange
    };
  }
});
</script>

<template>
  <a-radio-group
    :id="internalId"
    :class="css"
    v-model:value="selectedValues"
    :options="radioOptions"
    @change="onChange"
    :aria-describedby="ariaDescribedby"
  />
</template>

<style scoped></style>
