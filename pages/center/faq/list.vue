<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Boardsearch from '~/components/search/boardsearch.vue';
import Tabitem from '~/components/tab/tabitem.vue';
import Tab from '~/components/tab/tab.vue';
import { useCommonCodeStore } from '~/stores/';
import { useBoardArticleStore } from '~/stores/bbs';
import { DownloadUtils } from '~/utils/DownloadUtils';
import { useFileStore } from '~/stores/file';
import { cloneDeep } from 'lodash-es';
import type { GridCodeType } from '~/types';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import { ref } from 'vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import { TAB_RESULT } from '~/constants/dropdown';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonTable from '~/components/ui/table/tables.vue';

const router = useRouter();
const route = useRoute();

const boardArticleStore = useBoardArticleStore();
const fileStore = useFileStore();
const { boardConfig, boardTabList, boardList, boardListQuery } =
  storeToRefs(boardArticleStore);

boardListQuery.value.bcId = '300000'; //FAQ ::FIXME
boardListQuery.value.baType = ''; //카테고리 ::FIXME

boardConfig.value = cloneDeep({
  ...boardConfig.value,
  bcId: boardListQuery.value.bcId
});

const [baTypeOptions] = await Promise.all<
  Promise<GridCodeType[]> | Promise<void>
>([
  useCommonCodeStore().searchCommonCodeList('FAQ_TYPE'),
  useBoardArticleStore().searchBoardConfig(route.path),
  useBoardArticleStore().searchBoardTabList('FAQ_TYPE'),
  useBoardArticleStore().searchBoardArticleList(
    Number(boardListQuery.value.bcId)
  )
]);

const selectedTab = ref(0);

const onTabChange = (index: number) => {
  const currentTab = tabs.value[index];
  boardListQuery.value.baType = currentTab.codeId;
  boardListQuery.value.page = 1;
  boardArticleStore.searchBoardArticleList(Number(boardListQuery.value.bcId));
};

const list = computed(() => {
  const page = boardListQuery.value.page - 1;
  const size = boardListQuery.value.size;
  const totalElement = boardList.value.totalElements;

  return boardList.value.content.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index
  }));
});

const tabs = computed(() => {
  return boardTabList.value.reduce((acc, tab) => {
    if (acc.length === 0) {
      acc.push({
        codeId: '',
        codeName: '전체',
        baCnt: 0
      });
    }

    acc[0].baCnt += tab.baCnt;

    acc.push(tab);

    return acc;
  }, []);
});

const categoryName = (baType: string) => {
  return baTypeOptions.find((item) => item.value === baType)?.label;
};

const goToPage = (page: number) => {
  boardListQuery.value.page = page;
  boardArticleStore.searchBoardArticleList(Number(boardListQuery.value.bcId));
};

const downloadFile = async (atchFileId: string) => {
  const { data } = await fileStore.download(atchFileId);
  DownloadUtils.download(data);
};

onUnmounted(() => {
  boardArticleStore.resetBoardArticle();
});

const dropdownCategory = ref('자주찾는 질문');

const activeIndex = ref<number | null>(1);
function setActive(index: number) {
  activeIndex.value = index;
}
</script>

