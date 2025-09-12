<script setup lang="ts">
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Icons</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • icon <br />
        옵션 아이콘명(name)<br />
        사이즈(width,height) :width="30" :height="30
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <Icon name="home" />
          <Icon name="print" />
          <Icon name="plus" />
          <Icon name="arrowRight" :width="15" :height="24" />
          <Icon name="shortcut" />
          <Icon name="shortcutBlue" />
          <Icon name="shortcutWhite" />
          <Icon name="downloadAtt" />
          <Icon name="downloadArea" />
          <Icon name="notice" />
          <Icon name="refreshBlue" :width="30" :height="30" />
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;Icon name="home" />

          &lt;Icon name="print" />

          &lt;Icon name="plus" />

          &lt;Icon name="arrowRight" :width="15" :height="24" />

          &lt;Icon name="shortcut" />

          &lt;Icon name="shortcutBlue" />

          &lt;Icon name="shortcutWhite" />

          &lt;Icon name="downloadAtt" />

          &lt;Icon name="downloadArea" />

          &lt;Icon name="notice" />

          &lt;Icon name="refreshBlue" :width="30" :height="30" />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
