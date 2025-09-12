<script setup lang="ts"></script>

<template>
  <div class="wrap">
    <!-- 바뀌는 메뉴 및 헤더 -->
    <!--    <common-new-main-header />-->
    <!--  기존 메뉴 및 헤더
     <common-header />
    -->
    <div class="content" id="common-content">
      <slot></slot>
      <div class="container"></div>
    </div>
    <common-footer />
  </div>
</template>
