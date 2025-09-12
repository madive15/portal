<script setup lang="ts">
import { inject, ref } from 'vue';

interface MenuItem {
  text: string;
  to: string;
}

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  buttonText: string;
  menuItems: MenuItem[];
}>();

const isOpen = ref(false); // 드롭다운 메뉴의 표시 여부를 제어하는 상태

const allDropDownClose = inject('allDropDownClose') as Ref<boolean>;

watch(allDropDownClose, () => {
  isOpen.value = false;
});

/* v-click-outside 디렉티브 정의 */
const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
</script>

<script lang="ts">
export default {
  directives: {
    clickOutside: {
      beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  }
};
</script>

<template>
  <div class="dropdown-box" v-click-outside="() => (isOpen = false)">
    <button
      class="btn drop-toggle"
      type="button"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      v-bind="$attrs"
    >
      <span class="text-span">
        {{ buttonText }}
      </span>
      <span class="icon-span">
        <img src="/image/sub/service/plus.svg" alt="" />
      </span>
    </button>
    <transition name="dropdown">
      <dl v-if="isOpen" class="drop-menu">
        <dt>기관 관련 페이지</dt>
        <dd v-for="(item, index) in menuItems" :key="index" class="drop-item">
          <NuxtLink
            class="drop-item-link"
            :to="item.to"
            target="_blank"
            title="새 창 열림"
          >
            <span class="text-span">
              {{ item.text }}
            </span>
            <span class="icon-span">
              <img src="/image/sub/service/shortcut_blue.svg" alt="" />
            </span>
          </NuxtLink>
        </dd>
      </dl>
    </transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-box {
  position: relative;
  margin-top: 28px;
}

.dropdown-box .drop-toggle {
  border: solid 1px #dadce1 !important;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 40px;
  padding: 0 15px !important;
}

.dropdown-box .drop-toggle span img {
  width: 10px;
  height: 10px;
  position: relative;
}

.dropdown-box .drop-toggle span {
  font-size: 13px;
  color: #222;
  font-weight: 600;
}

.drop-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: block;
  background-color: #fff;
  border: 1px solid #dadce1;
  min-width: 100%;
  padding: 15px;
  margin: 0;
  border-radius: 10px;
  list-style: none;
}

.drop-menu dd {
  width: 100%;
}

.drop-menu dt {
  font-size: 13px;
  font-weight: 600;
  color: #222;
  margin-bottom: 15px;
}

.drop-item-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #333;
  margin-bottom: 10px;
  column-gap: 15px;
}

.drop-item:last-child {
  margin-bottom: 0;
}

.drop-item span img {
  width: 14px;
  height: 14px;
  position: relative;
}

.drop-item span {
  font-size: 13px;
  font-weight: 500;
  color: #222;
}

.drop-toggle {
  display: flex;
  align-items: center;
}
</style>
