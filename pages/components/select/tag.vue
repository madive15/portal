<script setup lang="ts">
import Tag from "~/components/ui/tag/tag.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Tag</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• tagName 값을 넣을 넘길 수 있습니다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <Tag tagName="법률·판례·소송 일반정보1" />
          <Tag tagName="법률·판례·소송 일반정보2" />
          <Tag tagName="법률·판례·소송 일반정보3" />
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;Tag tagName="법률·판례·소송 일반정보1" />
        &lt;Tag tagName="법률·판례·소송 일반정보2" />
        &lt;Tag tagName="법률·판례·소송 일반정보3" />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
