<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const { showAlert } = useCustomAlert();

const checkQty = ref(false);

// 사이버상담 일 제한 수량 체크
// 연계 정보 확인 후 수정필요
const getCheckQty = (instNo: string) => {
  // cosnt response = await getCyberQtyCheck(instNo);
  const response = false;
  return response;
};

const goToDscsn = (inst: string) => {
  // 로그인, 본인인증 완료상태
  if (authenticated.value) {
    if (inst == 'gd') {
      // 대한법률구조공단 instNo: 'I001000000'
      checkQty.value = getCheckQty('I001000000');
      if (checkQty) {
        // 신청 가능
        alert('대한법률구조공단 사이버신청품 페이지 이동');
      } else {
        showAlert({
          icon: 'info',
          text: '하루 상담건수가 초과되어 상담신청이 마감되었습니다. '
        });
      }
    } else if (inst == 'so') {
      // 한국가정법률상담소 instNo: 'I002000000'
      checkQty.value = getCheckQty('I002000000');
      if (checkQty) {
        // 신청 가능
        alert('한국가정법률상담소 사이버신청품 페이지 이동');
      } else {
        showAlert({
          icon: 'info',
          text: '하루 상담건수가 초과되어 상담신청이 마감되었습니다. '
        });
      }
    } else if (inst == 'won') {
      // 대한가정법률복지상담원 instNo: 'I003000000'
      checkQty.value = getCheckQty('I003000000');
      if (checkQty) {
        // 신청 가능
        alert('대한가정법률복지상담원 사이버신청품 페이지 이동');
      } else {
        showAlert({
          icon: 'info',
          text: '하루 상담건수가 초과되어 상담신청이 마감되었습니다. '
        });
      }
    }
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
          [법률구조 플랫폼] 에서 사이버 상담을 이렇게 이용해 보세요.
        </CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              사이버상담을 제공하는 참여기관 정보와 바로 이동할 수 있는 링크를
              제공하여 , 복잡하게 찾을 필요 없이 바로 질문을 남기거나 상담을
              신청할 수 있습니다.
            </li>
            <li>
              접수한 상담 내용을 [법률구조 플랫폼] 에서 확안히고 답변을 확인하여
              One-Stop 법률구조 서비스를 실현합니다.
            </li>
            <li>
              신청하고자 하는 기관은 물론이고 참여기관의 모든 사례정보를
              확인하여 좀 더 다양하고 정확한 정보를 얻을 수 있습니다.
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1" type="circle"
          >상담 기관별 사이버상담 안내</CommonTitle
        >

        <div class="info-img-box type02">
          <ul>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol.png" alt="" />

                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한법률구조공단<br />사이버상담</strong>
                    </div>
                    <div class="btns">
                      <NuxtLink
                        class="btn-basic sm"
                        href="https://www.klac.or.kr/legalstruct/cyberConsultation/selectOpenArticleList.do?boardCode=3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span class="text">법률상담사례 찾기</span>
                        <i class="icon-shortcut"></i
                      ></NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    법률상담사례 찾기를 통해 유사한 상담사례를 검색하실수
                    있습니다. 더 궁금하신 사항은 온라인을 통해 법률상담이
                    가능합니다. 공단은 일별 상담건수를 일 70건으로 제한합니다.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>
                        구체적인 사실관계의 확인이나 관련 자료에 대한 검토가
                        요구되는 사안은 예약 후 방문상담, 간략한 상담은
                        사이버상담(국번없이 132)을 이용하여 주시기 바랍니다.
                      </li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <button
                    type="button"
                    class="btn type01"
                    @click="goToDscsn('gd')"
                  >
                    상담신청
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol2.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>한국가정법률상담소<br />사이버상담</strong>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    이혼, 양육, 상속 등 '가정법률' 분야 전문 상담 기관입니다.
                    온라인으로 가정법률 전문가의 무료 법률 조언을 구해보세요.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>
                        사이버 상담글은 비공개 처리되며 본인의 글만 접근 및
                        확인이 가능합니다.
                      </li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <button
                    type="button"
                    class="btn type01"
                    @click="goToDscsn('so')"
                  >
                    상담신청
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div class="img-box-item">
                <div class="box-tit">
                  <img src="/image/sub/counsel/counsel_symbol3.png" alt="" />
                  <div class="txt-wrap">
                    <div class="txt">
                      <strong>대한가정법률복지상담원<br />사이버상담</strong>
                    </div>
                    <div class="btns">
                      <NuxtLink
                        class="btn-basic sm"
                        href="https://lawqa.or.kr/gb/bbs/board.php?bo_table=04_01"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span class="text">자주하는 질문</span>
                        <i class="icon-shortcut"></i>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="box-desc">
                  <div class="txt">
                    대한가정법률복지상담원에서는 상담원을 찾아올 시간적, 경제적
                    여유가 없는 분들을 위하여 온라인을 통해 상담해 드립니다.
                    자주하는 질문을 통해서 유사한 상담사례를 검색하실 수
                    있습니다.
                  </div>
                  <div class="desc-box">
                    <ul>
                      <li>사이버 상담글은 공개여부를 결정할 수 있습니다.</li>
                      <li>
                        사이버상담 신청 전 아래 사건대상 여부 확인 후 신청
                        바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="box-infos">
                  <ul>
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
                <div class="box-btns">
                  <button
                    type="button"
                    class="btn type01"
                    @click="goToDscsn('won')"
                  >
                    상담신청
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h5">※ 사이버상담 유의사항</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-num-list">
            <li>
              <span class="num">1.</span>이전 각기관의 법률상담사례 찾기를 통해
              고객님의 사례와 유사한 상담사례가 있는지 확인해 보시기 바랍니다.
            </li>
            <li>
              <span class="num">2.</span>법률구조 플랫폼은 법률상담 당사자가
              아닌 대국민 편의를 위해 법률구조 가관 및 국가·공공기관 등에서
              제공하는 법률상담을 연계하는 시스템으로 실제 법률상담 진행 및
              처리는 해당 참여기관에 있습니다.
            </li>
            <li>
              <span class="num">3.</span>상담내용 신규 입력만 가능하며 답변
              확인은 마이페이지에서 확인 바랍니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/cyber/index.scss';
</style>
