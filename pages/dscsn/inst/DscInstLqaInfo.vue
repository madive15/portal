<!--
 * 화면명 : 대한가정법률복지상담원
 * 화면ID : LASP_CON_008
 * 파일명 : DscInstLqaInfo
 * 작성자 :
 * 화면 설명 : One-Stop 법률구조 > 법률상담 기관 > 대한가정법률복지상담원
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
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import * as instApis from '~/composables/inst';
import axios from 'axios';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
const route = useRoute();

// 기관정보
const instNo = 'I003000000';
const availInst = 'lqa';
const instInfo = ref();

onMounted(() => {
  getInstInfo();
});

// 대한가정법률복지상담원 기관정보 조회
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
        const res = await axios.get('/api/dscsn/rsvt/selectLqaDupYn', {
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
          alert('대한가정법률복지상담원 사이버신청품 페이지 이동');
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
    // 전화상담 X
  } else {
    message.error(' 잘못된요청입니다.');
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
        dscsnSeCd: dscsn,
        lwClsfCd: '02' // 법률구분코드(CO0041) 디폴트값 부여
      } // TODO post로 변경 필요
    });
  } else if (dscsn == '2') {
    // 화상상담
    alert('기관 화상상담예약 이동');
  } else if (dscsn == '4') {
    // 사이버상담
    alert('기관 사이버신청품 이동');
  } else {
    alert('잘못된요청입니다.');
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
                src="/image/sub/counsel/counsel_top_txt_03.png"
                alt="대한가정법률복지상담원"
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
                    to=""
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    면접상담
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to=""
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    화상상담
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://lawqa.jinbo.net/gb/bbs/board.php?bo_table=04_02"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    공개게시판
                  </NuxtLink>
                  <NuxtLink
                    class="counsel-goto-btn"
                    to="https://lawqa.jinbo.net/gb/bbs/board.php?bo_table=04_03"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    비공개게시판
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1">법률상담 안내</CommonTitle>

        <ImgBox useScroll>
          <div class="table-box">
            <CommonTable type="bordered">
              <caption>
                법률상담 안내 내용 - 상담유형, 상담방법, 이용상황(주 이용고객),
                제공시간에 대한 표
              </caption>
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
                  <td class="title-td">
                    <div class="btn-box">
                      면접상담
                      <div class="counsel-normal-btn" @click="checkStatus('1')">
                        상담예약
                      </div>
                    </div>
                  </td>
                  <td class="title-td">
                    면접 상담 예약 후 상담소 방문 후 상담
                  </td>
                  <td class="title-td">
                    이혼, 친권, 양육비, 가족관계 등 가사사건
                  </td>
                  <td class="title-td">
                    평일 : 오전 10시-오후 5시 (접수 오후 4시까지) <br />
                    야간 : 매주 월요일 오후 6시-9시(접수 오후 8시까지)
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
                  <td class="title-td">
                    화상 상담 예약 후 예약일시에 화상을 통한 예약상담
                  </td>
                  <td class="title-td">
                    이혼, 친권, 양육비, 가족관계 등 가사사건
                  </td>
                  <td class="title-td">예약 일시</td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">전화상담</div>
                  </td>
                  <td class="title-td">
                    02-3675-0142, 0143 전화를 통한<br />
                    실시간 상담
                  </td>
                  <td class="title-td">간단 상담이 필요한 고객</td>
                  <td class="title-td">
                    평일 : 오전 9시 30분-오후 5시 30분<br />
                    야간 : 매주 월요일 오후 6시-9시
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
                  <td class="title-td">상담신청을 통한 상담 내용 작성</td>
                  <td class="title-td">홈페이지를 통한 답변을 원하는 고객</td>
                  <td class="title-td">-</td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
        </ImgBox>

        <CommonTitle tag="h4" size="1">법률상담 시 유의사항</CommonTitle>

        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              대한가정법률복지상담원에서는 법률상담, 화해조정과 대서 및 무료
              소송대리 등의 법률구조서비스를 지원합니다.
            </li>
            <li>
              더 이상 혼자 번민하지 마시고 대한가정법률복지상담원과 함께
              해결책을 찾아보세요. 상담경험이 풍부한 전문 상담위원과
              법률전문가가 여러분을 도와드립니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/DscInstLqaInfo.scss';
</style>
