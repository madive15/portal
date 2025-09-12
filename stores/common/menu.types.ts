export type BreadcrumbType = {
  menuId: string;
  menuName: string;
  menuUrl: string;
  menuUseSatisfaction: boolean;
};

export type SatisfactionType = {
  menuId: string;
  menuUseSatisfaction: boolean;
};

export type MenuGnbType = {
  menuId: string;
  upMenuId: string;
  menuName: string;
  menuUrl: string;
  menuDepth: number;
  menuOrder: number;
  menuLinkTarget: string;
  moduleNm: string;
  menuGnbUseYn: boolean;
  children: MenuGnbType[];
};
