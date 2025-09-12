<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Dropbutton from '~/components/dropdown/dropbutton.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import CardA from '~/components/ui/card/cardA.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import { useEasySrchStore } from '~/stores/myservice';
import type { SrchTypeQuery } from '~/stores/myservice/index.types';
import type { Page } from '~/types/common';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';

const { showAlert } = useCustomAlert();

const route = useRoute();
const router = useRouter();

const { type, easySlideCd, easySlideSubCd } = route.query;

const query = ref<SrchTypeQuery>({
  srvcSvc: [],
  srvc: [],
  page: 1,
  size: 12,
  srvcInst: [],
  srvcMap: [],
  srvcTtl: '',
  srchSvcChk: [],
  srchChk: [],
  srchInstChk: [],
  desc: 'N'
});

const results = ref<Page<any>>({
  content: [],
  totalElements: 0,
  totalPages: 0
});

const active = ref<'type' | 'trpr' | 'inst' | 'rgn'>('type');
const easySrchStore = useEasySrchStore();
const {
  easySrchQuery,
  easySrchTypeList,
  easySrchSubTypeList,
  easySrchTrprList,
  easySrchSubTrprList,
  easySrchInstClsfList,
  easySrchSubInstList,
  easySrchRgnList
} = storeToRefs(easySrchStore);

const handleActiveTab = (tab: 'type' | 'trpr' | 'inst' | 'rgn') => {
  active.value = tab;
};

onBeforeMount(async () => {
  const [
    easySrchTypeResults,
    easySrchSubTypeResults,
    easySrchTrprResults,
    easySrchSubTrprResults,
    easySrchInstClsfResults,
    easySrchSubInstResults,
    easySrchRgnResults
  ] = await Promise.all([
    easySrchStore.findSrchTypeList(),
    easySrchStore.findSrchSubTypeList(),
    easySrchStore.findSrchTrprList(),
    easySrchStore.findSrchSubTrprList(),
    easySrchStore.findSrchInstList(),
    easySrchStore.findSrchSubInstList(),
    easySrchStore.findSrchMapList()
  ]);

  easySrchTypeList.value = easySrchTypeResults;
  easySrchSubTypeList.value = easySrchSubTypeResults;
  easySrchTrprList.value = easySrchTrprResults;
  easySrchSubTrprList.value = easySrchSubTrprResults;
  easySrchInstClsfList.value = easySrchInstClsfResults;
  easySrchSubInstList.value = easySrchSubInstResults;
  easySrchRgnList.value = easySrchRgnResults;

  // 메인에서 넘어온 값이 빈값이 아닐 경우
  if (!!type) {
    if (type === '1') {
      const parent = easySrchTypeResults.find(
        (result) => result.ctgryNo === easySlideCd
      );
      const child = easySrchSubTypeResults.find(
        (result) => result.ctgryNo === easySlideSubCd
      );

      easySrchQuery.value = [
        {
          type: 'type',
          typeCd: parent.ctgryNo,
          typeNm: parent.ctgryNm,
          children: !!child
            ? [
                {
                  subTypeCd: child.ctgryNo,
                  subTypeNm: child.ctgryNm
                }
              ]
            : []
        }
      ];
      active.value = 'type';
    } else if (type === '2') {
      const parent = easySrchTrprResults.find(
        (result) => result.ctgryNo === easySlideCd
      );
      const child = easySrchSubTrprResults.find(
        (result) => result.ctgryNo === easySlideSubCd
      );

      easySrchQuery.value = [
        {
          type: 'trpr',
          trprCd: parent.ctgryNo,
          trprNm: parent.ctgryNm,
          children: !!child
            ? [
                {
                  subTrprCd: child.ctgryNo,
                  subTrprNm: child.lwaCtgryNm
                }
              ]
            : []
        }
      ];

      active.value = 'trpr';
    } else if (type === '3') {
      const parent = easySrchInstClsfResults.find(
        (result) => result.ctgryNo === easySlideCd
      );
      const child = easySrchSubTrprResults.find(
        (result) => result.ctgryNo === easySlideSubCd
      );

      easySrchQuery.value = [
        {
          type: 'inst',
          instClsfCd: parent.comCd,
          instClsfNm: parent.comCdNm,
          children: !!child
            ? [
                {
                  instNo: child.instNo,
                  instNm: child.instNm
                }
              ]
            : []
        }
      ];

      active.value = 'inst';
    } else if (type === '4') {
      easySrchQuery.value = [
        {
          type: 'rgn',
          rgnCd: parent.comCd,
          rgnNm: parent.comCdNm
        }
      ];

      active.value = 'rgn';
    }
  }

  search();
});

