<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import * as instApis from '~/composables/inst';

// 기관정보
const instNo = 'I019000000';
const instInfo = ref();

onMounted(() => {
  getInstInfo();
});

// 양육비이행관리원 기관정보 조회
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
                src="/image/sub/counsel/counsel_top_txt_05.png"
                alt="양육비이행관리원"
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
                    to="https://www.childsupport.or.kr/lay1/program/S1T43C46/visit/visitWrite.do"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    대면상담 예약
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://www.childsupport.or.kr/lay1/program/S1T43C126/visit/visitSignWrite.do"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    수어통역상담 예약
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://www.childsupport.or.kr/lay1/program/S1T43C44/part/part_02_01.do"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    온라인 상담
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1">양육비 이행지원 서비스</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              <div class="font-mid">
                <strong>양육비 이행 지원 서비스</strong>는 양육부·모(양육비
                채권자)의 신청을 받아 비양육 부·모로 부터 양육비를 지급받을 수
                있도록 당사자 간 협의 성립, 양육비 관련 소송, 추심, 불이행 시
                제재조치 등을 지원하는 서비스입니다.
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1">양육비 상담 안내</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              <div class="font-mid">
                <strong>양육비 이행 관리원에서</strong>는 전반적인 양육비 문제에
                대해 전화, 방문, 온라인 등 다양한 방법으로 상담을 진행하고
                있습니다. 상담 대상은 양육비로 인해 어려움을 겪고 있는
                양육부·모, 양육비 채권자, 비양육부·모, 양육비 채무자, 일반인이며
                양육비 이행확보 지원은 양육부·모와 양육비 채권자에 한하여
                진행합니다.
              </div>
            </li>
          </ul>
        </div>
        <ImgBox useScroll>
          <div class="table-box">
            <CommonTable type="bordered">
              <caption>
                법률상담 안내 내용 - 상담유형, 상담방법, 이용정보에 대한 표
              </caption>
              <thead>
                <tr>
                  <th scope="col">상담유형</th>
                  <th scope="col">상담방법</th>
                  <th scope="col">이용정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      대면상담 예약
                      <NuxtLink
                        class="counsel-goto-btn"
                        to="https://www.childsupport.or.kr/lay1/program/S1T43C46/visit/visitWrite.do"
                        title="대면상담 예약"
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        바로가기
                      </NuxtLink>
                    </div>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">· 전화 예약 : </span>1644-6621, 1번
                        연결
                      </li>
                      <li>
                        <span class="num">· 온라인 예약 : </span>
                        <div>
                          <strong
                            >양육비이행관리원 홈페이지-소통·참여-방문상담
                            예약</strong
                          >
                        </div>
                      </li>
                    </ul>
                    <ul class="table-bull-list">
                      <li><span class="num">※</span>사전 예약 필수</li>
                      <li>
                        <span class="num">※</span>
                        방문 상담 최대 이용 가능 시간은 하루 30분입니다.
                      </li>
                    </ul>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">· 오시는 길 : </span>서울특별시 중구
                        퇴계로 173(충무로3가, 남산스퀘어) 24층
                      </li>
                      <li>
                        <span class="num">· 이용 시간 : </span>월~금(공휴일
                        제외) 09:00~11:00 / 13:00~17:00
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      수어통역상담 예약
                      <NuxtLink
                        class="counsel-goto-btn"
                        to="https://www.childsupport.or.kr/lay1/program/S1T43C126/visit/visitSignWrite.do"
                        title="수어통역상담 예약"
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        바로가기
                      </NuxtLink>
                    </div>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">· 전화 예약 : </span>1644-6621, 1번
                        연결
                      </li>
                      <li>
                        <span class="num">· 온라인 예약 : </span>
                        <div>
                          <strong
                            >양육비이행관리원 홈페이지-소통·참여-수어통역상담
                            예약
                          </strong>
                        </div>
                      </li>
                    </ul>
                    <ul class="table-bull-list">
                      <li><span class="num">※</span>사전 예약 필수</li>
                    </ul>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">※</span>양육비이행관리원에서는
                        손말이음센터 107과의 통신중계서비스 협력을 통해 청각장애
                        신청인을 위한 음성전화중계, 영상중계 등의 수어통역
                        서비스를 제공하고 있습니다.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      온라인 상담
                      <NuxtLink
                        class="counsel-goto-btn"
                        to="https://www.childsupport.or.kr/lay1/program/S1T43C44/part/part_02_01.do"
                        title="온라인 상담"
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        바로가기
                      </NuxtLink>
                    </div>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">· 신청 방법 : </span>양육비이행관리원
                        홈페이지 메인화면의 ‘양육비상담신청’ 아이콘을 클릭하거나
                        [소통·참여 – 온라인상담]메뉴에 접속하시면 되고, 상담
                        신청 및 조회는 비회원도 이용할 수 있습니다. 단, 본인인증
                        절차는 필수입니다.
                      </li>
                      <li>
                        <span class="num">· 이용절차 : </span>
                        약관동의 및 본인 인증 > 상담글 입력 > 상담신청 완료
                      </li>
                    </ul>
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">※</span>본인 인증은 휴대폰을 이용하여
                        진행할 수 있습니다.
                      </li>
                      <li>
                        <span class="num">※</span>
                        사실관례 및 질문의 요지를 2,000자 이내로 작성해야
                        합니다.
                      </li>
                    </ul>
                  </td>
                  <td class="title-td left-align">
                    <ul class="table-bull-list">
                      <li>
                        <span class="num">※</span>온라인 상담은 질문자의
                        상담신청 내용에 근거하여 상담이 진행될 수 밖에 없는
                        특성을 가지고 있으므로 사실관계가 지나치게 생략되거나
                        지나치게 방대할 경우 정확한 상담이 어렵습니다.
                      </li>
                      <li>
                        <span class="num">※</span>
                        상담신청 시 파일은 첨부할 수 없으며 질문내용에 단순히
                        다른 사이트를 링크해 놓는 경우에는 답변을 해드리지
                        않습니다.
                      </li>
                      <li>
                        <span class="num">※</span>
                        접수일 다음 날부터 7일(주말 및 공휴일 제외) 이내에
                        답변을 등록해 드립니다.
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
        </ImgBox>
        <ul class="counsel-num-list">
          <li>
            <span class="num">
              <strong>※</strong>
            </span>
            <strong
              >양육비이행관리원의 어떤 지원절차 중에서도 당사자가 원하면 합의를
              지원해드립니다.</strong
            >
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/csa/index.scss';
</style>
