<script lang="ts">
import { useLoginStore } from '~/stores/login';

export default {
  name: 'LoginRequired',
  props: {
    noRedirect: {
      type: Boolean,
      default: false
    },
    redirectUrl: {
      type: String,
      default: '/login'
    }
  },
  beforeMount() {
    const router = useRouter();
    const loginStore = useLoginStore();
    const { authenticated } = storeToRefs(loginStore);

    if (!authenticated.value && !this.noRedirect) {
      router.push({
        path: this.redirectUrl,
        query: { redirect: router.currentRoute.value.fullPath },
        external: true
      });
    }
  },
  setup() {
    const loginStore = useLoginStore();
    const { authenticated } = storeToRefs(loginStore);
    return { isAuthenticated: !!authenticated.value };
  }
};
</script>

<template>
  <div v-if="isAuthenticated">
    <slot></slot>
  </div>
</template>
