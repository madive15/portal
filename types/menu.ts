/*
 * 노출 구분
 * public: 공개
 * hidden: 숨김
 * locked:
 * */
export type MenuStatus = 'public' | 'hidden' | 'locked';

export type Menu = {
  menuId: string;
  menuName: string;
  menuType: string;
  menuGnbType: string;
  menuGnbExtOn: string;
  menuGnbExtOff: string;
  menuSnbType: string;
  menuSnbExtOn: string;
  menuSnbExtOff: string;
  menuTitleType: string;
  menuTitleExt: string;
  menuTitleSubText: string;
  menuLink: string;
  menuNewWin: number; // 1 새창 | 0: 현재창
  menuParent: string;
  menuChildrenTabmn: boolean;
  menuDepth: number;
  menuOrder: number;
  menuStatus: MenuStatus;
  menuUseManagerInfo: string;
  menuManager: string;
  menuDepartment: string;
  menuPhone: string;
  menuEmail: string;
  menuEtc: string;
  menuRegdate: string;
  menuUseSatisfaction: string;
  menuLastModified: string;
  menuLocation: string;
  siteId: string;
  tagCode: string;
  children: Menu[];
};
