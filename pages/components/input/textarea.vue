<script setup lang="ts">
import TextArea from '~/components/ui/input/textArea.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});
const formTextarea = ref('');
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Input/Textarea</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• antd 컴포넌트</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <label for="textMessage">
          <span class="sr-only">textarea</span>
        </label>
        <a-textarea
          class="textarea-bx"
          id="textMessage"
          placeholder="최대 200자 입력 가능"
          :maxlength="200"
          v-model:value="formTextarea"
        />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;label for="textMessage">
        &lt;span class="sr-only">textarea&lt;/span>
        &lt;/label>
        &lt;a-textarea
            class="textarea-bx"
            id="textMessage"
            placeholder="최대 200자 입력 가능"
            :maxlength="200"
            v-model:value="formTextarea"
        />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
