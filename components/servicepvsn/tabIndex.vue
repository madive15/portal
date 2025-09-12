<script setup lang="ts">
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import Info from '~/components/svc/info.vue';
import { ref, onMounted } from 'vue';
import { useTrprStore } from '~/stores/trpr';
import { storeToRefs } from 'pinia';
import { useFileStore } from '~/stores/file';
import { useCaseStore } from '~/stores/case';
import { useSvcStore } from '~/stores/svc';
import { useTmpltStore } from '~/stores/tmplt';
import Dropdown from '~/components/dropdown/dropbutton.vue';

const tabRef = ref<InstanceType<typeof Tab> | null>(null);

const goToTab = (url: string) => {
  if (tabRef.value) {
    tabRef.value.goToTabByUrl(url);
  }
};

onMounted(() => {
  goToTab('asd');
});

const isExpanded = ref(false);

const route = useRoute();
const router = useRouter();

const fileStore = useFileStore();
const fileList = ref([]);

/*  접근성 Dropdown 추가 25.04.07 */
const DefautText = ref('10개씩 보기'); // 서식
const selectedItem = ref(''); // 서식

const DefautTextCase = ref('10개씩 보기'); // 사례
const selectedItemCase = ref(''); // 사례

const DefautTextSrvc = ref('10개씩 보기'); // 서비스
const selectedItemSrvc = ref(''); // 서비스

const slot = [
  { text: '10개씩 보기', value: '10' },
  { text: '20개씩 보기', value: '20' },
  { text: '30개씩 보기', value: '30' },
  { text: '40개씩 보기', value: '40' },
  { text: '50개씩 보기', value: '50' }
];

const slotSrvc = [
  { text: '12개씩 보기', value: '12' },
  { text: '24개씩 보기', value: '24' },
  { text: '36개씩 보기', value: '36' },
  { text: '48개씩 보기', value: '48' },
  { text: '60개씩 보기', value: '60' }
];
/*  // 접근성 Dropdown 추가 25.04.07 */

const svcStore = useSvcStore();
const { srvc, svcTypeQuery, svcInst, svcUrl } = storeToRefs(svcStore);

const lwaCase = useCaseStore();
const { caseTypeQuery, caseList } = storeToRefs(lwaCase);

const tmpltStore = useTmpltStore();
const { tmpltList, tmpltTypeQuery } = storeToRefs(tmpltStore);

const instNo = route.query.instNo;
const gd = ref([]);
const gd2 = ref([]);
const gd3 = ref([]);

const urlList = ref([]);

onBeforeMount(async () => {
  selectedItem.value = '10'; // 접근성 Dropdown 추가 25.04.07
  selectedItemCase.value = '10'; // 접근성 Dropdown 추가 25.04.07
  selectedItemSrvc.value = '12'; // 접근성 Dropdown 추가 25.04.07

  caseTypeQuery.value.instNo = instNo;
  svcTypeQuery.value.instNo = instNo;
  tmpltTypeQuery.value.instNo = instNo;

  await Promise.all([
    lwaCase.searchCaseList(),
    useTrprStore().searchTrprList(),
    useSvcStore().searchSrvcList(),
    useTmpltStore().searchTmpltList(),
    useSvcStore().searchSvcInstList(instNo),
    useSvcStore().findSummery(instNo),
    useSvcStore().searchSvcUrlList(instNo)
  ]);

  gd.value = svcInst.value.map((item) => ({
    gdTtl: item.gdTtl,
    gdNm: item.gdNm,
    gdCn: item.gdCn
  }));

  gd2.value = gd.value.filter((item) => item.gdNm == '기관소개');
  gd3.value = gd.value.filter((item) => item.gdNm == '이용절차');

  urlList.value = svcUrl.value.map((item) => ({
    text: item.urlNm,
    to: item.urlAddr
  }));

  //console.log('tmpltList.value', tmpltList.value);
});

const list = computed(() => {
  const page = caseTypeQuery.value.page - 1;
  const size = caseTypeQuery.value.size;
  const totalElement = caseList.value.totalElements;
  const listAll = caseList.value.content;

  return listAll.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index
  }));
});

