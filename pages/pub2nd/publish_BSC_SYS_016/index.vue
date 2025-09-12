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
          :breadcrumbItems="[{ menuid: 1, text: '전자송달관리', to: '/test1' }]"
          breadcrumbTitle="구조대상자 매핑"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">전자송달관리 정보</h4>
        <div class="common-form__area">
          <table>
            <caption>
              구조대상자 매핑 조회의 대상자 분류, 사용여부, 구조대상자명조회
              관련 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">대상자분류</th>
                <td>
                  <div class="flex-box">
                    <a-select
                      id="select1"
                      class="common-select"
                      title="전체"
                      placeholder="선택"
                    >
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                    </a-select>
                    <a-select
                      id="select2"
                      class="common-select"
                      title="전체"
                      placeholder="선택"
                    >
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                    </a-select>
                  </div>
                </td>
                <th>사용여부</th>
                <td>
                  <a-radio-group v-model:value="radioSelected">
                    <a-radio class="radio-bx" value="1">사용</a-radio>
                    <a-radio class="radio-bx" value="2">사용안함</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <th scope="row">구조대상자명</th>
                <td colspan="3">
                  <a-form-item
                    name="search"
                    label="대상자명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" placeholder="대상자명을 입력" />
                  </a-form-item>
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
        <div class="filter-mapping__area">
          <div class="dropdown-area">
            <label for="dropdown">
              <span class="sr-only">필터선택</span>
            </label>
            <DropdownBasic
              class="select-type"
              v-model="dropdownOption"
              label="필터 선택"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('매핑사건')"
                    @keydown.enter.prevent="select('매핑사건')"
                  >
                    매핑사건
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('미매핑사건')"
                    @keydown.enter.prevent="select('미매핑사건')"
                  >
                    미매핑사건
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
          <div class="ml-auto">
            <CommonButton
              variants="line-primary"
              width="sm"
              height="md"
              fontsize="sm"
              title="대상자추가요청"
              >대상자추가요청
            </CommonButton>
            <CommonButton
              variants="primary"
              width="sm"
              height="md"
              fontsize="sm"
              title="일괄저장"
              >일괄저장
            </CommonButton>
          </div>
        </div>
        <CommonTable class="pc-only">
          <caption>
            구조대상자 매핑 내역의 대상자 분류, 대상자번호, 구조대상자명,
            사용여부, 기관 대상자번호, 기관 구조대상자명, 사용여부, 정보매핑
            관련 표
          </caption>
          <colgroup>
            <col style="width: 16%" />
            <col style="width: 6%" />
            <col style="width: 18%" />
            <col style="width: 6%" />
            <col style="width: 14%" />
            <col style="width: 24%" />
            <col style="width: 6%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">대상자 분류</th>
              <th scope="col">대상자번호</th>
              <th scope="col">구조대상자명</th>
              <th scope="col">사용여부</th>
              <th scope="col">기관 대상자번호</th>
              <th scope="col">기관 구조대상자명</th>
              <th scope="col">사용여부</th>
              <th scope="col">정보매핑</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>경제적 취약계층 > 기초생활보장수급자</td>
              <td>C000000001</td>
              <td>국민기초생활보장수급자</td>
              <td>Y</td>
              <td>
                <a-form-item
                  label="기관 대상자번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001000" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관 구조대상자명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="국민기초생활보장수급자" />
                </a-form-item>
              </td>
              <td>
                <a-checkbox class="check-bx" value="1" name="type"></a-checkbox>
              </td>
              <td>
                <CommonButton variants="de-mapping">매핑해제</CommonButton>
              </td>
            </tr>
            <tr>
              <td>경제적 취약계층 > 차상위 계층</td>
              <td>C000000002</td>
              <td>차상위 계층</td>
              <td>Y</td>
              <td>
                <a-form-item
                  label="기관 대상자번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001001" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관 구조대상자명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="차상위 계층" />
                </a-form-item>
              </td>
              <td>
                <a-checkbox class="check-bx" value="1" name="type"></a-checkbox>
              </td>
              <td>
                <CommonButton variants="de-mapping">매핑해제</CommonButton>
              </td>
            </tr>
            <tr>
              <td>경제적 취약계층 > 개인회생 및 파산·면책신청대상자</td>
              <td>C000000003</td>
              <td>개인회생및파산·면책신청자(무료)</td>
              <td>Y</td>
              <td>
                <a-form-item
                  label="기관 대상자번호"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001002" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관 구조대상자명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input
                    class="text-bx"
                    value="개인회생및파산·면책신청자(무료)"
                  />
                </a-form-item>
              </td>
              <td>
                <a-checkbox class="check-bx" value="1" name="type"></a-checkbox>
              </td>
              <td>
                <CommonButton variants="de-mapping">매핑해제</CommonButton>
              </td>
            </tr>
            <tr>
              <td>개인회생 및 파산·면책신청대상자</td>
              <td>C000000004</td>
              <td>개인회생신청자(서울보증보험-무료)</td>
              <td>Y</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CommonButton variants="mapping">대상자매핑</CommonButton>
              </td>
            </tr>
            <tr>
              <td>개인회생 및 파산·면책신청대상자</td>
              <td>C000000005</td>
              <td>개인회생및파산·면책신청자(캠코채무자-무료)</td>
              <td>Y</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CommonButton variants="mapping">대상자매핑</CommonButton>
              </td>
            </tr>
            <tr>
              <td>개인회생 및 파산·면책신청대상자</td>
              <td>C000000006</td>
              <td>개인회생및파산·면책신청자(소상공인-무료)</td>
              <td>Y</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CommonButton variants="mapping">대상자매핑</CommonButton>
              </td>
            </tr>
            <tr>
              <td>추가한 내용</td>
              <td></td>
              <td>추가신청한 내용</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CommonButton variants="approval">승인중</CommonButton>
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>경제적 취약계층 > 기초생활보장수급자</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000001</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>국민기초생활보장수급자</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd>
                    <a-form-item
                      label="기관 대상자번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001000" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd>
                    <a-form-item
                      label="기관 구조대상자명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="국민기초생활보장수급자" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>
                    <a-checkbox
                      class="check-bx"
                      value="1"
                      name="type"
                    ></a-checkbox>
                  </dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="de-mapping">매핑해제 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>경제적 취약계층 > 차상위 계층</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>차상위 계층</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd>
                    <a-form-item
                      label="기관 대상자번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001001" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd>
                    <a-form-item
                      label="기관 구조대상자명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="차상위 계층" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>
                    <a-checkbox
                      class="check-bx"
                      value="1"
                      name="type"
                    ></a-checkbox>
                  </dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="de-mapping">매핑해제 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>경제적 취약계층 > 개인회생 및 파산·면책신청대상자</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000003</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>개인회생및파산·면책신청자(무료)</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd>
                    <a-form-item
                      label="기관 대상자번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001002" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd>
                    <a-form-item
                      label="기관 구조대상자명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        value="개인회생및파산·면책신청자(무료)"
                      />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>
                    <a-checkbox
                      class="check-bx"
                      value="1"
                      name="type"
                    ></a-checkbox>
                  </dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="de-mapping">매핑해제 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>개인회생 및 파산·면책신청대상자</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000004</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>개인회생신청자(서울보증보험-무료)</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="mapping">대상자매핑 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>개인회생 및 파산·면책신청대상자</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000005</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>개인회생및파산·면책신청자(캠코채무자-무료)</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="mapping">대상자매핑 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>개인회생 및 파산·면책신청대상자</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd>C000000006</dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>개인회생및파산·면책신청자(소상공인-무료)</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>Y</dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd>
                    <a-checkbox
                      class="check-bx"
                      value="1"
                      name="type"
                    ></a-checkbox>
                  </dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="mapping">대상자매핑 </CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>대상자 분류</dt>
                  <dd>추가한 내용</dd>
                </dl>
                <dl>
                  <dt>대상자번호</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>구조대상자명</dt>
                  <dd>추가신청한 내용</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 대상자번호</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 구조대상자명</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="approval"> 승인중</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
        <ButtonGroup align="right">
          <CommonButton variants="primary" width="md" title="저장">
            저장
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
