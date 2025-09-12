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
          breadcrumbTitle="화상상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-comp-header">
          <div class="inner">
            <div class="top-logo">
              <img src="/image/sub/counsel/counsel_comp_icon.png" alt="" />
            </div>
            <div class="top-desc">화상상담 예약이 완료되었습니다.</div>
          </div>
        </div>

        <CommonTitle tag="h5" size="2" type="dot">
          화상상담 예약정보
        </CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              화상상담 예약정보에관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">상담기관</th>
                <td>
                  <img
                    class="logo-img"
                    src="/image/sub/counsel/counsel_top_txt.png"
                    alt="대한법률구조공단"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">예약번호</th>
                <td>250417-130001</td>
              </tr>
              <tr>
                <th scope="row">예약일시</th>
                <td><span class="is-emphasis">2025.04.10 11:00</span></td>
              </tr>
              <tr>
                <th scope="row">접수일시</th>
                <td><span class="is-emphasis">2025.04.08 11:00</span></td>
              </tr>
              <tr>
                <th scope="row">상담내용</th>
                <td>상담 제목이나 상담 내용의 첫줄만 말줄임으로 노출됩니다.</td>
              </tr>
              <tr>
                <th scope="row">문의</th>
                <td>033-576-0620</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 예약 유의사항 </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              법률구조 플랫폼은 법률상담 당사자가 아닌 대국민 편의를 위해
              법률구조 가관 및 국가·공공기관 등에서 제공하는 법률상담을 연계하는
              시스템으로 실제 법률상담 진행 및 처리는 해당 참여기관에 있습니다.
            </li>
            <li>
              많은 국민들께서 공단을 이용하고 계시므로 원활한 법률상담과
              법률구조업무 수행을 위해 예약상담 시간은 20분 이내로 운영되고
              있으니 참고하시기 바라며 양해를 당부드립니다
            </li>
            <li>
              예약 상담 취소는 예약 상담일 상담시간까지 가능하나, 예약
              상담일(당일) 상담시간대 변경을 원하시는 경우 예약 상담 기관으로
              문의 하여 주시기 바랍니다.
            </li>
            <li>
              예약취소를 하지 않은 채 방문하지 않은 경우 각 참여 기관의 정책에
              따라 예약이 제한될 수 있습니다.
            </li>
            <li>
              같은 참여 기관을 중복으로 예약하거나 동일 내용의 재예약은 참여기관
              정책에 따라 제한될 수 있습니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">예약하기</CommonButton>
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
