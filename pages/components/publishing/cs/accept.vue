<script setup lang="ts">
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import NewHeader from '~/components/ui/header/header.vue';

definePageMeta({
  layout: 'guide'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '고객센터',
  menuitem: [{ menuid: 1, text: '시스템 이용문의', to: '/test1' }]
};
const activeIndex = ref<number | null>(null);
const dropdownCategory = ref('');
function setActive(index: number) {
  activeIndex.value = index;
}
onMounted(() => {
  setActive(2);
});
const inputTextData = ref('');
</script>

<template>
  <div class="content" id="common-content">
    <div class="container">
      <div class="sub-content-box">
        <section class="section1">
          <CommonBreadCrumb
            :breadcrumb-title="breadcrumbMenuItem.menutitle"
            :showPrintButton="true"
            :breadcrumbItems="breadcrumbMenuItem.menuitem"
          />
          <div class="common-category__button">
            <div class="btn-select__wrap mo-visible">
              <DropdownBasic
                class="select-type"
                v-model="dropdownCategory"
                label="시스템 이용 문의"
              >
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('공지 사항')"
                      @keydown.enter.prevent="select('공지 사항')"
                    >
                      공지 사항
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('자주찾는 질문')"
                      @keydown.enter.prevent="select('자주찾는 질문')"
                    >
                      자주찾는 질문
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('시스템 이용 문의')"
                      @keydown.enter.prevent="select('시스템 이용 문의')"
                    >
                      시스템 이용 문의
                    </li>
                    <li
                      role="menuitem"
                      tabindex="0"
                      @click="select('이용안내')"
                      @keydown.enter.prevent="select('이용안내')"
                    >
                      이용안내
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
            <div class="btn-tab__wrap-gap pc-visible">
              <router-link
                to=""
                class="btn-auto"
                :class="{ active: activeIndex === 0 }"
                @click="setActive(0)"
                >공지사항</router-link
              >
              <router-link
                to=""
                class="btn-auto"
                :class="{ active: activeIndex === 1 }"
                @click="setActive(1)"
                >자주찾는 질문</router-link
              >
              <router-link
                to=""
                class="btn-auto"
                :class="{ active: activeIndex === 2 }"
                @click="setActive(2)"
                >시스템 이용 문의</router-link
              >
              <router-link
                to=""
                class="btn-auto"
                :class="{ active: activeIndex === 3 }"
                @click="setActive(3)"
                >이용안내</router-link
              >
            </div>
          </div>
        </section>
        <section class="section2">
          <div class="result-box">
            <div class="img-box">
              <img
                src="/image/sub/customer/send.svg"
                alt="시스템 이용 문의 완료"
              />
            </div>
            <div class="text-box">
              <h4>
                문의하신 내용이 <br class="mo-only" />정상적으로 접수되었습니다.
              </h4>
              <p>
                문의에 대한 답변은 <br class="mo-only" />내 문의내역에서 확인
                가능하십니다.
              </p>
            </div>
            <div class="button-box">
              <button class="btn main-button" @click="movePage">
                홈페이지 메인
              </button>
              <button class="btn my-inquiry-button" @click="movePage2">
                나의 문의내역
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/qna/cmptn/index.scss';
</style>
