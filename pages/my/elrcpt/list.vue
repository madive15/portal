<script setup lang="ts">
import { useCommonCodeStore } from '~/stores';
import axios from 'axios';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import type { userElrcptInVO, userElrcptOutVO } from '~/types/elrcpt';
import { cloneDeep } from 'lodash-es';
import CommonTable from '~/components/ui/table/tables.vue';
const elrTypeOptions =
  await useCommonCodeStore().searchCommonCodeList('CO0069');

const elrcptInVO = ref<userElrcptInVO>({
  ctgr: '',
  mbrNo: ''
});
const DEFAULT_ERLCPT_OUT_VO: userElrcptOutVO = {
  no: 0,
  instNm: '',
  trprNm: '',
  aplyPrgrsSttsCd: '',
  frstRegDt: '',
  comCdNm: '',
  incdntId: '',
  incdntNm: ''
};
const elrcptOutVO = ref<userElrcptOutVO>(cloneDeep(DEFAULT_ERLCPT_OUT_VO));
onMounted(() => {
  search();
});
const isNull = ref(false);

const search = async () => {
  try {
    const { data } = await axios.get('/api/user/my/elrcpt/list', {
      params: {
        ...elrcptInVO.value
      }
    });

    if (data.length > 0) {
      isNull.value = true;
      elrcptOutVO.value = data;
      elrcptOutVO.value.map((item, index) => {
        item.no = data.length - index;
      });
    } else {
      isNull.value = false;
    }
  } catch (e) {
    console.error(`에러 ${e}`);
    Modal.info({ title: '관리자에게 문의바랍니다' });
  }
};
const changeValue = (val: string) => {
  elrcptInVO.value.ctgr = val;
  search();
};
const router = useRouter;
const movePage = (cd, id) => {
  if (cd == 'A01') {
    Modal.info({ title: `${id}사건 작성화면으로` });
    router().push('');
  } else {
    Modal.info({ title: `${id}사건 상세보기 화면으로` });
  }
};
const openPopup = (id) => {
  Modal.info({ title: `${id} 번 사건 접수심사내용 팝업 ` });
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
              { text: '전자접수현황', active: true }
            ]"
          />
          <my-tab />
          <a-select
            class="common-select"
            id="erl"
            style="width: 200px"
            @change="changeValue"
            v-model:value="elrcptInVO.ctgr"
          >
            <a-select-option value="">전체</a-select-option>
            <a-select-option
              v-for="opt in elrTypeOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </div>
      </section>

      <section class="section2">
        <div class="container">
          <div class="board-list-box" v-if="isNull">
            <div class="common-table__box pc-visible">
              <CommonTable>
                <caption>
                  전자접수목록
                </caption>
                <thead>
                  <tr>
                    <th scope="col" class="num-th">순번</th>
                    <th scope="col" class="">신청번호</th>
                    <th scope="col" class="">대상사건</th>
                    <th scope="col" class="">구조대상자유형</th>
                    <th scope="col" class="">신청기관</th>
                    <th scope="col" class="">신청일</th>
                    <th scope="col" class="">접수신청상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in elrcptOutVO"
                    @click="movePage(item.aplyPrgrsSttsCd, item.incdntId)"
                    style="cursor: pointer"
                  >
                    <td>{{ item.no }}</td>
                    <td>{{ item.incdntId }}</td>
                    <td>{{ item.incdntNm }}</td>
                    <td>{{ item.trprNm }}</td>
                    <td>{{ item.instNm }}</td>
                    <td>{{ item.frstRegDt }}</td>
                    <td>
                      {{ item.comCdNm }}
                      <p
                        v-if="
                          item.aplyPrgrsSttsCd == 'C01' ||
                          item.aplyPrgrsSttsCd == 'C02'
                        "
                      >
                        [
                        <a
                          @click.stop="openPopup(item.incdntId)"
                          style="cursor: pointer"
                          >내용보기</a
                        >
                        ]
                      </p>
                    </td>
                  </tr>
                </tbody>
              </CommonTable>
            </div>
          </div>

          <div class="board-list-box" v-if="!isNull">
            <div class="top-list-box">
              <strong>　</strong>
            </div>
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
      </section>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #0d6efd;
}
a:hover {
  color: red;
}
</style>
