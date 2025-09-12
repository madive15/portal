<script setup lang="ts">
import CommonTableTypeA from '~/components/ui/table/tabletypeA.vue';
import CommonTableTypeB from '~/components/ui/table/tabletypeB.vue';
import CommonTableTypeC from '~/components/ui/table/tabletypeC.vue';
import CommonTableTypeD from '~/components/ui/table/tabletypeD.vue';
import CommonTableTypeE from '~/components/ui/table/tabletypeE.vue';
import CommonTableTypeF from '~/components/ui/table/tabletypeF.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import Icon from '~/components/ui/icon/icon.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Table</h1>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Table 옵션<br />
        type(테이블 스타일 type="bordered" )
      </p>
      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeA />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">

          &lt;CommonTable class="pc-visible">
            &lt;caption>
              표 설명
            &lt;/caption>
            &lt;thead>
              &lt;tr>
                &lt;th scope="col" class="num-th">번호&lt;/th>
                &lt;th scope="col" class="title-th">제목&lt;/th>
                &lt;th scope="col" class="date-th">작성일&lt;/th>
                &lt;th scope="col" class="hit-th">조회수&lt;/th>
              &lt;/tr>
            &lt;/thead>
            &lt;tbody>
              &lt;tr>
                &lt;td class="num-td">217&lt;/td>
                &lt;td class="title-td">
                  2010년 1/4분기 법률구조 우수사례 발표대회 - 금상, 울산지부
                &lt;/td>
                &lt;td>2012-01-11&lt;/td>
                &lt;td>25&lt;/td>
              &lt;/tr>
            &lt;/tbody>
          &lt;/CommonTable>
          &lt;div class="common-table__list mo-visible">
            &lt;ul>
              &lt;li>
                &lt;span class="bx-num">1&lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt>2017-02-14&lt;/dt>
                      &lt;dd>조회수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
              &lt;li>
                &lt;span class="bx-num">2&lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt>2017-02-14&lt;/dt>
                      &lt;dd>조회수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
            &lt;/ul>
          &lt;/div>

      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 사례(카테고리있음)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeB />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTable class="pc-visible">
            &lt;caption>
              표 설명
            &lt;/caption>
          &lt;thead>
            &lt;tr>
              &lt;th scope="col" class="num-th">번호&lt;/th>
              &lt;th scope="col" class="category-th">
                &lt;div class="dropdown-area">
                  &lt;label for="dropdown">
                    &lt;span class="sr-only">카테고리 기준 선택&lt;/span>
                  &lt;/label>
                  &lt;DropdownBasic
                      class="select-type"
                      v-model="dropdownOption"
                      label="전체"
                  >
                    &lt;template #default="{ select }">
                      &lt;ul role="menu">
                        &lt;li
                            role="menuitem"
                            tabindex="0"
                            @click="select('옵션1')"
                            @keydown.enter.prevent="select('옵션1')"
                        >
                          옵션1
                        &lt;/li>
                        &lt;li
                            role="menuitem"
                            tabindex="0"
                            @click="select('옵션2')"
                            @keydown.enter.prevent="select('옵션2')"
                        >
                          옵션2
                        &lt;/li>
                        &lt;li
                            role="menuitem"
                            tabindex="0"
                            @click="select('옵션3')"
                            @keydown.enter.prevent="select('옵션3')"
                        >
                          옵션3
                        &lt;/li>
                      &lt;/ul>
                    &lt;/template>
                  &lt;/DropdownBasic>
                &lt;/div>
              &lt;/th>
              &lt;th scope="col" class="title-th">제목&lt;/th>
              &lt;th scope="col" class="date-th">작성일&lt;/th>
              &lt;th scope="col" class="hit-th">조회수&lt;/th>
            &lt;/tr>
          &lt;/thead>
          &lt;tbody>
            &lt;tr>
              &lt;td class="num-td">217&lt;/td>
              &lt;td>가족관계등록 > 가족관계등록부정정&lt;/td>
              &lt;td class="title-td">
                &lt;NuxtLink to="'#'">
                  2010년 1/4분기 법률구조 우수사례 발표대회 - 금상, 울산지부
                &lt;/NuxtLink>
              &lt;/td>
              &lt;td>2012-01-11&lt;/td>
              &lt;td>25&lt;/td>
            &lt;/tr>
          &lt;/tbody>
        &lt;/CommonTable>
        &lt;div class="common-table__list mo-visible">
          &lt;ul>
            &lt;li>
              &lt;span class="bx-num">1&lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">노동>근로일반&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>조회수 1235&lt;/dd>
                  &lt;/dl>
                &lt;/div>
              &lt;/div>
            &lt;/li>
            &lt;li>
              &lt;span class="bx-num">2&lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">노동>근로일반&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>조회수 1235&lt;/dd>
                  &lt;/dl>
                &lt;/div>
              &lt;/div>
            &lt;/li>
          &lt;/ul>
        &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• C 서식 (다운로드 버튼 없이 아이콘만 있음)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeC />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonTable class="pc-visible">
          &lt;caption>
            표 설명
          &lt;/caption>
          &lt;thead>
            &lt;tr>
              &lt;th scope="col" class="num-th">번호&lt;/th>
              &lt;th scope="col" class="category-th">분류&lt;/th>
              &lt;th scope="col" class="title-th">서식&lt;/th>
              &lt;th scope="col">다운로드&lt;/th>
              &lt;th scope="col">다운로드수&lt;/th>
              &lt;th scope="col" class="date-th">작성일&lt;/th>
            &lt;/tr>
          &lt;/thead>
          &lt;tbody>
            &lt;tr>
              &lt;td class="num-td">902&lt;/td>
              &lt;td>가사&lt;/td>
              &lt;td class="title-td">[가사] (서울가정법원)인지의 허가청구&lt;/td>
              &lt;td class="download-td">
                &lt;div class="download-box">
                  &lt;button class="btn-download" type="button">
                    &lt;img
                        src="~/assets/image/sub/file/hwp.svg"
                        alt="한글파일 다운로드"
                    />
                  &lt;/button>
                &lt;/div>
              &lt;/td>
              &lt;td>8&lt;/td>
              &lt;td>2025-02-11&lt;/td>
            &lt;/tr>
          &lt;/tbody>
        &lt;/CommonTable>
        &lt;div class="common-table__list mo-visible">
          &lt;ul>
            &lt;li>
              &lt;span class="bx-num"> 1 &lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">가사소송 > 가,나,다류 가사소송&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>다운로드 수 1235&lt;/dd>
                  &lt;/dl>
                &lt;/div>
                &lt;div class="bx-btn">
                  &lt;div class="download-box">
                    &lt;button class="btn-download" type="button">
                      &lt;img
                          src="~/assets/image/sub/file/hwp.svg"
                          alt="한글파일 다운로드"
                      />
                    &lt;/button>
                  &lt;/div>
                &lt;/div>
              &lt;/div>
            &lt;/li>
            &lt;li>
              &lt;span class="bx-num">2&lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">가사소송 > 가,나,다류 가사소송&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>다운로드 수 1235&lt;/dd>
                  &lt;/dl>
                &lt;/div>
                &lt;div class="bx-btn">
                  &lt;div class="download-box">
                    &lt;button class="btn-download" type="button">
                      &lt;img
                          src="~/assets/image/sub/file/hwp.svg"
                          alt="한글파일 다운로드"
                      />
                    &lt;/button>
                  &lt;/div>
                &lt;/div>
              &lt;/div>
            &lt;/li>
          &lt;/ul>
        &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• D 서식 (다운로드 버튼과)</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeD />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTable class="pc-visible">
            &lt;colgroup>
              &lt;col class="num-col" />
              &lt;col class="category-col" />
              &lt;col class="title-col" />
              &lt;col class="download-col" />
              &lt;col class="download-num-col" />
              &lt;col class="date-col" />
            &lt;/colgroup>
            &lt;caption>
              표 설명
            &lt;/caption>
            &lt;thead>
              &lt;tr>
                &lt;th scope="col" class="num-th">번호&lt;/th>
                &lt;th scope="col" class="category-th">
                  &lt;div class="dropdown-area">
                    &lt;label for="dropdown">
                      &lt;span class="sr-only">카테고리 기준 선택&lt;/span>
                    &lt;/label>
                    &lt;DropdownBasic
                        class="select-type"
                        v-model="dropdownOption"
                        label="전체"
                    >
                      &lt;template #default="{ select }">
                        &lt;ul role="menu">
                          &lt;li
                              role="menuitem"
                              tabindex="0"
                              @click="select('옵션1')"
                              @keydown.enter.prevent="select('옵션1')"
                          >
                            옵션1
                          &lt;/li>
                          &lt;li
                              role="menuitem"
                              tabindex="0"
                              @click="select('옵션2')"
                              @keydown.enter.prevent="select('옵션2')"
                          >
                            옵션2
                          &lt;/li>
                        &lt;/ul>
                      &lt;/template>
                    &lt;/DropdownBasic>
                  &lt;/div>
                &lt;/th>
                &lt;th scope="col" class="title-th">서식&lt;/th>
                &lt;th scope="col" class="download-th">다운로드&lt;/th>
                &lt;th scope="col" class="download-num-th">다운로드수&lt;/th>
                &lt;th scope="col" class="date-th">등록일&lt;/th>
              &lt;/tr>
            &lt;/thead>
            &lt;tbody>
              &lt;tr>
                &lt;td class="num-td">902&lt;/td>
                &lt;td>가사소송 > 가,나,다류 가사소송&lt;/td>
                &lt;td class="title-td">(부를 정하는 소)&lt;/td>
                &lt;td>
                  &lt;div class="bx-btn">
                    &lt;div class="download-box">
                      &lt;button class="btn-download" type="button">
                        &lt;img
                            src="~/assets/image/sub/file/hwp.svg"
                            alt="한글파일 다운로드"
                        />
                      &lt;/button>
                      &lt;NuxtLink
                          to="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          class="btn-basic primary sm"
                      >
                        <span class="icon-shortcut"></span>
                        <span class="text"> 바로보기</span>
                      &lt;/NuxtLink>
                    &lt;/div>
                  &lt;/div>
                &lt;/td>
                &lt;td>8&lt;/td>
                &lt;td>2025-02-11&lt;/td>
              &lt;/tr>
            &lt;/tbody>
          &lt;/CommonTable>
          &lt;div class="common-table__list mo-visible">
            &lt;ul>
              &lt;li>
                &lt;span class="bx-num"> 1 &lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt class="tit">가사소송 > 가,나,다류 가사소송&lt;/dt>
                      &lt;dd>2017-02-14&lt;/dd>
                      &lt;dd>다운로드 수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                  &lt;div class="bx-btn">
                    &lt;div class="download-box">
                      &lt;button class="btn-download" type="button">
                        &lt;img
                            src="~/assets/image/sub/file/hwp.svg"
                            alt="한글파일 다운로드"
                        />
                      &lt;/button>
                      &lt;NuxtLink
                          to="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          class="btn-basic primary sm"
                      >
                        &lt;span class="icon-shortcut">&lt;/span>
                        &lt;span class="text"> 바로보기&lt;/span>
                      &lt;/NuxtLink>
                    &lt;/div>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
              &lt;li>
                &lt;span class="bx-num">2&lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt class="tit">가사소송 > 가,나,다류 가사소송&lt;/dt>
                      &lt;dd>2017-02-14&lt;/dd>
                      &lt;dd>다운로드 수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                  &lt;div class="bx-btn">
                    &lt;div class="download-box">
                      &lt;button class="btn-download" type="button">
                        &lt;img
                            src="~/assets/image/sub/file/hwp.svg"
                            alt="한글파일 다운로드"
                        />
                      &lt;/button>
                      &lt;NuxtLink
                          to="'#'"
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          class="btn-basic primary sm"
                      >
                        &lt;span class="icon-shortcut">&lt;/span>
                        &lt;span class="text"> 바로보기&lt;/span>
                      &lt;/NuxtLink>
                    &lt;/div>
                    &lt;div class="download-box">
                      &lt;button class="btn-download" type="button">
                        &lt;img
                            src="~/assets/image/sub/file/hwp.svg"
                            alt="한글파일 다운로드"
                        />
                      &lt;/button>
                      &lt;NuxtLink
                          to="'#'"
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          class="btn-basic primary sm"
                      >
                        &lt;span class="icon-shortcut">&lt;/span>
                        &lt;span class="text"> 바로보기&lt;/span>
                      &lt;/NuxtLink>
                    &lt;/div>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
            &lt;/ul>
          &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• E 공지사항,자주찾는질문</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeE />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTable class="pc-visible">
            &lt;caption>
              표 설명
            &lt;/caption>
            &lt;thead>
              &lt;tr>
                &lt;th scope="col" class="num-th">번호&lt;/th>
                &lt;th scope="col" class="category-th">분류&lt;/th>
                &lt;th scope="col" class="title-th">제목&lt;/th>
                &lt;th scope="col">첨부&lt;/th>
                &lt;th scope="col" class="date-th">작성일&lt;/th>
                &lt;th scope="col" class="hit-th">조회수&lt;/th>
              &lt;/tr>
            &lt;/thead>
            &lt;tbody>
              &lt;tr>
                &lt;td class="num-td">
                  &lt;Icon name="notice" title="공지" />
                &lt;/td>
                &lt;td>
                  &lt;CommonBadge tag-badge-text="공지" size="2" />
                &lt;/td>
                &lt;td class="title-td">
                  &lt;NuxtLink to="#" title="공지사항 상세 페이지로 이동">
                    공지사항입니다.
                  &lt;/NuxtLink>
                &lt;/td>
                &lt;td>-&lt;/td>
                &lt;td>2025-02-13&lt;/td>
                &lt;td>54&lt;/td>
              &lt;/tr>
              &lt;tr>
                &lt;td class="num-td">
                  &lt;Icon name="notice" title="공지" />
                &lt;/td>
                &lt;td>
                  &lt;CommonBadge tag-badge-text="공지" size="2" />
                &lt;/td>
                &lt;td class="title-td">
                  &lt;NuxtLink to="#" title="공지사항 상세 페이지로 이동">
                    공지사항입니다.
                  &lt;/NuxtLink>
                &lt;/td>
                &lt;td>-&lt;/td>
                &lt;td>2025-02-13&lt;/td>
                &lt;td>54&lt;/td>
              &lt;/tr>
              &lt;tr>
                &lt;td class="num-td">
                  &lt;Icon name="notice" title="공지" />
                &lt;/td>
                &lt;td>
                  &lt;span> 공지 &lt;/span>
                &lt;/td>
                &lt;td class="title-td">
                  &lt;NuxtLink to="#" title="공지사항 상세 페이지로 이동">
                    공지사항입니다.
                  &lt;/NuxtLink>
                &lt;/td>
                &lt;td>-&lt;/td>
                &lt;td>2025-02-13&lt;/td>
                &lt;td>54&lt;/td>
              &lt;/tr>
              &lt;tr>
                &lt;td class="num-td">1&lt;/td>
                &lt;td>공지&lt;/td>
                &lt;td class="title-td">
                  &lt;NuxtLink to="#" title="공지사항 상세 페이지로 이동">
                    공지사항입니다.
                  &lt;/NuxtLink>
                &lt;/td>
                &lt;td>
                  &lt;button class="btn-attach" aria-label="첨부파일 다운로드">
                    &lt;Icon name="downloadAtt" title="파일 다운로드"/>
                  &lt;/button>
                &lt;/td>
                &lt;td>2025-02-13&lt;/td>
                &lt;td>54&lt;/td>
              &lt;/tr>
            &lt;/tbody>
          &lt;/CommonTable>
          &lt;div class="common-table__list mo-visible">
            &lt;ul>
              &lt;li>
                &lt;span class="bx-num">
                  &lt;Icon name="notice" title="공지" />
                &lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt class="tit">홍보자료&lt;/dt>
                      &lt;dd>2017-02-14&lt;/dd>
                      &lt;dd>조회수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                  &lt;div class="bx-btn">
                    &lt;button class="btn-attach" title="첨부파일 다운로드">
                     &lt;Icon name="downloadAtt" :width="30" :height="30" title="파일 다운로드" />
                    &lt;/button>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
              &lt;li>
                &lt;span class="bx-num">2&lt;/span>
                &lt;div class="bx">
                  &lt;a href="#" class="text-title"
                  >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                  >
                  &lt;div class="bx-info">
                    &lt;dl>
                      &lt;dt class="tit">공지&lt;/dt>
                      &lt;dd>2017-02-14&lt;/dd>
                      &lt;dd>조회수 1235&lt;/dd>
                    &lt;/dl>
                  &lt;/div>
                &lt;/div>
              &lt;/li>
            &lt;/ul>
          &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• F 마이페이지 나의문의내역</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTableTypeF />
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTable class="pc-visible">
          &lt;caption>
            표 설명
          &lt;/caption>
          &lt;thead>
            &lt;tr>
              &lt;th scope="col" class="num-th">번호&lt;/th>
              &lt;th scope="col" class="category-th">분류&lt;/th>
              &lt;th scope="col" class="title-th">제목&lt;/th>
              &lt;th scope="col" class="date-th">등록일&lt;/th>
              &lt;th scope="col" class="comment-th">답변&lt;/th>
            &lt;/tr>
          &lt;/thead>
          &lt;tbody>
            &lt;tr>
              &lt;td class="num-td">1&lt;/td>
              &lt;td>홈페이지&lt;/td>
              &lt;td class="title-td">
                &lt;NuxtLink to="'#'" title="나의문의내역 상세 페이지로 이동">
                  공지사항입니다.
                &lt;/NuxtLink>
              &lt;/td>
              &lt;td>2025-02-13&lt;/td>
              &lt;td>답변 대기&lt;/td>
            &lt;/tr>
          &lt;/tbody>
        &lt;/CommonTable>
        &lt;div class="common-table__list mo-visible">
          &lt;ul>
            &lt;li>
              &lt;span class="bx-num"> 1 &lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">홈페이지&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>답변 1&lt;/dd>
                  &lt;/dl>
                &lt;/div>
              &lt;/div>
            &lt;/li>
            &lt;li>
              &lt;span class="bx-num">2&lt;/span>
              &lt;div class="bx">
                &lt;a href="#" class="text-title"
                >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한 경우&lt;/a
                >
                &lt;div class="bx-info">
                  &lt;dl>
                    &lt;dt class="tit">홈페이지&lt;/dt>
                    &lt;dd>2017-02-14&lt;/dd>
                    &lt;dd>답변 1&lt;/dd>
                  &lt;/dl>
                &lt;/div>
              &lt;/div>
            &lt;/li>
          &lt;/ul>
        &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
