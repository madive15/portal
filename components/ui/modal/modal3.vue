<script setup lang="ts">
const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['close']);
const handleClose = () => {
  emit('close');
};
</script>

<template>
  <a-modal
    class="common-modal-wrap modal-basic"
    :visible="visible"
    title="비밀번호 재설정"
    @ok="handleClose"
  >
    <template #footer>
      <button type="button" class="btn-basic gray" @click="handleOk">
        <span class="text">취소</span>
      </button>
      <button
        type="button"
        class="btn-basic primary"
        key="submit"
        @click="handleOk"
      >
        <span class="text">확인</span>
      </button>
    </template>
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
                <label for="userPw"
                  ><span class="sr-only">비밀번호</span></label
                >
                <a-input class="text-bx" id="userPw" />
                <span class="ins-text">
                  비밀번호 규칙이 올바르지 않습니다.
                </span>
              </div>
            </div>
          </dd>
        </dl>
        <dl class="dp-flex-item">
          <dt>새 비밀번호 확인</dt>
          <dd>
            <div class="input-outline">
              <div class="input-group__bx">
                <label for="userPw"
                  ><span class="sr-only">비밀번호</span></label
                >
                <a-input class="text-bx" id="userPw" />
                <span class="ins-text">
                  비밀번호 규칙이 올바르지 않습니다.
                </span>
              </div>
            </div>
          </dd>
        </dl>
        <p class="input-info">
          9~12자리까지 모든 문자+숫자+특수문자 : 영문대소문자 구분 ※ 사용은
          불가능한 특수문자 예 : <, > , _ , “, ‘
        </p>
      </div>
    </div>
  </a-modal>
</template>

<style scoped></style>
