<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
import type { LoginType } from '~/stores/login/index.types';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useModalFocus } from '~/composables/useModalFocus';
import { ref } from 'vue';
import NewModal from '~/components/common/Newmodal.vue';
import { v4 } from 'uuid';

const modal1 = useModal();
const modal2 = useModal();

const route = useRoute();
const router = useRouter();

const { showAlert } = useCustomAlert();
const {
  modalFocusRef: modalFocusRef1,
  returnFocusRef: returnFocusRef1,
  createModalFocus: createModalFocus1,
  removeModalFocus: removeModalFocus1
} = useModalFocus();
const {
  modalFocusRef: modalFocusRef2,
  returnFocusRef: returnFocusRef2,
  createModalFocus: createModalFocus2,
  removeModalFocus: removeModalFocus2
} = useModalFocus();

const agree = ref(false);

const loginStore = useLoginStore();
const { auth, userId } = storeToRefs(loginStore);

const idInputRef = ref();
const passwordInputRef = ref();

const member = ref<LoginType>({
  remember: false,
  memberId: '',
  password: ''
});

const disabled = computed(() => {
  return !member.value.memberId || !member.value.password;
});

const login = () => {
  if (!member.value.memberId) {
    message.error('아이디를 입력해주세요.');
    idInputRef.value.focus();
    return;
  }

  if (!member.value.password) {
    message.error('비밀번호를 입력해주세요.');
    passwordInputRef.value.focus();
    return;
  }
  // if (disabled.value) {
  //   return;
  // }

  loginStore.login(member.value).then(({ data }) => {
    switch (data.status) {
      case 'LONG_TERM_LOGIN': {
        router.push('/login/guide', { external: true });
        return;
      }
      case 'CHANGE_PASSWORD': {
        auth.value = data;
        userId.value = member.value.memberId;
        return;
      }
      case 'WITHDRAW_USER': {
        showAlert({
          icon: 'error',
          text: '탈퇴한 회원입니다.'
        });
        return;
      }
      case 'NOT_FOUND_USER':
      case 'MISMATCH_USER_PASSWORD': {
        showAlert({
          icon: 'error',
          text: '아이디 또는 비밀번호 확인해주세요.'
        });
        return;
      }
      case 'LOCKED_USER':
      case 'RETRY_FAIL_COUNT': {
        showAlert({
          icon: 'error',
          confirmButtonText: '본인인증',
          showCancelButton: true,
          cancelButtonText: '취소',
          text: '비밀번호가 5회 이상 오류 입력되어 로그인할 수 없습니다. 본인인증 후 비밀번호를 재설정 해 주세요.'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/login/search/pwd', { external: true });
          }
        });
        return;
      }
      default: {
        auth.value = data;
        router.push('/ai', { external: true });
      }
    }
  });
};

const easyAuthLogin = () => {
  useAxios()
    .post('/api/login/easy/auth')
    .then(({ data }) => {
      auth.value = data;
      router.push('/ai', { external: true });
    })
    .catch(() => {
      showAlert({
        icon: 'info',
        text: '회원정보가 없습니다. 비회원 로그인을 이용해주세요.'
      });
    });
};

const openEasyAuthNmbrLogin = () => {
  if (!agree.value) {
    showAlert({
      icon: 'info',
      text: 'AI 서비스 대화 로그 수집에 동의해 주세요.'
    });
  }
  if (agree.value) {
    modal2.openModal();
    createModalFocus2();
  }
};

