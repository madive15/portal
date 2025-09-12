<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CommonRadioGroup from '~/pages/components/select/CommonRadio.vue';
import CommonCheckboxGroup from '~/pages/components/select/CommonCheckbox.vue';

export default defineComponent({
  components: { CommonCheckboxGroup, CommonRadioGroup },
  setup() {
    const years = ref<string>(''); // 선택된 comCd 배열
    const cbxId = 'comCdRadio'; // label 연결용 ID
    let codeGroupId = ref('CO0050');

    const handleChange = (e: Event) => {
      console.log(e);
      console.log(codeGroupId);

      codeGroupId = e.target.value;
      console.log('변경된 코드 : ', codeGroupId);
    };

    return { years, cbxId, codeGroupId, handleChange };
  }
});

definePageMeta({
  layout: 'empty'
});
</script>

<template>
  <div style="padding: 100px 0 30px 0">
    <label :for="cbxId">옵션 선택</label> :
    <CommonRadioGroup
      :id="cbxId"
      :codeGroupId="codeGroupId"
      v-model="years"
      css="common-checkbox"
    />
  </div>
  <br />
  <div>
    <label for="ibx-changeGrp">공통코드 그룹 선택</label> :
    <input
      id="ibx-changeGrp"
      type="text"
      @change="handleChange"
      v-model="codeGroupId"
      class="common-input"
    />
  </div>
</template>

<style scoped></style>
