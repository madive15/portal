<!--
 * 화면명 : 나의서류 목록팝업
 * 화면ID : LASP_MYP_024
 * 파일명 : MyDocPopup
 * 작성자 : 노한서
 * 화면 설명 : 나의 서류 목록 팝업
 * 공통코드 :
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일              변경자       변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.08.11         노한서       최초생성
-->
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import axios from 'axios';
import { myDocOutVO } from '~/types/mydoc';
import { useCustomAlert } from '~/composables/useCustomAlert';

const { showAlert } = useCustomAlert();
const router = useRouter();

/* 나의 서류 팝업 Ref */
const modalRef = ref<InstanceType<typeof CommonModal>>();
/* 나의 서류 목록 */
const myDocList = ref<myDocOutVO[]>([]);

/**
 * name : showModal
 * desc : 팝업을 호출하는 함수
 */
const showModal = () => {
  modalRef.value?.open();
};

onMounted(async () => {
  await selectMyDocList();
});

/**
 * name : selectMyDocList
 * desc : 나의 서류 목록을 가져오는 함수
 */
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

/**
 * name : movePage
 * desc : 등록 화면으로 페이지를 이동하는 함수 (TODO 필요여부 확인 필요!)
 */
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

/* 모창으로 순번, 파일아이디 전달하기 위한 변수 */
const emit = defineEmits(['myDoc']);

/**
 * name : selectRow
 * desc : 선택한 나의 서류를 모창으로 전달하는 함수
 */
const selectRow = (atchFileId, atchFileSeq, orgnlFileNm) => {
  emit('myDoc', {
    atchFileId: atchFileId,
    atchFileSeq: atchFileSeq,
    orgnlFileNm: orgnlFileNm
  });
  modalRef.value?.close();
};

/* showModal 함수를 부모 컴포넌트로 전달 */
defineExpose({
  showModal
});
</script>

<template>
  <!-- div가 공간을 차지해서 주석처리 함. 확인 필요 -->
  <!--  <div class="sub-content-box" style="height: 500px">-->
  <!--    <button type="button" class="btn-basic primary" @click="showModal">-->
  <!--      <span class="text">Open Modal</span>-->
  <!--    </button>-->

  <CommonModal ref="modalRef" title="나의 서류 목록" :width="720" :full="true">
    <div class="body-cont-wrap">
      <CommonTable>
        <caption>
          나의 서류의 순번, 제목, 등록일, 선택에 대한 표
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
            <th scope="col" class="hit-th">선택</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="myDocList.length > 0"
            v-for="(item, index) in myDocList"
            :key="index"
          >
            <td>{{ myDocList.length - index }}</td>
            <td>
              <NuxtLink
                class="link-txt align-left"
                @click="
                  movePage(item.indvTmpltSeq, item.atchFileId, item.tmpltNm)
                "
                style="cursor: pointer"
                >{{ item.tmpltNm }}</NuxtLink
              >
            </td>
            <td>{{ item.frstRegDt.substring(0, 10) }}</td>
            <td>
              <CommonButton
                variants="primary"
                height="sm"
                class="!w-[50px]"
                @click="
                  selectRow(item.atchFileId, item.atchFileSeq, item.orgnlFileNm)
                "
              >
                선택
              </CommonButton>
            </td>
          </tr>
          <tr v-else>
            <td colspan="4" style="text-align: center">
              조회된 데이터가 존재하지 않습니다.
            </td>
          </tr>
        </tbody>
      </CommonTable>
    </div>
    <template #footer>
      <CommonButton
        variants="primary"
        width="md"
        height="md"
        @click="modalRef?.close()"
      >
        닫기
      </CommonButton>
    </template>
  </CommonModal>
  <!--  </div>-->
  <!-- 여기부터 모달 컨텐츠 -->
</template>

<style scoped lang="scss">
@use 'assets/style/pages/elrcpt/MyDocPopup';
</style>
