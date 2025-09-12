<script setup lang="ts">
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Badge</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • 옵션: tag-badge-text, size, type<br />
        1. <strong>tag-badge-text</strong> - (badge 타이틀 추가)<br />
        2. <strong>size</strong> - (크기지정 size="1" 1~2)<br />
        3. <strong>type</strong> - (스타일 변경) type 없으면 기본<br />
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <CommonBadge tag-badge-text="채무조정/금융복지 > 채무조정 및 지원" />
          <CommonBadge tag-badge-text="대한법률구조공단" />
          <CommonBadge tag-badge-text="공지" size="2" />
          <CommonBadge tag-badge-text="지부단독" size="1" type="gray" />
          <CommonBadge tag-badge-text="상담완료" size="1" />
          <CommonBadge tag-badge-text="내방안함" size="1" type="color-l-pink" />
          <CommonBadge tag-badge-text="절차교시" size="1" type="color-mint" />
          <CommonBadge tag-badge-text="심사중" size="1" type="color-gray" />
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonBadge tag-badge-text="채무조정/금융복지 > 채무조정 및 지원" />

          &lt;CommonBadge tag-badge-text="대한법률구조공단" />

          &lt;CommonBadge tag-badge-text="공지" size="2" />

          &lt;CommonBadge tag-badge-text="지부단독" size="1" type="gray" />

          &lt;CommonBadge tag-badge-text="상담완료" size="1" />

          &lt;CommonBadge tag-badge-text="내방안함" size="1" type="color-l-pink" />

          &lt;CommonBadge tag-badge-text="절차교시" size="1" type="color-mint" />

          &lt;CommonBadge tag-badge-text="심사중" size="1" type="color-gray" />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
