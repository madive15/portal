<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="면접상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar"
          >대한법률구조공단 면접상담 상세정보</CommonTitle
        >
        <CommonTitle tag="h5" size="2" type="dot">기본정보</CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              면접상담 상세정보의 상태, 예약번호, 성명, 전화번호, 휴대전화번호,
              이메일, 상담예약시간, 인지경로 입력에 관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">
                  상태
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <strong class="form-b-txt">상담전</strong>
                </td>
                <th scope="row">예약번호</th>
                <td>
                  <strong class="form-b-txt">1235468</strong>
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
                    name=""
                    label="성명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input value="김공단" class="text-bx" :disabled="true" />
                  </a-form-item>
                </td>
                <th scope="row">전화번호</th>
                <td>
                  <div class="form-item__number">
                    <a-form-item
                      name="mobile"
                      label="일반전화 지역번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select
                        class="common-select"
                        placeholder="선택"
                        value="02"
                        :disabled="true"
                      >
                        <a-select-option value="1">선택 1</a-select-option>
                        <a-select-option value="2">선택 2</a-select-option>
                      </a-select>
                    </a-form-item>
                    <span class="dash">-</span>
                    <a-form-item
                      name="mobile2"
                      label="일반전화 가운데 자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input value="1234" class="text-bx" :disabled="true" />
                    </a-form-item>
                    <span class="dash">-</span>
                    <a-form-item
                      name="mobile3"
                      label="일반전화 마지막자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input value="5678" class="text-bx" :disabled="true" />
                    </a-form-item>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  휴대전화번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-group-box">
                    <div class="form-item__number">
                      <a-form-item
                        name="mobile"
                        label="휴대전화 식별번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select
                          class="common-select"
                          placeholder="선택"
                          value="010"
                          :disabled="true"
                        >
                          <a-select-option value="1">선택 1</a-select-option>
                          <a-select-option value="2">선택 2</a-select-option>
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile2"
                        label="휴대전화 가운데 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          value="1234"
                          class="text-bx"
                          :disabled="true"
                        />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile3"
                        label="휴대전화 마지막 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          value="5678"
                          class="text-bx"
                          :disabled="true"
                        />
                      </a-form-item>
                    </div>
                    <a-checkbox class="check-bx" value="" name="type">
                      SMS 수신동의 (예약번호 수신 시 필요합니다.)
                    </a-checkbox>
                  </div>
                </td>
                <th scope="row">이메일</th>
                <td>
                  <div class="form-item__email">
                    <a-form-item
                      name="email"
                      label="이메일 아이디 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input value="test" class="text-bx" :disabled="true" />
                    </a-form-item>
                    <span class="dash">@</span>
                    <a-form-item
                      name="email2"
                      label="이메일 도메인 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        value="test.com"
                        class="text-bx"
                        :disabled="true"
                      />
                    </a-form-item>
                    <a-form-item
                      name="email3"
                      label="이메일 도메인 선택"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select
                        class="common-select"
                        placeholder="선택"
                        value="직접선택"
                        :disabled="true"
                      >
                        <a-select-option value="1">선택 1</a-select-option>
                        <a-select-option value="2">선택 2</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">상담예약시간</th>
                <td colspan="3">
                  <span class="is-emphasis">
                    [대한법률구조공단] 인천지부 2025.04.10 11:00
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  인지경로
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td colspan="3">광고</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonTitle tag="h5" size="2" type="dot">상담내용입력</CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              면접상담 상세정보의 내용, 이전상담직원, 예약공석정보 입력에관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">
                  내용
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <label for="textMessage">
                    <span class="sr-only">상담내용 입력</span>
                  </label>
                  <a-textarea
                    class="textarea-bx"
                    id="textMessage"
                    placeholder="최대 200자 입력 가능"
                    value="임금을 체불 당했습니다."
                    :maxlength="200"
                    :disabled="true"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">이전상담직원</th>
                <td>
                  <div class="form-group-box">
                    <a-form-item
                      name=""
                      label="이전상담직원"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        placeholder="이전상담직원"
                        value="이전상담직원"
                        :disabled="true"
                      />
                    </a-form-item>
                    <BullList type="refMark">
                      <li>
                        이전 상담직원 입력은 공단 내 업무처리용 정보이며, 공단
                        사정상 예약 시 입력한 이전 상담직원과 상담자가 일치하지
                        않을 수 있음을 양해 부탁드립니다.
                      </li>
                    </BullList>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">예약공석정보</th>
                <td>
                  <div class="form-group-box">
                    <a-checkbox class="check-bx" value="" name="type">
                      알림수신동의
                    </a-checkbox>
                    <BullList type="refMark">
                      <li>
                        알림수신 동의할 경우 예약공석 발생 시 해당정보가
                        알림톡으로 전송되어 간편한 예약변경이 가능합니다.
                      </li>
                    </BullList>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-bottom-box">
          <a-checkbox class="check-bx" value="" name="type">
            전자사보 수신동의
          </a-checkbox>
          <BullList type="refMark">
            <li class="blue">본인 예약이 원칙입니다.</li>
            <li class="blue">
              SMS수신동의, 메일 수신동의를 하지 않을 경우 예약확인을 위한
              예약번호를 받을 수 없어 예약 변경, 취소가 어려우니 반드시 1개 이상
              수신동의 하여주시기 바랍니다.
            </li>
            <li class="blue">
              휴대전화번호가 변경된 경우에는 공단 대표전화 (054-810-0132) 및
              예약기관에 문의하여 변경하여 주시기 바랍니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="line-primary" width="sm-1">목록</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
