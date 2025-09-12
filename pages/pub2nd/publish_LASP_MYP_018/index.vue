<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import DropdownTab from '~/components/ui/dropdown/dropdownTab.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';

definePageMeta({
  layout: 'pub2nd'
});

const activeIndex3 = ref(0);
const tabTitle3 = ref<MenuCategory[]>([
  {
    title: { tabItem: '법률상담현황', linkUrl: '' },
    subTitle: [
      { item: '상담예약현황', subLink: '#' },
      { item: '사이버상담내역', subLink: '#' }
    ]
  },
  {
    title: { tabItem: '전자접수현황', linkUrl: '#' }
  },
  {
    title: { tabItem: '전자통지', linkUrl: '' },
    subTitle: [
      { item: '전자서명', subLink: '#' },
      { item: '전자송달', subLink: '#' },
      { item: 'SMS', subLink: '#' }
    ]
  },
  {
    title: { tabItem: '나의서류관리', linkUrl: '#' }
  },
  {
    title: { tabItem: '시스템 문의 내역', linkUrl: '#' }
  },
  {
    title: { tabItem: '회원정보 관리', linkUrl: '' },
    subTitle: [
      { item: '비밀번호 변경', subLink: '#' },
      { item: '회원정보 수정', subLink: '#' },
      { item: '회원탈퇴', subLink: '#' }
    ]
  }
]);
const selectedValues3 = ref<(string | null)[]>(tabTitle3.value.map(() => null));

