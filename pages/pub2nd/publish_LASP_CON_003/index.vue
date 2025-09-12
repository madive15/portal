<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
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
          breadcrumbTitle="전화상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle">
          [법률구조 플랫폼] 에서 전화 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              [법률구조 플랫폼] 에서는 대한법률구조공단, 대한가정법률복지
              상담원, 법률홈닥터등 주요 법률 기관들의 전화 상담 정보를 한 곳에
              모아 편리하게 안내해 드립니다.<br />
              각 기관별로 정확한 상담 전화번호와 상담 가능 시간을 확인하시고
              궁금한 점을 바로 물어보고 신속하게 답변을 얻으세요.
            </li>
            <li>
              법률홈닥터인 경우 상담 예약과 상담 내용을 [법률구조 플랫폼] 에서
              신청하고 처리 결과를 확인하여 One-Stop 법률구조 서비스를
              실현합니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          상담 기관별 전화상담 안내
        </CommonTitle>

        <div class="info-img-box type02">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />

                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한법률구조공단<br />전화상담</strong>
                    </div>
                    <div class="btns">
                      <CommonButton height="sm" fontsize="sm">
                        자세히보기
                        <template #right-icon>
                          <Icon name="shortcut" />
                        </template>
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          국번 없이 132전화를 통한 실시간 상담. 5분이내
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          오전 9시 ~오후 6시, 12~1시 불가
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <CommonBadge
                            tag-badge-text="민사, 형사, 행정 등 사건"
                          />
                          <CommonBadge
                            tag-badge-text="이혼, 친권, 양육비, 가족관계 등 가사사건"
                          />
                          <CommonBadge
                            tag-badge-text="개인회생, 개인파산사건"
                          />
                          <CommonBadge tag-badge-text="기타사건" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol2.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>한국가정법률상담소<br />전화상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          1644-7077 전화를 통한 실시간 상담
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          오전 9시~오후 6시
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <CommonBadge
                            tag-badge-text="이혼, 친권, 양육비, 가족관계 등 가사사건"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol3.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한가정법률복지상담원<br />전화상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          02-3675-0142, 0143 전화를 통한 실시간 상담
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          09:30~17:30
                        </span>
                        <span class="info-txt">
                          <span class="is-emphasis"
                            >(매주 월요일 야간상담)</span
                          >
                          18:00~21:00
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <CommonBadge
                            tag-badge-text="이혼, 친권, 양육비, 가족관계 등 가사사건"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          법률홈닥터 전화상담 예약
        </CommonTitle>

        <div class="info-img-box type02">
          <ul>
            <li class="full">
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol4.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>법률홈닥터전화상담</strong>
                      <span class="box-tit-flag">예약</span>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          본인인증이나 회원로그인 이후 상담예약을 통한 원하는
                          시간에 상담 진행
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt"> 상담예약 확정일시 </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <CommonBadge
                            tag-badge-text="민사, 형사, 행정 등 사건"
                          />
                          <CommonBadge
                            tag-badge-text="이혼, 친권, 양육비, 가족관계 등 가사사건"
                          />
                          <CommonBadge tag-badge-text="기타사건" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="box-item-btns">
                <button type="button" class="btn">상담예약<br />바로가기</button
                ><button type="button" class="btn line">예약확인</button>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h5" size="3">※ 전화상담 유의사항</CommonTitle>

        <div class="bull-list-box">
          <BullList type="number" number-style="period">
            <li>통화료는 발신자 부담으로 서비스를 제공하고 있습니다.</li>
            <li>
              법률구조 플랫폼은 법률상담 당사자가 아닌 대국민 편의를 위해
              법률구조 가관 및 국가·공공기관 등에서 제공하는 법률상담을 연계하는
              시스템으로 실제 법률상담 진행 및 처리는 해당 참여기관에 있습니다.
            </li>
          </BullList>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
