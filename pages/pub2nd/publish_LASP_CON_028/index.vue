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
        <h4 class="title-heading-1">법률홈닥터 면접상담 상세정보</h4>
        <CommonTitle tag="h4" size="1">
          법률홈닥터 면접상담 상세정보
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
                  면접상담 기본정보의 성명, 휴대전화번호, 상담예약시간, 신청경위
                  입력에관한 표
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
                  </tr>
                  <tr>
                    <th scope="row">상담예약시간</th>
                    <td>
                      <span class="is-emphasis">
                        [대한법률구조공단] 인천지부 2025.04.10 11:00
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      신청경위
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-checkbox-group>
                        <a-checkbox class="check-bx" value="1" name="type"
                          >주변권유</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="2" name="type"
                          >타기관의뢰</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="3" name="type"
                          >홍보물</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="4" name="type"
                          >인터넷</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="5" name="type"
                          >기타</a-checkbox
                        >
                      </a-checkbox-group>
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
                  면접상담 상담내용입력의 상담대상, 대상자유형, 상담 유형
                  (기본선택), 상담 유형 (추가선택), 제목, 내용 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      상담대상
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-checkbox-group>
                        <a-checkbox class="check-bx" value="1" name="type"
                          >본인</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="2" name="type"
                          >가족</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="3" name="type"
                          >지인</a-checkbox
                        >
                        <a-checkbox class="check-bx" value="4" name="type"
                          >기타</a-checkbox
                        >
                      </a-checkbox-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      대상자유형
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-checkbox-group>
                        <a-checkbox class="check-bx" value="1" name="type">
                          결혼이주여성
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="2" name="type">
                          기초생활수급자
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="3" name="type">
                          독거노인
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="4" name="type">
                          독립유공자후손
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="5" name="type">
                          범죄피해자
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="6" name="type">
                          북한이탈주민
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="7" name="type">
                          장애인
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="8" name="type">
                          한부모가정
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="9" name="type">
                          기타
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="10" name="type">
                          차상위계층
                        </a-checkbox>
                      </a-checkbox-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      상담 유형 (기본선택)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-radio-group>
                        <div class="radio-group-box">
                          <a-radio class="radio-bx" value="">민사 : </a-radio>
                          <a-checkbox-group>
                            <a-checkbox class="check-bx" value="1" name="type">
                              근로관계
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="2" name="type">
                              대여금
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="3" name="type">
                              손해배상
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="4" name="type">
                              임대차
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="5" name="type">
                              회생⋅파산
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="6" name="type">
                              기타
                            </a-checkbox>
                          </a-checkbox-group>
                        </div>
                        <div class="radio-group-box">
                          <a-radio class="radio-bx" value="">가사 : </a-radio>
                          <a-checkbox-group>
                            <a-checkbox class="check-bx" value="1" name="type">
                              가족관계
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="2" name="type">
                              양육비
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="3" name="type">
                              유언⋅상속
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="4" name="type">
                              이혼
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="5" name="type">
                              자녀친권
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="6" name="type">
                              기타
                            </a-checkbox>
                          </a-checkbox-group>
                        </div>
                        <div class="radio-group-box">
                          <a-radio class="radio-bx" value="">형사 : </a-radio>
                          <a-checkbox-group>
                            <a-checkbox class="check-bx" value="1" name="type">
                              가정폭력
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="2" name="type">
                              성폭력
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="3" name="type">
                              학교폭력
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="6" name="type">
                              기타
                            </a-checkbox>
                          </a-checkbox-group>
                        </div>
                        <div class="radio-group-box">
                          <a-radio class="radio-bx" value="">행정 : </a-radio>
                          <a-checkbox-group>
                            <a-checkbox class="check-bx" value="1" name="type">
                              건축물
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="2" name="type">
                              귀화,체류,출입국 등
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="3" name="type">
                              기초수급
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="4" name="type">
                              요양급여
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="6" name="type">
                              기타
                            </a-checkbox>
                          </a-checkbox-group>
                        </div>
                        <div class="radio-group-box">
                          <a-radio class="radio-bx" value="">기타 : </a-radio>
                          <a-checkbox-group>
                            <a-checkbox class="check-bx" value="1" name="type">
                              개인정보보호법
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="2" name="type">
                              인권침해
                            </a-checkbox>
                            <a-checkbox class="check-bx" value="6" name="type">
                              기타
                            </a-checkbox>
                          </a-checkbox-group>
                        </div>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      상담 유형 (추가선택)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="selct-form-box">
                        <a-select
                          id=""
                          class="common-select"
                          placeholder="선택"
                        >
                          <a-select-option value="1">상담 유형</a-select-option>
                          <a-select-option value="2"
                            >상담 유형2</a-select-option
                          >
                        </a-select>
                        <a-select
                          id=""
                          class="common-select"
                          placeholder="선택"
                        >
                          <a-select-option value="1">상담 유형</a-select-option>
                          <a-select-option value="2"
                            >상담 유형2</a-select-option
                          >
                        </a-select>
                      </div>
                    </td>
                  </tr>
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