const dropdownCategory = ref('');
const dropdownCategory2 = ref('');
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="전자접수 신청 상세"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <!-- 링크 탭 영역 -->
        <div class="common-category__button">
          <div class="btn-tab__wrap-gap pc-visible">
            <DropdownTab
              class="tab-type"
              v-for="(tabItem, index) in tabTitle3"
              :label="tabItem.title.tabItem"
              :to="tabItem.title.linkUrl"
              :btnSelected="activeIndex3 === index"
              :key="index"
              :modelValue="selectedValues3[index]"
              :hasList="
                Array.isArray(tabItem.subTitle) && tabItem.subTitle.length > 0
              "
              @update:modelValue="(val) => (selectedValues3[index] = val)"
              @click="() => (activeIndex3 = index)"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    v-for="(sub, subIndex) in tabItem.subTitle"
                    :key="subIndex"
                    @click="select(sub.item)"
                    @keydown.enter.prevent="select(sub.item)"
                  >
                    <nuxt-link :to="sub.subLink">
                      {{ sub.item }}
                    </nuxt-link>
                  </li>
                </ul>
              </template>
            </DropdownTab>
          </div>
          <div class="btn-select__wrap mo-only">
            <DropdownBasic
              class="menu-type2"
              v-model="dropdownCategory"
              label="법률상담현황"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('법률상담현황')"
                    @keydown.enter.prevent="select('법률상담현황')"
                  >
                    법률상담현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자접수현황')"
                    @keydown.enter.prevent="select('전자접수현황')"
                  >
                    전자접수현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('전자통지')"
                    @keydown.enter.prevent="select('전자통지')"
                  >
                    전자통지
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('나의서류관리')"
                    @keydown.enter.prevent="select('나의서류관리')"
                  >
                    나의서류관리
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('시스템 문의 내역')"
                    @keydown.enter.prevent="select('시스템 문의 내역')"
                  >
                    시스템 문의 내역
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('회원정보 관리')"
                    @keydown.enter.prevent="select('회원정보 관리')"
                  >
                    회원정보 관리
                  </li>
                </ul>
              </template>
            </DropdownBasic>
            <!-- 1depth에 하위메뉴가 있을 경우 노출 -->
            <DropdownBasic
              class="menu-type2 depth2"
              v-model="dropdownCategory2"
              label="법률상담현황"
            >
              <template #default="{ select }">
                <ul role="menu">
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('사이버예약현황')"
                    @keydown.enter.prevent="select('사이버예약현황')"
                  >
                    사이버예약현황
                  </li>
                  <li
                    role="menuitem"
                    tabindex="0"
                    @click="select('사이버상담내역')"
                    @keydown.enter.prevent="select('사이버상담내역')"
                  >
                    사이버상담내역
                  </li>
                </ul>
              </template>
            </DropdownBasic>
          </div>
        </div>
        <!-- //링크 탭 영역 -->
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="사건/대상자정보">
            <CommonTitle tag="h4" size="1" type="circle">사건정보</CommonTitle>
            <div class="thead-box">
              <CommonTitle tag="h5" size="2" type="dot"
                >대상사건 : 대여금</CommonTitle
              >
              <ButtonGroup align="right" class="!mt-0">
                <CommonButton to="#" variants="line-primary" width="sm-1"
                  >목록</CommonButton
                >
                <CommonButton variants="primary" width="sm-1"
                  >취소</CommonButton
                >
              </ButtonGroup>
            </div>
            <CommonTable>
              <caption>
                대상사건:대여금의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">주민등록등본</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="주민등록등본 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>필수</td>
                </tr>
                <tr>
                  <td class="title-td">
                    법인등기사항증명서(상대방이 법인인 경우)
                  </td>
                  <td>
                    <CommonBadge
                      tag-badge-text="미제출"
                      size="1"
                      type="color-gray"
                    />
                  </td>
                  <td>선택</td>
                </tr>
                <tr>
                  <td class="title-td">변제한 자료(영수증 등)</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="변제한 자료(영수증 등) 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>선택</td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h4" size="1" type="circle"
              >대상자 정보</CommonTitle
            >
            <CommonTable class="type-left">
              <caption>
                대상자 정보의 구조대상유형, 구조대상자정의, 소송비용 관한 표
              </caption>
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">구조대상자유형</th>
                  <td class="title-td">소액임차인</td>
                </tr>
                <tr>
                  <th scope="row">구조대상자정의</th>
                  <td class="title-td">
                    「주택임대차보호법」에서 정한 소액임차인에 해당하는 자
                  </td>
                </tr>
                <tr>
                  <th scope="row">소송비용</th>
                  <td class="reset-td">
                    <CommonTable class="pc-only">
                      <caption>
                        대상자 정보 중 소송비용의 소송비용, 변호사보수,
                        가족에대한무료 관한 표
                      </caption>
                      <colgroup>
                        <col style="width: 33.3%" />
                        <col style="width: 33.3%" />
                        <col style="width: 33.3%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">소송비용</th>
                          <th scope="col">변호사보수</th>
                          <th scope="col">가족에대한무료</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>무료</td>
                          <td>
                            <strong>무료</strong>
                          </td>
                          <td>해당</td>
                        </tr>
                      </tbody>
                    </CommonTable>
                    <CommonTable class="in-table mo-only">
                      <caption>
                        대상자 정보 중 소송비용의 소송비용, 변호사보수,
                        가족에대한무료 관한 표
                      </caption>
                      <colgroup>
                        <col style="width: 50%" />
                        <col style="width: 50%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row">소송비용</th>
                          <td>무료</td>
                        </tr>
                        <tr>
                          <th scope="row">변호사보수</th>
                          <td>
                            <strong>무료</strong>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">가족에대한무료</th>
                          <td>해당</td>
                        </tr>
                      </tbody>
                    </CommonTable>
                  </td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h4" size="1" type="circle"
              >구조대상자 입증자료</CommonTitle
            >
            <CommonTable>
              <caption>
                구조대상자 입증자료의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">주택임대차 계약서</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="주택임대차 계약서 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h4" size="1" type="circle"
              >기준중위소득제한</CommonTitle
            >
            <CommonTable class="type-left">
              <caption>
                기준중위소득제한에 관한 표
              </caption>
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">기준중위소득제한</th>
                  <td class="reset-td">
                    <CommonTable class="pc-only">
                      <caption>
                        기준중위소득제한 중 기준중위소득기준, 소득요건
                        해당여부에 관한 표
                      </caption>
                      <colgroup>
                        <col style="width: 50%" />
                        <col style="width: 50%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">기준중위소득기준</th>
                          <th scope="col">소득요건 해당여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>125%</td>
                          <td>해당</td>
                        </tr>
                      </tbody>
                    </CommonTable>
                    <CommonTable class="in-table mo-only">
                      <caption>
                        기준중위소득제한 중 기준중위소득기준, 소득요건
                        해당여부에 관한 표
                      </caption>
                      <colgroup>
                        <col style="width: 50%" />
                        <col style="width: 50%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="col">기준중위소득기준</th>
                          <td>125%</td>
                        </tr>
                        <tr>
                          <th scope="col">소득요건 해당여부</th>
                          <td>해당</td>
                        </tr>
                      </tbody>
                    </CommonTable>
                  </td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h4" size="1" type="circle"
              >기준중위소득 입증자료</CommonTitle
            >
            <CommonTitle tag="h5" size="2" type="dot"
              >건강보험 직장가입자</CommonTitle
            >
            <CommonTable>
              <caption>
                건강보험 직장가입자의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">건강보험 납부사실확인서</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="건강보험 납부사실확인서 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>필수</td>
                </tr>
                <tr>
                  <td class="title-td">건강보험고지서(소득접수확인)</td>
                  <td>
                    <CommonBadge
                      tag-badge-text="미제출"
                      size="1"
                      type="color-gray"
                    />
                  </td>
                  <td>필수</td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h5" size="2" type="dot"
              >건강보험 지역가입자</CommonTitle
            >
            <CommonTable>
              <caption>
                건강보험 지역가입자의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">건강보험 납부사실확인서</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="건강보험 납부사실확인서 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>필수</td>
                </tr>
                <tr>
                  <td class="title-td">건강보험고지서(소득접수확인)</td>
                  <td>
                    <CommonBadge
                      tag-badge-text="미제출"
                      size="1"
                      type="color-gray"
                    />
                  </td>
                  <td>필수</td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h5" size="2" type="dot"
              >건강보험 피부양자</CommonTitle
            >
            <CommonTable>
              <caption>
                건강보험 피부양자의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">건강보험 납부사실확인서</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="건강보험 납부사실확인서 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>필수</td>
                </tr>
                <tr>
                  <td class="title-td">건강보험고지서(소득접수확인)</td>
                  <td>
                    <CommonBadge
                      tag-badge-text="미제출"
                      size="1"
                      type="color-gray"
                    />
                  </td>
                  <td>필수</td>
                </tr>
              </tbody>
            </CommonTable>

            <CommonTitle tag="h5" size="2" type="dot"
              >건강보험 미가입자</CommonTitle
            >
            <CommonTable>
              <caption>
                건강보험 미가입자의 제출서류, 제출여부, 필수여부에 관한 표
              </caption>
              <colgroup>
                <col style="width: 65%" />
                <col style="width: 15%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">제출여부</th>
                  <th scope="col">필수여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="title-td">근로소득원천징수영수증</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="근로소득원천징수영수증 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>선택</td>
                </tr>
                <tr>
                  <td class="title-td">보수지급명세서</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="보수지급명세서 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>선택</td>
                </tr>
                <tr>
                  <td class="title-td">소득금액증명서(세무서)</td>
                  <td>
                    <NuxtLink
                      to="#"
                      target="_blank"
                      title="소득금액증명서(세무서) 보기 새 창 열림"
                      class="inner-link"
                      ><!-- title="${해당 제출서류 제목} 보기 새 창 열림" -->
                      <CommonBadge
                        tag-badge-text="제출"
                        size="1"
                        class="ico-link"
                      />
                    </NuxtLink>
                  </td>
                  <td>선택</td>
                </tr>
              </tbody>
            </CommonTable>

            <ButtonGroup align="center" class="!mt-50px">
              <CommonButton to="#" variants="line-primary" width="sm-1"
                >목록</CommonButton
              >
              <CommonButton variants="primary" width="sm-1">취소</CommonButton>
            </ButtonGroup>
          </CommonTabItem>
          <CommonTabItem title="신청정보">
            <CommonTitle tag="h4" size="1" type="circle"
              >신청인정보</CommonTitle
            >
            <div class="common-form__area">
              <div class="thead-box type-position">
                <p class="form-ess_info">
                  <i class="red-span">*</i>
                  <span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <CommonButton to="#" variants="line-primary" width="sm-1"
                  >목록</CommonButton
                >
              </div>
              <table>
                <caption>
                  신청인정보의 성명, 연령, 직업, 주소, 핸드폰, 집전화번호,
                  비상연락망1(연락처), 비상연락망2(연락처), 비상연락망3(연락처),
                  이메일, 자산, 월수입에 관한 표
                </caption>
                <colgroup>
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      성명
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">홍길동</td>
                    <th scope="row">
                      연령
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">33</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      직업
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td" colspan="3">프리랜서</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td" colspan="3">
                      04334 서울특별시 용산구 한강대로 102길 17 (동자동,
                      서울버스노조회관 1층)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      핸드폰
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">010-1234-5678</td>
                    <th scope="row">
                      집전화번호
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">02-111-1111</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      비상연락망1(연락처)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">010-3333-5555</td>
                    <th scope="row">
                      비상연락망2(연락처)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">010-1111-2222</td>
                  </tr>
                  <tr>
                    <th scope="row">비상연락망3(연락처)</th>
                    <td class="title-td"></td>
                    <th scope="row">
                      이메일
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">ksgg@naver.com</td>
                  </tr>
                  <tr>
                    <th scope="row">자산</th>
                    <td class="title-td"></td>
                    <th scope="row">월수입</th>
                    <td class="title-td"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CommonTitle tag="h4" size="1" type="circle"
              >상대방정보</CommonTitle
            >
            <div class="common-form__area">
              <p class="form-ess_info">
                <i class="red-span">*</i>
                <span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  상대방정보의 성명, 연령, 직업, 주소, 핸드폰, 집전화번호, 자산,
                  월수입에 관한 표
                </caption>
                <colgroup>
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      성명
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">홍길동</td>
                    <th scope="row">
                      연령
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td">33</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      직업
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td" colspan="3">가정주부</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td class="title-td" colspan="3">
                      06534 서울 서초구 신반포로 326
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">핸드폰</th>
                    <td class="title-td">010-1234-5678</td>
                    <th scope="row">집전화번호</th>
                    <td class="title-td">02-111-1111</td>
                  </tr>
                  <tr>
                    <th scope="row">자산</th>
                    <td class="title-td"></td>
                    <th scope="row">월수입</th>
                    <td class="title-td"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CommonTitle tag="h4" size="1" type="circle"
              >법률구조신청내용</CommonTitle
            >
            <div class="common-form__area">
              <p class="form-ess_info">
                <i class="red-span">*</i>
                <span> 표시는 필수 입력 사항입니다. </span>
              </p>
              <table>
                <caption>
                  법률구조신청내용의 신청사건명, 법률구조신청내용, 비고에 관한
                  표
                </caption>
                <colgroup>
                  <col style="width: 12%" />
                  <col style="width: 88%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">신청사건명</th>
                    <td class="title-td">가정 폭력</td>
                  </tr>
                  <tr>
                    <th scope="row">법률구조신청내용</th>
                    <td class="title-td">
                      법류구조신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법류구조신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법류구조신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법류구조신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법류구조신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법류구조신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법류구조신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법류구조신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법류구조신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법류구조신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법류구조신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법류구조신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법류구조신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법류구조신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용 법률구조 신청내용
                      법률구조 신청내용 법률구조 신청내용
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비고</th>
                    <td class="title-td"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ButtonGroup align="center" class="!mt-50px">
              <CommonButton to="#" variants="line-primary" width="sm-1"
                >목록</CommonButton
              >
            </ButtonGroup>
          </CommonTabItem>
          <CommonTabItem title="보완요청">
            <CommonTable class="pc-only">
              <caption>
                보완요청의 순번, 신청번호, 보완요청일자, 보완요청자, 보완상태,
                등록일에 관한 표
              </caption>
              <colgroup>
                <col style="width: 8%" />
                <col style="width: 20%" />
                <col style="width: 20%" />
                <col style="width: 12%" />
                <col style="width: 20%" />
                <col style="width: 20%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">순번</th>
                  <th scope="col">신청번호</th>
                  <th scope="col">보완요청일자</th>
                  <th scope="col">보완요청자</th>
                  <th scope="col">보완상태</th>
                  <th scope="col">등록일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3</td>
                  <td>
                    <button type="button" class="link-txt">
                      <span class="text">251223-0001</span>
                    </button>
                  </td>
                  <td>2025-05-22</td>
                  <td>홍길동</td>
                  <td>보완요청</td>
                  <td>2025-05-21 13:55</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <button type="button" class="link-txt">
                      <span class="text">251223-0001</span>
                    </button>
                  </td>
                  <td>2025-05-22</td>
                  <td>홍길동</td>
                  <td>보완요청완료</td>
                  <td>2025-05-21 13:55</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <button type="button" class="link-txt">
                      <span class="text">251223-0001</span>
                    </button>
                  </td>
                  <td>2025-05-22</td>
                  <td>홍길동</td>
                  <td>보완완료</td>
                  <td>2025-05-21 13:55</td>
                </tr>
              </tbody>
            </CommonTable>
            <div class="common-table__list mo-only">
              <ul>
                <li>
                  <div class="table-mo-cont">
                    <dl>
                      <dt>순번</dt>
                      <dd>3</dd>
                    </dl>
                    <dl>
                      <dt>신청번호</dt>
                      <dd>
                        <button type="button" class="link-txt">
                          <span class="text">251223-0001</span>
                        </button>
                      </dd>
                    </dl>
                    <dl>
                      <dt>보완요청일자</dt>
                      <dd>2025-05-22</dd>
                    </dl>
                    <dl>
                      <dt>보완요청자</dt>
                      <dd>홍길동</dd>
                    </dl>
                    <dl>
                      <dt>보완상태</dt>
                      <dd>보완요청</dd>
                    </dl>
                    <dl>
                      <dt>등록일</dt>
                      <dd>2025-05-21 13:55</dd>
                    </dl>
                  </div>
                </li>
                <li>
                  <div class="table-mo-cont">
                    <dl>
                      <dt>순번</dt>
                      <dd>2</dd>
                    </dl>
                    <dl>
                      <dt>신청번호</dt>
                      <dd>
                        <button type="button" class="link-txt">
                          <span class="text">251223-0001</span>
                        </button>
                      </dd>
                    </dl>
                    <dl>
                      <dt>보완요청일자</dt>
                      <dd>2025-05-22</dd>
                    </dl>
                    <dl>
                      <dt>보완요청자</dt>
                      <dd>홍길동</dd>
                    </dl>
                    <dl>
                      <dt>보완상태</dt>
                      <dd>보완요청</dd>
                    </dl>
                    <dl>
                      <dt>등록일</dt>
                      <dd>2025-05-21 13:55</dd>
                    </dl>
                  </div>
                </li>
                <li>
                  <div class="table-mo-cont">
                    <dl>
                      <dt>순번</dt>
                      <dd>1</dd>
                    </dl>
                    <dl>
                      <dt>신청번호</dt>
                      <dd>
                        <button type="button" class="link-txt">
                          <span class="text">251223-0001</span>
                        </button>
                      </dd>
                    </dl>
                    <dl>
                      <dt>보완요청일자</dt>
                      <dd>2025-05-22</dd>
                    </dl>
                    <dl>
                      <dt>보완요청자</dt>
                      <dd>홍길동</dd>
                    </dl>
                    <dl>
                      <dt>보완상태</dt>
                      <dd>보완요청</dd>
                    </dl>
                    <dl>
                      <dt>등록일</dt>
                      <dd>2025-05-21 13:55</dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>

            <ButtonGroup align="center" class="!mt-50px">
              <CommonButton to="#" variants="line-primary" width="sm-1"
                >목록</CommonButton
              >
              <CommonButton variants="primary" width="sm-1"
                >수정하기</CommonButton
              >
            </ButtonGroup>
          </CommonTabItem>
          <CommonTabItem title="진행/종결정보">
            <CommonTitle tag="h4" size="1" type="circle">진행 정보</CommonTitle>
            <div class="common-form__area">
              <table>
                <caption>
                  진행 정보의 구조결정일자, 소제기일자, 법원사건번호,
                  담당변호사에 관한 표
                </caption>
                <colgroup>
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                  <col style="width: 12%" />
                  <col style="width: 38%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">구조결정일자</th>
                    <td class="title-td">2025-05-11</td>
                    <th scope="row">소제기일자</th>
                    <td class="title-td">2025-05-18</td>
                  </tr>
                  <tr>
                    <th scope="row">법원사건번호</th>
                    <td class="title-td">2025민가00018</td>
                    <th scope="row">담당변호사</th>
                    <td class="title-td">김유신</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CommonTitle tag="h4" size="1" type="circle">종결 정보</CommonTitle>
            <div class="common-form__area">
              <table>
                <caption>
                  종결 정보의 종결일자, 진행종결정보, 결과에 관한 표
                </caption>
                <colgroup>
                  <col style="width: 12%" />
                  <col style="width: 88%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">종결일자</th>
                    <td class="title-td">2025-05-27</td>
                  </tr>
                  <tr>
                    <th scope="row">진행종결정보</th>
                    <td class="title-td">승소</td>
                  </tr>
                  <tr>
                    <th scope="row">결과</th>
                    <td class="title-td">재판결과 작성한 내용</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ButtonGroup align="center" class="!mt-50px">
              <CommonButton to="#" variants="line-primary" width="sm-1"
                >목록</CommonButton
              >
            </ButtonGroup>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
