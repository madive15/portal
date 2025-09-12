<script setup lang="ts">
import CommonAccordionItem from '~/components/ui/accordion/accordionitem.vue';
import CommonAccordion from '~/components/ui/accordion/accordion.vue';
import {
  Accordion,
  AccordionHead,
  AccordionIcon,
  AccordionItem
} from '~/components/ui/accordion';

definePageMeta({
  layout: 'guide'
});

const activeKey = ref([1]);
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Accordion</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• accordion 기본</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonAccordion>
          <CommonAccordionItem key="1" header="아코디언 타이틀">
            내용입니다.
          </CommonAccordionItem>
          <CommonAccordionItem key="2" header="아코디언 타이틀">
            내용입니다2.
          </CommonAccordionItem>
          <CommonAccordionItem key="3" header="아코디언 타이틀">
            내용입니다3.
          </CommonAccordionItem>
        </CommonAccordion>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonAccordion>
          &lt;CommonAccordionItem key="1" header="아코디언 타이틀">
            내용입니다.
          &lt;/CommonAccordionItem>
          &lt;CommonAccordionItem key="2" header="아코디언 타이틀">
            내용입니다2.
          &lt;/CommonAccordionItem>
          &lt;CommonAccordionItem key="3" header="아코디언 타이틀">
            내용입니다3.
          &lt;/CommonAccordionItem>
        &lt;/CommonAccordion>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • accordion <br />
        1. AccordionHead 아코디언 헤더 스타일 옵션 variant="gray"<br />
        2. AccordionIcon 아코디언 펼침 닫기 아이콘
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <Accordion v-model:activeKey="activeKey" variant="gray">
          <template #expandIcon="{ isActive }">
            <AccordionIcon :isActive="isActive" />
          </template>
          <AccordionItem key="1">
            <template #header>
              <AccordionHead title="기본정보">
                <template #right>
                  <div class="form-ess_info pc-only">
                    <i class="red-span">*</i
                    ><span> 표시는 필수 입력 사항입니다. </span>
                  </div>
                </template>
              </AccordionHead>
            </template>
            <div class="common-form__area">
              <p class="form-ess_info mo-only">
                <i class="red-span">*</i
                ><span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  면접상담 상세정보의 성명, 전화번호, 휴대전화번호, 이메일,
                  상담예약시간, 인지경로 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      성명
                      <span class="red-span"
                        >* <span class="sr-only">필수 입력 항목</span></span
                      >
                    </th>
                    <td>
                      <a-form-item
                        name=""
                        label="성명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
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
                          <a-select class="common-select" placeholder="선택">
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
                          <a-input class="text-bx" />
                        </a-form-item>
                        <span class="dash">-</span>
                        <a-form-item
                          name="mobile3"
                          label="일반전화 마지막자리"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      휴대전화번호
                      <span class="red-span"
                        >* <span class="sr-only">필수 입력 항목</span></span
                      >
                    </th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
                            name="mobile"
                            label="휴대전화 식별번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-select class="common-select" placeholder="선택">
                              <a-select-option value="1"
                                >선택 1</a-select-option
                              >
                              <a-select-option value="2"
                                >선택 2</a-select-option
                              >
                            </a-select>
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            name="mobile2"
                            label="휴대전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            name="mobile3"
                            label="휴대전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                        <a-checkbox class="check-bx" value="" name="type"
                          >SMS 수신동의 (예약번호 수신 시
                          필요합니다.)</a-checkbox
                        >
                      </div>
                    </td>
                    <th scope="row">이메일</th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__email">
                          <a-form-item
                            name="email"
                            label="이메일 아이디 입력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">@</span>
                          <a-form-item
                            name="email2"
                            label="이메일 도메인 입력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <a-form-item
                            name="email3"
                            label="이메일 도메인 선택"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-select class="common-select" placeholder="선택">
                              <a-select-option value="1"
                                >선택 1</a-select-option
                              >
                              <a-select-option value="2"
                                >선택 2</a-select-option
                              >
                            </a-select>
                          </a-form-item>
                        </div>
                        <a-checkbox class="check-bx" value="" name="type"
                          >이메일 수신동의</a-checkbox
                        >
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
                      <span class="red-span"
                        >* <span class="sr-only">필수 입력 항목</span></span
                      >
                    </th>
                    <td colspan="3">
                      <div class="form-group-box">
                        <ul class="counsel-bull-sub-list">
                          <li>
                            <span class="num">※</span>
                            귀하는 공단의 법률서비스를 어떻게 아셨나요?
                          </li>
                        </ul>
                        <a-radio-group>
                          <a-radio class="radio-bx" value="">광고</a-radio>
                          <a-radio class="radio-bx" value="">주변지인</a-radio>
                          <a-radio class="radio-bx" value=""
                            >인터넷검색</a-radio
                          >
                          <a-radio class="radio-bx" value="">관공서</a-radio>
                          <a-radio class="radio-bx" value="">사회단체</a-radio>
                          <a-radio class="radio-bx" value="">기타</a-radio>
                        </a-radio-group>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>

          <AccordionItem key="2">
            <template #header>
              <AccordionHead title="상담내용입력">
                <template #right>
                  <div class="form-ess_info pc-only">
                    <i class="red-span">*</i
                    ><span> 표시는 필수 입력 사항입니다. </span>
                  </div>
                </template>
              </AccordionHead>
            </template>
            <div class="common-form__area">
              <p class="form-ess_info mo-only">
                <i class="red-span">*</i
                ><span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  면접상담 상세정보의 내용, 이전상담직원, 예약공석정보
                  입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      인지경로
                      <span class="red-span"
                        >* <span class="sr-only">내용</span></span
                      >
                    </th>
                    <td>
                      <label for="textMessage">
                        <span class="sr-only">textarea</span>
                      </label>
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        placeholder="최대 200자 입력 가능"
                        :maxlength="200"
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
                          <a-input class="text-bx" />
                        </a-form-item>
                        <ul class="counsel-bull-sub-list">
                          <li>
                            <span class="num">※</span>
                            이전 상담직원 입력은 공단 내 업무처리용 정보이며,
                            공단 사정상 예약 시 입력한 이전 상담직원과 상담자가
                            일치하지 않을 수 있음을 양해 부탁드립니다.
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">예약공석정보</th>
                    <td>
                      <div class="form-group-box">
                        <a-checkbox class="check-bx" value="" name="type"
                          >알림수신동의</a-checkbox
                        >
                        <ul class="counsel-bull-sub-list">
                          <li>
                            <span class="num">※</span>
                            알림수신 동의할 경우 예약공석 발생 시 해당정보가
                            알림톡으로 전송되어 간편한 예약변경이 가능합니다.
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;Accordion v-model:activeKey="activeKey" variant="gray">
          &lt;template #expandIcon="{ isActive }">
            &lt;AccordionIcon :isActive="isActive" />
          &lt;/template>
          &lt;AccordionItem key="1">
            &lt;template #header>
              &lt;AccordionHead title="기본정보">
                &lt;template #right>
                  &lt;div class="form-ess_info pc-only">
                    &lt;i class="red-span">*&lt;/i
                    >&lt;span> 표시는 필수 입력 사항입니다. &lt;/span>
                  &lt;/div>
                &lt;/template>
              &lt;/AccordionHead>
            &lt;/template>
            &lt;div class="common-form__area">
              &lt;p class="form-ess_info mo-only">
                &lt;i class="red-span">*&lt;/i
                >&lt;span> 표시는 필수 입력 사항입니다. &lt;/span>
              &lt;/p>
              &lt;table>
                &lt;caption>
                  면접상담 상세정보의 성명, 전화번호, 휴대전화번호, 이메일,
                  상담예약시간, 인지경로 입력에관한 표
                &lt;/caption>
                &lt;tbody>
                  &lt;tr>
                    &lt;th scope="row">
                      성명
                      &lt;span class="red-span"
                      >* &lt;span class="sr-only">필수 입력 항목&lt;/span>&lt;/span
                      >
                    &lt;/th>
                    &lt;td>
                      &lt;a-form-item
                          name=""
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                      >
                        &lt;a-input class="text-bx" />
                      &lt;/a-form-item>
                    &lt;/td>
                    &lt;th scope="row">전화번호&lt;/th>
                    &lt;td>
                      &lt;div class="form-item__number">
                        &lt;a-form-item
                            name="mobile"
                            label="일반전화 지역번호"
                            :labelCol="{ class: 'sr-only' }"
                        >
                          &lt;a-select class="common-select" placeholder="선택">
                            &lt;a-select-option value="1">선택 1&lt;/a-select-option>
                            &lt;a-select-option value="2">선택 2&lt;/a-select-option>
                          &lt;/a-select>
                        &lt;/a-form-item>
                        &lt;span class="dash">-&lt;/span>
                        &lt;a-form-item
                            name="mobile2"
                            label="일반전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                        >
                          &lt;a-input class="text-bx" />
                        &lt;/a-form-item>
                        &lt;span class="dash">-&lt;/span>
                        &lt;a-form-item
                            name="mobile3"
                            label="일반전화 마지막자리"
                            :labelCol="{ class: 'sr-only' }"
                        >
                          &lt;a-input class="text-bx" />
                        &lt;/a-form-item>
                      &lt;/div>
                    &lt;/td>
                  &lt;/tr>
                  &lt;tr>
                    &lt;th scope="row">
                      휴대전화번호
                      &lt;span class="red-span"
                      >* &lt;span class="sr-only">필수 입력 항목&lt;/span>&lt;/span
                      >
                    &lt;/th>
                    &lt;td>
                      &lt;div class="form-group-box">
                        &lt;div class="form-item__number">
                          &lt;a-form-item
                              name="mobile"
                              label="휴대전화 식별번호"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-select class="common-select" placeholder="선택">
                              &lt;a-select-option value="1"
                              >선택 1&lt;/a-select-option
                              >
                              &lt;a-select-option value="2"
                              >선택 2&lt;/a-select-option
                              >
                            &lt;/a-select>
                          &lt;/a-form-item>
                          &lt;span class="dash">-&lt;/span>
                          &lt;a-form-item
                              name="mobile2"
                              label="휴대전화 가운데 자리"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-input class="text-bx" />
                          &lt;/a-form-item>
                          &lt;span class="dash">-&lt;/span>
                          &lt;a-form-item
                              name="mobile3"
                              label="휴대전화 마지막 자리"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-input class="text-bx" />
                          &lt;/a-form-item>
                        &lt;/div>
                        &lt;a-checkbox class="check-bx" value="" name="type"
                        >SMS 수신동의 (예약번호 수신 시
                          필요합니다.)&lt;/a-checkbox
                        >
                      &lt;/div>
                    &lt;/td>
                    &lt;th scope="row">이메일&lt;/th>
                    &lt;td>
                      &lt;div class="form-group-box">
                        &lt;div class="form-item__email">
                          &lt;a-form-item
                              name="email"
                              label="이메일 아이디 입력"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-input class="text-bx" />
                          &lt;/a-form-item>
                          &lt;span class="dash">@&lt;/span>
                          &lt;a-form-item
                              name="email2"
                              label="이메일 도메인 입력"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-input class="text-bx" />
                          &lt;/a-form-item>
                          &lt;a-form-item
                              name="email3"
                              label="이메일 도메인 선택"
                              :labelCol="{ class: 'sr-only' }"
                          >
                            &lt;a-select class="common-select" placeholder="선택">
                              &lt;a-select-option value="1"
                              >선택 1&lt;/a-select-option
                              >
                              &lt;a-select-option value="2"
                              >선택 2&lt;/a-select-option
                              >
                            &lt;/a-select>
                          &lt;/a-form-item>
                        &lt;/div>
                        &lt;a-checkbox class="check-bx" value="" name="type"
                        >이메일 수신동의&lt;/a-checkbox
                        >
                      &lt;/div>
                    &lt;/td>
                  &lt;/tr>
                  &lt;tr>
                    &lt;th scope="row">상담예약시간&lt;/th>
                    &lt;td colspan="3">
                      &lt;span class="is-emphasis">
                        [대한법률구조공단] 인천지부 2025.04.10 11:00
                      &lt;/span>
                    &lt;/td>
                  &lt;/tr>
                  &lt;tr>
                    &lt;th scope="row">
                      인지경로
                      &lt;span class="red-span"
                      >* &lt;span class="sr-only">필수 입력 항목&lt;/span>&lt;/span
                      >
                    &lt;/th>
                    &lt;td colspan="3">
                      &lt;div class="form-group-box">
                        &lt;ul class="counsel-bull-sub-list">
                          &lt;li>
                            &lt;span class="num">※&lt;/span>
                            귀하는 공단의 법률서비스를 어떻게 아셨나요?
                          &lt;/li>
                        &lt;/ul>
                        &lt;a-radio-group>
                          &lt;a-radio class="radio-bx" value="">광고&lt;/a-radio>
                          &lt;a-radio class="radio-bx" value="">주변지인&lt;/a-radio>
                          &lt;a-radio class="radio-bx" value=""
                          >인터넷검색&lt;/a-radio
                          >
                          &lt;a-radio class="radio-bx" value="">관공서&lt;/a-radio>
                          &lt;a-radio class="radio-bx" value="">사회단체&lt;/a-radio>
                          &lt;a-radio class="radio-bx" value="">기타&lt;/a-radio>
                        &lt;/a-radio-group>
                      &lt;/div>
                    &lt;/td>
                  &lt;/tr>
                &lt;/tbody>
              &lt;/table>
            &lt;/div>
          &lt;/AccordionItem>

          &lt;AccordionItem key="2">
            &lt;template #header>
              &lt;AccordionHead title="상담내용입력">
                &lt;template #right>
                  &lt;div class="form-ess_info pc-only">
                    &lt;i class="red-span">*&lt;/i
                    >&lt;span> 표시는 필수 입력 사항입니다. &lt;/span>
                  &lt;/div>
                &lt;/template>
              &lt;/AccordionHead>
            &lt;/template>
            &lt;div class="common-form__area">
              &lt;p class="form-ess_info mo-only">
                &lt;i class="red-span">*&lt;/i
                >&lt;span> 표시는 필수 입력 사항입니다. &lt;/span>
              &lt;/p>
              &lt;table>
                &lt;caption>
                  면접상담 상세정보의 내용, 이전상담직원, 예약공석정보
                  입력에관한 표
                &lt;/caption>
                &lt;tbody>
                  &lt;tr>
                    &lt;th scope="row">
                      인지경로
                      &lt;span class="red-span"
                      >* &lt;span class="sr-only">내용&lt;/span>&lt;/span
                      >
                    &lt;/th>
                    &lt;td>
                      &lt;label for="textMessage">
                        &lt;span class="sr-only">textarea&lt;/span>
                      &lt;/label>
                      &lt;a-textarea
                          class="textarea-bx"
                          id="textMessage"
                          placeholder="최대 200자 입력 가능"
                          :maxlength="200"
                      />
                    &lt;/td>
                  &lt;/tr>
                  &lt;tr>
                    &lt;th scope="row">이전상담직원&lt;/th>
                    &lt;td>
                      &lt;div class="form-group-box">
                        &lt;a-form-item
                            name=""
                            label="이전상담직원"
                            :labelCol="{ class: 'sr-only' }"
                        >
                          &lt;a-input class="text-bx" />
                        &lt;/a-form-item>
                        &lt;ul class="counsel-bull-sub-list">
                          &lt;li>
                            &lt;span class="num">※&lt;/span>
                            이전 상담직원 입력은 공단 내 업무처리용 정보이며,
                            공단 사정상 예약 시 입력한 이전 상담직원과 상담자가
                            일치하지 않을 수 있음을 양해 부탁드립니다.
                          &lt;/li>
                        &lt;/ul>
                      &lt;/div>
                    &lt;/td>
                  &lt;/tr>
                  &lt;tr>
                    &lt;th scope="row">예약공석정보&lt;/th>
                    &lt;td>
                      &lt;div class="form-group-box">
                        &lt;a-checkbox class="check-bx" value="" name="type"
                        >알림수신동의&lt;/a-checkbox
                        >
                        &lt;ul class="counsel-bull-sub-list">
                          &lt;li>
                            &lt;span class="num">※&lt;/span>
                            알림수신 동의할 경우 예약공석 발생 시 해당정보가
                            알림톡으로 전송되어 간편한 예약변경이 가능합니다.
                          &lt;/li>
                        &lt;/ul>
                      &lt;/div>
                    &lt;/td>
                  &lt;/tr>
                &lt;/tbody>
              &lt;/table>
            &lt;/div>
          &lt;/AccordionItem>
        &lt;/Accordion>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
