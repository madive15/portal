<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' },
  { title: '상속재산포기 심판청구서', date: '2025-05-27 15:04:01' }
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
      title="나의 서류 목록"
      :width="720"
      :full="true"
    >
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
            <tr v-for="(item, index) in sampleData" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.date }}</td>
              <td>
                <CommonButton variants="primary" height="sm" class="!w-[50px]">
                  선택
                </CommonButton>
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
          확인
        </CommonButton>
      </template>
    </CommonModal>
  </div>
  <!-- 여기부터 모달 컨텐츠 -->
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