const srvcList = computed(() => {
  const page = svcTypeQuery.value.page - 1;
  const size = svcTypeQuery.value.size;
  const totalElement = srvc.value.totalElements;
  const listAll = srvc.value.content;
  const isExpanded = ref(false);

  return listAll.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index,
    isExpanded: isExpanded
  }));
});

const tmpltsearch = async () => {
  await useTmpltStore().searchTmpltList();
};

const tmpList = computed(() => {
  const page = tmpltTypeQuery.value.page - 1;
  const size = tmpltTypeQuery.value.size;
  const totalElement = tmpltList.value.totalElements;

  return tmpltList.value.content.map((item, index) => ({
    ...item,
    no: totalElement - page * size - index
  }));
});

const goToPageSvcType = (page: number) => {
  svcTypeQuery.value.page = page;
  useSvcStore().searchSrvcList();
};

const goToPage = (page: number) => {
  tmpltTypeQuery.value.page = page;
  tmpltStore.searchTmpltList();
};

const goToPageCaseType = (page: number) => {
  caseTypeQuery.value.page = page;
  lwaCase.searchCaseList();
};

const viewImg = (trprNo) => {
  // FIXME 솔루션 연결 시 작업 진행
  alert('솔루션 연결 필요');
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const svcSearch = () => {
  svcTypeQuery.value.page = 1;
  useSvcStore().searchSrvcList();
};

const changeSrvc = (e) => {
  svcTypeQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  DefautTextSrvc.value = e.text; // 접근성 Dropdown 추가 25.04.07
  selectedItemSrvc.value = e.value; // 접근성 Dropdown 추가 25.04.07
  svcSearch();
};

const activeButton = ref(null);
const descSvc = (index) => {
  svcTypeQuery.value.desc = index;
  svcSearch();
  activeButton.value = index;
};

const search = () => {
  lwaCase.searchCaseList();
};

const changeCase = (e) => {
  caseTypeQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  DefautTextCase.value = e.text; // 접근성 Dropdown 추가 25.04.07
  selectedItemCase.value = e.value; // 접근성 Dropdown 추가 25.04.07
  search();
};

const changeTmplt = (e) => {
  tmpltTypeQuery.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  DefautText.value = e.text; // 접근성 Dropdown 추가 25.04.07
  selectedItem.value = e.value; // 접근성 Dropdown 추가 25.04.07
  tmpltsearch();
};

const descTmplt = (index) => {
  tmpltTypeQuery.value.desc = index;
  tmpltsearch();
  activeButton.value = index;
};

const descCase = (index) => {
  caseTypeQuery.value.desc = index;
  search();
  activeButton.value = index;
};

// const descCnt = () => {
//   caseTypeQuery.value.desc = 'C';
//   search();
// };

/*=======================================*/

const selected = ref(false);
const toggleExpand = (item) => {
  item.isExpanded = !item.isExpanded;
  selected.value = !item.isExpanded;
};

const test = () => {
  tab.value = 0;
};
</script>

<template>
  <div class="tab-box">
    <Tab :default-active-tab="0">
      <TabItem title="기관소개">
        <div
          class="intro-box"
          v-for="(item, index) in gd2"
          :key="index"
          id="service-list-tab-boxs"
        >
          <div v-if="item.imgUseYn == 'Y'" class="stop-box">
            <img
              v-if="item.atchFileId"
              :src="`/api/image?atchFileId=${item.atchFileId}&atchFileSeq=1`"
              style="max-width: 100%"
            />
          </div>
          <div v-else v-html="item.gdCn" id="service-list-tab-boxs"></div>
        </div>
      </TabItem>
      <TabItem title="이용절차" url="asd">
        <div class="stop-box" v-for="(item, index) in gd3" :key="index">
          <div v-if="item.imgUseYn == 'Y'" class="stop-box">
            <img
              v-if="item.atchFileId"
              :src="`/api/image?atchFileId=${item.atchFileId}&atchFileSeq=1`"
              style="max-width: 100%"
            />
          </div>
          <div v-else v-html="item.gdCn" id="service-list-tab-boxs"></div>
        </div>
      </TabItem>
      <TabItem title="서비스">
        <div class="service-box">
          <div class="search-info-wrap">
            <div class="list-search-box">
              <strong>
                총 <span>{{ formatComma(srvc.totalElements) }}</span
                >건 의 관련 서비스가 있습니다.
              </strong>
              <label for="table-search-input">
                <span class="sr-only">결과 내 재검색</span>
              </label>
              <input
                class="form-control search-input"
                id="table-search-input"
                placeholder="결과 내 재검색"
                v-model="svcTypeQuery.instNm"
              />
              <button class="btn search-button" @click="svcSearch">
                <img src="/image/sub/example/re_search.svg" alt="검색" />
              </button>
            </div>
            <div class="view-box">
              <div class="sort-btn-box">
                <button
                  type="button"
                  class="hit-span"
                  :class="{ active: activeButton === 'T' }"
                  :title="activeButton === 'T' ? '선택됨' : ''"
                  @click="descSvc('T')"
                >
                  제목순
                </button>
                <span class="vr"></span>
                <button
                  type="button"
                  class="new-span"
                  :class="{ active: activeButton === 'Y' }"
                  :title="activeButton === 'Y' ? '선택됨' : ''"
                  @click="descSvc('Y')"
                >
                  최신순
                </button>
              </div>
              <!--              <label for="srvc">-->
              <!--                <span class="sr-only">항목 노출 갯수 선택</span>-->
              <!--              </label>-->
              <!--              <select-->
              <!--                class="form-select view-select"-->
              <!--                id="srvc"-->
              <!--                @change="changeSrvc"-->
              <!--              >-->
              <!--                <option name="srvc" value="10">10개씩 보기</option>-->
              <!--                <option name="srvc" value="20">20개씩 보기</option>-->
              <!--                <option name="srvc" value="30">30개씩 보기</option>-->
              <!--                <option name="srvc" value="40">40개씩 보기</option>-->
              <!--                <option name="srvc" value="50">50개씩 보기</option>-->
              <!--              </select>-->

              <!-- 접근성 Dropdown 추가 25.04.07 -->
              <Dropdown
                :buttonText="DefautTextSrvc"
                :drop-slots="true"
                class="select-box"
              >
                <li
                  class="hit-li"
                  v-for="(item, index) in slotSrvc"
                  :key="index"
                >
                  <button
                    type="button"
                    class="btn-item"
                    @click="changeSrvc(item)"
                    :title="selectedItemSrvc === item.value ? '선택됨' : ''"
                  >
                    <span class="text-span">{{ item.text }}</span>
                  </button>
                </li>
              </Dropdown>
              <!-- //접근성 Dropdown 추가 25.04.07 -->
            </div>
          </div>
          <div class="list-box">
            <div class="row list-row">
              <div
                class="col-xl-3 col-12"
                v-for="(item, index) in srvcList"
                :key="item.srvcTtl"
              >
                <div
                  class="card-list-box"
                  :class="{ active: !item.isExpanded }"
                >
                  <div class="card-list-header">
                    <strong>{{ item.srvcTtl }}</strong>
                  </div>
                  <div class="card-list-middle">
                    <p>
                      <Truncatetext :max-length="80" :text="item.srvcExpln" />
                    </p>
                    <ul>
                      <li><strong>대상자 : </strong>{{ item.trptNm }}</li>
                      <li>
                        <strong>담당기관 : </strong
                        >{{
                          $instNmOverride(item.instNm, item.instNo, item.srvcNo)
                        }}
                      </li>
                    </ul>
                  </div>
                  <div class="card-list-footer">
                    <button
                      class="btn priview-button"
                      :id="item.isExpanded"
                      :class="{ active: item.isExpanded == selected }"
                      @click="() => toggleExpand(item)"
                    >
                      <span class="text-span">{{
                        item.isExpanded ? '요약보기' : '요약닫기'
                      }}</span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/summation_down.svg"
                          alt=""
                        />
                      </span>
                    </button>
                    <NuxtLink
                      :to="'/servicetype'"
                      class="btn list-link-button"
                      :external="true"
                      :title="item.srvcTtl"
                    >
                      <span class="text-span"> 자세히보기 </span>
                    </NuxtLink>
                  </div>
                </div>
                <!-- 요약보기 클릭 시 나오는 내용 -->
                <div
                  v-if="!item.isExpanded"
                  class="col-xl-12 col-12 none-col"
                  :class="{ active: !item.isExpanded }"
                >
                  <div class="inner-box">
                    <div class="inner-header">
                      <strong>{{
                        $instNmOverride(item.instNm, item.instNo, item.srvcNo)
                      }}</strong>
                      <button class="btn information-button">
                        <a class="text-span" @click="test()"
                          >기관안내 자세히보기</a
                        >
                        <span class="icon-span">
                          <img
                            src="/image/sub/service/view.svg"
                            alt="기관안내 자세히보기"
                          />
                        </span>
                      </button>
                    </div>
                    <div class="inner-body">
                      <div class="row">
                        <div
                          v-if="item.trprNm != null"
                          class="col-xl-4 col-12 inner-col"
                        >
                          <div class="info-box">
                            <dl>
                              <dt>대상자</dt>
                              <dd>{{ item.trprNm }}</dd>
                            </dl>
                          </div>
                        </div>

                        <div
                          v-if="item.rgnNmInst != null"
                          class="col-xl-4 col-12 inner-col"
                        >
                          <div class="info-box">
                            <dl>
                              <dt>지역</dt>
                              <dd>{{ item.rgnNmInst }}</dd>
                            </dl>
                          </div>
                        </div>

                        <div
                          v-if="item.trprCtgry != null"
                          class="col-xl-4 col-12 inner-col"
                        >
                          <div class="info-box">
                            <dl>
                              <dt>서비스 유형</dt>
                              <dd>{{ item.trprCtgry }}</dd>
                            </dl>
                          </div>
                        </div>

                        <div
                          v-if="item.mth != null"
                          class="col-xl-4 col-12 inner-col"
                        >
                          <div class="info-box">
                            <dl>
                              <dt>이용방법</dt>
                              <dd>{{ item.mth }}</dd>
                            </dl>
                          </div>
                        </div>

                        <div class="col-xl-4 col-12 inner-col template-col">
                          <div
                            v-if="item.caseCnt != 0 || item.tmpltCnt != 0"
                            class="info-box"
                          >
                            <dl>
                              <dt>사례/서식</dt>
                              <dd>관련 사례 {{ item.caseCnt }}건</dd>
                              <dd>관련 서식 {{ item.tmpltCnt }}건</dd>
                            </dl>
                          </div>
                        </div>

                        <div class="col-xl-4 col-12 inner-col link-col">
                          <div class="info-box">
                            <dl>
                              <dt>바로가기</dt>
                              <dd>
                                <dropbutton
                                  button-text="관련기관 페이지"
                                  :menuItems="urlList"
                                />
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 요약 내용 끝 -->
              </div>
            </div>
          </div>
          <boardpagenation
            :total-pages="srvc.totalPages"
            :initial-page="svcTypeQuery.page"
            @update:page="goToPageSvcType"
          />
        </div>
      </TabItem>
      <TabItem title="사례">
        <div class="example-list-box">
          <div class="search-info-wrap">
            <div class="list-search-box">
              <strong>
                총 <span>{{ formatComma(caseList.totalElements) }}</span
                >건 의 관련 사례가 있습니다.
              </strong>
              <label for="table-search-input">
                <span class="sr-only">결과 내 재검색</span>
              </label>
              <input
                class="form-control search-input"
                id="table-search-input"
                placeholder="결과 내 재검색"
                v-model="caseTypeQuery.keyword"
              />
              <button
                class="btn search-button"
                @click="search"
                @keyup.enter="search"
              >
                <img src="/image/sub/example/re_search.svg" alt="검색" />
              </button>
            </div>
            <div class="view-box">
              <div class="sort-btn-box">
                <button
                  type="button"
                  class="hit-span"
                  :class="{ active: activeButton === 'C' }"
                  :title="activeButton === 'C' ? '선택됨' : ''"
                  @click="descCase('C')"
                >
                  조회순
                </button>
                <span class="vr"></span>
                <button
                  type="button"
                  class="new-span"
                  :class="{ active: activeButton === 'Y' }"
                  :title="activeButton === 'Y' ? '선택됨' : ''"
                  @click="descCase('Y')"
                >
                  최신순
                </button>
              </div>

              <!--              <label for="case">-->
              <!--                <span class="sr-only">항목 노출 갯수 선택</span>-->
              <!--              </label>-->
              <!--              <select-->
              <!--                class="form-select view-select"-->
              <!--                id="case"-->
              <!--                @change="changeCase"-->
              <!--              >-->
              <!--                <option name="case" value="10">10개씩 보기</option>-->
              <!--                <option name="case" value="20">20개씩 보기</option>-->
              <!--                <option name="case" value="30">30개씩 보기</option>-->
              <!--                <option name="case" value="40">40개씩 보기</option>-->
              <!--                <option name="case" value="50">50개씩 보기</option>-->
              <!--              </select>-->

              <!-- 접근성 Dropdown 추가 25.04.07 -->
              <Dropdown
                :buttonText="DefautTextCase"
                :drop-slots="true"
                class="select-box"
              >
                <li class="hit-li" v-for="(item, index) in slot" :key="index">
                  <button
                    type="button"
                    class="btn-item"
                    @click="changeCase(item)"
                    :title="selectedItemCase === item.value ? '선택됨' : ''"
                  >
                    <span class="text-span">{{ item.text }}</span>
                  </button>
                </li>
              </Dropdown>
              <!-- //접근성 Dropdown 추가 25.04.07 -->
            </div>
          </div>
          <table>
            <caption>
              사례의 번호, 제목, 내용, 작성일, 조회수에 관한 표
            </caption>
            <thead>
              <tr>
                <th scope="col" class="num-th">번호</th>
                <th scope="col">제목</th>
                <th scope="col">내용</th>
                <th scope="col">작성일</th>
                <th scope="col">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td class="num-td">
                  {{ item.no }}
                </td>
                <td class="title-td">
                  <NuxtLink
                    :to="`/servicepvsn/detail?caseNo=${item.caseNo}&ctgryNo=${item.ctgryNo}`"
                    :external="true"
                  >
                    {{ item.caseTtl }}
                  </NuxtLink>
                </td>
                <td class="content-td">
                  <NuxtLink
                    :to="`/servicepvsn/detail?caseNo=${item.caseNo}&ctgryNo=${item.ctgryNo}`"
                    :external="true"
                  >
                    질문 : {{ item.caseQstnCn }}
                  </NuxtLink>
                </td>
                <td class="date-td">
                  {{ item.frstRegDt.substring(0, 10) }}
                </td>
                <td class="hit-td">{{ item.inqCnt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <boardpagenation
          :total-pages="caseList.totalPages"
          :initial-page="caseTypeQuery.page"
          @update:page="goToPageCaseType"
        />
      </TabItem>
      <TabItem title="서식">
        <div class="example-list-box">
          <div class="search-info-wrap">
            <div class="list-search-box">
              <strong>
                총
                <span>{{ formatComma(tmpltList.totalElements) }}건</span>의 관련
                사례가 있습니다.
              </strong>
              <label for="table-search-input">
                <span class="sr-only">결과 내 재검색</span>
              </label>
              <input
                class="form-control search-input"
                id="table-search-input"
                placeholder="결과 내 재검색"
                v-model="tmpltTypeQuery.keyword"
              />
              <button
                class="btn search-button"
                @click="tmpltsearch"
                @keyup.enter="tmpltsearch"
              >
                <img src="/image/sub/example/re_search.svg" alt="검색" />
              </button>
            </div>
            <div class="view-box">
              <div class="sort-btn-box">
                <button
                  type="button"
                  class="hit-span"
                  :class="{ active: activeButton === 'T' }"
                  :title="activeButton === 'T' ? '선택됨' : ''"
                  @click="descTmplt('T')"
                >
                  제목순
                </button>
                <span class="vr"></span>
                <button
                  type="button"
                  class="new-span"
                  :class="{ active: activeButton === 'Y' }"
                  :title="activeButton === 'Y' ? '선택됨' : ''"
                  @click="descTmplt('Y')"
                >
                  최신순
                </button>
              </div>

              <!--              <label for="tmplt">-->
              <!--                <span class="sr-only">항목 노출 갯수 선택</span>-->
              <!--              </label>-->
              <!--              <select-->
              <!--                class="form-select view-select"-->
              <!--                id="tmplt"-->
              <!--                @change="changeTmplt"-->
              <!--              >-->
              <!--                <option name="tmplt" value="10">10개씩 보기</option>-->
              <!--                <option name="tmplt" value="20">20개씩 보기</option>-->
              <!--                <option name="tmplt" value="30">30개씩 보기</option>-->
              <!--                <option name="tmplt" value="40">40개씩 보기</option>-->
              <!--                <option name="tmplt" value="50">50개씩 보기</option>-->
              <!--              </select>-->

              <!-- 접근성 Dropdown 추가 25.04.07 -->
              <Dropdown
                :buttonText="DefautText"
                :drop-slots="true"
                class="select-box"
              >
                <li class="hit-li" v-for="(item, index) in slot" :key="index">
                  <button
                    type="button"
                    class="btn-item"
                    @click="changeTmplt(item)"
                    :title="selectedItem === item.value ? '선택됨' : ''"
                  >
                    <span class="text-span">{{ item.text }}</span>
                  </button>
                </li>
              </Dropdown>
              <!-- //접근성 Dropdown 추가 25.04.07 -->
            </div>
          </div>
          <table>
            <caption>
              서식의 번호, 분류, 서식, 다운로드, 다운로드수, 작성일에 관한 표
            </caption>
            <thead>
              <tr>
                <th scope="col" class="num-th">번호</th>
                <th scope="col" class="select-th">분류</th>
                <th scope="col">서식</th>
                <th scope="col">다운로드</th>
                <th scope="col">다운로드수</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tmpList" :key="index">
                <td class="num-td">
                  {{ item.no }}
                </td>
                <td class="category-td">
                  {{ item.lwaCtgryNm }}
                </td>
                <td class="title-td">
                  <NuxtLink :to="''" :external="true">
                    <truncatetext max-length="50" v-model:text="item.tmpltNm" />
                  </NuxtLink>
                </td>
                <td class="download-td">
                  <div class="download-box">
                    <button
                      class="btn download-button"
                      @click="() => download(item.atchFileId)"
                    >
                      <span class="icon-span">
                        <img src="/image/sub/customer/file.svg" alt="" />
                      </span>
                      <span class="text-span"> 다운로드 1 </span>
                    </button>
                    <button class="btn download-button">
                      <span class="icon-span">
                        <img src="/image/sub/customer/file.svg" alt="" />
                      </span>
                      <span class="text-span"> 다운로드 2 </span>
                    </button>
                    <button
                      class="btn preview-button"
                      @click="viewImg(tmpltList.tmpltNo)"
                      title="PDF 문서 바로보기 (새 창에서 열림)"
                    >
                      <span class="icon-span">
                        <img src="/image/sub/template/shortcut_wh.svg" alt="" />
                      </span>
                      <span class="text-span"> 바로보기 </span>
                    </button>
                  </div>
                </td>
                <td>
                  {{ item.atchFileDwmldCnt }}
                </td>
                <td class="date-td">
                  {{ item.frstRegDt.substring(0, 10) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <boardpagenation
          :total-pages="tmpltList.totalPages"
          :initial-page="tmpltTypeQuery.page"
          @update:page="goToPage"
        />
      </TabItem>
      <TabItem title="조직도">
        <div class="organization-box">
          <h4>조직도</h4>
          <div class="organization-content-box">
            <img src="assets/image/sub/service/organization.png" alt="조직도" />
          </div>
        </div>
      </TabItem>
      <TabItem title="자료실 목록형">
        <!-- 목록형 -->
        <div class="board-list-box">
          <div class="search-info-wrap">
            <div class="list-search-box">
              <strong> 총 <span>1,000건</span>의 관련 사례가 있습니다. </strong>
              <label for="table-search-input">
                <span class="sr-only">결과 내 재검색</span>
              </label>
              <input
                class="form-control search-input"
                id="table-search-input"
                placeholder="결과 내 재검색"
              />
              <button class="btn search-button">
                <img src="/image/sub/example/re_search.svg" alt="검색" />
              </button>
            </div>
            <div class="view-box">
              <div class="sort-btn-box">
                <button class="hit-span">조회순</button>
                <span class="vr"></span>
                <button class="new-span">최신순</button>
              </div>

              <label for="sel1">
                <span class="sr-only">항목 노출 갯수 선택</span>
              </label>
              <select id="sel1" class="form-select view-select">
                <option value="10개씩 보기">10개씩 보기</option>
              </select>
            </div>
          </div>
          <div class="board-list-table-box">
            <table>
              <caption>
                자료의 번호, 제목, 첨부, 작성일, 조회수에 관한 표
              </caption>
              <thead>
                <tr>
                  <th scope="col" class="num-th">번호</th>
                  <th scope="col" class="title-th">제목</th>
                  <th scope="col" class="file-th">첨부</th>
                  <th scope="col" class="date-th">작성일</th>
                  <th scope="col" class="hit-th">조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="num-td">15</td>
                  <td class="title-td">
                    <NuxtLink :to="'#'" :external="true">
                      2023년도 공공기관 종합청렴도 평가 결과
                    </NuxtLink>
                  </td>
                  <!-- 파일이 있을때 파일 아이콘이 나옵니다. -->
                  <td class="file-td">
                    <img
                      src="/image/sub/customer/file.svg"
                      alt="게시판 파일첨부"
                    />
                  </td>
                  <td class="date-td">2024-12-04</td>
                  <td class="hit-td">173</td>
                </tr>
                <tr>
                  <td class="num-td">15</td>
                  <td class="title-td">
                    <NuxtLink :to="'#'" :external="true">
                      2023년도 공공기관 종합청렴도 평가 결과
                    </NuxtLink>
                  </td>
                  <!-- 파일이 없을때는 - 로 나옵니다. -->
                  <td class="file-td">-</td>
                  <td class="date-td">2024-12-04</td>
                  <td class="hit-td">173</td>
                </tr>
                <tr>
                  <td class="num-td">15</td>
                  <td class="title-td">
                    <NuxtLink :to="'#'" :external="true">
                      2023년도 공공기관 종합청렴도 평가 결과
                    </NuxtLink>
                  </td>
                  <!-- 파일이 없을때는 - 로 나옵니다. -->
                  <td class="file-td">-</td>
                  <td class="date-td">2024-12-04</td>
                  <td class="hit-td">173</td>
                </tr>
              </tbody>
            </table>
          </div>
          <boardpagenation :total-pages="20" />
        </div>
      </TabItem>
      <TabItem title="자료실 갤러리형">
        <div class="board-gallery-list-box">
          <div class="search-info-wrap">
            <div class="list-search-box">
              <strong>총 <span>1,000건</span>의 관련 사례가 있습니다. </strong>
              <label for="table-search-input">
                <span class="sr-only">결과 내 재검색</span>
              </label>
              <input
                class="form-control search-input"
                id="table-search-input"
                placeholder="결과 내 재검색"
              />
              <button class="btn search-button">
                <img src="assets/image/sub/service/re_search.svg" alt="검색" />
              </button>
            </div>
            <div class="view-box">
              <div class="sort-btn-box">
                <button type="button" class="hit-span">조회순</button>
                <span class="vr"></span>
                <button type="button" class="new-span">최신순</button>
              </div>

              <label for="sel2">
                <span class="sr-only">항목 노출 갯수 선택</span>
              </label>
              <select id="sel2" class="form-select view-select">
                <option value="10개씩 보기">10개씩 보기</option>
              </select>
            </div>
          </div>
          <div class="gallery-box">
            <div class="row">
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xl-3 col-12">
                <div class="info-box">
                  <NuxtLink :to="'#'" :external="true">
                    <div class="img-box">
                      <!-- 이미지가 없을때는 이 이미지를 대체합니다. -->
                      <img
                        src="assets/image/sub/service/gallery_box.png"
                        alt="이미지 없을 때 대체"
                      />
                    </div>
                    <div class="gallery-text-box">
                      <strong
                        >게시글 제목을 입력합니다. 글이 길어질 경우에는 글을 ...
                        처리합니다.</strong
                      >
                      <span
                        >게시글 내용이 출력됩니다. 글이 길어질 경우에는 글이 ...
                        처리합니다.</span
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <boardpagenation :total-pages="20" />
        </div>
      </TabItem>
    </Tab>
  </div>
</template>

<style scoped lang="scss">
@use './scss/tabIndex';
</style>
