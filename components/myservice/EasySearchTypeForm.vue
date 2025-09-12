<script setup lang="ts">
import type {
  EasySrchListQuery,
  EasySrchListTypeQuery,
  EasySrchSubTypeListResult,
  EasySrchTypeListResult
} from '~/stores/myservice/index.types';
import { useEasySrchStore } from '~/stores/myservice';

const selectItem = ref<EasySrchTypeListResult | null>(null);

const props = defineProps({
  currentTab: {
    type: String,
    default: 'type',
    required: true
  }
});

const easySrchStore = useEasySrchStore();
const {
  easySrchQuery,
  easySrchTypeList: list,
  easySrchSubTypeList: subList,
  isExpanded
} = storeToRefs(easySrchStore);

watch(
  () => props.currentTab,
  (newVal) => {
    if (newVal !== 'type') {
      selectItem.value = null;
    }
  }
);

const typeCodeList = computed(() =>
  easySrchQuery.value.filter((item) => item.type === 'type')
);

watch(typeCodeList, (newVal) => {
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
    (item: EasySrchListTypeQuery) =>
      item.type === 'type' && item.typeCd === data.ctgryNo
  );

  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  if (index !== -1) {
    selectItem.value = null;
    results.splice(index, 1);

    easySrchQuery.value = [...results];
  } else {
    selectItem.value = data;
    results.push({
      type: 'type',
      typeCd: data.ctgryNo,
      typeNm: data.ctgryNm,
      children: []
    });

    easySrchQuery.value = [...results];
  }
};

const toggleChild = (data: EasySrchTypeListResult) => {
  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  const parent = results.find(
    (item) => item.typeCd === selectItem.value.ctgryNo
  ) as EasySrchListTypeQuery;
  const parentIndex = results.findIndex(
    (item) => item.typeCd === selectItem.value.ctgryNo
  );
  const childIndex = parent.children.findIndex(
    (item) => item.subTypeCd === data.ctgryNo
  );

  if (childIndex === -1) {
    parent.children.push({
      subTypeCd: data.ctgryNo,
      subTypeNm: data.ctgryNm
    });

    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  } else {
    parent.children.splice(childIndex, 1);
    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  }
};

const checked = (data: EasySrchSubTypeListResult) => {
  return easySrchQuery.value.some(
    (item: EasySrchListTypeQuery) =>
      item.type === 'type' && item.typeCd === data.ctgryNo
  );
};
</script>

<template>
  <div :class="{ 'common-panel__area': true, active: isExpanded }">
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
          >{{ item.ctgryNm }}</a-checkbox
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
