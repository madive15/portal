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
          breadcrumbTitle="면접상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한법률구조공단 면접상담 상세정보
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
                        <BullList type="refMark">
                          <li>귀하는 공단의 법률서비스를 어떻게 아셨나요?</li>
                        </BullList>
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
                        <BullList type="refMark">
                          <li>
                            이전 상담직원 입력은 공단 내 업무처리용 정보이며,
                            공단 사정상 예약 시 입력한 이전 상담직원과 상담자가
                            일치하지 않을 수 있음을 양해 부탁드립니다.
                          </li>
                        </BullList>
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
          </AccordionItem>
        </Accordion>
        <div class="form-bottom-box">
          <a-checkbox class="check-bx" value="" name="type"
            >전자사보 수신동의
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
