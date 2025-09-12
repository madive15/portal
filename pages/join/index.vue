<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useJoinStore } from '~/stores/join';
import type { MbrTypeCd } from '~/stores/join/index.types';
import { storeToRefs } from 'pinia';
import { useModal } from '~/composables/useModal';
import { useModalFocus } from '~/composables/useModalFocus';
import Modal from '~/components/common/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
const modal1 = useModal();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();

const router = useRouter();
const joinStore = useJoinStore();
const { joinRequest } = storeToRefs(joinStore);

onMounted(() => {
  joinStore.resetJoinRequest();
});

const updateMbrTypeCd = (mbrTypeCd: MbrTypeCd) => {
  joinRequest.value.mbrTypeCd = mbrTypeCd;

  if (mbrTypeCd === 'U02') {
    joinRequest.value.certTypeCd = '001';
  } else {
    joinRequest.value.certTypeCd = '003';
  }

  router.push('/join/agreement', { external: true });
};

// 새로 추가: 재외국민 클릭 시 모달 열기
function openForeignerModal() {
  modal1.openModal();
  createModalFocus();
}

// 모달 '확인' 버튼 클릭 시
function handleForeignerConfirm() {
  modal1.closeModal();
  removeModalFocus();
  updateMbrTypeCd('O01'); // 실제 다음화면 이동
}
</script>

<template>
  <div class="sub-content-box" id="sub-join-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="회원가입"
          :breadcrumbItems="[{ text: '회원가입', active: true }]"
        />
        <div class="step-box">
          <ol class="row row-cols-5">
            <li class="col-xl col-12 step1">
              <div class="step-text-box active">
                <strong>01.</strong>
                <span>회원유형<span class="sr-only">(현재단계)</span></span>
              </div>
            </li>

            <li class="col-xl col-12 step2">
              <div class="step-text-box">
                <strong>02.</strong>
                <span>약관동의</span>
              </div>
            </li>

            <li class="col-xl col-12 step3">
              <div class="step-text-box">
                <strong>03.</strong>
                <span>본인확인</span>
              </div>
            </li>

            <li class="col-xl col-12 step4">
              <div class="step-text-box">
                <strong>04.</strong>
                <span>정보입력</span>
              </div>
            </li>

            <li class="col-xl col-12 step5">
              <div class="step-text-box">
                <strong>05.</strong>
                <span>가입완료</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">회원유형</CommonTitle>
        <p>가입하실 회원유형을 선택해 주세요</p>
        <div class="select-join-box">
          <div class="row">
            <div class="col-xl-4 col-12 select-col">
              <div class="info-box">
                <button
                  title="개인(만 14세 미만 포함)"
                  type="button"
                  @click="() => updateMbrTypeCd('U02')"
                >
                  <div class="img-box">
                    <img src="/image/sub/join/member01.svg" alt="" />
                  </div>
                  <div class="text-box">
                    <strong>개인</strong>
                    <span>(만 14세 미만 포함)</span>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-xl-4 col-12 select-col">
              <div class="info-box">
                <button
                  type="button"
                  @click="openForeignerModal"
                  ref="returnFocusRef"
                  title="재외국민(해외거주)"
                >
                  <div class="img-box">
                    <img src="/image/sub/join/member02.svg" alt="" />
                  </div>
                  <div class="text-box">
                    <strong>재외국민</strong>
                    <span>(해외거주)</span>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-xl-4 col-12 select-col">
              <div class="info-box">
                <button
                  type="button"
                  title="외국인(국내거주)"
                  @click="() => updateMbrTypeCd('F01')"
                >
                  <div class="img-box">
                    <img src="/image/sub/join/member03.svg" alt="" />
                  </div>
                  <div class="text-box">
                    <strong>외국인</strong>
                    <span>(국내거주)</span>
                  </div>
                </button>
              </div>
            </div>
            <a-modal
              class="common-modal-wrap modal-basic"
              v-model:open="modal1.isVisible.value"
              :closable="false"
              :width="400"
            >
              <template #footer>
                <CommonButton
                  variants="primary"
                  key="submit"
                  @click="handleForeignerConfirm"
                  width="xl"
                  title="확인"
                  >확인</CommonButton
                >
              </template>
              <div>
                <CommonTitle tag="h3" size="2" class="common-title__sub-sm"
                  >재외국민 주민등록 제도</CommonTitle
                >
                <br />
                <p>
                  “재외국민 주민등록 제도"에 따라 주민등록을 하신 후<br />
                  내국인으로 사용자 등록을 하시기 바랍니다.
                </p>
                <br />
                <a-flex justify="space-between">
                  <CommonTitle tag="h5" size="3"
                    >“재외국민 주민등록 제도"</CommonTitle
                  >

                  <CommonButton title="보기" height="sm">
                    <NuxtLink
                      :to="'https://www.mois.go.kr/frt/sub/a06/b06/foreignIDCard/screen.do'"
                      target="_blank"
                      title="새 창 열림"
                    >
                      보기
                    </NuxtLink>
                  </CommonButton>
                </a-flex>
              </div>
            </a-modal>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/join/index.scss';
</style>
