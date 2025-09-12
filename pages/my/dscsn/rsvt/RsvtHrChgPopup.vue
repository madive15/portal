<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import type { OpenAtrprTypeInqPopupVO } from '~/types/elrcpt';
import dayjs from 'dayjs';
import type { IFHrChcFormVO } from '~/types/dscsn/rsvt';
import axios from 'axios';

/* 나의 서류 팝업 Ref */
const modalRef = ref<InstanceType<typeof CommonModal>>();

const props = defineProps<{ data: sendOutVO | null }>();

const rsvtList: Ref<IFHrChcFormVO[]> = ref([]);

const rsvtSelectedRow = ref(null);
const rsvtSelectedIdx = ref(null);

const showModal = () => {
  // 초기화
  rsvtList.value = [];
  rsvtSelectedRow.value = null;
  rsvtSelectedIdx.value = null;

  modalRef.value?.open();
};
/** alert창 선언 */
const { showAlert } = useCustomAlert();

const emit = defineEmits(['update']);

onMounted(() => {
  // console.log('기관번호 :::' + props.data.instNo);
  // console.log('예약날짜 :::' + props.data.rsvtYmd);
  // const data = props.params.rsvtYmd;
  // props.row.rsvtYmd;
  // console.log('들어온데이터 ::: ' + data);
});

defineExpose({
  showModal
});

const form = reactive({
  // 시간조회 param
  rsvtYmd: '', // 예약일자(조회할 날짜)
  instNo: '', // 기관번호
  rsvtHrChgClndr: '',

  // 예약변경 param
  dscsnAplyNo: '', // 상담신청번호

  dscsnSeCd: '', // 상담소/원 상담구분 [ 1 : 면접 / 2: 상담 ]
  resvGbn: '', // 공단/홈닥터 예약구분 [ 1 : 면접 / 2: 상담 ]
  resvFrDt: '', // 예약가능희시작일자망일
  resvToDt: '' // 예약가능종료일자

  // return
  // 예약TB - INSERT
  // orgCd: '', // 기관코드(지부)
  // orgNm: '', // 기관명(지부)
  // stdgCd: '', // 법정동코드
  // reserveDe: '', // 예약일자
  // reserveTime: '', // 예약시간
  // wdayCode: '', // 요일코드
  // flag: '', // 예약가능여부
  // totCnt: '' // 총건수
});

const instSe = ref('');

const searchBtn = () => {
  debugger;
  form.instNo = props.data.instNo;
  form.resvFrDt = props.data.rsvtYmd;
  form.resvToDt = props.data.rsvtYmd;
  form.resvGbn = props.data.resvGbn;
  form.dscsnSeCd = props.data.dscsnSeCd;

  let goUrl = '';

  // 대한법률복지공단
  if (props.data.instNo === 'I001000000') {
    goUrl = 'selectKlaHrChcList';
    instSe.value = 'kla';
  }
  // 한국가정법률상담소
  else if (props.data.instNo === 'I002000000') {
    goUrl = 'selectLhmHrChcList';
    instSe.value = 'lhm';
  }
  // 대한가정법률복지상담원
  else if (props.data.instNo === 'I003000000') {
    goUrl = 'selectLqaHrChcList';
    instSe.value = 'lqa';
  }
  // 홈닥터
  else if (props.data.instNo === 'I054000000') {
    goUrl = 'selectLhdHrChcList';
    instSe.value = 'lhd';
  }
  selectPsbltyInstList(goUrl);
};

const selectPsbltyInstList = async (goUrl) => {
  const formData = new FormData();

  // formData.append('instNo', form.instNo);
  formData.append('resvFrDt', form.resvFrDt);
  formData.append('resvToDt', form.resvToDt);
  formData.append('resvGbn', form.resvGbn);
  formData.append('dscsnSeCd', form.dscsnSeCd);

  const formParam = new URLSearchParams(formData).toString();

  const response = await useAxios().get(
    '/api/dscsn/rsvt/' + goUrl + '?' + formParam
  );

  if (response.data.length > 0) {
    rsvtList.value = response.data;
  } else {
    rsvtList.value = [];
  }
};

