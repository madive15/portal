<!--
 * 화면명 : 전자접수신청_대한법률구조공단 약관동의 및 기본정보 입력 폼
 * 화면ID : LASP_ELE_018_01
 * 파일명 : ElrcptKlacM
 * 작성자 : 김정남
 * 화면 설명 : 대한법률구조공단 약관동의 및 기본정보 입력 폼
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.11  김정남   최초생성
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
import * as dscsnApis from '~/composables/dscsn';
import AdmInfoPblcUtztnPopup from '~/components/common/AdmInfoPblcUtztnPopup.vue';
import * as valid from '~/utils/validation';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import AddrInput from '~/components/common/AddrInputRules.vue';
import { useLoginStore } from '~/stores/login';

definePageMeta({
  layout: 'pub2nd'
});

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();
const { showAlert } = useCustomAlert();
const modalRef = ref<InstanceType<typeof AdmInfoPblcUtztnPopup>>();

const showModal = () => {
  modalRef.value?.setChecked?.(form.rghtUdsdAgreYn === 'Y'); // 선택 사항
  modalRef.value?.open();
};

// 모달에서 올라오는 체크 여부(true/false)를 라디오 값으로 반영
const onAgreeChange = (checked: boolean) => {
  form.rghtUdsdAgreYn = checked ? 'Y' : 'N';
};

// 로그인한 회원정보 저장
const userAddr = reactive({
  zip: '',
  addr: '',
  daddr: ''
});

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();
  userAddr.zip = response.data.zip;
  userAddr.addr = response.data.mbrAddr;
  userAddr.daddr = response.data.mbrDaddr;
};

