<script setup lang="ts">
import { reactive, type UnwrapRef } from 'vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
const visible = ref(false);
const open = () => (visible.value = true);
const close = () => (visible.value = false);

defineExpose({ open, close });

interface FormData {
  userPw: string;
  pwConf: string;
}
const formData: UnwrapRef<FormData> = reactive({
  userPw: '',
  pwConf: ''
});

const handleCancel = () => {
  visible.value = false;
};
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <CommonModal v-model:visible="visible" title="비밀번호 재설정">
    <a-form
      :model="formData"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      name="basic"
    >
      <div>
        <p class="text-msg">새로 사용할 비밀번호를 입력해주세요.</p>

        <div class="common-form__area">
          <dl class="dp-flex-item">
            <dt>아이디</dt>
            <dd><span class="form-text">hong1988</span></dd>
          </dl>
          <dl class="dp-flex-item">
            <dt>새 비밀번호</dt>
            <dd>
              <div class="input-outline">
                <div class="input-group__bx">
                  <a-form-item
                    name="userPw"
                    label="비밀번호"
                    :labelCol="{ class: 'sr-only' }"
                    :rules="[
                      {
                        required: true,
                        message: '비밀번호 규칙이 올바르지 않습니다.'
                      }
                    ]"
                  >
                    <a-input class="text-bx" v-model:value="formData.userPw" />
                  </a-form-item>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="dp-flex-item">
            <dt>새 비밀번호 확인</dt>
            <dd>
              <div class="input-outline">
                <div class="input-group__bx">
                  <a-form-item
                    name="pwConf"
                    label="비밀번호"
                    :labelCol="{ class: 'sr-only' }"
                    :rules="[
                      {
                        required: true,
                        message: '비밀번호 규칙이 올바르지 않습니다.'
                      }
                    ]"
                  >
                    <a-input class="text-bx" v-model:value="formData.pwConf" />
                  </a-form-item>
                </div>
              </div>
            </dd>
          </dl>
          <p class="input-info">
            9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분 ※ 사용은
            불가능한 특수문자 예 : <, > , _ , “, ‘
          </p>
        </div>
        <ButtonGroup align="center">
          <CommonButton class="gray" width="sm" @click="handleCancel">
            취소
          </CommonButton>
          <CommonButton
            class="primary"
            type="submit"
            width="sm"
            html-type="submit"
          >
            확인
          </CommonButton>
        </ButtonGroup>
      </div>
    </a-form>
  </CommonModal>
</template>

<style scoped></style>
