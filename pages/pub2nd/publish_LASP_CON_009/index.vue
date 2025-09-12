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
                src="/image/sub/counsel/counsel_top_txt_04.png"
                alt="법률홈닥터"
              />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                법률홈닥터는 법무부가 변호사를 ‘법률홈닥터’로 직접 채용,
                지방자치단체·사회복지협의회 등에 배치하여<br class="pc-only" />
                법률보호가 필요한 서민들에게 ‘찾아가는 법률서비스’를 제공하는
                사업입니다.
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
          <CommonTable class="mt-17px">
            <caption>
              법률상담 안내 내용 - 상담유형, 상담방법, 이용상황(주 이용고객),
              제공시간에 대한 표
            </caption>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 40%" />
              <col style="width: 40%" />
              <col style="width: 10%" />
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
                <td>면접 상담 예약 후 법률홈닥터 방문 후 상담</td>
                <td>
                  이혼, 친권, 양육비, 가족관계 등 가사사건, 민사,<br />
                  형사, 행정 등 사건, 기타 사건
                </td>
                <td>예약 일시</td>
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
                <td>예약일시에 화상을 통한 예약상담</td>
                <td>
                  이혼, 친권, 양육비, 가족관계 등 가사사건, 민사,<br />
                  형사, 행정 등 사건, 기타 사건
                </td>
                <td>예약 일시</td>
              </tr>
              <tr>
                <td>
                  <div class="btn-box">
                    전화상담
                    <CommonButton height="sm" fontsize="sm" variants="primary">
                      상담예약
                    </CommonButton>
                  </div>
                </td>
                <td>면접 상담 예약 후 법률홈닥터 방문 후 상담</td>
                <td>간단 상담이 필요한 고객</td>
                <td>예약 일시</td>
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
              1차 법률상담을 전화로 진행하는 상담입니다. 기본 15분 상담하는 것을
              원칙으로 하고 있으며, 보다 더 상세한 상담이 필요한 경우에는
              방문상담을 추가적으로 신청하신 후 진행하는 것을 권장합니다.
            </li>
            <li>
              전화상담 후 추가적인 상담이 필요한 경우 전화 또는 온라인으로 추가
              상담을 신청해 주시되, 동일한 내용으로 중복 신청하는 경우 상담이
              제한될 수 있습니다.
            </li>
            <li>
              원활한 상담을 위해 신청일로부터 5일(근무일 기준) 이후부터 예약이
              가능하며, 신청 후 7일이내에는 신청내용의 수정이 가능합니다.
            </li>
            <li>
              온라인 상담신청서에서 작성한 희망 일/시는 담당 법률홈닥터의 확인
              후 신청자의 일정에 맞추어 조정 후 확정되며, 상담이 진행,
              완료됩니다.
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          꼭 확인해주세요!
        </CommonTitle>

        <div class="bull-list-box">
          <BullList type="number" number-style="circle">
            <li>
              법률상담은 법무부 소속 변호사(법률홈닥터)가 해 드리고 있으며,
              서비스 비용은 무료입니다.
            </li>
            <li>
              법률홈닥터는 취약계층의 1차 법률상담을 지원해드리는 제도로,
              신청자의 유형에 따라 상담의 진행이 어려울 수 있습니다.
            </li>
            <li>
              법률상담은 변호사 개인의 법률적 견해를 토대로 법적 조언을 하는
              것이므로 의사결정 시 참고자료로만 활용하시기 바랍니다.
            </li>
            <li>
              법률상담 이외에 단순 진정이나 민원성 상담은 해드리지 않습니다.
            </li>
            <li>
              불법·탈법행위의 수단이나 목적, 근거 없는 비방, 욕설 등의 상담은
              제한될 수 있으니 양해하여 주시기 바랍니다.
            </li>
            <li>
              동일한 사건으로 중복된 상담을 신청할 경우 제한될 수 있으니
              양해하여 주시기 바랍니다.
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
