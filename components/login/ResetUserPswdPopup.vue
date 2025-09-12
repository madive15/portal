<script setup lang="ts">
import Modal from '~/components/common/modal.vue';
import { useSearchPasswordStore } from '~/stores/login/pw';
import { useModal } from '~/composables/useModal';
import { useCustomAlert } from '~/composables/useCustomAlert';

const { showAlert } = useCustomAlert();

const route = useRoute();
const router = useRouter();
const searchPasswordStore = useSearchPasswordStore();

const modal = useModal();

const verifyPasswordPattern = (value: string) => {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)/.test(value);
};

const passwordQuery = ref({
  userId: '',
  token: '',
  userPswd: ''
});

const complete = ref(false);

onBeforeMount(() => {
  if (route.query.token) {
    searchPasswordStore
      .findSearchPasswordTokenStatus(route.query.token)
      .then(({ data }) => {
        passwordQuery.value.token = route.query.token;
        passwordQuery.value.userId = data.userId;

        modal.openModal();
      });
  }
});

const confirmPassword = ref('');

const processSearchPasswordEmailToken = () => {
  searchPasswordStore
    .processSearchPasswordEmailToken(passwordQuery.value)
    .then(() => {
      complete.value = true;
      showAlert({
        icon: 'success',
        text: '비밀번호 변경이 완료되었습니다.'
      });
      router.push({ path: '/login', query: {}, external: true });
    })
    .catch(() =>
      showAlert({
        icon: 'error',
        text: '비밀번호 변경 중 에러가 발생되었습니다.'
      })
    );
};

const cancel = () => {
  modal.closeModal();
  router.push('/', { external: true });
};
</script>

<template>
  <Modal :isVisible="modal.isVisible.value" :closeModal="modal.closeModal">
    <div class="password-reset-box">
      <div class="content-header">
        <h5>비밀번호 재설정</h5>
        <button class="btn close-button" @click="modal.closeModal()">
          <img src="/image/sub/login/popup_close.svg" alt="모달 닫기" />
        </button>
      </div>
      <div class="content-body" v-if="!complete">
        <p>새로 사용할 비밀번호를 입력해주세요.</p>
        <div class="id-box group-box">
          <strong>아이디</strong>
          <span>{{ passwordQuery.userId }}</span>
        </div>
        <div class="new-password-box group-box">
          <strong>새 비밀번호</strong>
          <input
            type="password"
            class="form-control new-password-input"
            id="newpassword"
            v-model="passwordQuery.userPswd"
          />
          <label for="newpassword" />
        </div>
        <span
          class="red-span error-span"
          v-if="!verifyPasswordPattern(passwordQuery.userPswd)"
          >비밀번호 규칙이 올바르지 않습니다.</span
        >
        <div class="new-password-confirm-box group-box">
          <strong>새 비밀번호 확인</strong>
          <input
            type="password"
            class="form-control new-password-confirm-input"
            id="newpasswordconfirm"
            v-model="confirmPassword"
          />
          <label for="newpasswordconfirm" />
        </div>
        <span
          class="red-span error-span"
          v-if="passwordQuery.userPswd !== confirmPassword"
          >비밀번호가 일치하지 않습니다.</span
        >
        <br />
        <p class="info-p">
          ※ 9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
        </p>
        <div class="modal-button-box">
          <button class="btn cancle-button" @click="modal.closeModal()">
            취소
          </button>
          <button
            class="btn confirm-button"
            @click="processSearchPasswordEmailToken"
          >
            확인
          </button>
        </div>
      </div>
    </div>
    <br />
    <!-- 재설정완료 -->
    <div class="content-body" v-if="complete">
      <p>
        비밀번호가 재설정 되었습니다.<br />
        변경된 비밀번호로 로그인 하세요.
      </p>
      <button class="btn confirm-button" @click="cancel">확인</button>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
@use './scss/ResetUserPswdPopup';
</style>
