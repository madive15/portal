<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import DatePicker from '~/components/ui/datepicker/datePicker.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
interface FormData {
  name: string;
  id: string;
  pw: string;
  pwConf: string;
  addr: string;
  addr2: string;
  addr3: string;
  nati: string;
  phone: string;
  tel: string;
  tel2: string;
  mobile: string;
  mobile2: string;
  mobile3: string;
  email: string;
  email2: string;
  email3: string;
  infoRec: string;
  birthday: string;
}
const formData: UnwrapRef<FormData> = reactive({
  name: '',
  id: '',
  pw: '',
  pwConf: '',
  addr: '',
  addr2: '',
  addr3: '',
  nati: '',
  phone: '',
  tel: '',
  tel2: '',
  mobile: '',
  mobile2: '',
  mobile3: '',
  email: '',
  email2: '',
  email3: '',
  infoRec: '',
  birthday: ''
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <a-form
    :model="formData"
    name="basic"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    validateTrigger="change"
  >
    <div class="common-form__area">
      <p class="form-ess_info">
        <i class="red-span">*</i>
        <span> 표시는 필수 입력 사항입니다. </span>
      </p>
      <table>
        <caption>
          회원가입 정보입력의 이름, 아이디, 비밀번호, 비밀번호확인, 국적,
          휴대전화, 전화번호, 이메일, 정보 수신여부 입력에관한 표
        </caption>
        <tbody>
          <tr>
            <th scope="row">이름</th>
            <td>
              <div class="form-text">홍길동</div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              아이디
              <span class="red-span">
                <i>*</i>
                <span class="sr-only">필수 입력 항목</span>
              </span>
            </th>
            <td>
              <div class="item-column">
                <a-form-item
                  name="id"
                  label="아이디"
                  :labelCol="{ class: 'sr-only' }"
                  :rules="[
                    { required: true, message: 'Please input your username!' }
                  ]"
                >
                  <a-input class="text-bx" v-model:value="formData.id" />
                </a-form-item>
                <CommonButton variants="primary">중복확인</CommonButton>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              비밀번호
              <span class="red-span">
                <i>*</i>
                <span class="sr-only">필수 입력 항목</span>
              </span>
            </th>
            <td>
              <div class="input-outline">
                <div class="input-group__bx">
                  <a-form-item
                    name="pw"
                    label="비밀번호"
                    :labelCol="{ class: 'sr-only' }"
                    :rules="[
                      {
                        required: true,
                        message: '비밀번호 규칙이 올바르지 않습니다.'
                      }
                    ]"
                  >
                    <a-input class="text-bx" v-model:value="formData.pw" />
                  </a-form-item>
                </div>
                <p class="input-info">
                  9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">비밀번호확인</th>
            <td>
              <a-form-item
                name="pwConf"
                label="비밀번호"
                :labelCol="{ class: 'sr-only' }"
                :rules="[
                  {
                    required: true,
                    message: '비밀번호 규칙이 올바르지 않습니다.'
                  }
                ]"
              >
                <a-input class="text-bx" v-model:value="formData.pwConf" />
              </a-form-item>
            </td>
          </tr>
          <tr>
            <th scope="row">국적</th>
            <td>
              <a-form-item
                name="nati"
                label="국적"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-select
                  class="common-select"
                  placeholder="선택"
                  v-model:value="formData.nati"
                >
                  <a-select-option value="1">선택 1</a-select-option>
                  <a-select-option value="2">선택 2</a-select-option>
                </a-select>
              </a-form-item>
            </td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td>
              <div class="form-item__addr">
                <div class="item-column">
                  <a-form-item
                    name="addr"
                    label="주소"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" v-model:value="formData.addr" />
                  </a-form-item>
                  <CommonButton variants="primary">우편번호 찾기</CommonButton>
                </div>
                <a-form-item
                  name="addr2"
                  label="주소상세2"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input
                    class="text-bx full"
                    v-model:value="formData.addr2"
                    readonly
                  />
                </a-form-item>

                <a-form-item
                  name="addr3"
                  label="주소상세3"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input
                    class="text-bx full"
                    v-model:value="formData.addr3"
                  />
                </a-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              휴대전화
              <span class="red-span">
                <i>*</i>
                <span class="sr-only">필수 입력 항목</span>
              </span>
            </th>
            <td>
              <a-form-item
                name="phone"
                label="휴대전화"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-input class="text-bx" v-model:value="formData.phone" />
              </a-form-item>
            </td>
          </tr>
          <tr>
            <th scope="row">
              전화번호
              <span class="red-span">
                <i>*</i>
                <span class="sr-only">필수 입력 항목</span>
              </span>
            </th>
            <td>
              <div class="form-item__number">
                <a-form-item
                  name="tel"
                  label="전화번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-select class="common-select" v-model:value="formData.tel">
                    <a-select-option value="1">선택 1</a-select-option>
                    <a-select-option value="2">선택 2</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item
                  name="tel2"
                  label="전화번호2"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" v-model:value="formData.tel2" />
                </a-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">전화번호</th>
            <td>
              <div class="form-item__number">
                <a-form-item
                  name="mobile"
                  label="전화번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-select
                    class="common-select"
                    placeholder="선택"
                    v-model:value="formData.mobile"
                  >
                    <a-select-option value="1">선택 1</a-select-option>
                    <a-select-option value="2">선택 2</a-select-option>
                  </a-select>
                </a-form-item>
                <span class="dash">-</span>
                <a-form-item
                  name="mobile2"
                  label="전화번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" v-model:value="formData.mobile2" />
                </a-form-item>
                <span class="dash">-</span>
                <a-form-item
                  name="mobile3"
                  label="전화번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" v-model:value="formData.mobile3" />
                </a-form-item>
                <CommonButton variants="gray">인증번호</CommonButton>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">이메일</th>
            <td>
              <div class="form-item__email">
                <a-form-item
                  name="email"
                  label="이메일"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" v-model:value="formData.email" />
                </a-form-item>
                <span class="dash">@</span>
                <a-form-item
                  name="email2"
                  label="이메일"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" v-model:value="formData.email2" />
                </a-form-item>
                <a-form-item
                  name="email3"
                  label="이메일 선택"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-select
                    class="common-select"
                    placeholder="선택"
                    v-model:value="formData.email3"
                  >
                    <a-select-option value="1">선택 1</a-select-option>
                    <a-select-option value="2">선택 2</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">정보 수신여부</th>
            <td>
              <a-form-item
                name="infoRec"
                label="정보 수신여부"
                :labelCol="{ class: 'sr-only' }"
              >
                <a-radio-group v-model:value="formData.infoRec">
                  <a-radio class="radio-bx" value="1" disabled="disabled"
                    >수신</a-radio
                  >
                  <a-radio class="radio-bx" value="2">미수신</a-radio>
                </a-radio-group>
              </a-form-item>
              <p class="input-info">
                ※ 이메일 및 SMS미수신 시 지원업무 진행사항 등의 정보를 받으실 수
                없습니다.
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">생년월일</th>
            <td>
              <a-form-item
                name="birthday"
                label="비밀번호"
                :labelCol="{ class: 'sr-only' }"
                :rules="[
                  {
                    required: true,
                    message: '생년월일은(는) 필수입력값입니다.'
                  }
                ]"
              >
                <div class="date-picker__group">
                  <VueDatePicker
                    name="writePeriodStart"
                    id="write-period-start"
                    v-model="formData.birthday"
                    locale="ko"
                    :enable-time-picker="false"
                    :format="'yyyy-MM-dd'"
                    :auto-apply="true"
                    :clearable="false"
                    :transitions="false"
                    :highlight-week-days="[0]"
                    :week-start="0"
                    placeholder="생년월일 선택"
                    hide-input-icon
                  />
                </div>
              </a-form-item>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonGroup align="center">
      <CommonButton type="button" class="gray" width="sm"> 취소 </CommonButton>
      <CommonButton type="submit" class="primary" width="sm">
        확인
      </CommonButton>
    </ButtonGroup>
  </a-form>
</template>

<style scoped lang="scss"></style>
