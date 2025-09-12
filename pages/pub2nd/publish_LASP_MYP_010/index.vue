<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="마이페이지"
        />
      </div>
    </section>
    <section class="section2">
      <div class="mypage-main-wrap">
        <div class="box">
          <div class="container">
            <CommonTitle tag="h4" size="1" type="circle"
              >상담예약현황</CommonTitle
            >
            <p>
              상담예약상태를 상태별로 한눈에 확인하세요. 각 상태별 건수를
              클릭하면 해당 상태의 상담 내역을 상세하게 볼 수 있습니다.
            </p>
            <div class="reservation-area">
              <ul>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico1"></span>
                    <dl class="link-dl-box">
                      <dt>상담전</dt>
                      <dd><strong>1</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico2"></span>
                    <dl class="link-dl-box">
                      <dt>상담완료</dt>
                      <dd><strong>0</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico3"></span>
                    <dl class="link-dl-box">
                      <dt>상담취소</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico4"></span>
                    <dl class="link-dl-box">
                      <dt>내방안함</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
              </ul>
              <NuxtLink to="#" title="상담예약현황" class="link-under-arrow">
                <span class="txt">전체보기</span>
              </NuxtLink>
            </div>

            <CommonTitle tag="h4" size="1" type="circle"
              >전자접수현황</CommonTitle
            >
            <p>
              전자접수 현황을 한눈에 확인하세요. 각 상태별 건수를 클릭하면 해당
              상태의 상담 내역을 상세하게 볼 수 있습니다.
            </p>
            <div class="receipt-area">
              <ul>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico1"></span>
                    <dl class="link-dl-box">
                      <dt>작성중</dt>
                      <dd><strong>1</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico2"></span>
                    <dl class="link-dl-box">
                      <dt>작성완료</dt>
                      <dd><strong>0</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico3"></span>
                    <dl class="link-dl-box">
                      <dt>심사중</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico4"></span>
                    <dl class="link-dl-box">
                      <dt>보완요청</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico5"></span>
                    <dl class="link-dl-box">
                      <dt>심사완료<br class="mo-only" />:승인</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico6"></span>
                    <dl class="link-dl-box">
                      <dt>심사완료<br class="mo-only" />:불승인</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="#" class="link-cont-box">
                    <span class="ico ico7"></span>
                    <dl class="link-dl-box">
                      <dt>취소</dt>
                      <dd><strong>99</strong> 건</dd>
                    </dl>
                  </NuxtLink>
                </li>
              </ul>
              <NuxtLink to="#" title="전자접수현황" class="link-under-arrow">
                <span class="txt">전체보기</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="other-menu-area">
            <ul class="other-info-list">
              <li>
                <NuxtLink to="#" class="link-other-info box1">
                  <span>사이버상담</span>
                  <span>
                    <span class="arrow">내역</span>
                  </span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="#" class="link-other-info box2">
                  <span>시스템 문의</span>
                  <span>
                    <span class="arrow">내역</span>
                  </span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="#" class="link-other-info box3">
                  <span>나의 서류</span>
                  <span>
                    <span class="arrow">관리</span>
                  </span>
                </NuxtLink>
              </li>
            </ul>
            <ul class="user-info-list">
              <li>
                <NuxtLink to="#" class="link-user-info">
                  <span class="ico ico1"></span>
                  <span class="txt">비밀번호 변경</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="#" class="link-user-info">
                  <span class="ico ico2"></span>
                  <span class="txt">회원정보 수정</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="#" class="link-user-info">
                  <span class="ico ico3"></span>
                  <span class="txt">회원탈퇴</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
