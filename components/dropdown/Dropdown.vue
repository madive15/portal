<script setup lang="ts">
import { onMounted, ref } from 'vue';

// props 정의
export type DropdownItem = {
  text: string;
  to: string;
};

const props = defineProps<{
  buttonText?: string;
  buttonClass?: string;
  items?: DropdownItem[];
  dropSlots?: boolean;
  dropClass?: string;
  dropButtonSlots?: boolean;
  dropImgButtonShow?: boolean;
}>();

const dropdownButton = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (dropdownButton.value) {
    const { Dropdown } = await import('bootstrap');
    new Dropdown(dropdownButton.value);
  }
});
</script>

<template>
  <div :class="['dropdown', dropClass]">
    <button
      v-if="dropButtonSlots"
      :class="['btn', 'dropdown-toggle', buttonClass]"
      type="button"
      ref="dropdownButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="num-span">1</span>
      <span
        v-for="(item, index) in items"
        :key="index"
        class="text-span"
        id="main-hit-first-span"
        >{{ item.keyword }}</span
      >
    </button>
    <button
      v-else-if="dropImgButtonShow"
      :class="['btn', 'dropdown-toggle', buttonClass]"
      type="button"
      ref="dropdownButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img src="~/assets/image/sub/service/select-more.svg" alt="더보기" />
    </button>

    <button
      v-else
      :class="['btn', 'dropdown-toggle', buttonClass]"
      type="button"
      ref="dropdownButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <slot name="button">
        {{ buttonText }}
      </slot>
    </button>

    <ul v-if="dropSlots" class="dropdown-menu">
      <slot></slot>
    </ul>
    <ul v-else class="dropdown-menu">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink class="dropdown-item" :to="item.to" :external="true">
          {{ item.text }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
