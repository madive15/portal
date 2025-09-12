<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import SearchCs from '~/components/ui/search/searchCs.vue';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
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
          breadcrumbTitle="사이버상담 내역"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">사이버상담 내역 정보</h4>
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
              label="전자통지"
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
              label="전자통지"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자서명')"
                    @keydown.enter.prevent="select('전자서명')"
                  >
                    전자서명
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자송달')"
                    @keydown.enter.prevent="select('전자송달')"
                  >
                    전자송달
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('SMS')"
                    @keydown.enter.prevent="select('SMS')"
                  >
                    SMS
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </div>
        <!-- //링크 탭 영역 -->
        <SearchCs />
        <ButtonGroup align="right" class="!mb-24px">
          <CommonButton to="#" variants="primary" width="lg"
            >문의하기</CommonButton
          >
        </ButtonGroup>
        <CommonTable class="pc-only">
          <caption>
            사이버상담 내역의 상담번호, 법률상담 기관, 공개여부, 제목, 등록일,
            답변상태 관련 표
          </caption>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 16%" />
            <col style="width: 8%" />
            <col style="width: 46%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">상담번호</th>
              <th scope="col">법률상담 기관</th>
              <th scope="col">공개여부</th>
              <th scope="col">제목</th>
              <th scope="col">등록일</th>
              <th scope="col">답변상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1524663</td>
              <td>한국가정법률상담소</td>
              <td>
                <span class="ico-public">공개</span>
              </td>
              <td>
                <NuxtLink to="#" class="link-txt">재혼부부 이혼</NuxtLink>
              </td>
              <td>2025.04.10</td>
              <td>
                <CommonBadge
                  tag-badge-text="답변대기"
                  size="1"
                  type="color-l-pink"
                />
              </td>
            </tr>
            <tr>
              <td>1524663</td>
              <td>대한가정법률복지상담원</td>
              <td>
                <span class="ico-private">비공개</span>
              </td>
              <td>
                <NuxtLink to="#" class="link-txt"
                  >채무자가 잠수 탔어요</NuxtLink
                >
              </td>
              <td>2025.04.10</td>
              <td>
                <CommonBadge
                  tag-badge-text="검토중"
                  size="1"
                  type="color-gray"
                />
              </td>
            </tr>
            <tr>
              <td>1524663</td>
              <td>법률홈닥터</td>
              <td>
                <span class="ico-public">공개</span>
              </td>
              <td>
                <NuxtLink to="#" class="link-txt">성격차이 이혼</NuxtLink>
              </td>
              <td>2025.04.10</td>
              <td>
                <CommonBadge tag-badge-text="답변완료" size="1" />
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>상담번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>한국가정법률상담소</dd>
                </dl>
                <dl>
                  <dt>공개여부</dt>
                  <dd>
                    <span class="ico-public">공개</span>
                  </dd>
                </dl>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <NuxtLink to="#" class="link-txt">재혼부부 이혼</NuxtLink>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>2025.04.10</dd>
                </dl>
                <dl>
                  <dt>답변상태</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="답변대기"
                      size="1"
                      type="color-l-pink"
                    />
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>상담번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>법률홈닥터</dd>
                </dl>
                <dl>
                  <dt>공개여부</dt>
                  <dd>
                    <span class="ico-private">비공개</span>
                  </dd>
                </dl>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <NuxtLink to="#" class="link-txt">성격차이 이혼 </NuxtLink>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>2025.04.10</dd>
                </dl>
                <dl>
                  <dt>답변상태</dt>
                  <dd>
                    <CommonBadge
                      tag-badge-text="검토중"
                      size="1"
                      type="color-gray"
                    />
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>상담번호</dt>
                  <dd>1524663</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>공개여부</dt>
                  <dd>
                    <span class="ico-public">공개</span>
                  </dd>
                </dl>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <NuxtLink to="#" class="link-txt"
                      >강제이혼 가능할까요?</NuxtLink
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>2025.04.10</dd>
                </dl>
                <dl>
                  <dt>답변상태</dt>
                  <dd>
                    <CommonBadge tag-badge-text="답변완료" size="1" />
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
