<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
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

const radioSelected = ref('전체');

const inputTextData = ref('');

const tableItems = ref([
  {
    name: '임금등 체불 피해근로자',
    title: '임금 및 퇴직금 체불로 인한 피해근로자(국내 거주 외국인 포함)'
  },
  {
    name: '임금등 체불 피해선원',
    title: '선원법상의 임금ㆍ퇴직금 체불 피해선원(국내 거주 외국인 포함)'
  },
  {
    name: '국민기초생활보장수급자',
    title: '「국민기초생활보장법」에 의한 수급자'
  },
  {
    name: '차상위 계층',
    title:
      '「국민기초생활 보장법」 제2조제10호에 따른 차상위계층에 해당하는 사람'
  },
  {
    name: '장애인(장애정도가 심한 장애인-무료, 종전 1~3급)',
    title:
      '「장애인복지법」제2조 제2항의 규정에 의하여 장애인으로 등록된 자로서 동법 시행규칙 제2조에 정한 장애인에 해당하는 자 장애의 정도가 심한 장애인(종전 1-3급)'
  },
  {
    name: '장애인(장애정도가 심하지 않은 장애인-일부유료, 종전 4-6급)',
    title:
      '「장애인복지법」제2조 제2항의 규정에 의하여 장애인으로 등록된 자로서 동법 시행규칙 제2조에 정한 장애인에 해당하는 자 장애의 정도가 심하지 않은 장애인(종전 4-6급)'
  },
  {
    name: '소액임차인',
    title: '「주택임대차보호법」에서 정한 소액임차인에 해당하는 자'
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
      title="구조대상자 유형찾기"
      :width="1100"
      :full="true"
    >
      <div class="body-cont-wrap">
        <a-radio-group v-model:value="radioSelected" class="pc-only">
          <a-radio-button class="radio-btn-bx" value="전체"
            >전체</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="경제적 취약계층"
            >경제적 취약계층</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="사회적 취약계층"
            >사회적 취약계층</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="범죄/재해/환경 피해자"
            >범죄/재해/환경 피해자</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="임차인/전세사기피해자"
            >임차인/전세사기피해자</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="소상공인/중소기업인"
            >소상공인/중소기업인</a-radio-button
          >
          <a-radio-button
            class="radio-btn-bx"
            value="국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등"
            >국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등</a-radio-button
          >
          <a-radio-button
            class="radio-btn-bx"
            value="경찰/소방/제대군인/의사상자"
            >경찰/소방/제대군인/의사상자</a-radio-button
          >
          <a-radio-button
            class="radio-btn-bx"
            value="예술인/농어업인/특수직업군"
            >예술인/농어업인/특수직업군</a-radio-button
          >
          <a-radio-button
            class="radio-btn-bx"
            value="기준중위소득 125% 이하 국민"
            >기준중위소득 125% 이하 국민</a-radio-button
          >
          <a-radio-button class="radio-btn-bx" value="외국인"
            >외국인</a-radio-button
          >
        </a-radio-group>
        <a-select
          id="select"
          class="common-select type-blue mo-only"
          placeholder="선택"
        >
          <a-select-option value="전체">전체</a-select-option>
          <a-select-option value="경제적 취약계층"
            >경제적 취약계층</a-select-option
          >
          <a-select-option value="사회적 취약계층"
            >사회적 취약계층</a-select-option
          >
          <a-select-option value="범죄/재해/환경 피해자"
            >범죄/재해/환경 피해자</a-select-option
          >
          <a-select-option value="임차인/전세사기피해자"
            >임차인/전세사기피해자</a-select-option
          >
          <a-select-option value="소상공인/중소기업인"
            >소상공인/중소기업인</a-select-option
          >
          <a-select-option
            value="국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등"
            >국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등</a-select-option
          >
          <a-select-option value="경찰/소방/제대군인/의사상자"
            >경찰/소방/제대군인/의사상자</a-select-option
          >
          <a-select-option value="예술인/농어업인/특수직업군"
            >예술인/농어업인/특수직업군</a-select-option
          >
          <a-select-option value="기준중위소득 125% 이하 국민"
            >기준중위소득 125% 이하 국민</a-select-option
          >
          <a-select-option value="외국인">외국인</a-select-option>
        </a-select>
        <div class="common-form__area">
          <table>
            <caption>
              구조대상자 유형찾기의 구조대상자명에 대한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">구조대상자명</th>
                <td>
                  <label for="ipText">
                    <span class="sr-only">구조대상자명 입력</span>
                  </label>
                  <a-input
                    id="ipText"
                    class="text-bx"
                    placeholder="2자 이상 입력"
                    v-model:value="inputTextData"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-20px">
          <CommonButton variants="line-primary" width="lg">
            초기화
          </CommonButton>
          <CommonButton variants="primary" width="lg">검색</CommonButton>
        </ButtonGroup>
        <div class="thead-info mt-27px">
          <span>총</span>
          <span class="case-txt">87건</span>
        </div>
        <CommonTable>
          <caption>
            구조대상자 목록의 구조대상자명, 정의, 선택에 대한 표
          </caption>
          <thead>
            <tr>
              <th scope="col" class="name-th">구조대상자명</th>
              <th scope="col" class="title-th">정의</th>
              <th scope="col">선택</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableItems" :key="index">
              <td>{{ item.name }}</td>
              <td class="title-td">{{ item.title }}</td>
              <td>
                <a-checkbox class="check-bx" />
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonPagenation
          :page="1"
          :size="10"
          :total-elements="100"
          :show-pagination-count="10"
        />
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