const formatDate = (yyyymmdd) => {
  if (!yyyymmdd) return '';

  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const day = yyyymmdd.substring(6, 8);

  return `${year}년 ${month}월 ${day}일`;
};

const formatTime = (hhmm) => {
  if (!hhmm) return '';

  const hh = hhmm.substring(0, 2);
  const mm = hhmm.substring(2, 4);

  return `${hh} : ${mm}`;
};

const onRsvtHrChgClndr = (val: Date | null) => {
  if (val) {
    form.rsvtYmd = dayjs(val).format('YYYY-MM-DD');
  }
};

const selectItem = (item, index) => {
  rsvtSelectedIdx.value = index;
  rsvtSelectedRow.value = item;
};

// 예약변경 클릭
const onClickRsvtChg = () => {
  if (!rsvtSelectedRow.value) {
    showAlert({
      icon: 'info',
      html: '항목을 먼저 선택해주세요.'
    });
  } else {
    showAlert({
      icon: 'question',
      html: '예약시간을 변경 하시겠습니까?<br/> 확인 시 즉시 변경 적용 됩니다.',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        // 선점 해제후 선점
        // rsvtSelectedRow.value를 param으로 보내야함
        // processDsctnRsvtChg();

        // 신청폼으로 row데이터 전달
        emit('update', rsvtSelectedRow.value);

        closeModal();
      }
    });
  }
};

const closeModal = () => {
  modalRef.value?.close();
};
</script>

<template>
  <div class="sub-content-box" style="height: 800px">
    <!--    <button type="button" class="btn-basic primary" @click="showModal">-->
    <!--      <span class="text">Open Modal</span>-->
    <!--    </button>-->

    <CommonModal
      ref="modalRef"
      title="상담예약시간 변경"
      :width="780"
      :full="true"
    >
      <template #footer>
        <CommonButton width="sm-1" @click="onClickRsvtChg" variants="primary"
          >예약변경</CommonButton
        >
        <CommonButton width="xs" @click="closeModal">취소</CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="1" type="circle">날짜 조회</CommonTitle>
        <p class="date-description-txt">
          날짜 조회에서 변경 희망일자를 선택한 후 조회해 주세요.<br
            class="pc-only"
          />
          해당일에 예약가능한 기관과 시간이 있는 날짜만 선택 가능하며 조회된
          희망기관 및 시간을 확인하여 선택 해 주세요.<br />
          ※단, 예약변경 시 동일한 법률상담기관내에서만 변경 가능합니다.
        </p>
        <div class="date-search-box">
          <VueDatePicker
            name="rsvtHrChgClndr"
            id="write-period-rsvtHrChgClndr"
            style="width: 300px"
            :year-range="[
              new Date().getFullYear() - 5,
              new Date().getFullYear() + 5
            ]"
            v-model="form.rsvtYmd"
            locale="ko"
            :enable-time-picker="false"
            :format="'yyyy-MM-dd'"
            :auto-apply="true"
            :clearable="false"
            :transitions="false"
            :highlight-week-days="[0]"
            :week-start="0"
            placeholder="날짜 선택"
            hide-input-icon
            @update:model-value="onRsvtHrChgClndr"
          />
          <CommonButton @click="searchBtn" variants="primary" width="xs"
            >조회</CommonButton
          >
        </div>
        <ul class="date-info-list">
          <li
            v-for="(item, index) in rsvtList"
            :key="index"
            v-if="rsvtList.length > 0"
          >
            <div
              class="date-info-cont"
              :class="{ selected: rsvtSelectedIdx === index }"
            >
              <div class="info-box">
                <dl class="first">
                  <dt>예약기관</dt>
                  <dd>{{ item.orgNm }}</dd>
                </dl>
                <dl>
                  <dt>날짜</dt>
                  <dd>{{ formatDate(item.reserveDe) }}</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>{{ formatTime(item.reserveTime) }}</dd>
                </dl>
              </div>
              <CommonButton
                @click="selectItem(item, index)"
                variants="primary"
                width="xs"
                height="sm"
                >선택</CommonButton
              >
            </div>
          </li>
        </ul>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/my/dscsn/rsvt/RsvtHrChgPopup.scss';
</style>
