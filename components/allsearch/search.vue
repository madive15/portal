<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useCustomAlert } from '~/composables/useCustomAlert';

const searchStore = useSearchStore();
const {
  searchMain,
  searchAsync,
  trendList,
  recentList,
  relationList,
  menuList
} = storeToRefs(searchStore);

onBeforeMount(() => {
  searchQuery.value = searchMain.value.searchQuery;
  searchStore.trend();
  searchStore.recent();
});

const emit = defineEmits(['search']);

const { showAlert } = useCustomAlert();

// 검색 입력 포커스 상태
const isInputFocused = ref(false);

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const tabRef = inject('tabRef');

// 검색 버튼 클릭
const searchBtnClick = () => {
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    // 검색어가 있는 경우
    searchMain.value.reSearchQuery = [];
    searchAsync.value.searchQuery = '';
    if (searchMain.value.searchQuery === searchQuery.value) {
      emit('search', searchQuery.value);
    } else {
      searchMain.value.searchQuery = searchQuery.value;
    }
    if (tabRef?.value) {
      tabRef.value.activeTabIndex = 0;
    }
  } else {
    // 검색어가 없는 경우
    showAlert({
      icon: 'info',
      text: '검색어를 입력하세요.'
    });
  }
};

// 연관검색어 클릭
const clickRelationKwd = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  searchQuery.value = kwd.replace(reg, '');
  searchBtnClick();
};

// 인기검색어 키워드 필터링
const filterTrendList = computed(() =>
  trendList.value.filter((item) => item.keyword)
);

// 연관검색어/메뉴 검색
const searchRelation = (event) => {
  searchAsync.value.searchQuery = event.target.value;
};

// 인기 검색어와 최근 검색어 섹션 표시 여부
const shouldShowPopularSearches = computed(() => {
  return isInputFocused.value && searchAsync.value.searchQuery === '';
});

// 연관검색어 섹션 표시 여부
const shouldShowRelatedSearches = computed(() => {
  return searchAsync.value.searchQuery !== '';
});

watch(
  () => searchMain.value.searchQuery,
  (newValue: string) => {
    if (searchMain.value.searchQuery.trim() !== '') {
      searchQuery.value = newValue;
    }
  }
);

watch(
  () => searchAsync.value.searchQuery,
  (newValue) => {
    if (searchAsync.value.searchQuery.trim() !== '') {
      searchStore.relation();
      searchStore.menu();
    }
  }
);
</script>

<template>
  <div class="result-search-box">
    <div class="all-search-wrap">
      <div class="search-box">
        <div class="container search-container">
          <div class="search-header">
            <div class="search-area__wrap">
              <div class="search-box__header">
                <label for="all-search">
                  <span class="sr-only">검색어를 입력하세요</span>
                </label>
                <input
                  type="text"
                  class="input-search"
                  placeholder="검색어를 입력하세요"
                  id="all-search"
                  v-model="searchQuery"
                  autocomplete="off"
                  @keyup="searchRelation($event)"
                  @keyup.enter="[searchBtnClick(), $event.target.blur()]"
                  @focus="isInputFocused = true"
                  @blur="isInputFocused = false"
                />
                <button
                  type="button"
                  class="btn btn-sch"
                  title="검색"
                  @click="searchBtnClick"
                ></button>
              </div>
              <div class="search-body" v-if="shouldShowPopularSearches">
                <div class="row">
                  <div class="col-xl-6 col-12">
                    <div class="search-hit-box">
                      <div class="hit-header">
                        <strong>인기 검색어</strong>
                      </div>
                      <div class="hit-body">
                        <ul>
                          <template v-if="filterTrendList.length > 0">
                            <li
                              v-for="(list, index) in filterTrendList"
                              :key="index"
                            >
                              {{ index + 1 }}. {{ list.keyword }}
                            </li>
                          </template>
                          <template v-else>
                            <span class="text-span">
                              인기 검색어가 존재하지 않습니다.
                            </span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/customer/none.svg"
                                alt="결과가 존재하지 않습니다"
                              />
                            </span>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-6 col-12">
                    <div class="search-keyword-box">
                      <div class="keyword-header">
                        <strong>나의 최근 검색어</strong>
                      </div>
                      <div class="keyword-body">
                        <ul>
                          <template v-if="recentList.length > 0">
                            <li
                              v-for="(list, index) in recentList"
                              :key="index"
                            >
                              {{ index + 1 }}. {{ list.keyword }}
                            </li>
                          </template>
                          <template v-else>
                            <span class="text-span">
                              최근 검색어가 존재하지 않습니다.
                            </span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/customer/none.svg"
                                alt="결과가 존재하지 않습니다"
                              />
                            </span>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="search-input-keyword-body search-body"
                v-if="shouldShowRelatedSearches"
              >
                <div class="row">
                  <div class="col-xl-6 col-12">
                    <div class="link-search-box">
                      <div class="content-header">
                        <strong>연관검색어</strong>
                      </div>
                      <div class="content-body">
                        <ul>
                          <template v-if="relationList.length > 0">
                            <li
                              v-for="(list, index) in relationList"
                              :key="index"
                            >
                              <button
                                type="button"
                                @click="clickRelationKwd(list.keyword)"
                              >
                                <span
                                  class="text-span"
                                  v-html="list.keyword"
                                ></span>
                                <span class="icon-span">
                                  <img
                                    src="/image/sub/service/shortcut_blue.svg"
                                    alt="연관검색어"
                                  />
                                </span>
                              </button>
                            </li>
                          </template>
                          <template v-else>
                            <span class="text-span">
                              검색된 결과가 존재하지 않습니다.
                            </span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/customer/none.svg"
                                alt="결과가 존재하지 않습니다"
                              />
                            </span>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-12">
                    <div class="link-move-box">
                      <div class="content-header">
                        <strong>메뉴 바로가기</strong>
                      </div>
                      <div class="content-body">
                        <ul>
                          <template v-if="menuList.length > 0">
                            <li v-for="(list, index) in menuList" :key="index">
                              <NuxtLink :to="list.menuUrl" :external="true">
                                <span class="text-span" v-html="list.menuLctn">
                                </span>

                                <span class="btn move-button">
                                  <span class="title-span"> 바로가기 </span>
                                  <span class="button-icon-span">
                                    <img
                                      src="/image/sub/service/view.svg"
                                      alt="바로가기"
                                    />
                                  </span>
                                </span>
                              </NuxtLink>
                            </li>
                          </template>
                          <template v-else>
                            <span class="text-span">
                              검색된 결과가 존재하지 않습니다.
                            </span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/customer/none.svg"
                                alt="결과가 존재하지 않습니다"
                              />
                            </span>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/search';
</style>
