<script setup lang="ts">
import { useModal } from '~/composables/useModal';
import Modal from '~/components/common/modal.vue';
import { ref } from 'vue';
import { useInqStore } from '~/stores/inq';
import { useLoginStore } from '~/stores/login';

const modal1 = useModal();
//modal1.openModal();
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true
  },
  userId: {
    type: String,
    required: true,
    default: ''
  },
  passed3m: {
    type: Boolean,
    default: false,
    required: true
  }
});

const pwdResetOk = ref(false);
const pwdResetView = ref(true);
const pwdGuideView = ref(false);

const resetTitle = ref('비밀번호 재설정');
watch(
  [() => props.open, () => props.userId, () => props.passed3m],
  ([newData1, newData2, newData3]) => {
    if ((newData1 && newData2) || newData3) {
      modal1.openModal();
    }

    if (newData3) {
      resetTitle.value = '비밀번호 변경안내';
      pwdGuideView.value = true;
      pwdResetView.value = false;
    }
  }
);

const router = useRouter();

const next = () => {
  modal1.closeModal;
  router.push('/', { external: true });
};

const cancel = () => {
  modal1.closeModal;
  router.push('/', { external: true });
};

const loginStore = useLoginStore();
const { auth, authenticated, sessionTimeout } = storeToRefs(loginStore);

const login = () => {
  modal1.closeModal;
  if (authenticated.value) {
    loginStore.logout();
  }
  router.push('/', { external: true });
};

const closeModal = () => {
  modal1.closeModal;
  if (authenticated.value) {
    loginStore.logout();
  }
  router.push('/', { external: true });
};
const now = () => {
  resetTitle.value = '비밀번호 재설정';
  pwdGuideView.value = false;
  pwdResetView.value = true;
};
// 쿼리 조회 input data
const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

// 비밀번호 재설정
// 비밀번호 값
const newPassword = ref('');
const confirmPassword = ref('');

// 비밀번호 정규식(사용불가능한 특수문자 제외, 9~12자리)
const passwordRegex = /^(?!.*[<>_"']).{9,12}$/;

// 에러 메시지
const passwordErrorMessage = ref(
  `비밀번호는 9~12자리, 숫자, 문자, 특수문자 포함, <br>불가능한 특수문자(<, >, _, “, \ ') 제외`
);

// 비밀번호 유효성 검사
const newPasswordError = computed(() => {
  if (!newPassword.value) return '비밀번호를 입력해주세요.';
  if (!passwordRegex.test(newPassword.value)) return passwordErrorMessage.value;
  return '';
});

// 비밀번호 확인 유효성 검사
const confirmPasswordError = computed(() => {
  if (!confirmPassword.value) return '비밀번호 확인을 입력해주세요.';
  if (!passwordRegex.test(confirmPassword.value))
    return passwordErrorMessage.value;
  if (confirmPassword.value != newPassword.value)
    return '비밀번호가 일치하지 않습니다.';
  return '';
});

const updatePwdByPhone = () => {
  inqRequest.value.userId = props.userId;
  inqRequest.value.userPswd = confirmPassword.value;

  useAxios()
    .post('/api/login/updatePwdByPhone', inqRequest.value)
    .then(({ data }) => {
      pwdResetView.value = false;
      pwdResetOk.value = true;
    })
    .catch((error) => {
      //console.log('비밀번호 변경 실패!');
    });
};
</script>

<template>
  <Modal
    :isVisible="modal1.isVisible.value"
    :closeModal="modal1.closeModal"
    v-if="props.open"
  >
    <!-- 비밀번호 재설정 -->
    <div class="password-reset-box">
      <div class="content-header">
        <!-- 아이디 찾기이시에는 아이디 찾기 결과 로 h5의 텍스트가 바뀌어야 합니다. -->
        <!-- 장기 미사용 해제시에는 비밀번호 변경안내로 h5의 텍스트가 바뀌어야 합니다. -->
        <h5>{{ resetTitle }}</h5>
        <button class="btn close-button" @click="closeModal">
          <img src="/image/sub/login/popup_close.svg" alt="모달 닫기" />
        </button>
      </div>
      <div class="content-body" v-show="pwdGuideView">
        <p class="info-p">
          회원님께서는 3개월 동안 비밀번호를 변경하지 않으셨습니다.<br />
          개인정보 보호를 위해 비밀번호를 변경해 주세요.
        </p>
        <div class="modal-button-box">
          <button class="btn cancle-button" @click="next">다음에하기</button>
          <button class="btn confirm-button" @click="now">지금 변경하기</button>
        </div>
      </div>
      <div class="content-body" v-show="pwdResetView">
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
            v-model="newPassword"
          />
          <label for="newpassword" />
        </div>
        <span
          class="red-span error-span"
          v-if="newPasswordError"
          v-html="newPasswordError"
        />
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
          v-if="confirmPasswordError"
          v-html="confirmPasswordError"
        />
        <br />
        <p class="info-p">
          ※ 9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
        </p>
        <div class="modal-button-box">
          <button class="btn cancle-button" @click="cancel">취소</button>
          <button class="btn confirm-button" @click="updatePwdByPhone">
            확인
          </button>
        </div>
      </div>
    </div>
    <br />
    <!-- 재설정완료 -->
    <div v-show="pwdResetOk">
      <p>
        비밀번호가 재설정 되었습니다.<br />
        변경된 비밀번호로 로그인 하세요.
      </p>
      <button class="btn confirm-button" @click="login">로그인</button>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
@use './scss/reset-pswd';
</style>
