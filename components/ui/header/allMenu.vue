<script setup lang="ts">
import CommonTitle from '~/components/ui/title/title.vue';
import { ref } from 'vue';
interface SubMenu {
  subTitle?: string;
  items: string[];
  underTitle?: string;
}
interface MenuCategory {
  title: string;
  sub: SubMenu[]; // 서브탭 구조로 변경
}
const menuList = ref<MenuCategory[]>([
  {
    title: '플랫폼 안내',
    sub: [
      {
        items: [
          { name: '개요', linkUrl: '#' },
          { name: '추진사항', linkUrl: '#' },
          { name: '플랫폼제공서비스', linkUrl: '#' },
          { name: '플랫폼 시스템', linkUrl: '#' },
          { name: '플랫폼 참여기관', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '나의 서비스찾기',
    sub: [
      {
        items: [
          { name: '손쉬운찾기', linkUrl: '#' },
          { name: '법률복지지도', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '서비스 내용',
    sub: [
      {
        items: [
          { name: '법률·판례·소송 일반정보', linkUrl: '#' },
          { name: '법률상담 및 소송지원', linkUrl: '#' },
          { name: '채무조정/금융복지', linkUrl: '#' },
          { name: '임대차/전세사기', linkUrl: '#' },
          { name: '임금체불', linkUrl: '#' },
          { name: '범죄피해/가정·성·아동·학교폭력 피해', linkUrl: '#' },
          { name: '양육비/아동·청년', linkUrl: '#' },
          { name: '소비자/의료/환경/저작권', linkUrl: '#' },
          { name: '정보통신/전자거래/상사중재', linkUrl: '#' },
          { name: '공익사건/법교육/법률복지', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '서비스 대상자',
    sub: [
      {
        items: [
          { name: '경제적 취약계층', linkUrl: '#' },
          { name: '사회적 취약계층', linkUrl: '#' },
          { name: '범죄/재해/환경 피해자', linkUrl: '#' },
          { name: '임차인/임대인/전세사기피해자', linkUrl: '#' },
          { name: '소비자/소상공인/중소기업인', linkUrl: '#' },
          {
            name: '국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등',
            linkUrl: '#'
          },
          { name: '경찰/소방/제대군인/의사상자', linkUrl: '#' },
          { name: '예술인/농어업인/특수직업군', linkUrl: '#' },
          { name: '기준중위소득 125% 이하 국민', linkUrl: '#' },
          { name: '외국인', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '서비스제공기관',
    sub: [
      {
        items: [
          { name: '법률구조기관', linkUrl: '#' },
          { name: '정부부처 및 법원', linkUrl: '#' },
          { name: '지자체 산하기관', linkUrl: '#' },
          { name: '공공기관', linkUrl: '#' },
          { name: '특수법인 및 단체', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '사례/서식',
    sub: [
      {
        items: [
          { name: '법률상담사례', linkUrl: '#' },
          { name: '법률구조사례', linkUrl: '#' },
          { name: '법률서식(법원 소송안내마당)', linkUrl: '#' },
          { name: '법률서식(대한법률구조공단)', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '법률상담',
    sub: [
      {
        underTitle: '법률상담 방법',
        items: [
          { name: '면접상담', linkUrl: '#' },
          { name: '화상상담', linkUrl: '#' },
          { name: '전화상담', linkUrl: '#' },
          { name: '사이버 상담', linkUrl: '#' }
        ]
      },
      {
        underTitle: '법률상담 기관',
        items: [
          { name: '대한법률구조공단', linkUrl: '#' },
          { name: '한국가정법률상담소', linkUrl: '#' },
          { name: '대한가정법률복지상담원', linkUrl: '#' },
          { name: '법률홈닥터', linkUrl: '#' }
        ]
      },
      {
        underTitle: '양육비/신용회복/금융복지/상사중재 상담',
        items: [
          { name: '양육비 상담', linkUrl: '#' },
          { name: '신용회복 상담', linkUrl: '#' },
          { name: '서울/경기도 금융복지상담', linkUrl: '#' },
          { name: '상사중재 관련 상담', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '법률구조 전자접수',
    sub: [
      {
        underTitle: '상담기관',
        items: [
          { name: '법률상담사례', linkUrl: '#' },
          { name: '법률구조사례', linkUrl: '#' },
          { name: '법률서식(법원 소송안내마당)', linkUrl: '#' },
          { name: '법률서식(대한법률구조공단)', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '마이페이지',
    sub: [
      {
        items: [
          { name: '나의 문의내역', linkUrl: '#' },
          { name: '비밀번호 변경', linkUrl: '#' },
          { name: '회원정보 수정', linkUrl: '#' },
          { name: '회원탈퇴', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '고객센터',
    sub: [
      {
        items: [
          { name: '공지사항', linkUrl: '#' },
          { name: '자주찾는 질문', linkUrl: '#' },
          { name: '시스템 이용 문의', linkUrl: '#' },
          { name: '이용안내', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: 'AI 검색 서비스',
    sub: [
      {
        items: [
          { name: '생성형 AI 검색', linkUrl: '#' },
          { name: 'AI 검색 이용안내', linkUrl: '#' }
        ]
      }
    ]
  },
  {
    title: '통합검색',
    sub: [
      {
        items: [{ name: '통합검색', linkUrl: '#' }]
      }
    ]
  }
]);

const expandedIndexes = ref<Record<string, boolean>>({});
onMounted(() => {
  // 메뉴 전체 순회해서 underTitle이 있는 항목 true로 초기화
  menuList.value.forEach((menu) => {
    menu.sub.forEach((sub) => {
      if (sub.underTitle) {
        expandedIndexes.value[sub.underTitle] = true;
      }
    });
  });
});

const toggle = (key: string) => {
  expandedIndexes.value[key] = !expandedIndexes.value[key];
};
</script>

<template>
  <div class="bx">
    <div class="menu-header">
      <h2 class="tit">전체메뉴</h2>
    </div>
    <div class="menu-list">
      <div
        class="all-item"
        v-for="(allMenu, allIndex) in menuList"
        :key="allIndex"
      >
        <h4>{{ allMenu.title }}</h4>

        <template v-for="(sub, subIndex) in allMenu.sub" :key="subIndex">
          <div class="menu-section-box">
            <!--            <CommonTitle v-if="sub.subTitle" tag="h5" size="2" type="bar">{{-->
            <!--              sub.subTitle-->
            <!--            }}</CommonTitle>-->
            <ul>
              <li class="item" v-if="sub.underTitle">
                <div
                  class="all-bg-type"
                  :class="{ active: expandedIndexes[sub.underTitle] }"
                >
                  <button
                    type="button"
                    class="btn"
                    :title="sub.underTitle"
                    @click="toggle(sub.underTitle)"
                  >
                    {{ sub.underTitle }}
                  </button>
                  <div class="list">
                    <ul role="menu">
                      <li
                        v-for="(items, itemsIndex) in sub.items"
                        :key="itemsIndex"
                      >
                        <router-link class="text" :to="items.linkUrl">{{
                          items.name
                        }}</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                class="item"
                v-for="(items, itemsIndex) in sub.items"
                :key="itemsIndex"
                v-else
              >
                <router-link :to="items.linkUrl">
                  <span class="text-span">
                    {{ items.name }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
