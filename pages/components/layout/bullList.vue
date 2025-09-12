<script setup lang="ts">
import BullList from '~/components/ui/bullList/bullList.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Bull list</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Bull list<br />
        옵션 type (number, dot, refMark)<br />
        1. number: number-style(period 1. , encode ① , circle circleStyle)<br />
        2. dot: dot-style -blue background<br />
        3. refMark: ※ remark
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <BullList type="number" number-style="period">
          <li>
            <strong>비대면 법률구조 신청</strong>: 법률구조기관사무실을 직접
            찾아가거나 우편을 이용하는 번거로움 없이, 시간과 장소에 구애받지
            않고 인터넷 접속이 가능한 곳 어디에서든 법률구조 지원을 신청할 수
            있습니다.
          </li>
          <li>
            <strong>공식적인 절차 시작</strong>: 단순히 법률 정보를 검색하는
            것을 넘어, 사용자의 구체적인 사건에 대해
            <strong
              >법률구조기관의 공식적인 검토와 실제적인 법률구조 지원(예: 소송
              구조 결정 심사) 절차 진행을 요청하는 공식적인 신청 행위</strong
            >입니다.
          </li>
        </BullList>

        <BullList type="number" number-style="encode">
          <li>
            생활보호법이 정한 보호대상자인 경우 : 시・읍・면・동장의
            생활보호대상자증명서
          </li>
          <li>생계가 곤란한 자인 경우 : 재산상태를 확인할 수 있는 서류</li>
        </BullList>

        <BullList type="number" number-style="circle">
          <li><strong>가족관계 :</strong> 배우자, 부모, 동거 중인 형제자매</li>
          <li><strong>가족관계 :</strong> 배우자, 부모, 동거 중인 형제자매</li>
        </BullList>

        <BullList type="dot">
          <li>법률구조 전자접수란</li>
        </BullList>

        <BullList type="refMark">
          <li class="blue">법률구조 전자접수란</li>
        </BullList>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
         &lt;BullList type="number" number-style="period">
          &lt;li>
            &lt;strong>비대면 법률구조 신청&lt;/strong>: 법률구조기관사무실을 직접
            찾아가거나 우편을 이용하는 번거로움 없이, 시간과 장소에 구애받지
            않고 인터넷 접속이 가능한 곳 어디에서든 법률구조 지원을 신청할 수
            있습니다.
          &lt;/li>
          &lt;li>
            &lt;strong>공식적인 절차 시작&lt;/strong>: 단순히 법률 정보를 검색하는
            것을 넘어, 사용자의 구체적인 사건에 대해
            &lt;strong
            >법률구조기관의 공식적인 검토와 실제적인 법률구조 지원(예: 소송
              구조 결정 심사) 절차 진행을 요청하는 공식적인 신청 행위&lt;/strong
            >입니다.
          &lt;/li>
        &lt;/BullList>

        &lt;BullList type="number" number-style="encode">
          &lt;li>
            생활보호법이 정한 보호대상자인 경우 : 시・읍・면・동장의
            생활보호대상자증명서
          &lt;/li>
          &lt;li>생계가 곤란한 자인 경우 : 재산상태를 확인할 수 있는 서류&lt;/li>
        &lt;/BullList>

        &lt;BullList type="number" number-style="circle">
          &lt;li>&lt;strong>가족관계 :&lt;/strong> 배우자, 부모, 동거 중인 형제자매&lt;/li>
          &lt;li>&lt;strong>가족관계 :&lt;/strong> 배우자, 부모, 동거 중인 형제자매&lt;/li>
        &lt;/BullList>

        &lt;BullList type="dot">
          &lt;li>법률구조 전자접수란&lt;/li>
        &lt;/BullList>

        &lt;BullList type="refMark">
          &lt;li class="blue">법률구조 전자접수란&lt;/li>
        &lt;/BullList>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
