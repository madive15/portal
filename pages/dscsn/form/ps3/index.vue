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
            <h3>대한가정법률복지상담원</h3>
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
            <h5>가. 개인정보 처리방침 안내</h5>
            <table>
              <caption>
                개인정보 수집 목적과 수집항목, 보유기간에 관한 표
              </caption>
              <thead>
                <tr>
                  <th>목적</th>
                  <th>항목</th>
                  <th>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이용자 식별 및 본인여부 확인</td>
                  <td>아이디, 이름, 비밀번호</td>
                  <td>회원 탈퇴 시까지</td>
                </tr>
                <tr>
                  <td>
                    고객서비스 이용에 관한 통지,<br />CS대응을 위한 이용자 식별
                  </td>
                  <td>연락처(이메일, 휴대전화번호)</td>
                  <td>회원 탈퇴 시까지</td>
                </tr>
              </tbody>
            </table>
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
@use '~/assets/style/pages/dscsn/form/ps3/index.scss';
</style>
