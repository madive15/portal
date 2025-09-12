<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useBreakpoint from 'ant-design-vue/es/_util/hooks/useBreakpoint';
const breakpoint = useBreakpoint();

interface Props {
  totalPages: number;
  initialPage?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:page']);

const currentPage = ref(props.initialPage || 1);

// props 변경 시 페이지 갱신
watch(props, (newValue) => {
  if (newValue) {
    currentPage.value = newValue.initialPage || 1;
  }
});

// 최대 표시할 페이지 번호 수
const maxVisiblePages = ref(10);
watch(breakpoint, (newValue) => {
  maxVisiblePages.value =
    newValue.xl || newValue.xxl || newValue.xxxl ? 10 : 10 / 2;
});

const pagesToShow = computed(() => {
  const chunkIndex = Math.ceil(currentPage.value / maxVisiblePages.value);

  const startPage = (chunkIndex - 1) * maxVisiblePages.value + 1;
  let endPage = startPage + maxVisiblePages.value - 1;
  if (endPage > props.totalPages) {
    endPage = props.totalPages;
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === props.totalPages);

const goToPage = (page: number) => {
  if (page !== currentPage.value && page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
    emit('update:page', currentPage.value);
  }
};
</script>

<template>
  <div class="board-list-pagination-box">
    <nav>
      <ul class="pagination">
        <!-- 전체 처음 페이지로 이동 버튼 -->
        <li :class="['page-item all-prev-item', { disabled: isFirstPage }]">
          <button
            type="button"
            class="page-link all-prev-link"
            @click.prevent="goToPage(1)"
            :aria-disabled="isFirstPage"
          >
            <img
              :src="
                isFirstPage
                  ? //'/image/sub/customer/page_left_disable.svg'
                    '/image/sub/customer/page_left.svg'
                  : '/image/sub/customer/page_left.svg'
              "
              alt="전체 첫페이지 이동"
            />
          </button>
        </li>

        <!-- 이전 버튼 -->
        <li :class="['page-item', { disabled: isFirstPage }]">
          <button
            type="button"
            class="page-link prev-link"
            @click.prevent="goToPage(currentPage - 1)"
            :aria-disabled="isFirstPage"
          >
            <span class="icon-span">
              <img
                :src="
                  isFirstPage
                    ? // '/image/sub/customer/page_left_disable.svg'
                      '/image/sub/customer/page_left.svg'
                    : '/image/sub/customer/page_left.svg'
                "
                alt="이전 페이지"
              />
            </span>
            <span class="text-span">이전</span>
          </button>
        </li>

        <!-- 페이지 번호 앞쪽 생략 표시 -->

        <!-- 페이지 번호 -->
        <li
          v-for="page in pagesToShow"
          :key="page"
          :class="['page-item', { active: currentPage === page }]"
        >
          <button
            type="button"
            class="page-link"
            @click.prevent="goToPage(page)"
            :title="currentPage === page ? '선택됨' : ''"
          >
            {{ page }}
          </button>
        </li>

        <!-- 페이지 번호 뒤쪽 생략 표시 -->

        <!-- 다음 버튼 -->
        <li :class="['page-item', { disabled: isLastPage }]">
          <button
            type="button"
            class="page-link next-link"
            @click.prevent="goToPage(currentPage + 1)"
            :aria-disabled="isLastPage"
          >
            <span class="text-span">다음</span>
            <span class="icon-span">
              <img
                :src="
                  isLastPage
                    ? // '/image/sub/customer/page_right_disable.svg'
                      '/image/sub/customer/page_right.svg'
                    : '/image/sub/customer/page_right.svg'
                "
                alt="다음 페이지"
              />
            </span>
          </button>
        </li>

        <!-- 전체 마지막 페이지로 이동 버튼 -->
        <li :class="['page-item all-next-item', { disabled: isLastPage }]">
          <button
            type="button"
            class="page-link all-next-link"
            @click.prevent="goToPage(props.totalPages)"
            :aria-disabled="isLastPage"
          >
            <img
              :src="
                isLastPage
                  ? // '/image/sub/customer/page_right_disable.svg'
                    '/image/sub/customer/page_right.svg'
                  : '/image/sub/customer/page_right.svg'
              "
              alt="전체 마지막 페이지 이동"
            />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@use './boardpagenation';
</style>
