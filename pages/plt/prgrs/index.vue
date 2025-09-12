<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import TabItem from '~/components/tab/tabitem.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTabItem from '~/components/ui/tab/tabitem.vue';
import CommonTitle from '~/components/ui/title/title.vue';
</script>

<template>
  <div class="sub-content-box" id="promotion">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="추진사항"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '플랫폼' },
            { text: '추진사항', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="추진배경">
            <div class="promotion-background-box">
              <CommonTitle tag="h4" type="bar" size="1">추진배경</CommonTitle>
              <div class="text-box">
                <ul>
                  <li class="no-bottom-li">
                    법률구조기관 및 국가·공공기관 등에서 제공하는 법률서비스가
                    여러 곳에 산재되어 있어 국민들이 어떤 서비스를 지원 받아야
                    하는지 직접 파악하기 어렵고 불편하였습니다.
                  </li>
                  <li class="no-disc-li">
                    * 대한법률구조공단, 한국가정법률상담소,
                    대한가정법률복지상담원, 대한변협법률구조재단, 법률홈닥터,
                    마을변호사, 법원 국선변호 및 소송구조 등
                  </li>
                  <li>
                    법률구조서비스 및 법률문제에 대한 지원서비스를 하나의
                    플랫폼에서 통합 안내하고, 국민이 플랫폼에 연결·접속하면
                    자신의 사례에 적합한 법률구조서비스와 법률지식정보를
                    제공받을 수 있도록 <br />
                    편의성을 증진할 필요가 있습니다.
                  </li>
                  <li>
                    나아가, 플랫폼을 기반으로 다른 기관과의 법률구조 서비스
                    역량을 연결, 공유, 융합하는 환경을 제공하는 법률구조서비스
                    통합플랫폼 중심의 대국민 법률지원서비스가 필요한 상황입니다.
                  </li>
                  <li>
                    이에 정부는 “법률구조서비스플랫폼 구축 및 사회적 취약계층
                    우선지원”을 국정과제로 선정하고 법률구조 플랫폼을 구축하게
                    되었습니다.
                  </li>
                </ul>
              </div>
              <p class="text-center new-h5">이렇게 달라집니다!</p>
              <div class="img-box">
                <!--
                <img
                  src="/image/sub/intro/promotional_charts.png"
                  alt="플랫폼 안내 추진배경(상세 내용 하단 참고)"
                />-->
                <picture>
                  <source
                    media="(max-width: 1199px)"
                    srcset="/image/sub/intro/promotional_charts_mo.png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcset="/image/sub/intro/promotional_charts.png"
                  />
                  <img
                    src="/image/sub/intro/promotional_charts.png"
                    alt="국민 편의 증진과 사각지대 해소를 위해 기존 어느 기관, 어느 제도의 도움을 받아야 할 지 직접 찾아야하고, 
법률구조 서비스 대상, 제공기관 등에 대한 정보가 부족한 국민들에게 서비스 사각지대가 발생하는 부분을 한 곳의 플랫폼(어플, 전화)를 통해 최종적인 상담, 서비스 연계, 결과확인 등이 가능한 One-Stop 서비스를 제공하고, 
국민이 본인에게 적합한 법률구조 서비스를 직접 찾아다닐 필요가 없어지도록 개선합니다.
"
                  />
                </picture>

                <!-- <div class="sr-only">
                  <ul>
                    <li>
                      기존의 법률구조기관 및 국가 · 공공기관 등에서 제공하는
                      법률 서비스는 어느 기관, 어느 제도의 도움을 받아야할지
                      직접 찾아야 했다.
                    </li>
                    <li>
                      법률 구조 서비스 대상, 제공기관 등에 대한 정보가 부족한
                      국민들에게 서비스의 사각지대가 발생했다.
                    </li>
                    <li>
                      국민 편의 증진과, 사각지대 해소를 위해 한 곳의
                      플랫폼(어플,전화)을 통해 최종적인 상담, 서비스 연계, 결과
                      확인 등을(One-Stop)으로 가능하게 하여 국민들이 본인에게
                      적합한 법률구조 서비스를 직접 찾아다닐 필요가 없도록
                      개선되었다.
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="추진목표/추진방향">
            <div class="promotion-target-box">
              <CommonTitle tag="h4" type="bar" size="1">추진목표</CommonTitle>
              <div class="text-box">
                <p class="fw-bold text-center new-p">
                  “인공지능” 과 “데이터와 서비스가 막힘 없이 연결되는 플랫폼”이
                  결합하여 법률구조 플랫폼에 참여하고 있는 국가·공공기관의
                  법률상담, 소송구조, 조정, 피해구제 등 대국민서비스를 하나의
                  플랫폼 창구로 <br />
                  안내하고, 서비스 신청, 처리결과 확인까지 One-Stop으로 제공하여
                  국민의 편의성을 증진하고 참여기관의 고객만족도 제고에 기여
                </p>
              </div>
              <CommonTitle tag="h4" type="bar" size="1">추진방향</CommonTitle>
              <div class="text-info-box">
                <dl>
                  <dt>
                    <span class="text-span icon-arrow">
                      산재한 법률구조서비스와 정부·민간 등 참여기관 서비스를
                      연계
                    </span>
                  </dt>
                  <dd>
                    법률구조 기구뿐만 아니라 다양한 기관과 연계를 통해 One-Stop
                    종합서비스 제공
                  </dd>
                </dl>

                <dl>
                  <dt>
                    <span class="text-span icon-arrow">
                      법률구조기관의 IT 인프라를 통해 플랫폼 콘텐츠 강화
                    </span>
                  </dt>
                  <dd>
                    AI 법률정보제공, 전자접수, 다부처 연계 시스템 등을 플랫폼에
                    통합
                  </dd>
                </dl>

                <dl class="an-dl">
                  <dt>
                    <span class="text-span icon-arrow">
                      단계적 사업 추진으로 이용자 편의 최적화 및 시스템 고도화
                      도모
                    </span>
                  </dt>
                  <dd>
                    2개년에 걸쳐 시스템을 구축·정비하여 원스톱 서비스 단계별
                    최적화·고도화 추진
                  </dd>
                  <dd class="no-desc-dd">
                    * 서비스 오픈 일정 : 1단계(‘25. 1. ) , 2단계(‘26. 1.)
                  </dd>
                </dl>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="추진경과">
            <div class="promotion-result-box">
              <div class="text-box">
                <ul class="result-list">
                  <li class="fw-bold">('22.7.) 새정부 120대 국정과제 선정</li>
                  <li class="fw-bold">
                    ('22.11.) 법무부 주관 법률구조서비스 플랫폼 구축 실무협의회*
                    구성회의
                    <ul>
                      <li class="no-disc-dd">
                        >법률구조공단의 정보화 서비스를 중심으로 플랫폼을
                        구축하여 관계 기관과의 연계를 통해 사회적 취약계층에
                        혜택이 집중되도록 운영<br />*법무부, 고용노동부,
                        가정법률상담소 등 9개 기관 21명 참석
                      </li>
                    </ul>
                  </li>
                  <li class="fw-bold">
                    ('22.1.~4.) 제2~5차 법률구조서비스 플랫폼 구축 실무협의 회의
                    실시
                    <ul>
                      <li class="no-disc-dd mt-2">
                        >(제2차 회의) 법률구조서비스 플랫폼 국정과제 및
                        정보화전략계획(ISP) 수립, 플랫폼 구축 기본계획 등 설명,
                        플랫폼 활용 사례, 연계방안 협의<br />
                        * 법무부, 여성가족부, 가정법률상담소 등 10개 기관 23명
                        참석
                      </li>
                      <li class="no-disc-dd mt-2">
                        >(제3차 회의) 정보화전략계획(ISP) 수립 사업수행계획
                        보고, 대한법률구조공단, 법률홈닥터 플랫폼 연계방안
                        협의<br />
                        * 법무부, 대한법률구조공단, ISP 용역수행 업체 등 3개
                        기관 12명 참석
                      </li>
                      <li class="no-disc-dd mt-2">
                        >(제4차 회의) 법률구조서비스 플랫폼을 통한 공단 및
                        법률홈닥터, 신용회복위원회 연계 방안 협의<br />
                        * 법무부, 대한법률구조공단, 신용회복위원회 등 4개 기관
                        18명 참석
                      </li>
                      <li class="no-disc-dd mt-2">
                        >(제5차 회의) 법률구조서비스 플랫폼을 통한 공단 및
                        법률홈닥터, 마을변호사, 스타트LAW 법무플랫폼(중소기업
                        법률지원) 연계방안 협의<br />
                        * 법무부(인권구조과, 법무과, 상사법무과),
                        대한법률구조공단 등 2개 기관 15명 참석
                      </li>
                    </ul>
                  </li>
                  <li class="fw-bold">
                    ('23.2.~6.) 법률구조서비스 플랫폼 구축화전략계획(ISP) 수립
                  </li>
                  <li class="fw-bold">
                    ('23. 4.~12.) 법률구조서비스 플랫폼 구축 실무협의회의 실시
                    <ul>
                      <li class="no-disc-dd">
                        - 법률구조기관, 정부부처, 지방자치단체, 법률구조
                        연계협업기관 등 총 32개 기관 방문협의
                      </li>
                    </ul>
                  </li>
                  <li class="fw-bold">
                    ('24. 7.~12.) 법률구조서비스 플랫폼 1단계 구축
                  </li>
                  <li class="fw-bold">
                    ('25. 1.) 법률구조서비스 플랫폼 시스템 1단계 오픈
                  </li>
                  <li class="fw-bold">
                    ('26. 1.) 법률구조서비스 플랫폼 시스템 2단계 오픈(예정)
                  </li>
                </ul>
              </div>
            </div>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/plt/prgrs/index.scss';
</style>
