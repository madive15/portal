<!--
* 화면명 : 상자중재 관련 상담 콘텐츠/폼
* 화면ID : LASP_CON_014
* 파일명 : KcabEdit
* 작성자 : 김정남
* 화면설명 : 상사중재 관련 상담 콘텐츠 및 상담 폼 페이지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
변경일       변경자       변경내역
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
2025.07.01  김정남       최초생성
2025.07.16  김정남       validation check 작성
2025.07.24  김정남       validation check 오류 조치
-->

<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import TelNumInput from '~/components/common/TelNumInputRules.vue';
import EmailInput from '~/components/common/EmailInputRules.vue';
import axios from 'axios';
import { reactive } from 'vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import type { ColumnType } from 'ant-design-vue/es/table';
import * as valid from '~/utils/validation';

const { showAlert } = useCustomAlert();
const route = useRoute();
const router = useRouter();

const logo = ref<string>('');
const description = ref<string>('');

/**
 * 함수명 : selectInst
 * 함수설명 : 기관 소개 내용 및 로고 조회
 */
const selectInst = async () => {
  const response = await axios.get('/api/inst/info?instNo=I030000000');
  const item = response.data;

  const logoData = item.instLogoGd;
  const explnData = item.instExplnGd;

  logo.value = `/api/image?atchFileId=${logoData.atchFileId}&atchFileSeq=1`;
  description.value = explnData.gdCn;
};

const formRef = ref();
const titleInputRef = ref();
const nameInputRef = ref();
const contentInputRef = ref();
const telInputRef = ref();
const mailInputRef = ref();

const form = reactive({
  title: '',
  name: '',
  phone: '',
  email: '',
  content: ''
});

const refMap: Record<string, Ref<any>> = {
  title: titleInputRef,
  name: nameInputRef,
  content: contentInputRef,
  phone: telInputRef,
  email: mailInputRef
};

/**
 * 함수명 : validatePhone
 * 함수설명 : 휴대전화번호 유효성 검사
 */
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * 함수명 : validateEmail
 * 함수설명 : 이메일주소 유효성 검사
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formRules: Record<string, RuleObject[]> = {
  title: [valid.required()],
  name: [valid.required()],
  phone: [valid.required(), valid.mobile()],
  email: [valid.required(), valid.email()],
  content: [
    valid.required(),
    { max: 1000, message: '1000자 이내로 입력하세요.' }
  ]
};

/**
 * 함수명 : interfaceInquiry
 * 함수설명 : 대한상사중재원으로 상담문의 전송
 */
