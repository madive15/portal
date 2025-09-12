<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';

const route = useRoute();
const lwaCtgryStore = useLwaCtgryStore();
const { useLwaCtgryListQuery, useLwaCtgryCaseList } =
  storeToRefs(lwaCtgryStore);

const clsfCtgryNo = ref('2I001000002000000000');

onBeforeMount(async () => {
  useLwaCtgryListQuery.value.upCtgryNo = clsfCtgryNo.value;

  const keys = Object.keys(route.query);
  for (const key of keys) {
    useLwaCtgryListQuery.value[key] =
      typeof useLwaCtgryListQuery.value[key] === 'number'
        ? Number(route.query[key])
        : route.query[key];
  }

  await lwaCtgryStore.findUseLwaCtgryCaseList();
});

const list = computed(() => {
  const pageNumber = useLwaCtgryListQuery.value.page - 1;
  const size = useLwaCtgryListQuery.value.size;
  const totalElement = useLwaCtgryCaseList.value.totalElements;

  return useLwaCtgryCaseList.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * size - index
  }));
});

const findUseLwaCtgryCaseList = async () => {
  useLwaCtgryListQuery.value.page = 1;
  await lwaCtgryStore.findUseLwaCtgryCaseList();
};

const goToPage = (page: number) => {
  useLwaCtgryListQuery.value.page = page;
  lwaCtgryStore.findUseLwaCtgryCaseList();
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="법률구조사례"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '사례/서식' },
            { text: '법률사례' },
            { text: '법률구조사례', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2 mt-4">
      <div class="container">
        <search-sort
          :keywordTypeItems="[
            { value: 'title', text: '제목' },
            { value: 'content', text: '내용' },
            { value: '', text: '제목+내용' }
          ]"
          text="사례가"
          :totalElements="useLwaCtgryCaseList.totalElements"
          :pageSize="10"
          :SortOptions="['inquiry', 'title', 'latest']"
          :keywordShow="true"
          :resetBtnShow="true"
          v-model:keyword-type="useLwaCtgryListQuery.keywordType"
          v-model:keyword-value="useLwaCtgryListQuery.keyword"
          v-model:size="useLwaCtgryListQuery.size"
          v-model:desc="useLwaCtgryListQuery.desc"
          @search="findUseLwaCtgryCaseList"
        />
        <lwa-ctgry-case-table
          captionText="법률상담사례 - 번호, 카테고리 선택, 제목, 작성일, 조회수에 대한 표"
          :clsfCtgryNo="clsfCtgryNo"
          :dataList="list"
          @search="findUseLwaCtgryCaseList"
        />
        <CommonPagenation
          :page="useLwaCtgryListQuery.page"
          :size="useLwaCtgryListQuery.size"
          :total-elements="useLwaCtgryCaseList.totalElements"
          :show-pagination-count="10"
          @change="goToPage"
        />
      </div>
    </section>
  </div>
</template>
