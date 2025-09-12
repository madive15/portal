<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import Dropdown from '~/components/dropdown/Dropdown.vue';

export type ServiceSlideType = {
  id: number;
  buttonClass: string;
  buttonText: string;
  buttonValue: string;
};

const emit = defineEmits(['change']);
const upCtgryNoOptions = defineModel<[]>('upCtgryNoOptions');

const items = computed<ServiceSlideType[]>(() => {
  return upCtgryNoOptions.value.map((item, index) => ({
    id: index,
    buttonClass: 'service-slide-button',
    buttonText: item.label,
    buttonValue: item.value
  }));
});

watch(items, (newValue) => {
  if (!!newValue) {
    setActive(0);
  }
});

const scrollContainer = ref<HTMLElement | null>(null);

const activeId = ref<number>(0);

function setActive(id: number) {
  activeId.value = id;
  //리스트 조회 필요

  emit('change', items.value[id].buttonValue);
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
        <li v-for="(item, index) in items" :key="index">
          <NuxtLink
            :to="'#'"
            :external="true"
            @click="() => setActive(item.id)"
            :title="item.buttonText"
          >
            {{ item.buttonText }}
          </NuxtLink>
        </li>
      </Dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
