<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'pub2nd'
});

const { showAlert } = useCustomAlert();

const checkValue = ref<boolean>();

const toggle = (e: events) => {
  checkValue.value = (e.target as HTMLInputElement).checked;
};

const confirmTrue = () => {
  if (!checkValue.value) {
    showAlert({
      icon: 'warning',
      html: `개인정보 수집 및 이용에 동의해주셔야 합니다.`
    });

    return;
  }

  alert('신청폼으로 이동');
};

const confirmFalse = () => {
  alert('뒤로가기');
};

// 메뉴 넣으면 지워야함
const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
// 메뉴 넣으면 지워야함
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!--        <Breadcrumb :showPrintButton="true" />-->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>한국가정법률상담소</h3>
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
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar">
          개인정보 제공 이용·동의 안내 (필수사항)
        </CommonTitle>
        <div class="list-box">
          <div class="box-item">
            <h5>가. 개인정보의 수집·이용 동의</h5>
            <div class="txt">
              “한국가정법률상담소”는 화상상담 예약을 위해 다음과 같이 개인정보를
              수집 및 이용합니다. 수집된 개인정보는 정해진 목적(화상상담 예약,
              관리, 서비스 향상 및 정책평가) 이외의 용도로는 이용되지 않으며
              수집 목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.
            </div>
          </div>
          <div class="box-item">
            <h5>나. 수집하는 개인정보의 항목</h5>
            <ul class="counsel-bull-list">
              <li>
                필수항목 : 성별, 연령, 이메일주소, 휴대전화번호, 전화번호,
                거주지역 등 화상상담 필수입력 항목
              </li>
              <li>
                선택항목 : 예약상담 접수를 위한 예약신청서 상의 선택입력 항목
              </li>
            </ul>
          </div>
          <div class="box-item">
            <h5>
              다. 개인정보의 보유 및 이용기간 (법적근거 또는 내부결재문서 근거)
            </h5>
            <div class="txt">
              이용자 개인정보는 원칙적으로 개인정보의 처리목적이 달성되면
              지체없이 파기합니다. 단, 다음의 정보는 아래의 사유로 명시한 기간
              동안 보존합니다.
            </div>
            <ul class="counsel-bull-list">
              <li>화상상담 예약정보</li>
            </ul>
            <div class="txt">
              - 보존항목 : 성별, 연령, 휴대폰번호, 전화번호, 거주지역,
              이메일주소<br />
              - 보존기간 : 상담일로부터 5년<br />
              - 보존근거 : 문서사무 등 관리규칙 시행규정
            </div>
          </div>
          <div class="box-item">
            <h5>
              라. 동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익
              내용
            </h5>
            <div class="txt">
              이용자는 "한국가정법률상담소"에서 수집하는 개인정보에 대해 동의를
              거부할 권리가 있으며 동의 거부 시에는 화상상담 예약 프로그램
              서비스가 제한됩니다.
            </div>
          </div>
        </div>

        <div class="input-box">
          <div class="form-check">
            <a-checkbox
              class="text-[16px]"
              value=""
              name="type"
              @change="toggle"
              v-model:checked="checkValue"
            >
              위 개인정보 수집 및 이용에 동의합니다
            </a-checkbox>
          </div>
        </div>
        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton width="xs" @click="confirmFalse">취소</CommonButton>
          <CommonButton variants="primary" width="xs" @click="confirmTrue"
            >다음</CommonButton
          >
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/form/ps2/index.scss';
</style>
