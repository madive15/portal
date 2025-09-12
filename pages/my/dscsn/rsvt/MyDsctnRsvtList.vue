<!--
 * 화면명 : 사이버상담 내역
 * 화면ID : LASP_MYP_015
 * 파일명 : MyDsctnRsvtList
 * 작성자 : 문경훈
 * 화면 설명 : 사이버상담 내역 목록 조회 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.22         문경훈       화면명 수정 및 추가작업
-->
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import type { CommonCode } from '~/types';
import type { InstListOutVO } from '~/types/inst';
import type {
  CybdsnDsctnListVO,
  CybdsnDsctnVO,
  MyDscsnListInVO,
  MyDscsnListOutVO
} from '~/types/dscsn/rsvt';
import * as commonApis from '~/composables/common';
import * as instApis from '~/composables/inst';
import * as dscsnApis from '~/composables/dscsn';
import CommonTegBedge from '~/components/ui/tag/tagbedge.vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();

import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
// 상담대상기관 List
const dscsnInstCdList: Ref<InstListOutVO[]> = ref([]);
// 상담유형code List
const dscsnSeCdList: Ref<CommonCode[]> = ref([]);
// 상담예약 내역 List
const list: Ref<MyDscsnListOutVO[]> = ref([]);

// 검색조건
const payload: Ref<MyDscsnListInVO> = ref({
  page: 1,
  size: 10
});

/** 라우터 선언 **/
const route = useRoute();

const totalElements = ref();

/**
 * name : onBeforeMount
 * desc : onMounted 발생 전에 발생
 **/
