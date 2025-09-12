<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

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
          breadcrumbTitle="전자접수신청"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-comp-header">
          <div class="inner">
            <div class="top-logo">
              <img src="/image/sub/receipt/receipt_comp_icon.png" alt="" />
            </div>
            <div class="top-desc">전자접수 신청이 완료되었습니다.</div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          전자접수신청 유의사항
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>전자접수 신청을 완료해 주셔서 감사합니다.</li>
            <li>
              신청 시 필수적으로 제출되어야 할 구비서가 제출이 되지 않는 경우
              정상적으로 신청이 안될 수 있습니다.
            </li>
            <li>
              마이페이지 > 나의사건관리에서 필요서류를 첨부해서 제출 하시면
              됩니다.
            </li>
            <li>
              제축되지 않은 서류가 있으면 신속한 신청 처리를 위해 빠른 시일 내에
              서류 제출을 완료해 주시면 감사하겠습니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">신청확인</CommonButton>
          <CommonButton variants="line-primary" width="xs">
            메인으로 가기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
