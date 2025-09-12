<script setup lang="ts">
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useTemplateStore } from '~/stores/search/template';
import { useSearchStore } from '~/stores/search';
import { useFileStore } from '~/stores/file';
import { useLoadingStore } from '~/stores';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Loading from '~/components/allsearch/loading.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CardD from '~/components/ui/card/cardD.vue';
import dayjs from 'dayjs';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const templateStore = useTemplateStore();
const { templateList, templateListQuery, templateGroupList } =
  storeToRefs(templateStore);

const loadingStore = useLoadingStore();

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const { showAlert } = useCustomAlert();

const reSearch = async () => {
  loadingStore.incrementLoadCount();
  await templateStore.reSearchTemplateList();
  loadingStore.decrementLoadCount();
};

const goToPage = (page: number) => {
  templateListQuery.value.page = page;
  reSearch();
};

const tmpltCnt = computed(() => {
  return formatComma(templateList.value.totalElements);
});

const list = computed(() =>
  templateList.value.content.map((item) => ({
    dqId: item.dqId,
    title: item.tmpltNm,
    badge: item.tmpltClsfNm,
    date: dayjs(item.regDt, 'YYYYMMDDHHmmss').format('YYYY-MM-DD'),
    fileList: !!item.atchFileInfoStr
      ? JSON.parse(item.atchFileInfoStr).map((file) => ({
          atchFileId: item.atchFileId,
          atchFileSeq: file.atchFileSeq,
          fileName: file.orgnlFileNm,
          pdfId: file.pdfId
        }))
      : []
  }))
);
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
          <template v-if="tmpltCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="example-list-boxs file-list-boxs">
                <Loading />
                <div class="row">
                  <template v-for="tmplt in list">
                    <CardD
                      :title="tmplt.title"
                      :badge="tmplt.badge"
                      :date="tmplt.date"
                      :file-list="tmplt.fileList"
                    />
                  </template>
                </div>
              </div>
            </div>
            <CommonPagenation
              :page="templateListQuery.page"
              :size="templateListQuery.size"
              :total-elements="templateList.totalElements"
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
@use '~/assets/style/pages/ai/result/formresult.scss';
</style>
