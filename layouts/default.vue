<script setup lang="ts">
import Satisfaction from '~/components/common/satisfaction.vue';
import MainHeader from '~/components/common/NewMainHeader.vue';
</script>

<template>
  <div class="wrap">
    <MainHeader />
    <div class="content" id="common-content">
      <slot></slot>
      <div class="container">
        <satisfaction />
      </div>
    </div>
    <common-footer />
  </div>
</template>
