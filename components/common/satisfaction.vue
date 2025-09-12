<script setup lang="ts">
import { ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import type { SatisfactionType } from '~/types/satisfaction';
import { useMenuStore } from '~/stores/common/menu';
import CommonButton from '~/components/ui/button/button.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';

const router = useRouter();
const route = useRoute();

const satisfaction = ref<SatisfactionType>({
  menuId: '',
  satisScore: 0,
  satisOpinion: '',
  frstRgtrId: '',
  frstRegDt: ''
});

const { showAlert } = useCustomAlert();
const menuStore = useMenuStore();
const { satisfactionInfo } = storeToRefs(menuStore);

const isShow = computed(() => satisfactionInfo.value.menuUseSatisfaction);

const handleSubmit = () => {
  if (
    !satisfaction.value.satisScore &&
    satisfaction.value.satisOpinion.trim() === ''
  ) {
    // 경고 알림 표시
    showAlert({
      icon: 'warning',
      title: '평가를 완료해 주세요.',
      text: '점수 또는 의견을 입력해 주세요.'
    });
    reset();
    return;
  }
  satisfaction.value.menuId = satisfactionInfo.value.menuId;

  useAxios()
    .post('/api/satisfaction', satisfaction.value)
    .then(() => {
      showAlert({
        icon: 'success',
        title: '평가해 주셔서 감사합니다.'
      });

      reset();
    });
};

onBeforeRouteLeave(() => {
  reset();
});

const reset = () => {
  satisfaction.value = {
    menuId: '',
    satisScore: 0,
    satisOpinion: '',
    frstRgtrId: '',
    frstRegDt: ''
  };
};
</script>

<template>
  <div class="satisfaction-bx__wrap" v-show="isShow">
    <div class="sf-header">
      <div class="tit-text">
        <strong>제공되는 정보에 만족하십니까?</strong>
      </div>
      <div class="point-select">
        <a-radio-group
          name="point"
          title="point-radio"
          :id="satisfaction.satisScore"
          v-model:value="satisfaction.satisScore"
        >
          <a-radio class="radio-bx" value="1">1점</a-radio>
          <a-radio class="radio-bx" value="2">2점</a-radio>
          <a-radio class="radio-bx" value="3">3점</a-radio>
          <a-radio class="radio-bx" value="4">4점</a-radio>
          <a-radio class="radio-bx" value="5">5점</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="sf-body">
      <label class="tit-text" for="opinion">
        <strong>의견</strong>
      </label>
      <div class="form-text">
        <a-input
          id="opinion"
          class="text-bx"
          title="opinion-inputs"
          type="text"
          v-model:value="satisfaction.satisOpinion"
        />
        <CommonButton variants="primary" @click="handleSubmit">
          <span class="text">평가하기</span>
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './scss/satisfaction';
</style>
