<!--
 * 화면명 : 대한법률구조공단
 * 화면ID : LASP_CON_005
 * 파일명 : DscInstKlaInfo
 * 작성자 :
 * 화면 설명 : One-Stop 법률구조 > 법률상담 기관 > 대한법률구조공단
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자    변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                        최초생성
2025.08.25    조현주    면접/전화상담
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import * as instApis from '~/composables/inst';
import CommmonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import axios from 'axios';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
const route = useRoute();

// 기관정보
const instNo = 'I001000000';
const availInst = 'kla';
const instInfo = ref();

onMounted(() => {
  getInstInfo();
});

// 대한법률구조공단 기관정보 조회
const getInstInfo = async () => {
  const payload = {
    instNoList: [instNo]
  };
  const response = await instApis.selecInstInfoList(payload);
  if (response.data.length > 0) {
    instInfo.value = response.data[0];
  }
};

// 상담예약, 이용안내, 상담신청 페이지 이동 전 확인
const checkStatus = async (dscsn: string) => {
  // 1:면접상담 2:화상상담 3:전화상담 4:사이버상담 (상담구분코드 groupId:CO0042)
  if (dscsn == '1' || dscsn == '2' || dscsn == '4') {
    // 로그인 여부 확인
    if (authenticated.value) {
      // 로그인, 본인인증 상태
      if (dscsn == '1' || dscsn == '2') {
        // 나의 상담예약 중복체크
        const res = await axios.get('/api/dscsn/rsvt/selectKlaDupYn', {
          params: {
            dscsnSeCd: dscsn
          }
        });
        if (res.data.dupYn === 'Y') {
          await showAlert({
            icon: 'info',
            html: `해당 상담기관에 이미 상담예약건이 존재합니다.<br/>상담예약은 동일기관에 중복으로 신청할 수 없습니다.`,
            confirmButtonText: '확인'
          });
          return;
        } else {
          // 중복x
          goToPage(dscsn);
        }
      } else {
        // 사이버상담 일 제한 수량 체크 TODO LQA-009 LQA-010
        // const checkQty =  await getCyberQtyCheck(instNo)
        const checkQty = false;
        if (checkQty) {
          // 신청 가능
          alert('대한법률구조공단 사이버신청품 페이지 이동');
        } else {
          showAlert({
            icon: 'info',
            text: '하루 상담건수가 초과되어 상담신청이 마감되었습니다. '
          });
        }
      }
    } else {
      // 비로그인 상태
      showAlert({
        icon: 'info',
        html: '상담예약은 본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다',
        confirmButtonText: '확인'
      })
        .then(() => {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        })
        .catch(() => {});
    }
  } else if (dscsn == '3') {
    // 전화상담
    goToPage('3');
  } else {
    showAlert({
      icon: 'error',
      text: '잘못된요청입니다.'
    });
  }
};

// 상담예약 페이지 이동
const goToPage = (dscsn: string) => {
  if (dscsn == '1') {
    // 면접상담
    navigateTo({
      path: '/dscsn/rsvt/DscsnRsvtM',
      query: {
        availInst: availInst,
        dscsnSeCd: dscsn
      } // TODO post로 변경 필요
    });
  } else if (dscsn == '2') {
    // 화상상담
    alert('기관 화상상담예약 이동');
  } else if (dscsn == '3') {
    // 전화상담
    navigateTo('/dscsn/tel/klacInfo');
  } else if (dscsn == '4') {
    // 사이버상담
    alert('기관 사이버신청품 이동');
  } else {
    alert('잘못된요청입니다.');
  }
};

