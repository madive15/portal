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
                src="/image/sub/counsel/counsel_top_txt.png"
                alt="대한법률구조공단"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                대한법률구조공단은 법률지식이 부족하면서도 경제적으로 어려워
                법의 보호를 충분히 받지 못하는 사람들에게<br class="pc-only" />
                법률상담, 변호사에 의한 소송대리 및 형사변호 등의 법률적 지원을
                하기 위하여 설립된 공공기관입니다.
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    챗봇상담
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
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
                    채팅상담
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
                    사이버상담
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
              제공시간, 상담시간, 1일 최대 상담 건수, 유의 사항에 대한 표
            </caption>
            <thead>
              <tr>
                <th scope="col">상담유형</th>
                <th scope="col">상담방법</th>
                <th scope="col">이용상황(주 이용고객)</th>
                <th scope="col">제공시간</th>
                <th scope="col">상담시간</th>
                <th scope="col">1일 최대<br />상담 건수</th>
                <th scope="col">유의 사항</th>
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
                <td>예약+공단, 방문 +면접상담<br />(예약상담 원칙)</td>
                <td>법률 구조가 필요한 고객</td>
                <td>평일 오전 10시~오후 5시<br />(12시~1시 불가 )</td>
                <td>20분 이내</td>
                <td>제한 없음</td>
                <td>
                  <router-link class="counsel-down-btn" to="">
                    <span class="underline">상담 제한 내용 확인</span>
                  </router-link>
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
                <td>예약일시에 화상을 통한<br />예약상담</td>
                <td>
                  거동불편 취약계층 우선이용+서류를 보여줄 필요<br />
                  +100자 이상 상담내용 기재
                </td>
                <td>예약 일시</td>
                <td>20분 이내</td>
                <td>40~60건</td>
                <td>
                  상담 인원 제한으로 상담이<br />
                  원활하지 않을 수 있음
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    132 전화상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      이용안내
                    </CommonButton>
                  </div>
                </td>
                <td>
                  국번 없이 132 전화를 통한<br />
                  실시간 상담
                </td>
                <td>간단한 상담이 필요한 고객</td>
                <td>
                  평일 오전 9시~오후 6시<br />
                  (12시~1시 불가 )
                </td>
                <td>5분 이내</td>
                <td>제한 없음</td>
                <td>
                  시간대별 상담직원 수에 따라<br />
                  상담이 원활하지 않을 수 있음
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    사이버상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      상담신청
                    </CommonButton>
                  </div>
                </td>
                <td>
                  상담신청을 통한<br />
                  상담 내용 작성
                </td>
                <td>홈페이지를 통한 답변을 원하는고객</td>
                <td>-</td>
                <td>-</td>
                <td>70건</td>
                <td>
                  1일 상담 건수 제한으로<br />
                  상담이 원활하지 않을 수 있음
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    채팅상담
                    <CommonButton
                      height="sm"
                      fontsize="sm"
                      variants="line-primary"
                    >
                      바로가기
                      <template #right-icon>
                        <Icon name="shortcutBlue" />
                      </template>
                    </CommonButton>
                  </div>
                </td>
                <td>
                  132 전화, 챗봇 홈페이지를<br />
                  통한 실시간 채팅상담
                </td>
                <td>
                  손해배상, 계약 등 민사소송, 임대차, 개인회생,<br />
                  파산 등 간단상담이 필요한 고객
                </td>
                <td>
                  평일 오전 10시~오후 5시<br />
                  (12시~1시 불가 )
                </td>
                <td>10분 이내</td>
                <td>50-100건</td>
                <td>
                  2017-상담 인원 제한(시간당3~4명)<br />
                  으로 상담이 원활하지 않을 수 있음
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    챗봇상담
                    <CommonButton
                      height="sm"
                      fontsize="sm"
                      variants="line-primary"
                    >
                      바로가기
                      <template #right-icon>
                        <Icon name="shortcutBlue" />
                      </template>
                    </CommonButton>
                  </div>
                </td>
                <td colspan="6">
                  법률상담 사례, 법률서식에 대한 정보, 가까운 공단 위치 안내,
                  상담예약이 필요한 고객은 챗봇을 이용하기 바랍니다.
                </td>
              </tr>
            </tbody>
          </CommonTable>
        </ImgBox>

        <CommonTitle tag="h4" size="1" type="bar">
          면접상담 제한 내용
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
            <li>면접상담은 예약을 우선으로 합니다.</li>
            <li>
              예약접수는 휴일을 제외하고 매일 오전 09:00부터 시작됩니다.(매일
              예약이 가능합니다.)
            </li>
            <li>
              당일 예약접수가 마감된 경우 근무일 기준 익일 09:00에 다시
              예약접수가 시작됩니다.(오늘 예약을 하면 각 기관에서 설정한
              접수기간 내 상담할 수 있습니다.)
            </li>
            <li>
              <div>
                아래
                <ul class="sub-list">
                  <li>
                    <span class="num">※</span>매일 예약이 가능하므로 예약한
                    일자에 내방이 어려울 경우 다른 고객이 공단의 법률상담제도를
                    이용할 수 있도록 반드시 하루 전까지 예약을 취소하여 주시기
                    바랍니다.
                  </li>
                  <li>
                    <span class="num">※</span>한번 내방으로 상담이 종결될 수
                    있도록 질문할 내용을 정리하여 내방하여 주시면
                    감사하겠습니다.
                  </li>
                  <li>
                    <span class="num">※</span>더 많은 고객이 공단의 법률상담
                    제도를 이용할 수 있도록 아래와 같은 경우 예약이 제한 됩니다.
                  </li>
                </ul>
              </div>
            </li>
          </BullList>
        </div>

        <CommonTable class="mt-17px">
          <caption>
            면접상담 제한 내용 - 제한사유, 제한 기간(상담일로부터 기산), 제한
            이유 등 에 대한 표
          </caption>
          <colgroup>
            <col width="33.333%" />
            <col width="33.333%" />
            <col width="33.333%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">제한사유</th>
              <th scope="col">제한 기간(상담일로부터 기산)</th>
              <th scope="col">제한 이유 등</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>① 노쇼(예약취소 없이 내방하지 않는 경우)</td>
              <td>1개월</td>
              <td>매일 예약이 가능함에도 다른 국민의 상담기회 박탈</td>
            </tr>
          </tbody>
        </CommonTable>

        <CommonTitle tag="h4" size="1" type="bar">
          법률상담 시 유의사항
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              공단은 한정된 인원으로 상담이 진행되고 있어 상담이 지연될 수
              있습니다.
            </li>
            <li>
              상담내용은 고객이 제시한 자료에 기초한 관련 법령이나 판례의 태도
              등에 대한 상담직원의 의견이므로, 관련 법적분쟁에서 참고자료로만
              활용하시기 바랍니다.
            </li>
            <li>
              비예약 면접상담, 132 전화상담, 채팅상담 등은 월․화요일, 하루 중
              오전에 상담이 많습니다.(사정에 따라 다를 수 있음)
            </li>
            <li>
              상담유형별 특성을 참고하여 적절한 상담방법을 선택하여 주시기
              바랍니다.
            </li>
            <li>
              상담유형별 특성을 참고하여 적절한 상담방법을 선택하여 주시기
              바랍니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 법률상담 제한 </CommonTitle>

        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              우리 공단은 산업안전보건법에 따른 고객응대근로자 보호조치로 폭언,
              욕설, 성희롱 등의 상담 및 아래 표와 같은 내용의 상담은 제한될 수
              있습니다.
            </li>
            <li>행정기관ㆍ법원의 처분 및 판결 결과 등에 대한 탄원성 질의</li>
            <li>강제집행면탈ㆍ조세포탈 등 반사회질서에 해당하는 질의</li>
            <li>
              기타 공단 설립취지상 답변이 부적절하다고 판단되는 내용 등의
              질의(예, 법령ㆍ정관ㆍ내규 등의 유권해석을 구하는 질의)
            </li>
            <li>
              <div>
                단체 내부 분쟁사항에 대한 질의
                <ul class="sub-list">
                  <li class="blue block">
                    <span class="num">※</span>법률상담 이외의 전문분야는
                    <span class="underline"
                      >소관기관을 이용하시기 바랍니다.</span
                    >
                  </li>
                </ul>
              </div>
            </li>
          </BullList>
        </div>

        <CommonTable class="mt-17px">
          <caption>
            법률상담 제한 내용 - 전문분야, 상담기간, 전화번호(국번없이) 에 대한
            표
          </caption>
          <colgroup>
            <col width="33.333%" />
            <col width="33.333%" />
            <col width="33.333%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">전문분야</th>
              <th scope="col">상담기간</th>
              <th scope="col">전화번호(국번없이)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>세무상담</td>
              <td>국세청</td>
              <td>126</td>
            </tr>
            <tr>
              <td>소비자상담</td>
              <td>소비자상담센터</td>
              <td>1372</td>
            </tr>
            <tr>
              <td>고용관계(실업급여 등)</td>
              <td>고용노동부</td>
              <td>1350</td>
            </tr>
            <tr>
              <td>금융분쟁</td>
              <td>금융감독원</td>
              <td>1332</td>
            </tr>
          </tbody>
        </CommonTable>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
