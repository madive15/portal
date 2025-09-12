<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';

const lwaCtgryStore = useLwaCtgryStore();
const { useLwaCtgryListQuery, useLwaCtgryTmpltList } =
  storeToRefs(lwaCtgryStore);

const instNo = ref('I001000000');

onBeforeMount(async () => {
  useLwaCtgryListQuery.value.instNo = instNo.value;
  await lwaCtgryStore.findUseLwaCtgryTmpltList();
});

const list = computed(() => {
  const pageNumber = useLwaCtgryListQuery.value.page - 1;
  const size = useLwaCtgryListQuery.value.size;
  const totalElement = useLwaCtgryTmpltList.value.totalElements;

  return useLwaCtgryTmpltList.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * size - index
  }));
});

const findUseLwaCtgryTmpltList = () => {
  useLwaCtgryListQuery.value.page = 1;
  lwaCtgryStore.findUseLwaCtgryTmpltList();
};

const goToPage = (page: number) => {
  useLwaCtgryListQuery.value.page = page;
  lwaCtgryStore.findUseLwaCtgryTmpltList();
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="대한법률구조공단서식"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '사례/서식' },
            { text: '법률서식' },
            { text: '대한법률구조공단서식', active: true }
          ]"
        />

        <lwa-ctgry-lw-tab lwaCtgrySeCd="300" :instNo="instNo" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <search-sort
          text="서식"
          :totalElements="useLwaCtgryTmpltList.totalElements"
          :pageSize="10"
          :SortOptions="['title', 'latest']"
          :keywordShow="true"
          :resetBtnShow="false"
          v-model:keyword-type="useLwaCtgryListQuery.keywordType"
          v-model:keyword-value="useLwaCtgryListQuery.keyword"
          v-model:size="useLwaCtgryListQuery.size"
          v-model:desc="useLwaCtgryListQuery.desc"
          @search="findUseLwaCtgryTmpltList"
        />
        <lwa-ctgry-tmplt-table
          captionText="대한법률구조공단서식 - 번호, 카테고리 선택, 서식, 다운로드, 다운로드수, 등록일에 대한 표"
          :instNo="instNo"
          :dataList="list"
          @search="findUseLwaCtgryTmpltList"
        />
        <CommonPagenation
          :page="useLwaCtgryListQuery.page"
          :size="useLwaCtgryListQuery.size"
          :total-elements="useLwaCtgryTmpltList.totalElements"
          :show-pagination-count="10"
          @change="goToPage"
        />
      </div>
    </section>
  </div>
</template>
