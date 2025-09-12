<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'pub2nd'
});

const formTextarea = ref('');

const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>
    <CommonModal
      ref="modalRef"
      title="문자발송"
      :width="770"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">닫기</CommonButton>
        <CommonButton variants="primary" width="xs">문자발송</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <div class="common-form__area">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <table>
            <caption>
              문자발송의 템플릿 선택, 수신번호, (SMS/LMS)내용에 관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">템플릿 선택</th>
                <td>
                  <a-select id="select" class="common-select" title="템플릿 선택" placeholder="선택하세요">
                    <a-select-option value="1">선택 1</a-select-option>
                    <a-select-option value="2">선택 2</a-select-option>
                  </a-select>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  수신번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="flex-box">
                    <div class="box">
                      <a-form-item
                        name="name1"
                        label="대상자명 입력"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" placeholder="‘-’제와 입력" />
                      </a-form-item>
                      <div class="num-list-box">
                        <ul class="list">
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                          <li>
                            <div class="list-cont">
                              <span>000-0000-0000</span>
                              <button type="button" class="del-btn">
                                <span class="sr-only">삭제</span>
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <CommonButton variants="line-blue" width="sm">추가</CommonButton>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  (SMS / LMS) 내용
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="flex-box type2">
                    <div class="textarea-box">
                      <a-textarea
                        class="textarea-bx"
                        id="textMessage"
                        title="(SMS / LMS) 내용 입력"
                        placeholder="내용을 입력하세요."
                        :maxlength="200"
                        v-model:value="formTextarea"
                      />
                      <div class="capacity-box">
                        <em>0</em> / <span>80 Byte(SMS)</span>
                      </div>
                    </div>
                    <ul class="info-list">
                      <li>※ 80Byte 초과 시 장문메시지로 발송됩니다.</li>
                      <li>※ 2000Byte 이내로 작성바랍니다.</li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
