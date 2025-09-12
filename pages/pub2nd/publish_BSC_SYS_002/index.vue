<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';

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
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>
    <CommonModal
      ref="modalRef"
      title="전자송달발송"
      :width="770"
      :full="true"
    >
      <template #footer>
        <CommonButton width="xs">닫기</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="1">전자송달 실명인증 및 발송</CommonTitle>
        <CommonTitle tag="h3" size="2">기타문서(파일첨부전송)</CommonTitle>
        <CommonTitle tag="h4" size="1" type="circle">첨부파일</CommonTitle>
        <div class="common-form__area">
          <table>
            <caption>
              전자송달발송의 파일첨부에 관한 표
            </caption>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  파일첨부
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="flex-box">
                    <a-form-item
                      name="name1"
                      label="대상자명 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" value="첨부파일명" :disabled="true" />
                    </a-form-item>
                    <CommonButton variants="line-blue" width="sm">삭제</CommonButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="info-list pc-only">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <CommonTable>
            <caption>
              전자송달발송의 NO, 대상자명, 주민등록번호, 핸드폰 번호, 발송일시에 관한 표
            </caption>
            <colgroup>
              <col width="8%" />
              <col width="23%" />
              <col width="23%" />
              <col width="23%" />
              <col width="23%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">
                  대상자명
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <th scope="col">
                  주민등록번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <th scope="col">
                  핸드폰 번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <th scope="col">발송일시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a-form-item
                    name="name1"
                    label="대상자명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    name="res1"
                    label="주민등록번호 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    name="phone1"
                    label="핸드폰 번호 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>2025.06.30 19:00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <a-form-item
                    name="name2"
                    label="대상자명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    name="res2"
                    label="주민등록번호 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>
                  <a-form-item
                    name="phone2"
                    label="핸드폰 번호 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx"/>
                  </a-form-item>
                </td>
                <td>2025.06.30 19:00</td>
              </tr>
            </tbody>
          </CommonTable>
        </div>
        <div class="common-table__list mo-only">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>NO</dt>
                  <dd>1</dd>
                </dl>
                <dl>
                  <dt>
                    대상자명
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="name1"
                      label="대상자명 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    주민등록번호
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="res2"
                      label="주민등록번호 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    핸드폰 번호
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="phone2"
                      label="핸드폰 번호 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025.06.30 19:00</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>NO</dt>
                  <dd>2</dd>
                </dl>
                <dl>
                  <dt>
                    대상자명
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="name1"
                      label="대상자명 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    주민등록번호
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="res2"
                      label="주민등록번호 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    핸드폰 번호
                    <span class="red-span">
                      *<span class="sr-only">필수 입력 항목</span>
                    </span>
                  </dt>
                  <dd>
                    <a-form-item
                      name="phone2"
                      label="핸드폰 번호 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx"/>
                    </a-form-item>
                  </dd>
                </dl>
                <dl>
                  <dt>발송일시</dt>
                  <dd>2025.06.30 19:00</dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
        <p class="info-txt-box">※ 전자송달을 위해서는 주민등록번호 입력 후 실명인증이 필요합니다.</p>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
