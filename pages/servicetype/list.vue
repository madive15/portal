<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import { ref } from 'vue';
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';
import { useSrchStore } from '~/stores/srch';
import CardA from '~/components/ui/card/cardA.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

definePageMeta({
  layout: 'service-type'
});

const isExpanded = ref(false);
const currentPage = ref(1);

const route = useRoute();

const selectedSubCategory = ref();
const svcTypeStore = useSvcTypeStore();
const srchStore = useSrchStore();
const {
  svcList,
  svcUrl,
  svcCtgryList,
  svcTypeQuery: svcTypeQuerySelect,
  svcMenuList
} = storeToRefs(svcTypeStore);
const { srch, srchMain, srchChk, srchTypeQuery } = storeToRefs(srchStore);

const svcStore = useSvcStore();
const { srvc, svcTypeQuery } = storeToRefs(svcStore);

const upCtgryNo = ref<string>('');

onBeforeMount(async () => {
  await svcTypeStore.resetCaseStore();
  await svcStore.resetCaseStore();
  await svcStore.resetSrvc();

  if (route.query.upCtgryNo !== '') {
    upCtgryNo.value = route.query.upCtgryNo;
    svcTypeQuerySelect.value.upCtgryNo = upCtgryNo.value;
    svcTypeQuery.value.upCtgryNo = upCtgryNo.value;
  }

  if (upCtgryNo.value.startsWith('4')) {
    await srchStore.selectSrchList();
    // selectedSubCategory.value = srchCtgryList.value[0].ctgryNo;
    // svcTypeQuery.value.subCategoryNo = '';

    selectedSubCategory.value = '';
    svcTypeQuery.value.subCategoryNo = '';

    await reloadSrchList();
  } else {
    await svcTypeStore.searchSvcTypeCtgryList();
    // selectedSubCategory.value = svcCtgryList.value[0].ctgryNo;
    // svcTypeQuery.value.subCategoryNo = svcCtgryList.value[0].ctgryNo;

    selectedSubCategory.value = '';
    svcTypeQuery.value.subCategoryNo = '';

    await svcStore.searchSrvcList();
  }
});

watch(route, async (newValue) => {
  if (newValue.query.upCtgryNo !== undefined) {
    await svcTypeStore.resetCaseStore();
    await svcTypeStore.resetCaseStore();
    await svcStore.resetCaseStore();
    await svcStore.resetSrvc();

    upCtgryNo.value = newValue.query.upCtgryNo;

    if (upCtgryNo.value.startsWith('4')) {
      if (srchCtgryList.value[0] === undefined) {
        await srchStore.selectSrchList();
      }

      // selectedSubCategory.value = srchCtgryList.value[0].ctgryNo;
      selectedSubCategory.value = '';

      await reloadSrchList();
    } else {
      svcTypeQuerySelect.value.upCtgryNo = newValue.query.upCtgryNo;
      svcTypeQuery.value.upCtgryNo = newValue.query.upCtgryNo;

      await svcTypeStore.searchSvcTypeCtgryList();

      if (upCtgryNo.value.startsWith('1')) {
        // const ctgryNoYn = svcMenuList.value.filter(
        //   (item) => item.ctgryNo === newValue.query.upCtgryNo
        // )[0].cnt;

        // if (ctgryNoYn > 0) {
        //   selectedSubCategory.value = svcCtgryList.value[0].ctgryNo;
        //   svcTypeQuery.value.subCategoryNo = svcCtgryList.value[0].ctgryNo;
        // } else {
        //   selectedSubCategory.value = newValue.query.upCtgryNo;
        // }
        selectedSubCategory.value = '';
        svcTypeQuery.value.subCategoryNo = '';
      } else {
        selectedSubCategory.value = '';
        svcTypeQuery.value.subCategoryNo = '';
      }

      await svcStore.searchSrvcList();
    }
  }
});

const reloadSrchList = async () => {
  srchTypeQuery.value = {
    srvcSvc: [],
    srvc: upCtgryNo.value,
    page: currentPage.value,
    size: 12,
    srchChk: selectedSubCategory.value,
    srchSvcChk: '',
    srvcMap: ''
  };

  await srchStore.selectSrchMainList(); // 서비스 리스트
};

const list = computed(() => {
  currentPage.value = svcTypeQuery.value.page;

  const page = svcTypeQuery.value.page - 1;
  const size = svcTypeQuery.value.size;
  const totalElement = svcList.value.totalElements;

  return svcList.value.content
    .filter((item) => {
      if (!svcTypeQuery.value.subCategoryNo) {
        return true;
      }
      return item.ctgryNo === svcTypeQuery.value.subCategoryNo;
    })
    .map((item, index) => ({
      ...item,
      no: totalElement - page * size - index
    }));
});

