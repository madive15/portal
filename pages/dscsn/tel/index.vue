<!--
 * 화면명 : 전화상담
 * 화면ID : LASP_CON_003
 * 파일명 : /dscsn/tel/index.vue
 * 작성자 :
 * 화면 설명 : One-Stop 법률구조 > 법률상담 방법 > 전화상담 (첫 화면)
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자    변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                        최초생성
2025.08.25    조현주    로그인 분기처리
-->

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();

const { showAlert } = useCustomAlert();

/**
 * name :
 * desc : 공단 > 자세히보기 || 홈닥터 > 상담예약 바로가기 btn 클릭 이벤트
 */
const goToDscsnInfo = (inst: string) => {
  if (inst == 'kla') {
    // 대한법률구조공단 전화상담 안내 페이지
    navigateTo('/dscsn/tel/klacInfo');
  } else if (inst == 'lhd') {
    // 법률홈닥터 전화상담 안내 페이지
    navigateTo('/dscsn/tel/LhdTelInfo');
  } else {
    message.error('잘못된 요청입니다.');
  }
};

/**
 * name : goToMyDscsn
 * desc : 예약확인 버튼 클릭 이벤트
 */
const goToMyDscsn = () => {
  if (authenticated.value) {
    // 1. 로그인 -> 나의 상담 목록 내역(회원)
    navigateTo('/my/dscsn/rsvt/RsvtDsctnList');
    // 2. 본인인증 -> 나의 상담 조회(비회원) TODO
  } else {
    // 3. 로그아웃 -> 로그인 페이지 이동
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
        <CommonTitle tag="h4" type="circle" size="1">
          [법률구조 플랫폼] 에서 전화 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              [법률구조 플랫폼] 에서는 대한법률구조공단, 대한가정법률복지
              상담원, 법률홈닥터등 주요 법률 기관들의 전화 상담 정보를 한 곳에
              모아 편리하게 안내해 드립니다.<br />
              각 기관별로 정확한 상담 전화번호와 상담 가능 시간을 확인하시고
              궁금한 점을 바로 물어보고 신속하게 답변을 얻으세요.
            </li>
            <li>
              법률홈닥터인 경우 상담 예약과 상담 내용을 [법률구조 플랫폼] 에서
              신청하고 처리 결과를 확인하여 One-Stop 법률구조 서비스를
              실현합니다.
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >상담 기관별 전화상담 안내</CommonTitle
        >

        <div class="info-img-box type02">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />

                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한법률구조공단<br />전화상담</strong>
                    </div>
                    <div class="btns">
                      <CommonButton height="sm" @click="goToDscsnInfo('kla')"
                        >자세히보기
                        <template #right-icon>
                          <Icon name="shortcut" />
                        </template>
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          국번 없이 132전화를 통한 실시간 상담. 5분이내
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          오전 9시 ~오후 6시, 12~1시 불가
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <span class="box-info-flag"
                            >민사, 형사, 행정 등 사건</span
                          >
                          <span class="box-info-flag"
                            >이혼, 친권, 양육비, 가족관계 등 가사사건</span
                          >
                          <span class="box-info-flag"
                            >개인회생, 개인파산사건</span
                          >
                          <span class="box-info-flag">기타사건</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol2.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>한국가정법률상담소<br />전화상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          1644-7077 전화를 통한 실시간 상담
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          오전 9시~오후 6시
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <span class="box-info-flag"
                            >이혼, 친권, 양육비, 가족관계 등 가사사건</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol3.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한가정법률복지상담원<br />전화상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          02-3675-0142, 0143 전화를 통한 실시간 상담
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          <span class="is-emphasis">(평일)</span>
                          09:30~17:30
                        </span>
                        <span class="info-txt">
                          <span class="is-emphasis"
                            >(매주 월요일 야간상담)</span
                          >
                          18:00~21:00
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <span class="box-info-flag"
                            >이혼, 친권, 양육비, 가족관계 등 가사사건</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >법률홈닥터 전화상담 예약</CommonTitle
        >

        <div class="info-img-box type02">
          <ul>
            <li class="full">
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol4.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>법률홈닥터전화상담</strong>
                      <span class="box-tit-flag">예약</span>
                    </div>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
                    <li>
                      <strong>상담 방법 : </strong>
                      <div class="info-cont">
                        <span class="info-txt">
                          본인인증이나 회원로그인 이후 상담예약을 통한 원하는
                          시간에 상담 진행
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>제공 시간 : </strong>
                      <div class="info-cont">
                        <span class="info-txt"> 상담예약 확정일시 </span>
                      </div>
                    </li>
                    <li>
                      <strong>사건 대상 : </strong>
                      <div class="info-cont">
                        <div class="info-flag-wrap">
                          <span class="box-info-flag"
                            >민사, 형사, 행정 등 사건</span
                          >
                          <span class="box-info-flag"
                            >이혼, 친권, 양육비, 가족관계 등 가사사건</span
                          >
                          <span class="box-info-flag">기타사건</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="box-item-btns">
                <button type="button" class="btn" @click="goToDscsnInfo('lhd')">
                  상담예약<br />바로가기
                </button>
                <button type="button" class="btn line" @click="goToMyDscsn">
                  예약확인
                </button>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h5">※ 전화상담 유의사항</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-num-list">
            <li>
              <span class="num">1.</span>통화료는 발신자 부담으로 서비스를
              제공하고 있습니다.
            </li>
            <li>
              <span class="num">2.</span>법률구조 플랫폼은 법률상담 당사자가
              아닌 대국민 편의를 위해 법률구조 가관 및 국가·공공기관 등에서
              제공하는 법률상담을 연계하는 시스템으로 실제 법률상담 진행 및
              처리는 해당 참여기관에 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/tel/index.scss';
</style>