const interfaceInquiry = async () => {
  formRef.value
    .validate()
    .then(() => {
      const submit = showAlert({
        icon: 'question',
        html: '작성하신 내용으로 상담문의 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      });

      if (submit.isConfirmed) {
        /* 대한상사중재원에 전송할 데이터 폼 */
        const objData = {
          titl: form.title,
          makepersnm: form.name,
          cont: form.content,
          email: form.email,
          tel_no: form.value,
          coun_clsf_s: '01'
        };
        /* 대한상사중재원에 전송할 데이터 폼 */

        try {
          /* 대한상사중재원에 문의내역 전송 */
          // const response = await axios.post(
          //   'https://www.kcab.or.kr/notice/saveInquire.do',
          //   objData,
          //   {
          //     headers: {
          //       'Content-Type': 'application/json'
          //     },
          //     transformRequest: [
          //       function (data) {
          //         const params = new URLSearchParams();
          //         for (const key in data) {
          //           params.append(key, data[key]);
          //         }
          //         return params;
          //       }
          //     ]
          //   }
          // );
          /* 대한상사중재원에 문의내역 전송 */

          showAlert({
            icon: 'success',
            html: '문의사항이 등록되었습니다.'
          }).then(() => {
            location.reload();
          });
        } catch (error) {
          showAlert({
            icon: 'error',
            html: '등록에 실패하였습니다.'
          });
        }
      }
    })
    .catch((err) => {
      const errField = err.errorFields?.[0]?.name?.[0];
      if (errField && refMap[errField]?.value) {
        if (typeof refMap[errField].value.focus === 'function') {
          if (errField == 'phone') {
            const ref = refMap[errField].value;
            if (!ref.first) {
              ref.firstFocus?.(); // select가 선택되지 않은 경우
            } else {
              ref.focus?.(); // 입력란으로 포커스
            }
          } else {
            refMap[errField].value.focus();
          }
        }
      }
    });
};

onMounted(() => {
  selectInst();
});
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
              <img src="/image/sub/counsel/counsel_top_txt_08.png" alt="KCAB" />
            </div>
            <div class="top-infos">
              <div class="top-desc" v-html="description"></div>

              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <a
                    href="https://www.kcab.or.kr/notice/inquire.do"
                    target="_blank"
                    rel="noopener"
                    class="router-link-exact-active router-link-active counsel-goto-btn"
                  >
                    온라인 문의
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1">주요업무</CommonTitle>

        <div class="bull-list-boxs">
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon01.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>중재</strong>
                <ul class="counsel-bull-list">
                  <li>
                    대한상사중재원은 중재법에 의한 중재를 수행하고 있으며 이러한
                    중재판정은 법원의 확정판결과 동일한 효력이 인정되며 국제적
                    효력이 부여됩니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon02.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>조정</strong>
                <ul class="counsel-bull-list">
                  <li>
                    조정은 분쟁해결전문가인 조정인이 당사자가 원만하게 합의에
                    이르도록 도와주는 절차로, 대한상사중재원은 일반조정,
                    법원연계형 조기조정을 수행하고 있습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon03.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>알선</strong>
                <ul class="counsel-bull-list">
                  <li>
                    대한상사중재원의 분쟁종합지원센터의 분쟁해결경험과 지식이
                    풍부한 직원이 개입하여 당사자간의 원만한 해결을 주선합니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1">상담안내</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-num-list">
            <li>
              <span class="num"><strong>※</strong></span>
              <div>
                <strong>
                  대한상사중재원은 국내외 각종 상거래 분쟁에 대하여 분쟁해결방법
                  등에 관한 상담을 수행하고 있습니다.
                </strong>
                <ul class="sub-list">
                  <li>
                    <span class="num">-</span>기업 간 또는 개인과 기업 간
                    상거래에서 분쟁이 발생했거나 발생할 가능성이 있는 당사자
                  </li>
                  <li>
                    <span class="num">-</span>계약서에 중재 조항을 넣고자 하는
                    기업 또는 개인
                  </li>
                  <li>
                    <span class="num">-</span>중재 절차, 비용, 기간 등에 대해
                    궁금한 모든 분
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <span class="num"><strong>※</strong></span>
              <div>
                <strong>
                  대한상사중재원의 상담을 문의하시려면 아래 문의 내용을 아래
                  양식을 작성해서 등록하시기 바랍니다.
                </strong>
                <ul class="sub-list">
                  <li>
                    <span class="num">-</span>문의 내용은 담당자 확인 후 연락
                    드리겠습니다.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" size="1">문의하기</CommonTitle>
        <div class="common-form__area">
          <a-form :model="form" :rules="formRules" ref="formRef">
            <CommonTable>
              <caption>
                사이버상담 상담내용입력의 공개여부, 제목, 내용 입력에관한 표
              </caption>
              <tbody>
                <tr>
                  <th scope="row">
                    제목
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <a-form-item
                      name="title"
                      label="제목"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="form.title"
                        placeholder="제목을 입력해주세요"
                        ref="titleInputRef"
                        :maxlength="40"
                      />
                    </a-form-item>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    성명
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <a-form-item
                      name="name"
                      label="성명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        v-model:value="form.name"
                        placeholder="이름을 입력해주세요"
                        ref="nameInputRef"
                        :maxlength="20"
                      />
                    </a-form-item>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    연락처
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <div class="form-group-box">
                      <a-form-item
                        name="phone"
                        label="연락처"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <TelNumInput
                          cd-group-id="CO0017"
                          v-model="form.phone"
                          ref="telInputRef"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    이메일
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <div class="form-group-box">
                      <a-form-item
                        name="email"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <EmailInput v-model="form.email" ref="mailInputRef" />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    내용
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <label for="textMessage">
                      <span class="sr-only">textarea</span>
                    </label>
                    <a-form-item
                      name="content"
                      label="내용"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        placeholder="문의내용을 상세히 적어주시면 더 정확하고 빠르게 처리하실 수 있습니다."
                        :maxlength="1000"
                        v-model:value="form.content"
                        ref="contentInputRef"
                      />
                    </a-form-item>
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </a-form>
        </div>

        <div class="button-box">
          <button type="button" class="btn type02" @click="interfaceInquiry">
            등록하기
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/inst/kcab/index.scss';
</style>
