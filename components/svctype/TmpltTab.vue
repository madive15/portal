<script setup lang="ts">
import Truncatetext from '~/components/common/truncatetext.vue';
import type { Page } from '~/types/common';
import { useAxios } from '~/composables/useAxios';
import { useFileStore } from '~/stores/file';
import { ref } from 'vue';
import Servicedepth from '~/components/service/servicedepth.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';

const fileStore = useFileStore();
const route = useRoute();

const query = ref({
  page: 1,
  size: 10,
  srvcNo: route.query.srvcNo,
  instNo: route.query.instNo,
  ctgryNo: '',
  keyword: '',
  desc: 'N',
  defaultText: '10개씩 보기'
});

const page = ref<Page<any>>({
  content: [],
  totalElements: 0,
  totalPages: 0
});

const list = computed(() => {
  const pageNumber = query.value.page - 1;
  const size = query.value.size;
  const totalElement = page.value.totalElements;

  return page.value.content.map((item, index) => ({
    ...item,
    no: totalElement - pageNumber * size - index
  }));
});

onBeforeMount(() => {
  search();
});

const changeTmplt = (e) => {
  query.value.page = 1;
  query.value.size = e.value; // 접근성 Dropdown 수정 25.04.07
  query.value.defaultText = e.text; // 접근성 Dropdown 추가 25.04.07
  // selectedItemCase.value = e.value; // 접근성 Dropdown 추가 25.04.07
  search();
};

