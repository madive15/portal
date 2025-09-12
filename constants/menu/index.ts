import type { MenuSatisResultType } from '~/types/common/menu';

export const DEFAULT_MENU_SATIS_RESULT: MenuSatisResultType = {
  menuId: '',
  siteId: '',
  menuDepth: 0,
  menuOrder: 0,
  upMenuId: '',
  menuName: '',
  menuType: '',
  menuLctn: '',
  menuUseSatisfaction: false // 만족도 사용여부
};

export const GLOBAL_NAVIGATION_MENUS = [
  {
    menuName: '플랫폼 안내',
    menuUrl: null,
    menuType: 'MENU',
    children: [
      {
        menuName: '개요',
        menuUrl: '/plt/intr',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '추진사항',
        menuUrl: '/plt/prgrs',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 제공서비스',
        menuUrl: '/plt/service',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 시스템',
        menuUrl: '/plt/system',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 참여기관',
        menuUrl: '/plt/inst',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      }
    ]
  },
  {
    menuName: '나의 서비스 찾기',
    menuUrl: null,
    menuType: 'MENU',
    children: [
      {
        menuName: '손쉬운 찾기',
        menuUrl: '/myservice/easysearch',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '손쉬운 찾기',
        menuUrl: '/myservice/lawmap',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      }
    ]
  },
  {
    menuName: '서비스 유형',
    menuUrl: null,
    menuType: 'MENU',
    children: [
      {
        menuName: '서비스 내용',
        menuUrl: '/servicetype/list',
        menuType: 'MENU',
        menuFeature: 'SERVICE',
        children: [
          {
            menuName: '법률·판례·소송 일반정보',
            menuUrl: '/servicetype/list?upCtgryNo=1010000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '법률상담 및 소송지원',
            menuUrl: '/servicetype/list?upCtgryNo=1020000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '채무조정/금융복지',
            menuUrl: '/servicetype/list?upCtgryNo=1030000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '임대차/전세사기',
            menuUrl: '/servicetype/list?upCtgryNo=1040000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '임금체불',
            menuUrl: '/servicetype/list?upCtgryNo=1050000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '범죄피해/가정·성·아동·학교폭력 피해',
            menuUrl: '/servicetype/list?upCtgryNo=1060000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '양육비/아동·청년',
            menuUrl: '/servicetype/list?upCtgryNo=1070000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '소비자/의료/환경/저작권',
            menuUrl: '/servicetype/list?upCtgryNo=1080000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '정보통신/전자거래/상사중재',
            menuUrl: '/servicetype/list?upCtgryNo=10900000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '공익사건/법교육/법률복지',
            menuUrl: '/servicetype/list?upCtgryNo=1100000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '서비스 상세',
            menuUrl: '/servicetype',
            menuType: 'PAGE',
            menuFeature: 'SERVICE'
          }
        ]
      },
      {
        menuName: '서비스 대상자',
        menuUrl: '/servicetype/list',
        menuType: 'MENU',
        children: [
          {
            menuName: '경제적 취약계층',
            menuUrl: '/servicetype/list?upCtgryNo=4010000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '사회적 취약계층',
            menuUrl: '/servicetype/list?upCtgryNo=4020000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '범죄/재해/환경 피해자',
            menuUrl: '/servicetype/list?upCtgryNo=4030000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '임차인/임대인/전세사기피해자',
            menuUrl: '/servicetype/list?upCtgryNo=4040000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '소비자/소상공인/중소기업인',
            menuUrl: '/servicetype/list?upCtgryNo=4050000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등',
            menuUrl: '/servicetype/list?upCtgryNo=4060000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '경찰/소방/제대군인/의사상자',
            menuUrl: '/servicetype/list?upCtgryNo=4070000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '예술인/농어업인/특수직업군',
            menuUrl: '/servicetype/list?upCtgryNo=4080000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '기준중위소득 125% 이하 국민',
            menuUrl: '/servicetype/list?upCtgryNo=40900000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '외국인',
            menuUrl: '/servicetype/list?upCtgryNo=4100000000',
            menuType: 'TAB',
            menuFeature: 'SERVICE'
          },
          {
            menuName: '서비스 상세',
            menuUrl: '/servicetype',
            menuType: 'PAGE',
            menuFeature: 'SERVICE'
          }
        ]
      }
    ]
  },
  {
    menuName: '서비스 제공기관',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '법률구조기관',
        menuUrl: '/servicepvsn/list?instClsfCd=001',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '정부부처 및 법원',
        menuUrl: '/servicepvsn/list?instClsfCd=002',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '지자체 산하기관',
        menuUrl: '/servicepvsn/list?instClsfCd=003',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '공공기관',
        menuUrl: '/servicepvsn/list?instClsfCd=004',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '특수법인 및 단체',
        menuUrl: '/servicepvsn/list?instClsfCd=005',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '기관상세',
        menuUrl: '/servicepvsn',
        menuType: 'PAGE',
        menuFeature: 'INST'
      }
    ]
  },
  {
    menuName: '사례/서식',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '법률상담사례',
        menuUrl: '/statuteinfo/discussion/list',
        menuType: 'MENU',
        menuFeature: 'CASE'
      },
      {
        menuName: '법률구조사례',
        menuUrl: '/statuteinfo/legalaid/list',
        menuType: 'MENU',
        menuFeature: 'CASE'
      },
      {
        menuName: '서식(법원 소송안내마당)',
        menuUrl: '/statuteinfo/template/supremecourt/list',
        menuType: 'MENU',
        menuFeature: 'TMPLT'
      },
      {
        menuName: '대한법률구조공단서식',
        menuUrl: '/statuteinfo/template/korea/list',
        menuType: 'MENU',
        menuFeature: 'TMPLT'
      }
    ]
  }
];

