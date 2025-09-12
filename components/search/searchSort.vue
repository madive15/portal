<script setup lang="ts">
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

export type KeywordTypeItem = {
  value: string;
  text: string;
};

export type keywordType = {
  keywordTypeItems?: KeywordTypeItem[];
  pageSize: number;
  SortOptions: string[];
  text: string;
  totalElements: number;
  keywordShow: boolean;
  resetBtnShow: boolean;
};

const keywordType = defineModel<string>('keyword-type');
const keywordValue = defineModel<string>('keyword-value');
const size = defineModel<number>('size');
const desc = defineModel<number>('desc');

const props = defineProps<keywordType>();
const emit = defineEmits(['search']);

const pageSizeItems =
  props.pageSize === 10
    ? [
        { text: '10개씩 보기', value: 10 },
        { text: '20개씩 보기', value: 20 },
        { text: '30개씩 보기', value: 30 },
        { text: '40개씩 보기', value: 40 },
        { text: '50개씩 보기', value: 50 }
      ]
    : [
        { text: '12개씩 보기', value: 12 },
        { text: '24개씩 보기', value: 24 },
        { text: '36개씩 보기', value: 36 },
        { text: '48개씩 보기', value: 48 },
        { text: '60개씩 보기', value: 60 }
      ];

const dropdownSelected = ref(
  pageSizeItems.find((item) => item.value === size.value)?.text
);

const keywordChange = (item: KeywordTypeItem) => {
  keywordType.value = item.value;
};

const sortSeqChange = (value: string) => {
  desc.value = value;
  emit('search');
};

const sizeChange = (item) => {
  size.value = item.value;
  dropdownSelected.value = item.text;
  emit('search');
};

const reset = () => {
  if (props.keywordTypeItems?.length > 0) {
    keywordType.value = props.keywordTypeItems[0].value;
  }
  keywordValue.value = '';
  size.value = pageSizeItems[0].value;
  dropdownSelected.value = pageSizeItems[0].text;
};
</script>
<template>
  <div class="search-info__wrap">
    <strong
      >총<span>{{ formatComma(props.totalElements) }}</span
      >건의 관련 {{ props.text }} 있습니다.</strong
    >
    <div class="list-bx" v-show="props.keywordShow">
      <label for="keywordType">
        <span class="sr-only">검색 기준 선택</span>
      </label>
      <a-select
        class="common-select"
        id="keywordType"
        v-if="props.keywordTypeItems?.length > 0"
        v-model:value="keywordType"
      >
        <a-select-option
          v-for="item in props.keywordTypeItems"
          :key="item.value"
          :value="item.value"
          @click="keywordChange(item)"
        >
          {{ item.text }}
        </a-select-option>
      </a-select>
      <label for="table-search-input">
        <span class="sr-only">결과 내 재검색</span>
      </label>
      <input
        type="text"
        class="input-search"
        id="table-search-input"
        placeholder="검색어를 입력해 주세요."
        @keyup.enter="emit('search')"
        v-model="keywordValue"
      />
      <div class="search-info__btns">
        <button type="button" class="btn btn-sch" @click="emit('search', 1)">
          <span class="text">검색</span>
        </button>
        <button
          type="button"
          class="btn btn-reset"
          v-show="props.resetBtnShow"
          @click="reset"
        >
          <span class="text">초기화</span>
        </button>
      </div>
    </div>
    <div class="sort-bx">
      <div class="sort-btn__area">
        <button
          type="button"
          :class="desc === 'C' ? 'active' : ''"
          :title="desc === 'C' ? '선택됨' : ''"
          v-if="props.SortOptions.some((value) => value === 'inquiry')"
          @click="sortSeqChange('C')"
        >
          조회순
        </button>
        <button
          type="button"
          :class="desc === 'Y' ? 'active' : ''"
          :title="desc === 'Y' ? '선택됨' : ''"
          v-if="props.SortOptions.some((value) => value === 'latest')"
          @click="sortSeqChange('Y')"
        >
          최신순
        </button>
        <button
          type="button"
          :class="desc === 'T' ? 'active' : ''"
          :title="desc === 'T' ? '선택됨' : ''"
          v-if="props.SortOptions.some((value) => value === 'title')"
          @click="sortSeqChange('T')"
        >
          제목순
        </button>
      </div>
      <div class="dropdown-area">
        <label for="dropdown">
          <span class="sr-only">검색 기준 선택</span>
        </label>
        <DropdownBasic
          class="select-type"
          v-model="dropdownSelected"
          label="10개씩 보기"
        >
          <template #default="{ select }">
            <ul role="menu">
              <li
                v-for="(item, index) in pageSizeItems"
                :key="item.value"
                role="menuitem"
                :tabindex="index"
                @click="[select(item.text), sizeChange(item)]"
                @keydown.enter.prevent="[select(item.text), sizeChange(item)]"
              >
                {{ item.text }}
              </li>
            </ul>
          </template>
        </DropdownBasic>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//@use '../../assets/style/pages/search/search';
</style>
<style scoped lang="scss"></style>
