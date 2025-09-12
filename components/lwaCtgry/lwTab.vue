<script setup lang="ts">
import { ref } from 'vue';
import { useAxios } from '~/composables/useAxios';
import { storeToRefs } from 'pinia';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

export type LwaCtgryListType = {
  lwaCtgrySeCd: string;
  clsfCtgryNo: string;
  instNo: string;
};

const route = useRoute();
const props = defineProps<LwaCtgryListType>();

const lwaCtgryStore = useLwaCtgryStore();
const {
  useLwaCtgryListQuery,
  useLwaCtgryItemList,
  useLwaCtgryItemAllList,
  upCtgryNm,
  ctgryNm
} = storeToRefs(lwaCtgryStore);

const ctgryList = ref([]);
const upCtgryNo = ref('');

onBeforeMount(async () => {
  useAxios()
    .get('/api/lwaCtgry/findParentCtgryList', {
      params: {
        upCtgryNo: props.clsfCtgryNo,
        instNo: props.instNo,
        lwaCtgrySeCd: props.lwaCtgrySeCd
      }
    })
    .then(({ data }) => {
      ctgryList.value = [{ value: '', text: '전체', upCode: '' }, ...data];
    });

  const keys = Object.keys(route.query);
  for (const key of keys) {
    if (key === 'upCtgryNo') {
      upCtgryNo.value = route.query[key];
      useLwaCtgryListQuery.value.ctgryWholYn = 'N';
    }
    useLwaCtgryListQuery.value[key] =
      typeof useLwaCtgryListQuery.value[key] === 'number'
        ? Number(route.query[key])
        : route.query[key];
  }

  if (upCtgryNo.value === props.clsfCtgryNo) {
    upCtgryNo.value = '';
    useLwaCtgryListQuery.value.ctgryWholYn = 'Y';
  }
});

const changeParentCtgry = (item) => {
  if (item.value !== '') {
    useLwaCtgryListQuery.value.upCtgryNo = item.value;
    useLwaCtgryListQuery.value.ctgryWholYn = 'N';
    upCtgryNo.value = item.value;
    upCtgryNm.value = item.text;
  } else {
    useLwaCtgryListQuery.value.upCtgryNo = props.clsfCtgryNo;
    useLwaCtgryListQuery.value.ctgryWholYn = 'Y';
    upCtgryNo.value = '';
    upCtgryNm.value = '';
  }
  useLwaCtgryListQuery.value.ctgryNo = '';

  lwaCtgryStore.changeUseLwaCtgryItemList();
  useLwaCtgryListQuery.value.page = 1;
  if (props.lwaCtgrySeCd === '200') {
    lwaCtgryStore.findUseLwaCtgryCaseList();
  } else {
    lwaCtgryStore.findUseLwaCtgryTmpltList();
  }
};

const changeCtgryItemList = (item) => {
  useLwaCtgryListQuery.value.ctgryNo = item.value;
  ctgryNm.value = item.text;
  useLwaCtgryListQuery.value.page = 1;
  if (props.lwaCtgrySeCd === '200') {
    lwaCtgryStore.findUseLwaCtgryCaseList();
  } else {
    lwaCtgryStore.findUseLwaCtgryTmpltList();
  }
};
</script>

<template>
  <div class="common-category__button">
    <div class="btn-select__wrap mo-visible">
      <div>
        <DropdownBasic class="menu-type" v-model="upCtgryNm" label="전체">
          <template #default="{ select }">
            <ul role="menu">
              <li
                v-for="(item, index) in ctgryList"
                role="menuitem"
                :tabindex="index"
                @click="[select(item.text), changeParentCtgry(item)]"
                @keydown.enter.prevent="[
                  select(item.text),
                  changeParentCtgry(item)
                ]"
              >
                {{ item.text }}
              </li>
            </ul>
          </template>
        </DropdownBasic>
      </div>
      <div class="mt-2">
        <a-select
          class="common-select"
          id="keywordType"
          v-if="useLwaCtgryItemAllList.length > 0"
          v-model:value="useLwaCtgryListQuery.ctgryNo"
        >
          <a-select-option
            v-for="item in useLwaCtgryItemList"
            :key="item.value"
            :value="item.value"
            @click="changeCtgryItemList(item)"
          >
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="btn-tab__wrap pc-visible">
      <router-link
        v-for="item in ctgryList"
        to=""
        class="btn-auto"
        :class="{ active: item.value === upCtgryNo }"
        @click="changeParentCtgry(item)"
      >
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>
