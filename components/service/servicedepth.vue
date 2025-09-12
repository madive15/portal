<script setup lang="ts">
import Serviceslide from '~/components/service/serviceslide.vue';
import { useLwaCtgryStore } from '~/stores/lwaCtgry';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';

const route = useRoute();
const instNo = route.query.instNo;
const srvcNo = route.query.srvcNo;
const findLwaCtgrySeCd = defineModel<string>('lwaCtgrySeCd');

const emit = defineEmits(['listChange', 'valueChange', 'search']);

const lwaCtgryStore = useLwaCtgryStore();

const lwaCtgryList = ref([]);

onBeforeMount(async () => {
  if (!!instNo || !!srvcNo) {
    await lwaCtgryListSetting('');
    emit('search');
  }
});

const clsfCdOptions = ref([]);
const upCtgryNoOptions = ref([]);
const ctgryNoOptions = ref([]);

const clsfValue = ref('');
const upCtgryValue = ref('');
const ctgryValue = ref('');

const maxLvl = computed(() => {
  return lwaCtgryList.value
    .filter(
      (item) => item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
    )
    .reduce((maxItem, currentItem) => {
      return currentItem.lvl > maxItem.lvl ? currentItem : maxItem;
    }, lwaCtgryList.value[0])?.lvl;
});

const isGubunYn = computed(() => {
  return lwaCtgryList.value.some(
    (item) => item.lwaCtgrySeCd === findLwaCtgrySeCd.value.substring(0, 2) + '1'
  );
});

const firstClsfCdOptionDownListYn = computed(() => {
  return clsfCdOptions.value.filter(
    (item) => item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
  )[0]?.downListYn;
});

const lwaCtgryListSetting = async (ctgryNo: string) => {
  // 리스트 조회
  await lwaCtgryStore
    .findLwaCtgryList(instNo, srvcNo, findLwaCtgrySeCd.value)
    .then(({ data }) => (lwaCtgryList.value = data));

  if (lwaCtgryList.value.length > 0) {
    if (isGubunYn.value) {
      clsfCdOptions.value = lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 1 &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
      );

      // 대분류 초기 셋팅
      if (ctgryNo !== '') {
        const clsfCdOption = lwaCtgryList.value.find(
          (item) => item.value === ctgryNo
        );

        if (clsfCdOption.lvl === 3) {
          clsfValue.value = clsfCdOption.topCode;
        } else if (clsfCdOption.lvl === 2) {
          clsfValue.value = clsfCdOption.upCode;
        } else {
          clsfValue.value = ctgryNo;
        }
      } else {
        const clsfCdOption = clsfCdOptions.value[0];
        clsfValue.value = clsfCdOption.value;
        emit('valueChange', clsfValue.value);
      }

      clsfCdOptionsChange(ctgryNo);
    } else {
      upCtgryNoOptions.value = [
        { value: '', label: '전체', lvl: 1, downListYn: 'Y' },
        ...lwaCtgryList.value.filter(
          (item) =>
            item.lvl === 1 &&
            item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
        )
      ];

      // 중분류 초기 셋팅
      if (ctgryNo !== '') {
        const upCtgryNoOption = lwaCtgryList.value.find(
          (item) => item.value === ctgryNo
        );

        if (upCtgryNoOption.lvl === 2) {
          upCtgryValue.value = upCtgryNoOption.upCode;
        } else {
          upCtgryValue.value = ctgryNo;
        }
      } else {
        const upCtgryNoOption = upCtgryNoOptions.value[0];
        upCtgryValue.value = upCtgryNoOption.value;
        emit('valueChange', upCtgryValue.value);
      }

      upCtgryNoOptionsChange(ctgryNo);
    }
  } else {
    resetOption(true, true, true);
  }
};

// 중분류 change
const secondOptionChange = (type: string) => {
  if (type === 'clsfCd') {
    upCtgryNoOptions.value = [
      { value: '', label: '전체', lvl: 2, downListYn: 'Y' },
      ...lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 2 &&
          item.upCode === clsfValue.value &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
      )
    ];

    upCtgryValue.value = upCtgryNoOptions.value[0]?.value;
    thirdOptionChange('clsfCd');
  }
  if (type === 'upCtgry') {
    ctgryNoOptions.value = lwaCtgryList.value.filter(
      (item) =>
        item.lvl === 2 &&
        item.upCode === upCtgryValue.value &&
        item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
    );

    ctgryValue.value = upCtgryNoOptions.value[0]?.value;
    emit(
      'listChange',
      ctgryNoOptions.value,
      upCtgryValue.value,
      maxLvl.value,
      isGubunYn.value
    );
  }
};

