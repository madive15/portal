<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useSvcTypeStore } from '~/stores/svctype';
import { storeToRefs } from 'pinia';
import { useSvcStore } from '~/stores/svc';
import { telephoneNumber } from '~/utils/TextUtils';

const router = useRouter();
const route = useRoute();

const svcTypeStore = useSvcTypeStore();
const { svcUrl, svc } = storeToRefs(svcTypeStore);

const svcStore = useSvcStore();
const { svcSns } = storeToRefs(svcStore);

const srvcInfo = computed(() => {
  return svc.value.length === 0 ? { srvcTtl: ' ' } : svc.value[0];
});

onBeforeMount(async () => {
  await Promise.all([
    svcTypeStore.searchSvcTypeUrlList(route.query),
    useSvcTypeStore().searchSvcList(route.query.srvcNo),
    useSvcStore().searchSvcSnsList(route.query.instNo)
  ]);
});

const faceBook = computed(() => {
  return svcSns.value.find((item) => item.urlTypeCd === '200');
});
const blog = computed(() => {
  return svcSns.value.find((item) => item.urlTypeCd === '201');
});
const youtube = computed(() => {
  return svcSns.value.find((item) => item.urlTypeCd === '202');
});
const insta = computed(() => {
  return svcSns.value.find((item) => item.urlTypeCd === '204');
});
</script>

<template>
  <section class="section1">
    <div class="container">
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
            <span v-if="srvcInfo.trprCtgry != null" class="bedge-span">{{
              srvcInfo.trprCtgry
            }}</span>
          </div>
          <div class="sns-box">
            <ul>
              <li v-if="!!faceBook">
                <NuxtLink
                  :to="faceBook.urlAddr"
                  target="_blank"
                  title="페이스북 새 창 열림"
                >
                  <img
                    src="/image/sub/service/sns_facebook.svg"
                    alt="페이스북"
                  />
                </NuxtLink>
              </li>
              <li v-if="!!blog">
                <NuxtLink
                  :to="blog.urlAddr"
                  target="_blank"
                  title="네이버 블로그 새 창 열림"
                >
                  <img
                    src="/image/sub/service/sns_blog.svg"
                    alt="네이버 블로그"
                  />
                </NuxtLink>
              </li>
              <li v-if="!!youtube">
                <NuxtLink
                  :to="youtube.urlAddr"
                  target="_blank"
                  title="유튜브 새 창 열림"
                >
                  <img src="/image/sub/service/sns_youtube.svg" alt="유튜브" />
                </NuxtLink>
              </li>
              <li v-if="!!insta">
                <NuxtLink
                  :to="insta.urlAddr"
                  target="_blank"
                  title="인스타그램 새 창 열림"
                >
                  <img
                    src="/image/sub/service/sns_instagram.svg"
                    alt="인스타그램"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-middle">
          <p v-html="srvcInfo.srvcExpln"></p>
        </div>
        <div class="info-user-box">
          <strong>대상자</strong>
          <span>{{ srvcInfo.trprNm }}</span>
        </div>
        <div class="info-footer">
          <div class="left-box">
            <strong>담당기관</strong>
            <strong class="name-strong">{{
              $instNmOverride(srvcInfo.instNm, srvcInfo.instNo, srvcInfo.srvcNo)
            }}</strong>
          </div>
          <div class="right-box">
            <div class="title-box" v-if="svcUrl.length > 0">
              <strong>바로가기</strong>
            </div>
            <div class="link-box">
              <NuxtLink
                :to="item.urlAddr"
                v-for="(item, index) in svcUrl"
                :key="index"
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
        <div class="info-end-box">
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
            <li>
              <strong>대표전화</strong>
              <span>{{
                $instTelOverride(
                  telephoneNumber(srvcInfo.instTelno),
                  srvcInfo.instNo,
                  srvcInfo.srvcNo
                )
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use './scss/case';
</style>
