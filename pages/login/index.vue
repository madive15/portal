<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
import type { LoginType } from '~/stores/login/index.types';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useModalFocus } from '~/composables/useModalFocus';
import { ref } from 'vue';
import NewModal from '~/components/common/Newmodal.vue';
import { v4 } from 'uuid';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonModal from '~/components/ui/modal/modal.vue';

const modal1 = useModal();

const route = useRoute();
const router = useRouter();

const { showAlert } = useCustomAlert();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
const loginStore = useLoginStore();
const { auth, userId } = storeToRefs(loginStore);

const redirect = ref('/');
onBeforeMount(() => {
  redirect.value = router.currentRoute.value.query.redirect as string;
});

const member = ref<LoginType>({
  remember: false,
  memberId: '',
  password: ''
});

const idInputRef = ref();
const passwordInputRef = ref();

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

  loginStore
    .login(member.value)
    .then(({ data }) => {
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
          router.push(redirect.value || '/', { external: true });
        }
      }
    })
    .catch(() =>
      showAlert({
        icon: 'error',
        text: '로그인에 실패하였습니다. 시스템 관리자에게 문의바랍니다.'
      })
    );
};

const easyAuthLogin = () => {
  useAxios()
    .post('/api/login/easy/auth')
    .then(({ data }) => {
      auth.value = data;
      router.push(redirect.value || '/', { external: true });
    })
    .catch(() => showAlert({ icon: 'error', text: '가입된 정보가 없습니다.' }));
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
          <div class="row">
            <div class="col-12">
              <div class="login-info-box">
                <CommonTitle tag="h4" size="1">로그인/회원가입</CommonTitle>
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
                    <label for="id-input">
                      아이디
                      <span class="sr-only">아이디</span>
                    </label>
                    <a-input
                      class="text-bx"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      id="id-input"
                      name="portalId"
                      maxlength="16"
                      v-model:value="member.memberId"
                      ref="idInputRef"
                    />
                  </div>
                  <div class="input-group-box password-box group-box">
                    <label for="password-input"
                      >비밀번호
                      <span class="sr-only">비밀번호</span>
                    </label>
                    <a-input
                      class="text-bx"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      id="password-input"
                      name="portalPassword"
                      maxlength="20"
                      @keyup.enter="login"
                      v-model:value="member.password"
                      ref="passwordInputRef"
                    />
                  </div>
                  <div class="submit-box">
                    <CommonButton
                      title="로그인"
                      variants="primary"
                      @click="login"
                      width="full"
                    >
                      <span class="text">로그인</span>
                    </CommonButton>
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
              </div>
              <div class="login-select-box mt-5">
                <div class="easy-login-box login-grid-box">
                  <div class="icon-box">
                    <img src="/image/sub/login/login01.svg" alt="" />
                  </div>
                  <div class="button-box">
                    <button
                      type="button"
                      title="간편인증 로그인"
                      class="btn-basic primary"
                      @click="
                        () => {
                          modal1.openModal();
                          createModalFocus();
                        }
                      "
                      ref="returnFocusRef"
                    >
                      <span class="text">간편인증 로그인</span>
                      <span class="icon-span">
                        <img
                          src="/image/sub/join/certification_go.svg"
                          alt=""
                        />
                      </span>
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
        :modal="modal1"
        :visible="modal1.isVisible.value"
        @submit="easyAuthLogin"
      />
    </NewModal>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/index.scss';
</style>
