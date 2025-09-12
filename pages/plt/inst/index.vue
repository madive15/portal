<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Tab from '~/components/tab/tab.vue';
import CommonTabItem from '~/components/tab/tabitem.vue';
import CommonTabs from '~/components/ui/tab/tab.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
</script>

<template>
  <div class="sub-content-box" id="intro-service">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="플랫폼 참여기관"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '플랫폼' },
            { text: '플랫폼 참여기관', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container new-container">
        <CommonTabs :platform-tab-show="true">
          <CommonTabItem title="참여기관 협업단계">
            <CommonTitle type="bar" tag="h4" size="1">정보연계</CommonTitle>
            <div class="text-box">
              <dl>
                <dt>기초정보 제공 서비스</dt>
                <dd>
                  각종 법률문제에 처한 국민이 어디에서 문제를 해결할 수 있을지
                  플랫폼이 정보를 제공하여 해당기관 및 서비스로 안내
                </dd>
                <dd class="no-desc-dd">
                  <span class="text-span icon-arrow">
                    <b>정보 연계 단계</b> : 안내 및 정보소재 링크
                  </span>
                </dd>
              </dl>
            </div>
            <CommonTitle type="bar" tag="h4" size="1">신청연계</CommonTitle>
            <div class="text-box">
              <dl>
                <dt>1단계 정보제공 및 참여기관 연계 서비스</dt>
                <dd>
                  플랫폼은 국민의 필요에 적합한 법률구조기구 및 공공서비스를
                  인공지능을 통한 매칭서비스를 통해 연계하고 신청까지 원스톱
                  지원
                </dd>
                <dd class="no-desc-dd">
                  <span class="text-span icon-arrow">
                    <b>정보 연계 단계</b> : 접수(접수링크 포함)까지
                  </span>
                </dd>
              </dl>
            </div>
            <CommonTitle tag="h4" type="bar" size="1">처리연계</CommonTitle>
            <div class="text-box">
              <dl>
                <dt>2단계 정보제공 및 참여기관 연계 서비스</dt>
                <dd>
                  플랫폼은 참여기관들이 공동으로 업무 처리할 수 있는 장이 되어,
                  필요정보가 교환되고 각 기관의 처리 결과 등을 플랫폼과 공유
                </dd>
                <dd class="no-desc-dd">
                  <span class="text-span icon-arrow">
                    <b>정보 연계 단계</b> : 접수와 결과 공유
                  </span>
                </dd>
              </dl>
            </div>
          </CommonTabItem>
          <CommonTabItem title="참여기관 현황">
            <CommonTitle type="bar" tag="h4" size="1"
              >참여기관 현황</CommonTitle
            >
            <div class="table-box">
              <CommonTable class="pc-only" type="bordered">
                <caption>
                  참여기관 현황 - 순번, 구분, 기관명, 플랫폼 연계사업,
                  연계정도에 대한 표
                </caption>
                <thead>
                  <tr>
                    <th class="num-th" scope="col">순번</th>
                    <th class="category-th" scope="col">구분</th>
                    <th class="public-th" scope="col">기관명</th>
                    <th class="platform-th" scope="col">플랫폼 연계사업</th>
                    <th class="step-th" scope="col">연계정도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="num-td">1</td>
                    <td rowspan="4" class="category-td">
                      법률구조기관<br />(법인 4개)
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
                    <td class="step-td">처리연계</td>
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
                    <td class="step-td">처리연계</td>
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
                    <td class="step-td">처리연계</td>
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
                    <td class="step-td">처리연계</td>
                  </tr>
                  <tr>
                    <td class="num-td">5</td>
                    <td rowspan="8" class="category-td">
                      정부부처 및 법원 (8개)
                    </td>
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
                    <td class="step-td">신청연계</td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td class="public-td">
                      통일부
                      <span class="td-br"> (남북하나재단) </span>
                    </td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>북한이탈주민 지원 및 상담 안내</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
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
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td class="public-td">보건복지부</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>사회복지서비스 찾기(복지로) 정보 연계</li>
                          <li>보건복지상담센터 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
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
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td class="public-td">
                      여성가족부
                      <span class="td-br"> (한국여성인권진흥원) </span>
                    </td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>가정폭력 긴급지원 정보 연계</li>
                          <li>한부모가족/결혼이민자/귀화자 지원 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td class="public-td">금융위원회</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>채무자대리인 및 소송변호사 무료지원 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td class="public-td">법원행정처</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>종합법률정보, 소송안내마당 정보 연계</li>
                          <li>
                            법원소송구조, 국선변호, 장애인 사법지원 등
                            사법지원제도 정보 연계
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td class="num-td">13</td>
                    <td rowspan="3" class="category-td">
                      지자체 산하기관 (3개)
                    </td>
                    <td class="public-td">
                      서울시복지재단
                      <span class="td-br">
                        (서울사회복지공익법센터/
                        <span class="td-br"> 서울금융복지상담센터) </span>
                      </span>
                    </td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>공익사건 법률구조기관 연계 (공익법센터)</li>
                          <li>서울시민 금융복지 상담 (금융복지센터)</li>
                          <li>개인회생파산 신청 조력 (금융복지센터)</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
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
                    <td class="step-td">신청연계</td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td class="public-td">인천광역시사회서비스원</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>인천시민 대상 주요 서비스 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td class="num-td">16</td>
                    <td rowspan="13" class="category-td">공공기관 (13개)</td>
                    <td class="public-td">근로복지공단</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>간이대지급금 지급 신청 연계</li>
                          <li>생계비 융자신청 정보</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>17</td>
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
                    <td class="step-td">처리연계</td>
                  </tr>
                  <tr>
                    <td>18</td>
                    <td class="public-td">소상공인시장진흥공단</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>불공정거래 피해상담</li>
                          <li>소상공인 법률지원 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>19</td>
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
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>20</td>
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
                    <td class="step-td">처리연계</td>
                  </tr>
                  <tr>
                    <td>21</td>
                    <td class="public-td">
                      한국인터넷진흥원
                      <span class="td-br">
                        (전자문서·전자거래 분쟁조정위원회)
                      </span>
                    </td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>전자거래 피해 상담 및 분쟁조정 신청 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>22</td>
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
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>23</td>
                    <td class="public-td">중소벤처기업진흥공단</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>소규모중소기업인 재기지원사업 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>24</td>
                    <td class="public-td">한국예술인복지재단</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>예술인 법률상담 및 예술인 신문고 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>25</td>
                    <td class="public-td">한국의료분쟁조정중재원</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>의료분쟁 상담 및 의료분쟁조정/중재 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>26</td>
                    <td class="public-td">한국자산관리공사</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>채무조정(온크레딧)</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>27</td>
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
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>28</td>
                    <td class="public-td">한국환경산업기술원</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>환경오염 피해구제 정보 연계</li>
                          <li>가습기살균제 피해구제 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>29</td>
                    <td rowspan="7" class="category-td">
                      특수법인 및 단체 (7개)
                    </td>
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
                    <td class="step-td">신청연계</td>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td class="public-td">대한변호사협회</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>
                            변협 "나의 변호사" 정보연계(법률상담 및 변호사 선임)
                          </li>
                          <li>북한이탈주민법률지원변호사단 제도 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>31</td>
                    <td class="public-td">대한상사중재원</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>상거래분쟁 중재/조정/알선 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>32</td>
                    <td class="public-td">스마일센터</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>범죄피해자 심리 지원 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>

                  <tr>
                    <td>33</td>
                    <td class="public-td">신용회복위원회</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>개인채무조정 프로그램 신청 정보 연계</li>
                          <li>개인회생·파산 신청 조력 및 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>34</td>
                    <td class="public-td">전국범죄피해자지원연합회</td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>범죄 피해자 지원센터 정보 연계</li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                  <tr>
                    <td>35</td>
                    <td class="public-td">
                      한국정보통신진흥협회
                      <span class="td-br"> (온라인피해365센터) </span>
                    </td>
                    <td class="platform-td">
                      <div class="platform-box">
                        <ul>
                          <li>
                            온라인 피해구제 상담(온라인피해365센터) 정보 연계
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td class="step-td">정보연계</td>
                  </tr>
                </tbody>
              </CommonTable>
              <div class="mo-table-list mo-only">
                <div class="table-item">
                  <div class="item-tit">1. 대한법률구조공단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">법률구조기관(법인)</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>법률상담, 소송구조, 법문화교육</li>
                          <li>임대차분쟁조정신청</li>
                          <li>공익사건모집, 국민제보</li>
                          <li>혼자하는 소송 법률지원센터</li>
                          <li>법률구조기관 간 사건 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">2. 한국가정법률상담소</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">법률구조기관(법인)</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>법률상담, 가정폭력상담</li>
                          <li>소송구조, 화해조정</li>
                          <li>법률구조기관 간 사건 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">3. 대한가정법률복지상담원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">법률구조기관(법인)</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>법률상담, 가정폭력상담</li>
                          <li>소송구조, 화해조정</li>
                          <li>법률구조기관 간 사건 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">4. 대한변협법률구조재단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">법률구조기관(법인)</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>소송구조</li>
                          <li>법률구조기관 간 사건 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">5. 법무부</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>법률홈닥터 법률상담 신청</li>
                          <li>마을변호사 법률상담 정보제공 및 연계</li>
                          <li>중소기업 법률지원 신청</li>
                          <li>범죄피해자 지원 정보제공</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">신청연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">6. 통일부(남북하나재단)</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>북한이탈주민 지원 및 상담 안내</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">7. 국가보훈부</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            국가유공자, 독립·전쟁·민주화 유공자 및 피해자 등
                            정보 연계
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">8. 보건복지부</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>사회복지서비스 찾기(복지로) 정보 연계</li>
                          <li>보건복지상담센터 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">9. 고용노동부</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>임금체불피해근로자 진정신청 정보 연계</li>
                          <li>체불피해근로자 지원 연계(법률구조기관)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">10. 여성가족부(한국여성인권진흥원)</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>가정폭력 긴급지원 정보 연계</li>
                          <li>한부모가족/결혼이민자/귀화자 지원 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">11. 금융위원회</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>채무자대리인 및 소송변호사 무료지원 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">12. 법원행정처</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">정부부처 및 법원</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>종합법률정보, 소송안내마당 정보 연계</li>
                          <li>
                            법원소송구조, 국선변호, 장애인 사법지원 등
                            사법지원제도 정보 연계
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">
                    13.
                    서울시복지재단(서울사회복지공익법센터/서울금융복지상담센터)
                  </div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">지자체 산하기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>공익사건 법률구조기관 연계 (공익법센터)</li>
                          <li>서울시민 금융복지 상담 (금융복지센터)</li>
                          <li>개인회생파산 신청 조력 (금융복지센터)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">14. 경기도서민금융복지지원센터</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">지자체 산하기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>경기도시민 금융복지 상담</li>
                          <li>개인회생파산 신청 조력</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">신청연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">15. 인천광역시사회서비스원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">지자체 산하기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>인천시민 대상 주요 서비스 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">16. 근로복지공단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>간이대지급금 지급 신청 연계</li>
                          <li>생계비 융자신청 정보</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">17. 서민금융진흥원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            서민금융상품 등 정보 및 서민금융통합지원센터 연계
                          </li>
                          <li>국민행복기금 연계</li>
                          <li>개인회생·파산 신청지원 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">18. 소상공인시장진흥공단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>불공정거래 피해상담</li>
                          <li>소상공인 법률지원 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">19. 아동권리보장원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>아동학대/아동복지 상담 연계</li>
                          <li>
                            취약계층아동 통합서비스 지원(드림스타드) 정보 연계
                          </li>
                          <li>자립준비청년 장립정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">20. 양육비이행관리원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>양육비 상담 및 양육비 이행확보 지원신청</li>
                          <li>한시적 양육비 긴급지원 신청</li>
                          <li>양육비이행확보 법률지원 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">처리연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">
                    21. 한국인터넷진흥원(전자문서·전자거래 분쟁조정위원회)
                  </div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>전자거래 피해 상담 및 분쟁조정 신청 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">22. 주택도시보증공사</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            전세피해자 법률상담/피해접수 등 전세피해지원센터
                            정보 연계
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">23. 중소벤처기업진흥공단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>소규모중소기업인 재기지원사업 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">24. 한국예술인복지재단</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>예술인 법률상담 및 예술인 신문고 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">25. 한국의료분쟁조정중재원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>의료분쟁 상담 및 의료분쟁조정/중재 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">26. 한국자산관리공사</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>채무조정(온크레딧)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">27. 한국저작권위원회</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            저작권 법률상담 및 저작권 분쟁 조정·알선 정보 연계
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">28. 한국환경산업기술원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">공공기관</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>환경오염 피해구제 정보 연계</li>
                          <li>가습기살균제 피해구제 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">29. 금융감독원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>불법사금융 피해신고</li>
                          <li>채무자대리인 및 소송변호사 무료지원</li>
                          <li>채무자대리인 법률지원 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">신청연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">30. 대한변호사협회</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            변협 "나의 변호사" 정보연계(법률상담 및 변호사 선임)
                          </li>
                          <li>북한이탈주민법률지원변호사단 제도 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">31. 대한상사중재원</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>상거래분쟁 중재/조정/알선 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">32. 스마일센터</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>범죄피해자 심리 지원 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">33. 신용회복위원회</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>개인채무조정 프로그램 신청 정보 연계</li>
                          <li>개인회생·파산 신청 조력 및 법률구조기관 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">34. 전국범죄피해자지원연합회</div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>범죄 피해자 지원센터 정보 연계</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="item-tit">
                    35. 한국정보통신진흥협회(온라인피해365센터)
                  </div>
                  <div class="item-info">
                    <div class="info-tit">구분</div>
                    <div class="info-cont">특수법인 및 단체</div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">플랫폼 연계사업</div>
                    <div class="info-cont">
                      <div class="platform-box">
                        <ul>
                          <li>
                            온라인 피해구제 상담(온라인피해365센터) 정보 연계
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-info">
                    <div class="info-tit">연계정도</div>
                    <div class="info-cont">정보연계</div>
                  </div>
                </div>
              </div>
            </div>
            <p>* 현재까지의 플랫폼 참여기관 현황으로 변동가능성 있음</p>
          </CommonTabItem>
        </CommonTabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/plt/inst/index.scss';
</style>