// 소분류 change
const thirdOptionChange = (type: string) => {
  const upcodeList = upCtgryNoOptions.value.map((item) => item.value);

  if (type === 'clsfCd') {
    if (upCtgryValue.value === '') {
      ctgryNoOptions.value = lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 3 &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0) &&
          upcodeList.includes(item.upCode)
      );
    } else {
      ctgryNoOptions.value = lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 3 &&
          item.upCode === upCtgryValue.value &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
      );
    }
  }
  if (type === 'upCtgry') {
    if (upCtgryValue.value === '') {
      ctgryNoOptions.value = lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 2 &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0) &&
          upcodeList.includes(item.upCode)
      );
    } else {
      ctgryNoOptions.value = lwaCtgryList.value.filter(
        (item) =>
          item.lvl === 2 &&
          item.upCode === upCtgryValue.value &&
          item.lwaCtgrySeCd.charAt(0) === findLwaCtgrySeCd.value.charAt(0)
      );
    }
  }

  emit(
    'listChange',
    ctgryNoOptions.value,
    upCtgryValue.value,
    maxLvl.value,
    isGubunYn.value
  );
};

const clsfCdOptionsChange = (ctgryNo: string) => {
  const clsfDownListYn = clsfCdOptions.value.find(
    (item) => item.value === clsfValue.value
  )?.downListYn;

  if (clsfDownListYn === 'Y') {
    secondOptionChange('clsfCd');

    if (ctgryNo !== '') {
      const upCtgryOption = lwaCtgryList.value.find(
        (item) => item.value === ctgryNo
      );

      if (upCtgryOption.lvl === 2) {
        upCtgryValue.value = ctgryNo;
      } else {
        upCtgryValue.value = upCtgryOption.upCode;
      }
    } else {
      upCtgryValue.value = upCtgryNoOptions.value[0]?.value;
    }

    const upCtgryDownListYn = upCtgryNoOptions.value.find(
      (item) => item.value === upCtgryValue.value
    )?.downListYn;

    if (upCtgryDownListYn === 'Y') {
      upCtgryValue.value = '';
      thirdOptionChange('clsfCd');

      if (ctgryNo !== '') {
        ctgryValue.value = ctgryNo;
      } else {
        ctgryValue.value = '';
      }
    } else {
      resetOption(false, false, true);
    }
  } else {
    resetOption(false, true, true);
  }
};

const upCtgryNoOptionsChange = (ctgryNo: string) => {
  const downListYn = upCtgryNoOptions.value.find(
    (item) => item.value === upCtgryValue.value
  )?.downListYn;

  if (downListYn === 'Y') {
    if (isGubunYn.value) {
      thirdOptionChange('clsfCd');
    } else {
      thirdOptionChange('upCtgry');
    }
    if (ctgryNo !== '') {
      ctgryValue.value = ctgryNo;
    } else {
      ctgryValue.value = '';
    }
  } else {
    resetOption(false, false, true);
  }
};

// reset
const resetOption = (
  clsfCdYn: boolean,
  upCtgryYn: boolean,
  ctgryYn: boolean
) => {
  if (clsfCdYn) {
    clsfCdOptions.value = [];
    clsfValue.value = '';
  }
  if (upCtgryYn) {
    upCtgryNoOptions.value = [];
    upCtgryValue.value = '';
  }
  if (ctgryYn) {
    ctgryNoOptions.value = [];
    ctgryValue.value = '';
  }
};

const clsfValueChange = (changeIndex: number) => {
  const clsfCdOption = clsfCdOptions.value.find((item, index) => {
    if (index === changeIndex) {
      return item;
    }
  });
  clsfValue.value = clsfCdOption.value;

  secondOptionChange('clsfCd');
};

const upCtgryValueChange = (value: string) => {
  upCtgryValue.value = value;

  if (isGubunYn.value) {
    thirdOptionChange('clsfCd');
  } else {
    thirdOptionChange('upCtgry');
  }
};

watch(
  () => clsfValue.value,
  (newValue) => {
    emit('valueChange', newValue);
    emit('search');
  }
);

watch(
  () => upCtgryValue.value,
  (newValue) => {
    if (isGubunYn.value) {
      if (newValue !== '') {
        emit('valueChange', newValue);
      } else {
        emit('valueChange', clsfValue.value);
      }
    } else {
      emit('valueChange', newValue);
    }
    emit('search');
  }
);
</script>

<template>
  <div class="service-depth-wrap" id="servicedepth">
    <CommonTabs
      :platform-tab-show="true"
      v-if="isGubunYn && clsfCdOptions.length > 1"
      @click="clsfValueChange"
    >
      <CommonTabItem
        :title="item.label"
        :value="item.value"
        v-for="item in clsfCdOptions"
      >
        <serviceslide
          v-if="item.downListYn === 'Y'"
          v-model:up-ctgry-no-options="upCtgryNoOptions"
          @change="upCtgryValueChange"
        />
      </CommonTabItem>
    </CommonTabs>
    <serviceslide
      v-if="
        isGubunYn &&
        firstClsfCdOptionDownListYn === 'Y' &&
        clsfCdOptions.length === 1
      "
      v-model:up-ctgry-no-options="upCtgryNoOptions"
      @change="upCtgryValueChange"
    />
    <serviceslide
      v-if="!isGubunYn && upCtgryNoOptions.length > 0"
      v-model:up-ctgry-no-options="upCtgryNoOptions"
      @change="upCtgryValueChange"
    />
  </div>
</template>

<style scoped></style>
