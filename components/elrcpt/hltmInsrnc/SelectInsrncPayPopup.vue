<script setup lang="ts">
/*
 * 화면명 : 전자접수신청
 * 화면ID : LASP_ELE_006
 * 파일명 : SelectInsrncPayPopup
 * 작성자 : 이동규
 * 화면 설명 : 전자접수안내 및 전자접수 이용절차 설명화면
 * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 * 변경일          변경자       변경내역
 * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 * 2025.08.21     이동규       최초생성
 */

import { ref } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'pub2nd'
});

const residentRegNum1 = ref('');
const residentRegNum2 = ref('');

const open = defineModel('open');
const emit = defineEmits(['insrncPayInfoList']);

const modalRef = ref<InstanceType<typeof CommonModal>>();
const errorMessageRender = ref(false);

onMounted(() => {});

const selectInsrncPay = async () => {
  const validateResult = validate();
  if (validateResult) {
    await useAxios()
      .post('/api/insrnc/pay/selectInsrncPayInfoList', {
        jumin_no: residentRegNum1.value + '' + residentRegNum2.value
      })
      .then((res) => {
        if (res) {
          // 결과 반환
          emit('insrncPayInfoList', res.data);
          closePopup();
        }
      });
  } else {
    errorMessageRender.value = true;
  }
};

const closePopup = () => {
  open.value = false;
  reset();
};

const form = reactive({
  rrno: ''
});

const validate = () => {
  debugger;
  if (residentRegNum1.value.length != 6) {
    errorMessage.value = '주민등록번호 형식이 올바르지 않습니다.';
    return false;
  }
  if (residentRegNum2.value.length != 7) {
    errorMessage.value = `주민등록번호 형식이 올바르지 않습니다.`;
    return false;
  }
  const rrno = residentRegNum1.value + '' + residentRegNum2.value;

  const s = rrno.replace(/-/g, '');
  if (!/^\d{13}$/.test(s)) {
    errorMessage.value = `주민등록번호 형식이 올바르지 않습니다.`;
    return false;
  }
  // 생년월일/성별코드
  const yy = Number(s.slice(0, 2));
  const mm = Number(s.slice(2, 4));
  const dd = Number(s.slice(4, 6));
  const g = Number(s[6]);

  // 성별코드 유효성(내/외국인 코드까지 허용: 1~8)
  if (![1, 2, 3, 4, 5, 6, 7, 8].includes(g)) {
    errorMessage.value = `주민등록번호 형식이 올바르지 않습니다.`;
    return false;
  }

  // 세기 결정
  const century = [1, 2, 5, 6].includes(g)
    ? 1900
    : [3, 4, 7, 8].includes(g)
      ? 2000
      : null;
  if (century === null) {
    errorMessage.value = `주민등록번호 형식이 올바르지 않습니다.`;
    return false;
  }

  const year = century + yy;

  // 날짜 유효성 체크(윤년 포함)
  const date = new Date(year, mm - 1, dd);
  const validDate =
    date.getFullYear() === year &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd;
  if (!validDate) {
    errorMessage.value = `주민등록번호의 생년월일이 유효하지 않습니다.`;
    return false;
  }

  // 2020-10-05 이후 출생자는 체크섬 없음 → 건너뜀
  const skipChecksum =
    year > 2020 || (year === 2020 && (mm > 10 || (mm === 10 && dd >= 5)));

  if (skipChecksum) {
    return true;
  }
  // (구) 체크섬 검증: (11 - (∑(d1..d12 * w) % 11)) % 10 === d13
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  const sum = weights.reduce((acc, w, i) => acc + Number(s[i]) * w, 0);
  const check = (11 - (sum % 11)) % 10;

  if (check === Number(s[12])) {
    return true;
  } else {
    errorMessage.value = `주민등록번호가 유효하지 않습니다.`;
    return false;
  }
};

const errorMessage = ref('');

const reset = () => {
  residentRegNum1.value = '';
  residentRegNum2.value = '';
  errorMessage.value = '';
};
watch(residentRegNum1, (newValue) => {
  if (newValue) {
    residentRegNum1.value = newValue.replace(/[^0-9]/g, '');
  }
});
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal
      ref="modalRef"
      title="건강보험 납입조회"
      :open="open"
      @cancel="closePopup"
      :width="720"
      :full="true"
    >
      <div class="body-cont-wrap">
        <div class="form-area">
          <div class="form-box">
            <div class="form-item">
              <span class="label-txt">주민등록번호</span>
              <div class="inner">
                <common-number-input
                  id="ipText"
                  class="text-bx"
                  title="주민등록번호 앞자리 입력"
                  v-model:value="residentRegNum1"
                  maxlength="6"
                />
                <span aria-hidden="true">-</span>

                <a-input-password
                  id="ipText2"
                  class="text-bx"
                  title="주민등록번호 뒷자리 입력"
                  v-model:value="residentRegNum2"
                  type="number"
                >
                  <template #iconRender="v">
                    <button
                      :title="
                        v
                          ? '주민등록번호 뒷자리 보기'
                          : '주민등록번호 뒷자리 숨기기'
                      "
                    >
                      <eye-two-tone v-if="v" />
                      <eye-invisible-outlined v-else />
                    </button>
                  </template>
                </a-input-password>
              </div>
              <span style="color: #ff4d4f" v-if="errorMessageRender">
                {{ errorMessage }}
              </span>
            </div>
          </div>
          <div
            class="button-box"
            style="display: flex; justify-content: flex-end"
          >
            <CommonButton
              variants="primary"
              width="xs"
              height="md"
              @click="selectInsrncPay"
            >
              조회
            </CommonButton>
            <CommonButton
              variants="line-blue"
              width="xs"
              height="md"
              @click="closePopup"
            >
              닫기
            </CommonButton>
          </div>
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use '../../../assets/style/pages/elrcpt/hltmInsrnc/SelectInsrncPayPopup';
</style>
