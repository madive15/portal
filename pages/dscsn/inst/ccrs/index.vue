<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import * as instApis from '~/composables/inst';

// 기관정보
const instNo = 'I032000000';
const instInfo = ref();

onMounted(() => {
  getInstInfo();
});

// 신용회복위원회 기관정보 조회
const getInstInfo = async () => {
  const payload = {
    instNoList: [instNo]
  };
  const response = await instApis.selecInstInfoList(payload);
  if (response.data.length > 0) {
    instInfo.value = response.data[0];
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
                src="/image/sub/counsel/counsel_top_txt_06.png"
                alt="신용회복위원회"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                <div v-html="instInfo?.instIndt"></div>
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://cyber.ccrs.or.kr/debt/apply/guide.do"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    채무조정 안내
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://cyber.ccrs.or.kr/reservation/apply/guide.do"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    지부 방문 예약
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1">채무조정 제도</CommonTitle>

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              <div>
                신용회복위원회는 『서민의 금융생활 지원에 관한 법률』에 근거하여
                <span class="is-red-emphasis">
                  신용회복지원협약을 체결한 금융회사 채무를 조정</span
                >하는 사적 채무조정제도입니다.
              </div>
            </li>
            <li>
              <div>
                채무조정안에 대해서는 외부전문가가 참여하는 심의위원회에서
                의결하므로
                <span class="is-red-emphasis"> 절차가 투명하고 공정</span
                >합니다.
              </div>
            </li>
            <li>
              <div>
                채무조정 내용 등 주요정책을 결정하게 되는 최고의사결정기구에
                채무자 및 채권자의 이익을 균형 있게 대변할 수 있는 분들이
                참여하므로
                <span class="is-red-emphasis"> 채무조정의 중립성이 확보</span
                >됩니다.
              </div>
            </li>
            <li>채무, 신용문제와 관련한 종합 컨설팅을 제공합니다.</li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1"
          >채무조정은 이렇게 진행됩니다.</CommonTitle
        >
        <div class="info-list-box">
          <div class="img">
            <img
              src="/image/sub/counsel/counsel_top_txt_06_guide.png"
              alt="채무조정은 이렇게 진행됩니다.(상세 내용은 하단 참고)"
            />
            <div class="sr-only">
              <ul>
                <li>상담 날짜 예약</li>
                <li>신청서 작성</li>
                <li>상담(심사역과 전화상담) 및 접수</li>
                <li>채권금융회사 앞 접수사실 통지</li>
                <li>개인 채무조정안 심사</li>
                <li>채권금융회사 앞 동의요청</li>
                <li>최종동의</li>
                <li>확정자 교육 및 개인채무조정합의서 체결</li>
                <li>확정통지 및 이행</li>
              </ul>
            </div>
          </div>
          <div class="btns">
            <NuxtLink
              class="info-btn type01"
              to="https://www.ccrs.or.kr/debt/system/description/info.do"
              external
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="tit">채무조정 제도소개</div>
              <div class="sub">다양한 채부조정 제도를 소개해드립니다.</div>
            </NuxtLink>
            <NuxtLink
              class="info-btn type02"
              to="https://cyber.ccrs.or.kr/login.do"
              external
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="tit">채무조정 신규신청</div>
            </NuxtLink>
            <NuxtLink
              class="info-btn type03"
              to="https://cyber.ccrs.or.kr/reservation/apply/guide.do"
              external
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="tit">지부 방문 예약</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/ccrs/index.scss';
</style>
