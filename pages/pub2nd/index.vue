<script setup lang="ts">
definePageMeta({
  layout: 'guide'
});

const columns = [
  {
    title: 'idx',
    dataIndex: 'key'
  },
  {
    title: '대분류',
    dataIndex: 'main'
  },
  {
    title: '중분류',
    dataIndex: 'div'
  },
  {
    title: '소분류',
    dataIndex: 'sub'
  },
  {
    title: '경로',
    dataIndex: 'address'
  },
  {
    title: '컴포넌트',
    dataIndex: 'component'
  },
  {
    title: '완료',
    dataIndex: 'comp'
  }
];

const data = [
  {
    key: 'Any_ID',
    main: '상담',
    div: '법률구조 플랫폼 사용자 로그인',
    sub: '로그인&본인 인증 화면 (Any ID)',
    address: 'publish_Any_ID',
    component: '없음',
    comp: '완료'
  },
  {
    key: 'COMMON_UI',
    main: '상담',
    div: '대한법률구조공단 면접상담',
    sub: '개인정보 수집 동의_공통 UI 정의',
    address: 'publish_COMMON_UI',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_001',
    main: '상담',
    div: '면접상담',
    sub: '면접상담',
    address: 'publish_LASP_CON_001',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_002',
    main: '상담',
    div: '화상상담',
    sub: '화상상담',
    address: 'publish_LASP_CON_002',
    component: '적용',
    comp: '디자인 확인중'
  },
  {
    key: 'LASP_CON_003',
    main: '상담',
    div: '전화상담',
    sub: '전화상담',
    address: 'publish_LASP_CON_003',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_004',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담',
    address: 'publish_LASP_CON_004',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_005',
    main: '상담',
    div: '법률상담 기관',
    sub: '상담기관_대한법률구조공단',
    address: 'publish_LASP_CON_005',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_006',
    main: '상담',
    div: '대한법률구조공단 전화상담 안내',
    sub: '전화상담_대한법률구조공단 안내 페이지',
    address: 'publish_LASP_CON_006',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_007',
    main: '상담',
    div: '법률상담 기관',
    sub: '상담기관_한국가정법률상담소',
    address: 'publish_LASP_CON_007',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_008',
    main: '상담',
    div: '법률상담 기관',
    sub: '상담기관_대한가정법률복지상담원',
    address: 'publish_LASP_CON_008',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_009',
    main: '상담',
    div: '법률상담 기관',
    sub: '상담기관_법률홈닥터',
    address: 'publish_LASP_CON_009',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_010',
    main: '상담',
    div: '법률홈닥터 전화상담 안내',
    sub: '전화상담_법률홈닥터 안내 페이지',
    address: 'publish_LASP_CON_010',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_011',
    main: '상담',
    div: '양육비 상담',
    sub: '양육비 상담',
    address: 'publish_LASP_CON_011',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_012',
    main: '상담',
    div: '신용회복 상담',
    sub: '신용회복 상담',
    address: 'publish_LASP_CON_012',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_013',
    main: '상담',
    div: '서을/경기도 금융복지상담 상담',
    sub: '서을/경기도 금융복지상담 상담',
    address: 'publish_LASP_CON_013',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_014',
    main: '상담',
    div: '상사중재 관련 상담',
    sub: '상사중재 관련 상담',
    address: 'publish_LASP_CON_014',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_015',
    main: '상담',
    div: '면접상담',
    sub: '(통합)면접상담 예약',
    address: 'publish_LASP_CON_015',
    component: '적용',
    comp: '완료'
  },
  // {
  //   key: '15',
  //   main: '상담',
  //   div: '면접상담',
  //   sub: '(기관)면접&전화상담 예약',
  //   address: 'publish_counsel_0015',
  //    component: '',
  //   comp: ''
  // },
  {
    key: 'LASP_CON_016',
    main: '상담',
    div: '화상상담',
    sub: '(통합)화상상담 예약',
    address: 'publish_LASP_CON_016',
    component: '적용',
    comp: '완료'
  },
  // {
  //   key: '17',
  //   main: '상담',
  //   div: '화상상담',
  //   sub: '(기관)화상상담 예약',
  //   address: 'publish_counsel_0017',
  //   component: '',
  //   comp: ''
  // },
  {
    key: 'LASP_CON_020',
    main: '상담',
    div: '개인정보 제공 이용·동의 안내 (필수사항)',
    sub: '개인정보 수집 동의_대한법률구조공단',
    address: 'publish_LASP_CON_020',
    component: '적용',
    comp: '내용추후 수정필요'
  },
  {
    key: 'LASP_CON_021',
    main: '상담',
    div: '개인정보 제공 이용·동의 안내 (필수사항)',
    sub: '개인정보 수집 동의_한국가정법률상담소',
    address: 'publish_LASP_CON_021',
    component: '적용',
    comp: '내용추후 수정필요'
  },
  {
    key: 'LASP_CON_022',
    main: '상담',
    div: '개인정보 제공 이용·동의 안내 (필수사항)',
    sub: '개인정보 수집 동의_대한가정법률복지상담원',
    address: 'publish_LASP_CON_022',
    component: '적용',
    comp: '내용추후 수정필요'
  },
  {
    key: 'LASP_CON_023',
    main: '상담',
    div: '개인정보 제공 이용·동의 안내 (필수사항)',
    sub: '개인정보 수집 동의_법률홈닥터',
    address: 'publish_LASP_CON_023',
    component: '적용',
    comp: '내용추후 수정필요'
  },
  {
    key: 'LASP_CON_024',
    main: '상담',
    div: '면접상담',
    sub: '면접/화상상담 입력폼_대한법률구조공단',
    address: 'publish_LASP_CON_024',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_025',
    main: '상담',
    div: '면접상담',
    sub: '면접/화상상담 입력폼_한국가정법률상담소_부부상담',
    address: 'publish_LASP_CON_025',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_026',
    main: '상담',
    div: '면접상담',
    sub: '면접/화상상담 입력폼_한국가정법률상담소_그외 상담',
    address: 'publish_LASP_CON_026',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_027',
    main: '상담',
    div: '면접상담',
    sub: '면접/화상상담 입력폼_대한가정법률복지상담원',
    address: 'publish_LASP_CON_027',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_028',
    main: '상담',
    div: '면접상담',
    sub: '면접/화상/전화 상담 입력폼_법률홈닥터',
    address: 'publish_LASP_CON_028',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_029',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담 입력폼_대한법률구조공단',
    address: 'publish_LASP_CON_029',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_030',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담 입력폼_대한법률구조공단(국외)',
    address: 'publish_LASP_CON_030',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_031',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담 입력폼_한국가정법률상담소',
    address: 'publish_LASP_CON_031',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_032',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담 입력폼_대한가정법률복지상담원',
    address: 'publish_LASP_CON_032',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_033',
    main: '상담',
    div: '면접상담',
    sub: '면접상담 예약 완료',
    address: 'publish_LASP_CON_033',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_034',
    main: '상담',
    div: '화상상담',
    sub: '화상상담 예약 완료',
    address: 'publish_LASP_CON_034',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_CON_035',
    main: '상담',
    div: '사이버상담',
    sub: '사이버상담 신청 완료',
    address: 'publish_LASP_CON_035',
    component: '적용',
    comp: '완료'
  }
];

