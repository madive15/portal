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
          breadcrumbTitle="면접상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle">
          [법률구조 플랫폼] 에서 면접 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              내 주변 방문 상담 기관 찾기 : 현재 위치에 맞춰 면접 상담이 가능한
              기관(기관별 전국 지부, 지역 상담소, 지자체/복지관 등)의 정보를
              쉽게 확인 할 수 있습니다.
            </li>
            <li>
              방문하고자 하는 기관의 면접 상담 예약과 상담 내용을 [법률구조
              플랫폼] 에서 신청하고 처리 결과를 확인하여 One-Stop 법률구조
              서비스를 실현합니다.
            </li>
            <li>
              방문 상담 특징 비교: 어떤 기관에서 어떤 분야의 방문 상담을 주로
              하는지(민사, 가사, 형사 등), 어떤 대상에게 더 적합한지 비교하여
              나에게 가장 알맞은 방문 상담 기관을 선택할 수 있습니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          상담 기관별 면접상담 특징
        </CommonTitle>
        <div class="info-img-box type01">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />
                  <div class="txt">
                    <strong>대한법률구조공단<br />면접상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>방 문 장 소</strong>
                      <span>전국 각 지역의 지부 또는 출장소</span>
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
                    <strong>한국가정법률상담소<br />면접상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>방 문 장 소</strong>
                      <span>서울 본원 및 일부 지역 지부(지소)</span>
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>이혼, 상속 등 가사 문제 전문 상담.</span>
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
                    <strong>대한가정법률복지상담원<br />면접상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>방 문 장 소</strong>
                      <span
                        >해당 지역에 위치한 상담원 사무실<br />
                        (※ 특정 기관 정보 확인 필수)</span
                      >
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span>가정 문제 법률 상담 및 복지 연계.</span>
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
                    <strong>법률홈닥터<br />면접상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>방 문 장 소</strong>
                      <span
                        >변호사가 배치된 지방자치단체<br />(시/군/구청 등) 또는
                        사회복지기관</span
                      >
                    </li>
                    <li>
                      <strong>특 징</strong>
                      <span
                        >1차적인 법률 상담. 배치 기관 및 상담 시간 확인 후
                        방문</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h5" size="3">※ 면접상담 유의사항</CommonTitle>
        <div class="bull-list-box">
          <BullList type="number" number-style="period">
            <li>
              상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능합니다.
            </li>
            <li>면접상담은 참여 기관의 예약을 우선으로 합니다.</li>
            <li>
              예약취소를 하지 않은 채 방문하지 않은 경우 각 참여 기관의 정책에
              따라 예약이 제한될 수 있습니다.
            </li>
            <li>예약접수는 휴일을 제외하고 매일 오전 09:00에 개시됩니다.</li>
            <li>
              같은 참여 기관을 중복으로 예약하거나 동일 내용의 재예약은 참여기관
              정책에 따라 제한될 수 있습니다.
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
