import type {
  BoardArticleSelectBcId,
  BoardArticleSelectKeyword,
  BoardArticleListQueryType,
  BoardArticleListType,
  BoardArticleType,
  BoardConfigType,
  BoardTabListResultType
} from '~/types/bbs';
import type { Page } from '~/types/common';

export const DEFAULT_BOARD_CONFIG: BoardConfigType = {
  bcGroup: '',
  bcId: 0,
  bcName: '',
  bcNoticeEveryPage: '',
  bcPageSize: 0,
  bcSupportAnswer: false,
  bcSupportCaption: false,
  bcSupportCcl: false,
  bcSupportCmptDate: false,
  bcSupportComment: false,
  bcSupportHitDay: false,
  bcSupportImage: false,
  bcSupportLink: false,
  bcSupportNotice: false,
  bcSupportNuri: false,
  bcSupportOpenDay: false,
  bcSupportRecommend: false,
  bcSupportSecret: false,
  bcSupportThumbnail: false,
  bcThumbnailCrop: false,
  bcThumbnailHeight: 0,
  bcThumbnailWidth: 0,
  bcType: '',
  bcUploadFileNum: 0,
  bcUploadSizeMax: 0,
  delYn: false,
  frstRegDt: '',
  frstRgtrId: '',
  instNo: '',
  lastMdfcnDt: '',
  lastMdfrId: '',
  useYn: false
};

export const DEFAULT_BOARD_TAB: BoardTabListResultType = {
  codeId: '',
  codeName: '',
  baCnt: 0
};

export const DEFAULT_BOARD_ARTICLE_SELECT_BCID: BoardArticleSelectBcId = {
  selBcId: 100000 //초기값은 공지사항의 값으로 해준다.
}

export const DEFAULT_BOARD_ARTICLE_SELECT_KEYWORD: BoardArticleSelectKeyword = {
  selKeyword: '' //검색단어에는 초기값을 빈값으로 해준다.
}

export const DEFAULT_BOARD_ARTICLE_LIST_QUERY: BoardArticleListQueryType = {
  baType: '',
  bcId: 0,
  startDate: '',
  endDate: '',
  selectKey: '0', // 김진환 : select 초기값 설정으로 제목이 선택되어 나오게 된다
  keyword: '',
  page: 1,
  size: 10,
  baAnswerYn: ''
};

export const DEFAULT_BOARD_ARTICLE_LIST: Page<BoardArticleListType> = {
  content: [],
  totalElements: 0,
  totalPages: 0
};

export const DEFAULT_BOARD_ARTICLE: BoardArticleType = {
  bcId: 0,
  baType: '',
  baTitle: '',
  baAnswer: '',
  baCaption: '',
  baIp: '',
  baCclCommercial: '',
  baCclDerivatives: '',
  baCmptDate: '',
  baContentHtml: '',
  baContentPlain: '',
  baEmail: '',
  baEndDate: '',
  baGuestName: '',
  baGuestPassword: '',
  baHit: 0,
  baNotice: false,
  baNoticeEnddate: '',
  baNoticeStartdate: '',
  baNuri: '',
  baOperater: '',
  baRecommend: '',
  baSecret: false,
  baSecretPassword: '',
  baStartDate: '',
  baThumb: '',
  baThumbText: '',
  useYn: true,
  delYn: false,
  frstRegDt: '',
  frstRgtrId: '',
  instNo: '',
  lastMdfcnDt: '',
  lastMdfrId: '',
  atchFileId: '',
  asaBoardAnswer: {
    baContentHtml: '',
    baId: 0,
    baTitle: '',
    delYn: false,
    frstRegDt: '',
    frstRgtrId: '',
    lastMdfcnDt: '',
    lastMdfrId: '',
    atchFileId: '',
    useYn: true
  }
};
