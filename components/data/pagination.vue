<script setup lang="ts">
import 'tui-pagination/dist/tui-pagination.css';
import type { PaginationType } from '~/types/data/pagination';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons-vue';

const props = defineProps<PaginationType>();
const emit = defineEmits(['change']);

const totalPages = computed(() => Math.ceil(props.totalElements / props.size));
const rangePages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
);

const ranges = computed(() => {
  const ranges: number[][] = [];
  do {
    ranges.push(rangePages.value.splice(0, props.showPaginationCount));
  } while (rangePages.value.length !== 0);

  if (ranges[0].length === 0) {
    ranges[0][0] = 1;
  }

  return ranges;
});

const currentRange = computed(() => {
  for (const range of ranges.value) {
    if (range.some((i) => i === props.page)) {
      return range;
    }
  }

  return [];
});

const currentPeriod = computed(() => {
  for (let i = 0; i < ranges.value.length; ++i) {
    if (ranges.value[i].some((i) => i === props.page)) {
      return i;
    }
  }

  return -1;
});

const prevPageNumber = computed(() => {
  const range = ranges.value[currentPeriod.value - 1];
  if (range) {
    return range[range.length - 1];
  }

  return props.page;
});

const nextPageNumber = computed(() => {
  const range = ranges.value[currentPeriod.value + 1];
  if (range) {
    return range[0];
  }

  return props.page;
});

const firstPage = () => {
  submitPage(1);
};

const prevPage = () => {
  submitPage(prevPageNumber.value);
};

const nextPage = () => {
  submitPage(nextPageNumber.value);
};

const lastPage = () => {
  submitPage(totalPages.value ? totalPages.value : 1);
};

const change = (value) => {
  if (props.size !== value) {
    emit('change', props.page, value);
  }
};

const movePage = (value) => {
  submitPage(value);
};

const submitPage = (page: number) => {
  if (props.page !== page) {
    emit('change', page, props.size);
  }
};

const options = [
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
];
</script>

<template>
  <a-row justify="space-between" class="mt-5">
    <a-col>
      <a-space>
        <a-select :options="options" :value="size" @change="change" />
        <span>건/페이지 (총 {{ totalElements }}건)</span>
      </a-space>
    </a-col>
    <a-col
      ><a-space>
        <a-button
          type="link"
          :icon="h(DoubleLeftOutlined)"
          size="small"
          class="pagination-icon-size text-black"
          @click="firstPage"
        />
        <a-button
          type="link"
          :icon="h(LeftOutlined)"
          class="pagination-icon-size text-black"
          size="small"
          @click="prevPage"
        />
        <a-space>
          <a-button
            size="small"
            :type="pageNo === page ? 'default' : `link`"
            class="text-black"
            v-for="pageNo in currentRange"
            :key="`pagination-${pageNo}`"
            @click="() => movePage(pageNo)"
            >{{ pageNo }}</a-button
          >
        </a-space>
        <a-button
          type="link"
          :icon="h(RightOutlined)"
          size="small"
          class="pagination-icon-size text-black"
          @click="nextPage"
        />
        <a-button
          type="link"
          :icon="h(DoubleRightOutlined)"
          class="pagination-icon-size text-black"
          size="small"
          @click="lastPage"
        />
      </a-space>
    </a-col>
    <a-col></a-col>
  </a-row>
</template>
