<script setup lang="ts">
import { ref } from 'vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTableTypeE from '~/components/ui/table/tabletypeE.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import SearchCs from '~/components/ui/search/searchCs.vue';
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';

definePageMeta({
  layout: 'guide'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '브레드크럼 메뉴타이틀',
  menuitem: [
    { menuid: 1, text: '메뉴1', to: '/test1' },
    { menuid: 2, text: '메뉴2', to: '/test2' },
    { menuid: 3, text: '메뉴3', to: '/test3' },
    { menuid: 4, text: '메뉴3', to: '/test3' },
    { menuid: 6, text: '마지막 메뉴', to: '/test5' }
  ]
};

const activeIndex = ref<number | null>(null);
function setActive(index: number) {
  activeIndex.value = index;
}
onMounted(() => {
  setActive(1);
});
const dropdownCategory = ref('');
const searchData = true; //검색결과 없을 경우 false
</script>

<template>
  <div class="content" id="common-content">
    <div class="sub-wrap">
      <div class="container">
        <div class="sub-content-box">
          <section class="section1">
            <CommonBreadCrumb
              :breadcrumb-title="breadcrumbMenuItem.menutitle"
              :showPrintButton="true"
              :breadcrumbItems="breadcrumbMenuItem.menuitem"
            />
            <div class="common-category__button">
              <div class="btn-select__wrap mo-visible">
                <DropdownBasic
                  class="select-type"
                  v-model="dropdownCategory"
                  label="공지 사항"
                >
                  <template #default="{ select }">
                    <ul role="menu">
                      <li
                        role="menuitem"
                        tabindex="0"
                        @click="select('공지 사항')"
                        @keydown.enter.prevent="select('공지 사항')"
                      >
                        공지 사항
                      </li>
                      <li
                        role="menuitem"
                        tabindex="0"
                        @click="select('자주찾는 질문')"
                        @keydown.enter.prevent="select('자주찾는 질문')"
                      >
                        자주찾는 질문
                      </li>
                      <li
                        role="menuitem"
                        tabindex="0"
                        @click="select('시스템 이용 문의')"
                        @keydown.enter.prevent="select('시스템 이용 문의')"
                      >
                        시스템 이용 문의
                      </li>
                      <li
                        role="menuitem"
                        tabindex="0"
                        @click="select('이용안내')"
                        @keydown.enter.prevent="select('이용안내')"
                      >
                        이용안내
                      </li>
                    </ul>
                  </template>
                </DropdownBasic>
              </div>
              <div class="btn-tab__wrap-gap pc-visible">
                <router-link
                  to=""
                  class="btn-auto"
                  :class="{ active: activeIndex === 0 }"
                  @click="setActive(0)"
                  >공지사항</router-link
                >
                <router-link
                  to=""
                  class="btn-auto"
                  :class="{ active: activeIndex === 1 }"
                  @click="setActive(1)"
                  >자주찾는 질문</router-link
                >
                <router-link
                  to=""
                  class="btn-auto"
                  :class="{ active: activeIndex === 2 }"
                  @click="setActive(2)"
                  >시스템 이용 문의</router-link
                >
                <router-link
                  to=""
                  class="btn-auto"
                  :class="{ active: activeIndex === 3 }"
                  @click="setActive(3)"
                  >이용안내</router-link
                >
              </div>
            </div>

            <!-- 검색영역-->
            <SearchCs />
            <!-- //검색영역-->
          </section>
          <section class="section2">
            <CommonTabs :platform-tab-show="true">
              <CommonTabItem title="전체 100건">
                <template v-if="searchData">
                  <div class="common-table-box pc-visible">
                    <table>
                      <colgroup>
                        <col class="num-col" />
                        <col class="category-col" />
                        <col class="title-col" />
                        <col class="file-col" />
                        <col class="date-col" />
                        <col class="hit-col" />
                      </colgroup>
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
                            <span class="icon-notice">
                              <img
                                src="../../../../assets/image/sub/center/center_notice.svg"
                                alt="공지"
                              />
                            </span>
                          </td>
                          <td>
                            <span class="active-span"> 공지 </span>
                          </td>
                          <td class="title-td">
                            <NuxtLink
                              to="#"
                              title="공지사항 상세 페이지로 이동"
                            >
                              공지사항입니다.
                            </NuxtLink>
                          </td>
                          <td>-</td>
                          <td>2025-02-13</td>
                          <td>54</td>
                        </tr>
                        <tr>
                          <td class="num-td">
                            <span class="icon-notice">
                              <img
                                src="../../../../assets/image/sub/center/center_notice.svg"
                                alt="공지"
                              />
                            </span>
                          </td>
                          <td class="category-td">
                            <span class="active-span"> 공지 </span>
                          </td>
                          <td class="title-td">
                            <NuxtLink
                              to="#"
                              title="공지사항 상세 페이지로 이동"
                            >
                              공지사항입니다.
                            </NuxtLink>
                          </td>
                          <td>-</td>
                          <td>2025-02-13</td>
                          <td>54</td>
                        </tr>
                        <tr>
                          <td class="num-td">
                            <span class="icon-notice">
                              <img
                                src="../../../../assets/image/sub/center/center_notice.svg"
                                alt="공지"
                              />
                            </span>
                          </td>
                          <td class="category-td">
                            <span> 공지 </span>
                          </td>
                          <td class="title-td">
                            <NuxtLink
                              to="#"
                              title="공지사항 상세 페이지로 이동"
                            >
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
                            <NuxtLink
                              to="#"
                              title="공지사항 상세 페이지로 이동"
                            >
                              공지사항입니다.
                            </NuxtLink>
                          </td>
                          <td>
                            <button
                              class="btn-attach"
                              aria-label="첨부파일 다운로드"
                            >
                              <img
                                src="/image/sub/customer/file.svg"
                                alt="파일 다운로드"
                              />
                            </button>
                          </td>
                          <td>2025-02-13</td>
                          <td>54</td>
                        </tr>
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  </div>
                  <div class="common-table__list mo-visible">
                    <ul>
                      <li>
                        <span class="bx-num">
                          <span class="icon-notice">
                            <img
                              src="../../../../assets/image/sub/center/center_notice.svg"
                              alt="공지"
                            />
                          </span>
                        </span>
                        <div class="bx">
                          <a href="#" class="text-title"
                            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한
                            경우</a
                          >
                          <div class="bx-info">
                            <dl>
                              <dt class="tit">홍보자료</dt>
                              <dd>조회수 1235</dd>
                            </dl>
                          </div>
                          <div class="bx-btn">
                            <button
                              class="btn-attach"
                              title="첨부파일 다운로드"
                            >
                              <img
                                src="/image/sub/customer/file.svg"
                                alt="파일 다운로드"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <span class="bx-num">2</span>
                        <div class="bx">
                          <a href="#" class="text-title"
                            >회사분할로 퇴직금 일괄수령 후 재입사 형식 취한
                            경우</a
                          >
                          <div class="bx-info">
                            <dl>
                              <dt class="tit">공지</dt>
                              <dd>조회수 1235</dd>
                            </dl>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <CommonPagenation
                    :page="1"
                    :size="10"
                    :total-elements="1000"
                    :show-pagination-count="10"
                    @change="changePage"
                  />
                </template>
                <div class="board-empty-box" v-else>
                  <div class="img-box">
                    <img
                      src="/image/sub/customer/none.svg"
                      alt="결과가 존재하지 않습니다"
                    />
                  </div>
                  <div class="text-box">
                    <p>검색된 결과가 존재하지 않습니다.</p>
                  </div>
                </div>
              </CommonTabItem>
              <CommonTabItem title="서비스 22건"> 2 </CommonTabItem>
              <CommonTabItem title="홈페이지이용 22건"> 3 </CommonTabItem>
              <CommonTabItem title="회원 46건"> 4 </CommonTabItem>
              <CommonTabItem title="기타 100건"> 5 </CommonTabItem>
            </CommonTabs>
          </section>
        </div>
        <!-- 만족도 조사 -->
        <inputSatisfaction />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/ntc/list.scss';
</style>
