<script setup lang="ts">
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonServiceTab from '~/components/ui/tab/servicedepth.vue';
import Tab from '~/components/ui/tab/tab.vue';
import Serviceslide from '~/components/ui/tab/serviceslide.vue';
import Tabitem from '~/components/ui/tab/tabitem.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});
const activeIndex = ref<number | null>(null);
function setActive(index: number) {
  activeIndex.value = index;
}
const activeMenuIndex = ref<number | null>(null);
function setMenuActive(index: number) {
  activeMenuIndex.value = index;
}
onMounted(() => {
  setActive(0);
  setMenuActive(0);
});
const dropdownCategory = ref('');
const dropdownMenuCategory = ref('');
const isExpanded = ref(false); // 탭버튼
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Tab</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 기본</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="탭제목 11"> 1 </CommonTabItem>
          <CommonTabItem title="탭제목 11"> 2 </CommonTabItem>
          <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
        </CommonTabs>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonTabs :platform-tab-show="true">
          &lt;CommonTabItem title="탭제목 11"> 1 &lt;/CommonTabItem>
          &lt;CommonTabItem title="탭제목 11"> 2 &lt;/CommonTabItem>
          &lt;CommonTabItem title="탭제목 11"> 3 &lt;/CommonTabItem>
        &lt;/CommonTabs>
      </pre>
    </div>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 글자가 큰 제목</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTabs :platform-none-width-tab-show="true">
          <CommonTabItem title="글자가 큰 제목"> 1 </CommonTabItem>
          <CommonTabItem title="글자가 작은 제목"> 2 </CommonTabItem>
          <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
        </CommonTabs>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;CommonTabs :platform-none-width-tab-show="true">
            &lt;CommonTabItem title="글자가 큰 제목"> 1 &lt;/CommonTabItem>
            &lt;CommonTabItem title="글자가 작은 제목"> 2 &lt;/CommonTabItem>
            &lt;CommonTabItem title="탭제목 11"> 3 &lt;/CommonTabItem>
          &lt;/CommonTabs>
      </pre>
    </div>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 탭안에 탭</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonTabs :platform-none-width-tab-show="true">
          <CommonTabItem title="글자가 큰 제목">
            탭 안 내용1
            <CommonTabs :platform-two-depth-tab-show="true">
              <CommonTabItem title="탭 안의 탭을 사용할때(플랫폼안내용)">
                1
              </CommonTabItem>
              <CommonTabItem title="플랫폼 안내용 탭"> 2 </CommonTabItem>
              <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
            </CommonTabs>
          </CommonTabItem>
          <CommonTabItem title="글자가 작은 제목"> 2 </CommonTabItem>
          <CommonTabItem title="탭제목 11"> 3 </CommonTabItem>
        </CommonTabs>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonTabs :platform-none-width-tab-show="true">
          &lt;CommonTabItem title="글자가 큰 제목">
            탭 안 내용1
            &lt;CommonTabs :platform-two-depth-tab-show="true">
              &lt;CommonTabItem title="탭 안의 탭을 사용할때(플랫폼안내용)">
                1
              &lt;/CommonTabItem>
              &lt;CommonTabItem title="플랫폼 안내용 탭"> 2 &lt;/CommonTabItem>
              &lt;CommonTabItem title="탭제목 11"> 3 &lt;/CommonTabItem>
            &lt;/CommonTabs>
          &lt;/CommonTabItem>
          &lt;CommonTabItem title="글자가 작은 제목"> 2 &lt;/CommonTabItem>
          &lt;CommonTabItem title="탭제목 11"> 3 &lt;/CommonTabItem>
        &lt;/CommonTabs>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• service tab slide</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonServiceTab />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="service-depth-wrap" id="servicedepth">
          &lt;Tab class="service-depth-tab" :platform-none-width-tab-show="true">
            &lt;Tabitem title="상담사례">
              &lt;serviceslide />
            &lt;/Tabitem>
            &lt;Tabitem title="구조사례">
            &lt;/Tabitem>
          &lt;/Tab>
        &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 탭 버튼 유형 1</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="common-category__button">
          <div class="btn-select__wrap mo-visible">
            <DropdownBasic
              class="select-type"
              v-model="dropdownCategory"
              label="공지 사항"
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
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="common-category__button">
            &lt;div class="btn-select__wrap mo-visible">
              &lt;DropdownBasic
                  class="select-type"
                  v-model="dropdownCategory"
                  label="공지 사항"
              >
                &lt;template #default="{ select }">
                  &lt;ul role="menu">
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('공지 사항')"
                        @keydown.enter.prevent="select('공지 사항')"
                    >
                      공지 사항
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('자주찾는 질문')"
                        @keydown.enter.prevent="select('자주찾는 질문')"
                    >
                      자주찾는 질문
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('시스템 이용 문의')"
                        @keydown.enter.prevent="select('시스템 이용 문의')"
                    >
                      시스템 이용 문의
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('이용안내')"
                        @keydown.enter.prevent="select('이용안내')"
                    >
                      이용안내
                    &lt;/li>
                  &lt;/ul>
                &lt;/template>
              &lt;/DropdownBasic>
            &lt;/div>
            &lt;div class="btn-tab__wrap-gap pc-visible">
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeIndex === 0 }"
                  @click="setActive(0)"
              >공지사항&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeIndex === 1 }"
                  @click="setActive(1)"
              >자주찾는 질문&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeIndex === 2 }"
                  @click="setActive(2)"
              >시스템 이용 문의&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeIndex === 3 }"
                  @click="setActive(3)"
              >이용안내&lt;/router-link
              >
            &lt;/div>
          &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 탭 버튼 유형 2</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="common-category__button">
          <div class="btn-select__wrap mo-visible">
            <DropdownBasic
              class="menu-type"
              v-model="dropdownMenuCategory"
              label="전체"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전체')"
                    @keydown.enter.prevent="select('전체')"
                  >
                    전체
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('노동')"
                    @keydown.enter.prevent="select('노동')"
                  >
                    노동
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('주택임대차')"
                    @keydown.enter.prevent="select('주택임대차')"
                  >
                    주택임대차
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('상가임대차')"
                    @keydown.enter.prevent="select('상가임대차')"
                  >
                    상가임대차
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
          <div class="btn-tab__wrap pc-visible">
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 0 }"
              @click="setMenuActive(0)"
              >전체</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 1 }"
              @click="setMenuActive(1)"
              >노동</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 2 }"
              @click="setMenuActive(2)"
              >주택임대차</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 3 }"
              @click="setMenuActive(3)"
              >상가임대차</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 4 }"
              @click="setMenuActive(4)"
              >손해배상</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 5 }"
              @click="setMenuActive(5)"
              >민사일반</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 6 }"
              @click="setMenuActive(6)"
              >물권</router-link
            >
            <router-link
              to="/components/components"
              class="btn-auto"
              :class="{ active: activeMenuIndex === 7 }"
              @click="setMenuActive(7)"
              >채권</router-link
            >
          </div>
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="common-category__button">
            &lt;div class="btn-select__wrap mo-visible">
              &lt;DropdownBasic
                  class="menu-type"
                  v-model="dropdownMenuCategory"
                  label="전체"
              >
                &lt;template #default="{ select }">
                  &lt;ul role="menu">
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('전체')"
                        @keydown.enter.prevent="select('전체')"
                    >
                      전체
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('노동')"
                        @keydown.enter.prevent="select('노동')"
                    >
                      노동
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('주택임대차')"
                        @keydown.enter.prevent="select('주택임대차')"
                    >
                      주택임대차
                    &lt;/li>
                    &lt;li
                        role="menuitem"
                        tabindex="0"
                        @click="select('상가임대차')"
                        @keydown.enter.prevent="select('상가임대차')"
                    >
                      상가임대차
                    &lt;/li>
                  &lt;/ul>
                &lt;/template>
              &lt;/DropdownBasic>
            &lt;/div>
            &lt;div class="btn-tab__wrap pc-visible">
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 0 }"
                  @click="setMenuActive(0)"
              >전체&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 1 }"
                  @click="setMenuActive(1)"
              >노동&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 2 }"
                  @click="setMenuActive(2)"
              >주택임대차&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 3 }"
                  @click="setMenuActive(3)"
              >상가임대차&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 4 }"
                  @click="setMenuActive(4)"
              >손해배상&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 5 }"
                  @click="setMenuActive(5)"
              >민사일반&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 6 }"
                  @click="setMenuActive(6)"
              >물권&lt;/router-link
              >
              &lt;router-link
                  to="/components/components"
                  class="btn-auto"
                  :class="{ active: activeMenuIndex === 7 }"
                  @click="setMenuActive(7)"
              >채권&lt;/router-link
              >
            &lt;/div>
          &lt;/div>
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• 탭 버튼 유형 3</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="common-panel__area" :class="{ active: isExpanded }">
          <div class="panel-toggle__btn mo-visible">
            <button type="button" @click="isExpanded = !isExpanded">
              {{ isExpanded ? '조건 접기' : ' 조건 펼치기' }}
            </button>
          </div>
          <div class="panel-content">
            <div class="button-wrap">
              <span class="bx">
                <input type="checkbox" class="hidden-item" id="chk1" />
                <label for="chk1">법률·판례·소송 일반정보</label>
              </span>
              <span class="bx">
                <input type="checkbox" class="hidden-item" id="chk2" />
                <label for="chk2">법률상담 및 소송지원</label>
              </span>
              <span class="bx">
                <input type="checkbox" class="hidden-item" id="chk3" />
                <label for="chk3">채무조정/ 금융복지</label>
              </span>
              <span class="bx">
                <input type="checkbox" class="hidden-item" id="chk4" />
                <label for="chk4">임대차/ 전세사기</label>
              </span>
              <span class="bx">
                <input type="checkbox" class="hidden-item" id="chk5" />
                <label for="chk5">임금체불</label>
              </span>
            </div>
            <a-checkbox-group v-model:value="optionCheck" class="check-wrap">
              <a-checkbox class="check-bx" value="1" name="type"
                >범죄피해자 지원 일반</a-checkbox
              >
              <a-checkbox class="check-bx" value="2" name="type"
                >가정폭력/성폭력/아동학대</a-checkbox
              >
              <a-checkbox class="check-bx" value="3" name="type"
                >학교폭력피해자 무료법률구조</a-checkbox
              >
              <a-checkbox class="check-bx" value="4" name="type"
                >가상자산투자피해자 무료법률구조</a-checkbox
              >
            </a-checkbox-group>
          </div>
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;div class="common-panel__area" :class="{ active: isExpanded }">
            &lt;div class="panel-toggle__btn mo-visible">
              &lt;button type="button" @click="isExpanded = !isExpanded">
                {{ isExpanded ? '조건 접기' : ' 조건 펼치기' }}
              &lt;/button>
            &lt;/div>
            &lt;div class="panel-content">
              &lt;div class="button-wrap">
                &lt;span class="bx">
                  &lt;input type="checkbox" class="hidden-item" id="chk1" />
                  &lt;label for="chk1">법률·판례·소송 일반정보&lt;/label>
                &lt;/span>
                &lt;span class="bx">
                  &lt;input type="checkbox" class="hidden-item" id="chk2" />
                  &lt;label for="chk2">법률상담 및 소송지원&lt;/label>
                &lt;/span>
                &lt;span class="bx">
                  &lt;input type="checkbox" class="hidden-item" id="chk3" />
                  &lt;label for="chk3">채무조정/ 금융복지&lt;/label>
                &lt;/span>
                &lt;span class="bx">
                  &lt;input type="checkbox" class="hidden-item" id="chk4" />
                  &lt;label for="chk4">임대차/ 전세사기&lt;/label>
                &lt;/span>
                &lt;span class="bx">
                  &lt;input type="checkbox" class="hidden-item" id="chk5" />
                  &lt;label for="chk5">임금체불&lt;/label>
                &lt;/span>
              &lt;/div>
              &lt;a-checkbox-group v-model:value="optionCheck" class="check-wrap">
                &lt;a-checkbox class="check-bx" value="1" name="type"
                >범죄피해자 지원 일반&lt;/a-checkbox
                >
                &lt;a-checkbox class="check-bx" value="2" name="type"
                >가정폭력/성폭력/아동학대&lt;/a-checkbox
                >
                &lt;a-checkbox class="check-bx" value="3" name="type"
                >학교폭력피해자 무료법률구조&lt;/a-checkbox
                >
                &lt;a-checkbox class="check-bx" value="4" name="type"
                >가상자산투자피해자 무료법률구조&lt;/a-checkbox
                >
              &lt;/a-checkbox-group>
            &lt;/div>
          &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
