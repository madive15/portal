<script setup lang="ts">
import { ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

const dropdownSelected = ref('');
</script>
<template>
  <!--  type3. 재검색-->
  <div class="search-info__wrap">
    <strong>총<span>10</span>의 관련 사례가 있습니다. </strong>
    <div class="list-bx">
      <label for="keywordType">
        <span class="sr-only">검색 기준 선택</span>
      </label>
      <a-select class="common-select" id="keywordType">
        <a-select-option value="1">제목</a-select-option>
        <a-select-option value="2">제목</a-select-option>
      </a-select>
      <label for="table-search-input">
        <span class="sr-only">결과 내 재검색</span>
      </label>
      <input
        type="text"
        class="input-search"
        id="table-search-input"
        placeholder="검색어를 입력해 주세요."
      />
      <div class="search-info__btns">
        <button type="button" class="btn btn-sch">
          <span class="text">검색</span>
        </button>
        <button type="button" class="btn btn-reset">
          <span class="text">초기화</span>
        </button>
      </div>
    </div>
    <div class="sort-bx">
      <div class="sort-btn__area">
        <button type="button">조회순</button>
        <button type="button">최신순</button>
        <button type="button" class="active">제목순</button>
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
                role="menuitem"
                tabindex="0"
                @click="select('10개씩 보기')"
                @keydown.enter.prevent="select('10개씩 보기')"
              >
                10개씩 보기
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="select('20개씩 보기')"
                @keydown.enter.prevent="select('20개씩 보기')"
              >
                20개씩 보기
              </li>
              <li
                role="menuitem"
                tabindex="0"
                @click="select('30개씩 보기')"
                @keydown.enter.prevent="select('30개씩 보기')"
              >
                30개씩 보기
              </li>
            </ul>
          </template>
        </DropdownBasic>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
