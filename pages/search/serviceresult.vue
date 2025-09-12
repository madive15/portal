<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useServiceStore } from '~/stores/search/service';
import type { ServiceListType } from '~/types/search/service';
import { DEFAULT_SERVICE } from '~/constants/search/service';
import { cloneDeep } from 'lodash-es';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Loading from '~/components/allsearch/loading.vue';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import CardA from '~/components/ui/card/cardA.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const serviceStore = useServiceStore();
const { serviceList, serviceListQuery, serviceGroupList } =
  storeToRefs(serviceStore);

onMounted(async () => {
  if (serviceGroupList.value.length > 0) {
    setDetailOptions();
  }
});

/*  접근성 Dropdown 추가 25.04.08 */
const slot = [
  { text: '4개씩 보기', value: 4 },
  { text: '8개씩 보기', value: 8 },
  { text: '12개씩 보기', value: 12 }
];
/*  // 접근성 Dropdown 추가 25.04.08 */

watch(
  () => serviceGroupList.value,
  async (newValue) => {
    setDetailOptions();
  },
  {
    deep: true
  }
);

const goToPage = (page: number) => {
  serviceListQuery.value.page = page;
  reSearch();
};

const changeSize = (e) => {
  serviceListQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.08
  serviceListQuery.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.08
  serviceListQuery.value.page = 1;
  reSearch();
};

const activeButton = ref(null);
const desc = (index) => {
  serviceListQuery.value.sort = index;
  serviceListQuery.value.page = 1;
  reSearch();
  activeButton.value = index;
};

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

// 기관 체크 박스
const instCheckboxes = ref([]);

// 서비스 유형 체크 박스
const ctgryCheckboxes = ref([]);

// 대상자 체크 박스
const trprCheckboxes = ref([]);

const setDetailOptions = () => {
  setInstCheckboxes();
  setCtgryCheckboxes();
  setTrprCheckboxes();
};

// 기관 체크박스
const setInstCheckboxes = () => {
  if (serviceGroupList.value && serviceGroupList.value.length > 0) {
    instCheckboxes.value = serviceGroupList.value[0].labels;
  } else {
    instCheckboxes.value = [];
  }
};

// 서비스 유형 체크박스
const setCtgryCheckboxes = () => {
  if (serviceGroupList.value && serviceGroupList.value.length > 0) {
    ctgryCheckboxes.value = serviceGroupList.value[1].labels;
  } else {
    ctgryCheckboxes.value = [];
  }
};

// 대상자 유형 체크박스
const setTrprCheckboxes = () => {
  if (serviceGroupList.value && serviceGroupList.value.length > 0) {
    trprCheckboxes.value = serviceGroupList.value[2].labels;
  } else {
    trprCheckboxes.value = [];
  }
};

// 요약보기
const isExpanded = ref<boolean>(false);
const toggleExpand = (item) => {
  if (!item.expanded) {
    isExpanded.value = true;
    itemExpanded.value = item;
    serviceList.value.content.forEach((srvc) => (srvc.expanded = false));
  } else {
    isExpanded.value = false;
    itemExpanded.value = cloneDeep(DEFAULT_SERVICE);
  }

  item.expanded = !item.expanded;
};

const itemExpanded = ref<ServiceListType>(cloneDeep(DEFAULT_SERVICE));

// 서비스 유형의 "전체" 체크박스 상태 관리
const ctgrySelectAll = computed<boolean>({
  get() {
    return ctgryCheckboxes.value.every((checkbox) => !checkbox.checked);
  },
  set(value: boolean) {
    if (value) {
      ctgryCheckboxes.value.forEach((checkbox) => {
        checkbox.checked = !value;
      });
    }
  }
});

// 대상자의 "전체" 체크박스 상태 관리
const trprSelectAll = computed<boolean>({
  get() {
    return trprCheckboxes.value.every((checkbox) => !checkbox.checked);
  },
  set(value: boolean) {
    if (value) {
      trprCheckboxes.value.forEach((checkbox) => {
        checkbox.checked = !value;
      });
    }
  }
});

const { showAlert } = useCustomAlert();

// 선택한 검색 조건
const detailItems = ref([]);

// 툴팁 상태 관리
const showToolTip = ref(false);