const search = () => {
  useAxios()
    .get('/api/svctype/svcTypeTmpltList', {
      params: {
        ...query.value
      }
    })
    .then(({ data }) => {
      page.value = data;
    });
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const movePage = (pageNumber: number) => {
  query.value.page = pageNumber;
  search();
};

const ctgrySeCd = ref('300');
const ctgryList = ref([]);
const ctgryListTopCd = ref('');
const ctgryListMaxLvl = ref(0);
const ctgryListGubunYn = ref(false);
const ctgryDefaultText = ref('전체');

const queryCtgryNoChange = (value: string) => {
  query.value.ctgryNo = value;
};

const changeCtgryList = (
  list: [],
  value: string,
  lvl: number,
  gubun: boolean
) => {
  ctgryListTopCd.value = value;
  ctgryListMaxLvl.value = lvl;
  ctgryListGubunYn.value = gubun;
  ctgryDefaultText.value = '전체';
  ctgryList.value = [{ text: '전체', value: '' }, ...list];
};

const ctgryNoChange = async (e) => {
  if (e.value === '') {
    if (ctgryListGubunYn.value) {
      if (ctgryListTopCd.value === '') {
        query.value.ctgryNo = ctgryList.value[1].topCode;
      } else {
        query.value.ctgryNo = ctgryList.value[1].upCode;
      }
    } else {
      if (ctgryListMaxLvl.value === 2) {
        if (ctgryListTopCd.value === '') {
          query.value.ctgryNo = '';
        } else {
          query.value.ctgryNo = ctgryList.value[1].upCode;
        }
      }
      if (ctgryListMaxLvl.value === 1) {
        query.value.ctgryNo = e.value;
      }
    }
  } else {
    query.value.ctgryNo = e.value;
  }
  ctgryDefaultText.value = e.text;
  await search();
};
</script>

<template>
  <servicedepth
      v-model:lwa-ctgry-se-cd="ctgrySeCd"
      @listChange="changeCtgryList"
      @valueChange="queryCtgryNoChange"
      @search="search"
  />
  <search-sort
      text="서식이"
      :totalElements="page.totalElements"
      :pageSize="10"
      :SortOptions="['inquiry', 'title', 'latest']"
      :keywordShow="true"
      v-model:keyword-value="query.keyword"
      v-model:size="query.size"
      v-model:desc="query.desc"
      @search="search"
  />
  <!-- 반응형 모바일 개발 추가사항:리스트 -->
  <div class="common-table__list mo-visible">
    <ul>
      <li v-for="item in list">
        <span class="bx-num">{{ item.no }}</span>
        <div class="bx">
          <a href="#" class="text-title">{{ item.tmpltNm }}</a>
          <div class="bx-info">
            <dl>
              <dt class="tit" v-if="ctgryList.length > 1">
                {{ item.lwaCtgryText }}
              </dt>
              <dd>{{ item.frstRegDt.substring(0, 10) }}</dd>
              <dd>다운로드 수 {{ item.atchFileDwnldCnt }}</dd>
            </dl>
          </div>
          <div class="bx-btn">
            <div class="download-box" v-for="file in item.fileList">
              <button
                  class="btn-download"
                  type="button"
                  @click="() => download(file.atchFileId, file.atchFileSeq)"
              >
                <img
                    v-if="
                        'doc|docx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                    src="~/assets/image/sub/file/doc.svg"
                    alt="워드 파일 다운로드"
                />

                <img
                    v-else-if="
                        'hwp|hwpx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                    src="~/assets/image/sub/file/hwp.svg"
                    alt="한글 파일 다운로드"
                />

                <img
                    v-else-if="
                        'gif|jpg|png|jpeg'.includes(
                          file.atchFileExtnNm.toLowerCase()
                        )
                      "
                    src="~/assets/image/sub/file/img.svg"
                    alt="이미지 파일 다운로드"
                />

                <img
                    v-else-if="file.atchFileExtnNm.toLowerCase() === 'pdf'"
                    src="~/assets/image/sub/file/pdf.svg"
                    alt="PDF 파일 다운로드"
                />

                <img
                    v-else-if="
                        'ppt|pptx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                    src="~/assets/image/sub/file/ppt.svg"
                    alt="PPT 파일 다운로드"
                />

                <img
                    v-else-if="file.atchFileExtnNm.toLowerCase() === 'txt'"
                    src="~/assets/image/sub/file/txt.svg"
                    alt="TXT 파일 다운로드"
                />

                <img
                    v-else-if="
                        'xls|xlsx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                    src="~/assets/image/sub/file/xls.svg"
                    alt="엑셀 파일 다운로드"
                />

                <img
                    v-else-if="
                        'zip|rar'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                    src="~/assets/image/sub/file/zip.svg"
                    alt="ZIP 파일 다운로드"
                />

                <img
                    v-else
                    src="~/assets/image/sub/file/etc.svg"
                    alt="파일 다운로드"
                />
              </button>
              <NuxtLink
                  v-if="!!file.pdfId"
                  :to="`/streamdocs/view/sd;streamdocsId=${file.pdfId}`"
                  target="_blank"
                  title="PDF 문서 바로보기 (새 창에서 열림)"
                  class="btn-basic primary sm"
              >
                <span class="icon-span">
                  <img
                      src="/image/sub/template/shortcut_wh.svg"
                      alt="바로보기"
                  />
                </span>
                <span class="text-span"> 바로보기 </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!--// 반응형 모바일 개발 추가사항 -->
  <div class="common-table__box pc-visible">
    <table>
      <colgroup>
        <col class="num-col" />
        <col class="category-col" v-if="ctgryList.length > 1" />
        <col class="title-col" />
        <col class="download-col" />
        <col class="download-num-col" />
        <col class="date-col" />
      </colgroup>
      <caption>
        서식의 번호, 서식, 다운로드, 다운로드수, 작성일에 대한 표
      </caption>
      <thead>
        <tr>
          <th scope="col" class="num-th">번호</th>
          <th scope="col" class="category-th" v-if="ctgryList.length > 1">
            <div class="dropdown-area">
              <label for="dropdown">
                <span class="sr-only">카테고리 기준 선택</span>
              </label>
              <DropdownBasic
                class="select-type"
                v-model="ctgryDefaultText"
                label="전체"
              >
                <template #default="{ close }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      tabindex="0"
                      v-for="(item, index) in ctgryList"
                      :key="index"
                      @click="
                        () => {
                          ctgryNoChange(item);
                          close();
                        }
                      "
                      :title="query.ctgryNo === item.value ? '선택됨' : ''"
                      @keydown.enter.prevent="
                        () => {
                          ctgryNoChange(item);
                          close();
                        }
                      "
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
        <tr v-for="(item, index) in list" :key="index">
          <td class="num-td">{{ item.no }}</td>
          <td v-if="ctgryList.length > 1">
            {{ item.lwaCtgryText }}
          </td>
          <td class="title-td">
            <NuxtLink :to="''" :external="true">
              <truncatetext max-length="50" v-model:text="item.tmpltNm" />
            </NuxtLink>
          </td>
          <td>
            <div class="bx-btn">
              <div class="download-box" v-for="file in item.fileList">
                <button
                  class="btn-download"
                  type="button"
                  v-if="!!file.atchFileId"
                  @click="() => download(file.atchFileId, file.atchFileSeq)"
                >
                  <img
                      v-if="
                        'doc|docx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                      src="~/assets/image/sub/file/doc.svg"
                      alt="워드 파일 다운로드"
                  />

                  <img
                      v-else-if="
                        'hwp|hwpx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                      src="~/assets/image/sub/file/hwp.svg"
                      alt="한글 파일 다운로드"
                  />

                  <img
                      v-else-if="
                        'gif|jpg|png|jpeg'.includes(
                          file.atchFileExtnNm.toLowerCase()
                        )
                      "
                      src="~/assets/image/sub/file/img.svg"
                      alt="이미지 파일 다운로드"
                  />

                  <img
                      v-else-if="file.atchFileExtnNm.toLowerCase() === 'pdf'"
                      src="~/assets/image/sub/file/pdf.svg"
                      alt="PDF 파일 다운로드"
                  />

                  <img
                      v-else-if="
                        'ppt|pptx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                      src="~/assets/image/sub/file/ppt.svg"
                      alt="PPT 파일 다운로드"
                  />

                  <img
                      v-else-if="file.atchFileExtnNm.toLowerCase() === 'txt'"
                      src="~/assets/image/sub/file/txt.svg"
                      alt="TXT 파일 다운로드"
                  />

                  <img
                      v-else-if="
                        'xls|xlsx'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                      src="~/assets/image/sub/file/xls.svg"
                      alt="엑셀 파일 다운로드"
                  />

                  <img
                      v-else-if="
                        'zip|rar'.includes(file.atchFileExtnNm.toLowerCase())
                      "
                      src="~/assets/image/sub/file/zip.svg"
                      alt="ZIP 파일 다운로드"
                  />

                  <img
                      v-else
                      src="~/assets/image/sub/file/etc.svg"
                      alt="파일 다운로드"
                  />
                </button>
                <NuxtLink
                  v-if="!!file.pdfId"
                  :to="`/streamdocs/view/sd;streamdocsId=${file.pdfId}`"
                  target="_blank"
                  :title="`${file.orgnlFileNm} 첨부파일 미리보기 새 창 열림`"
                  class="btn-basic primary sm"
                >
                  <span class="icon-shortcut"></span>
                  <span class="text"> 바로보기</span>
                </NuxtLink>
              </div>
            </div>
          </td>
          <td>{{ item.atchFileDwnldCnt }}</td>
          <td>{{ item.frstRegDt.substring(0, 10) }}</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
  <CommonPagenation
    :page="query.page"
    :size="query.size"
    :total-elements="page.totalElements"
    :show-pagination-count="10"
    @change="movePage"
  />
</template>

<style scoped></style>
