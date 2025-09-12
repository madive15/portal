<script setup lang="ts">
import type { Page } from '~/types/common';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import { useFileStore } from '~/stores/file';

const route = useRoute();
const { instNo, instClsfCd, gdClsfCd, gdNo } = route.query;
const fileStore = useFileStore();

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

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const moveDetail = (item: any) => {
  const params = new URLSearchParams();
  if (instClsfCd) {
    params.append('instClsfCd', instClsfCd);
  }

  if (gdClsfCd) {
    params.append('gdClsfCd', gdClsfCd);
  }

  params.append('instNo', instNo);
  params.append('gdNo', gdNo);
  params.append('pstSn', item.pstSn);
  params.append('bbsId', item.bbsId);

  return `/servicepvsn/boardDetail?${params.toString()}`;
};
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
  <div class="board-list-table-box">
    <!-- 반응형 모바일 개발 추가사항:리스트 -->
    <div class="board-list-lists-box mo-only">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="lists-item">
            <div class="row-number">{{ item.no }}</div>
            <div class="row-content">
              <div class="content-text">
                <div class="text-box">
                  <NuxtLink :to="moveDetail(item)" :external="true">
                    {{ item.pstTtl }}
                  </NuxtLink>
                </div>
              </div>
              <div class="content-info">
                <div class="info-box">
                  <span class="col">{{ item.frstRegDt }}</span>
                  <span class="col"
                    >조회수 <strong>{{ item.pstInqCnt }}</strong></span
                  >
                </div>
              </div>
              <div class="content-btn">
                <div class="btn-box">
                  <button
                    type="button"
                    v-if="!!item.atchFileId"
                    @click="() => download(item.atchFileId, item.atchFileSeq)"
                  >
                    <img
                      src="/image/sub/customer/file.svg"
                      alt="게시판 파일첨부"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--// 반응형 모바일 개발 추가사항 -->
    <table class="pc-only">
      <caption>
        번호, 제목, 첨부, 작성일, 조회수에 관한 표
      </caption>
      <thead>
        <tr>
          <th scope="col" class="num-th">번호</th>
          <th scope="col" class="title-th">제목</th>
          <th scope="col" class="file-th">첨부</th>
          <th scope="col" class="date-th">작성일</th>
          <th scope="col" class="hit-th">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td class="num-td">{{ item.no }}</td>
          <td class="title-td">
            <NuxtLink
              :to="moveDetail(item)"
              :external="true"
              :title="item.pstTtl"
            >
              {{ item.pstTtl }}
            </NuxtLink>
          </td>
          <!-- 파일이 있을때 파일 아이콘이 나옵니다. -->
          <td class="file-td">
            <button
              type="button"
              v-if="!!item.atchFileId"
              @click="() => download(item.atchFileId, item.atchFileSeq)"
            >
              <img src="/image/sub/customer/file.svg" alt="게시판 파일첨부" />
            </button>
          </td>
          <td class="date-td">{{ item.frstRegDt }}</td>
          <td class="hit-td">{{ item.pstInqCnt }}</td>
        </tr>
      </tbody>
    </table>
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
