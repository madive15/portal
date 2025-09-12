<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';

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
        <CommonTitle tag="h4" size="1" type="circle">
          [법률구조 플랫폼] 에서 화상 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              화상 상담 가능 기관 찾기 : 원하는 날짜와 시간에 맞춰 화상 상담이
              가능한 기관의 정보를 쉽게 확인 할 수 있습니다.
            </li>
            <li>
              제공 기관과 연계해 화상 상담 예약과 상담 내용을 [법률구조 플랫폼]
              에서 신청하고 처리 결과를 확인하여 One-Stop 법률구조 서비스를
              실현합니다.
            </li>
            <li>
              화상 상담 특징 비교: 어떤 기관에서 어떤 분야의 방문 상담을 주로
              하는지(민사, 가사, 형사 등), 어떤 대상에게 더 적합한지 비교하여
              나에게 가장 알맞은 방문 상담 기관을 선택할 수 있습니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          상담 기관별 화상상담 특징
        </CommonTitle>
        <div class="info-img-box type01">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />
                  <div class="txt">
                    <strong>대한법률구조공단<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주 요 서 비 스</strong>
                      <span>제한없음</span>
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>다양한 법률 분야 상담 가능.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol2.png" alt="" />
                  <div class="txt">
                    <strong>한국가정법률상담소<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주 요 서 비 스</strong>
                      <span>가사사건에만 한정됨</span>
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>심층 가사 전문 화상상담</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol3.png" alt="" />
                  <div class="txt">
                    <strong>대한가정법률복지상담원<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주 요 서 비 스</strong>
                      <span>부부상담, 가사 및 민사, 형사</span>
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>법률-복지 연계 원스톱 화상상담</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol4.png" alt="" />
                  <div class="txt">
                    <strong>법률홈닥터<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주 요 서 비 스</strong>
                      <span
                        >민사, 임대차, 가사, 이혼, 형사, 기타 전반의 지역주민
                        대상 법률 상담
                      </span>
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>찾아가는 생활 밀착형 화상상담</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          화상상담 상세 정보
        </CommonTitle>

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