const updateToolTipState = () => {
  const isCtgryNotDefault = !ctgrySelectAll.value;
  const isTrprNotDefault = !trprSelectAll.value;
  const hasAdditionalDetailItems = detailItems.value.some(
    (item) => item !== '서비스 유형: 전체' && item !== '대상자: 전체'
  );

  showToolTip.value =
    isCtgryNotDefault || isTrprNotDefault || hasAdditionalDetailItems;
};

// 제거
const removeDetailItem = (index: number) => {
  const item = detailItems.value[index];

  // 기관인지 서비스 분류인지 확인
  if (item.startsWith('기관: ')) {
    const label = item.replace('기관: ', '');
    // 해당하는 기관 체크박스의 checked 상태를 false로 설정
    const checkbox = instCheckboxes.value.find((cb) => cb.label === label);
    if (checkbox) {
      checkbox.checked = false;
    }
  } else if (item.startsWith('검색어: ')) {
    // 결과 내 재검색어
    const label = item.replace('검색어: ', '');
    const kwdIdx = reSearchQueryList.value.findIndex((kwd) => kwd === label);
    reSearchQueryList.value.splice(kwdIdx, 1);
  } else if (item.startsWith('서비스 유형: ') || item.startsWith('대상자: ')) {
    // "전체" 체크박스는 해제 불가
    return;
  } else {
    // 체크박스의 checked 상태를 false로 설정
    const checkbox = [...ctgryCheckboxes.value, ...trprCheckboxes.value].find(
      (cb) => processServiceLabel(cb.label) === item
    );
    if (checkbox) {
      checkbox.checked = false;
    }
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
    firstItem.value[0].focus();
  }, 200);
};

// "옵션 접기" 버튼 클릭 시 상세 옵션 숨기기
const hideDetail = () => {
  isDetailVisible.value = false;
};

