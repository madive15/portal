<script setup lang="ts">
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';
const dropdownOption = ref('');
</script>

<template>
  <CommonTable class="pc-visible">
    <caption>
      표 설명
    </caption>
    <thead>
      <tr>
        <th scope="col" class="num-th">번호</th>
        <th scope="col" class="category-th">
          <div class="dropdown-area">
            <label for="dropdown">
              <span class="sr-only">카테고리 기준 선택</span>
            </label>
            <DropdownBasic
              class="select-type"
              v-model="dropdownOption"
              label="전체"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('옵션1')"
                    @keydown.enter.prevent="select('옵션1')"
                  >
                    옵션1
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('옵션2')"
                    @keydown.enter.prevent="select('옵션2')"
                  >
                    옵션2
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('옵션3')"
                    @keydown.enter.prevent="select('옵션3')"
                  >
                    옵션3
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
      <tr>
        <td class="num-td">217</td>
        <td>가족관계등록 > 가족관계등록부정정</td>
        <td class="title-td">
          <NuxtLink to="'#'">
            2010년 1/4분기 법률구조 우수사례 발표대회 - 금상, 울산지부
          </NuxtLink>
        </td>
        <td>2012-01-11</td>
        <td>25</td>
      </tr>
    </tbody>
  </CommonTable>
  <div class="common-table__list mo-visible">
    <ul>
      <li>
        <span class="bx-num">1</span>
        <div class="bx">
          <a href="#" class="text-title"
            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우</a
          >
          <div class="bx-info">
            <dl>
              <dt class="tit">노동>근로일반</dt>
              <dd>2017-02-14</dd>
              <dd>조회수 1235</dd>
            </dl>
          </div>
        </div>
      </li>
      <li>
        <span class="bx-num">2</span>
        <div class="bx">
          <a href="#" class="text-title"
            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우</a
          >
          <div class="bx-info">
            <dl>
              <dt class="tit">노동>근로일반</dt>
              <dd>2017-02-14</dd>
              <dd>조회수 1235</dd>
            </dl>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
