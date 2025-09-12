<script setup lang="ts">
import Info from '~/components/svc/info.vue';
import { ref } from 'vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';

const route = useRoute();
const router = useRouter();
const { instNo, instClsfCd } = route.query;

const defaultActiveTab = ref(0);

const tabList = ref([]);
onBeforeMount(() => {
  useAxios()
    .get('/api/svc/instList', {
      params: {
        instNo
      }
    })
    .then(({ data }) => {
      tabList.value = data;
    });
});

const changeTab = async (index: number) => {
  defaultActiveTab.value = index;
  const tab = tabList.value[index];
  router.push({
    query: {
      ...route.query,
      gdClsfCd: !!tab.gdClsfCd ? tab.gdClsfCd : undefined,
      gdNo: !!tab.gdNo ? tab.gdNo : undefined
    },
    external: true
  });
};
</script>

<template>
  <div class="sub-content-box" id="service-view">
    <Info />
    <section class="section2">
      <div class="container">
        <div class="tab-box">
          <CommonTabs
            :platform-tab-show="true"
            ref="tabRef"
            @click="changeTab"
            :defaultActiveTab="defaultActiveTab"
          >
            <CommonTabItem
              v-for="(item, index) in tabList"
              :key="index"
              :title="item.gdTtl"
            >
              <!--서식-->
              <div v-if="item.gdClsfCd === '203'" class="example-list-box">
                <svctype-tmplt-tab />
              </div>

              <!--사례-->
              <div v-if="item.gdClsfCd === '202'" class="example-list-box">
                <svctype-case-tab />
              </div>

              <!--서비스-->
              <div v-if="item.gdClsfCd === '201'" class="service-box">
                <svctype-srvc-tab />
              </div>

              <!-- 목록형 -->
              <div
                class="board-list-box"
                v-if="item.gdClsfCd === '301' && item.bbsTypeCd !== '004'"
              >
                <svctype-list-board-tab />
              </div>

              <!--갤러리형-->
              <div
                class="board-gallery-list-box"
                v-if="item.gdClsfCd === '301' && item.bbsTypeCd === '004'"
              >
                <svctype-gallery-board-tab />
              </div>

              <template
                v-if="
                  item.gdClsfCd !== '201' &&
                  item.gdClsfCd !== '202' &&
                  item.gdClsfCd !== '203' &&
                  item.gdClsfCd !== '301'
                "
              >
                <div v-if="item.imgUseYn === 'Y'" class="stop-box">
                  <img
                    style="max-width: 100%"
                    :src="`/api/image?atchFileId=${item.atchFileId}&atchFileSeq=1`"
                    :alt="`${item.rmrkCn}`"
                    v-if="item.atchFileId"
                  />
                </div>
                <div
                  v-else
                  class="stop-box"
                  id="service-list-tab-boxs"
                  v-html="item.gdCn"
                ></div>
              </template>
            </CommonTabItem>
          </CommonTabs>
        </div>
        <!--        <a href="" class="btn-list d-none">목록으로</a>-->
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use '~/assets/style/pages/servicepvsn/index.scss';
</style>