const data2 = [
  {
    key: 'LASP_ELE_012',
    main: '접수',
    div: '건강보험납입조회',
    sub: '전자접수시스템 구비서류 전자증명서 제출안내 [팝업]',
    address: 'publish_LASP_ELE_012',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_024',
    main: '접수',
    div: '건강보험납입조회',
    sub: '나의 서식 목록 [팝업]',
    address: 'publish_LASP_MYP_024',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_001',
    main: '접수',
    div: '전자접수안내',
    sub: '전자접수안내',
    address: 'publish_LASP_ELE_001',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_002',
    main: '접수',
    div: '전자접수이용절차',
    sub: '전자접수이용절차',
    address: 'publish_LASP_ELE_001',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_003',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청',
    address: 'publish_LASP_ELE_003',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_004',
    main: '접수',
    div: '전자접수신청',
    sub: '구조대상자유형 [팝업]',
    address: 'publish_LASP_ELE_004',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_005',
    main: '접수',
    div: '전자접수신청',
    sub: '기준중위소득확인 [팝업]',
    address: 'publish_LASP_ELE_005',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_006',
    main: '접수',
    div: '전자접수신청',
    sub: '건강보험 납입조회 [팝업]',
    address: 'publish_LASP_ELE_006',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_007',
    main: '접수',
    div: '전자접수신청',
    sub: '가구당 월평균 소득(직장가입자) [팝업]',
    address: 'publish_LASP_ELE_007',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_008',
    main: '접수',
    div: '전자접수신청',
    sub: '지역가입자 또는 건강보험 미가입자 계산하기 [팝업]',
    address: 'publish_LASP_ELE_008',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_009',
    main: '접수',
    div: '전자접수신청',
    sub: '건강보험 납입조회결과 [팝업]',
    address: 'publish_LASP_ELE_009',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_010',
    main: '접수',
    div: '전자접수신청',
    sub: '지역 건강보험 납입조회결과 [팝업]',
    address: 'publish_LASP_ELE_010',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_014',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_한국가정법률상담소_동의',
    address: 'publish_LASP_ELE_014_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_014',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_한국가정법률상담소_신청',
    address: 'publish_LASP_ELE_014_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_015',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한가정법률복지상담원_동의',
    address: 'publish_LASP_ELE_015_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_015',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한가정법률복지상담원_신청',
    address: 'publish_LASP_ELE_015_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_016',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한변협법률구조재단_동의',
    address: 'publish_LASP_ELE_016_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_016',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한변협법률구조재단_신청',
    address: 'publish_LASP_ELE_016_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_017',
    main: '접수',
    div: '전자접수신청',
    sub: '재산관계진술서 작성시 유의사항 [팝업]',
    address: 'publish_LASP_ELE_017',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_011',
    main: '접수',
    div: '전자접수신청',
    sub: '법률구조신청_대한법률구조공단_동의',
    address: 'publish_LASP_ELE_011_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_011',
    main: '접수',
    div: '전자접수신청',
    sub: '법률구조신청_대한법률구조공단_신청',
    address: 'publish_LASP_ELE_011_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_018',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한법률구조공단(전자접수)',
    address: 'publish_LASP_ELE_018_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_019',
    main: '접수',
    div: '전자접수신청',
    sub: '행정정보 공동이용동의 [팝업]',
    address: 'publish_LASP_ELE_019',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_018',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청완료',
    address: 'publish_LASP_ELE_018_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_019',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한변협법률구조재단(성폭력피해자)',
    address: 'publish_LASP_ELE_019_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_020',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한상사중재원_동의',
    address: 'publish_LASP_ELE_020_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_020',
    main: '접수',
    div: '전자접수신청',
    sub: '전자접수신청_대한상사중재원(국내알선)_신청',
    address: 'publish_LASP_ELE_020_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_025_01',
    main: '고객센터',
    div: '만족도 설문조사',
    sub: '만족도 설문조사',
    address: 'publish_LASP_ELE_025_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_025_02',
    main: '고객센터',
    div: '만족도 설문조사',
    sub: '만족도 설문조사',
    address: 'publish_LASP_ELE_025_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_026_01',
    main: '고객센터',
    div: '만족도 설문조사',
    sub: '만족도 설문조사 팝업, 통계',
    address: 'publish_LASP_ELE_026_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_ELE_026_02',
    main: '고객센터',
    div: '만족도 설문조사',
    sub: '만족도 설문조사, 통계',
    address: 'publish_LASP_ELE_026_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_000',
    main: '접수',
    div: '전자접수 신청',
    sub: '전자증명서(전자지갑) 내증명서 [팝업]',
    address: 'publish_LASP_WLT_000',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_002',
    main: '접수',
    div: '전자접수 신청',
    sub: '주민등록등본 발급신청 [팝업]',
    address: 'publish_LASP_WLT_002',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_004',
    main: '접수',
    div: '전자접수 신청',
    sub: '주민등록표등본 [팝업]',
    address: 'publish_LASP_WLT_004',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_005',
    main: '접수',
    div: '전자접수 신청',
    sub: '한부모가정증명서 [팝업]',
    address: 'publish_LASP_WLT_005',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_006',
    main: '접수',
    div: '전자접수 신청',
    sub: '국민기초생활수급자증명서 [팝업]',
    address: 'publish_LASP_WLT_006',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_007',
    main: '접수',
    div: '전자접수 신청',
    sub: '국가 유공자(유족또는가족)확인서 [팝업]',
    address: 'publish_LASP_WLT_007',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_008',
    main: '접수',
    div: '전자접수 신청',
    sub: '국가 유공자(유족또는가족)확인서 [팝업]',
    address: 'publish_LASP_WLT_008',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_009',
    main: '접수',
    div: '전자접수 신청',
    sub: '부가가치세과세표준증명 [팝업]',
    address: 'publish_LASP_WLT_009',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_WLT_010',
    main: '접수',
    div: '전자접수 신청',
    sub: '부가가치세사업자수입금액 [팝업]',
    address: 'publish_LASP_WLT_010',
    component: '적용',
    comp: '완료'
  }
];

