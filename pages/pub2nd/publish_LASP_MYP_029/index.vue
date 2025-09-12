<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';

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
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="상담예약 내역"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar"
          >비회원 상담예약 조회</CommonTitle
        >
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              법률구조 플랫폼이나 각 법률 상담기관 홈페이지를 통한 상담예약이
              아닌 담당자를 통해 직접 상담 예약을 생성되어 예약번호를 전달받은
              고객께서는 아래 예약번호와 이름 및 휴대번호를 입력해서 조회한 뒤
              예약 내용을 확인해 주세요
            </li>
          </BullList>
        </div>
        <div class="common-form__area">
          <table>
            <caption>
              비회원 상담예약 조회의 예약번호, 이름, 휴대전화번호 입력에 관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">예약번호</th>
                <td>
                  <a-form-item
                    name=""
                    label="예약번호"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">이름</th>
                <td>
                  <a-form-item
                    name=""
                    label="이름"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">휴대전화번호</th>
                <td>
                  <div class="form-item__number">
                    <a-form-item
                      name="mobile"
                      label="휴대전화 식별번호"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select class="common-select" placeholder="선택">
                        <a-select-option value="1">선택 1</a-select-option>
                        <a-select-option value="2">선택 2</a-select-option>
                      </a-select>
                    </a-form-item>
                    <span class="dash">-</span>
                    <a-form-item
                      name="mobile2"
                      label="휴대전화 가운데 자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                    <span class="dash">-</span>
                    <a-form-item
                      name="mobile3"
                      label="휴대전화 마지막 자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="sm-1">조회하기</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
