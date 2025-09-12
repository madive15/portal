<script setup lang="ts">
import { useRouter } from 'vue-router';
</script>

<template>
  <div class="sticky-chatbot">
    <div class="chatbot-btns">
      <button class="btn-chatbot">
        <img src="/image/main/icon_chatbot.png" alt="챗봇 열기 버튼" />
      </button>
      <div class="chatbot-hover-txt">
        무엇이든 궁금한 점을<br />
        <span>AI 챗봇</span>에게 물어보세요.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