const changeSubCtgry = (index: number) => {
  if (upCtgryNo.value.startsWith('4')) {
    if (index == -1) {
      selectedSubCategory.value = '';
      route.query.ctgryNo = '';
    } else {
      const item = srchCtgryList.value[index];
      selectedSubCategory.value = item.ctgryNo;
      route.query.ctgryNo = item.ctgryNo;
    }
    currentPage.value = 1;
    reloadSrchList();
  } else {
    if (index == -1) {
      selectedSubCategory.value = '';
      route.query.ctgryNo = '';
    } else {
      const item = svcCtgryList.value[index];
      selectedSubCategory.value = item.ctgryNo;
      route.query.ctgryNo = item.ctgryNo;
    }
    svcTypeQuery.value = {
      ...svcTypeQuery.value,
      page: 1,
      subCategoryNo: selectedSubCategory.value
    };
    currentPage.value = 1;
    svcStore.searchSrvcList();
  }
};

const search = () => {
  svcTypeStore.searchSvcTypeList();
};

const selected = ref(false);

// 데이터 목록
const srvcList = computed(() => {
  const isExpanded = ref(false);
  const page = svcTypeQuery.value.page - 1;
  currentPage.value = svcTypeQuery.value.page;
  const size = svcTypeQuery.value.size;
  const totalElement = srvc.value.totalElements;
  return srvc.value.content.map((item, index) => ({
    no: totalElement - page * size - index,
    ...item,
    isExpanded: isExpanded
  }));
});

const srchMainList = computed(() => {
  const isExpanded = ref(false);
  const page = svcTypeQuery.value.page - 1;
  currentPage.value = svcTypeQuery.value.page;
  const size = svcTypeQuery.value.size;
  const totalElement = srvc.value.totalElements;
  return srchMain.value.content.map((item, index) => ({
    no: totalElement - page * size - index,
    ...item,
    isExpanded: isExpanded
  }));
});

const srchCtgryList = computed(() => {
  if (srchChk.value && Array.isArray(srchChk.value)) {
    return srchChk.value.filter((s) =>
      s.ctgryNo.startsWith(upCtgryNo.value.substring(0, 4))
    );
  }

  return [];
});

const toggleExpand = (item) => {
  item.isExpanded = !item.isExpanded;
  selected.value = !item.isExpanded;
};

const goToPageSvcType = (page: number) => {
  svcTypeQuery.value.page = page;
  currentPage.value = page;
  svcStore.searchSrvcList();
};

const goToPageSrchType = (page: number) => {
  srchTypeQuery.value.page = page;
  currentPage.value = page;
  srchStore.selectSrchMainList();
};
</script>

