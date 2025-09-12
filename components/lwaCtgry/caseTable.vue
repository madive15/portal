<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Truncatetext from '~/components/common/truncatetext.vue';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';

export type UseCaseListType = {
  no: number;
  caseNo: string;
  ctgryNm: string;
  caseTtl: string;
  frstRegDt: string;
  inqCnt: number;
};

type TableData = {
  captionText?: string;
  upCtgryNo?: string;
  clsfCtgryNo?: string;
  instNo?: string;
  dataList?: UseCaseListType[];
};

const route = useRoute();
const props = defineProps<TableData>();
const emit = defineEmits(['search']);

const lwaCtgryStore = useLwaCtgryStore();
const {
  useLwaCtgryListQuery,
  useLwaCtgryItemList,
  useLwaCtgryItemAllList,
  ctgryNm
} = storeToRefs(lwaCtgryStore);

onBeforeMount(async () => {
  if (props.clsfCtgryNo !== undefined || props.instNo !== undefined) {
    await lwaCtgryStore.findChildCtgryList(
      props.clsfCtgryNo,
      props.instNo,
      '200'
    );
  }

  if (route.query.ctgryNo !== undefined) {
    useLwaCtgryItemList.value.find((item) => {
      if (item.value === route.query.ctgryNo) {
        ctgryNm.value = item.text;
      }
    });
  }
});

const changeChildCtgry = (item) => {
  useLwaCtgryListQuery.value.ctgryNo = item.value;
  ctgryNm.value = item.text;
  emit('search');
};

const detailLink = (item: any) => {
  const listQuery = useLwaCtgryListQuery.value;
  const pageParam = `&page=${listQuery.page}`;
  const sizeParam = `&size=${listQuery.size}`;
  const descParam = listQuery.desc !== '' ? `&desc=${listQuery.desc}` : '';
  const keywordTypeParam =
    listQuery.keywordType !== '' ? `&keywordType=${listQuery.keywordType}` : '';
  const keywordParam =
    listQuery.keyword !== '' ? `&keyword=${listQuery.keyword}` : '';
  const upCtgryNoParam =
    listQuery.upCtgryNo !== '' ? `&upCtgryNo=${listQuery.upCtgryNo}` : '';
  const ctgryNoParam =
    listQuery.ctgryNo !== '' ? `&ctgryNo=${listQuery.ctgryNo}` : '';
  const instNoParam =
    listQuery.instNo !== '' ? `&instNo=${listQuery.instNo}` : '';

  return `${route.path.slice(0, route.path.lastIndexOf('/'))}/detail?caseNo=${item.caseNo}${pageParam}${sizeParam}${descParam}${keywordTypeParam}${keywordParam}${upCtgryNoParam}${ctgryNoParam}${instNoParam}`;
};
</script>

<template>
  <!-- pc 버전 -->
  <div class="common-table__box pc-visible">
    <CommonTable>
      <caption v-if="props.captionText">
        {{
          props.captionText
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col" class="num-th">번호</th>
          <th
            scope="col"
            class="category-th"
            v-if="useLwaCtgryItemAllList.length !== 0"
          >
            <div class="dropdown-area">
              <label for="dropdown">
                <span class="sr-only">카테고리 기준 선택</span>
              </label>
              <DropdownBasic class="select-type" v-model="ctgryNm" label="전체">
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      v-for="(item, index) in useLwaCtgryItemList"
                      role="menuitem"
                      :tabindex="index"
                      @click="[select(item.text), changeChildCtgry(item)]"
                      @keydown.enter.prevent="[
                        select(item.text),
                        changeChildCtgry(item)
                      ]"
                    >
                      {{ item.text }}
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
          </th>
          <th scope="col" class="title-th">제목</th>
          <th scope="col" class="date-th">작성일</th>
          <th scope="col" class="hit-th">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.dataList" v-if="props.dataList.length > 0">
          <td class="num-td">{{ item.no }}</td>
          <td v-if="useLwaCtgryItemAllList.length !== 0">
            {{ item.ctgryNm }}
          </td>
          <td class="title-td">
            <NuxtLink :to="detailLink(item)" :title="item.caseTtl">
              <truncatetext :max-length="70" :text="item.caseTtl" />
            </NuxtLink>
          </td>
          <td>{{ item.frstRegDt.substring(0, 10) }}</td>
          <td>{{ item.inqCnt }}</td>
        </tr>
        <tr v-else>
          <td :colspan="useLwaCtgryItemAllList.length !== 0 ? 5 : 4">
            <div class="board-empty-box">
              <div class="img-box">
                <img
                  src="/image/sub/customer/none.svg"
                  alt="결과가 존재하지 않습니다 아이콘 이미지"
                />
              </div>
              <div class="text-box">
                <p>검색된 결과가 존재하지 않습니다.</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </CommonTable>
  </div>

  <!-- 모바일 버전 -->
  <div class="common-table__list mo-visible">
    <ul>
      <li v-for="item in props.dataList" v-if="props.dataList.length > 0">
        <span class="bx-num">{{ item.no }}</span>
        <div class="bx">
          <NuxtLink
            :to="detailLink(item)"
            class="text-title"
            :title="item.caseTtl"
          >
            <truncatetext :max-length="70" :text="item.caseTtl" />
          </NuxtLink>
          <div class="bx-info">
            <dl>
              <dt class="tit" v-if="useLwaCtgryItemAllList.length !== 0">
                {{ item.ctgryNm }}
              </dt>
              <dd>{{ item.frstRegDt.substring(0, 10) }}</dd>
              <dd>조회수 {{ item.inqCnt }}</dd>
            </dl>
          </div>
        </div>
      </li>
      <li v-else>
        <div class="bx">
          <div class="board-empty-box">
            <div class="img-box">
              <img
                src="/image/sub/customer/none.svg"
                alt="결과가 존재하지 않습니다 아이콘 이미지"
              />
            </div>
            <div class="text-box">
              <p>검색된 결과가 존재하지 않습니다.</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
