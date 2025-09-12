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
                src="/image/sub/counsel/counsel_top_txt_03.png"
                alt="대한가정법률복지상담원"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                경제적으로 어렵거나 법을 잘 몰라 호소할 곳조차 찾지 못하는
                어려운 분들을 위해 설립된 법률구조기관입니다.<br
                  class="pc-only"
                />
                대한가정법률복지상담원에서는 법률상담, 화해조정과 대서 및 무료
                소송대리 등의<br class="pc-only" />
                법률구조서비스를 지원합니다.
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
                    공개게시판
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    비공개게시판
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
          <CommonTable class="mt-17px">
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
                <td>이혼, 친권, 양육비, 가족관계 등 가사사건</td>
                <td>
                  평일 : 오전 10시-오후 5시 (접수 오후 4시까지) <br />
                  야간 : 매주 월요일 오후 6시-9시(접수 오후 8시까지)
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
                <td>이혼, 친권, 양육비, 가족관계 등 가사사건</td>
                <td>예약 일시</td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">전화상담</div>
                </td>
                <td>
                  02-3675-0142, 0143 전화를 통한<br />
                  실시간 상담
                </td>
                <td>간단 상담이 필요한 고객</td>
                <td>
                  평일 : 오전 9시 30분-오후 5시 30분<br />
                  야간 : 매주 월요일 오후 6시-9시
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
              대한가정법률복지상담원에서는 법률상담, 화해조정과 대서 및 무료
              소송대리 등의 법률구조서비스를 지원합니다.
            </li>
            <li>
              더 이상 혼자 번민하지 마시고 대한가정법률복지상담원과 함께
              해결책을 찾아보세요. 상담경험이 풍부한 전문 상담위원과
              법률전문가가 여러분을 도와드립니다.
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
