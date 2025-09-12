<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useEtcStore } from '~/stores/search/etc';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import DatePicker from '~/components/datepicker/datepicker.vue';
import Loading from '~/components/allsearch/loading.vue';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const etcStore = useEtcStore();
const { etcList, etcListQuery } = storeToRefs(etcStore);

/*  접근성 Dropdown 추가 25.04.08 */
const slot = [
  { text: '10개씩 보기', value: 10 },
  { text: '20개씩 보기', value: 20 },
  { text: '30개씩 보기', value: 30 },
  { text: '40개씩 보기', value: 40 },
  { text: '50개씩 보기', value: 50 }
];
/*  // 접근성 Dropdown 추가 25.04.08 */

const goToPage = (page: number) => {
  etcListQuery.value.page = page;
  reSearch();
};

const changeSize = (e) => {
  etcListQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.08
  etcListQuery.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.08
  etcListQuery.value.page = 1;
  reSearch();
};

const activeButton = ref(null);
const desc = (index) => {
  etcListQuery.value.sort = index;
  etcListQuery.value.page = 1;
  reSearch();
  activeButton.value = index;
};

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const startDt = ref<string | null>(null);
const endDt = ref<string | null>(null);
const startKey = ref(0);
const endKey = ref(0);

const { showAlert } = useCustomAlert();

// 선택한 검색 조건
const detailItems = ref<string[]>([]);

// 툴팁 상태 관리
const showToolTip = ref(false);

const updateToolTipState = () => {
  const isDateSelected = startDt.value && endDt.value;
  const hasAdditionalDetailItems = detailItems.value.length > 0;

  showToolTip.value = isDateSelected || hasAdditionalDetailItems;
};

// 제거
const removeDetailItem = (index: number) => {
  const item = detailItems.value[index];

  if (
    item.includes(' ~ ') ||
    item.startsWith('시작일:') ||
    item.startsWith('종료일:')
  ) {
    // 날짜 범위 항목 제거 시
    startDt.value = null;
    endDt.value = null;
  } else if (item.startsWith('검색어: ')) {
    // 결과 내 재검색어
    const label = item.replace('검색어: ', '');
    const kwdIdx = reSearchQueryList.value.findIndex((kwd) => kwd === label);
    reSearchQueryList.value.splice(kwdIdx, 1);
  }

  // detailItems에서 항목 제거
  detailItems.value.splice(index, 1);
};

// 상세 옵션의 표시 여부를 관리
const isDetailVisible = ref(false);

// 옵션 첫번째 값
const firstItem = ref();
// "옵션 펼치기" 버튼 클릭 시 상세 옵션 표시
const showDetail = () => {
  isDetailVisible.value = true;
  setTimeout(() => {
    firstItem.value.$el.focus();
  }, 200);
};

// "옵션 접기" 버튼 클릭 시 상세 옵션 숨기기
const hideDetail = () => {
  isDetailVisible.value = false;
};

const resetReSearchQuery = () => {
  reSearchQuery.value = '';
  reSearchQueryList.value = [];
};

// 상세 옵션의 초기화 함수
const resetDetail = () => {
  resetReSearchQuery();
  // resetDetailItems();

  startDt.value = null;
  endDt.value = null;

  // SweetAlert 메시지 표시
  showAlert({
    icon: 'success',
    text: '모든 내용이 초기화 되었습니다.',
    confirmButtonText: '확인'
  });
};

// 탭 이동 시 검색 결과 초기화 함수
const resetEtcState = (isEqual: boolean) => {
  hideDetail();
  etcListQuery.value.size = 20;
  etcListQuery.value.sort = 'A';
  etcListQuery.value.defaultText = '20개씩 보기'; // 접근성 Dropdown 수정 25.04.08
  startDt.value = null;
  endDt.value = null;

  if (searchMain.value.reSearchQuery.length > 0) {
    reSearchQuery.value = '';
    reSearchQueryList.value = [...searchMain.value.reSearchQuery];
  } else {
    resetReSearchQuery();
  }

  if (!isEqual) {
    search();
  }
};

// 재검색 검색어
const reSearchQuery = ref('');
const reSearchQueryList = ref([]);

