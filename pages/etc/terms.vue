<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="이용약관"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '이용약관' },
            { text: '이용약관', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4>제 1장 총칙</h4>
        <dl class="normal-dl">
          <dt>제 1조 목적</dt>
          <dd>
            이 서비스 이용약관(이하 “약관이라고 한다)은 법률구조플랫폼(이하
            "법률구조플랫폼"이라 한다)이 제공하는 모든 온라인 개인회생, 개인파산
            및 면책(이하 "개인회생 전산 웹사이트"라고 한다)의 이용조건, 절차,
            방법<br />
            및 기 타 필요한 사항을 규정함을 목적으로 한다.
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제2조(약관의 효력과 변경)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              이 약관은 개인회생 전산 웹사이트를 이용하고자 하는 자가 회원에
              가입함과 동시에 효력을 발생한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              법률구조플랫폼은 합리적인 이유가 있을 때에는 이 약관을 개정할 수
              있으며, 변경된 약관은 지체 없이 전산
              <b class="highlight">웹사이트 (www.00000.or.kr/)</b>에 공시한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              이 약관의 내용은 개인회생 전산 웹사이트에 항상 게시한다.
            </span>
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제3조(약관 외 준칙)</dt>
          <dd>
            이 약관에 명시되지 아니한 사항에 대하여는 관계 법령 및 기타 관습에
            따른다.
          </dd>
        </dl>

        <h4 class="bottom-h4">제2장 회원가입</h4>
        <dl class="num-dl">
          <dt>제4조(회원가입)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              회원으로 등록하여 서비스를 이용하고자 하는 자는 법률구조플랫폼에서
              요청하는 최소한의 개인 신상정보를 제공하여야 한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              회원가입은 개인회생 전산 서비스 이용 희망자가 본 이용약관에 동의한
              후, 회원가입 신청양식에 따른 기재를 하여 회원가입신청을 하고, 이에
              대하여 법률구조플랫폼이 승낙함으로써 성립한다.
            </span>
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제5조(회원등록의 제한)</dt>
          <dd class="num-dl-none-dd">
            법률구조플랫폼은 다음 각 호의 1에 해당하는 회원가입 신청에 대하여는
            이를 승낙하지 아니할 수 있고, 그 사유가 해소될 때까지 승낙을 유보할
            수 있다.
          </dd>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span"> 주민등록 상의 본인 실명과 다른 경우 </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span"> 타인의 명의를 사용하여 신청한 경우 </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              회원가입 신청서의 필요내용을 허위로 기재한 경우
            </span>
          </dd>
          <dd>
            <span class="num-span">4</span>
            <span class="text-span">
              사회의 안녕 및 질서 기타 미풍양속을 저해할 목적으로 신청한 경우
            </span>
          </dd>
          <dd>
            <span class="num-span">5</span>
            <span class="text-span">
              소정의 회원등록요건을 충족하지 못한 경우
            </span>
          </dd>
          <dd>
            <span class="num-span">6</span>
            <span class="text-span">
              시스템 장애, 서비스 이용의 폭주 등으로 인해 서비스 이용에 지장이
              있는 경우
            </span>
          </dd>
          <dd>
            <span class="num-span">7</span>
            <span class="text-span">
              기타 합리적인 이유로 회원등록을 제한할 필요가 있는 경우
            </span>
          </dd>
        </dl>
        <h4 class="bottom-h4">제3장 서비스제공 및 이용</h4>
        <dl class="num-dl">
          <dt>제6조(서비스제공)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              법률구조플랫폼이 제공하는 서비스의 내용은 다음과 같다.<br />
              <b class="bold-b"
                >1. 개인회생의 개요/절차/신청서 자동작성/자가진단<br />
                2. 개인파산, 면책의 개요/절차/신청서 자동작성/자가진단<br />
                3. 법령/지침/서식/용어해설</b
              >
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              법률구조플랫폼은 필요한 경우에 서비스의 내용을 추가, 변경 또는
              삭제할 수 있으며, 이 경우 그 내용을 사전에 웹사이트에 공지하여야
              한다.
            </span>
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제7조(서비스이용)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              개인회생 전산 웹사이트 이용은 무료 서비스인 경우에는 회원가입
              직후부터 가능하며, 별도 서비스는 법률구조플랫폼의 승인을 받은 후
              사용한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              서비스 이용시간은 법률구조플랫폼의 업무상 또는 기술상 장애, 기타
              특별한 사유가 없는 한 연중무휴, 1일 24시간 제공을 원칙으로한다.
              다만, 시스템 점검 등 법률구조플랫폼이 필요한 경우 또는 시스템
              장애,<br />
              서비스 이용의 폭주 등 불가항력으로 인하여 서비스 이용에 지장이
              있는 때에는 예외적으로 서비스 이용의 전부 또는 일부에 대하여
              제한할 수 있다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              법률구조플랫폼은 제공하는 서비스 중 일부에 대하여 이용시간을
              별도로 정할 수 있으며, 이 경우 그 이용시간을 회원에게 공지하여야
              한다.
            </span>
          </dd>
        </dl>

        <h4 class="bottom-h4">제4장 회원정보의 관리</h4>
        <dl class="normal-dl">
          <dt>제8조(회원정보의 수집 및 이용목적)</dt>
          <dd>
            법률구조플랫폼은 회원에게 서비스를 제공하기 위한 최소한의 필수정보로
            이름, 주소, 주민등록번호, 전화번호, E-Mail 주소, 핸드폰번호 등을
            수집하기로 하며 회원을 대상으로 한 정보 제공, 추가 서비스 제공
            등을<br />
            위하여 회원의 동의 하에 부가정보를 수집할 수 있다.
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제8조의 1 (개인정보 수집 이용)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              법률구조플랫폼은 회원에게 서비스 제공을 위하여 개인정보보호법
              제2조 에서 정한 '개인정보'를 '처리'할 수 있으며 사이트 이용약관에
              동의한 경우 개인정보보호법 제15조의 개인정보의 수집 이용에
              동의한<br />
              것으로 본다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              법률구조플랫폼의 개인정보 수집은 회원에게 다음 각호의 사항에 따른
              처리를 목적으로 한다.<br />
              <b class="bold-b"
                >1. 개인정보의 수집 이용목적은 회원이 법률구조플랫폼이 제공하는
                개인회생, 개인파산 및 면책 신청서 자동작성 프로그램을 이용하기
                위한 기초자료로 활용하기 위함을 목적으로 한다.<br />
                2. 수집하려는 개인정보는 회원이 법원에 제출하는 개인회생,
                개인파산, 등을 신청하기 위한 신청서 항목으로 채무자회생 및
                파산에 관한 법률에 따른 개인회생, 개인파산 신청에 필요한 각
                항목으로 한다.<br />
                3. 개인정보의 보유 및 이용기간은 제11조에 따른다.<br />
                4 회원은 이 약관에 동의를 거부 할 수 있고 약관에 동의하지 않는
                경우 프로그램특성상 신청서 자동작성 프로그램의 이용을 제한할 수
                있다.</b
              >
            </span>
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제8조의 2 (개인정보의 처리제한)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              법률구조플랫폼은 회원에게 서비스 제공을 위하여 개인정보보호법에서
              정한 민감정보, 고유식별정보를 처리할 수 있다. 다만 다음 각호의
              경우 고유식별정보를 처리할 수 있으며 이에 대하여 개인정보
              수집과<br />
              별도로 고유식별정보 처리에 동의한 것으로 본다.<br />
              <b class="bold-b"
                >1. 회원가입 후 개인회생, 개인파산 자동작성프로그램을 이용할
                경우<br />
                2. 회원가입 후 법률구조플랫폼에 법률구조신청을 하거나,
                법률구조신청 후 이 사이트의 프로그램을 이용하고자 하는 경우</b
              >
            </span>
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제9조(회원정보의 보호)</dt>
          <dd>
            법률구조플랫폼은 수집된 회원정보를 취급함에 있어서 개인정보가 분실,
            도난, 변조 또는 훼손되지 아니하도록 보안 및 안전성 확보에 필요한
            기술적 조치 등을 하여야 한다.
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제10조(회원정보의 열람 및 정정)</dt>
          <dd>
            회원은 스스로 작성한 본인의 정보를 수시로 열람 및 정정할 수 있다.
            회원은 홈페이지에서 본인의 개인정보를 직접 열람, 정정하거나
            법률구조플랫폼으로 유선 또는 E-Mail로 정정을 요청할 수 있으며, 이
            때,<br />
            법률구조플랫폼은 본인의 확 인 절차를 거친 후에 회원의 정보를 수정해
            주어야 한다.
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제11조(회원정보의 보유기간)</dt>
          <dd>
            법률구조플랫폼은 회원의 정보를 수집한 후 1년 간 보유하기로 하고,
            별도의 요구가 없을 시에 는 보유기간이 1년씩 자동 연장된다.
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제12조(회원정보의 관리책임자)</dt>
          <dd>
            법률구조플랫폼은 회원정보를 안전하고 효율적으로 관리하기 위하여 1명
            이상의 관리책임자를 두기로 한다.
          </dd>
        </dl>

        <h4 class="bottom-h4">제5장 책임</h4>
        <dl class="num-dl">
          <dt>제13조(법률구조플랫폼의 의무)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              법률구조플랫폼은 이 약관 및 관계법령에 따라 계속적, 안정적으로
              서비스를 제공할 의무가 있다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              법률구조플랫폼은 회원으로부터 제기되는 의견이나 불만이 정당하다고
              인정할 경우에는 적절한 절차를 거쳐 신속히 처리하여야 하며, 처리
              기간이 지연될 경우 회원에게 지연 사유와 처리 일정을 알려주어야<br />
              한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              법률구조플랫폼은 회원의 개인 신상 정보에 대하여 철저한 보안을
              유지하여야 하며, 양질의 서비스를 운영하거나 개선하는 데에만
              사용하고, 다른 목적으로 타 기관 및 개인에게 누설하거나
              양도하여서는 안된다.
            </span>
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제14조(회원의 의무)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              ID와 비밀번호에 관한 모든 관리의 책임은 회원에게 있다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              자신의 ID가 부정하게 사용된 경우, 회원은 지체 없이
              법률구조플랫폼에 그 사실을 통보해야 한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              회원은 이 약관 및 관계 법령에서 규정한 사항을 준수해야 한다.
            </span>
          </dd>
        </dl>

        <h4 class="bottom-h4">제6장 이용계약 해지 및 서비스 이용 제한</h4>
        <dl class="num-dl">
          <dt>제15조(이용계약 해지신청)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              서비스 이용계약을 해지하고자 하는 회원은 회원을 탈퇴함으로써
              해지할 수 있고 본인이 직접 E-mail, 전화, Fax 등의 합리적인 수단을
              통해 운영자(webmaster@klac.or.kr)에게 해지를 요청할 수 있다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              해지 신청 시 본인임을 확인할 수 있는 이름, 주민등록번호, ID,
              해지사유를 기재하면, 법률구조플랫폼은 회원등록기록과 대조하여
              본인임을 확인한 후 해지하여야 한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              해지 완료 확인은 기존의 ID, 비밀번호로 로그인이 되지 않음을
              확인하는 방법으로 한다.
            </span>
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제16조(법률구조플랫폼의 해지권)</dt>
          <dd>
            법률구조플랫폼은 회원정보를 안전하고 효율적으로 관리하기 위하여 1명
            이상의 관리책임자를 두기로 한다.<br />
            <b class="bold-b">
              1. 다른 회원의 ID와 비밀번호를 부정 사용하여 부당하게 서비스를
              이용하는 행위<br />
              2. 타인의 계좌번호 및 신용카드를 도용하는 등 범죄행위에 관련되는
              행위<br />
              3. 타인의 명예를 훼손하거나 모욕하는 행위<br />
              4. 타인의 지적재산권 등의 권리를 침해하는 행위<br />
              5. 법률구조플랫폼의 사전 동의 없이 서비스를 이용하여 얻은 정보를
              영리적 목적으로 복제, 출판, 방송 등에 사용하거나 제3자에게
              제공하는 등 법률구조플랫폼의 저작권 등 권리를 침해하는 행위<br />
              6. 고의 또는 과실에 의한 컴퓨터 바이러스 유포 또는 해킹으로
              서비스의 안정적 운영에 지장을 주거나 건전한 이용을 저해하는
              행위<br />
              7. 사회 질서 및 미풍양속에 반하는 행위 8. 공익을 훼손할 목적으로
              서비스 이용을 저해하는 행위 9. 기타 관계법령에 위배되는 행위
            </b>
          </dd>
        </dl>

        <dl class="num-dl">
          <dt>제17조(해지의 효과)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              회원이 해지신청한 경우에는 해지신청일 즉시 회원에게 제공되는
              서비스를 이용하지 못한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              이용계약이 해지된 회원의 개인정보는 즉시 서버에서 삭제하여
              폐기한다.
            </span>
          </dd>
          <dd>
            <span class="num-span">3</span>
            <span class="text-span">
              해지 완료 확인은 기존의 ID, 비밀번호로 로그인이 되지 않음을
              확인하는 방법으로 한다.
            </span>
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제18조(게시물 관리)</dt>
          <dd>
            법률구조플랫폼은 홈페이지에 회원이 게시하거나 등록한 내용물이 다음에
            해당할 때에는 사전 통지 없이 삭제할 수 있다.<br />
            <b class="bold-b">
              1. 타인을 비방하거나 명예를 손상시키는 내용인 경우<br />
              2. 사회질서 및 미풍양속에 위반되는 내용인 경우<br />
              3. 범죄행위와 관련된다고 인정되는 내용인 경우<br />
              4. 타인의 저작권 등 기타의 권리를 침해하는 내용인 경우<br />
              5. 기타 관계 법령이나 법률구조플랫폼에서 정한 규정에 위배되는
              내용인 경우
            </b>
          </dd>
        </dl>

        <h4 class="bottom-h4">제7장 손해배상 등</h4>
        <dl class="num-dl">
          <dt>제19조(면책조항)</dt>
          <dd>
            <span class="num-span">1</span>
            <span class="text-span">
              법률구조플랫폼이 제공하는 개인회생 전산 웹사이트는 개인회생,
              개인파산 및 면책 신청서 작성의 편의를 위한 것이며, 개인회생 전산
              웹사이트를 통해 출력한 신청서가 반드시 법원의 인용을 받는 것을<br />
              보장하지 않는다. 회원은 출력한 신청서에 대하여 법률구조플랫폼에
              상담을 의뢰하여 신청서를 수정 또는 보완하여야 하며, 이를 이행하지
              아니하고 법원에 직접 제출하여 발생한 결과에 대한 책임은
              회원에게<br />
              있다.
            </span>
          </dd>
          <dd>
            <span class="num-span">2</span>
            <span class="text-span">
              법률구조플랫폼은 다음에 해당하는 사유로 발생하는 이용자의 손해에
              대하여는 그 책임을 지지 아니한다.<br />
              <b class="bold-b">
                1. 천재지변 또는 이에 준하는 불가항력으로 인해 서비스를 제공할
                수 없는 경우<br />
                2. 이용자가 비밀번호 관리 소홀 등 타인의 부정사용을 방치한
                경우<br />
                3. 공중통신선로의 장애에 의해 서비스 이용이 불가능한 경우<br />
                4. 이용자가 서비스에 게재하거나 전송한 내용<br />
                5. 기타 법률구조플랫폼의 귀책사유가 없는 이용자의 오용 및 장애
              </b>
            </span>
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제20조(협의 해결)</dt>
          <dd>
            서비스의 이용상 발생한 분쟁에 대해서는 법률구조플랫폼과 이용자간
            상호 협의하여 해결하는 것을 원칙으로 하며, 협의 해결이 되지 않을
            경우 그 분쟁의 관할법원은 서울중앙지방법원 또는 회원의 주소지<br />
            관할법원으로 한다.
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>제21조(관계규정의 준용)</dt>
          <dd>
            이 약관에 명시되지 않은 사항에 대해서는 민법, 상법, 정보통신사업법,
            공공기관의개인정보보호에관한법률,
            정보통신망이용촉진및정보보호등에관한법률 등 관계법령에 의하여
            규율한다.
          </dd>
        </dl>

        <dl class="normal-dl">
          <dt>부칙</dt>
          <dd>이 약관은 2025년 1월 6일부터 적용한다.</dd>
        </dl>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/etc/terms.scss';
</style>
