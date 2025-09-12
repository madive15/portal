<script setup lang="ts">
import type {
  EasySrchListQuery,
  EasySrchListTrprQuery,
  EasySrchSubTrprListResult,
  EasySrchTrprListResult,
  EasySrchTypeListResult
} from '~/stores/myservice/index.types';
import { useEasySrchStore } from '~/stores/myservice';

const selectItem = ref<EasySrchTrprListResult | null>(null);

const props = defineProps({
  currentTab: {
    type: String,
    default: 'type',
    required: true
  }
});

watch(
  () => props.currentTab,
  (newVal) => {
    if (newVal !== 'trpr') {
      selectItem.value = null;
    }
  }
);

const easySrchStore = useEasySrchStore();
const {
  easySrchQuery,
  easySrchTrprList: list,
  easySrchSubTrprList: subList,
  isExpanded
} = storeToRefs(easySrchStore);

const trprCodeList = computed(() =>
  easySrchQuery.value.filter((item) => item.type === 'trpr')
);

watch(trprCodeList, (newVal) => {
  if (newVal.length === 0) {
    selectItem.value = null;
  }
});

const checkedSubList = computed(() =>
  selectItem.value !== null
    ? subList.value.filter((item) =>
        item.ctgryNo.startsWith(selectItem.value.ctgryNo.substring(0, 3))
      )
    : []
);

const toggleUpCd = (data: EasySrchTypeListResult) => {
  const index = easySrchQuery.value.findIndex(
    (item: EasySrchListTrprQuery) =>
      item.type === 'trpr' && item.trprCd === data.ctgryNo
  );

  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  if (index !== -1) {
    selectItem.value = null;
    results.splice(index, 1);

    easySrchQuery.value = [...results];
  } else {
    selectItem.value = data;
    results.push({
      type: 'trpr',
      trprCd: data.ctgryNo,
      trprNm: data.ctgryNm,
      children: []
    });

    easySrchQuery.value = [...results];
  }
};

const toggleChild = (data: EasySrchSubTrprListResult) => {
  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  const parent = results.find(
    (item) => item.type === 'trpr' && item.trprCd === selectItem.value.ctgryNo
  ) as EasySrchListTrprQuery;
  const parentIndex = results.findIndex(
    (item) => item.type === 'trpr' && item.trprCd === selectItem.value.ctgryNo
  );

  const childIndex = parent.children.findIndex(
    (item) => item.subTrprCd === data.ctgryNo
  );

  if (childIndex === -1) {
    parent.children.push({
      subTrprCd: data.ctgryNo,
      subTrprNm: data.lwaCtgryNm
    });

    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  } else {
    parent.children.splice(childIndex, 1);
    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  }
};

const checked = (data: EasySrchSubTrprListResult) => {
  return easySrchQuery.value.some(
    (item: EasySrchListTrprQuery) =>
      item.type === 'trpr' && item.trprCd === data.ctgryNo
  );
};
</script>

<template>
  <div class="common-panel__area" :class="{ active: isExpanded }">
    <div class="panel-content">
      <div class="button-wrap">
        <span class="bx" :key="item.ctgryNo" v-for="item in list">
          <input
            type="checkbox"
            class="hidden-item"
            :id="item.ctgryNo"
            :value="item.ctgryNo"
            :checked="checked(item)"
            @click="toggleUpCd(item)"
          />
          <label :for="item.ctgryNo">{{ item.ctgryNm }}</label>
        </span>
      </div>
      <div class="check-wrap">
        <a-checkbox
          :key="item.ctgryNo"
          v-for="item in checkedSubList"
          class="check-bx"
          :value="item.ctgryNo"
          @click="toggleChild(item)"
          >{{ item.lwaCtgryNm }}</a-checkbox
        >
      </div>
    </div>
    <div class="panel-toggle__btn mo-visible">
      <button type="button" @click="isExpanded = !isExpanded">
        {{ isExpanded ? '조건 접기' : ' 조건 펼치기' }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