// 결과 내 재검색 버튼 클릭 시 이벤트
const addResearch = () => {
  if (
    reSearchQuery.value &&
    !reSearchQueryList.value.includes(reSearchQuery.value)
  ) {
    reSearchQueryList.value.push(reSearchQuery.value);
    reSearchQuery.value = '';
  } else if (!reSearchQuery.value) {
    showAlert({
      icon: 'info',
      text: '검색어를 입력하세요.'
    });
  } else {
    showAlert({
      icon: 'info',
      text: '중복 검색어입니다.'
    });
  }
};

// 검색 함수
const search = () => {
  etcListQuery.value.page = 1;

  // 툴팁 비활성화
  showToolTip.value = false;

  // 기간
  etcListQuery.value.startDt =
    startDt.value <= endDt.value ? startDt.value : endDt.value;
  etcListQuery.value.endDt =
    startDt.value <= endDt.value ? endDt.value : startDt.value;

  // 결과 내 재검색어
  etcListQuery.value.reSearchQuery = reSearchQueryList.value;

  reSearch();
};

const reSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchQuery.value = searchMain.value.searchQuery;
  }
  await etcStore.reSearchEtcList();
};

// 날짜 선택 변화 감지
watch([startDt, endDt], ([newStart, newEnd], [oldStart, oldEnd]) => {
  if (newStart && newEnd) {
    const startDate = new Date(newStart);
    const endDate = new Date(newEnd);

    if (startDate > endDate) {
      console.log('!!!!!????');
      showAlert({
        icon: 'info',
        text: '날짜를 다시 선택해 주세요.'
      });

      if (newStart !== oldStart) {
        startDt.value = oldStart;
        startKey.value += 1;
      } else {
        endDt.value = oldEnd;
        endKey.value += 1;
      }

      return;
    }
  }
  updateDetailItems();
});

// 결과 내 재검색 상태 변화 감지
watch(
  reSearchQueryList,
  () => {
    updateDetailItems();
  },
  { deep: true }
);

// 선택한 검색 조건 상태 변화 감지
watch(
  detailItems,
  () => {
    updateToolTipState();
  },
  { deep: true }
);

const updateDetailItems = () => {
  let dateRange = '';
  if (startDt.value && endDt.value) {
    dateRange = `시작일: ${startDt.value} ~ 종료일: ${endDt.value}`;
  } else if (startDt.value) {
    dateRange = `시작일: ${startDt.value}`;
  } else if (endDt.value) {
    dateRange = `종료일: ${endDt.value}`;
  }

  // 날짜 범위가 선택되었을 경우 추가
  const dateItems = dateRange ? [dateRange] : [];

  let reSearchQueryLabel = [];
  if (reSearchQueryList.value.length > 0) {
    reSearchQueryLabel = reSearchQueryList.value.map(
      (item) => '검색어: ' + item
    );
  }

  // detailItems 업데이트
  detailItems.value = [...dateItems, ...reSearchQueryLabel];
};

const etcCnt = computed(() => {
  return formatComma(etcList.value.totalElements);
});

