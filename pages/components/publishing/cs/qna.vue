<script setup lang="ts">
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

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
    <div class="">
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
            <div class="form-box">
              <div class="content-header">
                <div class="info-txt">
                  <span class="category-span">작성자</span>
                  <span class="file-span"> 홍길동 </span>
                </div>
                <div class="info-txt-box">작성일: 1111-11-11</div>
              </div>

              <div class="reason-box">
                <label for="reason">구분선택</label>
                <a-select
                  id="reason"
                  class="common-select"
                  placeholder="구분선택"
                >
                  <a-select-option value="1">선택 1</a-select-option>
                  <a-select-option value="2">선택 2</a-select-option>
                </a-select>
              </div>
              <div class="title-box">
                <label for="title">제목</label>
                <a-input
                  id="title"
                  class="text-bx"
                  placeholder="제목을 입력해 주세요"
                  v-model:value="inputTextData"
                  ref="baTitleRef"
                />
              </div>
              <div class="content-box">
                <label for="content">내용</label>
                <lazy-data-editor ref="editorRef" />
              </div>
              <div class="file-box">
                <strong>파일첨부</strong>
                <data-fileupload module="bbs" :max-count="5" :size="5" />
                <p class="notice-p">※ 첨부파일 용량은 2M이하로 올려주세요.</p>
              </div>
              <!--              <div class="submit-box">-->
              <!--                <button type="button" class="btn submit-button">-->
              <!--                  문의하기-->
              <!--                </button>-->
              <!--              </div>-->
              <div class="common-btn__area">
                <button type="button" class="ml-auto btn-basic primary">
                  <span class="text">문의하기</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/qna/index.scss';
</style>
