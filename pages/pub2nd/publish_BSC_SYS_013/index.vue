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
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';

definePageMeta({
  layout: 'pub2nd'
});

const activeKey = ref([1, 2, 3, 4]);
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '이첩등록', to: '/test1' }]"
          breadcrumbTitle="이첩등록"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <Accordion v-model:activeKey="activeKey" variant="gray">
          <template #expandIcon="{ isActive }">
            <AccordionIcon :isActive="isActive" />
          </template>
          <AccordionItem key="1">
            <template #header>
              <AccordionHead title="사건및 담당자 정보">
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
                  사건 및 담당자 정보의 이첩기관, 업무고유번호, 담당자명, 담당자
                  연락처, 담당자 이메일 주소, 부서명, 사건명, 사건내용
                  입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      이첩기관
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="item-column">
                        <a-form-item
                          name=""
                          label="이첩기관"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
                        <CommonButton variants="primary">기관검색</CommonButton>
                      </div>
                    </td>
                    <th scope="row">업무고유번호</th>
                    <td>
                      <a-form-item
                        label="업무고유번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="송신의 경우 사건신청번호
"
                        />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      담당자명
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        label="담당자명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                    <th scope="row">
                      담당자 연락처
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
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
                            label="휴대전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            label="휴대전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      담당자이메일주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__email">
                          <a-form-item
                            label="이메일 아이디 입력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">@</span>
                          <a-form-item
                            label="이메일 도메인 입력"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <a-form-item
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
                      </div>
                    </td>
                    <th>부서명</th>
                    <td>
                      <a-form-item
                        label="부서명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">사건명</th>
                    <td colspan="3">
                      <a-form-item
                        label="사건명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      사건내용
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
                      <a-form-item
                        label="사건내용"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-textarea class="textarea-bx" id="textMessage" />
                      </a-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="2">
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
            <div class="common-form__area">
              <p class="form-ess_info mo-only">
                <i class="red-span">*</i
                ><span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  신청인 정보의 신청인 성명, 생년월일(주민번호), 담당자명,
                  담당자 연락처, 담당자 이메일 주소, 부서명, 사건명, 사건내용
                  입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      신청인 성명
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        label="신청인 성명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="10자 이내로 입력하세요"
                          maxlength="10"
                        />
                      </a-form-item>
                    </td>
                    <th scope="row">
                      생년월일(주민번호)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        label="생년월일(주민번호)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="숫자 6자리 입력해 주세요"
                        />
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
                          <CommonButton variants="primary"
                            >우편번호 찾기</CommonButton
                          >
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
                      휴대전화번호
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
                            label="휴대전화번호"
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
                            label="휴대전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            label="휴대전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      이메일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
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
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td colspan="3">
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
                            label="전화번호"
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
                            label="전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            label="전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
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
              <AccordionHead title="상대방 정보">
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
                  상대방 정보의 신청인 성명, 생년월일(주민번호), 주소,
                  휴대전화번호, 전화번호, 이메일 주소 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      신청인 성명(법인명)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        label="신청인 성명(법인명)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="10자 이내로 입력하세요"
                          maxlength="10"
                        />
                      </a-form-item>
                    </td>
                    <th scope="row">
                      생년월일<br />(주민번호/법인번호)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <a-form-item
                        label="생년월일(주민번호/법인번호)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="숫자 6~13자리 입력해주세요"
                        />
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
                          <CommonButton variants="primary"
                            >우편번호 찾기</CommonButton
                          >
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
                      휴대전화번호
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
                            label="휴대전화번호"
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
                            label="휴대전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            label="휴대전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                      </div>
                    </td>
                    <th scope="row">전화번호</th>
                    <td>
                      <div class="form-group-box">
                        <div class="form-item__number">
                          <a-form-item
                            label="전화번호"
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
                            label="전화 가운데 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                          <span class="dash">-</span>
                          <a-form-item
                            label="전화 마지막 자리"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-input class="text-bx" />
                          </a-form-item>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      이메일주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
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
                            <a-select
                              class="common-select"
                              placeholder="직접입력"
                            >
                              <a-select-option value="1"
                                >선택 1</a-select-option
                              >
                              <a-select-option value="2"
                                >선택 2</a-select-option
                              >
                            </a-select>
                          </a-form-item>
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
              <AccordionHead title="첨부파일 정보"> </AccordionHead>
            </template>
            <div class="flex justify-end mt-3">
              <CommonButton variants="primary" height="sm" fontsize="sm"
                >첨부파일 추가</CommonButton
              >
            </div>

            <CommonTable class="mt-3">
              <caption>
                첨부파일 정보 추가 삭제에 관한 표
              </caption>
              <colgroup>
                <col style="width: 45%" />
                <col style="width: 45%" />
                <col style="width: 10%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">파일설명</th>
                  <th scope="col">첨부파일</th>
                  <th scope="col">삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a-form-item
                      label="파일설명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        placeholder="30자 이내로 입력하세요"
                      />
                    </a-form-item>
                  </td>
                  <td>
                    <div class="file-wrap">
                      <a-form-item
                        name=""
                        label=""
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          placeholder="파일크기 2M까지 업로드 가능합니다."
                          :readonly="true"
                        />
                      </a-form-item>
                      <AllyFileButton class="txt">
                        <template #input>
                          <label for="fileInput">
                            <span class="sr-only">파일첨부</span>
                          </label>
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
                  </td>
                  <td>
                    <button type="button" class="del-txt">[삭제]</button>
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </AccordionItem>
        </Accordion>

        <ButtonGroup align="right" class="!mt-50px">
          <CommonButton variants="line-primary" width="xs"> 목록 </CommonButton>
          <CommonButton variants="line-primary" width="xs">
            임시저장
          </CommonButton>
          <CommonButton variants="primary" width="xs">이첩등록</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
