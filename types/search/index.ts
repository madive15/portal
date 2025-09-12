export type SearchResponseType = {
  errorCode: number;
  realSize: number;
  totalSize: number;
  groupResult: object;
  resultDocuments: object;

  status: number;
  returnCode: number;
  resultFieldSize: number;
  error: object;
};

export type SearchMainType = {
  searchQuery: string;
  reSearchQuery: string[];
};

export type KeywordType = {
  dqId: string;
  trendId: string;
  keyword: string;
  rank: number;
  prevRank: number;
  weight: number;
}

export type MenuType = {
  dqId: string;
  gbn: string;
  menuName: string;
  menuLctn: string;
  menuUrl: string;
}

export type SearchGroupType = {
  groupResultSize: number;
  type: number;
  ids: string[];
  values: number[];
  labels: SearchGroupLabelType[];
};

export type SearchGroupLabelType = {
  id: string;
  label: string;
  value: number;
  checked: boolean;
};

export type SearchGroupListType = {
  groupList: SearchGroupType[]
}