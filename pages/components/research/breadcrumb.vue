<script setup lang="ts">
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';

definePageMeta({
  layout: 'guide'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '브레드크럼 메뉴타이틀',
  menuitem: [
    { menuid: 1, text: '메뉴1', to: '/test1' },
    { menuid: 2, text: '메뉴2', to: '/test2' },
    { menuid: 3, text: '메뉴3', to: '/test3' },
    { menuid: 4, text: '메뉴3', to: '/test3' },
    { menuid: 6, text: '마지막 메뉴', to: '/test5' }
  ]
};
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Research/Breadcrumb</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • 브레드크럼은 최대 4개까지 표시가 되며 5개부터는 ...이 된다.
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <CommonBreadCrumb
          :breadcrumb-title="breadcrumbMenuItem.menutitle"
          :showPrintButton="true"
          :breadcrumbItems="breadcrumbMenuItem.menuitem"
        />
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
        menutitle: '브레드크럼 메뉴타이틀',
        menuitem: [
          { menuid: 1, text: '메뉴1', to: '/test1' },
          { menuid: 2, text: '메뉴2', to: '/test2' },
          { menuid: 3, text: '메뉴3', to: '/test3' },
          { menuid: 4, text: '메뉴3', to: '/test3' },
          { menuid: 6, text: '마지막 메뉴', to: '/test5' }
        ]
      };

        &lt;CommonBreadCrumb
            :breadcrumb-title="breadcrumbMenuItem.menutitle"
            :showPrintButton="true"
            :breadcrumbItems="breadcrumbMenuItem.menuitem"
        />
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
