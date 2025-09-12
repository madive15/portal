<script setup lang="ts">
import Info from '~/components/svctype/info.vue';
</script>

<template>
  <div class="sub-content-box" id="service-view">
    <Info />
    <section class="section2">
      <div class="container">
        <svctype-tab-index />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/servicetype/index.scss';
</style>
