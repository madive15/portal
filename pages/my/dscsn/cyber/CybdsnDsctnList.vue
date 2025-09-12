<!--
 * 화면명 : 사이버상담 내역
 * 화면ID : LASP_MYP_015
 * 파일명 : CybdsnDsctnList
 * 작성자 : 문경훈
 * 화면 설명 : 사이버상담 내역 목록 조회 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.21         문경훈       최초생성
-->
<script setup lang="ts">
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import SearchCs from '~/components/ui/search/searchCs.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import { onMounted, type Ref, ref, onBeforeMount } from 'vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';
import type { CybdsnDsctnVO, CybdsnDsctnListVO } from '~/types/dscsn/rsvt';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();
/** 라우터 선언 **/
const route = useRoute();

/** 검색조건 */
const cybdsnDsctnVO: Ref<CybdsnDsctnVO> = ref({
  page: 1,
  size: 10,
  dscsnSeCd: '4', // 사이버상담
  selectKey: '1', // 제목  ( 1: 제목 , 2: 제목+내용 )
  keyword: ''
});

/** 사이버상담 내역 List */
const list: Ref<CybdsnDsctnListVO[]> = ref([]);

/** 페이지 리셋 */
const resetPayload = () => {
  cybdsnDsctnVO.value.selectKey = '1';
  cybdsnDsctnVO.value.keyword = '';
};

/** 총건수 */
const totalElements = ref();

/**
 * name : onBeforeMount
 * desc : onMounted 발생 전에 발생
 **/
