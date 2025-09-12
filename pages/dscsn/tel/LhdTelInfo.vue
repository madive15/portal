<!--
 * 화면명 : 법률홈닥터 전화상담 안내 화면
 * 화면ID : LASP_CON_010
 * 파일명 : LhdTelInfo
 * 작성자 :
 * 화면 설명 : 법률홈닥터 전화상담 안내 화면
               진입 루트 : One-Stop 법률구조 > 법률상담 방법 > 전화상담 > '상담예약 바로가기' btn
                         : One-Stop 법률구조 > 법률상담 기관 > 법률홈닥터 > '전화상담-상담예약' btn
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자    변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                        최초생성
2025.08.25    조현주    로그인 분기처리
-->

<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import CommonTitle from '~/components/ui/title/title.vue';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();

const route = useRoute();

/**
 * name : goToDscsn
 * desc : 상담예약 btn click event
 */
const goToDscsn = async () => {
  const payload = {
    // instNo: '', // 법률홈닥터 기관번호
    availInst: 'lhd', // 법률홈닥터 기관번호
    dscsnSeCd: '3' // 상담구분코드: CO0042 - 3:전화상담
  };

  if (authenticated.value) {
    // navigateTo('/dscsn/rsvt/DscsnRsvtM');
    // 1. 로그인 -> 예약화면
    // 2. 본인인증 완료 -> 예약화면
    navigateTo({
      path: '/dscsn/rsvt/DscsnRsvtM',
      query: {
        availInst: payload.availInst,
        dscsnSeCd: payload.dscsnSeCd
      } // TODO post로 변경 필요
    });
  } else {
    // 3. 로그아웃 -> 로그인 페이지
    showAlert({
      icon: 'info',
      html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
};

/**
 * name : goToMyDscsn
 * desc : 예약확인 btn click event
 */
const goToMyDscsn = () => {
  if (authenticated.value) {
    // 1. 로그인 -> 나의 상담 목록 내역(회원)
    navigateTo('/my/dscsn/rsvt/RsvtDsctnList');
    // 2. 본인인증 -> 나의 상담 목록 내역(비회원) TODO
  } else {
    // 3. 로그아웃 -> 로그인 페이지
    showAlert({
      icon: 'info',
      html: '상담예약 확인은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :show-print-button="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle"
          >전화상담의 특징</CommonTitle
        >
        <div class="counsel-main-img-box">
          <div class="main-box-item bg01">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_01.png" alt="" />
            </div>

            <span>15분 전화상담</span>
          </div>
          <div class="main-box-item bg02">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_02.png" alt="" />
            </div>
            <span>원하는 시간예약</span>
          </div>
          <div class="main-box-item bg03">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_03.png" alt="" />
            </div>
            <span>간단한<br class="mo-only" />궁금증해결</span>
          </div>
          <div class="main-box-item bg04">
            <div class="img-box">
              <img src="/image/sub/counsel/counsel_top_ico_04.png" alt="" />
            </div>
            <span>방문이<br class="mo-only" />필요없는 상담</span>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="circle"
          >전화상담예약 진행절차</CommonTitle
        >
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              희망 상담일은 5일 이전부터 등록 가능하며, 최대 4주의 기간 내,
              상담일을 등록할 수 있습니다.
            </li>
          </ul>
          <div class="counsel-sub-img-box">
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_01.png" alt="" />
              </div>
              <span>상담신청<br class="pc-only" />서비스 안내</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_02.png" alt="" />
              </div>
              <span>상담신청서 작성</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_03.png" alt="" />
              </div>
              <span>신청완료</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_04.png" alt="" />
              </div>
              <span>예약확정</span>
            </div>
            <div class="sub-box-item">
              <div class="img-box">
                <img src="/image/sub/counsel/counsel_sub_ico_05.png" alt="" />
              </div>
              <span>상담완료</span>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="circle"
          >전화상담예약 주의사항</CommonTitle
        >

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
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
          </ul>
        </div>

        <CommonTitle tag="h4" size="1" type="circle"
          >꼭 확인해주세요!</CommonTitle
        >

        <div class="bull-list-box">
          <ul class="counsel-r-num-list">
            <li>
              <span class="num">1</span>
              법률상담은 법무부 소속 변호사(법률홈닥터)가 해 드리고 있으며,
              서비스 비용은 무료입니다.
            </li>
            <li>
              <span class="num">2</span>
              법률홈닥터는 취약계층의 1차 법률상담을 지원해드리는 제도로,
              신청자의 유형에 따라 상담의 진행이 어려울 수 있습니다.
            </li>
            <li>
              <span class="num">3</span>
              법률상담은 변호사 개인의 법률적 견해를 토대로 법적 조언을 하는
              것이므로 의사결정 시 참고자료로만 활용하시기 바랍니다.
            </li>
            <li>
              <span class="num">4</span>
              법률상담 이외에 단순 진정이나 민원성 상담은 해드리지 않습니다.
            </li>
            <li>
              <span class="num">5</span>
              불법·탈법행위의 수단이나 목적, 근거 없는 비방, 욕설 등의 상담은
              제한될 수 있으니 양해하여 주시기 바랍니다.
            </li>
            <li>
              <span class="num">6</span>
              동일한 사건으로 중복된 상담을 신청할 경우 제한될 수 있으니
              양해하여 주시기 바랍니다.
            </li>
          </ul>
        </div>

        <div class="button-box">
          <button type="button" class="btn type02" @click="goToDscsn">
            상담예약</button
          ><button type="button" class="btn type01" @click="goToMyDscsn">
            예약확인
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/tel/LhdTelInfo.scss';
</style>
