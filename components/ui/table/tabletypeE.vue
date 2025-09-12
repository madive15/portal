<script setup lang="ts">
import CommonTable from '~/components/ui/table/tables.vue';
import Icon from '~/components/ui/icon/icon.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
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
        <th scope="col">첨부</th>
        <th scope="col" class="date-th">작성일</th>
        <th scope="col" class="hit-th">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="num-td">
          <Icon name="notice" title="공지" />
        </td>
        <td>
          <CommonBadge tag-badge-text="공지" size="2" />
        </td>
        <td class="title-td">
          <NuxtLink to="#" title="공지사항 상세 페이지로 이동">
            공지사항입니다.
          </NuxtLink>
        </td>
        <td>-</td>
        <td>2025-02-13</td>
        <td>54</td>
      </tr>
      <tr>
        <td class="num-td">
          <Icon name="notice" title="공지" />
        </td>
        <td>
          <CommonBadge tag-badge-text="공지" size="2" />
        </td>
        <td class="title-td">
          <NuxtLink to="#" title="공지사항 상세 페이지로 이동">
            공지사항입니다.
          </NuxtLink>
        </td>
        <td>-</td>
        <td>2025-02-13</td>
        <td>54</td>
      </tr>
      <tr>
        <td class="num-td">
          <Icon name="notice" title="공지" />
        </td>
        <td>
          <span> 공지 </span>
        </td>
        <td class="title-td">
          <NuxtLink to="#" title="공지사항 상세 페이지로 이동">
            공지사항입니다.
          </NuxtLink>
        </td>
        <td>-</td>
        <td>2025-02-13</td>
        <td>54</td>
      </tr>
      <tr>
        <td class="num-td">1</td>
        <td>공지</td>
        <td class="title-td">
          <NuxtLink to="#" title="공지사항 상세 페이지로 이동">
            공지사항입니다.
          </NuxtLink>
        </td>
        <td>
          <button class="btn-attach" aria-label="첨부파일 다운로드">
            <Icon name="downloadAtt" title="파일 다운로드" />
          </button>
        </td>
        <td>2025-02-13</td>
        <td>54</td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </CommonTable>
  <div class="common-table__list mo-visible">
    <ul>
      <li>
        <span class="bx-num">
          <Icon name="notice" title="공지" />
        </span>
        <div class="bx">
          <a href="#" class="text-title"
            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우</a
          >
          <div class="bx-info">
            <dl>
              <dt class="tit">홍보자료</dt>
              <dd>2017-02-14</dd>
              <dd>조회수 1235</dd>
            </dl>
          </div>
          <div class="bx-btn">
            <button class="btn-attach" title="첨부파일 다운로드">
              <Icon
                name="downloadAtt"
                :width="30"
                :height="30"
                title="파일 다운로드"
              />
            </button>
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
              <dt class="tit">공지</dt>
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