watch(active, () => {
  const elms = document.querySelectorAll('.nav-pills .nav-link');
  elms.forEach((elm) => {
    elm.setAttribute('tabIndex', '0');
  });
});

const typeTabPreActive = computed(() =>
  easySrchQuery.value.some((item) => item.type === 'type')
);
const trprTabPreActive = computed(() =>
  easySrchQuery.value.some((item) => item.type === 'trpr')
);
const instTabPreActive = computed(() =>
  easySrchQuery.value.some((item) => item.type === 'inst')
);
const rgnTabPreActive = computed(() =>
  easySrchQuery.value.some((item) => item.type === 'rgn')
);

const resetAll = () => {
  if (easySrchQuery.value.length === 0) {
    return;
  }

  easySrchQuery.value = [];

  // 알림 표시
  showAlert({
    text: '모든 내용이 초기화 되었습니다.',
    icon: 'success'
  });
};

watch(
  easySrchQuery,
  () => {
    search();
  },
  {
    deep: true
  }
);

watch(
  query,
  () => {
    search();
  },
  {
    deep: true
  }
);

const search = () => {
  easySrchStore
    .findEasySrchList(query.value, easySrchQuery.value)
    .then((data) => {
      results.value = data;
    });
};

const list = computed({
  get() {
    return results.value.content.map((item) => ({
      ...item,
      isExpanded: item.isExpanded === undefined ? false : item.isExpanded
    }));
  },
  set(newValue) {
    results.value.content = newValue;
  }
});

const goToPage = (page: number) => {
  query.value.page = page;
};
</script>

