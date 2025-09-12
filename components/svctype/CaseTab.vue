<script setup lang="ts">
import Truncatetext from '~/components/common/truncatetext.vue';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';
import Servicedepth from '~/components/service/servicedepth.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

const route = useRoute();
const query = ref({
  page: 1,
  size: 10,
  srvcNo: route.query.srvcNo,
  instNo: route.query.instNo,
  ctgryNo: '',
  keyword: '',
  desc: 'N',
  defaultText: '10개씩 보기'
});

const page = ref<Page<any>>({
  content: [],
  totalElements: 0,
  totalPages: 0
});

const list = computed(() => {
  const pageNumber = query.value.page - 1;
  const size = query.value.size;
  const totalElement = page.value.totalElements;

  return page.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * size - index
  }));
});

onBeforeMount(() => {
  search();
});

const descCase = (index) => {
  query.value.desc = index;
  search();
  // activeButton.value = index;
};

const changeCase = (e) => {
  query.value.page = 1;
  query.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  query.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.07
  // selectedItemCase.value = e.value; // 접근성 Dropdown 추가 25.04.07
  search();
};

const movePage = (pageNumber: number) => {
  query.value.page = pageNumber;
  search();
};

const search = () => {
  useAxios()
    .get('/api/svctype/svcTypeCaseList', {
      params: {
        ...query.value
      }
    })
    .then(({ data }) => {
      page.value = data;
    });
};

const detailLink = (item: any) => {
  const { gdNo, gdClsfCd, upCtgryNo, instNo, instClsfCd } = route.query;
  const gdNoParam = gdNo ? `&gdNo=${gdNo}` : '';
  const gdClsfCdParam = gdClsfCd ? `&gdClsfCd=${gdClsfCd}` : '';
  const ctgryNoParam = !!item.ctgryNo ? `&ctgryNo=${item.ctgryNo}` : '';
  const upCtgryNoParam = upCtgryNo ? `&upCtgryNo=${upCtgryNo}` : '';
  const instNoParam = instNo ? `&instNo=${instNo}` : '';
  const instClsfCdParam = instClsfCd ? `&instClsfCd=${instClsfCd}` : '';

  if (query.value.srvcNo) {
    return `/servicetype/detail?caseNo=${item.caseNo}${ctgryNoParam}&srvcNo=${query.value.srvcNo}${instNoParam}${instClsfCdParam}${gdNoParam}${gdClsfCdParam}${upCtgryNoParam}`;
  } else {
    return `/servicepvsn/detail?caseNo=${item.caseNo}${instNoParam}${instClsfCdParam}${gdNoParam}${gdClsfCdParam}`;
  }
};

const ctgrySeCd = ref('200');
const ctgryList = ref([]);
const ctgryListTopCd = ref('');
const ctgryListMaxLvl = ref(0);
const ctgryListGubunYn = ref(false);
const ctgryDefaultText = ref('전체');

const queryCtgryNoChange = (value: string) => {
  query.value.ctgryNo = value;
};

const changeCtgryList = (
  list: [],
  value: string,
  lvl: number,
  gubun: boolean
) => {
  ctgryListTopCd.value = value;
  ctgryListMaxLvl.value = lvl;
  ctgryListGubunYn.value = gubun;
  ctgryDefaultText.value = '전체';
  ctgryList.value = [{ text: '전체', value: '' }, ...list];
};

const ctgryNoChange = async (e) => {
  if (e.value === '') {
    if (ctgryListGubunYn.value) {
      if (ctgryListTopCd.value === '') {
        query.value.ctgryNo = ctgryList.value[1].topCode;
      } else {
        query.value.ctgryNo = ctgryList.value[1].upCode;
      }
    } else {
      if (ctgryListMaxLvl.value === 2) {
        if (ctgryListTopCd.value === '') {
          query.value.ctgryNo = '';
        } else {
          query.value.ctgryNo = ctgryList.value[1].upCode;
        }
      }
      if (ctgryListMaxLvl.value === 1) {
        query.value.ctgryNo = e.value;
      }
    }
  } else {
    query.value.ctgryNo = e.value;
  }
  ctgryDefaultText.value = e.text;
  await search();
};
</script>

<template>
  <div>
    <servicedepth
      v-model:lwa-ctgry-se-cd="ctgrySeCd"
      @listChange="changeCtgryList"
      @valueChange="queryCtgryNoChange"
      @search="search"
    />
    <search-sort
      text="사례가"
      :totalElements="page.totalElements"
      :pageSize="10"
      :SortOptions="['inquiry', 'title', 'latest']"
      :keywordShow="true"
      v-model:keyword-value="query.keyword"
      v-model:size="query.size"
      v-model:desc="query.desc"
      @search="search"
    />

    <!-- 반응형 모바일 개발 추가사항:리스트 -->
    <div class="common-table__list mo-visible">
      <ul>
        <li v-for="item in list">
          <span class="bx-num">{{ item.no }}</span>
          <div class="bx">
            <NuxtLink :to="detailLink(item)" :external="true">
              {{ item.caseTtl }}
            </NuxtLink>
            <div class="bx-info">
              <dl>
                <dt class="tit" v-if="ctgryList.length > 1">
                  {{ item.lwaCtgryText }}
                </dt>
                <dd>{{ item.frstRegDt.substring(0, 10) }}</dd>
                <dd>조회수 {{ item.inqCnt }}</dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--// 반응형 모바일 개발 추가사항 -->
    <div class="common-table__box pc-visible">
      <table>
        <caption>
          사례의 번호, 제목, 내용, 작성일, 조회수에 관한 표
        </caption>
        <thead>
          <tr>
            <th scope="col" class="num-th">번호</th>
            <th scope="col" class="category-th" v-if="ctgryList.length > 1">
              <div class="dropdown-area">
                <label for="dropdown">
                  <span class="sr-only">카테고리 기준 선택</span>
                </label>
                <DropdownBasic
                  class="select-type"
                  v-model="ctgryDefaultText"
                  label="전체"
                >
                  <template #default="{ close }">
                    <ul role="menu">
                      <li
                        role="menuitem"
                        tabindex="0"
                        v-for="(item, index) in ctgryList"
                        :key="index"
                        @click="
                          () => {
                            ctgryNoChange(item);
                            close();
                          }
                        "
                        :title="query.ctgryNo === item.value ? '선택됨' : ''"
                        @keydown.enter.prevent="
                          () => {
                            ctgryNoChange(item);
                            close();
                          }
                        "
                      >
                        {{ item.text }}
                      </li>
                    </ul>
                  </template>
                </DropdownBasic>
              </div>
            </th>
            <th scope="col" class="title-th">제목</th>
            <th scope="col" class="date-th">작성일</th>
            <th scope="col" class="hit-th">조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td class="num-td">
              {{ item.no }}
            </td>
            <td v-if="ctgryList.length > 1">
              {{ item.lwaCtgryText }}
            </td>
            <td class="title-td">
              <NuxtLink
                :to="detailLink(item)"
                :external="true"
                :title="item.caseTtl"
              >
                {{ item.caseTtl }}
              </NuxtLink>
            </td>
            <td class="content-td d-none">
              <NuxtLink :to="detailLink(item)" :external="true">
                <p>
                  <truncatetext :max-length="50" :text="item.caseCn" />
                </p>
              </NuxtLink>
            </td>
            <td>{{ item.frstRegDt.substring(0, 10) }}</td>
            <td>{{ item.inqCnt }}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
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
