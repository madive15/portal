<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';

const route = useRoute();
const checkboxes = ref([]);

const selectAll = computed({
  get() {
    return checkboxes.value.every((checkbox) => checkbox.checked);
  },
  set(value: boolean) {
    checkboxes.value.forEach((checkbox) => {
      checkbox.checked = value;
    });
  }
});

const svcStore = useSvcStore();
const { svcTypeQuery, svcType } = storeToRefs(svcStore);

const sum = ref(0);
onBeforeMount(async () => {
  await svcStore.searchSvcMenuList();
  checkboxes.value = svcType.value.map((item) => ({
    id: item.comCd,
    label: item.comCdNm,
    cnt: item.cnt,
    checked: route.query.instClsfCd === item.comCd
  }));

  checkboxes.value.forEach((item) => {
    sum.value += item.cnt;
  });

  await search();
});

watch(route, async (newValue) => {
  const newInstClsfCd = newValue.query.instClsfCd;
  if (newInstClsfCd !== undefined) {
    svcTypeQuery.value.check = newValue.query.instClsfCd;
    checkboxes.value.map((checkbox) =>
      checkbox.id == newValue.query.instClsfCd
        ? (checkbox.checked = true)
        : (checkbox.checked = false)
    );
    await useSvcStore().searchSvcList();
  }
});

watch(
  checkboxes,
  () => {
    svcTypeQuery.value.page = 1;
    search();
  },
  {
    deep: true
  }
);

const search = async () => {
  svcTypeQuery.value.check = checkboxes.value
    .filter((checkbox) => checkbox.checked)
    .map((item) => item.id);

  await useSvcStore().searchSvcList();
};

const isIndeterminate = computed(() => {
  const checkedCount = checkboxes.value.filter(
    (checkbox) => checkbox.checked
  ).length;

  svcTypeQuery.value.check = checkboxes.value
    .filter((checkbox) => checkbox.checked)
    .map((item) => item.id);
  return checkedCount > 0 && checkedCount < checkboxes.value.length;
});
</script>

<template>
  <div class="wrap">
    <common-header />
    <div class="service-content-wrap" id="service-list">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-12 snb-col">
            <aside>
              <div class="title-box">
                <h2>서비스 제공기관</h2>
              </div>
              <div class="menu-box">
                <div class="menu-header">
                  <div class="form-check">
                    <input
                      class="form-check-input all-check-input"
                      type="checkbox"
                      id="all-check"
                      v-model="selectAll"
                      :checked="selectAll"
                      :indeterminate.prop="isIndeterminate"
                    />
                    <label class="form-check-label" for="all-check">
                      전체 ({{ sum }})
                    </label>
                  </div>
                </div>
                <div class="menu-body">
                  <div
                    class="form-check"
                    v-for="checkbox in checkboxes"
                    :key="checkbox.id"
                  >
                    <input
                      class="form-check-input check-input"
                      type="checkbox"
                      :id="checkbox.id"
                      :checked="checkbox.checked"
                      v-model="checkbox.checked"
                    />
                    <label class="form-check-label" :for="checkbox.id">
                      {{ checkbox.label }}({{ checkbox.cnt }})
                    </label>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div class="col-xl-9 col-12 content-col">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<style scoped lang="scss">
@use './scss/service';
</style>
