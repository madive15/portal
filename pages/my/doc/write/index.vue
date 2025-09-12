<script setup lang="ts">
import { useFileStore } from '~/stores/file';
import axios from 'axios';
import type { myDocInVO, myDocOutVO } from '~/types/mydoc';
import Breadcrumb from '~/components/common/breadcrumb.vue';
import type { RuleObject } from 'ant-design-vue/es/form';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';
import { textAligns } from '@unocss/preset-mini/rules';
const fileStore = useFileStore();
const route = useRoute();
const router = useRouter();
const subject = ref<string>('등록'); // 등록/수정 구분
const { showAlert } = useCustomAlert();

const myDocInVO = ref<myDocInVO>({
  indvTmpltSeq: (route.query.id as number) ?? 0,
  tmpltNm: '',
  atchFileId: '',
  gbn: 'I'
});
const myDocOutVO = ref<myDocOutVO>({
  indvTmpltSeq: 0,
  tmpltNm: (route.query.tmpltNm as string) ?? '',
  frstRegDt: '',
  atchFileId: route.query.fileId as string
});

onBeforeMount(() => {
  if (route.query.id > 0) {
    subject.value = '수정';
  }
  console.log(subject);
});

onMounted(async () => {
  if (route.query.id > 0) {
    //subject.value = '나의서류 상세(수정)';
    myDocInVO.value.gbn = 'U';

    // const { data } = await axios.get('/api/mydoc/selectMyDoc', {
    //   params: {
    //     ...myDocInVO.value
    //   }
    // });
    // myDocOutVO.value.tmpltNm = data.tmpltNm;
  } else {
    // subject.value = '나의 서류 등록';
  }
  console.log('헤더 구분');
});

const requiredChk = () => {
  if (!myDocOutVO.value.tmpltNm) {
    //Modal.info({ title: '제목은 필수 항목입니다.' });
    showAlert({
      icon: 'info',
      html: '제목은 필수 항목입니다.',
      confirmButtonText: '확인'
    });
    return false;
  }
  if (!myDocOutVO.value.atchFileId) {
    //Modal.info({ title: '첨부파일은 필수 항목입니다.' });
    showAlert({
      icon: 'info',
      html: '첨부파일은 필수 항목입니다.',
      confirmButtonText: '확인'
    });
    return false;
  }
  return true;
};

const saveMyDoc = async () => {
  myDocOutVO.value.tmpltNm = myDocOutVO.value.tmpltNm.trim();
  if (!requiredChk()) return;
  // if (myDocInVO.value.gbn == 'I') {
  //   subject.value = '저장';
  // } else {
  //   subject.value = '수정';
  // }

  showAlert({
    icon: 'info',
    html: `나의서류를 ${subject.value} 하시겠습니까? `,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post('/api/mydoc/saveMyDoc', {
          ...myDocInVO.value,
          tmpltNm: myDocOutVO.value.tmpltNm,
          atchFileId: myDocOutVO.value.atchFileId
        });
        if (res.status == 200) {
          await router.push('/my/doc/list');
        }
        await showAlert({ icon: 'info', html: '저장되었습니다.' });
      }
    })
    .catch((err) => {
      console.error(err);
      showAlert({ icon: 'info', html: '관리자에게 문의 바랍니다' });
    });
};

