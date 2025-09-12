<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';

const showPopup = ref(false);

onMounted(() => {
  const isFirstVisit = !sessionStorage.getItem('aivisited');
  if (isFirstVisit) {
    showPopup.value = true;
    sessionStorage.setItem('aivisited', 'true');
  }
});

const closePopupOnCheck = (e: Event) => {
  const checkbox = e.target as HTMLInputElement;

  if (checkbox.checked) {
    showPopup.value = false;
  }
};
</script>

<template>
  <!-- 레이어 팝업 -->
  <use-focus-trap v-if="showPopup">
    <div class="bg-box" tabindex="-1"></div>
    <div class="ai-layer-popup" tabindex="0">
      <div class="layer-content">
        <h2>법률구조 서비스 플랫폼 생성형 AI 사용안내</h2>
        <div class="box">
          <ul>
            <li>
              1. 플랫폼 생성형 AI는 <strong>법률상담을 제공하지 않으며</strong>,
              사용자가 입력한 정보를 바탕으로 플랫폼 자체데이터에 기반하여
              <strong
                >법률지원서비스와 관련된 사항에 대해 답변을 생성합니다</strong
              >
              (RAG 방식)
            </li>
            <li>
              2. 플랫폼 생성형 AI는 언어모델의 기술적 특징 등으로 인해
              <strong
                >답변이 부정확하거나 오류가 있을 수 있으며, 이는 법무부 및
                대한법률구조공단의 입장을 대변하지 않습니다.</strong
              >
            </li>
            <li>
              3. 플랫폼 생성형 AI는
              <strong
                >욕설이나 불법적인 내용에 대해서는 답변을 제공하지 않으며, 해당
                질의가 반복될 경우 사용이 제한</strong
              >될 수 있습니다.
            </li>
          </ul>
        </div>
        <div class="layer-apply-box">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="layer-check"
              @change="closePopupOnCheck"
            />
            <label class="form-check-label" for="layer-check">
              확인 및 닫기
            </label>
          </div>
        </div>
      </div>
    </div>
  </use-focus-trap>
</template>

<style scoped lang="scss">
@use './scss/layerPopup';
</style>
