<script setup lang="ts">
const props = defineProps<{
  title: String;
  badge: String;
  textLine: Number;
  content: String;
  dlDt: String;
  dlDd: String;
  dlDt2: String;
  dlDd2: String;
  link: String;
}>();
</script>

<template>
  <div class="card-type__board">
    <nuxt-link :to="link">
      <div class="card-header">
        <h3 class="title" v-html="title"></h3>
        <span class="badge-exam">{{ badge }}</span>
      </div>
      <div :class="`text-line${textLine}`" v-html="content"></div>
      <div class="text-etc">
        <dl class="bx">
          <dt>{{ dlDt }} :</dt>
          <dd>{{ dlDd }}</dd>
        </dl>
        <dl class="bx">
          <dt>{{ dlDt2 }} :</dt>
          <dd>{{ dlDd2 }}</dd>
        </dl>
      </div>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss"></style>