const movePage = () => {
  router.push('/my/doc/list');
};
const onFinish = () => {
  myDocOutVO.value.tmpltNm = myDocOutVO.value.tmpltNm.trim();
  if (!requiredChk()) return;
  if (myDocInVO.value.gbn == 'I') {
    subject.value = '저장';
  } else {
    subject.value = '수정';
  }

  showAlert({
    icon: 'info',
    html: `나의서류를 ${subject.value} 하시겠습니까? `,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post('/api/mydoc/saveMyDoc', {
          ...myDocInVO.value,
          tmpltNm: myDocOutVO.value.tmpltNm,
          atchFileId: myDocOutVO.value.atchFileId
        });
        if (res.status == 200) {
          await router.push('/my/doc/list');
        }
        await showAlert({ icon: 'info', html: '저장되었습니다.' });
      }
    })
    .catch((err) => {
      console.error(err);
      showAlert({ icon: 'info', html: '관리자에게 문의 바랍니다' });
    });
};
const onFinishFailed = (e) => {
  message.error(e.errorFields[0].errors);
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="마이페이지"
          :showPrintButton="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: subject, active: true }
          ]"
        />
      </div>
    </section>

    <section class="section2">
      <div class="container">
        <h4 class="title-heading-1 circle">
          {{ `나의서류 ${subject}` }}
        </h4>
        <a-form
          :model="myDocOutVO"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="common-form__area">
            <p class="form-ess_info">
              <i class="red-span">*</i>
              <span> 표시는 필수 입력 사항입니다. </span>
            </p>

            <table>
              <caption>
                사이버상담 문의 기본정보의 성명, 전화번호, 휴대전화번호, 이메일,
                비밀번호, 비밀번호 확인, 방문가능 공단사무소, 인지경로
                입력에관한 표
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
                      name="tmpltNm"
                      label="성명"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          required: true,
                          message: '제목을 입력해주세요'
                        },
                        {
                          max: 50,
                          message: '50자 이내로 입력하세요'
                        }
                      ]"
                    >
                      <a-input
                        class="text-bx"
                        placeholder="50자 이내로 입력하세요"
                        v-model:value="myDocOutVO.tmpltNm"
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
                        name="atchFileId"
                        :rules="[
                          {
                            required: true,
                            message: '파일 첨부는 필수입니다.'
                          }
                        ]"
                      >
                        <lazy-data-fileupload
                          module="bbs"
                          :mode="'normal'"
                          v-model:atch-file-id="myDocOutVO.atchFileId"
                          :max-count="1"
                          :size="2"
                        />
                      </a-form-item>
                      <!--
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
                    --></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="notice-p">※ 첨부파일 용량은 2M이하로 올려주세요.</p>
          </div>

          <div class="button-box">
            <NuxtLink to="/my/doc/list" class="btn type01">목록</NuxtLink>
            <button type="submit" class="btn type02">저장</button>
          </div>
        </a-form>
        <!--
        <a-form
          :model="myDocOutVO"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="common-form__area">
            <span class="info-text">
              <i class="red-span">*</i> 표시는 필수 입력사항입니다.
            </span>
            <CommonTable>
              <tbody>
                <tr>
                  <td class="gray">제목<span class="required">*</span></td>
                  <td>
                    <a-form-item
                      name="tmpltNm"
                      label="제목 입력"
                      :labelCol="{ class: 'sr-only' }"
                      :rules="[
                        {
                          required: true,
                          message: '제목을 입력하세요'
                        },
                        {
                          max: 50,
                          message: '50글자 이하로 입력하세요'
                        }
                      ]"
                    >
                      <a-input
                        placeholder="50자 이내로 입력하세요."
                        v-model:value="myDocOutVO.tmpltNm"
                        maxlength="50"
                      />
                    </a-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="gray">파일첨부<span class="required">*</span></td>
                  <td>
                    <a-form-item
                      name="atchFileId"
                      :rules="[
                        {
                          required: true,
                          message: '파일 첨부는 필수입니다.'
                        }
                      ]"
                    >
                      <lazy-data-fileupload
                        module="bbs"
                        :mode="'normal'"
                        v-model:atch-file-id="myDocOutVO.atchFileId"
                        :max-count="1"
                        :size="2"
                      />
                      <p class="notice-p">
                        ※ 첨부파일 용량은 2M이하로 올려주세요.
                      </p>
                    </a-form-item>
                  </td>
                </tr>
              </tbody>
            </CommonTable>
          </div>
          <CommonButtonGroup align="right">
            <CommonButton variants="gray" width="sm" @click="movePage()"
              >목록</CommonButton
            >
            <CommonButton variants="primary" width="sm" type="submit"
              >저장</CommonButton
            >
          </CommonButtonGroup>
        </a-form>
        -->
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/pages/pub2nd/publish_LASP_MYP_025/index.scss';
</style>
