<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useCaseStore } from '~/stores/search/case';
import { useLoadingStore } from '~/stores';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Loading from '~/components/allsearch/loading.vue';
import CardC from '~/components/ui/card/cardC.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const caseStore = useCaseStore();
const { caseList, caseListQuery } = storeToRefs(caseStore);

const loadingStore = useLoadingStore();

const goToPage = (page: number) => {
  caseListQuery.value.page = page;
  reSearch();
};

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const { showAlert } = useCustomAlert();

// 재검색 검색어
const reSearchQuery = ref('');

const reSearch = async () => {
  loadingStore.incrementLoadCount();
  caseListQuery.value.size = 3;
  await caseStore.reSearchCaseList();
  loadingStore.decrementLoadCount();
};

const caseCnt = computed(() => {
  return formatComma(caseList.value.totalElements);
});
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <template v-if="caseCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="">
                <Loading />
                <div class="card-list">
                  <template v-for="(cases, index) in caseList.content">
                    <CardC
                      :title="cases.caseTtl"
                      :badge="cases.caseClsfNm"
                      textLine="2"
                      :content="cases.caseCn"
                      dlDt="작성일"
                      :dlDd="formatDate(cases.regDt)"
                      dlDt2="조회수"
                      :dlDd2="cases.inqCnt"
                      :link="`/statuteinfo/discussion/detail?caseNo=${cases.caseNo}&ctgryNo=${cases.instNo}`"
                    />
                  </template>
                </div>
              </div>
            </div>
            <CommonPagenation
              :page="caseListQuery.page"
              :size="caseListQuery.size"
              :total-elements="caseList.totalElements"
              :show-pagination-count="10"
              @change="goToPage"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/ai/result/exampleresult.scss';
</style>
