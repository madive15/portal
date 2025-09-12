<script setup lang="ts">
import CommonButton from '~/components/ui/button/button.vue';
import Truncatetext from '~/components/common/truncatetext.vue';
import DropdownButton from '~/components/ui/dropdown/dropdownbutton.vue';
import Icon from '~/components/ui/icon/icon.vue';

const router = useRouter();

interface MenuItem {
  text: string;
  to: string;
}

const props = defineProps<{
  title: String;
  badge?: String;
  textLine: Number;
  content: String;
  dlDt: String;
  dlDd: String;
  link: String;
  hpUrl: String;
  menuItems: MenuItem[];
}>();

const movePage = () => {
  router.push(props.link, { external: true });
  location.href = props.link;
};

const moveHp = () => {
  location.href = props.hpUrl;
};
</script>

<template>
  <div class="card-type__basic">
    <div class="card-header">
      <h3 class="title" v-html="title"></h3>
      <span v-if="badge" class="badge-gray">{{ badge }}</span>
    </div>
    <div :class="`text-line${textLine}`">
      <Truncatetext :max-length="80" :text="content" />
    </div>
    <dl class="text-dl__dot">
      <dt>{{ dlDt }} :</dt>
      <dd><Truncatetext :max-length="80" :text="dlDd" /></dd>
    </dl>
    <div style="margin-bottom: 10px">
      <DropdownButton
        class="button-type"
        v-model="dropdownSelected"
        label="기관 관련 페이지"
      >
        <template #default="{ select }">
          <ul role="menu">
            <li>기관 관련 페이지</li>
            <li
              role="menuitem"
              tabindex="0"
              v-for="(item, index) in menuItems"
              :key="index"
            >
              <NuxtLink
                class="drop-item-link"
                :to="item.to"
                target="_blank"
                title="새 창 열림"
              >
                {{ item.text }}
              </NuxtLink>
              <img
                src="/image/sub/service/shortcut_blue.svg"
                alt="바로가기"
                class="shortcut"
              />
            </li>
          </ul>
        </template>
      </DropdownButton>
    </div>
    <div class="btn-area">
      <CommonButton
        title="자세히 보기"
        variants="primary"
        @click="movePage()"
        height="md"
      >
        <span class="text">자세히 보기</span>
      </CommonButton>
      <CommonButton title="홈페이지 바로가기" @click="moveHp()" height="md">
        <template #right-icon>
          <Icon name="shortcut" />
        </template>
        <span class="text">홈페이지 바로가기</span>
      </CommonButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
