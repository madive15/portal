import { useLoginStore } from '~/stores/login';
import { useMenuStore } from '~/stores/common/menu';

export default defineNuxtPlugin(async (nuxtApp) => {
  const menuStore = useMenuStore();
  const loginStore = useLoginStore();
  try {
    await Promise.all([
      loginStore.loadAuthorized(),
      menuStore.findGnbList(),
      menuStore.findSiteMapList()
    ]);
  } catch (e) {}
  const { authenticated } = storeToRefs(loginStore);

  const router = useRouter();

  router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/ai') && !authenticated.value) {
      next('/');
      return;
    }

    next();
  });

  router.afterEach((to, from) => {
    if (to.path != from.path && document.querySelector('a') != null) {
      document.querySelector('a').parentElement.setAttribute('tabindex', '0');
      document.querySelector('a').parentElement.focus();
    } else document.body.focus();
  });
});
