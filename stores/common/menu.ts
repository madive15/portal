import { ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import type {
  BreadcrumbType,
  MenuGnbType,
  SatisfactionType
} from '~/stores/common/menu.types';

const DEFAULT_SATISFACTION: SatisfactionType = {
  menuId: '',
  menuUseSatisfaction: false
};

export const useMenuStore = defineStore('useMenuStore', () => {
  const breadcrumbs = ref<BreadcrumbType[]>([]);
  const gnb = ref<MenuGnbType[]>([]);
  const siteMap = ref<MenuGnbType[]>([]);
  const satisfactionInfo = ref(cloneDeep(DEFAULT_SATISFACTION));

  const updateAccessPage = (menuUrl: string) => {
    return useAxios().get('/api/accessPage', {
      params: {
        menuUrl: menuUrl.replace('#common-content', '')
      }
    });
  };

  const findBreadcrumbList = async (menuUrl: string) => {
    const url = menuUrl.replace('#common-content', '');
    const slashLastIndexOf = menuUrl.lastIndexOf('/');
    const length = menuUrl.length;

    const params = new URLSearchParams();
    if (slashLastIndexOf === length - 1) {
      params.append('menuUrl', url.substring(0, slashLastIndexOf));
    } else {
      if (
        url.startsWith('/login/') &&
        !url.startsWith('/login/ai') &&
        !url.startsWith('/login/search')
      ) {
        params.append('menuUrl', '/login');
      } else {
        params.append('menuUrl', url);
      }
    }

    const { data } = await useAxios().get('/api/menu/breadcrumbList', {
      params
    });

    breadcrumbs.value = data;
    satisfactionInfo.value = data[data.length - 1];
  };

  const findGnbList = async () => {
    const { data } = await useAxios().get('/api/menu/gnb');
    gnb.value = data;
  };

  const findSiteMapList = async () => {
    const { data } = await useAxios().get('/api/menu/siteMap');
    siteMap.value = data;
  };

  const gnbMenuList = computed(() => {
    if (!gnb.value || gnb.value.length === 0) return [];

    return gnb.value.map((topMenu, index) => {
      if (topMenu.moduleNm === 'SRVC') {
        const tabs = topMenu.children.map((secondDepth) => ({
          tabTitle: secondDepth.menuName,
          menuItems: [
            {
              items: secondDepth.children
            }
          ]
        }));

        return {
          title: topMenu.menuName,
          tabs
        };
      } else if (topMenu.moduleNm === 'LWA') {
        const tabs = topMenu.children.map((secondDepth) => {
          if (secondDepth.moduleNm === 'LWA_DSC') {
            const menuItems = (secondDepth.children || []).map(
              (thirdDepth) => ({
                subTitle: thirdDepth.menuName,
                items: thirdDepth.children || []
              })
            );

            return {
              tabTitle: secondDepth.menuName,
              menuItems
            };
          } else {
            return {
              tabTitle: secondDepth.menuName,
              menuItems: [
                {
                  items: secondDepth.children
                }
              ]
            };
          }
        });

        return {
          title: topMenu.menuName,
          tabs
        };
      } else {
        return {
          title: topMenu.menuName,
          tabs: [
            {
              tabTitle: topMenu.menuName,
              menuItems: [
                {
                  items: topMenu.children
                }
              ]
            }
          ]
        };
      }
    });
  });

  const lastIndex = computed(() =>
    breadcrumbs.value.length > 0 ? breadcrumbs.value.length : 0
  );

  const contentTitle = computed(() => {
    const title = breadcrumbs.value.filter((item) => item.menuType !== 'TAB');
    return title[title.length - 1];
  });

  const breadcrumbItems = computed(() => {
    const lastItem = breadcrumbs.value[lastIndex.value - 1];

    if (lastItem.menuUrl && lastItem.menuUrl.startsWith('/dscsn/tel/')) {
      return toRaw(cloneDeep(breadcrumbs.value))
        .splice(0, lastIndex.value - 1)
        .map((item, index) => {
          return {
            text: item.menuName,
            to: item.menuUrl,
            active: index === lastIndex.value - 2
          };
        });
    } else if (
      lastItem.menuUrl &&
      (lastItem.menuUrl.startsWith('/dscsn/') ||
        lastItem.menuUrl.startsWith('/elrcpt'))
    ) {
      return toRaw(cloneDeep(breadcrumbs.value)).map((item, index) => {
        return {
          text: item.menuName,
          to: item.menuUrl,
          active: index === lastIndex.value - 1
        };
      });
    } else {
      return toRaw(cloneDeep(breadcrumbs.value))
        .splice(0, lastIndex.value - 1)
        .map((item, index) => {
          return {
            text: item.menuName,
            to: item.menuUrl,
            active: index === lastIndex.value - 2
          };
        });
    }
  });

  const headTitle = ref(() => {
    return `${breadcrumbs.value.map(({ menuName }) => menuName).join(' > ')} | 법률구조 플랫폼`;
  });

  return {
    updateAccessPage,
    findBreadcrumbList,
    breadcrumbs,
    contentTitle,
    headTitle,
    breadcrumbItems,
    satisfactionInfo,
    findGnbList,
    gnb,
    findSiteMapList,
    siteMap,
    gnbMenuList
  };
});
