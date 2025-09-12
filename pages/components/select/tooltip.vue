<script setup lang="ts">
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Tooltip</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • 버튼 컴포넌트에 옵션추가(tooltipId, tooltipText)<br />
        tooltipId="tooltip-btn1"<br />
        tooltipText="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이
        적용됩니다."
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <CommonButton
            variants="line-primary"
            width="md"
            height="md"
            tooltipId="tooltip-btn1"
            tooltipText="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이 적용됩니다."
          >
            버튼
          </CommonButton>
          <CommonButton
            variants="primary"
            width="md"
            height="md"
            tooltipId="tooltip-btn2"
            tooltipText="컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."
          >
            검색
          </CommonButton>
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonButton
              variants="line-primary"
              width="md"
              height="md"
              tooltipId="tooltip-btn1"
              tooltipText="찾기 조건을 변경했습니다. 버튼 클릭 시 변경사항이 적용됩니다."
          >
            버튼
          &lt;/CommonButton>

          &lt;CommonButton
              variants="primary"
              width="md"
              height="md"
              tooltipId="tooltip-btn2"
              tooltipText="컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다."
          >
            검색
          &lt;/CommonButton>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
