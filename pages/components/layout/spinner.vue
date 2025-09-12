<script setup lang="ts">
import Spinner from "~/components/ui/spinner/spinner.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Spinner</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• description</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <spinner />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;spinner />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
