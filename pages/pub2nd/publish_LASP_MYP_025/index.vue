<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="나의서류관리"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="circle">나의서류 등록</CommonTitle>
        <div class="common-form__area">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <table>
            <caption>
              사이버상담 문의 기본정보의 성명, 전화번호, 휴대전화번호, 이메일,
              비밀번호, 비밀번호 확인, 방문가능 공단사무소, 인지경로 입력에관한
              표
            </caption>
            <tbody>
              <tr>
                <th scope="row">
                  제목
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <a-form-item
                    name=""
                    label="성명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input
                      class="text-bx"
                      placeholder="50자 이내로 입력하세요"
                    />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  파일첨부
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="file-wrap">
                    <a-form-item
                      name=""
                      label=""
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input
                        class="text-bx"
                        placeholder="파일크기 2M까지 업로드 가능합니다."
                        :readonly="true"
                      />
                    </a-form-item>
                    <AllyFileButton class="txt">
                      <template #input>
                        <label for="fileInput">
                          <span class="sr-only">파일첨부</span>
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          class="sr-only"
                          aria-hidden="true"
                          tabindex="-1"
                        />
                      </template>
                    </AllyFileButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton to="#" variants="line-primary" width="sm-1"
            >목록</CommonButton
          >
          <CommonButton variants="primary" width="sm-1">저장</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
