<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'pub2nd'
});

// 샘플 데이터
const sampleData = ref([
  {
    date: '202501',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '268,210',
    recPrice2: '12,000',
    recPrice3: '268,210',
    recPrice4: '12,000'
  },
  {
    date: '202502',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '268,210',
    recPrice2: '12,000',
    recPrice3: '268,210',
    recPrice4: '12,000'
  },
  {
    date: '202503',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '268,210',
    recPrice2: '12,000',
    recPrice3: '268,210',
    recPrice4: '12,000'
  },
  {
    date: '202504',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '268,210',
    recPrice2: '12,000',
    recPrice3: '268,210',
    recPrice4: '12,000'
  },
  {
    date: '202505',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202506',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202507',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202508',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202509',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202510',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202511',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  },
  {
    date: '202512',
    gainPrice1: '0',
    gainPrice2: '0',
    gainPrice3: '0',
    gainPrice4: '0',
    recPrice1: '0',
    recPrice2: '0',
    recPrice3: '0',
    recPrice4: '0'
  }
]);

const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal
      ref="modalRef"
      title="건강보험납입조회"
      :width="1100"
      :full="true"
    >
      <template #footer>
        <CommonButton variants="primary" width="lg">
          건강보험료 적용하기
        </CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="2" type="arrow">
          월별납임 내역(2025)
        </CommonTitle>
        <CommonTable class="pc-only mt-17px">
          <caption>
            직장 가입자 건강보험납입정보의 가입자성명, 생년월일, 발급일자,
            납부자번호, 사업자명에 대한 표
          </caption>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 32%" />
            <col style="width: 32%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">가입자성명</th>
              <th scope="col">생년월일</th>
              <th scope="col">발급일자</th>
              <th scope="col">납부자번호</th>
              <th scope="col">사업자명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>1985.05.01</td>
              <td>2012.06.01</td>
              <td>30028858759</td>
              <td>대*****</td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonTable class="type-left mo-only mt-17px">
          <caption>
            직장 가입자 건강보험납입정보의 가입자성명, 생년월일, 발급일자,
            납부자번호, 사업자명에 대한 표
          </caption>
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">가입자성명</th>
              <td>홍길동</td>
            </tr>
            <tr>
              <th scope="row">생년월일</th>
              <td>1985.05.01</td>
            </tr>
            <tr>
              <th scope="row">발급일자</th>
              <td>2012.06.01</td>
            </tr>
            <tr>
              <th scope="row">납부자번호</th>
              <td>30028858759</td>
            </tr>
            <tr>
              <th scope="row">사업자명</th>
              <td>대*****</td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonTitle tag="h2" size="2" type="arrow" class="mt-40px">
          월별납임 내역(2025)
        </CommonTitle>
        <ImgBox useScroll>
          <CommonTable class="mt-17px">
            <caption>
              월별납임 내역의 고지년월, 소득의 고지금액(건강),
              고지금액(장기요양), 납부금액(건강), 납부금액(장기요양), 직장의
              고지금액(건강), 고지금액(장기요양), 납부금액(건강),
              납부금액(장기요양)에 대한 표
            </caption>
            <thead>
              <tr>
                <th scope="col" rowspan="2">고지년월</th>
                <th scope="colgroup" colspan="4">소득</th>
                <th scope="colgroup" colspan="4">직장</th>
              </tr>
              <tr>
                <th scope="col">고지금액<br />(건강)</th>
                <th scope="col">고지금액<br />(장기요양)</th>
                <th scope="col">납부금액<br />(건강)</th>
                <th scope="col">납부금액<br />(장기요양)</th>
                <th scope="col">고지금액<br />(건강)</th>
                <th scope="col">고지금액<br />(장기요양)</th>
                <th scope="col">납부금액<br />(건강)</th>
                <th scope="col">납부금액<br />(장기요양)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sampleData" :key="index">
                <td>{{ item.date }}</td>
                <td>{{ item.gainPrice1 }}</td>
                <td>{{ item.gainPrice2 }}</td>
                <td>{{ item.gainPrice3 }}</td>
                <td>{{ item.gainPrice4 }}</td>
                <td>{{ item.recPrice1 }}</td>
                <td>{{ item.recPrice2 }}</td>
                <td>{{ item.recPrice3 }}</td>
                <td>{{ item.recPrice4 }}</td>
              </tr>
            </tbody>
          </CommonTable>
        </ImgBox>
        <p class="info-txt-arrow">
          2025년 03월 기준 건강보험료납입액(장기요양보험료제외)
          <br class="mo-only" /><strong class="price">268,210</strong>원 입니다.
        </p>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
