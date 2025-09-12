<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { DownOutlined, PlusOutlined } from '@ant-design/icons-vue';

type DropdownItem = {
  key: string;
  label: string;
};

const props = defineProps<{
  dropClickButtonText?: string;
  platformTableDropDownShow?: boolean;
  dropDownItems?: DropdownItem[];
  platformServiceDropDownShow?: boolean;
  platformServiceIconShow?: boolean;
  platformMainHitSearchDropDownShow?: boolean;
}>();

const dropdownVisible = ref(false);

function handleButtonClick(ev: MouseEvent) {
  const trigger = ev.currentTarget as HTMLElement;

  const moveToFirst = () => {
    const visible = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.common-dropdown-overlay .common-drop-slot-button'
      )
    ).filter((btn) => btn.offsetParent !== null);
    if (!visible.length) return;
    visible[0].focus();
    const last = visible[visible.length - 1];
    last.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Tab' && !e.shiftKey) dropdownVisible.value = false;
      },
      { once: true }
    );
  };
  requestAnimationFrame(moveToFirst);
  const onTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      requestAnimationFrame(moveToFirst);
      trigger.removeEventListener('keydown', onTab);
    }
  };
  trigger.addEventListener('keydown', onTab);
}
</script>

<template>
  <a-dropdown
    :trigger="['click']"
    class="common-table-dropdown"
    v-if="platformTableDropDownShow"
    overlay-class-name="common-dropdown-overlay"
    v-model:open="dropdownVisible"
  >
    <a-button
      class="common-table-dropdown-click-button"
      @click.prevent="handleButtonClick"
    >
      {{ dropClickButtonText || '10개씩 보기' }}
      <DownOutlined class="arrow" />
    </a-button>
    <template #overlay>
      <a-menu class="common-drop-slot">
        <a-menu-item
          v-for="(item, index) in dropDownItems"
          :key="item.key"
          class="common-drop-item"
        >
          <a-button class="common-drop-slot-button">
            {{ item.label }}
          </a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <a-dropdown
    :trigger="['click']"
    class="common-service-dropdown"
    v-if="platformServiceDropDownShow"
    overlay-class-name="common-dropdown-overlay"
    v-model:open="dropdownVisible"
  >
    <a-button
      class="common-service-dropdown-click-button"
      @click.prevent="handleButtonClick"
    >
      <span class="text-span">
        {{ dropClickButtonText || '기관 관련 페이지' }}
      </span>
      <PlusOutlined class="plus" />
    </a-button>
    <template #overlay>
      <a-menu class="common-drop-slot service">
        <a-menu-item
          v-for="item in dropDownItems"
          :key="item.key"
          class="common-drop-item service"
        >
          <a-button
            class="common-drop-slot-button service"
            v-if="platformServiceIconShow"
          >
            <span class="text-span">
              {{ item.label }}
            </span>
            <span class="icon-span">
              <img src="/image/sub/service/shortcut_blue.svg" alt="바로가기" />
            </span>
          </a-button>
          <a-button class="common-drop-slot-button" v-else>
            {{ item.label }}
          </a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <a-dropdown
    :trigger="['click']"
    overlay-class-name="common-dropdown-overlay"
    class="common-hit-search-dropdown"
    v-if="platformMainHitSearchDropDownShow"
    v-model:open="dropdownVisible"
  >
    <a-button
      class="common-hit-search-dropdown-click-button"
      @click.prevent="handleButtonClick"
    >
      <span class="num-span"> 1 </span>
      <span class="text-span">
        {{ dropClickButtonText || '양육비' }}
      </span>
      <DownOutlined class="arrow" />
    </a-button>
    <template #overlay>
      <a-menu class="common-drop-slot hitsearch">
        <a-menu-item
          v-for="item in dropDownItems"
          :key="item.key"
          class="common-drop-item hitsearch"
        >
          <a-button class="common-drop-slot-button hitsearch">
            <span class="num-span"> 1 </span>
            <span class="text-span">
              {{ item.label }}
            </span>
          </a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
@use '~/components/ui/dropdown/dropdown.scss';
</style>
