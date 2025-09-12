<script setup lang="ts">
import Identifier from "~/components/ui/footer/identifier.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Identity/Identifier</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 운영기관 식별자(Identifier)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <Identifier/>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;Identifier/>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
