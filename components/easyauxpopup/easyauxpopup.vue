<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonModal from '~/components/ui/modal/index.vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import CommonTitle from '~/components/ui/title/title.vue';

type EasyLogin = {
  img: string;
  text: string;
  id: string;
};

const props = defineProps({
  modal: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['submit']);

onBeforeMount(async () => {
  await requestToken();
});

const requestToken = async () => {
  return useAxios()
    .post('/api/auth/easy/token')
    .then(() => {})
    .catch(() => {
      showAlert({
        icon: 'error',
        text: '토큰 생성에 실패하였습니다. 다시 시도해주시기 바랍니다.'
      });

      props.modal.closeModal();
    });
};

const easyList = ref<EasyLogin[]>([
  {
    img: '/image/sub/login/certificate_icon01.png',
    text: '카카오톡',
    id: 'cokakao_100101'
  },
  {
    img: '/image/sub/login/certificate_icon02.png',
    text: '신한인증서',
    id: 'coshinhan_100101'
  },
  {
    img: '/image/sub/login/certificate_icon03.png',
    text: '통신사PASS',
    id: 'copass_100101'
  },
  {
    img: '/image/sub/login/certificate_icon05.png',
    text: '국민인증서',
    id: 'cokb_100101'
  },
  {
    img: '/image/sub/login/certificate_icon07.png',
    text: '페이코',
    id: 'copayco_100101'
  },
  {
    img: '/image/sub/login/certificate_icon08.png',
    text: '네이버',
    id: 'conaver_100101'
  },
  {
    img: '/image/sub/login/certificate_icon10.png',
    text: '뱅크샐러드',
    id: 'cobanksalad_100101'
  },
  {
    img: '/image/sub/login/certificate_icon11.png',
    text: '하나인증서',
    id: 'cohana_100101'
  },
  {
    img: '/image/sub/login/certificate_icon12.png',
    text: '카카오뱅크',
    id: 'cokakaobank_100101'
  },
  {
    img: '/image/sub/login/certificate_icon13.png',
    text: '우리인증서',
    id: 'cowoori_100101'
  }
]);

const data = ref({
  name: '',
  phone: '--',
  birthday: '',
  authTypeCd: '',
  telcoTypeCd: 'S',
  prvcUseAgreYn: false,
  prvcPvsnAgreYn: false,
  uiiPvsnAgreYn: false
});

const checkedAll = computed({
  get() {
    return (
      data.value.prvcUseAgreYn &&
      data.value.prvcPvsnAgreYn &&
      data.value.uiiPvsnAgreYn
    );
  },
  set(newValue) {
    data.value.prvcUseAgreYn = newValue;
    data.value.prvcPvsnAgreYn = newValue;
    data.value.uiiPvsnAgreYn = newValue;
  }
});

const { showAlert } = useCustomAlert();

const requestCert = ref(false);
// 동의사항 체크 확인
const checkAgreement = () => {
  if (!checkedAll.value) {
    // 다음 페이지로 이동
    message.warning('모든 동의사항에 동의해야 다음 단계로 진행할 수 있습니다.');
  } else if (!data.value.authTypeCd) {
    message.warning('민간 인증서를 선택해주세요.');
  } else if (!data.value.name || data.value.name.length < 2) {
    message.warning('이름을 입력해주세요.');
  } else if (!data.value.phone || data.value.phone.length < 13) {
    message.warning('휴대전화 번호를 입력해주세요.');
  } else if (!data.value.birthday || data.value.birthday.length !== 8) {
    message.warning('생년월일을 확인해주세요.');
  } else if (
    data.value.authTypeCd === 'copass_100101' &&
    !data.value.telcoTypeCd
  ) {
    message.warning('통신사를 선택해주세요.');
  } else {
    let first = true;
    const request = () => {
      useAxios()
        .post('/api/auth/easy/request', data.value)
        .then(() => {
          message.info('인증 요청을 전송하였습니다.');

          requestCert.value = true;
        })
        .catch(async () => {
          if (first) {
            first = false;
            await requestToken();
            request();
          } else {
            message.error(
              '인증 요청에 실패하였습니다. 인증서 발급여부를 확인해주시고 다시 시도해주시기 바랍니다.'
            );

            props.modal.closeModal();
          }
        });
    };

    request();
  }
};

const selectedAuthType = (id) => {
  data.value.authTypeCd = id;
};

const submit = () => {
  useAxios()
    .post('/api/auth/easy/result')
    .then(() => {
      emits('submit');

      props.modal.closeModal();
      message.success('인증이 완료되었습니다.');
    })
    .catch(() => {
      message.warning('인증이 완료되지 않았습니다.');
    });
};

const target = useTemplateRef('target');
const { hasFocus, activate, deactivate } = useFocusTrap(target);
</script>

<template>
  <div class="easy-login-modal" ref="target">
    <div class="left" v-if="!requestCert">
      <CommonTitle tag="h3" size="1">민간 인증서</CommonTitle>
      <div class="logos-wrap">
        <button
          type="button"
          v-for="(item, i) in easyList"
          :key="`cert-type-${i}`"
          class="col-xl btn-logo"
          @click="selectedAuthType(item.id)"
          :title="item.text"
        >
          <span class="img-box">
            <img
              :src="item.img"
              :alt="item.text"
              :class="item.id === data.authTypeCd ? 'active' : ''"
            />
          </span>
          <span class="text">{{ item.text }}</span>
        </button>
      </div>
    </div>
    <div class="right" v-if="!requestCert">
      <div class="content-box">
        <CommonTitle tag="h3" size="1">본인인증 정보 입력</CommonTitle>
        <div class="info-box">
          <div class="flex-wrap">
            <div class="grey-box">이름</div>
            <div class="input-box">
              <label for="name">
                <span class="sr-only">이름</span>
              </label>
              <a-input
                type="text"
                id="name"
                class="text-bx"
                placeholder="홍길동"
                maxlength="50"
                v-model:value="data.name"
                title="이름을 입력하세요"
              />
            </div>
          </div>
          <div class="flex-wrap">
            <div class="grey-box">생년월일</div>
            <div class="input-box">
              <label for="birthday">
                <span class="sr-only">생년월일</span>
              </label>
              <a-input
                type="text"
                id="birthday"
                class="text-bx"
                placeholder="19900101"
                v-model:value="data.birthday"
                maxlength="8"
                title="생년월일을 입력하세요"
              />
            </div>
          </div>
          <div class="flex-wrap">
            <div class="grey-box">휴대전화</div>
            <div class="input-box">
              <common-easy-auth-tel-num-input
                cd-group-id="CO0017"
                v-model="data.phone"
              />
            </div>
          </div>
          <div class="flex-wrap" v-if="data.authTypeCd === 'copass_100101'">
            <div class="grey-box">통신사</div>
            <div class="input-box">
              <label for="telcoTypeCd">
                <span class="sr-only">선택</span>
              </label>
              <select
                class="form-select number-select h-12"
                title="통신사를 선택하세요"
                v-model="data.telcoTypeCd"
              >
                <option value="">선택</option>
                <option value="S">SKT</option>
                <option value="K">KT</option>
                <option value="L">LGU+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="content-box">
        <div class="title-wrap">
          <CommonTitle tag="h3" size="1">서비스 이용에 대한 동의</CommonTitle>
          <div class="check-box">
            <input
              class="check"
              type="checkbox"
              id="all"
              v-model="checkedAll"
            />
            <label for="all">전체동의</label>
          </div>
        </div>
        <div class="info-box">
          <div class="agreed-wrap">
            <div class="text-box">
              <input
                class="check"
                type="checkbox"
                id="agreed1"
                v-model="data.prvcUseAgreYn"
              />
              <label for="agreed1">개인정보 이용동의</label>
            </div>
            <div class="blue-text">
              <CommonModal
                modal-click-button-text="약관보기"
                modal-header-text="개인정보 이용동의"
                ok-text="확인"
                cancel-text="취소"
                btn-width="70px"
                @open="deactivate()"
                @close="activate()"
              >
                <div class="undefined-box">
                  <CommonTitle tag="h3" size="1">
                    라온시큐어 주식회사(이하 “회사”)는 『간편인증 서비스』를
                    위하여 개인정보를 수집/이용하고자 합니다.
                  </CommonTitle>
                  <dl>
                    <dt class="common-title__sub-sm">
                      1.개인정보 수집∙이용 목적
                    </dt>
                    <dd class="common-text">
                      - 이용자가 웹사이트 또는 Application에 입력한
                      간편인증/전자서명에 필요한 정보를 인증기관에 전달하는 목적
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">2.수집항목</dt>
                    <dd class="common-text">- 성명, 생년월일, 휴대폰 번호</dd>
                    <dd class="common-text">
                      ※ 고유식별 정보(주민등록번호, 여권정보, 면허정보,
                      외국인등록번호) 수집을 하지 않고 있습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      3.개인정보의 보유기간 및 이용 기간
                    </dt>
                    <dd class="common-text">
                      - 『OmniOne CX 서비스』 이용기관 인증정보 전달 후 즉시
                      파기
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      4.개인정보의 수집 및 이용 거부
                    </dt>
                    <dd class="common-text">
                      이용자는 회사의 개인정보 수집 및 이용 동의를 거부할 수
                      있습니다.<br />
                      단, 동의를 거부하는 경우 『간편인증 서비스』 이용이
                      제한됩니다.
                    </dd>
                  </dl>
                </div>
              </CommonModal>
            </div>
          </div>
          <div class="agreed-wrap">
            <div class="text-box">
              <input
                class="check"
                type="checkbox"
                id="agreed2"
                v-model="data.prvcPvsnAgreYn"
              />
              <label for="agreed2">제3자 정보제공동의</label>
            </div>
            <div class="blue-text">
              <CommonModal
                modal-click-button-text="약관보기"
                modal-header-text="제3자 정보제공동의"
                ok-text="확인"
                cancel-text="취소"
                btn-width="70px"
                @open="deactivate()"
                @close="activate()"
              >
                <div class="undefined-box">
                  <CommonTitle tag="h3" size="1">
                    라온시큐어 주식회사(이하 “회사”)는 『간편인증 서비스』를
                    위하여 다음의 정보를 제공하고자 합니다.
                  </CommonTitle>
                  <dl>
                    <dt class="common-title__sub-sm">
                      1.제공받는 자의 개인정보 수집 이용 목적
                    </dt>
                    <dd class="common-text">
                      - 『간편인증 서비스』를 위한 개인정보 일치 여부 확인
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      2.개인정보를 제공받는 자
                    </dt>
                    <dd class="common-text">- 엔에이치엔페이코(주)</dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      3.제공하는 개인정보 항목
                    </dt>
                    <dd>- 이름, 생년월일, 휴대폰 번호</dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      4.제공받는 자의 개인정보 보유 이용 기간
                    </dt>
                    <dd class="common-text">
                      - 『OmniOne CX 서비스』 이용기관 인증정보 전달 후 즉시
                      파기
                    </dd>
                    <dd class="common-text">
                      이용자는 “회사”에서 요구하는 개인정보 제공에 대한 동의를
                      거부할 수 있습니다.<br />
                      단, 동의를 거부하는 경우 『간편인증 서비스』를 이용할 수
                      없습니다.
                    </dd>
                  </dl>
                </div>
              </CommonModal>
            </div>
          </div>
          <div class="agreed-wrap">
            <div class="text-box">
              <input
                class="check"
                type="checkbox"
                id="agreed3"
                v-model="data.uiiPvsnAgreYn"
              />
              <label for="agreed3">서비스이용약관</label>
            </div>
            <div class="blue-text">
              <CommonModal
                modal-click-button-text="약관보기"
                modal-header-text="서비스이용약관"
                ok-text="확인"
                cancel-text="취소"
                btn-width="70px"
                @open="deactivate()"
                @close="activate()"
              >
                <div class="undefined-box">
                  <CommonTitle tag="h3" size="1">제1조 (목적)</CommonTitle>
                  <dl>
                    <dt class="common-title__sub-sm">
                      이 약관은 라온시큐어 주식회사(이하 “회사”)가 제공하는
                      OmniOne CX 서비스(이하 “본 서비스”)이용에 관하여
                      “이용자”와 “회사” 간의 권리와 의무, 서비스 이용조건과 절차
                      등 제반 사항에 대해 규정하는 것을 목적으로 합니다. 제2조
                      (용어의 정의)
                    </dt>
                    <dd class="common-text">
                      이 약관에서 사용하는 용어의 의미는 다음과 같습니다.
                    </dd>
                    <dd class="common-text">
                      1. “OmniOne CX 서비스”(이하 “본 서비스”)라 함은 “이용자”와
                      “이용기관”에 각 “전자서명인증기관”, 정부기관, “DID
                      발급기관”, “본인확인기관”에서 발급한 “인증서” 또는 증명서
                      내 개인정보 일치 여부 확인 등의 서비스(“간편인증서비스”,
                      “전자서명서비스”, “디지털증명서서비스”, “본인확인서비스”를
                      모두 포함)를 통합 제공하는 서비스를 말합니다.
                    </dd>
                    <dd class="common-text">
                      2. “이용자”라 함은 서비스 이용을 위하여 본인의 정보를
                      입력하고 본 약관에 동의하여 서비스를 이용하는 자를
                      말합니다.
                    </dd>
                    <dd class="common-text">
                      3. “전자서명인증기관”이라 함은 전자서명인증사업자 업무를
                      수행하는 기관을 말합니다.
                    </dd>
                    <dd class="common-text">
                      4. “본인확인기관”이란 방송통신위원회로부터 “본인확인기관”
                      지정을 받아 “이용자”의 주민등록번호를 사용하지 아니하고
                      “대체수단”을 제공하는 기관을 말합니다.
                    </dd>
                    <dd class="common-text">
                      5. “DID 발급기관”이란 “디지털 증명서”의 신규 발급, 재발급,
                      삭제, 디지털 증명서 이용과 관련된 신원 확인, 인증 내역
                      확인 등 업무를 수행하는 기관을 말합니다.
                    </dd>
                    <dd class="common-text">
                      6. “이용기관”이라 함은 “회사”와 체결된 서비스를 제공받는
                      자를 말합니다.
                    </dd>
                    <dd class="common-text">
                      7. “인증서”란 전자서명생성정보가 이용자에게 유일하게
                      속한다는 사실 등을 확인하고 이를 증명하는 전자적 정보를
                      말합니다.
                    </dd>
                    <dd class="common-text">
                      8. “모바일 신분증”이라 함은 정부기관이 발급하는 스마트폰
                      기반 신분증을 말하며 전자적 방식의 신분증(모바일
                      운전면허증)을 말합니다.
                    </dd>
                    <dd class="common-text">
                      9. “디지털 증명서”란 “발급기관”에 의해 전자적인 방식으로
                      발급되는 증명서로 신원 확인, 인증 내역 확인 등의 목적으로
                      사용될 수 있는 증명서를 말합니다.
                    </dd>
                    <dd class="common-text">
                      10. “전자서명”이란 서명자의 신원 또는 서명자가 해당
                      전자문서에 서명하였다는 사실을 나타내는 데 이용하기 위하여
                      전자문서에 첨부되거나 논리적으로 결합된 전자적 형태의
                      정보를 말합니다.
                    </dd>
                    <dd class="common-text">
                      11. "본인확인" 이라 함은 사설 인증서로 전자서명을 통해
                      개인이 본인임을 확인 및 인증하는 프로세스를 말합니다.
                    </dd>
                    <dd class="common-text">
                      12. “전자서명생성정보(개인키)”란 전자서명을 생성하기
                      위하여 이용하는 전자적 정보를 말합니다.
                    </dd>
                    <dd class="common-text">
                      13. “전자서명검증정보(공개키)”란 전자서명을 검증하기
                      위하여 이용하는 전자적 정보를 말합니다.
                    </dd>
                    <dd class="common-text">
                      14. “월렛”이라 함은 “이용자” 소유의 단말기에 “모바일
                      신분증”, “디지털 증명서” 등을 보관, 관리하는 서비스로
                      “이용자”의 DID와 함께 관리하는 수단을 의미합니다.
                    </dd>
                    <dd class="common-text">
                      15. “DID(Decentralized Identifier)라 함은 “디지털 증명서
                      서비스”를 이용함에 있어 “이용자”의 “월렛”을 식별하기 위한
                      정보로서 “이용자”와 1:1로 대응되며 “이용자” 본인의 단말기
                      내에서 “개인키”를 이용하여 생성 및 저장됩니다.
                    </dd>
                    <dd class="common-text">
                      16. “개인키”라 함은 “월렛”을 통해 생성되는 고유한 식별
                      값으로, “이용자”가 “모바일 신분증” 또는 “디지털 증명서”에
                      “전자서명”을 수행하기 위해 생성되고 “월렛” 내에 안전하게
                      보관•관리되는 정보를 의미합니다.
                    </dd>
                    <dd class="common-text">
                      17. “공개키”라 함은 “개인키”와 1:1로 대응되며, 블록체인을
                      통해 “모바일 신분증” 또는 “디지털 증명서”의 유효성을
                      검증할 수 있는 정보를 의미합니다.
                    </dd>
                    <dd class="common-text">
                      18. “검증”이라 함은 이용자가 제시하는 “모바일 신분증” 또는
                      “디지털 증명서” 소지자임을 확인하는 행위와 “이용기관”이
                      “이용자”의 신원을 확인하는 행위를 말합니다.
                    </dd>
                    <dd class="common-text">
                      19. “본인확인”이란 “본인확인기관”에 속하는 인증기관의
                      인증서를 이용하여 “이용자의” 본인 여부를 확인하는 절차를
                      말합니다.
                    </dd>
                    <dd class="common-text">
                      20. “대체수단”이란 중복가입확인정보 및 “연계정보”를
                      포함하여, 주민등록번호를 사용하지 아니하고 본인 여부를
                      식별 및 확인할 수 있는 수단을 말합니다.
                    </dd>
                    <dd class="common-text">
                      21. “중복가입확인정보”라 함은 사이트에 가입하고자 하는
                      “이용자”의 중복가입 여부를 확인하는 데 사용되는 정보로서
                      “본인확인기관”이 “이용자”의 주민등록번호, 사이트 식별번호
                      및 “본인확인기관” 간 공유비밀정보를 이용하여 생성한 정보를
                      말합니다.
                    </dd>
                    <dd class="common-text">
                      22. “연계정보”란 정보통신서비스 제공자의 온•오프라인
                      서비스 연계를 위해 “본인확인기관”이 “이용자”
                      주민등록번호와 “본인확인기관” 간 공유 비밀정보를 이용하여
                      생성한 정보를 말합니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      제3조 (약관의 게시와 개정)
                    </dt>
                    <dd class="common-text">
                      ① “회사”는 “이용자”가 약관의 내용을 쉽게 알 수 있도록 본
                      서비스 초기 화면에 게시합니다.
                    </dd>
                    <dd class="common-text">
                      ② “회사”는 약관의 규제에 관한 법률 정보통신망 이용촉진 및
                      정보보호 등에 관한 법률 전자서명법 등 관련 법령을 위배하지
                      않는 범위에서 이 약관을 개정할 수 있습니다.
                    </dd>
                    <dd class="common-text">
                      ③ “회사”가 약관을 개정할 경우에는 적용 일자 및 개정 사유를
                      명시하여 현행 약관과 함께 제1항의 방식에 따라 그 개정
                      약관의 적용 일자 15일 전부터 적용 일자 전일까지
                      공지합니다. 다만, “이용자”에게 불리한 사항의 약관 변경의
                      경우 30일 전부터 공지합니다.
                    </dd>
                    <dd class="common-text">
                      ④ “회사”가 전항에 따라 개정 약관을 공지하면서 “이용자”에게
                      변경 약관의 적용 일까지 명시적으로 거부 의사를 표시하지
                      아니하면 동의의 의사표시가 표명된 것으로 본다는 뜻을
                      명확하게 공지하였음에도 “이용자”가 명시적으로 거부 의사를
                      표시하지 아니한 경우, “회사”는 “이용자”가 개정 약관에
                      동의한 것으로 봅니다.
                    </dd>
                    <dd class="common-text">
                      ⑤ “이용자”가 개정 약관의 적용에 동의하지 않는 경우
                      “회사”는 개정 약관의 내용을 해당 “이용자”에게 적용할 수
                      없으며, “이용자”는 이용계약을 해지할 수 있습니다. 다만,
                      기존 약관을 적용할 수 없는 특별한 사정이 있는 경우
                      “회사”는 이용계약을 해지할 수 있습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제4조 (약관 외 준칙)</dt>
                    <dd class="common-text">
                      ① 이 약관에 명시되지 않는 사항은 인증업무준칙, 서비스 운영
                      정책 및 개별 이용 안내, 서비스 화면에 게시된 내용,
                      정보통신망 이용 촉진 및 정보보호 등에 관한 법률 등 관련
                      법령 또는 일반 관례에 따릅니다.
                    </dd>
                    <dd class="common-text">
                      ② 이 약관과 관련하여 “회사”의 정책 변경, 법령의 제•개정
                      또는 공공기관의 고시나 지침, 가이드 등에 의하여 회사가
                      이용자에게 통지 또는 공지하는 내용도 이 약관의 일부를
                      구성합니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제5조 (통지)</dt>
                    <dd class="common-text">
                      ① “회사”가 “이용자”에게 개별 통지하는 경우, 이 약관에서
                      달리 정하지 않는 한 본 서비스 화면, 홈페이지 등의 수단을
                      이용하여 통지할 수 있습니다.
                    </dd>
                    <dd class="common-text">
                      ② 제1항에도 불구하고 “회사”가 불특정 다수의 이용자에게
                      통지하는 경우, 본 서비스 화면 또는 회사의 홈페이지에 7일
                      이상 해당 사실을 게시함으로써 개별 통지에 갈음할 수
                      있습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제6조 (서비스의 내용)</dt>
                    <dd class="common-text">
                      본 서비스는 “이용자”에게 다양한 인증서와 “모바일 신분증”,
                      “디지털 증명서”의 인증, 검증 서비스를 통합하여 제공하는
                      서비스로 다음과 같은 개별 서비스를 포함합니다.
                    </dd>
                    <dd class="common-text">
                      1. “간편인증서비스”: 각 “전자서명인증기관”의
                      “인증서비스”를 통합하여 “이용자”에게 제공하는 서비스로,
                      “회사”는 개별 “전자서명인증기관”의 “인증서비스” 이용약관에
                      별도로 동의한 “이용자”의 본인확인 요청을 각
                      “전자서명인증기관”에 전달하고, “전자서명인증기관”의
                      “인증서비스” 확인 결과를 전달받아 “이용기관”에
                      제공함으로써, “이용자” 대상으로 “전자서명인증기관”과
                      “이용기관” 간 “간편인증서비스”를 중계하여 제공합니다.
                    </dd>
                    <dd class="common-text">
                      2. “전자서명서비스”: 각 “전자서명인증기관”의 “전자서명”
                      서비스를 통합하여 “이용자”에게 제공하는 서비스로, 회사는
                      개별 “전자서명인증기관”의 “전자서명” 서비스 이용약관에
                      별도로 동의한 “이용자”의 본인확인 요청을 각
                      “전자서명인증기관”에 전달하고, “전자서명인증기관”의
                      “전자서명” 서비스 확인 결과를 전달받아 “이용기관”에
                      제공함으로써, “이용자” 대상으로 “전자서명인증기관”과
                      “이용기관” 간 “전자서명서비스”를 중계하여 제공합니다.
                    </dd>
                    <dd class="common-text">
                      3. “디지털증명서서비스”: 이용자가 “월렛” 내 보유하고 있는
                      각 “발급기관”으로부터 발급된 “디지털 증명서” 이용과 관련된
                      신원확인, 인증 내역 확인 서비스를 제공합니다.
                    </dd>
                    <dd class="common-text">
                      4. “본인확인서비스”: 각 “본인확인기관”의 “본인확인”
                      서비스를 통합하여 “이용자”에게 제공하는 서비스로 “회사”는
                      개별 “본인확인기관”의 “본인확인” 서비스 이용약관에 별도로
                      동의한 “이용자”의 “본인확인” 요청을 각 “본인확인기관”에
                      전달하고, “본인확인기관”의 “본인확인” 서비스 확인 결과를
                      전달받아 “이용기관”에 제공함으로써 “이용자” 대상으로
                      “본인확인기관”과 “이용기관” 간 “본인확인서비스”를 중계하여
                      제공합니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      제7조 (서비스 이용 제한)
                    </dt>
                    <dd class="common-text">
                      다음과 같은 경우 “인증기관”, 정부기관, “발급기관”이 정한
                      바에 따라 본 서비스 이용이 제한될 수 있습니다.
                    </dd>
                    <dd class="common-text">
                      ① “이용자”가 본인확인 요청을 위해 입력한 정보가 허위라고
                      판단되는 경우
                    </dd>
                    <dd class="common-text">
                      ② “전자서명인증기관”, “본인확인기관”, 정부기관, “DID
                      발급기관”이 정한 “인증서”, “모바일 신분증”, “디지털
                      증명서” 발급 요건이 충족되지 아니한 경우
                    </dd>
                    <dd class="common-text">
                      ③ “이용자”가 “이용기관”이 제시하는 인증 절차를 완료하지
                      못한 경우
                    </dd>
                    <dd class="common-text">
                      ④ 본 서비스를 불법적이거나 부당한 용도로 사용할 우려가
                      있는 경우
                    </dd>
                    <dd class="common-text">
                      ⑤ 기타 “이용기관”이 정한 이용신청 요건이 충족되지 아니한
                      경우
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      제8조 (서비스 이용 시간)
                    </dt>
                    <dd class="common-text">
                      “회사”는 본 서비스를 연중무휴, 1일 24시간 제공함을
                      원칙으로 합니다. 다만, 필요한 경우 사전 공지 후 본
                      서비스를 일정한 범위로 구분하여 각 범위에 따른 이용 가능
                      시간을 별도로 지정할 수 있습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      제9조 (서비스의 변경, 중단)
                    </dt>
                    <dd class="common-text">
                      ① “회사”는 상당한 이유가 있는 경우 운영상, 기술상의 필요에
                      따라 본 서비스의 전부 또는 일부를 변경할 수 있습니다.
                    </dd>
                    <dd class="common-text">
                      ② 본 서비스의 내용, 이용 방법, 이용 시간 등에 대하여
                      변경이 있는 경우 “회사”는 변경사유, 변경내용 및 제공 일자
                      등을 그 변경 전에 본 서비스를 통해 공지합니다.
                    </dd>
                    <dd class="common-text">
                      ③ “회사”는 컴퓨터 등 정보통신설비의 보수 점검, 교체 및
                      고장, 통신두절, 제휴 기관의 시스템 운영 상황, 기타 본
                      서비스 운영상 상당한 이유가 있는 경우 본 서비스의 제공을
                      일시적으로 중단할 수 있습니다. 이 경우 “회사”는 본 서비스
                      내 공지 화면 등에 서비스 중단 사실을 게시함으로써 사전에
                      서비스 중단으로 통지합니다. 다만, “회사”가 사전에 통지할
                      수 없는 부득이한 사유가 있는 경우에는 사후에 통지할 수
                      있습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제10조 (권리의 귀속)</dt>
                    <dd class="common-text">
                      ① “회사”는 본 서비스와 관련하여 “이용자”가 이용할 수
                      있도록 “간편인증서비스”, “전자서명서비스”,
                      “디지털증명서서비스”, “본인확인서비스”를 제공하며
                      “이용자”는 이를 양도, 판매, 담보제공 등의 처분행위를 할 수
                      없습니다.
                    </dd>
                    <dd class="common-text">
                      ② “이용자”는 본 서비스를 이용하여 얻은 정보를 가공,
                      판매하는 행위 등 본 서비스에 게재된 자료를 영리목적으로
                      이용하거나 제3자에게 이용하게 할 수 없습니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제11조 (손해배상)</dt>
                    <dd class="common-text">
                      ① “회사”는 본 서비스 제공과 관련하여 이용자에게 어떠한
                      손해가 발생하더라도 고의 및 중대한 과실로 행한 행위를
                      제외하고 손해에 대한 책임을 부담하지 아니합니다.
                    </dd>
                    <dd class="common-text">
                      ② “이용자”는 본 서비스 이용과 관련하여 이용자의 귀책
                      사유로 “회사”, “전자서명인증기관”, “본인확인기관”,
                      정부기관, “DID 발급기관”, “이용기관” 또는 제3자에게 손해를
                      입힌 경우 그 손해를 배상하여야 합니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">제12조 (면책 사항)</dt>
                    <dd class="common-text">
                      ① “회사”가 천재지변 또는 이에 준하는 불가항력으로 인하여
                      본 서비스를 제공할 수 없는 경우에는 본 서비스 제공에 관한
                      책임이 면제됩니다.
                    </dd>
                    <dd class="common-text">
                      ② “회사”는 “회사”의 귀책 사유가 아닌 사유로 발생한 본
                      서비스의 이용 장애에 대하여 책임을 부담하지 않습니다.
                    </dd>
                    <dd class="common-text">
                      ③ “회사”의 책임은 이용자와 개별 “전자서명인증기관”,
                      “본인확인기관”, 정부기관, “DID 발급기관”을 중계하는 본
                      서비스에 한정되며, 개별 “전자서명인증기관”,
                      “본인확인기관”, 정부기관, “DID 발급기관”이 “이용자”에게
                      제공하는 서비스와 관련하여 이용자 또는 개별
                      “전자서명인증기관”, “본인확인기관“, 정부기관, “DID
                      발급기관”에게 발생한 손해에 대해 어떠한 책임도 부담하지
                      않습니다.
                    </dd>
                    <dd class="common-text">
                      ④ “회사”는 “이용자”와 “이용기관” 사이의 거래 및 “이용자”
                      또는 “이용기관”의 귀책 사유로 인하여 상대방에게 발생한
                      손해에 대하여 어떠한 책임도 부담하지 아니합니다.
                    </dd>
                  </dl>
                  <dl>
                    <dt class="common-title__sub-sm">
                      제13조 (준거법 및 재판관할)
                    </dt>
                    <dd class="common-text">
                      ① “회사”와 “이용자”가 제기된 소송은 대한민국 법을
                      준거법으로 합니다.
                    </dd>
                    <dd class="common-text">
                      ② “회사”와 “이용자” 간 발생한 분쟁에 관한 소송은 제소
                      당시의 회원의 주소에 의하고, 주소가 없는 경우 거소를
                      관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시
                      이용자의 주소 또는 거소가 명확하지 아니한 경우의
                      관할법원은 민사소송법에 따라 정합니다.
                    </dd>
                  </dl>
                </div>
              </CommonModal>
            </div>
          </div>
        </div>
        <div class="button-wrap">
          <button type="button" class="grey-btn" @click="modal.closeModal()">
            <span class="text">닫기</span>
          </button>
          <button type="button" class="blue-btn" @click="checkAgreement">
            <span class="text">인증요청</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex-wrap w-100 h-full p-10" v-if="requestCert">
      <div class="text-center mb-4">
        인증을 진행해주세요.<br />
        입력하신 휴대폰으로 인증 요청 메시지를 보냈습니다.<br />
        메시지를 받지 못했다면 사용자정보(이름, 생년월일, 휴대폰번호)를 확인 후
        다시 시도해주세요.
      </div>
      <div class="button-wrap">
        <button
          type="button"
          class="grey-btn2 w-20"
          @click="modal.closeModal()"
        >
          <span class="text">닫기</span>
        </button>
        <button type="button" class="blue-btn2 w-20 ml-3" @click="submit">
          <span class="text">인증완료</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './easyauxpopup';
</style>
