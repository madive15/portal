<!--
 * 화면명 : 사이버상담 예약 완료
 * 화면ID : LASP_CON_035
 * 파일명 : CyberRsvtCmptnInfo
 * 작성자 : 안태정
 * 화면 설명 : 사이버상담 예약완료
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.08  안태정   최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import type { DscsnRsvtDtInVO } from '~/types/dscsn/rsvt';
import * as dscsnApis from '~/composables/dscsn';
import { reactive } from 'vue';
import { useLoginStore } from '~/stores/login';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
definePageMeta({
  layout: 'pub2nd'
});

const route = useRoute();

const form = reactive({
  rsvtNo: '', //예약번호
  rcptDt: '', //접수일자
  dscsnTtl: '', //상담제목
  dscsnCn: '', //상담내용
  brofDaddr: '', //기관상세주소
  brofRprsTelno: '', //지사전화번호
  logoUrl: '', // 로그url
  instNm: '', //기관명
  instTelno: '' //기관전화번호
});

/**
 * name : onBeforeMount
 * desc :
 */
onBeforeMount(() => {
  // 로그인 여부에 따라 분기
  if (authenticated.value) {
    //
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
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
});

// 컴포넌트가 마운트될 때
onMounted(() => {
  //신청정보조회
  selectDscsnAplyInfo();
});

/**
 * name : selectedInfo
 * desc : 신청정보조회
 */
const selectedInfo: Ref<DscsnRsvtDtInVO> = ref({
  dscsnAplyNo: route.query.dscsnAplyNo //TODO 예약번호 이전 화면에서 값을 받아와서 처리되도록 수정 필요
});
const selectDscsnAplyInfo = async () => {
  const payload = selectedInfo.value;
  const response = await dscsnApis.selectDscsnAplyInfo(payload);
  form.rcptDt = response.data.rcptDt;
  form.dscsnTtl = response.data.dscsnTtl;
  form.dscsnCn = response.data.dscsnCn;
  form.instNm = response.data.instNm;
  form.instTelno = response.data.instTelno;
  form.logoUrl =
    '/api/image?atchFileId=' +
    response.data.atchFileId +
    '&atchFileSeq=' +
    response.data.atchFileSeq;
};

/**
 * name : goToMyDscsn
 * desc : 상담 예약으로 이동
 */
const goToMyDscsn = () => {
  // 클릭시 로그인 상태나 본인인증 완료 상태에 따라
  // 분기되어 마이페이지>상담예약 내역으로 이동
  if (authenticated.value) {
    navigateTo('/my/dscsn/rsvt/RsvtDsctnList');
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then(() => {
        navigateTo({
          path: '/login', //추후 anyid로 변경
          query: { redirect: '/my/dscsn/rsvt/RsvtDsctnList' } // 현재 페이지 전체 경로
        });
      })
      .catch(() => {});
  }
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="사이버상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-comp-header">
          <div class="inner">
            <div class="top-logo">
              <img src="/image/sub/counsel/counsel_comp_icon.png" alt="" />
            </div>
            <div class="top-desc">사이버상담 예약이 완료되었습니다.</div>
          </div>
        </div>

        <CommonTitle tag="h5" size="2" type="dot">
          사이버상담 예약정보
        </CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              사이버상담 예약정보에관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">상담기관</th>
                <td>
                  <img
                    :src="form.logoUrl"
                    :alt="form.instNm"
                    style="width: 141px; height: 40px"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>{{ form.dscsnTtl }}</td>
              </tr>
              <tr>
                <th scope="row">내용</th>
                <td>
                  <span class="txt-box" v-html="form.dscsnCn"></span>
                </td>
              </tr>
              <tr>
                <th scope="row">접수일시</th>
                <td>
                  <span class="is-emphasis">{{ form.rcptDt }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">문의</th>
                <td>{{ form.instTelno }}</td>
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
            >신청확인</CommonButton
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
@use 'assets/style/pages/dscsn/cyber/CyberRsvtCmptnInfo';
</style>
