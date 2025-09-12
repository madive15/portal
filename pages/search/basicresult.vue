<script setup lang="ts">
import AllSearch from '~/components/allsearch/search.vue';
import TotalResult from '~/pages/search/totalresult.vue';
import ServiceResult from '~/pages/search/serviceresult.vue';
import ExampleResult from '~/pages/search/exampleresult.vue';
import FormResult from '~/pages/search/formresult.vue';
import PublicResult from '~/pages/search/publicresult.vue';
import EtcResult from '~/pages/search/etcresult.vue';
import EmptyResult from '~/pages/search/empty.vue';
import ResearchResult from '~/pages/search/researchresult.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import { provide, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useServiceStore } from '~/stores/search/service';
import { useInstitutionStore } from '~/stores/search/institution';
import { useCaseStore } from '~/stores/search/case';
import { useTemplateStore } from '~/stores/search/template';
import { useEtcStore } from '~/stores/search/etc';
import { isEqual, omit } from 'lodash-es';
import { DEFAULT_SERVICE_LIST_QUERY } from '~/constants/search/service';
import { DEFAULT_INSTITUTION_LIST_QUERY } from '~/constants/search/institution';
import { DEFAULT_CASE_LIST_QUERY } from '~/constants/search/case';
import { DEFAULT_TEMPLATE_LIST_QUERY } from '~/constants/search/template';
import { DEFAULT_ETC_LIST_QUERY } from '~/constants/search/etc';
import { useMenuStore } from '~/stores/common/menu';
import CommonTabs from "~/components/ui/tab/tab.vue";
import CommonTabItem from "~/components/ui/tab/tabitem.vue";

const menuStore = useMenuStore();
const { headTitle } = storeToRefs(menuStore);
useHead({
  title: headTitle.value
});

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const serviceStore = useServiceStore();
const { serviceTotalList, serviceListQuery } = storeToRefs(serviceStore);

const institutionStore = useInstitutionStore();
const { institutionTotalList, institutionListQuery } =
  storeToRefs(institutionStore);

const caseStore = useCaseStore();
const { caseTotalList, caseListQuery } = storeToRefs(caseStore);

const templateStore = useTemplateStore();
const { templateTotalList, templateListQuery } = storeToRefs(templateStore);

const etcStore = useEtcStore();
const { etcTotalList, etcListQuery } = storeToRefs(etcStore);

onBeforeMount(() => {
  Promise.allSettled([
    serviceStore.resetServiceListQuery(),
    institutionStore.resetInstitutionListQuery(),
    caseStore.resetCaseListQuery(),
    templateStore.resetTemplateListQuery(),
    etcStore.resetEtcListQuery(),
    searchStore.resetTrendList(),
    searchStore.resetTotalMenuList(),
    searchStore.resetTotalRelationList(),
    serviceStore.resetServiceList(),
    serviceStore.resetServiceTotalList(),
    institutionStore.resetInstitutionList(),
    institutionStore.resetInstitutionTotalList(),
    caseStore.resetCaseList(),
    caseStore.resetCaseTotalList(),
    templateStore.resetTemplateList(),
    templateStore.resetTemplateTotalList(),
    etcStore.resetEtcList(),
    etcStore.resetEtcTotalList()
  ]);

  if (searchMain.value.searchQuery.trim() != '') {
    Promise.allSettled([
      searchStore.personalLog(),
      searchStore.totalMenu(),
      searchStore.totalRelation(),
      searchService(),
      searchInst(),
      searchCase(),
      searchTmplt(),
      searchEtc()
    ]);
  }
});

// 검색어 입력 상태
const searchQuery = ref<string>('');
provide('searchQuery', searchQuery);

watch(
  () => searchMain.value.searchQuery,
  async (newValue) => {
    if (searchMain.value.searchQuery.trim() != '') {
      Promise.allSettled([
        searchStore.personalLog(),
        searchStore.totalMenu(),
        searchStore.totalRelation(),
        searchService(),
        searchInst(),
        searchCase(),
        searchTmplt(),
        searchEtc(),
        (tabRef.value.activeTabIndex = 0)
      ]);
    }
  }
);

// watch 감지 못하는 case
const search = (searchQuery: string) => {
  searchStore.resetTotalMenuList();
  searchStore.resetTotalRelationList();
  serviceStore.resetServiceListQuery();
  institutionStore.resetInstitutionListQuery();
  caseStore.resetCaseListQuery();
  templateStore.resetTemplateListQuery();
  etcStore.resetEtcListQuery();

  if (searchQuery !== searchMain.value.searchQuery) {
    searchMain.value.searchQuery = searchQuery;
  }

  if (searchQuery.trim() != '') {
    Promise.allSettled([
      searchStore.personalLog(),
      searchStore.totalMenu(),
      searchStore.totalRelation(),
      searchService(),
      searchInst(),
      searchCase(),
      searchTmplt(),
      searchEtc()
    ]);
  }
};

