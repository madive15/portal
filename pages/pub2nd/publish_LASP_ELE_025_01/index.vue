<script setup lang="ts">
import { ref } from 'vue';

import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';

definePageMeta({
  layout: 'pub2nd'
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
          breadcrumbTitle="만족도 설문 조사"
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
          </colgroup>
          <thead>
            <tr>
              <th scope="col">설 문 문 항</th>
              <th scope="col">만족도 점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="text-left">
                  1. 시스템의 메뉴가 명확하게 구분되어 있는가?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="시스템의 메뉴가 명확하게 구분되어 있는가"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  2. 디자인 구성요소(아이콘, 색상, 글꼴 등)가 적절히 배치되어
                  보기에 편리한가?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="디자인 구성요소(아이콘, 색상, 글꼴 등)가 적절히 배치되어
                  보기에 편리한가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  3. 시스템의 응답속도는 만족할 수준이라고 생각하십니까?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="시스템의 응답속도는 만족할 수준이라고 생각하십니까?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  4. 사용자에게 작업에 대한 진행, 완료 예정시간 등을 알려주는가?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="사용자에게 작업에 대한 진행, 완료 예정시간 등을 알려주는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  5. 메뉴 화면에서 현재 선택이 가능한 것과 불가능한 것을
                  명확하게 구분하고 있는가?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="메뉴 화면에서 현재 선택이 가능한 것과 불가능한 것을
                  명확하게 구분하고 있는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  6. 오류 메시지 내용이 이해하기 쉽게 표현되어 있는가?
                </div>
              </td>
              <td>
                <div class="score-input">
                  <a-form-item
                    label="오류 메시지 내용이 이해하기 쉽게 표현되어 있는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                  <span>점</span>
                </div>
              </td>
            </tr>
          </tbody>
        </CommonTable>

        <ButtonGroup align="center">
          <CommonButton variants="primary" width="lg">
            설문조사 완료
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
//@use './index.scss';
</style>
