<script setup lang="ts">
import type {
  EasySrchInstClsfListResult,
  EasySrchListInstQuery,
  EasySrchListQuery,
  EasySrchSubInstListResult
} from '~/stores/myservice/index.types';
import { useEasySrchStore } from '~/stores/myservice';

const selectItem = ref<EasySrchInstClsfListResult | null>(null);

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
  easySrchInstClsfList: list,
  easySrchSubInstList: subList,
  isExpanded
} = storeToRefs(easySrchStore);

watch(
  () => props.currentTab,
  (newVal) => {
    if (newVal !== 'inst') {
      selectItem.value = null;
    }
  }
);

const instCodeList = computed(() =>
  easySrchQuery.value.filter((item) => item.type === 'inst')
);

watch(instCodeList, (newVal) => {
  if (newVal.length === 0) {
    selectItem.value = null;
  }
});

const checkedSubList = computed(() =>
  selectItem.value !== null
    ? subList.value.filter((item) => item.instClsfCd === selectItem.value.comCd)
    : []
);

const toggleUpCd = (data: EasySrchInstClsfListResult) => {
  const index = easySrchQuery.value.findIndex(
    (item: EasySrchListInstQuery) =>
      item.type === 'inst' && item.instClsfCd === data.comCd
  );

  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  if (index !== -1) {
    selectItem.value = null;
    results.splice(index, 1);

    easySrchQuery.value = [...results];
  } else {
    selectItem.value = data;
    results.push({
      type: 'inst',
      instClsfCd: data.comCd,
      instClsfNm: data.comCdNm,
      children: []
    });

    easySrchQuery.value = [...results];
  }
};

const toggleChild = (data: EasySrchSubInstListResult) => {
  const results = toRaw(easySrchQuery.value) as EasySrchListInstQuery[];
  const parent = results.find(
    (item) => item.instClsfCd === selectItem.value.comCd
  ) as EasySrchListInstQuery;
  const parentIndex = results.findIndex(
    (item) => item.instClsfCd === selectItem.value.comCd
  );
  const childIndex = parent.children.findIndex(
    (item) => item.instNo === data.instNo
  );

  if (childIndex === -1) {
    parent.children.push({
      instNo: data.instNo,
      instNm: data.instNm
    });

    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  } else {
    parent.children.splice(childIndex, 1);
    results.splice(parentIndex, 1, parent);
    easySrchQuery.value = [...results];
  }
};

const checked = (data: EasySrchInstClsfListResult) => {
  return easySrchQuery.value.some(
    (item: EasySrchListInstQuery) =>
      item.type === 'inst' && item.instClsfCd === data.comCd
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
            :id="item.comCd"
            :value="item.comCd"
            :checked="checked(item)"
            @click="toggleUpCd(item)"
          />
          <label :for="item.comCd">{{ item.comCdNm }}</label>
        </span>
      </div>
      <div class="check-wrap">
        <a-checkbox
          :key="item.instNo"
          v-for="item in checkedSubList"
          class="check-bx"
          :value="item.instNo"
          @click="toggleChild(item)"
          >{{ item.instNm }}</a-checkbox
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
