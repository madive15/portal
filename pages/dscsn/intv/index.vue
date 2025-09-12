<!--
 * 화면명 : 면접상담
 * 화면ID : LASP_CON_001
 * 파일명 : /dscsn/intv/index.vue
 * 작성자 :
 * 화면 설명 : One-Stop 법률구조 > 법률상담 방법 > 면접상담 (첫 화면)
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자    변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                        최초생성
2025.08.25    조현주    로그인 분기처리
-->

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();

const { showAlert } = useCustomAlert();

/**
 * name : goToDscsn
 * desc: 상담예약 버튼 클릭 이벤트
 */
const goToDscsn = () => {
  // 로그인, 본인인증 완료상태
  if (authenticated.value) {
    navigateTo({
      path: '/dscsn/rsvt/DscsnRsvtM',
      query: { availInst: 'A', dscsnSeCd: '1' } // TODO post로 변경 필요
    });
  } else {
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
 * desc : 예약확인 버튼 클릭 이벤트
 */
const goToMyDscsn = async () => {
  if (authenticated.value) {
    // 1. 로그인 -> 나의 상담 목록 내역(회원)
    navigateTo('/my/dscsn/rsvt/RsvtDsctnList');
    // 2. 본인인증 -> 나의 상담 목록 내역(본인인증) TODO ?
  } else {
    // 페이지 개발 후 수정필요
    // 3. 로그아웃(비회원) -> 나의 상담 조회(비회원) TODO
    alert('비회원 상담조회 이동');
    // navigateTo('/my/dscsn/rsvt/guest');
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
        <CommonTitle tag="h4" size="1" type="circle">
          [법률구조 플랫폼] 에서 면접 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
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
          </ul>
        </div>

        <CommonTitle tag="h4" size="1" type="circle"
          >상담 기관별 면접상담 특징</CommonTitle
        >
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
                      <strong>방문장소</strong>
                      <span>전국 각 지역의 지부 또는 출장소</span>
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
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
                      <strong>방문장소</strong>
                      <span>서울 본원 및 일부 지역 지부(지소)</span>
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
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
                      <strong>방문장소</strong>
                      <span
                        >해당 지역에 위치한 상담원 사무실<br />
                        (※ 특정 기관 정보 확인 필수)</span
                      >
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
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
                      <strong>방문장소</strong>
                      <span
                        >변호사가 배치된 지방자치단체<br />(시/군/구청 등) 또는
                        사회복지기관</span
                      >
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
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

        <CommonTitle tag="h5">※ 면접상담 유의사항</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-num-list">
            <li>
              <span class="num">1.</span>상담예약은 본인인증 되었거나 회원
              로그인 후 이용 가능합니다.
            </li>
            <li>
              <span class="num">2.</span>면접상담은 참여 기관의 예약을 우선으로
              합니다.
            </li>
            <li>
              <span class="num">3.</span>예약취소를 하지 않은 채 방문하지 않은
              경우 각 참여 기관의 정책에 따라 예약이 제한될 수 있습니다.
            </li>
            <li>
              <span class="num">4.</span>예약접수는 휴일을 제외하고 매일 오전
              09:00에 개시됩니다.
            </li>
            <li>
              <span class="num">5.</span>같은 참여 기관을 중복으로 예약하거나
              동일 내용의 재예약은 참여기관 정책에 따라 제한될 수 있습니다.
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
@use '~/assets/style/pages/dscsn/intv/index.scss';
</style>