<template>
  <div class="sub-content-box" id="service-category-list">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="서비스 목록"
          :showPrintButton="true"
          :breadcrumbItems="[{ text: '', active: true }]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="tabs type2">
          <ul class="tab-headers" v-if="upCtgryNo.startsWith('4')">
            <li :class="['tab-header', { active: selectedSubCategory == '' }]">
              <button
                type="button"
                class="tab-btn"
                :title="selectedSubCategory == '' ? '선택됨' : ''"
                @click="changeSubCtgry(-1)"
              >
                전체
              </button>
            </li>
            <li
              v-for="(item, index) in srchCtgryList"
              :key="`category-${index}`"
              :class="[
                'tab-header',
                { active: selectedSubCategory === item.ctgryNo }
              ]"
            >
              <button
                type="button"
                class="tab-btn"
                :title="selectedSubCategory === item.ctgryNo ? '선택됨' : ''"
                @click="changeSubCtgry(index)"
              >
                {{ item.lwaCtgryNm }}
              </button>
            </li>
          </ul>
          <ul class="tab-headers" v-if="upCtgryNo.startsWith('1')">
            <li :class="{ active: selectedSubCategory == '' }">
              <button
                type="button"
                class="tab-btn"
                :title="selectedSubCategory == '' ? '선택됨' : ''"
                @click="changeSubCtgry(-1)"
              >
                전체
              </button>
            </li>
            <li
              v-for="(item, index) in svcCtgryList"
              :key="`category-${index}`"
              :class="{ active: selectedSubCategory === item.ctgryNo }"
            >
              <button
                type="button"
                class="tab-btn"
                :title="selectedSubCategory === item.ctgryNo ? '선택됨' : ''"
                @click="changeSubCtgry(index)"
              >
                {{ item.ctgryNm }}
              </button>
            </li>
          </ul>
        </div>
        <div class="service-box">
          <div class="list-box">
            <div class="card-list" v-if="upCtgryNo.startsWith('4')">
              <CardA
                v-for="(item, index) in srchMainList"
                :key="item.srvcTtl"
                :title="item.srvcTtl"
                textLine="3"
                :content="item.srvcExpln"
                dlDt="대상자"
                :dlDd="item.trprNm"
                dlDt2="담당기관"
                :dlDd2="$instNmOverride(item.instNm, item.instNo, item.srvcNo)"
                :link="`/servicetype?srvcNo=${item.srvcNo}&instNo=${item.instNo}&upCtgryNo=${upCtgryNo}`"
              >
                <button
                  class="btn priview-button d-none"
                  :id="item.isExpanded"
                  :class="{ active: item.isExpanded == selected }"
                  @click="() => toggleExpand(item)"
                >
                  <span class="text-span">{{
                    item.isExpanded ? '요약닫기' : '요약보기'
                  }}</span>
                  <span class="icon-span">
                    <img
                      v-if="!item.isExpanded"
                      src="/image/sub/service/summation_down.svg"
                      alt=""
                    />
                    <img
                      v-if="item.isExpanded"
                      src="/image/sub/service/summation_up.svg"
                      alt=""
                    />
                  </span>
                </button>

                <div
                  v-if="item.isExpanded"
                  class="col-xl-12 col-12 none-col"
                  :class="{ active: item.isExpanded }"
                >
                  <!-- 요약보기 클릭시 나오는 내용 -->
                  <div class="inner-box">
                    <div class="inner-header">
                      <strong>{{
                        $instNmOverride(item.instNm, item.instNo, item.srvcNo)
                      }}</strong>
                      <NuxtLink
                        :to="`/servicepvsn?instNo=${item.instNo}`"
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

                        <div
                          v-if="item.caseCnt != 0 || item.tmpltCnt != 0"
                          class="col-xl-4 col-12 inner-col template-col"
                        >
                          <div class="info-box">
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
                                  :menuItems="item.urls"
                                />
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardA>
            </div>

            <div class="card-list" v-if="upCtgryNo.startsWith('1')">
              <CardA
                v-for="(item, index) in srvcList"
                :key="item.srvcTtl"
                :title="item.srvcTtl"
                textLine="3"
                :content="item.srvcExpln"
                dlDt="대상자"
                :dlDd="item.trprNm"
                dlDt2="담당기관"
                :dlDd2="$instNmOverride(item.instNm, item.instNo, item.srvcNo)"
                :link="`/servicetype?srvcNo=${item.srvcNo}&instNo=${item.instNo}&upCtgryNo=${upCtgryNo}`"
              >
                <button
                  class="btn priview-button d-none"
                  :id="item.isExpanded"
                  :class="{ active: item.isExpanded == selected }"
                  @click="() => toggleExpand(item)"
                >
                  <span class="text-span">{{
                    item.isExpanded ? '요약닫기' : '요약보기'
                  }}</span>
                  <span class="icon-span">
                    <img
                      v-if="!item.isExpanded"
                      src="/image/sub/service/summation_down.svg"
                      alt=""
                    />
                    <img
                      v-if="item.isExpanded"
                      src="/image/sub/service/summation_up.svg"
                      alt=""
                    />
                  </span>
                </button>

                <div
                  v-if="item.isExpanded"
                  class="col-xl-12 col-12 none-col"
                  :class="{ active: item.isExpanded }"
                >
                  <!-- 요약보기 클릭시 나오는 내용 -->
                  <div class="inner-box">
                    <div class="inner-header">
                      <strong>{{
                        $instNmOverride(item.instNm, item.instNo, item.srvcNo)
                      }}</strong>
                      <NuxtLink
                        :to="`/servicepvsn?instNo=${item.instNo}`"
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

                        <div
                          v-if="item.caseCnt != 0 || item.tmpltCnt != 0"
                          class="col-xl-4 col-12 inner-col template-col"
                        >
                          <div class="info-box">
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
                                  :menuItems="item.urls"
                                />
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardA>
            </div>
          </div>
          <CommonPagenation
            v-if="upCtgryNo.startsWith('4')"
            :page="srchTypeQuery.page"
            :size="srchTypeQuery.size"
            :total-elements="srchMain.totalElements"
            :show-pagination-count="10"
            @change="goToPageSrchType"
          />
          <CommonPagenation
            v-if="upCtgryNo.startsWith('1')"
            :page="svcTypeQuery.page"
            :size="svcTypeQuery.size"
            :total-elements="srvc.totalElements"
            :show-pagination-count="10"
            @change="goToPageSvcType"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/servicetype/list.scss';
</style>
