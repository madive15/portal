<script setup lang="ts">
import CheckBox from '~/components/ui/input/checkBox.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});
const checkSelected = ref<string[]>([]);
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Check</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• antd 기본 태그로 만들 수 있습니다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-checkbox-group v-model:value="checkSelected">
          <a-checkbox class="check-bx" value="soccer" name="type"
            >soccer</a-checkbox
          >
          <a-checkbox class="check-bx" value="basketall" name="type"
            >basketall</a-checkbox
          >
          <a-checkbox class="check-bx" value="tennis" name="type"
            >tennis</a-checkbox
          >
        </a-checkbox-group>
        <p style="margin-top: 12px">선택된 값: {{ checkSelected }}</p>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;a-checkbox-group v-model:value="checkSelected">
          &lt;a-checkbox class="check-bx" value="soccer" name="type">soccer&lt;/a-checkbox>
          &lt;a-checkbox class="check-bx" value="basketall" name="type">basketall&lt;/a-checkbox>
          &lt;a-checkbox class="check-bx" value="tennis" name="type">tennis&lt;/a-checkbox>
        &lt;/a-checkbox-group>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
