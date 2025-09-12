<script setup lang="ts">
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';
const dropdownOption = ref('');
</script>

<template>
  <CommonTable class="pc-visible">
    <colgroup>
      <col class="num-col" />
      <col class="category-col" />
      <col class="title-col" />
      <col class="download-col" />
      <col class="download-num-col" />
      <col class="date-col" />
    </colgroup>
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
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </th>
        <th scope="col" class="title-th">서식</th>
        <th scope="col" class="download-th">다운로드</th>
        <th scope="col" class="download-num-th">다운로드수</th>
        <th scope="col" class="date-th">등록일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="num-td">902</td>
        <td>가사소송 > 가,나,다류 가사소송</td>
        <td class="title-td">(부를 정하는 소)</td>
        <td>
          <div class="bx-btn">
            <div class="download-box">
              <button class="btn-download" type="button">
                <img
                  src="~/assets/image/sub/file/hwp.svg"
                  alt="한글파일 다운로드"
                />
              </button>
              <NuxtLink
                to="#"
                target="_blank"
                rel="noopener noreferrer"
                title=""
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
          </div>
        </td>
        <td>8</td>
        <td>2025-02-11</td>
      </tr>
    </tbody>
  </CommonTable>
  <div class="common-table__list mo-visible">
    <ul>
      <li>
        <span class="bx-num"> 1 </span>
        <div class="bx">
          <a href="#" class="text-title"
            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우</a
          >
          <div class="bx-info">
            <dl>
              <dt class="tit">가사소송 > 가,나,다류 가사소송</dt>
              <dd>2017-02-14</dd>
              <dd>다운로드 수 1235</dd>
            </dl>
          </div>
          <div class="bx-btn">
            <div class="download-box">
              <button class="btn-download" type="button">
                <img
                  src="~/assets/image/sub/file/hwp.svg"
                  alt="한글파일 다운로드"
                />
              </button>
              <NuxtLink
                to="#"
                target="_blank"
                rel="noopener noreferrer"
                title=""
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
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
              <dt class="tit">가사소송 > 가,나,다류 가사소송</dt>
              <dd>2017-02-14</dd>
              <dd>다운로드 수 1235</dd>
            </dl>
          </div>
          <div class="bx-btn">
            <div class="download-box">
              <button class="btn-download" type="button">
                <img
                  src="~/assets/image/sub/file/hwp.svg"
                  alt="한글파일 다운로드"
                />
              </button>
              <NuxtLink
                to="'#'"
                target="_blank"
                rel="noopener noreferrer"
                title=""
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
            <div class="download-box">
              <button class="btn-download" type="button">
                <img
                  src="~/assets/image/sub/file/hwp.svg"
                  alt="한글파일 다운로드"
                />
              </button>
              <NuxtLink
                to="'#'"
                target="_blank"
                rel="noopener noreferrer"
                title=""
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
