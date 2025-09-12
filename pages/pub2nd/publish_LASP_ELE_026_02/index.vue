<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';

definePageMeta({
  layout: 'pub2nd'
});

const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[
            { menuid: 1, text: '만족도 설문조사', to: '/test1' }
          ]"
          breadcrumbTitle="만족도 설문 통계"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTable class="mt-5">
          <caption>
            만족도 설문조사
          </caption>
          <colgroup>
            <col style="width: 70%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">설 문 문 항</th>
              <th scope="col">전체</th>
              <th scope="col">합계</th>
              <th scope="col">평균</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="text-left">
                  1. 시스템의 메뉴가 명확하게 구분되어 있는가?
                </div>
              </td>
              <td>10</td>
              <td>50</td>
              <td>5</td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  2. 디자인 구성요소(아이콘, 색상, 글꼴 등)가 적절히 배치되어
                  보기에 편리한가?
                </div>
              </td>
              <td>10</td>
              <td>80</td>
              <td>8</td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  3. 시스템의 응답속도는 만족할 수준이라고 생각하십니까?
                </div>
              </td>
              <td>10</td>
              <td>90</td>
              <td>9</td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  4. 사용자에게 작업에 대한 진행, 완료 예정시간 등을 알려주는가?
                </div>
              </td>
              <td>10</td>
              <td>40</td>
              <td>4</td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  5. 메뉴 화면에서 현재 선택이 가능한 것과 불가능한 것을
                  명확하게 구분하고 있는가?
                </div>
              </td>
              <td>10</td>
              <td>60</td>
              <td>6</td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  6. 오류 메시지 내용이 이해하기 쉽게 표현되어 있는가?
                </div>
              </td>
              <td>10</td>
              <td>80</td>
              <td>8</td>
            </tr>
          </tbody>
        </CommonTable>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
//@use './index.scss';
</style>