// 면접상담 - 상담제한 내용 확인 이동
const goToDscsnIntvInfo = () => {
  const target = document.getElementById('dscsnIntvInfo');
  if (target) {
    // target.scrollIntoView({ behavior: 'smooth' });
    const offset = 40; // 위에서부터 떨어져보이게할 여백
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
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
                src="/image/sub/counsel/counsel_top_txt.png"
                alt="대한법률구조공단"
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
                    to="https://www.klac.or.kr/startingChat.do?channelCd=CHATBOT"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    챗봇상담
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    href="https://www.klac.or.kr/legalstruct/visitingConsultation.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    >면접상담</NuxtLink
                  >
                  <NuxtLink
                    class="counsel-goto-btn"
                    href="https://www.klac.or.kr/startingChat.do?channelCd=CHAT"
                    target="_blank"
                    rel="noopener noreferrer"
                    >채팅상담</NuxtLink
                  >
                  <NuxtLink
                    class="counsel-goto-btn"
                    href="https://www.klac.or.kr/legalstruct/remoteConsultation.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    >화상상담</NuxtLink
                  >
                  <NuxtLink
                    class="counsel-goto-btn"
                    href="https://www.klac.or.kr/legalstruct/cyberConsultation.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    >사이버상담</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommmonTitle tag="h4" size="1" class="title-heading-1"
          >법률상담 안내</CommmonTitle
        >

        <ImgBox useScroll>
          <div class="table-box">
            <CommonTable type="bordered">
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
                  <td class="title-td">
                    <div class="btn-box">
                      면접상담
                      <div class="counsel-normal-btn" @click="checkStatus('1')">
                        상담예약
                      </div>
                    </div>
                  </td>
                  <td class="title-td">
                    예약+공단, 방문 +면접상담<br />(예약상담 원칙)
                  </td>
                  <td class="title-td">법률 구조가 필요한 고객</td>
                  <td class="title-td">
                    평일 오전 10시~오후 5시<br />(12시~1시 불가 )
                  </td>
                  <td class="title-td">20분 이내</td>
                  <td class="title-td">제한 없음</td>
                  <td class="title-td">
                    <div class="counsel-down-btn">
                      <span class="underline" @click="goToDscsnIntvInfo"
                        >상담 제한 내용 확인</span
                      >
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      화상상담
                      <div class="counsel-normal-btn" @click="checkStatus('2')">
                        상담예약
                      </div>
                    </div>
                  </td>
                  <td class="title-td">예약일시에 화상을 통한<br />예약상담</td>
                  <td class="title-td">
                    거동불편 취약계층 우선이용+서류를 보여줄 필요<br />
                    +100자 이상 상담내용 기재
                  </td>
                  <td class="title-td">예약 일시</td>
                  <td class="title-td">20분 이내</td>
                  <td class="title-td">40~60건</td>
                  <td class="title-td">
                    상담 인원 제한으로 상담이<br />
                    원활하지 않을 수 있음
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      132 전화상담
                      <div class="counsel-normal-btn" @click="checkStatus('3')">
                        이용안내
                      </div>
                    </div>
                  </td>
                  <td class="title-td">
                    국번 없이 132 전화를 통한<br />
                    실시간 상담
                  </td>
                  <td class="title-td">간단한 상담이 필요한 고객</td>
                  <td class="title-td">
                    평일 오전 9시~오후 6시<br />
                    (12시~1시 불가 )
                  </td>
                  <td class="title-td">5분 이내</td>
                  <td class="title-td">제한 없음</td>
                  <td class="title-td">
                    시간대별 상담직원 수에 따라<br />
                    상담이 원활하지 않을 수 있음
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      사이버상담
                      <div class="counsel-normal-btn" @click="checkStatus('4')">
                        상담신청
                      </div>
                    </div>
                  </td>
                  <td class="title-td">
                    상담신청을 통한<br />
                    상담 내용 작성
                  </td>
                  <td class="title-td">홈페이지를 통한 답변을 원하는고객</td>
                  <td class="title-td">-</td>
                  <td class="title-td">-</td>
                  <td class="title-td">70건</td>
                  <td class="title-td">
                    1일 상담 건수 제한으로<br />
                    상담이 원활하지 않을 수 있음
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      채팅상담
                      <NuxtLink
                        class="counsel-goto-btn"
                        href="https://www.klac.or.kr/startingChat.do?channelCd=CHAT"
                        target="_blank"
                        rel="noopener noreferrer"
                        >바로가기</NuxtLink
                      >
                    </div>
                  </td>
                  <td class="title-td">
                    132 전화, 챗봇 홈페이지를<br />
                    통한 실시간 채팅상담
                  </td>
                  <td class="title-td">
                    손해배상, 계약 등 민사소송, 임대차, 개인회생,<br />
                    파산 등 간단상담이 필요한 고객
                  </td>
                  <td class="title-td">
                    평일 오전 10시~오후 5시<br />
                    (12시~1시 불가 )
                  </td>
                  <td class="title-td">10분 이내</td>
                  <td class="title-td">50-100건</td>
                  <td class="title-td">
                    2017-상담 인원 제한(시간당3~4명)<br />
                    으로 상담이 원활하지 않을 수 있음
                  </td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      챗봇상담
                      <NuxtLink
                        class="counsel-goto-btn"
                        href="https://www.klac.or.kr/startingChat.do?channelCd=CHATBOT"
                        target="_blank"
                        rel="noopener noreferrer"
                        >바로가기</NuxtLink
                      >
                    </div>
                  </td>
                  <td class="title-td" colspan="6">
                    법률상담 사례, 법률서식에 대한 정보, 가까운 공단 위치 안내,
                    상담예약이 필요한 고객은 챗봇을 이용하기 바랍니다.
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
        </ImgBox>

        <CommonTitle id="dscsnIntvInfo" tag="h4" size="1"
          >면접상담 제한 내용</CommonTitle
        >

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
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
          </ul>
        </div>

        <div class="table-box">
          <CommonTable type="bordered">
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
                <td class="title-td">
                  ① 노쇼(예약취소 없이 내방하지 않는 경우)
                </td>
                <td class="title-td">1개월</td>
                <td class="title-td">
                  매일 예약이 가능함에도 다른 국민의 상담기회 박탈
                </td>
              </tr>
            </tbody>
          </CommonTable>
        </div>

        <CommonTitle tag="h4" size="1">법률상담 시 유의사항</CommonTitle>

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
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
          </ul>
        </div>

        <CommonTitle tag="h4" size="1">법률상담 제한</CommonTitle>

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
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
          </ul>
        </div>

        <div class="table-box">
          <CommonTable type="bordered">
            <caption>
              법률상담 제한 내용 - 전문분야, 상담기간, 전화번호(국번없이) 에
              대한 표
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
                <td class="title-td">세무상담</td>
                <td class="title-td">국세청</td>
                <td class="title-td">126</td>
              </tr>
              <tr>
                <td class="title-td">소비자상담</td>
                <td class="title-td">소비자상담센터</td>
                <td class="title-td">1372</td>
              </tr>
              <tr>
                <td class="title-td">고용관계(실업급여 등)</td>
                <td class="title-td">고용노동부</td>
                <td class="title-td">1350</td>
              </tr>
              <tr>
                <td class="title-td">금융분쟁</td>
                <td class="title-td">금융감독원</td>
                <td class="title-td">1332</td>
              </tr>
            </tbody>
          </CommonTable>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/DscInstKlaInfo.scss';
</style>
