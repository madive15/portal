<script setup lang="ts">
definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Skip</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 건너뛰기 링크(Skip link)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div id="skip-nav" class="skip-nav">
          <a href="#container">본문 바로가기</a>
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
         &lt;div id="skip-nav" class="skip-nav">
          &lt;a href="#container">본문 바로가기&lt;/a>
        &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
