export type BoardConfigType = {
  bcId: number;
  bcName: string;
  bcType: string;
  instNo: string;
  bcSupportCmptDate: boolean;
  bcGroup: string;
  bcSupportNotice: boolean;
  bcNoticeEveryPage: string;
  bcSupportSecret: boolean;
  bcSupportComment: boolean;
  bcSupportAnswer: boolean;
  bcSupportRecommend: boolean;
  bcSupportThumbnail: boolean;
  bcThumbnailCrop: boolean;
  bcThumbnailWidth: number;
  bcThumbnailHeight: number;
  bcUploadFileNum: number;
  bcUploadSizeMax: number;
  bcPageSize: number;
  bcSupportNuri: boolean;
  bcSupportImage: boolean;
  bcSupportHitDay: boolean;
  bcSupportOpenDay: boolean;
  bcSupportCcl: boolean;
  bcSupportLink: boolean;
  bcSupportCaption: boolean;
  useYn: boolean;
  delYn: boolean;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
};

export type BoardTabListResultType = {
  codeId: string;
  codeName: string;
  baCnt: number;
};

//검색단어를 새로 입력했을 때 값을 저장해 둔다. 검색조건 초기화 해주려고 함
export type BoardArticleSelectKeyword = {
  selKeyword: string;
}

//공지사항, 자주찾는질문을 클릭했을 때 값을 저장해 둔다. 검색조건 초기화 해주려고 함
export type BoardArticleSelectBcId = {
  selBcId: number;
}

export type BoardArticleListQueryType = {
  page: number;
  size: number;

  bcId: number;
  startDate: string;
  endDate: string;
  baType: string;
  selectKey: string;
  keyword: string;
  baAnswerYn: string;
};

export type BoardArticleListType = {
  baId: number;
  no?: number;
  baNotice: boolean;
  baType: string;
  baTitle: string;
  baGuestName: string;
  atchFileId: string;
  adminDepartment: string;
  frstRgtrId: string;
  frstRegDt: string;
  baHit: number;
  baAnswerYn: string;
};

export type BoardArticleType = {
  baId?: number;
  bcId: number;
  baType: string;
  instNo: string;
  baTitle: string;
  baContentHtml: string;
  baContentPlain: string;
  baNotice: boolean;
  baNoticeStartdate: string;
  baNoticeEnddate: string;
  baSecret: boolean;
  baSecretPassword: string;
  baGuestName: string;
  baGuestPassword: string;
  baEmail: string;
  baIp: string;
  baHit: number;
  baRecommend: string;
  baThumb: string;
  baNuri: string;
  baStartDate: string;
  baEndDate: string;
  baThumbText: string;
  baAnswer: string;
  baCmptDate: string;
  baOperater: string;
  baCclDerivatives: string;
  baCclCommercial: string;
  baCaption: string;
  useYn: boolean;
  delYn: boolean;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
  atchFileId: string;
  asaBoardAnswer: BoardAnswerType;
};

export type BoardAnswerType = {
  baId: number;
  baTitle: string;
  baContentHtml: string;
  atchFileId: string;
  useYn: boolean;
  delYn: boolean;
  frstRgtrId: string;
  frstRegDt: string;
  lastMdfrId: string;
  lastMdfcnDt: string;
};
