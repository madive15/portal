<!--
 * 화면명 : 면접상담 예약 완료
 * 화면ID : LASP_CON_033
 * 파일명 : IntvKlacView
 * 작성자 : 노한서
 * 화면 설명 : 면접상담 예약완료/전화상담 예약완료 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.07.30  노한서   최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import { computed } from 'vue';
import axios from 'axios';
definePageMeta({
  layout: 'pub2nd'
});

const resData = ref();

// 예약 후 넘어오는 데이터
interface propsData {
  rsvtNo: '';
  dscsnAplyNo: '';
  type: '';
}

// 샘플 데이터
const sampleData = ref<propsData>({
  rsvtNo: '250801-112001',
  dscsnAplyNo: 'A250801I0010001',
  type: '1'
});

const dscsnSeNm = ref();
// 상담구분코드 공통코드
const dscsnSeCodes = await useCommonCodeStore().searchCommonCodeList('CO0042');

// 넘어온 type과 상담구분코드 매칭
for (let i = 0; i < dscsnSeCodes.length; i++) {
  if (sampleData.value.type === dscsnSeCodes[i].value) {
    dscsnSeNm.value = dscsnSeCodes[i].text;
  }
}

// 예약정보 셀렉트
// try {
//   const res = await axios
//     .get('/api/dscsn/selectRsvtInfo', {
//       params: { rsvtNo: sampleData.value.rsvtNo }
//     })
//     .then((res) => {
//       resData.value = res.data;
//       console.log('=== 받아온 데이터 ===', resData.value);
//     });
// } catch (err) {
//   console.log('axios failed', err);
// }

// TODO 예약확인 페이지로 이동
const goToMyDscsn = () => {
  // 클릭시 로그인 상태나 본인인증 완료 상태에 따라
  // 분기되어 마이페이지>상담예약 내역으로 이동
  navigateTo('/my/dscsn/rsvt/list');
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- <Breadcrumb :showPrintButton="true" /> -->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>{{ dscsnSeNm }}</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button">
                  <span class="text-span"> 뒤로가기 </span></button
                ><button class="btn print-button">
                  <span class="text-span"> 인쇄하기 </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-comp-header">
          <div class="inner">
            <div class="top-logo">
              <img src="/image/sub/counsel/counsel_comp_icon.png" alt="" />
            </div>
            <div class="top-desc">{{ dscsnSeNm }} 예약이 완료되었습니다.</div>
          </div>
        </div>

        <CommonTitle tag="h5" size="2" type="dot">
          면접상담 예약정보
        </CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              면접상담 예약정보에관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">상담기관</th>
                <td>
                  <img
                    class="logo-img"
                    src="/image/sub/counsel/counsel_top_txt.png"
                    alt="대한법률구조공단"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">예약번호</th>
                <td>250417-130001</td>
              </tr>
              <tr>
                <th scope="row">상담장소</th>
                <td>인천지부 / 인천광역시 미추홀구 소성로 171</td>
              </tr>
              <tr>
                <th scope="row">예약일시</th>
                <td><span class="is-emphasis">2025.04.10 11:00</span></td>
              </tr>
              <tr>
                <th scope="row">접수일시</th>
                <td><span class="is-emphasis">2025.04.08 11:00</span></td>
              </tr>
              <tr>
                <th scope="row">상담내용</th>
                <td>상담 제목이나 상담 내용의 첫줄만 말줄임으로 노출됩니다.</td>
              </tr>
              <tr>
                <th scope="row">문의</th>
                <td>033-576-0620</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 예약 유의사항 </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              법률구조 플랫폼은 법률상담 당사자가 아닌 대국민 편의를 위해
              법률구조 가관 및 국가·공공기관 등에서 제공하는 법률상담을 연계하는
              시스템으로 실제 법률상담 진행 및 처리는 해당 참여기관에 있습니다.
            </li>
            <li>
              많은 국민들께서 공단을 이용하고 계시므로 원활한 법률상담과
              법률구조업무 수행을 위해 예약상담 시간은 20분 이내로 운영되고
              있으니 참고하시기 바라며 양해를 당부드립니다
            </li>
            <li>
              예약 상담 취소는 예약 상담일 상담시간까지 가능하나, 예약
              상담일(당일) 상담시간대 변경을 원하시는 경우 예약 상담 기관으로
              문의 하여 주시기 바랍니다.
            </li>
            <li>
              예약취소를 하지 않은 채 방문하지 않은 경우 각 참여 기관의 정책에
              따라 예약이 제한될 수 있습니다.
            </li>
            <li>
              같은 참여 기관을 중복으로 예약하거나 동일 내용의 재예약은 참여기관
              정책에 따라 제한될 수 있습니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs" @click="goToMyDscsn"
            >예약확인</CommonButton
          >
          <CommonButton
            variants="line-primary"
            width="xs"
            @click="navigateTo('/')"
          >
            메인으로 가기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/IntvTelView';
</style>
