<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
import { useInqStore } from '~/stores/inq';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { computed } from 'vue';
import CommonButton from '~/components/ui/button/button.vue';
const { showAlert } = useCustomAlert();

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);

const userId = auth.value.memberId;

// 2. 쿼리 조회 input data
const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

const disabled = computed(() => {
  return inqRequest.value.userPswd.length < 9;
});

// 확인
const router = useRouter();

const pwCheckRef = ref();

const confirm = async () => {
  if (!inqRequest.value.userPswd) {
    message.error('비밀번호를 입력해주세요.');
    pwCheckRef.value.focus();
    return;
  } else {
    inqRequest.value.userId = userId;
    await useAxios()
      .post('/api/my/info/verify', inqRequest.value)
      .then(() => {
        router.push('/my/pswd', { external: true });
      })
      .catch((error) => {
        if (error.status === 400) {
          showAlert({
            icon: 'error',
            text: '비밀번호가 틀렸습니다. 다시 입력해주세요.'
          });
          return;
        } else if (error.status === 401) {
          showAlert({
            icon: 'error',
            html: '비밀번호가 5회 이상 실패하였습니다.<br />다시 로그인 해주시기 바랍니다.'
          });

          loginStore.logout();

          router.push('/login', { external: true });
          return;
        }

        showAlert({
          icon: 'error',
          text: '서버에서 오류가 발생되었습니다. 다시 시도해주시기 바랍니다.'
        });
      });
  }
};

onBeforeMount(() => {
  inqStore.resetJoinRequest();
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="비밀번호확인"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: '비밀번호변경' },
            { text: '비밀번호확인', active: true }
          ]"
        />
        <my-tab />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="reset-box">
          <div class="form-box">
            <div class="img-box">
              <img src="/image/sub/mypage/password.svg" alt="" />
            </div>
            <p>
              <strong>{{ auth.memberName }}</strong
              >님의 정보를 안전하게 보호하기 위해<br />
              비밀번호를 다시 한번 확인 합니다.
            </p>
            <div class="password-box">
              <div class="id-box group-box">
                <strong>아이디</strong>
                <span>{{ userId }}</span>
              </div>
              <div class="password-reset-box group-box">
                <label for="passwordreset">비밀번호</label>
                <a-input
                  id="passwordreset"
                  type="password"
                  class="content"
                  placeholder="비밀번호를 입력해 주세요"
                  v-model:value="inqRequest.userPswd"
                  ref="pwCheckRef"
                />
              </div>
            </div>
            <div class="submit-box">
              <CommonButton
                title="확인"
                variants="primary"
                width="sm"
                @click="confirm"
              >
                확인
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/pswd/check/index.scss';
</style>
