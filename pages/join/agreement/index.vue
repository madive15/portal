<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useRouter } from 'vue-router';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useJoinStore } from '~/stores/join';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
const router = useRouter();

const { showAlert } = useCustomAlert();

const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

const allAgree = computed({
  get() {
    return (
      // joinRequest.value.uiiPvsnAgreYn &&
      joinRequest.value.prvcClctAgreYn && joinRequest.value.trmsAgreYn
    );
  },
  set(newValue) {
    joinRequest.value.trmsAgreYn = newValue;
    joinRequest.value.prvcClctAgreYn = newValue;
    joinRequest.value.uiiPvsnAgreYn = newValue;
  }
});

// "확인" 버튼 클릭 시 호출되는 함수
const submitAgreement = () => {
  if (allAgree.value) {
    // 모든 약관에 동의했을 때 다음 페이지로 이동
    router.push('/join/identify', { external: true });
  } else {
    let vStr = '';
    if (!joinRequest.value.prvcClctAgreYn && !joinRequest.value.trmsAgreYn) {
      vStr = '이용약관(필수) , 개인정보의 수집 및 이용 동의(필수)';
    } else if (joinRequest.value.prvcClctAgreYn) vStr += '이용약관(필수)';
    else if (joinRequest.value.trmsAgreYn)
      vStr += '개인정보의 수집 및 이용 동의(필수)';
    // 동의하지 않은 약관이 있을 때 경고 메시지 표시 sweetalert2
    showAlert({
      icon: 'warning',
      title: '약관에 동의하지 않으셨습니다.',
      text: vStr + ' 약관에 동의하셔야 합니다.'
    });
  }
};