// 메서드를 부모에 노출
defineExpose({
  resetEtcState
});
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <h4>
            <b>{{ etcListQuery.searchQuery }}</b> 검색결과
          </h4>
          <transition name="fade">
            <div class="detail-table-wrap">
              <div class="result-table-box detail-table-box">
                <table>
                  <caption>
                    기타 항목의 기관, 결과 내 재검색, 선택한 검색 조건 옵션 선택
                    표
                  </caption>
                  <colgroup>
                    <col style="width: 14%" />
                    <col style="width: 86%" />
                  </colgroup>
                  <tbody>
                    <template v-if="isDetailVisible">
                      <tr>
                        <th scope="row">기간</th>
                        <td class="day-td">
                          <div class="day-box">
                            <!-- 반응형 모바일 개발 추가사항:데이트피커 변경 -->
                            <VueDatePicker
                              name="writePeriodStart"
                              id="write-period-start"
                              :year-range="[
                                new Date().getFullYear() - 5,
                                new Date().getFullYear() + 5
                              ]"
                              v-model="startDt"
                              locale="ko"
                              :enable-time-picker="false"
                              :format="'yyyy-MM-dd'"
                              :auto-apply="true"
                              :clearable="false"
                              :transitions="false"
                              :highlight-week-days="[0]"
                              :week-start="0"
                              placeholder="시작일 선택"
                              hide-input-icon
                              ref="firstItem"
                              tabindex="0"
                            />
                            <span class="more-span">~</span>
                            <VueDatePicker
                              name="writePeriodEnd"
                              id="write-period-end"
                              :year-range="[
                                new Date().getFullYear() - 5,
                                new Date().getFullYear() + 5
                              ]"
                              v-model="endDt"
                              locale="ko"
                              :enable-time-picker="false"
                              :format="'yyyy-MM-dd'"
                              :auto-apply="true"
                              :clearable="false"
                              :transitions="false"
                              :highlight-week-days="[0]"
                              :week-start="0"
                              placeholder="시작일 선택"
                              hide-input-icon
                            />
                            <!--// 반응형 모바일 개발 추가사항 -->
                            <!--<DatePicker
                              :key="startKey"
                              v-model="startDt"
                              format="yyyy-MM-dd"
                              title="시작일 선택"
                            />
                            <span class="more-span">~</span>
                            <DatePicker
                              :key="endKey"
                              v-model="endDt"
                              format="yyyy-MM-dd"
                            />-->
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <label for="research">결과 내 재검색</label>
                        </th>
                        <td class="research-td">
                          <div class="research-box">
                            <input
                              class="form-control research-input"
                              id="research"
                              placeholder="결과 내 재검색"
                              v-model="reSearchQuery"
                            />
                            <button class="btn research-button">
                              <img
                                src="~/assets/image/main/main_top_search.svg"
                                alt="결과 내 재검색"
                                @click="addResearch"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <tr>
                      <th scope="row">선택한 검색 조건</th>
                      <td class="search-result-td">
                        <div class="check-result-box">
                          <div class="check-tag-box">
                            <ul>
                              <li
                                class="category-li"
                                v-for="(item, index) in detailItems"
                                :key="index"
                              >
                                <truncatetext :max-length="10" :text="item" />
                                <button
                                  class="btn close-button"
                                  @click="removeDetailItem(index)"
                                >
                                  <img
                                    src="/image/sub/myservice/selected_delete.svg"
                                    alt="선택 삭제"
                                  />
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div class="result-button-box">
                            <Tooltip v-if="showToolTip">
                              <template #trigger>
                                <button
                                  class="btn search-button"
                                  @click="search"
                                >
                                  검색
                                </button>
                              </template>
                              검색 조건을 변경했습니다. 버튼<br />클릭 시
                              변경사항이 적용됩니다.
                            </Tooltip>

                            <button
                              v-else
                              class="btn search-button"
                              @click="search"
                            >
                              검색
                            </button>

                            <button
                              class="btn reflash-button"
                              @click="resetDetail"
                            >
                              <span class="text-span">초기화</span>
                              <span class="icon-span">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <polygon
                                    class="cls-1"
                                    points="17.21 11.01 13.95 8.76 14.81 7.51 16.95 8.99 18.66 7.02 19.81 8.03 17.21 11.01"
                                  />
                                  <path
                                    class="cls-1"
                                    d="M9.02,18.83C4.15,18.83.19,14.87.19,10S4.15,1.17,9.02,1.17s8.83,3.96,8.83,8.83h-1.52c0-4.03-3.28-7.3-7.3-7.3S1.71,5.97,1.71,10s3.28,7.3,7.3,7.3c2.94,0,5.58-1.75,6.73-4.45l1.4.6c-1.39,3.27-4.58,5.38-8.13,5.38Z"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
              <template v-if="!isDetailVisible">
                <div class="detail-button-box">
                  <button class="btn detail-button" @click="showDetail">
                    <span class="text-span">옵션 펼치기</span>
                    <span class="icon-span">
                      <img
                        src="/image/sub/search/option_down.svg"
                        alt="옵션 펼치기"
                      />
                    </span>
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="detail-button-box">
                  <button class="btn detail-button" @click="hideDetail">
                    <span class="text-span">옵션 접기</span>
                    <span class="icon-span">
                      <img
                        src="/image/sub/search/option_up.svg"
                        alt="옵션 닫기"
                      />
                    </span>
                  </button>
                </div>
              </template>
            </div>
          </transition>

          <template v-if="etcCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="search-info-wrap">
                <div class="list-search-box">
                  <strong>
                    총 <span>{{ etcCnt }}건</span>의 관련 게시물이 있습니다.
                  </strong>
                </div>
                <div class="view-box">
                  <div class="sort-btn-box">
                    <button
                      type="button"
                      class="hit-span"
                      :class="{ active: activeButton === 'A' }"
                      :title="activeButton === 'A' ? '선택됨' : ''"
                      @click="desc('A')"
                    >
                      정확도순
                    </button>
                    <span class="vr"></span>
                    <button
                      type="button"
                      class="new-span"
                      :class="{ active: activeButton === 'Y' }"
                      :title="activeButton === 'Y' ? '선택됨' : ''"
                      @click="desc('Y')"
                    >
                      최신순
                    </button>
                    <span class="vr"></span>
                    <button
                      type="button"
                      class="new-span"
                      :class="{ active: activeButton === 'T' }"
                      :title="activeButton === 'T' ? '선택됨' : ''"
                      @click="desc('T')"
                    >
                      제목순
                    </button>
                    <span class="vr"></span>
                    <button
                      type="button"
                      class="new-span"
                      :class="{ active: activeButton === 'C' }"
                      :title="activeButton === 'C' ? '선택됨' : ''"
                      @click="desc('C')"
                    >
                      조회순
                    </button>
                  </div>

                  <!--                  <label for="size">-->
                  <!--                    <span class="sr-only">항목 노출 갯수 선택</span>-->
                  <!--                  </label>-->
                  <!--                  <select-->
                  <!--                    class="form-select view-select"-->
                  <!--                    id="size"-->
                  <!--                    v-model="etcListQuery.size"-->
                  <!--                    @change="changeSize"-->
                  <!--                  >-->
                  <!--                    <option name="size" value="10">10개씩 보기</option>-->
                  <!--                    <option name="size" value="20">20개씩 보기</option>-->
                  <!--                    <option name="size" value="30">30개씩 보기</option>-->
                  <!--                    <option name="size" value="40">40개씩 보기</option>-->
                  <!--                    <option name="size" value="50">50개씩 보기</option>-->
                  <!--                  </select>-->

                  <!-- 접근성 Dropdown 추가 25.04.08 -->
                  <Dropdown
                    :buttonText="etcListQuery.defaultText"
                    :drop-slots="true"
                    class="select-box"
                  >
                    <li
                      class="hit-li"
                      v-for="(item, index) in slot"
                      :key="index"
                    >
                      <button
                        type="button"
                        class="btn-item"
                        @click="changeSize(item)"
                        :title="
                          etcListQuery.size === item.value ? '선택됨' : ''
                        "
                      >
                        <span class="text-span">{{ item.text }}</span>
                      </button>
                    </li>
                  </Dropdown>
                  <!-- //접근성 Dropdown 추가 25.04.08 -->
                </div>
              </div>

              <div class="example-list-boxs">
                <Loading />
                <div class="row">
                  <template v-for="(etc, index) in etcList.content">
                    <div class="col-xl-10 col-12 a-col">
                      <div class="list-text-box">
                        <NuxtLink
                          :to="`/center/ntc/detail?baId=${etc.pstTtl}`"
                          class="link-txt"
                          :external="true"
                        >
                          <dl>
                            <dt v-html="etc.pstTtl"></dt>
                            <dd class="title-dd" v-html="etc.pstCn"></dd>
                            <dd class="etc-dd">
                              <span class="date-span">
                                작성일 : {{ formatDate(etc.regDt) }}
                              </span>
                              <span class="vr"></span>
                              <span class="hit-span">
                                조회수 : {{ etc.inqCnt }}
                              </span>
                            </dd>
                          </dl>
                        </NuxtLink>
                      </div>
                    </div>
                    <div class="col-xl-2 col-12 cate-col">
                      <span class="bedge-span">{{ etc.etcClsfNm }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <boardpagenation
              :total-pages="etcList.totalPages"
              :initial-page="etcListQuery.page"
              @update:page="goToPage"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/etcresult.scss';
</style>
