<!--
 * 화면명 : 사이버상담 내역
 * 화면ID : LASP_MYP_017
 * 파일명 : CybdsnDsctnView
 * 작성자 : 문경훈
 * 화면 설명 : 사이버상담 내역 상세 조회 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.21         문경훈       최초생성
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import { onMounted, reactive, type Ref, ref } from 'vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
const router = useRouter();
const route = useRoute();

/** 상담신청번호 */
const dscsnAplyNo: string =
  typeof route.query.dscsnAplyNo === 'string' ? route.query.dscsnAplyNo : '';

/** 폼 */
const form = reactive({
  dscsnAplyNo: '' /* 상담신청번호 */,
  dscsnTtl: '' /* 상담제목 */,
  dscsnCn: '' /* 상담내용 */,
  lastMdfcnDt: '' /* 최종수정일시 */,
  instNo: '' /* 기관번호 */,
  instNm: '' /* 기관명 */,
  cybdsnAnsTtl: '' /* 사이버상담답변제목 */,
  cybdsnAnsCn: '' /* 사이버상담답변내용 */
});

onMounted(() => {
  // 상담신청번호 세팅
  form.dscsnAplyNo = route.query.dscsnAplyNo;

  // 상세조회
  selectCybdsnDsctn();
});

/** 사이버상담 상세조회 */
const selectCybdsnDsctn = async () => {
  const formData = new FormData();

  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await useAxios().post('/api/my/selectCybdsnDsctn', formData);

  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });
};

/** 목록으로 이동 */
const movePage = () => {
  navigateTo('/my/dscsn/cyber/CybdsnDsctnList');

  // router.push(`/my/dscsn/cyber/CybdsnDsctnList`);
};

// TODO - 나중에 공통 잡히면 지우기
// 메뉴 넣으면 지워야함
const handleGoBack = () => window.history.back();
const handlePrint = () => window.print();
</script>

<template>
  <div class="sub-wrap" id="board-view">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!--          TODO - 추후지우기-->
          <!--          <Breadcrumb-->
          <!--            :showPrintButton="true"-->
          <!--            :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"-->
          <!--            breadcrumbTitle="사이버상담 문의"-->
          <!--          />-->
          <div class="breadcrumb-title-box">
            <div class="title-box">
              <h3>사이버상담 문의</h3>
            </div>
            <div class="breadcrumb-box">
              <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
                <ol class="breadcrumb">
                  <!-- 홈 아이템 -->
                  <li class="breadcrumb-item home-item">홈</li>
                  <!-- 브레드크럼 항목 렌더링 -->
                </ol>
                <div class="btns-breadcrumb">
                  <button class="btn prev-button" @click="handleGoBack">
                    <span class="text-span"> 뒤로가기 </span>
                  </button>
                  <button class="btn print-button" @click="handlePrint">
                    <span class="text-span"> 인쇄하기 </span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <a-form :model="form">
        <section class="section2">
          <div class="container">
            <!-- Description : 전체 레이아웃 및 class는 기존 상세와 동일 -->
            <div class="board-view-box">
              <div class="content-header">
                <CommonBadge :tag-badge-text="form.instNm" />

                <div class="info-box">
                  <div class="title-box">
                    <h4>{{ form.dscsnTtl }}</h4>
                  </div>
                  <div class="inner-box">
                    <span class="date-span"
                      >작성일: {{ form.lastMdfcnDt }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="content-body">
                <p v-html="form.dscsnCn"></p>
                <!-- <p v-html="boardArticle.baContentHtml"></p> -->
              </div>
            </div>

            <div class="board-comment-box">
              <div class="content-header">
                <div class="info-box">
                  <div class="title-box">
                    <h4>답변내용</h4>
                  </div>
                  <div class="inner-box">
                    <!--                    TODO - 답변 작성일 수정필요-->
                    <span class="date-span" v-if="form.cybdsnAnsCn"
                      >작성일: {{ form.lastMdfcnDt }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="content-body">
                <p v-if="form.cybdsnAnsCn" v-html="form.cybdsnAnsCn"></p>
                <p v-else>답변 검토 중입니다.</p>
                <!-- <p v-html="boardArticle.asaBoardAnswer.baContentHtml"></p> -->
              </div>
            </div>
            <ButtonGroup align="right" class="!mt-50px">
              <CommonButton variants="primary" width="sm" @click="movePage"
                >목록으로</CommonButton
              >
            </ButtonGroup>
          </div>
        </section>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/my/dscsn/cyber/CybdsnDsctnView';
</style>
