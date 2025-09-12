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
          breadcrumbTitle="신용회복 상담"
        />
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
                <p>
                  <strong>신용회복위원회</strong>는 2002년 창립된
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
                    채무조정 안내
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    지부 방문 예약
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 채무조정 제도 </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
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
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          채무조정은 이렇게 진행됩니다.
        </CommonTitle>
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
            <router-link class="info-btn type01" to="">
              <div class="tit">채무조정 제도소개</div>
              <div class="sub">다양한 채부조정 제도를 소개해드립니다.</div>
            </router-link>
            <router-link class="info-btn type02" to="">
              <div class="tit">채무조정 신규신청</div>
            </router-link>
            <router-link class="info-btn type03" to="">
              <div class="tit">지부 방문 예약</div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
