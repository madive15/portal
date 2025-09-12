<script setup lang="ts">
import { ref } from 'vue';
const open = ref<boolean>(false);

const afterOpenChange = (bool: boolean) => {
  console.log('open', bool);
};

const showDrawer = () => {
  open.value = true;
};
</script>

<template>
  <a-button @click="showDrawer">
    <img src="~/assets/image/mo/mo_top_menu.svg" alt="모바일 햄버거 박스" />
  </a-button>
  <a-drawer
    v-model:open="open"
    class="drawer-mobile"
    root-class-name="drawer-mo"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    asd<br />
    asdf
  </a-drawer>
</template>

<style scoped></style>
