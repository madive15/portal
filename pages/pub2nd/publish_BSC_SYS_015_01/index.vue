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
          breadcrumbTitle="사건정보 매핑"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">사건정보 매핑</h4>
        <div class="common-form__area">
          <table>
            <caption>
              사건정보 매핑 조회의 사건분류, 사용여부, 사건명조회 관련 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">사건분류</th>
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
                    <a-select
                      id="select3"
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
                <th scope="row">사건명</th>
                <td colspan="3">
                  <a-form-item
                    name="search"
                    label="사건명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" placeholder="사건명을 입력" />
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
              >사건추가요청
            </CommonButton>
            <CommonButton
              variants="primary"
              width="sm"
              height="md"
              fontsize="sm"
              >일괄저장
            </CommonButton>
          </div>
        </div>
        <CommonTable class="pc-only">
          <caption>
            사건정보매핑 내역의 사건분류, 사건ID, 사건명, 사용여부, 기관 사건ID,
            기관사건명, 사용여부 탬플릿명 관련 표
          </caption>
          <colgroup>
            <col style="width: 14%" />
            <col style="width: 6%" />
            <col style="width: 20%" />
            <col style="width: 6%" />
            <col style="width: 14%" />
            <col style="width: 24%" />
            <col style="width: 6%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">사건분류</th>
              <th scope="col">사건ID</th>
              <th scope="col">사건명</th>
              <th scope="col">사용여부</th>
              <th scope="col">기관 사건ID</th>
              <th scope="col">기관사건명</th>
              <th scope="col">사용여부</th>
              <th scope="col">정보매핑</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>화해조정</td>
              <td>C000000001</td>
              <td>민사/가사 화해조정</td>
              <td></td>
              <td>
                <a-form-item
                  label="기관 사건ID"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001000" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관사건명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="민사/가사 화해조정" />
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
              <td>화해조정</td>
              <td>C000000002</td>
              <td>주택/상가건물 임대차분쟁조정</td>
              <td></td>
              <td>
                <a-form-item
                  label="기관 사건ID"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001002" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관사건명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input
                    class="text-bx"
                    value="주택/상가건물 임대차분쟁조정"
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
              <td>화해조정</td>
              <td>C000000003</td>
              <td>상사 알선</td>
              <td></td>
              <td>
                <a-form-item
                  label="기관 사건ID"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001002" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관사건명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="상사 알선" />
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
              <td>민사사건>계약관계</td>
              <td>C000000004</td>
              <td>대여금</td>
              <td></td>
              <td>
                <a-form-item
                  label="기관 사건ID"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001003" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관사건명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="대여금" />
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
              <td>민사사건>계약관계</td>
              <td>C000000005</td>
              <td>약정금</td>
              <td></td>
              <td>
                <a-form-item
                  label="기관 사건ID"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx text-center" value="ABC001004" />
                </a-form-item>
              </td>
              <td>
                <a-form-item
                  label="기관사건명"
                  :labelCol="{ class: 'sr-only' }"
                >
                  <a-input class="text-bx" value="약정금" />
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
              <td>민사사건>계약관계</td>
              <td>C000000006</td>
              <td>보증채무금</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CommonButton variants="mapping">사건매핑</CommonButton>
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>화해조정</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000001</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>민사/가사 화해조정</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd>
                    <a-form-item
                      label="기관 사건ID"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001000" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd>
                    <a-form-item
                      label="기관사건명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="약정금" />
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
                    <CommonButton variants="de-mapping">매핑해제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>화해조정</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000002</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>주택/상가건물 임대차분쟁조정</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd>
                    <a-form-item
                      label="기관 사건ID"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001001" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd>
                    <a-form-item
                      label="기관사건명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        value="주택/상가건물 임대차분쟁조정"
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
                    <CommonButton variants="de-mapping">매핑해제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>화해조정</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000003</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>상사 알선</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd>
                    <a-form-item
                      label="기관 사건ID"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001002" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd>
                    <a-form-item
                      label="기관사건명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="상사 알선" />
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
                    <CommonButton variants="de-mapping">매핑해제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>민사사건>계약관계</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000004</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>대여금</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd>
                    <a-form-item
                      label="기관 사건ID"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001003" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd>
                    <a-form-item
                      label="기관사건명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="대여금" />
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
                    <CommonButton variants="de-mapping">매핑해제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>민사사건>계약관계</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000005</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>약정금</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd>
                    <a-form-item
                      label="기관 사건ID"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="ABC001004" />
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd>
                    <a-form-item
                      label="기관사건명"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="약정금" />
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
                    <CommonButton variants="de-mapping">매핑해제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>민사사건>계약관계</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>C000000006</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>보증채무금</dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관 사건 ID</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>기관사건명</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>정보매핑</dt>
                  <dd>
                    <CommonButton variants="mapping">사건매핑</CommonButton>
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
