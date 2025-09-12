<script setup lang="ts">
import SelectBox from '~/components/ui/selectbox/selectBox.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Select</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• antd 기본 태그로 만들 수 있습니다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <a-select id="select" class="common-select" placeholder="선택">
            <a-select-option value="1">선택 1</a-select-option>
            <a-select-option value="2">선택 2</a-select-option>
          </a-select>
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;a-select id="select" class="common-select" placeholder="선택">
            &lt;a-select-option value="1">선택 1&lt;/a-select-option>
            &lt;a-select-option value="2">선택 2&lt;/a-select-option>
          &lt;/a-select>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
