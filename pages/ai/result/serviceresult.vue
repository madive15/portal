<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useServiceStore } from '~/stores/ai/service';
import type { ServiceListType } from '~/types/search/service';
import { DEFAULT_SERVICE } from '~/constants/search/service';
import { cloneDeep } from 'lodash-es';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Loading from '~/components/allsearch/loading.vue';
import CardA from '~/components/ui/card/cardA.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const serviceStore = useServiceStore();
const { serviceList, serviceListQuery } = storeToRefs(serviceStore);

const goToPage = (page: number) => {
  serviceListQuery.value.page = page;
  reSearch();
};

// 검색어 입력 상태
// const searchQuery = inject('searchQuery');

// 요약보기
const isExpanded = ref<boolean>(false);
const toggleExpand = (item) => {
  if (!item.expanded) {
    isExpanded.value = true;
    itemExpanded.value = item;
    serviceList.value.content.forEach((srvc) => (srvc.expanded = false));
  } else {
    isExpanded.value = false;
    itemExpanded.value = cloneDeep(DEFAULT_SERVICE);
  }

  item.expanded = !item.expanded;
};

const itemExpanded = ref<ServiceListType>(cloneDeep(DEFAULT_SERVICE));

const { showAlert } = useCustomAlert();

const detailItems = ref([]);

// 상세 옵션의 표시 여부를 관리
const isDetailVisible = ref(false);

// 재검색 검색어
const reSearchQuery = ref('');
const reSearchQueryList = ref([]);

const reSearch = async () => {
  serviceListQuery.value.size = 4;
  await serviceStore.reSearchServiceList();
};

const srvcCnt = computed(() => {
  return formatComma(serviceList.value.totalElements);
});

const removeHighlightingTag = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  return kwd.replace(reg, '');
};
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <template v-if="srvcCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="list-box">
                <Loading />
                <div class="row list-row">
                  <div
                    class="col-xl-3 col-12"
                    v-for="(srvc, index) in serviceList.content"
                  >
                    <CardA
                      :title="srvc.srvcTtl"
                      :text-line="3"
                      :content="srvc.srvcExpln"
                      dl-dt="대상자"
                      :dl-dd="srvc.trprNm"
                      dl-dt2="담당기관"
                      :dl-dd2="srvc.instNm"
                      :link="`/servicetype?srvcNo=${srvc.srvcNo}`"
                    />
                  </div>
                </div>
              </div>
            </div>
            <CommonPagenation
              :page="serviceListQuery.page"
              :size="serviceListQuery.size"
              :total-elements="serviceList.totalElements"
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
@use '~/assets/style/pages/ai/result/serviceresult.scss';
</style>
