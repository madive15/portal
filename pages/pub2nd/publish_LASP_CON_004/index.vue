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

// 모바일 여부
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="사이버상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle">
          [법률구조 플랫폼] 에서 사이버 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              사이버상담을 제공하는 참여기관 정보와 바로 이동할 수 있는 링크를
              제공하여 , 복잡하게 찾을 필요 없이 바로 질문을 남기거나 상담을
              신청할 수 있습니다.
            </li>
            <li>
              접수한 상담 내용을 [법률구조 플랫폼] 에서 확안히고 답변을 확인하여
              One-Stop 법률구조 서비스를 실현합니다.
            </li>
            <li>
              신청하고자 하는 기관은 물론이고 참여기관의 모든 사례정보를
              확인하여 좀 더 다양하고 정확한 정보를 얻을 수 있습니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="circle">
          상담 기관별 사이버상담 안내
        </CommonTitle>

        <div class="info-img-box type02">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />

                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한법률구조공단<br />사이버상담</strong>
                    </div>
                    <div class="btns">
                      <CommonButton height="sm" fontsize="sm">
                        법률상담사례 찾기
                        <template #right-icon>
                          <Icon name="shortcut" />
                        </template>
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    법률상담사례 찾기를 통해 유사한 상담사례를 검색하실수
                    있습니다. 더 궁금하신 사항은 온라인을 통해 법률상담이
                    가능합니다. 공단은 일별 상담건수를 일 70건으로 제한합니다.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>
                        구체적인 사실관계의 확인이나 관련 자료에 대한 검토가
                        요구되는 사안은 예약 후 방문상담, 간략한 상담은
                        사이버상담(국번없이 132)을 이용하여 주시기 바랍니다.
                      </li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <ButtonGroup align="center">
                    <CommonButton
                      variants="primary"
                      :width="isMobile ? 'full' : 'md'"
                      height="md"
                    >
                      일반 상담신청
                    </CommonButton>
                    <CommonButton
                      variants="primary"
                      :width="isMobile ? 'full' : 'md'"
                      height="md"
                      class="!bg-[#0a4ca3]"
                    >
                      재외동포 상담신청
                    </CommonButton>
                  </ButtonGroup>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol2.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>한국가정법률상담소<br />사이버상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    이혼, 양육, 상속 등 '가정법률' 분야 전문 상담 기관입니다.
                    온라인으로 가정법률 전문가의 무료 법률 조언을 구해보세요.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>
                        사이버 상담글은 비공개 처리되며 본인의 글만 접근 및
                        확인이 가능합니다.
                      </li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <ButtonGroup align="center">
                    <CommonButton variants="primary" width="md" height="md">
                      상담신청
                    </CommonButton>
                  </ButtonGroup>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol3.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한가정법률복지상담원<br />사이버상담</strong>
                    </div>
                    <div class="btns">
                      <CommonButton height="sm" fontsize="sm">
                        자주하는 질문
                        <template #right-icon>
                          <Icon name="shortcut" />
                        </template>
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    대한가정법률복지상담원에서는 상담원을 찾아올 시간적, 경제적
                    여유가 없는 분들을 위하여 온라인을 통해 상담해 드립니다.
                    자주하는 질문을 통해서 유사한 상담사례를 검색하실 수
                    있습니다.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>사이버 상담글은 공개여부를 결정할 수 있습니다.</li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <ButtonGroup align="center">
                    <CommonButton variants="primary" width="md" height="md">
                      상담신청
                    </CommonButton>
                  </ButtonGroup>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h5" size="3">※ 사이버상담 유의사항</CommonTitle>

        <div class="bull-list-box">
          <BullList type="number" number-style="period">
            <li>
              이전 각기관의 법률상담사례 찾기를 통해 고객님의 사례와 유사한
              상담사례가 있는지 확인해 보시기 바랍니다.
            </li>
            <li>
              법률구조 플랫폼은 법률상담 당사자가 아닌 대국민 편의를 위해
              법률구조 가관 및 국가·공공기관 등에서 제공하는 법률상담을 연계하는
              시스템으로 실제 법률상담 진행 및 처리는 해당 참여기관에 있습니다.
            </li>
            <li>
              상담내용 신규 입력만 가능하며 답변 확인은 마이페이지에서 확인
              바랍니다.
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