onBeforeMount(() => {
  // 로그인 완료상태
  if (authenticated.value) {
    selectInstCdList();
    selectDscsnSeCd();
    searchRsvtList();
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

// 상담 대상 기관 목록조회
const selectInstCdList = async () => {
  // 변경된 DB에 따라서 내용 수정되어야함
  const payload = { dscsnTrgtYn: 'Y' };
  const response = await instApis.selectInstList(payload);
  dscsnInstCdList.value = response.data;

  const all = { instNm: '전체' };
  dscsnInstCdList.value.unshift(all);
};

// 상담유형code 목록조회
const selectDscsnSeCd = async () => {
  const response = await commonApis.selectComCdList('CO0042'); // 그룹코드명: 상담구분코드
  // 사이버상담 제외
  dscsnSeCdList.value = response.filter((v) => v.value !== '4');

  const all = { label: '전체' };
  dscsnSeCdList.value.unshift(all);
};

// 나의 상담예약 목록조회
const searchRsvtList = async () => {
  await useAxios()
    .get('/api/my/selectRsvtDsctnList', { params: payload.value })
    .then((response) => {
      console.log('response' + response.data);
      const data = response.data;
      const page = payload.value.page - 1;
      const size = payload.value.size;
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

// 수정처리필요
const movePage = (typeNm: string) => {
  // type에 따라 추가로직필요
  alert(typeNm + '화면으로 이동처리!');
};

const goToPage = async (page: number) => {
  // myDscsnRsvtInVo.value.page = page;
  // await dscsnRsvtStore.selectMyDscsnRsvtList();
  payload.value.page = page;
  searchRsvtList();
};

// 상세페이지 이동
const moveDtail = (dscsnAplyNo: string) => {
  // TODO - 1. 상태값 분기처리 (U or V) 2. 면접 / 화상에 따라 폼 이동 분기처리 필요
  const status = 'U';

  navigateTo({
    path: `/my/dscsn/rsvt/MyDsctnRsvtView`,
    query: { status: status }
  });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :showPrintButton="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">상담예약 내역 정보</h4>
        <my-tab />
        <div class="search-info-wrap">
          <div class="select-list">
            <a-select
              id="select"
              class="common-select"
              title="상담기관 선택"
              placeholder="상담기관"
              v-model:value="payload.instNo"
              @change="searchRsvtList"
            >
              <a-select-option
                v-for="inst in dscsnInstCdList"
                :key="inst.instNo"
                :value="inst.instNo"
                >{{ inst.instNm }}</a-select-option
              >
            </a-select>
            <a-select
              id="select"
              class="common-select"
              title="상담유형 선택"
              placeholder="상담유형"
              @change="searchRsvtList"
              v-model:value="payload.dscsnSeCd"
            >
              <a-select-option
                v-for="code in dscsnSeCdList"
                :key="code.value"
                :value="code.value"
                >{{ code.label }}</a-select-option
              >
            </a-select>
          </div>
          <ButtonGroup align="right" class="!mt-0">
            <CommonButton
              title="면접상담 예약"
              variants="line-primary"
              width="lg"
              @click="movePage(`면접상담예약`)"
            >
              면접상담 예약
            </CommonButton>
            <CommonButton
              title="화상상담 예약"
              variants="line-primary"
              width="lg"
              @click="movePage(`화상상담예약`)"
            >
              화상상담 예약
            </CommonButton>
            <CommonButton
              title="전화상담 예약"
              variants="primary"
              width="lg"
              @click="movePage(`전화상담예약`)"
            >
              전화상담 예약
            </CommonButton>
          </ButtonGroup>
        </div>
        <div class="board-list-box" v-if="list.length > 0">
          <div class="common-table__box pc-visible">
            <CommonTable>
              <caption>
                상담예약 내역의 예약번호, 상담유형, 법률상담 기관, 예약시간,
                예약지부, 접수일, 확정여부, 상담상태, 상담결과 관련 표
              </caption>
              <colgroup>
                <col style="width: 13%" />
                <col style="width: 9%" />
                <col style="width: 13%" />
                <col style="width: 13%" />
                <col style="width: 13%" />
                <col style="width: 8%" />
                <col style="width: 9%" />
                <col style="width: 11%" />
                <col style="width: 11%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">예약번호</th>
                  <th scope="col">상담유형</th>
                  <th scope="col">법률상담 기관</th>
                  <th scope="col">예약시간</th>
                  <th scope="col">예약지부</th>
                  <th scope="col">접수일</th>
                  <th scope="col">확정여부</th>
                  <th scope="col">상담상태</th>
                  <th scope="col">상담결과</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dscsn in list">
                  <td class="num-td">
                    <span
                      style="cursor: pointer"
                      @click="moveDtail(dscsn.dscsnAplyNo)"
                      >{{ dscsn.dscsnAplyNo }}</span
                    >
                    <!--                      <NuxtLink-->
                    <!--                          :to="`/my/qna/detail?baId=${board.baId}`"-->
                    <!--                          :title="board.baTitle"-->
                    <!--                      >-->
                    <!--                        {{ board.baTitle }}-->
                    <!--                      </NuxtLink>-->
                  </td>
                  <td>{{ dscsn.dscsnSeNm }}</td>
                  <td>{{ dscsn.instNm }}</td>
                  <td>{{ dscsn.rsvtHr }}</td>
                  <td>예약지부</td>
                  <td>{{ dscsn.rcptYmd }}</td>
                  <td>예약상태코드</td>
                  <td>
                    <common-teg-bedge tag-bedge-text="상담완료" />
                    <!--                    <common-teg-bedge-->
                    <!--                      class="color-l-pink"-->
                    <!--                      tag-bedge-text="내방안함"-->
                    <!--                    />-->
                  </td>
                  <td>
                    <common-teg-bedge
                      class="color-mint"
                      tag-bedge-text="타기관안내"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </CommonTable>
          </div>
          <div class="common-table__list mo-only">
            <ul>
              <li v-for="dscsn in list">
                <div class="table-mo-cont">
                  <dl>
                    <dt>예약번호</dt>
                    <dd>{{ dscsn.dscsnAplyNo }}</dd>
                  </dl>
                  <dl>
                    <dt>상담유형</dt>
                    <dd>{{ dscsn.dscsnSeNm }}</dd>
                  </dl>
                  <dl>
                    <dt>법률상담 기관</dt>
                    <dd>{{ dscsn.instNm }}</dd>
                  </dl>
                  <dl>
                    <dt>예약시간</dt>
                    <dd>{{ dscsn.rsvtHr }}</dd>
                  </dl>
                  <dl>
                    <dt>예약지부</dt>
                    <dd>-</dd>
                  </dl>
                  <dl>
                    <dt>접수일</dt>
                    <dd>{{ dscsn.rcptYmd }}</dd>
                  </dl>
                  <dl>
                    <dt>확정여부</dt>
                    <dd>예약상태코드</dd>
                  </dl>
                  <dl>
                    <dt>상담상태</dt>
                    <dd>
                      <common-teg-bedge tag-bedge-text="상담완료" />
                    </dd>
                  </dl>
                  <dl>
                    <dt>상담결과</dt>
                    <dd>
                      <common-teg-bedge
                        class="color-mint"
                        tag-bedge-text="타기관안내"
                      />
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
          <CommonPagenation
            :page="payload.page"
            :size="payload.size"
            :total-elements="totalElements"
            :show-pagination-count="10"
            @change="goToPage"
          />
        </div>
        <div class="board-empty-box" v-else>
          <div class="img-box">
            <img src="/image/sub/customer/none.svg" alt="" />
          </div>
          <div class="text-box">
            <p>검색된 결과가 존재하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/dscsn/rsvt/MyDsctnRsvtList.scss';
</style>
