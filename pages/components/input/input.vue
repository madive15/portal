<script setup lang="ts">
import InputText from '~/components/ui/input/inputText.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});
const inputTextData = ref('');
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Input/Input</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• antd 컴포넌트</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <label for="ipText">
          <span class="sr-only">Input Text</span>
        </label>
        <a-input
          id="ipText"
          class="text-bx"
          placeholder="여기에 입력하세요!!"
          v-model:value="inputTextData"
        />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;label for="ipText">
          &lt;span class="sr-only">Input Text&lt;/span>
        &lt;/label>
        &lt;a-input
            id="ipText"
            class="text-bx"
            placeholder="여기에 입력하세요!!"
            v-model:value="inputTextData"
        />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
