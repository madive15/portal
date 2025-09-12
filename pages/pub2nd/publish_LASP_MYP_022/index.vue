<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';

definePageMeta({
  layout: 'pub2nd'
});

const formTextarea = ref('');
const formTextarea2 = ref('');

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
      title="보완요청상세"
      :width="770"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">닫기</CommonButton>
        <CommonButton variants="primary" width="sm-1">보완요청완료</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <div class="common-form__area">
          <table>
            <caption>보완요청상세의 보완요청일자, 보완요청내용, 보완내용에 관한 표</caption>
            <tbody>
              <tr>
                <th scope="row">보완요청일자</th>
                <td class="title-td">
                  <strong>2025-05-23</strong>
                </td>
              </tr>
              <tr>
                <th scope="row">보완요청내용</th>
                <td class="title-td">
                  <label for="textMessage">
                    <span class="sr-only">textarea</span>
                  </label>
                  <a-textarea
                    class="textarea-bx"
                    id="textMessage"
                    placeholder="최대 200자 입력 가능"
                    :maxlength="200"
                    :disabled="true"
                    v-model:value="formTextarea"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">보완내용</th>
                <td class="title-td">
                  <label for="textMessage2">
                    <span class="sr-only">textarea</span>
                  </label>
                  <a-textarea
                      class="textarea-bx"
                      id="textMessage2"
                      placeholder="최대 200자 입력 가능"
                      :maxlength="200"
                      v-model:value="formTextarea2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CommonModal>
  </div>
  <!-- 여기부터 모달 컨텐츠 -->
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
