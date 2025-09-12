<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="개인정보처리방침"
          :showPrintButton="true"
          :breadcrumbItems="[{ text: '개인정보처리방침', active: true }]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4>개인정보처리방침</h4>
        <p>
          <span class="txt-red"
            >법무부·대한법률구조공단(이하 “기관”이라 한다)</span
          >은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계
          법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게
          관리하고 있습니다.<br />
          이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에
          관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게
          처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
          수립·공개합니다.
        </p>
        <div class="table-box">
          <table class="pc-only">
            <caption>
              주요 개인정보 처리 정보(라벨링) - 개인정보 수집, 개인정보 처리
              목적, 개인정보 보유기간에 대한 표
            </caption>
            <colgroup>
              <col style="width: 33%" />
              <col style="width: 33%" />
              <col style="width: 33%" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="3" scope="col">주요 개인정보 처리표시(라벨링)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="title-th" scope="col">개인정보 수집</th>
                <th class="title-th" scope="col">개인정보 처리 목적</th>
                <th class="title-th" scope="col">개인정보 보유기간</th>
              </tr>
              <tr>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon01.png"
                        alt="개인정보 수집"
                      />
                    </div>
                    <div class="text-box">
                      <p>
                        이름, 아이디, 비밀번호, 주소, 휴대전화번호, 전화번호,
                        이메일주소,<span class="txt-red">
                          CI값 (외국인) 외국인등록번호, 여권번호</span
                        >
                      </p>
                    </div>
                  </div>
                </td>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon02.png"
                        alt="개인정보 처리 목적"
                      />
                    </div>
                    <div class="text-box">
                      <p>사이트 이용을 위한 회원가입</p>
                    </div>
                  </div>
                </td>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon03.png"
                        alt="개인정보 보유기간"
                      />
                    </div>
                    <div class="text-box">
                      <p>회원 탈퇴 시 까지</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="col">개인정보 제3자 제공</th>
                <th class="title-th" scope="col">개인정보 처리위탁</th>
                <th class="title-th" scope="col">개인정보 민원처리 담당부서</th>
              </tr>
              <tr>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon04.png"
                        alt="개인정보 제3자 제공"
                      />
                    </div>
                    <div class="text-box">
                      <p>없음</p>
                    </div>
                  </div>
                </td>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon05.png"
                        alt="개인정보 처리위탁"
                      />
                    </div>
                    <div class="text-box">
                      <p>없음</p>
                    </div>
                  </div>
                </td>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon06.png"
                        alt="개인정보 민원처리 담당부서"
                      />
                    </div>
                    <div class="text-box">
                      <p>처리 부서 : 정보전략부</p>
                      <span class="txt-red">전화번호 : 054-810-1164</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
          <table class="mo-only">
            <caption>
              주요 개인정보 처리 정보(라벨링) - 개인정보 수집, 개인정보 처리
              목적, 개인정보 보유기간에 대한 표
            </caption>

            <thead>
              <tr>
                <th colspan="2" scope="col">주요 개인정보 처리표시(라벨링)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="title-th" scope="row">개인정보 수집</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon01.png"
                        alt="개인정보 수집"
                      />
                    </div>
                    <div class="text-box">
                      <p>
                        이름, 아이디, 비밀번호, 주소, 휴대전화번호, 전화번호,
                        이메일주소,<span class="txt-red">
                          CI값 (외국인) 외국인등록번호, 여권번호</span
                        >
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="row">개인정보 처리 목적</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon02.png"
                        alt="개인정보 처리 목적"
                      />
                    </div>
                    <div class="text-box">
                      <p>사이트 이용을 위한 회원가입</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="row">개인정보 보유기간</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon03.png"
                        alt="개인정보 보유기간"
                      />
                    </div>
                    <div class="text-box">
                      <p>회원 탈퇴 시 까지</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="row">개인정보 제3자 제공</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon04.png"
                        alt="개인정보 제3자 제공"
                      />
                    </div>
                    <div class="text-box">
                      <p>없음</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="row">개인정보 처리위탁</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon05.png"
                        alt="개인정보 처리위탁"
                      />
                    </div>
                    <div class="text-box">
                      <p>없음</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="title-th" scope="row">개인정보 민원처리 담당부서</th>
                <td class="content-td">
                  <div class="content-box">
                    <div class="img-box">
                      <img
                        src="/assets/image/sub/etc/personal_icon06.png"
                        alt="개인정보 민원처리 담당부서"
                      />
                    </div>
                    <div class="text-box">
                      <p>처리 부서 : 정보전략부</p>
                      <span class="txt-red">전화번호 : 054-810-1164</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
          <p class="notice-p">※ 세부 항목은 개인정보 처리방침 본문 확인</p>
        </div>
        <div class="table-list-box">
          <table class="pc-only">
            <caption>
              목차에 대한 정보를 보여주는 표
            </caption>
            <thead>
              <tr>
                <th colspan="4" scope="col">목차</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-1.png"
                      alt="개인정보 처리목적"
                    />
                  </span>
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-2.png"
                      alt="개인정보 수집 항목"
                    />
                  </span>
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-3.png"
                      alt="개인정보 보유 및 이용기간"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제1조 개인정보의 처리목적, 수집 항목, 보유 및 이용기간
                </td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info07.png"
                      alt="개인정보 처리업무 위탁"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제8조 개인정보 처리업무의 위탁에 관한 사항
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info02.png"
                      alt="14세 미만 아동 개인정보 처리"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제2조 14세 미만 아동의 개인정보 처리에 관한 사항
                </td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info08.png"
                      alt="개인정보 안전성 확보"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제9조 개인정보의 안전성 확보조치에 관한 사항
                </td>
              </tr>
              <tr>
                <td class="icon-td"></td>
                <td class="title-td">
                  제3조 AI서비스 개인정보 처리에 관한 사항
                </td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info09.png"
                      alt="개인정보 자동 수집 장치"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제10조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info03.png"
                      alt="개인정보 파기 절차 및 방법"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제4조 개인정보의 파기 절차 및 방법에 관한 사항
                </td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info10.png"
                      alt="정보주체 및 법정대리인의 권리"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제11조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한
                  사항
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info04.png"
                      alt="개인정보파일 등록 현황"
                    />
                  </span>
                </td>
                <td class="title-td">제5조 개인정보파일 등록 현황</td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info11.png"
                      alt="개인정보 보호책임자"
                    />
                  </span>
                </td>
                <td class="title-td">제12조 개인정보 보호책임자에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td"></td>
                <td class="title-td">제6조 개인정보 영향평가의 수행 결과</td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info12.png"
                      alt="정보주체의 권익침해 구제방법"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제13조 정보주체의 권익침해에 대한 구제방법
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info06.png"
                      alt="개인정보 제3자 제공"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제7조 개인정보의 제3자 제공에 관한 사항
                </td>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info13.png"
                      alt="개인정보 처리방침 변경"
                    />
                  </span>
                </td>
                <td class="title-td">
                  제14조 개인정보 처리방침의 변경에 관한 사항
                </td>
              </tr>
            </tbody>
          </table>
          <table class="mo-only">
            <caption>
              목차에 대한 정보를 보여주는 표
            </caption>
            <thead>
              <tr>
                <th colspan="2" scope="col">목차</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-1.png"
                      alt="개인정보 처리목적"
                    />
                  </span>
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-2.png"
                      alt="개인정보 수집 항목"
                    />
                  </span>
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info01-3.png"
                      alt="개인정보 보유 및 이용기간"
                    />
                  </span>
                </td>
                <td>제1조 개인정보의 처리목적, 수집 항목, 보유 및 이용기간</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info07.png"
                      alt="개인정보 처리업무 위탁"
                    />
                  </span>
                </td>
                <td>제8조 개인정보 처리업무의 위탁에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info02.png"
                      alt="14세 미만 아동 개인정보 처리"
                    />
                  </span>
                </td>
                <td>제2조 14세 미만 아동의 개인정보 처리에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info08.png"
                      alt="개인정보 안전성 확보"
                    />
                  </span>
                </td>
                <td>제9조 개인정보의 안전성 확보조치에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td"></td>
                <td>제3조 AI서비스 개인정보 처리에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info09.png"
                      alt="개인정보 자동 수집 장치"
                    />
                  </span>
                </td>
                <td>
                  제10조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info03.png"
                      alt="개인정보 파기 절차 및 방법"
                    />
                  </span>
                </td>
                <td>제4조 개인정보의 파기 절차 및 방법에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info10.png"
                      alt="정보주체 및 법정대리인의 권리"
                    />
                  </span>
                </td>
                <td>
                  제11조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한
                  사항
                </td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info04.png"
                      alt="개인정보파일 등록 현황"
                    />
                  </span>
                </td>
                <td>제5조 개인정보파일 등록 현황</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info11.png"
                      alt="개인정보 보호책임자"
                    />
                  </span>
                </td>
                <td>제12조 개인정보 보호책임자에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td"></td>
                <td>제6조 개인정보 영향평가의 수행 결과</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info12.png"
                      alt="정보주체의 권익침해 구제방법"
                    />
                  </span>
                </td>
                <td>제13조 정보주체의 권익침해에 대한 구제방법</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info06.png"
                      alt="개인정보 제3자 제공"
                    />
                  </span>
                </td>
                <td>제7조 개인정보의 제3자 제공에 관한 사항</td>
              </tr>
              <tr>
                <td class="icon-td">
                  <span>
                    <img
                      src="/assets/image/sub/etc/personal_info13.png"
                      alt="개인정보 처리방침 변경"
                    />
                  </span>
                </td>
                <td>제14조 개인정보 처리방침의 변경에 관한 사항</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="list-box box1">
          <div class="content-header">
            <h4>제1조 개인정보의 처리목적, 수집 항목, 보유 및 이용기간</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info01-1.png"
                  alt="개인정보 처리목적"
                />
              </span>
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info01-2.png"
                  alt="개인정보 수집 항목"
                />
              </span>
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info01-3.png"
                  alt="개인정보 보유 및 이용기간"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 「개인정보 보호법」에 따라 서비스 제공을 위해 필요
                    최소한의 범위에서 개인정보를 수집·이용합니다. <br />
                    다음의 개인정보 항목을 「개인정보 보호법」 제15조 제1항
                    제1호 및 제22조 제1항 제7호에 따라 정보주체의 동의를 받아
                    처리하고 있습니다.</span
                  >
                </li>
              </ul>
            </div>
            <div class="table-box">
              <table class="pc-only">
                <caption>
                  개인정보의 수집 및 이용에 대한 법적 근거, 수집 목적,수집 항목,
                  보유 및 이용기간에 대한 표
                </caption>
                <thead>
                  <tr>
                    <th scope="col">법적 근거</th>
                    <th scope="col">수집 목적</th>
                    <th scope="col">수집 항목</th>
                    <th scope="col">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      개인정보 보호법<br />
                      제 15조 제 1항 제 1호
                    </td>
                    <td>사이트 이용을 위한 회원가입</td>
                    <td>
                      [필수]<br />
                      이름, 아이디, 비밀번호, 주소, 휴대전화번호, 전화번호,
                      이메일주소, <span class="txt-red">CI 값</span><br />
                      <span class="txt-red">
                        [외국인의 경우]<br />
                        외국인등록번호(등록외국인), 여권번호(미등록외국인)
                      </span>
                    </td>
                    <td>회원 탈퇴 시 까지</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
              <table class="mo-only">
                <caption>
                  개인정보의 수집 및 이용에 대한 법적 근거, 수집 목적,수집 항목,
                  보유 및 이용기간에 대한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">법적 근거</th>
                    <td>
                      개인정보 보호법<br />
                      제 15조 제 1항 제 1호
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">수집 목적</th>
                    <td>사이트 이용을 위한 회원가입</td>
                  </tr>
                  <tr>
                    <th scope="row">수집 항목</th>
                    <td>
                      [필수]<br />
                      이름, 아이디, 비밀번호, 주소, 휴대전화번호, 전화번호,
                      이메일주소, <span class="txt-red">CI 값</span><br />
                      <span class="txt-red">
                        [외국인의 경우]<br />
                        외국인등록번호(등록외국인), 여권번호(미등록외국인)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">보유 및 이용기간</th>
                    <td>회원 탈퇴 시 까지</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span">
                    기관은 사용자의 사생활을 침해할 우려가 있는 개인정보는
                    원칙적으로 수집하지 않으나 서비스 운영 측면에서 정확하고
                    다양한 AI서비스를 제공하기 위해 서비스에 대한 정보를
                    수집하고 있습니다.
                  </span>
                </li>
              </ul>
            </div>
            <div class="table-box">
              <table class="pc-only">
                <caption>
                  다양한 AI서비스를 제공하기 위해 서비스에 대한 정보를 수집하는
                  것에 대한 수집 목적, 수집 항목, 보유 및 이용기간에 대한 표
                </caption>
                <thead>
                  <tr>
                    <th scope="col">수집 목적</th>
                    <th scope="col">수집 항목</th>
                    <th scope="col">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>사용자가 이용한 AI 대화 기록 수집</td>
                    <td>
                      [필수]<br />
                      대화 기록
                    </td>
                    <td>
                      <span class="txt-red"
                        >홈페이지에 최대 6개월 저장 및 이용자 직접 삭제</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      AI 서비스 운영 및 참여기관 매칭, 서비스의 정확한서비스
                      제공 및 서비스 개선
                    </td>
                    <td>
                      [필수]<br />
                      비식별 처리된 AI 서비스 로그
                    </td>
                    <td>
                      <span class="txt-red">24개월 보유 후 삭제</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
              <table class="mo-only">
                <caption>
                  다양한 AI서비스를 제공하기 위해 서비스에 대한 정보를 수집하는
                  것에 대한 수집 목적, 수집 항목, 보유 및 이용기간에 대한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">수집 목적</th>
                    <td>사용자가 이용한 AI 대화 기록 수집</td>
                    <td>
                      AI 서비스 운영 및 참여기관 매칭, 서비스의 정확한서비스
                      제공 및 서비스 개선
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">수집 항목</th>
                    <td>
                      [필수]<br />
                      대화 기록
                    </td>
                    <td>
                      [필수]<br />
                      비식별 처리된 AI 서비스 로그
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">보유 및 이용기간</th>
                    <td>
                      <span class="txt-red"
                        >홈페이지에 최대 6개월 저장 및 이용자 직접 삭제</span
                      >
                    </td>
                    <td>
                      <span class="txt-red">24개월 보유 후 삭제</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="list-box box2">
          <div class="content-header">
            <h4>제2조 14세 미만 아동의 개인정보 처리에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info02.png"
                  alt="14세 미만 아동의 개인정보 처리"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 14세 미만 아동의 개인정보를 처리하기 위하여 동의가
                    필요한 경우에는 해당 아동의 법정대리인으로부터 동의를
                    받습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >기관은 14세 미만 아동의 개인정보 처리에 관하여 그
                    법정대리인의 동의를 받을 때에는 아동에게 법정대리인의 성명,
                    연락처와 같이 최소한의 정보를 요구할 수 있으며, 동의 내용을
                    게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록
                    하고, 그 동의 표시를 확인하였음을 법정대리인의 휴대전화
                    문자메시지로 알리는 방법으로 그 사실을 확인합니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box3">
          <div class="content-header">
            <h4>제3조 AI서비스 개인정보 처리에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span"> </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 생성형 AI 기술을 통해 고객에게 맞춤형 서비스를
                    제공하고, 서비스 품질을 개선하기 위해 필요한 최소한의
                    데이터를 수집하고 활용합니다.
                  </span>
                </li>
                <li>
                  <span class="text-span">
                    <b>가. AI서비스 학습</b><br />
                    기관은 인공지능 학습에 사용되는 데이터의 적법성과 출처를
                    사전에 검증하고 있으며, 입력된 개인정보를 저장 또는 개인
                    식별 목적으로
                    <span class="txt-red">사용하지 않습니다.</span> <br /><br />

                    <b>나. AI 서비스 안전성 확보조치</b><br />
                    ▶ 데이터 수집 출처 검증 노력: 개인정보보호위원회와
                    한국인터넷진흥원의 ‘개인정보 노출 및 불법유통 탐지·삭제’
                    사업을 통해 식별된 도메인(URL)을 AI 학습데이터에서 배제<br />
                    ▶ 미세조정을 통한 안전장치 추가: 개인정보 처리과정에서
                    개인정보가 비식별화되지 않고 노출되는 것을 방지하기 위한
                    기술적 안전장치 추가<br />
                    ▶ 프롬포트 및 출력 필터링 적용: 사전 필터와 미세조정을 통한
                    안전성 확보 조치 이외의 실제 서비스 단계에서 프롬포트 공격을
                    통한 개인정보 노출 최소화<br />
                    <span class="txt-red"
                      >▶ SSL/TLS: SSL/TLS 암호화를 사용하여 정보 유출 가능성
                      최소화</span
                    >
                    <br />
                    <span class="txt-red"
                      >▶ 데이터 접근 절차 강화 : 내부 직원 및 외부 서비스
                      제공자가 데이터에 접근 할 경우 엄격한 검증 절차를
                      따름</span
                    >
                    <br /><br />

                    <b>나. AI 서비스 안전성 확보조치</b><br />
                    ▶ 수집된 개인정보는 재식별되지 않게 처리되며, 영구적으로
                    저장되지 않습니다. 단 고객의 요청이 있을 경우 예외가 적용 될
                    수 있습니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box4">
          <div class="content-header">
            <h4>제4조 개인정보의 파기 절차 및 방법에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info03.png"
                  alt="개인정보의 파기 절차 및 방법"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 개인정보 보유기간의 경과, 처리목적 달성 등
                    개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                    파기합니다.</span
                  >
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
                    처리목적이 달성되었음에도 불구하고 다른 법령에 따라
                    개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를
                    별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여
                    보존합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">3</span>
                  <span class="text-span"
                    >개인정보 파기의 절차 및 방법은 다음과 같습니다.
                  </span>
                </li>
                <li>
                  <span class="text-span">
                    <b>가. 파기절차</b><br />
                    기관은 파기 사유가 발생한 개인정보를 선정하고, 기관의
                    개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.

                    <b>나. 파기방법</b><br />
                    기관은 전자적 파일 형태로 기록·저장된 개인정보는 기록을
                    재생할 수 없도록 파기하며, 종이 문서에 기록·저장된
                    개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box5">
          <div class="content-header">
            <h4>제5조 개인정보파일 등록 현황</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info04.png"
                  alt="개인정보파일 등록 현황"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 개인정보를 개인정보 처리방침에서 명시한 범위 내에서
                    처리하고 있으며, ｢개인정보 보호법｣ 제32조에 따라
                    개인정보파일을 운영하고 있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >개인정보파일의 처리목적‧보유기간 및 항목은 개인정보파일의
                    특성에 따라 달리 규정하고 있으며, 개인정보파일별 상세한
                    내용은 아래의 링크를 통해 확인할 수 있습니다.
                  </span>
                </li>
              </ul>
              <div class="etc-box">
                <strong style="margin: 0">개인정보파일 검색</strong>
                <!--                <button class="btn search-privarcy-button">-->
                <!--                  <span class="text-span"> 개인정보포털 </span>-->
                <!--                  <span class="icon-span">-->
                <!--                    <img-->
                <!--                      src="/image/sub/service/shortcut_black.svg"-->
                <!--                      alt="링크"-->
                <!--                    />-->
                <!--                  </span>-->
                <!--                </button>-->

                <NuxtLink
                  to="#"
                  @click.prevent
                  target="_blank"
                  title="새 창에서 열림"
                  class="btn search-privarcy-button"
                >
                  <span class="text-span">개인정보포털</span>
                </NuxtLink>
              </div>
              <p class="txt-red" style="margin-left: 35px">
                개인정보파일 생성 관리 여부, 등록 여부 확인 필요
              </p>
            </div>
          </div>
        </div>
        <div class="list-box box6">
          <div class="content-header">
            <h4>제6조 개인정보 영향평가의 수행 결과</h4>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 운영하고 있는 개인정보 처리시스템이 정보주체의
                    개인정보파일에 미칠 영향에 대해 조사, 분석, 평가하기 위해
                    「개인정보 보호법」 제33조에 따라 “개인정보 영향평가”를 받고
                    있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >다음 개인정보 파일에 대해 영향평가를 수행하였습니다.
                  </span>
                </li>
              </ul>
              <div class="table-box">
                <table class="pc-only">
                  <caption>
                    개인정보 영향평가의 수행 결과 - 개인정보파일의 명칭,
                    개인정보파일에 기록되는 개인정보의 항목, 영향평가 수행연도에
                    대한 표
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">개인정보파일의 명칭</th>
                      <th scope="col">
                        개인정보파일에 기록되는 개인정보의 항목
                      </th>
                      <th scope="col">영향평가 수행연도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="content-td">
                        <span class="txt-bold"
                          >법률구조서비스 플랫폼 대국민 포털 회원</span
                        >
                      </td>
                      <td class="content-td">
                        필수 : 이름, 아이디, 비밀번호, 주소, 휴대전화번호,
                        전화번호, 이메일주소, <span class="txt-red">CI값</span>
                        <span class="txt-red"
                          >(외국인)필수 : 외국인등록번호, 여권번호</span
                        >
                      </td>
                      <td class="content-td">2024년</td>
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
                <table class="mo-only">
                  <caption>
                    개인정보 영향평가의 수행 결과 - 개인정보파일의 명칭,
                    개인정보파일에 기록되는 개인정보의 항목, 영향평가 수행연도에
                    대한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">개인정보파일의 명칭</th>
                      <td>
                        <span class="txt-bold"
                          >법률구조서비스 플랫폼 대국민 포털 회원</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        개인정보파일에 기록되는 개인정보의 항목
                      </th>
                      <td>
                        필수 : 이름, 아이디, 비밀번호, 주소, 휴대전화번호,
                        전화번호, 이메일주소, <span class="txt-red">CI값</span>
                        <span class="txt-red"
                          >(외국인)필수 : 외국인등록번호, 여권번호</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">영향평가 수행연도</th>
                      <td>2024년</td>
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="list-box box6">
          <div class="content-header">
            <h4>제7조 개인정보의 제3자 제공에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info06.png"
                  alt="개인정보의 제3자 제공"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 정보주체의 동의, 법률의 특별한 규정 등 「개인정보
                    보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를
                    제3자에게 제공합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >기관은 원활한 서비스 제공을 위해 다음의 경우 개인정보
                    보호법 제17조 제1항 제1호에 따라 정보주체의 동의를 얻어 필요
                    최소한의 범위로만 제공합니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="list-box box7">
          <div class="content-header">
            <h4>제8조 개인정보 처리업무의 위탁에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info07.png"
                  alt="개인정보 처리업무의 위탁"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span">
                    기관은 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라
                    위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적
                    보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등
                    책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가
                    개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span">
                    「개인정보 보호법」 제26조 제6항에 따라 수탁자가 당사의
                    개인정보 처리업무를 재위탁하는 경우 기관의 동의를 받고
                    있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">3</span>
                  <span class="text-span">
                    위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
                    개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box8">
          <div class="content-header">
            <h4>제9조 개인정보의 안전성 확보조치에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info08.png"
                  alt="개인정보의 안전성 확보조치"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <strong>&lt;설치·운영하는 개인정보 자동 수집 장치&gt;</strong>
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 「개인정보 보호법」에 따라 다음과 같이 안전성 확보를
                    위해 다음과 같은 조치를 취하고 있습니다.
                  </span>
                </li>
                <li style="margin-left: 35px">
                  <span class="text-span">
                    1. 관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영,
                    정기적 직원 교육 <br />
                    2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리,
                    접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및
                    갱신 <br />
                    3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제 <br />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box9">
          <div class="content-header">
            <h4>
              제10조 1. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
            </h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info09.png"
                  alt="개인정보 자동 수집 장치"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <strong>&lt;설치·운영하는 개인정보 자동 수집 장치&gt;</strong>
                </li>

                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 사용자에게 개별적인 서비스와 편의를 제공하기 위해
                    이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를
                    사용합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의
                    브라우저에 보내는 소량의 정보이며 정보주체의 PC 또는
                    모바일에 저장됩니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">3</span>
                  <span class="text-span"
                    >정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단
                    등의 설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우
                    맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                  </span>
                </li>
                <li>
                  <strong>&lt;쿠키 허용 / 차단 방법&gt;</strong>
                </li>
                <li>
                  <span class="text-span">
                    가. 웹 브라우저에서 쿠키 허용/차단 <br />
                    ▶ 크롬(Chrome) : 웹 브라우저 설정 > 개인정보 보호 및 보안 >
                    인터넷 사용 기록 삭제 <br />
                    ▶ 엣지(Edge) : 웹 브라우저 설정 > 쿠키 및 사이트 권한 >
                    쿠키 및 사이트 데이터 관리 및 삭제 <br />
                    <br />

                    나. 모바일 브라우저에서 쿠키 허용/차단 <br />
                    ▶ 크롬(Chrome) : 모바일 브라우저 설정 > 개인정보 보호 및
                    보안 > 인터넷 사용 기록 삭제 <br />
                    ▶ 사파리(Safari) : 모바일 기기 설정 > 사파리(Safari) > 고급
                    > 모든 쿠키 차단 <br />
                    ▶ 삼성 인터넷 : 모바일 브라우저 설정 > 인터넷 사용 기록 >
                    인터넷 사용 기록 삭제
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box10">
          <div class="content-header">
            <h4>
              제11조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항
            </h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info10.png"
                  alt="정보주체와 법정대리인의 권리·의무 및 행사방법"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >정보주체는 기관에 대해 언제든지 다음 각호에 해당하는
                    개인정보에 관련한 권리를 행사할 수 있습니다.
                  </span>
                </li>
                <li>
                  <span class="text-span" style="margin-left: 35px">
                    1. 개인정보 열람 요구<br />
                    2. 개인정보 정정 및 삭제의 요구<br />
                    3. 처리정지 및 철회 요구<br />
                    4. 자동화된 결정에 대한 거부 또는 설명 요구
                  </span>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span">
                    권리 행사는 기관에 대해 「개인정보 보호법」 시행령 제41조
                    제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
                    수 있으며, 기관은 이에 대해 지체없이 조치하겠습니다. <br />
                    <br />

                    ▶ 정보주체는 언제든지 홈페이지에서 개인정보를 직접
                    조회·수정·삭제할 수 있습니다. <br />
                    ▶ 정보주체는 언제든지 ‘회원탈퇴’를 통해 개인정보의 수집 및
                    이용 동의 철회가 가능합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">3</span>
                  <span class="text-span"
                    >권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
                    대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리
                    방법에 관한 고시” 별지 제11호 서식에 따른 위임장을
                    제출하셔야 합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">4</span>
                  <span class="text-span"
                    >정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는
                    「개인정보 보호법」 제35조 제4항 및 제37조 제2항에 의하여
                    제한될 수 있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">5</span>
                  <span class="text-span"
                    >개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가
                    수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수
                    없습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">6</span>
                  <span class="text-span">
                    자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를
                    받았거나, 계약 등을 통해 미리 알린 경우, 법률에 명확히
                    규정이 있는 경우에는 자동화된 결정에 대한 거부는 인정되지
                    않으며 설명 및 검토 요구만 가능합니다. <br />
                    ▶ 또한 자동화된 결정에 대한 거부·설명 요구는 다른 사람의
                    생명·신체·재산과 그 밖의 이익을 부당하게 침해할 우려가 있는
                    등 정당한 사유가 있는 경우에는 그 요구가 거절될 수 있습니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">7</span>
                  <span class="text-span"
                    >기관은 권리 행사를 한 자가 본인이거나 정당한 대리인인지를
                    확인합니다.
                  </span>
                </li>
                <li>
                  <span class="num-span">8</span>
                  <span class="text-span">
                    기관은 권리 행사를 아래의 부서에 할 수 있습니다. 기관은
                    정보주체의 권리 행사가 신속하게 처리되도록 노력하겠습니다.
                    <br />
                    ▶ 개인정보 열람 등 청구 접수·처리 부서<br />
                    부서명 : 정보전략부<br />
                    이메일주소 : sws1211@klac.or.kr<br />
                    연락처 : 054-810-1164
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box11">
          <div class="content-header">
            <h4>제12조 개인정보 보호책임자에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info11.png"
                  alt="개인정보 보호책임자"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span"
                    >기관은 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                    개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                    위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                  </span>
                </li>
              </ul>
            </div>
            <strong style="margin: 20px 0 -20px 0"
              >가. 개인정보 보호책임자</strong
            >
            <div class="table-box">
              <table class="pc-only">
                <caption>
                  개인정보 보호책임자 - 구분, 직위, 성명, 연락처에 대한 표
                </caption>
                <colgroup>
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th class="title-td" scope="col">구분</th>
                    <th class="title-td" scope="col">직위</th>
                    <th class="title-td" scope="col">성명</th>
                    <th class="title-td" scope="col">연락처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="content-td">개인정보 보호책임자</td>
                    <td class="content-td">부장직무대리</td>
                    <td class="content-td">손창우</td>
                    <td class="content-td">054-810-1161</td>
                  </tr>
                </tbody>
              </table>
              <table class="mo-only">
                <caption>
                  개인정보 보호책임자 - 구분, 직위, 성명, 연락처에 대한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">구분</th>
                    <td>개인정보 보호책임자</td>
                  </tr>
                  <tr>
                    <th scope="row">직위</th>
                    <td>부장직무대리</td>
                  </tr>
                  <tr>
                    <th scope="row">성명</th>
                    <td>손창우</td>
                  </tr>
                  <tr>
                    <th scope="row">연락처</th>
                    <td>054-810-1161</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <strong style="margin: 20px 0 -20px 0"
              >나. 개인정보보호 담당부서</strong
            >
            <div class="table-box">
              <table class="pc-only">
                <caption>
                  개인정보보호 담당부서 - 구분, 직위, 성명, 연락처에 대한 표
                </caption>
                <colgroup>
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th class="title-td" scope="col">구분</th>
                    <th class="title-td" scope="col">직위</th>
                    <th class="title-td" scope="col">성명</th>
                    <th class="title-td" scope="col">연락처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="content-td">개인정보 보호담당자</td>
                    <td class="content-td">계장</td>
                    <td class="content-td">송우선</td>
                    <td class="content-td">054-810-1164</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
              <table class="mo-only">
                <caption>
                  개인정보보호 담당부서 - 구분, 직위, 성명, 연락처에 대한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">구분</th>
                    <td>개인정보 보호담당자</td>
                  </tr>
                  <tr>
                    <th scope="row">직위</th>
                    <td>계장</td>
                  </tr>
                  <tr>
                    <th scope="row">성명</th>
                    <td>송우선</td>
                  </tr>
                  <tr>
                    <th scope="row">연락처</th>
                    <td>054-810-1164</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">2</span>
                  <span class="text-span"
                    >정보주체는 기관의 서비스를 이용하시면서 발생한 모든
                    개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
                    개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. 기관은
                    정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box12">
          <div class="content-header">
            <h4>제13조 정보주체의 권익침해에 대한 구제방법</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info12.png"
                  alt="정보주체의 권익침해"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <div>
                    <span class="text-span"
                      >정보주체는 개인정보침해로 인한 구제를 받기 위하여
                      개인정보분쟁조정위원회, 한국인터넷진흥원,
                      개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수
                      있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에
                      대하여는 아래의 기관에 문의하시기 바랍니다.
                    </span>
                    <ul class="link-list">
                      <li>
                        ▶ 개인정보분쟁조정위원회 : (국번없이) 1833-6972
                        <NuxtLink
                          :to="'https://www.kopico.go.kr'"
                          target="_blank"
                          title="새 창에서 열림"
                          >(www.kopico.go.kr)</NuxtLink
                        >
                      </li>
                      <li>
                        ▶ 개인정보침해신고센터 : (국번없이) 118
                        <NuxtLink
                          :to="'https://www.privacy.kisa.or.kr'"
                          target="_blank"
                          title="새 창에서 열림"
                          >(privacy.kisa.or.kr)</NuxtLink
                        >
                      </li>
                      <li>
                        ▶ 대검찰청 : (국번없이) 1301
                        <NuxtLink
                          :to="'https://www.spo.go.kr'"
                          target="_blank"
                          title="새 창에서 열림"
                          >(www.spo.go.kr)</NuxtLink
                        >
                      </li>
                      <li>
                        ▶ 경찰청 : (국번없이) 182
                        <NuxtLink
                          :to="'https://www.ecrm.cyber.go.kr'"
                          target="_blank"
                          title="새 창에서 열림"
                          >(ecrm.cyber.go.kr)</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span class="num-span">2</span>
                  <div>
                    <span class="text-span"
                      >「개인정보 보호법」 제35조(개인정보의 열람),
                      제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지
                      등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분
                      또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는
                      행정심판법이 정하는 바에 따라 행정심판을 청구할 수
                      있습니다.
                    </span>
                    <ul class="link-list">
                      <li>
                        ▶ 중앙행정심판위원회 : (국번없이) 110
                        <NuxtLink :to="'www.kopico.go.kr'" target="_blank"
                          >(www.simpan.go.kr)</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-box box12">
          <div class="content-header">
            <h4>제14조 개인정보 처리방침의 변경에 관한 사항</h4>
            <div class="title-img-wrap">
              <span class="title-img-span">
                <img
                  src="/assets/image/sub/etc/personal_info13.png"
                  alt="개인정보 처리방침의 변경"
                />
              </span>
            </div>
          </div>
          <div class="content-body">
            <div class="num-content-box">
              <ul>
                <li>
                  <span class="num-span">1</span>
                  <span class="text-span">
                    이 개인정보 처리방침은 2025. 2. 3. 부터 적용됩니다.
                  </span>
                </li>
                <li class="d-none">
                  <span class="num-span">2</span>
                  <span class="text-span">
                    이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
                  </span>
                </li>
              </ul>
              <div class="etc-box button-box d-none">
                <ul>
                  <li>
                    <button class="btn search-privarcy-button">
                      <span class="text-span">
                        20XX. X. XX. ~ 20XX. X. XX.
                      </span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/shortcut_black.svg"
                          alt="링크"
                        />
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="btn search-privarcy-button">
                      <span class="text-span">
                        20XX. X. XX. ~ 20XX. X. XX.
                      </span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/shortcut_black.svg"
                          alt="링크"
                        />
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="btn search-privarcy-button">
                      <span class="text-span">
                        20XX. X. XX. ~ 20XX. X. XX.
                      </span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/shortcut_black.svg"
                          alt="링크"
                        />
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="btn search-privarcy-button">
                      <span class="text-span">
                        20XX. X. XX. ~ 20XX. X. XX.
                      </span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/service/shortcut_black.svg"
                          alt="링크"
                        />
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/prvc/index.scss';
</style>
