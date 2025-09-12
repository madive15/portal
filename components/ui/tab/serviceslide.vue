<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Dropdown from '~/components/dropdown/Dropdown.vue';

export type ServiceSlideType = {
  id: number;
  buttonClass: string;
  buttonText: string;
  buttonValue: string;
};

const scrollContainer = ref<HTMLElement | null>(null);
const items = ref<ServiceSlideType[]>([
  {
    id: 0,
    buttonClass: 'service-slide-all-button',
    buttonValue: '전체',
    buttonText: '전체'
  },
  {
    id: 1,
    buttonClass: 'service-slide-button',
    buttonValue: '노동',
    buttonText: '노동'
  },
  {
    id: 2,
    buttonClass: 'service-slide-button',
    buttonValue: '주택임대차',
    buttonText: '주택임대차'
  },
  {
    id: 3,
    buttonClass: 'service-slide-button',
    buttonValue: '상가임대차',
    buttonText: '상가임대차'
  },
  {
    id: 4,
    buttonClass: 'service-slide-button',
    buttonValue: '손해배상',
    buttonText: '손해배상'
  },
  {
    id: 5,
    buttonClass: 'service-slide-button',
    buttonValue: '민사일반',
    buttonText: '민사일반'
  },
  {
    id: 6,
    buttonClass: 'service-slide-button',
    buttonValue: '물권',
    buttonText: '물권'
  },
  {
    id: 7,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 8,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 9,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 10,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 11,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 12,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 13,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 14,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 15,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 16,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  },
  {
    id: 17,
    buttonClass: 'service-slide-button',
    buttonValue: '채권',
    buttonText: '채권'
  }
]);

const activeId = ref<number>(0);

function setActive(id: number) {
  activeId.value = id;
}

// 스크롤 이동 함수들
function scrollLeft() {
  if (!scrollContainer.value) return;
  const containerLeftWidth = scrollContainer.value.clientWidth;
  scrollContainer.value.scrollBy({
    left: -containerLeftWidth,
    behavior: 'smooth'
  });
}
function scrollRight() {
  if (!scrollContainer.value) return;
  const containerWidth = scrollContainer.value.clientWidth;
  scrollContainer.value.scrollBy({ left: containerWidth, behavior: 'smooth' });
}

onMounted(() => {
  nextTick(() => {});
});
</script>

<template>
  <div class="service-slide-box">
    <div class="scroll-wrapper">
      <div class="container">
        <!-- 왼쪽 화살표 버튼 -->
        <button
          class="scroll-button left-button"
          @click="scrollLeft"
          type="button"
        >
          <img
            src="~/assets/image/sub/service/arrow_left.svg"
            alt="기관 슬라이드 가로스크롤 처음으로"
          />
        </button>
        <!-- 슬라이더 영역-->
        <div class="scroll-container" ref="scrollContainer">
          <div
            class="scroll-service-select-box"
            v-for="(item, index) in items"
            :key="index"
          >
            <button
              :class="[
                `${item.buttonClass}-${item.id}`,
                { active: item.id === activeId }
              ]"
              :value="item.buttonValue"
              type="button"
              @click="() => setActive(item.id)"
            >
              {{ item.buttonText }}
            </button>
          </div>
        </div>
        <!-- 오른쪽 화살표 버튼 -->
        <button
          class="scroll-button right-button"
          @click="scrollRight"
          type="button"
        >
          <img
            src="~/assets/image/sub/service/arrow.svg"
            alt="기관 슬라이드 가로스크롤 끝으로"
          />
        </button>
      </div>
    </div>
    <div class="etc-drop-box">
      <Dropdown
        :drop-img-button-show="true"
        :drop-slots="true"
        button-class="etc-drop-click-button"
      >
        <li v-for="(text, index) in items" :key="index">
          <NuxtLink to="'#'">
            {{ text.buttonText }}
          </NuxtLink>
        </li>
      </Dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