const resetInstCheckboxes = () => {
  instCheckboxes.value.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const resetCtgryCheckboxes = () => {
  ctgryCheckboxes.value.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const resetTrprCheckboxes = () => {
  trprCheckboxes.value.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const resetReSearchQuery = () => {
  reSearchQuery.value = '';
  reSearchQueryList.value = [];
};

// 상세 옵션의 초기화 함수
const resetDetail = () => {
  resetInstCheckboxes();
  resetCtgryCheckboxes();
  resetTrprCheckboxes();
  resetReSearchQuery();
  // resetDetailItems();

  // SweetAlert 메시지 표시
  showAlert({
    icon: 'success',
    text: '모든 내용이 초기화 되었습니다.',
    confirmButtonText: '확인'
  });
};

// 탭 이동 시 검색 결과 초기화 함수
const resetServiceState = (isEqual: boolean) => {
  resetInstCheckboxes();
  resetCtgryCheckboxes();
  resetTrprCheckboxes();
  hideDetail();
  serviceListQuery.value.size = 12;
  serviceListQuery.value.sort = 'A';
  serviceListQuery.value.defaultText = '12개씩 보기'; // 접근성 Dropdown 수정 25.04.08
  serviceList.value.content.forEach((srvc) => (srvc.expanded = false));

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
  serviceListQuery.value.page = 1;

  // 툴팁 비활성화
  showToolTip.value = false;

  // 기관 체크박스 중 선택된 것이 있는지 확인
  const isInstChecked = instCheckboxes.value.some(
    (checkbox) => checkbox.checked
  );

  // 기관 검색
  if (isInstChecked) {
    const checkedInst = instCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    serviceListQuery.value.instNo = [...checkedInst].join(' ');
  } else {
    serviceListQuery.value.instNo = '';
  }

  // 서비스 유형 체크박스 중 선택된 것이 있는지 확인
  const isCtgryChecked = ctgryCheckboxes.value.some(
    (checkbox) => checkbox.checked
  );
  if (ctgrySelectAll.value) {
    serviceListQuery.value.ctgryNo = '';
  } else if (isCtgryChecked) {
    const checkedCtgry = ctgryCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    serviceListQuery.value.ctgryNo = [...checkedCtgry].join(' ');
  } else {
    // 체크된 항목이 없으면 경고 메시지 표시
    showAlert({
      icon: 'warning',
      text: '하나의 서비스 유형을 체크하셔야 검색이 가능합니다.'
    });
    return;
  }

  // 대상자 체크박스 중 선택된 것이 있는지 확인
  const isTrprChecked = trprCheckboxes.value.some(
    (checkbox) => checkbox.checked
  );
  if (trprSelectAll.value) {
    serviceListQuery.value.trprNo = '';
  } else if (isTrprChecked) {
    const checkedTrpr = trprCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    serviceListQuery.value.trprNo = [...checkedTrpr].join(' ');
  } else {
    // 체크된 항목이 없으면 경고 메시지 표시
    showAlert({
      icon: 'warning',
      text: '하나의 대상자를 체크하셔야 검색이 가능합니다.'
    });
    return;
  }

  // 결과 내 재검색어
  serviceListQuery.value.reSearchQuery = reSearchQueryList.value;

  reSearch();
};

const reSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchQuery.value = searchMain.value.searchQuery;
  }
  await serviceStore.reSearchServiceList();
};

// 기관 체크박스 상태 변화 감지
watch(
  instCheckboxes,
  () => {
    updateDetailItems();
  },
  { deep: true }
);

// 서비스 유형 체크박스 상태 변화 감지
watch(
  ctgryCheckboxes,
  () => {
    updateDetailItems();
  },
  { deep: true }
);

// 대상자 체크박스 상태 변화 감지
watch(
  trprCheckboxes,
  () => {
    updateDetailItems();
  },
  { deep: true }
);

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
  // 기관에서 선택된 항목 처리
  const selectedInst = instCheckboxes.value
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => `기관: ${checkbox.label}`);

  // 서비스 유형에서 선택된 항목 처리
  const selectedCtgryLabel = [];

  if (ctgrySelectAll.value) {
    selectedCtgryLabel.push('서비스 유형: 전체');
  } else {
    const selectedCtgry = ctgryCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => processServiceLabel(checkbox.label));
    selectedCtgryLabel.push(...selectedCtgry);
  }

  // 대상자에서 선택된 항목 처리
  const selectedTrprLabel = [];

  if (trprSelectAll.value) {
    selectedTrprLabel.push('대상자: 전체');
  } else {
    const selectedTrpr = trprCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => processServiceLabel(checkbox.label));
    selectedTrprLabel.push(...selectedTrpr);
  }

  let reSearchQueryLabel = [];
  if (reSearchQueryList.value.length > 0) {
    reSearchQueryLabel = reSearchQueryList.value.map(
      (item) => '검색어: ' + item
    );
  }

  // detailItems 업데이트
  detailItems.value = [
    ...selectedInst,
    ...selectedCtgryLabel,
    ...selectedTrprLabel,
    ...reSearchQueryLabel
  ];
};

// 라벨 처리 함수
const processServiceLabel = (label: string): string => {
  // 라벨에 '/'가 있는 경우 ' > '로 대체
  return label.includes('/') ? label.replace(/\s*\/\s*/g, ' > ') : label;
};

const srvcCnt = computed(() => {
  return formatComma(serviceList.value.totalElements);
});

const removeHighlightingTag = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  return kwd.replace(reg, '');
};

