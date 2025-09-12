<script setup lang="ts">
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';
import { ref } from 'vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import NewHeader from '~/components/ui/header/header.vue';

definePageMeta({
  layout: 'empty'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '서브타이틀',
  menuitem: [{ menuid: 1, text: '시스템 이용문의', to: '/test1' }]
};
const activeIndex = ref<number | null>(null);
const dropdownCategory = ref('');
function setActive(index: number) {
  activeIndex.value = index;
}
onMounted(() => {
  setActive(2);
});
const inputTextData = ref('');
</script>

<template>
  <div class="wrap">
    <NewHeader />
    <div class="content" id="common-content">
      <div class="container">
        <div class="sub-content-box">
          <section class="section1">
            <CommonBreadCrumb
              :breadcrumb-title="breadcrumbMenuItem.menutitle"
              :showPrintButton="true"
              :breadcrumbItems="breadcrumbMenuItem.menuitem"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