const easyAuthNmbrLogin = () => {
  useAxios()
    .post('/api/login/easy/auth/nmbr')
    .then(({ data }) => {
      auth.value = data;
      router.push('/ai', { external: true });
    })
    .catch(() => {
      showAlert({
        icon: 'info',
        html: '비회원 로그인에 실패하였습니다.<br/>다시 한 번 시도해주시기 바랍니다.'
      });
    });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="로그인"
          :breadcrumbItems="[{ text: '로그인', active: true }]"
        />
        <div class="login-box">
          <div class="ai-info-top-box">
            <h4>생성형 AI 검색 인증 안내</h4>
            <div class="text-box">
              <ul>
                <li>
                  최적화된 생성형 AI 검색 기능 제공을 위해 생성형 AI 검색 시
                  로그인(회원가입) 또는 일회성 간편인증 절차가 필요합니다.
                </li>
                <li>
                  회원 로그인 후 생성형 AI 검색기능을 사용할 경우 과거대화를
                  확인할 수 있는 대화목록 히스토리를 제공합니다.
                </li>
              </ul>
            </div>
          </div>
          <div class="row ai-list-row">
            <div class="col-xl-6 col-12 left-col-box">
              <div class="login-info-box">
                <h4>로그인/회원가입</h4>
                <div class="keyboard-box">
                  <!--  FIXME 이슈로 인해 임시주석  -->
                  <!-- <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="keyboard-input"
                    />
                    <label class="form-check-label" for="keyboard-input">
                      키보드 보안프로그램 적용
                    </label>
                  </div>
                  <span
                    >※ 안전한 서비스 이용을 위해 키보드 보안 프로그램 적용을
                    권장합니다.</span
                  >-->
                </div>
                <div class="form-box">
                  <div class="input-group-box id-box group-box">
                    <label for="id-input">아이디</label>
                    <a-input
                      id="id-input"
                      class="text-bx"
                      maxlength="16"
                      placeholder="아이디를 입력하세요"
                      v-model:value="member.memberId"
                      ref="idInputRef"
                    />
                  </div>
                  <div class="input-group-box password-box group-box">
                    <label for="password-input">비밀번호</label>
                    <a-input
                      id="password-input"
                      class="text-bx"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      maxlength="20"
                      @keyup.enter="login"
                      v-model:value="member.password"
                      ref="passwordInputRef"
                    />
                  </div>
                  <div class="submit-box">
                    <button
                      type="button"
                      title="로그인"
                      class="btn-basic primary"
                      @click="login"
                    >
                      <span class="text">로그인</span>
                    </button>
                  </div>
                  <div class="etc-box">
                    <span class="id-span">
                      <NuxtLink to="/login/search/id" :external="true">
                        아이디 찾기
                      </NuxtLink>
                    </span>
                    <span class="password-span">
                      <NuxtLink to="/login/search/pwd" :external="true">
                        비밀번호 찾기
                      </NuxtLink>
                    </span>
                    <span class="join-box">
                      <NuxtLink to="/join" :external="true">
                        회원가입
                      </NuxtLink>
                    </span>
                  </div>
                </div>
                <div class="login-select-box">
                  <div class="easy-login-box login-grid-box">
                    <div class="icon-box">
                      <img src="/image/sub/login/login01.svg" alt="" />
                    </div>
                    <div class="button-box">
                      <button
                        type="button"
                        title="간편인증 로그인 팝업 오픈"
                        class="btn-basic primary"
                        @click="
                          () => {
                            modal1.openModal();
                            createModalFocus1();
                          }
                        "
                        ref="returnFocusRef1"
                      >
                        <span class="text">간편인증 로그인</span>
                        <i class="icon-shortcut"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END -->
            <div class="col-xl-6 col-12 border-left-col">
              <div class="login-select-box">
                <h4>비회원 로그인</h4>
                <div class="box box1">
                  <dl>
                    <dt>대화목록 히스토리 미 제공</dt>
                    <dd>
                      회원가입 및 로그인 외 일회성 간편인증을 통한 AI 검색<br />
                      서비스를 이용하실 경우 대화목록의 히스토리는 제공되지<br />
                      않습니다.
                    </dd>
                  </dl>
                </div>

                <div class="box box2">
                  <dl>
                    <dt>비식별 처리된 AI 서비스 로그 수집 동의</dt>
                    <dd>
                      사용자의 사생활을 침해 할 우려가 있는 개인정보는<br />
                      원칙적으로 수집하지 않으나, 정확하고 다양한 AI<br />
                      서비스를 제공하기 위해 비식별 처리된 AI 서비스 대화<br />
                      로그를 수집하며, 24개월 보유 후 삭제합니다.
                    </dd>
                  </dl>
                </div>

                <div class="ai-aggre-box">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="ai-input"
                      v-model="agree"
                    />
                    <label class="form-check-label" for="ai-input">
                      AI 서비스 대화 로그 수집에 동의합니다.
                    </label>
                  </div>
                </div>

                <div class="non-member-login-box login-grid-box">
                  <div class="icon-box">
                    <img src="/image/sub/login/login03.svg" alt="" />
                  </div>
                  <div class="button-box">
                    <button
                      type="button"
                      title="간편인증 로그인 팝업 오픈"
                      class="btn-basic primary"
                      @click="openEasyAuthNmbrLogin"
                      ref="returnFocusRef2"
                    >
                      <span class="text">간편인증 로그인</span>
                      <i class="icon-shortcut"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 모달 -->
    <login-change-user-pswd-popup :key="v4()" />
    <login-reset-user-pswd-popup :key="v4()" />

    <NewModal
      :is-visible="modal1.isVisible.value"
      :close-modal="
        () => {
          modal1.closeModal();
          removeModalFocus1();
        }
      "
      :show-header="true"
      modalClass="easy-modal"
      header-text="간편인증"
      :show-close-button="true"
      headeretctitle="법률구조서비스 플랫폼"
      headeretc-class="modify-new-title-h5"
      ref="modalFocusRef1"
    >
      <easyauxpopup
        :modal="modal1"
        :visible="modal1.isVisible.value"
        @submit="easyAuthLogin"
      />
    </NewModal>

    <NewModal
      :is-visible="modal2.isVisible.value"
      :close-modal="
        () => {
          modal2.closeModal();
          removeModalFocus2();
        }
      "
      :show-header="true"
      modalClass="easy-modal"
      header-text="간편인증"
      :show-close-button="true"
      headeretctitle="법률구조서비스 플랫폼"
      headeretc-class="modify-new-title-h5"
      ref="modalFocusRef2"
    >
      <easyauxpopup
        :modal="modal2"
        :visible="modal2.isVisible.value"
        @submit="easyAuthNmbrLogin"
      />
    </NewModal>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/ai/index.scss';
</style>
