<script setup lang="ts">
import Truncatetext from '~/components/common/truncatetext.vue';
import CommonButton from '~/components/ui/button/button.vue';
import Icon from '~/components/ui/icon/icon.vue';
import CommonTitle from '~/components/ui/title/title.vue';
const router = useRouter();

const props = defineProps<{
  title: String;
  badge?: String;
  textLine: Number;
  content: String;
  dlDt: String;
  dlDd: String;
  dlDt2: String;
  dlDd2: String;
  link: String;
}>();

const movePage = () => {
  router.push(props.link, { external: true });
};
</script>

<template>
  <div class="card-type__basic">
    <div class="card-header">
      <CommonTitle tag="h3" class="title" v-html="title"></CommonTitle>
      <span v-if="badge" class="badge-single">{{ badge }}</span>
    </div>
    <div :class="`text-line${textLine}`">
      <Truncatetext :max-length="80" :text="content" />
    </div>
    <ul class="text-dl_area">
      <li class="text-dl" v-if="!!dlDd">
        <strong>{{ dlDt }} :</strong>
        <span>{{ dlDd }}</span>
      </li>
      <li class="text-dl" v-if="!!dlDd2">
        <strong>{{ dlDt2 }} :</strong>
        <span>{{ dlDd2 }}</span>
      </li>
    </ul>

    <div class="btn-area">
      <CommonButton width="xl" height="md" @click="movePage" title="자세히 보기"
        >자세히 보기<template #right-icon> <Icon name="arrowRight" /> </template
      ></CommonButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
