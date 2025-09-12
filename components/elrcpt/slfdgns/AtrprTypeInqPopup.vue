<!--
 * 화면명 : 구조대상자 유형 조회 팝업
 * 화면ID : LASP_ELE_004
 * 파일명 : AtrprTypeInqPopup
 * 작성자 : 이동규
 * 화면 설명 : 구조대상자 유형 조회 팝업 화면
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 변경일       변경자   변경내역
 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 2025.07.30  이동규   최초생성
-->

<script setup lang="ts">
import type { Page } from '~/types/common';
import type {
  OpenAtrprTypeInqPopupVO,
  userElrcptAtrprCtgr,
  userElrcptAtrprInVO,
  userElrcptAtrprOutVO
} from '~/types/elrcpt';
import { cloneDeep } from 'lodash-es';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import { ref } from 'vue';

const modalRef = ref<InstanceType<typeof CommonModal>>();
const open = defineModel('open');
const emit = defineEmits(['trprVal']);
const props = defineProps<{
  open: Boolean;
  params: OpenAtrprTypeInqPopupVO;
}>();
const { showAlert } = useCustomAlert();
const close = () => {
  open.value = false;
};
const radioSelected = ref('전체');

/** 구조대상자 페이지 조회 기본 조건 */
const DEFAULT_IN_VO: userElrcptAtrprInVO = {
  searchNm: '',
  searchCtgr: '',
  instNo: '',
  size: 5,
  page: 1
};

/** 구조대상자 페이지 조회 기본 페이지네이션 조건 */
const DEFAULT_PAGE: Page<userElrcptAtrprOutVO> = {
  content: [],
  totalPages: 0,
  totalElements: 0
};

/** 구조대상자 유형 리스트 */
const userElrcptAtrprCtgr = ref<userElrcptAtrprCtgr>;
/** 구조대상자 페이지 조회 조건 vo */
const userElrcptAtrprInVO = ref<userElrcptAtrprInVO>(cloneDeep(DEFAULT_IN_VO));
/** 구조대상자 페이지 조회 결과 vo */
const userElrcptAtrprOutVO = ref<Page<userElrcptAtrprOutVO>>(
  cloneDeep(DEFAULT_PAGE)
);

/**
 * name : onMounted <br/>
 * desc : onMounted 시 호출되는 이벤트 함수
 */
onMounted(() => {
  searchCtgr().then(() => search());
});

/**
 * name : watch<br/>
 * desc : props 변경 추적 함수
 */
watch(
  () => props.open,
  (open) => {
    if (open) {
      reset();
      resetCheckList();
      search();
    }
  }
);

/**
 * name : checkSearchValidation<br/>
 * desc : 검색 전 유효성 검사 함수
 */
const checkSearchValidation = () => {
  if (userElrcptAtrprInVO.value.searchNm.length == 1) {
    showAlert({
      icon: 'info',
      html: '구조대상자명은 2자 이상으로 입력하기 바랍니다.'
    });
    return false;
  }
  // else if (userElrcptAtrprInVO.value.searchNm.length > 256) {
  //   showAlert({
  //     icon: 'info',
  //     html: '구조대상자명은 256자 이하로 입력하기 바랍니다.'
  //   });
  //   return false;
  // }
  return true;
};

/**
 * name : resetCheckList<br/>
 * desc : 선택한 구조대상자 유형을 초기화하는 함수
 */
const resetCheckList = () => {
  checkList.value = [];
};

/**
 * name : searchBtn<br/>
 * desc : 검색 버튼 클릭 이벤트 시 호출되는 함수
 */
const searchBtn = () => {
  resetCheckList();
  resetInVoPage();
  search();
};

/**
 * name : resetInVoPage<br/>
 * desc : 조회 페이지를 초기화하는 함수
 */
const resetInVoPage = () => {
  userElrcptAtrprInVO.value.page = DEFAULT_IN_VO.page;
  userElrcptAtrprInVO.value.size = DEFAULT_IN_VO.size;
};
/**
 * name : search<br/>
 * desc : 구조대상자 유형에 따른 구조대상자 페이지 조회
 */
const search = async () => {
  if (checkSearchValidation()) {
    await useAxios()
      .get('/api/user/elrcpt/slfdgns/selectElrcptAtrprList', {
        params: userElrcptAtrprInVO.value
      })
      .then((res) => {
        if (res) {
          userElrcptAtrprOutVO.value.content = res.data.content;
          /*userElrcptAtrprOutVO.value.content.forEach((item) => {
            if (item.sbmsnDoc) {
              item.sbmsnDoc = item.sbmsnDoc.split(',');
            }
          });*/
          userElrcptAtrprOutVO.value.totalElements = res.data.totalElements;
        }
      })
      .catch((err) => {
        console.error(err);
        Modal.info({ title: '관리자에게 문의 바립니다.' });
      });
  } else {
    return;
  }
};

/**
 * name : searchCtgr<br/>
 * desc : 구조대상자 유형 리스트 조회
 */
const searchCtgr = async () => {
  await useAxios()
    .get('/api/user/elrcpt/slfdgns/selectElrcptAtrprCtgrList')
    .then((res) => {
      if (res) {
        userElrcptAtrprCtgr.value = res.data;
      }
    })
    .catch((err) => {
      console.error(err);
      showAlert({ icon: 'info', html: '관리자에게 문의 바립니다.' });
    });
};

/**
 * name : movePage<br/>
 * desc : 그리드에서 페이지 이동시 호출되는 이벤트
 *
 * @param page  이동할 페이지
 * @param size  한 페이지 당 출력 건수
 */
const movePage = (page: number, size: number) => {
  if (userElrcptAtrprInVO.value.page !== page) {
    userElrcptAtrprInVO.value.page = page;
    search();
  }

  if (userElrcptAtrprInVO.value.size !== size) {
    userElrcptAtrprInVO.value.size = size;
    search();
  }
};

