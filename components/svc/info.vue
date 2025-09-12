<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { ref } from 'vue';
import { useSvcStore } from '~/stores/svc';
import { storeToRefs } from 'pinia';
import CommonTegBedge from "~/components/ui/tag/tagbedge.vue";

const router = useRouter();
const route = useRoute();

const svcStore = useSvcStore();
const { svcSns, svcUrl, svc, svcInfoList } = storeToRefs(svcStore);

const instNm = ref('');
const instNo = route.query.instNo as string;

const faceBook = ref('');
const blog = ref('');
const youtube = ref('');
const insta = ref('');

//관련기관 페이지
const urlList = ref([]);
const info = ref({});
onBeforeMount(async () => {
  urlList.value = [];

  await Promise.all([
    useSvcStore().searchSvcUrlList2(instNo),
    useSvcStore().searchSvcSnsList(instNo),
    useSvcStore().searchSvcInfoList(instNo)
  ]);

  info.value = svcInfoList.value[0];

  faceBook.value = svcSns.value.find((item) => item.urlTypeCd === '200');
  blog.value = svcSns.value.find((item) => item.urlTypeCd === '201');
  youtube.value = svcSns.value.find((item) => item.urlTypeCd === '202');
  insta.value = svcSns.value.find((item) => item.urlTypeCd === '204');

  urlList.value = svcUrl.value.map((item) => ({
    text: item.urlNm,
    to: item.urlAddr
  }));
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

const openMapWindow = (info) => {
  const url = `/servicetype/map?instNo=${info.instNo}`;
  window.open(url, 'serviceMapPopup', 'width=800,height=600');
};
</script>

<template>
  <section class="section1">
    <div class="container">
      <Breadcrumb
        v-model:breadcrumb-title="info.instNm"
        :showPrintButton="true"
        :breadcrumbItems="[
          { text: '서비스 제공기관' },
          { text: info.instNm, active: true }
        ]"
      />
      <div class="information-box">
        <div class="info-header">
          <div class="title-box">
            <strong>{{
              $instNmOverride(info.instNm, info.instNo, info.srvcNo)
            }}</strong>
            <common-teg-bedge :tag-bedge-text="info.comCdNm" />
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
          <p v-html="info.instInfo" />
        </div>
        <div class="info-footer">
          <div class="title-box">
            <strong>기관 관련 페이지</strong>
          </div>
          <div class="link-box">
            <NuxtLink
              :to="item.to"
              v-for="(item, index) in urlList"
              :key="`url-${index}`"
              target="_blank"
              title="새 창 열림"
              class="btn link-button"
            >
              <span class="text-span">{{ item.text }}</span>
              <span class="icon-span">
                <img src="/image/sub/service/shortcut_black.svg" alt="바로가기" />
              </span>
            </NuxtLink>
          </div>
        </div>
        <div v-if="!!info.instTelNo" class="info-end-box">
          <ul>
            <li>
              <strong>주소</strong>
              <span>{{
                $instAddrOverride(info.addr, info.instNo, info.srvcNo)
              }}</span>
            </li>
            <!--            <li class="goto-li" v-if="info.instLat && info.instLot">-->
            <!--              <button @click="openMapWindow(info)">-->
            <!--                위치보기-->
            <!--              </button>-->
            <!--            </li>-->
            <li>
              <strong>대표전화</strong>
              <span>{{
                $instTelOverride(
                  formatPhoneNumber(info.instTelNo),
                  info.instNo,
                  info.srvcNo
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
@use './scss/info';
</style>
