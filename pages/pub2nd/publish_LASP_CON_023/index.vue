<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="법률홈닥터"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar">
          개인정보 제공 이용·동의 안내 (필수사항)
        </CommonTitle>
        <div class="list-box">
          <div class="box-item">
            <h5>가. 개인정보의 수집·이용 목적</h5>
            <div class="txt">
              "대한법률구조공단 법률상담 예약센터"는 다음의 목적을 위해
              개인정보를 수집 및 이용합니다.<br />
              수집된 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 수집
              목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.
            </div>
            <ul class="counsel-bull-list">
              <li>
                긴급하게 법률문제의 해결방안을 찾고자 하실 때에는 132 법률상담
                콜 센터를 이용해 주시기 바랍니다.
              </li>
            </ul>
            <div class="txt">
              기초사항에 포함된 개인정보는 방문상담 예약을 위한 목적으로
              이용됩니다.
            </div>
            <ul class="counsel-bull-list">
              <li>방문상담 예약 및 관리</li>
            </ul>
            <div class="txt">
              방문상담 예약(14세 이상 가능) 및 예약상담 프로그램 서비스 이용 및
              제한적 본인 확인제에 따른 본인확인, 개인식별, 부정이용방지, 비인가
              이용방지, 예약의사 확인,<br />
              분쟁 조정을 위한 기록보존, 불만처리 등 민원 처리, 고지사항 전달
              등을 목적으로 개인정보를 처리합니다.
            </div>
            <ul class="counsel-bull-list">
              <li>법률상담 예약 서비스 향상 및 정책평가</li>
            </ul>
          </div>
          <div class="box-item">
            <h5>나. 수집하는 개인정보의 항목</h5>
            <ul class="counsel-bull-list">
              <li>
                필수항목 : 성명, 이메일주소, 휴대전화번호, 전화번호 등 예약상담
                필수입력 항목
              </li>
              <li>
                선택항목 : 예약상담 접수를 위한 예약신청서상의 선택입력 항목
              </li>
            </ul>
          </div>
          <div class="box-item">
            <h5>
              다. 개인정보의 보유 및 이용기간 (법적근거 또는 내부결재문서 근거)
            </h5>
            <div class="txt">
              이용자 개인정보는 원칙적으로 개인정보의 처리목적이 달성되면
              지체없이 파기합니다.<br />
              단, 다음의 정보는 아래의 사유로 명시한 기간 동안 보존합니다.
            </div>
            <ul class="counsel-bull-list">
              <li>법률상담 예약정보</li>
            </ul>
            <div class="txt">
              - 보존항목 : 이름, 휴대폰번호, 전화번호, 이메일주소<br />
              - 보존기간 : 10년<br />
              - 보존근거 : 문서사무등 관리규칙 시행규정
            </div>
          </div>
        </div>

        <div class="input-box">
          <div class="form-check">
            <a-checkbox class="text-[16px]" value="" name="type">
              위 개인정보 수집 및 이용에 동의합니다
            </a-checkbox>
          </div>
        </div>
        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton width="xs">취소</CommonButton>
          <CommonButton variants="primary" width="xs">다음</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
