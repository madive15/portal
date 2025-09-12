<script setup lang="ts">
import Tab from '~/components/tab/tab.vue';
import Tabitem from "~/components/tab/tabitem.vue";
import Serviceslide from "~/components/service/serviceslide.vue";
</script>

<template>
  <div class="service-depth-wrap" id="servicedepth">
    <Tab class="service-depth-tab">
      <Tabitem title="상담사례">
        <serviceslide />
      </Tabitem>
      <Tabitem title="구조사례">

      </Tabitem>
    </Tab>
  </div>
</template>

<style scoped>

</style>