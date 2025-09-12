<script setup lang="ts">
import { useJoinStore } from '~/stores/join';
import NewModal from '~/components/common/Newmodal.vue';
import { useModal } from '~/composables/useModal';
import { useModalFocus } from '~/composables/useModalFocus';
import dayjs from 'dayjs';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTitle from '~/components/ui/title/title.vue';

const router = useRouter();
const modal = useModal();
const { showAlert } = useCustomAlert();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

const requestVerify = (type: '001' | '002') => {
  createChannel();

  const authType = type === '001' ? 'mobile' : 'ipin';
  window.open(
    '',
    'authPopup',
    'width=420,height=640,scrollbars=no,resizable=no'
  );

  joinRequest.value.certTypeCd = type;
  document.auth.action = `/auth/${authType}/request`;
  document.auth.submit();
};

const nameTitle = computed(() => {
  return joinRequest.value.mbrTypeCd === 'O01'
    ? '외국인등록번호'
    : '주민등록번호';
});

const createChannel = () => {
  const channel = new BroadcastChannel('auth');

  const messageFn = async (event: any) => {
    if (event.data === 'success') {
      const data = await joinStore.searchAuthResult();
      joinRequest.value.mbrNm = data.name;
      joinRequest.value.mbrBrdt = data.birth;
      joinRequest.value.mbrGndrCd = data.gender;

      const birth = dayjs(data.birth, 'YYYYMMDD');
      const diff = dayjs().diff(birth, 'year');

      if (diff < 14) {
        joinRequest.value.mbrTypeCd = 'U01';
      }

      if (
        joinRequest.value.certTypeCd === '001' ||
        joinRequest.value.certTypeCd === '002'
      ) {
        await showAlert({
          icon: 'info',
          html: '인증이 완료되었습니다.'
        });
      } else if (joinRequest.value.certTypeCd === '002') {
        await showAlert({
          icon: 'info',
          text: '실명인증이 완료되었습니다.'
        });
      }

      window.removeEventListener('message', messageFn);
      channel.close();
      await router.push('/join/memberinfo', { external: true });
      return;
    }

    if (event.data === 'duplicate') {
      await showAlert({
        icon: 'info',
        html: '이미 가입되어 있는 정보입니다.<br/>로그인이나 아이디 찾기를<br/>진행하여 주시기 바랍니다.'
      });

      channel.close();
      await router.push('/login', { external: true });
      return;
    }

    if (event.data === 'fail') {
      if (joinRequest.value.certTypeCd === '003') {
        await showAlert({
          icon: 'info',
          html: `실명인증에 실패하였습니다.<br />이름, ${nameTitle}를 확인하십시오.`
        });
      }
    }
  };

  window.addEventListener('message', messageFn);
};
const splitTelNo = (num) => {
  if (num.length === 11) {
    return num.slice(0, 3) + '-' + num.slice(3, 7) + '-' + num.slice(7);
  }
  return num;
};
const findEasyAuthResult = () => {
  createChannel();

  useAxios()
    .get('/api/join/easy/auth/result')
    .then(async ({ data }) => {
      joinRequest.value.mbrNm = data.mbrNm;
      joinRequest.value.mbrBrdt = data.mbrBrdt;
      joinRequest.value.mbrGndrCd = data.mbrGndrCd;
      joinRequest.value.certTypeCd = '005';
      joinRequest.value.mbrMblTelno = data.mbrMblTelno;

      const birth = dayjs(data.mbrBrdt, 'YYYYMMDD');
      const diff = dayjs().diff(birth, 'year');
      // console.log(diff);

      if (diff < 14) {
        joinRequest.value.mbrTypeCd = 'U01';
      }

      await showAlert({
        icon: 'info',
        html: '인증이 완료되었습니다.'
      });
      sessionStorage.setItem('signUpVerify', 'Y');
      await router.push('/join/memberinfo', { external: true });
    })
    .catch((e) => {
      if (e.status === 400) {
        showAlert({
          icon: 'info',
          html: '이미 가입되어 있는 정보입니다.<br/>로그인이나 아이디 찾기를<br/>진행하여 주시기 바랍니다.'
        });
        return;
      }
      showAlert({
        icon: 'error',
        html: '회원인증 중 오류가 발생되었습니다.'
      });
    });
};

const isDomestic = computed(() => joinRequest.value.mbrTypeCd !== 'F01');
</script>

<template>
  <form name="auth" method="post" target="authPopup"></form>
  <section class="section2">
    <div class="container">
      <CommonTitle tag="h4" type="bar" size="1">본인확인</CommonTitle>
      <div class="auth-box">
        <div class="row align-items-center">
          <div :class="[isDomestic ? 'col-xl-4' : 'col-xl-6', 'col-12']">
            <div class="info-box">
              <div class="img-box">
                <img src="/image/sub/join/certification01.svg" alt="" />
              </div>
              <div class="text-box">
                <strong>휴대폰 인증</strong>
                <p>
                  본인명의로 등록된 휴대폰을 통해<br />
                  본인확인을 받을 수 있는 서비스입니다.
                </p>
              </div>
              <div class="button-box">
                <a
                  class="btn-basic primary"
                  @click="requestVerify('001')"
                  title="휴대폰 인증 새창 열림"
                >
                  <span class="text">휴대폰 인증하기</span>
                  <span class="icon-span">
                    <img src="/image/sub/join/certification_go.svg" alt="" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div :class="[isDomestic ? 'col-xl-4' : 'col-xl-6', 'col-12']">
            <div class="info-box">
              <div class="img-box">
                <img src="/image/sub/join/certification02.svg" alt="" />
              </div>
              <div class="text-box">
                <strong>아이핀(I-PIN)인증</strong>
                <p>
                  개인식별 번호를 발급받아 인터넷상에서<br />
                  본인확인을 받을 수 있는 서비스입니다.
                </p>
              </div>
              <div class="button-box">
                <a
                  class="btn-basic primary"
                  @click="requestVerify('002')"
                  title="아이핀 인증 새창 열림"
                >
                  <span class="text">아이핀 인증하기</span>
                  <span class="icon-span">
                    <img src="/image/sub/join/certification_go.svg" alt="" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-12" v-if="joinRequest.mbrTypeCd !== 'F01'">
            <div class="info-box">
              <div class="img-box">
                <img src="/image/sub/login/login01.svg" alt="" />
              </div>
              <div class="text-box">
                <strong>간편 인증</strong>
                <p>
                  민간인증서를 통해 편리하게<br />
                  본인확인을 받을 수 있는 서비스입니다.
                </p>
              </div>
              <div class="button-box">
                <CommonButton
                  title="간편인증 새창 열림"
                  variants="primary"
                  width="xxl"
                  @click="
                    () => {
                      modal.openModal();
                      createModalFocus();
                    }
                  "
                  ref="returnFocusRef"
                >
                  간편인증
                  <span class="icon-span">
                    <img src="/image/sub/join/certification_go.svg" alt="" />
                  </span>
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <NewModal
    :is-visible="modal.isVisible.value"
    :close-modal="
      () => {
        modal.closeModal();
        removeModalFocus();
      }
    "
    :show-header="true"
    modalClass="easy-modal"
    header-text="간편인증"
    :show-close-button="true"
    headeretctitle="법률구조서비스 플랫폼"
    headeretc-class="modify-new-title-h5"
    ref="modalFocusRef"
  >
    <easyauxpopup
      :modal="modal"
      :visible="modal.isVisible.value"
      @submit="findEasyAuthResult"
    />
  </NewModal>
</template>

<style scoped lang="scss">
@use './scss/identity-mobile-ipin';
</style>
