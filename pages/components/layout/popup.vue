<script setup lang="ts" xmlns="">
import CommonPopup from '~/components/ui/popup/popup.vue';
import Button from '~/components/ui/button/button.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});

const showPopup = ref(false);

function openPopup() {
  showPopup.value = true;
}
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Popup</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• description</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <button
          type="button"
          class="btn-basic primary"
          @click="
            () => {
              openPopup();
            }
          "
        >
          <span class="text"> 팝업 </span>
        </button>
        <CommonPopup
          popup-header-title-text="팝업"
          popup-width="900px"
          v-model:isVisible="showPopup"
        >
          내용입니다만.
        </CommonPopup>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;button type="primary" @click="() => {openPopup();}">팝업&lt;/button>
        &lt;CommonPopup popup-header-title-text="팝업" popup-width="900px" v-model:isVisible="showPopup" >
          내용입니다만.
        &lt;/CommonPopup>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
