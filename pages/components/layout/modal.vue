<script setup lang="ts">
import CommonModal from '~/components/ui/modal/modal.vue';
import { ref } from 'vue';
import ModalInnerForm from '~/components/ui/modal/modalInnerForm.vue';
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'guide'
});
const modalRef = ref<boolean>(false);
const modalRef2 = ref<boolean>(false);
const modalRef3 = ref<InstanceType<typeof InnerForm> | null>(null);
const modalRef4 = ref<boolean>(false);
const modalRef5 = ref<boolean>(false);
const modalRef6 = ref<boolean>(false);
const modalRef7 = ref<boolean>(false);
const showModal = () => {
  modalRef.value?.open();
};
const showModal2 = () => {
  modalRef2.value?.open();
};
const showModal3 = () => {
  modalRef3.value?.open();
};
const showModal4 = () => {
  modalRef4.value?.open();
};
const showModal5 = () => {
  modalRef5.value?.open();
};
const showModal6 = () => {
  modalRef6.value?.open();
};
const showModal7 = () => {
  modalRef7.value?.open();
};
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Modal</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • modal 옵션<br />
        1. <strong>title</strong> - (헤더 타이틀 title="타이틀 내용")<br />
        2. <strong>:width</strong> - (모달 가로창사이즈 :width="600")<br />
        3. <strong>type</strong> - (모달 해더 색상 type="bgNone") primary,
        record, bgNone<br />
        4. <strong>:full="true"</strong> - (모바일에서 컨텐츠 화면 :full="true")
        full size 일때<br />
        5. <strong>:hFull="true"</strong> 컨텐츠 내용 화면 height 가 full size
        일때
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <a-space :size="[8, 8]" wrap>
          <button type="button" class="btn-basic primary" @click="showModal">
            <span class="text">모바일 full size</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal7">
            <span class="text">height full size</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal2">
            <span class="text">아이디 찾기 결과</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal3">
            <span class="text">비밀번호 재설정</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal4">
            <span class="text">모달 컴포넌트 primary</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal5">
            <span class="text">모달 컴포넌트 record</span>
          </button>
          <button type="button" class="btn-basic primary" @click="showModal6">
            <span class="text">모달 컴포넌트 bgNone</span>
          </button>
        </a-space>
        <CommonModal
          ref="modalRef"
          title="모달 타이틀 모바일에서 full size 일때"
          :full="true"
        >
          <div>
            대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나
            결정이 필요하거나 여러 작업을 포함할 수 있습니다.
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
          <template #footer>
            <CommonButton
              class="gray"
              width="md"
              height="md"
              @click="modalRef?.close()"
            >
              취소
            </CommonButton>
            <CommonButton
              class="primary"
              width="md"
              height="md"
              type="submit"
              @click="open?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>

        <CommonModal
          ref="modalRef7"
          title="모달 타이틀  height full size 일때"
          :hFull="true"
        >
          <div>
            대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나
            결정이 필요하거나 여러 작업을 포함할 수 있습니다.
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
          <template #footer>
            <CommonButton
              variants="gray"
              width="md"
              height="md"
              @click="modalRef7?.close()"
            >
              취소
            </CommonButton>
            <CommonButton
              variants="primary"
              width="md"
              height="md"
              type="submit"
              @click="open?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>

        <CommonModal ref="modalRef2" title="아이디 찾기 결과22">
          <div>
            <p class="text-msg">회원님의 아이디 정보 입니다.</p>
            <div class="user-info__result">
              <dl>
                <dt>아이디</dt>
                <dd>hong1988</dd>
              </dl>
              <div class="info-text">
                회원가입을 진심으로 축하드립니다. 법률구조플랫폼에서 제공하는
                회원서비스를 자유롭게 이용하실 수 있습니다.
              </div>
            </div>
          </div>
          <template #footer>
            <CommonButton
              class="primary"
              width="md"
              height="md"
              @click="modalRef2?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <!-- 비밀번호 재설정 레이아웃 컴포넌트는 <CommonModal>만 해당-->
        <ModalInnerForm ref="modalRef3" />
        <CommonModal
          ref="modalRef4"
          :width="800"
          title="대화기록"
          type="primary"
        >
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              class="primary"
              width="md"
              height="md"
              @click="modalRef4?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <CommonModal ref="modalRef5" type="record">
          <template #title>
            <h2 class="main-title">비밀번호 재설정</h2>
            <span class="sub-title"
              >영문+숫자+특수문자 조합으로 입력해 주세요</span
            >
          </template>
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              class="primary"
              width="md"
              height="md"
              @click="modalRef5?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
        <CommonModal
          ref="modalRef6"
          type="bgNone"
          title="주소 검색"
          :width="320"
        >
          <p>여기에 내용이 들어갑니다.</p>
          <template #footer>
            <CommonButton
              class="primary"
              width="md"
              height="md"
              @click="modalRef6?.close()"
            >
              확인
            </CommonButton>
          </template>
        </CommonModal>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CommonModal
            ref="modalRef"
            title="모달 타이틀 모바일에서 full size 일때"
            :full="true"
        >
          &lt;div>
            대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나
            결정이 필요하거나 여러 작업을 포함할 수 있습니다.
            &lt;p>Some contents...&lt;/p>
            &lt;p>Some contents...&lt;/p>
            &lt;p>Some contents...&lt;/p>
          &lt;/div>
          &lt;template #footer>
            &lt;CommonButton
                class="gray"
                width="md"
                height="md"
                @click="modalRef?.close()"
            >
              취소
            &lt;/CommonButton>
            &lt;CommonButton
                class="primary"
                width="md"
                height="md"
                type="submit"
                @click="modalRef?.close()"
            >
              확인
            &lt;/CommonButton>
          &lt;/template>
        &lt;/CommonModal>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
