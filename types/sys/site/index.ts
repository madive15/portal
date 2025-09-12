export type SiteType = {
  siteId: string;
  siteName: string;
  siteDescription: string;
  siteDomain: string;
  siteType: '' | 'ADMIN' | 'USER';
  sitePrefix: string;
  siteLocale: string;
  siteLogo: string;
  bscUrl: string;
  lgnUrl: string;
  delYn: boolean;
  useYn: boolean;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
};
