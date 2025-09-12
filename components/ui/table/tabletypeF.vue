<script setup lang="ts">
import CommonTable from '~/components/ui/table/tables.vue';
</script>

<template>
  <CommonTable class="pc-visible">
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
      <tr>
        <td class="num-td">1</td>
        <td>홈페이지</td>
        <td class="title-td">
          <NuxtLink to="'#'" title="나의문의내역 상세 페이지로 이동">
            공지사항입니다.
          </NuxtLink>
        </td>
        <td>2025-02-13</td>
        <td>답변 대기</td>
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
              <dt class="tit">홈페이지</dt>
              <dd>2017-02-14</dd>
              <dd>답변 1</dd>
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
              <dt class="tit">홈페이지</dt>
              <dd>2017-02-14</dd>
              <dd>답변 1</dd>
            </dl>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
