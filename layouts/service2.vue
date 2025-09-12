<script setup lang="ts">
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';

const router = useRouter();
const route = useRoute();
const svcTypeStore = useSvcTypeStore();
const { svcMenuList, svcTypeQuery } = storeToRefs(svcTypeStore);
const svcStore = useSvcStore();
const { svcTypeQuery: svcTypeQuery2 } = storeToRefs(svcStore);
const data = ref('');

onBeforeMount(async () => {
  await useSvcTypeStore().searchSvcTypeMenuList();
});

watch(route, async (newValue) => {
  if (newValue.query.upCtgryNo !== undefined) {
    data.value = newValue.query.upCtgryNo;
  }
});

// const selected = computed(() => data);
const change = (item) => {
  router.replace({
    query: {
      ...route.query,
      upCtgryNo: item.ctgryNo
    }
  });
};
</script>

<template>
  <div class="wrap">
    <common-header />
    <div class="service-content-wrap" id="service-list">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-12 snb-col">
            <aside>
              <div class="title-box">
                <h2>서비스 유형</h2>
              </div>
              <div class="menu-box">
                <div class="menu-body">
                  <!-- 서비스 유형들은 v-for 배열로 돌려주세요. -->
                  <ul>
                    <li v-for="(item, index) in svcMenuList" :key="index">
                      <a
                        href="javascript:void(0)"
                        :id="index"
                        :class="{ active: data === item.ctgryNo }"
                        @click="change(item, index)"
                      >
                        {{ item.ctgryNm }}({{ item.cnt }})
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
          <div class="col-xl-9 col-12 content-col">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<style scoped lang="scss">
@use './scss/service2';
</style>
