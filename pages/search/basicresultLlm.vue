<script setup lang="ts">
import ServiceResult from '~/pages/ai/result/serviceresult.vue';
import FormResult from '~/pages/ai/result/formresult.vue';
import PublicResult from '~/pages/ai/result/publicresult.vue';
import ExampleResult from '~/pages/ai/result/exampleresult.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import { storeToRefs } from 'pinia';
import { provide, ref } from 'vue';
import { useAiStore } from '~/stores/ai';
import { useCaseStore } from '~/stores/ai/case';
import { useServiceStore } from '~/stores/ai/service';
import { useTemplateStore } from '~/stores/ai/template';
import { useInstitutionStore } from '~/stores/ai/institution';

const AiStore = useAiStore();
const { message, llm, autocomplete, satisfaction } = storeToRefs(AiStore);

const serviceStore = useServiceStore();
const { serviceList, serviceListQuery } = storeToRefs(serviceStore);

const institutionStore = useInstitutionStore();
const { institutionList, institutionListQuery } = storeToRefs(institutionStore);

const caseStore = useCaseStore();
const { caseList, caseListQuery } = storeToRefs(caseStore);

const templateStore = useTemplateStore();
const { templateList, templateListQuery } = storeToRefs(templateStore);

/**
 * Llm 조회 로직
 */
const getAiStore = async () => {
  autocomplete.value.query = message.value.query;
  caseStore.resetCaseListQuery();
  serviceStore.resetServiceListQuery();
  templateStore.resetTemplateListQuery();
  institutionStore.resetInstitutionListQuery();
  caseListQuery.value.searchQuery = message.value.query;
  serviceListQuery.value.searchQuery = message.value.query;
  templateListQuery.value.searchQuery = message.value.query;
  institutionListQuery.value.searchQuery = message.value.query;
  await AiStore.getAutocomplete();
  await AiStore.getMessage();

  message.value.query = '';
  autocomplete.value.query = '';
};

watch(
  () => caseListQuery.value.searchQuery,
  async () => {
    await caseStore.searchCaseList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => serviceListQuery.value.searchQuery,
  async () => {
    await serviceStore.searchServiceList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => templateListQuery.value.searchQuery,
  async () => {
    await templateStore.searchTemplateList();
    tabKey.value = generateCryptoKey();
  }
);

watch(
  () => institutionListQuery.value.searchQuery,
  async () => {
    await institutionStore.searchInstitutionList();
    tabKey.value = generateCryptoKey();
  }
);

/**
 * 검색 버튼 클릭 시 호출되는 함수
 */
const handleSearch = () => {
  if (!message.value.query) {
    return;
  }

  getAiStore();
};

function generateCryptoKey() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
const tabKey = ref(generateCryptoKey());

const listCnt = (index: number) => {
  let serviceCnt = serviceList.value.totalElements;
  let caseCnt = caseList.value.totalElements;
  let templateCnt = templateList.value.totalElements;
  let institutionCnt = institutionList.value.totalElements;
  switch (index) {
    case 0:
      return formatComma(serviceCnt);
    case 1:
      return formatComma(institutionCnt);
    case 2:
      return formatComma(caseCnt);
    case 3:
      return formatComma(templateCnt);
  }
};

provide('listCnt', listCnt);

// 드롭다운 메뉴 닫기
const allDropDownClose = ref(false);

const dropDownClose = () => {
  allDropDownClose.value = !allDropDownClose.value;
};

provide('allDropDownClose', allDropDownClose);

const onTabChange = (index: number) => {
  dropDownClose();
};
</script>

<template>
  <div class="all-search-wrap">
    <div class="search-box">
      <div class="container search-container">
        <div class="search-header">
          <div class="input-box input-group">
            <input
              class="form-control search-input"
              id="all-search"
              placeholder="궁금하신 사항을 자유롭게 입력해주세요."
              v-model="message.query"
              @keyup.enter="handleSearch"
            />
            <button class="btn search-button" @click="handleSearch">
              <img
                src="/image/sub/search/gnb_search_wh.svg"
                alt="통합검색 검색"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sub-content-box" id="ai-result-box">
    <div class="right-content-box">
      <section class="section1">
        <div class="container">
          <div class="tab-box">
            <h4>
              <b>{{ caseListQuery.searchQuery }}</b> 검색결과
            </h4>
            <Tab :key="tabKey" @click="onTabChange">
              <TabItem :title="`서비스(${listCnt(0)})`">
                <ServiceResult />
              </TabItem>
              <TabItem :title="`기관(${listCnt(1)})`">
                <PublicResult />
              </TabItem>
              <TabItem :title="`사례(${listCnt(2)})`">
                <ExampleResult />
              </TabItem>
              <TabItem :title="`서식(${listCnt(3)})`">
                <FormResult />
              </TabItem>
            </Tab>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/basicresultLlm.scss';
</style>
