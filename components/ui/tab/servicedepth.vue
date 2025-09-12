<script setup lang="ts">
import Tab from '~/components/ui/tab/tab.vue';
import Tabitem from '~/components/ui/tab/tabitem.vue';
import Serviceslide from '~/components/ui/tab/serviceslide.vue';
</script>

<template>
  <div class="service-depth-wrap" id="servicedepth">
    <Tab class="service-depth-tab" :platform-none-width-tab-show="true">
      <Tabitem title="상담사례">
        <serviceslide />
      </Tabitem>
      <Tabitem title="구조사례"> </Tabitem>
    </Tab>
  </div>
</template>

<style scoped></style>

<style scoped lang="scss"></style>
