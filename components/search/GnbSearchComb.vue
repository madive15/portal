<script setup lang="ts">
import { computed, ref } from 'vue';
import { throttle } from 'lodash-es';
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
  searchStore.trend();
  searchStore.recent();
});

const route = useRoute();
const router = useRouter();

const emit = defineEmits(['close']);

const { showAlert } = useCustomAlert();

// Alert 메시지 표시
const showWarning = throttle(() => {
  // message.warning('검색어를 입력하세요');
  showAlert({
    icon: 'warning',
    text: '검색어를 입력하세요.',
    confirmButtonText: '확인'
  });
}, 3000);

// 검색 입력 포커스 상태
const isInputFocused = ref(false);

// 검색어 입력 상태
const searchQuery = ref('');

// 검색 버튼 클릭
const searchBtnClick = () => {
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    // 검색어가 있는 경우
    searchMain.value.searchQuery = searchQuery.value;
    searchMain.value.reSearchQuery = [];
    searchAsync.value.searchQuery = '';

    if (route.path === `/search/basicresult`) {
      emit('close');
      return;
    } else {
      emit('close');
      router.push(`/search/basicresult`, { external: true });
    }
  } else {
    // 검색어가 없는 경우
    showWarning();
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
        title="통합 검색"
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
                  <li v-for="(list, index) in filterTrendList" :key="index">
                    {{ index + 1 }}. {{ list.keyword }}
                  </li>
                </template>
                <template v-else>
                  <span class="text-span">
                    인기 검색어가 존재하지 않습니다.
                  </span>
                  <span class="icon-span">
                    <img src="/image/sub/customer/none.svg" alt="" />
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
                  <li v-for="(list, index) in recentList" :key="index">
                    {{ index + 1 }}. {{ list.keyword }}
                  </li>
                </template>
                <template v-else>
                  <span class="text-span">
                    최근 검색어가 존재하지 않습니다.
                  </span>
                  <span class="icon-span">
                    <img src="/image/sub/customer/none.svg" alt="" />
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
                  <li v-for="(list, index) in relationList" :key="index">
                    <NuxtLink
                      :to="'#'"
                      @click.prevent="clickRelationKwd(list.keyword)"
                      :external="true"
                    >
                      <span class="text-span" v-html="list.keyword"></span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/shortcut_blue.svg"
                          alt="바로가기"
                        />
                      </span>
                    </NuxtLink>
                  </li>
                </template>
                <template v-else>
                  <span class="text-span">
                    검색된 결과가 존재하지 않습니다.
                  </span>
                  <span class="icon-span">
                    <img src="/image/sub/customer/none.svg" alt="" />
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
                      <span class="text-span" v-html="list.menuLctn"> </span>

                      <span class="btn move-button">
                        <span class="title-span"> 바로가기 </span>
                        <span class="button-icon-span">
                          <img src="/image/sub/service/view.svg" alt="" />
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
                    <img src="/image/sub/customer/none.svg" alt="" />
                  </span>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
