<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';

import { useCustomAlert } from '~/composables/useCustomAlert';
import { useLoginStore } from '~/stores/login';
import { useInqStore } from '~/stores/inq';
import { computed, ref } from 'vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
const { showAlert } = useCustomAlert();

// 0. 쿼리 조회 response data (comUser)
const responseData = ref<{
  userId: string;
}>({
  userId: ''
});

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);

const userId = auth.value.memberId;
const userNm = auth.value.memberName;

// 2. 회원정보 조회(userId)
// 쿼리 조회 input data
const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

// 비밀번호 값
// const newPassword = ref('');
// const confirmPassword = ref('');

// 비밀번호 정규식(사용불가능한 특수문자 제외, 9~12자리)
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,16}$/;
//
// // 에러 메시지
// const passwordErrorMessage = ref(
//   `비밀번호는 9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분`
// );

const newPasswordRef = ref();
const confirmPasswordRef = ref();

const passwordObject = ref({
  newPassword: '',
  confirmPassword: ''
});

// 비밀번호 유효성 검사
// const newPasswordError = computed(() => {
//   if (!newPassword.value) return '비밀번호를 입력해주세요.';
//   if (!passwordRegex.test(newPassword.value)) return passwordErrorMessage.value;
//   return '';
// });

// 비밀번호 확인 유효성 검사
// const confirmPasswordError = computed(() => {
//   if (!confirmPassword.value) return '비밀번호 확인을 입력해주세요.';
//   if (!passwordRegex.test(confirmPassword.value))
//     return passwordErrorMessage.value;
//   if (confirmPassword.value != newPassword.value)
//     return '비밀번호가 일치하지 않습니다.';
//   return '';
// });

// const handleSubmit = () => {
//   if (!newPassword.value) {
//     message.error('새 비밀번호를 입력해주세요.');
//     newPasswordRef.value.focus();
//     return;
//   } else if (!confirmPassword.value) {
//     message.error('새 비밀번호 확인을 입력해주세요.');
//     confirmPasswordRef.value.focus();
//     return;
//   } else {
//     inqRequest.value.userId = userId;
//     inqRequest.value.userPswd = confirmPassword.value;
//
//     useAxios()
//       .post('/api/login/updatePwdByPhone', inqRequest.value)
//       .then(({ data }) => {
//         showAlert({
//           icon: 'success',
//           text: '비밀번호가 변경되었습니다.'
//         });
//       })
//       .catch((error) => {
//         //console.log('비밀번호 변경 실패!');
//       });
//   }
// };

// const disabled = computed(() => {
//   return !!confirmPasswordError.value;
// });
const onFinish = () => {
  inqRequest.value.userId = userId;
  inqRequest.value.userPswd = passwordObject.value.confirmPassword;

  useAxios()
    .post('/api/login/updatePwdByPhone', inqRequest.value)
    .then(({ data }) => {
      showAlert({
        icon: 'success',
        text: '비밀번호가 변경되었습니다.'
      });
    })
    .catch((error) => {
      showAlert({
        icon: 'info',
        text: '관리자에게 문의바랍니다.'
      });
    });
};
const onFinishFailed = (err) => {
  message.error(err.errorFields[0].errors);
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="비밀번호변경"
          :show-print-button="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: '비밀번호변경', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <a-form
          :model="passwordObject"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="common-form__area">
            <span class="info-text">
              ※ 9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분
            </span>
            <CommonTable>
              <caption>
                비밀번호 변경의 이름, 아이디, 새 비밀번호, 새 비밀번호 확인에
                관한 표
              </caption>
              <tbody>
                <tr>
                  <th scope="row">이름</th>
                  <td>{{ userNm }}</td>
                </tr>
                <tr>
                  <th scope="row">
                    아이디
                    <span class="red-span">*</span>
                  </th>
                  <td>{{ userId }}</td>
                </tr>

                <tr>
                  <th scope="row">
                    새 비밀번호
                    <span class="red-span"
                      >*
                      <span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <div class="item-column">
                      <a-form-item
                        name="newPassword"
                        label="새 비밀번호 확인 입력"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '비밀번호를 입력하세요'
                          },
                          {
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).{9,}/,
                            message:
                              '영문, 숫자, 특수문자를 포함해 9자 이상 입력하세요'
                          }
                        ]"
                      >
                        <a-input
                          id="password-input"
                          class="text-bx"
                          type="password"
                          maxlength="16"
                          v-model:value="passwordObject.newPassword"
                          ref="newPasswordRef"
                        />
                      </a-form-item>
                      <!--                      <span-->
                      <!--                        class="password-error-span"-->
                      <!--                        v-if="newPasswordError"-->
                      <!--                        v-html="newPasswordError"-->
                      <!--                      />-->
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    새 비밀번호 확인
                    <span class="red-span"
                      >*
                      <span class="sr-only">필수 입력 항목</span>
                    </span>
                  </th>
                  <td>
                    <a-form-item
                      name="confirmPassword"
                      label="비밀번호"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          required: true,
                          message: '비밀번호 규칙이 올바르지 않습니다.'
                        },
                        {
                          validator: (_, value, callback) => {
                            if (value !== passwordObject.newPassword) {
                              callback('비밀번호가 일치하지 않습니다.');
                            }
                            callback();
                          }
                        }
                      ]"
                    >
                      <a-input
                        id="password-confirm-input"
                        type="password"
                        class="text-bx"
                        maxlength="16"
                        v-model:value="passwordObject.confirmPassword"
                        ref="confirmPasswordRef"
                      />
                    </a-form-item>
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
          <CommonButtonGroup align="center"
            ><CommonButton
              variants="primary"
              title="확인"
              width="sm"
              type="submit"
            >
              확인
            </CommonButton>
          </CommonButtonGroup>
        </a-form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/pswd/index.scss';
</style>
