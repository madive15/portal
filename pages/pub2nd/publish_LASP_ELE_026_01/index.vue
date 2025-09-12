<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';

definePageMeta({
  layout: 'pub2nd'
});

const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
const radioSelected = ref('');
const radioSelected2 = ref('');
const radioSelected3 = ref('');
const radioSelected4 = ref('');
const checkSelected = ref<string[]>([]);
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">만족도 설문조사 Modal 확인하기</span>
    </button>
    <CommonModal
      ref="modalRef"
      title="만족도 설문조사"
      :width="1100"
      :full="true"
    >
      <div class="body-cont-wrap">
        <div class="common-form__area survey-type">
          <table>
            <caption>
              만족도 설문조사
            </caption>
            <tbody>
              <tr>
                <th class="color-th" scope="row">문항</th>
                <td>1. 시스템의 메뉴가 명확하게 구분되어 있는가?</td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="시스템의 메뉴가 명확하게 구분되어 있는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-radio-group v-model:value="radioSelected">
                      <a-radio class="radio-bx" value="5">매우 만족함</a-radio>
                      <a-radio class="radio-bx" value="4">다소 만족함</a-radio>
                      <a-radio class="radio-bx" value="3">만족함</a-radio>
                      <a-radio class="radio-bx" value="2"
                        >다소 불만족함</a-radio
                      >
                      <a-radio class="radio-bx" value="1"
                        >매우 불만족함</a-radio
                      >
                    </a-radio-group>
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>
                  2. 디자인 구성요소(아이콘, 색상, 글꼴 등)가 적절히 배치되어
                  보기에 편리한가?
                </td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="디자인 구성요소(아이콘, 색상, 글꼴 등)가 적절히 배치되어
                  보기에 편리한가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-radio-group v-model:value="radioSelected2">
                      <a-radio class="radio-bx" value="5">5점</a-radio>
                      <a-radio class="radio-bx" value="4">4점</a-radio>
                      <a-radio class="radio-bx" value="3">3점</a-radio>
                      <a-radio class="radio-bx" value="2">2점</a-radio>
                      <a-radio class="radio-bx" value="1">1점</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>3. 시스템의 응답속도는 만족할 수준이라고 생각하십니까?</td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="시스템의 응답속도는 만족할 수준이라고 생각하십니까?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-textarea
                      class="textarea-bx"
                      placeholder="의견을 입력해 주세요"
                      :maxlength="200"
                    />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>
                  4. 사용자에게 작업에 대한 진행, 완료 예정시간 등을 알려주는가?
                </td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="사용자에게 작업에 대한 진행, 완료 예정시간 등을 알려주는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-radio-group v-model:value="radioSelected3">
                      <a-radio class="radio-bx" value="5">5점</a-radio>
                      <a-radio class="radio-bx" value="4">4점</a-radio>
                      <a-radio class="radio-bx" value="3">3점</a-radio>
                      <a-radio class="radio-bx" value="2">2점</a-radio>
                      <a-radio class="radio-bx" value="1">1점</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>
                  5. 메뉴 화면에서 현재 선택이 가능한 것과 불가능한 것을
                  명확하게 구분하고 있는가?
                </td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="메뉴 화면에서 현재 선택이 가능한 것과 불가능한 것을
                  명확하게 구분하고 있는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-radio-group v-model:value="radioSelected4">
                      <a-radio class="radio-bx" value="5">매우 만족함</a-radio>
                      <a-radio class="radio-bx" value="4">다소 만족함</a-radio>
                      <a-radio class="radio-bx" value="3">만족함</a-radio>
                      <a-radio class="radio-bx" value="2"
                        >다소 불만족함</a-radio
                      >
                      <a-radio class="radio-bx" value="1"
                        >매우 불만족함</a-radio
                      >
                    </a-radio-group>
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>6. 오류 메시지 내용이 이해하기 쉽게 표현되어 있는가?</td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="오류 메시지 내용이 이해하기 쉽게 표현되어 있는가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-textarea
                      class="textarea-bx"
                      placeholder="의견을 입력해 주세요"
                      :maxlength="200"
                    />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">문항</th>
                <td>7. 법률구조서비스 플랫폼을 알게 된 경로는 무엇인가?</td>
              </tr>
              <tr>
                <th scope="row">답변</th>
                <td>
                  <a-form-item
                    label="법률구조서비스 플랫폼을 알게 된 경로는 무엇인가?"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-checkbox-group v-model:value="checkSelected">
                      <a-checkbox class="check-bx" value="soccer" name="type"
                        >인터넷 검색</a-checkbox
                      >
                      <a-checkbox class="check-bx" value="basketall" name="type"
                        >지인소개</a-checkbox
                      >
                      <a-checkbox class="check-bx" value="tennis" name="type"
                        >지하철광고</a-checkbox
                      >
                    </a-checkbox-group>
                  </a-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template #footer>
        <CommonButton type="submit" class="primary" width="sm-1">
          설문조사 완료
        </CommonButton>
      </template>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
//@use './index.scss';
</style>
