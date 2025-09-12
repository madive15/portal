<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import axios from 'axios';
import { useCustomAlert } from '~/composables/useCustomAlert';
const { showAlert } = useCustomAlert();

interface CommonCode {
  comCd: string;
  comCdNm: string;
}

interface CheckboxOption {
  label: string;
  value: string;
}

export default defineComponent({
  name: 'CommonCheckboxGroup',
  props: {
    id: {
      type: String,
      default: ''
    },
    css: {
      // select css class
      type: String,
      default: 'form-select view-select'
    },
    codeGroupId: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array as () => string[],
      default: () => []
    },
    ariaDescribedby: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selectedValues = ref<string[]>([...props.modelValue]);
    const checkboxOptions = ref<CheckboxOption[]>([]);

    const internalId = computed(() => {
      return (
        props.id ||
        `checkbox-group-${Math.random().toString(36).substring(2, 10)}`
      );
    });

    const fetchOptions = async () => {
      try {
        const response = await axios.get<CommonCode[]>('/api/code/codeList', {
          params: { codeGroupId: props.codeGroupId }
        });
        checkboxOptions.value = response.data.map((item) => ({
          label: item.label,
          value: item.value
        }));
      } catch (error) {
        alert();
        console.error('공통코드 조회 실패:', error);
      }
    };

    const onChange = (val: string[]) => {
      emit('update:modelValue', val);
      emit('change', val);
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
      () => props.modelValue,
      (val) => {
        selectedValues.value = [...val];
      }
    );

    watch(
      () => props.codeGroupId,
      () => {
        fetchOptions();
      },
      { immediate: true }
    );

    onMounted(() => {
      fetchOptions();
    });

    return {
      selectedValues,
      checkboxOptions,
      internalId,
      onChange
    };
  }
});
</script>

<template>
  <a-checkbox-group
    :id="internalId"
    :class="css"
    v-model:value="selectedValues"
    :options="checkboxOptions"
    @change="onChange"
    :aria-describedby="ariaDescribedby"
  />
</template>

<style scoped></style>
