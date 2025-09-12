<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';
import SideToggleMenu from "~/components/ui/sidemenu/sideToggleMenu.vue";

const router = useRouter();
const route = useRoute();
const checkboxes = ref([]);
const comCd = ref('');

/* 접근성 토글버튼 추가 추가 25.04.08 */
const isOpen = ref(false);

const onClicktoggle = () => {
  isOpen.value = !isOpen.value;
};
/* //접근성 토글버튼 추가 추가 25.04.08 */

// const selectAll = computed({
//   get() {
//     return checkboxes.value.every((checkbox) => checkbox.checked);
//   },
//   set(value: boolean) {
//     checkboxes.value.forEach((checkbox) => {
//       checkbox.checked = value;
//     });
//   }
// });

const svcStore = useSvcStore();
const { svcTypeQuery, svcType } = storeToRefs(svcStore);

const sum = ref(0);
onBeforeMount(async () => {
  await svcStore.searchSvcMenuList();

  comCd.value = route.query.instClsfCd as string;
  svcTypeQuery.value.comCd = route.query.instClsfCd;

  // checkboxes.value = svcType.value.map((item) => ({
  //   id: item.comCd,
  //   label: item.comCdNm,
  //   cnt: item.cnt,
  //   checked: route.query.instClsfCd === item.comCd
  // }));

  svcType.value.forEach((item) => {
    sum.value += item.cnt;
  });

  svcType.value.unshift({
    comCdNm: '전체',
    comCd: '',
    cnt: sum.value
  });

  await search();
});

watch(route, async (newValue) => {
  if (newValue.query.instClsfCd !== undefined) {
    comCd.value = newValue.query.instClsfCd;
    svcTypeQuery.value.comCd = comCd;
  }
  await useSvcStore().searchSvcList();
  // const newInstClsfCd = newValue.query.instClsfCd;
  // if (newInstClsfCd !== undefined) {
  //   svcTypeQuery.value.check = newValue.query.instClsfCd;
  //   checkboxes.value.map((checkbox) =>
  //     checkbox.id == newValue.query.instClsfCd
  //       ? (checkbox.checked = true)
  //       : (checkbox.checked = false)
  //   );
  //   await useSvcStore().searchSvcList();
  // }

  //svcTypeQuery.value.comCd = newValue.query.instClsfCd;
});

// watch(route, async (newValue) => {
//   const newInstClsfCd = newValue.query.instClsfCd;
//   if (newInstClsfCd !== undefined) {
//     svcTypeQuery.value.check = newValue.query.instClsfCd;
//     checkboxes.value.map((checkbox) =>
//         checkbox.id == newValue.query.instClsfCd
//             ? (checkbox.checked = true)
//             : (checkbox.checked = false)
//     );
//     await useSvcStore().searchSvcList();
//   }
// });

// watch(
//     checkboxes,
//     () => {
//       svcTypeQuery.value.page = 1;
//       search();
//     },
//     {
//       deep: true
//     }
// );

const search = async () => {
  // svcTypeQuery.value.check = checkboxes.value
  //     .filter((checkbox) => checkbox.checked)
  //     .map((item) => item.id);
  svcTypeQuery.value.page = 1;
  await useSvcStore().searchSvcList();
};

// const isIndeterminate = computed(() => {
//   const checkedCount = checkboxes.value.filter(
//     (checkbox) => checkbox.checked
//   ).length;
//
//   svcTypeQuery.value.check = checkboxes.value
//     .filter((checkbox) => checkbox.checked)
//     .map((item) => item.id);
//   return checkedCount > 0 && checkedCount < checkboxes.value.length;
// });

const changeCd = async (item) => {
  useSvcStore().resetCaseStore();

  svcTypeQuery.value.comCd = item;
  comCd.value = item;

  svcTypeQuery.value.page = 1;
  await useSvcStore().searchSvcList();

  router.replace({
    query: {
      ...route.query,
      instClsfCd: comCd
    }
  });
};
</script>

<template>
  <div class="wrap">
    <common-header />
    <div id="service-content-lnb">
      <div class="col-xl-3 col-12 snb-col">
        <aside :class="[isOpen && 'is-open']">
          <SideToggleMenu title="서비스 제공기관">
            <ul class="side-menu__list">
              <li class="side-menu__item"
                  v-for="(item, index) in svcType"
                  :key="index"
                  :class="{ 'menu-all': item.comCd === '' }">
                <NuxtLink
                    :to="`?instClsfCd=${item.comCd}`"
                    :id="index"
                    :class="{ active: comCd === item.comCd }"
                    :external="true"
                >
                  {{ item.comCdNm }}({{ item.cnt }})
                </NuxtLink>
              </li>
            </ul>
          </SideToggleMenu>

        </aside>
      </div>
    </div>
    <div id="common-content">
      <div class="service-content-wrap" id="service-list">
        <div class="container">
          <div class="row">
            <div class="col-xl-3 col-12 snb-col">
            </div>
            <div class="col-xl-9 col-12 content-col">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<style scoped lang="scss">
@use './scss/service-pvsn';
</style>
