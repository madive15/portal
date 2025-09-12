<script setup lang="ts">
import { myDocOutVO } from '~/types/mydoc';
import axios from 'axios';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
const { showAlert } = useCustomAlert();
const router = useRouter();
const myDocList = ref<myDocOutVO[]>([]);
onMounted(async () => {
  await selectMyDocList();
});

const selectMyDocList = async () => {
  try {
    const res = await axios.get('/api/mydoc/mydocList');
    if (res.data.length > 0 && res.status == 200) {
      myDocList.value = res.data as myDocOutVO[];
    } else if (res.data.length === 0) {
      myDocList.value = [];
    }
  } catch (err) {
    console.error(err);
    await showAlert({ icon: 'info', html: '관리자에게 문의 바랍니다' });
  }
};
const movePage = (seq?: number, fileId?: string, tmpltNm?: string) => {
  router.push({
    path: '/my/doc/write',
    query: {
      id: seq,
      //fileId: fileId ? fileId : ''
      fileId: fileId,
      tmpltNm: tmpltNm
    }
  });
};
const deleteRow = async (seq, fileId) => {
  showAlert({
    icon: 'info',
    html: '선택한 파일을 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await useAxios().post('api/mydoc/deleteMyDoc', {
          indvTmpltSeq: seq,
          fileId: fileId
        });
        if (res.status == 200) {
          await showAlert({ icon: 'info', html: '삭제가 완료되었습니다.' });
          await selectMyDocList();
        }
      }
    })
    .catch((err) => {
      console.error(err);
      showAlert({ icon: 'info', html: '관리자에게 문의 바랍니다' });
    });
};
</script>
<template>
  <div class="sub-wrap" id="board-list">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <Breadcrumb
            breadcrumb-title="마이페이지"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '마이페이지' },
              { text: '나의서류관리', active: true }
            ]"
          />
          <my-tab />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="common-table__box pc-only">
            <table>
              <caption>
                나의서류관리의 순번, 제목, 등록일, 삭제에 대한 표
              </caption>
              <colgroup>
                <col style="width: 14%" />
                <col style="width: 40%" />
                <col style="width: 28%" />
                <col style="width: 18%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" class="num-th">순번</th>
                  <th scope="col" class="title-th">제목</th>
                  <th scope="col" class="date-th">등록일</th>
                  <th scope="col" class="hit-th">삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in myDocList" :key="index">
                  <td>{{ myDocList.length - index }}</td>
                  <td>
                    <NuxtLink
                      class="text-decoration-underline color-blue"
                      @click="
                        movePage(
                          item.indvTmpltSeq,
                          item.atchFileId,
                          item.tmpltNm
                        )
                      "
                      style="cursor: pointer"
                      >{{ item.tmpltNm }}</NuxtLink
                    >
                  </td>
                  <td>{{ item.frstRegDt.substring(0, 10) }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn-basic sm"
                      @click="deleteRow(item.indvTmpltSeq, item.atchFileId)"
                    >
                      <span class="text">삭제</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="common-table__list mo-only">
            <ul>
              <li v-for="(item, index) in myDocList" :key="index">
                <div class="table-mo-cont">
                  <dl>
                    <dt>순번</dt>
                    <dd>{{ myDocList.length - index }}</dd>
                  </dl>
                  <dl>
                    <dt>제목</dt>
                    <dd>
                      <NuxtLink
                        @click="
                          movePage(
                            item.indvTmpltSeq,
                            item.atchFileId,
                            item.tmpltNm
                          )
                        "
                        class="text-decoration-underline color-blue"
                        >{{ item.tmpltNm }}</NuxtLink
                      >
                    </dd>
                  </dl>
                  <dl>
                    <dt>등록일</dt>
                    <dd>{{ item.frstRegDt.substring(0, 10) }}</dd>
                  </dl>
                  <dl>
                    <dt>삭제</dt>
                    <dd>
                      <button
                        type="button"
                        class="btn-basic sm"
                        @click="deleteRow(item.indvTmpltSeq, item.atchFileId)"
                      >
                        <span class="text">삭제</span>
                      </button>
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
          <div class="button-box">
            <NuxtLink to="/my/doc/write" class="btn type02"
              >나의서류등록</NuxtLink
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '~/pages/pub2nd/publish_LASP_MYP_024_01/index.scss';
</style>