const searchService = async () => {
  if (searchMain.value.searchQuery.trim() != '') {
    serviceListQuery.value.searchQuery = searchMain.value.searchQuery;
    serviceListQuery.value.reSearchQuery = [...searchMain.value.reSearchQuery];
    await serviceStore.searchServiceList();
    newTabKey();
  }
};
provide('searchService', searchService);

const searchInst = async () => {
  if (searchMain.value.searchQuery.trim() != '') {
    institutionListQuery.value.searchQuery = searchMain.value.searchQuery;
    institutionListQuery.value.reSearchQuery = [
      ...searchMain.value.reSearchQuery
    ];
    await institutionStore.searchInstitutionList();
    newTabKey();
  }
};
provide('searchInst', searchInst);

const searchCase = async () => {
  if (searchMain.value.searchQuery.trim() != '') {
    caseListQuery.value.searchQuery = searchMain.value.searchQuery;
    caseListQuery.value.reSearchQuery = [...searchMain.value.reSearchQuery];
    await caseStore.searchCaseList();
    newTabKey();
  }
};
provide('searchCase', searchCase);

const searchTmplt = async () => {
  if (searchMain.value.searchQuery.trim() != '') {
    templateListQuery.value.searchQuery = searchMain.value.searchQuery;
    templateListQuery.value.reSearchQuery = [...searchMain.value.reSearchQuery];
    await templateStore.searchTemplateList();
    newTabKey();
  }
};
provide('searchTmplt', searchTmplt);

const searchEtc = async () => {
  if (searchMain.value.searchQuery.trim() != '') {
    etcListQuery.value.searchQuery = searchMain.value.searchQuery;
    etcListQuery.value.reSearchQuery = [...searchMain.value.reSearchQuery];
    await etcStore.searchEtcList();
    tabKey.value = generateCryptoKey();
  }
};
provide('searchEtc', searchEtc);

const generateCryptoKey = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const tabKey = ref(generateCryptoKey());

const newTabKey = () => {
  tabKey.value = generateCryptoKey();
};

const listCnt = (index: number) => {
  let serviceCnt = serviceTotalList.value.totalElements;
  let institutionCnt = institutionTotalList.value.totalElements;
  let caseCnt = caseTotalList.value.totalElements;
  let templateCnt = templateTotalList.value.totalElements;
  let etcCnt = etcTotalList.value.totalElements;
  let totalCnt = serviceCnt + institutionCnt + caseCnt + templateCnt + etcCnt;

  switch (index) {
    case 0:
      return formatComma(totalCnt);
    case 1:
      return formatComma(serviceCnt);
    case 2:
      return formatComma(institutionCnt);
    case 3:
      return formatComma(caseCnt);
    case 4:
      return formatComma(templateCnt);
    case 5:
      return formatComma(etcCnt);
  }
};
provide('listCnt', listCnt);

// 더보기 탭 이동
const tabRef = ref();
provide('tabRef', tabRef);

// 탭 이동시 검색 조건/결과 초기화
const serviceRef = ref(null);
const instRef = ref(null);
const caseRef = ref(null);
const tmpltRef = ref(null);
const etcRef = ref(null);

// 통합검색 탭에서 재검색 여부
const isReSearch = computed(() => {
  return searchMain.value.reSearchQuery.length > 0;
});

// 드롭다운 메뉴 닫기
const allDropDownClose = ref(false);

const dropDownClose = () => {
  allDropDownClose.value = !allDropDownClose.value;
};

provide('allDropDownClose', allDropDownClose);

