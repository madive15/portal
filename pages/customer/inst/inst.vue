<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="고객센터"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '고객센터' },
            { text: '이용안내', active: true }
          ]"
        />
        <div class="navigation-box">
          <div class="container">
            <div class="row">
              <div class="col-xl-3 col-12 left-col">
                <NuxtLink :to="'#'" :external="true"> 공지사항 </NuxtLink>
              </div>
              <div class="col-xl-3 col-12">
                <NuxtLink :to="'#'" :external="true"> 자주찾는 질문 </NuxtLink>
              </div>
              <div class="col-xl-3 col-12">
                <NuxtLink :to="'#'" :external="true"> 시스템 이용 문의 </NuxtLink>
              </div>
              <div class="col-xl-3 col-12 right-col active">
                <NuxtLink :to="'#'" :external="true"> 이용안내 </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="box">
          <h4>법률구조플랫폼 웹 브라우저 최적화 환경</h4>
          <div class="text-box">
            <ul>
              <li>
                웹 브라우저는 익스플로러 11, 파이어폭스 66.0, 크롬 73.0, 사파리
                10 이상
              </li>
              <li>화면 해상도는 1920*1080 이상</li>
            </ul>
          </div>
        </div>

        <div class="box">
          <h4>뷰어프로그램 다운로드</h4>
          <div class="text-box">
            <ul>
              <li>
                다운로드한 파일이 열리지 않을 때 뷰어프로그램을 이용하여 보실 수
                있습니다.
              </li>
              <li>이용안내 > 뷰어다운로드</li>
            </ul>
          </div>
        </div>

        <div class="box">
          <h4>한글명 첨부파일이 다운되지 않는 경우</h4>
          <div class="text-box">
            <ul>
              <li>
                Internet Explorer5.0에서 한글명 첨부화일이 Down 안될 때에는
              </li>
              <li>
                Internet Explorer 메뉴에서 도구>인터넷옵션>고급탭의 하단중앙의
                『URL을 항상 UTF-8으로 보냄』에V(체크) 표시가 되어 있으면 한글명
                첨부화일이 다운되지 않습니다.
              </li>
              <li>
                V(체크) 표시를 없앤후 확인 버튼을 클릭, 웹브라우저를 닫고 다시
                열면 첨부화일을 볼 수 있습니다.
              </li>
            </ul>
          </div>
        </div>

        <div class="box">
          <h4>원하는 기관 및 서비스 를 찾으시려면</h4>
          <div class="text-box">
            <ul>
              <li>
                손쉬운 찾기 메뉴 : 나의 서비스 찾기 > 손쉬운차기 메뉴를 통해
                서비스 유형별, 대상자, 기관, 지역 정보를 통해 서비스 정보를 찾을
                수 있습니다.
              </li>
              <li>
                법률복지 지도 : 나의 서비스 찾기 > 법률복지지도 메뉴를 통해
                기관의 위치 정보를 지도로 쉽게 찾을 수 있습니다.
              </li>
              <li>
                통합검색 : 키워드를 통해 내가 원하는 서비스정보, 기관정보,
                필요한 서시 및 사례 정보를 검색하실 수 있습니다.
              </li>
              <li>
                AI검색 : 인공지능 AI를 통해 질문해 보세요, 내가 원하는 정보가
                명확하지 않을때 질문을 통해 원하는 결과를 찾아 드립니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/customer/inst/inst.scss';
</style>
