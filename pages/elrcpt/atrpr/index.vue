<script setup lang="ts">
import type { OpenAtrprTypeInqPopupVO } from '~/types/elrcpt';
import { cloneDeep } from 'lodash-es';

const open = ref(false);
const DEFAULT_POPUP_PARAM: OpenAtrprTypeInqPopupVO = {
  instNo: ''
};
const popupParam = ref<OpenAtrprTypeInqPopupVO>(cloneDeep(DEFAULT_POPUP_PARAM));
const openPopup = () => {
  popupParam.value.instNo = 'I001000000';
  open.value = true;
};
const trprVal = (val) => {
  console.log(val);
  trpr.value = val;
};
const trpr = ref([]);
const checked = ref([]);
const test = () => {
  console.log(checked.value);
};
</script>

<template>
  <div class="sub-wrap" id="board-list">
    <div class="sub-content-box">
      <section>
        <div class="container">
          <h1>3.구조대상자 유형을 선택해주세요</h1>
          <a-button
            @click="openPopup"
            style="background-color: #0d6efd; color: white"
            >구조대상자 유형 선택</a-button
          >
          <div class="container">
            <a-checkbox-group v-model:value="checked">
              <div v-for="item in trpr">
                <a-checkbox :value="item.ctgryNo">{{ item.trprNm }}</a-checkbox>
              </div>
            </a-checkbox-group>
          </div>
          <a-button @click="test">test</a-button>
        </div>
      </section>

      <elrcpt-slfdgns-atrpr-type-inq-popup
        v-model:open="open"
        v-model:params="popupParam"
        @trpr-val="trprVal"
      />
    </div>
  </div>
</template>

<style scoped></style>