const data3 = [
  {
    key: 'LASP_MYP_010',
    main: '마이페이지',
    div: '마이페이지',
    sub: '서브메인',
    address: 'publish_LASP_MYP_010',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_011',
    main: '마이페이지',
    div: '상담예약',
    sub: '상담예약 내역',
    address: 'publish_LASP_MYP_011',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_012',
    main: '마이페이지',
    div: '상담예약',
    sub: '예약상세_상담전(공통)',
    address: 'publish_LASP_MYP_012',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_027', // 06-23 화면 ID 수정 (v.0.2.2)
    main: '마이페이지',
    div: '상담예약',
    sub: '상담예약시간 변경 [팝업]',
    address: 'publish_LASP_MYP_027',
    component: '적용',
    comp: '완료'
  },

  {
    key: 'LASP_MYP_012',
    main: '마이페이지',
    div: '상담예약',
    sub: '예약상세_상담완료',
    address: 'publish_LASP_MYP_012_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_015',
    main: '마이페이지',
    div: '사이버상담',
    sub: '사이버상담 내역',
    address: 'publish_LASP_MYP_015',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_016',
    main: '마이페이지',
    div: '사이버상담',
    sub: '사이버상담 문의 상세_수정 가능 상태',
    address: 'publish_LASP_MYP_016',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_017',
    main: '마이페이지',
    div: '사이버상담',
    sub: '사이버상담 문의 상세_수정 불가 상태',
    address: 'publish_LASP_MYP_017',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_028', // 06-23 화면 ID 수정 (v.0.2.2)
    main: '마이페이지',
    div: '마이페이지',
    sub: '마이페이지(본인인증)',
    address: 'publish_LASP_MYP_028',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_029', // 06-23 화면 ID 수정 (v.0.2.2)
    main: '마이페이지',
    div: '마이페이지',
    sub: '마이페이지(비회원)',
    address: 'publish_LASP_MYP_029',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_014',
    main: '마이페이지',
    div: '전자접수현황',
    sub: '전자접수신청목록',
    address: 'publish_LASP_MYP_014',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_018',
    main: '마이페이지',
    div: '전자접수 신청 상세 ',
    sub: '전자접수 신청 상세_사건/대상자정보탭',
    address: 'publish_LASP_MYP_018',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_019',
    main: '마이페이지',
    div: '전자접수 신청 상세 ',
    sub: '전자접수 신청 상세_신청정보탭',
    address: 'publish_LASP_MYP_018',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_020',
    main: '마이페이지',
    div: '전자접수현황',
    sub: '전자접수심사 [팝업]',
    address: 'publish_LASP_MYP_020',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_021',
    main: '마이페이지',
    div: '전자접수 신청 상세 ',
    sub: '전자접수 신청 상세_보완요청탭',
    address: 'publish_LASP_MYP_018',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_022',
    main: '마이페이지',
    div: '전자접수 신청 상세 ',
    sub: '전자접수상세_보완요청상세 [팝업]',
    address: 'publish_LASP_MYP_022',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_023',
    main: '마이페이지',
    div: '전자접수 신청 상세 ',
    sub: '전자접수 신청 진행/종결정보탭',
    address: 'publish_LASP_MYP_018',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_014',
    main: '마이페이지',
    div: '나의 서류관리',
    sub: '나의서류목록',
    address: 'publish_LASP_MYP_024_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_025',
    main: '마이페이지',
    div: '나의 서류관리',
    sub: '나의서류등록',
    address: 'publish_LASP_MYP_025',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'LASP_MYP_026',
    main: '마이페이지',
    div: '나의 서류관리',
    sub: '나의서류수정(상세)',
    address: 'publish_LASP_MYP_025_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_001',
    main: '마이페이지',
    div: '업무지원시스템',
    sub: '전자송달문서발송목록',
    address: 'publish_BSC_SYS_001',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_002',
    main: '마이페이지',
    div: '업무지원시스템',
    sub: '전자송달발송 [팝업]',
    address: 'publish_BSC_SYS_002',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_003',
    main: '마이페이지',
    div: '전자송달발송',
    sub: '서식 미리보기 [팝업]',
    address: 'publish_BSC_SYS_003',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_006',
    main: '마이페이지',
    div: '업무지원시스템',
    sub: '문자발송목록',
    address: 'publish_BSC_SYS_006',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_007',
    main: '마이페이지',
    div: '문자발송목록',
    sub: '문자발송 [팝업]',
    address: 'publish_BSC_SYS_007',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_012',
    main: '이첩관리',
    div: '이첩목록',
    sub: '이첩목록',
    address: 'publish_BSC_SYS_012',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_013',
    main: '이첩관리',
    div: '이첩목록',
    sub: '이첩등록',
    address: 'publish_BSC_SYS_013',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_014',
    main: '이첩관리',
    div: '이첩목록',
    sub: '이첩상세',
    address: 'publish_BSC_SYS_014',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_015_01',
    main: '플랫폼 정보 매핑',
    div: '사건정보매핑',
    sub: '사건정보매핑',
    address: 'publish_BSC_SYS_015_01',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_015_02',
    main: '플랫폼 정보 매핑',
    div: '사건정보매핑',
    sub: '사건정보매핑',
    address: 'publish_BSC_SYS_015_02',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_016',
    main: '플랫폼 정보 매핑',
    div: '구조대상자매핑',
    sub: '구조대상자매핑',
    address: 'publish_BSC_SYS_016',
    component: '적용',
    comp: '완료'
  },
  {
    key: 'BSC_SYS_017',
    main: '플랫폼 정보 매핑',
    div: '공통코드매핑',
    sub: '공통코드매핑',
    address: 'publish_BSC_SYS_017',
    component: '적용',
    comp: '완료'
  }
];

