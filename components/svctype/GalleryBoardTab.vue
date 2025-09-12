<script setup lang="ts">
import type { Page } from '~/types/common';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import noGalleryImg from '~/assets/image/sub/service/gallery_box.png';

const route = useRoute();
const { instNo, gdNo } = route.query;

const query = ref({
  page: 1,
  size: 10,
  desc: 'C',
  instNo: instNo,
  keyword: '',
  bbsId: gdNo,
  defaultText: '10개씩 보기'
});

const page = ref<Page<any>>({
  content: [],
  totalElements: 0,
  totalPages: 0
});

onBeforeMount(() => {
  search();
});

const list = computed(() => {
  const pageNumber = query.value.page - 1;
  const sizeNumber = query.value.size;
  const totalElement = page.value.totalElements;

  return page.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * sizeNumber - index
  }));
});

const search = () => {
  useAxios()
    .get('/api/svc/boardList', {
      params: {
        ...query.value
      }
    })
    .then(({ data }) => {
      page.value = data;
    });
};

const movePage = (pageNumber: number) => {
  query.value.page = pageNumber;
  search();
};

const noImg = (e) => {
  e.target.src=noGalleryImg;
}
</script>

<template>
  <search-sort
    text="내용이"
    :totalElements="page.totalElements"
    :pageSize="10"
    :SortOptions="['inquiry', 'title', 'latest']"
    :keywordShow="true"
    v-model:keyword-value="query.keyword"
    v-model:size="query.size"
    v-model:desc="query.desc"
    @search="search"
  />
  <div class="gallery-box">
    <div class="row">
      <div class="col-xl-3 col-12" v-for="(item, index) in list" :key="index">
        <div class="info-box">
          <NuxtLink
            :to="`/servicepvsn/boardDetail?pstSn=${item.pstSn}&bbsId=${item.bbsId}&instNo=${instNo}`"
            :external="true"
            :title="item.pstTtl"
          >
            <div class="img-box">
              <img
                v-if="item.imgAtchFileId"
                :src="`/api/image?atchFileId=${item.imgAtchFileId}&atchFileSeq=${item.imgAtchFileSeq}`"
                @error="noImg"
              />
              <img
                v-else
                :src="noGalleryImg"
                alt="이미지 없을 때 대체"
              />
            </div>
            <div class="gallery-text-box">
              <strong>{{ item.pstTtl }}</strong>
              <span v-html="item.pstCn"></span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <CommonPagenation
    :page="query.page"
    :size="query.size"
    :total-elements="page.totalElements"
    :show-pagination-count="10"
    @change="movePage"
  />
</template>

<style scoped></style>
