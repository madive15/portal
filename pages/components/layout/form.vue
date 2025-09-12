<script setup lang="ts">
import InputForm from '~/components/ui/input/inputform.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Form</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• Form - antdv</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <InputForm />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;a-form
            :model="formData"
            name="basic"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          &lt;div class="common-form__area">
            &lt;p class="form-ess_info">
              &lt;i class="red-span">*&lt;/i>
              &lt;span> 표시는 필수 입력 사항입니다. &lt;/span>
            &lt;/p>
            &lt;table>
              &lt;caption>
                회원가입 정보입력의 이름, 아이디, 비밀번호, 비밀번호확인, 국적,
                휴대전화, 전화번호, 이메일, 정보 수신여부 입력에관한 표
              &lt;/caption>
              &lt;tbody>
                &lt;tr>
                  &lt;th scope="row">이름&lt;/th>
                  &lt;td>
                    &lt;div class="form-text">홍길동&lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">
                    아이디
                    &lt;span class="red-span">
                      &lt;i>*&lt;/i>
                      &lt;span class="sr-only">필수 입력 항목&lt;/span>
                    &lt;/span>
                  &lt;/th>
                  &lt;td>
                    &lt;div class="item-column">
                      &lt;a-form-item
                          name="userId"
                          label="아이디"
                          :labelCol="{ class: 'sr-only' }"
                          :rules="[
                          { required: true, message: 'Please input your username!' }
                        ]"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.id" />
                      &lt;/a-form-item>
                      &lt;CommonButton variants="primary">중복확인&lt;/CommonButton>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">
                    비밀번호
                    &lt;span class="red-span">
                      &lt;i>*&lt;&lt;/i>
                      &lt;span class="sr-only">필수 입력 항목&lt;/span>
                    &lt;/span>
                  &lt;/th>
                  &lt;td>
                    &lt;div class="input-outline">
                      &lt;div class="input-group__bx">
                        &lt;a-form-item
                            name="userPw"
                            label="비밀번호"
                            :labelCol="{ class: 'sr-only' }"
                            :rules="[
                            {
                              required: true,
                              message: '비밀번호 규칙이 올바르지 않습니다.'
                            }
                          ]"
                        >
                          &lt;a-input class="text-bx" v-model:value="formData.userPw" />
                        &lt;/a-form-item>
                      &lt;/div>
                      &lt;p class="input-info">
                        9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
                      &lt;/p>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">비밀번호확인&lt;/th>
                  &lt;td>
                    &lt;a-form-item
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
                      &lt;a-input class="text-bx" v-model:value="formData.pwConf" />
                    &lt;/a-form-item>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">국적&lt;/th>
                  &lt;td>
                    &lt;a-form-item
                        name="nati"
                        label="국적"
                        :labelCol="{ class: 'sr-only' }"
                    >
                      &lt;a-select
                          class="common-select"
                          placeholder="선택"
                          v-model:value="formData.nati"
                      >
                        &lt;a-select-option value="1">선택 1&lt;/a-select-option>
                        &lt;a-select-option value="2">선택 2&lt;/a-select-option>
                      &lt;/a-select>
                    &lt;/a-form-item>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">주소&lt;/th>
                  &lt;td>
                    &lt;div class="form-item__addr">
                      &lt;div class="item-column">
                        &lt;a-form-item
                            name="addr"
                            label="주소"
                            :labelCol="{ class: 'sr-only' }"
                        >
                          &lt;a-input class="text-bx" v-model:value="formData.addr" />
                        &lt;/a-form-item>
                        &lt;CommonButton variants="primary">우편번호 찾기&lt;/CommonButton>
                      &lt;/div>
                      &lt;a-form-item
                          name="addr2"
                          label="주소상세2"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input
                            class="text-bx full"
                            v-model:value="formData.addr2"
                        />
                      &lt;/a-form-item>

                      &lt;a-form-item
                          name="addr3"
                          label="주소상세3"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input
                            class="text-bx full"
                            v-model:value="formData.addr3"
                        />
                      &lt;/a-form-item>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">
                    휴대전화
                    &lt;span class="red-span">
                      &lt;i>*&lt;/i>
                      &lt;span class="sr-only">필수 입력 항목&lt;/span>
                    &lt;/span>
                  &lt;/th>
                  &lt;td>
                    &lt;a-form-item
                        name="phone"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                    >
                      &lt;a-input class="text-bx" v-model:value="formData.phone" />
                    &lt;/a-form-item>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">
                    전화번호
                    &lt;span class="red-span">
                      &lt;i>*&lt;/i>
                      &lt;span class="sr-only">필수 입력 항목&lt;/span>
                    &lt;/span>
                  &lt;/th>
                  &lt;td>
                    &lt;div class="form-item__number">
                      &lt;a-form-item
                          name="tel"
                          label="전화번호"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-select class="common-select" v-model:value="formData.tel">
                          &lt;a-select-option value="1">선택 1&lt;/a-select-option>
                          &lt;a-select-option value="2">선택 2&lt;/a-select-option>
                        &lt;/a-select>
                      &lt;/a-form-item>

                      &lt;a-form-item
                          name="tel2"
                          label="전화번호2"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.tel2" />
                      &lt;/a-form-item>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">전화번호&lt;/th>
                  &lt;td>
                    &lt;div class="form-item__number">
                      &lt;a-form-item
                          name="mobile"
                          label="전화번호"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-select
                            class="common-select"
                            placeholder="선택"
                            v-model:value="formData.mobile"
                        >
                          &lt;a-select-option value="1">선택 1&lt;/a-select-option>
                          &lt;a-select-option value="2">선택 2&lt;/a-select-option>
                        &lt;/a-select>
                      &lt;/a-form-item>
                      &lt;span class="dash">-&lt;/span>
                      &lt;a-form-item
                          name="mobile2"
                          label="전화번호"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.mobile2" />
                      &lt;/a-form-item>
                      &lt;span class="dash">-&lt;/span>
                      &lt;a-form-item
                          name="mobile3"
                          label="전화번호"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.mobile3" />
                      &lt;/a-form-item>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">이메일&lt;/th>
                  &lt;td>
                    &lt;div class="form-item__email">
                      &lt;a-form-item
                          name="email"
                          label="이메일"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.email" />
                      &lt;/a-form-item>
                      &lt;span class="dash">@&lt;/span>
                      &lt;a-form-item
                          name="email2"
                          label="이메일"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" v-model:value="formData.email2" />
                      &lt;/a-form-item>
                      &lt;a-form-item
                          name="email3"
                          label="이메일 선택"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-select
                            class="common-select"
                            placeholder="선택"
                            v-model:value="formData.email3"
                        >
                          &lt;a-select-option value="1">선택 1&lt;/a-select-option>
                          &lt;a-select-option value="2">선택 2&lt;/a-select-option>
                        &lt;/a-select>
                      &lt;/a-form-item>
                    &lt;/div>
                  &lt;/td>
                &lt;/tr>
                &lt;tr>
                  &lt;th scope="row">정보 수신여부&lt;/th>
                  &lt;td>
                    &lt;a-form-item
                        name="infoRec"
                        label="정보 수신여부"
                        :labelCol="{ class: 'sr-only' }"
                    >
                      &lt;a-radio-group v-model:value="formData.infoRec">
                        &lt;a-radio class="radio-bx" value="1" disabled="disabled"
                        >수신&lt;/a-radio
                        >
                        &lt;a-radio class="radio-bx" value="2">미수신&lt;/a-radio>
                      &lt;/a-radio-group>
                    &lt;/a-form-item>
                    &lt;p class="input-info">
                      ※ 이메일 및 SMS미수신 시 지원업무 진행사항 등의 정보를 받으실 수
                      없습니다.
                    &lt;/p>
                  &lt;/td>
                &lt;/tr>
              &lt;/tbody>
            &lt;/table>
          &lt;/div>
          &lt;ButtonGroup align="center">
            &lt;CommonButton type="button" class="gray" width="sm"> 취소 &lt;/CommonButton>
            &lt;CommonButton type="submit" class="primary" width="sm">
              확인
            &lt;/CommonButton>
          &lt;/ButtonGroup>
        &lt;/a-form>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
