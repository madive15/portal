<script setup lang="ts">
import Masthead from "~/components/ui/header/masthead.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Identity/Banner</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 공식 배너 (Masthead)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="content">
          <header style="position: relative">
            <masthead />
          </header>
        </div>
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;masthead />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
