<!--
 * 화면명 : 법률홈닥터
 * 화면ID : LASP_CON_009
 * 파일명 : DscInstLhdInfo
 * 작성자 :
 * 화면 설명 : One-Stop 법률구조 > 법률상담 기관 > 법률홈닥터
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
import CommonTable from '~/components/ui/table/tables.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import axios from 'axios';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
const route = useRoute();

// 기관정보
const instNo = 'I054000000';
const availInst = 'lhd';
const instInfo = ref();

onMounted(() => {
  getInstInfo();
});

// 법률홈닥터 기관정보 조회
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
  if (dscsn == '1' || dscsn == '2') {
    if (authenticated.value) {
      // 나의 상담예약 중복체크
      const res = await axios.get('/api/dscsn/rsvt/selectLhdDupYn', {
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
    navigateTo('/dscsn/tel/LhdTelInfo');
  } else {
    alert('잘못된요청입니다.');
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
        <div class="counsel-top-header">
          <div class="inner">
            <div class="top-logo">
              <img
                src="/image/sub/counsel/counsel_top_txt_04.png"
                alt="법률홈닥터"
              />
            </div>
            <div class="top-infos">
              <!--              <div class="top-desc">-->
              <!--                <div v-html="instInfo?.instIndt"></div>-->
              <!--              </div>-->
              <div class="top-desc">
                법률홈닥터는 법무부가 변호사를 ‘법률홈닥터’로 직접 채용,
                지방자치단체·사회복지협의회 등에 배치하여<br class="pc-only" />
                법률보호가 필요한 서민들에게 ‘찾아가는 법률서비스’를 제공하는
                사업입니다.
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
                    to=""
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    전화상담
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
                    면접 상담 예약 후 법률홈닥터 방문 후 상담
                  </td>
                  <td class="title-td">
                    이혼, 친권, 양육비, 가족관계 등 가사사건, 민사,<br />
                    형사, 행정 등 사건, 기타 사건
                  </td>
                  <td class="title-td">예약 일시</td>
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
                  <td class="title-td">예약일시에 화상을 통한 예약상담</td>
                  <td class="title-td">
                    이혼, 친권, 양육비, 가족관계 등 가사사건, 민사,<br />
                    형사, 행정 등 사건, 기타 사건
                  </td>
                  <td class="title-td">예약 일시</td>
                </tr>
                <tr>
                  <td class="title-td">
                    <div class="btn-box">
                      전화상담
                      <div class="counsel-normal-btn" @click="checkStatus('3')">
                        상담예약
                      </div>
                    </div>
                  </td>
                  <td class="title-td">
                    면접 상담 예약 후 법률홈닥터 방문 후 상담
                  </td>
                  <td class="title-td">간단 상담이 필요한 고객</td>
                  <td class="title-td">예약 일시</td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
        </ImgBox>

        <h4 class="title-heading-1">법률상담 시 유의사항</h4>

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

        <CommonTitle tag="h4" size="1">꼭 확인해주세요!</CommonTitle>

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
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/DscInstLhdInfo.scss';
</style>
