<script setup lang="ts">
import Truncatetext from '~/components/common/truncatetext.vue';
import { inject, ref } from 'vue';
import { useSearchStore } from '~/stores/search';
import { storeToRefs } from 'pinia';
import { useCustomAlert } from '~/composables/useCustomAlert';

onBeforeMount(() => {
  reSearchQueryList.value = [...searchMain.value.reSearchQuery];
});

const { showAlert } = useCustomAlert();

const searchStore = useSearchStore();
const { searchMain, totalRelationList } = storeToRefs(searchStore);

const tabRef = inject('tabRef');
const showResearch = computed(() => {
  return tabRef.value ? tabRef.value.activeTabIndex === 0 : false;
});

// 검색어 입력 상태
const searchQuery = inject('searchQuery');
const emit = defineEmits(['search']);
const clickRelationKwd = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  searchQuery.value = kwd.replace(reg, '');
  searchMain.value.searchQuery = searchQuery.value;
  // emit('search', searchQuery.value);
};

// 재검색 검색어
const reSearchQuery = ref('');
const reSearchQueryList = ref([]);

const listCnt = inject('listCnt') as (index: number) => number;

const showResearchInput = computed(() => {
  return searchMain.value.searchQuery.trim() !== '' && listCnt?.(0) != '0';
});

// 연관 검색어, 결과 내 검색어 영역 표시 여부를 관리
const isRelationVisible = computed(() => {
  return reSearchQueryList.value.length == 0;
});

// 결과 내 재검색 버튼 클릭 시 이벤트
const reSearchBtnClick = () => {
  if (
    reSearchQuery.value &&
    !reSearchQueryList.value.includes(reSearchQuery.value)
  ) {
    reSearchQueryList.value.push(reSearchQuery.value);
    reSearch();
    reSearchQuery.value = '';
  } else if (!reSearchQuery.value) {
    showAlert({
      icon: 'info',
      text: '검색어를 입력하세요.'
    });
  } else {
    showAlert({
      icon: 'info',
      text: '중복 검색어입니다.'
    });
  }
};

const searchService = inject('searchService');
const searchInst = inject('searchInst');
const searchCase = inject('searchCase');
const searchTmplt = inject('searchTmplt');
const searchEtc = inject('searchEtc');

const reSearch = () => {
  if (searchQuery.value.trim() === '') {
    searchQuery.value = searchMain.value.searchQuery;
  }
  searchMain.value.reSearchQuery = reSearchQueryList.value;

  // 서비스
  searchService();

  // 기관
  searchInst();

  // 사례
  searchCase();

  // 서식
  searchTmplt();

  // 기타
  searchEtc();
};
// 메서드를 부모에 노출
defineExpose({
  reSearch
});

// 제거
const removeItem = (index: number) => {
  reSearchQueryList.value.splice(index, 1);
  reSearch();
};

watch(
  () => searchMain.value.searchQuery,
  async (newValue) => {
    if (searchMain.value.searchQuery.trim != '') {
      await searchStore.totalRelation();
    }
  }
);

watch(
  () => searchMain.value.reSearchQuery,
  async (newValue) => {
    reSearchQueryList.value = [...searchMain.value.reSearchQuery];
  }
);
</script>

<template>
  <template v-if="showResearch">
    <div class="re-search__wrap" v-if="isRelationVisible">
      <div class="sch-title">연관</div>
      <div class="sch-keyword" v-if="totalRelationList.length > 0">
        <ul class="keyword-list">
          <li
            class="linked-item"
            v-for="(list, index) in totalRelationList.slice(0, 5)"
            :key="index"
            @click="clickRelationKwd(list.keyword)"
          >
            <button type="button" class="btn-keyword">
              <span v-html="list.keyword.replace(/<[^>]*>?/g, '')"></span>
            </button>
          </li>
          <li
            class="linked-item"
            v-for="(list, index) in totalRelationList.slice(6, 10)"
            :key="index"
            @click="clickRelationKwd(list.keyword)"
          >
            <button type="button" class="btn-keyword">
              <span v-html="list.keyword.replace(/<[^>]*>?/g, '')"></span>
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="sch-keyword">
          <ul class="keyword-list">
            <li class="linked-item">
              <span>연관 검색어가 없습니다.</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-box__sub" v-if="showResearchInput">
        <label for="research">
          <span class="sr-only">결과 내 재검색</span>
        </label>
        <input
          type="text"
          id="research"
          class="input-search"
          placeholder="결과 내 재검색"
          v-model="reSearchQuery"
          @keyup.enter="reSearchBtnClick()"
        />
        <button
          type="button"
          class="btn-sch"
          title="결과 내 재검색"
          @click="reSearchBtnClick"
        ></button>
      </div>
    </div>

    <div class="linked-chinge-box" v-if="!isRelationVisible">
      <div class="title-box-research">
        <strong>결과 내 <br />검색어</strong>
      </div>
      <div class="check-result-box">
        <div class="check-tag-box">
          <ul>
            <li
              class="category-li"
              v-for="(item, index) in reSearchQueryList"
              :key="index"
            >
              <!-- BA 와 협의결과 긴 텍스트의 경우 10자 이상이면 ... 처리되어서 나오도록 했습니다. -->
              <truncatetext :max-length="10" :text="item" />
              <button
                type="button"
                class="btn close-button"
                @click="removeItem(index)"
              >
                <img
                  src="/image/sub/myservice/selected_delete.svg"
                  alt="선택 삭제"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <template v-if="showResearchInput">
        <div class="research-box box1">
          <label for="research">
            <span class="sr-only">결과 내 재검색</span>
          </label>
          <input
            class="form-control research-input"
            id="research"
            placeholder="결과 내 재검색"
            v-model="reSearchQuery"
            @keyup.enter="reSearchBtnClick()"
          />
          <button
            type="button"
            class="btn research-button"
            @click="reSearchBtnClick"
          >
            <span class="sr-only">검색</span>
          </button>
        </div>
      </template>
    </div>
  </template>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/researchresult.scss';
</style>
