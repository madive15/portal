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

// 모바일 여부
// const isMobile = ref(false);
//
// const checkScreenSize = () => {
//   isMobile.value = window.innerWidth < 1200;
// };
//
// onMounted(() => {
//   checkScreenSize();
//   window.addEventListener('resize', checkScreenSize);
// });
//
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', checkScreenSize);
// });
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="서울/경기도 금융복지상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-top-header">
          <div class="inner">
            <div class="top-logo">
              <img
                src="/image/sub/counsel/counsel_top_txt_07_01.png"
                alt="서울금융복지상담센터"
              />
              <img
                src="/image/sub/counsel/counsel_top_txt_07_02.png"
                alt="경기도서민금융복지지원센터"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                <p>
                  <strong>서울금융복지상담센터</strong>는 가계부채 문제를 복지적
                  해법으로 접근하여 금융취약계층 서울시민에게 금융·법률·복지를
                  결합한 원스톱 서비스를 제공해 드리고 있으며 금융복지전문
                  상담관이 금융복지종합상담을 도와드리고 있습니다.
                </p>
                <p>
                  <strong>경기도서민금융복지지원센터</strong>는 2002년 창립된
                  채무종합상담기구로, 「서민의 금융생활 지원에 관한 법률」에
                  의거한 특수법인입니다. 과중한 채무와 신용문제로 어려움을 겪고
                  계시는 분들에게 신용회복과 경제적 재기를 지원하고 있습니다.
                </p>
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    서울금융복지상담센터 금융복지상담 예약
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template> </CommonButton
                  ><CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    경기도 금융복지상담
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          서울금융복지 상담센터
        </CommonTitle>
        <div class="info-list-box type01">
          <div class="txt">
            서울금융복지상담센터는 어려운 시민들께 최선의 도움을 드리고자
            적극적인 상담신청을 받고 있습니다.<br class="pc-only" />
            <strong>혼자서는 해결이 어려운 금융고민</strong>,
            <strong>서울금융복지상담센터</strong>가 해결해 드리겠습니다.
          </div>
          <CommonButton
            height="md"
            variants="primary"
            :width="isMobile ? 'full' : 'xl'"
          >
            금융복지종합상담 신청하기
            <template #right-icon>
              <Icon name="shortcutWhite" />
            </template>
          </CommonButton>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          경기도서민금융복지지원센터
        </CommonTitle>
        <div class="info-list-box type02">
          <div class="txt">
            경기도서민금융복지지원센터는 경기도에 거주하는 주민 중 과도한 채무,
            재정 관리의 어려움, 금융 문제 등으로 <br class="pc-only" />
            고통받는 누구나 상담받을 수 있습니다. 특히 저소득층, 실직자, 청년,
            노년층 등 금융 취약계층을 적극적으로 지원합니다.
          </div>

          <CommonButton
            height="md"
            variants="primary"
            :width="isMobile ? 'full' : 'xl'"
          >
            경기도서민금융복지지원센터
            <template #right-icon>
              <Icon name="shortcutWhite" />
            </template>
          </CommonButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
