<script setup lang="ts">
import { ref } from 'vue';
import AccordionItem from '~/components/accordion/accordionitem.vue';

const props = defineProps<{
  items: {
    title: string;
    subItems: {
      label: string;
      link: string;
    }[];
  }[];
}>()

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
}
</script>

<template>
  <div class="accordion">
    <AccordionItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :is-active="activeIndex === index"
      @toggle="toggle(index)"
    >
      <ul>
        <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
          <NuxtLink :to="subItem.link" :external="true">
            {{ subItem.label }}
          </NuxtLink>
        </li>
      </ul>
    </AccordionItem>
  </div>
</template>



<style scoped>

</style>
