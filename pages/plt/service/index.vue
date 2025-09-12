<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import CommonTabItem from '~/components/tab/tabitem.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import Components from '~/pages/components/components.vue';
import CommonTable from '~/components/ui/table/tables.vue';
</script>

<template>
  <div class="sub-content-box" id="intro-service">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="플랫폼 제공 서비스"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '플랫폼' },
            { text: '플랫폼 제공 서비스', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="구성 및 접근방식">
            <div class="intro-service-tab-content-box1">
              <CommonTitle tag="h4" type="bar" size="1"
                >서비스 구성</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조플랫폼은 법률구조서비스, 맞춤형 법률정보 및
                    법률서비스 정보 제공, 참여기관 연계서비스로 구성됩니다.
                  </li>
                  <li>
                    법률구조 플랫폼은 법률구조기관의 법률구조 이외에 국민의
                    법률수요 맞춤형 법률정보와 법률서비스정보, 법률서비스 관련
                    참여기관과의 각종 신청 등 연계서비스를 제공합니다.
                  </li>
                </ul>
              </div>
              <CommonTitle tag="h4" type="bar" size="1">접근방식</CommonTitle>
              <div class="text-box">
                <ul>
                  <li>
                    법률구조 플랫폼은 기본적으로 인터넷 웹(Web) 환경에서 접근
                    가능하며, 반응형 웹으로 구축되어 모바일 환경에서도 서비스를
                    이용하실 수 있습니다.
                  </li>
                  <li>
                    또한 디지털 취약계층의 법률구조 플랫폼 접근·이용가능성을
                    증진하기 위해 AI 기반 콜센터(AICC)를 구축하여 전화상으로도
                    다양한 법률정보와 법률서비스를 제공받을 수 있습니다.(’26년
                    예정)
                  </li>
                </ul>
              </div>
              <div class="img-box">
                <!--<img
                  src="/image/sub/intro/service_chart01.png"
                  alt="플랫폼 서비스 구성(상세 내용은 하단 참고)"
                />-->
                <picture>
                  <source
                    media="(max-width: 1199px)"
                    srcset="/image/sub/intro/service_chart01_mo.png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcset="/image/sub/intro/service_chart01.png"
                  />
                  <img
                    src="/image/sub/intro/service_chart01.png"
                    alt="법률구조 통합 플랫폼 서비스 구성(상세 내용은 하단 참고)"
                  />
                </picture>
                <div class="sr-only">
                  <ul>
                    <li>
                      법률구조 통합 플랫폼 서비스 구성에는 법률구조 서비스,
                      맞춤형 정보 제공, 유관기관 연계서비스가 있다.
                    </li>
                    <li>
                      법률구조 서비스에는 법률상담, 소송대리,법교육,분쟁조정이
                      있고 이것을 종합법률서비스라고 한다.
                    </li>
                    <li>
                      맞춤형 정보 제공에는 법률구조기관 서비스 정보, 유관기관
                      서비스 정보, 각종 법률 · 서식 등 정보가 있고 이것을
                      종합법률정보 제공 서비스라고 한다.
                    </li>
                    <li>
                      유관기관 연계 서비스에는 각종 신청 등 연계 서비스,
                      진행상황, 결과 안내 등, 정보 공유 서비스가 있고 이것을
                      종합연계 서비스라고 한다.
                    </li>
                    <li>
                      위와 같은 서비스들을 다양한 접근매체(web, App 등)를
                      통합플랫폼 사이트를 통해 이용 가능하다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="법률구조서비스">
            <div class="intro-service-tab-content-box2">
              <CommonTitle tag="h4" type="bar" size="1"
                >법률구조서비스</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조 플랫폼은 국민의 법적 수요를 분석하여 해당 사안에
                    적합한 법률구조 서비스 정보를 연계하여, 해당 기관과의
                    법률상담, 법률구조신청 등의 법률구조 서비스를 제공하며, 신청
                    접수 후 <br />
                    진행·결과확인까지 One-Stop으로 해결될 수 있도록 지원합니다.
                  </li>
                </ul>
                <ul>
                  <li>
                    구체적으로 법률구조 플랫폼은 수요자 정보 분석을 통해
                    1차적으로 생성형 AI에 기반한 법률정보 서비스를 제공하고,
                    2차적으로 법률구조기관의 전문 법률구조 서비스 제공하여
                    해당기관에 연계합니다.
                  </li>
                  <li class="no-desc-li">
                    * [1차적 지원] 생성형 AI에 기반하여 플랫폼에 입력된 수요자
                    정보 및 구체적 사례를 분석하여 법령, 판례 등 법률정보 ('26년
                    예정) 와 각종 법률서비스 정보 제공
                  </li>
                  <li class="no-desc-li">
                    * [2차적 지원] 추가 지원이 필요하거나 사건 접수를 원하는
                    경우 플랫폼과 연계된 법률구조기관의 법률상담(면접예약,
                    전화상담, 사이버상담, 채팅 상담 등)과 전자접수 시스템을 통해
                    맞춤형 법률구조 <br />
                    서비스 제공하여 진행·결과확인까지 One-Stop으로 해결(’26년
                    예정)
                  </li>
                </ul>
              </div>
              <div class="img-box">
                <!--<img
                  src="/image/sub/intro/service_chart02.png"
                  alt="법률구조서비스(상세 내용은 하단 참고)"
                />-->
                <picture>
                  <source
                    media="(max-width: 1199px)"
                    srcset="/image/sub/intro/service_chart02_mo.png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcset="/image/sub/intro/service_chart02.png"
                  />
                  <img
                    src="/image/sub/intro/service_chart02.png"
                    alt="법률구조 플랫폼은 국민의 인적사항, 경제적 수준, 거주 지역의 수요자 정보와 민사/형사 여부, 피해사실, 피해수준의 사건정보, 상담, 법률정보, 소송에 해당하는 도움필요 분야에 대해 지원대상 파악과 AI 분석을 통해 법률정보 제공, AI 상담, 유사판례, 소송사례 등 제공의 1차적 AI 서비스 지원과 대면상담, 소송자료 접수, 소송구조 신청, 타기관 연계를 전화 상담, 대면상담, 피해자 국선변호에 대한하는 2차적 전문 서비스를 지원하며, 전문ㆍ특화 서비스 필요 시 타기관 서비스 연계까지 지원합니다. 

"
                  />
                </picture>

                <!-- <div class="sr-only">
                  <p>
                    법률구조 플랫폼은 국민의 법적 수요를 분석하여 적합한 법률
                    구조 서비스를 연계하고, 해당 기관과의 법률 구조 서비스를
                    제공하며, 신청 접수 후 진행 · 결과 확인까지 One-Stop으로
                    해결될 수 있도록 지원하는 서비스 입니다.
                  </p>
                  <ul>
                    <li>
                      국민을 대상으로 수요자 정보 분석을 통해 1차,2차로 나누어
                      법률구조 서비스를 제공합니다. 수요자 정보 분석 내용은
                      아래와 같습니다.
                    </li>
                    <li>1.수요자 정보 (인적사항, 경제적수준, 거주지역)</li>
                    <li>2.사건 정보 (민사/형사, 피해사실, 피해수준)</li>
                    <li>3.도움필요분야 (상담,법률정보,소송)</li>
                  </ul>
                  <p>
                    수요자 정보 분석으로 지원대상 파악 및 AI 분석 후 1차적 AI
                    서비스 지원, 2차적 전문 서비스 지원으로 나뉘어 서비스를
                    제공합니다.
                  </p>
                  <ul>
                    <li>
                      1차적 AI 서비스 지원에는 법률정보 제공, AI 상담, 유사판례,
                      소송사례 등을 제공하며 대면상담, 소송자료 접수, 소송구조
                      신청, 타기관연계 서비스가 있습니다.
                    </li>
                    <li>
                      2차적 전문 서비스 지원에는 전화상담, 대면상담, 피해자
                      국선변호를 제공하며, 전문 · 특화 서비스가 필요할 시에는
                      타기관 서비스로 연계해드립니다.
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="맞춤형 법률정보">
            <div class="intro-service-tab-content-box3">
              <CommonTitle tag="h4" type="bar" size="1"
                >맞춤형 법률정보 및 법률서비스 정보 제공</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조 플랫폼은 법률구조기관 및 유관기관 등의 법률서비스
                    내용 및 사례, 법령자료 등을 학습한 생성형 AI를 통해, 국민의
                    다양한 법률수요에 대응해 맞춤형으로 정보를 제공합니다.
                  </li>
                  <li>
                    국민이 다양한 법률수요를 서술형으로 문의하면 플랫폼은
                    해당사안에 가장 밀접한 법령, 판례, 서식, 사례 등 맞춤형
                    법률정보를 제공합니다.('26년 예정)
                  </li>
                  <li>
                    또한, 국민의 법률문제 해결을 위해 법률구조기관 및
                    국가·공공기관의 법률상담, 소송구조, 조정, 화해, 피해구제 등
                    각종 법률서비스 정보를 제공하여 보다 신속하고 적정한
                    법률문제 해결을 지원합니다.
                  </li>
                </ul>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="참여기관 연계서비스">
            <div class="intro-service-tab-content-box4">
              <CommonTitle tag="h4" type="bar" size="1"
                >참여기관 연계서비스(’26년 예정)</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조 플랫폼은 법률서비스 관련 정부부처 및 공공기관 등
                    참여기관과 법률구조 서비스 플랫폼 구축 협의체를 구성하여
                    플랫폼을 통해 참여기관의 법률서비스를 연계합니다.
                  </li>
                  <li>
                    참여기관에서 접수한 사건이 법률구조기관의 법률구조가 필요한
                    경우 또는 법률구조기관이 다른 법률구조기관에 사건을 이첩할
                    필요가 있는 경우 플랫폼을 통해 법률구조기관의 법률서비스에
                    <br />
                    효율적으로 연계합니다.
                  </li>
                  <li>
                    법률구조 플랫폼 참여기관은 기관별 연계의 정도에 따라
                    플랫폼을 통해 상호 정보제공 및 연계요청 수요를 전달하거나
                    제공받아 처리하고 그 결과를 참여기관 상호 간 공유합니다.
                  </li>
                </ul>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="서비스이용 예상사례">
            <div class="intro-service-tab-content-box5">
              <CommonTabs :platform-two-depth-tab-show="true">
                <CommonTabItem title="양육비 미지급 사례">
                  <div class="support-box">
                    <CommonTitle tag="h4" type="bar" size="1"
                      >양육비 미지급 사례</CommonTitle
                    >
                    <p>※ 예상 관계기관 : 여성가족부, 양육비이행관리원 등</p>
                    <div class="text-box">
                      <dl>
                        <dt>문제발생 상황</dt>
                        <dd>
                          B(여성)씨는 이혼 후 미성년자 자녀 1명을 양육하고 있음
                        </dd>
                        <dd>
                          전 배우자인 P씨는 이혼 후 양육비를 지급하지 않고 있음
                        </dd>
                        <dd>
                          전 배우자인 P씨는 사업체 운영 등 소득이 있음에도
                          지속적으로 연락을 피하고 있음
                        </dd>
                        <dd>
                          B씨는 P씨의 양육비 미지급으로 인해 부채가 누적되고
                          있는 상황
                        </dd>
                      </dl>
                    </div>
                    <div class="table-box">
                      <CommonTable class="pc-only" type="bordered">
                        <caption>
                          양육비 미지급 사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">이용자</th>
                            <th scope="col">이용자의 니즈</th>
                            <th scope="col">플랫폼</th>
                            <th scope="col">솔루션</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">B씨 (국민)</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>양육비를 지급받고 싶음</li>
                                <li>가정, 여성전문 서비스가 필요</li>
                                <li>직장과 육아로 방문이 어려움</li>
                                <li>현재 소득으로 부채가 벅참</li>
                              </ul>
                            </td>
                            <td rowspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="양육비 미지급 사례 - 플랫폼"
                              />
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              이행관리원<br />
                              여성가족부<br />
                              법률구조기관
                            </th>
                            <td class="list-td">
                              <ul>
                                <li>양육비이행지원 필요</li>
                                <li>양육비채무불이행시 명단공개 필요</li>
                                <li>전자접수 기능 필요</li>
                                <li>양육비이행명령 등 소송지원 필요</li>
                                <li>정보(자료) 공유 필요</li>
                              </ul>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      양육비 관련 정보 제공(이행관리원 등)
                                    </li>
                                    <li>
                                      한시적 양육비 긴급지원 등(이행관리원)
                                    </li>
                                    <li>양육비 지급 소송지원(법률구조기관)</li>
                                    <li>
                                      감치명령 후 제재조치 지원(여성가족부 등)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                      <CommonTable class="mo-table mo-only" type="bordered">
                        <caption>
                          양육비 미지급 사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>
                        <tbody>
                          <tr>
                            <th scope="row">이용자</th>
                            <th scope="col" class="no-bg">B씨 (국민)</th>
                            <th scope="col" class="no-bg">
                              이행관리원<br />
                              여성가족부<br />
                              법률구조기관
                            </th>
                          </tr>
                          <tr>
                            <th scope="row">이용자의 니즈</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>양육비를 지급받고 싶음</li>
                                <li>가정, 여성전문 서비스가 필요</li>
                                <li>직장과 육아로 방문이 어려움</li>
                                <li>현재 소득으로 부채가 벅참</li>
                              </ul>
                            </td>
                            <td class="list-td">
                              <ul>
                                <li>양육비이행지원 필요</li>
                                <li>양육비채무불이행시 명단공개 필요</li>
                                <li>전자접수 기능 필요</li>
                                <li>양육비이행명령 등 소송지원 필요</li>
                                <li>정보(자료) 공유 필요</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">플랫폼</th>
                            <td colspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="양육비 미지급 사례 - 플랫폼"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">솔루션</th>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      양육비 관련 정보 제공(이행관리원 등)
                                    </li>
                                    <li>
                                      한시적 양육비 긴급지원 등(이행관리원)
                                    </li>
                                    <li>양육비 지급 소송지원(법률구조기관)</li>
                                    <li>
                                      감치명령 후 제재조치 지원(여성가족부 등)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                    </div>
                    <div class="text-box bottom-box">
                      <dl>
                        <dt>문제해결 결과</dt>
                        <dd>
                          <span class="text-span icon-arrow">
                            B씨는 양육비 소송 무료법률지원 서비스 등을 알게됨
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            B씨는 플랫폼을 통해 방문 없이 법률구조 접수 및
                            증거자료 등을 제출함
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            B씨는 한국가정법률상담소, 대한가정법률복지상담원 등
                            법률구조기관을 통해 제소, 승소함
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            B씨는 이행명령 후에도 양육비를 받지 못해
                            법률구조기관을 통해 감치재판을 신청함
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            B씨는 감치명령 결정 후 여성가족부,
                            양육비이행관리원에 운전면허 정지, 채무불이행자 명부
                            등재 등 제재조치를 신청하여 결국 양육비를 지급받기
                            시작함
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <p>
                      * 위 사례는 ’26년 이후 제공될 플랫폼 서비스를 기초로
                      예상되는 활용 사례를 구성한 것으로, ’26년 이후 서비스
                      내용에 따라 변경될 수 있습니다.
                    </p>
                  </div>
                </CommonTabItem>
                <CommonTabItem title="채무위기 사례">
                  <div class="support-box">
                    <CommonTitle type="bar" tag="h4" size="1"
                      >채무위기 사례</CommonTitle
                    >
                    <p>※ 예상 관계기관 : 신용회복위원회, 서민금융진흥원 등</p>
                    <div class="text-box">
                      <dl>
                        <dt>문제발생 상황</dt>
                        <dd>
                          C씨는 개인 사업을 시작하고 얼마 후 코로나가 발생하여
                          매출이 감소함
                        </dd>
                        <dd>
                          사업 운영을 위해 은행, 사금융 등에서 대출을 받았으나
                          상환이 어려워 연체가 시작됨
                        </dd>
                        <dd>
                          C씨는 부양가족으로 미성년자녀 2명이 있어 폐업하면
                          생계유지가 어려운 상황
                        </dd>
                      </dl>
                    </div>
                    <div class="table-box">
                      <CommonTable class="pc-only" type="bordered">
                        <caption>
                          채무위기 사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">이용자</th>
                            <th scope="col">이용자의 니즈</th>
                            <th scope="col">플랫폼</th>
                            <th scope="col">솔루션</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">C씨 (국민)</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>금융이자를 줄이고 싶음</li>
                                <li>생계비가 필요함</li>
                                <li>사업체를 계속 유지하고 싶음</li>
                                <li>사금융의 독촉이 너무 과도함</li>
                              </ul>
                            </td>
                            <td rowspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="채무위기 사례 - 플랫폼"
                              />
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              신용회복위원회<br />
                              서민금융진흥원<br />
                              법률구조기관
                            </th>
                            <td class="list-td">
                              <ul>
                                <li>채무조정제도 안내 필요</li>
                                <li>생활안정자금상품 등 안내 필요</li>
                                <li>정보(자료) 공유 필요</li>
                                <li>채무자대리인 지원 필요</li>
                              </ul>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      채무조정프로그램 지원(신용회복위원회)
                                    </li>
                                    <li>
                                      정책자금 대출 지원(서민금융진흥원 등)
                                    </li>
                                    <li>
                                      채무자대리인신청 접수 및
                                      처리(법률구조기관)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                      <CommonTable class="mo-table mo-only" type="bordered">
                        <caption>
                          채무위기 사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>

                        <tbody>
                          <tr>
                            <th scope="row">이용자</th>
                            <th scope="col" class="no-bg">C씨 (국민)</th>
                            <th scope="col" class="no-bg">
                              신용회복위원회<br />
                              서민금융진흥원<br />
                              법률구조기관
                            </th>
                          </tr>

                          <tr>
                            <th scope="row">이용자의 니즈</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>금융이자를 줄이고 싶음</li>
                                <li>생계비가 필요함</li>
                                <li>사업체를 계속 유지하고 싶음</li>
                                <li>사금융의 독촉이 너무 과도함</li>
                              </ul>
                            </td>
                            <td class="list-td">
                              <ul>
                                <li>채무조정제도 안내 필요</li>
                                <li>생활안정자금상품 등 안내 필요</li>
                                <li>정보(자료) 공유 필요</li>
                                <li>채무자대리인 지원 필요</li>
                              </ul>
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">플랫폼</th>
                            <td colspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="채무위기 사례 - 플랫폼"
                              />
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">솔루션</th>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      채무조정프로그램 지원(신용회복위원회)
                                    </li>
                                    <li>
                                      정책자금 대출 지원(서민금융진흥원 등)
                                    </li>
                                    <li>
                                      채무자대리인신청 접수 및
                                      처리(법률구조기관)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                    </div>
                    <div class="text-box bottom-box">
                      <dl>
                        <dt>문제해결 결과</dt>
                        <dd>
                          <span class="text-span icon-arrow">
                            C씨는 채무조정 프로그램과 정책자금 지원제도,
                            채무자대리인제도를 알게 됨
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            C씨는 서민금융진흥원을 통해 생활안정자금을 지원 받음
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            C씨는 신용회복위원회의 워크아웃 등 채무조정을 통해
                            연체이자를 감면 받음
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            C씨는 법률구조기관을 통해 채무자대리인제도를
                            신청하여 과도한 채무독촉에서 벗어남
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <p>
                      * 위 사례는 ’26년 이후 제공될 플랫폼 서비스를 기초로
                      예상되는 활용 사례를 구성한 것으로, ’26년 이후 서비스
                      내용에 따라 변경될 수 있습니다.
                    </p>
                  </div>
                </CommonTabItem>
                <CommonTabItem title="온라인 피해사례">
                  <div class="support-box">
                    <CommonTitle tag="h4" type="bar" size="1"
                      >온라인 피해사례</CommonTitle
                    >
                    <p>※ 예상 관계기관 : 한국정보통신진흥협회 등</p>
                    <div class="text-box">
                      <dl>
                        <dt>문제발생 상황</dt>
                        <dd>
                          E씨는 반찬 등 음식을 직접 만들어 온라인으로 판매하고
                          있음
                        </dd>
                        <dd>
                          제품에 별다른 하자가 없음에도 구매자의 악의적인
                          후기(댓글 등)가 지속적으로 올라옴
                        </dd>
                        <dd>
                          부정적인 후기가 지속 반복되어 매출액이 급감하고
                          정상적인 사업 운영이 어려운 상황
                        </dd>
                      </dl>
                    </div>
                    <div class="table-box">
                      <CommonTable class="pc-only" type="bordered">
                        <caption>
                          온라인 피해사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">이용자</th>
                            <th scope="col">이용자의 니즈</th>
                            <th scope="col">플랫폼</th>
                            <th scope="col">솔루션</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">E씨 (국민)</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>
                                  통신, 인터넷피해, 소비자분쟁 등<br />
                                  분쟁조정 분야가 너무 복잡하고 다양함
                                </li>
                                <li>업무방해 등 형사고소하고 싶음</li>
                                <li>영업피해, 정신적 피해 보상 필요</li>
                              </ul>
                            </td>
                            <td rowspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="온라인 피해사례 - 플랫폼"
                              />
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              온라인피해365센터<br />
                              각종분쟁조정기관<br />
                              법률구조기관
                            </th>
                            <td class="list-td">
                              <ul>
                                <li>
                                  적합한 분쟁조정기관, 법률구조기관<br />
                                  안내 필요
                                </li>
                                <li>분쟁조정지원 필요</li>
                                <li>관련 분쟁 사례 등 정보 필요</li>
                                <li>손해배상청구 등 소송지원 필요</li>
                              </ul>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      적합한 분쟁조정기관 안내(온라인피해365)
                                    </li>
                                    <li>
                                      피해 분쟁 조정 지원(각종분쟁조정기관)
                                    </li>
                                    <li>
                                      손해배상청구 등 소송지원(법률구조기관)
                                    </li>
                                    <li>
                                      관련분쟁사례 정보 제공(온라인피해365)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                      <CommonTable class="mo-table mo-only" type="bordered">
                        <caption>
                          온라인 피해사례 - 이용자, 이용자의 니즈, 플랫폼,
                          솔루션에 대한 표
                        </caption>
                        <tbody>
                          <tr>
                            <th scope="row">이용자</th>
                            <th scope="col" class="no-bg">E씨 (국민)</th>
                            <th scope="col" class="no-bg">
                              온라인피해365센터<br />
                              각종분쟁조정기관<br />
                              법률구조기관
                            </th>
                          </tr>
                          <tr>
                            <th scope="row">이용자의 니즈</th>
                            <td class="list-td">
                              <ul>
                                <li>어떻게 해결해야 할지 모름</li>
                                <li>
                                  통신, 인터넷피해, 소비자분쟁 등<br />
                                  분쟁조정 분야가 너무 복잡하고 다양함
                                </li>
                                <li>업무방해 등 형사고소하고 싶음</li>
                                <li>영업피해, 정신적 피해 보상 필요</li>
                              </ul>
                            </td>
                            <td class="list-td">
                              <ul>
                                <li>
                                  적합한 분쟁조정기관, 법률구조기관<br />
                                  안내 필요
                                </li>
                                <li>분쟁조정지원 필요</li>
                                <li>관련 분쟁 사례 등 정보 필요</li>
                                <li>손해배상청구 등 소송지원 필요</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">플랫폼</th>
                            <td colspan="2" class="img-td">
                              <img
                                src="/image/sub/intro/platform_icon.png"
                                alt="온라인 피해사례 - 플랫폼"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">솔루션</th>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>법률구조플랫폼</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      AI 기반 셀프체크알고리즘 및 대화형 챗봇
                                    </li>
                                    <li>종합 정보 분석, 진단 결과 안내</li>
                                    <li>적합한 연계기관 배정</li>
                                    <li>
                                      화상 서비스 제공, 전자접수 서비스 제공
                                    </li>
                                    <li>동의 시 연계기관 간 정보(자료) 공유</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td class="platform-td">
                              <div class="platform-box">
                                <div class="content-header">
                                  <strong>연계기관</strong>
                                </div>
                                <div class="content-body">
                                  <ul>
                                    <li>
                                      적합한 분쟁조정기관 안내(온라인피해365)
                                    </li>
                                    <li>
                                      피해 분쟁 조정 지원(각종분쟁조정기관)
                                    </li>
                                    <li>
                                      손해배상청구 등 소송지원(법률구조기관)
                                    </li>
                                    <li>
                                      관련분쟁사례 정보 제공(온라인피해365)
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </CommonTable>
                    </div>
                    <div class="text-box bottom-box">
                      <dl>
                        <dt>문제해결 결과</dt>
                        <dd>
                          <span class="text-span icon-arrow">
                            E씨는 온라인피해365센터 상담을 통해 방송통신위원회
                            인터넷피해구제를 신청함
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            E씨는 구매자와 합의에 이르지 못해 조정이
                            불성립되었음
                          </span>
                        </dd>
                        <dd>
                          <span class="text-span icon-arrow">
                            E씨는 법률구조기관을 통해 무료로 손해배상 청구 소송
                            지원받아 승소함
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <p>
                      * 위 사례는 ’26년 이후 제공될 플랫폼 서비스를 기초로
                      예상되는 활용 사례를 구성한 것으로, ’26년 이후 서비스
                      내용에 따라 변경될 수 있습니다.
                    </p>
                  </div>
                </CommonTabItem>
              </CommonTabs>
            </div>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/plt/service/index.scss';
</style>
