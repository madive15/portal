<script setup lang="ts">
import { ref } from 'vue';
import { useAxios } from '~/composables/useAxios';
import { findIndex } from 'lodash-es';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';

const fileList = ref([]);
const defaultActiveTab = ref(0);
const route = useRoute();
const router = useRouter();

/*  접근성 Dropdown 추가 25.04.07 */
// const DefautText = ref('10개씩 보기'); // 서식
// const selectedItem = ref(''); // 서식
//
// const DefautTextCase = ref('10개씩 보기'); // 사례
// const selectedItemCase = ref(''); // 사례

onBeforeMount(() => {
  search();
});

const tabList = ref([]);

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

const search = () => {
  useAxios()
    .get('/api/svctype/svcTabList', {
      params: {
        srvcNo: route.query.srvcNo
      }
    })
    .then(({ data }) => {
      tabList.value = data;
      const { gdNo, gdClsfCd } = route.query;
      if (!!gdNo && !!gdClsfCd) {
        defaultActiveTab.value = findIndex(
          data,
          (item) => item.gdNo === gdNo && item.gdClsfCd === gdClsfCd
        );
      } else if (!!gdClsfCd) {
        defaultActiveTab.value = findIndex(
          data,
          (item) => item.gdClsfCd === gdClsfCd
        );
      } else {
        defaultActiveTab.value = 0;
      }
    });
};
</script>

<template>
  <div class="tab-box">
    <CommonTabs
      :platform-tab-show="true"
      @click="changeTab"
      :defaultActiveTab="defaultActiveTab"
    >
      <CommonTabItem
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.gdTtl"
      >
        <!--사례 -->
        <div v-if="item.gdClsfCd === '703'" class="example-list-box">
          <svctype-case-tab />
        </div>

        <!--서식 -->
        <div v-if="item.gdClsfCd === '704'" class="example-list-box">
          <svctype-tmplt-tab />
        </div>

        <template
          v-if="
            item.gdClsfCd === '701' ||
            item.gdClsfCd === '702' ||
            item.gdClsfCd === '705' ||
            item.gdClsfCd === '710'
          "
        >
          <div v-if="item.imgUseYn == 'Y'" class="stop-box">
            <img
              style="max-width: 100%"
              :src="`/api/image?atchFileId=${item.fileList[0].atchFileId}&atchFileSeq=${item.fileList[0].atchFileSeq}`"
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
</template>

<style lang="scss" scoped>
@use './scss/tabIndex';
</style>
