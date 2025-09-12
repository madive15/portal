<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Input/Date</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 날짜 입력 필드(vue3 기본컴포넌트)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="date-picker__group">
          <VueDatePicker
              name="writePeriodStart"
              id="write-period-start"
              :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
              v-model="startDt"
              locale="ko"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :auto-apply="true"
              :clearable="false"
              :transitions="false"
              :highlight-week-days="[0]"
              :week-start="0"
              placeholder="시작일 선택"
              hide-input-icon
          />
          <span class="more-span">~</span>
          <VueDatePicker
              name="writePeriodEnd"
              id="write-period-end"
              :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
              v-model="endDt"
              locale="ko"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :auto-apply="true"
              :clearable="false"
              :transitions="false"
              :highlight-week-days="[0]"
              :week-start="0"
              placeholder="마지막날 선택"
              hide-input-icon
          />
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="date-picker__group">
          &lt;VueDatePicker
              name="writePeriodStart"
              id="write-period-start"
              :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
              v-model="startDt"
              locale="ko"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :auto-apply="true"
              :clearable="false"
              :transitions="false"
              :highlight-week-days="[0]"
              :week-start="0"
              placeholder="시작일 선택"
              hide-input-icon
          />
          &lt;span class="more-span">~&lt;/span>
          &lt;VueDatePicker
              name="writePeriodEnd"
              id="write-period-end"
              :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
              v-model="endDt"
              locale="ko"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :auto-apply="true"
              :clearable="false"
              :transitions="false"
              :highlight-week-days="[0]"
              :week-start="0"
              placeholder="마지막날 선택"
              hide-input-icon
          />
        &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
