<script setup lang="ts">
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';
import CardA from '~/components/ui/card/cardA.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const route = useRoute();
const { instNo, instClsfCd, gdNo, gdClsfCd } = route.query;

const query = ref({
  page: 1,
  size: 12,
  srchExcpYn: true,
  desc: 'C',
  instNo: instNo,
  instNm: '',
  defaultText: '12개씩 보기'
});

const page = ref<Page<any>>({
  content: [],
  totalElements: 0,
  totalPages: 0
});

const selected = ref({});

onBeforeMount(() => {
  search();
});

const list = computed(() => {
  const pageNumber = query.value.page - 1;
  const sizeNumber = query.value.size;
  const totalElement = page.value.totalElements;

  const isExpanded = ref(false);
  return page.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * sizeNumber - index,
    isExpanded: isExpanded.value
  }));
});

const search = () => {
  useAxios()
    .get('/api/svc/srvcList', {
      params: {
        ...query.value
      }
    })
    .then(({ data }) => {
      page.value = data;
    });
};

const changeDropdown = (item) => {
  query.value.page = 1;
  query.value.size = item.value; // 접근성 Dropdown 수정 25.04.07
  query.value.defaultText = item.text;

  search();
};

const toggleExpand = (item) => {
  item.isExpanded = !item.isExpanded;
  selected.value = item;
};

const movePage = (pageNumber: number) => {
  query.value.page = pageNumber;
  search();
};
</script>

<template>
  <search-sort
    text="서비스가"
    :totalElements="page.totalElements"
    :pageSize="12"
    :SortOptions="['inquiry', 'title', 'latest']"
    :keywordShow="true"
    v-model:keyword-value="query.instNm"
    v-model:size="query.size"
    v-model:desc="query.desc"
    @search="search"
  />

  <div class="list-box">
    <div class="card-list">
      <CardA
        v-for="(item, index) in list"
        :key="item.srvcTtl"
        :title="item.srvcTtl"
        textLine="3"
        :content="item.srvcExpln"
        dlDt="대상자"
        :dlDd="item.trprNm"
        dlDt2="담당기관"
        :dlDd2="$instNmOverride(item.instNm, item.instNo, item.srvcNo)"
        :link="`/servicetype?srvcNo=${item.srvcNo}&instNo=${instNo}&instClsfCd=${instClsfCd}`"
      >
        <button
          class="btn priview-button d-none"
          :id="item.isExpanded"
          :class="{ active: item.isExpanded == selected }"
          @click="() => toggleExpand(item)"
        >
          <span class="text-span">{{
            item.isExpanded ? '요약닫기' : '요약보기'
          }}</span>
          <span class="icon-span">
            <img
              v-if="!item.isExpanded"
              src="/image/sub/service/summation_down.svg"
              alt=""
            />
            <img
              v-if="item.isExpanded"
              src="/image/sub/service/summation_up.svg"
              alt=""
            />
          </span>
        </button>

        <div
          v-if="item.isExpanded"
          class="col-xl-12 col-12 none-col"
          :class="{ active: item.isExpanded }"
        >
          <!-- 요약보기 클릭시 나오는 내용 -->
          <div class="inner-box">
            <div class="inner-header">
              <strong>{{
                $instNmOverride(item.instNm, item.instNo, item.srvcNo)
              }}</strong>
              <NuxtLink
                :to="`/servicepvsn?instNo=${item.instNo}`"
                class="btn information-button"
                :external="true"
              >
                <span class="text-span">기관안내 자세히보기</span>
                <span class="icon-span">
                  <img
                    src="/image/sub/service/view.svg"
                    alt="기관안내 자세히보기"
                  />
                </span>
              </NuxtLink>
            </div>
            <div class="inner-body">
              <div class="row">
                <div
                  v-if="item.trprNm != null"
                  class="col-xl-4 col-12 inner-col"
                >
                  <div class="info-box">
                    <dl>
                      <dt>대상자</dt>
                      <dd>{{ item.trprNm }}</dd>
                    </dl>
                  </div>
                </div>

                <div
                  v-if="item.rgnNmInst != null"
                  class="col-xl-4 col-12 inner-col"
                >
                  <div class="info-box">
                    <dl>
                      <dt>지역</dt>
                      <dd>{{ item.rgnNmInst }}</dd>
                    </dl>
                  </div>
                </div>

                <div
                  v-if="item.trprCtgry != null"
                  class="col-xl-4 col-12 inner-col"
                >
                  <div class="info-box">
                    <dl>
                      <dt>서비스 유형</dt>
                      <dd>{{ item.trprCtgry }}</dd>
                    </dl>
                  </div>
                </div>

                <div v-if="item.mth != null" class="col-xl-4 col-12 inner-col">
                  <div class="info-box">
                    <dl>
                      <dt>이용방법</dt>
                      <dd>{{ item.mth }}</dd>
                    </dl>
                  </div>
                </div>

                <div
                  v-if="item.caseCnt != 0 || item.tmpltCnt != 0"
                  class="col-xl-4 col-12 inner-col template-col"
                >
                  <div class="info-box">
                    <dl>
                      <dt>사례/서식</dt>
                      <dd>관련 사례 {{ item.caseCnt }}건</dd>
                      <dd>관련 서식 {{ item.tmpltCnt }}건</dd>
                    </dl>
                  </div>
                </div>

                <div class="col-xl-4 col-12 inner-col link-col">
                  <div class="info-box">
                    <dl>
                      <dt>바로가기</dt>
                      <dd>
                        <dropbutton
                          button-text="관련기관 페이지"
                          :menuItems="item.urls"
                        />
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardA>
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
