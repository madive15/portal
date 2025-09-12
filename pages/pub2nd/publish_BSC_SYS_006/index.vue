<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'pub2nd'
});

const radioSelected = ref('');
const dropdownOption = ref('');
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="문자발송목록"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">전자송달관리 정보</h4>
        <div class="common-form__area">
          <table>
            <caption>
              전자송달관리 조회의 검색어, 기간조회 관련 표
            </caption>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">검색어</th>
                <td>
                  <div class="flex-box">
                    <a-select
                      id="select1"
                      class="common-select"
                      title="검색어 선택"
                    >
                      <a-select-option value="받는사람"
                        >받는사람</a-select-option
                      >
                      <a-select-option value="보낸사람"
                        >보낸사람</a-select-option
                      >
                      <a-select-option value="받는사람휴대폰번호"
                        >받는사람휴대폰번호</a-select-option
                      >
                    </a-select>
                    <a-form-item
                      name="search"
                      label="검색어 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" placeholder="2자 이상 입력" />
                    </a-form-item>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">기간조회</th>
                <td>
                  <div class="date-search-box">
                    <a-select
                      id="select2"
                      class="common-select"
                      title="기간 분류 선택"
                    >
                      <a-select-option value="등록일">등록일</a-select-option>
                      <a-select-option value="발송일">발송일</a-select-option>
                    </a-select>
                    <div class="date-picker__group">
                      <VueDatePicker
                        name="writePeriodStart"
                        id="write-period-start"
                        :year-range="[
                          new Date().getFullYear() - 5,
                          new Date().getFullYear() + 5
                        ]"
                        v-model="startDt"
                        locale="ko"
                        :enable-time-picker="false"
                        :format="'yyyy-MM-dd'"
                        :auto-apply="true"
                        :clearable="false"
                        :transitions="false"
                        :highlight-week-days="[0]"
                        :week-start="0"
                        placeholder="시작일 선택"
                        hide-input-icon
                      />
                      <span class="more-span">~</span>
                      <VueDatePicker
                        name="writePeriodEnd"
                        id="write-period-end"
                        :year-range="[
                          new Date().getFullYear() - 5,
                          new Date().getFullYear() + 5
                        ]"
                        v-model="endDt"
                        locale="ko"
                        :enable-time-picker="false"
                        :format="'yyyy-MM-dd'"
                        :auto-apply="true"
                        :clearable="false"
                        :transitions="false"
                        :highlight-week-days="[0]"
                        :week-start="0"
                        placeholder="마지막날 선택"
                        hide-input-icon
                      />
                    </div>
                    <a-radio-group v-model:value="radioSelected">
                      <a-radio-button class="radio-bx type-button" value="오늘"
                        >오늘</a-radio-button
                      >
                      <a-radio-button
                        class="radio-bx type-button"
                        value="일주일"
                        >일주일</a-radio-button
                      >
                      <a-radio-button class="radio-bx type-button" value="한달"
                        >한달</a-radio-button
                      >
                      <a-radio-button class="radio-bx type-button" value="1년"
                        >1년</a-radio-button
                      >
                    </a-radio-group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="line-primary" width="sm-1">
            초기화
            <template #right-icon>
              <Icon name="refresh-blue" />
            </template>
          </CommonButton>
          <CommonButton variants="primary" width="sm-1">검색</CommonButton>
        </ButtonGroup>
        <div class="search-info__wrap">
          <strong> 총 <span>10</span>건이 있습니다. </strong>
          <div class="dropdown-area">
            <label for="dropdown">
              <span class="sr-only">노출 갯수 선택</span>
            </label>
            <DropdownBasic
              class="select-type"
              v-model="dropdownOption"
              label="목록 선택"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('10개씩 보기')"
                    @keydown.enter.prevent="select('10개씩 보기')"
                  >
                    10개씩 보기
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('20개씩 보기')"
                    @keydown.enter.prevent="select('20개씩 보기')"
                  >
                    20개씩 보기
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('30개씩 보기')"
                    @keydown.enter.prevent="select('30개씩 보기')"
                  >
                    30개씩 보기
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </div>
        <CommonTable class="pc-only">
          <caption>
            문자발송목록 내역의 순번, 보낸사람, 등록일시, 발송일시,
            받는사람휴대폰, 선택 탬플릿명 관련 표
          </caption>
          <colgroup>
            <col style="width: 8%" />
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">순번</th>
              <th scope="col">보낸사람</th>
              <th scope="col">등록일시</th>
              <th scope="col">발송일시</th>
              <th scope="col">받는사람휴대폰</th>
              <th scope="col">선택 탬플릿명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678 <span>외2명</span></td>
              <td>-</td>
            </tr>
            <tr>
              <td>122</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>계약서안내</td>
            </tr>
            <tr>
              <td>121</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>조정서안내</td>
            </tr>
            <tr>
              <td>120</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>119</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>118</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>117</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>116</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>115</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
            <tr>
              <td>114</td>
              <td>
                <button type="button" class="link-txt">홍길동</button>
              </td>
              <td>2025-05-25 12:24:55</td>
              <td>2025-05-25 12:25:55</td>
              <td>010-1234-5678</td>
              <td>-</td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>123</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678 <span>외2명</span></dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>122</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>계약서안내</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>121</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>조정서안내</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>120</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>119</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>118</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>117</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>116</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>115</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>114</dd>
                </dl>
                <dl>
                  <dt>보낸사람</dt>
                  <dd>
                    <button type="button" class="link-txt">홍길동</button>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일시</dt>
                  <dd>2025-05-25 12:24:55</dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025-05-25 12:25:55</dd>
                </dl>
                <dl>
                  <dt>받는사람휴대폰</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>선택 탬플릿명</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
        <!-- 데이터 없는 경우 노출 -->
        <div class="board-empty-box d-none">
          <div class="img-box">
            <img src="/image/sub/customer/none.svg" alt="" />
          </div>
          <div class="text-box">
            <p>검색된 결과가 존재하지 않습니다.</p>
          </div>
        </div>
        <!-- // 데이터 없는 경우 노출 -->
        <CommonPagenation
          :page="1"
          :size="10"
          :total-elements="100"
          :show-pagination-count="10"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
