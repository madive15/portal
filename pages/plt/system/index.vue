<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import CommonTabItem from '~/components/tab/tabitem.vue';
import ImgBox from '~/components/display/img-box';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTitle from '~/components/ui/title/title.vue';
</script>

<template>
  <div class="sub-content-box" id="intro-services">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="플랫폼 시스템"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '플랫폼' },
            { text: '플랫폼 시스템', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="시스템 소개">
            <div class="intro-service-tab-content-box1">
              <CommonTitle type="bar" tag="h4" size="1"
                >시스템 소개</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조서비스 플랫폼은 인공지능(AI)과 플랫폼 기술을
                    기반으로 행정, 공공기관에서 서비스하고 있는 법률상담, 구조,
                    조정, 피해구제 등의 서비스를 안내하고, 플랫폼을 통하여
                    신청,접수,결과 <br />
                    확인까지 가능한 One-Stop 법률지원 시스템입니다.
                  </li>
                </ul>
              </div>
              <CommonTitle tag="h4" size="1">시스템 구성도</CommonTitle>
              <div class="img-box">
                <ImgBox useScroll>
                  <img
                    src="/image/sub/intro/platform_system01.png"
                    alt="플랫폼 시스템 구성도(상세 내용은 하단참고)"
                  />
                  <div class="sr-only">
                    <ul>
                      <li>
                        플랫폼 시스템은 서비스 영역과 법률구조플랫폼 영역으로
                        구분된다.
                      </li>
                      <li>
                        서비스 영역은 이용자 영역과 관리자 영역으로 나뉜다.
                      </li>
                      <li>
                        이용자 영역은 대국민을 대상으로 반응형웹(PC, 모바일을
                        통한 TLS, ANYID, 전자서명)과 콜센터(PBX, CTI, IVR),
                        알림앱(알림톡, 전자문서, 페이, SMS), 사회망(인스타그램,
                        메타, 트위터, 뉴스)을 통해 서비스가 이루어진다.
                      </li>
                      <li>
                        관리자 영역은 플랫폼 관리자와 기관관리자로 구분되며,
                        상담ㆍ관리(온라인 상담(답변등록)), 일정관리, 분석ㆍ통계
                        조회, 지식관리)와 모니터링(연계 현황, 트랜드 이슈)을
                        관리한다.
                      </li>
                      <li>
                        법률구조플랫폼은 클라우드 인터넷과 클라우드 행정망을
                        기반으로 반응형 웹서비스, 연계 서비스, 웹서비스와
                        DB영역으로 구분된다.
                      </li>
                      <li>
                        반응형 웹서비스는 이용자 영역의 반응형 웹과 콜센터와
                        연결되어 있고, 연계 서비스는 이용자 영역의 알림앱을 통해
                        알림을 발송한다.
                      </li>
                      <li>
                        이용자 영역의 사회망은 연계서비스를 통해 서비스와
                        연계된다.
                      </li>
                      <li>
                        관리자 영역은 플랫폼 웹서비스의 업무지원시스템과
                        연계되어 서비스를 제공한다.
                      </li>
                      <li>
                        플랫폼은 대국민포털, 챗볾ㆍ콜봇 시스템, 구조시스템,
                        관리자포털, 업무지원시스템, 지능형연계(행망), eGO/연계,
                        인공지능분석, 모니터링시스템으로 구성된다.
                      </li>
                      <li>
                        각 구성요소는 아래와 같이 구성되어있다.
                        <ul>
                          <li>
                            1. 대국민포털 - 기관 및 서비스 안내 - 상담예약(방문,
                            화상, 인터넷 등) - 상담신청 답변확인 - 사건(구조조정
                            구제) 접수
                          </li>
                          <li>
                            2. 챗봇ㆍ콜봇 시스템 - 전문기관매칭 - 기관별 서비스
                            안내
                          </li>
                          <li>3. 구조시스템 - 소송대리 - 조정 - 피해구제</li>
                          <li>
                            4. 관리자 포털 - 컨텐츠(기관안내, 일정) 관리 -
                            상담(방문, 화상) 예약 관리 - 온라인 상담 관리 -
                            분석통계정보 조회
                          </li>
                          <li>
                            5 업무지원시스템 - 전자접수시스템 - 전자송달시스템 -
                            전자서명시스템 - 통지시스템(알림톡, SNS 등)
                          </li>
                          <li>
                            6. 지능형연계(행망) - 플랫폼 접수사건 참여기관 연계
                            - 참여기관 간 사건 연계
                          </li>
                          <li>
                            7. eGO/연계 - 행정정보공동이용중계 서비스 -
                            행정정보전자지갑 - EGreen 서비스 - 국민비서 -
                            시회보장정보원소득기준
                          </li>
                          <li>
                            8. 인공지능분석 - 신청사건 분석 - 사회망트랜드, 이슈
                            분석 - 기관별 FAQ 질의 추출 - 시각화
                          </li>
                          <li>
                            9. 모니터링시스템 - 사건, 조회, 열람, 통계 -
                            개인정보조회 통제
                          </li>
                        </ul>
                      </li>
                      <li>
                        DB 영역은 공동 서비스 DB영역과 플랫폼 DB영역, 챗봇
                        지식베이스 DB영역이 유기적으로 연계되어있다.
                      </li>
                      <li>
                        공동 서비스 DB 영역은 치안정보, 관리자정보, 권한정보,
                        메뉴/서비스 정보, 인증서명정보, 캘린더, 교체,
                        만족도/정확도로 구성되어있고, 플랫폼 DB 영역은 상담신청,
                        상담결과, 상담이력, 연계기관정보, 기관별 연계대상정보,
                        기관별 송신데이터, 기관별 수신데이터로 구성되어있으며,
                        챗봇 지식베이스 DB 영역은 체당금/양육비/가정폭력으로
                        구성된 상담원본데이터와 공공용어/행정용어/일반정보,
                        일반상식QA로 구성된 공통지식베이스와 외부자료/공공자료,
                        정형/비정형데이터로 구성된 학습데이터와
                        보건복지부/행정안전부/문체부로 구성된 기관별
                        지식베이스와 퇴직금/개인회생/양육비로 구성된 표준질답
                        set, 임금/환경피해/보육비/파산으로 구성된 유사질의 set로
                        구성되어있다.
                      </li>
                      <li>
                        이러한 시스템들은 행정정보공통 이용센터와 ESB/REST Open
                        API를 통해 이용기관과 연계되어있다.
                      </li>
                    </ul>
                  </div>
                </ImgBox>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="대국민/참여기관 포털">
            <div class="intro-service-tab-content-box2">
              <CommonTitle tag="h4" type="bar" size="1"
                >대국민 포털 및 참여기관 관리자 포털</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    대국민 포털은 PC, 모바일(웹, 앱)에서 호환이 가능하고, 생성형
                    AI를 통한 맞춤형 기관ㆍ서비스ㆍ유사사례 안내와
                    법률지식정보를 제공함으로써 국민 법률복지 증진에 기여합니다.
                  </li>
                  <li>
                    참여기관 관리자 포털은 플랫폼의 기관 및 서비스 안내,
                    유사사례 등의 컨텐츠를 관리할 수 있는 기능을 구현하고,
                    기관별 특성을 반영한 예약ㆍ접수ㆍ증빙 첨부기능 및 참여
                    기관에 해당 정보를 연계할 <br />
                    수 있도록 하여 효율적인 업무처리가 가능하도록 설계됩니다.
                  </li>
                </ul>
              </div>
              <CommonTitle type="bar" tag="h4" size="1"
                >시스템 구성도</CommonTitle
              >
              <div class="img-box">
                <ImgBox useScroll>
                  <img
                    src="/image/sub/intro/platform_system02.png"
                    alt="대국민/참여기관 포털(상세 내용 하단 참고)"
                  />
                  <div class="sr-only">
                    <p>
                      사용자(대국민, 법률구조 기관, 유관기관)은 (대표)전화,
                      132콜센터 법률상담, 보이는 ARS, 콜봇, 채팅, 챗봇, 화상,
                      온라인(웹/모바일), (대면)면접, 이동, 서신과 같은 채널을
                      통해 법률구조 서비스 통합 플랫폼을 이용한다.
                      관리자(참여기관 관리자, 플랫폼 관리자, 플랫폼 운영)는
                      알림앱(알림톡, 전자문서, 페이, SMS)과 사회망(인스타그램,
                      메타, 트위터, 뉴스) 채널을 통해 DATABASE와 연계 된다.
                      사용자와 관리자는 웹/모바일 표준 반응형 웹
                      전자정부표준프레임워크 Cross Browsing 보안준수 연계 통합
                      서비스를 기반으로 한다.
                    </p>
                    <p>
                      법률구조 플랫폼 통합 플랫폼은 대국민 포털과 참여기관
                      관리자 포털, 플랫폼 관리로 구성되어있다. 대국민 포털은
                      상담예약, 나의 서비스 찾기로 구성된 My Law Platform과
                      콜센터, (AI)유사사례, 서비스 신청, 고객센터로 구성된
                      법률구조서비스 통합 플랫폼 소개로 구성되어있다. 참여기관
                      관리자 포털은 컨텐츠관리, 예약으로 구성된 Calendar와
                      사용자 관리, 통계로 구성된 To-Do, 행정문서(전자지갑),
                      보안으로 구성된 예약관리로 구성되어있다. 플랫폼 관리는
                      참여기관 관리, 사용자 관리, 권한관리, 열람/현황 관리, 통계
                      관리, 보안 관리로 구성되어있다.
                    </p>
                    <p>
                      법률구조서비스 통합 플랫폼은 구조대상자 전자적 확인,
                      전자증명서 발급, 구조신청 전자접수, 전자서명, 통지서비스,
                      안내문자/톡 발송, 전자송달, e-그린우편의 대표 메뉴로
                      구성되어있다.
                    </p>
                    <p>
                      DATABASE는 공통DB와 플랫폼DB, AI & Knowledge BASE DB로
                      구성된다. 공통DB는 회원정보(동의), 관리자 정보, 권한정보,
                      인증ㆍ서명 정보, 캘린더 정보, 공지사항 정보, 메뉴/서비스
                      정보, 기관/서비스 정보, 만족도/정확도 정보로 구성되어있고,
                      플랫폼 DB는 상담신청, 상담이력, 상담결과, 법률ㆍ서식,
                      법률구조, 법률정보, 접수, 이첩, 연계통합으로 구성되어있다.
                    </p>
                    <p>
                      AI & Knowledge BASE DB는 채당금/양육비/가정폭력으로 구성된
                      상담 원본데이터, 공공용어/행정용어와 일반상식QA/일반정보로
                      구성된 공통지식베이스와 외부자료/공공자료, 정형/비정형으로
                      구성된 학습데이트와 채당금/양육비/가정폭력으로 구성된
                      기관별 지식베이스와
                      퇴직금/양육비/가습기살균제/개인회생으로 구성된 표준질답
                      set와 임금/보육비/환경피해/파산으로 구성 된 유사set로
                      이루어져 있다.
                    </p>
                    <p>
                      이러한 시스템은 행정정보공동이용센터(ESB) / Web
                      Service(SOAP) / OpenAPI(REST 등) / EAI를 통해 이용기관들과
                      연계되어있다. 연계 방식으로는
                      법률구조/유관기관/법률ㆍ서식/각종신청/진행상황/결과안내는
                      표준 인터페이스를 적용하고, 행망 연계 정보공동활용은
                      활용가이드를 제공하여 연계되며, 공공데이터 오픈은
                      기술/업무 확장성을 제공하여 연계되어있다.
                    </p>
                  </div>
                </ImgBox>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="참여기관 연계시스템">
            <div class="intro-service-tab-content-box3">
              <CommonTitle type="bar" tag="h4"
                >참여기관 지능형 연계 시스템</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조서비스 플랫폼과 참여기관의 데이터 송수신은
                    행정정보공동이용망의 중계 서비스를 통해 이루어지며,
                    행정정보공동이용 조직코드를 부여받지 못한 기관은 소규모 EAI
                    시스템을 통해 정보의 <br />
                    송수신이 이루어지도록 구축됩니다. (’26년 예정)
                  </li>
                  <li>
                    유형별 연계방식을 표준화하여 향후 신규 수요 발생 시 확장성이
                    보장되도록 설계됩니다.(표준인터페이스 제공 : OpenAPI, Web
                    Service,EAI 등)
                  </li>
                </ul>
              </div>
              <CommonTitle tag="h4" type="bar" size="1"
                >시스템 구성도</CommonTitle
              >
              <div class="img-box">
                <!--<img
                  src="/image/sub/intro/platform_system03.png"
                  alt="참여기관 연계 시스템(상세 내용 하단참고)"
                />-->
                <picture>
                  <source
                    media="(max-width: 1199px)"
                    srcset="/image/sub/intro/platform_system03_mo.png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcset="/image/sub/intro/platform_system03.png"
                  />
                  <img
                    src="/image/sub/intro/platform_system03.png"
                    alt="참여기관 연계 시스템(상세 내용 하단참고)"
                  />
                </picture>

                <div class="sr-only">
                  <p>
                    다수 외부기관은 웹서비스, Open API, 행정정보 공동이용센터를
                    통해 통합플랫폼 연계체계와 연계되어있다. 통합 플랫폼
                    연계체계는 웹서비스, REST, HTTP, 행공모듈, FTP, EAI로
                    구성되어있다. 내부시스템은 2가지 ESB AGENT 영역으로
                    구성되어있는데, 연계 AP, 연계 DB, 연계 파일로 구성된 내부
                    서버 영역과 플랫폼 서버 영역으로 구성되어있다
                  </p>
                </div>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="법률구조 연계시스템">
            <div class="intro-service-tab-content-box4">
              <CommonTitle type="bar" tag="h4" size="1"
                >법률구조기관 연계시스템</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    법률구조기관(한국가정법률상담소, 대한가정법률복지상담원,
                    대한변협법률구조재단)에서 수행하는 상담예약, 온라인 상담,
                    사건접수 등 플랫폼 연계를 위한 연계시스템 구축으로
                    법률구조기관 간 <br />
                    효율적인 업무수행이 가능합니다.(’26년 예정)
                  </li>
                </ul>
              </div>
              <CommonTitle type="bar" tag="h4" size="1"
                >시스템 구성도</CommonTitle
              >
              <div class="img-box">
                <ImgBox useScroll>
                  <img
                    src="/image/sub/intro/platform_system04.png"
                    alt="법률구조 연계시스템(상세 내용 하단참고)"
                  />
                  <div class="sr-only">
                    <ul>
                      <li>
                        법률구조 연계시스템은 법률구조서비스 통합 플랫폼과
                        참여기관 관리자 포털과 법률구조기관으로 연계되어 있다.
                      </li>
                      <li>
                        법률구조 서비스 통합 플랫폼과 참여기관 관리자 포털의 각
                        기능은 연계되어 구현되어 있으며, 법률구조기관과 참여기관
                        관리자 포털은 지능형 연계로 구성되어있다.
                      </li>
                      <li>
                        법률구조 플랫폼 통합 플랫폼은 대국민 포털과 참여기관
                        관리자 포털, 플랫폼 관리로 구성되어있다. 대국민 포털은
                        상담예약, 나의 서비스 찾기로 구성된 My Law Platform과
                        콜센터, (AI)유사사례, 서비스 신청, 고객센터로 구성된
                        법률구조서비스 통합 플랫폼 소개로 구성되어있다. 참여기관
                        관리자 포털은 컨텐츠관리, 예약으로 구성된 Calendar와
                        사용자 관리, 통계로 구성된 To-Do, 행정문서(전자지갑),
                        보안으로 구성된 예약관리로 구성되어있다. 플랫폼 관리는
                        참여기관 관리, 사용자 관리, 권한관리, 열람/현황 관리,
                        통계 관리, 보안 관리로 구성되어있다. 법률구조서비스 통합
                        플랫폼은 구조대상자 전자적 확인, 전자증명서 발급,
                        구조신청 전자접수, 전자서명, 통지서비스, 안내문자/톡
                        발송, 전자송달, e-그린우편의 대표 메뉴로 구성되어있다.
                      </li>
                      <li>
                        법률구조서비스 통합 플랫폼은 4개의 참여기관 관리자 포털
                        메뉴를 통해 기능 구현이 되는데 해당 메뉴는 다음과 같다.
                        <ul>
                          <li>
                            - 기관 (구성 메뉴 : 기관소개, 주요사업 안내,
                            연계사업 안내, 기관 이용절차, 서비스 이용 자격 조건,
                            자가진단, 서비스 이용 서식, 증빙서류) - 사업(서비스)
                            (구성 메뉴 : 법률 상담, 소장/서류작성, 사건접수,
                            화해조정(화해권유/성립), 소송구조, 분쟁조정,
                            피해구제, 교육 및 기타 서비스) - 사례 (구성 메뉴 :
                            법률상담 사례, 법률구조 사례, 각 기관사례(분쟁 조정,
                            피해구제(보상/FAQ/기타)) - 서식 (구성 메뉴 : 기관
                            서식(법률구조 서비스기관/정부부처 및 법원/지자체
                            산하기관/공공기관/특수법인 및 단체)
                          </li>
                        </ul>
                      </li>
                      <li>
                        법률구조기관은 3개의 기관과 참여기관 관리자 포털과
                        지능형으로 연계되어있으며 구성 메뉴는 다음과 같다.
                        <ul>
                          <li>
                            - 한국가정법률상담소 (구성 메뉴 :
                            법률구조(법률구조/법률상담/소장 등
                            서류작성/화해조정/소송구조/처리절차도표/처리건수/소송구조사례),
                            법률정보(법률서식/가족법/법안/판례),
                            온라인상담실(사이버상담실/화상상담실),
                            가정폭력상담(이용안내/프로그램/FAQ/예방지침/관련법률)
                          </li>
                          <li>
                            - 대한가정법률복지상담원 (구성 메뉴 :
                            상담안내(상담방법/찾아오시는 길),
                            사업소개(법률구조사업/교육/예방/Foster
                            Home/법률개정운동/지부설치/지원),
                            온라인상담(자주하는 질문/공개게시판/비공개게시판),
                            공지사항(새소식/사진자료실/법률복지/자료집/관련사이트),
                            법률정보(서식모음/최신판례/강좌자료)
                          </li>
                          <li>
                            - 대한변협법률구조재단 (구성 메뉴 :
                            사업소개(법률구조사업소개/사회소외계층/다문화가정ㆍ이주외국민ㆍ난민/북한이탈주민/가정폭력ㆍ성폭력피해자/한부모가정)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </ImgBox>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="인공지능(AI) 서비스">
            <div class="intro-service-tab-content-box6">
              <CommonTitle tag="h4" type="bar" size="1">
                인공지능 유관기관 매칭 / 유사사례 제공 등 법률 정보 서비스
                시스템 (’26년 예정)
              </CommonTitle>
              <div class="text-box">
                <ul>
                  <li>
                    단순, 반복 문의 등 정형화된 상담과 비교적 간단한
                    기본문의사항은 생성형 AI와 연계한 챗봇, 콜봇시스템을 통해
                    정보를 제공합니다.
                  </li>
                  <li>
                    고객맞춤형 법률지식 정보는 대한법률구조공단 인공지능
                    법률구조 서비스와 연계하여 서비스를 제공합니다.
                  </li>
                </ul>
              </div>
              <CommonTitle tag="h4" type="bar" size="1"
                >시스템 구성도</CommonTitle
              >
              <div class="img-box">
                <ImgBox useScroll>
                  <img
                    src="/image/sub/intro/platform_system05.png"
                    alt="인공지능(AI)(상세 내용 하단참고)"
                  />
                  <div class="sr-only">
                    <p>
                      인공지능 유관기관 매칭 및 유사사례 제공 등 법률정보
                      서비스는 음성과 텍스트의 자연어 질문 시 전처리(문장분리기,
                      문장부호처리) 단계 후 자연어 이해(형태소, 개체명,
                      의존구문분석) 단계 후 질문분석(도메인클래스 질문초점,
                      질의검색) 단계를 거쳐 응답문 생성(음답추론/후보생성/신뢰도
                      추론, 음답생성(NLG)단계를 통해 콜봇, 챗봇 응대로 매칭정보,
                      유사사례, 기본상담을 진행한다.
                    </p>
                    <p>
                      질문 후 처리 단계는 자연어 이해 단계에서는 지식기반(KMS)
                      지도학습을 통해 진행되는데 전처리, 자연어 이해 단계에서는
                      FAQ, KMS, 업무메뉴얼 등의 기계학습과 인공지능 언어/사전
                      데이터를 사용하고, 질문 분석, 응답문 생성 단계에서는
                      Frame/Slot, Host I/F, NLG의 자연어, 대화식 형태의
                      시나리오, Role DB를 사용한다.
                    </p>
                    <p>
                      지식기반(KMS) 지도학습은 문서집합(법령 외) 데이터와
                      연계되는데, 문서집합 데이터는 자질추출, 색인/정렬, 빈도수
                      중요도, 역색인, 검색조회, REST API의 기능을 한다.
                    </p>
                  </div>
                </ImgBox>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="인공지능  컨택센터(AICC)">
            <div class="intro-service-tab-content-box6">
              <CommonTitle type="bar" tag="h4" size="1"
                >인공지능 기반 콜센터 및 상담시스템</CommonTitle
              >
              <div class="text-box">
                <ul>
                  <li>
                    디지털 취약계층의 법률구조 플랫폼 접근·이용가능성을 증진하기
                    위해 인공지능 기반의 콜센터와 콜봇, 보이는 ARS 기반의
                    인공지능 컨택센터(AICC)를 구축하여 다양한 방법으로
                    법률정보와 <br />
                    법률서비스를 제공받을 수 있습니다.(’26년 예정)
                  </li>
                </ul>
              </div>
              <CommonTitle tag="h4" type="bar" size="1"
                >시스템 구성도</CommonTitle
              >
              <div class="img-box">
                <!--<img
                  src="/image/sub/intro/platform_system06.png"
                  alt="인공지능 컨벡센터(AICC)(상세 내용 하단참고)"
                />-->
                <picture>
                  <source
                    media="(max-width: 1199px)"
                    srcset="/image/sub/intro/platform_system06_mo.png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcset="/image/sub/intro/platform_system06.png"
                  />
                  <img
                    src="/image/sub/intro/platform_system06.png"
                    alt="인공지능 컨벡센터(AICC)(상세 내용 하단참고)"
                  />
                </picture>
                <div class="sr-only">
                  <ul>
                    <li>
                      인공지능 기반 콜센터 및 상담시스템은 디지털 취약계층의
                      법률구조 플랫폼 접근, 이용 가능성을 증진하기위해 전화,
                      문자, 메일, 웹 등의 다양한 매체를 통해 접근할 수 있고,
                      컨텍센터 플랫폼과 통합운영관리, 인공지능 플랫폼과 AI &
                      Knowledge Base DB와 유기적으로 연계되어 서비스 된다.
                    </li>
                    <li>
                      컨텍센터 플랫폼은 PBX, CTI, REC, IVR, 상담 AP, KMS로
                      구성되어있고, 통합운영관리는 운영관리, 시나리오관리,
                      자원관리, 통계, 환경구성, 모니터링으로 구성되어있다.
                    </li>
                    <li>
                      인공지능 플랫폼은 콜봇/챗봇, TTS/STT, NLU/NLPLLM, TA으로
                      구성된 인공지능 엔진모듈과 신청사건 분석, 사회망 다차원
                      분석, 기관별 FAQ 질의추출, 시각화로 구성된 인공지능
                      분석으로 이루어져 있다.
                    </li>
                    <li>
                      AI & Knowledge Base DB는 6개의 구성요소로 아래와 같이
                      구성되어있다.
                      <p>
                        - 상단원본데이터 (구성 메뉴 : 체당금/양육비/가정폭력) -
                        공통지식베이스 (구성 메뉴 : 공공용어/행정용어, 일반상식
                        QA/일반정보) - 학습데이터 (구성 메뉴 :
                        외부자료/공공자료, 정형/비정형) - 기관별 지식베이스
                        (구성 메뉴 : 체당금/양육비/가정폭력) - 표준질답 Set
                        (구성 메뉴 : 퇴직금/양육비, 가습기살균제/개인회생) -
                        유사질답 Set (구성 메뉴 : 임금/보육비, 환경피해/파산)
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CommonTabItem>
          <!-- 2024.12.30 QC 결함조치로 인하여 두 탭은 주석처리 : 김동영
          <CommonTabItem title="참여기관 협업단계">
            <div class="intro-service-tab-content-box7">
              <h4>정보제공</h4>
              <div class="text-box">
                <dl>
                  <dt>기초정보 제공 서비스</dt>
                  <dd>
                    각종 법률문제에 처한 국민이 어디에서 문제를 해결할 수 있을지
                    플랫폼이 정보를 제공하여 해당기관 및 서비스로 안내
                  </dd>
                  <dd class="no-desc-dd">
                    <span class="icon-span">
                      <img
                        src="/image/sub/intro/arrow_blue.svg"
                        alt="참여기관 협업단계"
                      />
                    </span>
                    <span class="text-span">
                      <b>정보 연계 단계</b> : 안내 및 정보소재 링크
                    </span>
                  </dd>
                </dl>
              </div>
              <h4>1단계</h4>
              <div class="text-box">
                <dl>
                  <dt>1단계 정보제공 및 참여기관 연계 서비스</dt>
                  <dd>
                    플랫폼은 국민의 필요에 적합한 법률구조기구 및 공공서비스를
                    인공지능을 통한 매칭서비스를 통해 연계하고 신청까지 원스톱
                    지원
                  </dd>
                  <dd class="no-desc-dd">
                    <span class="icon-span">
                      <img
                        src="/image/sub/intro/arrow_blue.svg"
                        alt="참여기관 협업단계"
                      />
                    </span>
                    <span class="text-span">
                      <b>정보 연계 단계</b> : 접수(접수링크 포함)까지
                    </span>
                  </dd>
                </dl>
              </div>
              <h4>2단계</h4>
              <div class="text-box">
                <dl>
                  <dt>2단계 정보제공 및 참여기관 연계 서비스</dt>
                  <dd>
                    플랫폼은 참여기관들이 공동으로 업무 처리할 수 있는 장이
                    되어, 필요정보가 교환되고 각 기관의 처리 결과 등을 플랫폼과
                    공유
                  </dd>
                  <dd class="no-desc-dd">
                    <span class="icon-span">
                      <img
                        src="/image/sub/intro/arrow_blue.svg"
                        alt="참여기관 협업단계"
                      />
                    </span>
                    <span class="text-span">
                      <b>정보 연계 단계</b> : 접수와 결과 공유
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </CommonTabItem>
          <CommonTabItem title="참여기관 현황">
            <div class="intro-service-tab-content-box7">
              <h4>참여기관 현황</h4>
              <div class="table-box">
                <table>
                  <thead>
                    <tr>
                      <th class="num-th">순번</th>
                      <th class="category-th">구분</th>
                      <th class="public-th">기관명</th>
                      <th class="platform-th">플랫폼 연계사업</th>
                      <th class="step-th">연계정도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="num-td">1</td>
                      <td rowspan="4" class="category-td">
                        법률구조기관(법인)
                      </td>
                      <td class="public-td">대한법률구조공단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>법률상담, 소송구조, 법문화교육</li>
                            <li>임대차분쟁조정신청</li>
                            <li>공익사건모집, 국민제보</li>
                            <li>혼자하는 소송 법률지원센터</li>
                            <li>법률구조기관 간 사건 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td class="public-td">한국가정법률상담소</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>법률상담, 가정폭력상담</li>
                            <li>소송구조, 화해조정</li>
                            <li>법률구조기관 간 사건 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td class="public-td">대한가정법률복지상담원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>법률상담, 가정폭력상담</li>
                            <li>소송구조, 화해조정</li>
                            <li>법률구조기관 간 사건 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td class="public-td">대한변협법률구조재단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>소송구조</li>
                            <li>법률구조기관 간 사건 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>

                    <tr>
                      <td class="num-td">5</td>
                      <td rowspan="8" class="category-td">정부부처 및 법원</td>
                      <td class="public-td">법무부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>법률홈닥터 법률상담 신청</li>
                            <li>마을변호사 법률상담 정보제공 및 연계</li>
                            <li>중소기업 법률지원 신청</li>
                            <li>범죄피해자 지원 정보제공</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td class="public-td">통일부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>북한이탈주민 지원 및 상담 안내</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>7</td>
                      <td class="public-td">국가보훈부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등
                              정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td class="public-td">보건복지부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>사회복지서비스 찾기(복지로) 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>9</td>
                      <td class="public-td">고용노동부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>임금체불피해근로자 진정신청 정보 연계</li>
                            <li>체불피해근로자 지원 연계(법률구조기관)</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>10</td>
                      <td class="public-td">여성가족부</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>가정폭력 긴급지원 정보 연계</li>
                            <li>한부모가족/결혼이민자/귀화자 지원 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>11</td>
                      <td class="public-td">금융위원회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              채무자대리인 및 소송변호사 무료지원 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>12</td>
                      <td class="public-td">법원행정처</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>종합법률정보, 전자민원센터 정보 연계</li>
                            <li>
                              법원소송구조, 국선변호, 장애인 사법지원 등
                              사법지원제도 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td class="num-td">13</td>
                      <td rowspan="2" class="category-td">
                        지방자치단체 산하기관
                      </td>
                      <td class="public-td">서울시복지재단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>공익사건 법률구조기관 연계</li>
                            <li>서울시민 금융복지 상담</li>
                            <li>개인회생파산 신청 조력</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>14</td>
                      <td class="public-td">경기도서민금융복지지원센터</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>경기도시민 금융복지 상담</li>
                            <li>개인회생파산 신청 조력</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td class="num-td">15</td>
                      <td rowspan="20" class="category-td">공공기관 등</td>
                      <td class="public-td">근로복지공단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>간이대지급금 지급 신청 연계</li>
                            <li>생계비 융자신청 정보</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>16</td>
                      <td class="public-td">금융감독원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>불법사금융 피해신고</li>
                            <li>채무자대리인 및 소송변호사 무료지원</li>
                            <li>채무자대리인 법률지원 법률구조기관 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>17</td>
                      <td class="public-td">대한변호사협회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              채무자대리인 및 소송변호사 무료지원 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>18</td>
                      <td class="public-td">대한상사중재원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>상거래분쟁 중재/조정/알선 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>19</td>
                      <td class="public-td">서민금융진흥원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              서민금융상품 등 정보 및 서민금융통합지원센터 연계
                            </li>
                            <li>국민행복기금 연계</li>
                            <li>개인회생·파산 신청지원 법률구조기관 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>

                    <tr>
                      <td>20</td>
                      <td class="public-td">소상공인시장진흥공단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>불공정거래 피해상담</li>
                            <li>소상공인 법률지원 법률구조기관 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>21</td>
                      <td class="public-td">스마일센터</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>범죄피해자 심리 지원 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>22</td>
                      <td class="public-td">신용회복위원회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>개인채무조정 프로그램 신청 정보 연계</li>
                            <li>
                              개인회생·파산 신청 조력 및 법률구조기관 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>23</td>
                      <td class="public-td">아동권리보장원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>아동학대/아동복지 상담 연계</li>
                            <li>
                              취약계층아동 통합서비스 지원(드림스타드) 정보 연계
                            </li>
                            <li>자립준비청년 장립정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>24</td>
                      <td class="public-td">양육비이행관리원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>양육비 상담 및 양육비 이행확보 지원신청</li>
                            <li>한시적 양육비 긴급지원 신청</li>
                            <li>양육비이행확보 법률지원 법률구조기관 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">2단계</td>
                    </tr>

                    <tr>
                      <td>25</td>
                      <td class="public-td">전국범죄피해자지원연합회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>범죄피해자 심리 지원 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>26</td>
                      <td class="public-td">
                        전자문서·전자거래 분쟁조정위원회
                      </td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              전자거래 피해 상담 및 분쟁조정 신청 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>27</td>
                      <td class="public-td">주택도시보증공사</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              전세피해자 법률상담/피해접수 등 전세피해지원센터
                              정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>28</td>
                      <td class="public-td">중소벤처기업진흥공단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>소규모중소기업인 재기지원사업 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>29</td>
                      <td class="public-td">한국예술인복지재단</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>예술인 법률상담 및 예술인 신문고 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>30</td>
                      <td class="public-td">한국의료분쟁조정중재원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              의료분쟁 상담 및 의료분쟁조정/중재 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>31</td>
                      <td class="public-td">한국자산관리공사</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>채무조정(온크레딧)</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>32</td>
                      <td class="public-td">한국저작권위원회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              저작권 법률상담 및 저작권 분쟁 조정·알선 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>

                    <tr>
                      <td>33</td>
                      <td class="public-td">한국정보통신진흥협회</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>
                              온라인 피해구제 상담(온라인피해365센터) 정보 연계
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">1단계</td>
                    </tr>

                    <tr>
                      <td>34</td>
                      <td class="public-td">한국환경산업기술원</td>
                      <td class="platform-td">
                        <div class="platform-box">
                          <ul>
                            <li>환경오염 피해구제 정보 연계</li>
                            <li>가습기살균제 피해구제 정보 연계</li>
                          </ul>
                        </div>
                      </td>
                      <td class="step-td">정보제공</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>* 현재까지의 플랫폼 참여기관 현황으로 변동가능성 있음</p>
            </div>
          </CommonTabItem>
          -->
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/plt/system/index.scss';
</style>
