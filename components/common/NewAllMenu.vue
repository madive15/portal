<script setup lang="ts">
import { useLoginStore } from '~/stores/login';
import { useMenuStore } from '~/stores/common/menu';

const menuStore = useMenuStore();
const { siteMap } = storeToRefs(menuStore);

const emits = defineEmits(['close', 'openAiPopup']);

function handleCloseGnb() {
  emits('close');
}

function openAiGuidePopup() {
  handleCloseGnb();
  emits('openAiPopup');
}

const loginStore = useLoginStore();
const { auth, authenticated } = storeToRefs(loginStore);

const router = useRouter();

const moveAiPage = () => {
  useAxios()
    .get('/api/login/status')
    .then(() => {
      // router.push('/ai', { external: true });
      navigateTo('/ai', { external: true });
    })
    .catch(() => {
      // router.push('/login/ai', { external: true });
      navigateTo('/login/ai', { external: true });
    });
};
</script>

<template>
  <div class="bx">
    <div class="menu-header">
      <h2 class="tit">전체메뉴</h2>
    </div>
    <div class="menu-list">
      <div class="all-item" v-for="(item, index) in siteMap" :key="index">
        <h4>{{ item.menuName }}</h4>
        <div class="menu-section-box">
          <ul>
            <li
              class="item"
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
            >
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
                <span class="text-span">
                  {{ child.menuName }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
