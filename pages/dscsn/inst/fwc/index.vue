<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import * as instApis from '~/composables/inst';

// 기관정보
const sfwcInstNo = 'I013000000'; // 서울금융복지상담센터
const gsfwcInstNo = 'I014000000'; // 경기도서민금융복지지원센터
const instInfos = ref();

onMounted(() => {
  getInstInfo();
});

// 서울금융복지상담센터,경기도서민금융복지지원센터 기관정보 조회
const getInstInfo = async () => {
  const payload = {
    instNoList: [sfwcInstNo, gsfwcInstNo]
  };
  const response = await instApis.selecInstInfoList(payload);
  if (response.data.length > 0) {
    instInfos.value = response.data;
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :showPrintButton="true" />
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
                <div v-for="inst in instInfos" :key="inst.instNo">
                  <div
                    v-if="inst.instNo == 'I013000000'"
                    v-html="inst.instIndt"
                  ></div>
                </div>
                <div v-for="inst in instInfos" :key="inst.instNo">
                  <div
                    v-if="inst.instNo == 'I014000000'"
                    v-html="inst.instIndt"
                  ></div>
                </div>
                <!--                <p>-->
                <!--                  <strong>서울금융복지상담센터</strong>는 가계부채 문제를 복지적-->
                <!--                  해법으로 접근하여 금융취약계층 서울시민에게 금융·법률·복지를-->
                <!--                  결합한 원스톱 서비스를 제공해 드리고 있으며 금융복지전문-->
                <!--                  상담관이 금융복지종합상담을 도와드리고 있습니다.-->
                <!--                </p>-->
                <!--                <p>-->
                <!--                  <strong>경기도서민금융복지지원센터</strong>는 2002년 창립된-->
                <!--                  채무종합상담기구로, 「서민의 금융생활 지원에 관한 법률」에-->
                <!--                  의거한 특수법인입니다. 과중한 채무와 신용문제로 어려움을 겪고-->
                <!--                  계시는 분들에게 신용회복과 경제적 재기를 지원하고 있습니다.-->
                <!--                </p>-->
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://sfwc.welfare.seoul.kr/web/contents/applyCounsel.do?tab=0031&act=Lst"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    서울금융복지상담센터 금융복지상담 예약
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://gcfwc.ggwf.or.kr/"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    경기도 금융복지상담
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4">서울금융복지 상담센터</CommonTitle>

        <div class="info-list-box type01">
          <div class="txt">
            서울금융복지상담센터는 어려운 시민들께 최선의 도움을 드리고자
            적극적인 상담신청을 받고 있습니다.<br class="pc-only" />
            <strong>혼자서는 해결이 어려운 금융고민</strong>,
            <strong>서울금융복지상담센터</strong>가 해결해 드리겠습니다.
          </div>
          <NuxtLink
            class="counsel-apply-btn"
            to="https://sfwc.welfare.seoul.kr/web/contents/applyCounsel.do?tab=0031&act=Lst"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            서울금융복지상담센터 금융복지상담 예약
          </NuxtLink>
        </div>

        <CommonTitle tag="h4">경기도서민금융복지지원센터</CommonTitle>
        <div class="info-list-box type02">
          <div class="txt">
            경기도서민금융복지지원센터는 경기도에 거주하는 주민 중 과도한 채무,
            재정 관리의 어려움, 금융 문제 등으로 <br class="pc-only" />
            고통받는 누구나 상담받을 수 있습니다. 특히 저소득층, 실직자, 청년,
            노년층 등 금융 취약계층을 적극적으로 지원합니다.
          </div>
          <NuxtLink
            class="counsel-apply-btn"
            to="https://sfwc.welfare.seoul.kr/web/contents/applyCounsel.do?tab=0031&act=Lst"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            경기도서민금융복지지원센터
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/fwc/index.scss';
</style>
