<script setup lang="ts">
import SearchComb from "~/components/ui/search/searchComb.vue";
import SearchCorr from "~/components/ui/search/searchCorr.vue";
import SearchSort from "~/components/ui/search/searchSort.vue";
import SearchCs from "~/components/ui/search/searchCs.vue";
import {DownOutlined} from "@ant-design/icons-vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Search</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 통합검색</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <SearchComb />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;!-- type1 통합검색-->
        &lt;div class="search-area__wrap">
          &lt;div class="search-box__header">
            &lt;label for="all-search">
              &lt;span class="sr-only">검색어를 입력하세요&lt;/span>
            &lt;/label>
            &lt;input type="text" class="input-search" placeholder="검색어를 입력하세요" id="all-search" />
            &lt;button type="button" class="btn btn-sch">&lt;/button>
          &lt;/div>
        &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 결과내 재검색</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <SearchCorr />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
         &lt;!--type2  결과 내 재검색-->
          &lt;div class="re-search__wrap">
            &lt;div class="sch-title">연관&lt;/div>
              &lt;div class="sch-keyword">
              &lt;ul class="keyword-list">
                &lt;li class="linked-item">
                  &lt;button type="button" class="btn-keyword">
                    &lt;span >법률 상담&lt;/span>
                  &lt;/button>
                &lt;/li>
                &lt;li class="linked-item">
                  &lt;button type="button" class="btn-keyword">
                    &lt;span>법률지원(양육비)&lt;/span>
                  &lt;/button>
                &lt;/li>
                &lt;li class="linked-item">
                  &lt;button type="button" class="btn-keyword">
                    &lt;span>법률지원(양육비)&lt;/span>
                  &lt;/button>
                &lt;/li>
              &lt;/ul>
            &lt;/div>
            &lt;div class="search-box__sub">
              &lt;label for="research">
                &lt;span class="sr-only">결과 내 재검색&lt;/span>
              &lt;/label>
              &lt;input type="text" id="research" class="input-search" placeholder="결과 내 재검색" />
              &lt;button type="button" class="btn-sch">&lt;/button>
            &lt;/div>
          &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 재검색</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <SearchSort />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;!--  type3. 재검색-->
          &lt;div class="search-info__wrap">
            &lt;strong>총&lt;span>10&lt;/span>의 관련 사례가 있습니다. &lt;/strong>
            &lt;div class="list-bx">
              &lt;label for="keywordType">
                &lt;span class="sr-only">검색 기준 선택&lt;/span>
              &lt;/label>
              &lt;a-select
                  class="common-select"
                  id="keywordType"
              >
                &lt;a-select-option value="1">제목&lt;/a-select-option>
                &lt;a-select-option value="2">제목&lt;/a-select-option>
              &lt;/a-select>
              &lt;label for="table-search-input">
                &lt;span class="sr-only">결과 내 재검색&lt;/span>
              &lt;/label>
              &lt;input type="text" class="input-search" id="table-search-input" placeholder="검색어를 입력해 주세요." />
              &lt;div class="search-info__btns">
                &lt;button type="button" class="btn btn-sch">
                  &lt;span class="text">검색&lt;/span>
                &lt;/button>
                &lt;button type="button" class="btn btn-reset">
                  &lt;span class="text">초기화&lt;/span>
                &lt;/button>
              &lt;/div>
            &lt;/div>
            &lt;div class="sort-bx">
              &lt;div class="sort-btn__area">
                &lt;button type="button">조회순&lt;/button>
                &lt;button type="button">최신순&lt;/button>
                &lt;button type="button">제목순&lt;/button>
              &lt;/div>
              &lt;div class="dropdown-area">
                &lt;label for="dropdown">
                  &lt;span class="sr-only">검색 기준 선택&lt;/span>
                &lt;/label>
                &lt;a-dropdown :trigger="['click']" v-model:open="open">
                  &lt;a class="ant-dropdown-link" @keydown.enter="open = true" tabindex="0" id="dropdown" @click.prevent>
                    {{ selectedText}}
                    &lt;DownOutlined />
                  &lt;/a>
                  &lt;template #overlay>
                    &lt;a-menu @click="handleMenuClick" class="sort-select__list">
                      &lt;a-menu-item key="1">10개씩 보기&lt;/a-menu-item>
                      &lt;a-menu-item key="2">20개씩 보기&lt;/a-menu-item>
                      &lt;a-menu-divider />
                      &lt;a-menu-item key="3">30개씩 보기&lt;/a-menu-item>
                    &lt;/a-menu>
                  &lt;/template>
                &lt;/a-dropdown>
              &lt;/div>
            &lt;/div>
          &lt;/div>
      </pre>
    </div>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 고객센터</p>

      <div class="box-tit-h3">📁 sample</div>

      <div class="box-tit-h3">📁 code</div>
      <div class="box-p">
        <SearchCs />
      </div>

      <pre class="box-code">
          &lt;!-- type4. 고객센터-->
          &lt;div class="search-center__wrap">
            &lt;label for="board">
              &lt;span class="sr-only">검색 기준&lt;/span>
            &lt;/label>
            &lt;a-select
                class="common-select"
                id="board"
            >
            &lt;a-select-option value="1">제목&lt;/a-select-option>
            &lt;a-select-option value="2">제목&lt;/a-select-option>
            &lt;/a-select>
          &lt;label for="search">
            &lt;span class="sr-only">검색어 입력&lt;/span>
          &lt;/label>
          &lt;input type="text" class="input-search" id="search" placeholder="검색어를 입력해 주세요." />
          &lt;div class="search-info__btns">
            &lt;button type="button" class="btn btn-sch">
              &lt;span class="text">검색&lt;/span>
        &lt;/button>
            &lt;button type="button" class="btn btn-reset">
              &lt;span class="text">초기화&lt;/span>
            &lt;/button>
          &lt;/div>
        &lt;/div>
      </pre>
    </div>

  </div>
</template>

<style scoped lang="scss"></style>
