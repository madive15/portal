<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import CommonTitle from '~/components/ui/title/title.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Title</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • 옵션: tag, size, type<br />
        1. <strong>tag</strong> - (감싸는 태그 지정)h1 ~ h5<br />
        2. <strong>size</strong> - (font-size 없으면 기본 28px) 1= 21px, 2=18px,
        3=16px, 4=15px, 5=14px<br />
        3. <strong>type</strong> - 타이틀 앞에 아이콘 스타일
        'bar','circle','dot'<br />
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[12, 12]" direction="vertical" wrap>
          <CommonTitle tag="h1">컴포넌트 대제목입니다</CommonTitle>
          <CommonTitle tag="h2" size="1">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h3" size="2">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h4" size="3">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="4">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h5" size="5">컴포넌트 중간 제목</CommonTitle>
          <CommonTitle tag="h4">타이틀 앞에 아이콘 있는경우</CommonTitle>
          <CommonTitle tag="h3" size="2" type="circle"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h4" size="3" type="circle"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h3" size="2" type="bar"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h4" size="3" type="bar"
            >컴포넌트 중간 제목</CommonTitle
          >
          <CommonTitle tag="h5" size="2" type="dot"
            >컴포넌트 중간 제목</CommonTitle
          >
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTitle tag="h1">컴포넌트 대제목입니다&lt;/CommonTitle>

          &lt;CommonTitle tag="h2" size="1">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h3" size="2">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h4" size="3">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h5" size="4">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h5" size="5">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h4">타이틀 앞에 아이콘 있는경우&lt;/CommonTitle>

          &lt;CommonTitle tag="h3" size="2" type="circle">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h4" size="3" type="circle">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h3" size="2" type="bar">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h4" size="3" type="bar">컴포넌트 중간 제목&lt;/CommonTitle>

          &lt;CommonTitle tag="h5" size="2" type="dot">컴포넌트 중간 제목&lt;/CommonTitle>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
