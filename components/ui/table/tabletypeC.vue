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
        <th scope="col" class="title-th">서식</th>
        <th scope="col">다운로드</th>
        <th scope="col">다운로드수</th>
        <th scope="col" class="date-th">작성일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="num-td">902</td>
        <td>가사</td>
        <td class="title-td">[가사] (서울가정법원)인지의 허가청구</td>
        <td class="download-td">
          <div class="download-box">
            <button class="btn-download" type="button">
              <img
                src="~/assets/image/sub/file/hwp.svg"
                alt="한글파일 다운로드"
              />
            </button>
          </div>
        </td>
        <td>8</td>
        <td>2025-02-11</td>
      </tr>
    </tbody>
    <tfoot></tfoot>
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
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
