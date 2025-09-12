<script setup lang="ts">
import { useModal } from '~/composables/useModal';
import Modal from '~/components/common/modal.vue';
import { useLoginStore } from '~/stores/login';
import { useCustomAlert } from '~/composables/useCustomAlert';

const { showAlert } = useCustomAlert();

const router = useRouter();
const loginStore = useLoginStore();
const { auth, userId } = storeToRefs(loginStore);

const modal = useModal();

const verifyPasswordPattern = (value: string) => {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)/.test(value);
};

const query = ref({
  userPswd: '',
  confirmPswd: ''
});

const open = computed(() => auth.value.status === 'CHANGE_PASSWORD');

const steps = ref<'INFO' | 'PASSWORD' | 'COMPLETE'>('INFO');

watch(open, (newValue) => {
  if (newValue) {
    modal.openModal();
  }
});

const cancel = () => {
  modal.closeModal();
  router.push('/', { external: true });
};

const changePasswordStep = () => {
  steps.value = 'PASSWORD';
};

const changedPasswordStep = () => {
  loginStore
    .updateUserPswd(query.value)
    .then(() => {
      steps.value = 'COMPLETE';
      loginStore.logout();
    })
    .catch(() => {
      showAlert({
        icon: 'error',
        text: '비밀번호 변경에 실패하였습니다. 다시 한 번 시도해주시기 바랍니다.'
      });

      modal.closeModal();
    });
};
</script>

<template>
  <Modal :isVisible="modal.isVisible.value" :closeModal="modal.closeModal">
    <div class="password-reset-box">
      <div class="content-header">
        <h5>비밀번호 변경 안내</h5>
        <button class="btn close-button" @click="cancel">
          <img src="/image/sub/login/popup_close.svg" alt="모달 닫기" />
        </button>
      </div>
      <div class="content-body" v-if="steps === 'INFO'">
        <p class="info-p">
          회원님께서는 3개월 동안 비밀번호를 변경하지 않으셨습니다.<br />
          개인정보 보호를 위해 비밀번호를 변경해 주세요.
        </p>
        <div class="modal-button-box">
          <button class="btn cancle-button" @click="cancel">다음에하기</button>
          <button class="btn confirm-button" @click="changePasswordStep">
            지금 변경하기
          </button>
        </div>
      </div>
      <div class="content-body" v-if="steps === 'PASSWORD'">
        <!-- 아이디 찾기이시에는 회원님의 아이디 정보입니다 로 아래의 p의 텍스트가 바뀌어야 합니다.
           아이디 찾기 모달은 전부 id-result-box 의 내용이 들어갑니다.
       -->
        <p>새로 사용할 비밀번호를 입력해주세요.</p>
        <div class="id-box group-box">
          <strong>아이디</strong>
          <span>{{ userId }}</span>
        </div>
        <div class="new-password-box group-box">
          <strong>새 비밀번호</strong>
          <input
            type="password"
            class="form-control new-password-input"
            id="newpassword"
            v-model="query.userPswd"
          />
          <label for="newpassword" />
        </div>
        <span
          class="red-span error-span"
          v-if="!verifyPasswordPattern(query.userPswd)"
          >비밀번호 규칙이 올바르지 않습니다.</span
        >
        <div class="new-password-confirm-box group-box">
          <strong>새 비밀번호 확인</strong>
          <input
            type="password"
            class="form-control new-password-confirm-input"
            id="newpasswordconfirm"
            v-model="query.confirmPswd"
          />
          <label for="newpasswordconfirm" />
        </div>
        <span
          class="red-span error-span"
          v-if="query.userPswd !== query.confirmPswd"
          >비밀번호가 일치하지 않습니다.</span
        >
        <br />
        <p class="info-p">
          ※ 9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
        </p>
        <div class="modal-button-box">
          <button class="btn cancle-button" @click="cancel">취소</button>
          <button
            class="btn confirm-button"
            @click="changedPasswordStep"
            :disabled="
              !verifyPasswordPattern(query.userPswd) &&
              query.userPswd !== query.confirmPswd
            "
          >
            확인
          </button>
        </div>
      </div>
    </div>
    <br />
    <!-- 재설정완료 -->
    <div class="content-body" v-if="steps === 'COMPLETE'">
      <p>
        비밀번호가 재설정 되었습니다.<br />
        변경된 비밀번호로 로그인 하세요.
      </p>
      <button class="btn confirm-button" @click="modal.closeModal()">
        확인
      </button>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
@use './scss/ChangeUserPswdPopup';
</style>
