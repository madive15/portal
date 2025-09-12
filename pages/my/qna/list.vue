<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Boardsearch from '~/components/search/boardsearch.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import { useBoardArticleStore } from '~/stores/bbs';
import { storeToRefs } from 'pinia';
import { useCommonCodeStore } from '~/stores';
import { cloneDeep } from 'lodash-es';
import { useLoginStore } from '~/stores/login';
import { computed } from 'vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonTableTypeF from '~/components/ui/table/tabletypeF.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import { useAxios } from '~/composables/useAxios';

const route = useRoute();
const router = useRouter();
const baTypeOptions =
  await useCommonCodeStore().searchCommonCodeList('QNA_TYPE');
const num = ref({
  start: 0,
  end: 0
});
const boardArticleStore = useBoardArticleStore();
const { myAnswerList, boardListQuery, boardConfig } =
  storeToRefs(boardArticleStore);
onBeforeMount(async () => {
  boardListQuery.value = cloneDeep({
    ...boardListQuery.value,
    bcId: '200000',
    baType: '',
    selectKey: '0',
    keyword: '',
    page: 1
  });

  boardConfig.value = {
    ...boardConfig.value,
    bcId: '200000'
  };

  if (!!route.path) {
    await boardArticleStore.searchBoardConfig(route.path);
  }

  await boardArticleStore.searchBoardMyAnswerList();
});

const categoryName = (baType: string) => {
  return baTypeOptions.find((item) => item.value === baType)?.label;
};

const list = computed(() => {
  const page = boardListQuery.value.page - 1;
  //const size = boardListQuery.value.size;
  const size = 10;
  const totalElement = myAnswerList.value.totalElements;

  return myAnswerList.value.content.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index
  }));
});

const movePage = async () => {
  router.push('/center/qna', { external: true });
  /*
  console.log(1111);
  const { data } = await useAxios().get('/api/board/test', {
    params: {
      start: num.value.start,
      end: num.value.end
    }
  });
   */
};

const goToPage = async (page: number) => {
  boardListQuery.value.page = page;
  await useBoardArticleStore().searchBoardMyAnswerList();
};
</script>

