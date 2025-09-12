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
import CommonModal from '~/components/ui/modal/modal.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'pub2nd'
});

const radioSelected = ref('');
const dropdownOption = ref('');

const modalRef = ref<InstanceType<typeof CommonModal>>();
const modalRef1 = ref<InstanceType<typeof CommonModal>>();
const modalRef2 = ref<InstanceType<typeof CommonModal>>();
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
            <col style="width: 12%" />
            <col style="width: 10%" />
            <col style="width: 18%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">사건분류</th>
              <th scope="col">사건ID</th>
              <th scope="col">사건명</th>
              <th scope="col">사용여부</th>
              <th scope="col">대한법률구조공단</th>
              <th scope="col">한국가정법률<br />상담소</th>
              <th scope="col">대한가정법률<br />복지상담원</th>
              <th scope="col">대한변협법률<br />구조재단</th>
              <th scope="col">대한상사중재원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>화해조정</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000001
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  민사/가사 화해조정
                </router-link>
              </td>
              <td></td>
              <td>ABC001000</td>
              <td>
                <CommonButton variants="mapping" @click="modalRef = true"
                  >매핑</CommonButton
                >
              </td>
              <td>ABC001000</td>
              <td>ABC001000</td>
              <td>-</td>
            </tr>
            <tr>
              <td>화해조정</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000002
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  주택/상가건물 임대차분쟁조정
                </router-link>
              </td>
              <td></td>
              <td>
                <CommonButton variants="mapping" @click="modalRef = true"
                  >매핑</CommonButton
                >
              </td>
              <td>ABC001001</td>
              <td>-</td>
              <td>ABC001001</td>
              <td>-</td>
            </tr>
            <tr>
              <td>화해조정</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000003
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  상사 알선
                </router-link>
              </td>
              <td></td>
              <td>
                <CommonButton variants="mapping" @click="modalRef1 = true"
                  >매핑완료
                </CommonButton>
              </td>
              <td></td>
              <td></td>
              <td>ABC001002</td>
              <td>ABC001002</td>
            </tr>
            <tr>
              <td>민사사건>계약관계</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000004
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  대여금
                </router-link>
              </td>
              <td></td>
              <td>ABC001003</td>
              <td>-</td>
              <td>ABC001003</td>
              <td>ABC001000</td>
              <td>-</td>
            </tr>
            <tr>
              <td>민사사건>계약관계</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000005
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  약정금
                </router-link>
              </td>
              <td></td>
              <td>ABC001004</td>
              <td>-</td>
              <td>-</td>
              <td>ABC001004</td>
              <td>-</td>
            </tr>
            <tr>
              <td>민사사건>계약관계</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  C000000006
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  보증채무금
                </router-link>
              </td>
              <td></td>
              <td>C000000006</td>
              <td>-</td>
              <td>-</td>
              <td>C000000006</td>
              <td>-</td>
            </tr>
            <tr>
              <td>기관등록사건분류</td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  기관등록사건이지만 ID
                </router-link>
              </td>
              <td>
                <router-link
                  to="/"
                  class="text-decoration-underline color-blue"
                >
                  기관등록사건명
                </router-link>
              </td>
              <td></td>
              <td>
                <CommonButton variants="approval">승인</CommonButton>
              </td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000001
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      민사/가사 화해조정
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>ABC001000</dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>
                    <CommonButton variants="mapping" @click="modalRef = true"
                      >매핑</CommonButton
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>ABC001000</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>ABC001000</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000002
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      주택/상가건물 임대차분쟁조정
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>
                    <CommonButton variants="mapping" @click="modalRef = true"
                      >매핑</CommonButton
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>ABC001001</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>ABC001001</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000003
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      상사 알선
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>
                    <CommonButton variants="mapping" @click="modalRef1 = true"
                      >매핑완료</CommonButton
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>ABC001002</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>ABC001002</dd>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000004
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      대여금
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>ABC001003</dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>ABC001003</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>ABC001003</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000005
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      약정금
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>ABC001004</dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>ABC001004</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
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
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      C000000006
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      보증채무금
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>C000000006</dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>C000000006</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>사건분류</dt>
                  <dd>기관등록사건분류</dd>
                </dl>
                <dl>
                  <dt>사건ID</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      기관등록사건이지만 ID
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>
                    <router-link
                      to="/"
                      class="text-decoration-underline color-blue"
                    >
                      기관등록사건명
                    </router-link>
                  </dd>
                </dl>
                <dl>
                  <dt>사용여부</dt>
                  <dd></dd>
                </dl>
                <dl>
                  <dt>대한법률<br />구조공단</dt>
                  <dd>
                    <CommonButton variants="approval">승인</CommonButton>
                  </dd>
                </dl>
                <dl>
                  <dt>한국가정법률<br />상담소</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한가정법률<br />복지상담원</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>대한변협법률<br />구조재단</dt>
                  <dd>C000000006</dd>
                </dl>
                <dl>
                  <dt>대한상사중재원</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <CommonModal
    v-model:visible="modalRef"
    title="매핑"
    :width="720"
    :full="true"
  >
    <div class="body-cont-wrap">
      <CommonTable class="mt-17px">
        <caption>
          기관 사건ID,기관사건명,매핑 대한 표
        </caption>
        <colgroup>
          <col style="width: 30%" />
          <col style="width: 50%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">기관 사건ID</th>
            <th scope="col">기관사건명</th>
            <th scope="col">매핑</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a-input
                id=""
                class="text-bx"
                title="기관 사건ID"
                value="ABC001000"
                v-model:value="caseID"
              />
            </td>
            <td>
              <a-input
                id=""
                class="text-bx"
                title="기관사건명"
                value="민사/가사 화해조정"
                v-model:value="caseTitle"
              />
            </td>
            <td>
              <CommonButton variants="mapping">매핑완료</CommonButton>
            </td>
          </tr>
        </tbody>
      </CommonTable>
    </div>
  </CommonModal>
  <CommonModal
    v-model:visible="modalRef1"
    title="매핑"
    :width="720"
    :full="true"
  >
    <div class="body-cont-wrap">
      <CommonTable class="mt-17px">
        <caption>
          기관 사건ID,기관사건명,매핑 대한 표
        </caption>
        <colgroup>
          <col style="width: 30%" />
          <col style="width: 50%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">기관 사건ID</th>
            <th scope="col">기관사건명</th>
            <th scope="col">매핑</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABC001000</td>
            <td>민사/가사 화해조정</td>
            <td>
              <CommonButton
                variants="de-mapping"
                @click="modalRef2 = true"
                :z-index="2000"
                >매핑해제</CommonButton
              >
            </td>
          </tr>
        </tbody>
      </CommonTable>
    </div>
  </CommonModal>
  <CommonModal v-model:visible="modalRef2" title="매핑해제안내">
    <template #footer>
      <CommonButton
        variants="primary"
        width="md"
        height="md"
        type="submit"
        @click="modalRef2 = false"
      >
        확인
      </CommonButton>
    </template>
    <div class="body-cont-wrap">
      <p class="text-center">
        매핑해제를 하시면 해당정보가 삭제됩니다.<br />
        매핑해제를 진행하시겠습니까?
      </p>
    </div>
  </CommonModal>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