<!-- 자주하는질문 페이지도 공지사항과 리스트,상세페이지가 동일하여 제작하지는 않았습니다. -->
<template>
  <div class="sub-wrap" id="board-list">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!-- breadcrumb에서 :showPrintButton=true일시 인쇄하기 버튼이 보입니다. -->
          <Breadcrumb
            breadcrumb-title="고객센터"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '고객센터' },
              { text: '자주찾는 질문' },
              { text: '자주찾는 질문', active: true }
            ]"
          />
          <div class="common-category__button">
            <div class="btn-select__wrap mo-visible">
              <DropdownBasic class="select-type" v-model="dropdownCategory">
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      v-for="(tab, index) in TAB_RESULT"
                      :key="index"
                      @click="select(tab.label)"
                      @keydown.enter.prevent="select(tab.label)"
                    >
                      <router-link :to="tab.link" class="btn-auto">
                        {{ tab.label }}
                      </router-link>
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
            <div class="btn-tab__wrap-gap pc-visible">
              <router-link
                v-for="(tab, index) in TAB_RESULT"
                :to="tab.link"
                class="btn-auto"
                :class="{ active: activeIndex === index }"
                @click="setActive(index)"
                >{{ tab.label }}</router-link
              >
            </div>
          </div>
          <boardsearch />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <CommonTabs :platform-tab-show="true" @click="onTabChange">
            <CommonTabItem
              v-for="tab in tabs"
              :key="tab.codeId"
              :title="`${tab.codeName} ${tab.baCnt}건`"
            />
          </CommonTabs>
          <div class="board-list-box" v-if="list.length > 0">
            <div class="common-table__box pc-visible">
              <CommonTable>
                <caption>
                  자주찾는질문 - 번호, 분류, 제목, 첨부, 작성일, 조회수에 대한
                  표
                </caption>
                <thead>
                  <tr>
                    <th scope="col" class="num-th">번호</th>
                    <th scope="col" class="category-th">분류</th>
                    <th scope="col" class="title-th">제목</th>
                    <th scope="col">첨부</th>
                    <th scope="col" class="date-th">작성일</th>
                    <th scope="col" class="hit-th">조회수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(board, index) in list">
                    <td class="num-td">
                      <span class="icon-notice" v-if="board.baNotice">
                        <img
                          src="~/assets/image/sub/center/center_notice.svg"
                          alt="공지"
                        />
                      </span>
                      <span v-else>{{ board.no }}</span>
                    </td>
                    <td class="category-td">
                      <span class="active-span" v-if="board.baNotice">
                        {{ categoryName(board.baType) }}
                      </span>
                      <span v-else>{{ categoryName(board.baType) }}</span>
                    </td>
                    <td class="title-td">
                      <NuxtLink
                        :to="`/center/faq/detail?baId=${board.baId}`"
                        title="자주찾는 질문 상세 페이지로 이동"
                        :external="true"
                      >
                        {{ board.baTitle }}
                      </NuxtLink>
                    </td>
                    <td class="file-td">
                      <span v-if="!board.atchFileId">-</span>
                      <button
                        v-else
                        class="btn download-button"
                        @click="() => downloadFile(board.atchFileId)"
                        :title="`${board.baTitle} 관련 첨부파일 다운로드`"
                      >
                        <img
                          :key="`image-${index}`"
                          :src="`/image/sub/customer/file.svg`"
                          alt=""
                        />
                      </button>
                    </td>
                    <td class="date-td">
                      {{ board.frstRegDt.substring(0, 10) }}
                    </td>
                    <td class="hit-td">{{ board.baHit }}</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </CommonTable>
            </div>

            <div class="common-table__list mo-visible">
              <ul>
                <li v-for="(board, index) in list">
                  <span class="bx-num">
                    <span class="icon-notice" v-if="board.baNotice">
                      <img
                        src="~/assets/image/sub/center/center_notice.svg"
                        alt="공지"
                      />
                    </span>
                    <span v-else>{{ board.no }}</span>
                  </span>
                  <div class="bx">
                    <a
                      :href="`/center/faq/detail?baId=${board.baId}`"
                      class="text-title"
                      >{{ board.baTitle }}</a
                    >
                    <div class="bx-info">
                      <dl>
                        <dt class="tit" v-if="board.baNotice">
                          {{ categoryName(board.baType) }}
                        </dt>
                        <dt v-else>{{ categoryName(board.baType) }}</dt>
                        <dd>{{ board.frstRegDt.substring(0, 10) }}</dd>
                        <dd>조회수 {{ board.baHit }}</dd>
                      </dl>
                    </div>
                    <div class="bx-btn">
                      <button
                        class="btn-attach"
                        title="첨부파일 다운로드"
                        v-if="board.atchFileId"
                        @click="() => downloadFile(board.atchFileId)"
                      >
                        <img
                          src="/image/sub/customer/file.svg"
                          alt="파일 다운로드"
                          :key="`image-${index}`"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <CommonPagenation
              :page="boardListQuery.page"
              :size="boardListQuery.size"
              :total-elements="boardList.totalElements"
              :show-pagination-count="10"
              @change="goToPage"
            />
          </div>

          <div class="board-list-box" v-else>
            <div class="board-empty-box">
              <div class="img-box">
                <img
                  src="/image/sub/customer/none.svg"
                  alt="결과가 존재하지 않습니다"
                />
              </div>
              <div class="text-box">
                <p>검색된 결과가 존재하지 않습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/faq/list.scss';
</style>
