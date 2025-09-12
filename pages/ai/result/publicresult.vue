<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useInstitutionStore } from '~/stores/search/institution';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Loading from '~/components/allsearch/loading.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CardB from '~/components/ui/card/cardB.vue';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const institutionStore = useInstitutionStore();
const { institutionList, institutionListQuery, institutionGroupList } =
  storeToRefs(institutionStore);

// 드롭다운 메뉴 닫기
const allDropDownClose = ref(false);

const dropDownClose = () => {
  allDropDownClose.value = !allDropDownClose.value;
};

provide('allDropDownClose', allDropDownClose);
const goToPage = (page: number) => {
  dropDownClose();

  institutionListQuery.value.page = page;
  reSearch();
};

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const { showAlert } = useCustomAlert();

const detailItems = ref([]);

const resetReSearchQuery = () => {
  reSearchQuery.value = '';
  reSearchQueryList.value = [];
};

// 재검색 검색어
const reSearchQuery = ref('');
const reSearchQueryList = ref([]);

const reSearch = async () => {
  institutionListQuery.value.size = 4;
  await institutionStore.reSearchInstitutionList();
};

const instCnt = computed(() => {
  return formatComma(institutionList.value.totalElements);
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
          <template v-if="instCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <Loading />
              <div class="row list-row">
                <div
                  class="col-xl-3 col-12"
                  v-for="(inst, index) in institutionList.content"
                >
                  <CardB
                    :title="inst.instNm"
                    :textLine="4"
                    :content="inst.instSrvc"
                    dlDt="제공서비스"
                    :dlDd="inst.instSrvc"
                    :link="`/servicepvsn?instNo=${inst.instNo}`"
                    :hpUrl="inst.hpUrl"
                    :menu-items="inst.urlList"
                  />
                </div>
              </div>
            </div>
            <CommonPagenation
              :page="institutionListQuery.page"
              :size="institutionListQuery.size"
              :total-elements="institutionList.totalElements"
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
@use '~/assets/style/pages/ai/result/publicresult.scss';
</style>
