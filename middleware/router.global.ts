import { useMenuStore } from '~/stores/common/menu';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMenuStore();
  await Promise.all([
    store.findBreadcrumbList(to.fullPath),
    store.updateAccessPage(to.fullPath)
  ]);
});
