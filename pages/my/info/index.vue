<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useModalFocus } from '~/composables/useModalFocus';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useLoginStore } from '~/stores/login';
import { useInqStore } from '~/stores/inq';
import CommonButton from '~/components/ui/button/button.vue';
import CommonButtonGroup from '~/components/ui/button/buttonGroup.vue';
import { ref } from 'vue';
import { find } from 'lodash-es';

const { showAlert } = useCustomAlert();
const { modalFocusRef, returnFocusRef, createModalFocus, removeModalFocus } =
  useModalFocus();
// 0. 쿼리 조회 response data (comUser)
const responseData = ref<{
  userId: string;
}>({
  userId: ''
});

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);

const userId = auth?.value.memberId;

// 2. 회원정보 조회(userId)
// 쿼리 조회 input data
const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

await useAxios()
  .get('/api/my/info')
  .then(({ data }) => {
    if (!data.mbrTelno) data.mbrTelno = '---';
    inqRequest.value = data;
    console.log(data);
  });

const MblTelNoRef = ref();
const TelNoRef = ref();

// 코드 리스트
const ntnCodeList = await useCommonCodeStore().searchNtnCodeList();

const open = ref(false);
watch(open, (newValue) => {
  if (!newValue) {
    removeModalFocus();
  }
});
// inqRequest.value.mbrMblTelno
const mbrMblTelno = inqRequest.value.mbrMblTelno
  ? inqRequest.value.mbrMblTelno.split('-')
  : '';
// const phoneNumbers = mbrMblTelno;

// inqRequest.value.mbrTelno
const mbrTelno = inqRequest.value.mbrTelno
  ? inqRequest.value.mbrTelno.split('-')
  : '';

const ntnPhone1 = ref('JEY');
const ntnTel1 = ref('JEY');

const router = useRouter();
const handleWithDrawSubmit = () => {
  router.push('/my/whdwl', { external: true });
};

const handleRcptnAgreYn = (event) => {
  inqRequest.value.emlRcptnAgreYn = event.target.value;
  inqRequest.value.smsRcptnAgreYn = event.target.value;
};

const handleWithCancelSubmit = () => {
  inqRequest.value.userPswd = '';
  router.push('/my/qna/list', { external: true });
};

const ntnChange = () => {
  ntnPhone1.value = inqRequest.value.mbrNtn;
  ntnTel1.value = inqRequest.value.mbrNtn;
};

onBeforeMount(async () => {
  if (inqRequest.value.mbrTypeCd === 'O01') {
    ntnPhone1.value = inqRequest.value.mbrNtn;
    ntnTel1.value = inqRequest.value.mbrNtn;
  }
  if (inqRequest.value.mbrMblTelno.length === 11) {
    sliceTelNo(inqRequest.value.mbrMblTelno);
  } else if (inqRequest.value.mbrMblTelno.length > 11) {
    splitTelNo(inqRequest.value.mbrMblTelno);
  }
});

const nationCheck = inqRequest.value.mbrTypeCd === 'O01' ? '거주국가' : '국적';
const addressCheck = inqRequest.value.mbrTypeCd === 'F01' ? '주소, ' : '';
const passportCheck = inqRequest.value.certTypeCd === '004' ? '여권번호, ' : '';

const captionText =
  inqRequest.value.mbrTypeCd === 'U02'
    ? '회원정보수정의 이름, 아이디, 주소, 휴대전화, 전화번호, 이메일, 정보 수신여부 입력에관한 표'
    : `회원정보수정의 이름, 아이디, ${nationCheck}, ${addressCheck}휴대전화, 전화번호, 이메일, ${passportCheck}정보 수신여부 입력에관한 표`;

