<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="플랫폼 개요"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '플랫폼' },
            { text: '플랫폼 개요', active: true }
          ]"
        />
        <div class="text-wrap">
          <CommonTitle tag="h4" type="circle" size="1">법률구조란?</CommonTitle>
          <div class="text-box box1">
            <ul>
              <li>
                법률구조는 경제적으로 어렵거나 법을 몰라서 법의 보호를 충분히
                받지 못하는 분에게 법률상담, 변호사나 공익법무관에 의한
                소송대리, 그 밖에 법률 사무에 관한 모든 지원을 의미하여,
                궁극적으로 <br />
                기본적 인권을 옹호하고 법률 복지를 증진하는 것을 목적으로
                합니다(법률구조법 제2조, 제1조).
              </li>
              <li>
                법률구조법에 따라 법률구조사업을 효율적으로 수행하기 위하여
                대한법률구조공단이 설립되었으며, 법률구조사업을 수행하는
                법률구조기관(법인) 으로 한국가정법률상담소,
                대한가정법률복지상담원, <br />
                대한변협법률구조재단 등이 있습니다.
              </li>
            </ul>
          </div>
          <CommonTitle tag="h4" type="circle" size="1"
            >법률구조 플랫폼이란?</CommonTitle
          >
          <div class="text-box box2">
            <p>
              법률구조기관 및 국가·공공기관 등에서 제공하는 각종 법률정보,
              법률상담, 소송구조, 조정, 피해구제 등의 법률서비스를 통합하여
              하나의 플랫폼 창구로 안내하고, 기관 간 연계를 통해 법률구조신청 및
              <br />
              각종 법률지원신청을 One-Stop으로 제공하는 시스템입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="img-box text-center">
          <!--
          <img
            src="/image/sub/intro/platform_chart.png"
            alt="법률구조서비스 플랫폼(상세 내용은 하단 참고)"
          />-->
          <picture>
            <source
              media="(max-width: 1199px)"
              srcset="/image/sub/intro/platform_chart_mo.png"
            />
            <source
              media="(min-width: 1200px)"
              srcset="/image/sub/intro/platform_chart.png"
            />
            <img
              src="/image/sub/intro/platform_chart.png"
              alt="법률구조서비스 플랫폼(상세 내용은 하단 참고)"
            />
          </picture>

          <div class="sr-only">
            <strong>법률구조서비스 플랫폼 개요</strong>
            <ul>
              <li>
                법률구조서비스 플랫폼은 법률구조서비스, 유관기관연계서비스,
                맞춤형 법률정보 제공 이 세가지 서비스로 구분된다.
              </li>
              <li>
                법률구조서비스에는 1.법률상담 2.소송대리 3.화해조정 4.법교육이
                있고 이 네가지 항목은 법률구조기관
                (대한법률구조공단,한국가정법률상담소,대한가정법률
                복지상담원,대한변협법률 구조재단)에서 서비스를 직접 제공한다.
              </li>
              <li>
                유관기관 연계 서비스에는 1.각종 신청 연계 2.진행상황,결과안내 등
                정보공유가 있고 이 두가지 항목은 연계 · 협업기관인
                (법무부,지자체 산하기관, 양육비이행관리원, 금융감독원,
                서민금융진흥원, 기타기관)에 유관기관 연계 서비스를 제공한다.
              </li>
              <li>
                맞춤형 법률정보 제공 서비스에는 1. 법률구조 정보 2. 유관기관
                정보 3. 법률 · 서식 정보가 있고 이 세가지 항목은 정보제공기관인
                (법원행정처, 보건복지부, 고용노동부, 여성가족부, 금융위원회,
                한국의료분쟁조정중재원, 기타기관)에서 서비스를 직접 제공한다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/plt/intr/index.scss';
</style>
