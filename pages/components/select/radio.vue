<script setup lang="ts">
import Radio from '~/components/ui/input/radio.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});

const radioSelected = ref('');
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Radio</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• antd 기본 태그로 만들 수 있습니다</p>
      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-radio-group v-model:value="radioSelected">
          <a-radio class="radio-bx" value="Sponsor">Sponsor</a-radio>
          <a-radio class="radio-bx" value="Venue">Venue</a-radio>
        </a-radio-group>
        <p style="margin-top: 12px">선택된 값: {{ radioSelected }}</p>
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
         &lt;a-radio-group v-model:value="radioSelected">
          &lt;a-radio class="radio-bx" value="Sponsor">Sponsor&lt;/a-radio>
          &lt;a-radio class="radio-bx" value="Venue">Venue&lt;/a-radio>
        &lt;/a-radio-group>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
