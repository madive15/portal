<script setup lang="ts">
import type {
  EasySrchListQuery,
  EasySrchListRgnQuery,
  EasySrchRgnListResult
} from '~/stores/myservice/index.types';
import { useEasySrchStore } from '~/stores/myservice';

const easySrchStore = useEasySrchStore();
const {
  easySrchQuery,
  easySrchRgnList: list,
  isExpanded
} = storeToRefs(easySrchStore);

const toggleUpCd = (data: EasySrchRgnListResult) => {
  const index = easySrchQuery.value.findIndex(
    (item: EasySrchListRgnQuery) =>
      item.type === 'rgn' && item.rgnCd === data.comCd
  );

  const results = toRaw(easySrchQuery.value) as EasySrchListQuery[];
  if (index !== -1) {
    results.splice(index, 1);

    easySrchQuery.value = [...results];
  } else {
    results.push({
      type: 'rgn',
      rgnCd: data.comCd,
      rgnNm: data.comCdNm
    });

    easySrchQuery.value = [...results];
  }
};

const checked = (data: EasySrchRgnListResult) => {
  return easySrchQuery.value.some(
    (item: EasySrchListRgnQuery) =>
      item.type === 'rgn' && item.rgnCd === data.comCd
  );
};

const checkAll = computed(
  () =>
    easySrchQuery.value.filter((item) => item.type === 'rgn').length ===
    list.value.length
);

const toggleCheckAll = () => {
  if (!checkAll.value) {
    const results = toRaw(easySrchQuery.value) as EasySrchListRgnQuery[];
    const previousResult = results.filter((result) => result.type === 'rgn');
    const rgnList = list.value.filter(
      (item) => !previousResult.some((result) => result.rgnCd === item.comCd)
    );

    for (const rgn of rgnList) {
      results.push({
        type: 'rgn',
        rgnCd: rgn.comCd,
        rgnNm: rgn.comCdNm
      });
    }

    easySrchQuery.value = [...results];
  } else {
    const results = toRaw(easySrchQuery.value) as EasySrchListRgnQuery[];
    easySrchQuery.value = [
      ...results.filter((result) => result.type !== 'rgn')
    ];
  }
};
</script>

<template>
  <div class="common-panel__area" :class="{ active: isExpanded }">
    <div class="panel-content">
      <div class="button-wrap">
        <span class="bx">
          <input
            type="checkbox"
            class="hidden-item"
            id="rgn-checked-all"
            @change="toggleCheckAll"
            :checked="checkAll"
          />
          <label for="rgn-checked-all">전체</label>
        </span>
        <span class="bx" :key="item.comCd" v-for="item in list">
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
    </div>
    <div class="panel-toggle__btn mo-visible">
      <button type="button" @click="isExpanded = !isExpanded">
        {{ isExpanded ? '조건 접기' : ' 조건 펼치기' }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
