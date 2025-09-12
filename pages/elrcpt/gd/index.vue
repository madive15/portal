<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);

const { showAlert } = useCustomAlert();

const goToElrcpt = () => {
  // 로그인 완료상태
  if (authenticated.value) {
    navigateTo('/elrcpt/aply');
  } else {
    showAlert({
      icon: 'info',
      html: '전자접수 신청은 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인 페이지로 이동 합니다',
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
        <CommonTabs :platform-tab-show="true" class="ele-info__tab">
          <CommonTabItem title="전자접수 안내">
            <h4 class="title-heading-1 circle">
              전자접수 서비스란 무엇인가요?
            </h4>
            <div class="bull-list-box">
              <ul class="counsel-bull-list">
                <li>
                  법률구조 전자접수란, 경제적으로 어렵거나 법을 잘 몰라 스스로
                  법적 수단을 강구하기 어려운 국민들이 **법률구조기관의
                  법률구조(소송 대리, 형사 변호, 서류 작성 지원 등)**를 지원받기
                  위해,, 법률 구조기관 사무실에 직접 방문하거나 우편으로 서류를
                  보내는 대신 법률구조 플랫폼을 통해 공식적으로 신청하고 관련
                  증빙 서류를 온라인으로 제출하는 서비스입니다.
                </li>
              </ul>
            </div>
            <h4 class="title-heading-1 circle">주요 특징 및 역할</h4>
            <div class="bull-list-box">
              <ul class="counsel-num-list num-type1">
                <li>
                  <strong>비대면 법률구조 신청</strong>: 법률구조기관사무실을
                  직접 찾아가거나 우편을 이용하는 번거로움 없이, 시간과 장소에
                  구애받지 않고 인터넷 접속이 가능한 곳 어디에서든 법률구조
                  지원을 신청할 수 있습니다.
                </li>
                <li>
                  <strong>공식적인 절차 시작</strong>: 단순히 법률 정보를
                  검색하는 것을 넘어, 사용자의 구체적인 사건에 대해
                  <strong
                    >법률구조기관의 공식적인 검토와 실제적인 법률구조 지원(예:
                    소송 구조 결정 심사) 절차 진행을 요청하는 공식적인 신청
                    행위</strong
                  >입니다.
                </li>
                <li>
                  <strong>필수 서류의 디지털 제출</strong>: 법률구조 신청서
                  작성은 물론, 소송 등 법적 절차 진행에 필요한 신분증 사본, 사건
                  관련 자료, 소득 및 재산 증빙 서류 등
                  <strong
                    >구조 결정 심사에 필요한 필수 서류들을 스캔하거나 파일
                    형태로 만들어 온라인으로 간편하게 첨부하여 제출</strong
                  >할 수 있습니다.
                </li>
                <li>
                  <strong>법률구조 신청의 효율성 증대</strong>: 방문이나 우편
                  접수에 비해
                  <strong>법률구조 신청 절차를 더 빠르고 효율적으로 진행</strong
                  >할 수 있으며, 접수 내역이나 구조 결정 심사 진행 상황 등을
                  온라인으로 확인할 수 있습니다.
                </li>
              </ul>
            </div>
            <h4 class="title-heading-1 circle">결론적으로, 전자접수는</h4>
            <div class="bull-list-box">
              <ul class="counsel-bull-list">
                <li>
                  경제적 또는 기타 사유로 법률적인 도움이 절실한 국민들이
                  법률구조기관의 소송 지원, 형사 변호 등 구체적인 법률구조
                  서비스를 받기 위해 거치는 첫 번째 공식 온라인 신청 관문입니다.
                  단순히 정보를 얻는 것을 넘어, 실제적인 법률구조 지원 절차를
                  개시하기 위한 핵심적인 창구 역할을 수행하며, 이를 통해
                  법률구조 서비스에 대한 접근성을 높이고 국민들이 보다 편리하게
                  법의 보호를 받을 수 있도록 지원하는 것을 목표로 합니다.
                </li>
              </ul>
            </div>
            <CommonButtonGroup align="center" class="!mt-50px">
              <CommonButton variants="primary" width="xs" @click="goToElrcpt">
                전자접수 신청
              </CommonButton>
            </CommonButtonGroup>
          </CommonTabItem>
          <CommonTabItem title="전자접수 이용절차">
            <h4 class="title-heading-1 circle">
              로그인부터 접수 승인까지, 전자접수 한눈에 보기
            </h4>
            <div class="img-box">
              <picture>
                <source
                  media="(max-width: 1199px)"
                  srcset="/image/sub/receipt/img_electronic_usage_mo.png"
                />
                <source
                  media="(min-width: 1200px)"
                  srcset="/image/sub/receipt/img_electronic_usage.png"
                />
                <img
                  src="/image/sub/receipt/img_electronic_usage.png"
                  alt="전자접수 한눈에 보기(상세 내용은 하단 참고)"
                />
                <ol class="sr-only">
                  <li>로그인</li>
                  <li>사건선택</li>
                  <li>기관선택</li>
                  <li>대상자 확인</li>
                  <li>전자접수 신청</li>
                  <li>전자접수 신청완료</li>
                  <li>전자접수 적합판단</li>
                  <li>부적합 시 : 방문접수 안해 후 종료</li>
                  <li>적합 시 : 전자접수 보완요청</li>
                  <li>전자접수 승인</li>
                  <li>구조진행</li>
                  <li>소송진행</li>
                  <li>소송종료</li>
                </ol>
              </picture>
            </div>
            <CommonButtonGroup align="center" class="!mt-50px">
              <CommonButton variants="primary" width="xs" @click="goToElrcpt">
                전자접수 신청
              </CommonButton>
            </CommonButtonGroup>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
//@use '~/assets/style/pages/elrcpt/gd/index.scss';
</style>