const commonCodeStore = useCommonCodeStore();
const { data: codeList } = useQuery({
  queryKey: ['EMAIL_CODE', 'CO0019'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});
const { data: telcodeList } = useQuery({
  queryKey: ['code', 'CO0017'],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const radioSelected = ref(true);

const emailChange = () => {
  const item = find(
    codeList.value,
    (item) => item.value === (inqRequest.value.dmnEmlAddrCd as string)
  );

  inqRequest.value.dmnEmlAddr = item.label;
};
const sliceTelNo = (telNo) => {
  inqRequest.value.firstTelNo = telNo.slice(0, 3);
  inqRequest.value.secondTelNo = telNo.slice(3, 7);
  inqRequest.value.thirdTelNo = telNo.slice(7);
};
const splitTelNo = (telNo) => {
  const num = telNo.split('-');
  inqRequest.value.firstTelNo = num[0];
  inqRequest.value.secondTelNo = num[1];
  inqRequest.value.thirdTelNo = num[2];
};
const onFinish = (v) => {
  inqRequest.value.mbrMblTelno = `${inqRequest.value.firstTelNo}-${inqRequest.value.secondTelNo}-${inqRequest.value.thirdTelNo}`;
  useAxios()
    .post('/api/my/updateInfo', inqRequest.value)
    .then(({ data }) => {
      showAlert({
        icon: 'success',
        text: '회원정보가 수정되었습니다.'
      });
    })
    .catch((error) => {
      showAlert({
        icon: 'info',
        title: '관리자에게 문의바랍니다.'
      });
      console.error(error);
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
        <breadcrumb
          breadcrumb-title="회원정보수정"
          :show-print-button="true"
          :breadcrumbItems="[
            { text: '마이페이지' },
            { text: '회원정보수정', active: true }
          ]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <a-form
          :model="inqRequest"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="common-form__area">
            <span class="info-text">
              <span class="red-span">*</span> 표시는 필수 입력 사항입니다.</span
            >
            <table>
              <caption>
                {{
                  captionText
                }}
              </caption>
              <tbody>
                <tr>
                  <th scope="row">이름</th>
                  <td>
                    {{ inqRequest.mbrNm }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">아이디</th>
                  <td>{{ userId }}</td>
                </tr>
                <!-- 외국인 회원가입 폼에서는 거주코드를 나옵니다. 재외국민은 주소까지 나와야 합니다. v-if로 분기하세요. start -->
                <tr
                  v-if="
                    inqRequest.mbrTypeCd === 'O01' ||
                    inqRequest.mbrTypeCd === 'F01'
                  "
                >
                  <th scope="row">
                    {{ inqRequest.mbrTypeCd === 'O01' ? '거주국가' : '국적' }}
                  </th>
                  <td>
                    <a-form-item
                      name="mbrNtn"
                      label="국적"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select
                        class="common-select"
                        placeholder="선택"
                        v-model:value="inqRequest.mbrNtn"
                        @change="ntnChange"
                        id="mbrNtn"
                      >
                        <a-select-option
                          v-for="ntnCode in ntnCodeList"
                          :key="ntnCode.value"
                          :value="ntnCode.value"
                        >
                          {{ ntnCode.label }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                  </td>
                </tr>
                <!--                -->
                <tr v-if="inqRequest.mbrTypeCd === 'O01'">
                  <th scope="row">
                    휴대전화
                    <span class="red-span"
                      ><i>*</i>
                      <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="ntnPhone1"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select
                          class="common-select"
                          v-model:value="ntnPhone1"
                        >
                          <a-select-option
                            v-for="ntnCode in ntnCodeList"
                            :key="ntnCode.value"
                            :value="ntnCode.value"
                          >
                            {{ ntnCode.label }}({{
                              ntnCode.text
                            }})</a-select-option
                          >
                        </a-select>
                      </a-form-item>

                      <a-form-item
                        name="ntnMblTelno"
                        label="휴대전화2"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input your phone number'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="inqRequest.ntnMblTelno"
                          maxlength="20"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>

                <tr v-if="inqRequest.mbrTypeCd === 'O01'">
                  <th scope="row">전화번호</th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="ntnPhone1"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select
                          class="common-select"
                          v-model:value="ntnPhone1"
                        >
                          <a-select-option
                            v-for="ntnCode in ntnCodeList"
                            :key="ntnCode.value"
                            :value="ntnCode.value"
                          >
                            {{ ntnCode.label }}({{
                              ntnCode.text
                            }})</a-select-option
                          >
                        </a-select>
                      </a-form-item>

                      <a-form-item
                        name="ntnTelno"
                        label="전화번호2"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="inqRequest.ntnTelno"
                          maxlength="20"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>

                <!-- 외국인 회원가입 폼에서는 거주코드를 나옵니다. 재외국민은 주소까지 나와야 합니다. v-if로 분기하세요. end -->
                <tr v-if="inqRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">주소</th>
                  <td>
                    <div class="form-item__addr">
                      <div class="item-column">
                        <a-form-item
                          name="zip"
                          label="주소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="inqRequest.zip"
                            maxlength="5"
                            readonly
                            id="address-search-input"
                          />
                        </a-form-item>
                        <CommonButton
                          title="우편번호 찾기"
                          variants="primary"
                          width="sm"
                          @click="
                            () => {
                              open = true;
                              createModalFocus();
                            }
                          "
                          ref="returnFocusRef"
                        >
                          우편번호 찾기
                        </CommonButton>
                      </div>
                      <common-search-address
                        v-model:open="open"
                        v-model:zip="inqRequest.zip"
                        v-model:mbr-addr="inqRequest.mbrAddr"
                        v-model:modal-focus="modalFocusRef"
                      />

                      <a-form-item
                        name="mbrAddr"
                        label="주소상세2(선택 시 자동입력)"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          id="address-input1"
                          type="text"
                          maxlength="50"
                          placeholder="우편번호 검색을 통해 자동 입력됩니다."
                          readonly
                          class="text-bx full"
                          v-model:value="inqRequest.mbrAddr"
                        />
                      </a-form-item>

                      <a-form-item
                        name="mbrDaddr"
                        label="주소상세3"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          id="address-input2"
                          type="text"
                          maxlength="50"
                          class="text-bx full"
                          v-model:value="inqRequest.mbrDaddr"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr v-if="inqRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">
                    휴대전화
                    <span class="red-span"
                      >* <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="form-item__number">
                      <a-form-item
                        name="firstTelNo"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '휴대폰 첫 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-select
                          class="common-select"
                          placeholder="선택"
                          v-model:value="inqRequest.firstTelNo"
                        >
                          <a-select-option value="">선택</a-select-option>
                          <a-select-option
                            v-for="code in telcodeList"
                            v-model:value="code.value"
                            >{{ code.label }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="secondTelNo"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            min: 4,
                            message: '휴대폰 두 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="inqRequest.secondTelNo"
                          maxlength="4"
                        />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="thirdTelNo"
                        label="휴대전화"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            min: 4,
                            message: '휴대폰 세 번째 자리가 잘못되었습니다.'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          v-model:value="inqRequest.thirdTelNo"
                          maxlength="4"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr v-if="inqRequest.mbrTypeCd !== 'O01'">
                  <th scope="row">전화번호</th>
                  <td>
                    <div class="cellphone-box input-group-box">
                      <common-tel-num-input
                        v-model="inqRequest.mbrTelno"
                        cd-group-id="CO0018"
                        ref="TelNoRef"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">이메일</th>
                  <td>
                    <div class="form-item__email">
                      <a-form-item
                        name="mbrEmlAddr"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: '이메일을 입력해주세요'
                          }
                        ]"
                      >
                        <a-input
                          class="text-bx"
                          id="emailhead1"
                          v-model:value="inqRequest.mbrEmlAddr"
                          ref="emailInput"
                          placeholder="이메일 입력"
                        />
                      </a-form-item>
                      <span class="dash">@</span>
                      <a-form-item
                        name="dmnEmlAddr"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input
                          class="text-bx"
                          id="emailend2"
                          :disabled="!!inqRequest.dmnEmlAddrCd"
                          ref="emailCdInput"
                          v-model:value="inqRequest.dmnEmlAddr"
                        />
                      </a-form-item>
                      <a-form-item
                        name="email3"
                        label="이메일 선택"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select
                          class="common-select"
                          id="emailend3"
                          v-model:value="inqRequest.dmnEmlAddrCd"
                          @change="emailChange"
                        >
                          <a-select-option value="">직접입력</a-select-option>
                          <a-select-option
                            :value="code.value"
                            v-for="code in codeList"
                          >
                            {{ code.label }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr
                  v-if="
                    inqRequest.mbrTypeCd === 'F01' &&
                    inqRequest.certTypeCd === '004'
                  "
                >
                  <th scope="row">
                    여권번호
                    <span class="red-span"
                      >* <span class="sr-only">필수 입력 항목</span></span
                    >
                  </th>
                  <td>
                    <div class="item-column">
                      <a-form-item
                        name="pno"
                        label="여권번호"
                        :labelCol="{ class: 'sr-only' }"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input your passport No!'
                          }
                        ]"
                      >
                        <a-input
                          id="password-input"
                          type="text"
                          class="text-bx"
                          readonly
                          v-model:value="inqRequest.pno"
                        />
                      </a-form-item>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">정보 수신여부</th>
                  <td>
                    <a-form-item
                      name="infoRec"
                      label="정보 수신여부"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-radio-group
                        v-model:value="inqRequest.smsRcptnAgreYn"
                        @change="handleRcptnAgreYn($event)"
                      >
                        <a-radio
                          type="radio"
                          name="aggre"
                          id="aggre-input"
                          class="radio-bx"
                          :value="true"
                          >수신</a-radio
                        >
                        <a-radio
                          type="radio"
                          name="aggre"
                          id="denied-aggre-input"
                          class="radio-bx"
                          :value="false"
                          >미수신</a-radio
                        >
                      </a-radio-group>
                    </a-form-item>

                    <p class="input-info">
                      ※ 이메일 및 SMS미수신 시 지원업무 진행사항 등의 정보를
                      받으실 수 없습니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <CommonButtonGroup align="center-right">
            <CommonButton
              variants="gray"
              width="sm"
              @click="handleWithCancelSubmit"
              >취소</CommonButton
            >
            <CommonButton variants="primary" width="sm" type="submit"
              >회원정보수정</CommonButton
            >
            <CommonButton
              variants="line-primary"
              width="sm"
              @click="handleWithDrawSubmit"
              >회원 탈퇴</CommonButton
            >
          </CommonButtonGroup>
        </a-form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/info/index.scss';
</style>
