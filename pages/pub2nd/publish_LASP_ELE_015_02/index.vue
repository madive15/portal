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
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
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
          breadcrumbTitle="전자접수 신청"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한가정법률복지상담원 전자접수 신청
        </CommonTitle>

        <Accordion v-model:activeKey="activeKey" variant="gray">
          <template #expandIcon="{ isActive }">
            <AccordionIcon :isActive="isActive" />
          </template>
          <AccordionItem key="1">
            <template #header>
              <AccordionHead title="신청인 정보">
                <template #right>
                  <div class="form-ess_info pc-only">
                    <i class="red-span">*</i
                    ><span> 표시는 필수 입력 사항입니다. </span>
                  </div>
                </template>
              </AccordionHead>
            </template>
            <div class="common-form__area colgroup">
              <p class="form-ess_info mo-only">
                <i class="red-span">*</i>
                <span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  전자접수 신청 신청인 정보의 성명, 성별, 주소, 실거주지,
                  연락처, 이메일, 연령, 종교, 학력, 경력, 직업, 재산, 생활방법,
                  월수입, 내담자와 상대자와의 관례, 신청분야 입력에관한 표
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
                        <a-radio class="radio-bx" value="">남</a-radio>
                        <a-radio class="radio-bx" value="">여</a-radio>
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
                      <div class="form-item__addr">
                        <div class="item-column">
                          <a-form-item
                            name="addr"
                            label="주소"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <button type="button" class="btn-basic primary">
                            <span class="text">우편번호 찾기</span>
                          </button>
                        </div>
                        <a-form-item
                          name="addr2"
                          label="주소상세2"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>

                        <a-form-item
                          name="addr3"
                          label="주소상세3"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">실거주지</th>
                    <td colspan="3">
                      <div class="form-item__addr">
                        <div class="item-column">
                          <a-form-item
                            name="addr"
                            label="실거주지"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <button type="button" class="btn-basic primary">
                            <span class="text">우편번호 찾기</span>
                          </button>
                        </div>
                        <a-form-item
                          name="addr2"
                          label="실거주지상세2"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>

                        <a-form-item
                          name="addr3"
                          label="실거주지상세3"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>
                      </div>
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
                      <div class="form-item__number">
                        <a-form-item
                          name="mobile"
                          label="연락처 식별번호"
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
                          label="연락처 가운데 자리"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
                        <span class="dash">-</span>
                        <a-form-item
                          name="mobile3"
                          label="연락처 마지막 자리"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
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
                            <a-select-option value="1">선택 1</a-select-option>
                            <a-select-option value="2">선택 2</a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">연령</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="연령"
                            :labelCol="{ class: 'sr-only' }"
                            class="!w-200px lg:!w-300px"
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
                    <th scope="row">학력</th>
                    <td>
                      <a-form-item
                        name=""
                        label="학력"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">경력</th>
                    <td>
                      <a-form-item
                        name=""
                        label="경력"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">직업</th>
                    <td>
                      <a-form-item
                        name=""
                        label="직업"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">재산</th>
                    <td>
                      <a-form-item
                        name=""
                        label="재산"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">생활방법</th>
                    <td>
                      <a-form-item
                        name=""
                        label="생활방법"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">월수입</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="월수입"
                            :labelCol="{ class: 'sr-only' }"
                            class="!w-200px lg:!w-300px"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      내담자와<br class="pc-only" />상대자와의 관례
                    </th>
                    <td>
                      <a-form-item
                        name=""
                        label="내담자와
              상대자와의 관례"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">신청분야</th>
                    <td>
                      <a-form-item
                        name=""
                        label="신청분야"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="2">
            <template #header>
              <AccordionHead title="피신청인 정보">
                <template #right>
                  <div class="form-ess_info pc-only">
                    <i class="red-span">*</i
                    ><span> 표시는 필수 입력 사항입니다. </span>
                  </div>
                </template>
              </AccordionHead>
            </template>
            <div class="common-form__area colgroup">
              <p class="form-ess_info mo-only">
                <i class="red-span">*</i>
                <span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  전자접수 신청 피신청인 정보의 성명, 성별, 주소, 실거주지,
                  연락처, 이메일, 연령, 종교, 학력, 경력, 직업, 재산, 생활방법,
                  월수입 입력에관한 표
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
                        <a-radio class="radio-bx" value="">남</a-radio>
                        <a-radio class="radio-bx" value="">여</a-radio>
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
                      <div class="form-item__addr">
                        <div class="item-column">
                          <a-form-item
                            name="addr"
                            label="주소"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <button type="button" class="btn-basic primary">
                            <span class="text">우편번호 찾기</span>
                          </button>
                        </div>
                        <a-form-item
                          name="addr2"
                          label="주소상세2"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>

                        <a-form-item
                          name="addr3"
                          label="주소상세3"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">실거주지</th>
                    <td colspan="3">
                      <div class="form-item__addr">
                        <div class="item-column">
                          <a-form-item
                            name="addr"
                            label="실거주지"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <button type="button" class="btn-basic primary">
                            <span class="text">우편번호 찾기</span>
                          </button>
                        </div>
                        <a-form-item
                          name="addr2"
                          label="실거주지상세2"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>

                        <a-form-item
                          name="addr3"
                          label="실거주지상세3"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx full" />
                        </a-form-item>
                      </div>
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
                      <div class="form-item__number">
                        <a-form-item
                          name="mobile"
                          label="연락처 식별번호"
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
                          label="연락처 가운데 자리"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
                        <span class="dash">-</span>
                        <a-form-item
                          name="mobile3"
                          label="연락처 마지막 자리"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
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
                            <a-select-option value="1">선택 1</a-select-option>
                            <a-select-option value="2">선택 2</a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">연령</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="연령"
                            :labelCol="{ class: 'sr-only' }"
                            class="!w-200px lg:!w-300px"
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
                    <th scope="row">학력</th>
                    <td>
                      <a-form-item
                        name=""
                        label="학력"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">경력</th>
                    <td>
                      <a-form-item
                        name=""
                        label="경력"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">직업</th>
                    <td>
                      <a-form-item
                        name=""
                        label="직업"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">재산</th>
                    <td>
                      <a-form-item
                        name=""
                        label="재산"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">생활방법</th>
                    <td>
                      <a-form-item
                        name=""
                        label="생활방법"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">월수입</th>
                    <td>
                      <div class="txt-form-box">
                        <div class="txt-form">
                          <a-form-item
                            name=""
                            label="월수입"
                            :labelCol="{ class: 'sr-only' }"
                            class="!w-200px lg:!w-300px"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="txt">원</span>
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
              <AccordionHead title="화해조정 신청 내용" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  전자접수 신청 화해조정 신청 내용의 내용 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">내용</th>
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
            <div class="select-result-box mt-20px">
              <div class="check-tit-box">
                <span class="ico-check-info"></span>
                <strong
                  >신청인은 대한가정법률복지상담원의 화해조정 서비스를 이용하기
                  위해<br />
                  대면상담이 필수적임을 안내 받았으며, 이에 동의합니다.
                </strong>
              </div>
              <a-radio-group>
                <a-radio class="radio-bx" value="예">예</a-radio>
                <a-radio class="radio-bx" value="아니요"
                  >아니요(‘아니오’로 응답한 경우 조정화해 신청불가)
                </a-radio>
              </a-radio-group>
            </div>
          </AccordionItem>

          <!--
          <AccordionItem key="3">
            <template #header>
              <AccordionHead title="혼인관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  전자접수 신청 혼인관계의 혼인방법, 혼인연령, 혼인기간,
                  별거기간, 혼인신고, 혼인형태 입력에관한 표
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
          <AccordionItem key="4">
            <template #header>
              <AccordionHead title="자녀관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  전자접수 신청 자녀관계의 자녀, 기타소생, 내담자 전혼소생,
                  상대자 전혼소생 입력에관한 표
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
          <AccordionItem key="5">
            <template #header>
              <AccordionHead title="가족관계" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  전자접수 신청 가족관계의 내담자, 상대자, 내담자 부모, 상대자
                  부모, 기타동거인 입력에관한 표
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
          -->
          <AccordionItem key="6">
            <template #header>
              <AccordionHead title="입증자료제출" />
            </template>

            <div class="receipt-form-info">
              <div class="tit">법률구조대상자[가정폭력피해여성] 증빙서류</div>
              <div class="info-box">
                <div class="info-top">
                  법률구조대상자 입증을 위해 아래와 같은 증빙서류 제출이
                  필요합니다.
                </div>
                <ul class="info-list">
                  <li>
                    <span class="num">1.</span>「국민기초생활 보장법
                    시행규칙」제38조제4항에 따른 차상위계층 확인서
                  </li>
                  <li>
                    <span class="num">2.</span>특정 급여자격 확인서 입증자료
                  </li>
                </ul>
              </div>
            </div>

            <div class="receipt-submit-box">
              <div class="receipt-submit-item">
                <div class="submit-module">
                  <!--module-->
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                        <div class="guide-txt">
                          <span class="num">※</span>전자접수 신청 사건의
                          구비서류를 전자증명서로 편리하게 제출할 수 있습니다.
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn is-active">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input is-active">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn is-active">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">
                    <span class="flag">선택</span>
                    추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.
                  </div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                        <div class="guide-txt">
                          <span class="num">※</span>전자접수 신청 사건의
                          구비서류를 전자증명서로 편리하게 제출할 수 있습니다.
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn is-active">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input is-active">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn is-active">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--//module-->
                </div>
              </div>
            </div>

            <div class="receipt-form-info">
              <div class="tit">
                <div>
                  기준중위소득 소득요건 입증자료
                  <span class="sub"
                    >소득제한 125% 또는 150% 대상자의 추가제출 서류</span
                  >
                </div>
              </div>
              <div class="info-box">
                <div class="info-top">
                  기준중위소득 소득요건 입증을 위하여 증빙서류 제출이
                  필요합니다.
                  <br class="pc-only" />
                  건강보험가입자 유형에 따라 제출가능 한 서류를 택1하여
                  등록해주세요.
                </div>
              </div>
            </div>

            <div class="receipt-submit-box">
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험직장가입자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn is-active">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험지역가입자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험피부양자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">[건강보험미가입자]</div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <!--//module-->
                </div>
              </div>
            </div>

            <div class="receipt-form-info">
              <div class="tit">
                사건관련 제출[이혼(가정폭력피해여성)] 필요서류
              </div>
              <div class="info-box">
                <div class="info-top">
                  전자접수 신청사건 관련하여 아래와 같은 서류 제출이 필요합니다.
                </div>
                <ul class="info-list">
                  <li><span class="num">1.</span>주민등록등본(필수)</li>
                  <li>
                    <span class="num">2.</span>사업자등록증(상대방이 상인인
                    경우)(선택)
                  </li>
                  <li>
                    <span class="num">3.</span>물품인수증이나 거래장부(선택)
                  </li>
                  <li>
                    <span class="num">4.</span>법인등기사항증명서(상대방이
                    법인인 경우)(선택)
                  </li>
                  <li><span class="num">5.</span>매매계약서(선택)</li>
                  <li><span class="num">6.</span>기타(선택)</li>
                </ul>
              </div>
            </div>

            <div class="receipt-submit-box">
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">
                    <span class="flag filled">필수</span>
                    <strong>주민등록등본</strong>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn is-active">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--//module-->
                </div>
              </div>
              <div class="receipt-submit-item">
                <div class="submit-top">
                  <div class="top-txt">
                    <span class="flag">선택</span>
                    추가버튼을 클릭하여 제출 가능한 서류를 등록하세요.
                  </div>
                  <div class="top-btns">
                    <button type="button" class="btn add">행추가</button>
                    <button type="button" class="btn del">행삭제</button>
                  </div>
                </div>
                <div class="submit-module">
                  <!--module-->
                  <div class="module-unit">
                    <div class="module-in">
                      <div class="select-forms">
                        <div class="forms-in">
                          <a-form-item
                            name=""
                            label=""
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
                          <a-form-item
                            name=""
                            label=""
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" placeholder="첨부파일" />
                          </a-form-item>
                        </div>
                        <div class="guide-txt">
                          <span class="num">※</span>전자접수 신청 사건의
                          구비서류를 전자증명서로 편리하게 제출할 수 있습니다.
                        </div>
                      </div>
                      <div class="select-btns">
                        <button type="button" class="btn is-active">
                          <span class="txt">전자증명</span>
                        </button>
                        <div class="btn file-input">
                          <AllyFileButton class="txt">
                            <template #input>
                              <label for="fileInput"
                                ><span class="sr-only">파일첨부</span></label
                              >
                              <input
                                type="file"
                                id="fileInput"
                                class="sr-only"
                                aria-hidden="true"
                                tabindex="-1"
                              />
                            </template>
                          </AllyFileButton>
                        </div>
                        <button type="button" class="btn">
                          <span class="txt">나의서류</span>
                        </button>
                      </div>
                      <div class="del-btn">
                        <button type="button" class="btn">
                          <span class="txt">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--//module-->
                </div>
              </div>
            </div>

            <div class="select-result-box">
              <div class="check-tit-box">
                <span class="ico-check-info"></span>
                <strong>입증자료를 입력 완료 하시겠습니까?</strong>
              </div>
              <a-radio-group>
                <a-radio class="radio-bx" value="예">예</a-radio>
                <a-radio class="radio-bx" value="아니요">아니요</a-radio>
              </a-radio-group>
            </div>
          </AccordionItem>
        </Accordion>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="line-primary" width="lg">
            임시저장
          </CommonButton>
          <CommonButton variants="primary" width="lg">
            전자접수 신청완료
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