<template>
  <div class="sub-wrap" id="board-list">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <Breadcrumb
            breadcrumb-title="마이페이지"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '마이페이지' },
              { text: '나의 문의내역', active: true }
            ]"
          />
          <my-tab />
          <boardsearch />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-list-box" v-if="list.length > 0">
            <div class="top-list-box">
              <strong>전체 {{ myAnswerList.totalElements }}건</strong>
              <!--
              <input
                type="text"
                class="input-search"
                id="search"
                placeholder="검색어를 입력해 주세요."
                v-model="num.start"
              />
              <input
                type="text"
                class="input-search"
                id="search"
                placeholder="검색어를 입력해 주세요."
                v-model="num.end"
              />
              -->
              <CommonButton
                title="문의하기"
                variants="primary"
                @click="movePage"
              >
                <span class="text">문의하기</span>
              </CommonButton>
            </div>
            <!--            <div class="board-list-lists-box mo-only">-->
            <!--              <ul>-->
            <!--                <li v-for="(board, index) in list">-->
            <!--                  <div class="lists-item">-->
            <!--                    <div class="row-number">{{ board.no }}</div>-->
            <!--                    <div class="row-content">-->
            <!--                      <div class="content-text">-->
            <!--                        <div class="text-box">-->
            <!--                          <NuxtLink-->
            <!--                            :to="`/my/qna/detail?baId=${board.baId}`"-->
            <!--                            :external="true"-->
            <!--                          >-->
            <!--                            {{ board.baTitle }}-->
            <!--                          </NuxtLink>-->
            <!--                        </div>-->
            <!--                      </div>-->
            <!--                      <div class="content-info">-->
            <!--                        <div class="info-box">-->
            <!--                          <span class="col">-->
            <!--                            <span class="em">{{-->
            <!--                              categoryName(board.baType)-->
            <!--                            }}</span>-->
            <!--                          </span>-->
            <!--                          <span class="col">{{-->
            <!--                            board.frstRegDt.substring(0, 10)-->
            <!--                          }}</span>-->
            <!--                          <span class="col">-->
            <!--                            <span class="complete" v-if="board.baAnswerYn == 1"-->
            <!--                              >답변완료</span-->
            <!--                            >-->
            <!--                            <span class="wait" v-else>답변 대기</span>-->
            <!--                          </span>-->
            <!--                        </div>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </div>-->

            <!--            <div class="board-list-table-box pc-only">-->
            <!--              <table>-->
            <!--                <caption>-->
            <!--                  나의 문의내역의 번호, 분류, 제목, 등록일, 답변에 관한 표-->
            <!--                </caption>-->
            <!--                <thead>-->
            <!--                  <tr>-->
            <!--                    <th scope="col" class="num-th">번호</th>-->
            <!--                    <th scope="col" class="category-th">분류</th>-->
            <!--                    <th scope="col" class="title-th">제목</th>-->
            <!--                    <th scope="col" class="date-th">등록일</th>-->
            <!--                    <th scope="col" class="hit-th">답변</th>-->
            <!--                  </tr>-->
            <!--                </thead>-->
            <!--                <tbody>-->
            <!--                  <tr v-for="(board, index) in list">-->
            <!--                    <td class="num-td">{{ board.no }}</td>-->
            <!--                    <td class="category-td">-->
            <!--                      <span class="active-span">-->
            <!--                        {{ categoryName(board.baType) }}-->
            <!--                      </span>-->
            <!--                    </td>-->
            <!--                    <td class="title-td">-->
            <!--                      <NuxtLink-->
            <!--                        :to="`/my/qna/detail?baId=${board.baId}`"-->
            <!--                        :external="true"-->
            <!--                        :title="board.baTitle"-->
            <!--                      >-->
            <!--                        {{ board.baTitle }}-->
            <!--                      </NuxtLink>-->
            <!--                    </td>-->
            <!--                    <td class="date-td">-->
            <!--                      {{ board.frstRegDt.substring(0, 10) }}-->
            <!--                    </td>-->
            <!--                    <td class="hit-td" v-if="board.baAnswerYn == 1">-->
            <!--                      답변완료-->
            <!--                    </td>-->
            <!--                    <td class="hit-td" v-else>답변 대기</td>-->
            <!--                  </tr>-->
            <!--                </tbody>-->
            <!--              </table>-->
            <!--            </div>-->
            <div class="common-table__box pc-visible">
              <CommonTable>
                <caption>
                  표 설명
                </caption>
                <thead>
                  <tr>
                    <th scope="col" class="num-th">번호</th>
                    <th scope="col" class="category-th">분류</th>
                    <th scope="col" class="title-th">제목</th>
                    <th scope="col" class="date-th">등록일</th>
                    <th scope="col" class="comment-th">답변</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(board, index) in list">
                    <td class="num-td">{{ board.no }}</td>
                    <td>{{ categoryName(board.baType) }}</td>
                    <td class="title-td">
                      <NuxtLink
                        :to="`/my/qna/detail?baId=${board.baId}`"
                        :title="board.baTitle"
                      >
                        {{ board.baTitle }}
                      </NuxtLink>
                    </td>
                    <td>{{ board.frstRegDt.substring(0, 10) }}</td>
                    <td class="comment-th" v-if="board.baAnswerYn == 1">
                      답변 완료
                    </td>
                    <td class="comment-th" v-else>답변 대기</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </CommonTable>
            </div>
            <div class="common-table__list mo-visible">
              <ul>
                <li v-for="(board, index) in list">
                  <span class="bx-num">{{ board.no }}</span>
                  <div class="bx">
                    <a
                      :href="`/my/qna/detail?baId=${board.baId}`"
                      class="text-title"
                      >{{ board.baTitle }}</a
                    >
                    <div class="bx-info">
                      <dl>
                        <dt class="tit">{{ categoryName(board.baType) }}</dt>
                        <dd>{{ board.frstRegDt.substring(0, 10) }}</dd>
                        <dd v-if="board.baAnswerYn == 1">답변완료</dd>
                        <dd v-else>답변대기</dd>
                      </dl>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <CommonPagenation
              :page="boardListQuery.page"
              :size="boardListQuery.size"
              :total-elements="myAnswerList.totalElements"
              :show-pagination-count="10"
              @change="goToPage"
            />
          </div>

          <!-- 검색 결과가 존재하지 않을때-->
          <div class="board-list-box" v-else>
            <div class="top-list-box">
              <strong>　</strong>
              <button class="btn write-button" @click="movePage">
                문의하기
              </button>
            </div>
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
@use '~/assets/style/pages/my/qna/list.scss';
</style>
