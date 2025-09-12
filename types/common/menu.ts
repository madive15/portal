export type UserMenuInfoType = {
  menuName: string;
  menuUrl: string;
  menuDescription: string;
  menuLinkTarget: 'CURRENT' | 'BLANK';
  menuUseSatisfaction: boolean;
  menuUseMngInfo: boolean;

  children: UserMenuInfoType[];
  locations: UserMenuInfoType[];
  tabs: UserMenuInfoType[];
};

export type MenuSatisResultType = {
  menuId: string;
  siteId: string;
  menuDepth: number;
  menuOrder: number;
  upMenuId: string;
  menuName: string;
  menuType: string;
  menuLctn: string;
  menuUseSatisfaction: boolean; // 만족도 사용여부
  menuMngId: string;
};
