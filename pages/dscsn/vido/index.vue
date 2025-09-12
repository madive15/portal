<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const { showAlert } = useCustomAlert();

const goToDscsn = () => {
  // 로그인, 본인인증 완료상태
  if (authenticated.value) {
    // 페이지 개발 후 수정필요
    alert('통합 화상상담 예약페이지 이동');
  } else {
    showAlert({
      icon: 'info',
      html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    })
      .then((result) => {
        if (result.isConfirmed) {
          // 로그인 페이지 이동
          // anyID 로그인페이지 및 재랜딩 수정필요
          navigateTo('/login');
        }
      })
      .catch(() => {});
  }
};
const goToMyDscsn = () => {
  if (authenticated.value) {
    // 1. 로그인 -> 나의 상담 목록 내역(회원)
    // 2. 본인인증 -> 나의 상담 목록 내역(본인인증)
    navigateTo('/my/dscsn/rsvt/list');
  } else {
    // 페이지 개발 후 수정필요
    // 3. 로그아웃(비회원) -> 나의 상담 조회(비회원)
    alert('비회원 상담조회 이동');
    // navigateTo('/my/dscsn/rsvt/guest');
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
        <CommonTitle tag="h4" type="circle" size="1">
          [법률구조 플랫폼] 에서 화상 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              화상 상담 가능 기관 찾기 : 원하는 날짜와 시간에 맞춰 화상 상담이
              가능한 기관의 정보를 쉽게 확인 할 수 있습니다.
            </li>
            <li>
              제공 기관과 연계해 화상 상담 예약과 상담 내용을 [법률구조 플랫폼]
              에서 신청하고 처리 결과를 확인하여 One-Stop 법률구조 서비스를
              실현합니다.
            </li>
            <li>
              화상 상담 특징 비교: 어떤 기관에서 어떤 분야의 방문 상담을 주로
              하는지(민사, 가사, 형사 등), 어떤 대상에게 더 적합한지 비교하여
              나에게 가장 알맞은 방문 상담 기관을 선택할 수 있습니다.
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >상담 기관별 화상상담 특징</CommonTitle
        >
        <div class="info-img-box type01">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />
                  <div class="txt">
                    <strong>대한법률구조공단<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주요 서비스</strong>
                      <span>제한없음</span>
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
                    <strong>한국가정법률상담소<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주요 서비스</strong>
                      <span>가사사건에만 한정됨</span>
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
                      <span>심층 가사 전문 화상상담</span>
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
                    <strong>대한가정법률복지상담원<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주요 서비스</strong>
                      <span>부부상담, 가사 및 민사, 형사</span>
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
                      <span>법률-복지 연계 원스톱 화상상담</span>
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
                    <strong>법률홈닥터<br />화상상담</strong>
                    <span class="box-tit-flag">예약</span>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>주요 서비스</strong>
                      <span
                        >민사, 임대차, 가사, 이혼, 형사, 기타 전반의 지역주민
                        대상 법률 상담
                      </span>
                    </li>
                    <li>
                      <strong>특&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;징</strong>
                      <span>찾아가는 생활 밀착형 화상상담</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >화상상담 상세 정보</CommonTitle
        >
        <div>화상상담 상세정보 노출</div>
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
@use '~/assets/style/pages/dscsn/vido/index.scss';
</style>
