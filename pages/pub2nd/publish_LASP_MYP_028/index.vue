<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'pub2nd'
});

const activeIndex3 = ref(0);
const tabTitle3 = ref<MenuCategory[]>([
  {
    title: { tabItem: '상담예약 내역', linkUrl: '#' }
  },
  {
    title: { tabItem: '사이버상담 내역', linkUrl: '#' }
  }
]);
const selectedValues3 = ref<(string | null)[]>(tabTitle3.value.map(() => null));

const dropdownCategory = ref('');
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="상담예약 내역"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">상담예약 내역 정보</h4>
        <!-- 링크 탭 영역 -->
        <div class="common-category__button">
          <div class="btn-tab__wrap-gap pc-visible">
            <DropdownTab
              class="tab-type"
              v-for="(tabItem, index) in tabTitle3"
              :label="tabItem.title.tabItem"
              :to="tabItem.title.linkUrl"
              :btnSelected="activeIndex3 === index"
              :key="index"
              :modelValue="selectedValues3[index]"
              :hasList="
                Array.isArray(tabItem.subTitle) && tabItem.subTitle.length > 0
              "
              @update:modelValue="(val) => (selectedValues3[index] = val)"
              @click="() => (activeIndex3 = index)"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    v-for="(sub, subIndex) in tabItem.subTitle"
                    :key="subIndex"
                    @click="select(sub.item)"
                    @keydown.enter.prevent="select(sub.item)"
                  >
                    <nuxt-link :to="sub.subLink">
                      {{ sub.item }}
                    </nuxt-link>
                  </li>
                </ul>
              </template>
            </DropdownTab>
          </div>
          <div class="btn-select__wrap mo-only">
            <DropdownBasic
              class="menu-type2"
              v-model="dropdownCategory"
              label="상담예약  내역"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('상담예약  내역')"
                    @keydown.enter.prevent="select('상담예약  내역')"
                  >
                    상담예약 내역
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('사이버상담 내역')"
                    @keydown.enter.prevent="select('사이버상담 내역')"
                  >
                    사이버상담 내역
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </div>
        <!-- //링크 탭 영역 -->
        <div class="search-info-wrap">
          <div class="select-list">
            <a-select id="select" class="common-select" title="상담기관 선택">
              <a-select-option value="전체">전체</a-select-option>
              <a-select-option value="대한법률구조공단"
                >대한법률구조공단</a-select-option
              >
              <a-select-option value="한국가정법률상담소"
                >한국가정법률상담소</a-select-option
              >
              <a-select-option value="대한가정법률복지상담원"
                >대한가정법률복지상담원</a-select-option
              >
              <a-select-option value="법률홈닥터">법률홈닥터</a-select-option>
            </a-select>
            <a-select id="select" class="common-select" title="상담유형 선택">
              <a-select-option value="전체">전체</a-select-option>
              <a-select-option value="면접상담">면접상담</a-select-option>
              <a-select-option value="화상상담">화상상담</a-select-option>
              <a-select-option value="전화상담">전화상담</a-select-option>
            </a-select>
          </div>
          <ButtonGroup align="right" class="!mt-0">
            <CommonButton to="#" variants="line-primary" width="lg"
              >면접상담 예약</CommonButton
            >
            <CommonButton to="#" variants="line-primary" width="lg"
              >화상상담 예약</CommonButton
            >
            <CommonButton to="#" variants="primary" width="lg"
              >전화상담 예약</CommonButton
            >
          </ButtonGroup>
        </div>
        <CommonTable class="pc-only">
          <caption>
            상담예약 내역의 예약번호, 상담유형, 법률상담 기관, 예약시간,
            예약지부, 접수일, 확정여부, 상담상태, 상담결과 관련 표
          </caption>
          <colgroup>
            <col style="width: 9%" />
            <col style="width: 9%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 12%" />
            <col style="width: 9%" />
            <col style="width: 11%" />
            <col style="width: 11%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">예약번호</th>
              <th scope="col">상담유형</th>
              <th scope="col">법률상담 기관</th>
              <th scope="col">예약시간</th>
              <th scope="col">예약지부</th>
              <th scope="col">접수일</th>
              <th scope="col">확정여부</th>
              <th scope="col">상담상태</th>
              <th scope="col">상담결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1524663</td>
              <td>면접상담</td>
              <td>한국가정법률상담소</td>
              <td>2025.04.10 11:00</td>
              <td>-</td>
              <td>2025.03.10</td>
              <td>예약확정</td>
              <td>
                <CommonBadge tag-badge-text="상담완료" size="1" />
              </td>
              <td>
                <CommonBadge
                  tag-badge-text="타기관안내"
                  size="1"
                  type="color-mint"
                />
              </td>
            </tr>
            <tr>
              <td>1524663</td>
              <td>화상상담</td>
              <td>대한가정법률복지상담원</td>
              <td>2025.04.10 11:00</td>
              <td>인천 강화군청</td>
              <td>2025.03.10</td>
              <td>예약신청</td>
              <td>
                <CommonBadge tag-badge-text="상담완료" size="1" />
              </td>
              <td>
                <CommonBadge
                  tag-badge-text="절차교시"
                  size="1"
                  type="color-mint"
                />
              </td>
            </tr>
            <tr>
              <td>1524663</td>
              <td>화상상담</td>
              <td>대한가정법률복지상담원</td>
              <td>2025.04.10 11:00</td>
              <td>인천 강화군청</td>
              <td>2025.03.10</td>
              <td>예약신청</td>
              <td>
                <CommonBadge
                  tag-badge-text="내방안함"
                  size="1"
                  type="color-l-pink"
                />
              </td>
              <td>
                <CommonBadge
                  tag-badge-text="전자접수"
                  size="1"
                  type="color-mint"
                />
              </td>
            </tr>
            <tr>
              <td>1524663</td>
              <td>화상상담</td>
              <td>대한가정법률복지상담원</td>
              <td>2025.04.10 11:00</td>
              <td>인천 강화군청</td>
              <td>2025.03.10</td>
              <td>예약신청</td>
              <td>
                <CommonBadge
                  tag-badge-text="상담취소"
                  size="1"
                  type="color-l-pink"
                />
              </td>
              <td>-</td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>예약번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>상담유형</dt>
                  <dd>면접상담</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>한국가정법률상담소</dd>
                </dl>
                <dl>
                  <dt>예약시간</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>예약지부</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>접수일</dt>
                  <dd>2025.03.10</dd>
                </dl>
                <dl>
                  <dt>확정여부</dt>
                  <dd>예약확정</dd>
                </dl>
                <dl>
                  <dt>상담상태</dt>
                  <dd>
                    <CommonBadge tag-badge-text="상담완료" size="1" />
                  </dd>
                </dl>
                <dl>
                  <dt>상담결과</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="타기관안내"
                      size="1"
                      type="color-mint"
                    />
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>예약번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>상담유형</dt>
                  <dd>면접상담</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>대한가정법률복지상담원</dd>
                </dl>
                <dl>
                  <dt>예약시간</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>예약지부</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>접수일</dt>
                  <dd>2025.03.10</dd>
                </dl>
                <dl>
                  <dt>확정여부</dt>
                  <dd>예약확정</dd>
                </dl>
                <dl>
                  <dt>상담상태</dt>
                  <dd>
                    <CommonBadge tag-badge-text="상담완료" size="1" />
                  </dd>
                </dl>
                <dl>
                  <dt>상담결과</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="절차교시"
                      size="1"
                      type="color-mint"
                    />
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>예약번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>상담유형</dt>
                  <dd>면접상담</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>법률홈닥터</dd>
                </dl>
                <dl>
                  <dt>예약시간</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>예약지부</dt>
                  <dd>인천 강화군청</dd>
                </dl>
                <dl>
                  <dt>접수일</dt>
                  <dd>2025.03.10</dd>
                </dl>
                <dl>
                  <dt>확정여부</dt>
                  <dd>예약신청</dd>
                </dl>
                <dl>
                  <dt>상담상태</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>상담결과</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>예약번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>상담유형</dt>
                  <dd>면접상담</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>예약시간</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>예약지부</dt>
                  <dd>본부</dd>
                </dl>
                <dl>
                  <dt>접수일</dt>
                  <dd>2025.03.10</dd>
                </dl>
                <dl>
                  <dt>확정여부</dt>
                  <dd>예약신청</dd>
                </dl>
                <dl>
                  <dt>상담상태</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="내방안함"
                      size="1"
                      type="color-l-pink"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>상담결과</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="절차교시"
                      size="1"
                      type="color-mint"
                    />
                  </dd>
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