onBeforeMount(() => {
  if (authenticated.value) {
    selectUserInfo();
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.',
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

const formRef = ref();

const form = reactive({
  prvcPrcsAgre: false, // 이용약관
  prvcClctUtztnPrpsAgre: false, // 개인정보 수집 및 이용동의
  tdptyPvsnAgre: false, // 제3자 제공동의
  aplcntZip: '',
  aplcntAddr: '',
  aplcntDaddr: '',
  aplcntMblTelno: '', // 전화번호
  rghtUdsdAgreYn: '', // 행정정보 공동이용 동의
  smsRcptnAgreYn: '', // sms 수신
  emlRcptnAgreYn: '' // eml 수신
});

const selectMbrAddrCheck = ref<boolean>(false);

const formRules: Record<string, RuleObject[]> = {
  prvcPrcsAgre: [valid.checkbox('이용약관')],
  prvcClctUtztnPrpsAgre: [valid.checkbox('개인정보 수집 및 이용동의')],
  tdptyPvsnAgre: [valid.checkbox('개인정보의 제3자 제공 동의')],
  aplcntAddressGroup: [valid.addressGroup(form, 'aplcntZip', 'aplcntAddr')],
  aplcntMblTelno: [valid.required('전화번호'), valid.mobile()],
  rghtUdsdAgreYn: [valid.required('행정정보 공동이용')],
  smsRcptnAgreYn: [valid.required('sms 알림수신 동의')],
  emlRcptnAgreYn: [valid.required('이메일 알림수신 동의')]
};

/**
 * name :
 * desc : 회원가입 주소랑 동일하게 입력 체크에 따른 input 값 변경
 */
watch(selectMbrAddrCheck, (checked) => {
  if (checked) {
    // 저장된 주소 넣기
    form.aplcntZip = userAddr.zip;
    form.aplcntAddr = userAddr.addr;
    form.aplcntDaddr = userAddr.daddr;
  } else {
    // 값 초기화
    form.aplcntZip = '';
    form.aplcntAddr = '';
    form.aplcntDaddr = '';
  }
});

/**
 * name : submitElrcptKlacForm
 * desc : 대한법률구조공단 전자접수 신청 데이터 저장
 */
const submitElrcptKlacForm = async () => {
  await formRef.value.validate();

  alert('저장 작업 진행 중입니다.');
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전자접수 신청"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <a-form :model="form" :rules="formRules" ref="formRef">
          <CommonTitle tag="h4" size="1" type="bar">
            이용약관 (필수사항)
          </CommonTitle>
          <div class="list-box">
            <div class="list-scrolled">
              <div class="box-item">
                <h5 class="title-heading-2">제1장 총칙</h5>
                <div class="txt">
                  이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용
                </div>
              </div>
              <div class="box-item">
                <h5 class="title-heading-2">나. 수집하는 개인정보의 항목</h5>
                <ul class="counsel-bull-list">
                  <li>
                    필수항목 : 성명, 이메일주소, 휴대전화번호, 전화번호 등
                    예약상담 필수입력 항목
                  </li>
                  <li>
                    선택항목 : 예약상담 접수를 위한 예약신청서상의 선택입력 항목
                  </li>
                </ul>
              </div>
              <div class="box-item">
                <h5 class="title-heading-2">
                  다. 개인정보의 보유 및 이용기간 (법적근거 또는 내부결재문서
                  근거)
                </h5>
                <div class="txt">
                  이용자 개인정보는 원칙적으로 개인정보의 처리목적이 달성되면
                  지체없이 파기합니다.<br />
                  단, 다음의 정보는 아래의 사유로 명시한 기간 동안 보존합니다.
                </div>
                <ul class="counsel-bull-list">
                  <li>법률상담 예약정보</li>
                </ul>
                <div class="txt">
                  - 보존항목 : 이름, 휴대폰번호, 전화번호, 이메일주소<br />
                  - 보존기간 : 10년<br />
                  - 보존근거 : 문서사무등 관리규칙 시행규정
                </div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="form-check">
              <a-form-item
                name="prvcPrcsAgre"
                label="개인정보 수집 및 이용동의"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-checkbox
                  class="check-bx"
                  value=""
                  name=""
                  v-model:checked="form.prvcPrcsAgre"
                >
                  본인은 이용약관을 확인하였고 이에 동의합니다(필수)
                </a-checkbox>
              </a-form-item>
            </div>
          </div>

          <CommonTitle tag="h4" size="1" type="bar">
            개인정보 수집 및 이용동의 (필수사항)
          </CommonTitle>
          <div class="list-box">
            <div class="list-scrolled">
              <div class="box-item">
                <h5 class="title-heading-2">제1장 총칙</h5>
                <div class="txt">
                  이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용
                </div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="form-check">
              <a-form-item
                name="prvcClctUtztnPrpsAgre"
                label="개인정보 수집 및 이용동의"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-checkbox
                  class="check-bx"
                  value=""
                  name=""
                  v-model:checked="form.prvcClctUtztnPrpsAgre"
                >
                  본인은 개인정보 수집 및 이용동의를 확인하였고 이에
                  동의합니다(필수)
                </a-checkbox>
              </a-form-item>
            </div>
          </div>

          <CommonTitle tag="h4" size="1" type="bar">
            개인정보의 제3자 제공 동의 (필수사항)
          </CommonTitle>
          <div class="list-box">
            <div class="list-scrolled">
              <div class="box-item">
                <h5 class="title-heading-2">제1장 총칙</h5>
                <div class="txt">
                  이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                  내용내용 내용내용 내용내용 내용내용 내용내용
                </div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="form-check">
              <a-form-item
                name="tdptyPvsnAgre"
                label="개인정보 제3자 제공동의"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-checkbox
                  class="check-bx"
                  value=""
                  name=""
                  v-model:checked="form.tdptyPvsnAgre"
                >
                  본인은 개인정보 수집 및 이용동의를 확인하였고 이에
                  동의합니다(필수)
                </a-checkbox>
              </a-form-item>
            </div>
          </div>

          <CommonTitle tag="h4" size="1" type="bar"> 추가정보 </CommonTitle>
          <div class="common-form__area colgroup">
            <p class="form-ess_info">
              <i class="red-span">*</i>
              <span> 표시는 필수 입력 사항입니다. </span>
            </p>
            <table>
              <caption>
                전자접수 추가정보의 송달주소, 전화번호, 행정정보공동 이용동의,
                SMS 알림수신동의, 이메일알림수신동의 입력에관한 표
              </caption>
              <colgroup>
                <col width="12%" />
                <col width="38%" />
                <col width="12%" />
                <col width="38%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    송달주소
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td colspan="3">
                    <div class="form-group-box">
                      <a-checkbox
                        class="check-bx"
                        value=""
                        name="type"
                        @change="changeMbrAddrCheck"
                        v-model:checked="selectMbrAddrCheck"
                      >
                        회원가입 주소랑 동일하게 입력
                      </a-checkbox>
                      <a-form-item
                        name="aplcntAddressGroup"
                        label="주소"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <AddrInput
                          v-model:zip="form.aplcntZip"
                          v-model:addr="form.aplcntAddr"
                          v-model:dAddr="form.aplcntDaddr"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    전화번호
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="aplcntMblTelno"
                        label="휴대전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.aplcntMblTelno"
                          ref="phoneRef"
                        />
                      </a-form-item>
                    </div>
                  </td>
                  <th scope="row">
                    행정정보공동 이용동의
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <div class="form-group-box flow-row">
                      <a-form-item
                        name="rghtUdsdAgreYn"
                        label="행정정보공동 이용동의"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-radio-group
                          :value="form.rghtUdsdAgreYn"
                          @change="showModal"
                        >
                          <a-radio class="radio-bx" value="Y">동의</a-radio>
                          <a-radio class="radio-bx" value="N">비동의</a-radio>
                        </a-radio-group>
                        <CommonButton type="button" @click="showModal">
                          자세히 보기
                          <template #right-icon>
                            <Icon name="arrowRight" />
                          </template>
                        </CommonButton>
                      </a-form-item>
                      <AdmInfoPblcUtztnPopup
                        ref="modalRef"
                        @update:agree="onAgreeChange"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    SMS 알림수신동의
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <a-form-item
                      name="smsRcptnAgreYn"
                      label="sms알림수신동의"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-radio-group v-model:value="form.smsRcptnAgreYn">
                        <a-radio class="radio-bx" value="Y">동의</a-radio>
                        <a-radio class="radio-bx" value="N">비동의</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </td>
                  <th scope="row">
                    이메일알림수신동의
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <a-form-item
                      name="emlRcptnAgreYn"
                      label="이메일알림수신동의"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-radio-group v-model:value="form.emlRcptnAgreYn">
                        <a-radio class="radio-bx" value="Y">동의</a-radio>
                        <a-radio class="radio-bx" value="N">비동의</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </a-form>

        <ButtonGroup align="center" class="!mt-50px">
          <!--          <CommonButton variants="line-primary" width="lg">-->
          <!--            취소하기-->
          <!--          </CommonButton>-->
          <CommonButton
            variants="primary"
            width="lg"
            @click="submitElrcptKlacForm"
          >
            전자접수 계속하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/elrcpt/form/ElrcptKlacM';
</style>
