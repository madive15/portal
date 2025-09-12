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
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';

definePageMeta({
  layout: 'pub2nd'
});

const activeKey = ref([1]);
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          :breadcrumbTitle="`면접상담`"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한가정법률복지상담원 면접상담 상세정보
        </CommonTitle>
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
                  면접상담 기본정보의 성명, 휴대전화번호, 이메일, 성별, 연령,
                  상담예약시간, 내담자와 상대자와의 관계, 상담원 알게 된 경로,
                  부부캠프 참가 의향, 참가시기 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      성명
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="성명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
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
                    <th scope="row">
                      성별
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">남성</a-radio>
                        <a-radio class="radio-bx" value="">여성</a-radio>
                      </a-radio-group>
                    </td>
                    <th scope="row">
                      연령
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="연령"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">세</span>
                        </div>
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
                    <th scope="row">내담자와 상대자와의 관계</th>
                    <td>
                      <a-form-item
                        name=""
                        label="내담자와 상대자와의 관계"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">상담원 알게 된 경로</th>
                    <td>
                      <a-form-item
                        name=""
                        label="상담원 알게 된 경로"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">부부캠프 참가 의향</th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">있음</a-radio>
                        <a-radio class="radio-bx" value="">보통</a-radio>
                        <a-radio class="radio-bx" value="">없음</a-radio>
                      </a-radio-group>
                    </td>
                    <th scope="row">참가시기</th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">1분기</a-radio>
                        <a-radio class="radio-bx" value="">2분기</a-radio>
                        <a-radio class="radio-bx" value="">3분기</a-radio>
                        <a-radio class="radio-bx" value="">4분기</a-radio>
                      </a-radio-group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="2">
            <template #header>
              <AccordionHead title="내담자 정보">
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
                  면접상담 내담자 정보의 성명, 성별, 주소, 실거주지, 연령, 종교,
                  학력, 직업, 추가정보 입력에관한 표
                </caption>
                <tbody>
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
                        label="성명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">
                      성별
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">남성</a-radio>
                        <a-radio class="radio-bx" value="">여성</a-radio>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="주소"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">실거주지</th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="실거주지"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      연령
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="연령"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">세</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">종교</th>
                    <td>
                      <a-form-item
                        name=""
                        label="종교"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      학력
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">미상</a-select-option>
                        <a-select-option value="2">무학</a-select-option>
                        <a-select-option value="3">초재</a-select-option>
                        <a-select-option value="4">초중퇴</a-select-option>
                        <a-select-option value="5">초졸</a-select-option>
                        <a-select-option value="6">중재</a-select-option>
                        <a-select-option value="7">중중퇴</a-select-option>
                        <a-select-option value="8">중졸</a-select-option>
                        <a-select-option value="9">고재</a-select-option>
                        <a-select-option value="10">고중퇴</a-select-option>
                        <a-select-option value="11">고졸</a-select-option>
                        <a-select-option value="12">대재</a-select-option>
                        <a-select-option value="13">대중퇴</a-select-option>
                        <a-select-option value="14">전문대졸</a-select-option>
                        <a-select-option value="15">대졸</a-select-option>
                        <a-select-option value="16">대학원재</a-select-option>
                        <a-select-option value="17">대학원졸</a-select-option>
                      </a-select>
                    </td>
                    <th scope="row">
                      직업
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">미상</a-select-option>
                        <a-select-option value="2">주부</a-select-option>
                        <a-select-option value="3">회사원</a-select-option>
                        <a-select-option value="4">단순노무</a-select-option>
                        <a-select-option value="5">자영업</a-select-option>
                        <a-select-option value="6">공무원</a-select-option>
                        <a-select-option value="7">경찰</a-select-option>
                        <a-select-option value="8">군인</a-select-option>
                        <a-select-option value="9">교육직</a-select-option>
                        <a-select-option value="10">전문직</a-select-option>
                        <a-select-option value="11">운전</a-select-option>
                        <a-select-option value="12">세일즈</a-select-option>
                        <a-select-option value="13">학생</a-select-option>
                        <a-select-option value="14">간호사</a-select-option>
                        <a-select-option value="15">약사</a-select-option>
                        <a-select-option value="16">의사</a-select-option>
                        <a-select-option value="17">한의사</a-select-option>
                        <a-select-option value="18">기타</a-select-option>
                        <a-select-option value="19">농수산임목</a-select-option>
                        <a-select-option value="20">예술인</a-select-option>
                        <a-select-option value="21">법조인</a-select-option>
                        <a-select-option value="22">무직</a-select-option>
                        <a-select-option value="23">기술직</a-select-option>
                      </a-select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">추가정보</th>
                    <td colspan="3">
                      <div class="txt-form-box lines">
                        <div class="txt-form">
                          <span class="pre-txt">직업경력</span>
                          <a-form-item
                            name=""
                            label="직업경력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">년(개월)</span>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">재산</span>
                          <a-form-item
                            name=""
                            label="재산"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">생활방법</span>
                          <a-form-item
                            name=""
                            label="생활방법"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">월수입</span>
                          <a-form-item
                            name=""
                            label="월수입"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">만원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="3">
            <template #header>
              <AccordionHead title="상대자 정보">
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
                  면접상담 내담자 정보의 성명, 성별, 주소, 실거주지, 연령, 종교,
                  학력, 직업, 추가정보 입력에관한 표
                </caption>
                <tbody>
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
                        label="성명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">
                      성별
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">남성</a-radio>
                        <a-radio class="radio-bx" value="">여성</a-radio>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="주소"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">실거주지</th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="실거주지"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      연령
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="연령"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">세</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">종교</th>
                    <td>
                      <a-form-item
                        name=""
                        label="종교"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      학력
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">미상</a-select-option>
                        <a-select-option value="2">무학</a-select-option>
                        <a-select-option value="3">초재</a-select-option>
                        <a-select-option value="4">초중퇴</a-select-option>
                        <a-select-option value="5">초졸</a-select-option>
                        <a-select-option value="6">중재</a-select-option>
                        <a-select-option value="7">중중퇴</a-select-option>
                        <a-select-option value="8">중졸</a-select-option>
                        <a-select-option value="9">고재</a-select-option>
                        <a-select-option value="10">고중퇴</a-select-option>
                        <a-select-option value="11">고졸</a-select-option>
                        <a-select-option value="12">대재</a-select-option>
                        <a-select-option value="13">대중퇴</a-select-option>
                        <a-select-option value="14">전문대졸</a-select-option>
                        <a-select-option value="15">대졸</a-select-option>
                        <a-select-option value="16">대학원재</a-select-option>
                        <a-select-option value="17">대학원졸</a-select-option>
                      </a-select>
                    </td>
                    <th scope="row">
                      직업
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">미상</a-select-option>
                        <a-select-option value="2">주부</a-select-option>
                        <a-select-option value="3">회사원</a-select-option>
                        <a-select-option value="4">단순노무</a-select-option>
                        <a-select-option value="5">자영업</a-select-option>
                        <a-select-option value="6">공무원</a-select-option>
                        <a-select-option value="7">경찰</a-select-option>
                        <a-select-option value="8">군인</a-select-option>
                        <a-select-option value="9">교육직</a-select-option>
                        <a-select-option value="10">전문직</a-select-option>
                        <a-select-option value="11">운전</a-select-option>
                        <a-select-option value="12">세일즈</a-select-option>
                        <a-select-option value="13">학생</a-select-option>
                        <a-select-option value="14">간호사</a-select-option>
                        <a-select-option value="15">약사</a-select-option>
                        <a-select-option value="16">의사</a-select-option>
                        <a-select-option value="17">한의사</a-select-option>
                        <a-select-option value="18">기타</a-select-option>
                        <a-select-option value="19">농수산임목</a-select-option>
                        <a-select-option value="20">예술인</a-select-option>
                        <a-select-option value="21">법조인</a-select-option>
                        <a-select-option value="22">무직</a-select-option>
                        <a-select-option value="23">기술직</a-select-option>
                      </a-select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">추가정보</th>
                    <td colspan="3">
                      <div class="txt-form-box lines">
                        <div class="txt-form">
                          <span class="pre-txt">직업경력</span>
                          <a-form-item
                            name=""
                            label="직업경력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">년(개월)</span>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">재산</span>
                          <a-form-item
                            name=""
                            label="재산"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">생활방법</span>
                          <a-form-item
                            name=""
                            label="생활방법"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">월수입</span>
                          <a-form-item
                            name=""
                            label="월수입"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">만원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="4">
            <template #header>
              <AccordionHead title="혼인관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  면접상담 혼인관계의 혼인방법, 혼인연령, 혼인기간, 별거기간,
                  혼인신고, 혼인형태 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">혼인방법</th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">연예</a-select-option>
                        <a-select-option value="2">중매</a-select-option>
                        <a-select-option value="2">절충</a-select-option>
                        <a-select-option value="2">강제</a-select-option>
                        <a-select-option value="2">기타</a-select-option>
                      </a-select>
                    </td>
                    <th scope="row">혼인연령</th>
                    <td>
                      <div class="txt-form-box lines">
                        <div class="txt-form">
                          <span class="pre-txt">남</span>
                          <a-form-item
                            name=""
                            label="남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">세</span>
                        </div>
                        <div class="txt-line" aria-hidden="true">/</div>
                        <div class="txt-form">
                          <span class="pre-txt">여</span>
                          <a-form-item
                            name=""
                            label="여"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">세</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">혼인기간</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="혼인기간-년"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">년</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="혼인기간-개월"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">개월</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="혼인기간-일"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">일</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">별거기간</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="별거기간-년"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">년</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="별거기간-개월"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">개월</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="별거기간-일"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">일</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">혼인신고</th>
                    <td>
                      <a-radio-group>
                        <a-radio class="radio-bx" value="">유</a-radio>
                        <a-radio class="radio-bx" value="">무</a-radio>
                      </a-radio-group>
                    </td>
                    <th scope="row">혼인형태</th>
                    <td>
                      <a-select id="" class="common-select" placeholder="선택">
                        <a-select-option value="1">미혼</a-select-option>
                        <a-select-option value="2">초혼</a-select-option>
                        <a-select-option value="2">기혼</a-select-option>
                        <a-select-option value="2">재혼</a-select-option>
                        <a-select-option value="2">미망인</a-select-option>
                        <a-select-option value="2">상처</a-select-option>
                        <a-select-option value="2">재혼</a-select-option>
                      </a-select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="5">
            <template #header>
              <AccordionHead title="자녀관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  면접상담 자녀관계의 자녀, 기타소생, 내담자 전혼소생, 상대자
                  전혼소생 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">자녀</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="자녀-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="자녀-살"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">살</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="자녀-녀"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="자녀-살"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">살</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">기타소생</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="기타소생-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="기타소생-녀"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내담자 전혼소생</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="내담자 전혼소생-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="내담자 전혼소생-녀"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">상대자 전혼소생</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="상대자 전혼소생-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="상대자 전혼소생-녀"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="6">
            <template #header>
              <AccordionHead title="가족관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  면접상담 가족관계의 내담자, 상대자, 내담자 부모, 상대자 부모,
                  기타동거인 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">내담자</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="내담자-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="내담자-녀중"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀중</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="내담자-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">(남)</span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">상대자</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="상대자-남"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">남</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="상대자-녀중"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">녀중</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="상대자-녀"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">(녀)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내담자 부모</th>
                    <td colspan="3">
                      <div class="inline-form-box">
                        <div class="inline-form-item">
                          동거 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                        <div class="inline-form-item">
                          별거 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                        <div class="inline-form-item">
                          사망 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">상대자 부모</th>
                    <td colspan="3">
                      <div class="inline-form-box">
                        <div class="inline-form-item">
                          동거 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                        <div class="inline-form-item">
                          별거 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                        <div class="inline-form-item">
                          사망 (
                          <div class="txt-form-box lines">
                            <div class="txt-form">
                              <span class="pre-txt">부</span>
                              <a-form-item
                                name=""
                                label="부"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                            <div class="txt-line" aria-hidden="true">/</div>
                            <div class="txt-form">
                              <span class="pre-txt">모</span>
                              <a-form-item
                                name=""
                                label="모"
                                :labelCol="{ class: 'sr-only' }"
                              >
                                <a-input class="text-bx" />
                              </a-form-item>
                              <span class="txt">년</span>
                            </div>
                          </div>
                          )
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">기타동거인</th>
                    <td colspan="3">
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="기타동거인-와"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">와</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="기타동거인-년"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">년</span>
                        </div>
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="기타동거인-개월"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">개월</span>
                        </div>
                        <div class="txt-form">
                          <span class="txt">동거</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="7">
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
                  면접상담 상담내용입력의 제목, 내용 입력에관한 표
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
                        name=""
                        label="제목"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
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
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        placeholder="최대 200자 입력 가능"
                        :maxlength="200"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
        </Accordion>

        <div class="form-bottom-box">
          <BullList type="refMark">
            <li class="blue">본인 예약이 원칙입니다.</li>
            <li class="blue">
              SMS수신동의, 메일 수신동의를 하지 않을 경우 예약확인을 위한
              예약번호를 받을 수 없어 예약 변경, 취소가 어려우니 반드시 1개 이상
              수신동의 하여주시기 바랍니다.
            </li>
            <li class="blue">
              휴대전화번호가 변경된 경우에는 상담원 대표전화 (02-3675-0142,
              0143) 로 문의하여 변경하여 주시기 바랍니다.
            </li>
          </BullList>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">신청하기</CommonButton>
          <CommonButton variants="line-primary" width="xs">
            취소하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