const data4 = [
  {
    key: 'Chatbot',
    main: '챗봇',
    div: '챗봇',
    sub: '챗봇',
    address: 'publish_Chatbot',
    component: 'html로 전달',
    comp: '완료'
  },
  {
    key: 'MAIN',
    main: '메인',
    div: '메인',
    sub: '메인',
    address: 'publish_MAIN',
    component: '없음',
    comp: '완료'
  },
  {
    key: 'MAIN_HEADER',
    main: '메인',
    div: '헤더',
    sub: '헤더',
    address: 'publish_MAIN_Header',
    component: 'Header',
    comp: '완료'
  },
  {
    key: 'AI_MAIN',
    main: 'AI 메인',
    div: 'AI 메인',
    sub: '메인',
    address: 'publish_AI_MAIN',
    component: '없음',
    comp: ''
  },
  {
    key: 'AI_SUBMAIN_01',
    main: 'AI 서브메인',
    div: 'AI 서브메인',
    sub: '법률지원서비스 찾기',
    address: 'publish_AI_SUBMAIN_01',
    component: '없음',
    comp: ''
  },
  {
    key: 'AI_SUBMAIN_02',
    main: 'AI 서브메인',
    div: 'AI 서브메인',
    sub: '궁금한 법령 쉽게 찾기',
    address: 'publish_AI_SUBMAIN_02',
    component: '없음',
    comp: ''
  },
  {
    key: 'AI_DETAIL',
    main: 'AI',
    div: 'AI',
    sub: '상세',
    address: 'publish_AI_DETAIL',
    component: '없음',
    comp: ''
  }
];
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 2차 퍼블리싱 현황판</h1>

    <div class="box-item">
      <div class="box-tit-h3">📁 상담</div>
      <a-table :columns="columns" :data-source="data" bordered>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'address'">
            <router-link :to="`/pub2nd/${text}`" target="_blank">{{
              text
            }}</router-link>
          </template>
        </template>
      </a-table>
      <div class="box-tit-h3">📁 접수</div>
      <a-table :columns="columns" :data-source="data2" bordered>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'address'">
            <router-link :to="`/pub2nd/${text}`" target="_blank">{{
              text
            }}</router-link>
          </template>
        </template>
      </a-table>
      <div class="box-tit-h3">📁 마이페이지</div>
      <a-table :columns="columns" :data-source="data3" bordered>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'address'">
            <router-link :to="`/pub2nd/${text}`" target="_blank">{{
              text
            }}</router-link>
          </template>
        </template>
      </a-table>
      <div class="box-tit-h3">📁 챗봇 & 기타</div>
      <a-table :columns="columns" :data-source="data4" bordered>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'address'">
            <router-link :to="`/pub2nd/${text}`" target="_blank">{{
              text
            }}</router-link>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