// 메서드를 부모에 노출
defineExpose({
  resetServiceState
});
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <h4>
            <b>{{ serviceListQuery.searchQuery }}</b> 검색결과
          </h4>
          <transition name="fade">
            <div class="detail-table-wrap">
              <div class="result-table-box detail-table-box">
                <table>
                  <caption>
                    서비스 항목의 기관, 서비스 분류, 결과 내 재검색, 선택한 검색
                    조건 옵션 선택 표
                  </caption>
                  <colgroup>
                    <col style="width: 14%" />
                    <col style="width: 86%" />
                  </colgroup>
                  <tbody>
                    <template v-if="isDetailVisible">
                      <tr>
                        <th scope="row">기관</th>
                        <td class="pubilc-td">
                          <div class="public-box">
                            <div
                              class="form-check check-input-box"
                              v-for="(checkbox, index) in instCheckboxes"
                              :key="checkbox.id"
                            >
                              <input
                                v-bind="index === 0 ? { ref: 'firstItem' } : {}"
                                class="form-check-input check-input"
                                type="checkbox"
                                :id="checkbox.id"
                                v-model="checkbox.checked"
                              />
                              <label
                                class="form-check-label check-label"
                                :for="checkbox.id"
                              >
                                {{ checkbox.label }}
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">서비스 분류</th>
                        <td class="check-td">
                          <div class="row">
                            <!-- 첫 번째 그룹 -->
                            <div class="col-xl-6 col-12">
                              <div class="check-box">
                                <!-- 첫 번째 그룹의 "전체" 체크박스 -->
                                <div class="form-check all-check-box">
                                  <input
                                    class="form-check-input all-check-input"
                                    type="checkbox"
                                    id="all-category-check"
                                    v-model="ctgrySelectAll"
                                    onclick="return false"
                                  />
                                  <label
                                    class="form-check-label all-check-label"
                                    for="all-category-check"
                                  >
                                    전체
                                  </label>
                                </div>
                                <!-- 첫 번째 그룹의 개별 체크박스 -->
                                <div
                                  class="form-check check-input-box"
                                  v-for="(checkbox, index) in ctgryCheckboxes"
                                  :key="checkbox.id"
                                >
                                  <input
                                    class="form-check-input check-input"
                                    type="checkbox"
                                    :id="checkbox.id"
                                    v-model="checkbox.checked"
                                  />
                                  <label
                                    class="form-check-label check-label"
                                    :for="checkbox.id"
                                  >
                                    {{ checkbox.label }}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <!-- 두 번째 그룹 -->
                            <div class="col-xl-6 col-12">
                              <div class="check-box">
                                <!-- 두 번째 그룹의 "전체" 체크박스 -->
                                <div class="form-check all-check-box">
                                  <input
                                    class="form-check-input all-check-input"
                                    type="checkbox"
                                    id="all-category-check1"
                                    v-model="trprSelectAll"
                                    onclick="return false"
                                  />
                                  <label
                                    class="form-check-label all-check-label"
                                    for="all-category-check1"
                                  >
                                    전체
                                  </label>
                                </div>
                                <!-- 두 번째 그룹의 개별 체크박스 -->
                                <div
                                  class="form-check check-input-box"
                                  v-for="(checkbox, index) in trprCheckboxes"
                                  :key="checkbox.id"
                                >
                                  <input
                                    class="form-check-input check-input"
                                    type="checkbox"
                                    :id="checkbox.id"
                                    v-model="checkbox.checked"
                                  />
                                  <label
                                    class="form-check-label check-label"
                                    :for="checkbox.id"
                                  >
                                    {{ checkbox.label }}
                                  </label>
                                </div>
                              </div>
                            </div>
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

          <template v-if="srvcCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="search-info-wrap">
                <div class="list-search-box">
                  <strong>
                    총 <span>{{ srvcCnt }}건</span>의 관련 서비스가 있습니다.
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
                  <!--                    v-model="serviceListQuery.size"-->
                  <!--                    @change="changeSize"-->
                  <!--                  >-->
                  <!--                    <option name="size" value="4">4개씩 보기</option>-->
                  <!--                    <option name="size" value="8">8개씩 보기</option>-->
                  <!--                    <option name="size" value="12">12개씩 보기</option>-->
                  <!--                  </select>-->

                  <!-- 접근성 Dropdown 추가 25.04.08 -->
                  <Dropdown
                    :buttonText="serviceListQuery.defaultText"
                    :drop-slots="true"
                    class="select-box list-3"
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
                          serviceListQuery.size === item.value ? '선택됨' : ''
                        "
                      >
                        <span class="text-span">{{ item.text }}</span>
                      </button>
                    </li>
                  </Dropdown>
                  <!-- //접근성 Dropdown 추가 25.04.08 -->
                </div>
              </div>
              <div class="list-box">
                <Loading />
                <div class="card-list">
                  <template v-for="(srvc, index) in serviceList.content">
                    <CardA
                      :title="srvc.srvcTtl"
                      textLine="3"
                      :content="srvc.srvcExpln"
                      dlDt="대상자"
                      :dlDd="srvc.trprNm"
                      dlDt2="담당기관"
                      :dlDd2="srvc.instNm"
                      :link="`/servicetype?srvcNo=${srvc.srvcNo}`"
                    />
                  </template>
                </div>
                <!--                <div class="row list-row">
                  <div
                    class="col-xl-3 col-12"
                    v-for="(srvc, index) in serviceList.content"
                  >
                    <div
                      class="card-list-box"
                      :class="{ active: srvc.expanded }"
                    >
                      <div class="card-list-header">
                        <strong v-html="srvc.srvcTtl"></strong>
                      </div>
                      <div class="card-list-middle">
                        &lt;!&ndash;<p v-html="srvc.srvcExpln"></p>&ndash;&gt;
                        <p>
                          <truncatetext
                            :max-length="75"
                            :text="srvc.srvcExpln"
                          />
                        </p>
                        <ul>
                          <li v-if="srvc.trprNo">
                            <strong>대상자 : </strong>{{ srvc.trprNm }}
                          </li>
                          <li v-if="srvc.instNo">
                            <strong>담당기관 : </strong
                            >{{
                              $instNmOverride(
                                srvc.instNm,
                                srvc.instNo,
                                srvc.srvcNo
                              )
                            }}
                          </li>
                        </ul>
                      </div>
                      <div class="card-list-footer">
                        <button
                          class="btn priview-button d-none"
                          @click="toggleExpand(srvc)"
                          :disabled="srvc.svcCnt == 0"
                        >
                          <span class="text-span">
                            {{ srvc.expanded ? '요약닫기' : '요약보기' }}
                          </span>
                          <span class="icon-span">
                            <img
                              src="/image/sub/service/summation_down.svg"
                              alt="요약보기"
                            />
                          </span>
                        </button>
                        <NuxtLink
                          :to="`/servicetype?srvcNo=${srvc.srvcNo}`"
                          class="btn list-link-button"
                          :external="true"
                          :title="removeHighlightingTag(srvc.srvcTtl)"
                        >
                          <span class="text-span">자세히보기</span>
                        </NuxtLink>
                      </div>
                    </div>
                    &lt;!&ndash; 요약보기 클릭 시 나오는 내용 &ndash;&gt;
                    <div
                      v-if="srvc.expanded"
                      class="col-xl-12 col-12 none-col"
                      :class="{ active: !isExpanded }"
                    >
                      <div class="inner-box">
                        <div class="inner-header">
                          <strong>
                            {{ itemExpanded.instNm }}
                          </strong>
                          <NuxtLink
                            :to="`/servicepvsn?instNo=${srvc.instNo}`"
                            class="btn information-button"
                            :external="true"
                          >
                            <span class="text-span">기관안내 자세히보기</span>
                            <span class="icon-span">
                              <img
                                src="/image/sub/service/view.svg"
                                alt="기관안내 자세히보기"
                              />
                            </span>
                          </NuxtLink>
                        </div>
                        <div class="inner-body">
                          <div class="row">
                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl1 }}</dt>
                                  <dd>{{ itemExpanded.smryNm1 }}</dd>
                                </dl>
                              </div>
                            </div>

                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl2 }}</dt>
                                  <dd>{{ itemExpanded.smryNm2 }}</dd>
                                </dl>
                              </div>
                            </div>

                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl3 }}</dt>
                                  <dd>{{ itemExpanded.smryNm3 }}</dd>
                                </dl>
                              </div>
                            </div>

                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl4 }}</dt>
                                  <dd>{{ itemExpanded.smryNm4 }}</dd>
                                </dl>
                              </div>
                            </div>

                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl5 }}</dt>
                                  <dd>{{ itemExpanded.smryNm5 }}</dd>
                                </dl>
                              </div>
                            </div>

                            <div class="col-xl-4 col-12 inner-col">
                              <div class="info-box">
                                <dl>
                                  <dt>{{ itemExpanded.smryTtl6 }}</dt>
                                  <dd>{{ itemExpanded.smryNm6 }}</dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    &lt;!&ndash; 요약 내용 끝 &ndash;&gt;
                  </div>
                </div>-->
              </div>
            </div>
            <CommonPagenation
              :page="serviceListQuery.page"
              :size="serviceListQuery.size"
              :total-elements="serviceList.totalElements"
              :show-pagination-count="10"
              @change="goToPage"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/serviceresult.scss';
</style>
