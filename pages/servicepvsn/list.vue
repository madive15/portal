<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useSvcStore } from '~/stores/svc';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import CardB from '~/components/ui/card/cardB.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

definePageMeta({
  layout: 'service-pvsn'
});

const route = useRoute();
const router = useRouter();

const instClsfCd = route.query.instClsfCd;

const svcStore = useSvcStore();
const { svcUrl, svcTypeQuery, svcList } = storeToRefs(svcStore);

onBeforeMount(async () => {
  await svcStore.resetSvcTypeQuery();
  console.log(svcTypeQuery);
});

/*  접근성 Dropdown 추가 25.04.07 */
// const DefautText = ref('12개씩 보기');
// const selectedItem = ref('');

/*  // 접근성 Dropdown 추가 25.04.07 */

const list = computed(() => {
  const page = svcTypeQuery.value.page - 1;
  const size = svcTypeQuery.value.size;
  const totalElement = svcList.value.totalElements;
  const listAll = svcList.value.content;

  return listAll.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index
  }));
});

let isLoading = ref(true);

// isLoding lnb클릭시 잠깐 깜박이는거 안보이게...25.01.10
watch(
  () => svcTypeQuery.value.comCd,
  async () => {
    isLoading.value = true;

    //svcTypeQuery.value.comCd = query.instClsfCd;
    await useSvcStore().searchSvcList();
    isLoading.value = false;
  },
  { immediate: true }
);

const search = async () => {
  isLoading.value = true;
  svcTypeQuery.value.page = 1;
  await useSvcStore().searchSvcList();
  isLoading.value = false;
};

const changePvsn = (e) => {
  svcTypeQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  svcTypeQuery.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.07
  //selectedItem.value = e.value; // 접근성 Dropdown 추가 25.04.07
  search();
};

// const activeButton = ref(null);
const desc = (index) => {
  svcTypeQuery.value.desc = index;
  search();
  // activeButton.value = index;
};

const goToPage = (page: number) => {
  svcTypeQuery.value.page = page;
  useSvcStore().searchSvcList();
};

watch(route, async () => {
  await svcStore.resetSvcTypeQuery();
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="서비스 제공기관 목록"
          :showPrintButton="true"
          :breadcrumbItems="[{ text: '서비스 제공기관', active: true }]"
        />
      </div>
    </section>
    <!-- 검색내용이 없을때는 게시판의 검색내용이 없다는 코드를 넣어주세요. -->
    <section class="section2">
      <div class="content-header">
        <search-sort
          text="서비스 제공기관이"
          :totalElements="svcList.totalElements"
          :pageSize="12"
          :SortOptions="['inquiry', 'title', 'latest']"
          :keywordShow="true"
          v-model:keyword-type="svcTypeQuery.keywordType"
          v-model:keyword-value="svcTypeQuery.instNm"
          v-model:size="svcTypeQuery.size"
          v-model:desc="svcTypeQuery.desc"
          @search="search"
        />
      </div>
      <div class="content-body" v-if="list && list.length > 0">
        <div class="service-box">
          <div class="card-list">
            <CardB
              v-for="(item, index) in list"
              :key="index"
              :title="item.instNm"
              textLine="4"
              :content="item.instInfo"
              dlDt="제공서비스"
              :dlDd="item.instSvc"
              :link="`/servicepvsn?instNo=${item.instNo}&instClsfCd=${instClsfCd}`"
              :hpUrl="item.hpUrl"
              :menuItems="item.urls"
            />
          </div>
          <CommonPagenation
            :page="svcTypeQuery.page"
            :size="svcTypeQuery.size"
            :total-elements="svcList.totalElements"
            :show-pagination-count="10"
            @change="goToPage"
          />
        </div>
      </div>
      <div class="board-list-box" v-if="!isLoading && list.length <= 0">
        <div class="board-empty-box">
          <div class="img-box">
            <img src="/image/sub/customer/none.svg" alt="" />
          </div>
          <div class="text-box">
            <p>검색된 결과가 존재하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 검색 결과가 존재하지 않을때-->
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/servicepvsn/list.scss';
</style>
