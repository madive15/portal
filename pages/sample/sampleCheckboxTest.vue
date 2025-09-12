<script lang="ts">
import { defineComponent, ref } from 'vue';
import CommonCheckboxGroup from '~/pages/components/select/CommonCheckbox.vue';

export default defineComponent({
  components: { CommonCheckboxGroup },
  setup() {
    const selected = ref<string[]>([]); // 선택된 comCd 배열
    const cbxId = 'options-cbx'; // label 연결용 ID
    return { selected, cbxId };
  }
});

definePageMeta({
  layout: 'empty'
});
</script>

<template>
  <div>
    <label :for="cbxId">옵션 선택</label>
    <CommonCheckboxGroup
      :id="cbxId"
      codeGroupId="CO0050"
      v-model="selected"
      css="common-checkbox"
    />
  </div>
</template>

<style scoped></style>
