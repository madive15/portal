<script setup lang="ts">
import { ref } from 'vue';
const radioSelected = ref('');
</script>

<template>
  <div class="satisfaction-bx__wrap">
    <div class="sf-header">
      <div class="tit-text">
        <strong>제공되는 정보에 만족하십니까?</strong>
      </div>
      <div class="point-select">
        <a-radio-group v-model:value="radioSelected">
          <a-radio class="radio-bx" value="1">1점</a-radio>
          <a-radio class="radio-bx" value="2">2점</a-radio>
          <a-radio class="radio-bx" value="3">3점</a-radio>
          <a-radio class="radio-bx" value="4">4점</a-radio>
          <a-radio class="radio-bx" value="5">5점</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="sf-body">
      <label class="tit-text" for="opinion">
        <strong>의견</strong>
      </label>
      <div class="form-text">
        <a-input
          id="opinion"
          class="text-bx"
          placeholder="여기에 입력하세요!!"
          v-model:value="inputTextData"
        />
        <button class="btn-basic primary" @click="handleSubmit">
          <span class="text">평가하기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
