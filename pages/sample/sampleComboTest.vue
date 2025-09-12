<script lang="ts">
import { defineComponent, ref } from 'vue';
import CommonSelect from '~/pages/components/select/CommonSelect.vue';

export default defineComponent({
  name: 'dynamicSelect',
  components: { CommonSelect },
  setup() {
    const value = ref<string>(''); // 이 곳에 value 를 넣으면 해당 option 을 선택한다. ('01', '02', '03', '04')
    return { value };
  }
});

definePageMeta({
  layout: 'empty'
});
</script>

<template>
  <label for="years">상태</label>
  <!--
  id : 화면 내에서 사용될 ID (미입력시 충돌 방지를 위하여 random 생성
  v-moel:value : 서버에서 받아온 value 를 변수로 담는다.
  codeGroupId : 검색할 공통 코드를 입력한다.
  pType : A 입력시 =전체=, S 입력시 =선택= (선택은 disabled 처리)
  css : a-select tag 에서 사용될 class를 입력한다.
  -->
  <CommonSelect
    id="years"
    v-model:value="value"
    codeGroupId="CO0050"
    pType="S"
    css="common-select"
  />
</template>

<style scoped></style>
