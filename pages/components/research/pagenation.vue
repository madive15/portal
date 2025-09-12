<script setup lang="ts">
import CommonPagenation from "~/components/ui/pagenation/pagination.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Pagenation</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 페이지네이션</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonPagenation
            :page="10"
            :size="10"
            :total-elements="100"
            :show-pagination-count="10"
        />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonPagenation
            :page="10"
            :size="10"
            :total-elements="100"
            :show-pagination-count="10"
        />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
