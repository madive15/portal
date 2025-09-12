<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import { ref } from 'vue';
import { TAB_RESULT } from '~/constants/dropdown';
import CommonButton from '~/components/ui/button/button.vue';
const dropdownCategory = ref('이용안내');

const activeIndex = ref<number | null>(3);
function setActive(index: number) {
  activeIndex.value = index;
}

const movePage = () => {
  window.location.href =
    'https://www.hancom.com/support/downloadCenter/download';
};

const movePage2 = () => {
  window.location.href = 'https://get.adobe.com/kr/reader/?c=us';
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="고객센터"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '고객센터' },
            { text: '이용안내', active: true }
          ]"
        />
        <div class="common-category__button">
          <div class="btn-select__wrap mo-visible">
            <DropdownBasic class="select-type" v-model="dropdownCategory">
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    v-for="(tab, index) in TAB_RESULT"
                    :key="index"
                    @click="select(tab.label)"
                    @keydown.enter.prevent="select(tab.label)"
                  >
                    <router-link :to="tab.link" class="btn-auto">
                      {{ tab.label }}
                    </router-link>
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
          <div class="btn-tab__wrap-gap pc-visible">
            <router-link
              v-for="(tab, index) in TAB_RESULT"
              :to="tab.link"
              class="btn-auto"
              :class="{ active: activeIndex === index }"
              @click="setActive(index)"
              >{{ tab.label }}</router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="box">
          <h3>법률구조플랫폼 웹 브라우저 최적화 환경</h3>
          <div class="text-box">
            <ul>
              <li>
                웹브라우저는 Chrome, Microsoft Edge, Mozilla Firefox, Apple
                Safari 최신버전을 권장합니다.
              </li>
              <li>화면 해상도는 1920*1080 이상</li>
            </ul>
          </div>
        </div>

        <div class="box">
          <h3>뷰어프로그램 다운로드</h3>
          <div class="text-box">
            <ul>
              <li>
                다운로드한 파일이 열리지 않을 때 뷰어프로그램을 이용하여 보실 수
                있습니다.
              </li>
              <li>
                한컴오피스 :
                <CommonButton
                  title="새창에서 열림"
                  variants="primary"
                  height="sm"
                  @click="movePage"
                >
                  다운로드
                </CommonButton>
              </li>
              <li>
                아크로벳리더(PDF) :
                <CommonButton
                  variants="primary"
                  type="button"
                  height="sm"
                  title="새창에서 열림"
                  @click="movePage2"
                >
                  <span class="text">다운로드</span>
                </CommonButton>
              </li>
            </ul>
          </div>
        </div>

        <div class="box">
          <h3>원하는 기관 및 서비스 찾기</h3>
          <div class="text-box">
            <ul>
              <li>
                손쉬운 찾기 : 나의 서비스 찾기 &gt; 손쉬운찾기 메뉴를 통해
                서비스 유형별, 대상자, 기관, 지역 정보를 통해 서비스 정보를 찾을
                수 있습니다.
              </li>
              <li>
                법률복지지도 : 나의 서비스 찾기 &gt; 법률복지지도 메뉴를 통해
                기관의 위치 정보를 지도로 쉽게 찾을 수 있습니다.
              </li>
              <li>
                통합검색 : 키워드를 통해 내가 원하는 서비스정보, 기관정보,
                필요한 서식 및 사례 정보를 검색하실 수 있습니다.
              </li>
              <li>
                AI검색 : 인공지능 AI를 통해 질문해 보세요, 내가 원하는 정보가
                명확하지 않을 때 질문을 통해 원하는 결과를 찾아 드립니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/gd/index.scss';
</style>
