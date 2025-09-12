<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';

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

// 샘플 데이터
const sampleData = ref([
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' }
]);

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
          breadcrumbTitle="나의서류관리"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">나의서류관리 정보</h4>
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
              label="나의서류관리"
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
        <CommonTable class="pc-only">
          <caption>
            나의서류관리의 순번, 제목, 등록일, 삭제에 대한 표
          </caption>
          <colgroup>
            <col style="width: 14%" />
            <col style="width: 40%" />
            <col style="width: 28%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="num-th">순번</th>
              <th scope="col" class="title-th">제목</th>
              <th scope="col" class="date-th">등록일</th>
              <th scope="col" class="hit-th">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sampleData" :key="index">
              <td>{{ sampleData.length - index }}</td>
              <td>
                <NuxtLink to="#" class="link-txt align-left">{{
                  item.title
                }}</NuxtLink>
              </td>
              <td>{{ item.date }}</td>
              <td>
                <CommonButton height="sm">삭제</CommonButton>
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li v-for="(item, index) in sampleData" :key="index">
              <div class="table-mo-cont">
                <dl>
                  <dt>순번</dt>
                  <dd>{{ sampleData.length - index }}</dd>
                </dl>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <NuxtLink to="#" class="link-txt">{{
                      item.title
                    }}</NuxtLink>
                  </dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>{{ item.date }}</dd>
                </dl>
                <dl>
                  <dt>삭제</dt>
                  <dd>
                    <CommonButton height="sm">삭제</CommonButton>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton to="#" variants="primary" width="sm-1"
            >나의서류등록</CommonButton
          >
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
