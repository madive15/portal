<script setup lang="ts">
import SideTabMenu from '~/components/ui/sidemenu/sideTabMenuPub.vue';
import SideToggleMenu from '~/components/ui/sidemenu/sideToggleMenu.vue';
import { ref } from 'vue';

definePageMeta({
  layout: 'guide'
});
const selectedTab = ref('');
const tabs = ref<Tab[]>([
  { name: 'serviceCont1', label: '서비스 내용1' },
  { name: 'serviceCont2', label: '서비스 대상자2' }
]);
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Side</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• description</p>

      <div class="box-tit-h3">
        📁 sample -기본형에 1depth 타이틀 표시 필요할때
      </div>
      <div class="box-p">
        <SideToggleMenu title="서비스 제공기관">
          <ul class="side-menu__list">
            <li class="side-menu__item menu-all">
              <router-link to="/" title="경제적 취약계층(34)"
                >전체(34)</router-link
              >
            </li>
            <li class="side-menu__item">
              <router-link to="/" class="active" title="경제적 취약계층(34)"
                >경제적 취약계층(34)
              </router-link>
            </li>
            <li class="side-menu__item">
              <router-link to="/" title="경제적 취약계층(34)"
                >경제적 취약계층(34)
              </router-link>
            </li>
          </ul>
        </SideToggleMenu>
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;SideToggleMenu title="서비스 제공기관">
          &lt;ul class="side-menu__list">
            &lt;li class="side-menu__item menu-all">
              &lt;a href="#" title="경제적 취약계층(34)">전체(34)&lt;/a>
            &lt;/li>
            &lt;li class="side-menu__item">
              &lt;a href="#" class="active" title="경제적 취약계층(34)"
              >경제적 취약계층(34)
              &lt;/a>
            &lt;/li>
            &lt;li class="side-menu__item">
              &lt;a href="#" title="경제적 취약계층(34)"
              >경제적 취약계층(34)
              &lt;/a>
            &lt;/li>
          &lt;/ul>
        &lt;/SideToggleMenu>
      </pre>
    </div>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • :tabs="tabs" 탭 key 값 및 버튼명, selectedTab 탭버튼 active
      </p>
      <div class="box-tit-h3">📁 sample -탭메뉴 노출 될 경우</div>
      <div class="box-p">
        <SideTabMenu :tabs="tabs" v-model:activeTab="selectedTab">
          <template #serviceCont1>
            <!-- UI 컨텐츠 추가 -->
            <ul class="side-menu__list">
              <li class="side-menu__item">
                <a href="#" class="active" title="경제적 취약계층(34)"
                  >법률·판례·소송 일반정보(13)
                </a>
              </li>
              <li class="side-menu__item">
                <a href="#" title="경제적 취약계층(34)">경제적 취약계층(34) </a>
              </li>
            </ul>
            <!--// UI 컨텐츠 추가 -->
          </template>
          <template #serviceCont2>
            <!-- UI 컨텐츠 추가 -->
            <ul class="side-menu__list">
              <li class="side-menu__item">
                <a href="#" class="active" title="경제적 취약계층(34)"
                  >법률·판례·소송 일반정보(13)
                </a>
              </li>
              <li class="side-menu__item">
                <a href="#" title="경제적 취약계층(34)">경제적 취약계층(34) </a>
              </li>
              <li class="side-menu__item">
                <a href="#" title="범죄/재해/환경 피해자(19)"
                  >범죄/재해/환경 피해자(19)</a
                >
              </li>
            </ul>
            <!--// UI 컨텐츠 추가 -->
          </template>
        </SideTabMenu>
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;script setup lang="ts">
          const selectedTab = ref('');
          const tabs = ref&lt;Tab[]>([
            { name: 'serviceCont1', label: '서비스 내용1' },
            { name: 'serviceCont2', label: '서비스 대상자2' }
          ]);
        &lt;/script>

        &lt;SideTabMenu :tabs="tabs" v-model:activeTab="selectedTab">
          &lt;template #serviceCont1>
            &lt;!-- UI 컨텐츠 추가 -->
            &lt;ul class="side-menu__list">
              &lt;li class="side-menu__item">
                &lt;a href="#" class="active" title="경제적 취약계층(34)"
                >법률·판례·소송 일반정보(13)
                &lt;/a>
              &lt;/li>
              &lt;li class="side-menu__item">
                &lt;a href="#" title="경제적 취약계층(34)"
                >경제적 취약계층(34)
                &lt;/a>
              &lt;/li>
            &lt;/ul>
            &lt;!--// UI 컨텐츠 추가 -->
          &lt;/template>
          &lt;template #serviceCont2>
            &lt;!-- UI 컨텐츠 추가 -->
            &lt;ul class="side-menu__list">
              &lt;li class="side-menu__item">
                &lt;a href="#" class="active" title="경제적 취약계층(34)"
                >법률·판례·소송 일반정보(13)
                &lt;/a>
              &lt;/li>
              &lt;li class="side-menu__item">
                &lt;a href="#" title="경제적 취약계층(34)"
                >경제적 취약계층(34)
                &lt;/a>
              &lt;/li>
              &lt;li class="side-menu__item">
                &lt;a href="#" title="범죄/재해/환경 피해자(19)"
                >범죄/재해/환경 피해자(19)
                &lt;/a>
              &lt;/li>
            &lt;/ul>
            &lt;!--// UI 컨텐츠 추가 -->
          &lt;/template>
        &lt;/SideTabMenu>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
