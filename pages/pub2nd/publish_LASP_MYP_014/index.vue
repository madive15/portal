<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'pub2nd'
});

const activeIndex3 = ref(0);
const tabTitle3 = ref<MenuCategory[]>([
  {
    title: { tabItem: '법률상담현황', linkUrl: '' },
    subTitle: [
      { item: '상담예약현황', subLink: '#' },
      { item: '사이버상담내역', subLink: '#' }
    ]
  },
  {
    title: { tabItem: '전자접수현황', linkUrl: '#' }
  },
  {
    title: { tabItem: '전자통지', linkUrl: '' },
    subTitle: [
      { item: '전자서명', subLink: '#' },
      { item: '전자송달', subLink: '#' },
      { item: 'SMS', subLink: '#' }
    ]
  },
  {
    title: { tabItem: '나의서류관리', linkUrl: '#' }
  },
  {
    title: { tabItem: '시스템 문의 내역', linkUrl: '#' }
  },
  {
    title: { tabItem: '회원정보 관리', linkUrl: '' },
    subTitle: [
      { item: '비밀번호 변경', subLink: '#' },
      { item: '회원정보 수정', subLink: '#' },
      { item: '회원탈퇴', subLink: '#' }
    ]
  }
]);
const selectedValues3 = ref<(string | null)[]>(tabTitle3.value.map(() => null));

const dropdownCategory = ref('');
const dropdownCategory2 = ref('');
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전자접수현황"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">전자접수현황 정보</h4>
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
              label="전자접수현황"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('법률상담현황')"
                    @keydown.enter.prevent="select('법률상담현황')"
                  >
                    법률상담현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자접수현황')"
                    @keydown.enter.prevent="select('전자접수현황')"
                  >
                    전자접수현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자통지')"
                    @keydown.enter.prevent="select('전자통지')"
                  >
                    전자통지
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('나의서류관리')"
                    @keydown.enter.prevent="select('나의서류관리')"
                  >
                    나의서류관리
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('시스템 문의 내역')"
                    @keydown.enter.prevent="select('시스템 문의 내역')"
                  >
                    시스템 문의 내역
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('회원정보 관리')"
                    @keydown.enter.prevent="select('회원정보 관리')"
                  >
                    회원정보 관리
                  </li>
                </ul>
              </template>
            </DropdownBasic>
            <!-- 1depth에 하위메뉴가 있을 경우 노출 -->
            <DropdownBasic
              class="menu-type2 depth2"
              v-model="dropdownCategory2"
              label="법률상담현황"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('사이버예약현황')"
                    @keydown.enter.prevent="select('사이버예약현황')"
                  >
                    사이버예약현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('사이버상담내역')"
                    @keydown.enter.prevent="select('사이버상담내역')"
                  >
                    사이버상담내역
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </div>
        <!-- //링크 탭 영역 -->
        <div class="search-info-wrap">
          <div class="select-list">
            <a-select
              id="select"
              class="common-select"
              title="접수신청상태 선택"
            >
              <a-select-option value="0">전체</a-select-option>
              <a-select-option value="1">상태값1</a-select-option>
              <a-select-option value="2">상태값2</a-select-option>
            </a-select>
          </div>
        </div>
        <CommonTable class="pc-only">
          <caption>
            전자접수현황의 순번, 신청번호, 구조대상자유형, 신청기관, 신청일,
            접수일, 접수신청상태 관련 표
          </caption>
          <colgroup>
            <col style="width: 8%" />
            <col style="width: 15%" />
            <col style="width: 21%" />
            <col style="width: 21%" />
            <col style="width: 15%" />
            <col style="width: 20%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">순번</th>
              <th scope="col">신청번호</th>
              <th scope="col">구조대상자유형</th>
              <th scope="col">신청기관</th>
              <th scope="col">신청일</th>
              <th scope="col">접수신청상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>250523-000002</td>
              <td>한부모가족</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="작성중"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>250523-000002</td>
              <td>한부모가족</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="신청완료"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>250523-000002</td>
              <td>한부모가족</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="심사중"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>250523-000002</td>
              <td>한부모가족</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="보완완료"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>250523-000002</td>
              <td>한부모가족</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="보완요청완료"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>250523-000002</td>
              <td>북한이탈주민</td>
              <td>대한법률구조공단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="보완완료"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>250523-000002</td>
              <td>결혼이민자/귀화자</td>
              <td>한국가정법률상담소</td>
              <td>2025.04.10 11:00</td>
              <td>
                <div class="link-box">
                  <CommonBadge tag-badge-text="승인" size="1" />

                  <button type="button" class="link-txt">
                    <span class="text">[내용보기]</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>250523-000002</td>
              <td>기초연금수급자</td>
              <td>대한가정법률복지상담원</td>
              <td>2025.04.10 11:00</td>
              <td>
                <div class="link-box">
                  <CommonBadge
                    tag-badge-text="불승인"
                    size="1"
                    type="color-l-pink"
                  />

                  <button type="button" class="link-txt">
                    <span class="text">[내용보기]</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>250523-000002</td>
              <td>기초연금수급자</td>
              <td>대한변협법률구조재단</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="취소"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>250523-000002</td>
              <td>기초연금수급자</td>
              <td>대한상사중재원</td>
              <td>2025.04.10 11:00</td>
              <td>
                <NuxtLink to="#" class="inner-link">
                  <CommonBadge
                    tag-badge-text="심사중"
                    size="1"
                    type="color-gray"
                  />
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>10</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="작성중"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>9</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="신청완료"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>8</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="심사중"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>7</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="보완완료"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>6</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="보완요청완료"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>5</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="보완완료"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>4</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <div class="link-box">
                      <CommonBadge tag-badge-text="승인" size="1" />

                      <button type="button" class="link-txt">
                        <span class="text">[내용보기]</span>
                      </button>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>3</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>한부모가족</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <div class="link-box">
                      <CommonBadge
                        tag-badge-text="불승인"
                        size="1"
                        type="color-l-pink"
                      />

                      <button type="button" class="link-txt">
                        <span class="text">[내용보기]</span>
                      </button>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>2</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>기초연금수급자</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한변협법률구조재단</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="취소"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>1</dd>
                </dl>
                <dl>
                  <dt>신청번호</dt>
                  <dd>250523-000002</dd>
                </dl>
                <dl>
                  <dt>구조대상자유형</dt>
                  <dd>기초연금수급자</dd>
                </dl>
                <dl>
                  <dt>신청기관</dt>
                  <dd>대한상사중재원</dd>
                </dl>
                <dl>
                  <dt>신청일</dt>
                  <dd>2025.04.10 11:00</dd>
                </dl>
                <dl>
                  <dt>접수신청상태</dt>
                  <dd>
                    <NuxtLink to="#" class="inner-link">
                      <CommonBadge
                        tag-badge-text="심사중"
                        size="1"
                        type="color-gray"
                      />
                    </NuxtLink>
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
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
