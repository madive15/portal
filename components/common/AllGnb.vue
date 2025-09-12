<script setup lang="ts">
import { useLoginStore } from '~/stores/login';
import { useMenuStore } from '~/stores/common/menu';

const menuStore = useMenuStore();
const { siteMap } = storeToRefs(menuStore);

const emit = defineEmits(['close']);
function handleCloseGnb() {
  emit('close');
}

function openAiGuidePopup() {
  handleCloseGnb();
  emit('openAiPopup');
}

const loginStore = useLoginStore();
const { auth, authenticated } = storeToRefs(loginStore);

const router = useRouter();

const moveAiPage = () => {
  useAxios()
    .get('/api/login/status')
    .then(() => {
      router.push('/ai', { external: true });
    })
    .catch(() => {
      router.push('/login/ai', { external: true });
    });
};
</script>

<template>
  <div class="gnb-all-menu-box">
    <div class="container">
      <div class="gnb-all-menu-wrap">
        <div class="gnb-header">
          <h3>전체메뉴</h3>
        </div>
        <div class="gnb-body">
          <div class="row row-cols-4 gy-5">
            <div class="col" v-for="item in siteMap">
              <div class="all-menu-box">
                <h4>{{ item.menuName }}</h4>
                <ul>
                  <li v-for="child in item.children">
                    <a
                      v-if="child.menuUrl === '/ai'"
                      href="javascript:void(0)"
                      @click.prevent="moveAiPage"
                    >
                      <span class="disc-span" />
                      <span class="text-span">{{ child.menuName }}</span>
                    </a>
                    <a
                      v-else-if="!child.menuUrl"
                      href="javascript:void(0)"
                      @click.prevent="openAiGuidePopup"
                    >
                      <span class="disc-span" />
                      <span class="text-span">{{ child.menuName }}</span>
                    </a>
                    <NuxtLink
                      v-else
                      :to="child.menuUrl"
                      :external="true"
                      @click="handleCloseGnb"
                    >
                      <span class="disc-span" />
                      <span class="text-span">{{ child.menuName }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <button class="btn close-button" @click="handleCloseGnb">
          <img src="/image/sub/login/popup_close.svg" alt="닫기" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/AllGnb';
</style>
