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
          breadcrumbTitle="법률홈닥터 전화상담 안내"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle">
          전화상담의 특징
        </CommonTitle>

        <div class="counsel-main-img-box">
          <div class="main-box-item bg01">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_01.png" alt="" />
            </div>

            <span>15분 전화상담</span>
          </div>
          <div class="main-box-item bg02">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_02.png" alt="" />
            </div>
            <span>원하는 시간예약</span>
          </div>
          <div class="main-box-item bg03">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_03.png" alt="" />
            </div>
            <span>간단한<br class="mo-only" />궁금증해결</span>
          </div>
          <div class="main-box-item bg04">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_04.png" alt="" />
            </div>
            <span>방문이<br class="mo-only" />필요없는 상담</span>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          전화상담예약 진행절차
        </CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              희망 상담일은 5일 이전부터 등록 가능하며, 최대 4주의 기간 내,
              상담일을 등록할 수 있습니다.
            </li>
          </ul>
          <div class="counsel-sub-img-box">
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_01.png" alt="" />
              </div>
              <span>상담신청<br class="pc-only" />서비스 안내</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_02.png" alt="" />
              </div>
              <span>상담신청서 작성</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_03.png" alt="" />
              </div>
              <span>신청완료</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_04.png" alt="" />
              </div>
              <span>예약확정</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_05.png" alt="" />
              </div>
              <span>상담완료</span>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          전화상담예약 주의사항
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              1차 법률상담을 전화로 진행하는 상담입니다. 기본 15분 상담하는 것을
              원칙으로 하고 있으며, 보다 더 상세한 상담이 필요한 경우에는
              방문상담을 추가적으로 신청하신 후 진행하는 것을 권장합니다.
            </li>
            <li>
              전화상담 후 추가적인 상담이 필요한 경우 전화 또는 온라인으로 추가
              상담을 신청해 주시되, 동일한 내용으로 중복 신청하는 경우 상담이
              제한될 수 있습니다.
            </li>
            <li>
              원활한 상담을 위해 신청일로부터 5일(근무일 기준) 이후부터 예약이
              가능하며, 신청 후 7일이내에는 신청내용의 수정이 가능합니다.
            </li>
            <li>
              온라인 상담신청서에서 작성한 희망 일/시는 담당 법률홈닥터의 확인
              후 신청자의 일정에 맞추어 조정 후 확정되며, 상담이 진행,
              완료됩니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          꼭 확인해주세요!
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="number" number-style="circle">
            <li>
              법률상담은 법무부 소속 변호사(법률홈닥터)가 해 드리고 있으며,
              서비스 비용은 무료입니다.
            </li>
            <li>
              법률홈닥터는 취약계층의 1차 법률상담을 지원해드리는 제도로,
              신청자의 유형에 따라 상담의 진행이 어려울 수 있습니다.
            </li>
            <li>
              법률상담은 변호사 개인의 법률적 견해를 토대로 법적 조언을 하는
              것이므로 의사결정 시 참고자료로만 활용하시기 바랍니다.
            </li>
            <li>
              법률상담 이외에 단순 진정이나 민원성 상담은 해드리지 않습니다.
            </li>
            <li>
              불법·탈법행위의 수단이나 목적, 근거 없는 비방, 욕설 등의 상담은
              제한될 수 있으니 양해하여 주시기 바랍니다.
            </li>
            <li>
              동일한 사건으로 중복된 상담을 신청할 경우 제한될 수 있으니
              양해하여 주시기 바랍니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">상담예약</CommonButton>
          <CommonButton variants="line-primary" width="xs">
            예약확인
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
