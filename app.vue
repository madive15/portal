<script setup lang="ts">
import 'ant-design-vue/dist/reset.css';
import '~/assets/font/PretendardGOV/font.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import '~/assets/style/layout.scss';
import '~/assets/style/global.scss';
import '~/assets/style/common.scss';
import '~/assets/style/page.scss';
import '~/assets/style/mobile.scss';
import '~/assets/style/style.scss';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useLoginStore } from '~/stores/login';

dayjs.locale('ko');

const loginStore = useLoginStore();
const query = useQuery({
  queryKey: ['session'],
  queryFn: async () => {
    try {
      await loginStore.loadAuthorized();
    } catch (e) {}
  }
});
</script>

<template>
  <client-only>
    <NuxtLayout>
      <NuxtPage />
      <common-loading />
    </NuxtLayout>
  </client-only>
</template>

<style>
#__nuxt {
  height: 100%;
}
</style>
