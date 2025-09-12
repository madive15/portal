<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useModal } from '~/composables/useModal';
import NewModal from '~/components/common/Newmodal.vue';
import { useLoginStore } from '~/stores/login';
import dayjs from 'dayjs';
import { useJoinStore } from '~/stores/join';

const router = useRouter();
const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);
const joinStore = useJoinStore();

const modal1 = useModal();

const nbmrLogin = () => {
  useAxios()
    .post('/api/login/easy/auth/nmbr')
    .then(({ data }) => {
      auth.value = data;
      router.push('/', { external: true });
    });
};

const requestVerify = (type: string) => {
  console.log(111);
  createChannel();

  window.open(
    '',
    'authPopup',
    'width=420,height=640,scrollbars=no,resizable=no'
  );

  document.auth.action = `/api/login/iPin/request`;
  document.auth.submit();
};

const createChannel = () => {
  const channel = new BroadcastChannel('auth');

  const messageFn = async (event: any) => {
    if (event.data === 'success') {
      window.removeEventListener('message', messageFn);
      channel.close();
      await loginStore.loadAuthorized();
      await router.push('/', { external: true });
      return;
    }
  };

  window.addEventListener('message', messageFn);
};
</script>

<template>
  <form name="auth" method="post" target="authPopup"></form>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="비회원로그인"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '비회원 로그인', active: true }
          ]"
        />

        <div class="text-box">
          <ul>
            <li>
              회원가입 없이 간편인증 및 금융인증서를 통해 로그인 하실 수
              있습니다.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section2">
      <div class="container">
        <h4>본인확인</h4>
        <div class="auth-box">
          <div class="row align-items-center">
            <div class="col-xl-6 col-12">
              <div class="info-box">
                <div class="img-box">
                  <img
                    src="/image/sub/login/login01.svg"
                    alt="간편인증 본인인증"
                  />
                </div>
                <div class="text-box">
                  <strong>간편인증</strong>
                  <p>
                    민간인증서를 통해 편리하게<br />
                    본인확인을 받을 수 있습니다.
                  </p>
                </div>
                <div class="button-box">
                  <button
                    type="button"
                    class="btn cellphone-button"
                    @click="modal1.openModal()"
                  >
                    <span class="text-span">간편인증하기</span>
                    <span class="icon-span">
                      <img
                        src="/image/sub/join/certification_go.svg"
                        alt="인증하기"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-12">
              <div class="info-box">
                <div class="img-box">
                  <img
                    src="/image/sub/join/certification02.svg"
                    alt="아이핀 인증"
                  />
                </div>
                <div class="text-box">
                  <strong>아이핀</strong>
                  <p>
                    아이핀을 통해<br />
                    본인확인을 받을 수 있습니다.
                  </p>
                </div>
                <div class="button-box">
                  <button
                    type="button"
                    class="btn cellphone-button"
                    @click="requestVerify('002')"
                    title="아이핀 인증 새창 열림"
                  >
                    <span class="text">아이핀 인증하기</span>
                    <span class="icon-span">
                      <img src="/image/sub/join/certification_go.svg" alt="" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="keyboard-box">
            <a-checkbox class="check-bx">키보드 보안프로그램 적용</a-checkbox>
            <div class="text-box">
              <p>
                ※ 안전한 서비스 이용을 위해 키보드 보안 프로그램 적용을
                권장합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <NewModal
    :is-visible="modal1.isVisible.value"
    :close-modal="modal1.closeModal"
    :show-header="true"
    modalClass="easy-modal"
    header-text="간편인증"
    :show-close-button="true"
  >
    <easyauxpopup
      :modal="modal1"
      :visible="modal1.isVisible.value"
      @submit="nbmrLogin"
    />
  </NewModal>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/gst/index.scss';
</style>
