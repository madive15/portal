<script setup lang="ts">
import { ref } from 'vue';
import CommonTitle from '~/components/ui/title/title.vue';

// 부모로부터 열림/닫힘 상태를 props로 받음
const modalRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  isVisible: boolean;
}>();

// 부모에게 닫힘 이벤트를 emit
const emit = defineEmits<{ 'update:isVisible': (value: boolean) => void }>();

function closePopup() {
  emit('update:isVisible', false);
}

defineExpose({
  modalRef
});
</script>

<template>
  <!-- 레이어 팝업 -->
  <div class="ai-layer-popup" ref="modalRef" v-if="isVisible">
    <div class="layer-content">
      <div class="ai-layer-header">
        <CommonTitle tag="h3" size="1" class="ai-header-txt"
          >AI 검색 이용가이드</CommonTitle
        >
      </div>
      <div class="layer-content-inner pc-only">
        <img
          src="~/assets/image/main/ai_popup.png"
          alt="ai 이용방법"
          class="img"
        />
        <div class="sr-only">
          <ul>
            <li>1. 법률구조 플랫폼은 어떤 서비스를 제공하나요?</li>
            <li>
              2. 법률구조 플랫폼은 다음과 같은 주요 서비스를 제공합니다.
              <ul>
                <li>
                  법률구조서비스: 국민의 법적 수요를 분석하여 적합한 법률구조
                  서비스 정보를 제공하고, 법률상담, 법률구조신청 등의 과정을
                  지원합니다. 이는 One-Stop으로 진행·결과 확인까지 지원합니다.
                  첫 번째 단계에서는 생성형 AI를 통해 법률정보를 제공하고,
                  추가적인 지원이나 사건 접수가 필요한 경우 연계된
                  법률구조기관의 다양한 상담 및 접수 방법을 통해 맞춤형
                  법률구조서비스를 제공합니다.
                </li>
                <li>
                  맞춤형 법률정보 및 법률서비스: 생성형 AI를 활용하여 국민의
                  다양한 법률 요구에 맞춘 법령, 판례, 서식, 사례 등의 맞춤형
                  법률정보를 제공합니다. 국민이 특정 법률 문제에 대해 서술형으로
                  문의하면 관련 정보를 정확하게 제공하며, 법률상담, 소송구조,
                  조정, 피해구제 등 다양한 법률서비스에 대한 정보도 제공합니다.
                </li>
                <li>
                  참여기관 연계서비스: 정부부처 및 공공기관 등 참여기관과
                  협력하여 법률서비스를 통합적으로 연계합니다. 사건이
                  법률구조기관의 지원이 필요한 경우 플랫폼을 통해 효율적으로
                  연계하고, 결과를 상호 공유하여 국민에게 편리함을 제공합니다.
                </li>
              </ul>
            </li>
            <li>
              3. 참고자료
              <ul>
                <li>법률구조플랫폼 플랫폼 제공...</li>
                <li>법률구조플랫폼 플랫폼 개요</li>
                <li>법률구조플랫폼 추진사항</li>
                <li>대한법률구조공단...</li>
              </ul>
            </li>
            <li>4. 좋아요, 싫어요, 복사 버튼</li>
            <li>
              5. 추천 질문
              <ul>
                <li>법률 구조 대상자는 누구인가요?</li>
                <li>법률구조 플랫폼은 어떤 서비스를 제공하나요?</li>
                <li>법률상담 및 소송지원 받을 수 있는 곳을 알려줘</li>
              </ul>
            </li>
            <li>6. 대화 기록 전체삭제 버튼</li>
            <li>7. 대한법률구조공단 삭제, 저작권 등록 삭제</li>
            <li>8. 검색창</li>
            <li>9. 신규 질문 시 누르는 버튼</li>
          </ul>
        </div>
        <div class="layer-content-right">
          <div class="right-inner">
            <ul>
              <li>
                <span class="num-circle color-orange"> 1 </span>
                <div class="right-txt">
                  사용자가 <span class="text-orange">질문한 내용</span>이
                  표출됩니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 2 </span>
                <div class="right-txt">
                  사용자가 질문한 내용을 기반으로
                  <span class="text-orange">AI 답변을 생성</span> 합니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 3 </span>
                <div class="right-txt">
                  참고자료는
                  <span class="text-orange">질문의 세부내용</span>으로 클릭 시
                  새 창으로 보여집니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 4 </span>
                <div class="right-txt">
                  만족도 조사 : 좋아요/ 싫어요 / 복사
                  <span class="text-orange">답변 피드백 평가</span>입니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 5 </span>
                <div class="right-txt">
                  기존 질문과 연관성있는 추천 질문 또는 기본 질문이 표시됩니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 6 </span>
                <div class="right-txt">
                  전체 삭제는
                  <span class="text-orange">대화 기록 전체 목록</span>을
                  식제합니다.
                </div>
              </li>
              <li>
                <span class="num-circle color-orange"> 7 </span>
                <div class="right-txt">
                  로그인 회원은
                  <span class="text-orange"
                    >90일 동안의 AI 검색 대화 기록 조회가 가능합니다.</span
                  >
                  <p>(비회원 로그인 시에는 제공되지 않습니다.)</p>
                </div>
              </li>
              <li>
                <span class="num-circle color-blue"> 8 </span>
                <div class="right-txt">
                  질문은 구체적으로 작성해 주세요.
                  <p>
                    멀티턴 : 추가 질문은 기존 질몬의 연관된 답변을 생성합니다.)
                  </p>
                </div>
              </li>
              <li>
                <span class="num-circle color-blue"> 9 </span>
                <div class="right-txt">
                  새 대화는 기존 질문과
                  <span class="text-blue">다른 신규 질문</span>을 할 경우
                  클릭하세요.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="layer-content-inner mo-only">
        <img src="~/assets/image/main/mo_search_guide.png" alt="ai 이용방법" />
        <div class="sr-only">
          <ul>
            <li>
              <p>1. 사용자가 질문한 내용이 표시됩니다.</p>
              <p>무료법률상담이 가능한 기관을 알려줘</p>
            </li>
            <li>
              <p>2. 사용자가 질문한 내용을 기반으로 AI 답변을 생성합니다.</p>
              <p>
                무료법률상담이 가능한 기관은 다음과 같습니다: 1.
                대한법률구조공단 - 챗봇상담: 법률상담 사례, 법률서식에 대한
                정보, 가까운 공단 위치 안내 등을 제공하며, 웹사이트를 통해 이용
                가능
              </p>
            </li>
            <li>
              3. 참고자료는 질문의 세부내용으로 클릭 시 새창으로 보여집니다.
            </li>
            <li>
              4. 만족도 조사 : 좋아요 / 싫어요 / 복사 답변 피드백 평가입니다.
            </li>
            <li>
              5. 기존 질문과 연관성 있는 추천 질문 또는 기본 질문이 표시됩니다.
              <ul>
                <li>추천 질문</li>
                <li>무료 법률상담이 가능한 기관을 알려줘</li>
                <li>대한법률구조공단의 무료 법률상담을 자세하게 알려줘</li>
              </ul>
            </li>
            <li>6. 대화기록을 열면 전체 목록을 삭제할 수 있습니다.</li>
            <li>
              7. 질문은 구체적으로 작성해 주세요. 멀티턴: 추가 질문은 기존
              질문의 연관된 답변을 생성합니다.
            </li>
            <li>
              8. 새 대화는 기존 질문과 다른 신규 질문을 할 경우 클릭하세요.
            </li>
          </ul>
        </div>
      </div>
      <!--      <img src="~/assets/image/main/main_ai_information.png" alt="ai 이용방법" />-->
      <!--      <div class="layer-apply-box">
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

      </div>-->
      <button class="ai-layer-close" @click="closePopup">
        <span class="sr-only">닫기</span>
      </button>
    </div>
  </div>
  <div class="ai-layer-popup-dim" v-if="isVisible" aria-hidden="true"></div>
</template>

<style scoped lang="scss">
@use './scss/MainlayerPopup';
</style>