onBeforeMount(() => {
  // 로그인 완료상태
  if (authenticated.value) {
    selectCybdsnDsctnList(cybdsnDsctnVO);
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.<br />[확인] 클릭 시 로그인&본인 인증 페이지로 이동 합니다.',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
});

/** 나의 사이버상담 내역 목록조회 */
const selectCybdsnDsctnList = async (cybdsnDsctnVO: CybdsnDsctnVO) => {
  await useAxios()
    .get('/api/my/selectCybdsnDsctnList', { params: cybdsnDsctnVO.value })
    .then((response) => {
      console.log('response' + response.data);
      const data = response.data;
      const page = cybdsnDsctnVO.value.page - 1;
      const size = cybdsnDsctnVO.value.size;
      totalElements.value = data.totalElements;

      if (data.content.length > 0) {
        list.value = data.content.map(
          (item: CybdsnDsctnListVO, index: number) => ({
            ...item,
            no: totalElements.value - page * size - index
          })
        );
      } else {
        list.value = [];
      }
    });
};

/** 문의하기 클릭 */
const movePage = () => {
  // 법률상담 > 사이버상담으로 이동
  navigateTo('/dscsn/cyber');
};

/** 페이지 이동 */
const goToPage = async (page: number) => {
  cybdsnDsctnVO.value.page = page;
  await selectCybdsnDsctnList(cybdsnDsctnVO);
};

/** 문의하기 클릭 */
const searchBtn = async () => {
  cybdsnDsctnVO.value.page = 1;
  selectCybdsnDsctnList(cybdsnDsctnVO);
};

/** 상세화면 이동 */
const moveDtail = (dscsnAplyNo: string) => {
  // TODO - 제목 클릭 처리시 가능여부 조회: KLA-013 (공단 국내), KLA-018(공단 국외), LQA-013(상담원), LHM-013(상담소)
  navigateTo({
    path: `/my/dscsn/cyber/CybdsnDsctnView`,
    query: { dscsnAplyNo: dscsnAplyNo }
  });
};

// TODO - 나중에 공통 잡히면 지우기
// 메뉴 넣으면 지워야함
const handleGoBack = () => window.history.back();
const handlePrint = () => window.print();
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!--        <Breadcrumb-->
        <!--          :showPrintButton="true"-->
        <!--          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"-->
        <!--          breadcrumbTitle="사이버상담 내역"-->
        <!--        />-->
        <!--        TODO - 추후 지우기-->
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>사이버상담 내역</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button" @click="handleGoBack">
                  <span class="text-span"> 뒤로가기 </span>
                </button>
                <button class="btn print-button" @click="handlePrint">
                  <span class="text-span"> 인쇄하기 </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">사이버상담 내역 정보</h4>
        <my-tab />
        <!--        <SearchCs />-->
        <div class="search-center__wrap">
          <label for="board">
            <span class="sr-only">검색 기준</span>
          </label>
          <a-select
            class="common-select"
            id="board"
            v-model:value="cybdsnDsctnVO.selectKey"
          >
            <a-select-option value="1">제목</a-select-option>
            <a-select-option value="2">제목+내용</a-select-option>
            <a-select-option value="3">공개여부</a-select-option>
          </a-select>
          <label for="search">
            <span class="sr-only">검색어 입력</span>
          </label>
          <input
            type="text"
            class="input-search"
            id="search"
            placeholder="검색어를 입력해 주세요."
            v-model="cybdsnDsctnVO.keyword"
          />
          <div class="search-info__btns">
            <button type="button" class="btn btn-sch" @click="searchBtn">
              <span class="text">검색</span>
            </button>
            <button type="button" class="btn btn-reset" @click="resetPayload">
              <span class="text">초기화</span>
            </button>
          </div>
        </div>
        <!--        <strong>전체 {{ totalElements }}건</strong>-->
        <ButtonGroup align="right" class="!mb-24px">
          <CommonButton variants="primary" width="lg" @click="movePage"
            >문의하기</CommonButton
          >
        </ButtonGroup>
        <CommonTable class="pc-only">
          <caption>
            사이버상담 내역의 상담번호, 법률상담 기관, 공개여부, 제목, 등록일,
            답변상태 관련 표
          </caption>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 16%" />
            <col style="width: 8%" />
            <col style="width: 46%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">상담번호</th>
              <th scope="col">법률상담 기관</th>
              <th scope="col">공개여부</th>
              <th scope="col">제목</th>
              <th scope="col">등록일</th>
              <th scope="col">답변상태</th>
            </tr>
          </thead>
          <tbody v-if="list.length > 0">
            <tr v-for="(item, index) in list">
              <td>{{ item.dscsnAplyNo }}</td>
              <td>{{ item.instNm }}</td>
              <td>
                <span class="ico-private" v-if="item.rlsYn === 'Y'">공개</span
                ><span class="ico-public" v-else>비공개</span>
              </td>
              <td class="">
                <span
                  style="cursor: pointer"
                  @click="moveDtail(item.dscsnAplyNo)"
                  >{{ item.dscsnTtl }}</span
                >
              </td>
              <td>{{ item.rcptYmd }}</td>
              <td>
                <!--                TODO - 주석으로 원복필요-->
                <!--                <CommonBadge-->
                <!--                  v-if="item.prSttsCd === 'E01'"-->
                <!--                  tag-badge-text="상담대기"-->
                <!--                  size="1"-->
                <!--                  type="color-l-pink"-->
                <!--                />-->
                <!--                <CommonBadge-->
                <!--                  v-else-if="item.prSttsCd === 'E02'"-->
                <!--                  tag-badge-text="검토중"-->
                <!--                  size="1"-->
                <!--                  type="color-gray"-->
                <!--                />-->
                <!--                <CommonBadge v-else tag-badge-text="답변완료" size="1" />-->
                <CommonBadge
                  v-if="item.prSttsCd === 'E01'"
                  tag-badge-text="상담대기"
                  size="1"
                  type="color-l-pink"
                />
                <CommonBadge
                  v-else-if="item.prSttsCd === 'E02'"
                  tag-badge-text="검토중"
                  size="1"
                  type="color-gray"
                />
                <CommonBadge
                  v-else
                  type="color-l-pink"
                  tag-badge-text="상담대기"
                  size="1"
                />
              </td>
            </tr>
          </tbody>
          <!-- 데이터 없는 경우 노출 -->
          <div class="board-empty-box d-none" v-else>
            <div class="img-box">
              <img src="/image/sub/customer/none.svg" alt="" />
            </div>
            <div class="text-box">
              <p>검색된 결과가 존재하지 않습니다.</p>
            </div>
          </div>
          <!-- // 데이터 없는 경우 노출 -->
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li v-for="(item, index) in list">
              <div class="table-mo-cont">
                <dl>
                  <dt>상담번호</dt>
                  <dd>{{ item.no }}</dd>
                </dl>
                <dl>
                  <dt>법률상담 기관</dt>
                  <dd>{{ item.instNm }}</dd>
                </dl>
                <dl>
                  <dt>공개여부</dt>
                  <dd>
                    <span class="ico-private" v-if="item.rlsYn === 'Y'"
                      >공개</span
                    ><span class="ico-public" v-else>비공개</span>
                  </dd>
                </dl>
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <span
                      style="cursor: pointer"
                      @click="moveDtail(item.dscsnAplyNo)"
                      >{{ item.dscsnTtl }}</span
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>{{ item.rcptYmd }}</dd>
                </dl>
                <dl>
                  <dt>답변상태</dt>
                  <dd>
                    <CommonBadge
                      v-if="item.prSttsCd === 'E01'"
                      tag-badge-text="상담대기"
                      size="1"
                      type="color-l-pink"
                    />
                    <CommonBadge
                      v-else-if="item.prSttsCd === 'E02'"
                      tag-badge-text="검토중"
                      size="1"
                      type="color-gray"
                    />
                    <CommonBadge v-else tag-badge-text="답변완료" size="1" />
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>

        <CommonPagenation
          :page="cybdsnDsctnVO.page"
          :size="cybdsnDsctnVO.size"
          :total-elements="totalElements"
          :show-pagination-count="10"
          @change="goToPage"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/my/dscsn/cyber/CybdsnDsctnList';
</style>
