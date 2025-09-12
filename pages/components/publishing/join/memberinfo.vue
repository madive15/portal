<script setup lang="ts">
import { ref } from 'vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import SearchCs from '~/components/ui/search/searchCs.vue';
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';
import InputForm from '~/components/ui/input/inputform.vue';

definePageMeta({
  layout: 'guide'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '브레드크럼 메뉴타이틀',
  menuitem: [
    { menuid: 1, text: '메뉴1', to: '/test1' },
    { menuid: 2, text: '메뉴2', to: '/test2' },
    { menuid: 3, text: '메뉴3', to: '/test3' },
    { menuid: 4, text: '메뉴3', to: '/test3' },
    { menuid: 6, text: '마지막 메뉴', to: '/test5' }
  ]
};

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="content">
    <div class="sub-wrap">
      <div class="container" id="common-content">
        <div class="sub-content-box" id="register-form">
          <section class="section1">
            <CommonBreadCrumb
              :breadcrumb-title="breadcrumbMenuItem.menutitle"
              :showPrintButton="true"
              :breadcrumbItems="breadcrumbMenuItem.menuitem"
            />
            <div class="step-box">
              <ol class="row row-cols-5">
                <li class="col-xl col-12 step1">
                  <div class="step-text-box">
                    <strong>01.</strong>
                    <span>회원유형</span>
                  </div>
                </li>

                <li class="col-xl col-12 step2">
                  <div class="step-text-box">
                    <strong>02.</strong>
                    <span>약관동의</span>
                  </div>
                </li>

                <li class="col-xl col-12 step3">
                  <div class="step-text-box">
                    <strong>03.</strong>
                    <span>본인확인</span>
                  </div>
                </li>

                <li class="col-xl col-12 step4">
                  <div class="step-text-box active">
                    <strong>04.</strong>
                    <span>정보입력<span class="sr-only">(현재단계)</span></span>
                  </div>
                </li>

                <li class="col-xl col-12 step5">
                  <div class="step-text-box">
                    <strong>05.</strong>
                    <span>가입완료</span>
                  </div>
                </li>
              </ol>
            </div>
          </section>
          <section class="section2">
            <div class="common-table__box">
              <span class="info-txt">
                <span class="red-span">*</span>
                표시는 필수 입력 사항입니다.
              </span>
              <InputForm />
            </div>
          </section>
        </div>
        <!-- 만족도 조사 -->
        <inputSatisfaction />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/memberinfo/index.scss';
//@include form-common-mo;
</style>
