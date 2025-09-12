<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';
import { telephoneNumber } from '~/utils/TextUtils';
import Loading from '~/components/allsearch/loading.vue';
import CommonTegBedge from "~/components/ui/tag/tagbedge.vue";

const router = useRouter();
const route = useRoute();

const svcTypeStore = useSvcTypeStore();
const { svcUrl, svc } = storeToRefs(svcTypeStore);

const { $instInfoOverride } = useNuxtApp();

const srvcInfo = computed(() => {
  return svc.value.length === 0 ? null : $instInfoOverride(svc.value[0]);
});

const openMapWindow = (info) => {
  const url = `/servicetype/map?srvcNo=${info.srvcNo}&instNo=${info.instNo}`;
  window.open(url, 'serviceMapPopup', 'width=800,height=600');
};

onBeforeMount(async () => {
  await Promise.all([
    svcTypeStore.searchSvcTypeUrlList(route.query),
    useSvcTypeStore().searchSvcList(route.query.srvcNo)
  ]);
  console.log(svc.value[0]);
});

function formatPhoneNumber(input) {
  // 숫자 이외의 문자 제거
  // let value = input.value.replace(/\D/g, "");
  if (!input) {
    return;
  }

  let value = input;

  if (value.length >= 11) {
    // 11자리 이상 → (지역번호 3자리) - (국번 4자리) - (번호 4자리)
    return value.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
  } else if (value.length === 10) {
    // 10자리 → (지역번호 2자리) - (국번 4자리) - (번호 4자리) 또는 (지역번호 3자리) - (국번 3자리) - (번호 4자리)
    if (value.startsWith('02')) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3'); // 서울(02)
    } else {
      return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3'); // 기타 지역번호
    }
  } else if (value.length === 9) {
    return value.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1-$2-$3'); // 서울(02)
  }
  if (value.length === 8) {
    // 8자리 (지역번호 없이 국번 + 번호)
    return value.replace(/^(\d{4})(\d{4})$/, '$1-$2');
  } else {
    // 기본적으로 숫자만 입력되도록 유지
    return value;
  }
}
</script>

<template>
  <section class="section1">
    <div class="container" v-if="srvcInfo">
      <Breadcrumb
        v-model:breadcrumb-title="srvcInfo.srvcTtl"
        :showPrintButton="true"
        :breadcrumbItems="[
          { text: '서비스 유형' },
          { text: srvcInfo.srvcTtl, active: true }
        ]"
      />
      <div class="information-box">
        <div class="info-header">
          <div class="title-box">
            <strong>{{ srvcInfo.srvcTtl }}</strong>
            <common-teg-bedge :tag-bedge-text="srvcInfo.svcCtgry" v-if="srvcInfo.svcCtgry != null" />
          </div>
        </div>
        <div class="info-middle">
          <p v-html="srvcInfo.srvcExpln"></p>
        </div>
        <div v-if="srvcInfo.trprNm != null" class="info-user-box">
          <strong>대상자</strong>
          <span>{{ srvcInfo.trprNm }}</span>
        </div>
        <div class="info-footer" v-if="srvcInfo.srchExcpYn === 'N'">
          <div class="left-box">
            <strong>담당기관</strong>
            <span>{{
              $instNmOverride(srvcInfo.instNm, srvcInfo.instNo, srvcInfo.srvcNo)
            }}</span>
            <!--            <strong class="name-strong"></strong>-->
          </div>
          <div class="right-box">
            <div class="title-box" v-if="svcUrl.length > 0">
              <strong>바로가기</strong>
            </div>
            <div class="link-box">
              <!--              <button-->
              <!--                class="btn link-button"-->
              <!--                v-for="(item, index) in svcUrl"-->
              <!--                :key="index"-->
              <!--              >-->
              <!--                <span class="text-span">{{ item.urlNm }}</span>-->
              <!--                <span class="icon-span">-->
              <!--                  <NuxtLink :to="item.urlAddr" target="_blank">-->
              <!--                    <img-->
              <!--                      src="/image/sub/service/shortcut_black.svg"-->
              <!--                      alt="바로가기"-->
              <!--                    />-->
              <!--                  </NuxtLink>-->
              <!--                </span>-->
              <!--              </button>-->

              <NuxtLink
                :to="item.urlAddr"
                v-for="(item, index) in svcUrl"
                :key="`url-${index}`"
                target="_blank"
                title="새 창 열림"
                class="btn link-button"
              >
                <span class="text-span">{{ item.urlNm }}</span>
                <span class="icon-span">
                  <img
                    src="/image/sub/service/shortcut_black.svg"
                    alt="바로가기"
                  />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-if="!!srvcInfo.instTelno && srvcInfo.srchExcpYn === 'N'"
          class="info-end-box"
        >
          <ul>
            <li>
              <strong>주소</strong>
              <span>{{
                $instAddrOverride(
                  srvcInfo.addr,
                  srvcInfo.instNo,
                  srvcInfo.srvcNo
                )
              }}</span>
            </li>
            <li
              v-if="
                $instAddrOverride(
                  srvcInfo.addr,
                  srvcInfo.instNo,
                  srvcInfo.srvcNo
                ) == srvcInfo.addr &&
                srvcInfo.instLat &&
                srvcInfo.instLot
              "
              class="goto-li"
            >
              <button @click="openMapWindow(srvcInfo)" title="지도 새 창 열림">
                위치보기
              </button>
            </li>
            <li>
              <strong>대표전화</strong>
              <span>{{
                $instTelOverride(
                  formatPhoneNumber(srvcInfo.instTelno),
                  srvcInfo.instNo,
                  srvcInfo.srvcNo
                )
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use './scss/info';
</style>