/**
 * name : ctgrBtnClick<br/>
 * desc : 구조대상자 유형 버튼 클릭 시 호출되는 이벤트
 * @param ctgryNo 구조대상자 유형 번호
 */
const ctgrBtnClick = (ctgryNo: string) => {
  userElrcptAtrprInVO.value = cloneDeep(DEFAULT_IN_VO);
  userElrcptAtrprInVO.value.searchCtgr = !ctgryNo ? '' : ctgryNo;
  resetCheckList();
  search();
};

/**
 * name : reset<br/>
 * desc : 조회 영역의 초기화 버튼 클릭 시 호출되는 이벤트<br/>
 * 조회 조건 초기화 후 다시 검색한다.
 */
const reset = () => {
  DEFAULT_IN_VO.instNo = props.params.instNo;
  userElrcptAtrprInVO.value = cloneDeep(DEFAULT_IN_VO);
  radioSelected.value = '전체';
  // resetCheckList();
  // search();
};

/**
 * name : submit<br/>
 * desc : 적용 버튼 클릭 시 호출되는 이벤트<br/>
 * 부모 화면으로 선택한 구조대상자 리스트를 반환하고 팝업 창을 닫는다.
 */
const submit = () => {
  // 유효성검사
  console.log(checkList);
  if (checkList.value.length == 0) {
    showAlert({ icon: 'info', html: '구조대상자를 선택해주세요.' });
    return;
  }
  emit('trprVal', checkList.value);
  close();
};
const checkList = ref([]);

/**
 * name : checkAtrpr<br/>
 * desc :구조대상자 그리드에서 체크박스 클릭 시 호출되는 이벤트
 * @param event 이벤트 파라미터, 체크 혹은 해제
 */
const checkAtrpr = (event: object) => {
  if (event.target.checked == true) {
    checkList.value.push(event.target.value);
  } else {
    checkList.value = checkList.value.filter(
      (f) => f.atrprNo !== event.target.value.atrprNo
    );
  }
};
</script>

<template>
  <!--  TODO display: none 추가 이유 = 전자접수신청(ElrcptAplyEdit)에서 "구조대상자의 소득요건 확인" 위에 빈섹터 생김-->
  <div class="sub-content-box" style="height: 500px; display: none">
    <CommonModal
      ref="modalRef"
      :open="open"
      title="구조대상자 유형찾기"
      @cancel="close"
      :width="1100"
      :footer="null"
      :full="true"
      :hFull="true"
    >
      <div class="body-cont-wrap">
        <a-radio-group v-model:value="radioSelected" class="pc-only">
          <a-radio-button
            class="radio-btn-bx"
            value="전체"
            @click="ctgrBtnClick('')"
            >전체</a-radio-button
          >
          <a-radio-button
            class="radio-btn-bx"
            v-for="item in userElrcptAtrprCtgr.value"
            :value="item.ctgryNo"
            @click="ctgrBtnClick(item.ctgryNo)"
          >
            {{ item.lwaCtgryNm }}
          </a-radio-button>
        </a-radio-group>
        <a-select
          id="select"
          class="common-select type-blue mo-only"
          placeholder="선택"
        >
          <a-select-option value="전체">전체</a-select-option>
          <a-select-option
            :value="item.ctgryNo"
            v-for="item in userElrcptAtrprCtgr.value"
          >
            {{ item.lwaCtgryNm }}</a-select-option
          >
        </a-select>

        <div class="common-form__area">
          <table>
            <caption>
              구조대상자 유형찾기의 구조대상자명에 대한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">구조대상자명</th>
                <td>
                  <label for="ipText">
                    <span class="sr-only">구조대상자명 입력</span>
                  </label>
                  <a-input
                    id="ipText"
                    class="text-bx"
                    placeholder="2자 이상 입력"
                    v-model:value="userElrcptAtrprInVO.searchNm"
                    @keyup.enter="searchBtn"
                    maxlength="84"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-20px">
          <CommonButton variants="line-primary" width="lg" @click="reset">
            초기화
          </CommonButton>
          <CommonButton variants="primary" width="lg" @click="searchBtn()"
            >검색</CommonButton
          >
        </ButtonGroup>
        <div class="thead-info mt-27px">
          <span>총</span>
          <span class="case-txt">{{
            `${userElrcptAtrprOutVO.totalElements}건`
          }}</span>
        </div>
        <CommonTable>
          <caption>
            구조대상자 목록의 구조대상자명, 정의, 선택에 대한 표
          </caption>
          <thead>
            <tr>
              <th scope="col" class="name-th">구조대상자명</th>
              <th scope="col" class="title-th">정의</th>
              <th scope="col">선택</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userElrcptAtrprOutVO.content">
              <td>{{ item.trprNm }}</td>
              <td class="title-td">{{ item.trprExpln }}</td>
              <td>
                <a-checkbox
                  :checked="checkList.some((c) => c.atrprNo === item.atrprNo)"
                  class="check-bx"
                  @change="checkAtrpr($event)"
                  :value="item"
                />
              </td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonPagenation
          :page="userElrcptAtrprInVO.page"
          :size="userElrcptAtrprInVO.size"
          :total-elements="userElrcptAtrprOutVO.totalElements"
          :show-pagination-count="10"
          @change="movePage"
        />
      </div>

      <div class="button-box" style="display: flex; justify-content: flex-end">
        <button type="button" class="btn type02 wide" @click="submit()">
          적용
        </button>
        <button type="button" class="btn type01 wide" @click="close">
          닫기
        </button>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use '../../../assets/style/pages/elrcpt/slfdgns/AtrprTypeInqPopup.scss';
</style>
