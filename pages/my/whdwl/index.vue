<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useLoginStore } from '~/stores/login';
import { ref } from 'vue';
import { useInqStore } from '~/stores/inq';
import LoginRequired from '~/components/common/LoginRequired.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
const router = useRouter();

const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);
const { showAlert } = useCustomAlert();

const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

const whdwlRsnCd = await useCommonCodeStore().searchCommonCodeList('CO0029');
const data = ref<{
  agreeYn: boolean;
}>({
  agreeYn: false
});
onBeforeMount(async () => {
  await inqStore.resetJoinRequest();
});
/*
const agreeYn = computed({
  get() {
    return data.value.agreeYn;
  },
  set(newValue) {
    data.value.agreeYn = newValue;
  }
});
 */
const updateWhdwl = () => {
  if (!inqRequest.value.whdwlRsnCd) {
    showAlert({
      icon: 'info',
      text: '탈퇴사유를 선택해주세요.'
    });
    return;
  }
  if (!data.value.agreeYn) {
    showAlert({
      icon: 'info',
      text: '탈퇴 시 아이디의 재사용 및 데이터 복구가 불가함에 동의해주세요.'
    });
    return;
  }
  useAxios()
    .post('/api/my/whdwl', inqRequest.value)
    .then(({ data }) => {
      router.push('/my/whdwl/completion', { external: true });
    })
    .catch((error) => {
      // console.log('탈퇴처리 실패 !!!');
    });
};

const cancel = () => {
  router.back();
};
</script>

<template>
  <LoginRequired>
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <Breadcrumb
            breadcrumb-title="회원탈퇴"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '마이페이지' },
              { text: '회원탈퇴' },
              { text: '탈퇴신청', active: true }
            ]"
          />
          <my-tab />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="form-box">
            <div class="reason-box">
              <label for="reason">탈퇴사유</label>
              <a-select
                id="select"
                class="common-select"
                placeholder="구분 선택"
                v-model:value="inqRequest.whdwlRsnCd"
              >
                <a-select-option
                  v-for="option in whdwlRsnCd"
                  :key="option.value"
                  :value="option.value"
                  >{{ option.label }}</a-select-option
                >
              </a-select>
            </div>
            <div class="content-box">
              <label for="content">내용</label>
              <a-textarea
                class="textarea-bx"
                id="textMessage"
                placeholder="내용을 입력해 주세요."
                v-model:value="inqRequest.whdwlRsn"
              />
            </div>
            <p class="notice-p">
              ※ 회원탈퇴를 신청하시면 현재 로그인 된 아이디는 즉시 탈퇴 처리
              되며, 해당 아이디로는 재가입 하실 수 없습니다.
            </p>
            <div class="apply-box">
              <a-checkbox
                class="check-bx"
                name="apply"
                v-model:checked="data.agreeYn"
              >
                안내 사항을 모두 확인하였으며, 탈퇴 시 아이디의 재사용 및 데이터
                복구가 불가함에 동의합니다.
              </a-checkbox>
            </div>

            <ButtonGroup align="center">
              <CommonButton
                title="회원탈퇴"
                variants="primary"
                width="sm"
                @click="updateWhdwl"
              >
                회원탈퇴
              </CommonButton>
              <CommonButton
                variants="gray"
                title="취소"
                width="sm"
                @click="cancel"
              >
                취소
              </CommonButton>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </div>
  </LoginRequired>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/whdwl/index.scss';
</style>
