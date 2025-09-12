<script setup lang="ts">
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { useSrchStore } from '~/stores/srch';
import SideTabMenu from "~/components/ui/sidemenu/sideTabMenu.vue";
import {ref} from "vue";

const router = useRouter();
const route = useRoute();
const svcTypeStore = useSvcTypeStore();
const srchStore = useSrchStore();
const { svcMenuList } = storeToRefs(svcTypeStore);
const { srch } = storeToRefs(srchStore);
const ctgryNo = ref('');
const selectedTab = ref('');
const tabs = ref<Tab[]>([
  { name: 'serviceCont1', label: '서비스 내용', url: '?upCtgryNo=1010000000' },
  { name: 'serviceCont2', label: '서비스 대상자', url: '?upCtgryNo=4010000000' }
]);

/* 접근성 토글버튼 추가 추가 25.04.08 */
const isOpen = ref(false);

const onClicktoggle = () => {
  isOpen.value = !isOpen.value;
};
/* //접근성 토글버튼 추가 추가 25.04.08 */

onBeforeMount(async () => {
  await svcTypeStore.searchSvcTypeMenuList(); // 서비스 유형
  await srchStore.searchSrchList(); // 서비스 대상자

  ctgryNo.value = route.query.upCtgryNo;
});

watch(route, async (newValue) => {
  if (newValue.query.upCtgryNo !== undefined) {
    ctgryNo.value = newValue.query.upCtgryNo;
  }
});
</script>

<template>
  <div class="wrap">
    <common-header />
    <div id="service-content-lnb">
      <div class="col-xl-3 col-12 snb-col">
        <aside :class="[isOpen && 'is-open']">
          <SideTabMenu :tabs="tabs" :defaultTab="route.query.upCtgryNo">
            <template #serviceCont1>
              <!-- UI 컨텐츠 추가 -->
              <ul class="side-menu__list">
                <li class="side-menu__item"
                    v-for="(item, index) in svcMenuList"
                    :key="index">
                  <NuxtLink
                      :external="true"
                      :to="`?upCtgryNo=${item.ctgryNo}`"
                      :id="index"
                      :class="{ active: ctgryNo === item.ctgryNo }"
                  >
                    {{ item.ctgryNm }}({{ item.cnt }})
                  </NuxtLink>
                </li>
              </ul>
              <!--// UI 컨텐츠 추가 -->
            </template>
            <template #serviceCont2>
              <!-- UI 컨텐츠 추가 -->
              <ul class="side-menu__list">
                <li class="side-menu__item"
                    v-for="(item, index) in srch"
                    :key="index">
                  <NuxtLink
                      v-if="item.upCtgryNo !== '9999999999'"
                      :external="true"
                      :to="`?upCtgryNo=${item.ctgryNo}`"
                      :id="index"
                      :class="{ active: ctgryNo === item.ctgryNo }"
                  >
                    {{ item.lwaCtgryNm }}({{ item.trprCnt }})
                  </NuxtLink>
                </li>
              </ul>
              <!--// UI 컨텐츠 추가 -->
            </template>
          </SideTabMenu>
        </aside>
      </div>
    </div>
    <div id="common-content">
      <div class="service-content-wrap" id="service-list">
        <div class="container">
          <div class="row">
            <div class="col-xl-3 col-12 snb-col">
              <!-- <aside :class="[isOpen && 'is-open']">
                <div class="toggle-btn-wrap mo-only">
                  <button class="toggle-btn" @click="onClicktoggle">
                    {{ !isOpen ? '메뉴 펼치기' : '메뉴 접기' }}
                  </button>
                </div>
                <div class="title-box type-tab">
                  <NuxtLink
                    :external="true"
                    :to="`?upCtgryNo=1010000000`"
                    :class="{
                      active: ctgryNo.startsWith('1')
                    }"
                    :title="ctgryNo.startsWith('1') ? '선택됨' : ''"
                  >
                    <strong> 서비스 내용 </strong>
                  </NuxtLink>
                  <NuxtLink
                    :external="true"
                    :to="`?upCtgryNo=4010000000`"
                    :class="{
                      active: ctgryNo.startsWith('4')
                    }"
                    :title="ctgryNo.startsWith('4') ? '선택됨' : ''"
                  >
                    <strong> 서비스 대상자 </strong>
                  </NuxtLink>
                </div>
                <div class="menu-box">
                  <div class="menu-body">
                    <ul v-if="ctgryNo.startsWith('1')" class="service-list">
                      <li
                        v-for="(item, index) in svcMenuList"
                        :key="index"
                        class="service-item"
                      >
                        <NuxtLink
                          :external="true"
                          :to="`?upCtgryNo=${item.ctgryNo}`"
                          :id="index"
                          :class="{ active: ctgryNo === item.ctgryNo }"
                        >
                          {{ item.ctgryNm }}({{ item.cnt }})
                        </NuxtLink>
                      </li>
                    </ul>
                    <ul v-if="ctgryNo.startsWith('4')" class="service-list">
                      <li
                        v-for="(item, index) in srch"
                        :key="index"
                        class="service-item"
                      >
                        <NuxtLink
                          v-if="item.upCtgryNo !== '9999999999'"
                          :external="true"
                          :to="`?upCtgryNo=${item.ctgryNo}`"
                          :id="index"
                          :class="{ active: ctgryNo === item.ctgryNo }"
                        >
                          {{ item.lwaCtgryNm }}({{ item.trprCnt }})
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside> -->
            </div>
            <div class="col-xl-9 col-12 content-col">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<style scoped lang="scss">
@use './scss/service-type';
</style>