<template>
  <div class="sub-content-box" id="easy-search">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="손쉬운 찾기"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '나의 서비스찾기' },
            { text: '손쉬운 찾기', active: true }
          ]"
        />
      </div>
    </section>
    <section class="new-easy-search-section">
      <div class="container">
        <p class="top-p">
          아래 조건을 선택하고<br class="mo-only" />
          나에게 맞는 서비스를 찾아보세요!
        </p>
        <div class="tab-box-wrap">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                :class="{
                  'nav-link': true,
                  active: active === 'type',
                  prevActive: typeTabPreActive
                }"
                id="service-1-tab"
                data-bs-toggle="pill"
                data-bs-target="#service1"
                type="button"
                role="tab"
                aria-controls="service1"
                aria-selected="true"
                @click="handleActiveTab('type')"
              >
                <span class="img-box">
                  <img
                    src="/image/sub/myservice/service_icon01.svg"
                    alt=""
                    class="normal-img"
                  />
                  <img
                    src="/image/sub/myservice/service_icon01_wh.svg"
                    alt=""
                    class="active-img"
                  />
                </span>
                <span class="text-span">서비스<br class="mo-only" />유형</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                :class="{
                  'nav-link': true,
                  active: active === 'trpr',
                  prevActive: trprTabPreActive
                }"
                id="service-2-tab"
                data-bs-toggle="pill"
                data-bs-target="#service2"
                type="button"
                role="tab"
                aria-controls="service2"
                aria-selected="false"
                @click="handleActiveTab('trpr')"
              >
                <span class="img-box">
                  <img
                    src="/image/sub/myservice/service_icon02.svg"
                    alt=""
                    class="normal-img"
                  />
                  <img
                    src="/image/sub/myservice/service_icon02_wh.svg"
                    alt=""
                    class="active-img"
                  />
                </span>
                <span class="text-span"
                  >서비스<br class="mo-only" />대상자</span
                >
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                :class="{
                  'nav-link': true,
                  active: active === 'inst',
                  prevActive: instTabPreActive
                }"
                id="service-3-tab"
                data-bs-toggle="pill"
                data-bs-target="#service3"
                type="button"
                role="tab"
                aria-controls="service3"
                aria-selected="false"
                @click="handleActiveTab('inst')"
              >
                <span class="img-box">
                  <img
                    src="/image/sub/myservice/service_icon03.svg"
                    alt=""
                    class="normal-img"
                  />
                  <img
                    src="/image/sub/myservice/service_icon03_wh.svg"
                    alt=""
                    class="active-img"
                  />
                </span>
                <span class="text-span">서비스<br class="mo-only" />기관</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                :class="{
                  'nav-link': true,
                  active: active === 'rgn',
                  prevActive: rgnTabPreActive
                }"
                id="service-4-tab"
                data-bs-toggle="pill"
                data-bs-target="#service4"
                type="button"
                role="tab"
                aria-controls="service4"
                aria-selected="false"
                @click="handleActiveTab('rgn')"
              >
                <span class="img-box">
                  <img
                    src="/image/sub/myservice/service_icon04.svg"
                    alt=""
                    class="normal-img"
                  />
                  <img
                    src="/image/sub/myservice/service_icon04_wh.svg"
                    alt=""
                    class="active-img"
                  />
                </span>
                <span class="text-span">지역 정보</span>
              </button>
            </li>
          </ul>
          <div v-if="active === 'type'">
            <myservice-easy-search-type-form :current-tab="active" />
          </div>
          <div v-if="active === 'trpr'">
            <myservice-easy-search-trpr-form :current-tab="active" />
          </div>
          <div v-if="active === 'inst'">
            <myservice-easy-search-inst-form :current-tab="active" />
          </div>
          <div v-if="active === 'rgn'">
            <myservice-easy-search-rgn-form :current-tab="active" />
          </div>
        </div>
      </div>
    </section>

    <section class="section2">
      <div class="container">
        <div class="category-box box1">
          <div class="category-body">
            <div class="row g-0">
              <!-- 첫 번째 그룹 -->
              <!-- 첫 번째 그룹의 개별 체크박스 -->
            </div>
          </div>
        </div>

        <div class="check-result-box">
          <div class="check-tag-box">
            <div class="content">
              <myservice-easy-search-tag />
            </div>
          </div>
          <div class="result-button-box">
            <!--            <button type="button" class="btn reflash-button" @click="resetAll">-->
            <!--              <span class="text-span">초기화</span>-->
            <!--              <span class="icon-span">-->
            <!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">-->
            <!--                  <polygon-->
            <!--                    class="cls-1"-->
            <!--                    points="17.21 11.01 13.95 8.76 14.81 7.51 16.95 8.99 18.66 7.02 19.81 8.03 17.21 11.01"-->
            <!--                  />-->
            <!--                  <path-->
            <!--                    class="cls-1"-->
            <!--                    d="M9.02,18.83C4.15,18.83.19,14.87.19,10S4.15,1.17,9.02,1.17s8.83,3.96,8.83,8.83h-1.52c0-4.03-3.28-7.3-7.3-7.3S1.71,5.97,1.71,10s3.28,7.3,7.3,7.3c2.94,0,5.58-1.75,6.73-4.45l1.4.6c-1.39,3.27-4.58,5.38-8.13,5.38Z"-->
            <!--                  />-->
            <!--                </svg>-->
            <!--              </span>-->
            <!--            </button>-->
            <CommonButton
              variants="line-primary"
              width="sm"
              height="md"
              @click="resetAll"
              title="초기화"
            >
              초기화
              <template #right-icon>
                <Icon name="refreshBlue" />
              </template>
            </CommonButton>
          </div>
        </div>
      </div>
    </section>

    <section class="section3">
      <div class="container">
        <div class="service-box">
          <search-sort
            text="서비스가"
            :totalElements="results.totalElements"
            :pageSize="12"
            :SortOptions="['inquiry', 'title', 'latest']"
            :keywordShow="false"
            v-model:size="query.size"
            v-model:desc="query.desc"
          />

          <div class="list-box" v-if="list.length > 0">
            <div class="card-list" v-if="list.length > 0">
              <CardA
                v-for="(item, index) in list"
                :key="index"
                :title="item.srvcTtl"
                textLine="3"
                :content="item.srvcExpln"
                dlDt="대상자"
                :dlDd="item.trprNm"
                dlDt2="담당기관"
                :dlDd2="$instNmOverride(item.instNm, item.instNo, item.srvcNo)"
                :link="`/servicetype?srvcNo=${item.srvcNo}`"
              >
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

            <CommonPagenation
              :page="query.page"
              :size="query.size"
              :total-elements="results.totalElements"
              :show-pagination-count="10"
              @change="goToPage"
            />
          </div>
          <!-- 검색 결과가 존재하지 않을때-->
          <div class="board-list-box" v-else>
            <div class="board-empty-box">
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/myservice/easysearch/index.scss';
</style>
