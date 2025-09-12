<script setup lang="ts">
definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Input/File</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• description</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="file-box">
          <strong>파일첨부</strong>
          <data-fileupload
              module="bbs"
              :max-count="5"          />
          <p class="notice-p">※ 첨부파일 용량은 5M이하로 올려주세요.</p>
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="file-box">
          &lt;strong>파일첨부&lt;/strong>
        &lt;data-fileupload
              module="bbs"
              :max-count="5"          />
          &lt;p class="notice-p">※ 첨부파일 용량은 5M이하로 올려주세요.&lt;/p>
        &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
