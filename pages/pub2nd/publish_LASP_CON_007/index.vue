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
          breadcrumbTitle="법률상담 기관"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-top-header">
          <div class="inner">
            <div class="top-logo">
              <img
                src="/image/sub/counsel/counsel_top_txt_02.png"
                alt="한국가정법률상담소"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                한국가정법률상담소는 우리나라 최초의 민간
                가사전문법률구조기관으로 사회적 약자의 권익보호를 위해 법률상담,
                <br class="pc-only" />
                소송구조 및 기타 법률서비스를 무료로 지원 합니다.
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    면접상담
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    화상상담
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    전화상담
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 법률상담 안내 </CommonTitle>

        <ImgBox useScroll>
          <CommonTable class="lg:mt-17px">
            <caption>
              법률상담 안내 내용 - 상담유형, 상담방법, 이용상황(주 이용고객),
              제공시간에 대한 표
            </caption>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 30%" />
              <col style="width: 30%" />
              <col style="width: 30%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">상담유형</th>
                <th scope="col">상담방법</th>
                <th scope="col">이용상황(주 이용고객)</th>
                <th scope="col">제공시간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="btn-box">
                    면접상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      상담예약
                    </CommonButton>
                  </div>
                </td>
                <td>면접 상담 예약 후 상담소 방문 후 상담</td>
                <td>가사, 민사, 형사, 파산 및 면책사건등 법률문제 전반</td>
                <td>
                  평일 : 오전 10시-오후 5시 (접수 오후 4시까지)<br />
                  야간 : 매주 월요일 오후 6시-8시(접수 오후 7시까지)
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    화상상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      상담예약
                    </CommonButton>
                  </div>
                </td>
                <td>화상 상담 예약 후 예약일시에 화상을 통한 예약상담</td>
                <td>가사사건 한정</td>
                <td>예약 일시</td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">전화상담</div>
                </td>
                <td>
                  <a href="tel:1644-7077" class="is-emphasis">1644-7077</a
                  ><br />전화를 통한 실시간 상담
                </td>
                <td>간단 상담이 필요한 고객</td>
                <td>
                  평일 : 오전 10시-오후 5시 (접수 오후 4시까지) <br />
                  야간 : 매주 월요일 오후 6시-8시(접수 오후 7시까지)
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    사이버상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      상담예약
                    </CommonButton>
                  </div>
                </td>
                <td>상담신청을 통한 상담 내용 작성</td>
                <td>홈페이지를 통한 답변을 원하는 고객</td>
                <td>-</td>
              </tr>
            </tbody>
          </CommonTable>
        </ImgBox>

        <CommonTitle tag="h4" size="1" type="bar">
          법률상담 시 유의사항
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              전 국민을 대상으로 가사, 민사, 형사, 파산 및 면책사건등 법률문제
              전반에 걸쳐 무료 법률상담을 제공하고 있습니다.
            </li>
            <li>
              상담은 본 상담소를 직접 방문하여 받을 수 있는 면접상담과 전화,
              지상, 순회, 인터넷, 출장 등 다양한 상담창구가 마련되어 있습니다.
            </li>
            <li>
              또한 낮에 상담소 방문이 어려운 분들은 매주 월요일 저녁에 실시되는
              야간상담을 이용하실수 있습니다.
            </li>
            <li>
              저희 상담소에서는 다문화가정을 위한 영어 법률상담도 제공하고
              있습니다.
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
