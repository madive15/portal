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
          breadcrumbTitle="공통코드매핑"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">전자송달관리 정보</h4>
        <div class="common-form__area">
          <table>
            <caption>
              공통코드매핑 조회의 그룹코드, 사용여부, 상세코드, 상세여부 관련 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">그룹코드</th>
                <td>
                  <div class="flex-box">
                    <a-select
                      id=""
                      class="common-select"
                      title="전체"
                      placeholder="선택"
                    >
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                    </a-select>
                    <a-form-item
                      name="search"
                      label="코드명 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" placeholder="코드명 입력" />
                    </a-form-item>
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
                <th scope="row">상세코드</th>
                <td>
                  <div class="flex-box">
                    <a-select
                      id=""
                      class="common-select"
                      title="전체"
                      placeholder="선택"
                    >
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                      <a-select-option value="전체">전체</a-select-option>
                    </a-select>
                    <a-form-item
                      name="search"
                      label="코드명 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" placeholder="코드명 입력" />
                    </a-form-item>
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
        <article>
          <div class="filter-mapping__area">
            <div class="ml-auto">
              <CommonButton
                variants="line-primary"
                width="sm-1"
                height="md"
                fontsize="sm"
                title="그룹코드추가요청"
                >그룹코드추가요청
              </CommonButton>
              <CommonButton
                variants="primary"
                width="xs"
                height="md"
                fontsize="sm"
                title="저장"
                >저장
              </CommonButton>
            </div>
          </div>
          <CommonTable class="pc-only">
            <caption>
              공통코드 매핑 내역의 그룹코드, 그룹코드명, 사용여부,
              기관그룹코드명, 사용여부, 정보매핑 관련 표
            </caption>
            <colgroup>
              <col style="width: 12%" />
              <col style="width: 18%" />
              <col style="width: 8%" />
              <col style="width: 14%" />
              <col style="width: 28%" />
              <col style="width: 8%" />
              <col style="width: 12%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">그룹코드</th>
                <th scope="col">그룹코드명</th>
                <th scope="col">사용여부</th>
                <th scope="col">기관 그룹코드</th>
                <th scope="col">기관그룹코드명</th>
                <th scope="col">사용여부</th>
                <th scope="col">정보매핑</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CO0042</td>
                <td>상담구분코드</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 그룹코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="SN002" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관그룹코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="상담구분코드" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>CO0043</td>
                <td>진행상태코드</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 그룹코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="SN0052" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관그룹코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="진행상태코드" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>CO0044</td>
                <td>업무구분코드</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 그룹코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="TD056" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관그룹코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="업무구분코드" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>CO0045</td>
                <td>상담분류코드</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 그룹코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="SN006" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관그룹코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="상담분류코드" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>CO0046</td>
                <td>요일코드</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 그룹코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="SN009" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관그룹코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="요일코드" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>CO0047</td>
                <td>학력코드</td>
                <td>Y</td>
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
                    <dt>그룹코드</dt>
                    <dd>CO0042</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>상담구분코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 그룹코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="SN002" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관그룹코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="상담구분코드" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>그룹코드</dt>
                    <dd>CO0043</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>진행상태코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 그룹코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="SN005" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관그룹코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="진행상태코드" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>그룹코드</dt>
                    <dd>CO0044</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>업무구분코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 그룹코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="TD056" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관그룹코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="업무구분코드" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>그룹코드</dt>
                    <dd>CO0045</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>상담분류코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 그룹코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="SN006" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관그룹코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="상담분류코드" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>그룹코드</dt>
                    <dd>CO0046</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>요일코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 그룹코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="SN009" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관그룹코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="요일코드" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>그룹코드</dt>
                    <dd>CO0047</dd>
                  </dl>
                  <dl>
                    <dt>그룹코드명</dt>
                    <dd>학력코드</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 그룹코드</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>기관그룹코드명</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>정보매핑</dt>
                    <dd>
                      <CommonButton variants="approval">승인중</CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
        </article>
        <article class="mt-4">
          <div class="filter-mapping__area">
            <div class="ml-auto">
              <CommonButton
                variants="line-primary"
                width="sm-1"
                height="md"
                fontsize="sm"
                title="상세코드추가요청"
                >상세코드추가요청
              </CommonButton>
              <CommonButton
                variants="primary"
                width="xs"
                height="md"
                fontsize="sm"
                title="저장"
                >저장
              </CommonButton>
            </div>
          </div>
          <CommonTable class="pc-only">
            <caption>
              공통코드 매핑 내역의 상세코드, 상세코드명, 사용여부, 기관
              상세코드, 기관상세코드명, 사용여부, 정보매핑 관련 표
            </caption>
            <colgroup>
              <col style="width: 12%" />
              <col style="width: 18%" />
              <col style="width: 8%" />
              <col style="width: 14%" />
              <col style="width: 28%" />
              <col style="width: 8%" />
              <col style="width: 12%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">상세코드</th>
                <th scope="col">상세코드명</th>
                <th scope="col">사용여부</th>
                <th scope="col">기관 상세코드</th>
                <th scope="col">기관상세코드명</th>
                <th scope="col">사용여부</th>
                <th scope="col">정보매핑</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>면접상담</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 상세코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="1" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관상세코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="면접상담" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>화상상담</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 상세코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="2" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관상세코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="화상상담" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>전화상담</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 상세코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="3" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관상세코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="전화상담" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>사이버상담</td>
                <td>Y</td>
                <td>
                  <a-form-item
                    label="기관 상세코드"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx text-center" value="4" />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    label="기관상세코드명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" value="사이버상담" />
                  </a-form-item>
                </td>
                <td>
                  <a-checkbox
                    class="check-bx"
                    value="1"
                    name="type"
                  ></a-checkbox>
                </td>
                <td>
                  <CommonButton variants="de-mapping">매핑해제</CommonButton>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>일반상담</td>
                <td>N</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <CommonButton variants="mapping">상세코드매핑</CommonButton>
                </td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="common-table__list mo-only">
            <ul>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>상세코드</dt>
                    <dd>1</dd>
                  </dl>
                  <dl>
                    <dt>상세코드명</dt>
                    <dd>면접상담</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 상세코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 상세코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="1" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관상세코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관상세코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="면접상담" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>상세코드</dt>
                    <dd>2</dd>
                  </dl>
                  <dl>
                    <dt>상세코드명</dt>
                    <dd>화상상담</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 상세코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 상세코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="2" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관상세코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관상세코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="화상상담" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>상세코드</dt>
                    <dd>3</dd>
                  </dl>
                  <dl>
                    <dt>상세코드명</dt>
                    <dd>전화상담</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 상세코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 상세코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="3" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관상세코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관상세코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="전화상담" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>상세코드</dt>
                    <dd>4</dd>
                  </dl>
                  <dl>
                    <dt>상세코드명</dt>
                    <dd>사이버상담</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>Y</dd>
                  </dl>
                  <dl>
                    <dt>기관 상세코드</dt>
                    <dd>
                      <a-form-item
                        label="기관 상세코드"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="4" />
                      </a-form-item>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기관상세코드명</dt>
                    <dd>
                      <a-form-item
                        label="기관상세코드명"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" value="사이버상담" />
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
                      <CommonButton variants="de-mapping"
                        >매핑해제
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>상세코드</dt>
                    <dd>5</dd>
                  </dl>
                  <dl>
                    <dt>상세코드명</dt>
                    <dd>일반상담</dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd>N</dd>
                  </dl>
                  <dl>
                    <dt>기관 상세코드</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>기관상세코드명</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>사용여부</dt>
                    <dd></dd>
                  </dl>
                  <dl>
                    <dt>정보매핑</dt>
                    <dd>
                      <CommonButton variants="mapping"
                        >상세코드매핑
                      </CommonButton>
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
