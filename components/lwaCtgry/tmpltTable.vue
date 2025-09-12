<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';
import { useFileStore } from '~/stores/file';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonTable from '~/components/ui/table/tables.vue';

export type FileListType = {
  atchFileId: string;
  atchFileSeq: number;
  atchFileDwnldCnt: number;
  pdfId: string;
  atchFileExtnNm: string;
};

export type UseTmpltListType = {
  no: number;
  tmpltNo: string;
  ctgryNo: string;
  ctgryNm: string;
  tmpltNm: string;
  atchFileId: string;
  atchFileDwnldCnt: number;
  frstRegDt: string;
  atchFileList: FileListType[];
};

type TableData = {
  captionText?: string;
  upCtgryNo?: string;
  clsfCtgryNo?: string;
  instNo?: string;
  dataList?: UseTmpltListType[];
};

const props = defineProps<TableData>();
const emit = defineEmits(['search']);

const fileStore = useFileStore();
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
      '300'
    );
  }
});

const changeChildCtgry = (item) => {
  useLwaCtgryListQuery.value.ctgryNo = item.value;
  ctgryNm.value = item.text;
  emit('search');
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};
</script>

<template>
  <!-- pc 버전 -->
  <div class="common-table__box pc-visible">
    <CommonTable>
      <colgroup>
        <col class="num-col" />
        <col class="category-col" />
        <col class="title-col" />
        <col class="download-col" />
        <col class="download-num-col" />
        <col class="date-col" />
      </colgroup>
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
            v-if="useLwaCtgryItemAllList.length === 0"
          >
            분류
          </th>
          <th
            scope="col"
            class="category-th"
            v-if="useLwaCtgryItemAllList.length > 0"
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
          <th scope="col" class="title-th">서식</th>
          <th scope="col" class="download-th">다운로드</th>
          <th scope="col" class="download-num-th">다운로드수</th>
          <th scope="col" class="date-th">등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.dataList" v-if="props.dataList.length > 0">
          <td class="num-td">{{ item.no }}</td>
          <td>{{ item.ctgryNm }}</td>
          <td class="title-td">
            {{ item.tmpltNm }}
          </td>
          <td class="download-td">
            <div class="download-box" v-for="file in item.atchFileList">
              <button
                class="btn-download"
                type="button"
                v-if="!!file.atchFileId"
                :title="`${item.tmpltNm} 다운로드`"
                @click="() => download(file.atchFileId, file.atchFileSeq)"
              >
                <lwa-ctgry-icon-img :iconType="file.atchFileExtnNm" />
              </button>
              <NuxtLink
                v-if="!!file.pdfId"
                :to="`/streamdocs/view/sd;streamdocsId=${file.pdfId}`"
                target="_blank"
                rel="noopener noreferrer"
                :title="`${item.tmpltNm} PDF 문서 바로보기 (새 창에서 열림)`"
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
          </td>
          <td>{{ item.atchFileDwnldCnt }}</td>
          <td>{{ item.frstRegDt.substring(0, 10) }}</td>
        </tr>
        <tr v-else>
          <td colspan="6">
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
          {{ item.tmpltNm }}
          <div class="bx-info">
            <dl>
              <dt class="tit">{{ item.ctgryNm }}</dt>
              <dd>{{ item.frstRegDt.substring(0, 10) }}</dd>
              <dd>다운로드 수 {{ item.atchFileDwnldCnt }}</dd>
            </dl>
          </div>
          <div class="bx-btn">
            <div class="download-box" v-for="file in item.atchFileList">
              <button
                class="btn-download"
                type="button"
                v-if="!!file.atchFileId"
                @click="() => download(file.atchFileId, file.atchFileSeq)"
              >
                <lwa-ctgry-icon-img :iconType="file.atchFileExtnNm" />
              </button>
              <NuxtLink
                v-if="!!file.pdfId"
                :to="`/streamdocs/view/sd;streamdocsId=${file.pdfId}`"
                target="_blank"
                rel="noopener noreferrer"
                title="PDF 문서 바로보기 (새 창에서 열림)"
                class="btn-basic primary sm"
              >
                <span class="icon-shortcut"></span>
                <span class="text"> 바로보기</span>
              </NuxtLink>
            </div>
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