const onTabChange = (index: number) => {
  dropDownClose();
  const defaultOmit = ref();
  const searchOmit = ref();
  const omitKey = !isReSearch.value
    ? ['searchQuery']
    : ['searchQuery', 'reSearchQuery'];
  // 검색 조건 변경 여부 확인
  const omitEqual = ref<boolean>(true);
  const reSearchEqual = ref<boolean>(true);

  if (index == 0) {
    serviceTotalList.value.content.forEach((srvc) => (srvc.expanded = false));
  } else if (index == 1 && serviceRef.value) {
    defaultOmit.value = omit(DEFAULT_SERVICE_LIST_QUERY, omitKey);
    searchOmit.value = omit(serviceListQuery.value, omitKey);
    omitEqual.value = isEqual(defaultOmit, searchOmit);
    if (isReSearch.value) {
      reSearchEqual.value = isEqual(
        searchMain.value.reSearchQuery,
        serviceListQuery.value.reSearchQuery
      );
    }
    serviceRef.value.resetServiceState(omitEqual.value && reSearchEqual.value);
  } else if (index == 2 && instRef.value) {
    defaultOmit.value = omit(DEFAULT_INSTITUTION_LIST_QUERY, omitKey);
    searchOmit.value = omit(institutionListQuery.value, omitKey);
    omitEqual.value = isEqual(defaultOmit, searchOmit);
    if (isReSearch.value) {
      reSearchEqual.value = isEqual(
        searchMain.value.reSearchQuery,
        institutionListQuery.value.reSearchQuery
      );
    }
    instRef.value.resetInstState(omitEqual.value && reSearchEqual.value);
  } else if (index == 3 && caseRef.value) {
    defaultOmit.value = omit(DEFAULT_CASE_LIST_QUERY, omitKey);
    searchOmit.value = omit(caseListQuery.value, omitKey);
    omitEqual.value = isEqual(defaultOmit, searchOmit);
    if (isReSearch.value) {
      reSearchEqual.value = isEqual(
        searchMain.value.reSearchQuery,
        caseListQuery.value.reSearchQuery
      );
    }
    caseRef.value.resetCaseState(omitEqual.value && reSearchEqual.value);
  } else if (index == 4 && tmpltRef.value) {
    defaultOmit.value = omit(DEFAULT_TEMPLATE_LIST_QUERY, omitKey);
    searchOmit.value = omit(templateListQuery.value, omitKey);
    omitEqual.value = isEqual(defaultOmit, searchOmit);
    if (isReSearch.value) {
      reSearchEqual.value = isEqual(
        searchMain.value.reSearchQuery,
        templateListQuery.value.reSearchQuery
      );
    }
    tmpltRef.value.resetTmpltState(omitEqual.value && reSearchEqual.value);
  } else if (index == 5 && etcRef.value) {
    defaultOmit.value = omit(DEFAULT_ETC_LIST_QUERY, omitKey);
    searchOmit.value = omit(etcListQuery.value, omitKey);
    omitEqual.value = isEqual(defaultOmit, searchOmit);
    if (isReSearch.value) {
      reSearchEqual.value = isEqual(
        searchMain.value.reSearchQuery,
        etcListQuery.value.reSearchQuery
      );
    }
    etcRef.value.resetEtcState(omitEqual.value && reSearchEqual.value);
  }
};

// 검색어 유무, 검색 결과 확인
const isSearchQuery = computed(() => {
  return searchMain.value.searchQuery.trim().length > 0 && listCnt?.(0) != '0';
});
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section1">
      <div class="container">
        <AllSearch @search="search" />
        <ResearchResult @search="search" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTabs :platform-tab-show="true"
          ref="tabRef"
          :key="tabKey"
          @click="onTabChange"
          :use-history-state="true"
        >
          <CommonTabItem :title="`통합검색(${listCnt(0)})`">
            <template v-if="listCnt(0) == 0">
              <EmptyResult />
            </template>
            <template v-else>
              <TotalResult />
            </template>
          </CommonTabItem>
          <CommonTabItem :title="`서비스(${listCnt(1)})`">
            <template v-if="isSearchQuery">
              <ServiceResult ref="serviceRef" />
            </template>
            <template v-else>
              <EmptyResult />
            </template>
          </CommonTabItem>
          <CommonTabItem :title="`기관(${listCnt(2)})`">
            <template v-if="isSearchQuery">
              <PublicResult ref="instRef" />
            </template>
            <template v-else>
              <EmptyResult />
            </template>
          </CommonTabItem>
          <CommonTabItem :title="`사례(${listCnt(3)})`">
            <template v-if="isSearchQuery">
              <ExampleResult ref="caseRef" />
            </template>
            <template v-else>
              <EmptyResult />
            </template>
          </CommonTabItem>
          <CommonTabItem :title="`서식(${listCnt(4)})`">
            <template v-if="isSearchQuery">
              <FormResult ref="tmpltRef" />
            </template>
            <template v-else>
              <EmptyResult />
            </template>
          </CommonTabItem>
          <CommonTabItem :title="`기타(${listCnt(5)})`">
            <template v-if="isSearchQuery">
              <EtcResult ref="etcRef" />
            </template>
            <template v-else>
              <EmptyResult />
            </template>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/basicresult.scss';
</style>
