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
        <th scope="col" class="title-th">제목</th>
        <th scope="col" class="date-th">작성일</th>
        <th scope="col" class="hit-th">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="num-td">217</td>
        <td class="title-td">
          2010년 1/4분기 법률구조 우수사례 발표대회 - 금상, 울산지부
        </td>
        <td>2012-01-11</td>
        <td>25</td>
      </tr>
    </tbody>
    <tfoot></tfoot>
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
              <dt>2017-02-14</dt>
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
              <dt>2017-02-14</dt>
              <dd>조회수 1235</dd>
            </dl>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
