<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
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
        <h4 class="title-heading-1">대한법률구조공단 법률구조 신청</h4>

        <Accordion v-model:activeKey="activeKey" variant="gray">
          <template #expandIcon="{ isActive }">
            <AccordionIcon :isActive="isActive" />
          </template>
          <AccordionItem key="1">
            <template #header>
              <AccordionHead title="의뢰자 정보">
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
                  전자접수 신청 의뢰자 정보의 성명, 생년월일, 주소, 연락처,
                  이메일, 송달장소, 연락처, 직업(대상자), 알림동의 입력에관한 표
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
                      생년월일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        name=""
                        label="생년월일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
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
                    <th scope="row">
                      이메일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
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
                    <th scope="row">
                      송달장소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        name=""
                        label="송달장소"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">연락처</th>
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
                  </tr>
                  <tr>
                    <th scope="row">직업(대상자)</th>
                    <td colspan="3">
                      <a-form-item
                        name=""
                        label="직업"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">알림동의</th>
                    <td colspan="3">
                      <a-checkbox-group>
                        <a-checkbox class="check-bx" value="1" name="type">
                          문자메시지 수신동의
                        </a-checkbox>
                        <a-checkbox class="check-bx" value="2" name="type">
                          전자우편 수신동의
                        </a-checkbox>
                      </a-checkbox-group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="2">
            <template #header>
              <AccordionHead title="상대방 정보">
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
                  전자접수 신청 상대방 정보의 성명, 생년월일, 주소, 연락처,
                  이메일, 송달장소, 연락처 입력에관한 표
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
                    <th scope="row">생년월일</th>
                    <td>
                      <a-form-item
                        name=""
                        label="생년월일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">주소</th>
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
                    <th scope="row">연락처</th>
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
                    <th scope="row">송달장소</th>
                    <td>
                      <a-form-item
                        name=""
                        label="송달장소"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">연락처</th>
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
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="3">
            <template #header>
              <AccordionHead title="신청사실의 요지" />
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  전자접수 신청사실의 요지의 사건명, 구조신청금액, 신청사실의
                  요지 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">사건명</th>
                    <td>
                      <a-form-item
                        name=""
                        label="사건명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">구조신청금액</th>
                    <td>
                      <a-form-item
                        name=""
                        label="구조신청금액"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">신청사실의 요지</th>
                    <td colspan="3">
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
          <AccordionItem key="4">
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
