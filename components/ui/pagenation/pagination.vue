<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { PaginationType } from '~/types/data/pagination';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

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

// 반응형일때 페이지 넘버가 5개씩 보이도록
const windowWidth = ref<number>(
  typeof window !== 'undefined' ? window.innerWidth : 1199
);

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 1199px 이하일때는 5개씩 보이도록 출력
const visibleRange = computed(() => {
  if (windowWidth.value < 1199) {
    // return currentRange.value.slice(0, 5);
    const groupSize = 5;
    //현재 페이지가 속한 그룹 0부터
    const currentGroup = Math.floor((props.page - 1) / groupSize);
    //그룹 시작~끝
    const start = currentGroup * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages.value);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return currentRange.value;
});

const firstPage = () => {
  submitPage(1);
};

const prevPage = () => {
  const countPrev = props.page;
  console.log(countPrev);
  if (countPrev > 1) {
    submitPage(countPrev - 1);
  }
};

const nextPage = () => {
  const countNext = props.page;
  if (countNext < totalPages.value) {
    submitPage(countNext + 1);
  }
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
</script>

<template>
  <a-flex justify="center" align="center" class="board-list-pagination-box">
    <a-col class="pagination">
      <a-space align="center" class="pagenation-wrap">
        <a-button
          type="link"
          :icon="h(LeftOutlined)"
          size="middle"
          class="pagination-icon-size icon-button text-black"
          :class="{ disabled: props.page <= 1 }"
          @click="firstPage"
        />
        <a-button
          type="link"
          class="text-page"
          :class="{ disabled: props.page <= 1 }"
          size="middle"
          @click="prevPage"
        >
          <LeftOutlined />
          이전
        </a-button>
        <a-space class="page-num__wrap">
          <a-button
            size="middle"
            :type="pageNo === page ? 'default' : `link`"
            :class="['page-item', { active: pageNo === props.page }]"
            v-for="pageNo in visibleRange"
            :key="`pagination-${pageNo}`"
            @click="() => movePage(pageNo)"
            >{{ pageNo }}</a-button
          >
        </a-space>
        <a-button
          type="link"
          size="middle"
          class="text-page"
          :class="{ disabled: props.page >= totalPages }"
          @click="nextPage"
        >
          다음
          <RightOutlined />
        </a-button>
        <a-button
          type="link"
          :icon="h(RightOutlined)"
          class="pagination-icon-size icon-button text-black"
          :class="{ disabled: props.page >= totalPages }"
          size="middle"
          @click="lastPage"
        />
      </a-space>
    </a-col>
  </a-flex>
</template>

<style scoped lang="scss">
@use '~/components/ui/pagenation/pagenation.scss';
</style>
