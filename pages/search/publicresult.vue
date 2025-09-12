<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useInstitutionStore } from '~/stores/search/institution';
import EmptyTabResult from '~/pages/search/emptytab.vue';
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Loading from '~/components/allsearch/loading.vue';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import CardB from '~/components/ui/card/cardB.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const searchStore = useSearchStore();
const { searchMain } = storeToRefs(searchStore);

const institutionStore = useInstitutionStore();
const { institutionList, institutionListQuery, institutionGroupList } =
  storeToRefs(institutionStore);

onMounted(async () => {
  if (institutionGroupList.value.length > 0) {
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
  () => institutionGroupList.value,
  async (newValue) => {
    setDetailOptions();
  },
  {
    deep: true
  }
);

const goToPage = (page: number) => {
  institutionListQuery.value.page = page;
  reSearch();
};

const changeSize = (e) => {
  institutionListQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.08
  institutionListQuery.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.08
  institutionListQuery.value.page = 1;
  reSearch();
};

const activeButton = ref(null);
const desc = (index) => {
  institutionListQuery.value.sort = index;
  institutionListQuery.value.page = 1;
  reSearch();
  activeButton.value = index;
};

// 검색어 입력 상태
const searchQuery = inject('searchQuery');

const instClsfCheckboxes = ref([]);

const setDetailOptions = () => {
  setInstClsfCheckboxes();
};

// 기관 체크박스
const setInstClsfCheckboxes = () => {
  if (institutionGroupList.value && institutionGroupList.value.length > 0) {
    instClsfCheckboxes.value = institutionGroupList.value[0].labels;
  } else {
    instClsfCheckboxes.value = [];
  }
};

const { showAlert } = useCustomAlert();

// 선택한 검색 조건
const detailItems = ref([]);

// 툴팁 상태 관리
const showToolTip = ref(false);

const updateToolTipState = () => {
  const isInstClsfChecked = instClsfCheckboxes.value.some(
    (checkbox) => checkbox.checked
  );
  const hasAdditionalDetailItems = detailItems.value.length > 0;

  showToolTip.value = isInstClsfChecked || hasAdditionalDetailItems;
};

// 제거
const removeDetailItem = (index: number) => {
  const item = detailItems.value[index];

  // 기관인지 서비스 분류인지 확인
  if (item.startsWith('기관 분류: ')) {
    const label = item.replace('기관 분류: ', '');
    // 해당하는 기관 체크박스의 checked 상태를 false로 설정
    const checkbox = instClsfCheckboxes.value.find((cb) => cb.label === label);
    if (checkbox) {
      checkbox.checked = false;
    }
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

// "옵션 펼치기" 버튼 클릭 시 상세 옵션 표시

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

const resetInstClsfCheckboxes = () => {
  instClsfCheckboxes.value.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const resetReSearchQuery = () => {
  reSearchQuery.value = '';
  reSearchQueryList.value = [];
};

// 상세 옵션의 초기화 함수
const resetDetail = () => {
  resetInstClsfCheckboxes();
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
const resetInstState = (isEqual: boolean) => {
  resetInstClsfCheckboxes();
  hideDetail();
  institutionListQuery.value.size = 12;
  institutionListQuery.value.sort = 'A';
  institutionListQuery.value.defaultText = '12개씩 보기'; // 접근성 Dropdown 수정 25.04.08

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
  institutionListQuery.value.page = 1;

  // 툴팁 비활성화
  showToolTip.value = false;

  // 기관 분류 체크박스 중 선택된 것이 있는지 확인
  const isInstClsfChecked = instClsfCheckboxes.value.some(
    (checkbox) => checkbox.checked
  );

  // 기관 분류 검색
  if (isInstClsfChecked) {
    const checkedInstClsf = instClsfCheckboxes.value
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    institutionListQuery.value.instClsfCd = [...checkedInstClsf].join(' ');
  } else {
    institutionListQuery.value.instClsfCd = '';
  }

  // 결과 내 재검색어
  institutionListQuery.value.reSearchQuery = reSearchQueryList.value;

  reSearch();
};

const reSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchQuery.value = searchMain.value.searchQuery;
  }
  await institutionStore.reSearchInstitutionList();
};

// 기관 분류 체크박스 상태 변화 감지
watch(
  instClsfCheckboxes,
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
  // 기관 분류에서 선택된 항목 처리
  const selectedInstClsf = instClsfCheckboxes.value
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => `기관 분류: ${checkbox.label}`);

  let reSearchQueryLabel = [];
  if (reSearchQueryList.value.length > 0) {
    reSearchQueryLabel = reSearchQueryList.value.map(
      (item) => '검색어: ' + item
    );
  }

  // detailItems 업데이트
  detailItems.value = [...selectedInstClsf, ...reSearchQueryLabel];
};

const instCnt = computed(() => {
  return formatComma(institutionList.value.totalElements);
});

const removeHighlightingTag = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  return kwd.replace(reg, '');
};

// 메서드를 부모에 노출
defineExpose({
  resetInstState
});
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <h4>
            <b>{{ institutionListQuery.searchQuery }}</b> 검색결과
          </h4>
          <transition name="fade">
            <div class="detail-table-wrap">
              <div class="result-table-box detail-table-box">
                <table>
                  <caption>
                    기관 항목의 기관 분류, 결과 내 재검색, 선택한 검색 조건 옵션
                    선택 표
                  </caption>
                  <colgroup>
                    <col style="width: 14%" />
                    <col style="width: 86%" />
                  </colgroup>
                  <tbody>
                    <template v-if="isDetailVisible">
                      <tr>
                        <th scope="row">기관 분류</th>
                        <td class="pubilc-td">
                          <div class="public-box">
                            <div
                              class="form-check check-input-box"
                              v-for="(checkbox, index) in instClsfCheckboxes"
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

          <template v-if="instCnt == 0">
            <EmptyTabResult />
          </template>
          <template v-else>
            <div class="service-box">
              <div class="search-info-wrap">
                <div class="list-search-box">
                  <strong>
                    총 <span>{{ instCnt }}건</span>의 관련 기관이 있습니다.
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
                  <!--                    v-model="institutionListQuery.size"-->
                  <!--                    @change="changeSize"-->
                  <!--                  >-->
                  <!--                    <option name="size" value="4">4개씩 보기</option>-->
                  <!--                    <option name="size" value="8">8개씩 보기</option>-->
                  <!--                    <option name="size" value="12">12개씩 보기</option>-->
                  <!--                  </select>-->

                  <!-- 접근성 Dropdown 추가 25.04.08 -->
                  <Dropdown
                    :buttonText="institutionListQuery.defaultText"
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
                          institutionListQuery.size === item.value
                            ? '선택됨'
                            : ''
                        "
                      >
                        <span class="text-span">{{ item.text }}</span>
                      </button>
                    </li>
                  </Dropdown>
                  <!-- //접근성 Dropdown 추가 25.04.08 -->
                </div>
              </div>
              <div class="service-list-boxs">
                <div class="list-box">
                  <Loading />
                  <div class="card-list">
                    <template v-for="(inst, index) in institutionList.content">
                      <CardB
                        :title="inst.instNm"
                        :textLine="4"
                        :content="inst.instSrvc"
                        dlDt="제공서비스"
                        :dlDd="inst.instSrvc"
                        :link="`/servicepvsn?instNo=${inst.instNo}`"
                        :hpUrl="inst.hpUrl"
                        :menu-items="inst.urlList"
                      />
                      <!--
                      <div class="col-xl-3 col-12">
                        <div class="card-box">
                          <div class="card-headers">
                            <strong
                              v-html="$instNmOverride(inst.instNm)"
                            ></strong>
                            <p v-html="inst.instExpln"></p>
                          </div>
                          <div class="card-bodys">
                            <dl>
                              <dt>제공서비스</dt>
                              <dd v-html="inst.instSrvc"></dd>
                            </dl>
                            <Dropbutton
                              v-if="inst.urlList.length > 0"
                              buttonText="관련기관 바로가기"
                              :menuItems="inst.urlList"
                              :title="removeHighlightingTag(inst.instNm)"
                            />
                            <button
                              v-else
                              class="btn url-list"
                              :disabled="inst.urlList.length === 0"
                            >
                              <span class="text-span"> 관련기관 없음 </span>
                            </button>
                          </div>
                          <div class="card-footers">
                            <NuxtLink
                              :to="`/servicepvsn?instNo=${inst.instNo}`"
                              class="btn info-button"
                              :external="true"
                              :title="removeHighlightingTag(inst.instNm)"
                            >
                              <div class="info-text">자세히보기</div>
                            </NuxtLink>
                            <NuxtLink
                              :to="inst.hpUrl"
                              target="_blank"
                              :title="`${removeHighlightingTag(inst.instNm)} 새 창 열림`"
                              class="btn link-button"
                              :disabled="inst.hpUrl == ''"
                            >
                              <span class="text-span">홈페이지 바로가기</span>
                              <span class="icon-span">
                                <img
                                  src="/image/sub/service/shortcut_black.svg"
                                  alt=""
                                />
                              </span>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    --></template>
                  </div>
                </div>
              </div>
              <CommonPagenation
                :page="institutionListQuery.page"
                :size="institutionListQuery.size"
                :total-elements="institutionList.totalElements"
                :show-pagination-count="10"
                @change="goToPage"
              />
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/publicresult.scss';
</style>