// 뒤로가기
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="회원가입"
          :breadcrumbItems="[{ text: '회원가입', active: true }]"
        />
        <div class="step-box">
          <ol class="row row-cols-5">
            <li class="col-xl col-12 step1">
              <div class="step-text-box">
                <strong>01.</strong>
                <span>회원유형</span>
              </div>
            </li>

            <li class="col-xl col-12 step2">
              <div class="step-text-box active">
                <strong>02.</strong>
                <span>약관동의<span class="sr-only">(현재단계)</span></span>
              </div>
            </li>

            <li class="col-xl col-12 step3">
              <div class="step-text-box">
                <strong>03.</strong>
                <span>본인확인</span>
              </div>
            </li>

            <li class="col-xl col-12 step4">
              <div class="step-text-box">
                <strong>04.</strong>
                <span>정보입력</span>
              </div>
            </li>

            <li class="col-xl col-12 step5">
              <div class="step-text-box">
                <strong>05.</strong>
                <span>가입완료</span>
              </div>
            </li>
          </ol>
        </div>

        <div class="all-agree-box">
          <div class="form-check">
            <a-checkbox
              class="check-bx"
              id="all-check-input"
              name="type"
              v-model:checked="allAgree"
              >전체동의</a-checkbox
            >
            <label class="sr-only" for="all-check-input"> 전체동의 </label>
          </div>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="aggre-info-box">
          <div class="card">
            <div class="card-header">
              <CommonTitle tag="h4" size="1">이용약관(필수)</CommonTitle>
            </div>
            <div class="card-body">
              <div class="aggre-text-box">
                <CommonTitle tag="h5" size="1">제1장 총칙</CommonTitle>
                <dl>
                  <dt>제1조(목적)</dt>
                  <dd>
                    이 약관은 법무부와 대한법률구조공단(이하 ‘공단’이라
                    한다)에서 제공하는 법률구조 서비스 플랫폼 대국민
                    포털(https://www.helplaw24.go.kr, 이하 "법률구조 플랫폼"이라
                    한다)의 이용 등에 관하여 법률구조 플랫폼과 회원 및 이용자
                    사이의 이용관계를 규정함을 목적으로 한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제2조(용어의 정의)</dt>
                  <dd>
                    ① ‘법률구조 플랫폼’이라 함은 법률구조기관 및 국가·공공기관
                    등에서 제공하는 각종 법률정보, 법률상담, 소송구조, 조정,
                    피해구제 등의 법률서비스를 통합하여 하나의 플랫폼 창구로
                    안내하고, 기관 간 연계를 통해 법률구조신청 및 각종
                    법률지원신청을 One-Stop으로 제공하기 위해 법무부와 공단이
                    구축하고 공단이 운영하는 홈페이지를 말한다.
                  </dd>
                  <dd>
                    ②‘참여기관’이라 함은 법률구조 서비스 플랫폼 협의체에 참여한
                    기관으로서 법률구조 플랫폼과 연계하여 기관의 서비스에 대한
                    신청 또는 정보를 제공하는 기관을 말한다.
                  </dd>
                  <dd>
                    ③‘회원’이라 함은 법률구조 플랫폼에 개인정보를 제공하여
                    사용자등록을 한 자로서, 법률구조 플랫폼이 제공하는 법률구조
                    및 참여기관 연계서비스를 계속적으로 이용할 수 있는 자를
                    말한다.
                  </dd>
                  <dd>
                    ④‘이용자’라 함은 회원가입 없이 법률구조 플랫폼을 이용하는
                    자를 말한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제3조(약관의 효력과 변경)</dt>
                  <dd>
                    ① 이 약관은 법률구조 플랫폼을 통하여 공시되고, 이용자가
                    동의함으로써 효력을 발생한다.
                  </dd>
                  <dd>
                    ② 공단은 합리적인 사유가 발생한 경우에는 이 약관을 변경할 수
                    있으며, 변경된 약관은 법률구조 플랫폼에 공시함과 동시에
                    효력이 발생한다.
                  </dd>
                  <dd>
                    ③ 회원은 변경된 약관에 동의하지 않는 경우 서비스 이용을
                    중단하고 이용계약을 해지할 수 있으며 계속적인 서비스 이용은
                    약관 변경에 동의한 것으로 간주된다.
                  </dd>
                </dl>
                <dl>
                  <dt>제4조(약관 외 준칙)</dt>
                  <dd>
                    이 약관에 명시되지 아니한 사항에 대하여는 ‘전기통신사업법’,
                    ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’, 그 밖의
                    관련 법령 및 기타 상관습에 따른다.
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1">제2장 회원가입</CommonTitle>
                <dl>
                  <dt>제5조(회원가입)</dt>
                  <dd>
                    ① 회원으로 등록하여 서비스를 이용하고자 하는 자는 공단에서
                    요청하는 최소한의 개인 신상정보를 제공하여야 한다.
                  </dd>
                  <dd>
                    ② 회원가입은 법률구조 플랫폼 이용 희망자가 이용약관에 동의한
                    후, 회원가입 신청양식에 따른 기재를 하여 회원가입 신청하고
                    공단이 이를 승낙함으로써 성립한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제6조 (회원가입절차)</dt>
                  <dd>
                    ① 법률구조 플랫폼 이용자가 본 약관을 읽고 “동의” 버튼을
                    누르거나 “확인” 등에 체크하는 방법을 취한 경우 본 약관에
                    동의한 것으로 간주한다.
                  </dd>
                  <dd>
                    ② 법률구조 플랫폼 이용을 위한 회원가입은 서비스 이용자가
                    제1항과 같이 동의한 후, 법률구조 플랫폼이 정한 온라인
                    회원가입 신청서에 회원 아이디를 포함한 필수사항을 입력하고,
                    “등록하기” 내지 “완료” 단추를 누르는 방법으로 한다. 다만,
                    공단에서 필요하다고 인정하는 경우 회원에게 별도의 서류를
                    제출하도록 요청할 수 있다.
                  </dd>
                </dl>
                <dl>
                  <dt>제7조(회원등록의 제한)</dt>
                  <dd>
                    ① 만14세 미만의 사용자는 법정대리인의 동의를 받아 회원으로
                    가입할 수 있다.
                  </dd>
                  <dd>
                    ② 공단은 다음 각 호에 해당하는 회원가입 신청에 대하여는 이를
                    승낙하지 아니할 수 있고, 그 사유가 해소될 때까지 승낙을
                    유보할 수 있다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 주민등록상의 본인 실명과 다른 경우<br />
                    2. 타인의 명의를 사용하여 신청한 경우<br />
                    3. 회원가입 신청서의 필요내용을 허위로 기재한 경우<br />
                    4. 사회의 안녕 및 질서 기타 미풍양속을 저해할 목적으로
                    신청한 경우<br />
                    5. 시스템 장애, 서비스 이용의 폭주 등으로 인해 서비스 이용에
                    지장이 있는 경우<br />
                    6. 기타 합리적인 이유로 회원등록을 제한할 필요가 있는 경우
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1"
                  >제3장 서비스제공 및 이용</CommonTitle
                >
                <dl>
                  <dt>제8조(서비스의 내용)</dt>
                  <dd>
                    공단이 법률구조 플랫폼을 통하여 이용자에게 제공하는 서비스의
                    종류와 그 내용은 다음 각 호와 같고, 필요한 경우 이를
                    추가·변경하거나 제한할 수 있다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 플랫폼 안내 : 법률구조 플랫폼 시스템 및 제공서비스 등에
                    관한 정보제공<br />
                    2. 나의 서비스 찾기 : 이용자 맞춤형 서비스를 찾을 수 있는
                    기능(손쉬운 찾기, 법률복지지도)<br />
                    3. 서비스유형 : 법률구조 플랫폼을 통해 제공되는 서비스
                    유형에 관한 정보제공<br />
                    4. 서비스 제공기관 : 법률구조 플랫폼을 통해 서비스를
                    제공하는 기관정보 소개<br />
                    5. 사례/서식 : 각종 법률서식 및 법률상담사례 등에 관한
                    정보제공<br />
                    6 . 통합검색 : 이용자가 입력한 검색어에 적합한 자료를 찾아
                    화면에 보여주는 서비스<br />
                    7. 생성형 인공지능 검색 : 입력된 질문에 대해 연관성 있는
                    정보를 종합해서 법률지원서비스와 관련된 사항에 대해 답변을
                    생성하여 제공(단, 법률상담 서비스는 미제공)<br />
                    8. 고객센터 : 자주하는 질문 및 문제해결 관련 정보제공
                  </dd>
                </dl>
                <dl>
                  <dt>제9조(서비스이용)</dt>
                  <dd>
                    ① 법률구조 플랫폼의 정보는 누구나 검색·사용할 수 있다. 다만,
                    생성형 인공지능 검색서비스를 이용하기 위해서는 회원가입 또는
                    본인인증을 하여야 한다.
                  </dd>
                  <dd>
                    ② 서비스 이용시간은 공단의 업무상 또는 기술상 장애, 기타
                    특별한 사유가 없는 한 연중무휴, 1일 24시간 제공을 원칙으로
                    한다. 다만, 시스템 점검 등 공단이 필요한 경우 또는 시스템
                    장애, 서비스 이용의 폭주 등 불가항력으로 인하여 서비스
                    이용에 지장이 있는 때에는 예외적으로 서비스 이용의 전부 또는
                    일부에 대하여 이를 제한할 수 있다.
                  </dd>
                  <dd>
                    ③ 공단은 제공하는 서비스 중 일부에 대하여 이용시간을 별도로
                    정할 수 있으며, 이 경우 그 이용시간을 회원에게 공지하여야
                    한다.
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1"
                  >제4장 회원정보의 관리</CommonTitle
                >
                <dl>
                  <dt>제10조(회원정보의 수집 및 이용목적)</dt>
                  <dd>
                    공단은 회원에게 서비스를 제공하기 위해 필요 최소한의 범위
                    내에서 이름, 주소, 전화번호, E-Mail 주소 등을 수집할 수
                    있으며, 회원을 대상으로 한 정보 제공, 추가 서비스 제공 등을
                    위하여 회원의 동의하에 부가정보를 수집할 수 있다.
                  </dd>
                </dl>
                <dl>
                  <dt>제11조 (개인정보 수집 이용)</dt>
                  <dd>
                    ① 공단은 회원에게 서비스 제공을 위하여 개인정보보호법
                    제2조에서 정한 '개인정보'를 처리할 수 있으며, 회원이
                    개인정보 수집·이용에 동의한 경우 개인정보보호법 제15조에
                    따라 회원의 개인정보를 수집·이용할 수 있다.
                  </dd>
                  <dd>
                    ② 공단의 개인정보 수집은 회원에게 다음 각 호의 사항에 따른
                    처리를 목적으로 한다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 개인정보의 수집 이용은 법률구조 플랫폼 이용을 위한 개인별
                    맞춤형 서비스 제공을 목적으로 한다.<br />
                    2. 개인정보의 보유 및 이용기간은 제15조에 따른다.<br />
                    3. 회원은 본 약관과 개인정보 수집·이용 동의를 거부할 수
                    있고, 동의하지 않는 경우 법률구조 플랫폼 서비스 이용이
                    제한될 수 있다.
                  </dd>
                </dl>
                <dl>
                  <dt>제12조 (개인정보의 처리제한)</dt>
                  <dd>
                    공단은 회원에게 서비스 제공을 위하여 개인정보보호법에서 정한
                    바에 따라 민감정보, 고유식별정보를 처리할 수 있다. 다만 다음
                    각 호의 경우 개인정보의 처리에 대한 동의와 별도로 동의를
                    받아 고유식별정보를 처리할 수 있다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 회원가입 후 법률구조 플랫폼을 통하여 전자적으로 법률구조
                    또는 참여기관 연계서비스를 신청하는 경우<br />
                    2. 제1호 신청 후 이와 연동된 해당 기관 정보시스템을
                    이용하고자 하는 경우
                  </dd>
                </dl>
                <dl>
                  <dt>제13조(회원정보의 보호)</dt>
                  <dd>
                    공단은 수집된 회원정보를 취급함에 있어서 개인정보가 분실,
                    도난, 변조 또는 훼손되지 아니하도록 보안 및 안전성 확보에
                    필요한 기술적 조치 등을 하여야 한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제14조(회원정보의 열람 및 정정)</dt>
                  <dd>
                    회원은 스스로 작성한 본인의 정보를 수시로 열람 및 정정할 수
                    있다. 회원은 법률구조 플랫폼에서 본인의 개인정보를 직접
                    열람, 정정하거나 공단으로 유선 또는 E-Mail, 게시판 등을 통해
                    정정을 요청할 수 있으며, 공단은 본인확인 절차를 거친 후
                    회원의 정보를 수정해야 한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제15조(회원정보의 보유기간)</dt>
                  <dd>
                    공단은 회원의 정보를 회원 탈퇴 시까지 보유하며, 회원 탈퇴 시
                    즉시 삭제한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제16조(회원정보의 관리책임자)</dt>
                  <dd>
                    공단은 회원정보를 안전하고 효율적으로 관리하기 위하여 1명
                    이상의 관리책임자를 둔다.
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1">제5장 책임</CommonTitle>
                <dl>
                  <dt>제17조(공단의 의무)</dt>
                  <dd>
                    ① 공단은 이 약관 및 관계 법령에 따라 지속적이고 안정적으로
                    서비스를 제공하는데 최선의 노력을 한다.
                  </dd>
                  <dd>
                    ② 공단은 회원으로부터 제기되는 의견이나 불만이 정당하다고
                    인정할 경우에는 적절한 절차를 거쳐 신속히 처리하여야 하며,
                    처리 기간이 지연될 경우 회원에게 지연 사유와 처리 일정을
                    알려주어야 한다.
                  </dd>
                  <dd>
                    ③ 공단은 회원의 개인정보가 분실, 도난, 누출, 변조 또는
                    훼손되지 않도록 안정성의 확보에 필요한 기술적, 제도적 대책을
                    수립하여 안전한 법률구조 플랫폼 서비스 이용을 도모한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제18조(회원의 아이디, 비밀번호 관리 의무)</dt>
                  <dd>
                    ① 회원은 개인 아이디, 비밀번호나 그 밖에 개인정보의
                    비밀보호를 위한 장치를 제3자에게 이용하게 하여서는 아니
                    되며, 아이디, 비밀번호 관리에 대한 모든 책임은 회원에게
                    있다.
                  </dd>
                  <dd>
                    ② 회원이 개인 아이디, 비밀번호나 그 밖에 개인정보의
                    비밀보호를 위한 장치를 도난당하거나 제3자가 사용하고 있음을
                    알게 된 경우에는 바로 공단에 통보하고, 공단의 안내가 있는
                    경우에는 그에 따라야 한다.
                  </dd>
                  <dd>
                    ③ 공단은 회원의 고의·과실로 인하여 유출된 정보에 대하여는
                    책임을 지지 않는다
                  </dd>
                </dl>
                <dl>
                  <dt>제19조(회원의 의무)</dt>
                  <dd>회원은 다음 각 호의 행위를 하여서는 아니 된다.</dd>
                  <dd style="margin-left: 15px">
                    1. 공단이 관리하는 컴퓨터에 부정하게 접속하는 방법 등을
                    이용하여 법률구조 플랫폼 서비스를 방해하거나, 법률구조
                    플랫폼 서비스 이용에 제공되는 설비에 손상을 주는 행위<br />
                    2. 부정한 목적으로 또는 공단의 동의 없이 법률구조 플랫폼에서
                    제공하는 서비스의 내용을 가공하거나 입찰 참가 목적 외의
                    영리목적으로 서비스를 이용하는 행위<br />
                    3. 제공받은 법률구조 플랫폼 서비스 내용 또는 형식의
                    위조·변조 그 밖의 부정행위<br />
                    4. 공단 및 기타 제3자의 지적재산권을 침해하는 행위
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1"
                  >제6장 이용계약 해지 및 서비스 이용 제한</CommonTitle
                >
                <dl>
                  <dt>제20조(이용계약 해지신청)</dt>
                  <dd>
                    ① 서비스 이용계약을 해지하고자 하는 회원은 회원을
                    탈퇴함으로써 해지할 수 있고 본인이 직접 법률구조 플랫폼,
                    E-mail, 전화, Fax 등의 합리적인 수단을 통해 운영자에게
                    해지를 요청할 수 있다.
                  </dd>
                  <dd>
                    ② 해지 신청 시 본인임을 확인할 수 있는 이름, 전화번호,
                    아이디, 해지사유를 기재하면, 공단은 회원등록기록과 대조하여
                    본인임을 확인한 후 해지하여야 한다.
                  </dd>
                  <dd>
                    ③ 해지 완료 확인은 기존의 아이디, 비밀번호로 로그인이 되지
                    않음을 확인하는 방법으로 한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제21조(공단의 해지권)</dt>
                  <dd>
                    공단은 회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전
                    통지 없이 이용 계약을 해지할 수 있고, 이러한 행위로 인하여
                    서비스 운영에 손해가 발생한 경우 이에 대한 민ㆍ형사상의
                    책임을 물을 수 있다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 다른 회원의 아이디와 비밀번호를 부정 사용하여 부당하게
                    서비스를 이용하는 행위<br />
                    2. 타인의 명예를 훼손하거나 모욕하는 행위<br />
                    3. 타인의 지적재산권 등의 권리를 침해하는 행위<br />
                    4. 공단의 사전 동의 없이 서비스를 이용하여 얻은 정보를
                    영리적 목적으로 복제, 출판, 방송 등에 사용하거나 제3자에게
                    제공하는 등 공단의 저작권 등 권리를 침해하는 행위<br />
                    5. 고의 또는 과실에 의한 컴퓨터 바이러스 유포 또는 해킹으로
                    서비스의 안정적 운영에 지장을 주거나 건전한 이용을 저해하는
                    행위<br />
                    6. 사회질서 및 미풍양속에 반하는 행위<br />
                    7. 공익을 훼손할 목적으로 서비스 이용을 저해하는 행위<br />
                    8. 기타 관계 법령에 위배되는 행위
                  </dd>
                </dl>
                <dl>
                  <dt>제22조(해지의 효력)</dt>
                  <dd>
                    ① 회원이 해지를 신청한 경우 해지신청 즉시 해지의 효력이
                    발생하며, 회원으로서의 법률구조 플랫폼 서비스를 이용할 수
                    없다.
                  </dd>
                  <dd>
                    ② 이용계약이 해지된 회원의 개인정보는 즉시 서버에서 삭제하여
                    폐기한다.
                  </dd>
                </dl>
                <dl>
                  <dt>제23조(게시물 관리)</dt>
                  <dd>
                    공단은 법률구조 플랫폼에 회원이 게시하거나 등록한 내용물이
                    다음 각 호에 해당할 때에는 사전 통지 없이 삭제할 수 있다.
                  </dd>
                  <dd>
                    1. 타인을 비방하거나 명예를 손상시키는 내용인 경우<br />
                    2. 사회질서 및 미풍양속에 위반되는 내용인 경우<br />
                    3. 범죄행위와 관련된다고 인정되는 내용인 경우<br />
                    4. 타인의 저작권 등 기타의 권리를 침해하는 내용인 경우<br />
                    5. 기타 관계 법령이나 공단에서 정한 규정에 위배되는 내용인
                    경우
                  </dd>
                </dl>

                <CommonTitle tag="h5" size="1">제7장 손해배상 등</CommonTitle>
                <dl>
                  <dt>제24조(면책조항)</dt>
                  <dd>
                    ① 법률구조 플랫폼은 법률구조 서비스, 참여기관 연계서비스에
                    대한 정보제공 편의를 위한 것이며, 법률구조 플랫폼을 통해
                    확인한 정보를 활용한 결과에 대한 책임은 회원에게 있다.
                  </dd>
                  <dd>
                    ② 생성형 인공지능 검색 서비스를 통하여 생성된 답변정보는
                    부정확하거나 오류가 있을 수 있으며, 이는 법무부 및 공단의
                    입장을 대변하지 않는다.
                  </dd>
                  <dd>
                    ③ 법률구조 플랫폼을 통하여 제공하는 법률정보는 참고용으로
                    제공하는 것이며, 이용자 및 회원은 법률정보가 판례 변경 또는
                    법령의 제·개정 등으로 인하여 정확하지 않을 수 있음을
                    인지하고 참고용으로 활용하여야 한다.
                  </dd>
                  <dd>
                    ④ 공단은 다음 각 호에 해당하는 사유로 발생하는 이용자의
                    손해에 대하여는 그 책임을 지지 아니 한다.
                  </dd>
                  <dd style="margin-left: 15px">
                    1. 천재지변 또는 이에 준하는 불가항력으로 인해 서비스를
                    제공할 수 없는 경우<br />
                    2. 이용자가 비밀번호 관리 소홀 등 타인의 부정사용을 방치한
                    경우<br />
                    3. 공중통신선로의 장애에 의해 서비스 이용이 불가능한 경우<br />
                    4. 이용자가 서비스에 게재하거나 전송한 내용<br />
                    5. 기타 공단의 귀책사유가 없는 이용자의 오용 및 장애
                  </dd>
                </dl>
                <dl>
                  <dt>제25조(협의 해결)</dt>
                  <dd>
                    서비스의 이용 상 발생한 분쟁에 대해서는 공단과 이용자 간
                    상호 협의하여 해결하는 것을 원칙으로 하며, 협의 해결이 되지
                    않을 경우 그 분쟁의 관할법원은 민사소송법에 따른 법원을 관할
                    법원으로 한다.
                  </dd>
                </dl>
                <dl>
                  <dt>부칙</dt>
                  <dd>이 약관은 2025년 2월 3일부터 적용한다.</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="aggre-radio-box">
            <div class="form-check">
              <a-radio-group v-model:value="joinRequest.trmsAgreYn">
                <a-radio
                  class="radio-bx"
                  type="radio"
                  name="aggre1"
                  id="agree1-yes"
                  :value="true"
                  >동의합니다.</a-radio
                >
                <a-radio
                  class="radio-bx"
                  type="radio"
                  name="aggre1"
                  id="agree1-no"
                  :value="false"
                  >동의하지 않습니다.</a-radio
                >
              </a-radio-group>
              <label title="이용약관(필수)" class="sr-only" for="agree1-yes">
                동의합니다.
              </label>
              <label title="이용약관(필수)" class="sr-only" for="agree1-no">
                동의하지 않습니다.
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section3">
      <div class="container">
        <div class="aggre-info-box">
          <div class="card">
            <div class="card-header">
              <CommonTitle tag="h4" size="1"
                >개인정보의 수집 및 이용 동의 (필수)</CommonTitle
              >
            </div>
            <div class="card-body">
              <div class="aggre-text-box">
                <p>
                  법률구조서비스 플랫폼은 회원관리 및 양질의 서비스 제공을
                  위하여 정보주체의 동의에 따라 다음과 같이 최소한의 개인정보를
                  수집·이용하고 있습니다. 아래의 내용을 확인 후 동의 여부를
                  결정하여 주시기 바라며, 수집한 개인정보는 아래 수집·이용목적
                  이외에 다른 용도로 사용되지 않습니다.
                </p>

                <CommonTitle tag="h5" size="1"
                  >개인정보 수집&middot;이용 동의(필수)</CommonTitle
                >
                <CommonTable>
                  <caption>
                    개인정보 수집&middot;이용 동의(필수)의 수입&middot;이용
                    목적, 수입&middot;이용 항목, 보유기간에 관한 표
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">수집&middot;이용 목적</th>
                      <th scope="col">수집&middot;이용 항목</th>
                      <th scope="col">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>사이트 이용을 위한 회원가입</td>
                      <td>
                        필수 : 이름, 아이디, 비밀번호, 주소, 휴대전화번호,
                        전화번호, 이메일주소, CI값
                      </td>
                      <td>회원 탈퇴 시까지</td>
                    </tr>
                  </tbody>
                </CommonTable>
                <p class="end-p">
                  ※ 정보주체는 개인정보의 수집·이용 동의를 거부할 권리가
                  있습니다. 그러나, 동의를 거부할 경우 사이트 이용을 위한
                  회원가입에 제한을 받을 수 있습니다.
                </p>

                <CommonTitle tag="h5" size="1"
                  >고유식별정보 수집&middot;이용 동의(외국인의 경우
                  필수)</CommonTitle
                >
                <CommonTable>
                  <caption>
                    고유식별정보 수집&middot;이용 동의(외국인의 경우 필수)의
                    수집&middot;이용 목적, 수집&middot;이용 항목, 보유기간에
                    관한 표
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">수집&middot;이용 목적</th>
                      <th scope="col">수집&middot;이용 항목</th>
                      <th scope="col">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>사이트 이용을 위한 회원가입</td>
                      <td>
                        필수 : 외국인등록번호(등록외국인),
                        여권번호(미등록외국인)
                      </td>
                      <td>회원 탈퇴 시까지</td>
                    </tr>
                  </tbody>
                </CommonTable>
                <p class="end-p">
                  ※ 정보주체는 고유식별정보의 수집&middot;이용 동의를 거부할
                  권리가 있습니다. 그러나, 동의를 거부할 경우 사이트 이용을 위한
                  회원가입에 제한을 받을 수 있습니다.
                </p>

                <p style="margin-top: 20px">
                  ※ 시스템 상 특별한 사유가 없는 경우 회원탈퇴 후 즉시 삭제
                  필요<br />
                  ※ 일부 회원제 사이트에서는 재가입 보류기간 등의 이유로
                  일정기간(예 : 7일) 후 삭제하는 경우도 있음<br />
                  ※ 화면설계서 상 “고유식별정보 수집에 대한 동의”를 구성하고
                  있으나, 고유식별정보를 수집하고 있지 않으므로 삭제 필요<br />
                  ※ 사이트 회원가입 시 회원정보 입력화면에서 필수 기재항목에
                  ‘필수 기재항목’ 표시(항목명 옆 * 표시 등)하고 “* 표시는 필수
                  기재항목입니다.” 문구 작성 필요
                </p>
              </div>
            </div>
          </div>
          <div class="aggre-radio-box">
            <div class="form-check">
              <a-radio-group v-model:value="joinRequest.prvcClctAgreYn">
                <a-radio
                  class="radio-bx"
                  type="radio"
                  name="aggre2"
                  id="agree2-yes"
                  :value="true"
                  >동의합니다.</a-radio
                >
                <a-radio
                  class="radio-bx"
                  type="radio"
                  name="aggre2"
                  id="agree2-no"
                  :value="false"
                  >동의하지 않습니다.</a-radio
                >
              </a-radio-group>
              <label
                title="개인정보의 수집 및 이용 동의 (필수)"
                class="sr-only"
                for="agree2-yes"
              >
                동의합니다.
              </label>
              <label
                title="개인정보의 수집 및 이용 동의 (필수)"
                class="sr-only"
                for="agree2-no"
              >
                동의하지 않습니다.
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section4 d-none">
      <div class="container">
        <div class="aggre-info-box">
          <div class="card">
            <div class="card-header">
              <CommonTitle tag="h4" size="1"
                >고유식별정보 수집에 대한 안내(필수)</CommonTitle
              >
            </div>
            <div class="card-body">
              <div class="aggre-text-box">
                <h5>제 1장 총칙</h5>
                <dl>
                  <dt>제1조(목적)</dt>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                </dl>
                <CommonTitle tag="h5" size="1">제 2장 총칙</CommonTitle>
                <dl>
                  <dt>제2조(목적)</dt>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                  <dd>
                    본 약관은 법률구조플랫폼(이하 “해당 사이트”) 가 제공하는
                    모든 서비스(이하”서비스”)의 이용조건 및 절차,이용자와
                    사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="aggre-radio-box">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="aggre3"
                id="agree3-yes"
                :value="true"
                v-model="joinRequest.uiiPvsnAgreYn"
              />
              <label
                title="고유식별정보 수집에 대한 안내(필수)"
                class="form-check-label"
                for="agree3-yes"
              >
                동의합니다.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="aggre3"
                id="agree3-no"
                :value="false"
                v-model="joinRequest.uiiPvsnAgreYn"
              />
              <label
                title="고유식별정보 수집에 대한 안내(필수)"
                class="form-check-label"
                for="agree3-no"
              >
                동의하지 않습니다.
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section5">
      <div class="button-box">
        <CommonButton width="sm" title="취소" variants="gray" @click="goBack">
          취소
        </CommonButton>
        <CommonButton
          width="sm"
          title="확인"
          variants="primary"
          @click="submitAgreement"
        >
          확인
        </CommonButton>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/agreement/index.scss';
</style>