const SITE_MAP_MENUS = [
  {
    menuName: '플랫폼 안내',
    menuUrl: null,
    menuType: 'MENU',
    children: [
      {
        menuName: '개요',
        menuUrl: '/plt/intr',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '추진사항',
        menuUrl: '/plt/prgrs',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 제공서비스',
        menuUrl: '/plt/service',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 시스템',
        menuUrl: '/plt/system',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '플랫폼 참여기관',
        menuUrl: '/plt/inst',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      }
    ]
  },
  {
    menuName: '나의 서비스 찾기',
    menuUrl: null,
    menuType: 'MENU',
    children: [
      {
        menuName: '손쉬운 찾기',
        menuUrl: '/myservice/easysearch',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '손쉬운 찾기',
        menuUrl: '/myservice/lawmap',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      }
    ]
  },
  {
    menuName: '서비스 내용',
    menuUrl: '/servicetype/list',
    menuType: 'MENU',
    menuFeature: 'SERVICE',
    children: [
      {
        menuName: '법률·판례·소송 일반정보',
        menuUrl: '/servicetype/list?upCtgryNo=1010000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '법률상담 및 소송지원',
        menuUrl: '/servicetype/list?upCtgryNo=1020000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '채무조정/금융복지',
        menuUrl: '/servicetype/list?upCtgryNo=1030000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '임대차/전세사기',
        menuUrl: '/servicetype/list?upCtgryNo=1040000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '임금체불',
        menuUrl: '/servicetype/list?upCtgryNo=1050000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '범죄피해/가정·성·아동·학교폭력 피해',
        menuUrl: '/servicetype/list?upCtgryNo=1060000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '양육비/아동·청년',
        menuUrl: '/servicetype/list?upCtgryNo=1070000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '소비자/의료/환경/저작권',
        menuUrl: '/servicetype/list?upCtgryNo=1080000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '정보통신/전자거래/상사중재',
        menuUrl: '/servicetype/list?upCtgryNo=10900000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '공익사건/법교육/법률복지',
        menuUrl: '/servicetype/list?upCtgryNo=1100000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      }
    ]
  },
  {
    menuName: '서비스 대상자',
    menuUrl: '/servicetype/list',
    menuType: 'MENU',
    children: [
      {
        menuName: '경제적 취약계층',
        menuUrl: '/servicetype/list?upCtgryNo=4010000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '사회적 취약계층',
        menuUrl: '/servicetype/list?upCtgryNo=4020000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '범죄/재해/환경 피해자',
        menuUrl: '/servicetype/list?upCtgryNo=4030000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '임차인/임대인/전세사기피해자',
        menuUrl: '/servicetype/list?upCtgryNo=4040000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '소비자/소상공인/중소기업인',
        menuUrl: '/servicetype/list?upCtgryNo=4050000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등',
        menuUrl: '/servicetype/list?upCtgryNo=4060000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '경찰/소방/제대군인/의사상자',
        menuUrl: '/servicetype/list?upCtgryNo=4070000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '예술인/농어업인/특수직업군',
        menuUrl: '/servicetype/list?upCtgryNo=4080000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '기준중위소득 125% 이하 국민',
        menuUrl: '/servicetype/list?upCtgryNo=40900000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      },
      {
        menuName: '외국인',
        menuUrl: '/servicetype/list?upCtgryNo=4100000000',
        menuType: 'TAB',
        menuFeature: 'SERVICE'
      }
    ]
  },
  {
    menuName: '서비스 제공기관',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '법률구조기관',
        menuUrl: '/servicepvsn/list?instClsfCd=001',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '정부부처 및 법원',
        menuUrl: '/servicepvsn/list?instClsfCd=002',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '지자체 산하기관',
        menuUrl: '/servicepvsn/list?instClsfCd=003',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '공공기관',
        menuUrl: '/servicepvsn/list?instClsfCd=004',
        menuType: 'TAB',
        menuFeature: 'INST'
      },
      {
        menuName: '특수법인 및 단체',
        menuUrl: '/servicepvsn/list?instClsfCd=005',
        menuType: 'TAB',
        menuFeature: 'INST'
      }
    ]
  },
  {
    menuName: '사례/서식',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '법률상담사례',
        menuUrl: '/statuteinfo/discussion/list',
        menuType: 'MENU',
        menuFeature: 'CASE'
      },
      {
        menuName: '법률구조사례',
        menuUrl: '/statuteinfo/legalaid/list',
        menuType: 'MENU',
        menuFeature: 'CASE'
      },
      {
        menuName: '서식(법원 소송안내마당)',
        menuUrl: '/statuteinfo/template/supremecourt/list',
        menuType: 'MENU',
        menuFeature: 'TMPLT'
      },
      {
        menuName: '대한법률구조공단서식',
        menuUrl: '/statuteinfo/template/korea/list',
        menuType: 'MENU',
        menuFeature: 'TMPLT'
      }
    ]
  },
  {
    menuName: '고객센터',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '공지사항',
        menuUrl: '/center/ntc/list',
        menuType: 'MENU',
        menuFeature: 'LIST'
      },
      {
        menuName: '자주 찾는 질문',
        menuUrl: '/center/faq/list',
        menuType: 'MENU',
        menuFeature: 'LIST'
      },
      {
        menuName: '시스템 이용 문의',
        menuUrl: '/center/qna',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '이용안내',
        menuUrl: '/center/gd',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      }
    ]
  },
  {
    menuName: '마이페이지',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '나의 문의내역',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '비밀번호 변경',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '회원정보수정',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '회원탈퇴',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      }
    ]
  },
  {
    menuName: '이용안내',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '이용약관',
        menuUrl: '/trms',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: '개인정보처리방침',
        menuUrl: '/prvc',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '시스템 이용문의',
        menuUrl: '/center/qna',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      },
      {
        menuName: '저작권정책',
        menuUrl: '/copyright',
        menuType: 'MENU',
        menuFeature: 'CONTENTS'
      }
    ]
  },
  {
    menuName: 'AI 검색 서비스',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '생성형 AI 검색',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      },
      {
        menuName: 'AI 검색 이용안내',
        menuUrl: '',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      }
    ]
  },
  {
    menuName: 'AI 검색 서비스',
    menuUrl: null,
    menuType: 'MENU',
    menuFeature: 'PAGE',
    children: [
      {
        menuName: '통합검색',
        menuUrl: '/search/basicresult',
        menuType: 'MENU',
        menuFeature: 'PAGE'
      }
    ]
  }
];
