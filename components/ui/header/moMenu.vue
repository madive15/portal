<script setup lang="ts">
import CommonAccordion from '~/components/ui/accordion/accordion.vue';
import CommonAccordionItem from '~/components/ui/accordion/accordionitem.vue';
import Masthead from '~/components/ui/header/masthead.vue';
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
        menuItems: [
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
      }
    ]
  },
  {
    title: '나의 서비스찾기',
    sub: [
      {
        menuItems: [
          {
            items: [
              { name: '손쉬운찾기', linkUrl: '#' },
              { name: '법률복지지도', linkUrl: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: '서비스 유형',
    sub: [
      {
        subTitle: '서비스 내용',
        menuItems: [
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
        subTitle: '서비스 대상자',
        menuItems: [
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
      }
    ]
  },
  {
    title: '서비스제공기관',
    sub: [
      {
        menuItems: [
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
      }
    ]
  },
  {
    title: '사례/서식',
    sub: [
      {
        menuItems: [
          {
            items: [
              { name: '법률상담사례', linkUrl: '#' },
              { name: '법률구조사례', linkUrl: '#' },
              { name: '법률서식(법원 소송안내마당)', linkUrl: '#' },
              { name: '법률서식(대한법률구조공단)', linkUrl: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'One-Stop 법률구조',
    sub: [
      {
        subTitle: '법률상담',
        menuItems: [
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
        subTitle: '법률구조 전자접수',
        menuItems: [
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
      }
    ]
  }
]);
import Icon from '~/components/ui/icon/icon.vue';
</script>

<template>
  <div class="lnb-menu__area">
    <div class="lnb-layer">
      <masthead />
      <div class="lnb-header">
        <strong>
          <img src="/assets/image/main/hd_logo.png" alt="대국민플랫폼" />
        </strong>
        <button type="button" @click="$emit('close')" class="btn-close">
          <span class="sr-only">닫기</span>
        </button>
      </div>
      <div class="lnb-body">
        <!--        <div class="fav-bx">-->
        <!--          <button type="button" class="btn-icon__fav">-->
        <!--            <span class="text">즐겨찾기</span>-->
        <!--          </button>-->
        <!--        </div>-->
        <div class="auth-option-box">
          <ul class="auth-nav__list">
            <li class="auth-li">
              <span class="time-span"> 29:34 </span>
              <button class="btn auth-button">인증해제</button>
            </li>
            <li class="lang-li">
              <lazy-common-google-translate />
            </li>
          </ul>
        </div>
        <div class="navbar-wrap d-none">
          <button type="button" class="btn-icon__login">
            <Icon name="login" />
            <span class="text">로그인</span>
          </button>
          <button type="button" class="btn-icon__join">
            <Icon name="join" />
            <span class="text">회원가입</span>
          </button>
          <button type="button" class="btn-icon__cs">
            <Icon name="customerService" />
            <span class="text">고객센터</span>
          </button>
        </div>
        <div class="navbar-wrap">
          <button type="button" class="btn-icon__login">
            <Icon name="login" />
            <span class="text">로그아웃</span>
          </button>
          <button type="button" class="btn-icon__join">
            <Icon name="mypage" />
            <span class="text">마이페이지</span>
          </button>
          <button type="button" class="btn-icon__cs">
            <Icon name="customerService" />
            <span class="text">고객센터</span>
          </button>
        </div>
        <CommonAccordion>
          <CommonAccordionItem
            v-for="(category, cateIndex) in menuList"
            :key="cateIndex"
            :header="category.title"
          >
            <div
              class="edge-bx"
              v-for="(subCate, subIndex) in category.sub"
              :key="subIndex"
            >
              <h2 v-if="subCate.subTitle" class="menu-title">
                {{ subCate.subTitle }}
              </h2>
              <ul
                class="lng-menu__wrap"
                v-for="(subMenu, subIndex) in subCate.menuItems"
                :key="subIndex"
              >
                <li v-if="subMenu.underTitle">
                  <span class="menu-item">
                    {{ subMenu.underTitle }}
                  </span>
                  <ul class="menu-depth__wrap">
                    <li
                      v-for="(item, itemIndex) in subMenu.items"
                      :key="itemIndex"
                    >
                      <router-link :to="item.linkUrl" class="sub-item">{{
                        item.name
                      }}</router-link>
                    </li>
                  </ul>
                </li>
                <li
                  v-else
                  v-for="(item, itemIndex) in subMenu.items"
                  :key="itemIndex"
                >
                  <router-link :to="item.linkUrl" class="menu-item">
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </CommonAccordionItem>
        </CommonAccordion>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
